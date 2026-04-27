const connectForm = document.querySelector("#connect-form");
const usernameInput = document.querySelector("#username");
const rememberUsernameInput = document.querySelector("#remember-username");
const appVersionLabel = document.querySelector("#app-version");
const connectionStatus = document.querySelector("#connection-status");
const signalDot = document.querySelector(".signal-dot");
const updateStatus = document.querySelector("#update-status");
const translationStatus = document.querySelector("#translation-status");
const ttsStatus = document.querySelector("#tts-status");
const chatList = document.querySelector("#chat-list");
const chatCount = document.querySelector("#chat-count");
const disconnectButton = document.querySelector("#disconnect-button");
const ttsForm = document.querySelector("#tts-form");
const translationEnabledInput = document.querySelector("#translation-enabled");
const translationTargetLanguageSelect = document.querySelector("#translation-target-language");
const translationProviderUrlInput = document.querySelector("#translation-provider-url");
const translationApiKeyInput = document.querySelector("#translation-api-key");
const ttsEnabledInput = document.querySelector("#tts-enabled");
const ttsIncludeUsernameInput = document.querySelector("#tts-include-username");
const ttsReadGiftsInput = document.querySelector("#tts-read-gifts");
const ttsAudienceAllInput = document.querySelector("#tts-audience-all");
const ttsAudienceSubscribersInput = document.querySelector("#tts-audience-subscribers");
const ttsAudienceModeratorsInput = document.querySelector("#tts-audience-moderators");
const ttsVoiceSelect = document.querySelector("#tts-voice");
const ttsStyleSelect = document.querySelector("#tts-style");
const ttsRateInput = document.querySelector("#tts-rate");
const ttsRateValue = document.querySelector("#tts-rate-value");
const ttsPitchInput = document.querySelector("#tts-pitch");
const ttsPitchValue = document.querySelector("#tts-pitch-value");
const ttsVolumeInput = document.querySelector("#tts-volume");
const ttsVolumeValue = document.querySelector("#tts-volume-value");
const ttsTestButton = document.querySelector("#tts-test-button");
const desktopApp = window.desktopApp;
const DEFAULT_GITHUB_OWNER = "admin-streamsyncpro";
const DEFAULT_GITHUB_REPO = "streamsyncpro";

const TTS_STYLE_PRESETS = {
  natural: {
    label: "Natural",
    rate: 1,
    pitch: 1,
    preferredVoiceHints: []
  },
  protocol: {
    label: "Protocol droid",
    rate: 1.18,
    pitch: 1.45,
    preferredVoiceHints: ["zira", "aria", "libby", "jenny", "female"]
  },
  dark: {
    label: "Dark commander",
    rate: 0.82,
    pitch: 0.62,
    preferredVoiceHints: ["david", "mark", "guy", "male"]
  },
  announcer: {
    label: "Arena announcer",
    rate: 1.05,
    pitch: 0.92,
    preferredVoiceHints: ["guy", "mark", "davis", "male"]
  },
  tinybot: {
    label: "Tiny robot",
    rate: 1.28,
    pitch: 1.72,
    preferredVoiceHints: ["zira", "aria", "jenny", "female"]
  }
};

let messageCount = 0;
let availableVoices = [];
let currentSettings = {
  githubOwner: DEFAULT_GITHUB_OWNER,
  githubRepo: DEFAULT_GITHUB_REPO,
  rememberedUsername: "",
  rememberUsername: false,
  translationEnabled: false,
  translationTargetLanguage: "en",
  translationProviderUrl: "",
  translationApiKey: "",
  ttsEnabled: false,
  ttsVoice: "",
  ttsStyle: "natural",
  ttsRate: 1,
  ttsPitch: 1,
  ttsVolume: 1,
  ttsIncludeUsername: true,
  ttsReadGifts: false,
  ttsAudience: {
    allViewers: true,
    subscribers: false,
    moderators: false
  }
};
const ttsQueue = [];
let isSpeaking = false;
let ttsSaveTimer = null;
let currentAudio = null;
let currentAudioSource = null;
let currentGainNode = null;
let audioContext = null;
let translationSaveTimer = null;

function setStatus(element, level, message) {
  element.textContent = message;

  if (element === connectionStatus) {
    element.className = `status-line ${level}`;

    if (signalDot) {
      signalDot.className = `signal-dot ${level}`;
    }

    return;
  }

  element.className = `status ${level}`;
}

function requireDesktopBridge() {
  if (!desktopApp) {
    throw new Error("Desktop bridge failed to load. Restart the app.");
  }

  return desktopApp;
}

function addChatMessage(chat) {
  const row = document.createElement("article");
  row.className = `chat-row ${chat.type === "gift" ? "gift" : ""}`.trim();

  const timestamp = new Date(chat.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  row.innerHTML = `
    <div class="chat-meta">
      <strong>${escapeHtml(chat.nickname)}</strong>
      <span>@${escapeHtml(chat.user)}</span>
      ${chat.type === "gift" ? '<span class="chat-badge gift">Gift</span>' : ""}
      ${chat.isSubscriber ? '<span class="chat-badge">Subscriber</span>' : ""}
      ${chat.isModerator ? '<span class="chat-badge">Moderator</span>' : ""}
      ${chat.detectedLanguage ? `<span class="chat-badge subtle">${escapeHtml(chat.detectedLanguage.toUpperCase())}</span>` : ""}
      <time>${timestamp}</time>
    </div>
    <p>${escapeHtml(chat.displayMessage ?? chat.message)}</p>
  `;

  chatList.prepend(row);
  messageCount += 1;
  chatCount.textContent = `${messageCount} message${messageCount === 1 ? "" : "s"}`;
  queueChatForSpeech(chat);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setTtsStatus(level, message) {
  setStatus(ttsStatus, level, message);
}

function setTranslationStatus(level, message) {
  setStatus(translationStatus, level, message);
}

function updateRateLabel() {
  ttsRateValue.textContent = `${Number(ttsRateInput.value).toFixed(1)}x`;
}

function updatePitchLabel() {
  ttsPitchValue.textContent = `${Number(ttsPitchInput.value).toFixed(1)}x`;
}

function updateVolumeLabel() {
  ttsVolumeValue.textContent = `${Math.round(Number(ttsVolumeInput.value) * 100)}%`;
}

function getVoiceList() {
  return availableVoices;
}

function populateVoiceOptions(selectedVoice = "") {
  const voiceList = getVoiceList();
  const previousValue = selectedVoice || ttsVoiceSelect.value;
  ttsVoiceSelect.innerHTML = "";

  const systemOption = document.createElement("option");
  systemOption.value = "";
  systemOption.textContent = "System default voice";
  ttsVoiceSelect.append(systemOption);

  for (const voice of voiceList) {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.culture})`;
    ttsVoiceSelect.append(option);
  }

  ttsVoiceSelect.value = voiceList.some((voice) => voice.name === previousValue)
    ? previousValue
    : "";
}

function findPreferredVoice(styleName) {
  const preset = TTS_STYLE_PRESETS[styleName] ?? TTS_STYLE_PRESETS.natural;
  if (preset.preferredVoiceHints.length === 0) {
    return null;
  }

  const scoredVoices = availableVoices.map((voice) => {
    const haystack = `${voice.name} ${voice.culture} ${voice.gender}`.toLowerCase();
    const score = preset.preferredVoiceHints.reduce((total, hint) => {
      return total + (haystack.includes(hint) ? 1 : 0);
    }, 0);

    return { voice, score };
  });

  scoredVoices.sort((left, right) => right.score - left.score);
  return scoredVoices[0]?.score > 0 ? scoredVoices[0].voice : null;
}

function getSelectedVoice() {
  const explicitVoice =
    availableVoices.find((voice) => voice.name === currentSettings.ttsVoice) ?? null;

  return explicitVoice ?? findPreferredVoice(currentSettings.ttsStyle);
}

function createSpeechText(chat) {
  const messageText = chat.displayMessage ?? chat.message;

  if (chat.type === "gift") {
    return currentSettings.ttsIncludeUsername
      ? `${chat.nickname} sent ${chat.giftName}${chat.giftCount > 1 ? ` times ${chat.giftCount}` : ""}`
      : `Gift received: ${chat.giftName}${chat.giftCount > 1 ? ` times ${chat.giftCount}` : ""}`;
  }

  if (currentSettings.ttsIncludeUsername) {
    return `${chat.nickname} says ${messageText}`;
  }

  return messageText;
}

function shouldSpeakChat(chat) {
  if (chat.type === "gift" && !currentSettings.ttsReadGifts) {
    return false;
  }

  const audience = currentSettings.ttsAudience ?? {};

  if (audience.allViewers) {
    return true;
  }

  if (audience.subscribers && chat.isSubscriber) {
    return true;
  }

  if (audience.moderators && chat.isModerator) {
    return true;
  }

  return false;
}

function getAudienceSettingsFromForm() {
  return {
    allViewers: ttsAudienceAllInput.checked,
    subscribers: ttsAudienceSubscribersInput.checked,
    moderators: ttsAudienceModeratorsInput.checked
  };
}

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

async function speakNextMessage() {
  if (!currentSettings.ttsEnabled || isSpeaking || ttsQueue.length === 0) {
    return;
  }

  const nextText = ttsQueue.shift();
  if (!nextText) {
    return;
  }

  const selectedVoice = getSelectedVoice();
  const context = getAudioContext();

  try {
    const { filePath } = await requireDesktopBridge().speakToFile({
      text: nextText,
      voiceName: selectedVoice?.name ?? "",
      rate: currentSettings.ttsRate,
      pitch: currentSettings.ttsPitch
    });

    isSpeaking = true;
    setTtsStatus("info", "Reading chat aloud...");
    await context.resume();

    const audio = new Audio(encodeURI(`file:///${filePath.replace(/\\/g, "/")}`));
    currentAudio = audio;
    currentAudioSource = context.createMediaElementSource(audio);
    currentGainNode = context.createGain();
    currentGainNode.gain.value = Number(currentSettings.ttsVolume) || 1;
    currentAudioSource.connect(currentGainNode).connect(context.destination);

    const cleanup = async () => {
      try {
        currentAudioSource?.disconnect();
        currentGainNode?.disconnect();
      } catch {
        // Ignore cleanup errors during teardown.
      }

      currentAudio = null;
      currentAudioSource = null;
      currentGainNode = null;
      await requireDesktopBridge().deleteTtsFile(filePath);
    };

    audio.onended = async () => {
      isSpeaking = false;
      await cleanup();
      if (ttsQueue.length > 0) {
        speakNextMessage();
      } else {
        setTtsStatus("success", "TTS is on and waiting for the next chat message.");
      }
    };

    audio.onerror = async () => {
      isSpeaking = false;
      await cleanup();
      setTtsStatus("error", "TTS playback failed for the current message.");
      speakNextMessage();
    };

    await audio.play();
  } catch (error) {
    isSpeaking = false;
    setTtsStatus("error", "TTS playback failed for the current message.");
    speakNextMessage();
  }
}

function queueChatForSpeech(chat) {
  if (!currentSettings.ttsEnabled || !chat.message?.trim() || !shouldSpeakChat(chat)) {
    return;
  }

  ttsQueue.push(createSpeechText(chat));
  speakNextMessage();
}

function stopSpeechPlayback() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  ttsQueue.length = 0;
  isSpeaking = false;
}

async function persistSettings(partialSettings) {
  currentSettings = await requireDesktopBridge().saveSettings(partialSettings);
  return currentSettings;
}

function getTranslationSettingsFromForm() {
  return {
    translationEnabled: translationEnabledInput.checked,
    translationTargetLanguage: translationTargetLanguageSelect.value,
    translationProviderUrl: "google-free",
    translationApiKey: ""
  };
}

async function autoSaveTranslationSettings() {
  try {
    currentSettings = await requireDesktopBridge().saveSettings(getTranslationSettingsFromForm());

    if (currentSettings.translationEnabled) {
      setTranslationStatus("success", "Free online translation is on.");
    } else {
      setTranslationStatus("info", "Translation is off.");
    }
  } catch (error) {
    setTranslationStatus("error", error.message);
  }
}

function queueAutoSaveTranslationSettings() {
  setTranslationStatus("info", "Saving translation settings...");

  if (translationSaveTimer) {
    clearTimeout(translationSaveTimer);
  }

  translationSaveTimer = setTimeout(() => {
    translationSaveTimer = null;
    autoSaveTranslationSettings();
  }, 150);
}

async function maybeTranslateChat(chat) {
  if (!currentSettings.translationEnabled || chat.type === "gift") {
    return {
      ...chat,
      displayMessage: chat.message,
      detectedLanguage: null
    };
  }

  try {
    const result = await requireDesktopBridge().translateText({
      text: chat.message,
      targetLanguage: currentSettings.translationTargetLanguage,
      providerUrl: currentSettings.translationProviderUrl,
      apiKey: currentSettings.translationApiKey
    });

    setTranslationStatus(
      "success",
      `Translating chat to ${currentSettings.translationTargetLanguage.toUpperCase()} with free online translation.`
    );

    return {
      ...chat,
      displayMessage: result.translatedText,
      detectedLanguage: result.detectedLanguage
    };
  } catch (error) {
    setTranslationStatus("error", error.message);
    return {
      ...chat,
      displayMessage: chat.message,
      detectedLanguage: null
    };
  }
}

function getTtsSettingsFromForm() {
  return {
    ttsEnabled: ttsEnabledInput.checked,
    ttsVoice: ttsVoiceSelect.value,
    ttsStyle: ttsStyleSelect.value,
    ttsRate: Number(ttsRateInput.value),
    ttsPitch: Number(ttsPitchInput.value),
    ttsVolume: Number(ttsVolumeInput.value),
    ttsIncludeUsername: ttsIncludeUsernameInput.checked,
    ttsReadGifts: ttsReadGiftsInput.checked,
    ttsAudience: getAudienceSettingsFromForm()
  };
}

async function autoSaveTtsSettings() {
  try {
    await persistSettings(getTtsSettingsFromForm());

    if (!currentSettings.ttsEnabled) {
      stopSpeechPlayback();
      setTtsStatus("info", "TTS is off.");
    } else {
      setTtsStatus("success", "TTS settings saved automatically.");
    }
  } catch (error) {
    setTtsStatus("error", error.message);
  }
}

function queueAutoSaveTtsSettings() {
  setTtsStatus("info", "Saving TTS settings...");

  if (ttsSaveTimer) {
    clearTimeout(ttsSaveTimer);
  }

  ttsSaveTimer = setTimeout(() => {
    ttsSaveTimer = null;
    autoSaveTtsSettings();
  }, 150);
}

function syncTtsControls() {
  translationEnabledInput.checked = Boolean(currentSettings.translationEnabled);
  translationTargetLanguageSelect.value = currentSettings.translationTargetLanguage ?? "en";
  translationProviderUrlInput.value = "Google online translator";
  translationApiKeyInput.value = "";

  if (currentSettings.translationEnabled) {
    setTranslationStatus(
      "success",
      `Free online translation is on for ${translationTargetLanguageSelect.value.toUpperCase()}.`
    );
  } else {
    setTranslationStatus("info", "Translation is off.");
  }

  ttsEnabledInput.checked = Boolean(currentSettings.ttsEnabled);
  ttsIncludeUsernameInput.checked = currentSettings.ttsIncludeUsername !== false;
  ttsReadGiftsInput.checked = Boolean(currentSettings.ttsReadGifts);
  ttsAudienceAllInput.checked = currentSettings.ttsAudience?.allViewers !== false;
  ttsAudienceSubscribersInput.checked = Boolean(currentSettings.ttsAudience?.subscribers);
  ttsAudienceModeratorsInput.checked = Boolean(currentSettings.ttsAudience?.moderators);
  ttsStyleSelect.value = currentSettings.ttsStyle ?? "natural";
  ttsRateInput.value = String(Number(currentSettings.ttsRate) || 1);
  ttsPitchInput.value = String(Number(currentSettings.ttsPitch) || 1);
  ttsVolumeInput.value = String(Number(currentSettings.ttsVolume) || 1);
  updateRateLabel();
  updatePitchLabel();
  updateVolumeLabel();
  populateVoiceOptions(currentSettings.ttsVoice ?? "");

  if (currentSettings.ttsEnabled) {
    setTtsStatus("success", "TTS is on and waiting for the next chat message.");
  } else {
    setTtsStatus("info", "TTS is off.");
  }
}

async function autoSaveUsernameSettings() {
  try {
    currentSettings = await requireDesktopBridge().saveSettings({
      rememberUsername: rememberUsernameInput.checked,
      rememberedUsername: rememberUsernameInput.checked ? usernameInput.value.trim() : ""
    });
  } catch (error) {
    setStatus(connectionStatus, "error", error.message);
  }
}

connectForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setStatus(connectionStatus, "info", "Connecting...");

  try {
    await autoSaveUsernameSettings();
    const state = await requireDesktopBridge().connect(usernameInput.value);
    setStatus(
      connectionStatus,
      "success",
      `Connected to @${state.username} in room ${state.roomId}.`
    );
  } catch (error) {
    setStatus(connectionStatus, "error", error.message);
  }
});

rememberUsernameInput.addEventListener("change", () => {
  autoSaveUsernameSettings();
});

usernameInput.addEventListener("change", () => {
  if (rememberUsernameInput.checked) {
    autoSaveUsernameSettings();
  }
});

disconnectButton.addEventListener("click", async () => {
  try {
    await requireDesktopBridge().disconnect();
    setStatus(connectionStatus, "info", "Disconnected.");
  } catch (error) {
    setStatus(connectionStatus, "error", error.message);
  }
});

translationEnabledInput.addEventListener("change", queueAutoSaveTranslationSettings);
translationTargetLanguageSelect.addEventListener("change", queueAutoSaveTranslationSettings);

ttsRateInput.addEventListener("input", () => {
  updateRateLabel();
  queueAutoSaveTtsSettings();
});

ttsPitchInput.addEventListener("input", () => {
  updatePitchLabel();
  queueAutoSaveTtsSettings();
});

ttsVolumeInput.addEventListener("input", () => {
  updateVolumeLabel();
  queueAutoSaveTtsSettings();
});

ttsStyleSelect.addEventListener("change", () => {
  const preset = TTS_STYLE_PRESETS[ttsStyleSelect.value] ?? TTS_STYLE_PRESETS.natural;
  ttsRateInput.value = String(preset.rate);
  ttsPitchInput.value = String(preset.pitch);
  updateRateLabel();
  updatePitchLabel();
  queueAutoSaveTtsSettings();
});

ttsEnabledInput.addEventListener("change", queueAutoSaveTtsSettings);
ttsIncludeUsernameInput.addEventListener("change", queueAutoSaveTtsSettings);
ttsReadGiftsInput.addEventListener("change", queueAutoSaveTtsSettings);
ttsAudienceAllInput.addEventListener("change", queueAutoSaveTtsSettings);
ttsAudienceSubscribersInput.addEventListener("change", queueAutoSaveTtsSettings);
ttsAudienceModeratorsInput.addEventListener("change", queueAutoSaveTtsSettings);
ttsVoiceSelect.addEventListener("change", queueAutoSaveTtsSettings);

ttsTestButton.addEventListener("click", async () => {
  try {
    const previewSettings = await persistSettings(getTtsSettingsFromForm());

    stopSpeechPlayback();
    ttsQueue.push(
      previewSettings.ttsIncludeUsername
        ? `${TTS_STYLE_PRESETS[previewSettings.ttsStyle]?.label ?? "Voice"} mode is ready for TikTok chat.`
        : "TikTok text to speech is ready."
    );
    speakNextMessage();
  } catch (error) {
    setTtsStatus("error", error.message);
  }
});

if (desktopApp) {
  desktopApp.getAppVersion().then((version) => {
    if (appVersionLabel) {
      appVersionLabel.textContent = version;
    }
  });

  desktopApp.onChat(async (chat) => {
    const translatedChat = await maybeTranslateChat(chat);
    addChatMessage(translatedChat);
  });

  desktopApp.onStatus((status) => {
    setStatus(connectionStatus, status.level, status.message);
  });

  desktopApp.onUpdateStatus((status) => {
    setStatus(updateStatus, status.status === "error" ? "error" : "info", status.message);
  });

  desktopApp.getConnectionState().then((state) => {
    if (state.connected) {
      setStatus(
        connectionStatus,
        "success",
        `Connected to @${state.username} in room ${state.roomId}.`
      );
    }
  });

  desktopApp.getSettings().then((settings) => {
    currentSettings = {
      ...currentSettings,
      ...settings
    };
    usernameInput.value = currentSettings.rememberUsername
      ? currentSettings.rememberedUsername ?? ""
      : "";
    rememberUsernameInput.checked = Boolean(currentSettings.rememberUsername);
    syncTtsControls();
  });

  desktopApp.getTtsVoices().then((voices) => {
    availableVoices = voices ?? [];
    populateVoiceOptions(currentSettings.ttsVoice ?? "");
  });
} else {
  setStatus(connectionStatus, "error", "Desktop bridge failed to load. Restart the app.");
}
