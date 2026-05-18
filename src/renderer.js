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
const appVersionLabel = document.getElementById("app-version");
const appVersionAuth = document.getElementById("app-version-auth");
const appVersionInline = document.getElementById("app-version-inline");
const updateStatus = document.getElementById("update-status");
const openControlsLayerButton = document.getElementById("open-controls-layer-button");
const openOverlaysLayerButton = document.getElementById("open-overlays-layer-button");
const openEventActionsLayerButton = document.getElementById("open-event-actions-layer-button");
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
const chatNotesBirthdayInput = document.getElementById("chat-notes-birthday");
const chatNotesBirthdayActionSelect = document.getElementById("chat-notes-birthday-action");
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
const openLayoutCustomizerButton = document.getElementById("open-layout-customizer-button");
const layoutCustomizerModal = document.getElementById("layout-customizer-modal");
const layoutCustomizerCloseButton = document.getElementById("layout-customizer-close");
const layoutCustomizerSaveButton = document.getElementById("layout-customizer-save");
const layoutShowWelcomeInput = document.getElementById("layout-show-welcome");
const layoutShowIncomingChatInput = document.getElementById("layout-show-incoming-chat");
const layoutMainCardOptions = document.getElementById("layout-main-card-options");
const dashboardAddonCards = document.getElementById("dashboard-addon-cards");

// Sidebar tabs
const controlsTabButton = document.getElementById("controls-tab-button");
const overlaysTabButton = document.getElementById("overlays-tab-button");
const eventActionsTabButton = document.getElementById("event-actions-tab-button");
const controlsTabPanel = document.getElementById("controls-tab-panel");
const overlaysTabPanel = document.getElementById("overlays-tab-panel");
const eventActionsTabPanel = document.getElementById("event-actions-tab-panel");
const sidebarLayer = document.getElementById("sidebar-layer");
const sidebarLayerCloseButton = document.getElementById("sidebar-layer-close");
const sidebarLayerTitle = document.getElementById("sidebar-layer-title");

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
const queueOverlayTemplateSelect = document.getElementById("queue-overlay-template-select");
const queueOverlayCopyButton = document.getElementById("queue-overlay-copy");
const queueOverlayOpenButton = document.getElementById("queue-overlay-open");
const queueOverlayCustomizeButton = document.getElementById("queue-overlay-customize");
const queueOverlayResetButton = document.getElementById("queue-overlay-reset");
const queueOverlayStatus = document.getElementById("queue-overlay-status");
const chatOverlayUrlInput = document.getElementById("chat-overlay-url");
const chatOverlayTemplateSelect = document.getElementById("chat-overlay-template-select");
const chatOverlayCopyButton = document.getElementById("chat-overlay-copy");
const chatOverlayOpenButton = document.getElementById("chat-overlay-open");
const chatOverlayCustomizeButton = document.getElementById("chat-overlay-customize");
const chatOverlayResetButton = document.getElementById("chat-overlay-reset");
const chatOverlayStatus = document.getElementById("chat-overlay-status");
const giftOverlayUrlInput = document.getElementById("gift-overlay-url");
const giftOverlayTemplateSelect = document.getElementById("gift-overlay-template-select");
const giftOverlayCopyButton = document.getElementById("gift-overlay-copy");
const giftOverlayOpenButton = document.getElementById("gift-overlay-open");
const giftOverlayCustomizeButton = document.getElementById("gift-overlay-customize");
const giftOverlayResetButton = document.getElementById("gift-overlay-reset");
const giftOverlayStatus = document.getElementById("gift-overlay-status");
const likesOverlayUrlInput = document.getElementById("likes-overlay-url");
const likesOverlayTemplateSelect = document.getElementById("likes-overlay-template-select");
const likesOverlayCopyButton = document.getElementById("likes-overlay-copy");
const likesOverlayOpenButton = document.getElementById("likes-overlay-open");
const likesOverlayCustomizeButton = document.getElementById("likes-overlay-customize");
const likesOverlayResetButton = document.getElementById("likes-overlay-reset");
const viewerStatsOverlayFilterInput = document.getElementById("viewer-stats-overlay-filter");
const viewerStatsOverlayUsernameInput = document.getElementById("viewer-stats-overlay-username");
const viewerStatsOverlayUrlInput = document.getElementById("viewer-stats-overlay-url");
const viewerStatsOverlayTemplateSelect = document.getElementById("viewer-stats-overlay-template-select");
const viewerStatsOverlayCopyButton = document.getElementById("viewer-stats-overlay-copy");
const viewerStatsOverlayOpenButton = document.getElementById("viewer-stats-overlay-open");
const viewerStatsOverlayCustomizeButton = document.getElementById("viewer-stats-overlay-customize");
const viewerStatsOverlayResetButton = document.getElementById("viewer-stats-overlay-reset");
const voteOverlayUrlInput = document.getElementById("vote-overlay-url");
const voteOverlayTemplateSelect = document.getElementById("vote-overlay-template-select");
const voteOverlayCopyButton = document.getElementById("vote-overlay-copy");
const voteOverlayOpenButton = document.getElementById("vote-overlay-open");
const voteOverlayCustomizeButton = document.getElementById("vote-overlay-customize");
const voteOverlayResetButton = document.getElementById("vote-overlay-reset");
const overlayDesignerTemplateSelect = document.getElementById("overlay-designer-template-select");
const overlayDesignerUrlInput = document.getElementById("overlay-designer-url");
const overlayDesignerOpenButton = document.getElementById("overlay-designer-open-button");
const overlayDesignerCopyButton = document.getElementById("overlay-designer-copy-button");
const overlayDesignerPreviewButton = document.getElementById("overlay-designer-preview-button");
const overlayDesignerTestButton = document.getElementById("overlay-designer-test-button");
const overlayDesignerStatus = document.getElementById("overlay-designer-status");
const overlayDesignerModal = document.getElementById("overlay-designer-modal");
const overlayDesignerModalTemplateSelect = document.getElementById("overlay-designer-modal-template-select");
const overlayDesignerCanvasPreset = document.getElementById("overlay-designer-canvas-preset");
const overlayDesignerZoom = document.getElementById("overlay-designer-zoom");
const overlayDesignerNewTemplateButton = document.getElementById("overlay-designer-new-template");
const overlayDesignerDuplicateTemplateButton = document.getElementById("overlay-designer-duplicate-template");
const overlayDesignerDeleteTemplateButton = document.getElementById("overlay-designer-delete-template");
const overlayDesignerExportTemplateButton = document.getElementById("overlay-designer-export-template");
const overlayDesignerImportTemplateButton = document.getElementById("overlay-designer-import-template");
const overlayDesignerUndoButton = document.getElementById("overlay-designer-undo");
const overlayDesignerRedoButton = document.getElementById("overlay-designer-redo");
const overlayDesignerCloseButton = document.getElementById("overlay-designer-close");
const overlayDesignerLayerList = document.getElementById("overlay-designer-layer-list");
const overlayDesignerStageWrap = document.getElementById("overlay-designer-stage-wrap");
const overlayDesignerStage = document.getElementById("overlay-designer-stage");
const overlayDesignerShowGridInput = document.getElementById("overlay-designer-show-grid");
const overlayDesignerSnapGridInput = document.getElementById("overlay-designer-snap-grid");
const overlayDesignerShowSafezoneInput = document.getElementById("overlay-designer-show-safezone");
const overlayDesignerLightThemeInput = document.getElementById("overlay-designer-light-theme");
const overlayDesignerTemplateNameInput = document.getElementById("overlay-designer-template-name");
const overlayDesignerCanvasWidthInput = document.getElementById("overlay-designer-canvas-width");
const overlayDesignerCanvasHeightInput = document.getElementById("overlay-designer-canvas-height");
const overlayDesignerBackgroundColorInput = document.getElementById("overlay-designer-background-color");
const overlayDesignerBackgroundOpacityInput = document.getElementById("overlay-designer-background-opacity");
const overlayDesignerBackgroundImageInput = document.getElementById("overlay-designer-background-image");
const overlayDesignerBackgroundVideoInput = document.getElementById("overlay-designer-background-video");
const overlayDesignerAutoLoadInput = document.getElementById("overlay-designer-auto-load");
const overlayDesignerEmptyState = document.getElementById("overlay-designer-empty-state");
const overlayDesignerInspector = document.getElementById("overlay-designer-inspector");
const overlayElementNameInput = document.getElementById("overlay-element-name");
const overlayElementContentInput = document.getElementById("overlay-element-content");
const overlayElementSourceInput = document.getElementById("overlay-element-source");
const overlayElementXInput = document.getElementById("overlay-element-x");
const overlayElementYInput = document.getElementById("overlay-element-y");
const overlayElementWidthInput = document.getElementById("overlay-element-width");
const overlayElementHeightInput = document.getElementById("overlay-element-height");
const overlayElementAutoWidthInput = document.getElementById("overlay-element-auto-width");
const overlayElementAutoHeightInput = document.getElementById("overlay-element-auto-height");
const overlayElementRotationInput = document.getElementById("overlay-element-rotation");
const overlayElementOpacityInput = document.getElementById("overlay-element-opacity");
const overlayElementFontFamilyInput = document.getElementById("overlay-element-font-family");
const overlayElementFontSizeInput = document.getElementById("overlay-element-font-size");
const overlayElementFontWeightInput = document.getElementById("overlay-element-font-weight");
const overlayElementLetterSpacingInput = document.getElementById("overlay-element-letter-spacing");
const overlayElementColorInput = document.getElementById("overlay-element-color");
const overlayElementGlowColorInput = document.getElementById("overlay-element-glow-color");
const overlayElementBackgroundColorInput = document.getElementById("overlay-element-background-color");
const overlayElementBackgroundOpacityInput = document.getElementById("overlay-element-background-opacity");
const overlayElementBorderColorInput = document.getElementById("overlay-element-border-color");
const overlayElementBorderWidthInput = document.getElementById("overlay-element-border-width");
const overlayElementBorderRadiusInput = document.getElementById("overlay-element-border-radius");
const overlayElementBlurInput = document.getElementById("overlay-element-blur");
const overlayElementAnimationInput = document.getElementById("overlay-element-animation");
const overlayElementBindingInput = document.getElementById("overlay-element-binding");
const overlayVotingWidgetStyleFields = document.getElementById("overlay-voting-widget-style-fields");
const overlayElementWidgetStyleInput = document.getElementById("overlay-element-widget-style");
const overlayElementMutedTextColorInput = document.getElementById("overlay-element-muted-text-color");
const overlayElementSuccessColorInput = document.getElementById("overlay-element-success-color");
const overlayDesignerImportInput = document.getElementById("overlay-designer-import-input");

const BUILTIN_TIKTOK_GIFT_CATALOG = [
  { giftName: "Rose", coinValue: 1, source: "builtin" },
  { giftName: "TikTok", coinValue: 1, source: "builtin" },
  { giftName: "Finger Heart", coinValue: 5, source: "builtin" },
  { giftName: "Perfume", coinValue: 20, source: "builtin" },
  { giftName: "Doughnut", coinValue: 30, source: "builtin" },
  { giftName: "Paper Crane", coinValue: 99, source: "builtin" },
  { giftName: "Sunglasses", coinValue: 199, source: "builtin" },
  { giftName: "Hearts", coinValue: 199, source: "builtin" },
  { giftName: "Heart Me", coinValue: 249, source: "builtin" },
  { giftName: "Cotton's Shell", coinValue: 299, source: "builtin" },
  { giftName: "GG", coinValue: 299, source: "builtin" },
  { giftName: "Lightning Bolt", coinValue: 300, source: "builtin" },
  { giftName: "Gamepad", coinValue: 399, source: "builtin" },
  { giftName: "Love You", coinValue: 499, source: "builtin" },
  { giftName: "Corgi", coinValue: 499, source: "builtin" },
  { giftName: "Cap", coinValue: 599, source: "builtin" },
  { giftName: "Hat and Mustache", coinValue: 699, source: "builtin" },
  { giftName: "Butterfly", coinValue: 888, source: "builtin" },
  { giftName: "Mishka Bear", coinValue: 1000, source: "builtin" },
  { giftName: "I Love You", coinValue: 1000, source: "builtin" },
  { giftName: "Confetti", coinValue: 1000, source: "builtin" },
  { giftName: "Swan", coinValue: 1099, source: "builtin" },
  { giftName: "Little Crown", coinValue: 1599, source: "builtin" },
  { giftName: "Fairy Wings", coinValue: 1999, source: "builtin" },
  { giftName: "Tiny Diny", coinValue: 1999, source: "builtin" },
  { giftName: "Weights", coinValue: 1999, source: "builtin" },
  { giftName: "Coffee", coinValue: 2999, source: "builtin" },
  { giftName: "Gold Mine", coinValue: 1000, source: "builtin" },
  { giftName: "Fireworks", coinValue: 1088, source: "builtin" },
  { giftName: "Galaxy", coinValue: 1000, source: "builtin" },
  { giftName: "Sports Car", coinValue: 7000, source: "builtin" },
  { giftName: "Motorcycle", coinValue: 2988, source: "builtin" },
  { giftName: "Train", coinValue: 8999, source: "builtin" },
  { giftName: "Travel with You", coinValue: 2888, source: "builtin" },
  { giftName: "Diamond Tree", coinValue: 10888, source: "builtin" },
  { giftName: "Castle", coinValue: 20000, source: "builtin" },
  { giftName: "Yacht", coinValue: 7499, source: "builtin" },
  { giftName: "Private Jet", coinValue: 4888, source: "builtin" },
  { giftName: "Leon the Kitten", coinValue: 4888, source: "builtin" },
  { giftName: "Lion", coinValue: 29999, source: "builtin" }
];
const BUILTIN_TIKTOK_GIFT_CATALOG_BY_REGION = {
  global: BUILTIN_TIKTOK_GIFT_CATALOG,
  uk: [
    ...BUILTIN_TIKTOK_GIFT_CATALOG,
    { giftName: "Universe", coinValue: 0, source: "builtin" },
    { giftName: "Pegasus", coinValue: 0, source: "builtin" },
    { giftName: "Phoenix", coinValue: 0, source: "builtin" },
    { giftName: "Whale Diving", coinValue: 0, source: "builtin" },
    { giftName: "TikTok Shuttle", coinValue: 0, source: "builtin" },
    { giftName: "Adam's Dream", coinValue: 0, source: "builtin" },
    { giftName: "Chasing the Dream", coinValue: 0, source: "builtin" },
    { giftName: "Interstellar", coinValue: 0, source: "builtin" },
    { giftName: "Gorilla", coinValue: 0, source: "builtin" },
    { giftName: "Star Throne", coinValue: 0, source: "builtin" }
  ],
  usa: [
    ...BUILTIN_TIKTOK_GIFT_CATALOG,
    { giftName: "Universe", coinValue: 0, source: "builtin" },
    { giftName: "Pegasus", coinValue: 0, source: "builtin" },
    { giftName: "Phoenix", coinValue: 0, source: "builtin" },
    { giftName: "Whale Diving", coinValue: 0, source: "builtin" },
    { giftName: "TikTok Shuttle", coinValue: 0, source: "builtin" },
    { giftName: "Money Gun", coinValue: 0, source: "builtin" },
    { giftName: "Drama Queen", coinValue: 0, source: "builtin" },
    { giftName: "Adam's Dream", coinValue: 0, source: "builtin" },
    { giftName: "Chasing the Dream", coinValue: 0, source: "builtin" },
    { giftName: "Gorilla", coinValue: 0, source: "builtin" }
  ]
};
const likesOverlayStatus = document.getElementById("likes-overlay-status");
const viewerStatsOverlayStatus = document.getElementById("viewer-stats-overlay-status");
const voteOverlayStatus = document.getElementById("vote-overlay-status");

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
const ttsElevenLabsUsagePanel = document.getElementById("tts-elevenlabs-usage-panel");
const ttsElevenLabsPlan = document.getElementById("tts-elevenlabs-plan");
const ttsElevenLabsUsed = document.getElementById("tts-elevenlabs-used");
const ttsElevenLabsLimit = document.getElementById("tts-elevenlabs-limit");
const ttsElevenLabsRemaining = document.getElementById("tts-elevenlabs-remaining");
const ttsElevenLabsReset = document.getElementById("tts-elevenlabs-reset");
const ttsElevenLabsUsageStatus = document.getElementById("tts-elevenlabs-usage-status");
const ttsElevenLabsRefreshButton = document.getElementById("tts-elevenlabs-refresh");
const commandFeedbackDurationInput = document.getElementById("command-feedback-duration");
const commandFeedbackOverlayUrlInput = document.getElementById("command-feedback-overlay-url");
const commandFeedbackOverlayTemplateSelect = document.getElementById("command-feedback-overlay-template-select");
const commandFeedbackOverlayCopyButton = document.getElementById("command-feedback-overlay-copy");
const commandFeedbackOverlayOpenButton = document.getElementById("command-feedback-overlay-open");
const commandFeedbackOverlayCustomizeButton = document.getElementById("command-feedback-overlay-customize");
const commandFeedbackOverlayResetButton = document.getElementById("command-feedback-overlay-reset");
const commandFeedbackTemplateMyttsvoiceInput = document.getElementById("command-feedback-template-myttsvoice");
const commandFeedbackTemplateListcommandsInput = document.getElementById("command-feedback-template-listcommands");
const commandFeedbackStatus = document.getElementById("command-feedback-status");
const ttsStatus = document.getElementById("tts-status");

// Audience filters
const ttsAudienceAllInput = document.getElementById("tts-audience-all");
const ttsAudienceSubscribersInput = document.getElementById("tts-audience-subscribers");
const ttsAudienceModeratorsInput = document.getElementById("tts-audience-moderators");
const ttsAudienceVipsInput = document.getElementById("tts-audience-vips");
const tiktokSigninButton = document.getElementById("tiktok-signin-button");
const tiktokSignoutButton = document.getElementById("tiktok-signout-button");
const tiktokRefreshEmotesButton = document.getElementById("tiktok-refresh-emotes-button");
const tiktokSessionStatus = document.getElementById("tiktok-session-status");
const votingEnabledInput = document.getElementById("voting-enabled");
const votingStartRoleInput = document.getElementById("voting-start-role");
const votingOverlayOrientationInput = document.getElementById("voting-overlay-orientation");
const votingTestButton = document.getElementById("voting-test-button");
const votingStatus = document.getElementById("voting-status");

// Custom event rules
const addCustomRuleButton = document.getElementById("add-custom-rule-button");
const customRuleSearchInput = document.getElementById("custom-rule-search");
const customRuleAudienceFilterInput = document.getElementById("custom-rule-audience-filter");
const customRuleTriggerFilterInput = document.getElementById("custom-rule-trigger-filter");
const customRuleList = document.getElementById("custom-rule-list");
const customRuleStatus = document.getElementById("custom-rule-status");

const MAX_CHAT_MESSAGES = 400;
const SEARCH_PREVIEW_LIMIT = 50;
const SAVE_DEBOUNCE_MS = 250;
const CONNECT_CREDIT_STABILIZE_MS = 2500;
const DEFAULT_SETTINGS_PROFILE_ID = "default";
const SETTINGS_PROFILE_ACTION_PREFIX = "__action__:";
const OVERLAY_DESIGNER_GRID_SIZE = 10;
const OVERLAY_DESIGNER_MIN_SIZE = 40;
const OVERLAY_DESIGNER_ASSIGNMENT_KEYS = ["queue", "chat", "gift", "likes", "viewerStats", "commandFeedback", "vote"];

function createOverlayDesignerId(prefix = "overlay-item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeOverlayDesignerHex(value, fallback = "#53dcff") {
  const normalized = String(value ?? "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized : fallback;
}

function clampOverlayDesignerNumber(value, minimum, maximum, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.max(minimum, Math.min(maximum, parsed));
}

function createOverlayDesignerElement(type = "text") {
  const normalizedType = String(type ?? "text").trim() || "text";
  const base = {
    id: createOverlayDesignerId("overlay-element"),
    type: normalizedType,
    name: normalizedType.replace(/([A-Z])/g, " $1").replace(/^./, (character) => character.toUpperCase()).trim(),
    content: "",
    source: "",
    x: 80,
    y: 80,
    width: 280,
    height: 88,
    autoWidth: false,
    autoHeight: false,
    rotation: 0,
    opacity: 1,
    fontFamily: "Poppins, Segoe UI, sans-serif",
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 0,
    color: "#f6fbff",
    glowColor: "#53dcff",
    backgroundColor: "#10243d",
    backgroundOpacity: 0.28,
    borderColor: "#2a466b",
    borderWidth: 1,
    borderRadius: 18,
    widgetStyle: "defaultOverlay",
    mutedTextColor: "#9fb8d6",
    successColor: "#7cffc5",
    blur: 0,
    animation: "none",
    binding: "",
    visible: true,
    locked: false,
    zIndex: 1
  };

  switch (normalizedType) {
    case "viewerCount":
      return { ...base, name: "Viewer Count", content: "LIVE VIEWERS", binding: "viewerCount", width: 260, height: 86 };
    case "chatMessage":
      return { ...base, name: "Chat Message", content: "{username}: {message}", binding: "chatMessage", width: 540, height: 96 };
    case "ttsNotification":
      return { ...base, name: "TTS Notification", content: "{username} triggered TTS", binding: "ttsNotification", width: 480, height: 88 };
    case "alert":
      return { ...base, name: "Alert", content: "{username} sent {giftSent}", binding: "alert", width: 460, height: 92 };
    case "votingWidget":
      return { ...base, name: "Voting Widget", content: "Live Voting", binding: "activeVote", width: 620, height: 260 };
    case "progressBar":
      return { ...base, name: "Progress Bar", content: "Goal progress", binding: "progressValue", width: 460, height: 64 };
    case "image":
      return { ...base, name: "Image", source: "", width: 320, height: 180, backgroundOpacity: 0 };
    case "video":
      return { ...base, name: "Video", source: "", width: 420, height: 240, backgroundOpacity: 0 };
    case "emoji":
      return { ...base, name: "Emoji", content: "🔥", width: 110, height: 110, fontSize: 64, backgroundOpacity: 0 };
    case "eventCounter":
      return { ...base, name: "Event Counter", content: "Likes: {likes}", binding: "likes", width: 260, height: 86 };
    case "timer":
      return { ...base, name: "Timer", content: "00:30", binding: "timer", width: 220, height: 82 };
    case "spinWheel":
      return { ...base, name: "Spin Wheel", content: "Spin Wheel", binding: "spinWheel", width: 360, height: 360, borderRadius: 180 };
    case "customHtml":
      return { ...base, name: "Custom HTML", content: "<div class=\"widget\">Custom HTML</div>", width: 420, height: 180 };
    case "text":
    default:
      return { ...base, name: "Text Label", content: "Stream Sync Pro", width: 360, height: 88 };
  }
}

function normalizeOverlayDesignerElement(element = {}, index = 0) {
  const base = createOverlayDesignerElement(element?.type ?? "text");
  return {
    ...base,
    ...element,
    id: String(element?.id ?? base.id).trim() || base.id,
    name: String(element?.name ?? base.name).trim() || base.name,
    content: String(element?.content ?? base.content),
    source: String(element?.source ?? base.source).trim(),
    x: Math.max(0, Number(element?.x) || base.x),
    y: Math.max(0, Number(element?.y) || base.y),
    width: Math.max(OVERLAY_DESIGNER_MIN_SIZE, Number(element?.width) || base.width),
    height: Math.max(OVERLAY_DESIGNER_MIN_SIZE, Number(element?.height) || base.height),
    autoWidth: Boolean(element?.autoWidth),
    autoHeight: Boolean(element?.autoHeight),
    rotation: clampOverlayDesignerNumber(element?.rotation, -360, 360, base.rotation),
    opacity: clampOverlayDesignerNumber(element?.opacity, 0, 1, base.opacity),
    fontFamily: String(element?.fontFamily ?? base.fontFamily).trim() || base.fontFamily,
    fontSize: clampOverlayDesignerNumber(element?.fontSize, 10, 240, base.fontSize),
    fontWeight: clampOverlayDesignerNumber(element?.fontWeight, 100, 900, base.fontWeight),
    letterSpacing: clampOverlayDesignerNumber(element?.letterSpacing, -4, 24, base.letterSpacing),
    color: normalizeOverlayDesignerHex(element?.color, base.color),
    glowColor: normalizeOverlayDesignerHex(element?.glowColor, base.glowColor),
    backgroundColor: normalizeOverlayDesignerHex(element?.backgroundColor, base.backgroundColor),
    backgroundOpacity: clampOverlayDesignerNumber(element?.backgroundOpacity, 0, 1, base.backgroundOpacity),
    borderColor: normalizeOverlayDesignerHex(element?.borderColor, base.borderColor),
    borderWidth: clampOverlayDesignerNumber(element?.borderWidth, 0, 24, base.borderWidth),
    borderRadius: clampOverlayDesignerNumber(element?.borderRadius, 0, 240, base.borderRadius),
    widgetStyle: ["defaultOverlay", "simple"].includes(String(element?.widgetStyle ?? "").trim())
      ? String(element?.widgetStyle ?? "").trim()
      : base.widgetStyle,
    mutedTextColor: normalizeOverlayDesignerHex(element?.mutedTextColor, base.mutedTextColor),
    successColor: normalizeOverlayDesignerHex(element?.successColor, base.successColor),
    blur: clampOverlayDesignerNumber(element?.blur, 0, 40, base.blur),
    animation: String(element?.animation ?? base.animation).trim() || "none",
    binding: String(element?.binding ?? base.binding).trim(),
    visible: element?.visible !== false,
    locked: Boolean(element?.locked),
    zIndex: Math.max(1, Number(element?.zIndex) || index + 1)
  };
}

function createOverlayDesignerTemplate(name = "Overlay Template", size = { width: 1920, height: 1080 }) {
  return {
    id: createOverlayDesignerId("overlay-template"),
    name,
    width: Math.max(320, Number(size?.width) || 1920),
    height: Math.max(320, Number(size?.height) || 1080),
    backgroundColor: "#08111f",
    backgroundOpacity: 0.45,
    backgroundImage: "",
    backgroundVideo: "",
    autoLoad: "",
    elements: [
      {
        ...createOverlayDesignerElement("text"),
        content: "LIVE NOW",
        x: 72,
        y: 72,
        width: 260,
        height: 82
      },
      {
        ...createOverlayDesignerElement("chatMessage"),
        content: "{username}: {message}",
        x: 72,
        y: 182
      }
    ]
  };
}

function createBuiltInOverlayDesignerTemplates() {
  const defaultTemplate = createOverlayDesignerTemplate("Default Broadcast Overlay");
  defaultTemplate.builtinKey = "defaultBroadcast";

  const queueTemplate = createOverlayDesignerTemplate("Queue Overlay Default");
  queueTemplate.builtinKey = "queueDefault";
  queueTemplate.backgroundOpacity = 0;
  queueTemplate.elements = [
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("text"),
      name: "Queue title",
      content: "Queue Overlay",
      x: 60,
      y: 52,
      width: 420,
      height: 82,
      fontSize: 34,
      fontWeight: 800,
      backgroundOpacity: 0,
      borderWidth: 0
    }, 0),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("ttsNotification"),
      name: "Now playing",
      content: "Now Playing: {username}",
      x: 60,
      y: 150,
      width: 720,
      height: 96,
      fontSize: 26,
      backgroundColor: "#10243d",
      backgroundOpacity: 0.9,
      borderColor: "#53dcff",
      borderWidth: 1,
      borderRadius: 22,
      blur: 10
    }, 1),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("alert"),
      name: "Up next",
      content: "Up Next: {giftSent}",
      x: 60,
      y: 266,
      width: 720,
      height: 88,
      fontSize: 22,
      backgroundColor: "#0c1b30",
      backgroundOpacity: 0.88,
      borderColor: "#2d5fff",
      borderWidth: 1,
      borderRadius: 20,
      glowColor: "#53dcff",
      blur: 8
    }, 2)
  ];

  const chatTemplate = createOverlayDesignerTemplate("Chat Overlay Default");
  chatTemplate.builtinKey = "chatDefault";
  chatTemplate.backgroundOpacity = 0;
  chatTemplate.elements = [
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("text"),
      name: "Chat title",
      content: "Live Chat",
      x: 52,
      y: 46,
      width: 320,
      height: 72,
      fontSize: 30,
      fontWeight: 800,
      backgroundOpacity: 0,
      borderWidth: 0
    }, 0),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("chatMessage"),
      name: "Chat message",
      content: "{username}: {message}",
      x: 52,
      y: 132,
      width: 820,
      height: 104,
      fontSize: 24,
      backgroundColor: "#10243d",
      backgroundOpacity: 0.92,
      borderColor: "#53dcff",
      borderWidth: 1,
      borderRadius: 22,
      blur: 10
    }, 1)
  ];

  const giftTemplate = createOverlayDesignerTemplate("Gift Overlay Default");
  giftTemplate.builtinKey = "giftDefault";
  giftTemplate.backgroundOpacity = 0;
  giftTemplate.elements = [
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("image"),
      name: "Gift icon",
      x: 58,
      y: 120,
      width: 120,
      height: 120,
      borderRadius: 30,
      backgroundColor: "#10243d",
      backgroundOpacity: 0.9,
      borderColor: "#53dcff",
      borderWidth: 1,
      blur: 10
    }, 0),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("alert"),
      name: "Gift alert",
      content: "{username} sent {giftSent}",
      x: 194,
      y: 118,
      width: 760,
      height: 124,
      fontSize: 28,
      backgroundColor: "#10243d",
      backgroundOpacity: 0.94,
      borderColor: "#53dcff",
      borderWidth: 1,
      borderRadius: 26,
      glowColor: "#53dcff",
      blur: 12
    }, 1)
  ];

  const likesTemplate = createOverlayDesignerTemplate("Like Leaderboard Default");
  likesTemplate.builtinKey = "likesDefault";
  likesTemplate.backgroundOpacity = 0;
  likesTemplate.elements = [
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("text"),
      name: "Leaderboard title",
      content: "Like Leaderboard",
      x: 62,
      y: 52,
      width: 480,
      height: 78,
      fontSize: 32,
      fontWeight: 800,
      backgroundOpacity: 0,
      borderWidth: 0
    }, 0),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("eventCounter"),
      name: "Like total",
      content: "Likes: {likes}",
      binding: "likes",
      x: 62,
      y: 148,
      width: 320,
      height: 84,
      fontSize: 24,
      backgroundColor: "#10243d",
      backgroundOpacity: 0.9,
      borderColor: "#53dcff",
      borderWidth: 1,
      borderRadius: 20,
      blur: 10
    }, 1),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("progressBar"),
      name: "Leaderboard progress",
      content: "Top support today",
      x: 62,
      y: 246,
      width: 780,
      height: 74,
      backgroundColor: "#10243d",
      backgroundOpacity: 0.88,
      borderColor: "#2d5fff",
      borderWidth: 1,
      borderRadius: 20,
      blur: 8
    }, 2)
  ];

  const viewerStatsTemplate = createOverlayDesignerTemplate("Viewer Stats Default");
  viewerStatsTemplate.builtinKey = "viewerStatsDefault";
  viewerStatsTemplate.backgroundOpacity = 0;
  viewerStatsTemplate.elements = [
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("text"),
      name: "Stats title",
      content: "Viewer Stats",
      x: 60,
      y: 50,
      width: 360,
      height: 76,
      fontSize: 32,
      fontWeight: 800,
      backgroundOpacity: 0,
      borderWidth: 0
    }, 0),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("eventCounter"),
      name: "Likes stat",
      content: "Likes: {likes}",
      binding: "likes",
      x: 60,
      y: 140,
      width: 280,
      height: 78
    }, 1),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("eventCounter"),
      name: "Comments stat",
      content: "Comments: {comments}",
      binding: "comments",
      x: 356,
      y: 140,
      width: 280,
      height: 78
    }, 2),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("eventCounter"),
      name: "Gifts stat",
      content: "Gifts: {gifts}",
      binding: "gifts",
      x: 652,
      y: 140,
      width: 280,
      height: 78
    }, 3),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("eventCounter"),
      name: "Shares stat",
      content: "Shares: {shares}",
      binding: "shares",
      x: 60,
      y: 234,
      width: 280,
      height: 78
    }, 4),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("eventCounter"),
      name: "Follows stat",
      content: "Follows: {follows}",
      binding: "follows",
      x: 356,
      y: 234,
      width: 280,
      height: 78
    }, 5),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("eventCounter"),
      name: "Coins stat",
      content: "Coins: {coins}",
      binding: "coins",
      x: 652,
      y: 234,
      width: 280,
      height: 78
    }, 6)
  ];

  const commandFeedbackTemplate = createOverlayDesignerTemplate("Command Feedback Default");
  commandFeedbackTemplate.builtinKey = "commandFeedbackDefault";
  commandFeedbackTemplate.backgroundOpacity = 0;
  commandFeedbackTemplate.elements = [
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("text"),
      name: "Feedback title",
      content: "Viewer Feedback",
      x: 70,
      y: 70,
      width: 420,
      height: 80,
      fontSize: 30,
      fontWeight: 800,
      backgroundOpacity: 0,
      borderWidth: 0
    }, 0),
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("alert"),
      name: "Feedback message",
      content: "{username} sent {giftSent}",
      x: 70,
      y: 164,
      width: 760,
      height: 110,
      fontSize: 26,
      backgroundColor: "#10243d",
      backgroundOpacity: 0.92,
      borderColor: "#53dcff",
      borderWidth: 1,
      borderRadius: 24,
      glowColor: "#53dcff",
      blur: 10
    }, 1)
  ];

  const alertTemplate = createOverlayDesignerTemplate("Alerts and Voting Overlay");
  alertTemplate.builtinKey = "alertsVoting";
  alertTemplate.elements = [
    {
      ...createOverlayDesignerElement("alert"),
      x: 1180,
      y: 92,
      width: 620,
      height: 110,
      content: "{username} sent {giftSent}"
    },
    {
      ...createOverlayDesignerElement("votingWidget"),
      x: 1060,
      y: 260,
      width: 700,
      height: 300
    },
    {
      ...createOverlayDesignerElement("viewerCount"),
      x: 72,
      y: 72
    }
  ];

  const voteTemplate = createOverlayDesignerTemplate("Voting Overlay Default");
  voteTemplate.builtinKey = "votingDefault";
  voteTemplate.width = 1920;
  voteTemplate.height = 1080;
  voteTemplate.backgroundColor = "#08111f";
  voteTemplate.backgroundOpacity = 0;
  voteTemplate.elements = [
    normalizeOverlayDesignerElement({
      ...createOverlayDesignerElement("votingWidget"),
      name: "Voting card",
      x: 1030,
      y: 120,
      width: 860,
      height: 520,
      fontFamily: "Segoe UI",
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: 0,
      color: "#eef6ff",
      backgroundColor: "#071326",
      backgroundOpacity: 0.94,
      borderColor: "#54d0ff",
      borderWidth: 1,
      borderRadius: 26,
      widgetStyle: "defaultOverlay",
      mutedTextColor: "#9fb8d6",
      successColor: "#7cffc5",
      glowColor: "#53dcff",
      blur: 14
    }, 0)
  ];

  return [
    defaultTemplate,
    queueTemplate,
    chatTemplate,
    giftTemplate,
    likesTemplate,
    viewerStatsTemplate,
    commandFeedbackTemplate,
    alertTemplate,
    voteTemplate
  ].map((template, index) => ({
    ...template,
    elements: template.elements.map((element, elementIndex) => normalizeOverlayDesignerElement({
      ...element,
      zIndex: elementIndex + 1
    }, elementIndex)),
    id: `builtin-overlay-template-${index + 1}`
  }));
}

function normalizeOverlayDesignerTemplates(templates = []) {
  const source = Array.isArray(templates) && templates.length ? templates : createBuiltInOverlayDesignerTemplates();
  return source.map((template, index) => {
    const normalized = template && typeof template === "object"
      ? template
      : createOverlayDesignerTemplate(`Overlay Template ${index + 1}`);
    return {
      id: String(normalized.id ?? createOverlayDesignerId("overlay-template")).trim() || createOverlayDesignerId("overlay-template"),
      name: String(normalized.name ?? `Overlay Template ${index + 1}`).trim() || `Overlay Template ${index + 1}`,
      builtinKey: String(normalized.builtinKey ?? "").trim(),
      width: Math.max(320, Number(normalized.width) || 1920),
      height: Math.max(320, Number(normalized.height) || 1080),
      backgroundColor: normalizeOverlayDesignerHex(normalized.backgroundColor, "#08111f"),
      backgroundOpacity: clampOverlayDesignerNumber(normalized.backgroundOpacity, 0, 1, 0.45),
      backgroundImage: String(normalized.backgroundImage ?? "").trim(),
      backgroundVideo: String(normalized.backgroundVideo ?? "").trim(),
      autoLoad: String(normalized.autoLoad ?? "").trim(),
      elements: Array.isArray(normalized.elements)
        ? normalized.elements
            .map((element, elementIndex) => normalizeOverlayDesignerElement(element, elementIndex))
            .sort((left, right) => left.zIndex - right.zIndex)
            .map((element, elementIndex) => ({ ...element, zIndex: elementIndex + 1 }))
        : []
    };
  });
}

function normalizeOverlayDesignerAssignments(source = {}) {
  const normalized = Object.fromEntries(OVERLAY_DESIGNER_ASSIGNMENT_KEYS.map((key) => [key, ""]));
  if (!source || typeof source !== "object") {
    return normalized;
  }

  for (const key of OVERLAY_DESIGNER_ASSIGNMENT_KEYS) {
    normalized[key] = String(source?.[key] ?? "").trim();
  }

  return normalized;
}

function findBuiltInOverlayDesignerTemplateByKey(builtinKey) {
  const normalizedKey = String(builtinKey ?? "").trim();
  if (!normalizedKey) {
    return null;
  }

  return getOverlayDesignerTemplates().find((template) => String(template?.builtinKey ?? "").trim() === normalizedKey) ?? null;
}

function cloneOverlayDesignerTemplate(template, nameOverride = "") {
  if (!template) {
    return createOverlayDesignerTemplate(nameOverride || "Overlay Template");
  }

  return {
    ...template,
    id: createOverlayDesignerId("overlay-template"),
    name: String(nameOverride || `${template.name} Custom`).trim() || "Overlay Template",
    builtinKey: "",
    elements: Array.isArray(template.elements)
      ? template.elements.map((element) => ({
          ...element,
          id: createOverlayDesignerId("overlay-element")
        }))
      : []
  };
}

function getBuiltInOverlayDesignerTemplateKeyForOverlay(overlayKey) {
  switch (String(overlayKey ?? "").trim()) {
    case "queue":
      return "queueDefault";
    case "chat":
      return "chatDefault";
    case "gift":
      return "giftDefault";
    case "likes":
      return "likesDefault";
    case "viewerStats":
      return "viewerStatsDefault";
    case "commandFeedback":
      return "commandFeedbackDefault";
    case "vote":
      return "votingDefault";
    default:
      return "";
  }
}
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
  "knownTikTokGifts",
  "knownTikTokEmotes",
  "tiktokSessionId",
  "tiktokTargetIdc",
    "votingEnabled",
    "votingStartRole",
    "votingOverlayOrientation",
    "viewerStatsOverlayFilter",
    "viewerStatsOverlayUsername",
    "overlayDesignerTemplates",
  "activeOverlayDesignerTemplateId",
  "overlayDesignerAssignments",
  "cardCollapseState",
  "dashboardCardVisibility",
  "mainScreenPinnedCards",
  "customEventRules"
];

const MAIN_SCREEN_CARD_DEFINITIONS = [
  { key: "controls-queued-actions", label: "Controls | Queued Actions" },
  { key: "controls-auto-translate", label: "Controls | Auto Translate" },
  { key: "controls-interactive-voting", label: "Controls | Voting" },
  { key: "controls-text-to-speech", label: "Controls | Text to Speech" },
  { key: "controls-audience-filters", label: "Controls | Filters" },
  { key: "overlays-queue-overlay", label: "Overlays | Queue Overlay" },
  { key: "overlays-chat-overlay", label: "Overlays | Chat Overlay" },
  { key: "overlays-gift-overlay", label: "Overlays | Gift Overlay" },
  { key: "overlays-like-leaderboard", label: "Overlays | Like Leaderboard" },
  { key: "overlays-viewer-stats", label: "Overlays | Viewer Stats Leaderboard" },
  { key: "overlays-command-feedback", label: "Overlays | Command Feedback Overlay" },
  { key: "overlays-designer", label: "Overlays | Overlay Designer" },
  { key: "event-actions-main", label: "Event Actions | Event Actions" }
];
const BUILTIN_SUB_EMOTE_OPTIONS = [
  "GG",
  "Hype",
  "Heart",
  "Love",
  "Wow",
  "Fire",
  "Party",
  "Clap",
  "Rose",
  "Crown",
  "Star",
  "Diamond"
];
const BUILTIN_FAN_EMOTE_OPTIONS = [
  "Heart",
  "Rose",
  "GG",
  "Fire",
  "Party",
  "Love",
  "Star",
  "Sparkle",
  "Crown",
  "Wow",
  "Clap",
  "Diamond"
];
const EMOTE_SOURCE_WEIGHTS = {
  builtin: 1,
  observed: 2,
  authenticated: 3
};
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

const elevenLabsUsageState = {
  loading: false,
  apiKey: "",
  data: null,
  error: ""
};

let elevenLabsUsageRefreshTimer = null;

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
      soundCatalogSearches: new Set(),
      soundCatalogSearchRequestId: 0,
      activeCustomRuleId: null,
      customRuleSearchText: "",
      customRuleAudienceFilter: "all",
      customRuleTriggerFilter: "all",
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
    chatOverlayBaseUrl: "",
    giftOverlayBaseUrl: "",
    likesOverlayBaseUrl: "",
    viewerStatsOverlayBaseUrl: "",
    voteOverlayBaseUrl: "",
  overlayDesignerBaseUrl: "",
  playbackQueueItems: [],
  chatOverlayItems: [],
  giftOverlayItems: [],
  activeVote: null,
  overlayDesignerSelectedElementId: "",
  overlayDesignerHistoryUndo: [],
  overlayDesignerHistoryRedo: [],
  overlayDesignerZoom: 1,
  overlayDesignerShowGrid: true,
  overlayDesignerSnapGrid: true,
  overlayDesignerShowSafezone: true,
  overlayDesignerLightTheme: false,
  overlayDesignerPointerState: null,
  customRulePreviewAudio: null,
  customRuleTriggerCounts: new Map(),
  customRuleUserCooldowns: new Map(),
  birthdayActionTriggers: new Set(),
    sessionMetrics: {
      join: 0,
      firstActivity: 0,
      follows: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      coins: 0,
      subEmote: 0,
      fanEmote: 0
    },
    sessionUserMetrics: {
      join: new Map(),
      firstActivity: new Map(),
      follows: new Map(),
      likes: new Map(),
      comments: new Map(),
      shares: new Map(),
      coins: new Map(),
    subEmote: new Map(),
    fanEmote: new Map()
  },
  sessionGiftMetrics: {
    total: new Map(),
    byUser: new Map()
  },
  sessionEmoteMetrics: {
    subEmote: {
      total: new Map(),
      byUser: new Map()
    },
    fanEmote: {
      total: new Map(),
      byUser: new Map()
    }
  },
  sessionUserProfiles: new Map(),
  triggeredCustomRuleIds: new Set(),
  statState: {
      viewerCount: null,
      gifts: 0,
      followers: 0,
      chatTimestamps: []
    }
};

let toastTimer = null;
let saveSettingsTimer = null;
let pendingSettingsSavePromise = Promise.resolve();
let activeVoteCloseTimer = null;
let activeVoteRevealTimer = null;
let activeVoteClearTimer = null;
let headerEventsWired = false;
let authEventsWired = false;
let chatToolbarEventsWired = false;
let tabEventsWired = false;
let overlayDesignerEventsWired = false;
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
    votingEnabled: false,
    votingStartRole: "everyone",
    votingOverlayOrientation: "horizontal",
    viewerStatsOverlayFilter: "everyone",
    viewerStatsOverlayUsername: "",
    ttsUserVoiceAssignments: {
      builtin: {},
      elevenlabs: {}
    },
    userNotes: {},
    knownTikTokGifts: [],
    knownTikTokEmotes: [],
    tiktokSessionId: "",
    tiktokTargetIdc: "",
    overlayDesignerTemplates: createBuiltInOverlayDesignerTemplates(),
    activeOverlayDesignerTemplateId: "builtin-overlay-template-1",
    overlayDesignerAssignments: normalizeOverlayDesignerAssignments(),
    cardCollapseState: {},
    dashboardCardVisibility: {
      welcome: true,
      "incoming-chat": true
    },
    mainScreenPinnedCards: {},
    customEventRules: []
  };
}

let authSessionMonitorTimer = null;
const AUTH_SESSION_MONITOR_MS = 10000;

function ensureSettingsShape(source = {}) {
  const defaults = createDefaultSettings();
  const {
    normalizedProfiles,
    activeSettingsProfileId,
    activeProfileSettings
  } = resolveActiveProfileState(source);

  return {
    ...defaults,
    ...source,
    ...activeProfileSettings,
    activeSettingsProfileId,
    settingsProfiles: normalizedProfiles,
    rememberedUsernames: normalizeRememberedUsernames([activeProfileSettings?.rememberedUsername, ...(activeProfileSettings?.rememberedUsernames ?? [])]),
    userNotes: normalizeUserNotes(activeProfileSettings?.userNotes),
    knownTikTokEmotes: normalizeKnownTikTokEmotes(activeProfileSettings?.knownTikTokEmotes),
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

function isAuthServiceUnavailableError(error) {
  const message = String(error?.message || "").trim().toLowerCase();
  return (
    message.includes("unable to reach the stream sync pro sign-in service")
    || message.includes("failed to fetch")
    || message.includes("networkerror")
    || message.includes("load failed")
    || message.includes("offline")
  );
}

function normalizeRule(rule, index = 0) {
  if (!rule) {
    return null;
  }

  return {
    id: String(rule.id ?? `rule-${Date.now()}-${index}`),
    enabled: rule.enabled !== false,
    name: String(rule.name ?? `Custom rule ${index + 1}`).trim() || `Custom rule ${index + 1}`,
    metric: ["follows", "likes", "shares", "coins", "specificGift", "subEmote", "fanEmote", "join", "firstActivity", "anyComment"].includes(rule.metric) ? rule.metric : "follows",
    threshold: Math.max(1, Number(rule.threshold) || 1),
    queueId: normalizeQueueId(rule.queueId, 1),
    soundId: String(rule.soundId ?? "").trim(),
    webhookUrl: String(rule.webhookUrl ?? "").trim(),
    userCooldownSeconds: Math.max(0, Number(rule.userCooldownSeconds) || 0),
    triggerAudience: ["everyone", "follower", "subscriber", "moderator", "topGifter", "specificUser"].includes(rule.triggerAudience)
      ? rule.triggerAudience
      : "everyone",
    triggerUsername: String(rule.triggerUsername ?? "").trim().replace(/^@/, "").toLowerCase(),
    triggerEmoteId: String(rule.triggerEmoteId ?? "").trim(),
    triggerEmoteName: String(rule.triggerEmoteName ?? "").trim(),
    triggerEmoteImageUrl: String(rule.triggerEmoteImageUrl ?? "").trim(),
    triggerGiftName: String(rule.triggerGiftName ?? "").trim(),
    triggerGiftImageUrl: String(rule.triggerGiftImageUrl ?? "").trim(),
    feedbackOverlayEnabled: Boolean(rule.feedbackOverlayEnabled),
    feedbackOverlayTitle: String(rule.feedbackOverlayTitle ?? "").trim(),
    feedbackOverlayMessage: String(rule.feedbackOverlayMessage ?? "").trim(),
    feedbackOverlayAccentColor: normalizeOverlayAccentColor(rule.feedbackOverlayAccentColor)
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
    userCooldownSeconds: 0,
    triggerAudience: "everyone",
    triggerUsername: "",
    triggerEmoteId: "",
    triggerEmoteName: "",
    triggerEmoteImageUrl: "",
    triggerGiftName: "",
    triggerGiftImageUrl: "",
    feedbackOverlayEnabled: false,
    feedbackOverlayTitle: "Viewer Feedback",
    feedbackOverlayMessage: "",
    feedbackOverlayAccentColor: "#53dcff"
  };
}

function createDuplicateRule(sourceRule) {
  const baseRule = normalizeRule(sourceRule) ?? createDraftRule();
  return normalizeRule({
    ...baseRule,
    id: `rule-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name: `${baseRule.name} copy`,
    enabled: false
  });
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

function getChatOverlayUrl() {
  return state.chatOverlayBaseUrl || "";
}

function getGiftOverlayUrl() {
  return state.giftOverlayBaseUrl || "";
}

function getLikesOverlayUrl() {
  return state.likesOverlayBaseUrl || "";
}

function getViewerStatsOverlayUrl() {
  return state.viewerStatsOverlayBaseUrl || "";
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

function updateChatOverlayControls(info = {}) {
  if (info?.url) {
    state.chatOverlayBaseUrl = String(info.url).trim();
  }

  const overlayUrl = getChatOverlayUrl();
  chatOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  chatOverlayCopyButton.disabled = overlayUrl === "";
  chatOverlayOpenButton.disabled = overlayUrl === "";
  setStatusMessage(
    chatOverlayStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? "Chat overlay hosted URL ready. Use this in TikTok or OBS."
      : "Chat overlay is unavailable right now."
  );
}

function updateGiftOverlayControls(info = {}) {
  if (info?.url) {
    state.giftOverlayBaseUrl = String(info.url).trim();
  }

  const overlayUrl = getGiftOverlayUrl();
  giftOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  giftOverlayCopyButton.disabled = overlayUrl === "";
  giftOverlayOpenButton.disabled = overlayUrl === "";
  setStatusMessage(
    giftOverlayStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? "Gift overlay hosted URL ready. Use this in TikTok or OBS."
      : "Gift overlay is unavailable right now."
  );
}

function updateLikesOverlayControls(info = {}) {
  if (info?.url) {
    state.likesOverlayBaseUrl = String(info.url).trim();
  }

  const overlayUrl = getLikesOverlayUrl();
  likesOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  likesOverlayCopyButton.disabled = overlayUrl === "";
  likesOverlayOpenButton.disabled = overlayUrl === "";
  setStatusMessage(
    likesOverlayStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? "Like leaderboard hosted URL ready. Use this in TikTok or OBS."
        : "Like leaderboard overlay is unavailable right now."
    );
}

function updateViewerStatsOverlayControls(info = {}) {
  if (info?.url) {
    state.viewerStatsOverlayBaseUrl = String(info.url).trim();
  }

  const overlayUrl = getViewerStatsOverlayUrl();
  viewerStatsOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  viewerStatsOverlayCopyButton.disabled = overlayUrl === "";
  viewerStatsOverlayOpenButton.disabled = overlayUrl === "";
  const activeElement = document.activeElement;
  if (viewerStatsOverlayFilterInput && activeElement !== viewerStatsOverlayFilterInput) {
    viewerStatsOverlayFilterInput.value = getViewerStatsAudienceFilter();
  }
  if (viewerStatsOverlayUsernameInput && activeElement !== viewerStatsOverlayUsernameInput) {
    viewerStatsOverlayUsernameInput.value = String(state.settings?.viewerStatsOverlayUsername ?? "").trim();
  }
  setStatusMessage(
    viewerStatsOverlayStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? `Viewer stats overlay hosted URL ready. Filter: ${state.settings?.viewerStatsOverlayFilter || "everyone"}.`
      : "Viewer stats overlay is unavailable right now."
  );
}

function getVoteOverlayUrl() {
  return state.voteOverlayBaseUrl || "";
}

function updateVoteOverlayControls(info = {}) {
  if (info?.url) {
    state.voteOverlayBaseUrl = String(info.url).trim();
  }

  const overlayUrl = getVoteOverlayUrl();
  voteOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  voteOverlayCopyButton.disabled = overlayUrl === "";
  voteOverlayOpenButton.disabled = overlayUrl === "";
  setStatusMessage(
    voteOverlayStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? `Voting overlay hosted URL ready. Layout: ${state.settings?.votingOverlayOrientation === "vertical" ? "vertical" : "horizontal"} spin bar.`
      : "Voting overlay is unavailable right now."
  );
}

async function loadOverlayInfoBundle() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    state.queueOverlayBaseUrl = "";
    state.chatOverlayBaseUrl = "";
    state.giftOverlayBaseUrl = "";
    state.likesOverlayBaseUrl = "";
    state.viewerStatsOverlayBaseUrl = "";
    state.voteOverlayBaseUrl = "";
    state.commandFeedbackOverlayBaseUrl = "";
    queueOverlayUrlInput.value = "Sign in to generate hosted overlay";
    queueOverlayCopyButton.disabled = true;
    queueOverlayOpenButton.disabled = true;
    setStatusMessage(queueOverlayStatus, "info", "Sign in to generate a hosted queue overlay URL for this user.");
    commandFeedbackOverlayUrlInput.value = "Sign in to generate hosted overlay";
    commandFeedbackOverlayCopyButton.disabled = true;
    commandFeedbackOverlayOpenButton.disabled = true;
    setStatusMessage(commandFeedbackStatus, "info", "Sign in to generate a hosted command feedback overlay URL for this user.");
    chatOverlayUrlInput.value = "Sign in to generate hosted overlay";
    chatOverlayCopyButton.disabled = true;
    chatOverlayOpenButton.disabled = true;
    setStatusMessage(chatOverlayStatus, "info", "Sign in to generate a hosted chat overlay URL for this user.");
    giftOverlayUrlInput.value = "Sign in to generate hosted overlay";
    giftOverlayCopyButton.disabled = true;
    giftOverlayOpenButton.disabled = true;
    setStatusMessage(giftOverlayStatus, "info", "Sign in to generate a hosted gift overlay URL for this user.");
    likesOverlayUrlInput.value = "Sign in to generate hosted overlay";
    likesOverlayCopyButton.disabled = true;
    likesOverlayOpenButton.disabled = true;
    setStatusMessage(likesOverlayStatus, "info", "Sign in to generate a hosted like leaderboard overlay URL for this user.");
    viewerStatsOverlayUrlInput.value = "Sign in to generate hosted overlay";
    viewerStatsOverlayCopyButton.disabled = true;
    viewerStatsOverlayOpenButton.disabled = true;
    setStatusMessage(viewerStatsOverlayStatus, "info", "Sign in to generate a hosted viewer stats overlay URL for this user.");
    voteOverlayUrlInput.value = "Sign in to generate hosted overlay";
    voteOverlayCopyButton.disabled = true;
    voteOverlayOpenButton.disabled = true;
    setStatusMessage(voteOverlayStatus, "info", "Sign in to generate a hosted voting overlay URL for this user.");
    return;
  }

  try {
    const info = await authRequest("/api/auth/create-overlay-sessions", {
      userId: state.authenticatedUser.id,
      sessionToken: state.authenticatedUser.sessionToken
    });
    updateQueueOverlayControls({ url: info.queueUrl });
    updateCommandFeedbackOverlayControls({ url: info.commandFeedbackUrl });
    updateChatOverlayControls({ url: info.chatUrl });
    updateGiftOverlayControls({ url: info.giftUrl });
    updateLikesOverlayControls({ url: info.likesUrl });
    updateViewerStatsOverlayControls({ url: info.viewerStatsUrl });
    updateVoteOverlayControls({ url: info.voteUrl });
  } catch (error) {
    state.queueOverlayBaseUrl = "";
    state.chatOverlayBaseUrl = "";
    state.giftOverlayBaseUrl = "";
    state.likesOverlayBaseUrl = "";
    state.viewerStatsOverlayBaseUrl = "";
    state.voteOverlayBaseUrl = "";
    state.commandFeedbackOverlayBaseUrl = "";
    queueOverlayUrlInput.value = "Overlay unavailable";
    queueOverlayCopyButton.disabled = true;
    queueOverlayOpenButton.disabled = true;
    setStatusMessage(queueOverlayStatus, "error", error.message || "Unable to load hosted overlay URLs.");
    commandFeedbackOverlayUrlInput.value = "Overlay unavailable";
    commandFeedbackOverlayCopyButton.disabled = true;
    commandFeedbackOverlayOpenButton.disabled = true;
    setStatusMessage(commandFeedbackStatus, "error", error.message || "Unable to load hosted overlay URLs.");
    chatOverlayUrlInput.value = "Overlay unavailable";
    chatOverlayCopyButton.disabled = true;
    chatOverlayOpenButton.disabled = true;
    setStatusMessage(chatOverlayStatus, "error", error.message || "Unable to load hosted overlay URLs.");
    giftOverlayUrlInput.value = "Overlay unavailable";
    giftOverlayCopyButton.disabled = true;
    giftOverlayOpenButton.disabled = true;
    setStatusMessage(giftOverlayStatus, "error", error.message || "Unable to load hosted overlay URLs.");
    likesOverlayUrlInput.value = "Overlay unavailable";
    likesOverlayCopyButton.disabled = true;
    likesOverlayOpenButton.disabled = true;
    setStatusMessage(likesOverlayStatus, "error", error.message || "Unable to load hosted overlay URLs.");
    viewerStatsOverlayUrlInput.value = "Overlay unavailable";
    viewerStatsOverlayCopyButton.disabled = true;
    viewerStatsOverlayOpenButton.disabled = true;
    setStatusMessage(viewerStatsOverlayStatus, "error", error.message || "Unable to load hosted overlay URLs.");
    voteOverlayUrlInput.value = "Overlay unavailable";
    voteOverlayCopyButton.disabled = true;
    voteOverlayOpenButton.disabled = true;
    setStatusMessage(voteOverlayStatus, "error", error.message || "Unable to load hosted overlay URLs.");
  }
}

function getOverlayDesignerTemplates() {
  return normalizeOverlayDesignerTemplates(state.settings?.overlayDesignerTemplates);
}

function getActiveOverlayDesignerTemplateId() {
  const templates = getOverlayDesignerTemplates();
  const requestedId = String(state.settings?.activeOverlayDesignerTemplateId ?? "").trim();
  return templates.some((template) => template.id === requestedId)
    ? requestedId
    : templates[0]?.id ?? "";
}

function getActiveOverlayDesignerTemplate() {
  const templates = getOverlayDesignerTemplates();
  const activeTemplateId = getActiveOverlayDesignerTemplateId();
  return templates.find((template) => template.id === activeTemplateId) ?? templates[0] ?? null;
}

function getSelectedOverlayDesignerElement() {
  const template = getActiveOverlayDesignerTemplate();
  if (!template) {
    return null;
  }
  return template.elements.find((element) => element.id === state.overlayDesignerSelectedElementId) ?? null;
}

function getOverlayDesignerAssignedTemplateId(overlayKey) {
  const assignments = normalizeOverlayDesignerAssignments(state.settings?.overlayDesignerAssignments);
  const requestedId = String(assignments?.[overlayKey] ?? "").trim();
  const templates = getOverlayDesignerTemplates();
  return templates.some((template) => template.id === requestedId) ? requestedId : "";
}

function getOverlayDesignerAssignedTemplate(overlayKey) {
  const templateId = getOverlayDesignerAssignedTemplateId(overlayKey);
  if (!templateId) {
    return null;
  }
  return getOverlayDesignerTemplates().find((template) => template.id === templateId) ?? null;
}

function getOverlayDesignerPreviewUrl() {
  const baseUrl = String(state.overlayDesignerBaseUrl ?? "").trim();
  const activeTemplateId = getActiveOverlayDesignerTemplateId();
  if (!baseUrl || !activeTemplateId) {
    return "";
  }

  try {
    const requestUrl = new URL(baseUrl);
    requestUrl.searchParams.set("template", activeTemplateId);
    return requestUrl.toString();
  } catch {
    return baseUrl;
  }
}

function createOverlayDesignerRuntimeState() {
  const latestChatMessage = state.chatOverlayItems[0] ?? null;
  const latestGift = state.giftOverlayItems[0] ?? null;
  const latestFeedback = {
    title: "Viewer Feedback",
    message: String(commandFeedbackStatus?.textContent ?? "").trim()
  };

  return {
    connected: state.connected,
    username: state.username,
    viewerCount: String(statViewers?.textContent ?? "").trim(),
    queueCount: state.playbackQueueItems.length,
    chatMessage: latestChatMessage
      ? {
          username: latestChatMessage.username,
          nickname: latestChatMessage.nickname,
          message: latestChatMessage.message
        }
      : null,
    ttsNotification: latestFeedback,
    alert: latestGift
      ? {
          username: latestGift.username,
          giftSent: latestGift.giftName,
          totalCoins: latestGift.totalCoins
        }
      : null,
    counters: {
      follows: Number(state.sessionMetrics.follows ?? 0),
      likes: Number(state.sessionMetrics.likes ?? 0),
      comments: Number(state.sessionMetrics.comments ?? 0),
      gifts: Number(state.statState.gifts ?? 0),
      shares: Number(state.sessionMetrics.shares ?? 0),
      coins: Number(state.sessionMetrics.coins ?? 0),
      subEmote: Number(state.sessionMetrics.subEmote ?? 0),
      fanEmote: Number(state.sessionMetrics.fanEmote ?? 0)
    },
    activeVote: buildVoteOverlayState(),
    updatedAt: new Date().toISOString()
  };
}

function createOverlayDesignerTestRuntimeState() {
  return {
    connected: true,
    username: state.username || "streamsyncpro",
    viewerCount: "248",
    queueCount: 5,
    chatMessage: {
      username: "viewer123",
      nickname: "Viewer123",
      message: "This overlay looks great!"
    },
    ttsNotification: {
      title: "Viewer Feedback",
      message: "viewer123 selected a custom TTS voice."
    },
    alert: {
      username: "gifterqueen",
      giftSent: "Rose x5",
      totalCoins: 5
    },
    counters: {
      follows: 12,
      likes: 248,
      comments: 64,
      gifts: 18,
      shares: 9,
      coins: 1337,
      subEmote: 7,
      fanEmote: 11
    },
    activeVote: {
      active: true,
      phase: "result",
      orientation: state.settings?.votingOverlayOrientation === "vertical" ? "vertical" : "horizontal",
      question: "What should we stream next?",
      countdownSeconds: 10,
      countdownEndsAt: new Date(Date.now() + 10_000).toISOString(),
      instructions: "Type !vote [number] in chat to vote.",
      totalVotes: 7,
      startedBy: "test-mode",
      winningOptionIndex: 0,
      winningOptionLabel: "Minecraft",
      spinEndsAt: new Date(Date.now()).toISOString(),
      resultVisibleUntil: new Date(Date.now() + 15_000).toISOString(),
      options: [
        { index: 1, label: "Minecraft", votes: 3, percent: 43 },
        { index: 2, label: "Fortnite", votes: 1, percent: 14 },
        { index: 3, label: "Roblox", votes: 2, percent: 29 },
        { index: 4, label: "Just Chatting", votes: 1, percent: 14 }
      ]
    },
    updatedAt: new Date().toISOString()
  };
}

function buildOverlayDesignerTemplateForState(overlayKey) {
  const template = getOverlayDesignerAssignedTemplate(overlayKey);
  return template ? JSON.parse(JSON.stringify(template)) : null;
}

function syncOverlayDesignerRuntimeState() {
  if (!state.overlayDesignerBaseUrl) {
    return;
  }

  void app.updateOverlayDesignerState({
    activeTemplateId: getActiveOverlayDesignerTemplateId(),
    templates: getOverlayDesignerTemplates(),
    runtime: createOverlayDesignerRuntimeState()
  }).catch(() => {
    // Keep editor local-first even if the preview server has a temporary problem.
  });
}

function applyOverlayDesignerSettings(partial, options = {}) {
  state.settings = ensureSettingsShape({
    ...state.settings,
    ...partial
  });

  const activeTemplate = getActiveOverlayDesignerTemplate();
  if (!activeTemplate) {
    state.overlayDesignerSelectedElementId = "";
  } else if (!activeTemplate.elements.some((element) => element.id === state.overlayDesignerSelectedElementId)) {
    state.overlayDesignerSelectedElementId = activeTemplate.elements[0]?.id ?? "";
  }

  renderOverlayDesignerControls();
  if (overlayDesignerModal && !overlayDesignerModal.hidden) {
    renderOverlayDesignerModal();
  }
  syncOverlayDesignerRuntimeState();

  if (options.persist === "immediate") {
    void persistSettings(partial).catch((error) => {
      showToast(error.message || "Unable to save overlay designer settings.", "error");
    });
  } else if (options.persist === "schedule") {
    scheduleSettingsSave();
  }
}

function snapshotOverlayDesignerHistory() {
  return JSON.stringify({
    templates: getOverlayDesignerTemplates(),
    activeTemplateId: getActiveOverlayDesignerTemplateId()
  });
}

function pushOverlayDesignerHistory() {
  state.overlayDesignerHistoryUndo.push(snapshotOverlayDesignerHistory());
  if (state.overlayDesignerHistoryUndo.length > 40) {
    state.overlayDesignerHistoryUndo.shift();
  }
  state.overlayDesignerHistoryRedo = [];
}

function restoreOverlayDesignerHistory(serializedSnapshot, direction = "undo") {
  if (!serializedSnapshot) {
    return;
  }

  try {
    const snapshot = JSON.parse(serializedSnapshot);
    applyOverlayDesignerSettings({
      overlayDesignerTemplates: normalizeOverlayDesignerTemplates(snapshot?.templates),
      activeOverlayDesignerTemplateId: String(snapshot?.activeTemplateId ?? "").trim()
    }, { persist: "schedule" });
  } catch (error) {
    showToast(error.message || `Unable to ${direction} the overlay designer change.`, "error");
  }
}

function selectOverlayDesignerElement(elementId = "") {
  state.overlayDesignerSelectedElementId = String(elementId ?? "").trim();
  if (overlayDesignerModal && !overlayDesignerModal.hidden) {
    renderOverlayDesignerModal();
  }
}

function updateActiveOverlayDesignerTemplate(mutator, options = {}) {
  const templates = getOverlayDesignerTemplates();
  const activeTemplateId = getActiveOverlayDesignerTemplateId();
  const templateIndex = templates.findIndex((template) => template.id === activeTemplateId);
  if (templateIndex === -1) {
    return;
  }

  pushOverlayDesignerHistory();
  const nextTemplates = templates.map((template, index) => {
    if (index !== templateIndex) {
      return template;
    }
    const updatedTemplate = mutator({
      ...template,
      elements: template.elements.map((element) => ({ ...element }))
    });
    return {
      ...updatedTemplate,
      elements: updatedTemplate.elements
        .map((element, elementIndex) => normalizeOverlayDesignerElement({
          ...element,
          zIndex: elementIndex + 1
        }, elementIndex))
        .sort((left, right) => left.zIndex - right.zIndex)
        .map((element, elementIndex) => ({ ...element, zIndex: elementIndex + 1 }))
    };
  });

  applyOverlayDesignerSettings({
    overlayDesignerTemplates: nextTemplates,
    activeOverlayDesignerTemplateId: activeTemplateId
  }, { persist: options.persist ?? "schedule" });
}

function updateSelectedOverlayDesignerElement(mutator, options = {}) {
  const selectedElement = getSelectedOverlayDesignerElement();
  if (!selectedElement) {
    return;
  }

  updateActiveOverlayDesignerTemplate((template) => ({
    ...template,
    elements: template.elements.map((element) => element.id === selectedElement.id
      ? normalizeOverlayDesignerElement(mutator({ ...element }), element.zIndex - 1)
      : { ...element })
  }), options);
}

function addOverlayDesignerElement(type) {
  const template = getActiveOverlayDesignerTemplate();
  if (!template) {
    return;
  }

  const element = normalizeOverlayDesignerElement({
    ...createOverlayDesignerElement(type),
    x: 60 + (template.elements.length % 6) * 28,
    y: 60 + (template.elements.length % 6) * 28,
    zIndex: template.elements.length + 1
  }, template.elements.length);

  updateActiveOverlayDesignerTemplate((currentTemplate) => ({
    ...currentTemplate,
    elements: [...currentTemplate.elements, element]
  }));
  state.overlayDesignerSelectedElementId = element.id;
  renderOverlayDesignerModal();
}

function duplicateSelectedOverlayDesignerElement() {
  const selectedElement = getSelectedOverlayDesignerElement();
  if (!selectedElement) {
    return;
  }

  const duplicatedElement = normalizeOverlayDesignerElement({
    ...selectedElement,
    id: createOverlayDesignerId("overlay-element"),
    name: `${selectedElement.name} Copy`,
    x: selectedElement.x + 24,
    y: selectedElement.y + 24
  });

  updateActiveOverlayDesignerTemplate((template) => ({
    ...template,
    elements: [...template.elements, duplicatedElement]
  }));
  state.overlayDesignerSelectedElementId = duplicatedElement.id;
  renderOverlayDesignerModal();
}

function deleteSelectedOverlayDesignerElement() {
  const selectedElement = getSelectedOverlayDesignerElement();
  if (!selectedElement) {
    return;
  }

  updateActiveOverlayDesignerTemplate((template) => ({
    ...template,
    elements: template.elements.filter((element) => element.id !== selectedElement.id)
  }));
  state.overlayDesignerSelectedElementId = getActiveOverlayDesignerTemplate()?.elements[0]?.id ?? "";
  renderOverlayDesignerModal();
}

function moveOverlayDesignerElementLayer(elementId, direction) {
  updateActiveOverlayDesignerTemplate((template) => {
    const items = [...template.elements];
    const index = items.findIndex((element) => element.id === elementId);
    if (index === -1) {
      return template;
    }

    const targetIndex = direction === "up"
      ? Math.min(items.length - 1, index + 1)
      : Math.max(0, index - 1);

    if (targetIndex === index) {
      return template;
    }

    const [item] = items.splice(index, 1);
    items.splice(targetIndex, 0, item);
    return { ...template, elements: items };
  });
}

function applyOverlayDesignerSnap(value) {
  return state.overlayDesignerSnapGrid ? Math.round(value / OVERLAY_DESIGNER_GRID_SIZE) * OVERLAY_DESIGNER_GRID_SIZE : value;
}

function formatOverlayDesignerRuntimeText(templateText) {
  const runtime = createOverlayDesignerRuntimeState();
  const latestChat = runtime.chatMessage ?? {};
  const latestAlert = runtime.alert ?? {};
  const vote = runtime.activeVote ?? {};
  const firstVoteOption = Array.isArray(vote.options) ? vote.options[0]?.label ?? "" : "";

  return String(templateText ?? "")
    .replace(/\{username\}/gi, runtime.username || latestChat.username || latestAlert.username || "viewer")
    .replace(/\{message\}/gi, latestChat.message || "Waiting for chat")
    .replace(/\{giftsent\}/gi, latestAlert.giftSent || "gift")
    .replace(/\{gift sent\}/gi, latestAlert.giftSent || "gift")
    .replace(/\{likes\}/gi, String(runtime.counters?.likes ?? 0))
    .replace(/\{follows\}/gi, String(runtime.counters?.follows ?? 0))
    .replace(/\{shares\}/gi, String(runtime.counters?.shares ?? 0))
    .replace(/\{coins\}/gi, String(runtime.counters?.coins ?? 0))
    .replace(/\{viewercount\}/gi, runtime.viewerCount || "--")
    .replace(/\{viewer count\}/gi, runtime.viewerCount || "--")
    .replace(/\{firstvoteoption\}/gi, firstVoteOption)
    .replace(/\{first vote option\}/gi, firstVoteOption);
}

function buildOverlayDesignerElementPreviewMarkup(element) {
  const content = formatOverlayDesignerRuntimeText(element.content);

  switch (element.type) {
    case "progressBar":
      return `<div class="overlay-element-progress"><span>${escapeHtml(content || "Progress")}</span><div class="overlay-element-progress-bar"><span style="width:68%"></span></div></div>`;
    case "image":
      return element.source
        ? `<img class="overlay-element-media" src="${escapeHtml(element.source)}" alt="${escapeHtml(element.name)}" />`
        : `<div class="overlay-element-html">Image source</div>`;
    case "video":
      return element.source
        ? `<video class="overlay-element-video" src="${escapeHtml(element.source)}" muted autoplay loop playsinline></video>`
        : `<div class="overlay-element-html">Video source</div>`;
    case "customHtml":
      return `<div class="overlay-element-html">${element.content || "<div>Custom HTML widget</div>"}</div>`;
    case "votingWidget": {
      const voteState = buildVoteOverlayState();
      const isVisible = Boolean(voteState.active) && Array.isArray(voteState.options) && voteState.options.length > 0 && String(voteState.phase ?? "") !== "idle";
      if (!isVisible) {
        return "";
      }

      const options = Array.isArray(voteState.options) ? voteState.options.slice(0, 4) : [];
      return `
        <div class="overlay-element-html">
          <strong>${escapeHtml(voteState.question || "Vote")}</strong>
          <div>${options.map((option) => `<div>${option.index}. ${escapeHtml(option.label)}</div>`).join("")}</div>
        </div>
      `;
    }
    default:
      return `<div class="overlay-element-text">${escapeHtml(content || element.name)}</div>`;
  }
}

function renderOverlayDesignerLayerList(template) {
  const elements = [...template.elements].sort((left, right) => right.zIndex - left.zIndex);
  overlayDesignerLayerList.innerHTML = elements.length
    ? elements.map((element) => `
        <button type="button" class="overlay-layer-row ${state.overlayDesignerSelectedElementId === element.id ? "active" : ""}" data-overlay-layer-select="${escapeHtml(element.id)}">
          <span>${escapeHtml(element.name)}</span>
          <span class="overlay-layer-actions">
            <span data-overlay-layer-toggle-visible="${escapeHtml(element.id)}">${element.visible ? "Hide" : "Show"}</span>
            <span data-overlay-layer-toggle-lock="${escapeHtml(element.id)}">${element.locked ? "Unlock" : "Lock"}</span>
            <span data-overlay-layer-move="${escapeHtml(element.id)}" data-overlay-layer-direction="up">Up</span>
            <span data-overlay-layer-move="${escapeHtml(element.id)}" data-overlay-layer-direction="down">Down</span>
            <span data-overlay-layer-duplicate="${escapeHtml(element.id)}">Copy</span>
            <span data-overlay-layer-delete="${escapeHtml(element.id)}">Delete</span>
          </span>
        </button>
      `).join("")
    : `<div class="status info">No elements yet. Add one from the left panel.</div>`;
}

function updateOverlayDesignerElementPropertyVisibility(selectedElement) {
  const isVotingWidget = Boolean(selectedElement && selectedElement.type === "votingWidget");
  overlayVotingWidgetStyleFields?.classList.toggle("is-hidden", !isVotingWidget);
}

function renderOverlayDesignerStage() {
  const template = getActiveOverlayDesignerTemplate();
  if (!template) {
    overlayDesignerStage.innerHTML = "";
    return;
  }

  overlayDesignerStage.style.width = `${template.width}px`;
  overlayDesignerStage.style.height = `${template.height}px`;
  overlayDesignerStage.style.backgroundColor = template.backgroundColor;
  overlayDesignerStage.style.backgroundImage = template.backgroundImage
    ? `linear-gradient(rgba(8,17,31,${1 - template.backgroundOpacity}), rgba(8,17,31,${1 - template.backgroundOpacity})), url("${template.backgroundImage.replace(/"/g, "%22")}")`
    : "none";
  overlayDesignerStage.style.backgroundSize = template.backgroundImage ? "cover" : "auto";
  overlayDesignerStage.classList.toggle("grid-on", state.overlayDesignerShowGrid);
  overlayDesignerStage.classList.toggle("light-theme", state.overlayDesignerLightTheme);
  overlayDesignerStage.style.transform = `scale(${state.overlayDesignerZoom})`;
  overlayDesignerStage.innerHTML = "";

  if (state.overlayDesignerShowSafezone) {
    const safezone = document.createElement("div");
    safezone.className = "overlay-designer-safezone";
    overlayDesignerStage.appendChild(safezone);
  }

  for (const element of template.elements) {
    const node = document.createElement("div");
    node.className = "overlay-designer-element";
    if (state.overlayDesignerSelectedElementId === element.id) {
      node.classList.add("selected");
    }
    if (element.locked) {
      node.classList.add("locked");
    }
    if (!element.visible) {
      node.style.display = "none";
    }

    node.dataset.overlayElementId = element.id;
    node.dataset.overlayElementType = element.type;
    const isVotingWidget = element.type === "votingWidget";
    node.style.left = `${element.x}px`;
    node.style.top = `${element.y}px`;
    node.style.width = element.autoWidth ? "max-content" : `${element.width}px`;
    node.style.height = element.autoHeight ? "max-content" : `${element.height}px`;
    node.style.minWidth = element.autoWidth ? `${OVERLAY_DESIGNER_MIN_SIZE}px` : "";
    node.style.minHeight = element.autoHeight ? `${OVERLAY_DESIGNER_MIN_SIZE}px` : "";
    node.style.zIndex = String(element.zIndex);
    node.style.opacity = String(element.opacity);
    node.style.transform = `rotate(${element.rotation}deg)`;
    node.style.borderRadius = isVotingWidget ? "0" : `${element.borderRadius}px`;
    node.style.border = isVotingWidget ? "0" : `${element.borderWidth}px solid ${element.borderColor}`;
    node.style.color = element.color;
    node.style.backgroundColor = isVotingWidget ? "transparent" : `rgba(${Number.parseInt(element.backgroundColor.slice(1, 3), 16)}, ${Number.parseInt(element.backgroundColor.slice(3, 5), 16)}, ${Number.parseInt(element.backgroundColor.slice(5, 7), 16)}, ${element.backgroundOpacity})`;
    node.style.boxShadow = isVotingWidget ? "none" : `0 0 ${Math.max(6, element.blur * 2)}px ${element.glowColor}`;
    node.style.backdropFilter = isVotingWidget ? "" : (element.blur > 0 ? `blur(${element.blur}px)` : "");
    node.style.overflow = isVotingWidget ? "visible" : "hidden";
    node.style.fontFamily = element.fontFamily;
    node.style.fontSize = `${element.fontSize}px`;
    node.style.fontWeight = String(element.fontWeight);
    node.style.letterSpacing = `${element.letterSpacing}px`;

    if (element.animation && element.animation !== "none") {
      node.classList.add(`overlay-anim-${element.animation}`);
    }

    node.innerHTML = `
      <div class="overlay-designer-element-box" style="width:${element.autoWidth ? "max-content" : "100%"};height:${element.autoHeight ? "max-content" : "100%"};max-width:${element.autoWidth ? "none" : "100%"};">${buildOverlayDesignerElementPreviewMarkup(element)}</div>
      <div class="overlay-designer-rotate-handle" data-overlay-handle="rotate" title="Rotate"></div>
      <div class="overlay-designer-resize-handle" data-overlay-handle="resize" title="Resize"></div>
    `;
    overlayDesignerStage.appendChild(node);
  }
}

function renderOverlayDesignerInspector() {
  const template = getActiveOverlayDesignerTemplate();
  const selectedElement = getSelectedOverlayDesignerElement();

  overlayDesignerEmptyState.hidden = Boolean(selectedElement);
  overlayDesignerInspector.hidden = !selectedElement;
  updateOverlayDesignerElementPropertyVisibility(selectedElement);

  if (!template) {
    return;
  }

  overlayDesignerTemplateNameInput.value = template.name;
  overlayDesignerCanvasWidthInput.value = String(template.width);
  overlayDesignerCanvasHeightInput.value = String(template.height);
  overlayDesignerBackgroundColorInput.value = template.backgroundColor;
  overlayDesignerBackgroundOpacityInput.value = String(template.backgroundOpacity);
  overlayDesignerBackgroundImageInput.value = template.backgroundImage;
  overlayDesignerBackgroundVideoInput.value = template.backgroundVideo;
  overlayDesignerAutoLoadInput.value = template.autoLoad;

  if (!selectedElement) {
    return;
  }

  overlayElementNameInput.value = selectedElement.name;
  overlayElementContentInput.value = selectedElement.content;
  overlayElementSourceInput.value = selectedElement.source;
  overlayElementXInput.value = String(Math.round(selectedElement.x));
  overlayElementYInput.value = String(Math.round(selectedElement.y));
  overlayElementWidthInput.value = String(Math.round(selectedElement.width));
  overlayElementHeightInput.value = String(Math.round(selectedElement.height));
  overlayElementAutoWidthInput.checked = Boolean(selectedElement.autoWidth);
  overlayElementAutoHeightInput.checked = Boolean(selectedElement.autoHeight);
  overlayElementWidthInput.disabled = Boolean(selectedElement.autoWidth);
  overlayElementHeightInput.disabled = Boolean(selectedElement.autoHeight);
  overlayElementRotationInput.value = String(Math.round(selectedElement.rotation));
  overlayElementOpacityInput.value = String(selectedElement.opacity);
  overlayElementFontFamilyInput.value = selectedElement.fontFamily;
  overlayElementFontSizeInput.value = String(selectedElement.fontSize);
  overlayElementFontWeightInput.value = String(selectedElement.fontWeight);
  overlayElementLetterSpacingInput.value = String(selectedElement.letterSpacing);
  overlayElementColorInput.value = selectedElement.color;
  overlayElementGlowColorInput.value = selectedElement.glowColor;
  overlayElementBackgroundColorInput.value = selectedElement.backgroundColor;
  overlayElementBackgroundOpacityInput.value = String(selectedElement.backgroundOpacity);
  overlayElementBorderColorInput.value = selectedElement.borderColor;
  overlayElementBorderWidthInput.value = String(selectedElement.borderWidth);
  overlayElementBorderRadiusInput.value = String(selectedElement.borderRadius);
  overlayElementWidgetStyleInput.value = selectedElement.widgetStyle;
  overlayElementMutedTextColorInput.value = selectedElement.mutedTextColor;
  overlayElementSuccessColorInput.value = selectedElement.successColor;
  overlayElementBlurInput.value = String(selectedElement.blur);
  overlayElementAnimationInput.value = selectedElement.animation;
  overlayElementBindingInput.value = selectedElement.binding;
}

function renderOverlayDesignerTemplateSelects() {
  const templates = getOverlayDesignerTemplates();
  const activeTemplateId = getActiveOverlayDesignerTemplateId();
  const optionsMarkup = templates
    .map((template) => `<option value="${escapeHtml(template.id)}">${escapeHtml(template.name)}</option>`)
    .join("");

  if (overlayDesignerTemplateSelect) {
    overlayDesignerTemplateSelect.innerHTML = optionsMarkup;
    overlayDesignerTemplateSelect.value = activeTemplateId;
  }
  if (overlayDesignerModalTemplateSelect) {
    overlayDesignerModalTemplateSelect.innerHTML = optionsMarkup;
    overlayDesignerModalTemplateSelect.value = activeTemplateId;
  }
}

function renderOverlayDesignerControls() {
  renderOverlayDesignerTemplateSelects();
  const overlayUrl = getOverlayDesignerPreviewUrl();
  overlayDesignerUrlInput.value = overlayUrl || "Overlay unavailable";
  overlayDesignerCopyButton.disabled = overlayUrl === "";
  overlayDesignerPreviewButton.disabled = overlayUrl === "";
  setStatusMessage(
    overlayDesignerStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? "Overlay designer preview URL ready. Use this in OBS or Streamlabs as a browser source."
      : "Overlay designer preview is unavailable right now."
  );
  updateOverlayDesignerAssignmentControls();
}

function populateOverlayDesignerAssignmentSelect(selectElement, overlayKey) {
  if (!selectElement) {
    return;
  }

  const templates = getOverlayDesignerTemplates();
  const assignedId = getOverlayDesignerAssignedTemplateId(overlayKey);
  selectElement.innerHTML = [
    '<option value="">Default overlay styling</option>',
    ...templates.map((template) => `<option value="${escapeHtml(template.id)}">${escapeHtml(template.name)}</option>`)
  ].join("");
  selectElement.value = assignedId;
}

function updateOverlayDesignerAssignmentControls() {
  populateOverlayDesignerAssignmentSelect(queueOverlayTemplateSelect, "queue");
  populateOverlayDesignerAssignmentSelect(chatOverlayTemplateSelect, "chat");
  populateOverlayDesignerAssignmentSelect(giftOverlayTemplateSelect, "gift");
  populateOverlayDesignerAssignmentSelect(likesOverlayTemplateSelect, "likes");
  populateOverlayDesignerAssignmentSelect(viewerStatsOverlayTemplateSelect, "viewerStats");
  populateOverlayDesignerAssignmentSelect(commandFeedbackOverlayTemplateSelect, "commandFeedback");
  populateOverlayDesignerAssignmentSelect(voteOverlayTemplateSelect, "vote");
}

function setOverlayDesignerAssignment(overlayKey, templateId) {
  const nextAssignments = {
    ...normalizeOverlayDesignerAssignments(state.settings?.overlayDesignerAssignments),
    [overlayKey]: String(templateId ?? "").trim()
  };

  applyOverlayDesignerSettings({
    overlayDesignerAssignments: nextAssignments
  }, { persist: "immediate" });

  if (overlayKey === "queue") {
    syncQueueOverlayState();
  } else if (overlayKey === "chat") {
    syncChatOverlayState();
  } else if (overlayKey === "gift") {
    syncGiftOverlayState();
  } else if (overlayKey === "likes") {
    syncLikesOverlayState();
  } else if (overlayKey === "viewerStats") {
    syncViewerStatsOverlayState();
  } else if (overlayKey === "commandFeedback") {
    showToast("Command feedback overlay template updated.", "success");
  } else if (overlayKey === "vote") {
    syncVoteOverlayState();
  }
}

function openOverlayDesignerForAssignment(overlayKey) {
  const assignedTemplateId = getOverlayDesignerAssignedTemplateId(overlayKey);
  if (assignedTemplateId) {
    applyOverlayDesignerSettings({
      activeOverlayDesignerTemplateId: assignedTemplateId
    }, { persist: "schedule" });
    openOverlayDesignerModal();
    return;
  }

  const builtInTemplateKey = getBuiltInOverlayDesignerTemplateKeyForOverlay(overlayKey);
  if (builtInTemplateKey) {
    const builtInTemplate = findBuiltInOverlayDesignerTemplateByKey(builtInTemplateKey);
    if (builtInTemplate) {
      const customTemplate = cloneOverlayDesignerTemplate(
        builtInTemplate,
        `${builtInTemplate.name} Custom`
      );
      const nextTemplates = [...getOverlayDesignerTemplates(), customTemplate];
      applyOverlayDesignerSettings({
        overlayDesignerTemplates: nextTemplates,
        activeOverlayDesignerTemplateId: customTemplate.id,
        overlayDesignerAssignments: {
          ...normalizeOverlayDesignerAssignments(state.settings?.overlayDesignerAssignments),
          [overlayKey]: customTemplate.id
        }
      }, { persist: "immediate" });
      state.overlayDesignerSelectedElementId = customTemplate.elements[0]?.id ?? "";
      openOverlayDesignerModal();
      return;
    }
  }

  const starterTemplate = createOverlayDesignerTemplate(`${overlayKey.replace(/([A-Z])/g, " $1").replace(/^./, (character) => character.toUpperCase())} Overlay`);
  if (overlayKey === "queue") {
    starterTemplate.elements = [createOverlayDesignerElement("text"), createOverlayDesignerElement("ttsNotification")];
  } else if (overlayKey === "chat") {
    starterTemplate.elements = [createOverlayDesignerElement("chatMessage")];
  } else if (overlayKey === "gift") {
    starterTemplate.elements = [createOverlayDesignerElement("alert"), createOverlayDesignerElement("image")];
  } else if (overlayKey === "likes") {
    starterTemplate.elements = [createOverlayDesignerElement("eventCounter"), createOverlayDesignerElement("progressBar")];
  } else if (overlayKey === "viewerStats") {
    starterTemplate.elements = [
      { ...createOverlayDesignerElement("text"), content: "Viewer Stats Leaderboard", width: 420, height: 88 },
      { ...createOverlayDesignerElement("eventCounter"), content: "Likes: {likes}", binding: "likes", y: 120 },
      { ...createOverlayDesignerElement("eventCounter"), content: "Comments: {comments}", binding: "comments", y: 220 },
      { ...createOverlayDesignerElement("eventCounter"), content: "Gifts: {gifts}", binding: "gifts", y: 320 },
      { ...createOverlayDesignerElement("eventCounter"), content: "Follows: {follows}", binding: "follows", y: 420 }
    ];
  } else if (overlayKey === "commandFeedback") {
    starterTemplate.elements = [createOverlayDesignerElement("text")];
  } else if (overlayKey === "vote") {
    starterTemplate.elements = [createOverlayDesignerElement("votingWidget")];
  }

  const nextTemplates = [...getOverlayDesignerTemplates(), starterTemplate];
  applyOverlayDesignerSettings({
    overlayDesignerTemplates: nextTemplates,
    activeOverlayDesignerTemplateId: starterTemplate.id,
    overlayDesignerAssignments: {
      ...normalizeOverlayDesignerAssignments(state.settings?.overlayDesignerAssignments),
      [overlayKey]: starterTemplate.id
    }
  }, { persist: "immediate" });
  state.overlayDesignerSelectedElementId = starterTemplate.elements[0]?.id ?? "";
  openOverlayDesignerModal();
}

function renderOverlayDesignerModal() {
  const template = getActiveOverlayDesignerTemplate();
  renderOverlayDesignerTemplateSelects();
  renderOverlayDesignerStage();
  if (template) {
    renderOverlayDesignerLayerList(template);
  }
  renderOverlayDesignerInspector();
  overlayDesignerUndoButton.disabled = state.overlayDesignerHistoryUndo.length === 0;
  overlayDesignerRedoButton.disabled = state.overlayDesignerHistoryRedo.length === 0;
  overlayDesignerShowGridInput.checked = state.overlayDesignerShowGrid;
  overlayDesignerSnapGridInput.checked = state.overlayDesignerSnapGrid;
  overlayDesignerShowSafezoneInput.checked = state.overlayDesignerShowSafezone;
  overlayDesignerLightThemeInput.checked = state.overlayDesignerLightTheme;
  overlayDesignerZoom.value = String(state.overlayDesignerZoom);
}

function isEditableDesignerTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest("input, textarea, select, [contenteditable=\"true\"]")
  );
}

function openOverlayDesignerModal() {
  overlayDesignerModal.hidden = false;
  renderOverlayDesignerModal();
}

function closeOverlayDesignerModal() {
  overlayDesignerModal.hidden = true;
  state.overlayDesignerPointerState = null;
}

async function loadOverlayDesignerInfo() {
  try {
    const info = await app.getOverlayDesignerInfo();
    state.overlayDesignerBaseUrl = String(info?.url ?? "").trim();
    renderOverlayDesignerControls();
    syncOverlayDesignerRuntimeState();
  } catch (error) {
    state.overlayDesignerBaseUrl = "";
    overlayDesignerUrlInput.value = "Overlay unavailable";
    overlayDesignerCopyButton.disabled = true;
    overlayDesignerPreviewButton.disabled = true;
    setStatusMessage(overlayDesignerStatus, "error", error.message || "Unable to load overlay designer preview URL.");
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
    designerTemplate: buildOverlayDesignerTemplateForState("queue"),
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

  syncOverlayDesignerRuntimeState();
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

function getSupportedChatCommandList() {
  const availableEntries = getAvailableTtsVoiceEntries();
  const myTtsVoiceRange = availableEntries.length > 0 ? ` (1-${availableEntries.length})` : "";
  const commands = [
    "!listcomands",
    "!listcommands",
    `!myttsvoice <number>${myTtsVoiceRange}`
  ];

  if (state.settings?.votingEnabled) {
    commands.push('!castvote "Question" "Option 1, Option 2" <seconds>');
    commands.push("!vote <number>");
  }

  return commands.join(", ");
}

function formatCommandFeedbackTemplate(template, replacements) {
  return String(template ?? "")
    .replaceAll("{user}", replacements.user ?? "")
    .replaceAll("{voiceLabel}", replacements.voiceLabel ?? "")
    .replaceAll("{voiceNumber}", replacements.voiceNumber ?? "")
    .replaceAll("{commandList}", replacements.commandList ?? "")
    .trim();
}

function formatNamedTemplate(template, replacements = {}) {
  const normalizedReplacements = new Map(
    Object.entries(replacements).map(([key, value]) => [String(key ?? "").trim().toLowerCase(), String(value ?? "")])
  );

  return String(template ?? "").replace(/\{([^}]+)\}/g, (match, tokenName) => {
    const normalizedToken = String(tokenName ?? "").trim().toLowerCase();
    return normalizedReplacements.has(normalizedToken) ? normalizedReplacements.get(normalizedToken) : match;
  }).trim();
}

function normalizeOverlayAccentColor(value, fallback = "#53dcff") {
  const candidate = String(value ?? "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(candidate) ? candidate : fallback;
}

function showHostedFeedbackOverlay(payload = {}) {
  const message = String(payload?.message ?? "").trim();
  if (!message) {
    return;
  }

  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  const durationMs = Math.max(1000, Number(payload?.durationMs ?? state.settings?.commandFeedbackOverlayDurationMs) || 6000);
  const visibleUntil = new Date(Date.now() + durationMs).toISOString();

  void authRequest("/api/overlay/update-command-feedback-state", {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    message,
    commandType: String(payload?.commandType ?? "").trim(),
    username: String(payload?.username ?? "").trim(),
    title: String(payload?.title ?? "").trim(),
    accentColor: normalizeOverlayAccentColor(payload?.accentColor),
    sourceType: String(payload?.sourceType ?? "").trim(),
    designerTemplate: buildOverlayDesignerTemplateForState("commandFeedback"),
    durationMs,
    visibleUntil
  }).catch(() => {
    // Ignore overlay sync errors so main action handling still completes normally.
  });
}

function showCommandFeedbackOverlay(commandType, replacements) {
  const template = state.settings?.commandFeedbackTemplates?.[commandType] ?? "";
  const message = formatCommandFeedbackTemplate(template, replacements);
  if (!message) {
    return;
  }

  showHostedFeedbackOverlay({
    title: "Viewer Feedback",
    message,
    commandType,
    username: replacements.user ?? "",
    accentColor: "#53dcff",
    sourceType: "command"
  });
}

function updateVotingStatus(message) {
  const enabled = Boolean(state.settings?.votingEnabled);
  const role = String(state.settings?.votingStartRole ?? "everyone");
  const orientation = state.settings?.votingOverlayOrientation === "vertical" ? "vertical" : "horizontal";
  const defaultMessage = enabled
    ? `Voting commands are on. ${role === "everyone" ? "Everyone" : role === "subscribers" ? "Subscribers" : "Moderators"} can start votes. Overlay layout: ${orientation}.`
    : "Voting commands are off.";
  setStatusMessage(votingStatus, enabled ? "success" : "info", message || defaultMessage);
}

function normalizeVoteUserKey(value) {
  return normalizeUserKey(value);
}

function clearActiveVoteTimers() {
  window.clearTimeout(activeVoteCloseTimer);
  window.clearTimeout(activeVoteRevealTimer);
  window.clearTimeout(activeVoteClearTimer);
  activeVoteCloseTimer = null;
  activeVoteRevealTimer = null;
  activeVoteClearTimer = null;
}

function getVotingStartRole() {
  const value = String(state.settings?.votingStartRole ?? "everyone").trim().toLowerCase();
  return ["everyone", "subscribers", "moderators"].includes(value) ? value : "everyone";
}

function canUserStartVote(item) {
  if (!state.settings?.votingEnabled) {
    return {
      allowed: false,
      error: "Voting commands are currently disabled in the app settings."
    };
  }

  const role = getVotingStartRole();
  if (role === "subscribers" && !item?.isSubscriber) {
    return {
      allowed: false,
      error: "Only subscribers can start votes right now."
    };
  }

  if (role === "moderators" && !item?.isModerator) {
    return {
      allowed: false,
      error: "Only moderators can start votes right now."
    };
  }

  return { allowed: true, role };
}

function parseCastVoteCommand(messageText) {
  const match = String(messageText ?? "").trim().match(/^!castvote\s+"([^"]+)"\s+"([^"]+)"\s+(\d+)\s*$/i);
  if (!match) {
    return null;
  }

  const question = String(match[1] ?? "").trim();
  const options = String(match[2] ?? "")
    .split(",")
    .map((option) => option.trim())
    .filter(Boolean);
  const countdownSeconds = Number(match[3] ?? 0);

  return {
    question,
    options,
    countdownSeconds
  };
}

function getVoteWinnerIndex(options = []) {
  const normalizedOptions = Array.isArray(options) ? options : [];
  if (!normalizedOptions.length) {
    return -1;
  }

  const highestVoteCount = normalizedOptions.reduce(
    (max, option) => Math.max(max, Math.max(0, Number(option?.votes) || 0)),
    0
  );
  const tiedIndexes = normalizedOptions
    .map((option, index) => ({ index, votes: Math.max(0, Number(option?.votes) || 0) }))
    .filter((entry) => (highestVoteCount > 0 ? entry.votes === highestVoteCount : true))
    .map((entry) => entry.index);

  if (!tiedIndexes.length) {
    return 0;
  }

  return tiedIndexes[Math.floor(Math.random() * tiedIndexes.length)];
}

function revealActiveVoteWinner() {
  if (!state.activeVote) {
    return;
  }

  const winningOptionIndex = Math.max(0, Number(state.activeVote.winningOptionIndex) || 0);
  const winningOption = state.activeVote.options?.[winningOptionIndex];
  state.activeVote = {
    ...state.activeVote,
    phase: "result",
    winningOptionIndex,
    winningOptionLabel: String(winningOption?.label ?? ""),
    spinEndsAt: "",
    resultVisibleUntil: new Date(Date.now() + 8000).toISOString()
  };
  syncVoteOverlayState();

  if (winningOption?.label) {
    addLocalSystemChatMessage(`Voting closed. Winning answer: ${winningOption.label}.`);
    showToast(`Vote winner: ${winningOption.label}.`, "success");
  }

  activeVoteRevealTimer = null;
  activeVoteClearTimer = window.setTimeout(() => {
    clearActiveVoteTimers();
    clearVoteOverlayState();
  }, 8000);
}

function closeActiveVote() {
  if (!state.activeVote || state.activeVote.phase !== "open") {
    return;
  }

  const winningOptionIndex = getVoteWinnerIndex(state.activeVote.options);
  const winningOption = state.activeVote.options?.[winningOptionIndex];
  state.activeVote = {
    ...state.activeVote,
    phase: "spinning",
    countdownEndsAt: new Date().toISOString(),
    winningOptionIndex,
    winningOptionLabel: String(winningOption?.label ?? ""),
    spinEndsAt: new Date(Date.now() + 4200).toISOString()
  };
  syncVoteOverlayState();

  activeVoteCloseTimer = null;
  activeVoteRevealTimer = window.setTimeout(() => {
    revealActiveVoteWinner();
  }, 4200);
}

function startActiveVote(question, options, countdownSeconds, startedBy) {
  clearActiveVoteTimers();
  const safeOptions = options.map((label) => ({
    label: String(label ?? "").trim(),
    votes: 0
  })).filter((option) => option.label);
  const endAt = new Date(Date.now() + (countdownSeconds * 1000)).toISOString();

  state.activeVote = {
    id: `vote-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    question: String(question ?? "").trim(),
    options: safeOptions,
    countdownSeconds,
    countdownEndsAt: endAt,
    phase: "open",
    startedBy: String(startedBy ?? "").trim(),
    votesByUser: new Map(),
    winningOptionIndex: 0,
    winningOptionLabel: "",
    spinEndsAt: "",
    resultVisibleUntil: ""
  };

  syncVoteOverlayState();
  activeVoteCloseTimer = window.setTimeout(() => {
    closeActiveVote();
  }, Math.max(1000, countdownSeconds * 1000));
}

function startVotingOverlayTest() {
  if (state.activeVote && ["open", "spinning", "result"].includes(String(state.activeVote.phase ?? ""))) {
    showToast("Finish the current vote before starting a test vote.", "info");
    return;
  }

  startActiveVote(
    "What should we stream next?",
    ["Minecraft", "Fortnite", "Roblox", "Just Chatting"],
    10,
    "test-mode"
  );

  // Seed a few sample votes so the overlay feels alive immediately.
  const sampleVotes = [0, 1, 0, 2, 0, 3, 2];
  sampleVotes.forEach((optionIndex, index) => {
    const userKey = `test-user-${index + 1}`;
    state.activeVote.votesByUser.set(userKey, optionIndex);
    if (state.activeVote.options[optionIndex]) {
      state.activeVote.options[optionIndex].votes += 1;
    }
  });
  syncVoteOverlayState();
  showToast("Voting overlay test started.", "success");
}

async function handleCastVoteCommand(item) {
  if (item.type !== "chat") {
    return false;
  }

  const messageText = String(item.message ?? item.text ?? "").trim();
  if (!/^!castvote\b/i.test(messageText)) {
    return false;
  }

  const permission = canUserStartVote(item);
  if (!permission.allowed) {
    showToast(`@${item.user} cannot start a vote: ${permission.error}`, "error");
    return true;
  }

  if (state.activeVote && ["open", "spinning", "result"].includes(String(state.activeVote.phase ?? ""))) {
    showToast("A vote is already active or finishing. Wait for it to end before starting another one.", "error");
    return true;
  }

  const parsed = parseCastVoteCommand(messageText);
  if (!parsed) {
    showToast('Invalid vote format. Use !castvote "Question" "Option 1, Option 2, Option 3" 10', "error");
    return true;
  }

  if (!parsed.question) {
    showToast("Vote start failed because the question is missing.", "error");
    return true;
  }

  if (parsed.options.length < 2) {
    showToast("Vote start failed because at least two answer options are required.", "error");
    return true;
  }

  if (!Number.isFinite(parsed.countdownSeconds) || parsed.countdownSeconds < 5 || parsed.countdownSeconds > 300) {
    showToast("Vote start failed because the countdown must be between 5 and 300 seconds.", "error");
    return true;
  }

  startActiveVote(parsed.question, parsed.options, parsed.countdownSeconds, item.user);
  addLocalSystemChatMessage(`Vote started by @${item.user}: ${parsed.question}`);
  showToast(`Vote started by @${item.user}.`, "success");
  return true;
}

async function handleVoteCommand(item) {
  if (item.type !== "chat") {
    return false;
  }

  const messageText = String(item.message ?? item.text ?? "").trim();
  if (!/^!vote\b/i.test(messageText)) {
    return false;
  }

  const match = messageText.match(/^!vote\s+(\d+)\s*$/i);
  if (!match) {
    showToast(`Invalid vote format from @${item.user}. Use !vote [number].`, "error");
    return true;
  }

  if (!state.activeVote || state.activeVote.phase !== "open") {
    showToast(`@${item.user} tried to vote, but there is no active vote open right now.`, "info");
    return true;
  }

  const userKey = normalizeVoteUserKey(item.user);
  if (!userKey) {
    return true;
  }

  if (state.activeVote.votesByUser.has(userKey)) {
    showToast(`Duplicate vote ignored from @${item.user}.`, "info");
    return true;
  }

  const selectedNumber = Number(match[1]);
  if (!Number.isFinite(selectedNumber) || selectedNumber < 1 || selectedNumber > state.activeVote.options.length) {
    showToast(`@${item.user} chose an invalid vote number.`, "error");
    return true;
  }

  state.activeVote.votesByUser.set(userKey, selectedNumber - 1);
  state.activeVote.options[selectedNumber - 1].votes += 1;
  syncVoteOverlayState();
  return true;
}

function pushChatOverlayItem(item) {
  const overlayItem = {
    id: `chat-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    username: String(item.user || "").trim(),
    message: String(item.translatedText || item.text || "").trim(),
    originalMessage: String(item.text || "").trim()
  };

  if (!overlayItem.message) {
    return;
  }

  state.chatOverlayItems.unshift(overlayItem);
  if (state.chatOverlayItems.length > 12) {
    state.chatOverlayItems.length = 12;
  }
  syncChatOverlayState();
}

function pushGiftOverlayItem(item) {
  const overlayItem = {
    id: `gift-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    username: String(item.user || "").trim(),
    giftName: String(item.giftName || "Gift").trim() || "Gift",
    giftImageUrl: String(item.giftImageUrl || "").trim(),
    giftCount: Math.max(1, Number(item.giftCount) || 1),
    totalCoins: Math.max(0, Number(item.totalCoins) || 0),
    message: String(item.text || "").trim()
  };

  state.giftOverlayItems.unshift(overlayItem);
  if (state.giftOverlayItems.length > 12) {
    state.giftOverlayItems.length = 12;
  }
  syncGiftOverlayState();
}

function clearHostedFeedOverlayState() {
  state.chatOverlayItems = [];
  state.giftOverlayItems = [];
  syncChatOverlayState();
  syncGiftOverlayState();
  syncLikesOverlayState();
  syncViewerStatsOverlayState();
  clearActiveVoteTimers();
  clearVoteOverlayState();
}

function syncChatOverlayState() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  void authRequest("/api/overlay/update-chat-state", {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    connected: state.connected,
    username: state.username,
    designerTemplate: buildOverlayDesignerTemplateForState("chat"),
    items: state.chatOverlayItems
  }).catch(() => {
    // Ignore hosted overlay sync errors so chat processing continues normally.
  });

  syncOverlayDesignerRuntimeState();
}

function syncGiftOverlayState() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  void authRequest("/api/overlay/update-gift-state", {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    connected: state.connected,
    username: state.username,
    designerTemplate: buildOverlayDesignerTemplateForState("gift"),
    items: state.giftOverlayItems
  }).catch(() => {
    // Ignore hosted overlay sync errors so gift processing continues normally.
  });

  syncOverlayDesignerRuntimeState();
}

function buildLikesOverlayItems() {
  return Array.from(state.sessionUserMetrics.likes.entries())
    .map(([username, likes]) => ({
      username: String(username || "").trim(),
      likes: Math.max(0, Number(likes) || 0)
    }))
    .filter((item) => item.username && item.likes > 0)
    .sort((left, right) => right.likes - left.likes || left.username.localeCompare(right.username))
    .slice(0, 10);
}

function getViewerStatsAudienceFilter() {
  const value = String(state.settings?.viewerStatsOverlayFilter ?? "everyone").trim().toLowerCase();
  return ["everyone", "subscriber", "moderator", "username"].includes(value) ? value : "everyone";
}

function getViewerStatsUsernameFilter() {
  return String(state.settings?.viewerStatsOverlayUsername ?? "").trim().replace(/^@/, "").toLowerCase();
}

function getSessionGiftCountForUser(userId) {
  const normalizedUserId = normalizeUserKey(userId);
  if (!normalizedUserId) {
    return 0;
  }
  const userGiftMap = state.sessionGiftMetrics.byUser.get(normalizedUserId);
  if (!userGiftMap) {
    return 0;
  }

  let total = 0;
  for (const amount of userGiftMap.values()) {
    total += Math.max(0, Number(amount) || 0);
  }
  return total;
}

function buildViewerStatsOverlayItems() {
  const audienceFilter = getViewerStatsAudienceFilter();
  const usernameFilter = getViewerStatsUsernameFilter();
  const userIds = new Set([
    ...Array.from(state.sessionUserProfiles.keys()),
    ...Array.from(state.sessionUserMetrics.likes.keys()),
    ...Array.from(state.sessionUserMetrics.comments.keys()),
    ...Array.from(state.sessionUserMetrics.shares.keys()),
    ...Array.from(state.sessionUserMetrics.follows.keys()),
    ...Array.from(state.sessionGiftMetrics.byUser.keys())
  ]);

  const items = [];
  for (const userId of userIds) {
    const normalizedUserId = normalizeUserKey(userId);
    if (!normalizedUserId) {
      continue;
    }

    const profile = state.sessionUserProfiles.get(normalizedUserId) ?? {};
    if (audienceFilter === "subscriber" && !profile?.isSubscriber) {
      continue;
    }
    if (audienceFilter === "moderator" && !profile?.isModerator) {
      continue;
    }
    if (audienceFilter === "username" && usernameFilter && normalizedUserId !== usernameFilter) {
      continue;
    }
    if (audienceFilter === "username" && !usernameFilter) {
      continue;
    }

    const likes = Math.max(0, Number(state.sessionUserMetrics.likes.get(normalizedUserId) ?? 0) || 0);
    const comments = Math.max(0, Number(state.sessionUserMetrics.comments.get(normalizedUserId) ?? 0) || 0);
    const shares = Math.max(0, Number(state.sessionUserMetrics.shares.get(normalizedUserId) ?? 0) || 0);
    const follows = Math.max(0, Number(state.sessionUserMetrics.follows.get(normalizedUserId) ?? 0) || 0);
    const coins = Math.max(0, Number(state.sessionUserMetrics.coins.get(normalizedUserId) ?? 0) || 0);
    const gifts = getSessionGiftCountForUser(normalizedUserId);
    const totalScore = likes + comments + shares + follows + gifts + coins;
    if (totalScore <= 0) {
      continue;
    }

    items.push({
      username: normalizedUserId,
      displayName: String(profile?.nickname ?? normalizedUserId).trim() || normalizedUserId,
      isSubscriber: Boolean(profile?.isSubscriber),
      isModerator: Boolean(profile?.isModerator),
      likes,
      comments,
      shares,
      follows,
      coins,
      gifts,
      totalScore
    });
  }

  return items
    .sort((left, right) => right.totalScore - left.totalScore || right.likes - left.likes || left.username.localeCompare(right.username))
    .slice(0, 10);
}

function syncLikesOverlayState() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  void authRequest("/api/overlay/update-likes-state", {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    connected: state.connected,
    username: state.username,
    designerTemplate: buildOverlayDesignerTemplateForState("likes"),
    items: buildLikesOverlayItems()
  }).catch(() => {
    // Ignore hosted overlay sync errors so like handling continues normally.
  });

  syncOverlayDesignerRuntimeState();
}

function syncViewerStatsOverlayState() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  void authRequest("/api/overlay/update-viewer-stats-state", {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    connected: state.connected,
    username: state.username,
    filterAudience: getViewerStatsAudienceFilter(),
    filterUsername: getViewerStatsUsernameFilter(),
    designerTemplate: buildOverlayDesignerTemplateForState("viewerStats"),
    items: buildViewerStatsOverlayItems()
  }).catch(() => {
    // Ignore hosted overlay sync errors so metric tracking continues normally.
  });

  syncOverlayDesignerRuntimeState();
}

function buildVoteOverlayOptions() {
  const options = Array.isArray(state.activeVote?.options) ? state.activeVote.options : [];
  const totalVotes = options.reduce((sum, option) => sum + Math.max(0, Number(option?.votes) || 0), 0);

  return options.map((option, index) => {
    const votes = Math.max(0, Number(option?.votes) || 0);
    return {
      index: index + 1,
      label: String(option?.label ?? `Option ${index + 1}`).trim() || `Option ${index + 1}`,
      votes,
      percent: totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
    };
  });
}

function buildVoteOverlayState() {
  const vote = state.activeVote;
  if (!vote) {
    return {
      active: false,
      phase: "idle",
      connected: state.connected,
      username: state.username,
      orientation: state.settings?.votingOverlayOrientation === "vertical" ? "vertical" : "horizontal",
      question: "",
      countdownSeconds: 0,
      countdownEndsAt: "",
      totalVotes: 0,
      instructions: "Type !vote [number] in chat to vote.",
      options: [],
      startedBy: "",
      winningOptionIndex: 0,
      winningOptionLabel: "",
      spinEndsAt: "",
      resultVisibleUntil: "",
      updatedAt: new Date().toISOString()
    };
  }

  const options = buildVoteOverlayOptions();
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return {
    active: true,
    phase: vote.phase,
    connected: state.connected,
    username: state.username,
    orientation: state.settings?.votingOverlayOrientation === "vertical" ? "vertical" : "horizontal",
    question: vote.question,
    countdownSeconds: Math.max(0, Number(vote.countdownSeconds) || 0),
    countdownEndsAt: String(vote.countdownEndsAt ?? ""),
    totalVotes,
    instructions: "Type !vote [number] in chat to vote.",
    options,
    startedBy: String(vote.startedBy ?? ""),
    winningOptionIndex: Math.max(0, Number(vote.winningOptionIndex) || 0),
    winningOptionLabel: String(vote.winningOptionLabel ?? ""),
    spinEndsAt: String(vote.spinEndsAt ?? ""),
    resultVisibleUntil: String(vote.resultVisibleUntil ?? ""),
    updatedAt: new Date().toISOString()
  };
}

function syncVoteOverlayState() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    return;
  }

  void authRequest("/api/overlay/update-vote-state", {
    userId: state.authenticatedUser.id,
    sessionToken: state.authenticatedUser.sessionToken,
    designerTemplate: buildOverlayDesignerTemplateForState("vote"),
    ...buildVoteOverlayState()
  }).catch(() => {
    // Ignore hosted overlay sync errors so voting stays local-first.
  });

  syncOverlayDesignerRuntimeState();
}

function clearVoteOverlayState() {
  state.activeVote = null;
  syncVoteOverlayState();
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
      .map(([key, value]) => {
        const normalizedKey = normalizeUserKey(key);
        if (!normalizedKey) {
          return null;
        }

        if (value && typeof value === "object" && !Array.isArray(value)) {
          const note = String(value.note ?? "").trim();
          const birthday = /^\d{4}-\d{2}-\d{2}$/.test(String(value.birthday ?? "").trim())
            ? String(value.birthday).trim()
            : "";
          const birthdayActionRuleId = String(value.birthdayActionRuleId ?? "").trim();

          if (!note && !birthday && !birthdayActionRuleId) {
            return null;
          }

          return [normalizedKey, { note, birthday, birthdayActionRuleId }];
        }

        const note = String(value ?? "").trim();
        if (!note) {
          return null;
        }

        return [normalizedKey, { note, birthday: "", birthdayActionRuleId: "" }];
      })
      .filter(Boolean)
  );
}

function normalizeKnownTikTokGifts(source = []) {
  if (!Array.isArray(source)) {
    return [];
  }

  const seen = new Set();
  const normalized = [];

  for (const entry of source) {
    const giftId = String(entry?.giftId ?? entry?.id ?? "").trim();
    const giftName = String(entry?.giftName ?? entry?.name ?? "").trim();
    const giftImageUrl = String(entry?.giftImageUrl ?? entry?.imageUrl ?? "").trim();
    const coinValue = Math.max(0, Number(entry?.coinValue ?? entry?.diamondCount ?? 0) || 0);
    const sourceTag = ["builtin", "observed", "roomCatalog"].includes(entry?.source) ? entry.source : "observed";
    const key = giftName.toLowerCase();
    if (!giftName || seen.has(key)) {
      continue;
    }

    seen.add(key);
      normalized.push({
        giftId,
        giftName,
        giftImageUrl,
        coinValue,
        source: sourceTag
      });
    }

  return normalized.sort((left, right) => {
    const leftCoins = Number.isFinite(left.coinValue) && left.coinValue > 0 ? left.coinValue : Number.MAX_SAFE_INTEGER;
    const rightCoins = Number.isFinite(right.coinValue) && right.coinValue > 0 ? right.coinValue : Number.MAX_SAFE_INTEGER;
    if (leftCoins !== rightCoins) {
      return leftCoins - rightCoins;
    }
    return left.giftName.localeCompare(right.giftName);
  });
}

function mergeKnownTikTokGifts(...sources) {
  const merged = new Map();
  const getSourceWeight = (sourceTag = "") => {
    switch (sourceTag) {
      case "roomCatalog":
        return 3;
      case "observed":
        return 2;
      case "builtin":
      default:
        return 1;
    }
  };

  for (const source of sources) {
    for (const entry of normalizeKnownTikTokGifts(source)) {
      const key = entry.giftId ? `id:${entry.giftId}` : `name:${normalizeGiftKey(entry.giftName)}`;
      const existing = merged.get(key);

      if (!existing) {
        merged.set(key, { ...entry });
        continue;
      }

      const existingWeight = getSourceWeight(existing.source);
      const nextWeight = getSourceWeight(entry.source);
      const imageUrl = nextWeight >= existingWeight
        ? (entry.giftImageUrl || existing.giftImageUrl || "")
        : (existing.giftImageUrl || entry.giftImageUrl || "");
      const coinValue = nextWeight >= existingWeight
        ? (entry.coinValue > 0 ? entry.coinValue : existing.coinValue)
        : (existing.coinValue > 0 ? existing.coinValue : entry.coinValue);
      const sourceTag = nextWeight >= existingWeight ? entry.source : existing.source;

      merged.set(key, {
        giftId: existing.giftId || entry.giftId || "",
        giftName: existing.giftName || entry.giftName,
        giftImageUrl: imageUrl,
        coinValue,
        source: sourceTag
      });
    }
  }

  const mergedByName = new Map();
  for (const entry of normalizeKnownTikTokGifts(Array.from(merged.values()))) {
    const nameKey = normalizeGiftKey(entry.giftName);
    const existing = mergedByName.get(nameKey);
    if (!existing || getSourceWeight(entry.source) > getSourceWeight(existing.source)) {
      mergedByName.set(nameKey, entry);
    }
  }

  return normalizeKnownTikTokGifts(Array.from(mergedByName.values()));
}

function normalizeCreatorUsername(value) {
  return String(value ?? "").trim().replace(/^@/, "").toLowerCase();
}

function normalizeKnownTikTokEmotes(source = []) {
  if (!Array.isArray(source)) {
    return [];
  }

  const normalized = [];
  const seen = new Set();

  for (const entry of source) {
    const metric = entry?.metric === "fanEmote" ? "fanEmote" : "subEmote";
    const creatorUsername = normalizeCreatorUsername(entry?.creatorUsername);
    const emoteId = String(entry?.emoteId ?? "").trim();
    const emoteName = String(entry?.emoteName ?? "").trim();
    const emoteImageUrl = String(entry?.emoteImageUrl ?? "").trim().replace(/^http:\/\//i, "https://");
    const sourceTag = ["builtin", "observed", "authenticated"].includes(entry?.source) ? entry.source : "observed";
    const valueKey = emoteId || emoteName;
    if (!valueKey) {
      continue;
    }

    const dedupeKey = [metric, creatorUsername || "*", valueKey.toLowerCase()].join("|");
    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    normalized.push({
      metric,
      creatorUsername,
      emoteId,
      emoteName,
      emoteImageUrl,
      source: sourceTag
    });
  }

  return normalized.sort((left, right) => {
    const creatorCompare = (left.creatorUsername || "").localeCompare(right.creatorUsername || "");
    if (creatorCompare !== 0) {
      return creatorCompare;
    }
    const metricCompare = left.metric.localeCompare(right.metric);
    if (metricCompare !== 0) {
      return metricCompare;
    }
    const leftLabel = left.emoteName || left.emoteId;
    const rightLabel = right.emoteName || right.emoteId;
    return leftLabel.localeCompare(rightLabel);
  });
}

function mergeKnownTikTokEmotes(...sources) {
  const merged = new Map();

  for (const source of sources) {
    for (const entry of normalizeKnownTikTokEmotes(source)) {
      const identityKey = [entry.metric, entry.creatorUsername || "*", (entry.emoteId || entry.emoteName).toLowerCase()].join("|");
      const existing = merged.get(identityKey);

      if (!existing) {
        merged.set(identityKey, { ...entry });
        continue;
      }

      const existingWeight = EMOTE_SOURCE_WEIGHTS[existing.source] ?? 1;
      const nextWeight = EMOTE_SOURCE_WEIGHTS[entry.source] ?? 1;
      const nextWins = nextWeight >= existingWeight;

      merged.set(identityKey, {
        metric: entry.metric,
        creatorUsername: entry.creatorUsername || existing.creatorUsername,
        emoteId: existing.emoteId || entry.emoteId,
        emoteName: nextWins ? (entry.emoteName || existing.emoteName) : (existing.emoteName || entry.emoteName),
        emoteImageUrl: nextWins ? (entry.emoteImageUrl || existing.emoteImageUrl) : (existing.emoteImageUrl || entry.emoteImageUrl),
        source: nextWins ? entry.source : existing.source
      });
    }
  }

  return normalizeKnownTikTokEmotes(Array.from(merged.values()));
}

function normalizeCardCollapseState(source = {}) {
  if (!source || typeof source !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(source)
      .map(([key, value]) => [String(key ?? "").trim(), Boolean(value)])
      .filter(([key]) => key)
  );
}

function normalizeDashboardCardVisibility(source = {}) {
  const defaults = {
    welcome: true,
    "incoming-chat": true
  };

  if (!source || typeof source !== "object") {
    return defaults;
  }

  return {
    welcome: source.welcome !== false,
    "incoming-chat": source["incoming-chat"] !== false
  };
}

function normalizeMainScreenPinnedCards(source = {}) {
  const defaults = Object.fromEntries(MAIN_SCREEN_CARD_DEFINITIONS.map(({ key }) => [key, false]));

  if (!source || typeof source !== "object") {
    return defaults;
  }

  const normalized = { ...defaults };
  for (const { key } of MAIN_SCREEN_CARD_DEFINITIONS) {
    normalized[key] = Boolean(source[key]);
  }
  return normalized;
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
    votingEnabled: false,
    votingStartRole: "everyone",
    votingOverlayOrientation: "horizontal",
    viewerStatsOverlayFilter: "everyone",
    viewerStatsOverlayUsername: "",
    ttsUserVoiceAssignments: {
      builtin: {},
      elevenlabs: {}
    },
    userNotes: {},
    knownTikTokGifts: [],
    knownTikTokEmotes: [],
    tiktokSessionId: "",
    tiktokTargetIdc: "",
    overlayDesignerTemplates: createBuiltInOverlayDesignerTemplates(),
    activeOverlayDesignerTemplateId: "builtin-overlay-template-1",
    overlayDesignerAssignments: normalizeOverlayDesignerAssignments(),
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
      votingEnabled: Boolean(source?.votingEnabled ?? defaults.votingEnabled),
      votingStartRole: ["everyone", "subscribers", "moderators"].includes(String(source?.votingStartRole ?? "").trim().toLowerCase())
        ? String(source?.votingStartRole ?? "").trim().toLowerCase()
        : defaults.votingStartRole,
      votingOverlayOrientation: String(source?.votingOverlayOrientation ?? "").trim().toLowerCase() === "vertical"
        ? "vertical"
        : defaults.votingOverlayOrientation,
      viewerStatsOverlayFilter: ["everyone", "subscriber", "moderator", "username"].includes(String(source?.viewerStatsOverlayFilter ?? "").trim().toLowerCase())
        ? String(source?.viewerStatsOverlayFilter ?? "").trim().toLowerCase()
        : defaults.viewerStatsOverlayFilter,
      viewerStatsOverlayUsername: String(source?.viewerStatsOverlayUsername ?? defaults.viewerStatsOverlayUsername).trim().replace(/^@/, ""),
      ttsUserVoiceAssignments: normalizeTtsUserVoiceAssignments(source?.ttsUserVoiceAssignments),
      userNotes: normalizeUserNotes(source?.userNotes),
      knownTikTokGifts: normalizeKnownTikTokGifts(source?.knownTikTokGifts),
      knownTikTokEmotes: normalizeKnownTikTokEmotes(source?.knownTikTokEmotes),
      tiktokSessionId: String(source?.tiktokSessionId ?? defaults.tiktokSessionId).trim(),
      tiktokTargetIdc: String(source?.tiktokTargetIdc ?? defaults.tiktokTargetIdc).trim(),
      overlayDesignerTemplates: normalizeOverlayDesignerTemplates(source?.overlayDesignerTemplates),
      activeOverlayDesignerTemplateId: String(source?.activeOverlayDesignerTemplateId ?? defaults.activeOverlayDesignerTemplateId).trim(),
      overlayDesignerAssignments: normalizeOverlayDesignerAssignments(source?.overlayDesignerAssignments),
      cardCollapseState: normalizeCardCollapseState(source?.cardCollapseState),
      dashboardCardVisibility: normalizeDashboardCardVisibility(source?.dashboardCardVisibility),
      mainScreenPinnedCards: normalizeMainScreenPinnedCards(source?.mainScreenPinnedCards),
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

function resolveActiveProfileState(source = {}) {
  const defaults = createDefaultSettings();
  const normalizedProfiles = normalizeSettingsProfiles(source?.settingsProfiles, {
    ...defaults,
    ...source
  });
  const requestedProfileId = String(source?.activeSettingsProfileId ?? DEFAULT_SETTINGS_PROFILE_ID).trim() || DEFAULT_SETTINGS_PROFILE_ID;
  const activeSettingsProfileId = normalizedProfiles[requestedProfileId]
    ? requestedProfileId
    : Object.keys(normalizedProfiles)[0] ?? DEFAULT_SETTINGS_PROFILE_ID;
  const existingProfile = normalizedProfiles[activeSettingsProfileId] ?? {
    name: "Default",
    settings: createDefaultProfileSettings()
  };
  const topLevelProfileSettings = extractProfileSettings({
    ...defaults,
    ...source
  });
  const activeProfileSettings = normalizeProfileSettingsSnapshot({
    ...existingProfile.settings,
    ...topLevelProfileSettings
  });

  normalizedProfiles[activeSettingsProfileId] = {
    ...existingProfile,
    settings: activeProfileSettings
  };

  return {
    normalizedProfiles,
    activeSettingsProfileId,
    activeProfileSettings
  };
}

function resolveTtsProviderKey(value) {
  return value === "elevenlabs" ? "elevenlabs" : "builtin";
}

function getCurrentTtsProviderKey() {
  return resolveTtsProviderKey(ttsProviderSelect.value);
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

function getUserAssignedTtsVoice(userKey, providerKey = getCurrentTtsProviderKey()) {
  const resolvedProviderKey = resolveTtsProviderKey(providerKey);
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return "";
  }

  return String(state.settings?.ttsUserVoiceAssignments?.[resolvedProviderKey]?.[normalizedUser] ?? "").trim();
}

async function saveUserAssignedTtsVoice(userKey, voiceValue, providerKey = getCurrentTtsProviderKey()) {
  const resolvedProviderKey = resolveTtsProviderKey(providerKey);
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return;
  }

  const nextAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  nextAssignments[resolvedProviderKey] = {
    ...nextAssignments[resolvedProviderKey],
    [normalizedUser]: String(voiceValue ?? "").trim()
  };

  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  if (nextProfiles[activeProfileId]) {
    nextProfiles[activeProfileId] = {
      ...nextProfiles[activeProfileId],
      settings: normalizeProfileSettingsSnapshot({
        ...nextProfiles[activeProfileId].settings,
        ttsUserVoiceAssignments: nextAssignments
      })
    };
  }

  await persistSettings({
    ttsUserVoiceAssignments: nextAssignments,
    settingsProfiles: nextProfiles
  });
}

async function removeUserAssignedTtsVoice(userKey, providerKey = getCurrentTtsProviderKey()) {
  const resolvedProviderKey = resolveTtsProviderKey(providerKey);
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return;
  }

  const nextAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  delete nextAssignments[resolvedProviderKey][normalizedUser];
  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  if (nextProfiles[activeProfileId]) {
    nextProfiles[activeProfileId] = {
      ...nextProfiles[activeProfileId],
      settings: normalizeProfileSettingsSnapshot({
        ...nextProfiles[activeProfileId].settings,
        ttsUserVoiceAssignments: nextAssignments
      })
    };
  }

  await persistSettings({
    ttsUserVoiceAssignments: nextAssignments,
    settingsProfiles: nextProfiles
  });
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
  ttsVoiceManagerModal.dataset.providerKey = providerKey;
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
      <article class="tts-voice-manager-row" data-tts-voice-user="${escapeHtml(userKey)}" data-tts-voice-provider="${escapeHtml(providerKey)}">
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
          <button type="button" class="ghost compact-button" data-tts-voice-save="${escapeHtml(userKey)}" data-tts-voice-provider="${escapeHtml(providerKey)}">Save</button>
          <button type="button" class="ghost compact-button" data-tts-voice-remove="${escapeHtml(userKey)}" data-tts-voice-provider="${escapeHtml(providerKey)}">Remove</button>
        </div>
      </article>
    `)
    .join("");
}

async function openTtsVoiceManagerModal() {
  if (!state.voices.length) {
    await loadVoices();
  }
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

function getUserNoteRecord(userKey) {
  const key = normalizeUserKey(userKey);
  if (!key) {
    return {
      note: "",
      birthday: "",
      birthdayActionRuleId: ""
    };
  }

  const record = normalizeUserNotes(state.settings?.userNotes)?.[key];
  return {
    note: String(record?.note ?? "").trim(),
    birthday: /^\d{4}-\d{2}-\d{2}$/.test(String(record?.birthday ?? "").trim()) ? String(record.birthday).trim() : "",
    birthdayActionRuleId: String(record?.birthdayActionRuleId ?? "").trim()
  };
}

function getUserNote(userKey) {
  return getUserNoteRecord(userKey).note;
}

function hasUserNoteRecord(userKey) {
  const record = getUserNoteRecord(userKey);
  return Boolean(record.note || record.birthday || record.birthdayActionRuleId);
}

function isBirthdayToday(birthday) {
  const normalizedBirthday = /^\d{4}-\d{2}-\d{2}$/.test(String(birthday ?? "").trim())
    ? String(birthday).trim()
    : "";
  if (!normalizedBirthday) {
    return false;
  }

  const [, month, day] = normalizedBirthday.split("-");
  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const currentDay = String(now.getDate()).padStart(2, "0");
  return month === currentMonth && day === currentDay;
}

function getBirthdayActionTriggerKey(userKey, ruleId, birthday) {
  return `${normalizeUserKey(userKey)}:${String(ruleId ?? "").trim()}:${String(birthday ?? "").trim()}`;
}

function triggerBirthdayViewerActionIfNeeded(item) {
  if (item?.type !== "chat") {
    return;
  }

  const userKey = normalizeUserKey(item?.user);
  if (!userKey) {
    return;
  }

  const noteRecord = getUserNoteRecord(userKey);
  if (!noteRecord.birthdayActionRuleId || !isBirthdayToday(noteRecord.birthday)) {
    return;
  }

  const triggerKey = getBirthdayActionTriggerKey(userKey, noteRecord.birthdayActionRuleId, noteRecord.birthday);
  if (state.birthdayActionTriggers.has(triggerKey)) {
    return;
  }

  const linkedRule = state.settings.customEventRules.find((rule) => rule.id === noteRecord.birthdayActionRuleId);
  if (!linkedRule) {
    return;
  }

  state.birthdayActionTriggers.add(triggerKey);
  showToast(`Birthday action triggered for @${userKey}.`, "success");
  void triggerCustomRule(linkedRule, { sourceItem: item });
}

function renderChatNotesBirthdayActionOptions(selectedRuleId = "") {
  if (!chatNotesBirthdayActionSelect) {
    return;
  }

  const options = [
    `<option value="">No birthday action</option>`,
    ...state.settings.customEventRules.map((rule) => {
      const selected = rule.id === selectedRuleId ? "selected" : "";
      return `<option value="${escapeHtml(rule.id)}" ${selected}>${escapeHtml(rule.name)}</option>`;
    })
  ];

  chatNotesBirthdayActionSelect.innerHTML = options.join("");
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
    case "join":
      return "Number of joins";
    case "firstActivity":
      return "Number of first user activities";
    case "anyComment":
      return "Number of comments";
    case "likes":
      return "Number of likes";
    case "shares":
      return "Number of shares";
    case "follows":
      return "Number of follows";
    case "coins":
      return "Minimum coins value";
    case "specificGift":
      return "Number of selected gifts";
    case "subEmote":
      return "Number of selected sub emotes";
    case "fanEmote":
      return "Number of selected fan emotes";
    default:
      return "Threshold value";
  }
}

function getMetricDisplayLabel(metric) {
  switch (metric) {
    case "join":
      return "joins";
    case "firstActivity":
      return "first user activities";
    case "anyComment":
      return "comments";
    case "follows":
      return "follows";
    case "shares":
      return "shares";
    case "likes":
      return "likes";
    case "coins":
      return "gift coins";
    case "specificGift":
      return "specific gift";
    case "subEmote":
      return "sub emote";
    case "fanEmote":
      return "fan emote";
    default:
      return String(metric ?? "").trim() || "trigger";
  }
}

function getStoredKnownTikTokEmotes() {
  return normalizeKnownTikTokEmotes(state.settings?.knownTikTokEmotes);
}

function getTikTokSessionCredentials() {
  return {
    sessionId: String(state.settings?.tiktokSessionId ?? "").trim(),
    ttTargetIdc: String(state.settings?.tiktokTargetIdc ?? "").trim()
  };
}

function hasSavedTikTokSessionCredentials() {
  const { sessionId, ttTargetIdc } = getTikTokSessionCredentials();
  return Boolean(sessionId && ttTargetIdc);
}

function getActiveTikTokUsernameCandidates() {
  return [
    state.username,
    usernameInput?.value,
    state.settings?.rememberedUsername
  ]
    .map(normalizeCreatorUsername)
    .filter(Boolean);
}

function getActiveTikTokCatalogUsername() {
  return getActiveTikTokUsernameCandidates()[0] ?? "";
}

function getEmoteOptionKey(entry = {}) {
  return String(entry?.emoteId || entry?.emoteName || "").trim();
}

function getEmoteDisplayLabel(entry = {}, metric = "subEmote", index = 0) {
  const explicitName = String(entry?.emoteName ?? "").trim();
  if (explicitName) {
    return explicitName;
  }

  const emoteId = String(entry?.emoteId ?? "").trim();
  if (emoteId) {
    return `${metric === "fanEmote" ? "Fan" : "Sub"} emote ${emoteId.slice(0, 8)}`;
  }

  return `${metric === "fanEmote" ? "Fan" : "Sub"} emote ${index + 1}`;
}

function getAvailableEmoteOptions(metric) {
  if (!["subEmote", "fanEmote"].includes(metric)) {
    return [];
  }

  const activeCreatorUsername = getActiveTikTokCatalogUsername();
  const storedEntries = getStoredKnownTikTokEmotes().filter((entry) => entry.metric === metric);
  const creatorEntries = activeCreatorUsername
    ? storedEntries.filter((entry) => entry.creatorUsername === activeCreatorUsername)
    : [];
  const fallbackLabelSource = metric === "subEmote" ? BUILTIN_SUB_EMOTE_OPTIONS : BUILTIN_FAN_EMOTE_OPTIONS;
  const fallbackEntries = fallbackLabelSource.map((name) => ({
    metric,
    creatorUsername: "",
    emoteId: "",
    emoteName: name,
    emoteImageUrl: "",
    source: "builtin"
  }));

  const mergedEntries = mergeKnownTikTokEmotes(
    creatorEntries.length ? creatorEntries : [],
    creatorEntries.length ? [] : fallbackEntries
  );

  return mergedEntries
    .filter((entry) => entry.metric === metric)
    .sort((left, right) => getEmoteDisplayLabel(left, metric).localeCompare(getEmoteDisplayLabel(right, metric)));
}

function getEmoteSelectorSummaryMarkup(rule) {
  const emoteName = String(rule?.triggerEmoteName ?? "").trim();
  const emoteImageUrl = String(rule?.triggerEmoteImageUrl ?? "").trim();
  const metricLabel = rule?.metric === "fanEmote" ? "Fan emote" : "Sub emote";
  const summaryLabel = emoteName || `Choose ${metricLabel.toLowerCase()}`;
  return `
    ${emoteImageUrl ? `<img class="gift-trigger-selected-icon" src="${escapeHtml(emoteImageUrl)}" alt="" loading="lazy" />` : `<span class="gift-trigger-option-icon-fallback" aria-hidden="true">EM</span>`}
    <span class="gift-trigger-summary-text">${escapeHtml(summaryLabel)}</span>
  `;
}

function getEmoteOptionsMarkup(ruleId, metric, selectedEmoteName = "", searchText = "") {
  const normalizedSelected = String(selectedEmoteName ?? "").trim().toLowerCase();
  const normalizedSearch = String(searchText ?? "").trim().toLowerCase();
  const options = getAvailableEmoteOptions(metric)
    .map((entry, index) => ({
      ...entry,
      displayLabel: getEmoteDisplayLabel(entry, metric, index)
    }))
    .filter((entry) => !normalizedSearch || entry.displayLabel.toLowerCase().includes(normalizedSearch));

  if (!options.length) {
    const activeCreator = getActiveTikTokCatalogUsername();
    return `<p class="helper-text">No ${escapeHtml(getMetricDisplayLabel(metric))} options match that search yet${activeCreator ? ` for @${escapeHtml(activeCreator)}` : ""}. Connect to the creator's LIVE and let a few emotes come through so we can learn the real list.</p>`;
  }

  return options.map((entry) => {
    const selected = entry.displayLabel.toLowerCase() === normalizedSelected;
    return `
      <button
        type="button"
        class="gift-trigger-option ${selected ? "selected" : ""}"
        data-rule-emote-option="${escapeHtml(ruleId)}"
        data-rule-emote-id="${escapeHtml(entry.emoteId || "")}"
        data-rule-emote-name="${escapeHtml(entry.displayLabel)}"
        data-rule-emote-image-url="${escapeHtml(entry.emoteImageUrl || "")}"
      >
        ${entry.emoteImageUrl ? `<img class="gift-trigger-option-icon" src="${escapeHtml(entry.emoteImageUrl)}" alt="" loading="lazy" />` : `<span class="gift-trigger-option-icon-fallback" aria-hidden="true">EM</span>`}
        <span class="gift-trigger-option-copy">
          <strong>${escapeHtml(entry.displayLabel)}</strong>
        </span>
      </button>
    `;
  }).join("");
}

function normalizeGiftKey(value) {
  return String(value ?? "").trim().toLowerCase();
}

function formatGiftCoinValue(value) {
  const safeValue = Math.max(0, Number(value) || 0);
  if (!safeValue) {
    return "";
  }
  return `${safeValue} coin${safeValue === 1 ? "" : "s"}`;
}

function getGiftCoinValueDisplay(value, source = "") {
  const formatted = formatGiftCoinValue(value);
  if (formatted) {
    return formatted;
  }
  return source === "builtin" ? "coin value unavailable" : "";
}

function getGiftFallbackBadgeMarkup(coinValue = 0) {
  const safeValue = Math.max(0, Number(coinValue) || 0);
  const badgeText = safeValue > 0 ? String(safeValue) : "Gift";
  return `<span class="gift-trigger-option-icon gift-trigger-option-icon-fallback">${escapeHtml(badgeText)}</span>`;
}

function getUnifiedBuiltInGiftCatalog() {
  return mergeKnownTikTokGifts(
    BUILTIN_TIKTOK_GIFT_CATALOG_BY_REGION.global,
    BUILTIN_TIKTOK_GIFT_CATALOG_BY_REGION.uk,
    BUILTIN_TIKTOK_GIFT_CATALOG_BY_REGION.usa
  );
}

function getKnownGiftMetadata(giftName = "") {
  const key = normalizeGiftKey(giftName);
  if (!key) {
    return null;
  }

  return getKnownTikTokGifts().find((entry) => normalizeGiftKey(entry.giftName) === key) ?? null;
}

function getKnownTikTokGifts() {
  const storedGifts = getStoredKnownTikTokGifts();
  return mergeKnownTikTokGifts(getUnifiedBuiltInGiftCatalog(), storedGifts);
}

function getStoredKnownTikTokGifts() {
  return normalizeKnownTikTokGifts(state.settings?.knownTikTokGifts ?? []);
}

async function rememberKnownTikTokGift(giftName, giftImageUrl = "", coinValue = 0, giftId = "") {
  const normalizedGiftName = String(giftName ?? "").trim();
  if (!normalizedGiftName) {
    return;
  }

  const nextGifts = getStoredKnownTikTokGifts();
  const normalizedGiftId = String(giftId ?? "").trim();
  const existingIndex = nextGifts.findIndex((entry) =>
    (normalizedGiftId && String(entry.giftId ?? "").trim() === normalizedGiftId) ||
    normalizeGiftKey(entry.giftName) === normalizeGiftKey(normalizedGiftName)
  );
  const normalizedImageUrl = String(giftImageUrl ?? "").trim();
  const normalizedCoinValue = Math.max(0, Number(coinValue ?? 0) || 0);

  if (existingIndex >= 0) {
    const existing = nextGifts[existingIndex];
    if (
      (existing.giftImageUrl === normalizedImageUrl || (!normalizedImageUrl && existing.giftImageUrl)) &&
      (existing.coinValue === normalizedCoinValue || (!normalizedCoinValue && existing.coinValue > 0))
    ) {
      return;
    }
    nextGifts[existingIndex] = {
      giftId: existing.giftId || normalizedGiftId,
      giftName: existing.giftName,
      giftImageUrl: existing.giftImageUrl || normalizedImageUrl,
      coinValue: existing.coinValue > 0 ? existing.coinValue : normalizedCoinValue,
      source: existing.source || "observed"
    };
  } else {
    nextGifts.push({
      giftId: normalizedGiftId,
      giftName: normalizedGiftName,
      giftImageUrl: normalizedImageUrl,
      coinValue: normalizedCoinValue,
      source: "observed"
    });
  }

  await persistSettings({
    knownTikTokGifts: normalizeKnownTikTokGifts(nextGifts)
  });
}

async function rememberKnownTikTokEmote(metric, emoteName = "", emoteImageUrl = "", emoteId = "", creatorUsername = "") {
  const normalizedMetric = metric === "fanEmote" ? "fanEmote" : "subEmote";
  const normalizedCreatorUsername = normalizeCreatorUsername(creatorUsername || getActiveTikTokCatalogUsername());
  const normalizedEmoteId = String(emoteId ?? "").trim();
  const normalizedEmoteName = String(emoteName ?? "").trim();
  const normalizedEmoteImageUrl = String(emoteImageUrl ?? "").trim().replace(/^http:\/\//i, "https://");

  if (!normalizedCreatorUsername || (!normalizedEmoteId && !normalizedEmoteName)) {
    return;
  }

  const nextEmotes = mergeKnownTikTokEmotes(getStoredKnownTikTokEmotes(), [{
    metric: normalizedMetric,
    creatorUsername: normalizedCreatorUsername,
    emoteId: normalizedEmoteId,
    emoteName: normalizedEmoteName,
    emoteImageUrl: normalizedEmoteImageUrl,
    source: "observed"
  }]);

  if (JSON.stringify(getStoredKnownTikTokEmotes()) === JSON.stringify(nextEmotes)) {
    return;
  }

  await persistSettings({
    knownTikTokEmotes: nextEmotes
  });
}

async function mergeAuthenticatedTikTokEmotes(username, fetchedEntries = []) {
  const normalizedCreatorUsername = normalizeCreatorUsername(username);
  if (!normalizedCreatorUsername) {
    return 0;
  }

  const normalizedFetchedEntries = normalizeKnownTikTokEmotes(
    fetchedEntries.map((entry) => ({
      metric: entry?.metric === "fanEmote" ? "fanEmote" : "subEmote",
      creatorUsername: normalizedCreatorUsername,
      emoteId: String(entry?.emoteId ?? "").trim(),
      emoteName: String(entry?.emoteName ?? "").trim(),
      emoteImageUrl: String(entry?.emoteImageUrl ?? "").trim(),
      source: "authenticated"
    }))
  );

  if (!normalizedFetchedEntries.length) {
    return 0;
  }

  const mergedEntries = mergeKnownTikTokEmotes(getStoredKnownTikTokEmotes(), normalizedFetchedEntries);
  await persistSettings({
    knownTikTokEmotes: mergedEntries
  });
  return normalizedFetchedEntries.length;
}

async function refreshAuthenticatedTikTokEmotes() {
  const username = getActiveTikTokCatalogUsername();
  if (!username) {
    throw new Error("Enter or connect to a TikTok username first.");
  }

  const { sessionId, ttTargetIdc } = getTikTokSessionCredentials();
  if (!sessionId || !ttTargetIdc) {
    throw new Error("Sign in to TikTok before refreshing emotes.");
  }

  setStatusMessage(tiktokSessionStatus, "info", `Refreshing authenticated TikTok emotes for @${username}...`);
  const result = await app.getAuthenticatedTikTokEmotes({
    username,
    sessionId,
    ttTargetIdc
  });

  const mergedCount = await mergeAuthenticatedTikTokEmotes(username, result?.emotes ?? []);

  if (mergedCount > 0) {
    setStatusMessage(tiktokSessionStatus, "success", `Learned ${mergedCount} authenticated emote${mergedCount === 1 ? "" : "s"} for @${username}.`);
    showToast(`Refreshed TikTok emotes for @${username}.`, "success");
    renderCustomRules();
    return;
  }

  const connectorMessage = String(result?.message ?? "").trim();
  setStatusMessage(
    tiktokSessionStatus,
    "info",
    connectorMessage || `TikTok did not expose any additional authenticated emotes for @${username} right now.`
  );
  showToast(`No extra authenticated emotes were returned for @${username}.`, "info");
}

function updateTikTokSessionUi() {
  const isSignedIn = hasSavedTikTokSessionCredentials();
  if (tiktokSigninButton) {
    tiktokSigninButton.disabled = isSignedIn;
  }
  if (tiktokSignoutButton) {
    tiktokSignoutButton.disabled = !isSignedIn;
  }
  if (tiktokRefreshEmotesButton) {
    tiktokRefreshEmotesButton.disabled = !isSignedIn;
  }

  setStatusMessage(
    tiktokSessionStatus,
    isSignedIn ? "success" : "info",
    isSignedIn
      ? "TikTok sign-in is connected for authenticated emote refresh."
      : "Sign in to TikTok if you want to try authenticated emote discovery."
  );
}

async function refreshKnownTikTokGiftCatalog(preferredUsername = "") {
  const usernameCandidates = [
    preferredUsername,
    usernameInput?.value,
    state.username,
    state.settings?.rememberedUsername
  ]
    .map((value) => String(value ?? "").trim().replace(/^@/, ""))
    .filter(Boolean);

  const username = usernameCandidates[0];
  if (!username) {
    return;
  }

    try {
      const result = await app.getAvailableTikTokGifts(username);
      const normalizedFetchedGifts = normalizeKnownTikTokGifts(result?.gifts);
      if (!normalizedFetchedGifts.length) {
        return result ?? { gifts: [], liveActive: false, error: "" };
      }

      const storedGifts = getStoredKnownTikTokGifts();
      const nonRoomCatalogGifts = storedGifts.filter((entry) => entry?.source !== "roomCatalog");
      const mergedGifts = mergeKnownTikTokGifts(nonRoomCatalogGifts, normalizedFetchedGifts);

      if (JSON.stringify(storedGifts) === JSON.stringify(mergedGifts)) {
        return {
        ...(result ?? {}),
        gifts: normalizedFetchedGifts
      };
    }

    await persistSettings({
      knownTikTokGifts: mergedGifts
    });
    return {
      ...(result ?? {}),
      gifts: normalizedFetchedGifts
    };
  } catch {
    // Ignore background gift catalog lookup issues and keep the built-in fallback list.
    return {
      gifts: [],
      liveActive: false,
      error: "Unable to refresh the TikTok gift catalog right now."
    };
  }
}

function getSpecificEmoteCount(rule) {
  const metric = rule?.metric === "fanEmote" ? "fanEmote" : "subEmote";
  const emoteKey = String(rule?.triggerEmoteId || rule?.triggerEmoteName || "").trim().toLowerCase();
  if (!emoteKey) {
    return 0;
  }

  const getUserEmoteCount = (userId) =>
    Number(state.sessionEmoteMetrics?.[metric]?.byUser?.get(userId)?.get(emoteKey) ?? 0);

  switch (rule?.triggerAudience) {
    case "follower": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.followedThisSession) {
          total += getUserEmoteCount(userId);
        }
      }
      return total;
    }
    case "subscriber": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.isSubscriber) {
          total += getUserEmoteCount(userId);
        }
      }
      return total;
    }
    case "moderator": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.isModerator) {
          total += getUserEmoteCount(userId);
        }
      }
      return total;
    }
    case "topGifter": {
      const topGifterUserId = getTopGifterUserId();
      return topGifterUserId ? getUserEmoteCount(topGifterUserId) : 0;
    }
    case "specificUser": {
      const targetUser = normalizeUserKey(rule?.triggerUsername);
      return targetUser ? getUserEmoteCount(targetUser) : 0;
    }
    case "everyone":
    default:
      return Number(state.sessionEmoteMetrics?.[metric]?.total?.get(emoteKey) ?? 0);
  }
}

function getSpecificGiftCount(rule) {
  const giftKey = normalizeGiftKey(rule?.triggerGiftName);
  if (!giftKey) {
    return 0;
  }

  const getUserGiftCount = (userId) => Number(state.sessionGiftMetrics.byUser.get(userId)?.get(giftKey) ?? 0);

  switch (rule?.triggerAudience) {
    case "follower": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.followedThisSession) {
          total += getUserGiftCount(userId);
        }
      }
      return total;
    }
    case "subscriber": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.isSubscriber) {
          total += getUserGiftCount(userId);
        }
      }
      return total;
    }
    case "moderator": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.isModerator) {
          total += getUserGiftCount(userId);
        }
      }
      return total;
    }
    case "topGifter": {
      const topGifterUserId = getTopGifterUserId();
      return topGifterUserId ? getUserGiftCount(topGifterUserId) : 0;
    }
    case "specificUser": {
      const targetUser = normalizeUserKey(rule?.triggerUsername);
      return targetUser ? getUserGiftCount(targetUser) : 0;
    }
    case "everyone":
    default:
      return Number(state.sessionGiftMetrics.total.get(giftKey) ?? 0);
  }
}

function getAudienceQualifiedMetricValue(rule) {
  const metric = rule?.metric;
  if (!["follows", "likes", "shares", "coins", "specificGift", "subEmote", "fanEmote", "join", "firstActivity", "anyComment"].includes(metric)) {
    return 0;
  }

  if (metric === "specificGift") {
    return getSpecificGiftCount(rule);
  }

  if (metric === "subEmote" || metric === "fanEmote") {
    return getSpecificEmoteCount(rule);
  }

  const metricKey = metric === "anyComment" ? "comments" : metric;

  switch (rule?.triggerAudience) {
    case "follower": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.followedThisSession) {
          total += Number(state.sessionUserMetrics[metricKey].get(userId) ?? 0);
        }
      }
      return total;
    }
    case "subscriber": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.isSubscriber) {
          total += Number(state.sessionUserMetrics[metricKey].get(userId) ?? 0);
        }
      }
      return total;
    }
    case "moderator": {
      let total = 0;
      for (const [userId, profile] of state.sessionUserProfiles.entries()) {
        if (profile?.isModerator) {
          total += Number(state.sessionUserMetrics[metricKey].get(userId) ?? 0);
        }
      }
      return total;
    }
    case "topGifter": {
      const topGifterUserId = getTopGifterUserId();
      return topGifterUserId ? Number(state.sessionUserMetrics[metricKey].get(topGifterUserId) ?? 0) : 0;
    }
    case "specificUser": {
      const targetUser = normalizeUserKey(rule?.triggerUsername);
      return targetUser ? Number(state.sessionUserMetrics[metricKey].get(targetUser) ?? 0) : 0;
    }
    case "everyone":
    default:
      return Number(state.sessionMetrics[metricKey] ?? 0);
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
    cardCollapseState: collectCurrentCardCollapseState(),
    dashboardCardVisibility: collectCurrentDashboardCardVisibility(),
    mainScreenPinnedCards: collectCurrentMainScreenPinnedCards(),
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
    votingEnabled: Boolean(votingEnabledInput.checked),
    votingStartRole: String(votingStartRoleInput.value ?? "everyone").trim().toLowerCase(),
    votingOverlayOrientation: votingOverlayOrientationInput.value === "vertical" ? "vertical" : "horizontal",
    viewerStatsOverlayFilter: String(viewerStatsOverlayFilterInput?.value ?? "everyone").trim().toLowerCase(),
    viewerStatsOverlayUsername: String(viewerStatsOverlayUsernameInput?.value ?? "").trim().replace(/^@/, ""),
    ttsUserVoiceAssignments: normalizeTtsUserVoiceAssignments(merged.ttsUserVoiceAssignments),
    userNotes: normalizeUserNotes(merged.userNotes),
      knownTikTokGifts: normalizeKnownTikTokGifts(merged.knownTikTokGifts),
      knownTikTokEmotes: normalizeKnownTikTokEmotes(merged.knownTikTokEmotes),
      tiktokSessionId: String(merged.tiktokSessionId ?? "").trim(),
      tiktokTargetIdc: String(merged.tiktokTargetIdc ?? "").trim(),
      overlayDesignerTemplates: normalizeOverlayDesignerTemplates(merged.overlayDesignerTemplates),
      activeOverlayDesignerTemplateId: String(merged.activeOverlayDesignerTemplateId ?? getActiveOverlayDesignerTemplateId()).trim(),
      overlayDesignerAssignments: normalizeOverlayDesignerAssignments(merged.overlayDesignerAssignments),
      customEventRules: merged.customEventRules.map(normalizeRule).filter(Boolean)
    });
  }

function collectCurrentCardCollapseState() {
  const currentState = {
    ...normalizeCardCollapseState(state.settings?.cardCollapseState)
  };

  document.querySelectorAll(".card[data-card-collapse-key]").forEach((card) => {
    const key = String(card.dataset.cardCollapseKey ?? "").trim();
    if (!key) {
      return;
    }
    currentState[key] = card.classList.contains("card-collapsed");
  });

  return currentState;
}

function collectCurrentDashboardCardVisibility() {
  const currentVisibility = {
    ...normalizeDashboardCardVisibility(state.settings?.dashboardCardVisibility)
  };

  document.querySelectorAll("[data-dashboard-card]").forEach((card) => {
    const key = String(card.dataset.dashboardCard ?? "").trim();
    if (!key) {
      return;
    }
    currentVisibility[key] = !card.hidden;
  });

  return currentVisibility;
}

function collectCurrentMainScreenPinnedCards() {
  return normalizeMainScreenPinnedCards(state.settings?.mainScreenPinnedCards);
}

function getSettingsPayloadWithPartial(partial = {}) {
  const merged = {
    ...state.settings,
    ...partial
  };
  const {
    normalizedProfiles: settingsProfiles,
    activeSettingsProfileId
  } = resolveActiveProfileState(merged);
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
  const payload = getSettingsPayloadWithPartial(partial);
  state.settings = ensureSettingsShape(payload);

  const nextSave = app
    .saveSettings(payload)
    .then((saved) => {
      state.settings = ensureSettingsShape(saved);
      renderCustomRules();
      renderRememberedUsernameOptions();
      renderSettingsProfileOptions();
      updateHeaderPills();
      applyDashboardCardVisibility();
      applyMainScreenPinnedCards();
      applySavedCardCollapseState();
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
    applyDashboardCardVisibility();
    applyMainScreenPinnedCards();
    applySavedCardCollapseState();
      setAuthStatus("success", user ? `Signed in as ${user.displayName || user.email}.` : "Signed in.");
      setAuthSessionCheckStatus("checking", "Session check: Checking");
    clearHostedFeedOverlayState();
    void loadOverlayInfoBundle();
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
  void loadOverlayInfoBundle();
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
  clearHostedFeedOverlayState();
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
  clearHostedFeedOverlayState();
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
  clearHostedFeedOverlayState();
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
    clearHostedFeedOverlayState();
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
  const requestUrl = `${getAuthApiBaseUrl()}${path}`;
  try {
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
  } catch (error) {
    const message = String(error?.message || "").trim().toLowerCase();
    if (message === "failed to fetch" || message.includes("networkerror") || message.includes("load failed")) {
      throw new Error(`Unable to reach the Stream Sync Pro sign-in service at ${requestUrl}. Please check that the website/API is online and reachable.`);
    }
    throw error;
  }
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

function sanitizeStatusToastPayload(payload) {
  const level = payload?.level === "error" ? "error" : payload?.level === "success" ? "success" : "info";
  const message = String(payload?.message ?? "").trim();
  const lowerMessage = message.toLowerCase();

  if (!message) {
    return {
      level,
      message: "Connection status updated.",
      suppress: false
    };
  }

  if (
    lowerMessage.includes("failed to retrieve room info for live status from main page") ||
    lowerMessage.includes("falling back to api source")
  ) {
    return {
      level: "info",
      message: "TikTok is still resolving the live details. Please wait a moment.",
      suppress: true
    };
  }

  return {
    level,
    message,
    suppress: false
  };
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
  const optionsMarkup = [
    ...profileEntries.map(([profileId, profile]) => {
      const label = String(profile?.name ?? profileId).trim() || profileId;
      return `<option value="${escapeHtml(profileId)}">${escapeHtml(label)}</option>`;
    }),
    `<option value="${SETTINGS_PROFILE_ACTION_PREFIX}separator" disabled>──────────</option>`,
    `<option value="${SETTINGS_PROFILE_ACTION_PREFIX}create">Create new profile...</option>`,
    `<option value="${SETTINGS_PROFILE_ACTION_PREFIX}delete"${profileEntries.length <= 1 ? " disabled" : ""}>Delete current profile...</option>`,
    `<option value="${SETTINGS_PROFILE_ACTION_PREFIX}export">Export profiles...</option>`,
    `<option value="${SETTINGS_PROFILE_ACTION_PREFIX}import">Import profiles...</option>`
  ];

  settingsProfileSelect.innerHTML = optionsMarkup.join("");
  settingsProfileSelect.value = activeProfileId;
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

async function handleSettingsProfileSelection(value) {
  const selectedValue = String(value ?? "").trim();
  if (!selectedValue) {
    renderSettingsProfileOptions();
    return;
  }

  if (!selectedValue.startsWith(SETTINGS_PROFILE_ACTION_PREFIX)) {
    await switchSettingsProfile(selectedValue);
    return;
  }

  const action = selectedValue.slice(SETTINGS_PROFILE_ACTION_PREFIX.length);

  switch (action) {
    case "create":
      await createSettingsProfile();
      break;
    case "delete":
      await deleteSettingsProfile();
      break;
    case "export":
      await exportSettingsBundle();
      break;
    case "import":
      await importSettingsBundle();
      break;
    default:
      break;
  }

  renderSettingsProfileOptions();
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

function openLayoutCustomizerModal() {
  const visibilityState = normalizeDashboardCardVisibility(state.settings?.dashboardCardVisibility);
  const pinnedState = normalizeMainScreenPinnedCards(state.settings?.mainScreenPinnedCards);
  layoutShowWelcomeInput.checked = visibilityState.welcome !== false;
  layoutShowIncomingChatInput.checked = visibilityState["incoming-chat"] !== false;
  if (layoutMainCardOptions) {
    layoutMainCardOptions.innerHTML = MAIN_SCREEN_CARD_DEFINITIONS.map(({ key, label }) => `
      <label class="filter-tile">
        <input type="checkbox" data-layout-main-card-option="${key}" ${pinnedState[key] ? "checked" : ""} />
        <span>${label}</span>
      </label>
    `).join("");
  }
  layoutCustomizerModal.hidden = false;
}

function closeLayoutCustomizerModal() {
  if (!layoutCustomizerModal) {
    return;
  }

  layoutCustomizerModal.hidden = true;
}

async function saveDashboardLayoutVisibility() {
  const nextVisibility = normalizeDashboardCardVisibility({
    welcome: layoutShowWelcomeInput.checked,
    "incoming-chat": layoutShowIncomingChatInput.checked
  });
  const nextPinnedCards = normalizeMainScreenPinnedCards(
    Object.fromEntries(
      Array.from(layoutMainCardOptions?.querySelectorAll("[data-layout-main-card-option]") ?? []).map((input) => [
        String(input.dataset.layoutMainCardOption ?? "").trim(),
        Boolean(input.checked)
      ])
    )
  );

  state.settings = ensureSettingsShape({
    ...state.settings,
    dashboardCardVisibility: nextVisibility,
    mainScreenPinnedCards: nextPinnedCards
  });
  applyDashboardCardVisibility();
  applyMainScreenPinnedCards();
  closeLayoutCustomizerModal();
  await persistSettings({
    dashboardCardVisibility: nextVisibility,
    mainScreenPinnedCards: nextPinnedCards,
    cardCollapseState: collectCurrentCardCollapseState()
  });
  showToast("Dashboard layout saved.", "success");
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

function normalizeSidebarTabName(tabName) {
  if (tabName === "event-actions") {
    return "event-actions";
  }

  return "controls";
}

function setActiveTab(tabName) {
  const normalizedTabName = normalizeSidebarTabName(tabName);
  state.activeTab = normalizedTabName;

  const controlsActive = normalizedTabName === "controls";
  const eventActionsActive = normalizedTabName === "event-actions";

  controlsTabButton?.classList.toggle("active", controlsActive);
  overlaysTabButton?.classList.toggle("active", false);
  eventActionsTabButton?.classList.toggle("active", eventActionsActive);
  controlsTabPanel?.classList.toggle("active", controlsActive);
  overlaysTabPanel?.classList.toggle("active", false);
  eventActionsTabPanel?.classList.toggle("active", eventActionsActive);
}

function updateCardCollapseButton(button, collapsed) {
  if (!button) {
    return;
  }

  button.textContent = collapsed ? "+" : "−";
  button.setAttribute("aria-label", collapsed ? "Expand card" : "Minimize card");
  button.setAttribute("title", collapsed ? "Expand" : "Minimize");
  button.setAttribute("aria-expanded", collapsed ? "false" : "true");
}

function getCardCollapseStorageKey(card, index = 0) {
  const explicitKey = String(card?.dataset?.cardCollapseKey ?? "").trim();
  if (explicitKey) {
    return explicitKey;
  }

  const header = card?.querySelector(":scope > .card-header");
  const titleText = header?.querySelector("h1, h2, h3, .section-title")?.textContent ?? "";
  const eyebrowText = header?.querySelector(".eyebrow")?.textContent ?? "";
  const panelId = card?.closest(".sidebar-tab-panel")?.id ?? "dashboard";

  return `${panelId}:${eyebrowText}:${titleText}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `card-${index + 1}`;
}

function applySavedCardCollapseState() {
  const savedState = normalizeCardCollapseState(state.settings?.cardCollapseState);
  document.querySelectorAll(".card[data-card-collapse-key]").forEach((card) => {
    const key = card.dataset.cardCollapseKey;
    const collapsed = Boolean(savedState[key]);
    card.classList.toggle("card-collapsed", collapsed);
    updateCardCollapseButton(card.querySelector("[data-card-minimize-button]"), collapsed);
  });
}

function applyDashboardCardVisibility() {
  const visibilityState = normalizeDashboardCardVisibility(state.settings?.dashboardCardVisibility);
  document.querySelectorAll("[data-dashboard-card]").forEach((card) => {
    const key = String(card.dataset.dashboardCard ?? "").trim();
    if (!key) {
      return;
    }
    card.hidden = visibilityState[key] === false;
  });
}

function applyMainScreenPinnedCards() {
  if (!dashboardAddonCards) {
    return;
  }

  const pinnedState = normalizeMainScreenPinnedCards(state.settings?.mainScreenPinnedCards);
  let visiblePinnedCards = 0;

  MAIN_SCREEN_CARD_DEFINITIONS.forEach(({ key }) => {
    const card = document.querySelector(`[data-main-screen-card="${key}"]`);
    if (!card) {
      return;
    }

    let placeholder = document.querySelector(`[data-main-screen-placeholder="${key}"]`);
    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.hidden = true;
      placeholder.dataset.mainScreenPlaceholder = key;
      card.before(placeholder);
    }

    if (pinnedState[key]) {
      visiblePinnedCards += 1;
      dashboardAddonCards.appendChild(card);
      card.dataset.mainScreenPinned = "true";
    } else {
      placeholder.after(card);
      delete card.dataset.mainScreenPinned;
    }
  });

  dashboardAddonCards.hidden = visiblePinnedCards === 0;
}

function initializeCollapsibleCards() {
  const headers = document.querySelectorAll(".card > .card-header.section-head, .card > .card-header.panel-heading");

  headers.forEach((header, index) => {
    const card = header.closest(".card");
    const body = card?.querySelector(":scope > .card-body");
    if (!card || !body) {
      return;
    }

    if (header.querySelector("[data-card-minimize-button]")) {
      return;
    }

    const cardKey = getCardCollapseStorageKey(card, index);
    card.dataset.cardCollapseKey = cardKey;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost compact-button card-minimize-button";
    button.dataset.cardMinimizeButton = cardKey;
    const initialCollapsed = Boolean(normalizeCardCollapseState(state.settings?.cardCollapseState)[cardKey]);
    card.classList.toggle("card-collapsed", initialCollapsed);
    updateCardCollapseButton(button, initialCollapsed);
    button.addEventListener("click", () => {
      const collapsed = card.classList.toggle("card-collapsed");
      updateCardCollapseButton(button, collapsed);
      void persistSettings({
        cardCollapseState: {
          ...normalizeCardCollapseState(state.settings?.cardCollapseState),
          [cardKey]: collapsed
        }
      }).catch(() => {});
    });
    header.appendChild(button);
  });
}

function getSidebarLayerTitle(tabName) {
  switch (normalizeSidebarTabName(tabName)) {
    case "event-actions":
      return "Event Actions";
    case "controls":
    default:
      return "Stream Controls";
  }
}

function openSidebarLayer(tabName = "controls", options = {}) {
  const normalizedTabName = normalizeSidebarTabName(tabName);
  setActiveTab(normalizedTabName);
  if (sidebarLayer) {
    sidebarLayer.classList.toggle("sidebar-layer-single-view", Boolean(options?.singleView));
    sidebarLayer.hidden = false;
    if (sidebarLayerTitle) {
      sidebarLayerTitle.textContent = options?.title || getSidebarLayerTitle(normalizedTabName);
    }
    document.body.classList.add("sidebar-layer-open");
  }
}

function closeSidebarLayer() {
  if (sidebarLayer) {
    sidebarLayer.classList.remove("sidebar-layer-single-view");
    sidebarLayer.hidden = true;
    if (sidebarLayerTitle) {
      sidebarLayerTitle.textContent = "Stream Controls";
    }
    document.body.classList.remove("sidebar-layer-open");
  }
}

function openFocusedEventActionsLayer() {
  openSidebarLayer("event-actions", {
    singleView: true,
    title: "Event Actions"
  });
}

function openFocusedControlsLayer() {
  openSidebarLayer("controls", {
    singleView: true,
    title: "Stream Controls"
  });
}

function isMainScreenEventActionsPinned() {
  const card = document.querySelector('[data-main-screen-card="event-actions-main"]');
  return Boolean(card && card.dataset.mainScreenPinned === "true" && !card.hidden);
}

function openEventActionsWorkspace(options = {}) {
  const preferInline = Boolean(options?.preferInline);
  const sidebarAlreadyOpen = Boolean(sidebarLayer && !sidebarLayer.hidden);

  if (preferInline && isMainScreenEventActionsPinned() && !sidebarAlreadyOpen) {
    const card = document.querySelector('[data-main-screen-card="event-actions-main"]');
    closeSidebarLayer();
    card?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    return "inline";
  }

  openFocusedEventActionsLayer();
  return "overlay";
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
      const hasSavedViewerDetails = hasUserNoteRecord(userKey);
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
                title="${hasSavedViewerDetails ? escapeHtml(`Edit note for @${userKey}`) : escapeHtml(`Add note for @${userKey}`)}"
              >
                <strong>${escapeHtml(item.nickname || item.user || "Unknown user")}</strong>
                <span class="chat-handle">@${escapeHtml(item.user || "unknown")}</span>
                ${likeTotal > 0 ? `<span class="chat-like-pill">${escapeHtml(String(likeTotal))} likes</span>` : ""}
                ${hasSavedViewerDetails ? `<span class="chat-note-pill">Viewer details saved</span>` : ""}
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
  const viewerCount = Number(state.statState.viewerCount);
  statViewers.textContent = Number.isFinite(viewerCount) && viewerCount >= 0
    ? String(Math.trunc(viewerCount))
    : "--";
  statGifts.textContent = String(state.statState.gifts);
  statFollowers.textContent = String(state.statState.followers);
  updateQueueIndicators();
  updateMessagesPerMinute();
  syncOverlayDesignerRuntimeState();
}

function closeChatNotesPanel() {
  state.activeChatNoteUser = "";
  chatNotesPanel.hidden = true;
  chatNotesInput.value = "";
  if (chatNotesBirthdayInput) {
    chatNotesBirthdayInput.value = "";
  }
  if (chatNotesBirthdayActionSelect) {
    chatNotesBirthdayActionSelect.value = "";
  }
}

function openChatNotesPanel(userKey, userLabel = "") {
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return;
  }

  state.activeChatNoteUser = normalizedUser;
  chatNotesTitle.textContent = userLabel ? `Notes for ${userLabel} (@${normalizedUser})` : `Notes for @${normalizedUser}`;
  const noteRecord = getUserNoteRecord(normalizedUser);
  chatNotesInput.value = noteRecord.note;
  if (chatNotesBirthdayInput) {
    chatNotesBirthdayInput.value = noteRecord.birthday;
  }
  renderChatNotesBirthdayActionOptions(noteRecord.birthdayActionRuleId);
  if (chatNotesBirthdayActionSelect) {
    chatNotesBirthdayActionSelect.value = noteRecord.birthdayActionRuleId;
  }
  chatNotesDeleteButton.disabled = !hasUserNoteRecord(normalizedUser);
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
    [userKey]: {
      note: chatNotesInput.value.trim(),
      birthday: /^\d{4}-\d{2}-\d{2}$/.test(String(chatNotesBirthdayInput?.value ?? "").trim())
        ? String(chatNotesBirthdayInput.value).trim()
        : "",
      birthdayActionRuleId: String(chatNotesBirthdayActionSelect?.value ?? "").trim()
    }
  };

  if (!nextNotes[userKey].note && !nextNotes[userKey].birthday && !nextNotes[userKey].birthdayActionRuleId) {
    delete nextNotes[userKey];
  }

  await persistSettings({ userNotes: nextNotes });
  chatNotesDeleteButton.disabled = !hasUserNoteRecord(userKey);
  renderChatList();
  showToast(hasUserNoteRecord(userKey) ? `Saved note for @${userKey}.` : `Cleared note for @${userKey}.`, "success");
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
    join: 0,
    firstActivity: 0,
    follows: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    coins: 0,
    subEmote: 0,
    fanEmote: 0
  };
  state.sessionUserMetrics = {
    join: new Map(),
    firstActivity: new Map(),
    follows: new Map(),
    likes: new Map(),
    comments: new Map(),
    shares: new Map(),
    coins: new Map(),
    subEmote: new Map(),
    fanEmote: new Map()
  };
  state.sessionGiftMetrics = {
    total: new Map(),
    byUser: new Map()
  };
  state.sessionEmoteMetrics = {
    subEmote: {
      total: new Map(),
      byUser: new Map()
    },
    fanEmote: {
      total: new Map(),
      byUser: new Map()
    }
  };
  state.sessionUserProfiles = new Map();
  state.triggeredCustomRuleIds = new Set();
  state.customRuleTriggerCounts = new Map();
  state.customRuleUserCooldowns = new Map();
  state.birthdayActionTriggers = new Set();
  state.statState = {
      viewerCount: null,
      gifts: 0,
      followers: 0,
      chatTimestamps: []
    };
  updateStats();
}

function getKnownGiftOptionsMarkup(ruleId, selectedGiftName = "", searchText = "") {
  const selectedGiftKey = normalizeGiftKey(selectedGiftName);
  const normalizedSearch = String(searchText ?? "").trim().toLowerCase();
  const gifts = getKnownTikTokGifts().filter((gift) =>
    !normalizedSearch || gift.giftName.toLowerCase().includes(normalizedSearch)
  );

  if (!gifts.length) {
    return `
      <div class="gift-trigger-empty">${normalizedSearch ? "No gifts match that search." : "No gifts are available yet."}</div>
    `;
  }

  return gifts.map((gift) => {
    const isSelected = normalizeGiftKey(gift.giftName) === selectedGiftKey;
    const trustedImageUrl = String(gift.giftImageUrl ?? "").trim();
    const iconMarkup = trustedImageUrl
      ? `<img src="${escapeHtml(trustedImageUrl)}" alt="" class="gift-trigger-option-icon" />`
      : "";
    const coinLabel = getGiftCoinValueDisplay(gift.coinValue, gift.source);

    return `
      <button
        type="button"
        class="gift-trigger-option${isSelected ? " selected" : ""}"
        data-rule-gift-option="${escapeHtml(ruleId)}"
        data-gift-name="${escapeHtml(gift.giftName)}"
        data-gift-image-url="${escapeHtml(trustedImageUrl)}"
        data-gift-coin-value="${escapeHtml(String(gift.coinValue || 0))}"
      >
        ${iconMarkup}
        <span>${escapeHtml(`${gift.giftName}${coinLabel ? ` (${coinLabel})` : ""}`)}</span>
      </button>
    `;
    }).join("");
}

function getSelectedGiftPreviewMarkup(rule) {
  if (!rule?.triggerGiftName) {
    return `<span class="gift-trigger-selected-empty">Select a gift from the list below.</span>`;
  }

  const knownGift = getKnownGiftMetadata(rule.triggerGiftName);
  const resolvedImageUrl = String(knownGift?.giftImageUrl ?? "").trim();
  const coinLabel = getGiftCoinValueDisplay(
    knownGift?.coinValue ?? rule?.triggerGiftCoinValue ?? 0,
    knownGift?.source ?? "builtin"
  );
  const iconMarkup = resolvedImageUrl
    ? `<img src="${escapeHtml(resolvedImageUrl)}" alt="" class="gift-trigger-selected-icon" />`
    : "";

  return `
    <span class="gift-trigger-selected">
      ${iconMarkup}
      <span>${escapeHtml(`${rule.triggerGiftName}${coinLabel ? ` (${coinLabel})` : ""}`)}</span>
    </span>
  `;
}

function getGiftSelectorSummaryMarkup(rule) {
  return `
    <span class="gift-trigger-summary-copy">
      <span class="gift-trigger-summary-label">Gift trigger</span>
      ${getSelectedGiftPreviewMarkup(rule)}
    </span>
    <span class="gift-trigger-summary-caret" aria-hidden="true">&#9662;</span>
  `;
}

async function ensureSoundCatalog() {
  if (state.soundCatalogLoaded) {
    return;
  }

  try {
    const catalog = await app.getSoundAlertCatalog(false);
    mergeSoundCatalog(catalog);
    state.soundCatalogLoaded = true;
    state.soundCatalogError = "";
    renderCustomRules();
  } catch (error) {
    state.soundCatalogError = error.message || "Unable to load the sound library.";
    setStatusMessage(customRuleStatus, "error", state.soundCatalogError);
    showToast(state.soundCatalogError, "error");
  }
}

function mergeSoundCatalog(catalog) {
  if (!Array.isArray(catalog)) {
    return;
  }

  for (const sound of catalog) {
    const id = String(sound?.id ?? "").trim();
    const title = String(sound?.title ?? "").trim();
    if (!id || !title || state.soundCatalogById.has(id)) {
      continue;
    }

    const normalizedSound = {
      ...sound,
      id,
      title
    };
    state.soundCatalog.push(normalizedSound);
    state.soundCatalogById.set(id, normalizedSound);
  }
}

async function ensureSoundCatalogSearch(searchText) {
  const normalizedSearch = String(searchText ?? "").trim().toLowerCase();
  if (normalizedSearch.length < 2 || state.soundCatalogSearches.has(normalizedSearch)) {
    return;
  }

  const catalog = await app.getSoundAlertCatalog({ search: normalizedSearch });
  mergeSoundCatalog(catalog);
  state.soundCatalogSearches.add(normalizedSearch);
}

function getSoundOptionList(search = "", selectedSoundId = "") {
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = normalizedSearch
    ? state.soundCatalog.filter((sound) => sound.title.toLowerCase().includes(normalizedSearch))
    : state.soundCatalog;

  const selectedSound = selectedSoundId ? state.soundCatalogById.get(selectedSoundId) : null;
  const limited = normalizedSearch ? filtered : filtered.slice(0, SEARCH_PREVIEW_LIMIT);

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
  const cooldownInput = document.querySelector(`[data-rule-user-cooldown="${ruleId}"]`);
  const enabledToggle = document.querySelector(`[data-rule-enabled-toggle="${ruleId}"]`)
    || document.querySelector(`[data-custom-toggle="${ruleId}"]`);
  const soundSelect = document.querySelector(`[data-rule-sound-select="${ruleId}"]`);
  const queueSelect = document.querySelector(`[data-rule-queue="${ruleId}"]`);
  const webhookUrlInput = document.querySelector(`[data-rule-webhook-url="${ruleId}"]`);
  const feedbackOverlayEnabledInput = document.querySelector(`[data-rule-feedback-overlay-enabled="${ruleId}"]`);
  const feedbackOverlayTitleInput = document.querySelector(`[data-rule-feedback-overlay-title="${ruleId}"]`);
  const feedbackOverlayMessageInput = document.querySelector(`[data-rule-feedback-overlay-message="${ruleId}"]`);
  const feedbackOverlayAccentColorInput = document.querySelector(`[data-rule-feedback-overlay-accent="${ruleId}"]`);
  const triggerAudienceInput = document.querySelector(`input[data-rule-trigger-audience="${ruleId}"]:checked`);
  const triggerUsernameInput = document.querySelector(`[data-rule-trigger-username="${ruleId}"]`);
  const triggerGiftNameInput = document.querySelector(`[data-rule-gift-name="${ruleId}"]`);
  const triggerGiftImageUrlInput = document.querySelector(`[data-rule-gift-image-url="${ruleId}"]`);

  return normalizeRule({
    ...rule,
    name: nameInput?.value ?? rule.name,
    metric: metricInput?.value ?? rule.metric,
    threshold: Number(thresholdInput?.value ?? rule.threshold),
    userCooldownSeconds: Math.max(0, Number(cooldownInput?.value ?? rule.userCooldownSeconds) || 0),
    enabled: enabledToggle?.checked ?? rule.enabled,
    queueId: normalizeQueueId(queueSelect?.value ?? rule.queueId, 1),
    soundId: soundSelect?.value ?? rule.soundId,
    webhookUrl: webhookUrlInput?.value?.trim() ?? rule.webhookUrl,
    feedbackOverlayEnabled: feedbackOverlayEnabledInput?.checked ?? rule.feedbackOverlayEnabled,
    feedbackOverlayTitle: feedbackOverlayTitleInput?.value?.trim() ?? rule.feedbackOverlayTitle,
    feedbackOverlayMessage: feedbackOverlayMessageInput?.value?.trim() ?? rule.feedbackOverlayMessage,
    feedbackOverlayAccentColor: normalizeOverlayAccentColor(feedbackOverlayAccentColorInput?.value ?? rule.feedbackOverlayAccentColor),
    triggerAudience: triggerAudienceInput?.value ?? rule.triggerAudience,
    triggerUsername: normalizeUserKey(triggerUsernameInput?.value ?? rule.triggerUsername),
    triggerEmoteName: String(document.querySelector(`[data-rule-emote-name-input="${ruleId}"]`)?.value ?? rule.triggerEmoteName ?? "").trim(),
    triggerGiftName: String(triggerGiftNameInput?.value ?? rule.triggerGiftName ?? "").trim(),
    triggerGiftImageUrl: String(triggerGiftImageUrlInput?.value ?? rule.triggerGiftImageUrl ?? "").trim()
    });
  }

function getCustomRuleSearchHaystack(rule) {
  return [
    rule.name,
    getMetricDisplayLabel(rule.metric),
    rule.metric,
    getTriggerAudienceLabel(rule),
    rule.triggerAudience,
    rule.triggerUsername ? `@${rule.triggerUsername}` : "",
    rule.triggerEmoteId,
    rule.triggerEmoteName,
    rule.triggerGiftName,
    getMetricThresholdLabel(rule.metric),
    rule.userCooldownSeconds ? `${rule.userCooldownSeconds} second cooldown` : "",
    rule.userCooldownSeconds ? `cooldown ${rule.userCooldownSeconds}s` : ""
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function resolveCustomRuleSearchCriteria(searchText = "") {
  const normalized = String(searchText ?? "").trim().toLowerCase();
  if (!normalized) {
    return {
      audience: "",
      trigger: ""
    };
  }

  const audienceAliases = new Map([
    ["everyone", "everyone"],
    ["all", "everyone"],
    ["follower", "follower"],
    ["followers", "follower"],
    ["subscriber", "subscriber"],
    ["subscribers", "subscriber"],
    ["moderator", "moderator"],
    ["moderators", "moderator"],
    ["mod", "moderator"],
    ["mods", "moderator"],
    ["top gifter", "topGifter"],
    ["topgifter", "topGifter"],
    ["top gifter", "topGifter"],
    ["specific user", "specificUser"],
    ["user", "specificUser"]
  ]);

  const triggerAliases = new Map([
    ["follow", "follows"],
    ["follows", "follows"],
    ["like", "likes"],
    ["likes", "likes"],
    ["tap", "likes"],
    ["taps", "likes"],
    ["join", "join"],
    ["joins", "join"],
    ["first activity", "firstActivity"],
    ["first user activity", "firstActivity"],
    ["comment", "anyComment"],
    ["comments", "anyComment"],
    ["any comment", "anyComment"],
    ["share", "shares"],
    ["shares", "shares"],
    ["coin", "coins"],
    ["coins", "coins"],
    ["gift coin", "coins"],
    ["gift coins", "coins"],
    ["gift value", "coins"],
    ["specific gift", "specificGift"],
    ["sub emote", "subEmote"],
    ["sub emotes", "subEmote"],
    ["fan emote", "fanEmote"],
    ["fan emotes", "fanEmote"]
  ]);

  return {
    audience: audienceAliases.get(normalized) ?? "",
    trigger: triggerAliases.get(normalized) ?? ""
  };
}

function getFilteredCustomRules(rules = []) {
  const searchText = String(state.customRuleSearchText ?? "").trim().toLowerCase();
  const audienceFilter = String(state.customRuleAudienceFilter ?? "all").trim() || "all";
  const triggerFilter = String(state.customRuleTriggerFilter ?? "all").trim() || "all";
  const criteriaSearch = resolveCustomRuleSearchCriteria(searchText);

  return rules.filter((rule) => {
    const effectiveRule = state.activeCustomRuleId === rule.id
      ? (getEffectiveCustomRule(rule.id) ?? rule)
      : rule;

    if (audienceFilter !== "all" && String(effectiveRule.triggerAudience ?? "") !== audienceFilter) {
      return false;
    }

    if (triggerFilter !== "all" && String(effectiveRule.metric ?? "") !== triggerFilter) {
      return false;
    }

    if (!searchText) {
      return true;
    }

    if (criteriaSearch.audience && String(effectiveRule.triggerAudience ?? "") !== criteriaSearch.audience) {
      return false;
    }

    if (criteriaSearch.trigger && String(effectiveRule.metric ?? "") !== criteriaSearch.trigger) {
      return false;
    }

    if (criteriaSearch.audience || criteriaSearch.trigger) {
      return true;
    }

    return getCustomRuleSearchHaystack(effectiveRule).includes(searchText);
  });
}

async function previewCustomRuleAction(ruleId) {
  const rule = getEffectiveCustomRule(ruleId);
  const searchInput = document.querySelector(`[data-rule-sound-search="${ruleId}"]`);
  const webhookUrlInput = document.querySelector(`[data-rule-webhook-url="${ruleId}"]`);

  if (!rule) {
    return;
  }

  if (!rule.soundId && !rule.webhookUrl && !hasCustomActionFeedbackOverlay(rule)) {
    showToast("Choose a sound, enter a webhook URL, or enable a feedback overlay to test this action.", "info");
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
  const { testMode = false, sourceItem = null } = options;
  const hasFeedbackOverlay = hasCustomActionFeedbackOverlay(rule);
  if (!rule?.soundId && !rule?.webhookUrl && !hasFeedbackOverlay) {
    return;
  }

  if (hasFeedbackOverlay) {
    showCustomActionFeedbackOverlay(rule, sourceItem);
  }

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
                userCooldownSeconds: Math.max(0, Number(rule.userCooldownSeconds) || 0),
                triggeredAt: new Date().toISOString(),
                testMode,
                sourceUser: sourceItem?.user ?? "",
                sourceNickname: sourceItem?.nickname ?? ""
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
  const filteredRules = getFilteredCustomRules(rules);

  if (customRuleSearchInput) {
    customRuleSearchInput.value = state.customRuleSearchText ?? "";
  }
  if (customRuleAudienceFilterInput) {
    customRuleAudienceFilterInput.value = state.customRuleAudienceFilter ?? "all";
  }
  if (customRuleTriggerFilterInput) {
    customRuleTriggerFilterInput.value = state.customRuleTriggerFilter ?? "all";
  }

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

  if (!filteredRules.length) {
    customRuleList.innerHTML = "";
    setStatusMessage(customRuleStatus, "info", `No event actions match the current filters. Showing 0 of ${rules.length}.`);
    return;
  }

  const cards = filteredRules.map((rule) => {
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
        hasCustomActionFeedbackOverlay(rule) ? "feedback overlay" : "",
        getQueueLabel(rule.queueId),
        rule.userCooldownSeconds > 0 ? `user cooldown ${rule.userCooldownSeconds}s` : ""
      ].filter(Boolean).join(" and ");
      const triggerSummary = rule.metric === "specificGift"
        ? `Trigger when ${escapeHtml(rule.triggerGiftName || "a selected gift")} reaches ${escapeHtml(String(rule.threshold))} for ${escapeHtml(getTriggerAudienceLabel(rule))}`
        : rule.metric === "subEmote" || rule.metric === "fanEmote"
          ? `Trigger when ${escapeHtml(rule.triggerEmoteName || getMetricDisplayLabel(rule.metric))} reaches ${escapeHtml(String(rule.threshold))} for ${escapeHtml(getTriggerAudienceLabel(rule))}`
          : `Trigger when ${escapeHtml(getMetricDisplayLabel(rule.metric))} reaches ${escapeHtml(String(rule.threshold))} for ${escapeHtml(getTriggerAudienceLabel(rule))}`;
      return `
        <article class="custom-rule-card custom-rule-card-compact" data-rule-id="${escapeHtml(rule.id)}">
          <div class="custom-rule-compact-summary">
            <strong>${escapeHtml(rule.name)}</strong>
            <span class="helper-text custom-rule-inline-text">${triggerSummary}${actionSummary ? ` with ${escapeHtml(actionSummary)}.` : "."}</span>
          </div>
          <div class="custom-rule-top-actions">
            <label class="toggle-switch compact-switch custom-inline-toggle" title="Enable or disable this rule">
              <input type="checkbox" data-custom-toggle="${escapeHtml(rule.id)}" ${rule.enabled ? "checked" : ""} />
              <span class="switch-ui"></span>
              <span class="sr-only">${rule.enabled ? "Disable" : "Enable"} ${escapeHtml(rule.name)}</span>
            </label>
            <span class="status-pill ${rule.enabled ? "success" : "muted"}">${rule.enabled ? "Enabled" : "Disabled"}</span>
            <div class="custom-rule-actions custom-rule-actions-compact">
              <button type="button" class="ghost icon-button compact-icon-button" data-custom-edit="${escapeHtml(rule.id)}" title="Edit rule" aria-label="Edit rule">&#9998;</button>
              <button type="button" class="ghost icon-button compact-icon-button" data-custom-duplicate="${escapeHtml(rule.id)}" title="Duplicate rule" aria-label="Duplicate rule">&#10697;</button>
              <button type="button" class="ghost icon-button compact-icon-button" data-custom-preview="${escapeHtml(rule.id)}" title="Test action" aria-label="Test action">&#9654;</button>
              <button type="button" class="ghost icon-button compact-icon-button danger-icon-button" data-custom-delete="${escapeHtml(rule.id)}" title="Delete rule" aria-label="Delete rule">&#128465;</button>
            </div>
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
            <div class="custom-rule-top-actions">
              <label class="toggle-switch compact-switch custom-inline-toggle" title="Enable or disable this rule">
                <input type="checkbox" data-rule-enabled-toggle="${escapeHtml(rule.id)}" ${rule.enabled ? "checked" : ""} />
                <span class="switch-ui"></span>
                <span class="sr-only">${rule.enabled ? "Disable" : "Enable"} ${escapeHtml(rule.name)}</span>
              </label>
              <span class="status-pill ${rule.enabled ? "success" : "muted"}">${rule.enabled ? "Enabled" : "Disabled"}</span>
              <button type="button" class="ghost icon-button" data-custom-collapse="${escapeHtml(rule.id)}" title="Close editor" aria-label="Close editor">&#10005;</button>
            </div>
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
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="join" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "join" ? "checked" : ""} />
                  <span>Join</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="firstActivity" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "firstActivity" ? "checked" : ""} />
                  <span>First user activity</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="anyComment" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "anyComment" ? "checked" : ""} />
                  <span>Any comment</span>
                </label>
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
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="specificGift" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "specificGift" ? "checked" : ""} />
                  <span>Sending a specific gift</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="subEmote" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "subEmote" ? "checked" : ""} />
                  <span>Sub emote</span>
                </label>
                <label class="trigger-audience-option">
                  <input type="radio" name="trigger-metric-${escapeHtml(rule.id)}" value="fanEmote" data-rule-metric="${escapeHtml(rule.id)}" ${rule.metric === "fanEmote" ? "checked" : ""} />
                  <span>Fan emote</span>
                </label>
              </div>
              <div class="gift-trigger-picker ${rule.metric === "specificGift" ? "" : "is-hidden"}" data-rule-gift-picker-wrapper="${escapeHtml(rule.id)}">
                <input type="hidden" data-rule-gift-name="${escapeHtml(rule.id)}" value="${escapeHtml(rule.triggerGiftName || "")}" />
                <input type="hidden" data-rule-gift-image-url="${escapeHtml(rule.id)}" value="${escapeHtml(rule.triggerGiftImageUrl || "")}" />
                <label class="field">
                  <span>Select gift trigger</span>
                  <details class="gift-trigger-dropdown" data-rule-gift-dropdown="${escapeHtml(rule.id)}">
                    <summary class="gift-trigger-selected-card" data-rule-gift-selected="${escapeHtml(rule.id)}">
                      ${getGiftSelectorSummaryMarkup(rule)}
                    </summary>
                    <div class="gift-trigger-toolbar">
                        <button
                          type="button"
                          class="ghost compact-button"
                          data-rule-gift-refresh="${escapeHtml(rule.id)}"
                        >
                        Refresh from TikTok LIVE
                      </button>
                    </div>
                    <label class="field gift-trigger-search-field">
                      <span>Filter gifts</span>
                      <input
                        type="search"
                        data-rule-gift-search="${escapeHtml(rule.id)}"
                        placeholder="Search gift name"
                        autocomplete="off"
                      />
                      <small class="field-hint" data-rule-gift-status="${escapeHtml(rule.id)}">Showing the built-in gift catalog plus any learned TikTok gift data. Enter a username that is live and click Refresh from TikTok LIVE to enrich it with trusted artwork and room-specific gifts.</small>
                    </label>
                    <div class="gift-trigger-options-list" data-rule-gift-options="${escapeHtml(rule.id)}">
                      ${getKnownGiftOptionsMarkup(rule.id, rule.triggerGiftName)}
                    </div>
                  </details>
                </label>
              </div>
              <div class="gift-trigger-picker ${["subEmote", "fanEmote"].includes(rule.metric) ? "" : "is-hidden"}" data-rule-emote-picker-wrapper="${escapeHtml(rule.id)}">
                <input type="hidden" data-rule-emote-id-input="${escapeHtml(rule.id)}" value="${escapeHtml(rule.triggerEmoteId || "")}" />
                <input type="hidden" data-rule-emote-name-input="${escapeHtml(rule.id)}" value="${escapeHtml(rule.triggerEmoteName || "")}" />
                <input type="hidden" data-rule-emote-image-url-input="${escapeHtml(rule.id)}" value="${escapeHtml(rule.triggerEmoteImageUrl || "")}" />
                <label class="field">
                  <span>Select ${rule.metric === "fanEmote" ? "fan" : "sub"} emote trigger</span>
                  <details class="gift-trigger-dropdown" data-rule-emote-dropdown="${escapeHtml(rule.id)}">
                    <summary class="gift-trigger-selected-card" data-rule-emote-selected="${escapeHtml(rule.id)}">
                      ${getEmoteSelectorSummaryMarkup(rule)}
                    </summary>
                    <label class="field gift-trigger-search-field">
                      <span>Filter emotes</span>
                      <input
                        type="search"
                        data-rule-emote-search="${escapeHtml(rule.id)}"
                        placeholder="Search emote name"
                        autocomplete="off"
                      />
                    </label>
                    <div class="gift-trigger-options-list" data-rule-emote-options="${escapeHtml(rule.id)}">
                      ${getEmoteOptionsMarkup(rule.id, rule.metric, rule.triggerEmoteName)}
                    </div>
                  </details>
                </label>
              </div>
              <label class="field" data-rule-threshold-wrapper="${escapeHtml(rule.id)}">
                <span data-rule-threshold-label="${escapeHtml(rule.id)}">${escapeHtml(getMetricThresholdLabel(rule.metric))}</span>
                <input data-rule-threshold="${escapeHtml(rule.id)}" type="number" min="1" step="1" value="${escapeHtml(String(rule.threshold))}" />
              </label>
              <label class="field">
                <span>User cooldown (seconds)</span>
                <input data-rule-user-cooldown="${escapeHtml(rule.id)}" type="number" min="0" step="1" value="${escapeHtml(String(Math.max(0, Number(rule.userCooldownSeconds) || 0)))}" />
                <small class="field-hint">Prevents the same user from triggering this rule again until the cooldown expires.</small>
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

            <fieldset class="field field-span-2 event-builder-group">
              <div class="event-builder-label">
                <span>Viewer feedback overlay</span>
              </div>
              <div class="event-builder-options">
                <label class="toggle-switch">
                  <input type="checkbox" data-rule-feedback-overlay-enabled="${escapeHtml(rule.id)}" ${rule.feedbackOverlayEnabled ? "checked" : ""} />
                  <span class="switch-ui"></span>
                  <span class="switch-copy">Show a custom overlay message for the user who triggered this action</span>
                </label>
                <div class="field-grid ${rule.feedbackOverlayEnabled ? "" : "is-hidden"}" data-rule-feedback-overlay-fields="${escapeHtml(rule.id)}">
                  <label class="field">
                    <span>Overlay title</span>
                    <input
                      data-rule-feedback-overlay-title="${escapeHtml(rule.id)}"
                      type="text"
                      value="${escapeHtml(rule.feedbackOverlayTitle || "Viewer Feedback")}"
                      placeholder="Viewer Feedback"
                      autocomplete="off"
                    />
                  </label>
                  <label class="field">
                    <span>Accent color</span>
                    <input data-rule-feedback-overlay-accent="${escapeHtml(rule.id)}" type="color" value="${escapeHtml(normalizeOverlayAccentColor(rule.feedbackOverlayAccentColor))}" />
                  </label>
                  <label class="field field-span-2">
                    <span>Overlay message</span>
                    <textarea
                      data-rule-feedback-overlay-message="${escapeHtml(rule.id)}"
                      rows="3"
                      placeholder="{username} sent {gift sent}. Cool down time: {Cool down time}"
                    >${escapeHtml(rule.feedbackOverlayMessage || "")}</textarea>
                    <small class="field-hint">Available tokens: <code>{username}</code>, <code>{gift sent}</code>, <code>{Cool down time}</code>, <code>{rule name}</code></small>
                  </label>
                </div>
              </div>
            </fieldset>
        </div>

        <div class="custom-rule-actions">
          <button type="button" class="ghost icon-button" data-custom-duplicate="${escapeHtml(rule.id)}" title="Duplicate rule" aria-label="Duplicate rule">&#10697;</button>
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
    setStatusMessage(
      customRuleStatus,
      "success",
      filteredRules.length === rules.length
        ? `${rules.length} custom event ${rules.length === 1 ? "action" : "actions"} ready.`
        : `Showing ${filteredRules.length} of ${rules.length} custom event ${rules.length === 1 ? "action" : "actions"}.`
    );
  }
}

async function refreshRuleSoundOptions(ruleId, searchText) {
  const select = document.querySelector(`[data-rule-sound-select="${ruleId}"]`);
  const rule = state.settings.customEventRules.find((item) => item.id === ruleId);
  if (!select || !rule) {
    return;
  }

  const requestId = state.soundCatalogSearchRequestId + 1;
  state.soundCatalogSearchRequestId = requestId;
  const normalizedSearch = String(searchText ?? "").trim();

  if (normalizedSearch.length >= 2) {
    try {
      await ensureSoundCatalogSearch(normalizedSearch);
      state.soundCatalogError = "";
    } catch (error) {
      state.soundCatalogError = error.message || "Unable to search the website sound library.";
      setStatusMessage(customRuleStatus, "error", state.soundCatalogError);
    }
  }

  if (requestId !== state.soundCatalogSearchRequestId) {
    return;
  }

  const options = getSoundOptionList(normalizedSearch, rule.soundId);
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

function updateGiftTriggerVisibility(ruleId, metric) {
  const wrapper = document.querySelector(`[data-rule-gift-picker-wrapper="${ruleId}"]`);
  if (!wrapper) {
    return;
  }

  wrapper.classList.toggle("is-hidden", metric !== "specificGift");
}

function updateEmoteTriggerVisibility(ruleId, metric) {
  const wrapper = document.querySelector(`[data-rule-emote-picker-wrapper="${ruleId}"]`);
  if (!wrapper) {
    return;
  }

  wrapper.classList.toggle("is-hidden", !["subEmote", "fanEmote"].includes(metric));
}

function updateFeedbackOverlayVisibility(ruleId, enabled) {
  const wrapper = document.querySelector(`[data-rule-feedback-overlay-fields="${ruleId}"]`);
  if (!wrapper) {
    return;
  }

  wrapper.classList.toggle("is-hidden", !enabled);
}

function renderGiftOptionList(ruleId, searchText = "") {
  const giftNameInput = document.querySelector(`[data-rule-gift-name="${ruleId}"]`);
  const optionsContainer = document.querySelector(`[data-rule-gift-options="${ruleId}"]`);

  if (!optionsContainer) {
    return;
  }

  optionsContainer.innerHTML = getKnownGiftOptionsMarkup(ruleId, giftNameInput?.value ?? "", searchText);
}

function setGiftTriggerStatus(ruleId, message) {
  const status = document.querySelector(`[data-rule-gift-status="${ruleId}"]`);
  if (status) {
    status.textContent = message;
  }
}

function updateMetricThresholdLabel(ruleId, metric) {
  const label = document.querySelector(`[data-rule-threshold-label="${ruleId}"]`);
  if (!label) {
    return;
  }

  label.textContent = getMetricThresholdLabel(metric);
  updateGiftTriggerVisibility(ruleId, metric);
  updateEmoteTriggerVisibility(ruleId, metric);
}

function renderEmoteOptionList(ruleId, metric, searchText = "") {
  const emoteIdInput = document.querySelector(`[data-rule-emote-id-input="${ruleId}"]`);
  const emoteNameInput = document.querySelector(`[data-rule-emote-name-input="${ruleId}"]`);
  const emoteImageUrlInput = document.querySelector(`[data-rule-emote-image-url-input="${ruleId}"]`);
  const optionsContainer = document.querySelector(`[data-rule-emote-options="${ruleId}"]`);
  const selectedContainer = document.querySelector(`[data-rule-emote-selected="${ruleId}"]`);

  if (!optionsContainer || !selectedContainer) {
    return;
  }

  const selectedRule = normalizeRule({
    metric,
    triggerEmoteId: String(emoteIdInput?.value ?? "").trim(),
    triggerEmoteName: String(emoteNameInput?.value ?? "").trim()
      || String(emoteIdInput?.value ?? "").trim(),
    triggerEmoteImageUrl: String(emoteImageUrlInput?.value ?? "").trim()
  });

  selectedContainer.innerHTML = getEmoteSelectorSummaryMarkup(selectedRule);
  optionsContainer.innerHTML = getEmoteOptionsMarkup(ruleId, metric, emoteNameInput?.value ?? "", searchText);
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

function resetCustomRuleFilters() {
  state.customRuleSearchText = "";
  state.customRuleAudienceFilter = "all";
  state.customRuleTriggerFilter = "all";

  if (customRuleSearchInput) {
    customRuleSearchInput.value = "";
  }
  if (customRuleAudienceFilterInput) {
    customRuleAudienceFilterInput.value = "all";
  }
  if (customRuleTriggerFilterInput) {
    customRuleTriggerFilterInput.value = "all";
  }
}

function incrementUserMetric(metric, userId, amount) {
  const normalizedMetric = ["follows", "likes", "comments", "shares", "coins", "subEmote", "fanEmote", "join", "firstActivity"].includes(metric) ? metric : null;
  const normalizedUserId = String(userId ?? "").trim().toLowerCase();
  const safeAmount = Number(amount) || 0;

  if (!normalizedMetric || !normalizedUserId || safeAmount <= 0) {
    return;
  }

  const metricMap = state.sessionUserMetrics[normalizedMetric];
  const currentValue = metricMap.get(normalizedUserId) ?? 0;
  metricMap.set(normalizedUserId, currentValue + safeAmount);
}

function incrementGiftMetric(userId, giftName, amount) {
  const normalizedUserId = normalizeUserKey(userId);
  const normalizedGiftName = normalizeGiftKey(giftName);
  const safeAmount = Math.max(0, Number(amount) || 0);

  if (!normalizedUserId || !normalizedGiftName || safeAmount <= 0) {
    return;
  }

  const totalCurrent = Number(state.sessionGiftMetrics.total.get(normalizedGiftName) ?? 0);
  state.sessionGiftMetrics.total.set(normalizedGiftName, totalCurrent + safeAmount);

  const userGiftMap = state.sessionGiftMetrics.byUser.get(normalizedUserId) ?? new Map();
  const userCurrent = Number(userGiftMap.get(normalizedGiftName) ?? 0);
  userGiftMap.set(normalizedGiftName, userCurrent + safeAmount);
  state.sessionGiftMetrics.byUser.set(normalizedUserId, userGiftMap);
}

function incrementEmoteMetric(metric, userId, emoteId, emoteName, amount = 1) {
  const normalizedMetric = metric === "fanEmote" ? "fanEmote" : "subEmote";
  const normalizedUserId = normalizeUserKey(userId);
  const normalizedEmoteKey = String(emoteId || emoteName || "").trim().toLowerCase();
  const safeAmount = Math.max(0, Number(amount) || 0);

  if (!normalizedUserId || !normalizedEmoteKey || safeAmount <= 0) {
    return;
  }

  const totalMap = state.sessionEmoteMetrics?.[normalizedMetric]?.total;
  const byUserMap = state.sessionEmoteMetrics?.[normalizedMetric]?.byUser;
  if (!totalMap || !byUserMap) {
    return;
  }

  totalMap.set(normalizedEmoteKey, Number(totalMap.get(normalizedEmoteKey) ?? 0) + safeAmount);

  const userEmoteMap = byUserMap.get(normalizedUserId) ?? new Map();
  userEmoteMap.set(normalizedEmoteKey, Number(userEmoteMap.get(normalizedEmoteKey) ?? 0) + safeAmount);
  byUserMap.set(normalizedUserId, userEmoteMap);
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

function createFirstActivityItem(item) {
  const userId = normalizeUserKey(item?.user);
  if (!userId) {
    return null;
  }

  const previousActivity = Number(
    state.sessionUserMetrics.join.get(userId) ?? 0
  ) + Number(
    state.sessionUserMetrics.firstActivity.get(userId) ?? 0
  ) + Number(
    state.sessionUserMetrics.follows.get(userId) ?? 0
  ) + Number(
    state.sessionUserMetrics.likes.get(userId) ?? 0
  ) + Number(
    state.sessionUserMetrics.comments.get(userId) ?? 0
  ) + Number(
    state.sessionUserMetrics.shares.get(userId) ?? 0
  ) + Number(
    state.sessionUserMetrics.coins.get(userId) ?? 0
  ) + Number(
    state.sessionUserMetrics.subEmote.get(userId) ?? 0
  ) + Number(
    state.sessionUserMetrics.fanEmote.get(userId) ?? 0
  );

  if (previousActivity > 0) {
    return null;
  }

  return {
    ...item,
    id: `${item?.id ?? "activity"}-first-activity`,
    type: "firstActivity",
    message: "triggered their first activity this session"
  };
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
  state.customRuleUserCooldowns.delete(ruleId);

  for (const key of Array.from(state.customRuleTriggerCounts.keys())) {
    if (key.startsWith(`${ruleId}:`)) {
      state.customRuleTriggerCounts.delete(key);
    }
  }
}

function getRuleCooldownUserKey(item) {
  return normalizeUserKey(item?.user || "");
}

function getRuleUserCooldownExpiry(ruleId, userKey) {
  if (!ruleId || !userKey) {
    return 0;
  }
  const ruleCooldowns = state.customRuleUserCooldowns.get(ruleId);
  return Number(ruleCooldowns?.get(userKey) ?? 0) || 0;
}

function isRuleUserOnCooldown(rule, item) {
  const cooldownSeconds = Math.max(0, Number(rule?.userCooldownSeconds) || 0);
  if (cooldownSeconds <= 0) {
    return false;
  }
  const userKey = getRuleCooldownUserKey(item);
  if (!userKey) {
    return false;
  }
  return getRuleUserCooldownExpiry(rule.id, userKey) > Date.now();
}

function setRuleUserCooldown(rule, item) {
  const cooldownSeconds = Math.max(0, Number(rule?.userCooldownSeconds) || 0);
  if (cooldownSeconds <= 0) {
    return;
  }
  const userKey = getRuleCooldownUserKey(item);
  if (!userKey) {
    return;
  }
  const ruleCooldowns = state.customRuleUserCooldowns.get(rule.id) ?? new Map();
  ruleCooldowns.set(userKey, Date.now() + (cooldownSeconds * 1000));
  state.customRuleUserCooldowns.set(rule.id, ruleCooldowns);
}

function doesItemMatchRuleMetric(rule, item) {
  const metric = rule?.metric;
  if (!metric || !item) {
    return false;
  }
  if (metric === "join") {
    return item.type === "join";
  }
  if (metric === "firstActivity") {
    return item.type === "firstActivity";
  }
  if (metric === "anyComment") {
    return item.type === "chat";
  }
  if (metric === "follows") {
    return item.type === "follow";
  }
  if (metric === "likes") {
    return item.type === "like";
  }
  if (metric === "shares") {
    return item.type === "share";
  }
  if (metric === "coins" || metric === "specificGift") {
    return item.type === "gift";
  }
  if (metric === "subEmote") {
    return item.type === "subEmote" || (item.type === "chat" && Array.isArray(item.emotes) && item.emotes.length > 0 && Boolean(item.isSubscriber));
  }
  if (metric === "fanEmote") {
    return item.type === "fanEmote" || (item.type === "chat" && Array.isArray(item.emotes) && item.emotes.length > 0 && !item.isSubscriber);
  }
  return false;
}

function doesItemMatchRuleAudience(rule, item) {
  const userKey = normalizeUserKey(item?.user || "");
  if (!userKey) {
    return false;
  }
  const profile = state.sessionUserProfiles.get(userKey) ?? {};
  switch (rule?.triggerAudience) {
    case "follower":
      return Boolean(profile?.followedThisSession);
    case "subscriber":
      return Boolean(profile?.isSubscriber);
    case "moderator":
      return Boolean(profile?.isModerator);
    case "topGifter":
      return getTopGifterUserId() === userKey;
    case "specificUser":
      return normalizeUserKey(rule?.triggerUsername) === userKey;
    case "everyone":
    default:
      return true;
  }
}

function hasCustomActionFeedbackOverlay(rule) {
  return Boolean(rule?.feedbackOverlayEnabled && String(rule?.feedbackOverlayMessage ?? "").trim());
}

function getCustomActionOverlayTokenReplacements(rule, sourceItem = null) {
  return {
    username: sourceItem?.user ? `@${sourceItem.user}` : "",
    "gift sent": String(sourceItem?.giftName ?? "").trim(),
    "cool down time": `${Math.max(0, Number(rule?.userCooldownSeconds) || 0)} seconds`,
    "rule name": String(rule?.name ?? "").trim()
  };
}

function showCustomActionFeedbackOverlay(rule, sourceItem = null) {
  if (!hasCustomActionFeedbackOverlay(rule)) {
    return;
  }

  const replacements = getCustomActionOverlayTokenReplacements(rule, sourceItem);
  const title = formatNamedTemplate(String(rule.feedbackOverlayTitle || "Viewer Feedback"), replacements);
  const message = formatNamedTemplate(String(rule.feedbackOverlayMessage || ""), replacements);
  if (!message) {
    return;
  }

  showHostedFeedbackOverlay({
    title: title || "Viewer Feedback",
    message,
    commandType: String(rule?.name ?? "Custom action").trim(),
    username: replacements.username,
    accentColor: normalizeOverlayAccentColor(rule.feedbackOverlayAccentColor),
    sourceType: "custom-action"
  });
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

function getResolvedElevenLabsApiKey() {
  const inputValue = String(ttsElevenApiKeyInput?.value ?? "").trim();
  if (inputValue) {
    return inputValue;
  }

  return String(state.settings?.ttsElevenApiKey ?? "").trim();
}

function formatUsageNumber(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return "--";
  }

  return numericValue.toLocaleString("en-GB");
}

function formatUsageResetDate(unixSeconds) {
  const numericValue = Number(unixSeconds);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return "--";
  }

  return new Date(numericValue * 1000).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
}

function renderElevenLabsUsagePanel() {
  if (!ttsElevenLabsUsagePanel) {
    return;
  }

  const isElevenLabs = ttsProviderSelect.value === "elevenlabs";
  ttsElevenLabsUsagePanel.classList.toggle("is-hidden", !isElevenLabs);
  const resolvedApiKey = getResolvedElevenLabsApiKey();
  if (ttsElevenLabsRefreshButton) {
    ttsElevenLabsRefreshButton.disabled = !isElevenLabs || elevenLabsUsageState.loading || !resolvedApiKey;
  }

  if (!isElevenLabs) {
    return;
  }

  const usage = elevenLabsUsageState.data;
  ttsElevenLabsPlan.textContent = `Plan ${usage?.tier ? String(usage.tier).replace(/_/g, " ") : "--"}`;
  ttsElevenLabsUsed.textContent = formatUsageNumber(usage?.used);
  ttsElevenLabsLimit.textContent = usage?.limit == null ? "--" : formatUsageNumber(usage?.limit);
  ttsElevenLabsRemaining.textContent = usage?.remaining == null ? "--" : formatUsageNumber(usage?.remaining);
  ttsElevenLabsReset.textContent = formatUsageResetDate(usage?.nextResetUnix);

  if (elevenLabsUsageState.loading) {
    setStatusMessage(ttsElevenLabsUsageStatus, "info", "Loading ElevenLabs account usage details...");
    return;
  }

  if (elevenLabsUsageState.error) {
    setStatusMessage(ttsElevenLabsUsageStatus, "error", elevenLabsUsageState.error);
    ttsElevenLabsPlan.textContent = "Plan error";
    return;
  }

  if (!resolvedApiKey) {
    setStatusMessage(ttsElevenLabsUsageStatus, "info", "Enter your ElevenLabs API key to load account usage details.");
    return;
  }

  if (!usage) {
    setStatusMessage(ttsElevenLabsUsageStatus, "info", "Account usage details will appear here once they load.");
    return;
  }

  const overageHint = usage.canExtend && usage.remaining === 0
    ? " Usage-based overage may still be available."
    : "";
  setStatusMessage(
    ttsElevenLabsUsageStatus,
    "success",
    `Subscription ${usage.status || "active"}. Used ${formatUsageNumber(usage?.used)} of ${usage?.limit == null ? "--" : formatUsageNumber(usage?.limit)} credits.${overageHint}`
  );
}

async function refreshElevenLabsUsage(options = {}) {
  const isElevenLabs = ttsProviderSelect.value === "elevenlabs";
  const apiKey = getResolvedElevenLabsApiKey();

  if (!isElevenLabs) {
    elevenLabsUsageState.loading = false;
    elevenLabsUsageState.apiKey = "";
    elevenLabsUsageState.data = null;
    elevenLabsUsageState.error = "";
    renderElevenLabsUsagePanel();
    return;
  }

  if (!apiKey) {
    elevenLabsUsageState.loading = false;
    elevenLabsUsageState.apiKey = "";
    elevenLabsUsageState.data = null;
    elevenLabsUsageState.error = "";
    renderElevenLabsUsagePanel();
    return;
  }

  if (!options.force && !options.silent && elevenLabsUsageState.apiKey === apiKey && elevenLabsUsageState.data) {
    renderElevenLabsUsagePanel();
    return;
  }

  elevenLabsUsageState.loading = true;
  elevenLabsUsageState.apiKey = apiKey;
  elevenLabsUsageState.error = "";
  renderElevenLabsUsagePanel();

  try {
    const usage = await app.getElevenLabsUsage({ apiKey });
    if (elevenLabsUsageState.apiKey !== apiKey) {
      return;
    }
    elevenLabsUsageState.data = usage;
    elevenLabsUsageState.error = "";
  } catch (error) {
    if (elevenLabsUsageState.apiKey !== apiKey) {
      return;
    }
    elevenLabsUsageState.data = null;
    elevenLabsUsageState.error = error.message || "Unable to load ElevenLabs usage details.";
  } finally {
    if (elevenLabsUsageState.apiKey === apiKey) {
      elevenLabsUsageState.loading = false;
    }
    renderElevenLabsUsagePanel();
  }
}

function scheduleElevenLabsUsageRefresh(delayMs = 500) {
  if (elevenLabsUsageRefreshTimer) {
    window.clearTimeout(elevenLabsUsageRefreshTimer);
  }

  elevenLabsUsageRefreshTimer = window.setTimeout(() => {
    elevenLabsUsageRefreshTimer = null;
    void refreshElevenLabsUsage({ force: true });
  }, delayMs);
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
  renderElevenLabsUsagePanel();
  void refreshElevenLabsUsage({ silent: true });
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

  if (String(item.message ?? "").trim().startsWith("!")) {
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

  const messageText = String(item.message ?? item.text ?? "").trim();
  const match = messageText.match(/^!myttsvoice\s+(\d+)\s*$/i);
  if (!match) {
    return false;
  }

  const providerKey = getCurrentTtsProviderKey();
  let availableEntries = getAvailableTtsVoiceEntries();
  if (!availableEntries.length) {
    await loadVoices();
    availableEntries = getAvailableTtsVoiceEntries();
  }
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

  await saveUserAssignedTtsVoice(item.user, selectedEntry.value, providerKey);
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

  const firstActivityItem = createFirstActivityItem(item);

  updateSessionUserProfile(item);
  void reportAuthenticatedDebugTrace("Chat received", "Received live chat or interaction event.", {
    itemType: item.type,
    user: item.user || "",
    previewText: String(item.text || item.giftName || "").slice(0, 120),
    translatedText: String(item.translatedText || "").slice(0, 120)
  });

  if (item.type === "join") {
    state.sessionMetrics.join += 1;
    incrementUserMetric("join", item.user, 1);
  }

  if (firstActivityItem) {
    state.sessionMetrics.firstActivity += 1;
    incrementUserMetric("firstActivity", firstActivityItem.user, 1);
  }

  if (item.type === "chat") {
    state.statState.chatTimestamps.push(Date.now());
    state.sessionMetrics.comments += 1;
    incrementUserMetric("comments", item.user, 1);
    pushChatOverlayItem(item);
    if (Array.isArray(item.emotes) && item.emotes.length) {
      const derivedMetric = item.isSubscriber ? "subEmote" : "fanEmote";
      for (const emote of item.emotes) {
        state.sessionMetrics[derivedMetric] += 1;
        incrementUserMetric(derivedMetric, item.user, 1);
        incrementEmoteMetric(derivedMetric, item.user, emote?.emoteId, emote?.emoteName, 1);
        void rememberKnownTikTokEmote(
          derivedMetric,
          emote?.emoteName,
          emote?.emoteImageUrl,
          emote?.emoteId,
          state.username
        );
      }
    }
  }

  if (item.type === "gift") {
    const giftCount = Math.max(1, Number(item.giftCount) || 1);
    const totalCoins = Math.max(0, Number(item.totalCoins) || 0);
    state.statState.gifts += giftCount;
    state.sessionMetrics.coins += totalCoins;
    incrementUserMetric("coins", item.user, totalCoins);
    incrementGiftMetric(item.user, item.giftName, giftCount);
    pushGiftOverlayItem(item);
    void rememberKnownTikTokGift(item.giftName, item.giftImageUrl, item.coinValue, item.giftId);
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
    syncLikesOverlayState();
  }

  if (item.type === "subEmote") {
    state.sessionMetrics.subEmote += 1;
    incrementUserMetric("subEmote", item.user, 1);
    incrementEmoteMetric("subEmote", item.user, item.emoteId, item.emoteName, 1);
    void rememberKnownTikTokEmote("subEmote", item.emoteName, item.emoteImageUrl, item.emoteId, state.username);
  }

  if (item.type === "fanEmote") {
    state.sessionMetrics.fanEmote += 1;
    incrementUserMetric("fanEmote", item.user, 1);
    incrementEmoteMetric("fanEmote", item.user, item.emoteId, item.emoteName, 1);
    void rememberKnownTikTokEmote("fanEmote", item.emoteName, item.emoteImageUrl, item.emoteId, state.username);
  }

  if (["chat", "gift", "follow", "share", "like"].includes(item.type)) {
    syncViewerStatsOverlayState();
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
  checkCustomRules(item);
  if (firstActivityItem) {
    checkCustomRules(firstActivityItem);
  }
  triggerBirthdayViewerActionIfNeeded(item);

  const handledListCommands = await handleListCommandsCommand(item);
  if (handledListCommands) {
    return;
  }

  const handledCastVoteCommand = await handleCastVoteCommand(item);
  if (handledCastVoteCommand) {
    return;
  }

  const handledVoteCommand = await handleVoteCommand(item);
  if (handledVoteCommand) {
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

function checkCustomRules(sourceItem = null) {
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
      if (sourceItem) {
        if (!doesItemMatchRuleMetric(rule, sourceItem)) {
          continue;
        }
        if (!doesItemMatchRuleAudience(rule, sourceItem)) {
          continue;
        }
        if (isRuleUserOnCooldown(rule, sourceItem)) {
          continue;
        }
        setRuleUserCooldown(rule, sourceItem);
      }
      showToast(`Custom action triggered: ${rule.name}`, "success");
      void triggerCustomRule(rule, { sourceItem });
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

  if (ttsProviderSelect.value === "elevenlabs") {
    void refreshElevenLabsUsage({ force: true });
  } else {
    renderElevenLabsUsagePanel();
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
  renderElevenLabsUsagePanel();
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
  updateTikTokSessionUi();

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
    votingEnabledInput.checked = Boolean(settings.votingEnabled);
    votingStartRoleInput.value = ["everyone", "subscribers", "moderators"].includes(String(settings.votingStartRole ?? "").trim().toLowerCase())
      ? String(settings.votingStartRole).trim().toLowerCase()
      : "everyone";
    votingOverlayOrientationInput.value = String(settings.votingOverlayOrientation ?? "").trim().toLowerCase() === "vertical" ? "vertical" : "horizontal";
    viewerStatsOverlayFilterInput.value = ["everyone", "subscriber", "moderator", "username"].includes(String(settings.viewerStatsOverlayFilter ?? "").trim().toLowerCase())
      ? String(settings.viewerStatsOverlayFilter).trim().toLowerCase()
      : "everyone";
    viewerStatsOverlayUsernameInput.value = String(settings.viewerStatsOverlayUsername ?? "").trim();
    if (!settings.activeOverlayDesignerTemplateId) {
      settings.activeOverlayDesignerTemplateId = settings.overlayDesignerTemplates?.[0]?.id ?? "";
    }
    updateTtsProviderVisibility();

  updateRatePitchVolumeLabels();
  updateTranslationStatus();
  updateTtsStatus();
  renderElevenLabsUsagePanel();
  updateVotingStatus();
  updateVoteOverlayControls();
  updateViewerStatsOverlayControls();
  renderOverlayDesignerControls();
  updateHeaderPills();
  renderCustomRules();
  applyDashboardCardVisibility();
  applyMainScreenPinnedCards();
  applySavedCardCollapseState();
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
    } catch (error) {
      if (isAuthServiceUnavailableError(error)) {
        showDashboardForUser(state.authenticatedUser);
        setAuthStatus("info", `Signed in as ${state.authenticatedUser?.displayName || state.authenticatedUser?.email || "saved user"}.`);
        setAuthSessionCheckStatus("error", "Session check: Unavailable");
        showToast("Signed in with saved session. Live auth checks are temporarily unavailable.", "info");
        return;
      }
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
          clearHostedFeedOverlayState();
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
        clearHostedFeedOverlayState();
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
    try {
      await handleSettingsProfileSelection(event.target.value);
    } catch (error) {
      showToast(error.message || "Unable to update the profile menu action.", "error");
      renderSettingsProfileOptions();
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

  openLayoutCustomizerButton?.addEventListener("click", () => {
    openLayoutCustomizerModal();
  });

  layoutCustomizerCloseButton?.addEventListener("click", () => {
    closeLayoutCustomizerModal();
  });

  layoutCustomizerModal?.addEventListener("click", (event) => {
    if (event.target === layoutCustomizerModal) {
      closeLayoutCustomizerModal();
    }
  });

  layoutCustomizerSaveButton?.addEventListener("click", async () => {
    try {
      await saveDashboardLayoutVisibility();
    } catch (error) {
      showToast(error.message || "Unable to save the dashboard layout.", "error");
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

  openControlsLayerButton?.addEventListener("click", () => openFocusedControlsLayer());
  openOverlaysLayerButton?.addEventListener("click", () => openFocusedControlsLayer());
  openEventActionsLayerButton?.addEventListener("click", () => openFocusedEventActionsLayer());

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
  chatOverlayCopyButton.addEventListener("click", async () => {
    const overlayUrl = chatOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The chat overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(overlayUrl);
      showToast("Chat overlay URL copied.", "success");
    } catch (error) {
      showToast(error.message || "Unable to copy the chat overlay URL.", "error");
    }
  });
  chatOverlayOpenButton.addEventListener("click", async () => {
    const overlayUrl = chatOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The chat overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await app.openExternal(overlayUrl);
    } catch (error) {
      showToast(error.message || "Unable to open the chat overlay.", "error");
    }
  });
  giftOverlayCopyButton.addEventListener("click", async () => {
    const overlayUrl = giftOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The gift overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(overlayUrl);
      showToast("Gift overlay URL copied.", "success");
    } catch (error) {
      showToast(error.message || "Unable to copy the gift overlay URL.", "error");
    }
  });
  giftOverlayOpenButton.addEventListener("click", async () => {
    const overlayUrl = giftOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The gift overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await app.openExternal(overlayUrl);
    } catch (error) {
      showToast(error.message || "Unable to open the gift overlay.", "error");
    }
  });
  likesOverlayCopyButton.addEventListener("click", async () => {
    const overlayUrl = likesOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The like leaderboard overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(overlayUrl);
      showToast("Like leaderboard overlay URL copied.", "success");
    } catch (error) {
      showToast(error.message || "Unable to copy the like leaderboard overlay URL.", "error");
    }
  });
  likesOverlayOpenButton.addEventListener("click", async () => {
    const overlayUrl = likesOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The like leaderboard overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await app.openExternal(overlayUrl);
    } catch (error) {
      showToast(error.message || "Unable to open the like leaderboard overlay.", "error");
    }
  });
  viewerStatsOverlayCopyButton.addEventListener("click", async () => {
    const overlayUrl = viewerStatsOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The viewer stats overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(overlayUrl);
      showToast("Viewer stats overlay URL copied.", "success");
    } catch (error) {
      showToast(error.message || "Unable to copy the viewer stats overlay URL.", "error");
    }
  });
  viewerStatsOverlayOpenButton.addEventListener("click", async () => {
    const overlayUrl = viewerStatsOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The viewer stats overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await app.openExternal(overlayUrl);
    } catch (error) {
      showToast(error.message || "Unable to open the viewer stats overlay.", "error");
    }
  });
  voteOverlayCopyButton.addEventListener("click", async () => {
    const overlayUrl = voteOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The voting overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(overlayUrl);
      showToast("Voting overlay URL copied.", "success");
    } catch (error) {
      showToast(error.message || "Unable to copy the voting overlay URL.", "error");
    }
  });
  voteOverlayOpenButton.addEventListener("click", async () => {
    const overlayUrl = voteOverlayUrlInput.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The voting overlay URL is not ready yet.", "error");
      return;
    }

    try {
      await app.openExternal(overlayUrl);
    } catch (error) {
      showToast(error.message || "Unable to open the voting overlay.", "error");
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
    if (event.key === "Escape" && layoutCustomizerModal && !layoutCustomizerModal.hidden) {
      closeLayoutCustomizerModal();
    }
    if (event.key === "Escape" && overlayDesignerModal && !overlayDesignerModal.hidden) {
      closeOverlayDesignerModal();
    }
    if (event.key === "Escape" && sidebarLayer && !sidebarLayer.hidden) {
      closeSidebarLayer();
    }
  });
}

function wireTabEvents() {
  if (tabEventsWired) {
    return;
  }
  tabEventsWired = true;

  controlsTabButton?.addEventListener("click", () => setActiveTab("controls"));
  overlaysTabButton?.addEventListener("click", () => setActiveTab("controls"));
  eventActionsTabButton?.addEventListener("click", () => setActiveTab("event-actions"));
  sidebarLayerCloseButton?.addEventListener("click", () => closeSidebarLayer());
  sidebarLayer?.addEventListener("click", (event) => {
    if (event.target === sidebarLayer) {
      closeSidebarLayer();
    }
  });
}

function wireOverlayDesignerEvents() {
  if (overlayDesignerEventsWired) {
    return;
  }
  overlayDesignerEventsWired = true;

  overlayDesignerOpenButton?.addEventListener("click", openOverlayDesignerModal);
  overlayDesignerCloseButton?.addEventListener("click", closeOverlayDesignerModal);
  overlayDesignerModal?.addEventListener("click", (event) => {
    if (event.target === overlayDesignerModal) {
      closeOverlayDesignerModal();
    }
  });

  overlayDesignerTemplateSelect?.addEventListener("change", () => {
    applyOverlayDesignerSettings({
      activeOverlayDesignerTemplateId: overlayDesignerTemplateSelect.value
    }, { persist: "schedule" });
  });

  overlayDesignerModalTemplateSelect?.addEventListener("change", () => {
    applyOverlayDesignerSettings({
      activeOverlayDesignerTemplateId: overlayDesignerModalTemplateSelect.value
    }, { persist: "schedule" });
  });

  overlayDesignerCopyButton?.addEventListener("click", async () => {
    const overlayUrl = getOverlayDesignerPreviewUrl();
    if (!overlayUrl) {
      showToast("The overlay designer URL is not ready yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(overlayUrl);
      showToast("Overlay designer URL copied.", "success");
    } catch (error) {
      showToast(error.message || "Unable to copy the overlay designer URL.", "error");
    }
  });

  overlayDesignerPreviewButton?.addEventListener("click", async () => {
    const overlayUrl = getOverlayDesignerPreviewUrl();
    if (!overlayUrl) {
      showToast("The overlay designer URL is not ready yet.", "error");
      return;
    }

    try {
      await app.openExternal(overlayUrl);
    } catch (error) {
      showToast(error.message || "Unable to open the overlay designer preview.", "error");
    }
  });

  overlayDesignerTestButton?.addEventListener("click", async () => {
    const overlayUrl = getOverlayDesignerPreviewUrl();
    if (!overlayUrl) {
      showToast("The overlay designer URL is not ready yet.", "error");
      return;
    }

    try {
      await app.updateOverlayDesignerState({
        activeTemplateId: getActiveOverlayDesignerTemplateId(),
        templates: getOverlayDesignerTemplates(),
        runtime: createOverlayDesignerTestRuntimeState()
      });
      await app.openExternal(overlayUrl);
      showToast("Opened the local preview with sample overlay data.", "success");
    } catch (error) {
      showToast(error.message || "Unable to test the overlay designer preview.", "error");
    }
  });

    [
      [queueOverlayTemplateSelect, "queue"],
      [chatOverlayTemplateSelect, "chat"],
      [giftOverlayTemplateSelect, "gift"],
      [likesOverlayTemplateSelect, "likes"],
      [viewerStatsOverlayTemplateSelect, "viewerStats"],
      [commandFeedbackOverlayTemplateSelect, "commandFeedback"],
      [voteOverlayTemplateSelect, "vote"]
    ].forEach(([selectElement, overlayKey]) => {
    selectElement?.addEventListener("change", () => {
      setOverlayDesignerAssignment(overlayKey, selectElement.value);
    });
  });

    [
      [queueOverlayCustomizeButton, "queue"],
      [chatOverlayCustomizeButton, "chat"],
      [giftOverlayCustomizeButton, "gift"],
      [likesOverlayCustomizeButton, "likes"],
      [viewerStatsOverlayCustomizeButton, "viewerStats"],
      [commandFeedbackOverlayCustomizeButton, "commandFeedback"],
      [voteOverlayCustomizeButton, "vote"]
    ].forEach(([button, overlayKey]) => {
    button?.addEventListener("click", () => {
      openOverlayDesignerForAssignment(overlayKey);
    });
  });

    [
      [queueOverlayResetButton, "queue"],
      [chatOverlayResetButton, "chat"],
      [giftOverlayResetButton, "gift"],
      [likesOverlayResetButton, "likes"],
      [viewerStatsOverlayResetButton, "viewerStats"],
      [commandFeedbackOverlayResetButton, "commandFeedback"],
      [voteOverlayResetButton, "vote"]
    ].forEach(([button, overlayKey]) => {
      button?.addEventListener("click", () => {
        setOverlayDesignerAssignment(overlayKey, "");
        showToast("Overlay styling reset to default.", "success");
      });
    });

    viewerStatsOverlayFilterInput?.addEventListener("change", () => {
      persistSettings({
        viewerStatsOverlayFilter: viewerStatsOverlayFilterInput.value,
        viewerStatsOverlayUsername: viewerStatsOverlayUsernameInput?.value ?? ""
      }).then(() => {
        updateViewerStatsOverlayControls();
        syncViewerStatsOverlayState();
      }).catch((error) => {
        showToast(error.message || "Unable to save viewer stats overlay filter.", "error");
      });
    });

    viewerStatsOverlayUsernameInput?.addEventListener("input", () => {
      state.settings = ensureSettingsShape({
        ...state.settings,
        viewerStatsOverlayFilter: viewerStatsOverlayFilterInput?.value ?? "everyone",
        viewerStatsOverlayUsername: viewerStatsOverlayUsernameInput.value
      });
      syncViewerStatsOverlayState();
    });

    viewerStatsOverlayUsernameInput?.addEventListener("change", () => {
      persistSettings({
        viewerStatsOverlayFilter: viewerStatsOverlayFilterInput?.value ?? "everyone",
        viewerStatsOverlayUsername: viewerStatsOverlayUsernameInput.value
      }).then(() => {
        updateViewerStatsOverlayControls();
        syncViewerStatsOverlayState();
      }).catch((error) => {
        showToast(error.message || "Unable to save viewer stats overlay username filter.", "error");
      });
    });

  [
    [overlayDesignerTemplateNameInput, (value) => ({ name: String(value ?? "").trim() || "Overlay Template" })],
    [overlayDesignerCanvasWidthInput, (value) => ({ width: Math.max(320, Number(value) || 1920) })],
    [overlayDesignerCanvasHeightInput, (value) => ({ height: Math.max(320, Number(value) || 1080) })],
    [overlayDesignerBackgroundColorInput, (value) => ({ backgroundColor: normalizeOverlayDesignerHex(value, "#08111f") })],
    [overlayDesignerBackgroundOpacityInput, (value) => ({ backgroundOpacity: clampOverlayDesignerNumber(value, 0, 1, 0.45) })],
    [overlayDesignerBackgroundImageInput, (value) => ({ backgroundImage: String(value ?? "").trim() })],
    [overlayDesignerBackgroundVideoInput, (value) => ({ backgroundVideo: String(value ?? "").trim() })],
    [overlayDesignerAutoLoadInput, (value) => ({ autoLoad: String(value ?? "").trim() })]
  ].forEach(([input, mapper]) => {
    input?.addEventListener("input", () => {
      updateActiveOverlayDesignerTemplate((template) => ({
        ...template,
        ...mapper(input.value)
      }));
      renderOverlayDesignerModal();
    });
  });

  [
    [overlayElementNameInput, (value, element) => ({ ...element, name: String(value ?? "").trim() || element.name })],
    [overlayElementContentInput, (value, element) => ({ ...element, content: String(value ?? "") })],
    [overlayElementSourceInput, (value, element) => ({ ...element, source: String(value ?? "").trim() })],
    [overlayElementWidgetStyleInput, (value, element) => ({ ...element, widgetStyle: ["defaultOverlay", "simple"].includes(String(value ?? "").trim()) ? String(value ?? "").trim() : element.widgetStyle })],
    [overlayElementColorInput, (value, element) => ({ ...element, color: normalizeOverlayDesignerHex(value, element.color) })],
    [overlayElementMutedTextColorInput, (value, element) => ({ ...element, mutedTextColor: normalizeOverlayDesignerHex(value, element.mutedTextColor) })],
    [overlayElementSuccessColorInput, (value, element) => ({ ...element, successColor: normalizeOverlayDesignerHex(value, element.successColor) })],
    [overlayElementGlowColorInput, (value, element) => ({ ...element, glowColor: normalizeOverlayDesignerHex(value, element.glowColor) })],
    [overlayElementBackgroundColorInput, (value, element) => ({ ...element, backgroundColor: normalizeOverlayDesignerHex(value, element.backgroundColor) })],
    [overlayElementBackgroundOpacityInput, (value, element) => ({ ...element, backgroundOpacity: clampOverlayDesignerNumber(value, 0, 1, element.backgroundOpacity) })],
    [overlayElementBorderColorInput, (value, element) => ({ ...element, borderColor: normalizeOverlayDesignerHex(value, element.borderColor) })],
    [overlayElementBorderWidthInput, (value, element) => ({ ...element, borderWidth: clampOverlayDesignerNumber(value, 0, 24, element.borderWidth) })],
    [overlayElementBorderRadiusInput, (value, element) => ({ ...element, borderRadius: clampOverlayDesignerNumber(value, 0, 240, element.borderRadius) })],
    [overlayElementBlurInput, (value, element) => ({ ...element, blur: clampOverlayDesignerNumber(value, 0, 40, element.blur) })],
    [overlayElementAnimationInput, (value, element) => ({ ...element, animation: String(value ?? "").trim() || "none" })],
    [overlayElementBindingInput, (value, element) => ({ ...element, binding: String(value ?? "").trim() })]
  ].forEach(([input, mapper]) => {
    input?.addEventListener("input", () => {
      updateSelectedOverlayDesignerElement((element) => mapper(input.value, element));
      renderOverlayDesignerModal();
    });
  });

  [
    [overlayElementXInput, (value, element) => ({ ...element, x: Math.max(0, Number(value) || 0) })],
    [overlayElementYInput, (value, element) => ({ ...element, y: Math.max(0, Number(value) || 0) })],
    [overlayElementWidthInput, (value, element) => ({ ...element, autoWidth: false, width: Math.max(OVERLAY_DESIGNER_MIN_SIZE, Number(value) || element.width) })],
    [overlayElementHeightInput, (value, element) => ({ ...element, autoHeight: false, height: Math.max(OVERLAY_DESIGNER_MIN_SIZE, Number(value) || element.height) })],
    [overlayElementRotationInput, (value, element) => ({ ...element, rotation: clampOverlayDesignerNumber(value, -360, 360, element.rotation) })],
    [overlayElementOpacityInput, (value, element) => ({ ...element, opacity: clampOverlayDesignerNumber(value, 0, 1, element.opacity) })],
    [overlayElementFontFamilyInput, (value, element) => ({ ...element, fontFamily: String(value ?? "").trim() || element.fontFamily })],
    [overlayElementFontSizeInput, (value, element) => ({ ...element, fontSize: clampOverlayDesignerNumber(value, 10, 240, element.fontSize) })],
    [overlayElementFontWeightInput, (value, element) => ({ ...element, fontWeight: clampOverlayDesignerNumber(value, 100, 900, element.fontWeight) })],
    [overlayElementLetterSpacingInput, (value, element) => ({ ...element, letterSpacing: clampOverlayDesignerNumber(value, -4, 24, element.letterSpacing) })]
  ].forEach(([input, mapper]) => {
    const commit = () => {
      updateSelectedOverlayDesignerElement((element) => mapper(input.value, element));
      renderOverlayDesignerModal();
    };

    input?.addEventListener("change", commit);
    input?.addEventListener("blur", commit);
  });

  [
    [overlayElementAutoWidthInput, "autoWidth", overlayElementWidthInput],
    [overlayElementAutoHeightInput, "autoHeight", overlayElementHeightInput]
  ].forEach(([input, key, pairedInput]) => {
    input?.addEventListener("change", () => {
      updateSelectedOverlayDesignerElement((element) => ({
        ...element,
        [key]: Boolean(input.checked)
      }));
      if (pairedInput) {
        pairedInput.disabled = Boolean(input.checked);
      }
      renderOverlayDesignerModal();
    });
  });

  overlayDesignerCanvasPreset?.addEventListener("change", () => {
    const [width, height] = String(overlayDesignerCanvasPreset.value ?? "1920x1080")
      .split("x")
      .map((value) => Math.max(320, Number(value) || 0));
    updateActiveOverlayDesignerTemplate((template) => ({
      ...template,
      width,
      height
    }));
    renderOverlayDesignerModal();
  });

  overlayDesignerZoom?.addEventListener("change", () => {
    state.overlayDesignerZoom = Number(overlayDesignerZoom.value) || 1;
    renderOverlayDesignerModal();
  });
  overlayDesignerShowGridInput?.addEventListener("change", () => {
    state.overlayDesignerShowGrid = overlayDesignerShowGridInput.checked;
    renderOverlayDesignerModal();
  });
  overlayDesignerSnapGridInput?.addEventListener("change", () => {
    state.overlayDesignerSnapGrid = overlayDesignerSnapGridInput.checked;
  });
  overlayDesignerShowSafezoneInput?.addEventListener("change", () => {
    state.overlayDesignerShowSafezone = overlayDesignerShowSafezoneInput.checked;
    renderOverlayDesignerModal();
  });
  overlayDesignerLightThemeInput?.addEventListener("change", () => {
    state.overlayDesignerLightTheme = overlayDesignerLightThemeInput.checked;
    renderOverlayDesignerModal();
  });

  document.querySelectorAll("[data-overlay-add]").forEach((button) => {
    button.addEventListener("click", () => addOverlayDesignerElement(button.dataset.overlayAdd));
  });

  overlayDesignerLayerList?.addEventListener("click", (event) => {
    const selectButton = event.target.closest("[data-overlay-layer-select]");
    const visibleButton = event.target.closest("[data-overlay-layer-toggle-visible]");
    const lockButton = event.target.closest("[data-overlay-layer-toggle-lock]");
    const moveButton = event.target.closest("[data-overlay-layer-move]");
    const duplicateButton = event.target.closest("[data-overlay-layer-duplicate]");
    const deleteButton = event.target.closest("[data-overlay-layer-delete]");

    if (visibleButton) {
      event.stopPropagation();
      const elementId = visibleButton.dataset.overlayLayerToggleVisible;
      updateActiveOverlayDesignerTemplate((template) => ({
        ...template,
        elements: template.elements.map((element) => element.id === elementId ? { ...element, visible: !element.visible } : element)
      }));
      renderOverlayDesignerModal();
      return;
    }

    if (lockButton) {
      event.stopPropagation();
      const elementId = lockButton.dataset.overlayLayerToggleLock;
      updateActiveOverlayDesignerTemplate((template) => ({
        ...template,
        elements: template.elements.map((element) => element.id === elementId ? { ...element, locked: !element.locked } : element)
      }));
      renderOverlayDesignerModal();
      return;
    }

    if (moveButton) {
      event.stopPropagation();
      moveOverlayDesignerElementLayer(moveButton.dataset.overlayLayerMove, moveButton.dataset.overlayLayerDirection);
      renderOverlayDesignerModal();
      return;
    }

    if (duplicateButton) {
      event.stopPropagation();
      selectOverlayDesignerElement(duplicateButton.dataset.overlayLayerDuplicate);
      duplicateSelectedOverlayDesignerElement();
      return;
    }

    if (deleteButton) {
      event.stopPropagation();
      selectOverlayDesignerElement(deleteButton.dataset.overlayLayerDelete);
      deleteSelectedOverlayDesignerElement();
      return;
    }

    if (selectButton) {
      selectOverlayDesignerElement(selectButton.dataset.overlayLayerSelect);
    }
  });

  overlayDesignerNewTemplateButton?.addEventListener("click", () => {
    const newTemplate = createOverlayDesignerTemplate(`Overlay Template ${getOverlayDesignerTemplates().length + 1}`);
    pushOverlayDesignerHistory();
    applyOverlayDesignerSettings({
      overlayDesignerTemplates: [...getOverlayDesignerTemplates(), newTemplate],
      activeOverlayDesignerTemplateId: newTemplate.id
    }, { persist: "schedule" });
    state.overlayDesignerSelectedElementId = newTemplate.elements[0]?.id ?? "";
    renderOverlayDesignerModal();
  });

  overlayDesignerDuplicateTemplateButton?.addEventListener("click", () => {
    const template = getActiveOverlayDesignerTemplate();
    if (!template) {
      return;
    }
    const duplicate = {
      ...template,
      id: createOverlayDesignerId("overlay-template"),
      name: `${template.name} Copy`,
      builtinKey: "",
      elements: template.elements.map((element) => ({
        ...element,
        id: createOverlayDesignerId("overlay-element")
      }))
    };
    pushOverlayDesignerHistory();
    applyOverlayDesignerSettings({
      overlayDesignerTemplates: [...getOverlayDesignerTemplates(), duplicate],
      activeOverlayDesignerTemplateId: duplicate.id
    }, { persist: "schedule" });
    state.overlayDesignerSelectedElementId = duplicate.elements[0]?.id ?? "";
    renderOverlayDesignerModal();
  });

  overlayDesignerDeleteTemplateButton?.addEventListener("click", () => {
    const templates = getOverlayDesignerTemplates();
    if (templates.length <= 1) {
      showToast("Keep at least one overlay template.", "info");
      return;
    }

    const activeTemplateId = getActiveOverlayDesignerTemplateId();
    const remaining = templates.filter((template) => template.id !== activeTemplateId);
    pushOverlayDesignerHistory();
    applyOverlayDesignerSettings({
      overlayDesignerTemplates: remaining,
      activeOverlayDesignerTemplateId: remaining[0]?.id ?? ""
    }, { persist: "schedule" });
    state.overlayDesignerSelectedElementId = remaining[0]?.elements?.[0]?.id ?? "";
    renderOverlayDesignerModal();
  });

  overlayDesignerExportTemplateButton?.addEventListener("click", () => {
    const template = getActiveOverlayDesignerTemplate();
    if (!template) {
      return;
    }

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: "application/json" });
    const exportUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = exportUrl;
    anchor.download = `${template.name.replace(/[^a-z0-9-_]+/gi, "-").toLowerCase() || "overlay-template"}.json`;
    anchor.click();
    URL.revokeObjectURL(exportUrl);
  });

  overlayDesignerImportTemplateButton?.addEventListener("click", () => {
    overlayDesignerImportInput?.click();
  });

  overlayDesignerImportInput?.addEventListener("change", async () => {
    const file = overlayDesignerImportInput.files?.[0];
    if (!file) {
      return;
    }

    try {
      const raw = await file.text();
      const imported = JSON.parse(raw);
      const importedTemplates = Array.isArray(imported?.templates)
        ? normalizeOverlayDesignerTemplates(imported.templates)
        : [normalizeOverlayDesignerTemplates([imported])[0]];
      const firstTemplateId = importedTemplates[0]?.id ?? "";
      pushOverlayDesignerHistory();
      applyOverlayDesignerSettings({
        overlayDesignerTemplates: [...getOverlayDesignerTemplates(), ...importedTemplates],
        activeOverlayDesignerTemplateId: firstTemplateId
      }, { persist: "schedule" });
      state.overlayDesignerSelectedElementId = importedTemplates[0]?.elements?.[0]?.id ?? "";
      renderOverlayDesignerModal();
      showToast("Overlay template imported.", "success");
    } catch (error) {
      showToast(error.message || "Unable to import that overlay template.", "error");
    } finally {
      overlayDesignerImportInput.value = "";
    }
  });

  overlayDesignerUndoButton?.addEventListener("click", () => {
    const previous = state.overlayDesignerHistoryUndo.pop();
    if (!previous) {
      return;
    }
    state.overlayDesignerHistoryRedo.push(snapshotOverlayDesignerHistory());
    restoreOverlayDesignerHistory(previous, "undo");
  });

  overlayDesignerRedoButton?.addEventListener("click", () => {
    const next = state.overlayDesignerHistoryRedo.pop();
    if (!next) {
      return;
    }
    state.overlayDesignerHistoryUndo.push(snapshotOverlayDesignerHistory());
    restoreOverlayDesignerHistory(next, "redo");
  });

  overlayDesignerStage?.addEventListener("click", (event) => {
    const elementNode = event.target.closest("[data-overlay-element-id]");
    if (!elementNode) {
      selectOverlayDesignerElement("");
      return;
    }
    selectOverlayDesignerElement(elementNode.dataset.overlayElementId);
  });

  overlayDesignerStage?.addEventListener("dblclick", (event) => {
    const elementNode = event.target.closest("[data-overlay-element-id]");
    if (!elementNode) {
      return;
    }
    selectOverlayDesignerElement(elementNode.dataset.overlayElementId);
    duplicateSelectedOverlayDesignerElement();
  });

  overlayDesignerStage?.addEventListener("pointerdown", (event) => {
    const elementNode = event.target.closest("[data-overlay-element-id]");
    if (!elementNode) {
      return;
    }

    const elementId = elementNode.dataset.overlayElementId;
    const selectedElement = getActiveOverlayDesignerTemplate()?.elements.find((element) => element.id === elementId);
    if (!selectedElement || selectedElement.locked) {
      return;
    }

    selectOverlayDesignerElement(elementId);
    const handleType = event.target.dataset.overlayHandle || "move";
    state.overlayDesignerPointerState = {
      elementId,
      mode: handleType === "resize" ? "resize" : handleType === "rotate" ? "rotate" : "move",
      startX: event.clientX,
      startY: event.clientY,
      origin: { ...selectedElement }
    };
    elementNode.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  window.addEventListener("pointermove", (event) => {
    const pointerState = state.overlayDesignerPointerState;
    if (!pointerState) {
      return;
    }

    const deltaX = (event.clientX - pointerState.startX) / state.overlayDesignerZoom;
    const deltaY = (event.clientY - pointerState.startY) / state.overlayDesignerZoom;

    updateSelectedOverlayDesignerElement((element) => {
      if (element.id !== pointerState.elementId) {
        return element;
      }

      if (pointerState.mode === "resize") {
        return {
          ...element,
          autoWidth: false,
          autoHeight: false,
          width: Math.max(OVERLAY_DESIGNER_MIN_SIZE, applyOverlayDesignerSnap(pointerState.origin.width + deltaX)),
          height: Math.max(OVERLAY_DESIGNER_MIN_SIZE, applyOverlayDesignerSnap(pointerState.origin.height + deltaY))
        };
      }

      if (pointerState.mode === "rotate") {
        return {
          ...element,
          rotation: clampOverlayDesignerNumber(pointerState.origin.rotation + (deltaX * 0.65), -360, 360, pointerState.origin.rotation)
        };
      }

      return {
        ...element,
        x: Math.max(0, applyOverlayDesignerSnap(pointerState.origin.x + deltaX)),
        y: Math.max(0, applyOverlayDesignerSnap(pointerState.origin.y + deltaY))
      };
    }, { persist: "schedule" });
    renderOverlayDesignerModal();
  });

  window.addEventListener("pointerup", () => {
    state.overlayDesignerPointerState = null;
  });

  window.addEventListener("keydown", (event) => {
    if (overlayDesignerModal?.hidden) {
      return;
    }

    if (isEditableDesignerTarget(event.target)) {
      return;
    }

    if ((event.key === "Delete" || event.key === "Backspace") && getSelectedOverlayDesignerElement()) {
      deleteSelectedOverlayDesignerElement();
      event.preventDefault();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d" && getSelectedOverlayDesignerElement()) {
      duplicateSelectedOverlayDesignerElement();
      event.preventDefault();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      if (event.shiftKey) {
        overlayDesignerRedoButton?.click();
      } else {
        overlayDesignerUndoButton?.click();
      }
      event.preventDefault();
      return;
    }

    const selectedElement = getSelectedOverlayDesignerElement();
    if (!selectedElement || selectedElement.locked) {
      return;
    }

    const movement = event.shiftKey ? 10 : 1;
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
      updateSelectedOverlayDesignerElement((element) => ({
        ...element,
        x: event.key === "ArrowLeft" ? Math.max(0, element.x - movement) : event.key === "ArrowRight" ? element.x + movement : element.x,
        y: event.key === "ArrowUp" ? Math.max(0, element.y - movement) : event.key === "ArrowDown" ? element.y + movement : element.y
      }), { persist: "schedule" });
      renderOverlayDesignerModal();
      event.preventDefault();
    }
  });
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
        votingEnabledInput,
        votingStartRoleInput,
        votingOverlayOrientationInput,
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
        void refreshElevenLabsUsage({ force: element === ttsProviderSelect || element === ttsElevenApiKeyInput });
        updateVotingStatus();
        updateVoteOverlayControls();
        syncVoteOverlayState();
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

  ttsElevenApiKeyInput?.addEventListener("input", () => {
    if (ttsProviderSelect.value !== "elevenlabs") {
      return;
    }

    elevenLabsUsageState.data = null;
    elevenLabsUsageState.error = "";
    elevenLabsUsageState.apiKey = getResolvedElevenLabsApiKey();
    renderElevenLabsUsagePanel();
    scheduleElevenLabsUsageRefresh();
  });

  ttsElevenLabsRefreshButton?.addEventListener("click", () => {
    void refreshElevenLabsUsage({ force: true });
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

  votingTestButton?.addEventListener("click", () => {
    startVotingOverlayTest();
  });
  ttsVolumeInput.addEventListener("input", updateRatePitchVolumeLabels);

  ttsTestButton.addEventListener("click", () => {
    const testPhrase = ttsProviderSelect.value === "elevenlabs"
      ? "Stream Sync Pro LIVE model comparison. This voice should sound consistent, clear, and expressive across a longer test phrase."
      : "Stream Sync Pro LIVE voice test.";
    enqueueSpeech(testPhrase);
  });

  ttsManageUserVoicesButton.addEventListener("click", () => {
    void openTtsVoiceManagerModal().catch((error) => {
      showToast(error.message || "Unable to open the custom TTS voice manager.", "error");
    });
  });

    tiktokRefreshEmotesButton?.addEventListener("click", () => {
      void refreshAuthenticatedTikTokEmotes().catch((error) => {
        setStatusMessage(tiktokSessionStatus, "error", error.message || "Unable to refresh TikTok emotes.");
        showToast(error.message || "Unable to refresh TikTok emotes.", "error");
      });
    });

    tiktokSigninButton?.addEventListener("click", () => {
      void (async () => {
        try {
          setStatusMessage(tiktokSessionStatus, "info", "Opening TikTok sign-in...");
          const result = await app.beginTikTokSignIn();
          const sessionId = String(result?.sessionId ?? "").trim();
          const ttTargetIdc = String(result?.ttTargetIdc ?? "").trim();
          if (!sessionId || !ttTargetIdc) {
            throw new Error("TikTok sign-in completed, but the required cookies were not captured.");
          }
          await persistSettings({ tiktokSessionId: sessionId, tiktokTargetIdc: ttTargetIdc });
          updateTikTokSessionUi();
          showToast("TikTok sign-in connected.", "success");
        } catch (error) {
          updateTikTokSessionUi();
          setStatusMessage(tiktokSessionStatus, "error", error.message || "Unable to sign in to TikTok.");
          showToast(error.message || "Unable to sign in to TikTok.", "error");
        }
      })();
    });

    tiktokSignoutButton?.addEventListener("click", () => {
      void (async () => {
        try {
          await app.signOutTikTok();
          await persistSettings({ tiktokSessionId: "", tiktokTargetIdc: "" });
          updateTikTokSessionUi();
          showToast("TikTok sign-in removed.", "success");
        } catch (error) {
          setStatusMessage(tiktokSessionStatus, "error", error.message || "Unable to sign out of TikTok.");
          showToast(error.message || "Unable to sign out of TikTok.", "error");
        }
      })();
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
    const providerKey = ttsVoiceManagerModal?.dataset.providerKey || getCurrentTtsProviderKey();
    if (!state.voices.length) {
      await loadVoices();
      renderTtsVoiceManager();
    }
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

    await saveUserAssignedTtsVoice(normalizedUser, voiceValue, providerKey);
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
        const row = saveButton.closest("[data-tts-voice-user]");
        const userKey = saveButton.dataset.ttsVoiceSave;
        const providerKey = saveButton.dataset.ttsVoiceProvider || row?.dataset.ttsVoiceProvider || ttsVoiceManagerModal?.dataset.providerKey || getCurrentTtsProviderKey();
        const select = row?.querySelector("[data-tts-voice-select]");
        const voiceValue = String(select?.value ?? "").trim();

        if (!voiceValue) {
          showToast("Choose a voice before saving this assignment.", "error");
          select?.focus();
          return;
        }

        await saveUserAssignedTtsVoice(userKey, voiceValue, providerKey);
        renderTtsVoiceManager();
        showToast(`Updated the custom TTS voice for @${userKey}.`, "success");
        return;
      }

      if (removeButton) {
        const row = removeButton.closest("[data-tts-voice-user]");
        const userKey = removeButton.dataset.ttsVoiceRemove;
        const providerKey = removeButton.dataset.ttsVoiceProvider || row?.dataset.ttsVoiceProvider || ttsVoiceManagerModal?.dataset.providerKey || getCurrentTtsProviderKey();
        await removeUserAssignedTtsVoice(userKey, providerKey);
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
      void ensureSoundCatalog();
      void refreshKnownTikTokGiftCatalog();
      const nextRule = createDraftRule();
      state.settings.customEventRules = [...state.settings.customEventRules, nextRule];
      state.activeCustomRuleId = nextRule.id;
      resetCustomRuleFilters();
      openEventActionsWorkspace({ preferInline: true });
      renderCustomRules();
      await persistSettings({ customEventRules: state.settings.customEventRules });
      focusCustomRuleEditor(nextRule.id);
    });

  customRuleSearchInput?.addEventListener("input", (event) => {
    state.customRuleSearchText = String(event.target.value ?? "");
    renderCustomRules();
  });

  customRuleAudienceFilterInput?.addEventListener("change", (event) => {
    state.customRuleAudienceFilter = String(event.target.value ?? "all") || "all";
    renderCustomRules();
  });

  customRuleTriggerFilterInput?.addEventListener("change", (event) => {
    state.customRuleTriggerFilter = String(event.target.value ?? "all") || "all";
    renderCustomRules();
  });

  customRuleList.addEventListener("click", async (event) => {
    const target = event.target.closest("button");
    if (!target) {
      return;
    }

        const editId = target.dataset.customEdit;
        if (editId) {
          void refreshKnownTikTokGiftCatalog();
          state.activeCustomRuleId = editId;
          resetCustomRuleFilters();
          openEventActionsWorkspace({ preferInline: true });
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

    const duplicateId = target.dataset.customDuplicate;
    if (duplicateId) {
      const sourceRule = state.settings.customEventRules.find((rule) => rule.id === duplicateId);
      if (!sourceRule) {
        return;
      }

      const duplicatedRule = createDuplicateRule(getEffectiveCustomRule(duplicateId) ?? sourceRule);
      state.settings.customEventRules = [...state.settings.customEventRules, duplicatedRule];
      state.activeCustomRuleId = duplicatedRule.id;
      resetCustomRuleFilters();
      openEventActionsWorkspace({ preferInline: true });
      renderCustomRules();
      await persistSettings({ customEventRules: state.settings.customEventRules });
      focusCustomRuleEditor(duplicatedRule.id);
      showToast("Custom event action duplicated.", "success");
      return;
    }

    const previewSoundId = target.dataset.customPreviewSound;
    if (previewSoundId) {
      await ensureSoundCatalog();
      await previewCustomRuleSound(previewSoundId);
      return;
    }

    const giftRefreshRuleId = target.dataset.ruleGiftRefresh;
    if (giftRefreshRuleId) {
      setGiftTriggerStatus(giftRefreshRuleId, "Refreshing gifts from TikTok LIVE...");
      const result = await refreshKnownTikTokGiftCatalog(usernameInput?.value || state.username || state.settings?.rememberedUsername || "");
      renderGiftOptionList(giftRefreshRuleId, document.querySelector(`[data-rule-gift-search="${giftRefreshRuleId}"]`)?.value ?? "");
      if (result?.gifts?.length) {
        setGiftTriggerStatus(giftRefreshRuleId, `Loaded ${result.gifts.length} gifts from the current TikTok LIVE room.`);
      } else if (result?.error) {
        setGiftTriggerStatus(giftRefreshRuleId, result.error);
      } else {
        setGiftTriggerStatus(giftRefreshRuleId, "No TikTok gift catalog was returned for this room.");
      }
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
      const userCooldownInput = document.querySelector(`[data-rule-user-cooldown="${saveId}"]`);
      const soundSelect = document.querySelector(`[data-rule-sound-select="${saveId}"]`);
      const queueSelect = document.querySelector(`[data-rule-queue="${saveId}"]`);
      const webhookUrlInput = document.querySelector(`[data-rule-webhook-url="${saveId}"]`);
      const feedbackOverlayEnabledInput = document.querySelector(`[data-rule-feedback-overlay-enabled="${saveId}"]`);
      const feedbackOverlayTitleInput = document.querySelector(`[data-rule-feedback-overlay-title="${saveId}"]`);
      const feedbackOverlayMessageInput = document.querySelector(`[data-rule-feedback-overlay-message="${saveId}"]`);
      const feedbackOverlayAccentInput = document.querySelector(`[data-rule-feedback-overlay-accent="${saveId}"]`);
      const triggerAudienceInput = document.querySelector(`input[data-rule-trigger-audience="${saveId}"]:checked`);
      const triggerUsernameInput = document.querySelector(`[data-rule-trigger-username="${saveId}"]`);
      const triggerGiftNameInput = document.querySelector(`[data-rule-gift-name="${saveId}"]`);
      const triggerGiftImageUrlInput = document.querySelector(`[data-rule-gift-image-url="${saveId}"]`);
      const triggerEmoteIdInput = document.querySelector(`[data-rule-emote-id-input="${saveId}"]`);
      const triggerEmoteNameInput = document.querySelector(`[data-rule-emote-name-input="${saveId}"]`);
      const triggerEmoteImageUrlInput = document.querySelector(`[data-rule-emote-image-url-input="${saveId}"]`);
      const webhookUrl = webhookUrlInput?.value?.trim() ?? "";
      const triggerAudience = triggerAudienceInput?.value ?? "everyone";
      const triggerUsername = normalizeUserKey(triggerUsernameInput?.value ?? "");
      const metric = metricInput?.value ?? "follows";
      const triggerGiftName = String(triggerGiftNameInput?.value ?? "").trim();
      const triggerGiftImageUrl = String(triggerGiftImageUrlInput?.value ?? "").trim();
      const triggerEmoteId = String(triggerEmoteIdInput?.value ?? "").trim();
      const triggerEmoteName = String(triggerEmoteNameInput?.value ?? "").trim();
      const triggerEmoteImageUrl = String(triggerEmoteImageUrlInput?.value ?? "").trim();
      const feedbackOverlayEnabled = Boolean(feedbackOverlayEnabledInput?.checked);
      const feedbackOverlayTitle = String(feedbackOverlayTitleInput?.value ?? "").trim();
      const feedbackOverlayMessage = String(feedbackOverlayMessageInput?.value ?? "").trim();
      const feedbackOverlayAccentColor = normalizeOverlayAccentColor(feedbackOverlayAccentInput?.value ?? "");

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

      if (metric === "specificGift" && !triggerGiftName) {
        showToast("Choose a gift before saving this trigger.", "error");
        return;
      }

      if ((metric === "subEmote" || metric === "fanEmote") && !triggerEmoteName) {
        showToast("Choose an emote before saving this trigger.", "error");
        return;
      }

      const updatedRule = normalizeRule({
        ...state.settings.customEventRules[ruleIndex],
        name: nameInput?.value ?? "",
        metric,
        threshold: Number(thresholdInput?.value ?? 1),
        userCooldownSeconds: Math.max(0, Number(userCooldownInput?.value ?? 0) || 0),
        enabled: document.querySelector(`[data-rule-enabled-toggle="${saveId}"]`)?.checked
          ?? document.querySelector(`[data-custom-toggle="${saveId}"]`)?.checked
          ?? (state.settings.customEventRules[ruleIndex]?.enabled !== false),
        queueId: normalizeQueueId(queueSelect?.value ?? 1, 1),
        soundId: soundSelect?.value ?? "",
        webhookUrl,
        feedbackOverlayEnabled,
        feedbackOverlayTitle: feedbackOverlayEnabled ? feedbackOverlayTitle : "",
        feedbackOverlayMessage: feedbackOverlayEnabled ? feedbackOverlayMessage : "",
        feedbackOverlayAccentColor: feedbackOverlayEnabled ? feedbackOverlayAccentColor : "#53dcff",
        triggerAudience,
        triggerUsername,
        triggerEmoteId: metric === "subEmote" || metric === "fanEmote" ? triggerEmoteId : "",
        triggerEmoteName: metric === "subEmote" || metric === "fanEmote" ? triggerEmoteName : "",
        triggerEmoteImageUrl: metric === "subEmote" || metric === "fanEmote" ? triggerEmoteImageUrl : "",
        triggerGiftName: metric === "specificGift" ? triggerGiftName : "",
        triggerGiftImageUrl: metric === "specificGift" ? triggerGiftImageUrl : ""
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
    if (searchId) {
      void refreshRuleSoundOptions(searchId, event.target.value);
      return;
    }

    const giftSearchRuleId = event.target.dataset.ruleGiftSearch;
    if (giftSearchRuleId) {
      renderGiftOptionList(giftSearchRuleId, event.target.value);
      return;
    }

    const emoteSearchRuleId = event.target.dataset.ruleEmoteSearch;
    if (emoteSearchRuleId) {
      const metric = document.querySelector(`input[data-rule-metric="${emoteSearchRuleId}"]:checked`)?.value ?? "subEmote";
      renderEmoteOptionList(emoteSearchRuleId, metric, event.target.value);
    }
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
      if (event.target.value === "subEmote" || event.target.value === "fanEmote") {
        const emoteSearchInput = document.querySelector(`[data-rule-emote-search="${metricRuleId}"]`);
        renderEmoteOptionList(metricRuleId, event.target.value, emoteSearchInput?.value ?? "");
      }
      return;
    }

    const feedbackOverlayRuleId = event.target.dataset.ruleFeedbackOverlayEnabled;
    if (feedbackOverlayRuleId) {
      updateFeedbackOverlayVisibility(feedbackOverlayRuleId, Boolean(event.target.checked));
      return;
    }

    const toggleId = event.target.dataset.customToggle || event.target.dataset.ruleEnabledToggle;
    if (!toggleId) {
      return;
    }

    const nextEnabled = Boolean(event.target.checked);
    state.settings.customEventRules = state.settings.customEventRules.map((rule) =>
      rule.id === toggleId ? normalizeRule({ ...rule, enabled: nextEnabled }) : rule
    );
    clearRuleTriggerState(toggleId);
    await persistSettings({ customEventRules: state.settings.customEventRules });
    renderCustomRules();
    showToast(`Custom action ${nextEnabled ? "enabled" : "disabled"}.`, "success");
  });

  customRuleList.addEventListener("click", (event) => {
    const emoteOption = event.target.closest("[data-rule-emote-option]");
    if (emoteOption) {
      const ruleId = emoteOption.dataset.ruleEmoteOption;
      const emoteId = String(emoteOption.dataset.ruleEmoteId ?? "").trim();
      const emoteName = String(emoteOption.dataset.ruleEmoteName ?? "").trim();
      const emoteImageUrl = String(emoteOption.dataset.ruleEmoteImageUrl ?? "").trim();
      const metric = document.querySelector(`input[data-rule-metric="${ruleId}"]:checked`)?.value ?? "subEmote";
      const emoteIdInput = document.querySelector(`[data-rule-emote-id-input="${ruleId}"]`);
      const emoteNameInput = document.querySelector(`[data-rule-emote-name-input="${ruleId}"]`);
      const emoteImageUrlInput = document.querySelector(`[data-rule-emote-image-url-input="${ruleId}"]`);
      const dropdown = document.querySelector(`[data-rule-emote-dropdown="${ruleId}"]`);
      const emoteSearchInput = document.querySelector(`[data-rule-emote-search="${ruleId}"]`);

      if (emoteIdInput) {
        emoteIdInput.value = emoteId;
      }
      if (emoteNameInput) {
        emoteNameInput.value = emoteName;
      }
      if (emoteImageUrlInput) {
        emoteImageUrlInput.value = emoteImageUrl;
      }
      renderEmoteOptionList(ruleId, metric, emoteSearchInput?.value ?? "");
      if (dropdown) {
        dropdown.open = false;
      }
      return;
    }

    const giftOption = event.target.closest("[data-rule-gift-option]");
    if (!giftOption) {
      return;
    }

    const ruleId = giftOption.dataset.ruleGiftOption;
    const giftName = String(giftOption.dataset.giftName ?? "").trim();
    const giftImageUrl = String(giftOption.dataset.giftImageUrl ?? "").trim();
    const giftNameInput = document.querySelector(`[data-rule-gift-name="${ruleId}"]`);
    const giftImageUrlInput = document.querySelector(`[data-rule-gift-image-url="${ruleId}"]`);
    const selectedCard = document.querySelector(`[data-rule-gift-selected="${ruleId}"]`);
    const dropdown = document.querySelector(`[data-rule-gift-dropdown="${ruleId}"]`);
    const giftSearchInput = document.querySelector(`[data-rule-gift-search="${ruleId}"]`);

    if (giftNameInput) {
      giftNameInput.value = giftName;
    }
    if (giftImageUrlInput) {
      giftImageUrlInput.value = giftImageUrl;
    }
    if (selectedCard) {
      selectedCard.innerHTML = getGiftSelectorSummaryMarkup({
        triggerGiftName: giftName,
        triggerGiftImageUrl: giftImageUrl
      });
    }
    renderGiftOptionList(ruleId, giftSearchInput?.value ?? "");
    if (dropdown) {
      dropdown.open = false;
    }
  });
}

function wireAppEvents() {
  app.onStatus((payload) => {
    if (payload?.connectionState) {
      state.connected = Boolean(payload.connectionState.connected);
      state.username = payload.connectionState.username ?? "";
      state.roomId = payload.connectionState.roomId ?? null;
      state.statState.viewerCount = Number.isFinite(Number(payload.connectionState.viewerCount))
        ? Math.trunc(Number(payload.connectionState.viewerCount))
        : null;

      if (!state.connected) {
        state.connecting = false;
        clearHostedFeedOverlayState();
        resetSessionMetrics();
      }

      updateHeaderPills();
      setConnectionUiState();
      updateStats();
    }

    const toastPayload = sanitizeStatusToastPayload(payload);
    if (payload?.connectionState && payload.connectionState.connected === false) {
      state.connected = false;
      state.roomId = null;
      clearLiveInteractionState();
      clearHostedFeedOverlayState();
      resetSessionMetrics();
      updateHeaderPills();
      setConnectionUiState();
    }
    if (!toastPayload.suppress) {
      showToast(toastPayload.message, toastPayload.level);
    }
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
  state.statState.viewerCount = Number.isFinite(Number(connectionState?.viewerCount))
    ? Math.trunc(Number(connectionState.viewerCount))
    : null;

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
    loadOverlayInfoBundle(),
    loadOverlayDesignerInfo()
  ]);

  void refreshKnownTikTokGiftCatalog();

  updateTtsStatus();
  updateTranslationStatus();
  updateUpdateStatus();
  renderChatList();
  syncQueueOverlayState();
  syncChatOverlayState();
  syncGiftOverlayState();
  syncLikesOverlayState();
  syncViewerStatsOverlayState();
  syncVoteOverlayState();
}

wireHeaderEvents();
wireAuthEvents();
wireChatToolbarEvents();
wireTabEvents();
wireOverlayDesignerEvents();
wireSettingsEvents();
wireCustomRuleEvents();
wireAppEvents();
initializeCollapsibleCards();
applyMainScreenPinnedCards();
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
