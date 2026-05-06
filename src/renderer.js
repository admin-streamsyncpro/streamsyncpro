const app = window.desktopApp;

// Auth shell
const authShell = document.getElementById("auth-shell");
const dashboardShell = document.getElementById("dashboard-shell");
const authStatus = document.getElementById("auth-status");
const signinTabButton = document.getElementById("signin-tab-button");
const registerTabButton = document.getElementById("register-tab-button");
const verifyTabButton = document.getElementById("verify-tab-button");
const resetTabButton = document.getElementById("reset-tab-button");
const signinForm = document.getElementById("signin-form");
const registerForm = document.getElementById("register-form");
const verifyForm = document.getElementById("verify-form");
const resetForm = document.getElementById("reset-form");
const signinEmailInput = document.getElementById("signin-email");
const signinPasswordInput = document.getElementById("signin-password");
const signinRememberMeInput = document.getElementById("signin-remember-me");
const showRegisterButton = document.getElementById("show-register-button");
const registerDisplayNameInput = document.getElementById("register-display-name");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");
const registerPasswordConfirmInput = document.getElementById("register-password-confirm");
const registerBackButton = document.getElementById("register-back-button");
const verifyEmailInput = document.getElementById("verify-email");
const verifyCodeInput = document.getElementById("verify-code");
const verifyBackButton = document.getElementById("verify-back-button");
const resetEmailInput = document.getElementById("reset-email");
const resetCodeInput = document.getElementById("reset-code");
const resetPasswordInput = document.getElementById("reset-password");
const resetBackButton = document.getElementById("reset-back-button");
const showForgotPasswordButton = document.getElementById("show-forgot-password-button");
const requestResetCodeButton = document.getElementById("request-reset-code-button");

// Header and global status
const connectionToast = document.getElementById("connection-status");
const connectionPill = document.getElementById("connection-pill");
const translationPill = document.getElementById("translation-pill");
const ttsPill = document.getElementById("tts-pill");
const signedInPill = document.getElementById("signed-in-pill");
const creditsPill = document.getElementById("credits-pill");
const settingsProfileSelect = document.getElementById("settings-profile-select");
const settingsProfileCreateButton = document.getElementById("settings-profile-create-button");
const settingsProfileDeleteButton = document.getElementById("settings-profile-delete-button");
const settingsProfileImportButton = document.getElementById("settings-profile-import-button");
const settingsProfileExportButton = document.getElementById("settings-profile-export-button");
const appVersionLabel = document.getElementById("app-version");
const appVersionAuth = document.getElementById("app-version-auth");
const appVersionInline = document.getElementById("app-version-inline");
const updateStatus = document.getElementById("update-status");
const topupCreditsButton = document.getElementById("topup-credits-button");

// Connection controls
const connectForm = document.getElementById("connect-form");
const usernameInput = document.getElementById("username");
const rememberedUsernamesList = document.getElementById("remembered-usernames");
const connectButton = document.getElementById("connect-button");
const rememberUsernameInput = document.getElementById("remember-username");
const signoutButton = document.getElementById("signout-button");
const sessionCheckPill = document.getElementById("session-check-pill");

// Chat layout
const chatCount = document.getElementById("chat-count");
const chatSearchInput = document.getElementById("chat-search");
const pauseScrollButton = document.getElementById("pause-scroll-button");
const clearChatButton = document.getElementById("clear-chat-button");
const exportChatButton = document.getElementById("export-chat-button");
const chatEmpty = document.getElementById("chat-empty");
const chatList = document.getElementById("chat-list");
const chatNotesPanel = document.getElementById("chat-notes-panel");
const chatNotesTitle = document.getElementById("chat-notes-title");
const chatNotesInput = document.getElementById("chat-notes-input");
const chatNotesSaveButton = document.getElementById("chat-notes-save");
const chatNotesDeleteButton = document.getElementById("chat-notes-delete");
const chatNotesCloseButton = document.getElementById("chat-notes-close");
const ttsVoiceManagerModal = document.getElementById("tts-voice-manager-modal");
const ttsVoiceManagerCloseButton = document.getElementById("tts-voice-manager-close");
const ttsVoiceManagerProvider = document.getElementById("tts-voice-manager-provider");
const ttsVoiceManagerStatus = document.getElementById("tts-voice-manager-status");
const ttsVoiceManagerSearchInput = document.getElementById("tts-voice-manager-search");
const ttsVoiceManagerUsernameInput = document.getElementById("tts-voice-manager-username");
const ttsVoiceManagerVoiceSelect = document.getElementById("tts-voice-manager-voice");
const ttsVoiceManagerAddButton = document.getElementById("tts-voice-manager-add-button");
const ttsVoiceManagerList = document.getElementById("tts-voice-manager-list");
const ttsVoiceManagerUserSuggestions = document.getElementById("tts-voice-manager-user-suggestions");
const settingsProfileModal = document.getElementById("settings-profile-modal");
const settingsProfileModalCloseButton = document.getElementById("settings-profile-modal-close");
const settingsProfileNameInput = document.getElementById("settings-profile-name-input");
const settingsProfileModalSaveButton = document.getElementById("settings-profile-modal-save");

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
const statQueue = document.getElementById("stat-queue");
const queueCountPill = document.getElementById("queue-count-pill");
const queueFilterSelect = document.getElementById("queue-filter");
const queueClearFilteredButton = document.getElementById("queue-clear-filtered");
const queueActionList = document.getElementById("queue-action-list");
const queueActionStatus = document.getElementById("queue-action-status");
const queueOverlayQueueSelect = document.getElementById("queue-overlay-queue");
const queueOverlayModeSelect = document.getElementById("queue-overlay-mode");
const queueOverlayUrlInput = document.getElementById("queue-overlay-url");
const queueOverlayCopyButton = document.getElementById("queue-overlay-copy");
const queueOverlayOpenButton = document.getElementById("queue-overlay-open");
const queueOverlayStatus = document.getElementById("queue-overlay-status");

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
const ttsGiftMinCoinsInput = document.getElementById("tts-gift-min-coins");
const ttsProviderSelect = document.getElementById("tts-provider");
const ttsRandomVoiceInput = document.getElementById("tts-random-voice");
const ttsElevenModeField = document.getElementById("tts-eleven-mode-field");
const ttsElevenModeSelect = document.getElementById("tts-eleven-mode");
const ttsElevenApiKeyField = document.getElementById("tts-eleven-api-key-field");
const ttsElevenApiKeyInput = document.getElementById("tts-eleven-api-key");
const ttsElevenModelField = document.getElementById("tts-eleven-model-field");
const ttsElevenModelSelect = document.getElementById("tts-eleven-model");
const ttsVoiceSelect = document.getElementById("tts-voice");
const ttsQueueSelect = document.getElementById("tts-queue");
const ttsRateInput = document.getElementById("tts-rate");
const ttsPitchInput = document.getElementById("tts-pitch");
const ttsVolumeInput = document.getElementById("tts-volume");
const ttsRateValue = document.getElementById("tts-rate-value");
const ttsPitchValue = document.getElementById("tts-pitch-value");
const ttsVolumeValue = document.getElementById("tts-volume-value");
const ttsTestButton = document.getElementById("tts-test-button");
const ttsManageUserVoicesButton = document.getElementById("tts-manage-user-voices-button");
const commandFeedbackDurationInput = document.getElementById("command-feedback-duration");
const commandFeedbackOverlayUrlInput = document.getElementById("command-feedback-overlay-url");
const commandFeedbackOverlayCopyButton = document.getElementById("command-feedback-overlay-copy");
const commandFeedbackOverlayOpenButton = document.getElementById("command-feedback-overlay-open");
const commandFeedbackTemplateMyttsvoiceInput = document.getElementById("command-feedback-template-myttsvoice");
const commandFeedbackTemplateListcommandsInput = document.getElementById("command-feedback-template-listcommands");
const commandFeedbackStatus = document.getElementById("command-feedback-status");
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
const CONNECT_CREDIT_STABILIZE_MS = 2500;
const DEFAULT_SETTINGS_PROFILE_ID = "default";
const PROFILE_SETTING_KEYS = [
  "rememberedUsername",
  "rememberUsername",
  "rememberedUsernames",
  "translationEnabled",
  "translationTargetLanguage",
  "translationProviderUrl",
  "translationApiKey",
  "ttsEnabled",
  "ttsProvider",
  "ttsVoice",
  "ttsRandomVoicePerMessage",
  "ttsStyle",
  "ttsQueue",
  "ttsRate",
  "ttsPitch",
  "ttsVolume",
  "ttsIncludeUsername",
  "ttsReadGifts",
  "ttsGiftMinCoins",
  "ttsElevenMode",
  "ttsElevenApiKey",
  "ttsElevenModel",
  "ttsAudience",
  "commandFeedbackOverlayDurationMs",
  "commandFeedbackTemplates",
  "ttsUserVoiceAssignments",
  "userNotes",
  "customEventRules"
];
const TTS_STYLE_PROFILES = {
  natural: {
    rateOffset: 0,
    pitchOffset: 0,
    volumeMultiplier: 1
  },
  protocol: {
    rateOffset: 0.14,
    pitchOffset: 0.26,
    volumeMultiplier: 0.94
  },
  dark: {
    rateOffset: -0.16,
    pitchOffset: -0.28,
    volumeMultiplier: 1.08
  },
  announcer: {
    rateOffset: 0.22,
    pitchOffset: 0.12,
    volumeMultiplier: 1.16
  },
  tinybot: {
    rateOffset: 0.28,
    pitchOffset: 0.45,
    volumeMultiplier: 0.86
  }
};

const state = {
  settings: null,
  appVersion: "",
  authView: "signin",
  authBusy: false,
  authRememberMeChoice: false,
  authenticatedUser: null,
  connected: false,
  connecting: false,
  username: "",
  roomId: null,
  updateMessage: "Automatic updates are configured for GitHub Releases.",
  updateLevel: "info",
  activeTab: "controls",
  chatItems: [],
  activeChatNoteUser: "",
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
    forceClosing: false,
    sessionTerminationReason: "",
    authSessionCheckStatus: "waiting",
  ttsVoiceManagerSearch: "",
  queueCount: 0,
  queueFilter: "all",
  queueOverlayBaseUrl: "",
  queueOverlayLane: 1,
  queueOverlayMode: "full",
  commandFeedbackOverlayBaseUrl: "",
  playbackQueueItems: [],
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
  sessionUserProfiles: new Map(),
  triggeredCustomRuleIds: new Set(),
  statState: {
    gifts: 0,
    followers: 0,
    chatTimestamps: []
  }
};

let toastTimer = null;
let saveSettingsTimer = null;
let pendingSettingsSavePromise = Promise.resolve();
let headerEventsWired = false;
let authEventsWired = false;
let chatToolbarEventsWired = false;
let tabEventsWired = false;
const playbackQueues = new Map();
let nextPlaybackQueueItemId = 1;

function createDefaultSettings() {
  return {
    authApiBaseUrl: "https://streamsyncpro.co.uk",
    authUser: null,
    authRememberMe: false,
    authRememberedEmail: "",
    activeSettingsProfileId: DEFAULT_SETTINGS_PROFILE_ID,
    settingsProfiles: {
      [DEFAULT_SETTINGS_PROFILE_ID]: {
        name: "Default",
        settings: createDefaultProfileSettings()
      }
    },
    rememberedUsername: "",
    rememberUsername: false,
    rememberedUsernames: [],
    translationEnabled: false,
    translationTargetLanguage: "en",
    translationProviderUrl: "",
    translationApiKey: "",
    ttsEnabled: false,
    ttsProvider: "builtin",
    ttsVoice: "",
    ttsRandomVoicePerMessage: false,
    ttsStyle: "natural",
    ttsQueue: 1,
    ttsRate: 1,
    ttsPitch: 1,
    ttsVolume: 1,
    ttsIncludeUsername: true,
    ttsReadGifts: false,
    ttsGiftMinCoins: 0,
    ttsElevenMode: "free",
    ttsElevenApiKey: "",
    ttsElevenModel: "eleven_flash_v2_5",
      ttsAudience: {
        allViewers: true,
        subscribers: false,
        moderators: false
      },
      commandFeedbackOverlayDurationMs: 6000,
      commandFeedbackTemplates: {
        myttsvoice: "{user} has selected {voiceLabel} for their personalised TTS voice.",
        listcommands: "{user}, available chat commands: {commandList}"
      },
      ttsUserVoiceAssignments: {
        builtin: {},
        elevenlabs: {}
      },
    userNotes: {},
    customEventRules: []
  };
}

let authSessionMonitorTimer = null;
const AUTH_SESSION_MONITOR_MS = 10000;

function ensureSettingsShape(source = {}) {
  const defaults = createDefaultSettings();
  const normalizedProfiles = normalizeSettingsProfiles(source?.settingsProfiles, {
    ...defaults,
    ...source
  });
  const requestedProfileId = String(source?.activeSettingsProfileId ?? DEFAULT_SETTINGS_PROFILE_ID).trim() || DEFAULT_SETTINGS_PROFILE_ID;
  const activeSettingsProfileId = normalizedProfiles[requestedProfileId]
    ? requestedProfileId
    : Object.keys(normalizedProfiles)[0] ?? DEFAULT_SETTINGS_PROFILE_ID;
  const activeProfileSettings = normalizedProfiles[activeSettingsProfileId]?.settings ?? createDefaultProfileSettings();

  return {
    ...defaults,
    ...source,
    ...activeProfileSettings,
    activeSettingsProfileId,
    settingsProfiles: normalizedProfiles,
    rememberedUsernames: normalizeRememberedUsernames([activeProfileSettings?.rememberedUsername, ...(activeProfileSettings?.rememberedUsernames ?? [])]),
    userNotes: normalizeUserNotes(activeProfileSettings?.userNotes),
    ttsUserVoiceAssignments: normalizeTtsUserVoiceAssignments(activeProfileSettings?.ttsUserVoiceAssignments),
    commandFeedbackOverlayDurationMs: Math.max(1000, Number(activeProfileSettings?.commandFeedbackOverlayDurationMs) || defaults.commandFeedbackOverlayDurationMs),
    commandFeedbackTemplates: {
      ...defaults.commandFeedbackTemplates,
      ...(activeProfileSettings?.commandFeedbackTemplates ?? {})
    },
    ttsAudience: {
      ...defaults.ttsAudience,
      ...(activeProfileSettings?.ttsAudience ?? {})
    },
    customEventRules: Array.isArray(activeProfileSettings?.customEventRules)
      ? activeProfileSettings.customEventRules.map(normalizeRule).filter(Boolean)
      : []
  };
}

function getAuthApiBaseUrl() {
  return String(state.settings?.authApiBaseUrl || "https://streamsyncpro.co.uk").replace(/\/+$/, "");
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
    threshold: Math.max(1, Number(rule.threshold) || 1),
    queueId: normalizeQueueId(rule.queueId, 1),
    soundId: String(rule.soundId ?? "").trim(),
    webhookUrl: String(rule.webhookUrl ?? "").trim(),
    triggerAudience: ["everyone", "follower", "subscriber", "moderator", "topGifter", "specificUser"].includes(rule.triggerAudience)
      ? rule.triggerAudience
      : "everyone",
    triggerUsername: String(rule.triggerUsername ?? "").trim().replace(/^@/, "").toLowerCase()
  };
}

function createDraftRule() {
  return {
    id: `rule-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    enabled: true,
    name: `Custom rule ${state.settings.customEventRules.length + 1}`,
    metric: "follows",
    threshold: 1,
    queueId: 1,
    soundId: "",
    webhookUrl: "",
    triggerAudience: "everyone",
    triggerUsername: ""
  };
}

function normalizeQueueId(value, fallback = 1) {
  return Math.min(10, Math.max(1, Number(value) || fallback));
}

function getQueueLabel(queueId) {
  return `Queue ${normalizeQueueId(queueId, 1)}`;
}

function createQueueClearedError() {
  const error = new Error("Queue item cleared.");
  error.cleared = true;
  return error;
}

function getPlaybackLane(queueId) {
  const laneId = normalizeQueueId(queueId, 1);
  if (!playbackQueues.has(laneId)) {
    playbackQueues.set(laneId, {
      laneId,
      running: false,
      items: []
    });
  }

  return playbackQueues.get(laneId);
}

function updateQueueIndicators() {
  state.queueCount = state.playbackQueueItems.length;
  const count = Math.max(0, state.queueCount);
  statQueue.textContent = String(count);
  queueCountPill.textContent = `${count} ${count === 1 ? "item" : "items"}`;
  renderQueueActionList();
  syncQueueOverlayState();
}

function getFilteredQueueItems() {
  switch (state.queueFilter) {
    case "waiting":
      return state.playbackQueueItems.filter((item) => item.status === "queued");
    case "playing":
      return state.playbackQueueItems.filter((item) => item.status === "running");
    case "tts":
      return state.playbackQueueItems.filter((item) => item.kind === "tts");
    case "action":
      return state.playbackQueueItems.filter((item) => item.kind === "action");
    default:
      return state.playbackQueueItems;
  }
}

function renderQueueActionList() {
  const filteredItems = getFilteredQueueItems();
  const clearableCount = filteredItems.filter((item) => item.status === "queued").length;
  queueClearFilteredButton.disabled = clearableCount === 0;

  if (!filteredItems.length) {
    queueActionList.innerHTML = "";
    setStatusMessage(
      queueActionStatus,
      "info",
      state.playbackQueueItems.length ? "No queue items match the current filter." : "No queued actions."
    );
    return;
  }

  queueActionList.innerHTML = filteredItems
    .map((item) => `
      <article class="queue-action-row ${item.status === "running" ? "running" : ""}" data-queue-item-id="${escapeHtml(item.id)}">
        <div class="queue-action-copy">
          <strong>${escapeHtml(item.label)}</strong>
          <span class="queue-action-meta">${escapeHtml(getQueueLabel(item.queueId))} · ${escapeHtml(item.kind === "tts" ? "TTS" : "Action")} · ${escapeHtml(item.status === "running" ? "Running" : "Waiting")}</span>
        </div>
        ${item.status === "queued"
          ? `<button type="button" class="ghost compact-button queue-action-clear" data-queue-clear="${escapeHtml(item.id)}">Clear</button>`
          : `<span class="status-pill accent">Playing</span>`}
      </article>
    `)
    .join("");

  setStatusMessage(
    queueActionStatus,
    "success",
    `${filteredItems.length} visible item${filteredItems.length === 1 ? "" : "s"} · ${clearableCount} clearable`
  );
}

function getSelectedQueueOverlayUrl() {
  if (!state.queueOverlayBaseUrl) {
    return "";
  }

  const queueLane = Math.min(10, Math.max(1, Number(state.queueOverlayLane) || 1));
  const overlayMode = state.queueOverlayMode === "compact" ? "compact" : "full";
  const overlayUrl = new URL(state.queueOverlayBaseUrl);
  overlayUrl.searchParams.set("queue", String(queueLane));
  overlayUrl.searchParams.set("mode", overlayMode);
  return overlayUrl.toString();
}

function updateQueueOverlayControls(info = {}) {
  if (info?.url) {
    state.queueOverlayBaseUrl = String(info.url).trim();
  }

  state.queueOverlayLane = Math.min(10, Math.max(1, Number(queueOverlayQueueSelect?.value ?? state.queueOverlayLane) || 1));
  state.queueOverlayMode = queueOverlayModeSelect?.value === "compact" ? "compact" : "full";
  const overlayUrl = getSelectedQueueOverlayUrl();
  if (queueOverlayQueueSelect) {
    queueOverlayQueueSelect.value = String(state.queueOverlayLane);
  }
  if (queueOverlayModeSelect) {
    queueOverlayModeSelect.value = state.queueOverlayMode;
  }
  queueOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  queueOverlayCopyButton.disabled = overlayUrl === "";
  queueOverlayOpenButton.disabled = overlayUrl === "";
  setStatusMessage(
    queueOverlayStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? `Queue ${state.queueOverlayLane} ${state.queueOverlayMode === "compact" ? "compact" : "full"} hosted overlay ready. Use this URL in TikTok or OBS.`
      : "Queue overlay is unavailable right now."
  );
}

async function loadQueueOverlayInfo() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    state.queueOverlayBaseUrl = "";
    queueOverlayUrlInput.value = "Sign in to generate hosted overlay";
    queueOverlayCopyButton.disabled = true;
    queueOverlayOpenButton.disabled = true;
    setStatusMessage(queueOverlayStatus, "info", "Sign in to generate a hosted queue overlay URL for this user.");
    return;
  }

  try {
    const info = await authRequest("/api/auth/create-queue-overlay-session", {
      userId: state.authenticatedUser.id,
      sessionToken: state.authenticatedUser.sessionToken
    });
    updateQueueOverlayControls(info);
  } catch (error) {
    queueOverlayUrlInput.value = "Overlay unavailable";
    queueOverlayCopyButton.disabled = true;
    queueOverlayOpenButton.disabled = true;
    setStatusMessage(queueOverlayStatus, "error", error.message || "Unable to load the queue overlay URL.");
  }
}

function syncQueueOverlayState() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  void authRequest("/api/overlay/update-queue-state", {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    connected: state.connected,
    username: state.username,
    queueCount: state.playbackQueueItems.length,
    items: state.playbackQueueItems.map((item) => ({
      id: item.id,
      label: item.label,
      queueId: item.queueId,
      kind: item.kind,
      status: item.status
    }))
  }).catch(() => {
    // Ignore hosted overlay sync errors so they never interrupt queue playback or UI updates.
  });
}

function getCommandFeedbackOverlayUrl() {
  return state.commandFeedbackOverlayBaseUrl || "";
}

function updateCommandFeedbackOverlayControls(info = {}) {
  if (info?.url) {
    state.commandFeedbackOverlayBaseUrl = String(info.url).trim();
  }

  const overlayUrl = getCommandFeedbackOverlayUrl();
  commandFeedbackOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  commandFeedbackOverlayCopyButton.disabled = overlayUrl === "";
  commandFeedbackOverlayOpenButton.disabled = overlayUrl === "";
  setStatusMessage(
    commandFeedbackStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? "Command feedback overlay hosted URL ready. Use this in TikTok or OBS."
      : "Command feedback overlay is unavailable right now."
  );
}

async function loadCommandFeedbackOverlayInfo() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    state.commandFeedbackOverlayBaseUrl = "";
    commandFeedbackOverlayUrlInput.value = "Sign in to generate hosted overlay";
    commandFeedbackOverlayCopyButton.disabled = true;
    commandFeedbackOverlayOpenButton.disabled = true;
    setStatusMessage(commandFeedbackStatus, "info", "Sign in to generate a hosted command feedback overlay URL for this user.");
    return;
  }

  try {
    const info = await authRequest("/api/auth/create-command-feedback-overlay-session", {
      userId: state.authenticatedUser.id,
      sessionToken: state.authenticatedUser.sessionToken
    });
    updateCommandFeedbackOverlayControls(info);
  } catch (error) {
    commandFeedbackOverlayUrlInput.value = "Overlay unavailable";
    commandFeedbackOverlayCopyButton.disabled = true;
    commandFeedbackOverlayOpenButton.disabled = true;
    setStatusMessage(commandFeedbackStatus, "error", error.message || "Unable to load the command feedback overlay URL.");
  }
}

function getSupportedChatCommandList() {
  const availableEntries = getAvailableTtsVoiceEntries();
  const myTtsVoiceRange = availableEntries.length > 0 ? ` (1-${availableEntries.length})` : "";
  return [
    "!listcomands",
    "!listcommands",
    `!myttsvoice <number>${myTtsVoiceRange}`
  ].join(", ");
}

function formatCommandFeedbackTemplate(template, replacements) {
  return String(template ?? "")
    .replaceAll("{user}", replacements.user ?? "")
    .replaceAll("{voiceLabel}", replacements.voiceLabel ?? "")
    .replaceAll("{voiceNumber}", replacements.voiceNumber ?? "")
    .replaceAll("{commandList}", replacements.commandList ?? "")
    .trim();
}

function showCommandFeedbackOverlay(commandType, replacements) {
  const template = state.settings?.commandFeedbackTemplates?.[commandType] ?? "";
  const message = formatCommandFeedbackTemplate(template, replacements);
  if (!message) {
    return;
  }

  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  const durationMs = Math.max(1000, Number(state.settings?.commandFeedbackOverlayDurationMs) || 6000);
  const visibleUntil = new Date(Date.now() + durationMs).toISOString();

  void authRequest("/api/overlay/update-command-feedback-state", {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    message,
    commandType,
    username: replacements.user ?? "",
    durationMs,
    visibleUntil
  }).catch(() => {
    // Ignore overlay sync errors so command handling still completes normally.
  });
}

function clearQueuedPlaybackItem(itemId, options = {}) {
  const silent = Boolean(options?.silent);
  for (const lane of playbackQueues.values()) {
    const itemIndex = lane.items.findIndex((entry) => entry.id === itemId);
    if (itemIndex === -1) {
      continue;
    }

      const [item] = lane.items.splice(itemIndex, 1);
      state.playbackQueueItems = state.playbackQueueItems.filter((entry) => entry.id !== itemId);
      updateQueueIndicators();
      item.reject(createQueueClearedError());
      if (!silent) {
        showToast(`Cleared queued action: ${item.label}`, "info");
      }
      return true;
    }

  return false;
}

function clearFilteredPlaybackItems() {
  const clearableIds = getFilteredQueueItems()
    .filter((item) => item.status === "queued")
    .map((item) => item.id);

  if (!clearableIds.length) {
    showToast("No waiting queue items match the current filter.", "info");
    return;
  }

  for (const itemId of clearableIds) {
    clearQueuedPlaybackItem(itemId);
  }

  showToast(`Cleared ${clearableIds.length} queued item${clearableIds.length === 1 ? "" : "s"}.`, "success");
}

function clearAllQueuedPlaybackItems(kinds = []) {
  const clearKinds = Array.isArray(kinds) && kinds.length
    ? new Set(kinds)
    : null;

  const clearableIds = state.playbackQueueItems
    .filter((item) => item.status === "queued")
    .filter((item) => !clearKinds || clearKinds.has(item.kind))
    .map((item) => item.id);

  for (const itemId of clearableIds) {
    clearQueuedPlaybackItem(itemId, { silent: true });
  }
}

async function processPlaybackLane(queueId) {
  const lane = getPlaybackLane(queueId);
  if (lane.running) {
    return;
  }

  lane.running = true;

  try {
    while (lane.items.length) {
      const item = lane.items[0];
      item.status = "running";
      updateQueueIndicators();

      try {
        const result = await item.execute();
        item.resolve(result);
      } catch (error) {
        item.reject(error);
      } finally {
        lane.items.shift();
        state.playbackQueueItems = state.playbackQueueItems.filter((entry) => entry.id !== item.id);
        updateQueueIndicators();
      }
    }
  } finally {
    lane.running = false;
    if (!lane.items.length) {
      playbackQueues.delete(lane.laneId);
    }
  }
}

function enqueuePlaybackTask(queueId, task, meta = {}) {
  const lane = getPlaybackLane(queueId);
  const normalizedQueueId = normalizeQueueId(queueId, 1);

  return new Promise((resolve, reject) => {
    const entry = {
      id: `queue-${nextPlaybackQueueItemId++}`,
      queueId: normalizedQueueId,
      label: String(meta.label ?? `Queued action on ${getQueueLabel(normalizedQueueId)}`),
      kind: meta.kind === "tts" ? "tts" : "action",
      status: "queued",
      execute: task,
      resolve,
      reject
    };

    lane.items.push(entry);
    state.playbackQueueItems.push(entry);
    updateQueueIndicators();
    void processPlaybackLane(normalizedQueueId);
  });
}

function normalizeUserKey(value) {
  return String(value ?? "").trim().replace(/^@/, "").toLowerCase();
}

function normalizeRememberedUsernames(source = []) {
  if (!Array.isArray(source)) {
    return [];
  }

  const seen = new Set();
  const normalized = [];

  for (const entry of source) {
    const username = String(entry ?? "").trim().replace(/^@/, "");
    const dedupeKey = username.toLowerCase();
    if (!username || seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    normalized.push(username);

    if (normalized.length >= 20) {
      break;
    }
  }

  return normalized;
}

function buildRememberedUsernameHistory(nextUsername = "") {
  return normalizeRememberedUsernames([nextUsername, ...(state.settings?.rememberedUsernames ?? [])]);
}

function renderRememberedUsernameOptions() {
  if (!rememberedUsernamesList) {
    return;
  }

  rememberedUsernamesList.replaceChildren(
    ...normalizeRememberedUsernames(state.settings?.rememberedUsernames ?? []).map((username) => {
      const option = document.createElement("option");
      option.value = username;
      return option;
    })
  );
}

function normalizeUserNotes(source = {}) {
  if (!source || typeof source !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(source)
      .map(([key, value]) => [normalizeUserKey(key), String(value ?? "").trim()])
      .filter(([key, value]) => key && value)
  );
}

function normalizeTtsUserVoiceAssignments(source = {}) {
  const normalized = {
    builtin: {},
    elevenlabs: {}
  };

  if (!source || typeof source !== "object") {
    return normalized;
  }

  for (const providerKey of ["builtin", "elevenlabs"]) {
    const providerAssignments = source?.[providerKey];
    if (!providerAssignments || typeof providerAssignments !== "object") {
      continue;
    }

    normalized[providerKey] = Object.fromEntries(
      Object.entries(providerAssignments)
        .map(([userKey, voiceValue]) => [normalizeUserKey(userKey), String(voiceValue ?? "").trim()])
        .filter(([userKey, voiceValue]) => userKey && voiceValue)
    );
  }

  return normalized;
}

function getDefaultProfileSettingsSource() {
  return {
    rememberedUsername: "",
    rememberUsername: false,
    rememberedUsernames: [],
    translationEnabled: false,
    translationTargetLanguage: "en",
    translationProviderUrl: "",
    translationApiKey: "",
    ttsEnabled: false,
    ttsProvider: "builtin",
    ttsVoice: "",
    ttsRandomVoicePerMessage: false,
    ttsStyle: "natural",
    ttsQueue: 1,
    ttsRate: 1,
    ttsPitch: 1,
    ttsVolume: 1,
    ttsIncludeUsername: true,
    ttsReadGifts: false,
    ttsGiftMinCoins: 0,
    ttsElevenMode: "free",
    ttsElevenApiKey: "",
    ttsElevenModel: "eleven_flash_v2_5",
    ttsAudience: {
      allViewers: true,
      subscribers: false,
      moderators: false
    },
    commandFeedbackOverlayDurationMs: 6000,
    commandFeedbackTemplates: {
      myttsvoice: "{user} has selected {voiceLabel} for their personalised TTS voice.",
      listcommands: "{user}, available chat commands: {commandList}"
    },
    ttsUserVoiceAssignments: {
      builtin: {},
      elevenlabs: {}
    },
    userNotes: {},
    customEventRules: []
  };
}

function createDefaultProfileSettings() {
  return normalizeProfileSettingsSnapshot(getDefaultProfileSettingsSource());
}

function normalizeProfileSettingsSnapshot(source = {}) {
  const defaults = getDefaultProfileSettingsSource();

  return {
    rememberedUsername: String(source?.rememberedUsername ?? defaults.rememberedUsername).trim().replace(/^@/, ""),
    rememberUsername: Boolean(source?.rememberUsername ?? defaults.rememberUsername),
    rememberedUsernames: normalizeRememberedUsernames([source?.rememberedUsername, ...(source?.rememberedUsernames ?? defaults.rememberedUsernames)]),
    translationEnabled: Boolean(source?.translationEnabled ?? defaults.translationEnabled),
    translationTargetLanguage: String(source?.translationTargetLanguage ?? defaults.translationTargetLanguage).trim() || defaults.translationTargetLanguage,
    translationProviderUrl: String(source?.translationProviderUrl ?? defaults.translationProviderUrl),
    translationApiKey: String(source?.translationApiKey ?? defaults.translationApiKey),
    ttsEnabled: Boolean(source?.ttsEnabled ?? defaults.ttsEnabled),
    ttsProvider: source?.ttsProvider === "elevenlabs" ? "elevenlabs" : "builtin",
    ttsVoice: String(source?.ttsVoice ?? defaults.ttsVoice).trim(),
    ttsRandomVoicePerMessage: Boolean(source?.ttsRandomVoicePerMessage ?? defaults.ttsRandomVoicePerMessage),
    ttsStyle: "natural",
    ttsQueue: normalizeQueueId(source?.ttsQueue, defaults.ttsQueue),
    ttsRate: Number(source?.ttsRate ?? defaults.ttsRate) || defaults.ttsRate,
    ttsPitch: Number(source?.ttsPitch ?? defaults.ttsPitch) || defaults.ttsPitch,
    ttsVolume: Number(source?.ttsVolume ?? defaults.ttsVolume) || defaults.ttsVolume,
    ttsIncludeUsername: Boolean(source?.ttsIncludeUsername ?? defaults.ttsIncludeUsername),
    ttsReadGifts: Boolean(source?.ttsReadGifts ?? defaults.ttsReadGifts),
    ttsGiftMinCoins: Math.max(0, Number(source?.ttsGiftMinCoins ?? defaults.ttsGiftMinCoins) || 0),
    ttsElevenMode: source?.ttsElevenMode === "paid" ? "paid" : "free",
    ttsElevenApiKey: String(source?.ttsElevenApiKey ?? defaults.ttsElevenApiKey).trim(),
    ttsElevenModel: String(source?.ttsElevenModel ?? defaults.ttsElevenModel).trim() || defaults.ttsElevenModel,
    ttsAudience: {
      ...defaults.ttsAudience,
      ...(source?.ttsAudience ?? {})
    },
    commandFeedbackOverlayDurationMs: Math.max(1000, Number(source?.commandFeedbackOverlayDurationMs) || defaults.commandFeedbackOverlayDurationMs),
    commandFeedbackTemplates: {
      ...defaults.commandFeedbackTemplates,
      ...(source?.commandFeedbackTemplates ?? {})
    },
    ttsUserVoiceAssignments: normalizeTtsUserVoiceAssignments(source?.ttsUserVoiceAssignments),
    userNotes: normalizeUserNotes(source?.userNotes),
    customEventRules: Array.isArray(source?.customEventRules)
      ? source.customEventRules.map(normalizeRule).filter(Boolean)
      : []
  };
}

function extractProfileSettings(source = {}) {
  const snapshot = {};

  for (const key of PROFILE_SETTING_KEYS) {
    snapshot[key] = source?.[key];
  }

  return normalizeProfileSettingsSnapshot(snapshot);
}

function normalizeSettingsProfiles(source = {}, fallbackSource = {}) {
  const fallbackSettings = extractProfileSettings(fallbackSource);
  const normalized = {};

  if (source && typeof source === "object") {
    for (const [profileId, profile] of Object.entries(source)) {
      const normalizedId = String(profileId ?? "").trim();
      if (!normalizedId) {
        continue;
      }

      normalized[normalizedId] = {
        name: String(profile?.name ?? normalizedId).trim() || normalizedId,
        settings: normalizeProfileSettingsSnapshot(profile?.settings ?? fallbackSettings)
      };
    }
  }

  if (!Object.keys(normalized).length) {
    normalized[DEFAULT_SETTINGS_PROFILE_ID] = {
      name: "Default",
      settings: fallbackSettings
    };
  }

  return normalized;
}

function getCurrentTtsProviderKey() {
  return ttsProviderSelect.value === "elevenlabs" ? "elevenlabs" : "builtin";
}

function getCurrentTtsProviderLabel() {
  return getCurrentTtsProviderKey() === "elevenlabs" ? "ElevenLabs" : "Built-in";
}

function getAvailableTtsVoiceEntries() {
  return state.voices.map((voice, index) => {
    const value = getCurrentTtsProviderKey() === "elevenlabs" ? voice.id : voice.name;
    const baseLabel = getCurrentTtsProviderKey() === "elevenlabs"
      ? `${voice.name}${voice.category ? ` (${voice.category})` : ""}`
      : `${voice.name}${voice.culture ? ` (${voice.culture})` : ""}`;

    return {
      index: index + 1,
      value,
      label: `${index + 1}. ${baseLabel}`,
      baseLabel,
      voice
    };
  });
}

function getUserAssignedTtsVoice(userKey) {
  const providerKey = getCurrentTtsProviderKey();
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return "";
  }

  return String(state.settings?.ttsUserVoiceAssignments?.[providerKey]?.[normalizedUser] ?? "").trim();
}

async function saveUserAssignedTtsVoice(userKey, voiceValue) {
  const providerKey = getCurrentTtsProviderKey();
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return;
  }

  const nextAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  nextAssignments[providerKey] = {
    ...nextAssignments[providerKey],
    [normalizedUser]: String(voiceValue ?? "").trim()
  };

  await persistSettings({ ttsUserVoiceAssignments: nextAssignments });
}

async function removeUserAssignedTtsVoice(userKey) {
  const providerKey = getCurrentTtsProviderKey();
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return;
  }

  const nextAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  delete nextAssignments[providerKey][normalizedUser];
  await persistSettings({ ttsUserVoiceAssignments: nextAssignments });
}

function buildTtsVoiceManagerOptionsMarkup(selectedValue = "") {
  const options = getAvailableTtsVoiceEntries()
    .map((entry) => `<option value="${escapeHtml(entry.value)}" ${entry.value === selectedValue ? "selected" : ""}>${escapeHtml(entry.label)}</option>`)
    .join("");

  return `<option value="">Select a voice</option>${options}`;
}

function getKnownTtsVoiceUsers() {
  const knownUsers = new Map();
  const addUser = (userKey, nickname = "") => {
    const normalizedUser = normalizeUserKey(userKey);
    if (!normalizedUser || knownUsers.has(normalizedUser)) {
      return;
    }
    knownUsers.set(normalizedUser, String(nickname ?? "").trim());
  };

  for (const [userKey, profile] of state.sessionUserProfiles.entries()) {
    addUser(userKey, profile?.nickname ?? "");
  }

  for (const item of state.chatItems) {
    addUser(item?.user, item?.nickname ?? "");
  }

  for (const userKey of Object.keys(normalizeUserNotes(state.settings?.userNotes))) {
    addUser(userKey, "");
  }

  const assignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  for (const providerAssignments of Object.values(assignments)) {
    for (const userKey of Object.keys(providerAssignments ?? {})) {
      addUser(userKey, "");
    }
  }

  return Array.from(knownUsers.entries()).sort(([left], [right]) => left.localeCompare(right));
}

function renderTtsVoiceManagerUserSuggestions() {
  if (!ttsVoiceManagerUserSuggestions) {
    return;
  }

  const optionsMarkup = getKnownTtsVoiceUsers()
    .map(([userKey, nickname]) => {
      const label = nickname && normalizeUserKey(nickname) !== userKey ? `@${userKey} (${nickname})` : `@${userKey}`;
      return `<option value="${escapeHtml(userKey)}" label="${escapeHtml(label)}"></option>`;
    })
    .join("");

  ttsVoiceManagerUserSuggestions.innerHTML = optionsMarkup;
}

function renderTtsVoiceManager() {
  if (!ttsVoiceManagerModal) {
    return;
  }

  const providerKey = getCurrentTtsProviderKey();
  const providerLabel = getCurrentTtsProviderLabel();
  const searchTerm = String(state.ttsVoiceManagerSearch ?? "").trim().toLowerCase();
  const assignments = Object.entries(normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments)?.[providerKey] ?? {})
    .sort(([left], [right]) => left.localeCompare(right));
  const filteredAssignments = searchTerm
    ? assignments.filter(([userKey]) => userKey.toLowerCase().includes(searchTerm))
    : assignments;

  ttsVoiceManagerProvider.textContent = `Manage saved ${providerLabel} voice assignments for viewers. Chat command: !myttsvoice <number>.`;
  ttsVoiceManagerVoiceSelect.innerHTML = buildTtsVoiceManagerOptionsMarkup();
  ttsVoiceManagerSearchInput.value = state.ttsVoiceManagerSearch ?? "";
  renderTtsVoiceManagerUserSuggestions();

  if (!assignments.length) {
    ttsVoiceManagerList.innerHTML = `<div class="tts-voice-manager-empty">No custom ${providerLabel} TTS voices are assigned yet.</div>`;
    setStatusMessage(ttsVoiceManagerStatus, "info", `No saved ${providerLabel} voice assignments yet.`);
    return;
  }

  if (!filteredAssignments.length) {
    ttsVoiceManagerList.innerHTML = `<div class="tts-voice-manager-empty">No ${providerLabel} voice assignments match your search.</div>`;
    setStatusMessage(ttsVoiceManagerStatus, "info", `Showing 0 of ${assignments.length} saved ${providerLabel} voice assignment${assignments.length === 1 ? "" : "s"}.`);
    return;
  }

  setStatusMessage(
    ttsVoiceManagerStatus,
    "success",
    searchTerm
      ? `Showing ${filteredAssignments.length} of ${assignments.length} saved ${providerLabel} voice assignment${assignments.length === 1 ? "" : "s"}.`
      : `${assignments.length} custom ${providerLabel} voice assignment${assignments.length === 1 ? "" : "s"} saved.`
  );
  ttsVoiceManagerList.innerHTML = filteredAssignments
    .map(([userKey, voiceValue]) => `
      <article class="tts-voice-manager-row" data-tts-voice-user="${escapeHtml(userKey)}">
        <div class="tts-voice-manager-row-copy">
          <strong>@${escapeHtml(userKey)}</strong>
          <span class="helper-text">Custom voice for ${escapeHtml(providerLabel)}</span>
        </div>
        <label class="field">
          <span>Assigned voice</span>
          <select data-tts-voice-select="${escapeHtml(userKey)}">
            ${buildTtsVoiceManagerOptionsMarkup(voiceValue)}
          </select>
        </label>
        <div class="tts-voice-manager-row-actions">
          <button type="button" class="ghost compact-button" data-tts-voice-save="${escapeHtml(userKey)}">Save</button>
          <button type="button" class="ghost compact-button" data-tts-voice-remove="${escapeHtml(userKey)}">Remove</button>
        </div>
      </article>
    `)
    .join("");
}

function openTtsVoiceManagerModal() {
  renderTtsVoiceManager();
  ttsVoiceManagerUsernameInput.value = "";
  ttsVoiceManagerVoiceSelect.value = "";
  ttsVoiceManagerModal.hidden = false;
  window.setTimeout(() => {
    ttsVoiceManagerUsernameInput.focus();
  }, 0);
}

function closeTtsVoiceManagerModal() {
  if (!ttsVoiceManagerModal) {
    return;
  }

  state.ttsVoiceManagerSearch = "";
  ttsVoiceManagerModal.hidden = true;
}

function getUserNote(userKey) {
  return state.settings?.userNotes?.[normalizeUserKey(userKey)] ?? "";
}

function getSessionUserMetricValue(metric, userKey) {
  const key = normalizeUserKey(userKey);
  if (!key) {
    return 0;
  }

  return Math.max(0, Number(state.sessionUserMetrics?.[metric]?.get(key) ?? 0));
}

function getTriggerAudienceLabel(rule) {
  switch (rule.triggerAudience) {
    case "follower":
      return "any follower";
    case "subscriber":
      return "any subscriber";
    case "moderator":
      return "any moderator";
    case "topGifter":
      return "the top gifter";
    case "specificUser":
      return rule.triggerUsername ? `@${rule.triggerUsername}` : "a specific user";
    default:
      return "everyone";
  }
}

function getMetricThresholdLabel(metric) {
  switch (metric) {
    case "likes":
      return "Number of likes";
    case "shares":
      return "Number of shares";
    case "follows":
      return "Number of follows";
    case "coins":
      return "Minimum coins value";
    default:
      return "Threshold value";
  }
}

function getAudienceQualifiedMetricValue(rule) {
  const metric = rule?.metric;
  if (!["follows", "likes", "shares", "coins"].includes(metric)) {
    return 0;
  }

  switch (rule?.triggerAudience) {
    case "follower": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.followedThisSession) {
          total += Number(state.sessionUserMetrics[metric].get(userId) ?? 0);
        }
      }
      return total;
    }
    case "subscriber": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.isSubscriber) {
          total += Number(state.sessionUserMetrics[metric].get(userId) ?? 0);
        }
      }
      return total;
    }
    case "moderator": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.isModerator) {
          total += Number(state.sessionUserMetrics[metric].get(userId) ?? 0);
        }
      }
      return total;
    }
    case "topGifter": {
      const topGifterUserId = getTopGifterUserId();
      return topGifterUserId ? Number(state.sessionUserMetrics[metric].get(topGifterUserId) ?? 0) : 0;
    }
    case "specificUser": {
      const targetUser = normalizeUserKey(rule?.triggerUsername);
      return targetUser ? Number(state.sessionUserMetrics[metric].get(targetUser) ?? 0) : 0;
    }
    case "everyone":
    default:
      return Number(state.sessionMetrics[metric] ?? 0);
  }
}

function getSettingsPayload() {
  return getSettingsPayloadWithPartial();
}

function getCurrentProfileSettingsFromUi(overrides = {}) {
  const merged = {
    ...state.settings,
    ...overrides
  };
  const persistedTtsVoice = String(ttsVoiceSelect.value ?? "").trim() || String(merged?.ttsVoice ?? "").trim();

  return normalizeProfileSettingsSnapshot({
    ...merged,
    rememberedUsername: rememberUsernameInput.checked ? usernameInput.value.trim() : "",
    rememberUsername: rememberUsernameInput.checked,
    rememberedUsernames: normalizeRememberedUsernames(merged?.rememberedUsernames),
    translationEnabled: translationEnabledInput.checked,
    translationTargetLanguage: translationTargetLanguageSelect.value,
    translationProviderUrl: merged.translationProviderUrl ?? "",
    translationApiKey: merged.translationApiKey ?? "",
    ttsEnabled: ttsEnabledInput.checked,
    ttsProvider: ttsProviderSelect.value,
    ttsVoice: persistedTtsVoice,
    ttsRandomVoicePerMessage: ttsRandomVoiceInput.checked,
    ttsStyle: "natural",
    ttsQueue: normalizeQueueId(ttsQueueSelect.value, 1),
    ttsRate: Number(ttsRateInput.value),
    ttsPitch: Number(ttsPitchInput.value),
    ttsVolume: Number(ttsVolumeInput.value),
    ttsIncludeUsername: ttsIncludeUsernameInput.checked,
    ttsReadGifts: ttsReadGiftsInput.checked,
    ttsGiftMinCoins: Math.max(0, Number(ttsGiftMinCoinsInput.value) || 0),
    ttsElevenMode: ttsElevenModeSelect.value,
    ttsElevenApiKey: ttsElevenApiKeyInput.value.trim(),
    ttsElevenModel: ttsElevenModelSelect.value,
    ttsAudience: {
      allViewers: ttsAudienceAllInput.checked,
      subscribers: ttsAudienceSubscribersInput.checked,
      moderators: ttsAudienceModeratorsInput.checked
    },
    commandFeedbackOverlayDurationMs: Math.max(1000, Number(commandFeedbackDurationInput.value) || 6000),
    commandFeedbackTemplates: {
      myttsvoice: String(commandFeedbackTemplateMyttsvoiceInput.value ?? "").trim(),
      listcommands: String(commandFeedbackTemplateListcommandsInput.value ?? "").trim()
    },
    ttsUserVoiceAssignments: normalizeTtsUserVoiceAssignments(merged.ttsUserVoiceAssignments),
    userNotes: normalizeUserNotes(merged.userNotes),
    customEventRules: merged.customEventRules.map(normalizeRule).filter(Boolean)
  });
}

function getSettingsPayloadWithPartial(partial = {}) {
  const merged = ensureSettingsShape({
    ...state.settings,
    ...partial
  });
  const activeSettingsProfileId = String(merged.activeSettingsProfileId ?? DEFAULT_SETTINGS_PROFILE_ID).trim() || DEFAULT_SETTINGS_PROFILE_ID;
  const settingsProfiles = normalizeSettingsProfiles(merged.settingsProfiles, merged);
  const activeProfileName = String(settingsProfiles?.[activeSettingsProfileId]?.name ?? "Default").trim() || "Default";
  const activeProfileSettings = getCurrentProfileSettingsFromUi(merged);

  settingsProfiles[activeSettingsProfileId] = {
    name: activeProfileName,
    settings: activeProfileSettings
  };

  return {
    ...merged,
    ...activeProfileSettings,
    activeSettingsProfileId,
    settingsProfiles
  };
}

async function persistSettings(partial = {}) {
  state.settings = ensureSettingsShape({
    ...state.settings,
    ...partial
  });

  const nextSave = app
    .saveSettings(getSettingsPayloadWithPartial(partial))
    .then((saved) => {
      state.settings = ensureSettingsShape(saved);
      renderCustomRules();
      renderRememberedUsernameOptions();
      renderSettingsProfileOptions();
      updateHeaderPills();
      if (ttsVoiceManagerModal && !ttsVoiceManagerModal.hidden) {
        renderTtsVoiceManager();
      }
      return state.settings;
    });

  pendingSettingsSavePromise = nextSave.catch(() => state.settings);
  return nextSave;
}

function scheduleSettingsSave() {
  window.clearTimeout(saveSettingsTimer);
  saveSettingsTimer = window.setTimeout(() => {
    persistSettings().catch((error) => {
      showToast(error.message || "Unable to save settings.", "error");
    });
    }, SAVE_DEBOUNCE_MS);
}

async function flushPendingSettingsForExit() {
  window.clearTimeout(saveSettingsTimer);
  saveSettingsTimer = null;

  try {
    await persistSettings();
  } catch {
    // Allow the app to close even if the final save fails.
  }

  try {
    await pendingSettingsSavePromise;
  } catch {
    // Ignore close-time save failures.
  }

  return true;
}

window.__flushPendingSettingsForExit = flushPendingSettingsForExit;

function setAuthStatus(level, message) {
  setStatusMessage(authStatus, level, message);
}

function setAuthView(viewName) {
  state.authView = viewName;
  const entries = [
    [signinTabButton, signinForm, "signin"],
    [registerTabButton, registerForm, "register"],
    [verifyTabButton, verifyForm, "verify"],
    [resetTabButton, resetForm, "reset"]
  ];

  for (const [button, panel, name] of entries) {
    const active = name === viewName;
    if (button) {
      button.classList.toggle("active", active);
    }
    panel.classList.toggle("active", active);
  }
}

function setAuthBusy(nextBusy) {
  state.authBusy = nextBusy;
  const rememberMeChecked = state.authRememberMeChoice;
  [
    signinTabButton,
    registerTabButton,
    verifyTabButton,
    resetTabButton,
    ...authShell.querySelectorAll("button"),
    ...authShell.querySelectorAll("input")
  ].forEach((element) => {
    if (element.id === "show-forgot-password-button") {
      element.disabled = nextBusy;
      return;
    }

    element.disabled = nextBusy;
  });

  signinRememberMeInput.checked = rememberMeChecked;
}

function scheduleAuthRememberSave() {
  if (state.authBusy) {
    return;
  }

  state.authRememberMeChoice = signinRememberMeInput.checked;
  persistSettings({
    authRememberMe: state.authRememberMeChoice,
    authRememberedEmail: state.authRememberMeChoice ? signinEmailInput.value.trim() : ""
  }).catch((error) => {
    setAuthStatus("error", error.message || "Unable to save sign-in preferences.");
  });
}

function showDashboardForUser(user) {
    state.authenticatedUser = user;
  state.sessionTerminationReason = "";
  signedInPill.textContent = user ? `Signed in as ${user.displayName || user.email}` : "Signed in";
  creditsPill.textContent = `Credits: ${Number(user?.credits ?? 0)}`;
    authShell.hidden = true;
    dashboardShell.hidden = false;
    setAuthStatus("success", user ? `Signed in as ${user.displayName || user.email}.` : "Signed in.");
    setAuthSessionCheckStatus("checking", "Session check: Checking");
  void loadQueueOverlayInfo();
  void loadCommandFeedbackOverlayInfo();
  startAuthSessionMonitor();
}

function showAuthShell() {
    state.authenticatedUser = null;
  signedInPill.textContent = "Signed in";
  creditsPill.textContent = "Credits: 0";
    dashboardShell.hidden = true;
    authShell.hidden = false;
  stopAuthSessionMonitor();
  setAuthSessionCheckStatus("waiting", "Session check: Waiting");
  void loadQueueOverlayInfo();
  void loadCommandFeedbackOverlayInfo();
}

function beginSessionTermination(reason) {
  if (state.forceClosing || state.sessionTerminationReason) {
    return false;
  }

  state.sessionTerminationReason = String(reason || "session_ended");
  stopAuthSessionMonitor();
  return true;
}

function setAuthSessionCheckStatus(level, message) {
  state.authSessionCheckStatus = level;
  if (!sessionCheckPill) {
    return;
  }

  const classLevel = level === "active"
    ? "success"
    : level === "checking"
      ? "accent"
      : level === "error" || level === "forced"
        ? "error"
        : "muted";
  sessionCheckPill.textContent = message;
  sessionCheckPill.className = `status-pill ${classLevel}`;
}

function stopAuthSessionMonitor() {
  if (authSessionMonitorTimer) {
    window.clearInterval(authSessionMonitorTimer);
    authSessionMonitorTimer = null;
  }
}

function startAuthSessionMonitor() {
  stopAuthSessionMonitor();
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  void verifyAuthenticatedSession();

  authSessionMonitorTimer = window.setInterval(() => {
    void verifyAuthenticatedSession();
  }, AUTH_SESSION_MONITOR_MS);
}

function shouldDeferAuthSessionCheck() {
  if (state.authBusy || state.forceClosing) {
    return true;
  }

  if (state.activeCustomRuleId) {
    return true;
  }

  if (chatNotesPanel && !chatNotesPanel.hidden) {
    return true;
  }

  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement) {
    if (customRuleList?.contains(activeElement)) {
      return true;
    }

    if (chatNotesPanel?.contains(activeElement)) {
      return true;
    }
  }

  return false;
}

function applySessionCheckUserSnapshot(user) {
  if (!user || !state.authenticatedUser) {
    return;
  }

  state.authenticatedUser = {
    ...state.authenticatedUser,
    ...user,
    sessionToken: state.authenticatedUser.sessionToken
  };
  signedInPill.textContent = `Signed in as ${state.authenticatedUser.displayName || state.authenticatedUser.email}`;
  creditsPill.textContent = `Credits: ${Number(state.authenticatedUser?.credits ?? 0)}`;
}

async function handleForcedAdminSignOut(message) {
  if (!beginSessionTermination("admin_forced_sign_out")) {
    return;
  }

  state.forceClosing = true;
  setAuthSessionCheckStatus("forced", "Session check: Forced sign out");
  setAuthStatus("error", message);
  showToast(message, "error");

  try {
    if (state.connected) {
      await app.disconnect();
    }
  } catch {
    // Best-effort disconnect before shutdown.
  }

  state.connected = false;
  state.connecting = false;
  state.username = "";
  state.roomId = null;
  updateHeaderPills();
  setConnectionUiState();

  await persistSettings({ authUser: null });

  window.setTimeout(() => {
    void app.quitApp();
  }, 900);
}

async function handleLockedAccountSignOut(message) {
  if (!beginSessionTermination("account_locked")) {
    return;
  }

  setAuthSessionCheckStatus("forced", "Session check: Account locked");
  setAuthStatus("error", message);
  showToast(message, "error");

  try {
    if (state.connected) {
      await app.disconnect();
    }
  } catch {
    // Best-effort disconnect before returning to the sign-in screen.
  }

  state.connected = false;
  state.connecting = false;
  state.username = "";
  state.roomId = null;
  updateHeaderPills();
  setConnectionUiState();

  await persistSettings({ authUser: null });
  showAuthShell();

  window.alert(message);
}

async function handleSignedInElsewhereSignOut(message) {
  if (!beginSessionTermination("signed_in_elsewhere")) {
    return;
  }

  setAuthSessionCheckStatus("forced", "Session check: Signed out on another device");
  setAuthStatus("error", message);
  showToast(message, "error");

  try {
    if (state.connected) {
      await app.disconnect();
    }
  } catch {
    // Best-effort disconnect before returning to the sign-in screen.
  }

  state.connected = false;
  state.connecting = false;
  state.username = "";
  state.roomId = null;
  updateHeaderPills();
  setConnectionUiState();

  await persistSettings({ authUser: null });
  showAuthShell();

  window.alert(message);
}

async function syncAuthenticatedUser(user) {
  const mergedUser = user
    ? {
        ...(state.authenticatedUser ?? {}),
        ...user,
        sessionToken: user.sessionToken || state.authenticatedUser?.sessionToken || ""
      }
    : null;

  state.authenticatedUser = mergedUser;
  signedInPill.textContent = mergedUser ? `Signed in as ${mergedUser.displayName || mergedUser.email}` : "Signed in";
  creditsPill.textContent = `Credits: ${Number(mergedUser?.credits ?? 0)}`;
  await persistSettings({
    authUser: state.settings?.authRememberMe ? mergedUser ?? null : null
  });
}

async function recordAuditEvent(eventType, metadata = {}) {
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    return null;
  }

    const result = await authRequest("/api/auth/audit-event", {
      userId: user.id,
      sessionToken: user.sessionToken,
      eventType,
      ...metadata
    });

  if (result.user) {
    await syncAuthenticatedUser(result.user);
  }

  return result;
}

async function logoutAuthenticatedUser() {
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    return null;
  }

  return authRequest("/api/auth/logout", {
    userId: user.id,
    sessionToken: user.sessionToken
  });
}

async function signOutUser() {
  if (state.connected) {
    try {
      await app.disconnect();
      await recordAuditEvent("disconnect");
    } catch {
      // Ignore disconnect issues during sign-out; auth state still needs to clear.
    }

    state.connected = false;
    state.connecting = false;
    state.username = "";
    state.roomId = null;
    setConnectionUiState();
    updateHeaderPills();
  }

  try {
    await logoutAuthenticatedUser();
  } catch {
    // Local sign-out should still complete even if the server logout call fails.
  }

  await persistSettings({
    authUser: null,
    authRememberMe: state.authRememberMeChoice,
    authRememberedEmail: state.authRememberMeChoice ? signinEmailInput.value.trim() : ""
  });
  signinPasswordInput.value = "";
  resetCodeInput.value = "";
  resetPasswordInput.value = "";
  signinRememberMeInput.checked = state.authRememberMeChoice;
  setAuthView("signin");
  showAuthShell();
  setAuthStatus("info", "Signed out. Sign in to continue.");
  showToast("Signed out successfully.", "info");
}

async function authRequest(path, payload) {
    const response = await fetch(`${getAuthApiBaseUrl()}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(result.error || result.message || "Authentication request failed.");
        error.authCode = result.code || "";
        if (error.authCode === "admin_forced_sign_out") {
          await handleForcedAdminSignOut(error.message || "Your session was ended by an administrator. The app will close now.");
        }
        if (error.authCode === "account_locked") {
          await handleLockedAccountSignOut(error.message || "This account has been locked. Please contact admin.");
        }
        if (error.authCode === "signed_in_elsewhere") {
          await handleSignedInElsewhereSignOut(error.message || "You were signed out because this account was signed in on another device.");
        }
        throw error;
      }

    return result;
  }

async function reportAuthenticatedAppError(error, errorContext, details = {}) {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken || state.forceClosing) {
    return;
  }

  const message = String(
    error?.message
      || error?.reason?.message
      || details.message
      || "Unknown application error."
  ).trim();
  if (!message) {
    return;
  }

  const errorCode = String(
    error?.authCode
      || error?.code
      || error?.reason?.code
      || details.errorCode
      || ""
  ).trim();

  const payload = {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    eventType: "app_error",
    errorContext: String(errorContext || "App").trim(),
    errorMessage: message,
    errorCode,
    source: "desktop_app",
    details: {
      ...details,
      provider: state.settings?.ttsProvider || "",
      connected: Boolean(state.connected)
    }
  };

  try {
    await fetch(`${getAuthApiBaseUrl()}/api/auth/audit-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch {
    // Ignore audit logging failures so they never disrupt the app flow.
  }
}

async function reportAuthenticatedDebugTrace(debugContext, debugMessage, details = {}) {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken || state.forceClosing) {
    return;
  }

  if (!state.authenticatedUser?.debugEnabled) {
    return;
  }

  const message = String(debugMessage || "").trim();
  if (!message) {
    return;
  }

  let systemUsage = null;
  try {
    systemUsage = await app.getSystemUsage();
  } catch {
    systemUsage = null;
  }

  const payload = {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    eventType: "debug_trace",
    debugContext: String(debugContext || "Debug").trim(),
    debugMessage: message,
    source: "desktop_app",
    details: {
      ...details,
      provider: state.settings?.ttsProvider || "",
      connected: Boolean(state.connected),
      queueCount: Number(state.playbackQueueItems?.length || 0),
      cpuUsagePercent: systemUsage?.cpuUsagePercent ?? null,
      ramUsagePercent: systemUsage?.ramUsagePercent ?? null,
      usedMemoryMb: systemUsage?.usedMemoryMb ?? null,
      totalMemoryMb: systemUsage?.totalMemoryMb ?? null
    }
  };

  try {
    await fetch(`${getAuthApiBaseUrl()}/api/auth/audit-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch {
    // Ignore debug logging failures so they never disrupt the app flow.
  }
}

async function verifyAuthenticatedSession() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken || state.forceClosing) {
    return null;
  }

  if (shouldDeferAuthSessionCheck()) {
    setAuthSessionCheckStatus("checking", "Session check: Paused while editing");
    return state.authenticatedUser;
  }

  try {
    setAuthSessionCheckStatus("checking", "Session check: Checking");
    const result = await authRequest("/api/auth/self-check", {
      userId: state.authenticatedUser.id,
      sessionToken: state.authenticatedUser.sessionToken
    });

    if (result.user) {
      applySessionCheckUserSnapshot(result.user);
    }

      if (result.active) {
        setAuthSessionCheckStatus("active", "Session check: Active");
        return result.user ?? state.authenticatedUser;
      }

      if (result.code === "account_locked") {
        await handleLockedAccountSignOut(result.message || "This account has been locked. Please contact admin.");
        return null;
      }

      if (result.code === "admin_forced_sign_out") {
        await handleForcedAdminSignOut(result.message || "Your session was ended by an administrator. The app will close now.");
        return null;
      }

      if (result.code === "signed_in_elsewhere") {
        await handleSignedInElsewhereSignOut(result.message || "You were signed out because this account was signed in on another device.");
        return null;
      }

    setAuthSessionCheckStatus("error", `Session check: ${result.message || "Inactive"}`);
    return null;
    } catch (error) {
      if (error?.authCode === "admin_forced_sign_out" || error?.authCode === "account_locked" || error?.authCode === "signed_in_elsewhere") {
        return null;
      }
      setAuthSessionCheckStatus("error", "Session check: Unavailable");
    return null;
  }
}

async function consumeConnectCredit(tiktokUsername = "") {
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    throw new Error("Please sign in again before connecting.");
  }

    const result = await authRequest("/api/auth/consume-connect-credit", {
      userId: user.id,
      sessionToken: user.sessionToken,
      tiktokUsername
    });

  await syncAuthenticatedUser(result.user);

  return result;
}

async function checkConnectCredit() {
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    throw new Error("Please sign in again before connecting.");
  }

  const result = await authRequest("/api/auth/check-connect-credit", {
    userId: user.id,
    sessionToken: user.sessionToken
  });

  await syncAuthenticatedUser(result.user);

  return result;
}

async function refreshAuthenticatedUser() {
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    throw new Error("Please sign in again before connecting.");
  }

  const result = await authRequest("/api/auth/session", {
    userId: user.id,
    sessionToken: user.sessionToken
  });

  await syncAuthenticatedUser(result.user);

  return result.user;
}

async function claimActiveConnectionSession(options = {}) {
  const { silent = false } = options;
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    return null;
  }

  const result = await authRequest("/api/auth/claim-active-connection", {
    userId: user.id,
    sessionToken: user.sessionToken
  });

  if (result.user) {
    await syncAuthenticatedUser(result.user);
  }

  if (!silent && result.claimed) {
    showToast("A previous active session was signed out for this account.", "info");
  }

  return result;
}

async function refreshCreditsStatus() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    creditsPill.textContent = "Credits: 0";
    return null;
  }

  try {
    return await refreshAuthenticatedUser();
  } catch {
    return null;
  }
}

async function openCreditsTopup() {
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    throw new Error("Please sign in before opening credit top up.");
  }

  const result = await authRequest("/api/auth/create-topup-session", {
    userId: user.id,
    sessionToken: user.sessionToken,
  });

  if (result.user) {
    await syncAuthenticatedUser(result.user);
  }

  await app.openExternal(result.url);
  showToast("Opened the secure credit top-up page in your browser.", "info");
  return result;
}

function isInsufficientCreditsError(error) {
  const message = String(error?.message ?? "").toLowerCase();
  return message.includes("do not have enough credits") || message.includes("not enough credits");
}

async function promptCreditsTopupForConnect() {
  const shouldTopup = window.confirm("You do not have enough credits to go live. Would you like to top up now?");
  if (!shouldTopup) {
    return false;
  }

  await openCreditsTopup();
  return true;
}

async function waitForStableConnectedLive(username) {
  await delay(CONNECT_CREDIT_STABILIZE_MS);
  const liveConnectionState = await app.getConnectionState();
  const normalizedRequestedUsername = String(username ?? "").trim().replace(/^@/, "").toLowerCase();
  const normalizedLiveUsername = String(liveConnectionState?.username ?? "").trim().replace(/^@/, "").toLowerCase();

  if (
    !liveConnectionState?.connected ||
    !liveConnectionState?.roomId ||
    normalizedLiveUsername !== normalizedRequestedUsername
  ) {
    throw new Error(`@${username} is no longer live, so no credit was deducted.`);
  }

  return liveConnectionState;
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
  syncQueueOverlayState();
}

function setStatusMessage(element, level, message) {
  element.className = `status ${level}`;
  element.textContent = message;
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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
  const providerLabel = ttsProviderSelect.value === "elevenlabs" ? "ElevenLabs" : "Built-in";
  const elevenModelLabel =
    ttsProviderSelect.value === "elevenlabs"
      ? ttsElevenModelSelect.options[ttsElevenModelSelect.selectedIndex]?.text ?? "selected model"
      : "";
  if (ttsProviderSelect.value === "elevenlabs" && !ttsElevenApiKeyInput.value.trim()) {
    setStatusMessage(ttsStatus, "info", `ElevenLabs is selected with ${voiceLabel}. Add your API key to generate speech on ${getQueueLabel(ttsQueueSelect.value)}.`);
    return;
  }
  if (ttsProviderSelect.value === "elevenlabs" && ttsElevenModeSelect.value === "paid" && !state.voices.length) {
    setStatusMessage(ttsStatus, "info", "Paid mode needs one of your own compatible ElevenLabs account voices.");
    return;
  }
  if (ttsRandomVoiceInput.checked) {
    const randomLabel = state.voices.length ? `${state.voices.length} available voices` : "no loaded voices";
    setStatusMessage(ttsStatus, "success", `TTS is on using random ${providerLabel} voices per message from ${randomLabel} on ${getQueueLabel(ttsQueueSelect.value)}. User-picked voices still take priority.`);
    return;
  }
  if (ttsProviderSelect.value === "elevenlabs") {
    setStatusMessage(ttsStatus, "success", `TTS is on using ${voiceLabel} via ${providerLabel} with ${elevenModelLabel} on ${getQueueLabel(ttsQueueSelect.value)}.`);
    return;
  }
  setStatusMessage(ttsStatus, "success", `TTS is on using ${voiceLabel} via ${providerLabel} on ${getQueueLabel(ttsQueueSelect.value)}.`);
}

function updateUpdateStatus() {
  setStatusMessage(updateStatus, state.updateLevel, state.updateMessage);
}

function updateFooterVersion() {
  if (appVersionLabel) {
    appVersionLabel.textContent = state.appVersion || "Unknown";
  }
  if (appVersionAuth) {
    appVersionAuth.textContent = state.appVersion || "Unknown";
  }
  if (appVersionInline) {
    appVersionInline.textContent = state.appVersion || "Unknown";
  }
}

function getActiveSettingsProfileId() {
  return String(state.settings?.activeSettingsProfileId ?? DEFAULT_SETTINGS_PROFILE_ID).trim() || DEFAULT_SETTINGS_PROFILE_ID;
}

function getActiveSettingsProfile() {
  const profileId = getActiveSettingsProfileId();
  return state.settings?.settingsProfiles?.[profileId] ?? null;
}

function renderSettingsProfileOptions() {
  if (!settingsProfileSelect) {
    return;
  }

  const profiles = state.settings?.settingsProfiles ?? {};
  const activeProfileId = getActiveSettingsProfileId();
  const profileEntries = Object.entries(profiles);

  settingsProfileSelect.innerHTML = profileEntries
    .map(([profileId, profile]) => {
      const label = String(profile?.name ?? profileId).trim() || profileId;
      return `<option value="${escapeHtml(profileId)}">${escapeHtml(label)}</option>`;
    })
    .join("");

  settingsProfileSelect.value = activeProfileId;

  if (settingsProfileDeleteButton) {
    settingsProfileDeleteButton.disabled = profileEntries.length <= 1;
  }
}

function buildSettingsExportBundle() {
  const profileId = getActiveSettingsProfileId();
  const activeProfile = getActiveSettingsProfile();

  return {
    schemaVersion: 1,
    app: "Stream Sync Pro",
    exportedAt: new Date().toISOString(),
    activeSettingsProfileId: profileId,
    settingsProfiles: normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings),
    exportedProfileName: String(activeProfile?.name ?? profileId).trim() || profileId
  };
}

function getSettingsImportProfileSnapshot(bundle) {
  if (bundle?.settingsProfiles && typeof bundle.settingsProfiles === "object") {
    return {
      settingsProfiles: bundle.settingsProfiles,
      activeSettingsProfileId: String(bundle.activeSettingsProfileId ?? DEFAULT_SETTINGS_PROFILE_ID).trim() || DEFAULT_SETTINGS_PROFILE_ID
    };
  }

  const importedSettings = bundle?.settings ?? bundle;
  return {
    settingsProfiles: {
      [DEFAULT_SETTINGS_PROFILE_ID]: {
        name: String(bundle?.profileName ?? "Imported").trim() || "Imported",
        settings: normalizeProfileSettingsSnapshot(importedSettings ?? {})
      }
    },
    activeSettingsProfileId: DEFAULT_SETTINGS_PROFILE_ID
  };
}

function createSettingsProfileId(profileName) {
  const base = String(profileName ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "profile";
  let nextId = base;
  let suffix = 2;

  while (state.settings?.settingsProfiles?.[nextId]) {
    nextId = `${base}-${suffix}`;
    suffix += 1;
  }

  return nextId;
}

async function switchSettingsProfile(profileId) {
  const nextProfileId = String(profileId ?? "").trim();
  const nextProfile = state.settings?.settingsProfiles?.[nextProfileId];
  if (!nextProfile) {
    return;
  }

  state.settings = ensureSettingsShape({
    ...state.settings,
    ...normalizeProfileSettingsSnapshot(nextProfile.settings),
    activeSettingsProfileId: nextProfileId
  });

  applySettingsToUi();
  renderSettingsProfileOptions();
  updateHeaderPills();
  renderCustomRules();
  await persistSettings({ activeSettingsProfileId: nextProfileId });
  showToast(`Switched to the ${nextProfile.name} profile.`, "success");
}

async function createSettingsProfile() {
  if (!settingsProfileModal || !settingsProfileNameInput) {
    throw new Error("The profile creation dialog is not available right now.");
  }

  settingsProfileNameInput.value = "New Profile";
  settingsProfileModal.hidden = false;
  window.setTimeout(() => {
    settingsProfileNameInput.focus();
    settingsProfileNameInput.select();
  }, 0);
}

function closeSettingsProfileModal() {
  if (!settingsProfileModal) {
    return;
  }

  settingsProfileModal.hidden = true;
}

async function saveSettingsProfileFromModal() {
  const profileName = String(settingsProfileNameInput?.value ?? "").trim();
  if (!profileName) {
    showToast("Enter a profile name to create it.", "error");
    return;
  }

  const nextProfileId = createSettingsProfileId(profileName);
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  nextProfiles[nextProfileId] = {
    name: profileName,
    settings: getCurrentProfileSettingsFromUi()
  };

  state.settings = ensureSettingsShape({
    ...state.settings,
    settingsProfiles: nextProfiles,
    activeSettingsProfileId: nextProfileId,
    ...nextProfiles[nextProfileId].settings
  });

  closeSettingsProfileModal();
  applySettingsToUi();
  renderSettingsProfileOptions();
  await persistSettings({
    settingsProfiles: nextProfiles,
    activeSettingsProfileId: nextProfileId
  });
  showToast(`Created the ${profileName} profile.`, "success");
}

async function deleteSettingsProfile() {
  const activeProfileId = getActiveSettingsProfileId();
  const activeProfile = getActiveSettingsProfile();
  const profileEntries = Object.entries(state.settings?.settingsProfiles ?? {});

  if (profileEntries.length <= 1) {
    showToast("Keep at least one settings profile in the app.", "info");
    return;
  }

  const shouldDelete = window.confirm(`Delete the ${activeProfile?.name ?? "current"} profile?`);
  if (!shouldDelete) {
    return;
  }

  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  delete nextProfiles[activeProfileId];
  const fallbackProfileId = Object.keys(nextProfiles)[0];
  const fallbackProfile = nextProfiles[fallbackProfileId];

  state.settings = ensureSettingsShape({
    ...state.settings,
    ...normalizeProfileSettingsSnapshot(fallbackProfile.settings),
    settingsProfiles: nextProfiles,
    activeSettingsProfileId: fallbackProfileId
  });

  applySettingsToUi();
  renderSettingsProfileOptions();
  await persistSettings({
    settingsProfiles: nextProfiles,
    activeSettingsProfileId: fallbackProfileId
  });
  showToast(`Deleted the ${activeProfile?.name ?? "selected"} profile.`, "info");
}

async function exportSettingsBundle() {
  const activeProfile = getActiveSettingsProfile();
  const defaultFileName = `${String(activeProfile?.name ?? "stream-sync-pro-settings").trim().replace(/[^a-z0-9]+/gi, "-") || "stream-sync-pro-settings"}.json`;
  const result = await app.exportSettingsBundle({
    defaultFileName,
    bundle: buildSettingsExportBundle()
  });

  if (result?.canceled) {
    return;
  }

  showToast("Settings export created successfully.", "success");
}

async function importSettingsBundle() {
  const result = await app.importSettingsBundle();
  if (result?.canceled) {
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(String(result?.content ?? ""));
  } catch {
    throw new Error("That settings file could not be read as valid JSON.");
  }

  const imported = getSettingsImportProfileSnapshot(parsed);
  const nextProfiles = normalizeSettingsProfiles(imported.settingsProfiles, state.settings);
  const requestedProfileId = String(imported.activeSettingsProfileId ?? DEFAULT_SETTINGS_PROFILE_ID).trim() || DEFAULT_SETTINGS_PROFILE_ID;
  const nextProfileId = nextProfiles[requestedProfileId] ? requestedProfileId : Object.keys(nextProfiles)[0];
  const nextProfile = nextProfiles[nextProfileId];

  state.settings = ensureSettingsShape({
    ...state.settings,
    ...normalizeProfileSettingsSnapshot(nextProfile.settings),
    settingsProfiles: nextProfiles,
    activeSettingsProfileId: nextProfileId
  });

  applySettingsToUi();
  renderSettingsProfileOptions();
  await persistSettings({
    settingsProfiles: nextProfiles,
    activeSettingsProfileId: nextProfileId
  });
  showToast("Settings import completed successfully.", "success");
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
      const userKey = normalizeUserKey(item.user);
      const note = getUserNote(userKey);
      const likeTotal = getSessionUserMetricValue("likes", userKey);
      const bodyText = item.translatedText
        ? `${escapeHtml(item.message)}<br /><span class="chat-handle">${escapeHtml(item.translatedText)}</span>`
        : escapeHtml(item.message);

      return `
        <article class="chat-row ${escapeHtml(item.type)}" data-id="${escapeHtml(item.id)}">
          <div class="chat-card-head">
            <div class="chat-identity">
              <button
                type="button"
                class="chat-user-button"
                data-chat-user="${escapeHtml(userKey)}"
                data-chat-user-label="${escapeHtml(item.nickname || item.user || "Unknown user")}"
                title="${note ? escapeHtml(`Edit note for @${userKey}`) : escapeHtml(`Add note for @${userKey}`)}"
              >
                <strong>${escapeHtml(item.nickname || item.user || "Unknown user")}</strong>
                <span class="chat-handle">@${escapeHtml(item.user || "unknown")}</span>
                ${likeTotal > 0 ? `<span class="chat-like-pill">${escapeHtml(String(likeTotal))} likes</span>` : ""}
                ${note ? `<span class="chat-note-pill">Note saved</span>` : ""}
              </button>
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
  updateQueueIndicators();
  updateMessagesPerMinute();
}

function closeChatNotesPanel() {
  state.activeChatNoteUser = "";
  chatNotesPanel.hidden = true;
  chatNotesInput.value = "";
}

function openChatNotesPanel(userKey, userLabel = "") {
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return;
  }

  state.activeChatNoteUser = normalizedUser;
  chatNotesTitle.textContent = userLabel ? `Notes for ${userLabel} (@${normalizedUser})` : `Notes for @${normalizedUser}`;
  chatNotesInput.value = getUserNote(normalizedUser);
  chatNotesDeleteButton.disabled = !getUserNote(normalizedUser);
  chatNotesPanel.hidden = false;
  chatNotesInput.focus();
  chatNotesInput.setSelectionRange(chatNotesInput.value.length, chatNotesInput.value.length);
}

async function saveChatNote() {
  const userKey = normalizeUserKey(state.activeChatNoteUser);
  if (!userKey) {
    return;
  }

  const nextNotes = {
    ...normalizeUserNotes(state.settings.userNotes),
    [userKey]: chatNotesInput.value.trim()
  };

  if (!nextNotes[userKey]) {
    delete nextNotes[userKey];
  }

  await persistSettings({ userNotes: nextNotes });
  chatNotesDeleteButton.disabled = !getUserNote(userKey);
  renderChatList();
  showToast(getUserNote(userKey) ? `Saved note for @${userKey}.` : `Cleared note for @${userKey}.`, "success");
}

async function deleteChatNote() {
  const userKey = normalizeUserKey(state.activeChatNoteUser);
  if (!userKey) {
    return;
  }

  const nextNotes = {
    ...normalizeUserNotes(state.settings.userNotes)
  };
  delete nextNotes[userKey];
  await persistSettings({ userNotes: nextNotes });
  renderChatList();
  closeChatNotesPanel();
  showToast(`Deleted note for @${userKey}.`, "info");
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
  state.sessionUserProfiles = new Map();
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
    state.currentGainNode = gainNode;
    gainNode.gain.value = volume;
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(state.audioContext.destination);
    source.onended = () => {
      if (state.currentGainNode === gainNode) {
        state.currentGainNode = null;
      }
      resolve();
    };
    source.start(0);
  });
}

function stopCurrentAudioPlayback() {
  if (!state.currentGainNode) {
    return;
  }

  try {
    state.currentGainNode.gain.cancelScheduledValues(0);
    state.currentGainNode.gain.setValueAtTime(state.currentGainNode.gain.value, state.audioContext?.currentTime ?? 0);
    state.currentGainNode.gain.linearRampToValueAtTime(0, (state.audioContext?.currentTime ?? 0) + 0.06);
  } catch {
    // Ignore audio shutdown issues during disconnect cleanup.
  } finally {
    state.currentGainNode = null;
  }
}

function clearLiveInteractionState() {
  clearAllQueuedPlaybackItems(["tts", "action"]);
  stopCurrentAudioPlayback();
}

function getEffectiveCustomRule(ruleId) {
  const rule = state.settings.customEventRules.find((item) => item.id === ruleId);
  if (!rule) {
    return null;
  }

  const nameInput = document.querySelector(`[data-rule-name="${ruleId}"]`);
  const metricInput = document.querySelector(`input[data-rule-metric="${ruleId}"]:checked`);
  const thresholdInput = document.querySelector(`[data-rule-threshold="${ruleId}"]`);
  const enabledToggle = document.querySelector(`[data-rule-enabled-toggle="${ruleId}"]`);
  const soundSelect = document.querySelector(`[data-rule-sound-select="${ruleId}"]`);
  const queueSelect = document.querySelector(`[data-rule-queue="${ruleId}"]`);
  const webhookUrlInput = document.querySelector(`[data-rule-webhook-url="${ruleId}"]`);
  const triggerAudienceInput = document.querySelector(`input[data-rule-trigger-audience="${ruleId}"]:checked`);
  const triggerUsernameInput = document.querySelector(`[data-rule-trigger-username="${ruleId}"]`);

  return normalizeRule({
    ...rule,
    name: nameInput?.value ?? rule.name,
    metric: metricInput?.value ?? rule.metric,
    threshold: Number(thresholdInput?.value ?? rule.threshold),
    enabled: enabledToggle?.checked ?? rule.enabled,
    queueId: normalizeQueueId(queueSelect?.value ?? rule.queueId, 1),
    soundId: soundSelect?.value ?? rule.soundId,
    webhookUrl: webhookUrlInput?.value?.trim() ?? rule.webhookUrl,
    triggerAudience: triggerAudienceInput?.value ?? rule.triggerAudience,
    triggerUsername: normalizeUserKey(triggerUsernameInput?.value ?? rule.triggerUsername)
  });
}

async function previewCustomRuleAction(ruleId) {
  const rule = getEffectiveCustomRule(ruleId);
  const searchInput = document.querySelector(`[data-rule-sound-search="${ruleId}"]`);
  const webhookUrlInput = document.querySelector(`[data-rule-webhook-url="${ruleId}"]`);

  if (!rule) {
    return;
  }

  if (!rule.soundId && !rule.webhookUrl) {
    showToast("Choose a sound or enter a webhook URL to test this action.", "info");
    searchInput?.focus();
    return;
  }

  if (rule.webhookUrl) {
    try {
      new URL(rule.webhookUrl);
    } catch {
      showToast("Enter a valid webhook URL before testing this action.", "error");
      webhookUrlInput?.focus();
      return;
    }
  }

  await triggerCustomRule(rule, { testMode: true });
}

async function previewCustomRuleSound(ruleId) {
  const rule = getEffectiveCustomRule(ruleId);
  const searchInput = document.querySelector(`[data-rule-sound-search="${ruleId}"]`);

  if (!rule?.soundId) {
    showToast("Choose a sound to preview first.", "info");
    searchInput?.focus();
    return;
  }

  try {
    await enqueuePlaybackTask(rule.queueId, async () => {
      const { audioUrl } = await app.resolveSoundAlertAudio(rule.soundId);
      await playAudioUrl(audioUrl, 1);
    }, { label: `Sound preview: ${rule.name}`, kind: "action" });
  } catch (error) {
    if (error?.cleared) {
      return;
    }
    showToast(error.message || "Unable to preview that sound.", "error");
  }
}

async function triggerCustomRule(rule, options = {}) {
  const { testMode = false } = options;
  if (!rule?.soundId && !rule?.webhookUrl) {
    return;
  }

  await enqueuePlaybackTask(rule.queueId, async () => {
    const triggerTasks = [];

    if (rule.soundId) {
      triggerTasks.push(
        (async () => {
          try {
            const { audioUrl } = await app.resolveSoundAlertAudio(rule.soundId);
            await playAudioUrl(audioUrl, 1);
          } catch (error) {
            showToast(error.message || `Unable to play the sound for "${rule.name}".`, "error");
          }
        })()
      );
    }

    if (rule.webhookUrl) {
      triggerTasks.push(
        (async () => {
          try {
            const response = await fetch(rule.webhookUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ruleId: rule.id,
                ruleName: rule.name,
                metric: rule.metric,
                threshold: rule.threshold,
                queueId: normalizeQueueId(rule.queueId, 1),
                triggeredAt: new Date().toISOString(),
                testMode
              })
            });

            if (!response.ok) {
              throw new Error(`Webhook returned ${response.status}.`);
            }
          } catch (error) {
            showToast(error.message || `Unable to trigger the webhook for "${rule.name}".`, "error");
          }
        })()
      );
    }

    await Promise.allSettled(triggerTasks);
  }, { label: `${testMode ? "Test action" : "Event action"}: ${rule.name}`, kind: "action" });

  if (testMode) {
    showToast(`Tested custom action: ${rule.name}`, "success");
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
      const hasSound = Boolean(selectedSound);
      const hasWebhook = Boolean(rule.webhookUrl);
      const actionSummary = [
        hasSound ? `sound: ${selectedSound?.title}` : "",
        hasWebhook ? "webhook enabled" : "",
        getQueueLabel(rule.queueId)
      ].filter(Boolean).join(" and ");
      return `
        <article class="custom-rule-card" data-rule-id="${escapeHtml(rule.id)}">
          <div class="custom-rule-top">
            <div>
              <strong>${escapeHtml(rule.name)}</strong>
                <p class="helper-text">
                Trigger when ${escapeHtml(rule.metric)} reaches ${escapeHtml(String(rule.threshold))} for ${escapeHtml(getTriggerAudienceLabel(rule))}${actionSummary ? ` with ${escapeHtml(actionSummary)}.` : "."}
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
              <button type="button" class="ghost icon-button" data-custom-preview="${escapeHtml(rule.id)}" title="Test action" aria-label="Test action">&#9654;</button>
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

          <fieldset class="field field-span-2 event-builder-group">
            <div class="event-builder-label">
              <span>Who is able to trigger the event?</span>
            </div>
            <div class="event-builder-options">
              <div class="trigger-audience-options">
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-audience-${escapeHtml(rule.id)}" value="everyone" data-rule-trigger-audience="${escapeHtml(rule.id)}" ${rule.triggerAudience === "everyone" ? "checked" : ""} />
                  <span>Everyone</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-audience-${escapeHtml(rule.id)}" value="follower" data-rule-trigger-audience="${escapeHtml(rule.id)}" ${rule.triggerAudience === "follower" ? "checked" : ""} />
                  <span>Any Follower</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-audience-${escapeHtml(rule.id)}" value="subscriber" data-rule-trigger-audience="${escapeHtml(rule.id)}" ${rule.triggerAudience === "subscriber" ? "checked" : ""} />
                  <span>Any Subscriber</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-audience-${escapeHtml(rule.id)}" value="moderator" data-rule-trigger-audience="${escapeHtml(rule.id)}" ${rule.triggerAudience === "moderator" ? "checked" : ""} />
                  <span>Any Moderator</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-audience-${escapeHtml(rule.id)}" value="topGifter" data-rule-trigger-audience="${escapeHtml(rule.id)}" ${rule.triggerAudience === "topGifter" ? "checked" : ""} />
                  <span>Top Gifter</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-audience-${escapeHtml(rule.id)}" value="specificUser" data-rule-trigger-audience="${escapeHtml(rule.id)}" ${rule.triggerAudience === "specificUser" ? "checked" : ""} />
                  <span>A specific user</span>
                </label>
              </div>
              <label class="field ${rule.triggerAudience === "specificUser" ? "" : "is-hidden"}" data-rule-trigger-username-wrapper="${escapeHtml(rule.id)}">
                <span>Specific username</span>
                <input
                  data-rule-trigger-username="${escapeHtml(rule.id)}"
                  type="text"
                  placeholder="@username"
                  value="${escapeHtml(rule.triggerUsername || "")}"
                  autocomplete="off"
                />
              </label>
            </div>
          </fieldset>

          <fieldset class="field field-span-2 event-builder-group">
            <div class="event-builder-label">
              <span>By what will the event be triggered?</span>
            </div>
            <div class="event-builder-options">
              <div class="event-trigger-options">
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="follows" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "follows" ? "checked" : ""} />
                  <span>Follow</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="shares" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "shares" ? "checked" : ""} />
                  <span>Share</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="likes" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "likes" ? "checked" : ""} />
                  <span>Sending likes (taps)</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="coins" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "coins" ? "checked" : ""} />
                  <span>Sending a gift with min. coins value</span>
                </label>
              </div>
              <label class="field" data-rule-threshold-wrapper="${escapeHtml(rule.id)}">
                <span data-rule-threshold-label="${escapeHtml(rule.id)}">${escapeHtml(getMetricThresholdLabel(rule.metric))}</span>
                <input data-rule-threshold="${escapeHtml(rule.id)}" type="number" min="1" step="1" value="${escapeHtml(String(rule.threshold))}" />
              </label>
            </div>
          </fieldset>

            <label class="field">
              <span>Search sounds</span>
              <input data-rule-sound-search="${escapeHtml(rule.id)}" placeholder="Search sound library" autocomplete="off" />
          </label>

            <label class="field">
              <span>Sound</span>
              <div class="inline-sound-picker">
                <select data-rule-sound-select="${escapeHtml(rule.id)}">
                  <option value="">Choose a sound</option>
                ${optionsMarkup}
                </select>
                <button type="button" class="ghost icon-button inline-preview-button" data-custom-preview-sound="${escapeHtml(rule.id)}" title="Preview sound" aria-label="Preview sound">&#9654;</button>
              </div>
            </label>

            <label class="field">
              <span>Queue</span>
              <select data-rule-queue="${escapeHtml(rule.id)}">
                ${Array.from({ length: 10 }, (_, index) => {
                  const queueId = index + 1;
                  return `<option value="${queueId}" ${queueId === normalizeQueueId(rule.queueId, 1) ? "selected" : ""}>${getQueueLabel(queueId)}</option>`;
                }).join("")}
              </select>
            </label>

            <label class="field field-span-2">
              <span>Webhook URL</span>
              <input
                data-rule-webhook-url="${escapeHtml(rule.id)}"
                type="url"
                placeholder="https://your-endpoint.example/webhook"
                value="${escapeHtml(rule.webhookUrl || "")}"
                autocomplete="off"
              />
            </label>
        </div>

          <div class="custom-rule-actions">
            <button type="button" class="ghost icon-button" data-custom-preview="${escapeHtml(rule.id)}" title="Test action" aria-label="Test action">&#9654;</button>
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

function updateTriggerAudienceVisibility(ruleId, triggerAudience) {
  const wrapper = document.querySelector(`[data-rule-trigger-username-wrapper="${ruleId}"]`);
  if (!wrapper) {
    return;
  }

  wrapper.classList.toggle("is-hidden", triggerAudience !== "specificUser");
}

function updateMetricThresholdLabel(ruleId, metric) {
  const label = document.querySelector(`[data-rule-threshold-label="${ruleId}"]`);
  if (!label) {
    return;
  }

  label.textContent = getMetricThresholdLabel(metric);
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

function updateSessionUserProfile(item) {
  const userId = normalizeUserKey(item?.user);
  if (!userId) {
    return null;
  }

  const existing = state.sessionUserProfiles.get(userId) ?? {
    user: userId,
    nickname: item?.nickname ?? userId,
    isSubscriber: false,
    isModerator: false,
    followedThisSession: false
  };

  const nextProfile = {
    ...existing,
    nickname: item?.nickname ?? existing.nickname ?? userId,
    isSubscriber: Boolean(item?.isSubscriber) || existing.isSubscriber,
    isModerator: Boolean(item?.isModerator) || existing.isModerator,
    followedThisSession: existing.followedThisSession || item?.type === "follow"
  };

  state.sessionUserProfiles.set(userId, nextProfile);
  return nextProfile;
}

function getTopGifterUserId() {
  let topUserId = "";
  let topCoins = 0;

  for (const [userId, coins] of state.sessionUserMetrics.coins.entries()) {
    const numericCoins = Number(coins) || 0;
    if (numericCoins > topCoins) {
      topCoins = numericCoins;
      topUserId = userId;
    }
  }

  return topCoins > 0 ? topUserId : "";
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
    if (!ttsReadGiftsInput.checked) {
      return false;
    }

    const minimumCoins = Math.max(0, Number(ttsGiftMinCoinsInput.value) || 0);
    const totalCoins = Math.max(0, Number(item.totalCoins) || 0);
    return totalCoins >= minimumCoins;
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

function addLocalSystemChatMessage(message) {
  const item = {
    id: `system-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    type: "system",
    user: "system",
    nickname: "Stream Sync Pro LIVE",
    message,
    translatedText: "",
    detectedLanguage: null,
    timestamp: new Date().toISOString()
  };

  state.chatItems.unshift(item);
  if (state.chatItems.length > MAX_CHAT_MESSAGES) {
    state.chatItems.length = MAX_CHAT_MESSAGES;
  }

  renderChatList();
}

async function handleListCommandsCommand(item) {
  if (item.type !== "chat") {
    return false;
  }

  const normalizedMessage = String(item.message ?? "").trim().toLowerCase();
  if (normalizedMessage !== "!listcomands" && normalizedMessage !== "!listcommands") {
    return false;
  }

  const commandSummary = `Available chat commands: ${getSupportedChatCommandList()}.`;

  addLocalSystemChatMessage(commandSummary);
  showCommandFeedbackOverlay("listcommands", {
    user: `@${item.user}`,
    commandList: getSupportedChatCommandList()
  });
  showToast(`Displayed the available chat commands for @${item.user}.`, "info");
  return true;
}

function getResolvedTtsVoiceSelection(item = null) {
  const availableEntries = getAvailableTtsVoiceEntries();
  const availableByValue = new Map(availableEntries.map((entry) => [entry.value, entry]));
  const assignedVoiceValue = item?.user ? getUserAssignedTtsVoice(item.user) : "";

  if (assignedVoiceValue && availableByValue.has(assignedVoiceValue)) {
    const assignedEntry = availableByValue.get(assignedVoiceValue);
    return {
      value: assignedEntry.value,
      label: assignedEntry.baseLabel,
      random: false,
      assigned: true
    };
  }

  if (ttsRandomVoiceInput.checked && availableEntries.length > 0) {
    const randomEntry = availableEntries[Math.floor(Math.random() * availableEntries.length)];
    return {
      value: randomEntry.value,
      label: randomEntry.baseLabel,
      random: true,
      assigned: false
    };
  }

  const selectedValue = String(ttsVoiceSelect.value ?? "").trim();
  if (selectedValue && availableByValue.has(selectedValue)) {
    const selectedEntry = availableByValue.get(selectedValue);
    return {
      value: selectedEntry.value,
      label: selectedEntry.baseLabel,
      random: false,
      assigned: false
    };
  }

  return {
    value: selectedValue,
    label: voiceLabelFromSelect(),
    random: false,
    assigned: false
  };
}

function voiceLabelFromSelect() {
  return ttsVoiceSelect.options[ttsVoiceSelect.selectedIndex]?.text ?? "Default voice";
}

function getStyleAdjustedPitch() {
  const styleProfile = TTS_STYLE_PROFILES.natural;
  const basePitch = Number(ttsPitchInput.value) || 1;
  return clamp(basePitch + styleProfile.pitchOffset, 0.5, 1.8);
}

function getStyleAdjustedRate() {
  const styleProfile = TTS_STYLE_PROFILES.natural;
  const baseRate = Number(ttsRateInput.value) || 1;
  return clamp(baseRate + styleProfile.rateOffset, 0.7, 1.5);
}

function getStyleAdjustedVolume() {
  const styleProfile = TTS_STYLE_PROFILES.natural;
  const baseVolume = Number(ttsVolumeInput.value) || 1;
  return clamp(baseVolume * styleProfile.volumeMultiplier, 0.2, 3);
}

function updateTtsProviderVisibility() {
  const isElevenLabs = ttsProviderSelect.value === "elevenlabs";

  ttsElevenModeField.classList.toggle("is-hidden", !isElevenLabs);
  ttsElevenApiKeyField.classList.toggle("is-hidden", !isElevenLabs);
  ttsElevenModelField.classList.toggle("is-hidden", !isElevenLabs);
}

function enqueueSpeech(text, options = {}) {
  if (!text) {
    return;
  }

  const previewText = text.length > 44 ? `${text.slice(0, 44)}...` : text;
  const provider = options.provider ?? ttsProviderSelect.value;
  const mode = options.mode ?? ttsElevenModeSelect.value;
  const apiKey = options.apiKey ?? ttsElevenApiKeyInput.value.trim();
  const modelId = options.modelId ?? ttsElevenModelSelect.value;
  const voiceSelection = options.voiceSelection ?? getResolvedTtsVoiceSelection();
  const queueId = options.queueId ?? ttsQueueSelect.value;
  const receivedAt = Number(options.receivedAt || Date.now());
  const sourceUser = String(options.sourceUser || "").trim();
  const rate = options.rate ?? getStyleAdjustedRate();
  const pitch = options.pitch ?? getStyleAdjustedPitch();
  const volume = options.volume ?? getStyleAdjustedVolume();
  const queuedAt = Date.now();

  void reportAuthenticatedDebugTrace("TTS queued", "Queued TTS message for playback.", {
    queueId,
    voice: voiceSelection?.value || "",
    previewText,
    sourceUser,
    latencySinceReceiptMs: Math.max(0, queuedAt - receivedAt)
  });

  void enqueuePlaybackTask(queueId, async () => {
    const playbackStartedAt = Date.now();
    const synthStartedAt = Date.now();

    await reportAuthenticatedDebugTrace("TTS playback", "Starting queued TTS playback task.", {
      queueId,
      voice: voiceSelection?.value || "",
      previewText,
      sourceUser,
      queueWaitMs: Math.max(0, playbackStartedAt - queuedAt),
      latencySinceReceiptMs: Math.max(0, playbackStartedAt - receivedAt)
    });

    try {
        const result = await app.speakToFile({
          text,
          provider,
          voiceName: voiceSelection.value,
          voiceId: voiceSelection.value,
          mode,
          apiKey,
          modelId,
          style: "natural",
          rate,
          pitch
        });
      const synthCompletedAt = Date.now();

      await reportAuthenticatedDebugTrace("TTS synthesis", "Finished generating TTS audio file.", {
        queueId,
        voice: voiceSelection?.value || "",
        previewText,
        sourceUser,
        synthDurationMs: Math.max(0, synthCompletedAt - synthStartedAt),
        latencySinceReceiptMs: Math.max(0, synthCompletedAt - receivedAt),
        filePath: result?.filePath || ""
      });

      const fileUrl = new URL(`file://${result.filePath.replaceAll("\\", "/")}`).toString();
        await playAudioUrl(fileUrl, volume);
        const playbackCompletedAt = Date.now();

        await reportAuthenticatedDebugTrace("TTS complete", "Completed TTS playback.", {
          queueId,
          voice: voiceSelection?.value || "",
          previewText,
          sourceUser,
          totalLatencyMs: Math.max(0, playbackCompletedAt - receivedAt),
          playbackDurationMs: Math.max(0, playbackCompletedAt - synthCompletedAt)
        });
        await app.deleteTtsFile(result.filePath);
      } catch (error) {
        if (error?.cleared) {
          return;
        }
        void reportAuthenticatedAppError(error, "TTS playback", {
          queueId,
          voice: voiceSelection?.value || "",
          previewText
        });
        showToast(error.message || "Unable to play TTS audio.", "error");
      }
  }, {
    label: `TTS: ${previewText}${voiceSelection.label ? ` · ${voiceSelection.label}` : ""}`,
    kind: "tts"
  });
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
      void reportAuthenticatedAppError(error, "Translation", {
        targetLanguage: translationTargetLanguageSelect.value
      });
      setStatusMessage(translationStatus, "error", error.message || "Translation failed.");
      return item;
    }
}

async function handleMyTtsVoiceCommand(item) {
  if (item.type !== "chat") {
    return false;
  }

  const match = String(item.message ?? "").trim().match(/^!myttsvoice\s+(\d+)\s*$/i);
  if (!match) {
    return false;
  }

  const availableEntries = getAvailableTtsVoiceEntries();
  const selectedNumber = Number(match[1]);
  const selectedEntry = availableEntries.find((entry) => entry.index === selectedNumber);

  if (!availableEntries.length) {
    showToast(`@${item.user} tried to set a TTS voice, but no voices are currently loaded.`, "error");
    return true;
  }

  if (!selectedEntry) {
    showToast(`@${item.user} chose an invalid TTS voice number. Available voices: 1-${availableEntries.length}.`, "error");
    return true;
  }

  await saveUserAssignedTtsVoice(item.user, selectedEntry.value);
  showCommandFeedbackOverlay("myttsvoice", {
    user: `@${item.user}`,
    voiceLabel: selectedEntry.label,
    voiceNumber: String(selectedNumber)
  });
  showToast(`@${item.user} set their TTS voice to ${selectedEntry.label}.`, "success");
  return true;
}

async function handleIncomingChat(payload) {
  if (!state.connected) {
    return;
  }

  const receivedAt = Date.now();

  const item = await translateChatItem({
    ...payload,
    translatedText: payload.translatedText ?? "",
    detectedLanguage: payload.detectedLanguage ?? null
  });

  updateSessionUserProfile(item);
  void reportAuthenticatedDebugTrace("Chat received", "Received live chat or interaction event.", {
    itemType: item.type,
    user: item.user || "",
    previewText: String(item.text || item.giftName || "").slice(0, 120),
    translatedText: String(item.translatedText || "").slice(0, 120)
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
  if (ttsVoiceManagerModal && !ttsVoiceManagerModal.hidden) {
    renderTtsVoiceManagerUserSuggestions();
  }
  updateStats();
  checkCustomRules();

  const handledListCommands = await handleListCommandsCommand(item);
  if (handledListCommands) {
    return;
  }

  const handledVoiceCommand = await handleMyTtsVoiceCommand(item);
  if (handledVoiceCommand) {
    return;
  }

  if (shouldSpeakChatItem(item)) {
    enqueueSpeech(buildSpeechText(item), {
      voiceSelection: getResolvedTtsVoiceSelection(item),
      receivedAt,
      sourceUser: item.user || ""
    });
  }
}

function checkCustomRules() {
  for (const rule of state.settings.customEventRules) {
    if (!rule.enabled) {
      continue;
    }

    const threshold = Math.max(1, Number(rule.threshold) || 1);
    const value = getAudienceQualifiedMetricValue(rule);
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
    const voices = await app.getTtsVoices({
      provider: ttsProviderSelect.value,
      mode: ttsElevenModeSelect.value,
      apiKey: ttsElevenApiKeyInput.value.trim()
    });
    state.voices = Array.isArray(voices) ? voices : [];
    } catch (error) {
      state.voices = [];
      void reportAuthenticatedAppError(error, "TTS voice loading", {
        provider: ttsProviderSelect.value,
        mode: ttsElevenModeSelect.value
      });
      setStatusMessage(ttsStatus, "error", error.message || "Unable to load voices.");
    }

  const selectedVoice = state.settings.ttsVoice;
  const options = getAvailableTtsVoiceEntries().map((entry) => {
    return `<option value="${escapeHtml(entry.value)}">${escapeHtml(entry.label)}</option>`;
  });

  ttsVoiceSelect.innerHTML = `<option value="">${ttsProviderSelect.value === "elevenlabs" ? "Select an ElevenLabs voice" : "Default system voice"}</option>${options.join("")}`;
  const hasSelectedVoice = state.voices.some((voice) => (ttsProviderSelect.value === "elevenlabs" ? voice.id : voice.name) === selectedVoice);
  if (selectedVoice && hasSelectedVoice) {
    ttsVoiceSelect.value = selectedVoice;
  } else if (selectedVoice) {
    const fallbackLabel = ttsProviderSelect.value === "elevenlabs"
      ? `Saved voice (${selectedVoice})`
      : `Saved system voice (${selectedVoice})`;
    ttsVoiceSelect.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(selectedVoice)}">${escapeHtml(fallbackLabel)}</option>`);
    ttsVoiceSelect.value = selectedVoice;
  } else {
    ttsVoiceSelect.value = "";
  }

  if (ttsProviderSelect.value === "elevenlabs" && ttsElevenModeSelect.value === "paid" && !state.voices.length) {
    setStatusMessage(ttsStatus, "info", "No compatible ElevenLabs account voices were found for Paid mode. Create or save an eligible voice in ElevenLabs, or switch to Free mode.");
  }

  if (ttsVoiceManagerModal && !ttsVoiceManagerModal.hidden) {
    renderTtsVoiceManager();
  }

  updateTtsStatus();
}

function applySettingsToUi() {
  const settings = state.settings;

  rememberUsernameInput.checked = settings.rememberUsername;
  usernameInput.value = settings.rememberUsername ? settings.rememberedUsername ?? "" : settings.rememberedUsername ? settings.rememberedUsername : usernameInput.value;
  renderRememberedUsernameOptions();
  renderSettingsProfileOptions();

  translationEnabledInput.checked = settings.translationEnabled;
  translationTargetLanguageSelect.value = settings.translationTargetLanguage;
  translationProviderUrlInput.value = "Google online translator";
  translationApiKeyInput.value = "Free built-in mode";

  ttsEnabledInput.checked = settings.ttsEnabled;
  ttsProviderSelect.value = settings.ttsProvider || "builtin";
  ttsRandomVoiceInput.checked = Boolean(settings.ttsRandomVoicePerMessage);
  ttsIncludeUsernameInput.checked = settings.ttsIncludeUsername;
  ttsReadGiftsInput.checked = settings.ttsReadGifts;
  ttsGiftMinCoinsInput.value = String(Math.max(0, Number(settings.ttsGiftMinCoins) || 0));
  ttsElevenModeSelect.value = settings.ttsElevenMode || "free";
  ttsElevenApiKeyInput.value = settings.ttsElevenApiKey || "";
  ttsElevenModelSelect.value = settings.ttsElevenModel || "eleven_flash_v2_5";
  ttsQueueSelect.value = String(normalizeQueueId(settings.ttsQueue, 1));
  ttsRateInput.value = String(settings.ttsRate);
  ttsPitchInput.value = String(settings.ttsPitch);
  ttsVolumeInput.value = String(settings.ttsVolume);

    ttsAudienceAllInput.checked = settings.ttsAudience.allViewers;
    ttsAudienceSubscribersInput.checked = settings.ttsAudience.subscribers;
    ttsAudienceModeratorsInput.checked = settings.ttsAudience.moderators;
    ttsAudienceVipsInput.checked = false;
    commandFeedbackDurationInput.value = String(Math.max(1000, Number(settings.commandFeedbackOverlayDurationMs) || 6000));
    commandFeedbackTemplateMyttsvoiceInput.value = settings.commandFeedbackTemplates?.myttsvoice ?? "";
    commandFeedbackTemplateListcommandsInput.value = settings.commandFeedbackTemplates?.listcommands ?? "";
    updateTtsProviderVisibility();

  updateRatePitchVolumeLabels();
  updateTranslationStatus();
  updateTtsStatus();
  updateHeaderPills();
  renderCustomRules();
}

async function initializeAuthShell() {
  showAuthShell();
  setAuthView("signin");
  state.authRememberMeChoice = Boolean(state.settings?.authRememberMe);
  signinRememberMeInput.checked = state.authRememberMeChoice;
  signinEmailInput.value = String(state.settings?.authRememberedEmail || "");

  if (state.settings?.authRememberMe && state.settings?.authUser) {
    try {
      state.authenticatedUser = state.settings.authUser;
      await refreshAuthenticatedUser();
      await claimActiveConnectionSession({ silent: true });
      showDashboardForUser(state.authenticatedUser);
      return;
    } catch {
      await persistSettings({ authUser: null });
    }
  }

  try {
    const response = await fetch(`${getAuthApiBaseUrl()}/api/health`);
    if (response.ok) {
      setAuthStatus("info", "Sign in to continue.");
      return;
    }
  } catch {
    // Fall through to friendly offline/auth server guidance.
  }

  setAuthStatus("error", "The website authentication service is offline right now. Please try again shortly.");
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
  if (headerEventsWired) {
    return;
  }
  headerEventsWired = true;

  connectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const liveConnectionState = await app.getConnectionState();
    state.connected = Boolean(liveConnectionState?.connected);
    state.username = liveConnectionState?.username ?? state.username;
    state.roomId = liveConnectionState?.roomId ?? state.roomId;
    updateHeaderPills();
    setConnectionUiState();

    if (state.connected) {
        try {
          state.connecting = true;
          setConnectionUiState();
          await app.disconnect();
          await recordAuditEvent("disconnect", {
            tiktokUsername: state.username || usernameInput.value.trim()
          });
          state.connected = false;
          state.username = "";
          state.roomId = null;
          clearLiveInteractionState();
          resetSessionMetrics();
          updateHeaderPills();
          setConnectionUiState();
        await refreshCreditsStatus();
        showToast("Disconnected from TikTok LIVE.", "info");
        } catch (error) {
          void reportAuthenticatedAppError(error, "TikTok disconnect", {
            username: state.username || usernameInput.value.trim()
          });
          showToast(error.message || "Unable to disconnect.", "error");
        } finally {
        state.connecting = false;
        updateHeaderPills();
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
        await refreshCreditsStatus();
        await checkConnectCredit();
        const result = await app.connect(username);
        state.connected = Boolean(result.connected);
        state.username = result.username ?? username;
        state.roomId = result.roomId ?? null;
        if (!state.connected || !state.roomId) {
          throw new Error(`TikTok did not return a valid room ID for @${username}. The live may not be active yet, so no credit was deducted.`);
        }
        const stableConnectionState = await waitForStableConnectedLive(username);
        state.connected = Boolean(stableConnectionState.connected);
        state.username = stableConnectionState.username ?? state.username;
        state.roomId = stableConnectionState.roomId ?? state.roomId;
        resetSessionMetrics();
        updateHeaderPills();
        await persistSettings({
          rememberedUsernames: buildRememberedUsernameHistory(state.username || username)
        });
        const creditResult = await consumeConnectCredit(state.username || username);
      showToast(`${creditResult.message} Remaining credits: ${creditResult.user?.credits ?? 0}.`, "info");
      showToast(`Connected to @${state.username}.`, "success");
      } catch (error) {
        if (state.connected) {
          try {
            await app.disconnect();
          } catch {
          // Ignore cleanup errors after a failed post-connect credit deduction.
        }
        }
        state.connected = false;
        state.username = "";
        state.roomId = null;
        clearLiveInteractionState();
        updateHeaderPills();
          if (isInsufficientCreditsError(error)) {
            try {
              await promptCreditsTopupForConnect();
            } catch (topupError) {
              void reportAuthenticatedAppError(topupError, "Credit top-up prompt", {
                stage: "connect_insufficient_credits"
              });
              showToast(topupError.message || "Unable to open the credit top-up page right now.", "error");
            }
          } else {
            void reportAuthenticatedAppError(error, "TikTok connect", {
              username
            });
          }
          showToast(error.message || "Unable to connect.", "error");
      } finally {
      await refreshCreditsStatus();
      state.connecting = false;
      updateHeaderPills();
      setConnectionUiState();
      updateStats();
    }
  });

  rememberUsernameInput.addEventListener("change", () => {
    scheduleSettingsSave();
  });

  settingsProfileSelect?.addEventListener("change", async (event) => {
    const nextProfileId = event.target.value;
    try {
      await switchSettingsProfile(nextProfileId);
    } catch (error) {
      showToast(error.message || "Unable to switch settings profiles.", "error");
      renderSettingsProfileOptions();
    }
  });

  settingsProfileCreateButton?.addEventListener("click", async () => {
    try {
      await createSettingsProfile();
    } catch (error) {
      showToast(error.message || "Unable to create a new settings profile.", "error");
    }
  });

  settingsProfileModalCloseButton?.addEventListener("click", () => {
    closeSettingsProfileModal();
  });

  settingsProfileModalSaveButton?.addEventListener("click", async () => {
    try {
      await saveSettingsProfileFromModal();
    } catch (error) {
      showToast(error.message || "Unable to create a new settings profile.", "error");
    }
  });

  settingsProfileNameInput?.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    try {
      await saveSettingsProfileFromModal();
    } catch (error) {
      showToast(error.message || "Unable to create a new settings profile.", "error");
    }
  });

  settingsProfileDeleteButton?.addEventListener("click", async () => {
    try {
      await deleteSettingsProfile();
    } catch (error) {
      showToast(error.message || "Unable to delete that settings profile.", "error");
    }
  });

  settingsProfileExportButton?.addEventListener("click", async () => {
    try {
      await exportSettingsBundle();
    } catch (error) {
      showToast(error.message || "Unable to export the current settings.", "error");
    }
  });

  settingsProfileImportButton?.addEventListener("click", async () => {
    try {
      await importSettingsBundle();
    } catch (error) {
      showToast(error.message || "Unable to import settings from that file.", "error");
    }
  });

  usernameInput.addEventListener("input", () => {
    if (rememberUsernameInput.checked) {
      scheduleSettingsSave();
    }
  });
}

function wireAuthEvents() {
  if (authEventsWired) {
    return;
  }
  authEventsWired = true;

  signinTabButton.addEventListener("click", () => setAuthView("signin"));
  registerTabButton.addEventListener("click", () => setAuthView("register"));
  verifyTabButton.addEventListener("click", () => setAuthView("verify"));
  resetTabButton.addEventListener("click", () => setAuthView("reset"));

  showForgotPasswordButton.addEventListener("click", () => {
    resetEmailInput.value = signinEmailInput.value.trim();
    setAuthView("reset");
    setAuthStatus("info", "Request a reset code from your email, then enter it here with your new password.");
  });

  const syncRememberMeChoice = () => {
    state.authRememberMeChoice = signinRememberMeInput.checked;
    scheduleAuthRememberSave();
  };

  signinRememberMeInput.addEventListener("change", syncRememberMeChoice);
  signinRememberMeInput.addEventListener("input", syncRememberMeChoice);
  signinRememberMeInput.addEventListener("click", syncRememberMeChoice);
  signinEmailInput.addEventListener("input", () => {
    if (signinRememberMeInput.checked) {
      scheduleAuthRememberSave();
    }
  });

  showRegisterButton.addEventListener("click", () => {
    registerEmailInput.value = signinEmailInput.value.trim();
    setAuthView("register");
    setAuthStatus("info", "Create your account to get started.");
  });

  registerBackButton.addEventListener("click", () => {
    signinEmailInput.value = registerEmailInput.value.trim();
    setAuthView("signin");
    setAuthStatus("info", "Sign in to continue.");
  });

  verifyBackButton.addEventListener("click", () => {
    signinEmailInput.value = verifyEmailInput.value.trim();
    setAuthView("signin");
    setAuthStatus("info", "Sign in once your email has been verified.");
  });

  resetBackButton.addEventListener("click", () => {
    signinEmailInput.value = resetEmailInput.value.trim();
    setAuthView("signin");
    setAuthStatus("info", "Sign in with your updated password when you're ready.");
  });

  requestResetCodeButton.addEventListener("click", async () => {
    try {
      setAuthBusy(true);
      const result = await authRequest("/api/auth/forgot-password", {
        email: resetEmailInput.value.trim()
      });
      setAuthStatus(
        result.deliveryMode === "console" ? "info" : "success",
        result.deliveryMode === "console"
          ? "Reset code generated. Email sending is in console-preview mode on the auth server, so use the code shown there."
          : result.message
      );
    } catch (error) {
      setAuthStatus("error", error.message || "Password reset request failed.");
    } finally {
      setAuthBusy(false);
    }
  });

  signoutButton.addEventListener("click", async () => {
    try {
      await signOutUser();
    } catch (error) {
      setAuthStatus("error", error.message || "Unable to sign out right now.");
    }
  });

  topupCreditsButton.addEventListener("click", async () => {
    try {
      await openCreditsTopup();
    } catch (error) {
      setAuthStatus("error", error.message || "Unable to open the credit top-up page right now.");
    }
  });

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (registerPasswordInput.value !== registerPasswordConfirmInput.value) {
      setAuthStatus("error", "Password confirmation does not match.");
      return;
    }

    try {
      setAuthBusy(true);
      const result = await authRequest("/api/auth/register", {
        displayName: registerDisplayNameInput.value.trim(),
        email: registerEmailInput.value.trim(),
        password: registerPasswordInput.value
      });

      verifyEmailInput.value = registerEmailInput.value.trim();
      setAuthView("verify");
      setAuthStatus(
        result.deliveryMode === "console" ? "info" : "success",
        result.deliveryMode === "console"
          ? "Registration succeeded. Email sending is in console-preview mode on the auth server, so use the code shown there."
          : result.message
      );
      showToast("Registration created. Verify your email to continue.", "success");
    } catch (error) {
      setAuthStatus("error", error.message || "Registration failed.");
    } finally {
      setAuthBusy(false);
    }
  });

  verifyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      setAuthBusy(true);
      const result = await authRequest("/api/auth/verify-email", {
        email: verifyEmailInput.value.trim(),
        code: verifyCodeInput.value.trim()
      });
      setAuthView("signin");
      signinEmailInput.value = verifyEmailInput.value.trim();
      setAuthStatus("success", result.message || "Email verified. You can now sign in.");
    } catch (error) {
      setAuthStatus("error", error.message || "Email verification failed.");
    } finally {
      setAuthBusy(false);
    }
  });

  resetForm.addEventListener("submit", async (event) => {
    event.preventDefault();

      try {
        setAuthBusy(true);
      if (!resetCodeInput.value.trim() || !resetPasswordInput.value) {
        setAuthStatus("error", "Enter the reset code and your new password.");
        return;
      }

      const result = await authRequest("/api/auth/reset-password", {
        email: resetEmailInput.value.trim(),
        code: resetCodeInput.value.trim(),
        newPassword: resetPasswordInput.value
      });
      setAuthView("signin");
      signinEmailInput.value = resetEmailInput.value.trim();
      setAuthStatus("success", result.message || "Password updated. You can sign in now.");
    } catch (error) {
      setAuthStatus("error", error.message || "Password reset failed.");
    } finally {
      setAuthBusy(false);
    }
  });

  signinForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const rememberMeEnabled = Boolean(signinRememberMeInput.checked);
      state.authRememberMeChoice = rememberMeEnabled;
      signinRememberMeInput.checked = rememberMeEnabled;
      setAuthBusy(true);
      const result = await authRequest("/api/auth/login", {
        email: signinEmailInput.value.trim(),
        password: signinPasswordInput.value
      });

      await persistSettings({
        authUser: rememberMeEnabled ? result.user : null,
        authRememberMe: rememberMeEnabled,
        authRememberedEmail: rememberMeEnabled ? signinEmailInput.value.trim() : ""
      });
      state.authenticatedUser = result.user;
      await claimActiveConnectionSession({ silent: false });
      showDashboardForUser(result.user);
      showToast(`Welcome back, ${result.user.displayName || result.user.email}.`, "success");
    } catch (error) {
      setAuthStatus("error", error.message || "Sign-in failed.");
      if ((error.message || "").toLowerCase().includes("verify")) {
        verifyEmailInput.value = signinEmailInput.value.trim();
        setAuthView("verify");
      }
    } finally {
      setAuthBusy(false);
    }
  });
}

function wireChatToolbarEvents() {
  if (chatToolbarEventsWired) {
    return;
  }
  chatToolbarEventsWired = true;

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

  chatList.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-chat-user]");
    if (!trigger) {
      return;
    }

    openChatNotesPanel(trigger.dataset.chatUser, trigger.dataset.chatUserLabel || trigger.dataset.chatUser);
  });

  chatNotesCloseButton.addEventListener("click", closeChatNotesPanel);
  chatNotesSaveButton.addEventListener("click", () => {
    void saveChatNote();
  });
  chatNotesDeleteButton.addEventListener("click", () => {
    void deleteChatNote();
  });
  chatNotesPanel.addEventListener("click", (event) => {
    if (event.target === chatNotesPanel) {
      closeChatNotesPanel();
    }
  });
  queueActionList.addEventListener("click", (event) => {
    const clearButton = event.target.closest("[data-queue-clear]");
    if (!clearButton) {
      return;
    }

    clearQueuedPlaybackItem(clearButton.dataset.queueClear);
  });
  queueFilterSelect.addEventListener("change", () => {
    state.queueFilter = queueFilterSelect.value || "all";
    renderQueueActionList();
  });
  queueOverlayQueueSelect.addEventListener("change", () => {
    state.queueOverlayLane = Math.min(10, Math.max(1, Number(queueOverlayQueueSelect.value) || 1));
    updateQueueOverlayControls();
  });
  queueOverlayModeSelect.addEventListener("change", () => {
    state.queueOverlayMode = queueOverlayModeSelect.value === "compact" ? "compact" : "full";
    updateQueueOverlayControls();
  });
  queueClearFilteredButton.addEventListener("click", clearFilteredPlaybackItems);
  queueOverlayCopyButton.addEventListener("click", async () => {
    const overlayUrl = queueOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The queue overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(overlayUrl);
      showToast("Queue overlay URL copied.", "success");
    } catch (error) {
      showToast(error.message || "Unable to copy the queue overlay URL.", "error");
    }
  });
  queueOverlayOpenButton.addEventListener("click", async () => {
    const overlayUrl = queueOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The queue overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await app.openExternal(overlayUrl);
    } catch (error) {
      showToast(error.message || "Unable to open the queue overlay.", "error");
    }
  });
  commandFeedbackOverlayCopyButton.addEventListener("click", async () => {
    const overlayUrl = commandFeedbackOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The command feedback overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(overlayUrl);
      showToast("Command feedback overlay URL copied.", "success");
    } catch (error) {
      showToast(error.message || "Unable to copy the command feedback overlay URL.", "error");
    }
  });
  commandFeedbackOverlayOpenButton.addEventListener("click", async () => {
    const overlayUrl = commandFeedbackOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The command feedback overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await app.openExternal(overlayUrl);
    } catch (error) {
      showToast(error.message || "Unable to open the command feedback overlay.", "error");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !chatNotesPanel.hidden) {
      closeChatNotesPanel();
    }
    if (event.key === "Escape" && ttsVoiceManagerModal && !ttsVoiceManagerModal.hidden) {
      closeTtsVoiceManagerModal();
    }
    if (event.key === "Escape" && settingsProfileModal && !settingsProfileModal.hidden) {
      closeSettingsProfileModal();
    }
  });
}

function wireTabEvents() {
  if (tabEventsWired) {
    return;
  }
  tabEventsWired = true;

  controlsTabButton.addEventListener("click", () => setActiveTab("controls"));
  eventActionsTabButton.addEventListener("click", () => setActiveTab("event-actions"));
}

function wireSettingsEvents() {
  [
      translationEnabledInput,
      translationTargetLanguageSelect,
        ttsEnabledInput,
        ttsProviderSelect,
        ttsRandomVoiceInput,
        ttsElevenModeSelect,
        ttsElevenApiKeyInput,
        ttsElevenModelSelect,
        ttsIncludeUsernameInput,
        ttsReadGiftsInput,
        ttsGiftMinCoinsInput,
      ttsVoiceSelect,
      ttsQueueSelect,
      ttsRateInput,
      ttsPitchInput,
      ttsVolumeInput,
      commandFeedbackDurationInput,
      commandFeedbackTemplateMyttsvoiceInput,
      commandFeedbackTemplateListcommandsInput,
      ttsAudienceAllInput,
      ttsAudienceSubscribersInput,
      ttsAudienceModeratorsInput
  ].forEach((element) => {
      element.addEventListener("change", () => {
        updateTtsProviderVisibility();
        updateRatePitchVolumeLabels();
        updateTranslationStatus();
        updateTtsStatus();
        updateHeaderPills();
        scheduleSettingsSave();
      });
    });

  [
    commandFeedbackDurationInput,
    commandFeedbackTemplateMyttsvoiceInput,
    commandFeedbackTemplateListcommandsInput
  ].forEach((element) => {
    element.addEventListener("input", () => {
      scheduleSettingsSave();
    });
  });

      [ttsProviderSelect, ttsElevenModeSelect, ttsElevenApiKeyInput].forEach((element) => {
        element.addEventListener("change", () => {
          void loadVoices();
        });
      });

  [ttsProviderSelect, ttsElevenModeSelect, ttsElevenModelSelect, ttsVoiceSelect, ttsQueueSelect].forEach((element) => {
    element.addEventListener("change", () => {
      persistSettings().catch((error) => {
        showToast(error.message || "Unable to save TTS settings.", "error");
      });
    });
  });

  ttsRateInput.addEventListener("input", updateRatePitchVolumeLabels);
  ttsPitchInput.addEventListener("input", updateRatePitchVolumeLabels);
  ttsVolumeInput.addEventListener("input", updateRatePitchVolumeLabels);

  ttsTestButton.addEventListener("click", () => {
    const testPhrase = ttsProviderSelect.value === "elevenlabs"
      ? "Stream Sync Pro LIVE model comparison. This voice should sound consistent, clear, and expressive across a longer test phrase."
      : "Stream Sync Pro LIVE voice test.";
    enqueueSpeech(testPhrase);
  });

  ttsManageUserVoicesButton.addEventListener("click", () => {
    openTtsVoiceManagerModal();
  });

  ttsVoiceManagerCloseButton.addEventListener("click", closeTtsVoiceManagerModal);
  ttsVoiceManagerModal.addEventListener("click", (event) => {
    if (event.target === ttsVoiceManagerModal) {
      closeTtsVoiceManagerModal();
    }
  });
  ttsVoiceManagerSearchInput.addEventListener("input", () => {
    state.ttsVoiceManagerSearch = ttsVoiceManagerSearchInput.value;
    renderTtsVoiceManager();
  });

  ttsVoiceManagerAddButton.addEventListener("click", async () => {
    const normalizedUser = normalizeUserKey(ttsVoiceManagerUsernameInput.value);
    const voiceValue = String(ttsVoiceManagerVoiceSelect.value ?? "").trim();

    if (!normalizedUser) {
      showToast("Enter a username before adding a custom TTS voice.", "error");
      ttsVoiceManagerUsernameInput.focus();
      return;
    }

    if (!voiceValue) {
      showToast("Choose a voice before adding the custom TTS assignment.", "error");
      ttsVoiceManagerVoiceSelect.focus();
      return;
    }

    await saveUserAssignedTtsVoice(normalizedUser, voiceValue);
    renderTtsVoiceManager();
    ttsVoiceManagerUsernameInput.value = "";
    ttsVoiceManagerVoiceSelect.value = "";
    showToast(`Saved a custom TTS voice for @${normalizedUser}.`, "success");
  });

  ttsVoiceManagerList.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-tts-voice-save]");
    const removeButton = event.target.closest("[data-tts-voice-remove]");

    if (!saveButton && !removeButton) {
      return;
    }

    void (async () => {
      if (saveButton) {
        const userKey = saveButton.dataset.ttsVoiceSave;
        const select = ttsVoiceManagerList.querySelector(`[data-tts-voice-select="${CSS.escape(userKey)}"]`);
        const voiceValue = String(select?.value ?? "").trim();

        if (!voiceValue) {
          showToast("Choose a voice before saving this assignment.", "error");
          select?.focus();
          return;
        }

        await saveUserAssignedTtsVoice(userKey, voiceValue);
        renderTtsVoiceManager();
        showToast(`Updated the custom TTS voice for @${userKey}.`, "success");
        return;
      }

      if (removeButton) {
        const userKey = removeButton.dataset.ttsVoiceRemove;
        await removeUserAssignedTtsVoice(userKey);
        renderTtsVoiceManager();
        showToast(`Removed the custom TTS voice for @${userKey}.`, "info");
      }
    })().catch((error) => {
      showToast(error.message || "Unable to update custom TTS voice assignments.", "error");
    });
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
      await previewCustomRuleAction(previewId);
      return;
    }

    const previewSoundId = target.dataset.customPreviewSound;
    if (previewSoundId) {
      await ensureSoundCatalog();
      await previewCustomRuleSound(previewSoundId);
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
      const metricInput = document.querySelector(`input[data-rule-metric="${saveId}"]:checked`);
      const thresholdInput = document.querySelector(`[data-rule-threshold="${saveId}"]`);
      const soundSelect = document.querySelector(`[data-rule-sound-select="${saveId}"]`);
      const queueSelect = document.querySelector(`[data-rule-queue="${saveId}"]`);
      const webhookUrlInput = document.querySelector(`[data-rule-webhook-url="${saveId}"]`);
      const triggerAudienceInput = document.querySelector(`input[data-rule-trigger-audience="${saveId}"]:checked`);
      const triggerUsernameInput = document.querySelector(`[data-rule-trigger-username="${saveId}"]`);
      const webhookUrl = webhookUrlInput?.value?.trim() ?? "";
      const triggerAudience = triggerAudienceInput?.value ?? "everyone";
      const triggerUsername = normalizeUserKey(triggerUsernameInput?.value ?? "");

      if (webhookUrl) {
        try {
          new URL(webhookUrl);
        } catch {
          showToast("Enter a valid webhook URL before saving this rule.", "error");
          webhookUrlInput?.focus();
          return;
        }
      }

      if (triggerAudience === "specificUser" && !triggerUsername) {
        showToast("Enter a username for the specific-user trigger option.", "error");
        triggerUsernameInput?.focus();
        return;
      }

      const updatedRule = normalizeRule({
        ...state.settings.customEventRules[ruleIndex],
        name: nameInput?.value ?? "",
        metric: metricInput?.value ?? "follows",
        threshold: Number(thresholdInput?.value ?? 1),
        enabled: state.settings.customEventRules[ruleIndex]?.enabled !== false,
        queueId: normalizeQueueId(queueSelect?.value ?? 1, 1),
        soundId: soundSelect?.value ?? "",
        webhookUrl,
        triggerAudience,
        triggerUsername
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
    const triggerAudienceRuleId = event.target.dataset.ruleTriggerAudience;
    if (triggerAudienceRuleId) {
      updateTriggerAudienceVisibility(triggerAudienceRuleId, event.target.value);
      return;
    }

    const metricRuleId = event.target.dataset.ruleMetric;
    if (metricRuleId) {
      updateMetricThresholdLabel(metricRuleId, event.target.value);
      return;
    }

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
    if (payload?.connectionState) {
      state.connected = Boolean(payload.connectionState.connected);
      state.username = payload.connectionState.username ?? "";
      state.roomId = payload.connectionState.roomId ?? null;

      if (!state.connected) {
        state.connecting = false;
        resetSessionMetrics();
      }

      updateHeaderPills();
      setConnectionUiState();
      updateStats();
    }

    const level = payload?.level === "error" ? "error" : payload?.level === "success" ? "success" : "info";
    if (payload?.connectionState && payload.connectionState.connected === false) {
      state.connected = false;
      state.roomId = null;
      clearLiveInteractionState();
      resetSessionMetrics();
      updateHeaderPills();
      setConnectionUiState();
    }
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
  await initializeAuthShell();

  if (!state.connected && state.settings.rememberUsername && state.settings.rememberedUsername) {
    usernameInput.value = state.settings.rememberedUsername;
  }

  await Promise.all([
    loadVoices(),
    ensureSoundCatalog(),
    loadQueueOverlayInfo(),
    loadCommandFeedbackOverlayInfo()
  ]);

  updateTtsStatus();
  updateTranslationStatus();
  updateUpdateStatus();
  renderChatList();
  syncQueueOverlayState();
}

wireHeaderEvents();
wireAuthEvents();
wireChatToolbarEvents();
wireTabEvents();
wireSettingsEvents();
wireCustomRuleEvents();
wireAppEvents();
setActiveTab("controls");
updateRatePitchVolumeLabels();
updateUpdateStatus();
setConnectionUiState();

window.addEventListener("error", (event) => {
  void reportAuthenticatedAppError(event?.error || new Error(event?.message || "Unhandled window error."), "Window error", {
    filename: event?.filename || "",
    line: event?.lineno || 0,
    column: event?.colno || 0
  });
});

window.addEventListener("unhandledrejection", (event) => {
  void reportAuthenticatedAppError(event?.reason || new Error("Unhandled promise rejection."), "Unhandled promise rejection");
});

initializeApp().catch((error) => {
  void reportAuthenticatedAppError(error, "App initialization");
  showToast(error.message || "The app could not be initialized.", "error");
});
