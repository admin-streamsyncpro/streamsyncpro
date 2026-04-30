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
const appVersionLabel = document.getElementById("app-version");
const appVersionAuth = document.getElementById("app-version-auth");
const appVersionInline = document.getElementById("app-version-inline");
const updateStatus = document.getElementById("update-status");

// Connection controls
const connectForm = document.getElementById("connect-form");
const usernameInput = document.getElementById("username");
const connectButton = document.getElementById("connect-button");
const rememberUsernameInput = document.getElementById("remember-username");
const signoutButton = document.getElementById("signout-button");

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
const ttsQueueSelect = document.getElementById("tts-queue");
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
  queueCount: 0,
  queueFilter: "all",
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
    rememberedUsername: "",
    rememberUsername: false,
    translationEnabled: false,
    translationTargetLanguage: "en",
    translationProviderUrl: "",
    translationApiKey: "",
    ttsEnabled: false,
    ttsVoice: "",
    ttsStyle: "natural",
    ttsQueue: 1,
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
    userNotes: {},
    customEventRules: []
  };
}

function ensureSettingsShape(source = {}) {
  const defaults = createDefaultSettings();
  return {
    ...defaults,
    ...source,
    userNotes: normalizeUserNotes(source?.userNotes),
    ttsAudience: {
      ...defaults.ttsAudience,
      ...(source?.ttsAudience ?? {})
    },
    customEventRules: Array.isArray(source?.customEventRules)
      ? source.customEventRules.map(normalizeRule).filter(Boolean)
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

function clearQueuedPlaybackItem(itemId) {
  for (const lane of playbackQueues.values()) {
    const itemIndex = lane.items.findIndex((entry) => entry.id === itemId);
    if (itemIndex === -1) {
      continue;
    }

    const [item] = lane.items.splice(itemIndex, 1);
    state.playbackQueueItems = state.playbackQueueItems.filter((entry) => entry.id !== itemId);
    updateQueueIndicators();
    item.reject(createQueueClearedError());
    showToast(`Cleared queued action: ${item.label}`, "info");
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
    ttsQueue: normalizeQueueId(ttsQueueSelect.value, 1),
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
    userNotes: normalizeUserNotes(state.settings.userNotes),
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
  signedInPill.textContent = user ? `Signed in as ${user.displayName || user.email}` : "Signed in";
  creditsPill.textContent = `Credits: ${Number(user?.credits ?? 0)}`;
  authShell.hidden = true;
  dashboardShell.hidden = false;
  setAuthStatus("success", user ? `Signed in as ${user.displayName || user.email}.` : "Signed in.");
}

function showAuthShell() {
  state.authenticatedUser = null;
  signedInPill.textContent = "Signed in";
  creditsPill.textContent = "Credits: 0";
  dashboardShell.hidden = true;
  authShell.hidden = false;
}

async function syncAuthenticatedUser(user) {
  state.authenticatedUser = user ?? null;
  signedInPill.textContent = user ? `Signed in as ${user.displayName || user.email}` : "Signed in";
  creditsPill.textContent = `Credits: ${Number(user?.credits ?? 0)}`;
  await persistSettings({
    authUser: state.settings?.authRememberMe ? user ?? null : null
  });
}

async function recordAuditEvent(eventType) {
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    return null;
  }

  const result = await authRequest("/api/auth/audit-event", {
    userId: user.id,
    sessionToken: user.sessionToken,
    eventType
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
    throw new Error(result.error || result.message || "Authentication request failed.");
  }

  return result;
}

async function consumeConnectCredit() {
  const user = state.authenticatedUser;
  if (!user?.id || !user?.sessionToken) {
    throw new Error("Please sign in again before connecting.");
  }

  const result = await authRequest("/api/auth/consume-connect-credit", {
    userId: user.id,
    sessionToken: user.sessionToken
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
  setStatusMessage(ttsStatus, "success", `TTS is on using ${voiceLabel} on ${getQueueLabel(ttsQueueSelect.value)}.`);
}

function updateUpdateStatus() {
  setStatusMessage(updateStatus, state.updateLevel, state.updateMessage);
}

function updateFooterVersion() {
  appVersionLabel.textContent = state.appVersion || "Unknown";
  appVersionAuth.textContent = state.appVersion || "Unknown";
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
    gainNode.gain.value = volume;
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(state.audioContext.destination);
    source.onended = resolve;
    source.start(0);
  });
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

  const previewText = text.length > 44 ? `${text.slice(0, 44)}...` : text;

  void enqueuePlaybackTask(ttsQueueSelect.value, async () => {
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
      if (error?.cleared) {
        return;
      }
      showToast(error.message || "Unable to play TTS audio.", "error");
    }
  }, { label: `TTS: ${previewText}`, kind: "tts" });
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

  updateSessionUserProfile(item);

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
  ttsQueueSelect.value = String(normalizeQueueId(settings.ttsQueue, 1));
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
        await recordAuditEvent("disconnect");
        state.connected = false;
        state.username = "";
        state.roomId = null;
        resetSessionMetrics();
        updateHeaderPills();
        setConnectionUiState();
        await refreshCreditsStatus();
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
      await refreshCreditsStatus();
      await checkConnectCredit();
      const result = await app.connect(username);
      state.connected = Boolean(result.connected);
      state.username = result.username ?? username;
      state.roomId = result.roomId ?? null;
      resetSessionMetrics();
      updateHeaderPills();
      const creditResult = await consumeConnectCredit();
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
      updateHeaderPills();
      showToast(error.message || "Unable to connect.", "error");
    } finally {
      await refreshCreditsStatus();
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
  queueClearFilteredButton.addEventListener("click", clearFilteredPlaybackItems);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !chatNotesPanel.hidden) {
      closeChatNotesPanel();
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
    ttsIncludeUsernameInput,
    ttsReadGiftsInput,
    ttsVoiceSelect,
    ttsStyleSelect,
    ttsQueueSelect,
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
  await initializeAuthShell();

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

initializeApp().catch((error) => {
  showToast(error.message || "The app could not be initialized.", "error");
});
