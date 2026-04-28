const app = window.desktopApp;

// Header and global status
const connectionToast = document.getElementById("connection-status");
const connectionPill = document.getElementById("connection-pill");
const translationPill = document.getElementById("translation-pill");
const ttsPill = document.getElementById("tts-pill");
const appVersionLabel = document.getElementById("app-version");
const appVersionInline = document.getElementById("app-version-inline");
const updateStatus = document.getElementById("update-status");

// Connection controls
const connectForm = document.getElementById("connect-form");
const usernameInput = document.getElementById("username");
const connectButton = document.getElementById("connect-button");
const rememberUsernameInput = document.getElementById("remember-username");

// Chat layout
const chatCount = document.getElementById("chat-count");
const chatSearchInput = document.getElementById("chat-search");
const pauseScrollButton = document.getElementById("pause-scroll-button");
const clearChatButton = document.getElementById("clear-chat-button");
const exportChatButton = document.getElementById("export-chat-button");
const chatEmpty = document.getElementById("chat-empty");
const chatList = document.getElementById("chat-list");

// Sidebar tabs
const controlsTabButton = document.getElementById("controls-tab-button");
const eventActionsTabButton = document.getElementById("event-actions-tab-button");
const controlsTabPanel = document.getElementById("controls-tab-panel");
const eventActionsTabPanel = document.getElementById("event-actions-tab-panel");

// Stats
const statViewers = document.getElementById("stat-viewers");
const statMessagesPerMinute = document.getElementById("stat-messages-per-minute");
const statGifts = document.getElementById("stat-gifts");
const statFollowers = document.getElementById("stat-followers");

// Translation controls
const translationEnabledInput = document.getElementById("translation-enabled");
const translationTargetLanguageSelect = document.getElementById("translation-target-language");
const translationProviderUrlInput = document.getElementById("translation-provider-url");
const translationApiKeyInput = document.getElementById("translation-api-key");
const translationStatus = document.getElementById("translation-status");

// TTS controls
const ttsEnabledInput = document.getElementById("tts-enabled");
const ttsIncludeUsernameInput = document.getElementById("tts-include-username");
const ttsReadGiftsInput = document.getElementById("tts-read-gifts");
const ttsVoiceSelect = document.getElementById("tts-voice");
const ttsStyleSelect = document.getElementById("tts-style");
const ttsRateInput = document.getElementById("tts-rate");
const ttsPitchInput = document.getElementById("tts-pitch");
const ttsVolumeInput = document.getElementById("tts-volume");
const ttsRateValue = document.getElementById("tts-rate-value");
const ttsPitchValue = document.getElementById("tts-pitch-value");
const ttsVolumeValue = document.getElementById("tts-volume-value");
const ttsTestButton = document.getElementById("tts-test-button");
const ttsStatus = document.getElementById("tts-status");

// Audience filters
const ttsAudienceAllInput = document.getElementById("tts-audience-all");
const ttsAudienceSubscribersInput = document.getElementById("tts-audience-subscribers");
const ttsAudienceModeratorsInput = document.getElementById("tts-audience-moderators");
const ttsAudienceVipsInput = document.getElementById("tts-audience-vips");

// Custom event rules
const addCustomRuleButton = document.getElementById("add-custom-rule-button");
const customRuleList = document.getElementById("custom-rule-list");
const customRuleStatus = document.getElementById("custom-rule-status");

const MAX_CHAT_MESSAGES = 400;
const SEARCH_PREVIEW_LIMIT = 50;
const SAVE_DEBOUNCE_MS = 250;

const state = {
  settings: null,
  appVersion: "",
  connected: false,
  connecting: false,
  username: "",
  roomId: null,
  updateMessage: "Automatic updates are configured for GitHub Releases.",
  updateLevel: "info",
  activeTab: "controls",
  chatItems: [],
  chatSearch: "",
  pauseScroll: false,
  voices: [],
  audioContext: null,
  currentGainNode: null,
  soundCatalog: [],
  soundCatalogById: new Map(),
  soundCatalogLoaded: false,
  soundCatalogError: "",
  activeCustomRuleId: null,
  speechQueue: [],
  speaking: false,
  customRulePreviewAudio: null,
  customRuleTriggerCounts: new Map(),
  sessionMetrics: {
    follows: 0,
    likes: 0,
    shares: 0,
    coins: 0
  },
  sessionUserMetrics: {
    follows: new Map(),
    likes: new Map(),
    shares: new Map(),
    coins: new Map()
  },
  triggeredCustomRuleIds: new Set(),
  statState: {
    gifts: 0,
    followers: 0,
    chatTimestamps: []
  }
};

let toastTimer = null;
let saveSettingsTimer = null;

function createDefaultSettings() {
  return {
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
    },
    customEventRules: []
  };
}

function ensureSettingsShape(source = {}) {
  const defaults = createDefaultSettings();
  return {
    ...defaults,
    ...source,
    ttsAudience: {
      ...defaults.ttsAudience,
      ...(source?.ttsAudience ?? {})
    },
    customEventRules: Array.isArray(source?.customEventRules)
      ? source.customEventRules.map(normalizeRule).filter(Boolean)
      : []
  };
}

function normalizeRule(rule, index = 0) {
  if (!rule) {
    return null;
  }

    return {
      id: String(rule.id ?? `rule-${Date.now()}-${index}`),
      enabled: rule.enabled !== false,
      name: String(rule.name ?? `Custom rule ${index + 1}`).trim() || `Custom rule ${index + 1}`,
      metric: ["follows", "likes", "shares", "coins"].includes(rule.metric) ? rule.metric : "follows",
      scope: ["total", "perUser"].includes(rule.scope) ? rule.scope : "total",
      threshold: Math.max(1, Number(rule.threshold) || 1),
      soundId: String(rule.soundId ?? "").trim()
    };
  }

function createDraftRule() {
  return {
    id: `rule-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      enabled: true,
      name: `Custom rule ${state.settings.customEventRules.length + 1}`,
      metric: "follows",
      scope: "total",
      threshold: 1,
      soundId: ""
    };
  }

function getSettingsPayload() {
  return {
    rememberedUsername: state.settings.rememberUsername ? usernameInput.value.trim() : "",
    rememberUsername: rememberUsernameInput.checked,
    translationEnabled: translationEnabledInput.checked,
    translationTargetLanguage: translationTargetLanguageSelect.value,
    translationProviderUrl: state.settings.translationProviderUrl ?? "",
    translationApiKey: state.settings.translationApiKey ?? "",
    ttsEnabled: ttsEnabledInput.checked,
    ttsVoice: ttsVoiceSelect.value,
    ttsStyle: ttsStyleSelect.value,
    ttsRate: Number(ttsRateInput.value),
    ttsPitch: Number(ttsPitchInput.value),
    ttsVolume: Number(ttsVolumeInput.value),
    ttsIncludeUsername: ttsIncludeUsernameInput.checked,
    ttsReadGifts: ttsReadGiftsInput.checked,
    ttsAudience: {
      allViewers: ttsAudienceAllInput.checked,
      subscribers: ttsAudienceSubscribersInput.checked,
      moderators: ttsAudienceModeratorsInput.checked
    },
    customEventRules: state.settings.customEventRules.map(normalizeRule).filter(Boolean)
  };
}

async function persistSettings(partial = {}) {
  state.settings = ensureSettingsShape({
    ...state.settings,
    ...partial
  });

  const saved = await app.saveSettings({
    ...getSettingsPayload(),
    ...partial
  });

  state.settings = ensureSettingsShape(saved);
  renderCustomRules();
  updateHeaderPills();
}

function scheduleSettingsSave() {
  window.clearTimeout(saveSettingsTimer);
  saveSettingsTimer = window.setTimeout(() => {
    persistSettings().catch((error) => {
      showToast(error.message || "Unable to save settings.", "error");
    });
  }, SAVE_DEBOUNCE_MS);
}

function setConnectionUiState() {
  connectButton.textContent = state.connected ? "Disconnect" : state.connecting ? "Connecting..." : "Connect";
  connectButton.disabled = state.connecting;
  usernameInput.disabled = state.connecting || state.connected;
}

function updateHeaderPills() {
  connectionPill.textContent = state.connected ? `Connected${state.username ? ` @${state.username}` : ""}` : state.connecting ? "Connecting..." : "Disconnected";
  connectionPill.className = `status-pill ${state.connected ? "success" : state.connecting ? "accent" : "info"}`;

  const translationOn = translationEnabledInput.checked;
  translationPill.textContent = translationOn ? `Translation ${translationTargetLanguageSelect.value.toUpperCase()}` : "Translation Off";
  translationPill.className = `status-pill ${translationOn ? "accent" : "muted"}`;

  const ttsOn = ttsEnabledInput.checked;
  ttsPill.textContent = ttsOn ? "TTS On" : "TTS Off";
  ttsPill.className = `status-pill ${ttsOn ? "accent" : "muted"}`;
}

function setStatusMessage(element, level, message) {
  element.className = `status ${level}`;
  element.textContent = message;
}

function showToast(message, level = "info") {
  if (!message) {
    return;
  }

  connectionToast.textContent = message;
  connectionToast.className = `status-toast visible ${level}`;

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    connectionToast.classList.remove("visible");
  }, 4200);
}

function formatTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatCount(value, singular, plural = `${singular}s`) {
  const count = Number(value) || 0;
  return `${count} ${count === 1 ? singular : plural}`;
}

function updateRatePitchVolumeLabels() {
  ttsRateValue.textContent = `${Number(ttsRateInput.value).toFixed(1)}x`;
  ttsPitchValue.textContent = `${Number(ttsPitchInput.value).toFixed(1)}x`;
  ttsVolumeValue.textContent = `${Math.round(Number(ttsVolumeInput.value) * 100)}%`;
}

function updateTranslationStatus() {
  if (!translationEnabledInput.checked) {
    setStatusMessage(translationStatus, "info", "Translation is off.");
    return;
  }

  setStatusMessage(
    translationStatus,
    "success",
    `New chat messages will be translated to ${translationTargetLanguageSelect.options[translationTargetLanguageSelect.selectedIndex]?.text ?? translationTargetLanguageSelect.value}.`
  );
}

function updateTtsStatus() {
  if (!ttsEnabledInput.checked) {
    setStatusMessage(ttsStatus, "info", "TTS is off.");
    return;
  }

  const voiceLabel = ttsVoiceSelect.options[ttsVoiceSelect.selectedIndex]?.text ?? "Default voice";
  setStatusMessage(ttsStatus, "success", `TTS is on using ${voiceLabel}.`);
}

function updateUpdateStatus() {
  setStatusMessage(updateStatus, state.updateLevel, state.updateMessage);
}

function updateFooterVersion() {
  appVersionLabel.textContent = state.appVersion || "Unknown";
  appVersionInline.textContent = state.appVersion || "Unknown";
}

function setActiveTab(tabName) {
  state.activeTab = tabName;

  const controlsActive = tabName === "controls";
  controlsTabButton.classList.toggle("active", controlsActive);
  eventActionsTabButton.classList.toggle("active", !controlsActive);
  controlsTabPanel.classList.toggle("active", controlsActive);
  eventActionsTabPanel.classList.toggle("active", !controlsActive);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRoleBadges(item) {
  const badges = [];

  if (item.type === "gift") {
    badges.push(`<span class="chat-badge gift">Gift</span>`);
  } else if (item.type !== "chat") {
    badges.push(`<span class="chat-badge event">${escapeHtml(item.type)}</span>`);
  }

  if (item.isModerator) {
    badges.push(`<span class="chat-badge moderator">Moderator</span>`);
  }

  if (item.isSubscriber) {
    badges.push(`<span class="chat-badge">Subscriber</span>`);
  }

  if (item.detectedLanguage && item.detectedLanguage !== translationTargetLanguageSelect.value) {
    badges.push(`<span class="chat-badge subtle">${escapeHtml(item.detectedLanguage.toUpperCase())}</span>`);
  }

  return badges.join("");
}

function renderChatList() {
  const query = state.chatSearch.trim().toLowerCase();
  const items = query
    ? state.chatItems.filter((item) => {
        const haystack = [
          item.nickname,
          item.user,
          item.message,
          item.translatedText ?? ""
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
    : state.chatItems;

  chatCount.textContent = formatCount(items.length, "message");
  chatEmpty.hidden = items.length > 0;

  if (items.length === 0) {
    chatList.innerHTML = "";
    return;
  }

  chatList.innerHTML = items
    .map((item) => {
      const bodyText = item.translatedText
        ? `${escapeHtml(item.message)}<br /><span class="chat-handle">${escapeHtml(item.translatedText)}</span>`
        : escapeHtml(item.message);

      return `
        <article class="chat-row ${escapeHtml(item.type)}" data-id="${escapeHtml(item.id)}">
          <div class="chat-card-head">
            <div class="chat-identity">
              <strong>${escapeHtml(item.nickname || item.user || "Unknown user")}</strong>
              <span class="chat-handle">@${escapeHtml(item.user || "unknown")}</span>
            </div>
            <div class="chat-meta">
              <span>${escapeHtml(formatTimestamp(item.timestamp))}</span>
              ${getRoleBadges(item)}
            </div>
          </div>
          <p>${bodyText}</p>
        </article>
      `;
    })
    .join("");

  if (!state.pauseScroll) {
    chatList.scrollTop = chatList.scrollHeight;
  }
}

function updateMessagesPerMinute() {
  const now = Date.now();
  state.statState.chatTimestamps = state.statState.chatTimestamps.filter((timestamp) => now - timestamp < 60_000);
  statMessagesPerMinute.textContent = String(state.statState.chatTimestamps.length);
}

function updateStats() {
  statViewers.textContent = state.connected ? "LIVE" : "--";
  statGifts.textContent = String(state.statState.gifts);
  statFollowers.textContent = String(state.statState.followers);
  updateMessagesPerMinute();
}

function resetSessionMetrics() {
  state.sessionMetrics = {
    follows: 0,
    likes: 0,
    shares: 0,
    coins: 0
  };
  state.sessionUserMetrics = {
    follows: new Map(),
    likes: new Map(),
    shares: new Map(),
    coins: new Map()
  };
  state.triggeredCustomRuleIds = new Set();
  state.customRuleTriggerCounts = new Map();
  state.statState = {
    gifts: 0,
    followers: 0,
    chatTimestamps: []
  };
  updateStats();
}

async function ensureSoundCatalog() {
  if (state.soundCatalogLoaded) {
    return;
  }

  try {
    const catalog = await app.getSoundAlertCatalog(false);
    state.soundCatalog = Array.isArray(catalog) ? catalog : [];
    state.soundCatalogById = new Map(state.soundCatalog.map((sound) => [sound.id, sound]));
    state.soundCatalogLoaded = true;
    state.soundCatalogError = "";
    renderCustomRules();
  } catch (error) {
    state.soundCatalogError = error.message || "Unable to load the sound library.";
    setStatusMessage(customRuleStatus, "error", state.soundCatalogError);
  }
}

function getSoundOptionList(search = "", selectedSoundId = "") {
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = normalizedSearch
    ? state.soundCatalog.filter((sound) => sound.title.toLowerCase().includes(normalizedSearch))
    : state.soundCatalog;

  const selectedSound = selectedSoundId ? state.soundCatalogById.get(selectedSoundId) : null;
  const limited = filtered.slice(0, SEARCH_PREVIEW_LIMIT);

  if (selectedSound && !limited.some((sound) => sound.id === selectedSound.id)) {
    limited.unshift(selectedSound);
  }

  return limited;
}

async function ensureAudioContext() {
  if (!state.audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error("This system does not support web audio playback.");
    }

    state.audioContext = new AudioContextClass();
  }

  if (state.audioContext.state === "suspended") {
    await state.audioContext.resume();
  }
}

async function playAudioUrl(audioUrl, volume = Number(ttsVolumeInput.value) || 1) {
  await ensureAudioContext();

  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error(`Unable to fetch audio (${response.status}).`);
  }

  const bytes = await response.arrayBuffer();
  const buffer = await state.audioContext.decodeAudioData(bytes.slice(0));

  return new Promise((resolve) => {
    const source = state.audioContext.createBufferSource();
    const gainNode = state.audioContext.createGain();
    gainNode.gain.value = volume;
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(state.audioContext.destination);
    source.onended = resolve;
    source.start(0);
  });
}

async function previewCustomRuleSound(ruleId) {
  const rule = state.settings.customEventRules.find((item) => item.id === ruleId);
  const searchInput = document.querySelector(`[data-rule-sound-search="${ruleId}"]`);
  const soundSelect = document.querySelector(`[data-rule-sound-select="${ruleId}"]`);
  const soundId = soundSelect?.value ?? rule?.soundId ?? "";

  if (!soundId) {
    showToast("Choose a sound to preview first.", "info");
    searchInput?.focus();
    return;
  }

  try {
    const { audioUrl } = await app.resolveSoundAlertAudio(soundId);
    await playAudioUrl(audioUrl, 1);
  } catch (error) {
    showToast(error.message || "Unable to preview that sound.", "error");
  }
}

async function triggerCustomRule(rule) {
  if (!rule?.soundId) {
    return;
  }

  try {
    const { audioUrl } = await app.resolveSoundAlertAudio(rule.soundId);
    await playAudioUrl(audioUrl, 1);
  } catch (error) {
    showToast(error.message || `Unable to play the sound for "${rule.name}".`, "error");
  }
}

function renderCustomRules() {
  const rules = state.settings.customEventRules;

  if (!rules.length) {
    customRuleList.innerHTML = "";
    if (state.soundCatalogError) {
      setStatusMessage(customRuleStatus, "error", state.soundCatalogError);
    } else if (!state.soundCatalogLoaded) {
      setStatusMessage(customRuleStatus, "info", "Loading sound library for custom rules...");
    } else {
      setStatusMessage(customRuleStatus, "info", "No custom trigger rules yet.");
    }
    return;
  }

  const cards = rules.map((rule) => {
    const isEditing = state.activeCustomRuleId === rule.id;
    const options = getSoundOptionList("", rule.soundId);
    const optionsMarkup = options
      .map((sound) => `<option value="${escapeHtml(sound.id)}" ${sound.id === rule.soundId ? "selected" : ""}>${escapeHtml(sound.title)}</option>`)
      .join("");
    const selectedSound = rule.soundId ? state.soundCatalogById.get(rule.soundId) : null;

    if (!isEditing) {
      return `
        <article class="custom-rule-card" data-rule-id="${escapeHtml(rule.id)}">
          <div class="custom-rule-top">
            <div>
              <strong>${escapeHtml(rule.name)}</strong>
                <p class="helper-text">
                Trigger when ${escapeHtml(rule.scope === "perUser" ? "per-user" : "total")} ${escapeHtml(rule.metric)} reaches ${escapeHtml(String(rule.threshold))}${selectedSound ? ` using ${escapeHtml(selectedSound.title)}` : ""}.
                </p>
              </div>
              <div class="custom-rule-top-actions">
                <label class="toggle-switch compact-switch custom-inline-toggle" title="Enable or disable this rule">
                  <input type="checkbox" data-custom-toggle="${escapeHtml(rule.id)}" ${rule.enabled ? "checked" : ""} />
                  <span class="switch-ui"></span>
                  <span class="sr-only">${rule.enabled ? "Disable" : "Enable"} ${escapeHtml(rule.name)}</span>
                </label>
                <span class="status-pill ${rule.enabled ? "success" : "muted"}">${rule.enabled ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
            <div class="custom-rule-actions">
              <button type="button" class="ghost icon-button" data-custom-edit="${escapeHtml(rule.id)}" title="Edit rule" aria-label="Edit rule">&#9998;</button>
              <button type="button" class="ghost icon-button" data-custom-preview="${escapeHtml(rule.id)}" title="Preview sound" aria-label="Preview sound">&#9654;</button>
              <button type="button" class="ghost icon-button danger-icon-button" data-custom-delete="${escapeHtml(rule.id)}" title="Delete rule" aria-label="Delete rule">&#128465;</button>
            </div>
          </article>
        `;
      }

    return `
      <article class="custom-rule-card" data-rule-id="${escapeHtml(rule.id)}">
          <div class="custom-rule-top">
            <div>
              <strong>Editing custom action</strong>
              <p class="helper-text">Set the threshold, sound, and enabled state before saving this rule.</p>
            </div>
            <button type="button" class="ghost icon-button" data-custom-collapse="${escapeHtml(rule.id)}" title="Close editor" aria-label="Close editor">&#10005;</button>
          </div>

        <div class="custom-rule-grid">
          <label class="field">
            <span>Rule name</span>
            <input data-rule-name="${escapeHtml(rule.id)}" value="${escapeHtml(rule.name)}" autocomplete="off" />
          </label>

          <label class="field">
            <span>Metric</span>
            <select data-rule-metric="${escapeHtml(rule.id)}">
              <option value="follows" ${rule.metric === "follows" ? "selected" : ""}>Follows</option>
              <option value="likes" ${rule.metric === "likes" ? "selected" : ""}>Likes</option>
              <option value="shares" ${rule.metric === "shares" ? "selected" : ""}>Shares</option>
              <option value="coins" ${rule.metric === "coins" ? "selected" : ""}>Coins</option>
            </select>
          </label>

            <label class="field">
              <span>Threshold</span>
              <input data-rule-threshold="${escapeHtml(rule.id)}" type="number" min="1" step="1" value="${escapeHtml(String(rule.threshold))}" />
            </label>

            <label class="field">
              <span>Scope</span>
              <select data-rule-scope="${escapeHtml(rule.id)}">
                <option value="total" ${rule.scope === "total" ? "selected" : ""}>Total for all users</option>
                <option value="perUser" ${rule.scope === "perUser" ? "selected" : ""}>Per user</option>
              </select>
            </label>

            <label class="toggle-switch compact-switch custom-edit-toggle">
              <input data-rule-enabled-toggle="${escapeHtml(rule.id)}" type="checkbox" ${rule.enabled ? "checked" : ""} />
              <span class="switch-ui"></span>
              <span class="switch-copy">
                <strong>Enabled</strong>
                <small>Turn this rule on or off before saving.</small>
              </span>
            </label>

            <label class="field">
              <span>Search sounds</span>
              <input data-rule-sound-search="${escapeHtml(rule.id)}" placeholder="Search sound library" autocomplete="off" />
          </label>

          <label class="field">
            <span>Sound</span>
            <select data-rule-sound-select="${escapeHtml(rule.id)}">
              <option value="">Choose a sound</option>
              ${optionsMarkup}
            </select>
          </label>
        </div>

          <div class="custom-rule-actions">
            <button type="button" class="ghost icon-button" data-custom-preview="${escapeHtml(rule.id)}" title="Preview sound" aria-label="Preview sound">&#9654;</button>
            <button type="button" class="ghost icon-button danger-icon-button" data-custom-delete="${escapeHtml(rule.id)}" title="Delete rule" aria-label="Delete rule">&#128465;</button>
            <button type="button" class="icon-button save-icon-button" data-custom-save="${escapeHtml(rule.id)}" title="Save rule" aria-label="Save rule">&#10003;</button>
          </div>
        </article>
      `;
  });

  customRuleList.innerHTML = cards.join("");

  if (state.soundCatalogError) {
    setStatusMessage(customRuleStatus, "error", state.soundCatalogError);
  } else if (!state.soundCatalogLoaded) {
    setStatusMessage(customRuleStatus, "info", "Loading sound library for custom rules...");
  } else {
    setStatusMessage(customRuleStatus, "success", `${rules.length} custom event ${rules.length === 1 ? "action" : "actions"} ready.`);
  }
}

function refreshRuleSoundOptions(ruleId, searchText) {
  const select = document.querySelector(`[data-rule-sound-select="${ruleId}"]`);
  const rule = state.settings.customEventRules.find((item) => item.id === ruleId);
  if (!select || !rule) {
    return;
  }

  const options = getSoundOptionList(searchText, rule.soundId);
  const optionsMarkup = options
    .map((sound) => `<option value="${escapeHtml(sound.id)}" ${sound.id === rule.soundId ? "selected" : ""}>${escapeHtml(sound.title)}</option>`)
    .join("");

  select.innerHTML = `<option value="">Choose a sound</option>${optionsMarkup}`;
  if (rule.soundId) {
    select.value = rule.soundId;
  }
}

function focusCustomRuleEditor(ruleId) {
  window.requestAnimationFrame(() => {
    const card = document.querySelector(`[data-rule-id="${ruleId}"]`);
    const nameInput = document.querySelector(`[data-rule-name="${ruleId}"]`);

    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    nameInput?.focus();
    nameInput?.select();
  });
}

function incrementUserMetric(metric, userId, amount) {
  const normalizedMetric = ["follows", "likes", "shares", "coins"].includes(metric) ? metric : null;
  const normalizedUserId = String(userId ?? "").trim().toLowerCase();
  const safeAmount = Number(amount) || 0;

  if (!normalizedMetric || !normalizedUserId || safeAmount <= 0) {
    return;
  }

  const metricMap = state.sessionUserMetrics[normalizedMetric];
  const currentValue = metricMap.get(normalizedUserId) ?? 0;
  metricMap.set(normalizedUserId, currentValue + safeAmount);
}

function clearRuleTriggerState(ruleId) {
  state.triggeredCustomRuleIds.delete(ruleId);
  state.customRuleTriggerCounts.delete(ruleId);

  for (const key of Array.from(state.customRuleTriggerCounts.keys())) {
    if (key.startsWith(`${ruleId}:`)) {
      state.customRuleTriggerCounts.delete(key);
    }
  }
}

function shouldSpeakChatItem(item) {
  if (!ttsEnabledInput.checked) {
    return false;
  }

  if (item.type === "gift") {
    return ttsReadGiftsInput.checked;
  }

  if (item.type !== "chat") {
    return false;
  }

  if (ttsAudienceAllInput.checked) {
    return true;
  }

  if (ttsAudienceSubscribersInput.checked && item.isSubscriber) {
    return true;
  }

  if (ttsAudienceModeratorsInput.checked && item.isModerator) {
    return true;
  }

  return false;
}

function buildSpeechText(item) {
  if (item.type === "gift") {
    if (ttsIncludeUsernameInput.checked) {
      return `${item.nickname} ${item.message}`;
    }
    return item.message;
  }

  const body = item.translatedText || item.message;
  if (ttsIncludeUsernameInput.checked) {
    return `${item.nickname} says ${body}`;
  }

  return body;
}

function getStyleAdjustedPitch() {
  const basePitch = Number(ttsPitchInput.value) || 1;
  switch (ttsStyleSelect.value) {
    case "protocol":
      return Math.min(1.8, basePitch + 0.2);
    case "dark":
      return Math.max(0.5, basePitch - 0.2);
    case "announcer":
      return Math.min(1.8, basePitch + 0.1);
    case "tinybot":
      return Math.min(1.8, basePitch + 0.35);
    default:
      return basePitch;
  }
}

function getStyleAdjustedRate() {
  const baseRate = Number(ttsRateInput.value) || 1;
  switch (ttsStyleSelect.value) {
    case "protocol":
      return Math.min(1.5, baseRate + 0.1);
    case "dark":
      return Math.max(0.7, baseRate - 0.1);
    case "announcer":
      return Math.min(1.5, baseRate + 0.15);
    case "tinybot":
      return Math.min(1.5, baseRate + 0.2);
    default:
      return baseRate;
  }
}

function enqueueSpeech(text) {
  if (!text) {
    return;
  }

  state.speechQueue.push(text);
  void processSpeechQueue();
}

async function processSpeechQueue() {
  if (state.speaking || !state.speechQueue.length) {
    return;
  }

  state.speaking = true;

  while (state.speechQueue.length) {
    const text = state.speechQueue.shift();

    try {
      const result = await app.speakToFile({
        text,
        voiceName: ttsVoiceSelect.value,
        rate: getStyleAdjustedRate(),
        pitch: getStyleAdjustedPitch()
      });

      const fileUrl = new URL(`file://${result.filePath.replaceAll("\\", "/")}`).toString();
      await playAudioUrl(fileUrl, Number(ttsVolumeInput.value) || 1);
      await app.deleteTtsFile(result.filePath);
    } catch (error) {
      showToast(error.message || "Unable to play TTS audio.", "error");
      break;
    }
  }

  state.speaking = false;
}

async function translateChatItem(item) {
  if (!translationEnabledInput.checked || item.type !== "chat" || !item.message?.trim()) {
    return item;
  }

  try {
    const result = await app.translateText({
      text: item.message,
      targetLanguage: translationTargetLanguageSelect.value,
      providerUrl: "google-free"
    });

    return {
      ...item,
      translatedText: result.translatedText,
      detectedLanguage: result.detectedLanguage
    };
  } catch (error) {
    setStatusMessage(translationStatus, "error", error.message || "Translation failed.");
    return item;
  }
}

async function handleIncomingChat(payload) {
  const item = await translateChatItem({
    ...payload,
    translatedText: payload.translatedText ?? "",
    detectedLanguage: payload.detectedLanguage ?? null
  });

  if (item.type === "chat") {
    state.statState.chatTimestamps.push(Date.now());
  }

  if (item.type === "gift") {
    const giftCount = Math.max(1, Number(item.giftCount) || 1);
    const totalCoins = Math.max(0, Number(item.totalCoins) || 0);
    state.statState.gifts += giftCount;
    state.sessionMetrics.coins += totalCoins;
    incrementUserMetric("coins", item.user, totalCoins);
  }

  if (item.type === "follow") {
    state.statState.followers += 1;
    state.sessionMetrics.follows += 1;
    incrementUserMetric("follows", item.user, 1);
  }

  if (item.type === "share") {
    state.sessionMetrics.shares += 1;
    incrementUserMetric("shares", item.user, 1);
  }

  if (item.type === "like") {
    const likeIncrement = Math.max(0, Number(item.likeCount) || 0);
    if (Number(item.totalLikeCount) > 0) {
      state.sessionMetrics.likes = Math.max(state.sessionMetrics.likes, Number(item.totalLikeCount));
    } else {
      state.sessionMetrics.likes += likeIncrement;
    }
    incrementUserMetric("likes", item.user, likeIncrement);
  }

  state.chatItems.unshift(item);
  if (state.chatItems.length > MAX_CHAT_MESSAGES) {
    state.chatItems.length = MAX_CHAT_MESSAGES;
  }

  renderChatList();
  updateStats();
  checkCustomRules();

  if (shouldSpeakChatItem(item)) {
    enqueueSpeech(buildSpeechText(item));
  }
}

function checkCustomRules() {
  for (const rule of state.settings.customEventRules) {
    if (!rule.enabled) {
      continue;
    }

    const threshold = Math.max(1, Number(rule.threshold) || 1);
    const scope = rule.scope === "perUser" ? "perUser" : "total";

    if (scope === "perUser") {
      const metricMap = state.sessionUserMetrics[rule.metric];
      for (const [userId, value] of metricMap.entries()) {
        if (value < threshold) {
          continue;
        }

        const triggerKey = `${rule.id}:${userId}`;
        const previousCount = state.customRuleTriggerCounts.get(triggerKey) ?? 0;
        const currentCount = Math.floor(value / threshold);

        if (currentCount <= previousCount) {
          continue;
        }

        state.customRuleTriggerCounts.set(triggerKey, currentCount);

        for (let triggerIndex = previousCount; triggerIndex < currentCount; triggerIndex += 1) {
          showToast(`Custom action triggered: ${rule.name} for @${userId}`, "success");
          void triggerCustomRule(rule);
        }
      }

      continue;
    }

    const value = Number(state.sessionMetrics[rule.metric] ?? 0);
    if (value < threshold) {
      continue;
    }

    const previousCount = state.customRuleTriggerCounts.get(rule.id) ?? 0;
    const currentCount = Math.floor(value / threshold);

    if (currentCount <= previousCount) {
      continue;
    }

    state.customRuleTriggerCounts.set(rule.id, currentCount);

    for (let triggerIndex = previousCount; triggerIndex < currentCount; triggerIndex += 1) {
      showToast(`Custom action triggered: ${rule.name}`, "success");
      void triggerCustomRule(rule);
    }
  }
}

async function loadVoices() {
  try {
    const voices = await app.getTtsVoices();
    state.voices = Array.isArray(voices) ? voices : [];
  } catch (error) {
    state.voices = [];
    setStatusMessage(ttsStatus, "error", error.message || "Unable to load voices.");
  }

  const selectedVoice = state.settings.ttsVoice;
  const options = state.voices.map((voice) => {
    const label = `${voice.name}${voice.culture ? ` (${voice.culture})` : ""}`;
    return `<option value="${escapeHtml(voice.name)}">${escapeHtml(label)}</option>`;
  });

  ttsVoiceSelect.innerHTML = `<option value="">Default system voice</option>${options.join("")}`;
  if (selectedVoice && state.voices.some((voice) => voice.name === selectedVoice)) {
    ttsVoiceSelect.value = selectedVoice;
  }
}

function applySettingsToUi() {
  const settings = state.settings;

  rememberUsernameInput.checked = settings.rememberUsername;
  usernameInput.value = settings.rememberUsername ? settings.rememberedUsername ?? "" : settings.rememberedUsername ? settings.rememberedUsername : usernameInput.value;

  translationEnabledInput.checked = settings.translationEnabled;
  translationTargetLanguageSelect.value = settings.translationTargetLanguage;
  translationProviderUrlInput.value = "Google online translator";
  translationApiKeyInput.value = "Free built-in mode";

  ttsEnabledInput.checked = settings.ttsEnabled;
  ttsIncludeUsernameInput.checked = settings.ttsIncludeUsername;
  ttsReadGiftsInput.checked = settings.ttsReadGifts;
  ttsStyleSelect.value = settings.ttsStyle;
  ttsRateInput.value = String(settings.ttsRate);
  ttsPitchInput.value = String(settings.ttsPitch);
  ttsVolumeInput.value = String(settings.ttsVolume);

  ttsAudienceAllInput.checked = settings.ttsAudience.allViewers;
  ttsAudienceSubscribersInput.checked = settings.ttsAudience.subscribers;
  ttsAudienceModeratorsInput.checked = settings.ttsAudience.moderators;
  ttsAudienceVipsInput.checked = false;

  updateRatePitchVolumeLabels();
  updateTranslationStatus();
  updateTtsStatus();
  updateHeaderPills();
  renderCustomRules();
}

function exportChat() {
  if (!state.chatItems.length) {
    showToast("There is no chat to export yet.", "info");
    return;
  }

  const lines = state.chatItems
    .slice()
    .reverse()
    .map((item) => `[${formatTimestamp(item.timestamp)}] ${item.nickname} (@${item.user}): ${item.translatedText || item.message}`);

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `stream-sync-pro-live-chat-${Date.now()}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function clearChat() {
  state.chatItems = [];
  renderChatList();
  showToast("Chat feed cleared.", "info");
}

function wireHeaderEvents() {
  connectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (state.connected) {
      try {
        state.connecting = true;
        setConnectionUiState();
        await app.disconnect();
        state.connected = false;
        state.username = "";
        state.roomId = null;
        resetSessionMetrics();
        updateHeaderPills();
        setConnectionUiState();
        showToast("Disconnected from TikTok LIVE.", "info");
      } catch (error) {
        showToast(error.message || "Unable to disconnect.", "error");
      } finally {
        state.connecting = false;
        setConnectionUiState();
      }
      return;
    }

    const username = usernameInput.value.trim().replace(/^@/, "");
    if (!username) {
      showToast("Enter a TikTok username.", "error");
      usernameInput.focus();
      return;
    }

    try {
      state.connecting = true;
      state.username = username;
      setConnectionUiState();
      updateHeaderPills();
      await persistSettings({
        rememberUsername: rememberUsernameInput.checked,
        rememberedUsername: rememberUsernameInput.checked ? username : ""
      });
      const result = await app.connect(username);
      state.connected = Boolean(result.connected);
      state.username = result.username ?? username;
      state.roomId = result.roomId ?? null;
      resetSessionMetrics();
      updateHeaderPills();
      showToast(`Connected to @${state.username}.`, "success");
    } catch (error) {
      state.connected = false;
      updateHeaderPills();
      showToast(error.message || "Unable to connect.", "error");
    } finally {
      state.connecting = false;
      setConnectionUiState();
      updateStats();
    }
  });

  rememberUsernameInput.addEventListener("change", () => {
    scheduleSettingsSave();
  });

  usernameInput.addEventListener("input", () => {
    if (rememberUsernameInput.checked) {
      scheduleSettingsSave();
    }
  });
}

function wireChatToolbarEvents() {
  chatSearchInput.addEventListener("input", () => {
    state.chatSearch = chatSearchInput.value;
    renderChatList();
  });

  pauseScrollButton.addEventListener("click", () => {
    state.pauseScroll = !state.pauseScroll;
    pauseScrollButton.textContent = state.pauseScroll ? "Resume Scroll" : "Pause Scroll";
  });

  clearChatButton.addEventListener("click", clearChat);
  exportChatButton.addEventListener("click", exportChat);
}

function wireTabEvents() {
  controlsTabButton.addEventListener("click", () => setActiveTab("controls"));
  eventActionsTabButton.addEventListener("click", () => setActiveTab("event-actions"));
}

function wireSettingsEvents() {
  [
    translationEnabledInput,
    translationTargetLanguageSelect,
    ttsEnabledInput,
    ttsIncludeUsernameInput,
    ttsReadGiftsInput,
    ttsVoiceSelect,
    ttsStyleSelect,
    ttsRateInput,
    ttsPitchInput,
    ttsVolumeInput,
    ttsAudienceAllInput,
    ttsAudienceSubscribersInput,
    ttsAudienceModeratorsInput
  ].forEach((element) => {
    element.addEventListener("change", () => {
      updateRatePitchVolumeLabels();
      updateTranslationStatus();
      updateTtsStatus();
      updateHeaderPills();
      scheduleSettingsSave();
    });
  });

  ttsRateInput.addEventListener("input", updateRatePitchVolumeLabels);
  ttsPitchInput.addEventListener("input", updateRatePitchVolumeLabels);
  ttsVolumeInput.addEventListener("input", updateRatePitchVolumeLabels);

  ttsTestButton.addEventListener("click", () => {
    enqueueSpeech("Stream Sync Pro LIVE voice test.");
  });
}

function wireCustomRuleEvents() {
  addCustomRuleButton.addEventListener("click", async () => {
    await ensureSoundCatalog();
    const nextRule = createDraftRule();
    state.settings.customEventRules = [...state.settings.customEventRules, nextRule];
    state.activeCustomRuleId = nextRule.id;
    setActiveTab("event-actions");
    renderCustomRules();
    focusCustomRuleEditor(nextRule.id);
  });

  customRuleList.addEventListener("click", async (event) => {
    const target = event.target.closest("button");
    if (!target) {
      return;
    }

      const editId = target.dataset.customEdit;
      if (editId) {
        state.activeCustomRuleId = editId;
        renderCustomRules();
        focusCustomRuleEditor(editId);
        return;
      }

    const collapseId = target.dataset.customCollapse;
    if (collapseId) {
      state.activeCustomRuleId = null;
      renderCustomRules();
      return;
    }

    const previewId = target.dataset.customPreview;
    if (previewId) {
      await ensureSoundCatalog();
      await previewCustomRuleSound(previewId);
      return;
    }

    const deleteId = target.dataset.customDelete;
      if (deleteId) {
        state.settings.customEventRules = state.settings.customEventRules.filter((rule) => rule.id !== deleteId);
        clearRuleTriggerState(deleteId);
        if (state.activeCustomRuleId === deleteId) {
          state.activeCustomRuleId = null;
        }
        await persistSettings({ customEventRules: state.settings.customEventRules });
      showToast("Custom event action deleted.", "info");
      return;
    }

    const saveId = target.dataset.customSave;
    if (saveId) {
      const ruleIndex = state.settings.customEventRules.findIndex((rule) => rule.id === saveId);
      if (ruleIndex === -1) {
        return;
      }

      const nameInput = document.querySelector(`[data-rule-name="${saveId}"]`);
      const metricSelect = document.querySelector(`[data-rule-metric="${saveId}"]`);
      const thresholdInput = document.querySelector(`[data-rule-threshold="${saveId}"]`);
      const scopeSelect = document.querySelector(`[data-rule-scope="${saveId}"]`);
      const enabledToggle = document.querySelector(`[data-rule-enabled-toggle="${saveId}"]`);
      const soundSelect = document.querySelector(`[data-rule-sound-select="${saveId}"]`);

      const updatedRule = normalizeRule({
        ...state.settings.customEventRules[ruleIndex],
        name: nameInput?.value ?? "",
        metric: metricSelect?.value ?? "follows",
        scope: scopeSelect?.value ?? "total",
        threshold: Number(thresholdInput?.value ?? 1),
        enabled: Boolean(enabledToggle?.checked),
        soundId: soundSelect?.value ?? ""
      });

      state.settings.customEventRules = state.settings.customEventRules.map((rule) =>
        rule.id === saveId ? updatedRule : rule
      );
      state.activeCustomRuleId = null;
      clearRuleTriggerState(saveId);
      await persistSettings({ customEventRules: state.settings.customEventRules });
      showToast("Custom event action saved.", "success");
    }
  });

  customRuleList.addEventListener("input", (event) => {
    const searchId = event.target.dataset.ruleSoundSearch;
    if (!searchId) {
      return;
    }

    refreshRuleSoundOptions(searchId, event.target.value);
  });

  customRuleList.addEventListener("change", async (event) => {
    const toggleId = event.target.dataset.customToggle;
    if (!toggleId) {
      return;
    }

    const nextEnabled = Boolean(event.target.checked);
    state.settings.customEventRules = state.settings.customEventRules.map((rule) =>
      rule.id === toggleId ? { ...rule, enabled: nextEnabled } : rule
    );
    clearRuleTriggerState(toggleId);
    await persistSettings({ customEventRules: state.settings.customEventRules });
    showToast(`Custom action ${nextEnabled ? "enabled" : "disabled"}.`, "success");
  });
}

function wireAppEvents() {
  app.onStatus((payload) => {
    const level = payload?.level === "error" ? "error" : payload?.level === "success" ? "success" : "info";
    showToast(payload?.message || "Connection status updated.", level);
  });

  app.onUpdateStatus((payload) => {
    state.updateLevel = payload?.status === "error"
      ? "error"
      : payload?.status === "current" || payload?.status === "downloaded" || payload?.status === "ready"
        ? "success"
        : "info";
    state.updateMessage = payload?.message || "Automatic updates are configured for GitHub Releases.";
    updateUpdateStatus();
  });

  app.onChat((payload) => {
    void handleIncomingChat(payload);
  });
}

async function initializeApp() {
  const [settings, appVersion, connectionState] = await Promise.all([
    app.getSettings(),
    app.getAppVersion(),
    app.getConnectionState()
  ]);

  state.settings = ensureSettingsShape(settings);
  state.appVersion = appVersion;
  state.connected = Boolean(connectionState?.connected);
  state.username = connectionState?.username ?? "";
  state.roomId = connectionState?.roomId ?? null;

  applySettingsToUi();
  updateFooterVersion();
  setConnectionUiState();
  updateStats();

  if (!state.connected && state.settings.rememberUsername && state.settings.rememberedUsername) {
    usernameInput.value = state.settings.rememberedUsername;
  }

  await Promise.all([
    loadVoices(),
    ensureSoundCatalog()
  ]);

  updateTtsStatus();
  updateTranslationStatus();
  updateUpdateStatus();
  renderChatList();
}

wireHeaderEvents();
wireChatToolbarEvents();
wireTabEvents();
wireSettingsEvents();
wireCustomRuleEvents();
wireAppEvents();
setActiveTab("controls");
updateRatePitchVolumeLabels();
updateUpdateStatus();
setConnectionUiState();

initializeApp().catch((error) => {
  showToast(error.message || "The app could not be initialized.", "error");
});
