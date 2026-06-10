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
const openGamesLayerButton = document.getElementById("open-games-layer-button");
const openUsersLayerButton = document.getElementById("open-users-layer-button");
const topupCreditsButton = document.getElementById("topup-credits-button");

// Connection controls
const connectForm = document.getElementById("connect-form");
const usernameInput = document.getElementById("username");
const rememberedUsernamesList = document.getElementById("remembered-usernames");
const connectButton = document.getElementById("connect-button");
const rememberUsernameInput = document.getElementById("remember-username");
const autoConnectInput = document.getElementById("auto-connect");
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
const gamesTabButton = document.getElementById("games-tab-button");
const usersTabButton = document.getElementById("users-tab-button");
const eventActionsTabButton = document.getElementById("event-actions-tab-button");
const controlsTabPanel = document.getElementById("controls-tab-panel");
const overlaysTabPanel = document.getElementById("overlays-tab-panel");
const gamesTabPanel = document.getElementById("games-tab-panel");
const usersTabPanel = document.getElementById("users-tab-panel");
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
const viewerPointsEnabledInput = document.getElementById("viewer-points-enabled");
const viewerPointsLikeInput = document.getElementById("viewer-points-like");
const viewerPointsCommentInput = document.getElementById("viewer-points-comment");
const viewerPointsShareInput = document.getElementById("viewer-points-share");
const viewerPointsFollowInput = document.getElementById("viewer-points-follow");
const viewerPointsGiftInput = document.getElementById("viewer-points-gift");
const viewerPointsCoinInput = document.getElementById("viewer-points-coin");
const viewerPointsSubEmoteInput = document.getElementById("viewer-points-sub-emote");
const viewerPointsFanEmoteInput = document.getElementById("viewer-points-fan-emote");
const viewerPointsSubscriberMultiplierInput = document.getElementById("viewer-points-subscriber-multiplier");
const viewerPointsAdjustUsernameInput = document.getElementById("viewer-points-adjust-username");
const viewerPointsAdjustAmountInput = document.getElementById("viewer-points-adjust-amount");
const viewerPointsAddButton = document.getElementById("viewer-points-add");
const viewerPointsRemoveButton = document.getElementById("viewer-points-remove");
const viewerPointsSearchInput = document.getElementById("viewer-points-search");
const viewerPointsRoleFilterInput = document.getElementById("viewer-points-role-filter");
const viewerPointsBalanceFilterInput = document.getElementById("viewer-points-balance-filter");
const viewerPointsBirthdayFilterInput = document.getElementById("viewer-points-birthday-filter");
const viewerPointsClearFilterButton = document.getElementById("viewer-points-clear-filter");
const viewerPointsLeaderboardList = document.getElementById("viewer-points-leaderboard-list");
const viewerPointsUsersTableBody = document.getElementById("viewer-points-users-table-body");
const viewerPointsPrevPageButton = document.getElementById("viewer-points-prev-page");
const viewerPointsNextPageButton = document.getElementById("viewer-points-next-page");
const viewerPointsPageStatus = document.getElementById("viewer-points-page-status");
const viewerPointsResetButton = document.getElementById("viewer-points-reset");
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
  { giftName: "Heart Me", coinValue: 1, source: "builtin" },
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
const ttsReadPunctuationInput = document.getElementById("tts-read-punctuation");
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
const ttsXttsServiceUrlField = document.getElementById("tts-xtts-service-url-field");
const ttsXttsServiceUrlInput = document.getElementById("tts-xtts-service-url");
const ttsXttsServiceActions = document.getElementById("tts-xtts-service-actions");
const ttsXttsStartServiceButton = document.getElementById("tts-xtts-start-service");
const ttsXttsCheckServiceButton = document.getElementById("tts-xtts-check-service");
const ttsXttsOpenHelpButton = document.getElementById("tts-xtts-open-help");
const ttsXttsSplitSentencesField = document.getElementById("tts-xtts-split-sentences-field");
const ttsXttsSplitSentencesInput = document.getElementById("tts-xtts-split-sentences");
const ttsXttsLanguageField = document.getElementById("tts-xtts-language-field");
const ttsXttsLanguageSelect = document.getElementById("tts-xtts-language");
const ttsCachePanel = document.getElementById("tts-cache-panel");
const ttsCacheRefreshButton = document.getElementById("tts-cache-refresh");
const ttsCacheClearButton = document.getElementById("tts-cache-clear");
const ttsCacheStatus = document.getElementById("tts-cache-status");
const ttsXttsVoiceBuilder = document.getElementById("tts-xtts-voice-builder");
const ttsXttsVoiceNameInput = document.getElementById("tts-xtts-voice-name");
const ttsXttsSampleFileInput = document.getElementById("tts-xtts-sample-file");
const ttsXttsSampleBrowseButton = document.getElementById("tts-xtts-sample-browse");
const ttsXttsYoutubeUrlInput = document.getElementById("tts-xtts-youtube-url");
const ttsXttsCreateVoiceButton = document.getElementById("tts-xtts-create-voice");
const ttsXttsAddSampleButton = document.getElementById("tts-xtts-add-sample");
const ttsXttsDeleteVoiceButton = document.getElementById("tts-xtts-delete-voice");
const ttsXttsExportVoiceButton = document.getElementById("tts-xtts-export-voice");
const ttsXttsImportVoiceButton = document.getElementById("tts-xtts-import-voice");
const ttsXttsVoiceTuning = document.getElementById("tts-xtts-voice-tuning");
const ttsXttsStrengthInput = document.getElementById("tts-xtts-strength");
const ttsXttsEchoInput = document.getElementById("tts-xtts-echo");
const ttsXttsReverbInput = document.getElementById("tts-xtts-reverb");
const ttsXttsRoboticInput = document.getElementById("tts-xtts-robotic");
const ttsXttsRateInput = document.getElementById("tts-xtts-rate");
const ttsXttsPitchInput = document.getElementById("tts-xtts-pitch");
const ttsXttsStrengthValue = document.getElementById("tts-xtts-strength-value");
const ttsXttsEchoValue = document.getElementById("tts-xtts-echo-value");
const ttsXttsReverbValue = document.getElementById("tts-xtts-reverb-value");
const ttsXttsRoboticValue = document.getElementById("tts-xtts-robotic-value");
const ttsXttsRateValue = document.getElementById("tts-xtts-rate-value");
const ttsXttsPitchValue = document.getElementById("tts-xtts-pitch-value");
const ttsXttsRenameInput = document.getElementById("tts-xtts-rename-input");
const ttsXttsSaveTuningButton = document.getElementById("tts-xtts-save-tuning");
const ttsXttsResetTuningButton = document.getElementById("tts-xtts-reset-tuning");
const ttsXttsRenameVoiceButton = document.getElementById("tts-xtts-rename-voice");
const ttsXttsDeleteTuningVoiceButton = document.getElementById("tts-xtts-delete-tuning-voice");
const ttsXttsTuningStatus = document.getElementById("tts-xtts-tuning-status");
const ttsVoiceSelect = document.getElementById("tts-voice");
const ttsVoiceLockGiftSelect = document.getElementById("tts-voice-lock-gift");
const ttsVoiceLockGiftDropdown = document.getElementById("tts-voice-lock-gift-dropdown");
const ttsVoiceLockGiftSelected = document.getElementById("tts-voice-lock-gift-selected");
const ttsVoiceLockGiftSearch = document.getElementById("tts-voice-lock-gift-search");
const ttsVoiceLockGiftOptions = document.getElementById("tts-voice-lock-gift-options");
const ttsQueueSelect = document.getElementById("tts-queue");
const ttsRateInput = document.getElementById("tts-rate");
const ttsPitchInput = document.getElementById("tts-pitch");
const ttsVolumeInput = document.getElementById("tts-volume");
const ttsRateValue = document.getElementById("tts-rate-value");
const ttsPitchValue = document.getElementById("tts-pitch-value");
const ttsVolumeValue = document.getElementById("tts-volume-value");
const ttsTestTextInput = document.getElementById("tts-test-text");
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
const ttsQueuePausedInput = document.getElementById("tts-queue-paused");
const ttsSlowModeSecondsInput = document.getElementById("tts-slowmode-seconds");
const ttsCooldownSecondsInput = document.getElementById("tts-cooldown-seconds");
const ttsMutedUsersInput = document.getElementById("tts-muted-users");
const ttsShadowMutedUsersInput = document.getElementById("tts-shadow-muted-users");
const ttsBlockedWordsInput = document.getElementById("tts-blocked-words");
const ttsActiveTimeoutsInput = document.getElementById("tts-active-timeouts");
const ttsLockButton = document.getElementById("tts-lock-button");
const ttsUnlockButton = document.getElementById("tts-unlock-button");
const ttsSkipButton = document.getElementById("tts-skip-button");
const ttsClearButton = document.getElementById("tts-clear-button");
const ttsClearTimeoutsButton = document.getElementById("tts-clear-timeouts-button");
const ttsModLogList = document.getElementById("tts-mod-log-list");
const ttsModLogClearButton = document.getElementById("tts-mod-log-clear");
const ttsModerationFilterInputs = {
  blockedWords: document.getElementById("tts-filter-blocked-words"),
  urls: document.getElementById("tts-filter-urls"),
  privateInfo: document.getElementById("tts-filter-private-info"),
  fakeDonation: document.getElementById("tts-filter-fake-donation"),
  unsafeInstructions: document.getElementById("tts-filter-unsafe-instructions"),
  unicodeAbuse: document.getElementById("tts-filter-unicode-abuse"),
  repeatedCharacters: document.getElementById("tts-filter-repeated-characters"),
  repeatedWords: document.getElementById("tts-filter-repeated-words"),
  excessiveCaps: document.getElementById("tts-filter-excessive-caps"),
  excessiveEmojis: document.getElementById("tts-filter-excessive-emojis"),
  obfuscatedBypass: document.getElementById("tts-filter-obfuscated-bypass")
};
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
const likeRaceEnabledInput = document.getElementById("like-race-enabled");
const likeRaceStatusPill = document.getElementById("like-race-status-pill");
const likeRaceStartButton = document.getElementById("like-race-start-button");
const likeRaceEndButton = document.getElementById("like-race-end-button");
const likeRaceResetButton = document.getElementById("like-race-reset-button");
const likeRaceTestOverlayButton = document.getElementById("like-race-test-overlay-button");
const likeRaceTestTtsButton = document.getElementById("like-race-test-tts-button");
const likeRaceCountdownInput = document.getElementById("like-race-countdown");
const likeRaceDistanceInput = document.getElementById("like-race-distance");
const likeRaceLikeMultiplierInput = document.getElementById("like-race-like-multiplier");
const likeRaceGiftMultiplierInput = document.getElementById("like-race-gift-multiplier");
const likeRaceMaxRacersInput = document.getElementById("like-race-max-racers");
const likeRaceInactiveTimeoutInput = document.getElementById("like-race-inactive-timeout");
const likeRaceCentreMessageSecondsInput = document.getElementById("like-race-centre-message-seconds");
const likeRaceOverlayAutoHideSecondsInput = document.getElementById("like-race-overlay-auto-hide-seconds");
const likeRaceStartRoleInput = document.getElementById("like-race-start-role");
const likeRaceCommentaryStyleInput = document.getElementById("like-race-commentary-style");
const likeRaceCountdownSoundSearchInput = document.getElementById("like-race-countdown-sound-search");
const likeRaceCountdownSoundInput = document.getElementById("like-race-countdown-sound");
const likeRaceCountdownSoundOptions = document.getElementById("like-race-countdown-sound-options");
const likeRaceCountdownSoundPreviewButton = document.getElementById("like-race-countdown-sound-preview");
const likeRaceFinishSoundSearchInput = document.getElementById("like-race-finish-sound-search");
const likeRaceFinishSoundInput = document.getElementById("like-race-finish-sound");
const likeRaceFinishSoundOptions = document.getElementById("like-race-finish-sound-options");
const likeRaceFinishSoundPreviewButton = document.getElementById("like-race-finish-sound-preview");
const likeRaceAllowLateJoinsInput = document.getElementById("like-race-allow-late-joins");
const likeRaceAutoRemoveInactiveInput = document.getElementById("like-race-auto-remove-inactive");
const likeRaceAnimationsInput = document.getElementById("like-race-animations");
const likeRaceTtsEnabledInput = document.getElementById("like-race-tts-enabled");
const likeRaceSillyCommentaryInput = document.getElementById("like-race-silly-commentary");
const likeRaceHypeCommentaryInput = document.getElementById("like-race-hype-commentary");
const likeRaceRoastCommentaryInput = document.getElementById("like-race-roast-commentary");
const likeRaceFamilyFilterInput = document.getElementById("like-race-family-filter");
const likeRaceDisqualifyEarlyTappersInput = document.getElementById("like-race-disqualify-early-tappers");
const likeRaceTrackColorInput = document.getElementById("like-race-track-color");
const likeRaceAccentColorInput = document.getElementById("like-race-accent-color");
const likeRaceAvatarSizeInput = document.getElementById("like-race-avatar-size");
const likeRaceUsernameSizeInput = document.getElementById("like-race-username-size");
const likeRaceOverlayOpacityInput = document.getElementById("like-race-overlay-opacity");
const likeRaceBackgroundColorInput = document.getElementById("like-race-background-color");
const likeRaceBackgroundImageInput = document.getElementById("like-race-background-image");
const likeRaceTitleColorInput = document.getElementById("like-race-title-color");
const likeRaceTitleSizeInput = document.getElementById("like-race-title-size");
const likeRaceLabelColorInput = document.getElementById("like-race-label-color");
const likeRaceLabelSizeInput = document.getElementById("like-race-label-size");
const likeRaceMutedColorInput = document.getElementById("like-race-muted-color");
const likeRaceCommentarySizeInput = document.getElementById("like-race-commentary-size");
const likeRaceOverlayUrlInput = document.getElementById("like-race-overlay-url");
const likeRaceOverlayCopyButton = document.getElementById("like-race-overlay-copy");
const likeRaceOverlayOpenButton = document.getElementById("like-race-overlay-open");
const likeRaceOverlayTestButton = document.getElementById("like-race-overlay-test");
const likeRaceCommentaryList = document.getElementById("like-race-commentary-list");
const likeRaceResetCommentaryButton = document.getElementById("like-race-reset-commentary");
const likeRaceLiveSummary = document.getElementById("like-race-live-summary");
const likeRaceStatus = document.getElementById("like-race-status");
const spinWheelEnabledInput = document.getElementById("spin-wheel-enabled");
const spinWheelCommandEnabledInput = document.getElementById("spin-wheel-command-enabled");
const spinWheelTestButton = document.getElementById("spin-wheel-test-button");
const spinWheelDurationInput = document.getElementById("spin-wheel-duration");
const spinWheelResultDurationInput = document.getElementById("spin-wheel-result-duration");
const spinWheelArrowPositionInput = document.getElementById("spin-wheel-arrow-position");
const spinWheelGiftNameInput = document.getElementById("spin-wheel-gift-name");
const spinWheelGiftDropdown = document.getElementById("spin-wheel-gift-dropdown");
const spinWheelGiftSelected = document.getElementById("spin-wheel-gift-selected");
const spinWheelGiftSearchInput = document.getElementById("spin-wheel-gift-search");
const spinWheelGiftOptions = document.getElementById("spin-wheel-gift-options");
const spinWheelEventRuleSelect = document.getElementById("spin-wheel-event-rule");
const spinWheelOverlayUrlInput = document.getElementById("spin-wheel-overlay-url");
const spinWheelOverlayCopyButton = document.getElementById("spin-wheel-overlay-copy");
const spinWheelOverlayOpenButton = document.getElementById("spin-wheel-overlay-open");
const spinWheelSegmentsList = document.getElementById("spin-wheel-segments-list");
const spinWheelAddSegmentButton = document.getElementById("spin-wheel-add-segment");
const spinWheelStatus = document.getElementById("spin-wheel-status");

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
const LIKE_RACE_COMMENTARY_EVENTS = [
  "raceStarting",
  "countdown",
  "raceStarted",
  "userJoin",
  "leadChange",
  "overtake",
  "inactive",
  "comeback",
  "giftBoost",
  "finalStretch",
  "winner",
  "raceEnded"
];
const LIKE_RACE_COMMENTARY_LABELS = {
  raceStarting: "Race starting",
  countdown: "Countdown",
  raceStarted: "Race started",
  userJoin: "User joins race",
  leadChange: "Lead change",
  overtake: "Overtaking",
  inactive: "Inactive / slow player",
  comeback: "Comeback",
  giftBoost: "Gift boost",
  finalStretch: "Final stretch",
  winner: "Winner declared",
  raceEnded: "Race ended manually"
};
const DEFAULT_LIKE_RACE_COMMENTARY = {
  raceStarting: [
    "The racers are lining up!",
    "Get ready, the chaos race is about to begin!"
  ],
  countdown: [
    "{distance} spaces on the board. Racers, get ready!",
    "The countdown is on. Tap fast when the race begins!"
  ],
  raceStarted: [
    "And they are off!",
    "The Like Race has started!"
  ],
  userJoin: [
    "{user} has joined the race!",
    "{user} is on the starting line!"
  ],
  leadChange: [
    "{user} takes the lead!",
    "{user} is flying into first place!",
    "Here comes {user}, storming ahead!"
  ],
  overtake: [
    "{user1} just overtook {user2}!",
    "Huge pass from {user1}!",
    "{user2} has been left in the dust by {user1}!"
  ],
  inactive: [
    "Oh no, {user} has fallen off their horse!",
    "{user} seems to have stopped for a cup of tea!",
    "{user} is asleep at the wheel!"
  ],
  comeback: [
    "{user} is back in the race!",
    "Massive comeback from {user}!",
    "{user} has returned with vengeance!"
  ],
  giftBoost: [
    "Big gift boost for {user}!",
    "{user} has activated turbo mode!",
    "That gift just launched {user} forward!"
  ],
  finalStretch: [
    "This is getting intense!",
    "We are entering the final stretch!",
    "It is neck and neck!"
  ],
  winner: [
    "Congratulations to {user} for winning the race!",
    "{user} takes the victory!",
    "What an unbelievable finish from {user}!"
  ],
  raceEnded: [
    "The race has been ended by the streamer.",
    "Race control has waved the red flag."
  ]
};
const LIKE_RACE_COMMENTARY_PRESETS = {
  sports: DEFAULT_LIKE_RACE_COMMENTARY,
  chaotic: {
    raceStarting: ["Chat, get ready. This race is about to get feral!", "The lobby is loaded and the chaos is warming up!"],
    countdown: ["{distance} spaces. Tap energy is required immediately!", "Countdown is live. Someone is about to become a menace!"],
    raceStarted: ["And they are absolutely gone!", "The taps are flying and the race is live!"],
    userJoin: ["{user} has entered the chaos!", "{user} just dropped into the race lobby!"],
    leadChange: ["{user} just yoinked first place!", "{user} is moving like they found the speed button!", "{user} is now the problem everyone has to solve!"],
    overtake: ["{user1} just sent {user2} to the shadow realm!", "{user1} with a ridiculous pass!", "{user2} just got absolutely cooked by {user1}!"],
    inactive: ["{user} has stopped tapping. Chat, send help!", "{user} is buffering in real life!", "{user} might have dropped their phone!"],
    comeback: ["{user} is back from the dead!", "{user} remembered this was a race!", "Massive comeback energy from {user}!"],
    giftBoost: ["{user} just hit turbo with {giftName}!", "That gift launched {user} into orbit!", "{user} is flying after {giftCoins} coins of boost!"],
    finalStretch: ["This is pure TikTok chaos now!", "Final stretch. Nobody blink!", "This is getting dangerously spicy!"],
    winner: ["{user} wins the chaos race!", "{user} has conquered the tap storm!", "Crown them. {user} takes the win!"],
    raceEnded: ["Race stopped. The chaos has been contained.", "Race control has pulled the plug!"]
  },
  british: {
    raceStarting: ["The runners are approaching the starting line.", "A fine field gathers for the Like Race stakes."],
    countdown: ["{distance} spaces ahead. They are under starters orders.", "A hush falls over the crowd as the countdown begins."],
    raceStarted: ["And they are off!", "They break cleanly from the line!"],
    userJoin: ["{user} joins the field.", "{user} takes position at the start."],
    leadChange: ["{user} moves smartly into the lead!", "{user} is setting the pace down the outside!", "{user} now leads by a nose!"],
    overtake: ["{user1} sweeps past {user2} on the rail!", "A splendid move from {user1}!", "{user1} has found a gap and taken it!"],
    inactive: ["{user} appears to have lost momentum.", "{user} is easing up at the back.", "{user} may need a little encouragement."],
    comeback: ["{user} is rallying magnificently!", "{user} is finding another gear!", "{user} is back in contention!"],
    giftBoost: ["A powerful gift boost sends {user} forward!", "{user} surges ahead after {giftName}!", "That boost has changed the complexion of the race!"],
    finalStretch: ["Into the final stretch they come!", "It is neck and neck approaching the line!", "The crowd is on its feet!"],
    winner: ["{user} wins in tremendous style!", "{user} takes the Like Race crown!", "A brilliant finish from {user}!"],
    raceEnded: ["The race has been brought to a close.", "The stewards have ended proceedings."]
  },
  medieval: {
    raceStarting: ["Brave racers gather at the royal track!", "The horns sound. The kingdom awaits a champion!"],
    countdown: ["{distance} spaces to glory. Prepare thy thumbs!", "The royal countdown begins!"],
    raceStarted: ["Charge!", "The racers ride for honour and glory!"],
    userJoin: ["Sir {user} enters the lists!", "{user} rides into the arena!"],
    leadChange: ["{user} claims the royal lead!", "{user} rides ahead with noble fury!", "Behold, {user} takes first place!"],
    overtake: ["{user1} has bested {user2} in noble combat!", "{user1} storms past with a knightly charge!", "{user2} has yielded ground to {user1}!"],
    inactive: ["{user} has stopped for a goblet of mead!", "{user}'s steed appears confused!", "{user} has misplaced the royal reins!"],
    comeback: ["{user} returns to battle!", "{user} rises again for the crown!", "A heroic comeback from {user}!"],
    giftBoost: ["A magical {giftName} empowers {user}!", "{user} has received a royal boost!", "{giftCoins} coins of sorcery launch {user} onward!"],
    finalStretch: ["The final charge is upon us!", "Glory is within reach!", "The kingdom holds its breath!"],
    winner: ["All hail {user}, champion of the Like Race!", "{user} has won the crown!", "Victory belongs to {user}!"],
    raceEnded: ["The royal race is concluded.", "The herald calls the race to an end."]
  },
  kart: {
    raceStarting: ["Engines ready. Items loaded. Chaos pending!", "Racers are lining up on the neon grid!"],
    countdown: ["{distance} spaces to the finish. Do not miss the boost start!", "Countdown started. Watch for the turbo!"],
    raceStarted: ["Go, go, go!", "Boost start! The race is live!"],
    userJoin: ["{user} has joined the grid!", "{user} picked their kart and rolled in!"],
    leadChange: ["{user} grabs first place!", "{user} hits the boost pad into the lead!", "{user} is drifting into first!"],
    overtake: ["{user1} just slipped past {user2}!", "{user1} nailed the overtake!", "{user2} got blue-shelled by {user1}!"],
    inactive: ["{user} spun out!", "{user} drove into a banana peel!", "{user} is facing the wrong way!"],
    comeback: ["{user} got the comeback mushroom!", "{user} is back on track!", "{user} found a shortcut!"],
    giftBoost: ["{user} got a turbo gift boost!", "{giftName} gives {user} maximum speed!", "{user} just activated star power!"],
    finalStretch: ["Final lap energy!", "The finish line is coming up fast!", "This race is down to the wire!"],
    winner: ["{user} takes the chequered flag!", "{user} wins the grand prix!", "First place belongs to {user}!"],
    raceEnded: ["Race paused in the pit lane.", "The grand prix has ended early."]
  },
  wwe: {
    raceStarting: ["Ladies and gentlemen, prepare for the main event!", "The racers are ready to rumble!"],
    countdown: ["{distance} spaces inside the squared circle of speed!", "The countdown is on and the crowd is electric!"],
    raceStarted: ["The bell has rung!", "And here we go!"],
    userJoin: ["{user} enters the arena!", "{user} is walking down the ramp!"],
    leadChange: ["{user} takes control of the match!", "{user} is the new number one contender!", "{user} is dominating the field!"],
    overtake: ["{user1} just slammed past {user2}!", "{user1} with a huge move!", "{user2} never saw {user1} coming!"],
    inactive: ["{user} is down on the mat!", "{user} needs to answer the ten count!", "{user} is getting booed by the crowd!"],
    comeback: ["{user} is hulking up!", "{user} is back on their feet!", "{user} has found a second wind!"],
    giftBoost: ["{user} just got a championship boost!", "{giftName} sends {user} flying forward!", "{user} is powered by {giftCoins} coins of pure hype!"],
    finalStretch: ["This is the final showdown!", "The crowd is losing its mind!", "Who wants it more?"],
    winner: ["Your winner is {user}!", "{user} stands tall at the end!", "{user} is the champion!"],
    raceEnded: ["The referee has stopped the race.", "The main event has been called off."]
  },
  roast: {
    raceStarting: ["The racers are ready. Some of them, allegedly.", "The race is starting, and confidence is not equally distributed."],
    countdown: ["{distance} spaces. Plenty of time to embarrass yourself.", "Countdown started. Try not to tap like a sleepy pigeon."],
    raceStarted: ["And they are off, some more than others!", "The race begins. Expectations remain modest."],
    userJoin: ["{user} joined. Brave choice.", "{user} has entered the race and the risk assessment has failed."],
    leadChange: ["{user} takes the lead. Everyone else, explain yourselves.", "{user} is first, which is awkward for the rest.", "{user} remembered how tapping works!"],
    overtake: ["{user1} just passed {user2}. That had to hurt.", "{user2} got served a full plate of dust by {user1}.", "{user1} overtook {user2} with disrespectful ease."],
    inactive: ["{user} has stopped. Maybe the phone got tired.", "{user} is moving with dial-up internet energy.", "{user} is currently sponsored by standing still."],
    comeback: ["{user} is back. Nobody panic.", "{user} finally woke up!", "{user} has discovered movement again!"],
    giftBoost: ["{user} bought speed with {giftName}. Valid strategy.", "{user} got boosted because apparently tapping was not enough.", "{giftCoins} coins later, {user} is suddenly talented."],
    finalStretch: ["Final stretch. Time for everyone to make questionable choices.", "This is close, mostly because chaos is bad at planning.", "The finish line is near and dignity is optional."],
    winner: ["{user} wins. We are all shocked and inspired.", "{user} takes victory and probably will mention it forever.", "{user} is the winner. The rest of you saw that, right?"],
    raceEnded: ["Race ended before things got worse.", "The race has been mercy-stopped."]
  },
  family: {
    raceStarting: ["The racers are getting ready!", "A new Like Race is about to begin!"],
    countdown: ["{distance} spaces to the finish. Good luck everyone!", "Countdown started. Get ready to tap!"],
    raceStarted: ["The race has started!", "Good luck racers!"],
    userJoin: ["{user} has joined the race!", "Welcome to the race, {user}!"],
    leadChange: ["{user} takes the lead!", "{user} is doing brilliantly!", "{user} moves into first place!"],
    overtake: ["{user1} overtakes {user2}!", "Great move from {user1}!", "{user1} moves up the leaderboard!"],
    inactive: ["{user} has slowed down.", "{user} might need a boost!", "{user} is taking a quick breather."],
    comeback: ["{user} is back in the race!", "Nice comeback from {user}!", "{user} is catching up!"],
    giftBoost: ["Gift boost for {user}!", "{user} speeds forward after {giftName}!", "Great support for {user}!"],
    finalStretch: ["Final stretch!", "This is close!", "Who will reach the finish first?"],
    winner: ["Congratulations {user}!", "{user} wins the Like Race!", "Well played, {user}!"],
    raceEnded: ["The race has ended.", "Thanks for racing, everyone!"]
  }
};
LIKE_RACE_COMMENTARY_PRESETS.custom = DEFAULT_LIKE_RACE_COMMENTARY;
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
  "autoConnectOnLaunch",
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
  "ttsReadPunctuation",
  "ttsReadGifts",
  "ttsGiftMinCoins",
  "ttsElevenMode",
  "ttsElevenApiKey",
  "ttsElevenModel",
  "ttsXttsServiceUrl",
  "ttsXttsLanguage",
  "ttsXttsSplitSentences",
  "ttsXttsVoices",
  "ttsVoiceLockGiftName",
  "ttsAudience",
  "ttsModeration",
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
    "likeRaceSettings",
    "likeRaceStats",
    "spinWheelSettings",
    "viewerStatsOverlayFilter",
    "viewerStatsOverlayUsername",
    "viewerStatsAllTime",
    "viewerPointsSettings",
    "viewerPointsLeaderboard",
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
  { key: "games-like-race", label: "Games | Like Race" },
  { key: "games-spin-wheel", label: "Games | Spin Wheel" },
  { key: "controls-text-to-speech", label: "Controls | Text to Speech" },
  { key: "controls-audience-filters", label: "Controls | Filters" },
  { key: "overlays-queue-overlay", label: "Overlays | Queue Overlay" },
  { key: "overlays-chat-overlay", label: "Overlays | Chat Overlay" },
  { key: "overlays-gift-overlay", label: "Overlays | Gift Overlay" },
  { key: "overlays-like-leaderboard", label: "Overlays | Like Leaderboard" },
  { key: "overlays-viewer-stats", label: "Overlays | Viewer Stats Leaderboard" },
  { key: "overlays-command-feedback", label: "Overlays | Command Feedback Overlay" },
  { key: "overlays-designer", label: "Overlays | Overlay Designer" },
  { key: "users-points", label: "Users | Users and Points" },
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
  autoConnectAttempted: false,
  autoConnectPaused: false,
  autoConnectInProgress: false,
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
  currentAudioSource: null,
  ttsQueuePaused: false,
  forceTtsModerationRender: false,
  ttsLastQueuedAt: 0,
  ttsLastUserQueuedAt: new Map(),
  ttsModeratorLog: [],
  sessionTtsVoiceLocksByUser: new Map(),
  sessionTtsVoiceLocksByVoice: new Map(),
  soundCatalog: [],
    soundCatalogById: new Map(),
      soundCatalogLoaded: false,
      soundCatalogError: "",
      soundCatalogSearches: new Set(),
      soundCatalogSearchRequestId: 0,
      likeRaceSoundSearchRequestId: 0,
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
  likeRace: null,
  likeRaceOverlayBaseUrl: "",
  spinWheelOverlayBaseUrl: "",
  spinWheelState: null,
  spinWheelTimer: null,
  likeRaceCommentaryHistory: [],
  likeRaceLastCommentaryAt: 0,
  likeRaceEventLastSpokenAt: new Map(),
  likeRaceRecentPhrases: [],
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
  customRuleCooldownNoticeAt: new Map(),
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
let viewerStatsAllTimeSaveTimer = null;
let viewerPointsSaveTimer = null;
let customRuleScheduleTimer = null;
let lastCustomRuleScheduleMinute = "";
let activeVoteCloseTimer = null;
let activeVoteRevealTimer = null;
let activeVoteClearTimer = null;
let likeRaceCountdownTimer = null;
let likeRaceInactiveTimer = null;
let likeRaceCommentarySaveTimer = null;
let headerEventsWired = false;
let authEventsWired = false;
let chatToolbarEventsWired = false;
let tabEventsWired = false;
let overlayDesignerEventsWired = false;
let viewerPointsSearchText = "";
let viewerPointsRoleFilter = "all";
let viewerPointsBalanceFilter = "all";
let viewerPointsBirthdayFilter = "all";
let viewerPointsSortKey = "rank";
let viewerPointsSortDirection = "asc";
let viewerPointsPageIndex = 0;
const playbackQueues = new Map();
let nextPlaybackQueueItemId = 1;
const PLAYBACK_ITEM_TIMEOUT_MS = 2 * 60 * 1000;
const AUDIO_PLAYBACK_GRACE_MS = 5000;
const AUDIO_TAIL_PADDING_MS = 1000;

function cloneDefaultLikeRaceCommentary() {
  return cloneLikeRaceCommentaryPreset("sports");
}

function cloneLikeRaceCommentaryPreset(style = "sports") {
  const preset = LIKE_RACE_COMMENTARY_PRESETS[String(style ?? "sports").trim()] || LIKE_RACE_COMMENTARY_PRESETS.sports;
  return Object.fromEntries(
    LIKE_RACE_COMMENTARY_EVENTS.map((eventType) => [eventType, [...(preset[eventType] || DEFAULT_LIKE_RACE_COMMENTARY[eventType] || [])]])
  );
}

function createDefaultLikeRaceSettings() {
  return {
    enabled: false,
    defaultCountdownSeconds: 10,
    defaultRaceDistance: 1000,
    likeMultiplier: 1,
    giftMultiplier: 5,
    maxRacers: 24,
    allowLateJoins: false,
    autoRemoveInactive: false,
    inactiveTimeoutSeconds: 30,
    centreMessageSeconds: 4,
    overlayAutoHideSeconds: 6,
    disqualifyEarlyTappers: false,
    startRole: "moderators",
    overlayTheme: "neon",
    trackColor: "#39d7ff",
    accentColor: "#b86cff",
    avatarSize: 54,
    usernameSize: 11,
    usernameFont: "Trebuchet MS",
    overlayOpacity: 0.72,
    backgroundColor: "#040a18",
    backgroundImage: "",
    titleColor: "#f7fbff",
    titleSize: 64,
    labelColor: "#dcecff",
    labelSize: 12,
    mutedColor: "#9eb7d8",
    commentarySize: 14,
    backgroundAsset: "",
    animationsEnabled: true,
    animationSpeed: 1,
    ttsEnabled: false,
    ttsProvider: "app",
    ttsVoice: "",
    ttsVolume: 1,
    ttsSpeed: 1,
    ttsPitch: 1,
    ttsCooldownSeconds: 3,
    ttsQueueEnabled: true,
    interruptMajorEvents: false,
    priorityMajorEvents: true,
    commentaryStyle: "sports",
    countdownSoundId: "",
    finishSoundId: "",
    globalCommentaryCooldownSeconds: 3,
    maxCommentaryPerMinute: 12,
    preventRepeatCount: 3,
    sillyCommentary: true,
    hypeCommentary: true,
    roastCommentary: false,
    familyFriendly: true,
    eventCooldowns: Object.fromEntries(LIKE_RACE_COMMENTARY_EVENTS.map((eventType) => [eventType, eventType === "leadChange" ? 5 : 8])),
    commentaryPhrases: cloneDefaultLikeRaceCommentary(),
    soundEffects: {
      countdown: false,
      start: false,
      overtake: false,
      giftBoost: false,
      finalStretch: false,
      winner: false,
      crowd: false,
      inactive: false
    }
  };
}

function createDefaultLikeRaceStats() {
  return {
    racers: {},
    lastRaceWinner: null,
    racesCompleted: 0
  };
}

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
    autoConnectOnLaunch: false,
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
    ttsReadPunctuation: false,
    ttsReadGifts: false,
    ttsGiftMinCoins: 0,
    ttsElevenMode: "free",
    ttsElevenApiKey: "",
    ttsElevenModel: "eleven_flash_v2_5",
    ttsXttsServiceUrl: "http://127.0.0.1:8020",
    ttsXttsLanguage: "en",
    ttsXttsSplitSentences: false,
    ttsXttsVoices: [],
    ttsVoiceLockGiftName: "",
      ttsAudience: {
        allViewers: true,
        subscribers: false,
        moderators: false
      },
      ttsModeration: createDefaultTtsModerationSettings(),
      commandFeedbackOverlayDurationMs: 6000,
      commandFeedbackTemplates: {
        myttsvoice: "{user} has selected {voiceLabel} for their personalised TTS voice.",
        listcommands: "{user}, available chat commands: {commandList}"
      },
    votingEnabled: false,
    votingStartRole: "everyone",
    votingOverlayOrientation: "horizontal",
    likeRaceSettings: createDefaultLikeRaceSettings(),
    likeRaceStats: createDefaultLikeRaceStats(),
    spinWheelSettings: createDefaultSpinWheelSettings(),
    viewerStatsOverlayFilter: "everyone",
    viewerStatsOverlayUsername: "",
    viewerStatsAllTime: createDefaultViewerStatsAllTime(),
    viewerPointsSettings: createDefaultViewerPointsSettings(),
    viewerPointsLeaderboard: createDefaultViewerPointsLeaderboard(),
    ttsUserVoiceAssignments: {
      builtin: {},
      tiktok: {},
      elevenlabs: {},
      xtts: {}
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
  const globalTtsVoiceSettings = collectGlobalTtsVoiceSettings(source);
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
    ttsXttsVoices: globalTtsVoiceSettings.ttsXttsVoices,
    rememberedUsernames: normalizeRememberedUsernames([activeProfileSettings?.rememberedUsername, ...(activeProfileSettings?.rememberedUsernames ?? [])]),
    userNotes: normalizeUserNotes(activeProfileSettings?.userNotes),
    knownTikTokEmotes: normalizeKnownTikTokEmotes(activeProfileSettings?.knownTikTokEmotes),
    ttsUserVoiceAssignments: globalTtsVoiceSettings.ttsUserVoiceAssignments,
    likeRaceSettings: normalizeLikeRaceSettings(activeProfileSettings?.likeRaceSettings),
    likeRaceStats: normalizeLikeRaceStats(activeProfileSettings?.likeRaceStats),
    spinWheelSettings: normalizeSpinWheelSettings(activeProfileSettings?.spinWheelSettings),
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

function normalizeRuleTimeValue(value) {
  const match = String(value ?? "").trim().match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  return match ? `${match[1]}:${match[2]}` : "";
}

function getRuleTimeMinutes(value) {
  const normalized = normalizeRuleTimeValue(value);
  if (!normalized) {
    return null;
  }
  const [hours, minutes] = normalized.split(":").map(Number);
  return (hours * 60) + minutes;
}

function isRuleWithinDisabledTimeWindow(rule, date = new Date()) {
  const startMinutes = getRuleTimeMinutes(rule?.disableWindowStartTime);
  const endMinutes = getRuleTimeMinutes(rule?.disableWindowEndTime);
  if (startMinutes === null || endMinutes === null || startMinutes === endMinutes) {
    return false;
  }

  const currentMinutes = (date.getHours() * 60) + date.getMinutes();
  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  }
  return currentMinutes >= startMinutes || currentMinutes < endMinutes;
}

function getRuleScheduleSummary(rule) {
  const startTime = normalizeRuleTimeValue(rule?.disableWindowStartTime);
  const endTime = normalizeRuleTimeValue(rule?.disableWindowEndTime);
  if (!startTime || !endTime || startTime === endTime) {
    return "";
  }
  return `auto-disabled ${startTime}-${endTime}`;
}

function getCurrentRuleScheduleMinuteKey(date = new Date()) {
  return `${date.getHours()}:${date.getMinutes()}`;
}

function hasScheduledCustomRules() {
  return Array.isArray(state.settings?.customEventRules)
    && state.settings.customEventRules.some((rule) => Boolean(getRuleScheduleSummary(rule)));
}

function shouldDeferCustomRuleScheduleRefresh() {
  if (state.activeCustomRuleId) {
    return true;
  }

  const activeElement = document.activeElement;
  return Boolean(activeElement instanceof HTMLElement && customRuleList?.contains(activeElement));
}

function refreshCustomRuleScheduleStatuses() {
  if (!hasScheduledCustomRules()) {
    return;
  }

  const minuteKey = getCurrentRuleScheduleMinuteKey();
  if (minuteKey === lastCustomRuleScheduleMinute) {
    return;
  }

  lastCustomRuleScheduleMinute = minuteKey;
  if (shouldDeferCustomRuleScheduleRefresh()) {
    return;
  }

  renderCustomRules();
}

function startCustomRuleScheduleMonitor() {
  if (customRuleScheduleTimer) {
    return;
  }

  lastCustomRuleScheduleMinute = getCurrentRuleScheduleMinuteKey();
  customRuleScheduleTimer = window.setInterval(refreshCustomRuleScheduleStatuses, 1000);
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
    disableWindowStartTime: normalizeRuleTimeValue(rule.disableWindowStartTime),
    disableWindowEndTime: normalizeRuleTimeValue(rule.disableWindowEndTime),
    triggerAudience: ["everyone", "follower", "subscriber", "moderator", "topGifter", "specificUser", "birthday"].includes(rule.triggerAudience)
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
    disableWindowStartTime: "",
    disableWindowEndTime: "",
    triggerAudience: "everyone",
    triggerUsername: "",
    triggerEmoteId: "",
    triggerEmoteName: "",
    triggerEmoteImageUrl: "",
    triggerGiftName: "",
    triggerGiftImageUrl: "",
    feedbackOverlayEnabled: false,
        feedbackOverlayTitle: "Custom Event",
        feedbackOverlayMessage: "{username} triggered {rule name}. Total likes: {user total likes}",
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

function resolveQueueSource(meta = {}) {
  const sourceItem = meta.sourceItem ?? null;
  const userKey = normalizeUserKey(meta.sourceUser || sourceItem?.user || sourceItem?.uniqueId || sourceItem?.username || "");
  if (!userKey) {
    return null;
  }

  const cachedProfile = state.sessionUserProfiles.get(userKey) ?? {};
  const displayName = String(
    meta.sourceNickname ||
    sourceItem?.nickname ||
    sourceItem?.displayName ||
    cachedProfile.nickname ||
    userKey
  ).trim() || userKey;
  const profilePictureUrl = String(
    meta.sourceProfilePictureUrl ||
    sourceItem?.profilePictureUrl ||
    cachedProfile.profilePictureUrl ||
    ""
  ).trim();

  return {
    user: userKey,
    displayName,
    profilePictureUrl
  };
}

function createQueueClearedError() {
  const error = new Error("Queue item cleared.");
  error.cleared = true;
  return error;
}

function createPlaybackStoppedError() {
  const error = new Error("Playback stopped.");
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

function renderQueueActionRow(item) {
  const source = item.source ?? null;
  const sourceAvatar = source?.profilePictureUrl
    ? `<img src="${escapeHtml(source.profilePictureUrl)}" alt="" loading="lazy" />`
    : escapeHtml((source?.displayName || source?.user || "?").slice(0, 1).toUpperCase());
  const sourceHtml = source?.user
    ? `
      <span class="queue-action-triggered-by">
        <span class="queue-action-avatar">${sourceAvatar}</span>
        <span class="queue-action-trigger-copy">
          <span>Triggered by</span>
          <button type="button" class="queue-action-profile-link" data-queue-open-profile="${escapeHtml(source.user)}">${escapeHtml(source.displayName || source.user)}</button>
        </span>
      </span>
    `
    : "";

  return `
    <article class="queue-action-row ${item.status === "running" ? "running" : ""}" data-queue-item-id="${escapeHtml(item.id)}">
      <div class="queue-action-copy">
        <strong>${escapeHtml(item.label)}</strong>
        <span class="queue-action-meta">${escapeHtml(getQueueLabel(item.queueId))} &middot; ${escapeHtml(item.kind === "tts" ? "TTS" : "Action")} &middot; ${escapeHtml(item.status === "running" ? "Running" : "Waiting")}</span>
        ${sourceHtml}
      </div>
      <button type="button" class="ghost compact-button queue-action-clear" data-queue-clear="${escapeHtml(item.id)}">${item.status === "running" ? "Stop" : "Clear"}</button>
    </article>
  `;
}

function renderQueueActionList() {
  const filteredItems = getFilteredQueueItems();
  const clearableCount = filteredItems.length;
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

  queueActionList.innerHTML = filteredItems.map(renderQueueActionRow).join("");
  setStatusMessage(
    queueActionStatus,
    "success",
    `${filteredItems.length} visible item${filteredItems.length === 1 ? "" : "s"} · ${clearableCount} clearable`
  );
  return;

  queueActionList.innerHTML = filteredItems
    .map((item) => `
      <article class="queue-action-row ${item.status === "running" ? "running" : ""}" data-queue-item-id="${escapeHtml(item.id)}">
        <div class="queue-action-copy">
          <strong>${escapeHtml(item.label)}</strong>
          <span class="queue-action-meta">${escapeHtml(getQueueLabel(item.queueId))} · ${escapeHtml(item.kind === "tts" ? "TTS" : "Action")} · ${escapeHtml(item.status === "running" ? "Running" : "Waiting")}</span>
        </div>
        <button type="button" class="ghost compact-button queue-action-clear" data-queue-clear="${escapeHtml(item.id)}">${item.status === "running" ? "Stop" : "Clear"}</button>
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

function getLikeRaceOverlayUrl() {
  return state.likeRaceOverlayBaseUrl || "";
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

function updateLikeRaceOverlayControls(info = {}) {
  if (Object.prototype.hasOwnProperty.call(info, "url")) {
    state.likeRaceOverlayBaseUrl = String(info.url ?? "").trim();
  }

  const overlayUrl = getLikeRaceOverlayUrl();
  if (likeRaceOverlayUrlInput) {
    likeRaceOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  }
  if (likeRaceOverlayCopyButton) {
    likeRaceOverlayCopyButton.disabled = overlayUrl === "";
  }
  if (likeRaceOverlayOpenButton) {
    likeRaceOverlayOpenButton.disabled = overlayUrl === "";
  }
  setStatusMessage(
    likeRaceStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? "Like Race hosted overlay URL is ready for TikTok and OBS."
      : "Like Race overlay is unavailable right now."
  );
}

async function loadLikeRaceOverlayInfo() {
  try {
    const info = await app.getLikeRaceOverlayInfo();
    updateLikeRaceOverlayControls(info);
  } catch (error) {
    state.likeRaceOverlayBaseUrl = "";
    updateLikeRaceOverlayControls();
    setStatusMessage(likeRaceStatus, "error", error.message || "Unable to prepare Like Race overlay.");
  }
}

async function loadOverlayInfoBundle() {
  if (!state.authenticatedUser?.id || !state.authenticatedUser?.sessionToken) {
    state.queueOverlayBaseUrl = "";
    state.chatOverlayBaseUrl = "";
    state.giftOverlayBaseUrl = "";
    state.likesOverlayBaseUrl = "";
    state.viewerStatsOverlayBaseUrl = "";
    state.voteOverlayBaseUrl = "";
    state.likeRaceOverlayBaseUrl = "";
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
    updateLikeRaceOverlayControls({ url: "" });
    if (likeRaceOverlayUrlInput) {
      likeRaceOverlayUrlInput.value = "Sign in to generate hosted overlay";
    }
    setStatusMessage(likeRaceStatus, "info", "Sign in to generate a hosted Like Race overlay URL for this user.");
    updateSpinWheelOverlayControls({ url: "" });
    if (spinWheelOverlayUrlInput) {
      spinWheelOverlayUrlInput.value = "Sign in to generate hosted overlay";
    }
    setStatusMessage(spinWheelStatus, "info", "Sign in to generate a hosted Spin Wheel overlay URL for this user.");
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
    updateLikeRaceOverlayControls({ url: info.likeRaceUrl });
    updateSpinWheelOverlayControls({ url: info.spinWheelUrl });
  } catch (error) {
    state.queueOverlayBaseUrl = "";
    state.chatOverlayBaseUrl = "";
    state.giftOverlayBaseUrl = "";
    state.likesOverlayBaseUrl = "";
    state.viewerStatsOverlayBaseUrl = "";
    state.voteOverlayBaseUrl = "";
    state.likeRaceOverlayBaseUrl = "";
    state.spinWheelOverlayBaseUrl = "";
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
    updateLikeRaceOverlayControls({ url: "" });
    if (likeRaceOverlayUrlInput) {
      likeRaceOverlayUrlInput.value = "Overlay unavailable";
    }
    setStatusMessage(likeRaceStatus, "error", error.message || "Unable to load hosted overlay URLs.");
    updateSpinWheelOverlayControls({ url: "" });
    if (spinWheelOverlayUrlInput) {
      spinWheelOverlayUrlInput.value = "Overlay unavailable";
    }
    setStatusMessage(spinWheelStatus, "error", error.message || "Unable to load hosted overlay URLs.");
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

function getHostedOverlayUrlForDesignerTemplate(templateId = "") {
  const activeTemplateId = String(templateId ?? "").trim();
  if (!activeTemplateId) {
    return "";
  }

  const assignments = normalizeOverlayDesignerAssignments(state.settings?.overlayDesignerAssignments);
  const overlayUrls = {
    queue: state.queueOverlayBaseUrl,
    chat: state.chatOverlayBaseUrl,
    gift: state.giftOverlayBaseUrl,
    likes: state.likesOverlayBaseUrl,
    viewerStats: state.viewerStatsOverlayBaseUrl,
    commandFeedback: state.commandFeedbackOverlayBaseUrl,
    vote: state.voteOverlayBaseUrl
  };

  for (const [overlayKey, assignedTemplateId] of Object.entries(assignments)) {
    if (assignedTemplateId === activeTemplateId && overlayUrls[overlayKey]) {
      return String(overlayUrls[overlayKey] ?? "").trim();
    }
  }

  return "";
}

function getOverlayDesignerPreviewUrl() {
  const activeTemplateId = getActiveOverlayDesignerTemplateId();
  const baseUrl = String(state.overlayDesignerBaseUrl ?? "").trim();
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

function getOverlayDesignerDisplayUrl() {
  return getHostedOverlayUrlForDesignerTemplate(getActiveOverlayDesignerTemplateId());
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
  const hostedUrl = getOverlayDesignerDisplayUrl();
  const hasActiveTemplate = Boolean(getActiveOverlayDesignerTemplateId());
  overlayDesignerUrlInput.value = hostedUrl || (hasActiveTemplate ? "Assign this template to an overlay to generate a hosted website URL" : "Choose or create a template first");
  overlayDesignerCopyButton.disabled = hostedUrl === "";
  overlayDesignerPreviewButton.disabled = hostedUrl === "";
  setStatusMessage(
    overlayDesignerStatus,
    hostedUrl ? "success" : "info",
    hostedUrl
      ? "Hosted overlay URL ready. Use this public website URL in TikTok, OBS, or Streamlabs."
      : "Assign this custom template to Queue, Chat, Gift, Likes, Viewer Stats, Command Feedback, or Voting to get a public hosted URL."
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
      status: item.status,
      source: item.source
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
    "!mybday dd/mm",
    `!myttsvoice <number>${myTtsVoiceRange}`,
    "!lockmyttsvoice",
    "!tts on/off",
    "!pause tts",
    "!resume tts",
    "!clear tts",
    "!skip tts",
    "!lock tts",
    "!unlock tts",
    "!mute @user",
    "!unmute @user",
    "!shadowmute @user",
    "!timeout @user 10m",
    "!banword <word>",
    "!allowword <word>",
    "!slowmode <seconds>",
    "!cooldown <seconds>",
    "!spin",
    "!joinrace",
    "!startrace [10s] [spaces]",
    "!endrace",
    "!racestatus",
    "!raceleaderboard",
    "!topracers",
    "!lastracewinner"
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

function getViewerStatsAllTimeUser(userId) {
  const normalizedUserId = normalizeUserKey(userId);
  if (!normalizedUserId) {
    return null;
  }

  const allTime = normalizeViewerStatsAllTime(state.settings?.viewerStatsAllTime);
  return allTime.users[normalizedUserId] ?? null;
}

function getViewerStatsAllTimeScore(stats = {}) {
  return calculateViewerStatsRankScore(stats);
}

function calculateViewerStatsRankScore(stats = {}) {
  const likes = Math.max(0, Number(stats?.likes) || 0);
  const gifts = Math.max(0, Number(stats?.gifts) || 0);
  const comments = Math.max(0, Number(stats?.comments) || 0);
  const shares = Math.max(0, Number(stats?.shares) || 0);
  const coins = Math.max(0, Number(stats?.coins) || 0);

  return (likes * 0.01) + gifts + comments + shares + coins;
}

function buildViewerStatsOverlayItems() {
  const audienceFilter = getViewerStatsAudienceFilter();
  const usernameFilter = getViewerStatsUsernameFilter();
  const allTimeUsers = normalizeViewerStatsAllTime(state.settings?.viewerStatsAllTime).users;
  const userIds = new Set([
    ...Array.from(state.sessionUserProfiles.keys()),
    ...Array.from(state.sessionUserMetrics.likes.keys()),
    ...Array.from(state.sessionUserMetrics.comments.keys()),
    ...Array.from(state.sessionUserMetrics.shares.keys()),
    ...Array.from(state.sessionUserMetrics.follows.keys()),
    ...Array.from(state.sessionGiftMetrics.byUser.keys()),
    ...Object.keys(allTimeUsers)
  ]);

  const items = [];
  for (const userId of userIds) {
    const normalizedUserId = normalizeUserKey(userId);
    if (!normalizedUserId) {
      continue;
    }

    const profile = state.sessionUserProfiles.get(normalizedUserId) ?? {};
    const allTimeStats = allTimeUsers[normalizedUserId] ?? {};
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
    const rankScore = calculateViewerStatsRankScore({ likes, comments, shares, gifts, coins });
    const allTimeLikes = Math.max(0, Number(allTimeStats.likes ?? 0) || 0);
    const allTimeComments = Math.max(0, Number(allTimeStats.comments ?? 0) || 0);
    const allTimeShares = Math.max(0, Number(allTimeStats.shares ?? 0) || 0);
    const allTimeFollows = Math.max(0, Number(allTimeStats.follows ?? 0) || 0);
    const allTimeCoins = Math.max(0, Number(allTimeStats.coins ?? 0) || 0);
    const allTimeGifts = Math.max(0, Number(allTimeStats.gifts ?? 0) || 0);
    const allTimeTotalScore = allTimeLikes + allTimeComments + allTimeShares + allTimeFollows + allTimeGifts + allTimeCoins;
    const allTimeRankScore = calculateViewerStatsRankScore({
      likes: allTimeLikes,
      comments: allTimeComments,
      shares: allTimeShares,
      gifts: allTimeGifts,
      coins: allTimeCoins
    });
    if (totalScore <= 0 && allTimeTotalScore <= 0) {
      continue;
    }

    items.push({
      username: normalizedUserId,
      displayName: String(profile?.nickname ?? allTimeStats.displayName ?? normalizedUserId).trim() || normalizedUserId,
      isSubscriber: Boolean(profile?.isSubscriber),
      isModerator: Boolean(profile?.isModerator),
      likes,
      comments,
      shares,
      follows,
      coins,
      gifts,
      totalScore,
      rankScore,
      allTimeLikes,
      allTimeComments,
      allTimeShares,
      allTimeFollows,
      allTimeCoins,
      allTimeGifts,
      allTimeTotalScore,
      allTimeRankScore
    });
  }

  return items
    .sort((left, right) => {
      const leftScore = Math.max(left.rankScore, left.allTimeRankScore);
      const rightScore = Math.max(right.rankScore, right.allTimeRankScore);
      return rightScore - leftScore
        || right.rankScore - left.rankScore
        || right.likes - left.likes
        || left.username.localeCompare(right.username);
    })
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

function getLikeRaceSettings() {
  return normalizeLikeRaceSettings(state.settings?.likeRaceSettings);
}

function createEmptyLikeRace(status = "idle") {
  const settings = getLikeRaceSettings();
  return {
    id: `like-race-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    raceEnabled: settings.enabled,
    raceStatus: status,
    countdownSeconds: settings.defaultCountdownSeconds,
    countdownEndsAt: "",
    totalSpaces: settings.defaultRaceDistance,
    likeMultiplier: settings.likeMultiplier,
    giftMultiplier: settings.giftMultiplier,
    racers: new Map(),
    leaderboard: [],
    currentLeader: null,
    previousLeader: null,
    winner: null,
    lastRaceWinner: state.settings?.likeRaceStats?.lastRaceWinner ?? null,
    commentaryQueue: [],
    centreMessage: null,
    middleContentVisibleUntil: "",
    overlayVisibleUntil: "",
    disqualifiedUsers: new Set(),
    startedAt: null,
    finishedAt: null
  };
}

function getLikeRace() {
  if (!state.likeRace) {
    state.likeRace = createEmptyLikeRace("idle");
  }
  return state.likeRace;
}

function cloneLikeRaceRacer(racer = {}) {
  return {
    userId: String(racer.userId ?? racer.username ?? "").trim(),
    username: String(racer.username ?? "").trim(),
    displayName: String(racer.displayName ?? racer.username ?? "").trim(),
    profilePictureUrl: String(racer.profilePictureUrl ?? "").trim(),
    spacesMoved: Math.max(0, Number(racer.spacesMoved) || 0),
    progressPercent: Math.max(0, Math.min(100, Number(racer.progressPercent) || 0)),
    trackPosition: Math.max(0, Math.min(1, Number(racer.trackPosition) || 0)),
    likesReceived: Math.max(0, Number(racer.likesReceived) || 0),
    giftsReceived: Math.max(0, Number(racer.giftsReceived) || 0),
    giftCoinsReceived: Math.max(0, Number(racer.giftCoinsReceived) || 0),
    lastActionTime: Number(racer.lastActionTime) || Date.now(),
    isInactive: Boolean(racer.isInactive),
    hasTriggeredInactiveCommentary: Boolean(racer.hasTriggeredInactiveCommentary),
    currentRank: Math.max(1, Number(racer.currentRank) || 1),
    previousRank: Math.max(1, Number(racer.previousRank) || 1),
    speechBubble: String(racer.speechBubble ?? "").trim()
  };
}

function getLikeRaceRacerList() {
  const race = getLikeRace();
  return Array.from(race.racers.values())
    .map(cloneLikeRaceRacer)
    .sort((left, right) => right.spacesMoved - left.spacesMoved || left.username.localeCompare(right.username))
    .map((racer, index) => ({ ...racer, currentRank: index + 1 }));
}

function refreshLikeRaceRanks() {
  const race = getLikeRace();
  const ranked = getLikeRaceRacerList();
  for (const rankedRacer of ranked) {
    const stored = race.racers.get(rankedRacer.userId);
    if (stored) {
      stored.previousRank = stored.currentRank || rankedRacer.currentRank;
      stored.currentRank = rankedRacer.currentRank;
      stored.progressPercent = rankedRacer.progressPercent;
      stored.trackPosition = rankedRacer.trackPosition;
    }
  }
  race.leaderboard = ranked;
  const leader = ranked[0] ?? null;
  const previousLeaderId = race.currentLeader?.userId ?? "";
  if (leader && leader.userId !== previousLeaderId) {
    race.previousLeader = race.currentLeader;
    race.currentLeader = leader;
    if (race.raceStatus === "running") {
      queueLikeRaceCommentary("leadChange", { user: leader.displayName || leader.username, position: leader.currentRank });
    }
  } else if (leader) {
    race.currentLeader = leader;
  }
}

function resetLikeRaceRacersForNewRace() {
  const race = getLikeRace();
  const now = Date.now();
  for (const racer of race.racers.values()) {
    racer.spacesMoved = 0;
    racer.progressPercent = 0;
    racer.trackPosition = 0;
    racer.likesReceived = 0;
    racer.giftsReceived = 0;
    racer.giftCoinsReceived = 0;
    racer.lastActionTime = now;
    racer.isInactive = false;
    racer.hasTriggeredInactiveCommentary = false;
    racer.finalStretchCommented = false;
    racer.speechBubble = "";
    racer.previousRank = racer.currentRank || 1;
  }
  race.leaderboard = getLikeRaceRacerList();
  race.currentLeader = null;
  race.previousLeader = null;
}

function getLikeRaceOverlaySettings() {
  const settings = getLikeRaceSettings();
  return {
    theme: settings.overlayTheme,
    trackColor: settings.trackColor,
    accentColor: settings.accentColor,
    avatarSize: settings.avatarSize,
    usernameSize: settings.usernameSize,
    usernameFont: settings.usernameFont,
    opacity: settings.overlayOpacity,
    backgroundColor: settings.backgroundColor,
    backgroundImage: settings.backgroundImage || settings.backgroundAsset,
    titleColor: settings.titleColor,
    titleSize: settings.titleSize,
    labelColor: settings.labelColor,
    labelSize: settings.labelSize,
    mutedColor: settings.mutedColor,
    commentarySize: settings.commentarySize,
    animationsEnabled: settings.animationsEnabled,
    animationSpeed: settings.animationSpeed
  };
}

function buildLikeRaceOverlayState() {
  const race = getLikeRace();
  refreshLikeRaceRanks();
  return {
    raceEnabled: Boolean(getLikeRaceSettings().enabled),
    raceStatus: race.raceStatus,
    countdownSeconds: race.countdownSeconds,
    countdownEndsAt: race.countdownEndsAt,
    totalSpaces: race.totalSpaces,
    likeMultiplier: race.likeMultiplier,
    giftMultiplier: race.giftMultiplier,
    racers: getLikeRaceRacerList(),
    leaderboard: race.leaderboard,
    currentLeader: race.currentLeader,
    previousLeader: race.previousLeader,
    winner: race.winner,
    lastRaceWinner: state.settings?.likeRaceStats?.lastRaceWinner ?? race.lastRaceWinner,
    commentaryQueue: race.commentaryQueue.slice(-12),
    centreMessage: race.centreMessage,
    middleContentVisibleUntil: race.middleContentVisibleUntil,
    overlayVisibleUntil: race.overlayVisibleUntil,
    ttsSettings: getLikeRaceSettings(),
    overlaySettings: getLikeRaceOverlaySettings(),
    stats: state.settings?.likeRaceStats ?? createDefaultLikeRaceStats()
  };
}

function syncLikeRaceOverlayState() {
  const overlayState = buildLikeRaceOverlayState();
  if (state.authenticatedUser?.id && state.authenticatedUser?.sessionToken) {
    void authRequest("/api/overlay/update-like-race-state", {
      userId: state.authenticatedUser.id,
      sessionToken: state.authenticatedUser.sessionToken,
      ...overlayState
    }).catch(() => {
      // Hosted overlay sync should not interrupt the local race controls.
    });
  }

  if (app.updateLikeRaceOverlayState) {
    void app.updateLikeRaceOverlayState(overlayState).catch(() => {
      // Keep the local game running even if the overlay is temporarily unavailable.
    });
  }
  renderLikeRaceSummary();
}

function replaceLikeRaceTokens(phrase, tokens = {}) {
  return String(phrase ?? "")
    .replace(/\{user\}/gi, tokens.user ?? "")
    .replace(/\{user1\}/gi, tokens.user1 ?? tokens.user ?? "")
    .replace(/\{user2\}/gi, tokens.user2 ?? "")
    .replace(/\{giftName\}/gi, tokens.giftName ?? "")
    .replace(/\{giftCoins\}/gi, String(tokens.giftCoins ?? ""))
    .replace(/\{position\}/gi, String(tokens.position ?? ""))
    .replace(/\{distance\}/gi, String(tokens.distance ?? getLikeRace().totalSpaces))
    .replace(/\{progress\}/gi, String(tokens.progress ?? ""));
}

function pickLikeRacePhrase(eventType, tokens = {}) {
  const settings = getLikeRaceSettings();
  const phrases = settings.commentaryPhrases?.[eventType] ?? DEFAULT_LIKE_RACE_COMMENTARY[eventType] ?? [];
  const usable = phrases.filter((phrase) => !state.likeRaceRecentPhrases.includes(phrase));
  const source = usable.length ? usable : phrases;
  const picked = source[Math.floor(Math.random() * source.length)] ?? "";
  if (!picked) {
    return "";
  }
  state.likeRaceRecentPhrases.push(picked);
  const keep = Math.max(0, settings.preventRepeatCount);
  if (state.likeRaceRecentPhrases.length > keep) {
    state.likeRaceRecentPhrases = state.likeRaceRecentPhrases.slice(-keep);
  }
  return replaceLikeRaceTokens(picked, tokens);
}

function queueLikeRaceCommentary(eventType, tokens = {}, options = {}) {
  const settings = getLikeRaceSettings();
  const now = Date.now();
  const eventCooldownMs = Math.max(0, Number(settings.eventCooldowns?.[eventType]) || 0) * 1000;
  const globalCooldownMs = Math.max(0, Number(settings.globalCommentaryCooldownSeconds) || 0) * 1000;
  const lastEventAt = state.likeRaceEventLastSpokenAt.get(eventType) ?? 0;
  if (!options.force && (now - lastEventAt < eventCooldownMs || now - state.likeRaceLastCommentaryAt < globalCooldownMs)) {
    return "";
  }
  state.likeRaceCommentaryHistory = state.likeRaceCommentaryHistory.filter((timestamp) => now - timestamp < 60_000);
  if (!options.force && state.likeRaceCommentaryHistory.length >= settings.maxCommentaryPerMinute) {
    return "";
  }
  const phrase = options.text || pickLikeRacePhrase(eventType, tokens);
  if (!phrase) {
    return "";
  }
  const race = getLikeRace();
  race.commentaryQueue.push({
    id: `race-commentary-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    eventType,
    text: phrase,
    createdAt: new Date().toISOString()
  });
  race.commentaryQueue = race.commentaryQueue.slice(-30);
  if (["overtake", "giftBoost", "winner"].includes(eventType) || options.showCentre) {
    const visibleUntil = new Date(Date.now() + (Math.max(1, Number(settings.centreMessageSeconds) || 4) * 1000)).toISOString();
    race.centreMessage = {
      eventType,
      text: phrase,
      visibleUntil
    };
    race.middleContentVisibleUntil = visibleUntil;
  }
  state.likeRaceLastCommentaryAt = now;
  state.likeRaceEventLastSpokenAt.set(eventType, now);
  state.likeRaceCommentaryHistory.push(now);
  if (settings.ttsEnabled || options.forceTts) {
    enqueueSpeech(phrase, {
      provider: ttsProviderSelect.value,
      mode: ttsElevenModeSelect.value,
      apiKey: ttsElevenApiKeyInput.value.trim(),
      modelId: ttsElevenModelSelect.value,
      voiceSelection: getSelectedTtsVoiceSelection(),
      rate: getStyleAdjustedRate(),
      pitch: getStyleAdjustedPitch(),
      volume: getStyleAdjustedVolume(),
      queueId: ttsQueueSelect.value,
      receivedAt: now,
      sourceUser: "like-race"
    });
  }
  syncLikeRaceOverlayState();
  return phrase;
}

async function playLikeRaceSound(soundId, label = "Like Race sound") {
  const resolvedSoundId = String(soundId ?? "").trim();
  if (!resolvedSoundId) {
    return;
  }

  try {
    await enqueuePlaybackTask(1, async () => {
      const { audioUrl } = await app.resolveSoundAlertAudio(resolvedSoundId);
      await playAudioUrl(audioUrl, 1);
    }, { label, kind: "action" });
  } catch (error) {
    if (error?.cleared) {
      return;
    }
    showToast(error.message || `Unable to play ${label}.`, "error");
  }
}

function canUserControlLikeRace(item) {
  const role = getLikeRaceSettings().startRole;
  if (role === "everyone") {
    return true;
  }
  if (role === "subscribers") {
    return Boolean(item?.isSubscriber || item?.isModerator);
  }
  return Boolean(item?.isModerator);
}

function updateLikeRacePersistentStats(userKey, delta = {}) {
  const stats = normalizeLikeRaceStats(state.settings?.likeRaceStats);
  const existing = stats.racers[userKey] ?? {
    username: userKey,
    displayName: userKey,
    wins: 0,
    racesJoined: 0,
    totalLikes: 0,
    totalGifts: 0,
    totalGiftCoins: 0,
    totalDistance: 0
  };
  stats.racers[userKey] = {
    ...existing,
    username: userKey,
    displayName: String(delta.item?.nickname || delta.item?.displayName || existing.displayName || userKey).trim(),
    wins: existing.wins + Math.max(0, Number(delta.wins) || 0),
    racesJoined: existing.racesJoined + Math.max(0, Number(delta.racesJoined) || 0),
    totalLikes: existing.totalLikes + Math.max(0, Number(delta.likes) || 0),
    totalGifts: existing.totalGifts + Math.max(0, Number(delta.gifts) || 0),
    totalGiftCoins: existing.totalGiftCoins + Math.max(0, Number(delta.giftCoins) || 0),
    totalDistance: existing.totalDistance + Math.max(0, Number(delta.distance) || 0)
  };
  state.settings.likeRaceStats = stats;
  scheduleSettingsSave();
}

function addLikeRaceRacer(item, options = {}) {
  const settings = getLikeRaceSettings();
  const race = getLikeRace();
  const userKey = normalizeUserKey(item?.user || item?.username || "");
  if (!userKey) {
    return { added: false, reason: "Missing username." };
  }
  if (!settings.enabled && !options.test) {
    return { added: false, reason: "Like Race is disabled." };
  }
  if (race.disqualifiedUsers?.has(userKey)) {
    return { added: false, reason: "Disqualified for tapping before the start." };
  }
  if (race.racers.has(userKey)) {
    return { added: false, reason: "Already joined." };
  }
  if (race.raceStatus === "running" && !settings.allowLateJoins) {
    return { added: false, reason: "Late joining is disabled." };
  }
  if (race.racers.size >= settings.maxRacers) {
    return { added: false, reason: "Race is full." };
  }
  const now = Date.now();
  const cachedProfile = state.sessionUserProfiles.get(userKey) ?? {};
  const profilePictureUrl = String(item?.profilePictureUrl || cachedProfile.profilePictureUrl || "").trim();
  race.racers.set(userKey, {
    userId: userKey,
    username: userKey,
    displayName: String(item?.nickname || item?.displayName || item?.user || userKey).trim() || userKey,
    profilePictureUrl,
    spacesMoved: 0,
    progressPercent: 0,
    trackPosition: 0,
    likesReceived: 0,
    giftsReceived: 0,
    giftCoinsReceived: 0,
    lastActionTime: now,
    isInactive: false,
    hasTriggeredInactiveCommentary: false,
    currentRank: race.racers.size + 1,
    previousRank: race.racers.size + 1,
    speechBubble: ""
  });
  updateLikeRacePersistentStats(userKey, { item, racesJoined: 1 });
  queueLikeRaceCommentary("userJoin", { user: item?.nickname || userKey });
  syncLikeRaceOverlayState();
  return { added: true };
}

function startLikeRaceInactiveMonitor() {
  clearInterval(likeRaceInactiveTimer);
  likeRaceInactiveTimer = window.setInterval(() => {
    const settings = getLikeRaceSettings();
    const race = getLikeRace();
    if (race.raceStatus !== "running") {
      return;
    }
    const now = Date.now();
    for (const [userKey, racer] of race.racers.entries()) {
      const inactive = now - racer.lastActionTime >= settings.inactiveTimeoutSeconds * 1000;
      if (!inactive) {
        continue;
      }
      if (settings.autoRemoveInactive) {
        race.racers.delete(userKey);
        continue;
      }
      if (!racer.hasTriggeredInactiveCommentary) {
        racer.isInactive = true;
        racer.hasTriggeredInactiveCommentary = true;
        queueLikeRaceCommentary("inactive", { user: racer.displayName || racer.username });
      }
    }
    syncLikeRaceOverlayState();
  }, 5000);
}

function finishLikeRace(winnerRacer) {
  const race = getLikeRace();
  const settings = getLikeRaceSettings();
  race.raceStatus = "finished";
  race.finishedAt = Date.now();
  race.winner = cloneLikeRaceRacer(winnerRacer);
  race.lastRaceWinner = race.winner;
  race.overlayVisibleUntil = new Date(Date.now() + (Math.max(1, Number(settings.overlayAutoHideSeconds) || 6) * 1000)).toISOString();
  race.middleContentVisibleUntil = race.overlayVisibleUntil;
  clearTimeout(likeRaceCountdownTimer);
  clearInterval(likeRaceInactiveTimer);
  const stats = normalizeLikeRaceStats(state.settings?.likeRaceStats);
  stats.racesCompleted += 1;
  stats.lastRaceWinner = race.winner;
  state.settings.likeRaceStats = stats;
  updateLikeRacePersistentStats(winnerRacer.userId, { wins: 1, item: winnerRacer });
  queueLikeRaceCommentary("winner", { user: winnerRacer.displayName || winnerRacer.username }, { force: true, forceTts: true });
  void playLikeRaceSound(settings.finishSoundId, "Like Race finish sound");
  addLocalSystemChatMessage(`Like Race winner: ${winnerRacer.displayName || winnerRacer.username}.`);
  syncLikeRaceOverlayState();
}

function moveLikeRaceRacer(item, spaces, meta = {}) {
  const race = getLikeRace();
  if (race.raceStatus !== "running") {
    return;
  }
  const userKey = normalizeUserKey(item?.user || "");
  if (!userKey || !race.racers.has(userKey)) {
    return;
  }
  const racer = race.racers.get(userKey);
  if (!racer.profilePictureUrl) {
    racer.profilePictureUrl = String(item?.profilePictureUrl || state.sessionUserProfiles.get(userKey)?.profilePictureUrl || "").trim();
  }
  const wasInactive = racer.isInactive;
  const previousRank = Math.max(1, Number(racer.currentRank) || race.racers.size || 1);
  const previousLeaderboard = getLikeRaceRacerList();
  racer.spacesMoved = Math.max(0, racer.spacesMoved + Math.max(0, Number(spaces) || 0));
  racer.progressPercent = Math.max(0, Math.min(100, (racer.spacesMoved / race.totalSpaces) * 100));
  racer.trackPosition = Math.max(0, Math.min(1, racer.spacesMoved / race.totalSpaces));
  racer.lastActionTime = Date.now();
  racer.isInactive = false;
  racer.speechBubble = meta.speechBubble || "";
  if (meta.type === "like") {
    racer.likesReceived += Math.max(0, Number(meta.likes) || 0);
  }
  if (meta.type === "gift") {
    racer.giftsReceived += Math.max(1, Number(meta.giftCount) || 1);
    racer.giftCoinsReceived += Math.max(0, Number(meta.giftCoins) || 0);
    queueLikeRaceCommentary("giftBoost", {
      user: racer.displayName || racer.username,
      giftName: meta.giftName || "gift",
      giftCoins: meta.giftCoins || 0,
      progress: Math.round(racer.progressPercent)
    });
  }
  if (wasInactive) {
    racer.hasTriggeredInactiveCommentary = false;
    queueLikeRaceCommentary("comeback", { user: racer.displayName || racer.username });
  }
  if (racer.progressPercent >= 85 && !racer.finalStretchCommented) {
    racer.finalStretchCommented = true;
    queueLikeRaceCommentary("finalStretch", { user: racer.displayName || racer.username, progress: Math.round(racer.progressPercent) });
  }
  updateLikeRacePersistentStats(userKey, {
    item,
    likes: meta.type === "like" ? Math.max(0, Number(meta.likes) || 0) : 0,
    gifts: meta.type === "gift" ? Math.max(1, Number(meta.giftCount) || 1) : 0,
    giftCoins: meta.type === "gift" ? Math.max(0, Number(meta.giftCoins) || 0) : 0,
    distance: Math.max(0, Number(spaces) || 0)
  });
  refreshLikeRaceRanks();
  const updatedRacer = race.racers.get(userKey);
  if (updatedRacer && updatedRacer.currentRank < previousRank) {
    const overtaken = previousLeaderboard.find((entry) => entry.currentRank === updatedRacer.currentRank && entry.userId !== userKey)
      || previousLeaderboard.find((entry) => entry.currentRank > updatedRacer.currentRank && entry.currentRank <= previousRank && entry.userId !== userKey);
    queueLikeRaceCommentary("overtake", {
      user: updatedRacer.displayName || updatedRacer.username,
      user1: updatedRacer.displayName || updatedRacer.username,
      user2: overtaken?.displayName || overtaken?.username || "another racer",
      position: updatedRacer.currentRank,
      progress: Math.round(updatedRacer.progressPercent)
    }, { showCentre: true });
  }
  if (racer.spacesMoved >= race.totalSpaces) {
    finishLikeRace(racer);
    return;
  }
  syncLikeRaceOverlayState();
}

function startLikeRaceCountdown(countdownSeconds = null, totalSpaces = null, options = {}) {
  const settings = getLikeRaceSettings();
  if (!settings.enabled && !options.test) {
    showToast("Enable Like Race before starting.", "error");
    return;
  }
  const race = getLikeRace();
  if (race.raceStatus === "running" || race.raceStatus === "countdown") {
    showToast("A Like Race is already active.", "info");
    return;
  }
  resetLikeRaceRacersForNewRace();
  race.id = `like-race-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  race.raceStatus = "countdown";
  race.countdownSeconds = Math.max(0, Math.min(120, Number(countdownSeconds ?? settings.defaultCountdownSeconds) || 0));
  race.totalSpaces = Math.max(10, Number(totalSpaces ?? settings.defaultRaceDistance) || settings.defaultRaceDistance);
  race.likeMultiplier = Math.max(0, Number(settings.likeMultiplier) || 1);
  race.giftMultiplier = Math.max(0, Number(settings.giftMultiplier) || 5);
  race.countdownEndsAt = new Date(Date.now() + (race.countdownSeconds * 1000)).toISOString();
  race.winner = null;
  race.startedAt = null;
  race.finishedAt = null;
  race.disqualifiedUsers = new Set();
  race.overlayVisibleUntil = "";
  race.middleContentVisibleUntil = race.countdownEndsAt;
  clearTimeout(likeRaceCountdownTimer);
  queueLikeRaceCommentary("raceStarting", { distance: race.totalSpaces }, { force: true });
  queueLikeRaceCommentary("countdown", { distance: race.totalSpaces });
  syncLikeRaceOverlayState();
  likeRaceCountdownTimer = window.setTimeout(() => {
    race.raceStatus = "running";
    race.startedAt = Date.now();
    race.countdownEndsAt = "";
    race.middleContentVisibleUntil = "";
    void playLikeRaceSound(getLikeRaceSettings().countdownSoundId, "Like Race countdown complete sound");
    queueLikeRaceCommentary("raceStarted", { distance: race.totalSpaces }, { force: true });
    startLikeRaceInactiveMonitor();
    syncLikeRaceOverlayState();
  }, Math.max(250, race.countdownSeconds * 1000));
}

function resetLikeRace(options = {}) {
  clearTimeout(likeRaceCountdownTimer);
  clearInterval(likeRaceInactiveTimer);
  state.likeRace = createEmptyLikeRace(options.keepLobby ? "lobby" : "idle");
  syncLikeRaceOverlayState();
}

function endLikeRace(manual = true) {
  const race = getLikeRace();
  const settings = getLikeRaceSettings();
  if (race.raceStatus === "idle") {
    return;
  }
  clearTimeout(likeRaceCountdownTimer);
  clearInterval(likeRaceInactiveTimer);
  race.raceStatus = "finished";
  race.finishedAt = Date.now();
  race.overlayVisibleUntil = new Date(Date.now() + (Math.max(1, Number(settings.overlayAutoHideSeconds) || 6) * 1000)).toISOString();
  race.middleContentVisibleUntil = race.overlayVisibleUntil;
  queueLikeRaceCommentary("raceEnded", {}, { force: true, forceTts: manual });
  void playLikeRaceSound(settings.finishSoundId, "Like Race finish sound");
  syncLikeRaceOverlayState();
}

function handleLikeRaceEarlyTap(item) {
  const settings = getLikeRaceSettings();
  const race = getLikeRace();
  if (!settings.disqualifyEarlyTappers || !["lobby", "countdown"].includes(race.raceStatus)) {
    return false;
  }
  const userKey = normalizeUserKey(item?.user || "");
  if (!userKey || !race.racers.has(userKey)) {
    return false;
  }

  const racer = race.racers.get(userKey);
  race.racers.delete(userKey);
  race.disqualifiedUsers.add(userKey);
  const displayName = racer?.displayName || item?.nickname || userKey;
  addLocalSystemChatMessage(`Like Race: ${displayName} was disqualified for tapping before the race started.`);
  queueLikeRaceCommentary("inactive", { user: displayName }, {
    force: true,
    showCentre: true,
    text: `${displayName} jumped the start and has been disqualified!`
  });
  syncLikeRaceOverlayState();
  return true;
}

function renderLikeRaceSummary() {
  if (!likeRaceLiveSummary || !state.settings) {
    return;
  }
  const race = getLikeRace();
  const leaderboard = getLikeRaceRacerList().slice(0, 5);
  if (likeRaceStatusPill) {
    likeRaceStatusPill.textContent = race.raceStatus;
  }
  likeRaceLiveSummary.innerHTML = `
    <div class="like-race-summary-grid">
      <span><strong>${escapeHtml(race.raceStatus)}</strong><small>Status</small></span>
      <span><strong>${escapeHtml(String(race.racers.size))}</strong><small>Racers</small></span>
      <span><strong>${escapeHtml(String(Math.round(race.totalSpaces)))}</strong><small>Distance</small></span>
      <span><strong>${escapeHtml(race.currentLeader?.username || "--")}</strong><small>Leader</small></span>
    </div>
    <div class="like-race-leader-list">
      ${leaderboard.map((racer) => `<span>#${racer.currentRank} ${escapeHtml(racer.displayName || racer.username)} ${Math.round(racer.progressPercent)}%</span>`).join("") || "<span>No racers joined yet.</span>"}
    </div>
  `;
}

function isEditingLikeRaceCommentary() {
  return Boolean(document.activeElement && likeRaceCommentaryList?.contains(document.activeElement));
}

function saveLikeRaceCommentaryAfterTyping(delayMs = 1200) {
  window.clearTimeout(likeRaceCommentarySaveTimer);
  likeRaceCommentarySaveTimer = window.setTimeout(() => {
    likeRaceCommentarySaveTimer = null;
    if (isEditingLikeRaceCommentary()) {
      saveLikeRaceCommentaryAfterTyping(delayMs);
      return;
    }
    state.settings.likeRaceSettings = collectLikeRaceSettingsFromUi();
    scheduleSettingsSave();
    syncLikeRaceOverlayState();
  }, Math.max(250, Number(delayMs) || 1200));
}

function flushLikeRaceCommentarySave() {
  window.clearTimeout(likeRaceCommentarySaveTimer);
  likeRaceCommentarySaveTimer = null;
  state.settings.likeRaceSettings = collectLikeRaceSettingsFromUi();
  scheduleSettingsSave();
  syncLikeRaceOverlayState();
}

function renderLikeRaceCommentaryEditor() {
  if (!likeRaceCommentaryList || !state.settings) {
    return;
  }
  if (isEditingLikeRaceCommentary()) {
    return;
  }
  const settings = getLikeRaceSettings();
  likeRaceCommentaryList.innerHTML = LIKE_RACE_COMMENTARY_EVENTS.map((eventType) => `
    <label class="field">
      <span>${escapeHtml(LIKE_RACE_COMMENTARY_LABELS[eventType] || eventType)}</span>
      <textarea data-like-race-commentary="${escapeHtml(eventType)}" rows="3">${escapeHtml((settings.commentaryPhrases?.[eventType] ?? []).join("\n"))}</textarea>
    </label>
  `).join("");
}

function renderLikeRaceSettings() {
  if (!likeRaceEnabledInput || !state.settings) {
    return;
  }
  if (isEditingLikeRaceCommentary()) {
    renderLikeRaceSummary();
    return;
  }
  const settings = getLikeRaceSettings();
  likeRaceEnabledInput.checked = settings.enabled;
  likeRaceCountdownInput.value = String(settings.defaultCountdownSeconds);
  likeRaceDistanceInput.value = String(settings.defaultRaceDistance);
  likeRaceLikeMultiplierInput.value = String(settings.likeMultiplier);
  likeRaceGiftMultiplierInput.value = String(settings.giftMultiplier);
  likeRaceMaxRacersInput.value = String(settings.maxRacers);
  likeRaceInactiveTimeoutInput.value = String(settings.inactiveTimeoutSeconds);
  likeRaceCentreMessageSecondsInput.value = String(settings.centreMessageSeconds);
  likeRaceOverlayAutoHideSecondsInput.value = String(settings.overlayAutoHideSeconds);
  likeRaceStartRoleInput.value = settings.startRole;
  likeRaceCommentaryStyleInput.value = settings.commentaryStyle;
  if (likeRaceCountdownSoundInput) {
    likeRaceCountdownSoundInput.value = settings.countdownSoundId;
    if (likeRaceCountdownSoundOptions) {
      likeRaceCountdownSoundOptions.innerHTML = buildSoundDataListOptionsMarkup(settings.countdownSoundId, likeRaceCountdownSoundSearchInput?.value ?? "");
    }
    if (likeRaceCountdownSoundSearchInput && document.activeElement !== likeRaceCountdownSoundSearchInput) {
      likeRaceCountdownSoundSearchInput.value = getSoundTitleById(settings.countdownSoundId);
    }
  }
  if (likeRaceFinishSoundInput) {
    likeRaceFinishSoundInput.value = settings.finishSoundId;
    if (likeRaceFinishSoundOptions) {
      likeRaceFinishSoundOptions.innerHTML = buildSoundDataListOptionsMarkup(settings.finishSoundId, likeRaceFinishSoundSearchInput?.value ?? "");
    }
    if (likeRaceFinishSoundSearchInput && document.activeElement !== likeRaceFinishSoundSearchInput) {
      likeRaceFinishSoundSearchInput.value = getSoundTitleById(settings.finishSoundId);
    }
  }
  likeRaceAllowLateJoinsInput.checked = settings.allowLateJoins;
  likeRaceAutoRemoveInactiveInput.checked = settings.autoRemoveInactive;
  likeRaceAnimationsInput.checked = settings.animationsEnabled;
  likeRaceTtsEnabledInput.checked = settings.ttsEnabled;
  likeRaceSillyCommentaryInput.checked = settings.sillyCommentary;
  likeRaceHypeCommentaryInput.checked = settings.hypeCommentary;
  likeRaceRoastCommentaryInput.checked = settings.roastCommentary;
  likeRaceFamilyFilterInput.checked = settings.familyFriendly;
  likeRaceDisqualifyEarlyTappersInput.checked = settings.disqualifyEarlyTappers;
  likeRaceTrackColorInput.value = settings.trackColor;
  likeRaceAccentColorInput.value = settings.accentColor;
  likeRaceAvatarSizeInput.value = String(settings.avatarSize);
  likeRaceUsernameSizeInput.value = String(settings.usernameSize);
  likeRaceOverlayOpacityInput.value = String(settings.overlayOpacity);
  likeRaceBackgroundColorInput.value = settings.backgroundColor;
  likeRaceBackgroundImageInput.value = settings.backgroundImage;
  likeRaceTitleColorInput.value = settings.titleColor;
  likeRaceTitleSizeInput.value = String(settings.titleSize);
  likeRaceLabelColorInput.value = settings.labelColor;
  likeRaceLabelSizeInput.value = String(settings.labelSize);
  likeRaceMutedColorInput.value = settings.mutedColor;
  likeRaceCommentarySizeInput.value = String(settings.commentarySize);
  renderLikeRaceCommentaryEditor();
  renderLikeRaceSummary();
}

function collectLikeRaceSettingsFromUi(existing = state.settings?.likeRaceSettings) {
  const current = normalizeLikeRaceSettings(existing);
  const selectedStyle = String(likeRaceCommentaryStyleInput?.value ?? current.commentaryStyle).trim();
  const styleChanged = selectedStyle !== current.commentaryStyle;
  const phrases = styleChanged && selectedStyle !== "custom"
    ? cloneLikeRaceCommentaryPreset(selectedStyle)
    : { ...current.commentaryPhrases };
  if (!styleChanged || selectedStyle === "custom") {
    likeRaceCommentaryList?.querySelectorAll("[data-like-race-commentary]").forEach((textarea) => {
      phrases[textarea.dataset.likeRaceCommentary] = String(textarea.value ?? "")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
    });
  }
  return normalizeLikeRaceSettings({
    ...current,
    enabled: Boolean(likeRaceEnabledInput?.checked),
    defaultCountdownSeconds: Number(likeRaceCountdownInput?.value ?? current.defaultCountdownSeconds),
    defaultRaceDistance: Number(likeRaceDistanceInput?.value ?? current.defaultRaceDistance),
    likeMultiplier: Number(likeRaceLikeMultiplierInput?.value ?? current.likeMultiplier),
    giftMultiplier: Number(likeRaceGiftMultiplierInput?.value ?? current.giftMultiplier),
    maxRacers: Number(likeRaceMaxRacersInput?.value ?? current.maxRacers),
    inactiveTimeoutSeconds: Number(likeRaceInactiveTimeoutInput?.value ?? current.inactiveTimeoutSeconds),
    centreMessageSeconds: Number(likeRaceCentreMessageSecondsInput?.value ?? current.centreMessageSeconds),
    overlayAutoHideSeconds: Number(likeRaceOverlayAutoHideSecondsInput?.value ?? current.overlayAutoHideSeconds),
    startRole: String(likeRaceStartRoleInput?.value ?? current.startRole),
    countdownSoundId: String(likeRaceCountdownSoundInput?.value ?? current.countdownSoundId),
    finishSoundId: String(likeRaceFinishSoundInput?.value ?? current.finishSoundId),
    commentaryStyle: selectedStyle,
    allowLateJoins: Boolean(likeRaceAllowLateJoinsInput?.checked),
    autoRemoveInactive: Boolean(likeRaceAutoRemoveInactiveInput?.checked),
    animationsEnabled: Boolean(likeRaceAnimationsInput?.checked),
    ttsEnabled: Boolean(likeRaceTtsEnabledInput?.checked),
    sillyCommentary: Boolean(likeRaceSillyCommentaryInput?.checked),
    hypeCommentary: Boolean(likeRaceHypeCommentaryInput?.checked),
    roastCommentary: Boolean(likeRaceRoastCommentaryInput?.checked),
    familyFriendly: Boolean(likeRaceFamilyFilterInput?.checked),
    disqualifyEarlyTappers: Boolean(likeRaceDisqualifyEarlyTappersInput?.checked),
    trackColor: String(likeRaceTrackColorInput?.value ?? current.trackColor),
    accentColor: String(likeRaceAccentColorInput?.value ?? current.accentColor),
    avatarSize: Number(likeRaceAvatarSizeInput?.value ?? current.avatarSize),
    usernameSize: Number(likeRaceUsernameSizeInput?.value ?? current.usernameSize),
    overlayOpacity: Number(likeRaceOverlayOpacityInput?.value ?? current.overlayOpacity),
    backgroundColor: String(likeRaceBackgroundColorInput?.value ?? current.backgroundColor),
    backgroundImage: String(likeRaceBackgroundImageInput?.value ?? current.backgroundImage),
    titleColor: String(likeRaceTitleColorInput?.value ?? current.titleColor),
    titleSize: Number(likeRaceTitleSizeInput?.value ?? current.titleSize),
    labelColor: String(likeRaceLabelColorInput?.value ?? current.labelColor),
    labelSize: Number(likeRaceLabelSizeInput?.value ?? current.labelSize),
    mutedColor: String(likeRaceMutedColorInput?.value ?? current.mutedColor),
    commentarySize: Number(likeRaceCommentarySizeInput?.value ?? current.commentarySize),
    commentaryPhrases: phrases
  });
}

function getSpinWheelSettings() {
  state.settings.spinWheelSettings = normalizeSpinWheelSettings(state.settings?.spinWheelSettings);
  return state.settings.spinWheelSettings;
}

function getSpinWheelOverlayUrl() {
  return String(state.spinWheelOverlayBaseUrl ?? "").trim();
}

function getCustomRuleOptionsMarkup(selectedRuleId = "", emptyLabel = "No action") {
  const selected = String(selectedRuleId ?? "").trim();
  const rules = Array.isArray(state.settings?.customEventRules) ? state.settings.customEventRules : [];
  return [
    `<option value="">${escapeHtml(emptyLabel)}</option>`,
    ...rules.map((rule) => `<option value="${escapeHtml(rule.id)}"${rule.id === selected ? " selected" : ""}>${escapeHtml(rule.name || "Unnamed rule")}</option>`)
  ].join("");
}

function buildSpinWheelGiftOptionsMarkup(selectedGiftName = "", searchText = "") {
  const selectedGiftKey = normalizeGiftKey(selectedGiftName);
  const normalizedSearch = String(searchText ?? "").trim().toLowerCase();
  const gifts = getKnownTikTokGifts()
    .filter((gift) => !normalizedSearch || gift.giftName.toLowerCase().includes(normalizedSearch))
    .slice(0, 80);
  const clearOption = `
    <button type="button" class="gift-trigger-option${selectedGiftKey ? "" : " selected"}" data-spin-wheel-gift-option="">
      <span class="gift-trigger-fallback-icon">-</span>
      <span>Any gift disabled</span>
    </button>
  `;
  return `${clearOption}${gifts.map((gift) => {
    const icon = getGiftImageMarkup(String(gift.giftImageUrl ?? "").trim(), gift.coinValue);
    const coinLabel = Number(gift.coinValue) > 0 ? `${gift.coinValue} coin${Number(gift.coinValue) === 1 ? "" : "s"}` : "coin value unknown";
    const selected = normalizeGiftKey(gift.giftName) === selectedGiftKey ? " selected" : "";
    return `
      <button type="button" class="gift-trigger-option${selected}" data-spin-wheel-gift-option="${escapeHtml(gift.giftName)}">
        ${icon}
        <span>${escapeHtml(`${gift.giftName} (${coinLabel})`)}</span>
      </button>
    `;
  }).join("")}`;
}

function updateSpinWheelGiftPicker(settings = getSpinWheelSettings()) {
  if (spinWheelGiftNameInput) {
    spinWheelGiftNameInput.value = settings.giftName;
  }
  if (spinWheelGiftSelected) {
    spinWheelGiftSelected.textContent = settings.giftName || "No gift trigger selected";
  }
  if (spinWheelGiftOptions) {
    spinWheelGiftOptions.innerHTML = buildSpinWheelGiftOptionsMarkup(settings.giftName, spinWheelGiftSearchInput?.value ?? "");
  }
}

function renderSpinWheelSegmentRows() {
  if (!spinWheelSegmentsList) {
    return;
  }
  const settings = getSpinWheelSettings();
  spinWheelSegmentsList.innerHTML = settings.segments.map((segment, index) => `
    <div class="spin-wheel-segment-row" data-spin-wheel-segment-id="${escapeHtml(segment.id)}">
      <span class="spin-wheel-segment-number">${index + 1}</span>
      <label class="field compact-field">
        <span>Segment label</span>
        <input type="text" data-spin-wheel-segment-label value="${escapeHtml(segment.label)}" maxlength="40" />
      </label>
      <label class="field compact-field color-field">
        <span>Colour</span>
        <input type="color" data-spin-wheel-segment-color value="${escapeHtml(segment.color)}" />
      </label>
      <label class="field compact-field">
        <span>Action to trigger</span>
        <select data-spin-wheel-segment-action>${getCustomRuleOptionsMarkup(segment.actionRuleId)}</select>
      </label>
      <button type="button" class="ghost icon-button compact-icon-button danger" data-spin-wheel-delete-segment="${escapeHtml(segment.id)}" title="Delete segment" aria-label="Delete segment">&#128465;</button>
    </div>
  `).join("");
}

function renderSpinWheelSettings() {
  if (!spinWheelEnabledInput || !state.settings) {
    return;
  }
  const settings = getSpinWheelSettings();
  spinWheelEnabledInput.checked = settings.enabled;
  spinWheelCommandEnabledInput.checked = settings.commandEnabled;
  if (spinWheelDurationInput) {
    spinWheelDurationInput.value = String(Math.round(settings.durationMs / 1000));
  }
  if (spinWheelResultDurationInput) {
    spinWheelResultDurationInput.value = String(Math.round(settings.resultDurationMs / 1000));
  }
  if (spinWheelArrowPositionInput) {
    spinWheelArrowPositionInput.value = settings.arrowPosition;
  }
  if (spinWheelEventRuleSelect) {
    spinWheelEventRuleSelect.innerHTML = getCustomRuleOptionsMarkup(settings.eventRuleId, "No event trigger");
    spinWheelEventRuleSelect.value = settings.eventRuleId;
  }
  updateSpinWheelGiftPicker(settings);
  renderSpinWheelSegmentRows();
  updateSpinWheelOverlayControls();
}

function refreshSpinWheelActionOptions() {
  if (!state.settings) {
    return;
  }

  if (spinWheelEventRuleSelect) {
    const selectedEventRuleId = String(spinWheelEventRuleSelect.value || state.settings?.spinWheelSettings?.eventRuleId || "").trim();
    spinWheelEventRuleSelect.innerHTML = getCustomRuleOptionsMarkup(selectedEventRuleId, "No event trigger");
    spinWheelEventRuleSelect.value = selectedEventRuleId;
  }

  spinWheelSegmentsList?.querySelectorAll("[data-spin-wheel-segment-action]").forEach((select) => {
    const selectedRuleId = String(select.value ?? "").trim();
    select.innerHTML = getCustomRuleOptionsMarkup(selectedRuleId);
    select.value = selectedRuleId;
  });
}

function collectSpinWheelSettingsFromUi(existing = state.settings?.spinWheelSettings) {
  const current = normalizeSpinWheelSettings(existing);
  const segments = spinWheelSegmentsList
    ? Array.from(spinWheelSegmentsList.querySelectorAll("[data-spin-wheel-segment-id]")).map((row, index) => ({
        id: String(row.dataset.spinWheelSegmentId ?? `spin-action-${index + 1}`).trim(),
        label: String(row.querySelector("[data-spin-wheel-segment-label]")?.value ?? `Action ${index + 1}`).trim(),
        color: String(row.querySelector("[data-spin-wheel-segment-color]")?.value ?? current.segments[index]?.color ?? "#15c66f").trim(),
        actionRuleId: String(row.querySelector("[data-spin-wheel-segment-action]")?.value ?? "").trim()
      }))
    : current.segments;

  return normalizeSpinWheelSettings({
    ...current,
    enabled: Boolean(spinWheelEnabledInput?.checked),
    commandEnabled: Boolean(spinWheelCommandEnabledInput?.checked),
    giftName: String(spinWheelGiftNameInput?.value ?? current.giftName).trim(),
    eventRuleId: String(spinWheelEventRuleSelect?.value ?? current.eventRuleId).trim(),
    durationMs: Math.max(1, Number(spinWheelDurationInput?.value ?? current.durationMs / 1000) || 5) * 1000,
    resultDurationMs: Math.max(1, Number(spinWheelResultDurationInput?.value ?? current.resultDurationMs / 1000) || 5) * 1000,
    arrowPosition: String(spinWheelArrowPositionInput?.value ?? current.arrowPosition),
    segments
  });
}

function buildSpinWheelOverlayState() {
  const settings = getSpinWheelSettings();
  const spinState = state.spinWheelState ?? {
    phase: "idle",
    spinId: "",
    selectedIndex: 0,
    winnerLabel: "",
    triggeredBy: "",
    triggerUser: null
  };
  const segments = Array.isArray(spinState.segments) && spinState.segments.length
    ? spinState.segments
    : settings.segments;

  return {
    visible: spinState.phase === "spinning" || spinState.phase === "result",
    phase: spinState.phase,
    spinId: spinState.spinId,
    durationMs: settings.durationMs,
    resultDurationMs: settings.resultDurationMs,
    arrowPosition: settings.arrowPosition,
    selectedIndex: Math.max(0, Number(spinState.selectedIndex) || 0),
    winnerLabel: String(spinState.winnerLabel ?? "").trim(),
    triggeredBy: String(spinState.triggeredBy ?? "").trim(),
    triggerUser: spinState.triggerUser && typeof spinState.triggerUser === "object"
      ? {
          username: String(spinState.triggerUser.username ?? "").trim(),
          displayName: String(spinState.triggerUser.displayName ?? "").trim(),
          profilePictureUrl: String(spinState.triggerUser.profilePictureUrl ?? "").trim()
        }
      : null,
    segments
  };
}

function syncSpinWheelOverlayState() {
  const overlayState = buildSpinWheelOverlayState();
  if (state.authenticatedUser?.id && state.authenticatedUser?.sessionToken) {
    void authRequest("/api/overlay/update-spin-wheel-state", {
      userId: state.authenticatedUser.id,
      sessionToken: state.authenticatedUser.sessionToken,
      ...overlayState
    }).catch(() => {
      // Hosted overlay sync should not interrupt local wheel controls.
    });
  }

  if (app.updateSpinWheelOverlayState) {
    void app.updateSpinWheelOverlayState(overlayState).catch(() => {
      // Keep controls responsive even if the local overlay server is restarting.
    });
  }
}

function updateSpinWheelOverlayControls(info = {}) {
  if (Object.prototype.hasOwnProperty.call(info, "url")) {
    const nextUrl = String(info.url ?? "").trim();
    const hasHostedUrl = /^https:\/\/streamsyncpro\.co\.uk\//i.test(String(state.spinWheelOverlayBaseUrl ?? ""));
    const nextIsLocalUrl = /^http:\/\/(?:localhost|127\.0\.0\.1):/i.test(nextUrl);
    if (!(state.authenticatedUser?.id && hasHostedUrl && nextIsLocalUrl)) {
      state.spinWheelOverlayBaseUrl = nextUrl;
    }
  }
  const overlayUrl = getSpinWheelOverlayUrl();
  if (spinWheelOverlayUrlInput) {
    spinWheelOverlayUrlInput.value = overlayUrl || "Overlay unavailable";
  }
  if (spinWheelOverlayCopyButton) {
    spinWheelOverlayCopyButton.disabled = overlayUrl === "";
  }
  if (spinWheelOverlayOpenButton) {
    spinWheelOverlayOpenButton.disabled = overlayUrl === "";
  }
  setStatusMessage(
    spinWheelStatus,
    overlayUrl ? "success" : "error",
    overlayUrl
      ? "Spin Wheel transparent overlay URL is ready."
      : "Spin Wheel overlay is unavailable right now."
  );
}

async function loadSpinWheelOverlayInfo() {
  try {
    const info = await app.getSpinWheelOverlayInfo();
    updateSpinWheelOverlayControls(info);
    syncSpinWheelOverlayState();
  } catch (error) {
    state.spinWheelOverlayBaseUrl = "";
    updateSpinWheelOverlayControls();
    setStatusMessage(spinWheelStatus, "error", error.message || "Unable to prepare Spin Wheel overlay.");
  }
}

function getSpinWheelTriggerLabel(sourceItem = null, source = "manual") {
  if (source === "gift") {
    return `${sourceItem?.nickname || sourceItem?.displayName || sourceItem?.user || "Viewer"} sent ${sourceItem?.giftName || "a gift"}`;
  }
  if (source === "command") {
    return `${sourceItem?.nickname || sourceItem?.displayName || sourceItem?.user || "Viewer"} used !spin`;
  }
  if (source === "event") {
    return "Event action trigger";
  }
  return "Manual test";
}

function getSpinWheelTriggerUser(sourceItem = null) {
  const userKey = normalizeUserKey(sourceItem?.user || sourceItem?.uniqueId || sourceItem?.username || "");
  if (!userKey) {
    return {
      username: "",
      displayName: "",
      profilePictureUrl: ""
    };
  }

  const cachedProfile = state.sessionUserProfiles.get(userKey) ?? {};
  return {
    username: userKey,
    displayName: String(
      sourceItem?.nickname
      || sourceItem?.displayName
      || sourceItem?.username
      || cachedProfile.nickname
      || userKey
    ).trim() || userKey,
    profilePictureUrl: String(sourceItem?.profilePictureUrl || cachedProfile.profilePictureUrl || "").trim()
  };
}

async function startSpinWheel(sourceItem = null, options = {}) {
  const settings = normalizeSpinWheelSettings(collectSpinWheelSettingsFromUi());
  state.settings.spinWheelSettings = settings;
  if (!settings.enabled && !options.force) {
    showToast("Enable Spin Wheel before starting.", "error");
    return false;
  }
  if (state.spinWheelState?.phase === "spinning") {
    showToast("Spin Wheel is already spinning.", "info");
    return false;
  }
  const segments = settings.segments.map((segment, index) => ({
    ...segment,
    label: String(segment.label ?? `Action ${index + 1}`).trim() || `Action ${index + 1}`
  }));
  if (!segments.length) {
    showToast("Add at least one Spin Wheel segment first.", "error");
    return false;
  }

  if (state.spinWheelTimer) {
    window.clearTimeout(state.spinWheelTimer);
    state.spinWheelTimer = null;
  }

  const selectedIndex = Math.floor(Math.random() * segments.length);
  const winner = segments[selectedIndex];
  const triggerUser = getSpinWheelTriggerUser(sourceItem);
  state.spinWheelState = {
    phase: "spinning",
    spinId: `spin-wheel-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    selectedIndex,
    winnerLabel: winner.label,
    triggeredBy: getSpinWheelTriggerLabel(sourceItem, options.source || "manual"),
    triggerUser,
    segments
  };
  syncSpinWheelOverlayState();
  setStatusMessage(spinWheelStatus, "info", `Spin Wheel spinning for ${state.spinWheelState.triggeredBy}.`);

  state.spinWheelTimer = window.setTimeout(() => {
    state.spinWheelState = {
      ...state.spinWheelState,
      phase: "result",
      selectedIndex,
      winnerLabel: winner.label,
      triggerUser,
      segments
    };
    syncSpinWheelOverlayState();
    setStatusMessage(spinWheelStatus, "success", `Spin Wheel selected: ${winner.label}.`);
    const actionRule = state.settings.customEventRules.find((rule) => rule.id === winner.actionRuleId);
    if (actionRule) {
      void triggerCustomRule(actionRule, {
        sourceItem,
        fromSpinWheel: true
      });
    }
    state.spinWheelTimer = window.setTimeout(() => {
      state.spinWheelState = {
        ...state.spinWheelState,
        phase: "idle"
      };
      syncSpinWheelOverlayState();
    }, settings.resultDurationMs);
  }, settings.durationMs);

  return true;
}

function maybeTriggerSpinWheelFromGift(item) {
  const settings = getSpinWheelSettings();
  if (!settings.enabled || !settings.giftName) {
    return;
  }
  if (normalizeGiftKey(item?.giftName) !== normalizeGiftKey(settings.giftName)) {
    return;
  }
  void startSpinWheel(item, { source: "gift" });
}

function parseStartRaceCommand(messageText) {
  const parts = String(messageText ?? "").trim().split(/\s+/).slice(1);
  const countdownMatch = String(parts[0] ?? "").match(/^(\d+)s?$/i);
  const countdownSeconds = countdownMatch ? Number(countdownMatch[1]) : null;
  const distance = Number(parts[countdownMatch ? 1 : 0] ?? NaN);
  return {
    countdownSeconds,
    distance: Number.isFinite(distance) && distance > 0 ? distance : null
  };
}

async function handleSpinWheelCommand(item) {
  if (item.type !== "chat") {
    return false;
  }
  const messageText = String(item.message ?? item.text ?? "").trim();
  const command = messageText.split(/\s+/)[0]?.toLowerCase();
  if (command !== "!spin") {
    return false;
  }
  const settings = getSpinWheelSettings();
  if (!settings.enabled || !settings.commandEnabled) {
    showToast(`@${item.user || "viewer"} tried !spin, but Spin Wheel commands are disabled.`, "info");
    return true;
  }
  await startSpinWheel(item, { source: "command" });
  return true;
}

async function handleLikeRaceCommand(item) {
  if (item.type !== "chat") {
    return false;
  }
  const messageText = String(item.message ?? item.text ?? "").trim();
  const command = messageText.split(/\s+/)[0]?.toLowerCase();
  if (!["!joinrace", "!startrace", "!endrace", "!racestatus", "!raceleaderboard", "!topracers", "!lastracewinner"].includes(command)) {
    return false;
  }
  if (command === "!joinrace") {
    const result = addLikeRaceRacer(item);
    if (!result.added && result.reason !== "Already joined.") {
      showToast(`@${item.user} could not join race: ${result.reason}`, "info");
    }
    return true;
  }
  if (["!startrace", "!endrace"].includes(command) && !canUserControlLikeRace(item)) {
    showToast(`@${item.user} cannot control Like Race with the current role setting.`, "error");
    return true;
  }
  if (command === "!startrace") {
    const parsed = parseStartRaceCommand(messageText);
    startLikeRaceCountdown(parsed.countdownSeconds, parsed.distance);
    return true;
  }
  if (command === "!endrace") {
    endLikeRace(true);
    return true;
  }
  if (command === "!racestatus") {
    const race = getLikeRace();
    addLocalSystemChatMessage(`Like Race status: ${race.raceStatus}, ${race.racers.size} racers, ${Math.round(race.totalSpaces)} spaces.`);
    return true;
  }
  if (command === "!raceleaderboard") {
    const text = getLikeRaceRacerList().slice(0, 5).map((racer) => `#${racer.currentRank} ${racer.username} ${Math.round(racer.progressPercent)}%`).join(", ") || "No racers yet.";
    addLocalSystemChatMessage(`Like Race leaderboard: ${text}`);
    return true;
  }
  if (command === "!topracers") {
    const stats = normalizeLikeRaceStats(state.settings?.likeRaceStats);
    const text = Object.values(stats.racers)
      .sort((left, right) => right.wins - left.wins || right.totalDistance - left.totalDistance)
      .slice(0, 5)
      .map((racer, index) => `#${index + 1} ${racer.username} ${racer.wins} wins`)
      .join(", ") || "No race stats yet.";
    addLocalSystemChatMessage(`Top racers: ${text}`);
    return true;
  }
  if (command === "!lastracewinner") {
    const winner = state.settings?.likeRaceStats?.lastRaceWinner;
    addLocalSystemChatMessage(winner?.username ? `Last Like Race winner: ${winner.username}.` : "No Like Race winner yet.");
    return true;
  }
  return false;
}

function clearQueuedPlaybackItem(itemId, options = {}) {
  const silent = Boolean(options?.silent);
  for (const lane of playbackQueues.values()) {
    const itemIndex = lane.items.findIndex((entry) => entry.id === itemId);
    if (itemIndex === -1) {
      continue;
    }

      const [item] = lane.items.splice(itemIndex, 1);
      item.cancelled = true;
      if (item.status === "running") {
        stopCurrentAudioPlayback();
      }
      state.playbackQueueItems = state.playbackQueueItems.filter((entry) => entry.id !== itemId);
      updateQueueIndicators();
      item.reject(createQueueClearedError());
      if (!silent) {
        showToast(`${item.status === "running" ? "Stopped" : "Cleared"} queued action: ${item.label}`, "info");
      }
      return true;
    }

  return false;
}

function clearFilteredPlaybackItems() {
  const clearableIds = getFilteredQueueItems()
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
    .filter((item) => !clearKinds || clearKinds.has(item.kind))
    .map((item) => item.id);

  for (const itemId of clearableIds) {
    clearQueuedPlaybackItem(itemId, { silent: true });
  }
}

function resumePausedTtsQueues() {
  for (const lane of playbackQueues.values()) {
    if (lane.items.some((item) => item.kind === "tts")) {
      void processPlaybackLane(lane.laneId);
    }
  }
}

function findRunningTtsQueueItemId() {
  return state.playbackQueueItems.find((item) => item.kind === "tts" && item.status === "running")?.id ?? "";
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
      if (item.kind === "tts" && state.ttsQueuePaused) {
        break;
      }
      item.status = "running";
      updateQueueIndicators();

      try {
        const timeout = new Promise((_, reject) => {
          item.timeoutId = window.setTimeout(() => {
            item.cancelled = true;
            stopCurrentAudioPlayback();
            reject(new Error(`Playback timed out and was stopped: ${item.label}`));
          }, PLAYBACK_ITEM_TIMEOUT_MS);
        });
        const result = await Promise.race([item.execute(item), timeout]);
        if (item.cancelled) {
          throw createPlaybackStoppedError();
        }
        item.resolve(result);
      } catch (error) {
        item.reject(error);
      } finally {
        if (item.timeoutId) {
          window.clearTimeout(item.timeoutId);
          item.timeoutId = null;
        }
        const currentIndex = lane.items.findIndex((entry) => entry.id === item.id);
        if (currentIndex !== -1) {
          lane.items.splice(currentIndex, 1);
        }
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
  const source = resolveQueueSource(meta);

  return new Promise((resolve, reject) => {
    const entry = {
      id: `queue-${nextPlaybackQueueItemId++}`,
      queueId: normalizedQueueId,
      label: String(meta.label ?? `Queued action on ${getQueueLabel(normalizedQueueId)}`),
      kind: meta.kind === "tts" ? "tts" : "action",
      source,
      status: "queued",
      execute: task,
      resolve,
      reject,
      cancelled: false,
      timeoutId: null
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

function createDefaultViewerStatsAllTime() {
  return {
    users: {}
  };
}

function createDefaultViewerPointsSettings() {
  return {
    enabled: true,
    like: 1,
    comment: 5,
    share: 10,
    follow: 25,
    gift: 50,
    coin: 1,
    subEmote: 5,
    fanEmote: 2,
    subscriberMultiplier: 1.5
  };
}

function normalizeViewerPointsSettings(source = {}) {
  const defaults = createDefaultViewerPointsSettings();
  const numberSetting = (key, min, max) => {
    const numericValue = Number(source?.[key] ?? defaults[key]);
    return Math.max(min, Math.min(max, Number.isFinite(numericValue) ? numericValue : defaults[key]));
  };

  return {
    enabled: Boolean(source?.enabled ?? defaults.enabled),
    like: numberSetting("like", 0, 1000),
    comment: numberSetting("comment", 0, 1000),
    share: numberSetting("share", 0, 1000),
    follow: numberSetting("follow", 0, 1000),
    gift: numberSetting("gift", 0, 1000),
    coin: numberSetting("coin", 0, 1000),
    subEmote: numberSetting("subEmote", 0, 1000),
    fanEmote: numberSetting("fanEmote", 0, 1000),
    subscriberMultiplier: numberSetting("subscriberMultiplier", 1, 100)
  };
}

function createDefaultViewerPointsLeaderboard() {
  return {
    users: {}
  };
}

function normalizeViewerPointsLeaderboard(source = {}) {
  const users = {};
  const sourceUsers = source?.users && typeof source.users === "object" ? source.users : {};

  for (const [userKey, stats] of Object.entries(sourceUsers)) {
    const normalizedUser = normalizeUserKey(userKey);
    if (!normalizedUser) {
      continue;
    }

    users[normalizedUser] = {
      username: String(stats?.username ?? normalizedUser).trim() || normalizedUser,
      displayName: String(stats?.displayName ?? stats?.username ?? normalizedUser).trim() || normalizedUser,
      points: Math.max(0, Number(stats?.points) || 0),
      likes: Math.max(0, Number(stats?.likes) || 0),
      comments: Math.max(0, Number(stats?.comments) || 0),
      shares: Math.max(0, Number(stats?.shares) || 0),
      follows: Math.max(0, Number(stats?.follows) || 0),
      gifts: Math.max(0, Number(stats?.gifts) || 0),
      coins: Math.max(0, Number(stats?.coins) || 0),
      subEmote: Math.max(0, Number(stats?.subEmote) || 0),
      fanEmote: Math.max(0, Number(stats?.fanEmote) || 0),
      lastAwardedAt: Math.max(0, Number(stats?.lastAwardedAt) || 0),
      firstActivityAt: Math.max(0, Number(stats?.firstActivityAt) || 0),
      lastActivityAt: Math.max(0, Number(stats?.lastActivityAt) || 0),
      profilePictureUrl: String(stats?.profilePictureUrl ?? "").trim(),
      isSubscriber: Boolean(stats?.isSubscriber),
      isModerator: Boolean(stats?.isModerator)
    };
  }

  return { users };
}

function normalizeViewerStatsAllTime(source = {}) {
  const users = {};
  const sourceUsers = source?.users && typeof source.users === "object" ? source.users : {};

  for (const [userKey, stats] of Object.entries(sourceUsers)) {
    const normalizedUser = normalizeUserKey(userKey);
    if (!normalizedUser) {
      continue;
    }

    users[normalizedUser] = {
      username: String(stats?.username ?? normalizedUser).trim() || normalizedUser,
      displayName: String(stats?.displayName ?? stats?.username ?? normalizedUser).trim() || normalizedUser,
      likes: Math.max(0, Number(stats?.likes) || 0),
      gifts: Math.max(0, Number(stats?.gifts) || 0),
      comments: Math.max(0, Number(stats?.comments) || 0),
      shares: Math.max(0, Number(stats?.shares) || 0),
      follows: Math.max(0, Number(stats?.follows) || 0),
      coins: Math.max(0, Number(stats?.coins) || 0)
    };
  }

  return { users };
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
    tiktok: {},
    elevenlabs: {},
    xtts: {}
  };

  if (!source || typeof source !== "object") {
    return normalized;
  }

  for (const providerKey of ["builtin", "tiktok", "elevenlabs", "xtts"]) {
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

function createXttsVoiceId() {
  return `xtts-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function normalizeXttsVoiceTuning(source = {}) {
  const numberOrFallback = (value, fallback) => {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : fallback;
  };

  return {
    strength: clamp(numberOrFallback(source?.strength ?? source?.cloneStrength, 0.75), 0, 1),
    echo: clamp(numberOrFallback(source?.echo, 0), 0, 1),
    reverb: clamp(numberOrFallback(source?.reverb, 0), 0, 1),
    robotic: clamp(numberOrFallback(source?.robotic, 0), 0, 1),
    rate: clamp(numberOrFallback(source?.rate, 1), 0.7, 1.5),
    pitch: clamp(numberOrFallback(source?.pitch, 1), 0.5, 1.8)
  };
}

function normalizeXttsVoices(source = []) {
  if (!Array.isArray(source)) {
    return [];
  }

  const seen = new Set();
  return source
    .map((voice) => {
      const id = String(voice?.id ?? "").trim() || createXttsVoiceId();
      const name = String(voice?.name ?? "").trim();
      const legacySamplePath = String(voice?.samplePath ?? "").trim();
      const samplePaths = Array.from(new Set([
        legacySamplePath,
        ...(Array.isArray(voice?.samplePaths) ? voice.samplePaths : [])
      ].map((samplePath) => String(samplePath ?? "").trim()).filter(Boolean))).slice(0, 12);
      const youtubeUrl = String(voice?.youtubeUrl ?? "").trim();
      const createdAt = Number(voice?.createdAt) || Date.now();
      return {
        id,
        name,
        samplePath: samplePaths[0] ?? "",
        samplePaths,
        youtubeUrl,
        tuning: normalizeXttsVoiceTuning(voice?.tuning),
        createdAt
      };
    })
    .filter((voice) => {
      if (!voice.name || (!voice.samplePaths.length && !voice.youtubeUrl) || seen.has(voice.id)) {
        return false;
      }
      seen.add(voice.id);
      return true;
    })
    .slice(0, 100);
}

function mergeXttsVoices(...voiceLists) {
  const mergedById = new Map();

  for (const voice of normalizeXttsVoices(voiceLists.flat())) {
    const existing = mergedById.get(voice.id);
    if (!existing) {
      mergedById.set(voice.id, voice);
      continue;
    }

    const samplePaths = Array.from(new Set([...(existing.samplePaths ?? []), ...(voice.samplePaths ?? [])])).slice(0, 12);
    mergedById.set(voice.id, {
      ...existing,
      ...voice,
      samplePath: samplePaths[0] ?? "",
      samplePaths,
      tuning: normalizeXttsVoiceTuning({
        ...existing.tuning,
        ...voice.tuning
      }),
      youtubeUrl: voice.youtubeUrl || existing.youtubeUrl
    });
  }

  return Array.from(mergedById.values()).slice(0, 100);
}

function updateXttsVoiceTuningInList(voiceList = [], voiceId = "", nextTuning = normalizeXttsVoiceTuning()) {
  const selectedVoiceId = String(voiceId ?? "").trim().replace(/^xtts:/, "");
  if (!selectedVoiceId) {
    return normalizeXttsVoices(voiceList);
  }

  return normalizeXttsVoices(voiceList).map((voice) => (
    voice.id === selectedVoiceId
      ? { ...voice, tuning: normalizeXttsVoiceTuning(nextTuning) }
      : voice
  ));
}

function updateXttsVoiceNameInList(voiceList = [], voiceId = "", nextName = "") {
  const selectedVoiceId = String(voiceId ?? "").trim().replace(/^xtts:/, "");
  const normalizedName = String(nextName ?? "").trim();
  if (!selectedVoiceId || !normalizedName) {
    return normalizeXttsVoices(voiceList);
  }

  return normalizeXttsVoices(voiceList).map((voice) => (
    voice.id === selectedVoiceId
      ? { ...voice, name: normalizedName }
      : voice
  ));
}

function updateXttsVoiceSamplesInList(voiceList = [], voiceId = "", samplePaths = [], youtubeUrl = "") {
  const selectedVoiceId = String(voiceId ?? "").trim().replace(/^xtts:/, "");
  const normalizedSamplePaths = Array.isArray(samplePaths)
    ? samplePaths.map((samplePath) => String(samplePath ?? "").trim()).filter(Boolean)
    : [];
  const normalizedYoutubeUrl = String(youtubeUrl ?? "").trim();
  if (!selectedVoiceId) {
    return normalizeXttsVoices(voiceList);
  }

  return normalizeXttsVoices(voiceList).map((voice) => {
    if (voice.id !== selectedVoiceId) {
      return voice;
    }

    const nextSamplePaths = Array.from(new Set([
      ...(voice.samplePaths ?? []),
      ...normalizedSamplePaths
    ].map((samplePath) => String(samplePath ?? "").trim()).filter(Boolean))).slice(0, 12);

    return {
      ...voice,
      samplePath: nextSamplePaths[0] ?? "",
      samplePaths: nextSamplePaths,
      youtubeUrl: normalizedYoutubeUrl || voice.youtubeUrl
    };
  });
}

function mergeTtsUserVoiceAssignments(...assignmentSources) {
  const merged = normalizeTtsUserVoiceAssignments();

  for (const source of assignmentSources) {
    const normalized = normalizeTtsUserVoiceAssignments(source);
    for (const providerKey of ["builtin", "tiktok", "elevenlabs", "xtts"]) {
      merged[providerKey] = {
        ...merged[providerKey],
        ...normalized[providerKey]
      };
    }
  }

  return merged;
}

function collectGlobalTtsVoiceSettings(source = {}) {
  const profileSettings = Object.values(source?.settingsProfiles ?? {})
    .map((profile) => profile?.settings)
    .filter(Boolean);

  return {
    ttsXttsVoices: mergeXttsVoices(
      ...profileSettings.map((settings) => settings?.ttsXttsVoices),
      source?.ttsXttsVoices
    ),
    ttsUserVoiceAssignments: mergeTtsUserVoiceAssignments(
      ...profileSettings.map((settings) => settings?.ttsUserVoiceAssignments),
      source?.ttsUserVoiceAssignments
    )
  };
}

function createDefaultTtsModerationFilters() {
  return {
    blockedWords: true,
    urls: true,
    privateInfo: true,
    fakeDonation: true,
    unsafeInstructions: true,
    unicodeAbuse: true,
    repeatedCharacters: true,
    repeatedWords: true,
    excessiveCaps: true,
    excessiveEmojis: true,
    obfuscatedBypass: true
  };
}

function createDefaultTtsModerationSettings() {
  return {
    mutedUsers: [],
    shadowMutedUsers: [],
    blockedWords: [],
    timedOutUsers: {},
    slowModeSeconds: 0,
    userCooldownSeconds: 0,
    filters: createDefaultTtsModerationFilters()
  };
}

function normalizeTtsModerationSettings(source = {}) {
  const defaults = createDefaultTtsModerationSettings();
  const timedOutUsers = {};
  const rawTimedOutUsers = source?.timedOutUsers && typeof source.timedOutUsers === "object"
    ? source.timedOutUsers
    : {};

  for (const [username, expiresAt] of Object.entries(rawTimedOutUsers)) {
    const userKey = normalizeUserKey(username);
    const numericExpiry = Number(expiresAt) || 0;
    if (userKey && numericExpiry > Date.now()) {
      timedOutUsers[userKey] = numericExpiry;
    }
  }

  const listFrom = (value, fallback) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      return value.split(/[\n,]+/);
    }
    return fallback;
  };

  const rawFilters = source?.filters && typeof source.filters === "object" ? source.filters : {};
  const filters = Object.fromEntries(
    Object.entries(defaults.filters).map(([key, defaultValue]) => [key, rawFilters[key] !== undefined ? Boolean(rawFilters[key]) : defaultValue])
  );

  return {
    mutedUsers: Array.from(new Set(listFrom(source?.mutedUsers, defaults.mutedUsers).map(normalizeUserKey).filter(Boolean))).slice(0, 500),
    shadowMutedUsers: Array.from(new Set(listFrom(source?.shadowMutedUsers, defaults.shadowMutedUsers).map(normalizeUserKey).filter(Boolean))).slice(0, 500),
    blockedWords: Array.from(new Set(listFrom(source?.blockedWords, defaults.blockedWords).map((word) => String(word ?? "").trim().toLowerCase()).filter(Boolean))).slice(0, 500),
    timedOutUsers,
    slowModeSeconds: Math.max(0, Math.min(3600, Number(source?.slowModeSeconds ?? defaults.slowModeSeconds) || 0)),
    userCooldownSeconds: Math.max(0, Math.min(3600, Number(source?.userCooldownSeconds ?? defaults.userCooldownSeconds) || 0)),
    filters
  };
}

function createDefaultSpinWheelSettings() {
  return {
    enabled: true,
    commandEnabled: true,
    giftName: "",
    eventRuleId: "",
    durationMs: 5200,
    resultDurationMs: 5000,
    arrowPosition: "right",
    segments: [
      { id: "spin-action-1", label: "Action 1", color: "#15c66f", actionRuleId: "" },
      { id: "spin-action-2", label: "Action 2", color: "#9bd400", actionRuleId: "" },
      { id: "spin-action-3", label: "Action 3", color: "#ffd027", actionRuleId: "" },
      { id: "spin-action-4", label: "Action 4", color: "#1598e8", actionRuleId: "" },
      { id: "spin-action-5", label: "Action 5", color: "#7345c8", actionRuleId: "" },
      { id: "spin-action-6", label: "Action 6", color: "#d61e11", actionRuleId: "" },
      { id: "spin-action-7", label: "Action 7", color: "#ff871c", actionRuleId: "" },
      { id: "spin-action-8", label: "Action 8", color: "#9bc7c7", actionRuleId: "" }
    ]
  };
}

function normalizeSpinWheelSettings(source = {}) {
  const defaults = createDefaultSpinWheelSettings();
  const fallbackColors = defaults.segments.map((segment) => segment.color);
  const rawSegments = Array.isArray(source?.segments) && source.segments.length
    ? source.segments
    : defaults.segments;
  const segments = rawSegments
    .map((segment, index) => ({
      id: String(segment?.id ?? `spin-action-${Date.now()}-${index}`).trim() || `spin-action-${index + 1}`,
      label: String(segment?.label ?? `Action ${index + 1}`).trim() || `Action ${index + 1}`,
      color: normalizeOverlayDesignerHex(segment?.color, fallbackColors[index % fallbackColors.length]),
      actionRuleId: String(segment?.actionRuleId ?? "").trim()
    }))
    .slice(0, 16);

  return {
    ...defaults,
    ...source,
    enabled: Boolean(source?.enabled ?? defaults.enabled),
    commandEnabled: Boolean(source?.commandEnabled ?? defaults.commandEnabled),
    giftName: String(source?.giftName ?? defaults.giftName).trim(),
    eventRuleId: String(source?.eventRuleId ?? defaults.eventRuleId).trim(),
    durationMs: Math.max(1000, Math.min(30000, Number(source?.durationMs ?? defaults.durationMs) || defaults.durationMs)),
    resultDurationMs: Math.max(1000, Math.min(30000, Number(source?.resultDurationMs ?? defaults.resultDurationMs) || defaults.resultDurationMs)),
    arrowPosition: ["right", "top", "bottom", "left"].includes(String(source?.arrowPosition ?? "").trim().toLowerCase())
      ? String(source.arrowPosition).trim().toLowerCase()
      : defaults.arrowPosition,
    segments: segments.length ? segments : defaults.segments
  };
}

function getDefaultProfileSettingsSource() {
  return {
    rememberedUsername: "",
    rememberUsername: false,
    autoConnectOnLaunch: false,
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
    ttsXttsServiceUrl: "http://127.0.0.1:8020",
    ttsXttsSplitSentences: false,
    ttsXttsVoices: [],
    ttsVoiceLockGiftName: "",
    ttsAudience: {
      allViewers: true,
      subscribers: false,
      moderators: false
    },
    ttsModeration: createDefaultTtsModerationSettings(),
    commandFeedbackOverlayDurationMs: 6000,
    commandFeedbackTemplates: {
      myttsvoice: "{user} has selected {voiceLabel} for their personalised TTS voice.",
      listcommands: "{user}, available chat commands: {commandList}"
    },
    votingEnabled: false,
    votingStartRole: "everyone",
    votingOverlayOrientation: "horizontal",
    likeRaceSettings: createDefaultLikeRaceSettings(),
    likeRaceStats: createDefaultLikeRaceStats(),
    spinWheelSettings: createDefaultSpinWheelSettings(),
    viewerStatsOverlayFilter: "everyone",
    viewerStatsOverlayUsername: "",
    viewerPointsSettings: createDefaultViewerPointsSettings(),
    viewerPointsLeaderboard: createDefaultViewerPointsLeaderboard(),
    ttsUserVoiceAssignments: {
      builtin: {},
      tiktok: {},
      elevenlabs: {},
      xtts: {}
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

function normalizeLikeRaceSettings(source = {}) {
  const defaults = createDefaultLikeRaceSettings();
  const sourcePhrases = source?.commentaryPhrases && typeof source.commentaryPhrases === "object"
    ? source.commentaryPhrases
    : {};
  const commentaryPhrases = Object.fromEntries(
    LIKE_RACE_COMMENTARY_EVENTS.map((eventType) => {
      const phrases = Array.isArray(sourcePhrases[eventType])
        ? sourcePhrases[eventType]
        : defaults.commentaryPhrases[eventType];
      return [
        eventType,
        phrases
          .map((phrase) => String(phrase ?? "").trim())
          .filter(Boolean)
          .slice(0, 40)
      ];
    })
  );
  const eventCooldowns = Object.fromEntries(
    LIKE_RACE_COMMENTARY_EVENTS.map((eventType) => [
      eventType,
      Math.max(0, Math.min(300, Number(source?.eventCooldowns?.[eventType] ?? defaults.eventCooldowns[eventType]) || 0))
    ])
  );

  return {
    ...defaults,
    ...source,
    enabled: Boolean(source?.enabled ?? defaults.enabled),
    defaultCountdownSeconds: Math.max(0, Math.min(120, Number(source?.defaultCountdownSeconds ?? defaults.defaultCountdownSeconds) || defaults.defaultCountdownSeconds)),
    defaultRaceDistance: Math.max(10, Math.min(100000, Number(source?.defaultRaceDistance ?? defaults.defaultRaceDistance) || defaults.defaultRaceDistance)),
    likeMultiplier: Math.max(0, Math.min(100, Number(source?.likeMultiplier ?? defaults.likeMultiplier) || defaults.likeMultiplier)),
    giftMultiplier: Math.max(0, Math.min(1000, Number(source?.giftMultiplier ?? defaults.giftMultiplier) || defaults.giftMultiplier)),
    maxRacers: Math.max(1, Math.min(100, Math.trunc(Number(source?.maxRacers ?? defaults.maxRacers) || defaults.maxRacers))),
    allowLateJoins: Boolean(source?.allowLateJoins ?? defaults.allowLateJoins),
    autoRemoveInactive: Boolean(source?.autoRemoveInactive ?? defaults.autoRemoveInactive),
    inactiveTimeoutSeconds: Math.max(5, Math.min(600, Number(source?.inactiveTimeoutSeconds ?? defaults.inactiveTimeoutSeconds) || defaults.inactiveTimeoutSeconds)),
    centreMessageSeconds: Math.max(1, Math.min(30, Number(source?.centreMessageSeconds ?? defaults.centreMessageSeconds) || defaults.centreMessageSeconds)),
    overlayAutoHideSeconds: Math.max(1, Math.min(60, Number(source?.overlayAutoHideSeconds ?? defaults.overlayAutoHideSeconds) || defaults.overlayAutoHideSeconds)),
    disqualifyEarlyTappers: Boolean(source?.disqualifyEarlyTappers ?? defaults.disqualifyEarlyTappers),
    startRole: ["everyone", "subscribers", "moderators"].includes(String(source?.startRole ?? "").trim().toLowerCase())
      ? String(source.startRole).trim().toLowerCase()
      : defaults.startRole,
    trackColor: normalizeOverlayDesignerHex(source?.trackColor, defaults.trackColor),
    accentColor: normalizeOverlayDesignerHex(source?.accentColor, defaults.accentColor),
    avatarSize: Math.max(32, Math.min(120, Number(source?.avatarSize ?? defaults.avatarSize) || defaults.avatarSize)),
    usernameSize: Math.max(8, Math.min(48, Number(source?.usernameSize ?? defaults.usernameSize) || defaults.usernameSize)),
    overlayOpacity: Math.max(0, Math.min(1, Number(source?.overlayOpacity ?? defaults.overlayOpacity))),
    backgroundColor: normalizeOverlayDesignerHex(source?.backgroundColor, defaults.backgroundColor),
    backgroundImage: String(source?.backgroundImage ?? source?.backgroundAsset ?? defaults.backgroundImage).trim().slice(0, 1000),
    titleColor: normalizeOverlayDesignerHex(source?.titleColor, defaults.titleColor),
    titleSize: Math.max(18, Math.min(120, Number(source?.titleSize ?? defaults.titleSize) || defaults.titleSize)),
    labelColor: normalizeOverlayDesignerHex(source?.labelColor, defaults.labelColor),
    labelSize: Math.max(8, Math.min(36, Number(source?.labelSize ?? defaults.labelSize) || defaults.labelSize)),
    mutedColor: normalizeOverlayDesignerHex(source?.mutedColor, defaults.mutedColor),
    commentarySize: Math.max(8, Math.min(42, Number(source?.commentarySize ?? defaults.commentarySize) || defaults.commentarySize)),
    animationsEnabled: source?.animationsEnabled !== false,
    ttsEnabled: Boolean(source?.ttsEnabled ?? defaults.ttsEnabled),
    ttsVolume: Math.max(0, Math.min(3, Number(source?.ttsVolume ?? defaults.ttsVolume) || defaults.ttsVolume)),
    ttsSpeed: Math.max(0.5, Math.min(2, Number(source?.ttsSpeed ?? defaults.ttsSpeed) || defaults.ttsSpeed)),
    ttsPitch: Math.max(0.5, Math.min(2, Number(source?.ttsPitch ?? defaults.ttsPitch) || defaults.ttsPitch)),
    ttsCooldownSeconds: Math.max(0, Math.min(300, Number(source?.ttsCooldownSeconds ?? defaults.ttsCooldownSeconds) || defaults.ttsCooldownSeconds)),
    ttsQueueEnabled: source?.ttsQueueEnabled !== false,
    interruptMajorEvents: Boolean(source?.interruptMajorEvents ?? defaults.interruptMajorEvents),
    priorityMajorEvents: source?.priorityMajorEvents !== false,
    countdownSoundId: String(source?.countdownSoundId ?? defaults.countdownSoundId).trim(),
    finishSoundId: String(source?.finishSoundId ?? defaults.finishSoundId).trim(),
    commentaryStyle: ["sports", "chaotic", "british", "medieval", "kart", "wwe", "roast", "family", "custom"].includes(String(source?.commentaryStyle ?? "").trim())
      ? String(source.commentaryStyle).trim()
      : defaults.commentaryStyle,
    globalCommentaryCooldownSeconds: Math.max(0, Math.min(300, Number(source?.globalCommentaryCooldownSeconds ?? defaults.globalCommentaryCooldownSeconds) || defaults.globalCommentaryCooldownSeconds)),
    maxCommentaryPerMinute: Math.max(1, Math.min(60, Math.trunc(Number(source?.maxCommentaryPerMinute ?? defaults.maxCommentaryPerMinute) || defaults.maxCommentaryPerMinute))),
    preventRepeatCount: Math.max(0, Math.min(20, Math.trunc(Number(source?.preventRepeatCount ?? defaults.preventRepeatCount) || defaults.preventRepeatCount))),
    sillyCommentary: source?.sillyCommentary !== false,
    hypeCommentary: source?.hypeCommentary !== false,
    roastCommentary: Boolean(source?.roastCommentary ?? defaults.roastCommentary),
    familyFriendly: source?.familyFriendly !== false,
    eventCooldowns,
    commentaryPhrases,
    soundEffects: {
      ...defaults.soundEffects,
      ...(source?.soundEffects ?? {})
    }
  };
}

function normalizeLikeRaceStats(source = {}) {
  const racers = {};
  const rawRacers = source?.racers && typeof source.racers === "object" ? source.racers : {};
  for (const [userKey, stats] of Object.entries(rawRacers)) {
    const normalizedUser = normalizeUserKey(userKey);
    if (!normalizedUser) {
      continue;
    }
    racers[normalizedUser] = {
      username: String(stats?.username ?? normalizedUser).trim() || normalizedUser,
      displayName: String(stats?.displayName ?? stats?.username ?? normalizedUser).trim() || normalizedUser,
      wins: Math.max(0, Number(stats?.wins) || 0),
      racesJoined: Math.max(0, Number(stats?.racesJoined) || 0),
      totalLikes: Math.max(0, Number(stats?.totalLikes) || 0),
      totalGifts: Math.max(0, Number(stats?.totalGifts) || 0),
      totalGiftCoins: Math.max(0, Number(stats?.totalGiftCoins) || 0),
      totalDistance: Math.max(0, Number(stats?.totalDistance) || 0)
    };
  }
  return {
    racers,
    lastRaceWinner: source?.lastRaceWinner ?? null,
    racesCompleted: Math.max(0, Number(source?.racesCompleted) || 0)
  };
}

function normalizeProfileSettingsSnapshot(source = {}) {
  const defaults = getDefaultProfileSettingsSource();

  return {
    rememberedUsername: String(source?.rememberedUsername ?? defaults.rememberedUsername).trim().replace(/^@/, ""),
    rememberUsername: Boolean(source?.rememberUsername ?? defaults.rememberUsername),
    autoConnectOnLaunch: Boolean(source?.autoConnectOnLaunch ?? defaults.autoConnectOnLaunch),
    rememberedUsernames: normalizeRememberedUsernames([source?.rememberedUsername, ...(source?.rememberedUsernames ?? defaults.rememberedUsernames)]),
    translationEnabled: Boolean(source?.translationEnabled ?? defaults.translationEnabled),
    translationTargetLanguage: String(source?.translationTargetLanguage ?? defaults.translationTargetLanguage).trim() || defaults.translationTargetLanguage,
    translationProviderUrl: String(source?.translationProviderUrl ?? defaults.translationProviderUrl),
    translationApiKey: String(source?.translationApiKey ?? defaults.translationApiKey),
    ttsEnabled: Boolean(source?.ttsEnabled ?? defaults.ttsEnabled),
    ttsProvider: ["builtin", "elevenlabs", "tiktok"].includes(String(source?.ttsProvider ?? "").trim().toLowerCase())
      ? String(source?.ttsProvider ?? "").trim().toLowerCase()
      : defaults.ttsProvider,
    ttsVoice: String(source?.ttsVoice ?? defaults.ttsVoice).trim(),
    ttsRandomVoicePerMessage: Boolean(source?.ttsRandomVoicePerMessage ?? defaults.ttsRandomVoicePerMessage),
    ttsStyle: "natural",
    ttsQueue: normalizeQueueId(source?.ttsQueue, defaults.ttsQueue),
    ttsRate: Number(source?.ttsRate ?? defaults.ttsRate) || defaults.ttsRate,
    ttsPitch: Number(source?.ttsPitch ?? defaults.ttsPitch) || defaults.ttsPitch,
    ttsVolume: Number(source?.ttsVolume ?? defaults.ttsVolume) || defaults.ttsVolume,
    ttsIncludeUsername: Boolean(source?.ttsIncludeUsername ?? defaults.ttsIncludeUsername),
    ttsReadPunctuation: Boolean(source?.ttsReadPunctuation ?? defaults.ttsReadPunctuation),
    ttsReadGifts: Boolean(source?.ttsReadGifts ?? defaults.ttsReadGifts),
    ttsGiftMinCoins: Math.max(0, Number(source?.ttsGiftMinCoins ?? defaults.ttsGiftMinCoins) || 0),
    ttsElevenMode: source?.ttsElevenMode === "paid" ? "paid" : "free",
    ttsElevenApiKey: String(source?.ttsElevenApiKey ?? defaults.ttsElevenApiKey).trim(),
    ttsElevenModel: String(source?.ttsElevenModel ?? defaults.ttsElevenModel).trim() || defaults.ttsElevenModel,
    ttsXttsServiceUrl: String(source?.ttsXttsServiceUrl ?? defaults.ttsXttsServiceUrl).trim() || defaults.ttsXttsServiceUrl,
    ttsXttsLanguage: String(source?.ttsXttsLanguage ?? defaults.ttsXttsLanguage).trim().toLowerCase() || defaults.ttsXttsLanguage,
    ttsXttsSplitSentences: Boolean(source?.ttsXttsSplitSentences ?? defaults.ttsXttsSplitSentences),
    ttsXttsVoices: normalizeXttsVoices(source?.ttsXttsVoices ?? defaults.ttsXttsVoices),
    ttsVoiceLockGiftName: String(source?.ttsVoiceLockGiftName ?? defaults.ttsVoiceLockGiftName).trim(),
    ttsAudience: {
      ...defaults.ttsAudience,
      ...(source?.ttsAudience ?? {})
    },
    ttsModeration: normalizeTtsModerationSettings(source?.ttsModeration),
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
      likeRaceSettings: normalizeLikeRaceSettings(source?.likeRaceSettings),
      likeRaceStats: normalizeLikeRaceStats(source?.likeRaceStats),
      spinWheelSettings: normalizeSpinWheelSettings(source?.spinWheelSettings),
      viewerStatsOverlayFilter: ["everyone", "subscriber", "moderator", "username"].includes(String(source?.viewerStatsOverlayFilter ?? "").trim().toLowerCase())
        ? String(source?.viewerStatsOverlayFilter ?? "").trim().toLowerCase()
        : defaults.viewerStatsOverlayFilter,
      viewerStatsOverlayUsername: String(source?.viewerStatsOverlayUsername ?? defaults.viewerStatsOverlayUsername).trim().replace(/^@/, ""),
      viewerStatsAllTime: normalizeViewerStatsAllTime(source?.viewerStatsAllTime),
      viewerPointsSettings: normalizeViewerPointsSettings(source?.viewerPointsSettings),
      viewerPointsLeaderboard: normalizeViewerPointsLeaderboard(source?.viewerPointsLeaderboard),
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
  const sourceViewerStatsAllTime = normalizeViewerStatsAllTime(source?.viewerStatsAllTime);
  const existingViewerStatsAllTime = normalizeViewerStatsAllTime(existingProfile.settings?.viewerStatsAllTime);
  if (
    Object.keys(existingViewerStatsAllTime.users).length > 0
    && (
      !Object.prototype.hasOwnProperty.call(source ?? {}, "viewerStatsAllTime")
      || Object.keys(sourceViewerStatsAllTime.users).length === 0
    )
  ) {
    topLevelProfileSettings.viewerStatsAllTime = existingProfile.settings.viewerStatsAllTime;
  }
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
  const normalizedValue = String(value ?? "").trim();
  if (normalizedValue === "elevenlabs") {
    return "elevenlabs";
  }
  if (normalizedValue === "tiktok") {
    return "tiktok";
  }
  if (normalizedValue === "xtts") {
    return "xtts";
  }
  return "builtin";
}

function getCurrentTtsProviderKey() {
  return resolveTtsProviderKey(ttsProviderSelect.value);
}

function getCurrentTtsProviderLabel() {
  switch (getCurrentTtsProviderKey()) {
    case "elevenlabs":
      return "ElevenLabs";
    case "tiktok":
      return "TikTok TTS";
    default:
      return "Built-in / XTTS";
  }
}

function getAvailableTtsVoiceEntries() {
  return state.voices.map((voice, index) => {
    const providerKey = getCurrentTtsProviderKey();
    const voiceKind = String(voice?.ttsKind ?? "").trim();
    const value = providerKey === "elevenlabs"
      ? voice.id
      : providerKey === "tiktok"
        ? voice.id
      : voiceKind === "xtts"
        ? `xtts:${voice.id}`
        : voice.name;
    const baseLabel = providerKey === "elevenlabs"
      ? `${voice.name}${voice.category ? ` (${voice.category})` : ""}`
      : providerKey === "tiktok"
        ? `${voice.name}${voice.category ? ` (${voice.category})` : ""}`
      : voiceKind === "xtts"
        ? `${voice.name} (${voice.samplePaths?.length || 0} file sample${voice.samplePaths?.length === 1 ? "" : "s"}${voice.youtubeUrl ? " + YouTube" : ""})`
        : `${voice.name}${voice.culture ? ` (${voice.culture})` : ""}`;

    return {
      index: index + 1,
      value,
      label: `${index + 1}. ${baseLabel}`,
      baseLabel,
      providerKey: voiceKind === "xtts" ? "xtts" : voiceKind === "tiktok" ? "tiktok" : providerKey,
      voice
    };
  });
}

function resolveTtsProviderKeyForVoiceValue(voiceValue, fallbackProviderKey = getCurrentTtsProviderKey()) {
  const normalizedVoiceValue = String(voiceValue ?? "").trim();
  if (/^xtts:/i.test(normalizedVoiceValue)) {
    return "xtts";
  }

  const matchingEntry = getAvailableTtsVoiceEntries().find((entry) => entry.value === normalizedVoiceValue);
  if (matchingEntry?.providerKey) {
    return resolveTtsProviderKey(matchingEntry.providerKey);
  }

  return resolveTtsProviderKey(fallbackProviderKey);
}

function getUserAssignedTtsVoice(userKey, providerKey = getCurrentTtsProviderKey()) {
  const resolvedProviderKey = resolveTtsProviderKey(providerKey);
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return "";
  }

  const assignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  const assignedValue = String(assignments?.[resolvedProviderKey]?.[normalizedUser] ?? "").trim();
  if (assignedValue) {
    return assignedValue;
  }

  if (resolvedProviderKey === "builtin") {
    const legacyXttsValue = String(assignments?.xtts?.[normalizedUser] ?? "").trim();
    return legacyXttsValue ? `xtts:${legacyXttsValue.replace(/^xtts:/, "")}` : "";
  }

  return "";
}

function getSessionTtsVoiceLockKey(providerKey, voiceValue) {
  const resolvedProviderKey = resolveTtsProviderKey(providerKey);
  const normalizedVoiceValue = String(voiceValue ?? "").trim();
  return normalizedVoiceValue ? `${resolvedProviderKey}:${normalizedVoiceValue}` : "";
}

function normalizeTtsVoiceValueForCompare(voiceValue) {
  const normalizedValue = String(voiceValue ?? "").trim();
  return /^xtts:/i.test(normalizedValue) ? `xtts:${normalizedValue.replace(/^xtts:/i, "")}` : normalizedValue;
}

function isSameTtsVoiceValue(leftValue, rightValue) {
  return normalizeTtsVoiceValueForCompare(leftValue) === normalizeTtsVoiceValueForCompare(rightValue);
}

function releaseSessionTtsVoiceLockForUser(userKey) {
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return null;
  }

  const previousLock = state.sessionTtsVoiceLocksByUser.get(normalizedUser);
  if (!previousLock) {
    return null;
  }

  state.sessionTtsVoiceLocksByUser.delete(normalizedUser);
  state.sessionTtsVoiceLocksByVoice.delete(getSessionTtsVoiceLockKey(previousLock.providerKey, previousLock.voiceValue));
  return previousLock;
}

function getLockedTtsVoiceForUser(userKey, providerKey = getCurrentTtsProviderKey()) {
  const normalizedUser = normalizeUserKey(userKey);
  const lock = normalizedUser ? state.sessionTtsVoiceLocksByUser.get(normalizedUser) : null;
  return lock && lock.providerKey === resolveTtsProviderKey(providerKey) ? lock : null;
}

function isTtsVoiceLockedToAnotherUser(voiceValue, userKey = "", providerKey = getCurrentTtsProviderKey()) {
  const lockProviderKey = resolveTtsProviderKeyForVoiceValue(voiceValue, providerKey);
  const lockKey = getSessionTtsVoiceLockKey(lockProviderKey, voiceValue);
  if (!lockKey) {
    return false;
  }

  const lockedUser = state.sessionTtsVoiceLocksByVoice.get(lockKey);
  return Boolean(lockedUser && lockedUser !== normalizeUserKey(userKey));
}

function getUnlockedTtsVoiceEntriesForUser(userKey = "") {
  return getAvailableTtsVoiceEntries().filter((entry) => !isTtsVoiceLockedToAnotherUser(entry.value, userKey, entry.providerKey));
}

async function saveUserAssignedTtsVoice(userKey, voiceValue, providerKey = getCurrentTtsProviderKey()) {
  const resolvedProviderKey = resolveTtsProviderKeyForVoiceValue(voiceValue, providerKey);
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return;
  }

  const previousLock = state.sessionTtsVoiceLocksByUser.get(normalizedUser);
  if (previousLock && !isSameTtsVoiceValue(previousLock.voiceValue, voiceValue)) {
    releaseSessionTtsVoiceLockForUser(normalizedUser);
  }

  const nextAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  if (resolvedProviderKey === "builtin" || resolvedProviderKey === "xtts") {
    delete nextAssignments.builtin[normalizedUser];
    delete nextAssignments.xtts[normalizedUser];
  }
  nextAssignments[resolvedProviderKey] = {
    ...nextAssignments[resolvedProviderKey],
    [normalizedUser]: String(voiceValue ?? "").trim()
  };

  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  for (const profileId of Object.keys(nextProfiles)) {
    const profileSettings = normalizeProfileSettingsSnapshot(nextProfiles[profileId]?.settings ?? {});
    const profileAssignments = normalizeTtsUserVoiceAssignments(profileSettings.ttsUserVoiceAssignments);
    if (resolvedProviderKey === "builtin" || resolvedProviderKey === "xtts") {
      delete profileAssignments.builtin[normalizedUser];
      delete profileAssignments.xtts[normalizedUser];
    }
    profileAssignments[resolvedProviderKey] = {
      ...profileAssignments[resolvedProviderKey],
      [normalizedUser]: String(voiceValue ?? "").trim()
    };
    nextProfiles[profileId] = {
      ...nextProfiles[profileId],
      settings: normalizeProfileSettingsSnapshot({
        ...profileSettings,
        ttsUserVoiceAssignments: profileId === activeProfileId ? nextAssignments : profileAssignments
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

  releaseSessionTtsVoiceLockForUser(normalizedUser);

  const nextAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  if (resolvedProviderKey === "builtin" || resolvedProviderKey === "xtts") {
    delete nextAssignments.builtin[normalizedUser];
    delete nextAssignments.xtts[normalizedUser];
  } else {
    delete nextAssignments[resolvedProviderKey][normalizedUser];
  }
  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  for (const profileId of Object.keys(nextProfiles)) {
    const profileSettings = normalizeProfileSettingsSnapshot(nextProfiles[profileId]?.settings ?? {});
    const profileAssignments = normalizeTtsUserVoiceAssignments(profileSettings.ttsUserVoiceAssignments);
    if (resolvedProviderKey === "builtin" || resolvedProviderKey === "xtts") {
      delete profileAssignments.builtin[normalizedUser];
      delete profileAssignments.xtts[normalizedUser];
    } else {
      delete profileAssignments[resolvedProviderKey][normalizedUser];
    }
    nextProfiles[profileId] = {
      ...nextProfiles[profileId],
      settings: normalizeProfileSettingsSnapshot({
        ...profileSettings,
        ttsUserVoiceAssignments: profileId === activeProfileId ? nextAssignments : profileAssignments
      })
    };
  }

  await persistSettings({
    ttsUserVoiceAssignments: nextAssignments,
    settingsProfiles: nextProfiles
  });
}

function chooseReplacementVoiceForDisplacedUser(userKey, lockedVoiceValue, lockedProviderKey) {
  const normalizedUser = normalizeUserKey(userKey);
  const availableEntries = getAvailableTtsVoiceEntries()
    .filter((entry) => !isSameTtsVoiceValue(entry.value, lockedVoiceValue))
    .filter((entry) => !isTtsVoiceLockedToAnotherUser(entry.value, normalizedUser, entry.providerKey));

  const sameProviderEntry = availableEntries.find((entry) => resolveTtsProviderKey(entry.providerKey) === resolveTtsProviderKey(lockedProviderKey));
  return sameProviderEntry ?? availableEntries[0] ?? null;
}

function reassignUsersFromLockedTtsVoice(assignments, lockedUserKey, lockedVoiceValue, lockedProviderKey) {
  const normalizedLockedUser = normalizeUserKey(lockedUserKey);
  const movedUsers = [];

  for (const providerKey of ["builtin", "tiktok", "elevenlabs", "xtts"]) {
    for (const [assignedUserKey, assignedVoiceValue] of Object.entries(assignments?.[providerKey] ?? {})) {
      const normalizedAssignedUser = normalizeUserKey(assignedUserKey);
      if (!normalizedAssignedUser || normalizedAssignedUser === normalizedLockedUser) {
        continue;
      }
      if (!isSameTtsVoiceValue(assignedVoiceValue, lockedVoiceValue)) {
        continue;
      }

      delete assignments[providerKey][normalizedAssignedUser];
      const replacementEntry = chooseReplacementVoiceForDisplacedUser(normalizedAssignedUser, lockedVoiceValue, lockedProviderKey);
      if (replacementEntry) {
        const replacementProviderKey = resolveTtsProviderKeyForVoiceValue(replacementEntry.value, replacementEntry.providerKey);
        assignments[replacementProviderKey] = {
          ...assignments[replacementProviderKey],
          [normalizedAssignedUser]: replacementEntry.value
        };
      }

      movedUsers.push({
        userKey: normalizedAssignedUser,
        previousVoiceValue: assignedVoiceValue,
        replacementVoiceValue: replacementEntry?.value ?? "",
        replacementVoiceLabel: replacementEntry?.baseLabel ?? ""
      });
    }
  }

  return movedUsers;
}

async function persistExclusiveTtsVoiceLockAssignments(lockedUserKey, lockedVoiceValue, lockedProviderKey) {
  const normalizedLockedUser = normalizeUserKey(lockedUserKey);
  const nextAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  const movedUsers = reassignUsersFromLockedTtsVoice(nextAssignments, normalizedLockedUser, lockedVoiceValue, lockedProviderKey);

  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  for (const profileId of Object.keys(nextProfiles)) {
    const profileSettings = normalizeProfileSettingsSnapshot(nextProfiles[profileId]?.settings ?? {});
    const profileAssignments = normalizeTtsUserVoiceAssignments(profileSettings.ttsUserVoiceAssignments);
    reassignUsersFromLockedTtsVoice(profileAssignments, normalizedLockedUser, lockedVoiceValue, lockedProviderKey);
    nextProfiles[profileId] = {
      ...nextProfiles[profileId],
      settings: normalizeProfileSettingsSnapshot({
        ...profileSettings,
        ttsUserVoiceAssignments: profileId === activeProfileId ? nextAssignments : profileAssignments
      })
    };
  }

  await persistSettings({
    ttsUserVoiceAssignments: nextAssignments,
    settingsProfiles: nextProfiles
  });

  return movedUsers;
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
  const normalizedAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  const assignmentMap = new Map();
  if (providerKey === "builtin") {
    for (const [userKey, voiceValue] of Object.entries(normalizedAssignments.builtin ?? {})) {
      assignmentMap.set(userKey, { userKey, voiceValue, providerKey: "builtin" });
    }
    for (const [userKey, voiceValue] of Object.entries(normalizedAssignments.xtts ?? {})) {
      const normalizedVoiceValue = String(voiceValue ?? "").trim();
      assignmentMap.set(userKey, {
        userKey,
        voiceValue: normalizedVoiceValue ? `xtts:${normalizedVoiceValue.replace(/^xtts:/, "")}` : "",
        providerKey: "xtts"
      });
    }
  } else {
    for (const [userKey, voiceValue] of Object.entries(normalizedAssignments[providerKey] ?? {})) {
      assignmentMap.set(userKey, { userKey, voiceValue, providerKey });
    }
  }
  const assignments = Array.from(assignmentMap.values())
    .sort((left, right) => left.userKey.localeCompare(right.userKey));
  const filteredAssignments = searchTerm
    ? assignments.filter(({ userKey }) => userKey.toLowerCase().includes(searchTerm))
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
    .map(({ userKey, voiceValue, providerKey: assignmentProviderKey }) => `
      <article class="tts-voice-manager-row" data-tts-voice-user="${escapeHtml(userKey)}" data-tts-voice-provider="${escapeHtml(assignmentProviderKey)}">
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
          <button type="button" class="ghost compact-button" data-tts-voice-save="${escapeHtml(userKey)}" data-tts-voice-provider="${escapeHtml(assignmentProviderKey)}">Save</button>
          <button type="button" class="ghost compact-button" data-tts-voice-remove="${escapeHtml(userKey)}" data-tts-voice-provider="${escapeHtml(assignmentProviderKey)}">Remove</button>
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

function isUserBirthdayToday(userKey) {
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return false;
  }

  const birthday = getUserNoteRecord(normalizedUser).birthday;
  return Boolean(birthday) && isBirthdayToday(birthday);
}

function getNextBirthdaySortValue(birthday) {
  const normalizedBirthday = /^\d{4}-\d{2}-\d{2}$/.test(String(birthday ?? "").trim())
    ? String(birthday).trim()
    : "";
  if (!normalizedBirthday) {
    return Number.POSITIVE_INFINITY;
  }

  const [, month, day] = normalizedBirthday.split("-").map(Number);
  const now = new Date();
  const currentYear = now.getFullYear();
  const today = new Date(currentYear, now.getMonth(), now.getDate()).getTime();
  let nextBirthday = new Date(currentYear, month - 1, day).getTime();
  if (nextBirthday < today) {
    nextBirthday = new Date(currentYear + 1, month - 1, day).getTime();
  }

  return nextBirthday;
}

function positionViewerPointsNotePopover(cell) {
  const popover = cell?.querySelector?.(".viewer-points-note-popover");
  const anchor = cell?.querySelector?.(".viewer-points-user-text") ?? cell;
  if (!popover) {
    return;
  }

  const margin = 12;
  const gap = 8;
  const cellRect = anchor.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const popoverWidth = Math.min(popoverRect.width || 320, window.innerWidth - (margin * 2));
  const popoverHeight = popoverRect.height || 190;
  const rightLeft = cellRect.right + gap;
  const left = rightLeft + popoverWidth + margin <= window.innerWidth
    ? rightLeft
    : Math.max(margin, cellRect.left - popoverWidth - gap);
  const top = Math.min(
    Math.max(cellRect.top, margin),
    Math.max(margin, window.innerHeight - popoverHeight - margin)
  );

  popover.style.setProperty("--viewer-points-popover-left", `${Math.round(left)}px`);
  popover.style.setProperty("--viewer-points-popover-top", `${Math.round(top)}px`);
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
  if (!doesItemMatchRuleMetric(linkedRule, item) || !doesItemMatchRuleAudience(linkedRule, item)) {
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
    case "birthday":
      return "viewers with a birthday today";
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
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\([^)]*\bcoins?\b[^)]*\)/gi, "")
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
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
  return `
    <span class="gift-trigger-option-icon gift-trigger-option-icon-fallback" title="${escapeHtml(badgeText)}">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 10h16v10H4V10Z"></path>
        <path d="M3 6h18v5H3V6Z"></path>
        <path d="M11 6h2v14h-2V6Z"></path>
        <path d="M7.4 3.2C6.1 3.2 5.2 4 5.2 5c0 1.3 1.4 2 4.8 2h1C9.8 4.5 8.7 3.2 7.4 3.2Z"></path>
        <path d="M16.6 3.2c1.3 0 2.2.8 2.2 1.8 0 1.3-1.4 2-4.8 2h-1c1.2-2.5 2.3-3.8 3.6-3.8Z"></path>
      </svg>
    </span>
  `;
}

function getGiftImageMarkup(imageUrl = "", coinValue = 0, className = "gift-trigger-option-icon") {
  const safeImageUrl = String(imageUrl ?? "").trim();
  const fallbackMarkup = getGiftFallbackBadgeMarkup(coinValue);
  if (!safeImageUrl) {
    return fallbackMarkup;
  }

  return `
    <img
      src="${escapeHtml(safeImageUrl)}"
      alt=""
      class="${escapeHtml(className)}"
      loading="lazy"
      onerror="this.replaceWith(this.nextElementSibling)"
    />${fallbackMarkup}
  `;
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

function renderTtsVoiceLockGiftOptions() {
  if (!ttsVoiceLockGiftSelect) {
    return;
  }

  const selectedGiftName = String(state.settings?.ttsVoiceLockGiftName ?? "").trim();
  const selectedGiftKey = normalizeGiftKey(selectedGiftName);
  const normalizedSearch = String(ttsVoiceLockGiftSearch?.value ?? "").trim().toLowerCase();
  const gifts = getKnownTikTokGifts().filter((gift) =>
    !normalizedSearch || gift.giftName.toLowerCase().includes(normalizedSearch)
  );
  const selectedGift = selectedGiftName ? getKnownGiftMetadata(selectedGiftName) : null;
  const selectedImageUrl = String(selectedGift?.giftImageUrl ?? "").trim();
  const selectedCoinLabel = selectedGift ? getGiftCoinValueDisplay(selectedGift.coinValue, selectedGift.source) : "";

  ttsVoiceLockGiftSelect.value = selectedGiftName;

  if (ttsVoiceLockGiftSelected) {
    ttsVoiceLockGiftSelected.innerHTML = selectedGiftName
      ? `
        <span class="gift-trigger-selected">
          ${getGiftImageMarkup(selectedImageUrl, selectedGift?.coinValue ?? 0, "gift-trigger-selected-icon")}
          <span>${escapeHtml(`${selectedGiftName}${selectedCoinLabel ? ` (${selectedCoinLabel})` : ""}`)}</span>
        </span>
        <span class="gift-trigger-summary-caret" aria-hidden="true">&#9662;</span>
      `
      : `
        <span class="gift-trigger-selected-empty">Voice locking disabled.</span>
        <span class="gift-trigger-summary-caret" aria-hidden="true">&#9662;</span>
      `;
  }

  if (!ttsVoiceLockGiftOptions) {
    return;
  }

  const disableOptionSelected = selectedGiftName ? "" : " selected";
  const disableOption = `
    <button
      type="button"
      class="gift-trigger-option${disableOptionSelected}"
      data-tts-voice-lock-gift-option=""
      data-gift-name=""
    >
      <span class="gift-trigger-option-icon-fallback" aria-hidden="true">OFF</span>
      <span>Voice locking disabled</span>
    </button>
  `;

  const options = gifts
    .map((gift) => {
      const trustedImageUrl = String(gift.giftImageUrl ?? "").trim();
      const coinLabel = getGiftCoinValueDisplay(gift.coinValue, gift.source);
      const label = `${gift.giftName}${coinLabel ? ` (${coinLabel})` : ""}`;
      const selected = normalizeGiftKey(gift.giftName) === selectedGiftKey ? " selected" : "";
      return `
        <button
          type="button"
          class="gift-trigger-option${selected}"
          data-tts-voice-lock-gift-option="${escapeHtml(gift.giftName)}"
          data-gift-name="${escapeHtml(gift.giftName)}"
        >
          ${getGiftImageMarkup(trustedImageUrl, gift.coinValue)}
          <span>${escapeHtml(label)}</span>
        </button>
      `;
    })
    .join("");

  const selectedFallback = selectedGiftName && !getKnownTikTokGifts().some((gift) => normalizeGiftKey(gift.giftName) === selectedGiftKey)
    ? `
      <button
        type="button"
        class="gift-trigger-option selected"
        data-tts-voice-lock-gift-option="${escapeHtml(selectedGiftName)}"
        data-gift-name="${escapeHtml(selectedGiftName)}"
      >
        ${getGiftFallbackBadgeMarkup(0)}
        <span>${escapeHtml(selectedGiftName)}</span>
      </button>
    `
    : "";

  ttsVoiceLockGiftOptions.innerHTML = `${disableOption}${selectedFallback}${options || `<div class="gift-trigger-empty">No gifts match that search.</div>`}`;
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
  }, { render: false });
  if (!isInteractiveFormElement()) {
    renderTtsVoiceLockGiftOptions();
  }
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
  }, { render: false });
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
    state.connected ? state.username : "",
    usernameInput?.value,
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
        const fallbackCount = getStoredKnownTikTokGifts().length;
        return {
          ...(result ?? { gifts: [], liveActive: false, error: "" }),
          fallbackCount,
          error: result?.error
            ? `${result.error}${fallbackCount ? ` Showing ${fallbackCount} built-in or previously learned gifts instead.` : ""}`
            : ""
        };
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
    }, { render: false });
    if (!isInteractiveFormElement()) {
      renderTtsVoiceLockGiftOptions();
    }
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
    case "birthday": {
      let total = 0;
      for (const userId of state.sessionEmoteMetrics?.[metric]?.byUser?.keys?.() ?? []) {
        if (isUserBirthdayToday(userId)) {
          total += getUserEmoteCount(userId);
        }
      }
      return total;
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
    case "birthday": {
      let total = 0;
      for (const userId of state.sessionGiftMetrics.byUser.keys()) {
        if (isUserBirthdayToday(userId)) {
          total += getUserGiftCount(userId);
        }
      }
      return total;
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
    case "birthday": {
      let total = 0;
      for (const [userId, count] of state.sessionUserMetrics[metricKey].entries()) {
        if (isUserBirthdayToday(userId)) {
          total += Number(count) || 0;
        }
      }
      return total;
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
    autoConnectOnLaunch: Boolean(autoConnectInput?.checked),
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
    ttsReadPunctuation: Boolean(ttsReadPunctuationInput?.checked),
    ttsReadGifts: ttsReadGiftsInput.checked,
    ttsGiftMinCoins: Math.max(0, Number(ttsGiftMinCoinsInput.value) || 0),
    ttsElevenMode: ttsElevenModeSelect.value,
    ttsElevenApiKey: ttsElevenApiKeyInput.value.trim(),
    ttsElevenModel: ttsElevenModelSelect.value,
    ttsXttsServiceUrl: String(ttsXttsServiceUrlInput?.value ?? "").trim(),
    ttsXttsLanguage: String(ttsXttsLanguageSelect?.value ?? "en").trim().toLowerCase() || "en",
    ttsXttsSplitSentences: Boolean(ttsXttsSplitSentencesInput?.checked),
    ttsXttsVoices: normalizeXttsVoices(merged.ttsXttsVoices),
    ttsVoiceLockGiftName: String(ttsVoiceLockGiftSelect?.value ?? "").trim(),
    ttsAudience: {
      allViewers: ttsAudienceAllInput.checked,
      subscribers: ttsAudienceSubscribersInput.checked,
      moderators: ttsAudienceModeratorsInput.checked
    },
    ttsModeration: collectTtsModerationSettingsFromUi(merged.ttsModeration),
    commandFeedbackOverlayDurationMs: Math.max(1000, Number(commandFeedbackDurationInput.value) || 6000),
    commandFeedbackTemplates: {
      myttsvoice: String(commandFeedbackTemplateMyttsvoiceInput.value ?? "").trim(),
      listcommands: String(commandFeedbackTemplateListcommandsInput.value ?? "").trim()
    },
    votingEnabled: Boolean(votingEnabledInput.checked),
    votingStartRole: String(votingStartRoleInput.value ?? "everyone").trim().toLowerCase(),
    votingOverlayOrientation: votingOverlayOrientationInput.value === "vertical" ? "vertical" : "horizontal",
    likeRaceSettings: collectLikeRaceSettingsFromUi(merged.likeRaceSettings),
    likeRaceStats: normalizeLikeRaceStats(merged.likeRaceStats),
    spinWheelSettings: collectSpinWheelSettingsFromUi(merged.spinWheelSettings),
    viewerStatsOverlayFilter: String(viewerStatsOverlayFilterInput?.value ?? "everyone").trim().toLowerCase(),
    viewerStatsOverlayUsername: String(viewerStatsOverlayUsernameInput?.value ?? "").trim().replace(/^@/, ""),
    viewerStatsAllTime: normalizeViewerStatsAllTime(merged.viewerStatsAllTime),
    viewerPointsSettings: collectViewerPointsSettingsFromUi(merged.viewerPointsSettings),
    viewerPointsLeaderboard: normalizeViewerPointsLeaderboard(merged.viewerPointsLeaderboard),
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
  const globalTtsVoiceSettings = collectGlobalTtsVoiceSettings(merged);
  const {
    normalizedProfiles: settingsProfiles,
    activeSettingsProfileId
  } = resolveActiveProfileState(merged);
  const activeProfileName = String(settingsProfiles?.[activeSettingsProfileId]?.name ?? "Default").trim() || "Default";
  const activeProfileSettings = getCurrentProfileSettingsFromUi(merged);

  settingsProfiles[activeSettingsProfileId] = {
    name: activeProfileName,
    settings: normalizeProfileSettingsSnapshot({
      ...activeProfileSettings,
      ttsXttsVoices: globalTtsVoiceSettings.ttsXttsVoices,
      ttsUserVoiceAssignments: globalTtsVoiceSettings.ttsUserVoiceAssignments
    })
  };

  return {
    ...merged,
    ...activeProfileSettings,
    ttsXttsVoices: globalTtsVoiceSettings.ttsXttsVoices,
    ttsUserVoiceAssignments: globalTtsVoiceSettings.ttsUserVoiceAssignments,
    activeSettingsProfileId,
    settingsProfiles
  };
}

function isInteractiveFormElement(element = document.activeElement) {
  if (!element) {
    return false;
  }

  return Boolean(element.closest?.("input, textarea, select, details, [contenteditable='true'], .gift-trigger-dropdown, .sound-picker, .overlay-designer-modal, .chat-notes-panel"));
}

async function persistSettings(partial = {}, options = {}) {
  const payload = getSettingsPayloadWithPartial(partial);
  state.settings = ensureSettingsShape(payload);

  const nextSave = app
    .saveSettings(payload)
    .then((saved) => {
      state.settings = ensureSettingsShape(saved);
      const shouldRenderUi = options.render !== false && !(options.skipWhileEditing && isInteractiveFormElement());
      if (shouldRenderUi) {
        renderCustomRules();
        refreshSpinWheelActionOptions();
        renderRememberedUsernameOptions();
        renderSettingsProfileOptions();
        updateHeaderPills();
        applyDashboardCardVisibility();
        applyMainScreenPinnedCards();
        applySavedCardCollapseState();
        if (ttsVoiceManagerModal && !ttsVoiceManagerModal.hidden) {
          renderTtsVoiceManager();
        }
      }
      return state.settings;
    });

  pendingSettingsSavePromise = nextSave.catch(() => state.settings);
  return nextSave;
}

function scheduleSettingsSave() {
  window.clearTimeout(saveSettingsTimer);
  saveSettingsTimer = window.setTimeout(() => {
    persistSettings({}, { skipWhileEditing: true }).catch((error) => {
      showToast(error.message || "Unable to save settings.", "error");
    });
    }, SAVE_DEBOUNCE_MS);
}

async function flushPendingSettingsForExit() {
  window.clearTimeout(saveSettingsTimer);
  window.clearTimeout(viewerStatsAllTimeSaveTimer);
  window.clearTimeout(viewerPointsSaveTimer);
  saveSettingsTimer = null;
  viewerStatsAllTimeSaveTimer = null;
  viewerPointsSaveTimer = null;

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
    window.setTimeout(maybeAutoConnectOnLaunch, 500);
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
  if (autoConnectInput) {
    autoConnectInput.disabled = state.connecting;
  }
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
  if (state.ttsQueuePaused) {
    setStatusMessage(ttsStatus, "info", `TTS is on but the queue is paused on ${getQueueLabel(ttsQueueSelect.value)}.`);
    return;
  }

  const voiceLabel = ttsVoiceSelect.options[ttsVoiceSelect.selectedIndex]?.text ?? "Default voice";
  const providerLabel = getCurrentTtsProviderLabel();
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
    ttsXttsVoices: normalizeXttsVoices(state.settings?.ttsXttsVoices),
    ttsUserVoiceAssignments: normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments),
    exportedProfileName: String(activeProfile?.name ?? profileId).trim() || profileId
  };
}

function getSettingsImportProfileSnapshot(bundle) {
  if (bundle?.settingsProfiles && typeof bundle.settingsProfiles === "object") {
    return {
      settingsProfiles: bundle.settingsProfiles,
      activeSettingsProfileId: String(bundle.activeSettingsProfileId ?? DEFAULT_SETTINGS_PROFILE_ID).trim() || DEFAULT_SETTINGS_PROFILE_ID,
      ttsXttsVoices: normalizeXttsVoices(bundle.ttsXttsVoices),
      ttsUserVoiceAssignments: normalizeTtsUserVoiceAssignments(bundle.ttsUserVoiceAssignments)
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
    activeSettingsProfileId: DEFAULT_SETTINGS_PROFILE_ID,
    ttsXttsVoices: normalizeXttsVoices(importedSettings?.ttsXttsVoices),
    ttsUserVoiceAssignments: normalizeTtsUserVoiceAssignments(importedSettings?.ttsUserVoiceAssignments)
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
    ttsXttsVoices: mergeXttsVoices(state.settings?.ttsXttsVoices, imported.ttsXttsVoices),
    ttsUserVoiceAssignments: mergeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments, imported.ttsUserVoiceAssignments),
    settingsProfiles: nextProfiles,
    activeSettingsProfileId: nextProfileId
  });

  applySettingsToUi();
  renderSettingsProfileOptions();
  await persistSettings({
    ttsXttsVoices: state.settings.ttsXttsVoices,
    ttsUserVoiceAssignments: state.settings.ttsUserVoiceAssignments,
    settingsProfiles: nextProfiles,
    activeSettingsProfileId: nextProfileId
  });
  showToast("Settings import completed successfully.", "success");
}

function normalizeSidebarTabName(tabName) {
  if (tabName === "games") {
    return "games";
  }
  if (tabName === "users") {
    return "users";
  }
  if (tabName === "event-actions") {
    return "event-actions";
  }

  return "controls";
}

function setActiveTab(tabName) {
  const normalizedTabName = normalizeSidebarTabName(tabName);
  state.activeTab = normalizedTabName;

  const controlsActive = normalizedTabName === "controls";
  const gamesActive = normalizedTabName === "games";
  const usersActive = normalizedTabName === "users";
  const eventActionsActive = normalizedTabName === "event-actions";

  controlsTabButton?.classList.toggle("active", controlsActive);
  overlaysTabButton?.classList.toggle("active", false);
  gamesTabButton?.classList.toggle("active", gamesActive);
  usersTabButton?.classList.toggle("active", usersActive);
  eventActionsTabButton?.classList.toggle("active", eventActionsActive);
  controlsTabPanel?.classList.toggle("active", controlsActive);
  overlaysTabPanel?.classList.toggle("active", false);
  gamesTabPanel?.classList.toggle("active", gamesActive);
  usersTabPanel?.classList.toggle("active", usersActive);
  eventActionsTabPanel?.classList.toggle("active", eventActionsActive);
  if (usersActive) {
    renderViewerPointsLeaderboard();
  }
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
    case "games":
      return "Games";
    case "users":
      return "Users and Points";
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

function openFocusedGamesLayer() {
  openSidebarLayer("games", {
    singleView: true,
    title: "Games"
  });
}

function openFocusedUsersLayer() {
  openSidebarLayer("users", {
    singleView: true,
    title: "Users and Points"
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

async function saveUserNotesNow(nextNotes, options = {}) {
  const normalizedNotes = normalizeUserNotes(nextNotes);
  state.settings = {
    ...state.settings,
    userNotes: normalizedNotes
  };

  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  if (nextProfiles[activeProfileId]) {
    nextProfiles[activeProfileId] = {
      ...nextProfiles[activeProfileId],
      settings: normalizeProfileSettingsSnapshot({
        ...nextProfiles[activeProfileId].settings,
        userNotes: normalizedNotes
      })
    };
    state.settings.settingsProfiles = nextProfiles;
  }

  renderChatList();
  renderViewerPointsLeaderboard();
  return persistSettings({
    userNotes: normalizedNotes
  }, {
    render: options.render !== false
  });
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

  await saveUserNotesNow(nextNotes);
  chatNotesDeleteButton.disabled = !hasUserNoteRecord(userKey);
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
  await saveUserNotesNow(nextNotes);
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
  state.sessionTtsVoiceLocksByUser = new Map();
  state.sessionTtsVoiceLocksByVoice = new Map();
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
  state.customRuleCooldownNoticeAt = new Map();
  state.birthdayActionTriggers = new Set();
  resetLikeRace();
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
    const iconMarkup = getGiftImageMarkup(trustedImageUrl, gift.coinValue);
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
    ? getGiftImageMarkup(resolvedImageUrl, knownGift?.coinValue ?? rule?.triggerGiftCoinValue ?? 0, "gift-trigger-selected-icon")
    : getGiftFallbackBadgeMarkup(knownGift?.coinValue ?? rule?.triggerGiftCoinValue ?? 0);

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
    renderLikeRaceSettings();
    renderSpinWheelSettings();
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
  const limited = filtered.slice(0, SEARCH_PREVIEW_LIMIT);

  if (selectedSound && !limited.some((sound) => sound.id === selectedSound.id)) {
    limited.unshift(selectedSound);
  }

  return limited;
}

function buildSoundSelectOptionsMarkup(selectedSoundId = "", emptyLabel = "No sound", search = "") {
  const selectedId = String(selectedSoundId ?? "").trim();
  const sounds = getSoundOptionList(String(search ?? ""), selectedId);
  const options = sounds
    .map((sound) => `<option value="${escapeHtml(sound.id)}" ${sound.id === selectedId ? "selected" : ""}>${escapeHtml(sound.title)}</option>`)
    .join("");
  const selectedSound = selectedId && !state.soundCatalogById.has(selectedId)
    ? `<option value="${escapeHtml(selectedId)}" selected>Selected sound (${escapeHtml(selectedId)})</option>`
    : "";
  return `<option value="">${escapeHtml(emptyLabel)}</option>${selectedSound}${options}`;
}

function getSoundTitleById(soundId = "") {
  const id = String(soundId ?? "").trim();
  return id ? state.soundCatalogById.get(id)?.title ?? "" : "";
}

function isLocalSoundId(soundId = "") {
  return String(soundId ?? "").trim().startsWith("local-file:");
}

function getLocalSoundTitle(soundId = "") {
  if (!isLocalSoundId(soundId)) {
    return "";
  }
  const filePath = String(soundId ?? "").trim().slice("local-file:".length);
  return filePath.split(/[\\/]/).filter(Boolean).pop() || "Local sound file";
}

function getSoundDisplayTitle(soundId = "") {
  const id = String(soundId ?? "").trim();
  if (!id) {
    return "";
  }
  return isLocalSoundId(id) ? getLocalSoundTitle(id) : getSoundTitleById(id);
}

function getSoundIdByTitle(title = "") {
  const normalizedTitle = String(title ?? "").trim().toLowerCase();
  if (!normalizedTitle) {
    return "";
  }
  const match = state.soundCatalog.find((sound) => sound.title.toLowerCase() === normalizedTitle);
  return match?.id ?? "";
}

function getSoundIdForSearchValue(title = "", currentSoundId = "") {
  const value = String(title ?? "").trim();
  if (!value) {
    return "";
  }
  const currentId = String(currentSoundId ?? "").trim();
  if (isLocalSoundId(currentId) && value.toLowerCase() === getLocalSoundTitle(currentId).toLowerCase()) {
    return currentId;
  }
  return getSoundIdByTitle(value);
}

function buildSoundDataListOptionsMarkup(selectedSoundId = "", search = "") {
  const selectedId = String(selectedSoundId ?? "").trim();
  return getSoundOptionList(String(search ?? ""), selectedId)
    .map((sound) => `<option value="${escapeHtml(sound.title)}"></option>`)
    .join("");
}

async function refreshLikeRaceSoundOptions(type, searchText = "") {
  const isFinishSound = type === "finish";
  const options = isFinishSound ? likeRaceFinishSoundOptions : likeRaceCountdownSoundOptions;
  if (!options) {
    return;
  }

  const requestId = state.likeRaceSoundSearchRequestId + 1;
  state.likeRaceSoundSearchRequestId = requestId;
  const normalizedSearch = String(searchText ?? "").trim();

  if (normalizedSearch.length >= 2) {
    try {
      await ensureSoundCatalogSearch(normalizedSearch);
      state.soundCatalogError = "";
    } catch (error) {
      state.soundCatalogError = error.message || "Unable to search the website sound library.";
      showToast(state.soundCatalogError, "error");
    }
  }

  if (requestId !== state.likeRaceSoundSearchRequestId) {
    return;
  }

  const settings = getLikeRaceSettings();
  const selectedSoundId = isFinishSound ? settings.finishSoundId : settings.countdownSoundId;
  options.innerHTML = buildSoundDataListOptionsMarkup(selectedSoundId, normalizedSearch);
}

function updateLikeRaceSoundSelectionFromSearch(type, options = {}) {
  const { save = false } = options;
  const isFinishSound = type === "finish";
  const searchInput = isFinishSound ? likeRaceFinishSoundSearchInput : likeRaceCountdownSoundSearchInput;
  const valueInput = isFinishSound ? likeRaceFinishSoundInput : likeRaceCountdownSoundInput;
  if (!searchInput || !valueInput) {
    return;
  }

  const searchValue = String(searchInput.value ?? "").trim();
  const selectedId = searchValue ? getSoundIdByTitle(searchValue) : "";
  if (!selectedId && searchValue) {
    return;
  }

  valueInput.value = selectedId;
  if (save && state.settings) {
    state.settings.likeRaceSettings = collectLikeRaceSettingsFromUi();
    scheduleSettingsSave();
    syncLikeRaceOverlayState();
    renderLikeRaceSummary();
  }
}

async function previewLikeRaceConfiguredSound(type) {
  const isFinishSound = type === "finish";
  updateLikeRaceSoundSelectionFromSearch(type, { save: true });
  const soundId = String((isFinishSound ? likeRaceFinishSoundInput : likeRaceCountdownSoundInput)?.value ?? "").trim();
  const searchInput = isFinishSound ? likeRaceFinishSoundSearchInput : likeRaceCountdownSoundSearchInput;
  const label = isFinishSound ? "Like Race finish sound preview" : "Like Race countdown sound preview";
  const displayedTitle = String(searchInput?.value ?? "").trim();

  if (!soundId) {
    showToast(`Choose a ${isFinishSound ? "finish" : "countdown"} sound to preview first.`, "info");
    searchInput?.focus();
    return;
  }

  if (displayedTitle && displayedTitle.toLowerCase() !== getSoundTitleById(soundId).toLowerCase()) {
    showToast("Choose a sound from the search results before previewing.", "info");
    searchInput?.focus();
    return;
  }

  await playLikeRaceSound(soundId, label);
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

function createAudioBufferWithTailPadding(buffer, paddingMs = 0) {
  const paddingFrames = Math.max(0, Math.ceil((Number(paddingMs) || 0) * buffer.sampleRate / 1000));
  if (!paddingFrames) {
    return buffer;
  }

  const paddedBuffer = state.audioContext.createBuffer(
    buffer.numberOfChannels,
    buffer.length + paddingFrames,
    buffer.sampleRate
  );

  for (let channelIndex = 0; channelIndex < buffer.numberOfChannels; channelIndex += 1) {
    paddedBuffer.copyToChannel(buffer.getChannelData(channelIndex), channelIndex, 0);
  }

  return paddedBuffer;
}

function createReverbImpulseBuffer(amount = 0) {
  const safeAmount = clamp(Number(amount) || 0, 0, 1);
  const sampleRate = state.audioContext.sampleRate;
  const duration = 0.25 + (safeAmount * 1.35);
  const length = Math.max(1, Math.floor(sampleRate * duration));
  const impulse = state.audioContext.createBuffer(2, length, sampleRate);
  const decay = 1.8 + (safeAmount * 2.4);

  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const channelData = impulse.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      const progress = index / length;
      channelData[index] = (Math.random() * 2 - 1) * ((1 - progress) ** decay);
    }
  }

  return impulse;
}

function connectAudioPlaybackGraph(source, outputNode, effects = {}) {
  const echo = clamp(Number(effects?.echo) || 0, 0, 1);
  const reverb = clamp(Number(effects?.reverb) || 0, 0, 1);
  const robotic = clamp(Number(effects?.robotic) || 0, 0, 1);
  const connectedNodes = [];
  const startedNodes = [];
  const connect = (fromNode, toNode) => {
    fromNode.connect(toNode);
    connectedNodes.push(fromNode);
  };

  if (echo <= 0 && reverb <= 0 && robotic <= 0) {
    connect(source, outputNode);
    return {
      tailMs: 0,
      disconnect() {
        startedNodes.forEach((node) => {
          try {
            node.stop();
          } catch {
            // Ignore stop errors during cleanup.
          }
        });
        connectedNodes.forEach((node) => {
          try {
            node.disconnect();
          } catch {
            // Ignore disconnect errors during cleanup.
          }
        });
      }
    };
  }

  const dryGain = state.audioContext.createGain();
  dryGain.gain.value = 1 - Math.min(0.38, (echo + reverb) * 0.16 + robotic * 0.18);
  connect(source, dryGain);
  connect(dryGain, outputNode);

  let tailMs = 0;

  if (robotic > 0) {
    const bandpass = state.audioContext.createBiquadFilter();
    const shaper = state.audioContext.createWaveShaper();
    const robotGain = state.audioContext.createGain();
    const tremolo = state.audioContext.createOscillator();
    const tremoloDepth = state.audioContext.createGain();
    const curveLength = 2048;
    const curve = new Float32Array(curveLength);
    const drive = 1 + robotic * 4.5;

    for (let index = 0; index < curveLength; index += 1) {
      const x = (index * 2) / curveLength - 1;
      curve[index] = Math.tanh(x * drive);
    }

    bandpass.type = "bandpass";
    bandpass.frequency.value = 750 + robotic * 950;
    bandpass.Q.value = 0.7 + robotic * 2.4;
    shaper.curve = curve;
    shaper.oversample = "4x";
    robotGain.gain.value = robotic * 0.2;
    tremolo.type = "sine";
    tremolo.frequency.value = 16 + robotic * 24;
    tremoloDepth.gain.value = robotic * 0.06;

    connect(source, bandpass);
    connect(bandpass, shaper);
    connect(shaper, robotGain);
    connect(robotGain, outputNode);
    tremolo.connect(tremoloDepth);
    tremoloDepth.connect(robotGain.gain);
    connectedNodes.push(tremolo, tremoloDepth);
    tremolo.start();
    startedNodes.push(tremolo);
  }

  if (echo > 0) {
    const delay = state.audioContext.createDelay(1);
    const feedback = state.audioContext.createGain();
    const echoWet = state.audioContext.createGain();
    delay.delayTime.value = 0.13 + (echo * 0.24);
    feedback.gain.value = 0.16 + (echo * 0.5);
    echoWet.gain.value = echo * 0.55;
    connect(source, delay);
    connect(delay, feedback);
    connect(feedback, delay);
    connect(delay, echoWet);
    connect(echoWet, outputNode);
    tailMs = Math.max(tailMs, Math.ceil((delay.delayTime.value * 1000) * (1 + echo * 5)));
  }

  if (reverb > 0) {
    const convolver = state.audioContext.createConvolver();
    const reverbWet = state.audioContext.createGain();
    convolver.buffer = createReverbImpulseBuffer(reverb);
    reverbWet.gain.value = reverb * 0.48;
    connect(source, convolver);
    connect(convolver, reverbWet);
    connect(reverbWet, outputNode);
    tailMs = Math.max(tailMs, Math.ceil(convolver.buffer.duration * 1000));
  }

  return {
    tailMs,
    disconnect() {
      startedNodes.forEach((node) => {
        try {
          node.stop();
        } catch {
          // Ignore stop errors during cleanup.
        }
      });
      connectedNodes.forEach((node) => {
        try {
          node.disconnect();
        } catch {
          // Ignore disconnect errors during cleanup.
        }
      });
    }
  };
}

async function playAudioUrl(audioUrl, volume = Number(ttsVolumeInput.value) || 1, effects = {}) {
  await ensureAudioContext();

  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error(`Unable to fetch audio (${response.status}).`);
  }

  const bytes = await response.arrayBuffer();
  const buffer = await state.audioContext.decodeAudioData(bytes.slice(0));
  const playbackBuffer = createAudioBufferWithTailPadding(buffer, AUDIO_TAIL_PADDING_MS);
  const pitchFactor = clamp(Number(effects?.pitch ?? 1) || 1, 0.5, 1.8);
  const detuneCents = Math.round(1200 * Math.log2(pitchFactor));

  return new Promise((resolve, reject) => {
    const source = state.audioContext.createBufferSource();
    const gainNode = state.audioContext.createGain();
    let graph = null;
    let settled = false;
    let timeoutId = null;
    let endedTimerId = null;

    const cleanup = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (endedTimerId) {
        window.clearTimeout(endedTimerId);
        endedTimerId = null;
      }
      source.onended = null;
      graph?.disconnect();
      if (state.currentAudioSource === source) {
        state.currentAudioSource = null;
      }
      if (state.currentGainNode === gainNode) {
        state.currentGainNode = null;
      }
    };

    const settle = (callback) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      callback();
    };

    state.currentGainNode = gainNode;
    state.currentAudioSource = source;
    gainNode.gain.value = volume;
    source.buffer = playbackBuffer;
    if (Number.isFinite(detuneCents) && detuneCents !== 0 && source.detune) {
      source.detune.value = detuneCents;
    }
    graph = connectAudioPlaybackGraph(source, gainNode, effects);
    gainNode.connect(state.audioContext.destination);
    source.onended = () => {
      const tailMs = Math.max(0, Number(graph?.tailMs) || 0);
      endedTimerId = window.setTimeout(() => {
        endedTimerId = null;
        settle(resolve);
      }, tailMs);
    };

    const maxDurationMs = Math.max(
      AUDIO_PLAYBACK_GRACE_MS,
      Math.ceil((playbackBuffer.duration * 1000) / pitchFactor) + Math.max(0, Number(graph?.tailMs) || 0) + AUDIO_PLAYBACK_GRACE_MS
    );
    timeoutId = window.setTimeout(() => {
      try {
        source.stop(0);
      } catch {
        // Ignore stop errors; the timeout itself is enough to unblock the queue.
      }
      settle(() => reject(new Error("Audio playback timed out and was stopped.")));
    }, maxDurationMs);

    try {
      source.start(0);
    } catch (error) {
      settle(() => reject(error));
    }
  });
}

function stopCurrentAudioPlayback() {
  if (!state.currentGainNode && !state.currentAudioSource) {
    return;
  }

  try {
    if (state.currentGainNode) {
      state.currentGainNode.gain.cancelScheduledValues(0);
      state.currentGainNode.gain.setValueAtTime(state.currentGainNode.gain.value, state.audioContext?.currentTime ?? 0);
      state.currentGainNode.gain.linearRampToValueAtTime(0, (state.audioContext?.currentTime ?? 0) + 0.06);
    }
    if (state.currentAudioSource) {
      state.currentAudioSource.stop(0);
    }
  } catch {
    // Ignore audio shutdown issues during disconnect cleanup.
  } finally {
    state.currentGainNode = null;
    state.currentAudioSource = null;
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
  const metricInput = document.querySelector(`[data-rule-metric="${ruleId}"]`);
  const thresholdInput = document.querySelector(`[data-rule-threshold="${ruleId}"]`);
  const cooldownInput = document.querySelector(`[data-rule-user-cooldown="${ruleId}"]`);
  const disableWindowStartInput = document.querySelector(`[data-rule-disable-window-start="${ruleId}"]`);
  const disableWindowEndInput = document.querySelector(`[data-rule-disable-window-end="${ruleId}"]`);
  const enabledToggle = document.querySelector(`[data-rule-enabled-toggle="${ruleId}"]`)
    || document.querySelector(`[data-custom-toggle="${ruleId}"]`);
  const soundSelect = document.querySelector(`[data-rule-sound-select="${ruleId}"]`);
  const queueSelect = document.querySelector(`[data-rule-queue="${ruleId}"]`);
  const webhookUrlInput = document.querySelector(`[data-rule-webhook-url="${ruleId}"]`);
  const feedbackOverlayEnabledInput = document.querySelector(`[data-rule-feedback-overlay-enabled="${ruleId}"]`);
  const feedbackOverlayTitleInput = document.querySelector(`[data-rule-feedback-overlay-title="${ruleId}"]`);
  const feedbackOverlayMessageInput = document.querySelector(`[data-rule-feedback-overlay-message="${ruleId}"]`);
  const feedbackOverlayAccentColorInput = document.querySelector(`[data-rule-feedback-overlay-accent="${ruleId}"]`);
  const triggerAudienceInput = document.querySelector(`[data-rule-trigger-audience="${ruleId}"]`);
  const triggerUsernameInput = document.querySelector(`[data-rule-trigger-username="${ruleId}"]`);
  const triggerGiftNameInput = document.querySelector(`[data-rule-gift-name="${ruleId}"]`);
  const triggerGiftImageUrlInput = document.querySelector(`[data-rule-gift-image-url="${ruleId}"]`);

  return normalizeRule({
    ...rule,
    name: nameInput?.value ?? rule.name,
    metric: metricInput?.value ?? rule.metric,
    threshold: Number(thresholdInput?.value ?? rule.threshold),
    userCooldownSeconds: Math.max(0, Number(cooldownInput?.value ?? rule.userCooldownSeconds) || 0),
    disableWindowStartTime: disableWindowStartInput?.value ?? rule.disableWindowStartTime,
    disableWindowEndTime: disableWindowEndInput?.value ?? rule.disableWindowEndTime,
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
    rule.userCooldownSeconds ? `cooldown ${rule.userCooldownSeconds}s` : "",
    getRuleScheduleSummary(rule)
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
    ["user", "specificUser"],
    ["birthday", "birthday"],
    ["birthdays", "birthday"],
    ["birthday today", "birthday"]
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

  if (isRuleWithinDisabledTimeWindow(rule)) {
    const scheduleSummary = getRuleScheduleSummary(rule);
    showToast(`Custom action "${rule.name}" is scheduled off${scheduleSummary ? ` (${scheduleSummary})` : ""}.`, "info");
    return;
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
  const spinWheelSettings = getSpinWheelSettings();
  const shouldTriggerSpinWheel = !options.fromSpinWheel
    && spinWheelSettings.enabled
    && spinWheelSettings.eventRuleId
    && spinWheelSettings.eventRuleId === rule?.id;
  if (!rule?.soundId && !rule?.webhookUrl && !hasFeedbackOverlay && !shouldTriggerSpinWheel) {
    return;
  }

  if (shouldTriggerSpinWheel) {
    void startSpinWheel(sourceItem, { source: "event" });
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
  }, {
    label: `${testMode ? "Test action" : "Event action"}: ${rule.name}`,
    kind: "action",
    sourceItem
  });

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
    const soundOptionsMarkup = buildSoundDataListOptionsMarkup(rule.soundId, "");
    const selectedSoundTitle = getSoundDisplayTitle(rule.soundId);
    const scheduleSummary = getRuleScheduleSummary(rule);
    const schedulePaused = rule.enabled && isRuleWithinDisabledTimeWindow(rule);
    const ruleStatusText = !rule.enabled ? "Disabled" : schedulePaused ? "Scheduled off" : "Enabled";
    const ruleStatusClass = !rule.enabled ? "muted" : schedulePaused ? "warning" : "success";

    if (!isEditing) {
      const hasSound = Boolean(rule.soundId);
      const hasWebhook = Boolean(rule.webhookUrl);
      const actionSummary = [
        hasSound ? `sound: ${selectedSoundTitle || "selected sound"}` : "",
        hasWebhook ? "webhook enabled" : "",
        hasCustomActionFeedbackOverlay(rule) ? "feedback overlay" : "",
        getQueueLabel(rule.queueId),
        rule.userCooldownSeconds > 0 ? `user cooldown ${rule.userCooldownSeconds}s` : "",
        scheduleSummary
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
            <span class="status-pill ${ruleStatusClass}">${ruleStatusText}</span>
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
              <span class="status-pill ${ruleStatusClass}">${ruleStatusText}</span>
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
              <label class="field">
                <span>Trigger audience</span>
                <select data-rule-trigger-audience="${escapeHtml(rule.id)}">
                  <option value="everyone" ${rule.triggerAudience === "everyone" ? "selected" : ""}>Everyone</option>
                  <option value="follower" ${rule.triggerAudience === "follower" ? "selected" : ""}>Any Follower</option>
                  <option value="subscriber" ${rule.triggerAudience === "subscriber" ? "selected" : ""}>Any Subscriber</option>
                  <option value="moderator" ${rule.triggerAudience === "moderator" ? "selected" : ""}>Any Moderator</option>
                  <option value="topGifter" ${rule.triggerAudience === "topGifter" ? "selected" : ""}>Top Gifter</option>
                  <option value="specificUser" ${rule.triggerAudience === "specificUser" ? "selected" : ""}>A specific user</option>
                  <option value="birthday" ${rule.triggerAudience === "birthday" ? "selected" : ""}>Birthday today</option>
                </select>
              </label>
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
              <label class="field">
                <span>Trigger type</span>
                <select data-rule-metric="${escapeHtml(rule.id)}">
                  <option value="join" ${rule.metric === "join" ? "selected" : ""}>Join</option>
                  <option value="firstActivity" ${rule.metric === "firstActivity" ? "selected" : ""}>First user activity</option>
                  <option value="anyComment" ${rule.metric === "anyComment" ? "selected" : ""}>Any comment</option>
                  <option value="follows" ${rule.metric === "follows" ? "selected" : ""}>Follow</option>
                  <option value="shares" ${rule.metric === "shares" ? "selected" : ""}>Share</option>
                  <option value="likes" ${rule.metric === "likes" ? "selected" : ""}>Sending likes (taps)</option>
                  <option value="coins" ${rule.metric === "coins" ? "selected" : ""}>Sending a gift with min. coins value</option>
                  <option value="specificGift" ${rule.metric === "specificGift" ? "selected" : ""}>Sending a specific gift</option>
                  <option value="subEmote" ${rule.metric === "subEmote" ? "selected" : ""}>Sub emote</option>
                  <option value="fanEmote" ${rule.metric === "fanEmote" ? "selected" : ""}>Fan emote</option>
                </select>
              </label>
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
              <div class="field-grid field-span-2 custom-rule-time-window">
                <label class="field">
                  <span>Auto-disable start time</span>
                  <input data-rule-disable-window-start="${escapeHtml(rule.id)}" type="time" value="${escapeHtml(normalizeRuleTimeValue(rule.disableWindowStartTime))}" />
                </label>
                <label class="field">
                  <span>Auto-disable end time</span>
                  <input data-rule-disable-window-end="${escapeHtml(rule.id)}" type="time" value="${escapeHtml(normalizeRuleTimeValue(rule.disableWindowEndTime))}" />
                </label>
                <button type="button" class="ghost icon-button compact-icon-button custom-rule-clear-time-button" data-rule-clear-disable-window="${escapeHtml(rule.id)}" title="Clear auto-disable start and end times" aria-label="Clear auto-disable start and end times">&#10005;</button>
                <small class="field-hint field-span-2">If both times are set, this event action is automatically disabled between those times and enabled again outside that window. Leave either blank to disable scheduling.</small>
              </div>
            </div>
          </fieldset>

            <label class="field">
              <span>Sound</span>
              <input type="hidden" data-rule-sound-select="${escapeHtml(rule.id)}" value="${escapeHtml(rule.soundId || "")}" />
              <div class="inline-sound-picker searchable-sound-picker custom-rule-sound-picker">
                <input
                  data-rule-sound-search="${escapeHtml(rule.id)}"
                  list="rule-sound-options-${escapeHtml(rule.id)}"
                  placeholder="Search sounds or choose a local file"
                  autocomplete="off"
                  value="${escapeHtml(selectedSoundTitle)}"
                />
                <datalist id="rule-sound-options-${escapeHtml(rule.id)}" data-rule-sound-options="${escapeHtml(rule.id)}">
                  ${soundOptionsMarkup}
                </datalist>
                <button type="button" class="ghost icon-button inline-preview-button" data-custom-preview-sound="${escapeHtml(rule.id)}" title="Preview sound" aria-label="Preview sound">&#9654;</button>
                <button type="button" class="ghost icon-button inline-preview-button" data-custom-browse-sound="${escapeHtml(rule.id)}" title="Browse local sound file" aria-label="Browse local sound file">&#128193;</button>
              </div>
              <small class="field-hint">Search the website sound library or browse for a local MP3, WAV, OGG, M4A, AAC, or FLAC file.</small>
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
                <span>Trigger overlay</span>
              </div>
              <div class="event-builder-options">
                <label class="toggle-switch">
                  <input type="checkbox" data-rule-feedback-overlay-enabled="${escapeHtml(rule.id)}" ${rule.feedbackOverlayEnabled ? "checked" : ""} />
                  <span class="switch-ui"></span>
                  <span class="switch-copy">Trigger a custom hosted overlay message when this event action fires</span>
                </label>
                <div class="field-grid ${rule.feedbackOverlayEnabled ? "" : "is-hidden"}" data-rule-feedback-overlay-fields="${escapeHtml(rule.id)}">
                  <label class="field">
                    <span>Overlay title</span>
                    <input
                      data-rule-feedback-overlay-title="${escapeHtml(rule.id)}"
                      type="text"
                      value="${escapeHtml(rule.feedbackOverlayTitle || "Custom Event")}"
                      placeholder="Custom Event"
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
                      placeholder="{username} triggered {rule name}. Total likes: {user total likes}"
                    >${escapeHtml(rule.feedbackOverlayMessage || "")}</textarea>
                    <small class="field-hint">Available tokens: <code>{username}</code>, <code>{gift sent}</code>, <code>{user total likes}</code>, <code>{Cool down time}</code>, <code>{rule name}</code></small>
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
  const optionsNode = document.querySelector(`[data-rule-sound-options="${ruleId}"]`);
  const selectedInput = document.querySelector(`[data-rule-sound-select="${ruleId}"]`);
  const rule = state.settings.customEventRules.find((item) => item.id === ruleId);
  if (!optionsNode || !rule) {
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

  optionsNode.innerHTML = buildSoundDataListOptionsMarkup(selectedInput?.value || rule.soundId, normalizedSearch);
}

function updateRuleSoundSelectionFromSearch(ruleId) {
  const searchInput = document.querySelector(`[data-rule-sound-search="${ruleId}"]`);
  const selectedInput = document.querySelector(`[data-rule-sound-select="${ruleId}"]`);
  if (!searchInput || !selectedInput) {
    return;
  }

  const searchValue = String(searchInput.value ?? "").trim();
  const selectedId = getSoundIdForSearchValue(searchValue, selectedInput.value);
  selectedInput.value = selectedId;
  return selectedId;
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
  if (enabled) {
    const titleInput = document.querySelector(`[data-rule-feedback-overlay-title="${ruleId}"]`);
    const messageInput = document.querySelector(`[data-rule-feedback-overlay-message="${ruleId}"]`);
    if (titleInput && !String(titleInput.value ?? "").trim()) {
      titleInput.value = "Custom Event";
    }
    if (messageInput && !String(messageInput.value ?? "").trim()) {
      messageInput.value = "{username} triggered {rule name}. Total likes: {user total likes}";
    }
  }
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

function scheduleViewerStatsAllTimeSave() {
  window.clearTimeout(viewerStatsAllTimeSaveTimer);
  viewerStatsAllTimeSaveTimer = window.setTimeout(() => {
    persistSettings({
      viewerStatsAllTime: normalizeViewerStatsAllTime(state.settings?.viewerStatsAllTime)
    }, { render: false }).catch((error) => {
      showToast(error.message || "Unable to save viewer stats totals.", "error");
    });
  }, SAVE_DEBOUNCE_MS);
}

function collectViewerPointsSettingsFromUi(fallback = state.settings?.viewerPointsSettings) {
  const current = normalizeViewerPointsSettings(fallback);
  return normalizeViewerPointsSettings({
    enabled: viewerPointsEnabledInput ? viewerPointsEnabledInput.checked : current.enabled,
    like: viewerPointsLikeInput?.value ?? current.like,
    comment: viewerPointsCommentInput?.value ?? current.comment,
    share: viewerPointsShareInput?.value ?? current.share,
    follow: viewerPointsFollowInput?.value ?? current.follow,
    gift: viewerPointsGiftInput?.value ?? current.gift,
    coin: viewerPointsCoinInput?.value ?? current.coin,
    subEmote: viewerPointsSubEmoteInput?.value ?? current.subEmote,
    fanEmote: viewerPointsFanEmoteInput?.value ?? current.fanEmote,
    subscriberMultiplier: viewerPointsSubscriberMultiplierInput?.value ?? current.subscriberMultiplier
  });
}

function applyViewerPointsSettingsToUi() {
  const settings = normalizeViewerPointsSettings(state.settings?.viewerPointsSettings);
  if (viewerPointsEnabledInput) viewerPointsEnabledInput.checked = settings.enabled;
  if (viewerPointsLikeInput) viewerPointsLikeInput.value = String(settings.like);
  if (viewerPointsCommentInput) viewerPointsCommentInput.value = String(settings.comment);
  if (viewerPointsShareInput) viewerPointsShareInput.value = String(settings.share);
  if (viewerPointsFollowInput) viewerPointsFollowInput.value = String(settings.follow);
  if (viewerPointsGiftInput) viewerPointsGiftInput.value = String(settings.gift);
  if (viewerPointsCoinInput) viewerPointsCoinInput.value = String(settings.coin);
  if (viewerPointsSubEmoteInput) viewerPointsSubEmoteInput.value = String(settings.subEmote);
  if (viewerPointsFanEmoteInput) viewerPointsFanEmoteInput.value = String(settings.fanEmote);
  if (viewerPointsSubscriberMultiplierInput) viewerPointsSubscriberMultiplierInput.value = String(settings.subscriberMultiplier);
}

function formatViewerPointsActivityTime(timestamp) {
  const numericTimestamp = Number(timestamp) || 0;
  if (numericTimestamp <= 0) {
    return "Not recorded";
  }

  return new Date(numericTimestamp).toLocaleString("en-GB", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

function formatEstimatedCoinMoneyValue(coins) {
  const safeCoins = Math.max(0, Number(coins) || 0);
  const estimatedCoinValue = 7.49 / 700;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(safeCoins * estimatedCoinValue);
}

function getViewerPointsRoleSortValue(entry) {
  if (entry?.isModerator) {
    return 3;
  }
  if (entry?.isSubscriber) {
    return 2;
  }
  return 1;
}

function getViewerPointsSortValue(entry, key) {
  switch (key) {
    case "user":
      return String(entry?.displayName ?? entry?.username ?? "").toLowerCase();
    case "points":
      return Math.max(0, Number(entry?.points) || 0);
    case "gifts":
      return Math.max(0, Number(entry?.gifts) || 0);
    case "coins":
    case "value":
      return Math.max(0, Number(entry?.coins) || 0);
    case "likes":
      return Math.max(0, Number(entry?.likes) || 0);
    case "comments":
      return Math.max(0, Number(entry?.comments) || 0);
    case "shares":
      return Math.max(0, Number(entry?.shares) || 0);
    case "firstActivity":
      return Math.max(0, Number(entry?.firstActivityAt) || 0);
    case "lastActivity":
      return Math.max(0, Number(entry?.lastActivityAt) || 0);
    case "roles":
      return getViewerPointsRoleSortValue(entry);
    case "rank":
    default:
      return Math.max(0, Number(entry?.points) || 0);
  }
}

function compareViewerPointsItems(left, right) {
  const key = ["rank", "user", "points", "gifts", "coins", "value", "likes", "comments", "shares", "firstActivity", "lastActivity", "roles"].includes(viewerPointsSortKey)
    ? viewerPointsSortKey
    : "rank";
  const direction = viewerPointsSortDirection === "desc" ? -1 : 1;
  const leftValue = getViewerPointsSortValue(left, key);
  const rightValue = getViewerPointsSortValue(right, key);
  let result = 0;

  if (typeof leftValue === "string" || typeof rightValue === "string") {
    result = String(leftValue).localeCompare(String(rightValue));
  } else {
    result = Number(leftValue) - Number(rightValue);
  }

  if (result === 0) {
    result = String(left?.username ?? "").localeCompare(String(right?.username ?? ""));
  }

  return result * direction;
}

function updateViewerPointsSortButtons() {
  document.querySelectorAll("[data-viewer-points-sort]").forEach((button) => {
    const key = button.dataset.viewerPointsSort;
    const indicator = button.querySelector("span");
    const isActive = key === viewerPointsSortKey;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-sort", isActive ? (viewerPointsSortDirection === "desc" ? "descending" : "ascending") : "none");
    if (indicator) {
      indicator.textContent = isActive ? (viewerPointsSortDirection === "desc" ? "↓" : "↑") : "";
    }
  });
}

function buildViewerPointsLeaderboardItems(limit = Infinity) {
  const leaderboard = normalizeViewerPointsLeaderboard(state.settings?.viewerPointsLeaderboard);
  const users = { ...leaderboard.users };
  for (const [userKey, profile] of state.sessionUserProfiles.entries()) {
    const normalizedUser = normalizeUserKey(userKey);
    if (!normalizedUser || users[normalizedUser]) {
      continue;
    }
    users[normalizedUser] = {
      username: normalizedUser,
      displayName: String(profile?.nickname ?? normalizedUser).trim() || normalizedUser,
      points: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      follows: 0,
      gifts: 0,
      coins: 0,
      subEmote: 0,
      fanEmote: 0,
      lastAwardedAt: 0,
      firstActivityAt: Math.max(0, Number(profile?.firstActivityAt) || 0),
      lastActivityAt: Math.max(0, Number(profile?.lastActivityAt) || 0),
      profilePictureUrl: String(profile?.profilePictureUrl ?? "").trim(),
      isSubscriber: Boolean(profile?.isSubscriber),
      isModerator: Boolean(profile?.isModerator)
    };
  }

  return Object.values(users)
    .sort((left, right) => {
      const pointsDiff = Math.max(0, Number(right.points) || 0) - Math.max(0, Number(left.points) || 0);
      if (pointsDiff !== 0) {
        return pointsDiff;
      }
      const activityDiff = Math.max(0, Number(right.lastActivityAt) || 0) - Math.max(0, Number(left.lastActivityAt) || 0);
      if (activityDiff !== 0) {
        return activityDiff;
      }
      return String(left.username ?? "").localeCompare(String(right.username ?? ""));
    })
    .slice(0, limit);
}

function renderViewerPointsLeaderboardLegacy() {
  if (!viewerPointsLeaderboardList) {
    return;
  }

  const items = buildViewerPointsLeaderboardItems(10);
  if (!items.length) {
    viewerPointsLeaderboardList.innerHTML = `<p class="field-hint">No points have been awarded yet.</p>`;
    return;
  }

  viewerPointsLeaderboardList.innerHTML = items.map((entry, index) => {
    const displayName = String(entry.displayName ?? entry.username ?? "viewer").trim() || "viewer";
    const username = String(entry.username ?? displayName).trim() || displayName;
    const points = Math.round(Math.max(0, Number(entry.points) || 0));
    const badges = [
      entry.isSubscriber ? "Subscriber" : "",
      entry.isModerator ? "Moderator" : ""
    ].filter(Boolean).join(" · ");
    const meta = [
      `${Math.max(0, Number(entry.likes) || 0)} likes`,
      `${Math.max(0, Number(entry.comments) || 0)} comments`,
      `${Math.max(0, Number(entry.shares) || 0)} shares`,
      `${Math.max(0, Number(entry.gifts) || 0)} gifts`
    ].join(" · ");
    return `
      <article class="viewer-points-row">
        <span class="viewer-points-rank">${index + 1}</span>
        <span class="viewer-points-user">
          <strong>${escapeHtml(displayName)}</strong>
          <small>@${escapeHtml(username)}${badges ? ` · ${escapeHtml(badges)}` : ""}</small>
        </span>
        <span class="viewer-points-score">${points.toLocaleString("en-GB")} pts</span>
        <small class="viewer-points-meta">${escapeHtml(meta)}</small>
      </article>
    `;
  }).join("");
}

function renderViewerPointsLeaderboard() {
  const allItems = buildViewerPointsLeaderboardItems();
  const normalizedSearch = String(viewerPointsSearchText ?? "").trim().toLowerCase();
  const normalizedRoleFilter = ["all", "subscriber", "moderator", "viewer"].includes(viewerPointsRoleFilter)
    ? viewerPointsRoleFilter
    : "all";
  const normalizedBalanceFilter = ["all", "positive", "zero"].includes(viewerPointsBalanceFilter)
    ? viewerPointsBalanceFilter
    : "all";
  const normalizedBirthdayFilter = ["all", "hasBirthday", "today", "ascending"].includes(viewerPointsBirthdayFilter)
    ? viewerPointsBirthdayFilter
    : "all";
  const filteredItems = allItems.filter((entry) => {
    const username = String(entry.username ?? "").toLowerCase();
    const displayName = String(entry.displayName ?? "").toLowerCase();
    const points = Math.max(0, Number(entry.points) || 0);
    const noteRecord = getUserNoteRecord(username);
    const hasBirthday = Boolean(noteRecord.birthday);
    if (normalizedSearch && !username.includes(normalizedSearch) && !displayName.includes(normalizedSearch)) {
      return false;
    }
    if (normalizedRoleFilter === "subscriber" && !entry.isSubscriber) {
      return false;
    }
    if (normalizedRoleFilter === "moderator" && !entry.isModerator) {
      return false;
    }
    if (normalizedRoleFilter === "viewer" && (entry.isSubscriber || entry.isModerator)) {
      return false;
    }
    if (normalizedBalanceFilter === "positive" && points <= 0) {
      return false;
    }
    if (normalizedBalanceFilter === "zero" && points > 0) {
      return false;
    }
    if ((normalizedBirthdayFilter === "hasBirthday" || normalizedBirthdayFilter === "ascending") && !hasBirthday) {
      return false;
    }
    if (normalizedBirthdayFilter === "today" && !isBirthdayToday(noteRecord.birthday)) {
      return false;
    }
    return true;
  }).sort((left, right) => {
    if (normalizedBirthdayFilter === "ascending" && viewerPointsSortKey === "rank") {
      const leftBirthday = getUserNoteRecord(left.username).birthday;
      const rightBirthday = getUserNoteRecord(right.username).birthday;
      const leftSort = getNextBirthdaySortValue(leftBirthday);
      const rightSort = getNextBirthdaySortValue(rightBirthday);
      return leftSort - rightSort
        || String(left.displayName ?? left.username ?? "").localeCompare(String(right.displayName ?? right.username ?? ""));
    }

    return compareViewerPointsItems(left, right);
  });

  updateViewerPointsSortButtons();

  if (viewerPointsLeaderboardList) {
    const topItems = allItems.filter((entry) => Math.max(0, Number(entry?.points) || 0) > 0).slice(0, 10);
    viewerPointsLeaderboardList.innerHTML = topItems.length
      ? topItems.map((entry, index) => {
          const displayName = String(entry.displayName ?? entry.username ?? "viewer").trim() || "viewer";
          const username = String(entry.username ?? displayName).trim() || displayName;
          const points = Math.round(Math.max(0, Number(entry.points) || 0));
          return `
            <article class="viewer-points-row">
              <span class="viewer-points-rank">${index + 1}</span>
              <span class="viewer-points-user">
                <strong>${escapeHtml(displayName)}</strong>
                <small>@${escapeHtml(username)}</small>
              </span>
              <span class="viewer-points-score">${points.toLocaleString("en-GB")} pts</span>
            </article>
          `;
        }).join("")
      : `<p class="field-hint">No points have been awarded yet.</p>`;
  }

  if (!viewerPointsUsersTableBody) {
    return;
  }

  if (!allItems.length) {
    viewerPointsUsersTableBody.innerHTML = `<tr><td colspan="13">No users have been recorded yet.</td></tr>`;
    if (viewerPointsPageStatus) {
      viewerPointsPageStatus.textContent = "Showing 0 users";
    }
    if (viewerPointsPrevPageButton) {
      viewerPointsPrevPageButton.disabled = true;
    }
    if (viewerPointsNextPageButton) {
      viewerPointsNextPageButton.disabled = true;
    }
    return;
  }

  if (!filteredItems.length) {
    viewerPointsUsersTableBody.innerHTML = `<tr><td colspan="13">No users match the current filters.</td></tr>`;
    if (viewerPointsPageStatus) {
      viewerPointsPageStatus.textContent = "Showing 0 users";
    }
    if (viewerPointsPrevPageButton) {
      viewerPointsPrevPageButton.disabled = true;
    }
    if (viewerPointsNextPageButton) {
      viewerPointsNextPageButton.disabled = true;
    }
    return;
  }

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  viewerPointsPageIndex = Math.max(0, Math.min(viewerPointsPageIndex, totalPages - 1));
  const pageStart = viewerPointsPageIndex * pageSize;
  const pageItems = filteredItems.slice(pageStart, pageStart + pageSize);

  if (viewerPointsPageStatus) {
    const pageEnd = Math.min(filteredItems.length, pageStart + pageItems.length);
    viewerPointsPageStatus.textContent = `Showing ${pageStart + 1}-${pageEnd} of ${filteredItems.length} users`;
  }
  if (viewerPointsPrevPageButton) {
    viewerPointsPrevPageButton.disabled = viewerPointsPageIndex <= 0;
  }
  if (viewerPointsNextPageButton) {
    viewerPointsNextPageButton.disabled = viewerPointsPageIndex >= totalPages - 1;
  }

  viewerPointsUsersTableBody.innerHTML = pageItems.map((entry, pageIndex) => {
    const displayName = String(entry.displayName ?? entry.username ?? "viewer").trim() || "viewer";
    const username = String(entry.username ?? displayName).trim() || displayName;
    const points = Math.round(Math.max(0, Number(entry.points) || 0));
    const gifts = Math.round(Math.max(0, Number(entry.gifts) || 0));
    const coins = Math.round(Math.max(0, Number(entry.coins) || 0));
    const estimatedValue = formatEstimatedCoinMoneyValue(coins);
    const likes = Math.round(Math.max(0, Number(entry.likes) || 0));
    const comments = Math.round(Math.max(0, Number(entry.comments) || 0));
    const shares = Math.round(Math.max(0, Number(entry.shares) || 0));
    const rank = pageStart + pageIndex + 1;
    const noteRecord = getUserNoteRecord(username);
    const noteText = noteRecord.note || "No notes saved.";
    const birthdayText = noteRecord.birthday || "No birthday saved.";
    const profilePictureUrl = String(entry.profilePictureUrl ?? state.sessionUserProfiles.get(normalizeUserKey(username))?.profilePictureUrl ?? "").trim();
    const avatarContent = profilePictureUrl
      ? `<img src="${escapeHtml(profilePictureUrl)}" alt="" loading="lazy" />`
      : `<span>${escapeHtml(displayName.slice(0, 1).toUpperCase() || "?")}</span>`;
    const roleIcons = [
      entry.isSubscriber ? `<span class="viewer-points-role-icon subscriber" title="Subscriber" aria-label="Subscriber">S</span>` : "",
      entry.isModerator ? `<span class="viewer-points-role-icon moderator" title="Moderator" aria-label="Moderator">M</span>` : ""
    ].filter(Boolean).join("") || `<span class="viewer-points-role-icon viewer" title="Viewer" aria-label="Viewer">V</span>`;
    return `
      <tr>
        <td><span class="viewer-points-table-rank">${rank}</span></td>
        <td>
          <div class="viewer-points-user-cell">
            <span class="viewer-points-avatar">${avatarContent}</span>
            <span class="viewer-points-user-text">
              <strong>${escapeHtml(displayName)}</strong>
              <button type="button" class="viewer-points-profile-link" data-viewer-points-open-profile="${escapeHtml(username)}">@${escapeHtml(username)}</button>
              <span class="viewer-points-note-popover" role="tooltip">
                <strong>Viewer notes</strong>
                <span>${escapeHtml(noteText)}</span>
                <strong>Birthday</strong>
                <span>${escapeHtml(birthdayText)}</span>
                <button type="button" class="ghost compact-button viewer-points-inline-edit" data-viewer-points-edit-notes="${escapeHtml(username)}">Edit notes</button>
              </span>
            </span>
          </div>
        </td>
        <td>
          <input class="viewer-points-table-input" data-viewer-points-set="${escapeHtml(username)}" type="number" min="0" step="1" value="${points}" aria-label="Points for ${escapeHtml(username)}" />
        </td>
        <td><span class="viewer-points-stat-count">${gifts.toLocaleString("en-GB")}</span></td>
        <td><span class="viewer-points-stat-count">${coins.toLocaleString("en-GB")}</span></td>
        <td><span class="viewer-points-stat-count viewer-points-money-value" title="Estimated from £7.49 / 700 coins">${escapeHtml(estimatedValue)}</span></td>
        <td><span class="viewer-points-stat-count">${likes.toLocaleString("en-GB")}</span></td>
        <td><span class="viewer-points-stat-count">${comments.toLocaleString("en-GB")}</span></td>
        <td><span class="viewer-points-stat-count">${shares.toLocaleString("en-GB")}</span></td>
        <td>${escapeHtml(formatViewerPointsActivityTime(entry.firstActivityAt))}</td>
        <td>${escapeHtml(formatViewerPointsActivityTime(entry.lastActivityAt))}</td>
        <td><span class="viewer-points-role-icons">${roleIcons}</span></td>
        <td>
          <span class="viewer-points-row-actions">
            <button type="button" class="ghost icon-button compact-icon-button" data-viewer-points-edit-notes="${escapeHtml(username)}" title="Edit notes" aria-label="Edit notes for ${escapeHtml(username)}">&#9998;</button>
            <button type="button" class="ghost icon-button compact-icon-button" data-viewer-points-clear-user-points="${escapeHtml(username)}" title="Clear points" aria-label="Clear points for ${escapeHtml(username)}">0</button>
            <button type="button" class="ghost icon-button compact-icon-button danger-icon-button" data-viewer-points-delete-user="${escapeHtml(username)}" title="Delete user" aria-label="Delete ${escapeHtml(username)}">&#128465;</button>
          </span>
        </td>
      </tr>
    `;
  }).join("");
}

function scheduleViewerPointsSave() {
  window.clearTimeout(viewerPointsSaveTimer);
  viewerPointsSaveTimer = window.setTimeout(() => {
    persistSettings({
      viewerPointsSettings: normalizeViewerPointsSettings(state.settings?.viewerPointsSettings),
      viewerPointsLeaderboard: normalizeViewerPointsLeaderboard(state.settings?.viewerPointsLeaderboard)
    }, { render: false }).catch((error) => {
      showToast(error.message || "Unable to save viewer points.", "error");
    });
  }, SAVE_DEBOUNCE_MS);
}

function resolveViewerPointsUserKey(inputValue = "", leaderboard = normalizeViewerPointsLeaderboard(state.settings?.viewerPointsLeaderboard)) {
  const normalizedInput = normalizeUserKey(inputValue);
  if (!normalizedInput) {
    return "";
  }

  if (leaderboard.users[normalizedInput]) {
    return normalizedInput;
  }

  const lowerInput = normalizedInput.toLowerCase();
  const matchingEntry = Object.entries(leaderboard.users).find(([userKey, stats]) => {
    const username = normalizeUserKey(stats?.username ?? userKey);
    const displayName = normalizeUserKey(stats?.displayName ?? "");
    return username === lowerInput || displayName === lowerInput;
  });

  return matchingEntry?.[0] ?? normalizedInput;
}

function saveViewerPointsLeaderboardNow(leaderboard) {
  window.clearTimeout(viewerPointsSaveTimer);
  viewerPointsSaveTimer = null;
  const normalizedLeaderboard = normalizeViewerPointsLeaderboard(leaderboard);
  state.settings = {
    ...state.settings,
    viewerPointsLeaderboard: normalizedLeaderboard
  };

  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  if (nextProfiles[activeProfileId]) {
    nextProfiles[activeProfileId] = {
      ...nextProfiles[activeProfileId],
      settings: normalizeProfileSettingsSnapshot({
        ...nextProfiles[activeProfileId].settings,
        viewerPointsLeaderboard: normalizedLeaderboard
      })
    };
    state.settings.settingsProfiles = nextProfiles;
  }

  renderViewerPointsLeaderboard();
  return persistSettings({
    viewerPointsLeaderboard: normalizedLeaderboard
  }, { render: false });
}

function touchViewerPointsUserActivity(item, timestamp = Date.now()) {
  const userId = normalizeUserKey(item?.user);
  if (!userId) {
    return;
  }

  const leaderboard = normalizeViewerPointsLeaderboard(state.settings?.viewerPointsLeaderboard);
  const profile = state.sessionUserProfiles.get(userId) ?? {};
  const current = leaderboard.users[userId] ?? {
    username: userId,
    displayName: String(item?.nickname ?? profile?.nickname ?? userId).trim() || userId,
    points: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    follows: 0,
    gifts: 0,
    coins: 0,
    subEmote: 0,
    fanEmote: 0,
    lastAwardedAt: 0,
    firstActivityAt: timestamp,
    lastActivityAt: timestamp,
    profilePictureUrl: String(item?.profilePictureUrl ?? profile?.profilePictureUrl ?? "").trim(),
    isSubscriber: false,
    isModerator: false
  };

  leaderboard.users[userId] = {
    ...current,
    username: userId,
    displayName: String(item?.nickname ?? profile?.nickname ?? current.displayName ?? userId).trim() || userId,
    firstActivityAt: Math.max(0, Number(current.firstActivityAt) || timestamp),
    lastActivityAt: Math.max(timestamp, Number(current.lastActivityAt) || 0),
    profilePictureUrl: String(item?.profilePictureUrl ?? profile?.profilePictureUrl ?? current.profilePictureUrl ?? "").trim(),
    isSubscriber: Boolean(item?.isSubscriber) || Boolean(profile?.isSubscriber) || Boolean(current.isSubscriber),
    isModerator: Boolean(item?.isModerator) || Boolean(profile?.isModerator) || Boolean(current.isModerator)
  };

  state.settings = {
    ...state.settings,
    viewerPointsLeaderboard: leaderboard
  };
  renderViewerPointsLeaderboard();
  scheduleViewerPointsSave();
}

async function adjustViewerPointsFromUi(direction = 1) {
  const leaderboard = normalizeViewerPointsLeaderboard(state.settings?.viewerPointsLeaderboard);
  const userId = resolveViewerPointsUserKey(viewerPointsAdjustUsernameInput?.value, leaderboard);
  const amount = Math.max(0, Number(viewerPointsAdjustAmountInput?.value) || 0);
  if (!userId) {
    showToast("Enter a viewer username before adjusting points.", "error");
    viewerPointsAdjustUsernameInput?.focus();
    return;
  }
  if (amount <= 0) {
    showToast("Enter a points amount greater than zero.", "error");
    viewerPointsAdjustAmountInput?.focus();
    return;
  }

  const profile = state.sessionUserProfiles.get(userId) ?? {};
  const existingEntry = leaderboard.users[userId] ?? null;
  if (direction < 0 && !existingEntry) {
    showToast(`No saved points were found for @${normalizeUserKey(viewerPointsAdjustUsernameInput?.value)}.`, "error");
    viewerPointsAdjustUsernameInput?.focus();
    return;
  }

  const current = existingEntry ?? {
    username: userId,
    displayName: String(profile?.nickname ?? userId).trim() || userId,
    points: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    follows: 0,
    gifts: 0,
    coins: 0,
    subEmote: 0,
    fanEmote: 0,
    lastAwardedAt: 0,
    firstActivityAt: Date.now(),
    lastActivityAt: Date.now(),
    profilePictureUrl: String(profile?.profilePictureUrl ?? "").trim(),
    isSubscriber: Boolean(profile?.isSubscriber),
    isModerator: Boolean(profile?.isModerator)
  };
  const delta = amount * (direction < 0 ? -1 : 1);
  const currentPoints = Math.max(0, Number(current.points) || 0);
  if (direction < 0 && currentPoints <= 0) {
    showToast(`@${userId} already has 0 points.`, "info");
    return;
  }
  const actualChange = direction < 0 ? Math.min(amount, currentPoints) : amount;
  const nextPoints = Math.max(0, currentPoints + (actualChange * (direction < 0 ? -1 : 1)));

  leaderboard.users[userId] = {
    ...current,
    username: userId,
    displayName: String(profile?.nickname ?? current.displayName ?? userId).trim() || userId,
    points: nextPoints,
    lastAwardedAt: Date.now(),
    isSubscriber: Boolean(profile?.isSubscriber) || Boolean(current.isSubscriber),
    isModerator: Boolean(profile?.isModerator) || Boolean(current.isModerator)
  };

  await saveViewerPointsLeaderboardNow(leaderboard);
  viewerPointsAdjustAmountInput.value = "";
  showToast(`${direction < 0 ? "Removed" : "Added"} ${actualChange.toLocaleString("en-GB")} points ${direction < 0 ? "from" : "to"} @${userId}. New balance: ${Math.round(nextPoints).toLocaleString("en-GB")}.`, "success");
}

async function setViewerPointsForUser(userInput, nextPointsValue) {
  const leaderboard = normalizeViewerPointsLeaderboard(state.settings?.viewerPointsLeaderboard);
  const userId = resolveViewerPointsUserKey(userInput, leaderboard);
  const nextPoints = Math.max(0, Number(nextPointsValue) || 0);
  if (!userId || !leaderboard.users[userId]) {
    showToast("Unable to find that viewer in the points table.", "error");
    return;
  }

  leaderboard.users[userId] = {
    ...leaderboard.users[userId],
    points: nextPoints,
    lastAwardedAt: Date.now()
  };

  await saveViewerPointsLeaderboardNow(leaderboard);
  showToast(`Set @${userId} to ${Math.round(nextPoints).toLocaleString("en-GB")} points.`, "success");
}

async function clearViewerPointsForUser(userInput) {
  await setViewerPointsForUser(userInput, 0);
}

async function deleteViewerPointsUser(userInput) {
  const leaderboard = normalizeViewerPointsLeaderboard(state.settings?.viewerPointsLeaderboard);
  const userId = resolveViewerPointsUserKey(userInput, leaderboard);
  if (!userId) {
    showToast("Unable to find that viewer.", "error");
    return;
  }

  const displayName = leaderboard.users[userId]?.displayName || state.sessionUserProfiles.get(userId)?.nickname || userId;
  if (!window.confirm(`Delete @${userId} from Users and Points? Their saved points and notes will be removed.`)) {
    return;
  }

  delete leaderboard.users[userId];
  state.sessionUserProfiles.delete(userId);
  const nextNotes = {
    ...normalizeUserNotes(state.settings?.userNotes)
  };
  delete nextNotes[userId];

  state.settings = ensureSettingsShape({
    ...state.settings,
    viewerPointsLeaderboard: leaderboard,
    userNotes: nextNotes
  });
  renderViewerPointsLeaderboard();
  renderChatList();
  await persistSettings({
    viewerPointsLeaderboard: leaderboard,
    userNotes: nextNotes
  }, { render: false });
  showToast(`Deleted ${displayName} from Users and Points.`, "success");
}

function awardViewerPoints(item, pointType, quantity = 1) {
  const userId = normalizeUserKey(item?.user);
  const settings = normalizeViewerPointsSettings(state.settings?.viewerPointsSettings);
  if (!settings.enabled || !userId) {
    return 0;
  }

  const basePoints = Math.max(0, Number(settings?.[pointType]) || 0);
  const safeQuantity = Math.max(0, Number(quantity) || 0);
  if (basePoints <= 0 || safeQuantity <= 0) {
    return 0;
  }

  const profile = state.sessionUserProfiles.get(userId) ?? {};
  const isSubscriber = Boolean(item?.isSubscriber) || Boolean(profile?.isSubscriber);
  const multiplier = isSubscriber ? Math.max(1, Number(settings.subscriberMultiplier) || 1) : 1;
  const awardedPoints = basePoints * safeQuantity * multiplier;
  if (awardedPoints <= 0) {
    return 0;
  }

  const leaderboard = normalizeViewerPointsLeaderboard(state.settings?.viewerPointsLeaderboard);
  const current = leaderboard.users[userId] ?? {
    username: userId,
    displayName: userId,
    points: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    follows: 0,
    gifts: 0,
    coins: 0,
    subEmote: 0,
    fanEmote: 0,
    lastAwardedAt: 0,
    firstActivityAt: Date.now(),
    lastActivityAt: Date.now(),
    profilePictureUrl: String(profile?.profilePictureUrl ?? item?.profilePictureUrl ?? "").trim(),
    isSubscriber: false,
    isModerator: false
  };
  if (pointType === "follow" && Math.max(0, Number(current.follows) || 0) > 0) {
    return 0;
  }
  const metricKey = pointType === "like"
    ? "likes"
    : pointType === "comment"
      ? "comments"
      : pointType === "share"
        ? "shares"
        : pointType === "follow"
          ? "follows"
          : pointType === "gift"
            ? "gifts"
            : pointType === "coin"
              ? "coins"
              : pointType;

  leaderboard.users[userId] = {
    ...current,
    username: userId,
    displayName: String(item?.nickname ?? profile?.nickname ?? current.displayName ?? userId).trim() || userId,
    points: Math.max(0, Number(current.points) || 0) + awardedPoints,
    [metricKey]: Math.max(0, Number(current[metricKey]) || 0) + safeQuantity,
    lastAwardedAt: Date.now(),
    firstActivityAt: Math.max(0, Number(current.firstActivityAt) || Date.now()),
    lastActivityAt: Date.now(),
    profilePictureUrl: String(item?.profilePictureUrl ?? profile?.profilePictureUrl ?? current.profilePictureUrl ?? "").trim(),
    isSubscriber: isSubscriber || Boolean(current.isSubscriber),
    isModerator: Boolean(item?.isModerator) || Boolean(profile?.isModerator) || Boolean(current.isModerator)
  };

  state.settings = {
    ...state.settings,
    viewerPointsLeaderboard: leaderboard
  };
  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  if (nextProfiles[activeProfileId]) {
    nextProfiles[activeProfileId] = {
      ...nextProfiles[activeProfileId],
      settings: normalizeProfileSettingsSnapshot({
        ...nextProfiles[activeProfileId].settings,
        viewerPointsLeaderboard: leaderboard
      })
    };
    state.settings.settingsProfiles = nextProfiles;
  }
  renderViewerPointsLeaderboard();
  scheduleViewerPointsSave();
  return awardedPoints;
}

function incrementViewerStatsAllTime(userId, metric, amount) {
  const normalizedUserId = normalizeUserKey(userId);
  const normalizedMetric = ["likes", "gifts", "comments", "shares", "follows", "coins"].includes(metric) ? metric : null;
  const safeAmount = Math.max(0, Number(amount) || 0);
  if (!normalizedUserId || !normalizedMetric || safeAmount <= 0) {
    return;
  }

  const allTime = normalizeViewerStatsAllTime(state.settings?.viewerStatsAllTime);
  const profile = state.sessionUserProfiles.get(normalizedUserId) ?? {};
  const current = allTime.users[normalizedUserId] ?? {
    username: normalizedUserId,
    displayName: normalizedUserId,
    likes: 0,
    gifts: 0,
    comments: 0,
    shares: 0,
    follows: 0,
    coins: 0
  };

  allTime.users[normalizedUserId] = {
    ...current,
    username: normalizedUserId,
    displayName: String(profile?.nickname ?? current.displayName ?? normalizedUserId).trim() || normalizedUserId,
    [normalizedMetric]: Math.max(0, Number(current[normalizedMetric] ?? 0) || 0) + safeAmount
  };

  state.settings = {
    ...state.settings,
    viewerStatsAllTime: allTime
  };
  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  if (nextProfiles[activeProfileId]) {
    nextProfiles[activeProfileId] = {
      ...nextProfiles[activeProfileId],
      settings: normalizeProfileSettingsSnapshot({
        ...nextProfiles[activeProfileId].settings,
        viewerStatsAllTime: allTime
      })
    };
    state.settings.settingsProfiles = nextProfiles;
  }
  scheduleViewerStatsAllTimeSave();
}

function incrementUserMetric(metric, userId, amount) {
  const normalizedMetric = ["follows", "likes", "comments", "shares", "coins", "subEmote", "fanEmote", "join", "firstActivity"].includes(metric) ? metric : null;
  const normalizedUserId = normalizeUserKey(userId);
  const safeAmount = Number(amount) || 0;

  if (!normalizedMetric || !normalizedUserId || safeAmount <= 0) {
    return;
  }

  const metricMap = state.sessionUserMetrics[normalizedMetric];
  const currentValue = metricMap.get(normalizedUserId) ?? 0;
  metricMap.set(normalizedUserId, currentValue + safeAmount);

  incrementViewerStatsAllTime(normalizedUserId, normalizedMetric, safeAmount);
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

  incrementViewerStatsAllTime(normalizedUserId, "gifts", safeAmount);
}

function getUserGiftSentCountForName(userId, giftName) {
  const normalizedUserId = normalizeUserKey(userId);
  const requiredGiftKey = normalizeGiftKey(giftName);
  if (!normalizedUserId || !requiredGiftKey) {
    return 0;
  }

  const userGiftMap = state.sessionGiftMetrics.byUser.get(normalizedUserId);
  if (!userGiftMap) {
    return 0;
  }

  const exactCount = Number(userGiftMap.get(requiredGiftKey) ?? 0);
  if (exactCount > 0) {
    return exactCount;
  }

  for (const [giftKey, count] of userGiftMap.entries()) {
    if (normalizeGiftKey(giftKey) === requiredGiftKey) {
      return Number(count) || 0;
    }
  }

  return 0;
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
  const activityAt = Date.now();

  const existing = state.sessionUserProfiles.get(userId) ?? {
    user: userId,
    nickname: item?.nickname ?? userId,
    profilePictureUrl: "",
    isSubscriber: false,
    isModerator: false,
    followedThisSession: false,
    firstActivityAt: activityAt,
    lastActivityAt: activityAt
  };

  const nextProfile = {
    ...existing,
    nickname: item?.nickname ?? existing.nickname ?? userId,
    profilePictureUrl: String(item?.profilePictureUrl || existing.profilePictureUrl || "").trim(),
    isSubscriber: Boolean(item?.isSubscriber) || existing.isSubscriber,
    isModerator: Boolean(item?.isModerator) || existing.isModerator,
    followedThisSession: existing.followedThisSession || item?.type === "follow",
    firstActivityAt: Math.max(0, Number(existing.firstActivityAt) || activityAt),
    lastActivityAt: activityAt
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
  for (const key of Array.from(state.customRuleCooldownNoticeAt.keys())) {
    if (key.startsWith(`${ruleId}:`)) {
      state.customRuleCooldownNoticeAt.delete(key);
    }
  }

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
  const userKey = getRuleCooldownUserKey(item);
  return getRuleUserCooldownRemainingSeconds(rule, userKey) > 0;
}

function getRuleUserCooldownRemainingSeconds(rule, userKey) {
  const cooldownSeconds = Math.max(0, Number(rule?.userCooldownSeconds) || 0);
  if (cooldownSeconds <= 0 || !userKey) {
    return 0;
  }
  const expiresAt = getRuleUserCooldownExpiry(rule.id, userKey);
  if (expiresAt <= Date.now()) {
    const ruleCooldowns = state.customRuleUserCooldowns.get(rule.id);
    ruleCooldowns?.delete(userKey);
    return 0;
  }
  return Math.max(1, Math.ceil((expiresAt - Date.now()) / 1000));
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

function notifyRuleUserCooldown(rule, item, remainingSeconds) {
  const userKey = getRuleCooldownUserKey(item);
  if (!userKey || remainingSeconds <= 0) {
    return;
  }

  const noticeKey = `${rule.id}:${userKey}`;
  const now = Date.now();
  const lastNoticeAt = Number(state.customRuleCooldownNoticeAt.get(noticeKey) ?? 0) || 0;
  if (now - lastNoticeAt < 2000) {
    return;
  }

  state.customRuleCooldownNoticeAt.set(noticeKey, now);
  const displayName = item?.nickname || item?.displayName || item?.user || userKey;
  const message = `@${displayName}, "${rule.name}" is on cooldown for ${remainingSeconds} more second${remainingSeconds === 1 ? "" : "s"}.`;
  addLocalSystemChatMessage(message);
  showToast(message, "info");
  showHostedFeedbackOverlay({
    title: "Cooldown active",
    message,
    commandType: String(rule?.name ?? "Custom action").trim(),
    username: `@${userKey}`,
    accentColor: normalizeOverlayAccentColor(rule?.feedbackOverlayAccentColor || "#ffbf5e"),
    sourceType: "custom-action-cooldown"
  });
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
    case "birthday":
      return isUserBirthdayToday(userKey);
    case "everyone":
    default:
      return true;
  }
}

function hasCustomActionFeedbackOverlay(rule) {
  return Boolean(rule?.feedbackOverlayEnabled && String(rule?.feedbackOverlayMessage ?? "").trim());
}

function getCustomActionOverlayTokenReplacements(rule, sourceItem = null) {
  const userKey = getRuleCooldownUserKey(sourceItem);
  const remainingSeconds = getRuleUserCooldownRemainingSeconds(rule, userKey);
  const cooldownSeconds = remainingSeconds || Math.max(0, Number(rule?.userCooldownSeconds) || 0);
  const userTotalLikes = userKey
    ? Math.max(0, Number(state.sessionUserMetrics?.likes?.get(userKey) ?? 0) || 0)
    : 0;
  return {
    username: sourceItem?.user ? `@${sourceItem.user}` : "",
    "gift sent": String(sourceItem?.giftName ?? "").trim(),
    "user total likes": String(userTotalLikes),
    "cool down time": `${cooldownSeconds} second${cooldownSeconds === 1 ? "" : "s"}`,
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

function getTtsModerationSettings() {
  state.settings.ttsModeration = normalizeTtsModerationSettings(state.settings?.ttsModeration);
  return state.settings.ttsModeration;
}

function parseTtsModerationList(value, { users = false } = {}) {
  return Array.from(new Set(
    String(value ?? "")
      .split(/[\n,]+/)
      .map((entry) => users ? normalizeUserKey(entry) : String(entry ?? "").trim().toLowerCase())
      .filter(Boolean)
  )).slice(0, 500);
}

function formatTtsModerationList(entries = [], { userPrefix = false } = {}) {
  return (Array.isArray(entries) ? entries : [])
    .map((entry) => String(entry ?? "").trim())
    .filter(Boolean)
    .map((entry) => userPrefix ? `@${entry.replace(/^@/, "")}` : entry)
    .join("\n");
}

function collectTtsModerationSettingsFromUi(source = state.settings?.ttsModeration) {
  const base = normalizeTtsModerationSettings(source);
  const filters = { ...base.filters };
  for (const [key, input] of Object.entries(ttsModerationFilterInputs)) {
    if (input) {
      filters[key] = Boolean(input.checked);
    }
  }

  return normalizeTtsModerationSettings({
    ...base,
    mutedUsers: ttsMutedUsersInput ? parseTtsModerationList(ttsMutedUsersInput.value, { users: true }) : base.mutedUsers,
    shadowMutedUsers: ttsShadowMutedUsersInput ? parseTtsModerationList(ttsShadowMutedUsersInput.value, { users: true }) : base.shadowMutedUsers,
    blockedWords: ttsBlockedWordsInput ? parseTtsModerationList(ttsBlockedWordsInput.value) : base.blockedWords,
    slowModeSeconds: ttsSlowModeSecondsInput ? Number(ttsSlowModeSecondsInput.value) || 0 : base.slowModeSeconds,
    userCooldownSeconds: ttsCooldownSecondsInput ? Number(ttsCooldownSecondsInput.value) || 0 : base.userCooldownSeconds,
    filters
  });
}

function isTtsModerationInputElement(element) {
  return Boolean(
    element &&
    (
      element === ttsMutedUsersInput ||
      element === ttsShadowMutedUsersInput ||
      element === ttsBlockedWordsInput ||
      element === ttsSlowModeSecondsInput ||
      element === ttsCooldownSecondsInput ||
      Object.values(ttsModerationFilterInputs).includes(element)
    )
  );
}

function isEditingTtsModerationSettings() {
  return isTtsModerationInputElement(document.activeElement);
}

function renderTtsModerationSettings() {
  if (isEditingTtsModerationSettings() && !state.forceTtsModerationRender) {
    return;
  }

  state.forceTtsModerationRender = false;
  const moderation = getTtsModerationSettings();
  if (ttsQueuePausedInput) {
    ttsQueuePausedInput.checked = Boolean(state.ttsQueuePaused);
  }
  if (ttsSlowModeSecondsInput) {
    ttsSlowModeSecondsInput.value = String(moderation.slowModeSeconds);
  }
  if (ttsCooldownSecondsInput) {
    ttsCooldownSecondsInput.value = String(moderation.userCooldownSeconds);
  }
  if (ttsMutedUsersInput) {
    ttsMutedUsersInput.value = formatTtsModerationList(moderation.mutedUsers, { userPrefix: true });
  }
  if (ttsShadowMutedUsersInput) {
    ttsShadowMutedUsersInput.value = formatTtsModerationList(moderation.shadowMutedUsers, { userPrefix: true });
  }
  if (ttsBlockedWordsInput) {
    ttsBlockedWordsInput.value = formatTtsModerationList(moderation.blockedWords);
  }
  if (ttsActiveTimeoutsInput) {
    const now = Date.now();
    const timeoutRows = Object.entries(moderation.timedOutUsers)
      .filter(([, expiresAt]) => Number(expiresAt) > now)
      .map(([userKey, expiresAt]) => {
        const secondsLeft = Math.max(0, Math.ceil((Number(expiresAt) - now) / 1000));
        return `@${userKey} - ${secondsLeft}s left`;
      });
    ttsActiveTimeoutsInput.value = timeoutRows.join("\n");
  }
  for (const [key, input] of Object.entries(ttsModerationFilterInputs)) {
    if (input) {
      input.checked = moderation.filters?.[key] !== false;
    }
  }
}

async function persistTtsModerationFromUi() {
  const ttsModeration = collectTtsModerationSettingsFromUi();
  state.settings.ttsModeration = ttsModeration;
  await persistSettings({ ttsModeration });
  renderTtsModerationSettings();
}

function isTtsModerationFilterEnabled(key) {
  return getTtsModerationSettings().filters?.[key] !== false;
}

function parseDurationToMs(value) {
  const match = String(value ?? "").trim().match(/^(\d+)(s|m|h)?$/i);
  if (!match) {
    return 0;
  }
  const amount = Math.max(0, Number(match[1]) || 0);
  const unit = String(match[2] || "s").toLowerCase();
  if (unit === "h") {
    return amount * 60 * 60 * 1000;
  }
  if (unit === "m") {
    return amount * 60 * 1000;
  }
  return amount * 1000;
}

function normalizeModerationText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ")
    .toLowerCase()
    .replace(/[4@]/g, "a")
    .replace(/[3€]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/[0]/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/ph/g, "f")
    .replace(/(.)\1{2,}/g, "$1$1")
    .replace(/[^a-z0-9\s]/g, "");
}

function hasExcessiveEmoji(value) {
  const emojiMatches = String(value ?? "").match(/[\u{1F300}-\u{1FAFF}]/gu) ?? [];
  return emojiMatches.length >= 8;
}

function getTtsModerationBlockReason(item) {
  const moderation = getTtsModerationSettings();
  const userKey = normalizeUserKey(item?.user);
  const rawMessage = String(item?.message ?? item?.text ?? "");
  const normalizedMessage = normalizeModerationText(rawMessage);
  const compactMessage = normalizedMessage.replace(/\s+/g, "");
  const now = Date.now();

  if (userKey && moderation.shadowMutedUsers.includes(userKey)) {
    return { blocked: true, silent: true, reason: "shadow muted user" };
  }
  if (userKey && moderation.mutedUsers.includes(userKey)) {
    return { blocked: true, silent: false, reason: "muted user" };
  }
  if (userKey && Number(moderation.timedOutUsers[userKey] ?? 0) > now) {
    return { blocked: true, silent: false, reason: "timed out user" };
  }
  if (moderation.slowModeSeconds > 0 && now - state.ttsLastQueuedAt < moderation.slowModeSeconds * 1000) {
    return { blocked: true, silent: true, reason: "slow mode" };
  }
  if (userKey && moderation.userCooldownSeconds > 0) {
    const lastUserQueuedAt = Number(state.ttsLastUserQueuedAt.get(userKey) ?? 0);
    if (now - lastUserQueuedAt < moderation.userCooldownSeconds * 1000) {
      return { blocked: true, silent: true, reason: "user cooldown" };
    }
  }

  const blockedWords = moderation.blockedWords.map(normalizeModerationText).filter(Boolean);
  if (isTtsModerationFilterEnabled("blockedWords") && blockedWords.some((word) => normalizedMessage.includes(word) || compactMessage.includes(word.replace(/\s+/g, "")))) {
    return { blocked: true, silent: false, reason: "blocked word" };
  }

  const suspiciousPatterns = [
    { pattern: /(.)\1{8,}/i, reason: "repeated characters", filter: "repeatedCharacters" },
    { pattern: /\b(\w+)(\s+\1){4,}\b/i, reason: "repeated words", filter: "repeatedWords" },
    { pattern: /https?:\/\/|www\.|discord\.gg|\.com\b|\.co\.uk\b/i, reason: "URL", filter: "urls" },
    { pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/, reason: "IP address", filter: "privateInfo" },
    { pattern: /\b(?:address|postcode|zip code|phone number|read my ip|streamer address)\b/i, reason: "private info request", filter: "privateInfo" },
    { pattern: /\b(?:fake donation|donated|gifted you|sent you)\b/i, reason: "fake donation message", filter: "fakeDonation" },
    { pattern: /\b(?:pretend to be|say bomb|police|dangerous instructions)\b/i, reason: "unsafe instruction", filter: "unsafeInstructions" },
    { pattern: /[\u202A-\u202E\u2066-\u2069]/, reason: "unicode control characters", filter: "unicodeAbuse" }
  ];
  const patternMatch = suspiciousPatterns.find((entry) => isTtsModerationFilterEnabled(entry.filter) && entry.pattern.test(rawMessage));
  if (patternMatch) {
    return { blocked: true, silent: false, reason: patternMatch.reason };
  }

  if (isTtsModerationFilterEnabled("obfuscatedBypass")) {
    const normalizedPatterns = [
      { pattern: /f+a+g+o*t+/, reason: "slur bypass" },
      { pattern: /n+i+g+e*r+|n+i+g+a+/, reason: "slur bypass" },
      { pattern: /s+e+x+/, reason: "sexual content bypass" },
      { pattern: /f+u*c+k+|p+h*u+c+k+/, reason: "profanity bypass" },
      { pattern: /m+o+a+n+/, reason: "moaning spam" }
    ];
    const normalizedMatch = normalizedPatterns.find((entry) => entry.pattern.test(compactMessage));
    if (normalizedMatch) {
      return { blocked: true, silent: false, reason: normalizedMatch.reason };
    }
  }

  const lettersOnly = rawMessage.replace(/[^A-Za-z]/g, "");
  if (isTtsModerationFilterEnabled("excessiveCaps") && lettersOnly.length >= 12) {
    const uppercaseCount = (lettersOnly.match(/[A-Z]/g) ?? []).length;
    if (uppercaseCount / lettersOnly.length > 0.8) {
      return { blocked: true, silent: false, reason: "excessive caps" };
    }
  }
  if (isTtsModerationFilterEnabled("excessiveEmojis") && hasExcessiveEmoji(rawMessage)) {
    return { blocked: true, silent: false, reason: "excessive emojis" };
  }

  return { blocked: false, silent: false, reason: "" };
}

function markTtsQueuedForUser(item) {
  const userKey = normalizeUserKey(item?.user);
  const now = Date.now();
  state.ttsLastQueuedAt = now;
  if (userKey) {
    state.ttsLastUserQueuedAt.set(userKey, now);
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

  const moderationResult = getTtsModerationBlockReason(item);
  if (moderationResult.blocked) {
    if (!moderationResult.silent) {
      showToast(`TTS blocked for @${item.user}: ${moderationResult.reason}.`, "info");
    }
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

function formatTextForSpokenPunctuation(text = "") {
  return String(text ?? "")
    .replace(/\r\n|\r|\n/g, " new line ")
    .replace(/\.{3}/g, " ellipsis ")
    .replace(/…/g, " ellipsis ")
    .replace(/!/g, " exclamation mark ")
    .replace(/\?/g, " question mark ")
    .replace(/;/g, " semicolon ")
    .replace(/:/g, " colon ")
    .replace(/,/g, " comma ")
    .replace(/\./g, " full stop ")
    .replace(/"/g, " quote ")
    .replace(/'/g, " apostrophe ")
    .replace(/\(/g, " open bracket ")
    .replace(/\)/g, " close bracket ")
    .replace(/\[/g, " open square bracket ")
    .replace(/\]/g, " close square bracket ")
    .replace(/-/g, " dash ")
    .replace(/\//g, " slash ")
    .replace(/\\/g, " backslash ")
    .replace(/&/g, " and sign ")
    .replace(/@/g, " at sign ")
    .replace(/#/g, " hashtag ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTtsMessageBodyForSpeech(text = "") {
  const body = String(text ?? "").trim();
  if (!ttsReadPunctuationInput?.checked) {
    return body;
  }
  return formatTextForSpokenPunctuation(body);
}

function buildSpeechText(item) {
  if (item.type === "gift") {
    const giftMessage = getTtsMessageBodyForSpeech(item.message);
    if (ttsIncludeUsernameInput.checked) {
      return `${item.nickname} ${giftMessage}`;
    }
    return giftMessage;
  }

  const body = getTtsMessageBodyForSpeech(item.translatedText || item.message);
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

function isKnownModeratorUser(userKey) {
  const normalizedUser = normalizeUserKey(userKey);
  if (!normalizedUser) {
    return false;
  }

  return Boolean(state.sessionUserProfiles.get(normalizedUser)?.isModerator);
}

function renderTtsModeratorLog() {
  if (!ttsModLogList) {
    return;
  }

  if (!state.ttsModeratorLog.length) {
    ttsModLogList.innerHTML = `<p class="helper-text">Moderator TTS commands will appear here.</p>`;
    return;
  }

  ttsModLogList.innerHTML = state.ttsModeratorLog
    .slice(0, 50)
    .map((entry) => {
      const level = entry.status === "denied" ? "denied" : "success";
      return `
        <article class="tts-mod-log-entry ${level}">
          <time>${escapeHtml(formatTimestamp(entry.timestamp))}</time>
          <strong>${escapeHtml(entry.summary)}</strong>
          <small>${escapeHtml(entry.command)} by @${escapeHtml(entry.moderator)}${entry.target ? ` targeting @${escapeHtml(entry.target)}` : ""}</small>
        </article>
      `;
    })
    .join("");
}

function logTtsModeratorCommand({ moderator, command, target = "", summary, status = "success" }) {
  state.ttsModeratorLog.unshift({
    id: `tts-mod-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    moderator: normalizeUserKey(moderator) || "unknown",
    command: String(command ?? "").trim(),
    target: normalizeUserKey(target),
    summary: String(summary ?? "").trim() || "Moderator command used.",
    status
  });

  state.ttsModeratorLog = state.ttsModeratorLog.slice(0, 100);
  renderTtsModeratorLog();
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

function parseViewerBirthdayCommandValue(value = "") {
  const match = String(value ?? "").trim().match(/^(\d{1,2})\/(\d{1,2})$/);
  if (!match) {
    return "";
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const parsedDate = new Date(2000, month - 1, day);
  if (
    parsedDate.getFullYear() !== 2000 ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return "";
  }

  return `2000-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

async function handleMyBirthdayCommand(item) {
  if (item.type !== "chat") {
    return false;
  }

  const messageText = String(item.message ?? item.text ?? "").trim();
  const match = messageText.match(/^!mybday\s+(\d{1,2}\/\d{1,2})\s*$/i);
  if (!match) {
    if (/^!mybday\b/i.test(messageText)) {
      showToast(`@${item.user || "viewer"} used !mybday with an invalid date. Use !mybday dd/mm.`, "error");
      return true;
    }
    return false;
  }

  const userKey = normalizeUserKey(item.user || item.uniqueId || item.username || item.nickname);
  if (!userKey || userKey === "unknown") {
    showToast("A viewer tried to save a birthday, but their TikTok username was not available.", "error");
    return true;
  }

  const noteRecord = getUserNoteRecord(userKey);
  if (noteRecord.birthday) {
    showToast(`@${userKey} already has a birthday saved and cannot update it from chat.`, "info");
    addLocalSystemChatMessage(`@${userKey}, your birthday is already saved. Ask the streamer to edit it if it needs changing.`);
    return true;
  }

  const birthday = parseViewerBirthdayCommandValue(match[1]);
  if (!birthday) {
    showToast(`@${userKey} used an invalid birthday date. Use !mybday dd/mm.`, "error");
    return true;
  }

  const commandUserItem = {
    ...item,
    user: userKey,
    nickname: item.nickname || item.displayName || item.username || userKey
  };
  updateSessionUserProfile(commandUserItem);
  touchViewerPointsUserActivity(commandUserItem, Date.now());

  const nextNotes = {
    ...normalizeUserNotes(state.settings?.userNotes),
    [userKey]: {
      ...noteRecord,
      birthday
    }
  };

  await saveUserNotesNow(nextNotes);
  const [, month, day] = birthday.split("-");
  showToast(`Saved birthday for @${userKey}: ${day}/${month}.`, "success");
  addLocalSystemChatMessage(`@${userKey}, your birthday has been saved as ${day}/${month}.`);
  return true;
}

async function handleModeratorTtsCommand(item) {
  if (item.type !== "chat") {
    return false;
  }

  const messageText = String(item.message ?? item.text ?? "").trim();
  const normalizedMessage = messageText.toLowerCase().replace(/\s+/g, " ");
  if (!/^!(?:tts|pause\s+tts|resume\s+tts|clear\s+tts|skip\s+tts|lock\s+tts|unlock\s+tts|mute\b|unmute\b|banword\b|allowword\b|shadowmute\b|timeout\b|slowmode\b|cooldown\b)/i.test(messageText)) {
    return false;
  }

  if (!item.isModerator) {
    showToast(`@${item.user} tried to use a moderator TTS command.`, "info");
    logTtsModeratorCommand({
      moderator: item.user,
      command: messageText,
      summary: "Denied because user is not a moderator.",
      status: "denied"
    });
    return true;
  }

  const moderatorUserKey = normalizeUserKey(item.user);
  const moderation = getTtsModerationSettings();
  const saveModeration = async () => {
    state.settings.ttsModeration = normalizeTtsModerationSettings(moderation);
    await persistSettings({ ttsModeration: state.settings.ttsModeration });
    renderTtsModerationSettings();
  };
  const getCommandValue = (pattern) => String(messageText.match(pattern)?.[1] ?? "").trim();
  const respond = (message, level = "success") => {
    addLocalSystemChatMessage(message);
    showToast(message, level);
  };
  const audit = (summary, { target = "", status = "success" } = {}) => {
    logTtsModeratorCommand({
      moderator: moderatorUserKey,
      command: messageText,
      target,
      summary,
      status
    });
  };
  const denyModeratorTarget = (targetUserKey, actionLabel) => {
    if (!isKnownModeratorUser(targetUserKey)) {
      return false;
    }
    const message = `Denied: @${moderatorUserKey} cannot ${actionLabel} moderator @${targetUserKey}.`;
    audit(message, { target: targetUserKey, status: "denied" });
    respond(message, "error");
    return true;
  };

  if (normalizedMessage === "!tts on") {
    ttsEnabledInput.checked = true;
    await persistSettings({ ttsEnabled: true });
    updateTtsStatus();
    audit("Enabled TTS.");
    respond("TTS enabled by moderator command.");
    return true;
  }
  if (normalizedMessage === "!tts off") {
    ttsEnabledInput.checked = false;
    await persistSettings({ ttsEnabled: false });
    clearAllQueuedPlaybackItems(["tts"]);
    updateTtsStatus();
    audit("Disabled TTS and cleared the queue.");
    respond("TTS disabled and queue cleared by moderator command.");
    return true;
  }
  if (normalizedMessage === "!pause tts") {
    state.ttsQueuePaused = true;
    updateTtsStatus();
    renderTtsModerationSettings();
    audit("Paused the TTS queue.");
    respond("TTS queue paused.");
    return true;
  }
  if (normalizedMessage === "!resume tts") {
    state.ttsQueuePaused = false;
    resumePausedTtsQueues();
    updateTtsStatus();
    renderTtsModerationSettings();
    audit("Resumed the TTS queue.");
    respond("TTS queue resumed.");
    return true;
  }
  if (normalizedMessage === "!clear tts") {
    clearAllQueuedPlaybackItems(["tts"]);
    audit("Cleared the TTS queue.");
    respond("TTS queue cleared.");
    return true;
  }
  if (normalizedMessage === "!skip tts") {
    const runningItemId = findRunningTtsQueueItemId();
    if (runningItemId) {
      clearQueuedPlaybackItem(runningItemId);
      audit("Skipped the current TTS message.");
      respond("Skipped current TTS message.");
    } else {
      audit("Tried to skip TTS, but nothing was playing.", { status: "denied" });
      respond("No TTS message is currently playing.", "info");
    }
    return true;
  }
  if (normalizedMessage === "!lock tts") {
    ttsAudienceAllInput.checked = false;
    ttsAudienceSubscribersInput.checked = true;
    ttsAudienceModeratorsInput.checked = true;
    await persistSettings({
      ttsAudience: {
        allViewers: false,
        subscribers: true,
        moderators: true
      }
    });
    updateTtsStatus();
    renderTtsModerationSettings();
    audit("Locked TTS to subscribers and moderators.");
    respond("TTS locked to subscribers and moderators.");
    return true;
  }
  if (normalizedMessage === "!unlock tts") {
    ttsAudienceAllInput.checked = true;
    ttsAudienceSubscribersInput.checked = false;
    ttsAudienceModeratorsInput.checked = false;
    await persistSettings({
      ttsAudience: {
        allViewers: true,
        subscribers: false,
        moderators: false
      }
    });
    updateTtsStatus();
    renderTtsModerationSettings();
    audit("Unlocked TTS for everyone.");
    respond("TTS unlocked for everyone.");
    return true;
  }

  const muteUser = getCommandValue(/^!mute\s+@?([^\s]+)$/i);
  if (muteUser) {
    const userKey = normalizeUserKey(muteUser);
    if (!userKey) {
      audit("Tried to mute an invalid username.", { status: "denied" });
      respond("Invalid mute command. Use !mute @user.", "error");
      return true;
    }
    if (denyModeratorTarget(userKey, "mute")) {
      return true;
    }
    moderation.mutedUsers = Array.from(new Set([...moderation.mutedUsers, userKey]));
    await saveModeration();
    audit(`Muted TTS for @${userKey}.`, { target: userKey });
    respond(`TTS muted for @${userKey}.`);
    return true;
  }
  const unmuteUser = getCommandValue(/^!unmute\s+@?([^\s]+)$/i);
  if (unmuteUser) {
    const userKey = normalizeUserKey(unmuteUser);
    if (!userKey) {
      audit("Tried to unmute an invalid username.", { status: "denied" });
      respond("Invalid unmute command. Use !unmute @user.", "error");
      return true;
    }
    moderation.mutedUsers = moderation.mutedUsers.filter((user) => user !== userKey);
    moderation.shadowMutedUsers = moderation.shadowMutedUsers.filter((user) => user !== userKey);
    delete moderation.timedOutUsers[userKey];
    await saveModeration();
    audit(`Restored TTS for @${userKey}.`, { target: userKey });
    respond(`TTS restored for @${userKey}.`);
    return true;
  }
  const shadowMuteUser = getCommandValue(/^!shadowmute\s+@?([^\s]+)$/i);
  if (shadowMuteUser) {
    const userKey = normalizeUserKey(shadowMuteUser);
    if (!userKey) {
      audit("Tried to shadow mute an invalid username.", { status: "denied" });
      respond("Invalid shadow mute command. Use !shadowmute @user.", "error");
      return true;
    }
    if (denyModeratorTarget(userKey, "shadow mute")) {
      return true;
    }
    moderation.shadowMutedUsers = Array.from(new Set([...moderation.shadowMutedUsers, userKey]));
    await saveModeration();
    audit(`Shadow muted @${userKey}.`, { target: userKey });
    respond(`Shadow mute enabled for @${userKey}.`);
    return true;
  }
  const timeoutMatch = messageText.match(/^!timeout\s+@?([^\s]+)\s+(\d+[smh]?)$/i);
  if (timeoutMatch) {
    const userKey = normalizeUserKey(timeoutMatch[1]);
    const durationMs = parseDurationToMs(timeoutMatch[2]);
    if (!userKey || durationMs <= 0) {
      audit("Tried to set an invalid TTS timeout.", { status: "denied" });
      respond("Invalid timeout command. Use !timeout @user 10m.", "error");
      return true;
    }
    if (denyModeratorTarget(userKey, "timeout")) {
      return true;
    }
    moderation.timedOutUsers[userKey] = Date.now() + durationMs;
    await saveModeration();
    audit(`Timed out TTS for @${userKey}.`, { target: userKey });
    respond(`TTS timeout set for @${userKey}.`);
    return true;
  }
  const bannedWord = getCommandValue(/^!banword\s+(.+)$/i);
  if (bannedWord) {
    const word = bannedWord.toLowerCase();
    moderation.blockedWords = Array.from(new Set([...moderation.blockedWords, word]));
    await saveModeration();
    audit(`Added blocked TTS word: ${word}.`);
    respond(`Blocked TTS word added: ${word}.`);
    return true;
  }
  const allowedWord = getCommandValue(/^!allowword\s+(.+)$/i);
  if (allowedWord) {
    const word = allowedWord.toLowerCase();
    moderation.blockedWords = moderation.blockedWords.filter((entry) => entry !== word);
    await saveModeration();
    audit(`Removed blocked TTS word: ${word}.`);
    respond(`Blocked TTS word removed: ${word}.`);
    return true;
  }
  const slowModeMatch = messageText.match(/^!slowmode\s+(\d+)$/i);
  if (slowModeMatch) {
    const slowModeSeconds = Number(slowModeMatch[1]);
    moderation.slowModeSeconds = slowModeSeconds;
    await saveModeration();
    audit(`Set TTS slow mode to ${slowModeSeconds} seconds.`);
    respond(`TTS slow mode set to ${slowModeSeconds} seconds.`);
    return true;
  }
  const cooldownMatch = messageText.match(/^!cooldown\s+(\d+)$/i);
  if (cooldownMatch) {
    const cooldownSeconds = Number(cooldownMatch[1]);
    moderation.userCooldownSeconds = cooldownSeconds;
    await saveModeration();
    audit(`Set user TTS cooldown to ${cooldownSeconds} seconds.`);
    respond(`User TTS cooldown set to ${cooldownSeconds} seconds.`);
    return true;
  }

  audit("Tried to use an unknown TTS moderation command.", { status: "denied" });
  respond("Unknown TTS moderation command.", "error");
  return true;
}

function getResolvedTtsVoiceSelection(item = null) {
  const providerKey = getCurrentTtsProviderKey();
  const userKey = normalizeUserKey(item?.user);
  const availableEntries = getUnlockedTtsVoiceEntriesForUser(userKey);
  const availableByValue = new Map(availableEntries.map((entry) => [entry.value, entry]));
  const lockedVoice = userKey ? state.sessionTtsVoiceLocksByUser.get(userKey) : null;
  if (lockedVoice && availableByValue.has(lockedVoice.voiceValue)) {
    const lockedEntry = availableByValue.get(lockedVoice.voiceValue);
    return {
      value: lockedEntry.value,
      label: lockedEntry.baseLabel,
      random: false,
      assigned: true,
      locked: true,
      providerKey: lockedEntry.providerKey
    };
  }

  const assignedVoiceValue = item?.user ? getUserAssignedTtsVoice(item.user) : "";

  if (assignedVoiceValue && availableByValue.has(assignedVoiceValue)) {
    const assignedEntry = availableByValue.get(assignedVoiceValue);
    return {
      value: assignedEntry.value,
      label: assignedEntry.baseLabel,
      random: false,
      assigned: true,
      providerKey: assignedEntry.providerKey
    };
  }

  if (ttsRandomVoiceInput.checked && availableEntries.length > 0) {
    const randomEntry = availableEntries[Math.floor(Math.random() * availableEntries.length)];
    return {
      value: randomEntry.value,
      label: randomEntry.baseLabel,
      random: true,
      assigned: false,
      providerKey: randomEntry.providerKey
    };
  }

  const selectedValue = String(ttsVoiceSelect.value ?? "").trim();
  if (selectedValue && availableByValue.has(selectedValue)) {
    const selectedEntry = availableByValue.get(selectedValue);
    return {
      value: selectedEntry.value,
      label: selectedEntry.baseLabel,
      random: false,
      assigned: false,
      providerKey: selectedEntry.providerKey
    };
  }

  const fallbackEntry = availableEntries[0] ?? null;
  return {
    value: fallbackEntry?.value ?? "",
    label: fallbackEntry?.baseLabel ?? "No unlocked voice available",
    random: false,
    assigned: false,
    providerKey: fallbackEntry?.providerKey ?? getCurrentTtsProviderKey()
  };
}

function getSelectedTtsVoiceSelection() {
  const providerKey = getCurrentTtsProviderKey();
  const availableEntries = getAvailableTtsVoiceEntries();
  const selectedValue = String(ttsVoiceSelect.value ?? "").trim();
  const selectedEntry = availableEntries.find((entry) => entry.value === selectedValue) ?? availableEntries[0] ?? null;
  return {
    value: selectedEntry?.value ?? selectedValue,
    label: selectedEntry?.baseLabel ?? voiceLabelFromSelect(),
    random: false,
    assigned: false,
    providerKey: selectedEntry?.providerKey ?? providerKey
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

function getSelectedXttsVoice(voiceId = "") {
  const selectedVoiceId = String(voiceId || ttsVoiceSelect?.value || "").trim().replace(/^xtts:/, "");
  return normalizeXttsVoices(state.settings?.ttsXttsVoices).find((voice) => voice.id === selectedVoiceId) ?? null;
}

function updateXttsTuningLabels() {
  if (ttsXttsStrengthValue) {
    ttsXttsStrengthValue.textContent = `${Math.round(Number(ttsXttsStrengthInput?.value ?? 0.75) * 100)}%`;
  }
  if (ttsXttsEchoValue) {
    ttsXttsEchoValue.textContent = `${Math.round(Number(ttsXttsEchoInput?.value ?? 0) * 100)}%`;
  }
  if (ttsXttsReverbValue) {
    ttsXttsReverbValue.textContent = `${Math.round(Number(ttsXttsReverbInput?.value ?? 0) * 100)}%`;
  }
  if (ttsXttsRoboticValue) {
    ttsXttsRoboticValue.textContent = `${Math.round(Number(ttsXttsRoboticInput?.value ?? 0) * 100)}%`;
  }
  if (ttsXttsRateValue) {
    ttsXttsRateValue.textContent = `${Number(ttsXttsRateInput?.value ?? 1).toFixed(1)}x`;
  }
  if (ttsXttsPitchValue) {
    ttsXttsPitchValue.textContent = `${Number(ttsXttsPitchInput?.value ?? 1).toFixed(1)}x`;
  }
}

function renderXttsVoiceTuning() {
  if (!ttsXttsVoiceTuning) {
    return;
  }

  const selectedVoice = getSelectedXttsVoice();
  const hasSelectedXttsVoice = Boolean(selectedVoice);
  [ttsXttsStrengthInput, ttsXttsEchoInput, ttsXttsReverbInput, ttsXttsRoboticInput, ttsXttsRateInput, ttsXttsPitchInput, ttsXttsRenameInput, ttsXttsSaveTuningButton, ttsXttsResetTuningButton, ttsXttsRenameVoiceButton, ttsXttsDeleteTuningVoiceButton].forEach((element) => {
    if (element) {
      element.disabled = !hasSelectedXttsVoice;
    }
  });

  if (selectedVoice) {
    const tuning = normalizeXttsVoiceTuning(selectedVoice.tuning);
    ttsXttsStrengthInput.value = String(tuning.strength);
    ttsXttsEchoInput.value = String(tuning.echo);
    ttsXttsReverbInput.value = String(tuning.reverb);
    ttsXttsRoboticInput.value = String(tuning.robotic);
    ttsXttsRateInput.value = String(tuning.rate);
    ttsXttsPitchInput.value = String(tuning.pitch);
    if (ttsXttsRenameInput) {
      ttsXttsRenameInput.value = selectedVoice.name;
    }
    const selectedSampleCount = selectedVoice.samplePaths?.length || 0;
    const sampleLabel = `${selectedSampleCount} file sample${selectedSampleCount === 1 ? "" : "s"}${selectedVoice.youtubeUrl ? " + YouTube" : ""}`;
    ttsXttsTuningStatus.textContent = `Fine tuning ${selectedVoice.name} (${sampleLabel}). Rate and pitch are saved only for this voice.`;
  } else {
    ttsXttsStrengthInput.value = "0.75";
    ttsXttsEchoInput.value = "0";
    ttsXttsReverbInput.value = "0";
    ttsXttsRoboticInput.value = "0";
    ttsXttsRateInput.value = "1";
    ttsXttsPitchInput.value = "1";
    if (ttsXttsRenameInput) {
      ttsXttsRenameInput.value = "";
    }
    ttsXttsTuningStatus.textContent = "Select an XTTS voice to fine tune clone strength, echo, reverb, robotic tone, rate, and pitch.";
  }

  updateXttsTuningLabels();
}

function shouldAutoStartXttsService() {
  return ttsProviderSelect?.value !== "elevenlabs" && Boolean(getSelectedXttsVoice());
}

async function saveSelectedXttsVoiceTuningFromUi(tuningOverrides = null) {
  const selectedVoiceId = String(ttsVoiceSelect?.value ?? "").trim().replace(/^xtts:/, "");
  const selectedVoice = getSelectedXttsVoice(selectedVoiceId);
  if (!selectedVoice) {
    showToast("Select an XTTS voice before saving tuning.", "error");
    return;
  }

  const nextTuning = normalizeXttsVoiceTuning(tuningOverrides ?? {
    strength: Number(ttsXttsStrengthInput?.value ?? 0.75),
    echo: Number(ttsXttsEchoInput?.value ?? 0),
    reverb: Number(ttsXttsReverbInput?.value ?? 0),
    robotic: Number(ttsXttsRoboticInput?.value ?? 0),
    rate: Number(ttsXttsRateInput?.value ?? 1),
    pitch: Number(ttsXttsPitchInput?.value ?? 1)
  });

  const nextVoices = updateXttsVoiceTuningInList(state.settings?.ttsXttsVoices, selectedVoiceId, nextTuning);
  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  for (const profileId of Object.keys(nextProfiles)) {
    const profileSettings = normalizeProfileSettingsSnapshot(nextProfiles[profileId]?.settings ?? {});
    const profileVoices = updateXttsVoiceTuningInList(profileSettings.ttsXttsVoices, selectedVoiceId, nextTuning);
    nextProfiles[profileId] = {
      ...nextProfiles[profileId],
      settings: normalizeProfileSettingsSnapshot({
        ...profileSettings,
        ttsXttsVoices: profileId === activeProfileId ? nextVoices : profileVoices
      })
    };
  }

  state.settings.ttsXttsVoices = nextVoices;
  state.settings.settingsProfiles = nextProfiles;
  await persistSettings({
    ttsXttsVoices: nextVoices,
    settingsProfiles: nextProfiles
  }, { render: false });
  state.settings.ttsXttsVoices = nextVoices;
  state.settings.settingsProfiles = nextProfiles;
  await loadVoices();
  ttsVoiceSelect.value = `xtts:${selectedVoiceId}`;
  renderXttsVoiceTuning();
  showToast(`Saved tuning for ${selectedVoice.name}.`, "success");
}

async function renameSelectedXttsVoiceFromUi() {
  const selectedVoiceId = String(ttsVoiceSelect?.value ?? "").trim().replace(/^xtts:/, "");
  const selectedVoice = getSelectedXttsVoice(selectedVoiceId);
  if (!selectedVoice) {
    showToast("Select an XTTS voice before renaming.", "error");
    return;
  }

  const nextName = String(ttsXttsRenameInput?.value ?? "").trim();
  if (!nextName) {
    showToast("Enter a new XTTS voice name before saving.", "error");
    ttsXttsRenameInput?.focus();
    return;
  }
  if (nextName === selectedVoice.name) {
    showToast("XTTS voice name unchanged.", "info");
    return;
  }

  const existingName = normalizeXttsVoices(state.settings?.ttsXttsVoices).find((voice) =>
    voice.id !== selectedVoiceId && voice.name.toLowerCase() === nextName.toLowerCase()
  );
  if (existingName) {
    showToast(`Another XTTS voice is already named "${nextName}". Choose a different name.`, "error");
    ttsXttsRenameInput?.focus();
    return;
  }

  const nextVoices = updateXttsVoiceNameInList(state.settings?.ttsXttsVoices, selectedVoiceId, nextName);
  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  for (const profileId of Object.keys(nextProfiles)) {
    const profileSettings = normalizeProfileSettingsSnapshot(nextProfiles[profileId]?.settings ?? {});
    const profileVoices = updateXttsVoiceNameInList(profileSettings.ttsXttsVoices, selectedVoiceId, nextName);
    nextProfiles[profileId] = {
      ...nextProfiles[profileId],
      settings: normalizeProfileSettingsSnapshot({
        ...profileSettings,
        ttsXttsVoices: profileId === activeProfileId ? nextVoices : profileVoices
      })
    };
  }

  state.settings.ttsXttsVoices = nextVoices;
  state.settings.settingsProfiles = nextProfiles;
  await persistSettings({
    ttsXttsVoices: nextVoices,
    settingsProfiles: nextProfiles
  }, { render: false });
  state.settings.ttsXttsVoices = nextVoices;
  state.settings.settingsProfiles = nextProfiles;
  await loadVoices();
  ttsVoiceSelect.value = `xtts:${selectedVoiceId}`;
  renderXttsVoiceTuning();
  showToast(`Renamed XTTS voice to "${nextName}".`, "success");
}

async function checkXttsServiceFromUi() {
  const serviceUrl = String(ttsXttsServiceUrlInput?.value ?? state.settings?.ttsXttsServiceUrl ?? "").trim();
  try {
    const result = await app.checkXttsService({ xttsServiceUrl: serviceUrl });
    showToast(result?.message || "XTTS service is reachable.", "success");
    setStatusMessage(ttsStatus, "success", result?.message || "XTTS service is reachable.");
  } catch (error) {
    const message = error.message || "Unable to reach the XTTS service.";
    showToast(message, "error");
    setStatusMessage(ttsStatus, "error", message);
  }
}

async function startXttsServiceFromUi(options = {}) {
  const serviceUrl = String(ttsXttsServiceUrlInput?.value ?? state.settings?.ttsXttsServiceUrl ?? "").trim();
  try {
    if (!options.silent) {
      setStatusMessage(ttsStatus, "info", "Starting XTTS service...");
    }
    const result = await app.startXttsService({ xttsServiceUrl: serviceUrl });
    if (!options.silent) {
      showToast(result?.message || "XTTS service started.", "success");
      setStatusMessage(ttsStatus, "success", result?.message || "XTTS service started.");
    }
    return result;
  } catch (error) {
    const message = error.message || "Unable to start the XTTS service.";
    if (!options.silent) {
      showToast(message, "error");
      setStatusMessage(ttsStatus, "error", message);
    }
    throw error;
  }
}

async function testSelectedTtsVoiceFromUi() {
  const voiceSelection = getSelectedTtsVoiceSelection();
  const isXttsVoice = voiceSelection?.providerKey === "xtts";
  if (isXttsVoice) {
    const xttsVoice = getSelectedXttsVoice(voiceSelection.value);
    const sampleCount = Array.isArray(xttsVoice?.samplePaths)
      ? xttsVoice.samplePaths.filter((samplePath) => String(samplePath ?? "").trim()).length
      : 0;
    const hasSampleSource = Boolean(sampleCount || String(xttsVoice?.samplePath ?? "").trim() || String(xttsVoice?.youtubeUrl ?? "").trim());

    if (!xttsVoice) {
      showToast("Choose an XTTS voice before testing.", "error");
      setStatusMessage(ttsStatus, "error", "Choose an XTTS voice before testing.");
      return;
    }

    if (!hasSampleSource) {
      showToast("This XTTS voice has no sample file or YouTube sample. Add a sample before testing.", "error");
      setStatusMessage(ttsStatus, "error", "Add at least one sample to this XTTS voice before testing.");
      return;
    }

    await startXttsServiceFromUi();
  }

  const customTestPhrase = String(ttsTestTextInput?.value ?? "").trim();
  const defaultTestPhrase = ttsProviderSelect.value === "elevenlabs"
    ? "Stream Sync Pro LIVE model comparison. This voice should sound consistent, clear, and expressive across a longer test phrase."
    : ttsProviderSelect.value === "tiktok"
      ? "Stream Sync Pro LIVE TikTok text to speech test."
    : isXttsVoice
      ? "Stream Sync Pro LIVE XTTS voice test. This should use the selected custom voice."
      : "Stream Sync Pro LIVE voice test.";
  const testPhrase = customTestPhrase || defaultTestPhrase;

  enqueueSpeech(testPhrase, {
    voiceSelection,
    provider: isXttsVoice ? "xtts" : ttsProviderSelect.value
  });
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

async function addXttsVoiceFromUi() {
  const name = String(ttsXttsVoiceNameInput?.value ?? "").trim();
  const samplePaths = String(ttsXttsSampleFileInput?.value ?? "")
    .split(/\s*;\s*/)
    .map((samplePath) => samplePath.trim())
    .filter(Boolean);
  const youtubeUrl = String(ttsXttsYoutubeUrlInput?.value ?? "").trim();

  if (!name) {
    showToast("Enter a name for the XTTS voice.", "error");
    ttsXttsVoiceNameInput?.focus();
    return;
  }

  if (!samplePaths.length && !youtubeUrl) {
    showToast("Choose one or more sample files, or paste a YouTube URL for the XTTS voice.", "error");
    return;
  }

  if (youtubeUrl && !/^https?:\/\/([\w-]+\.)?(youtube\.com|youtu\.be)\//i.test(youtubeUrl)) {
    showToast("Paste a valid YouTube URL, or leave the YouTube field empty.", "error");
    ttsXttsYoutubeUrlInput?.focus();
    return;
  }

  const nextVoices = normalizeXttsVoices([
    ...(state.settings?.ttsXttsVoices ?? []),
    {
      id: createXttsVoiceId(),
      name,
      samplePath: samplePaths[0] ?? "",
      samplePaths,
      youtubeUrl,
      tuning: normalizeXttsVoiceTuning(),
      createdAt: Date.now()
    }
  ]);

  state.settings.ttsXttsVoices = nextVoices;
  await persistSettings({ ttsXttsVoices: nextVoices });
  ttsXttsVoiceNameInput.value = "";
  ttsXttsSampleFileInput.value = "";
  ttsXttsYoutubeUrlInput.value = "";
  await loadVoices();
  const createdVoice = nextVoices[nextVoices.length - 1];
  if (createdVoice?.id) {
    ttsVoiceSelect.value = `xtts:${createdVoice.id}`;
    state.settings.ttsVoice = `xtts:${createdVoice.id}`;
    renderXttsVoiceTuning();
    scheduleSettingsSave();
  }
  showToast(`Added XTTS voice "${name}".`, "success");
}

async function addXttsSampleToSelectedVoiceFromUi() {
  const selectedVoiceId = String(ttsVoiceSelect?.value ?? "").trim().replace(/^xtts:/, "");
  const samplePaths = String(ttsXttsSampleFileInput?.value ?? "")
    .split(/\s*;\s*/)
    .map((samplePath) => samplePath.trim())
    .filter(Boolean);
  const youtubeUrl = String(ttsXttsYoutubeUrlInput?.value ?? "").trim();

  if (!selectedVoiceId) {
    showToast("Select an XTTS voice before adding more samples.", "error");
    return;
  }

  if (!getSelectedXttsVoice(selectedVoiceId)) {
    showToast("Select an XTTS voice before adding more samples.", "error");
    return;
  }

  if (!samplePaths.length && !youtubeUrl) {
    showToast("Choose one or more sample files, or paste a YouTube URL to add.", "error");
    return;
  }

  if (youtubeUrl && !/^https?:\/\/([\w-]+\.)?(youtube\.com|youtu\.be)\//i.test(youtubeUrl)) {
    showToast("Paste a valid YouTube URL, or leave the YouTube field empty.", "error");
    ttsXttsYoutubeUrlInput?.focus();
    return;
  }

  const nextVoices = updateXttsVoiceSamplesInList(state.settings?.ttsXttsVoices, selectedVoiceId, samplePaths, youtubeUrl);
  const updatedVoice = nextVoices.find((voice) => voice.id === selectedVoiceId);
  const activeProfileId = getActiveSettingsProfileId();
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  for (const profileId of Object.keys(nextProfiles)) {
    const profileSettings = normalizeProfileSettingsSnapshot(nextProfiles[profileId]?.settings ?? {});
    const profileVoices = updateXttsVoiceSamplesInList(profileSettings.ttsXttsVoices, selectedVoiceId, samplePaths, youtubeUrl);
    nextProfiles[profileId] = {
      ...nextProfiles[profileId],
      settings: normalizeProfileSettingsSnapshot({
        ...profileSettings,
        ttsXttsVoices: profileId === activeProfileId ? nextVoices : profileVoices
      })
    };
  }

  state.settings.ttsXttsVoices = nextVoices;
  state.settings.settingsProfiles = nextProfiles;
  await persistSettings({
    ttsXttsVoices: nextVoices,
    settingsProfiles: nextProfiles
  }, { render: false });
  ttsXttsSampleFileInput.value = "";
  ttsXttsYoutubeUrlInput.value = "";
  await loadVoices();
  ttsVoiceSelect.value = `xtts:${selectedVoiceId}`;
  renderXttsVoiceTuning();
  const sampleCount = updatedVoice?.samplePaths?.length || 0;
  showToast(`Added sample to the selected XTTS voice. ${sampleCount} sample${sampleCount === 1 ? "" : "s"} saved.`, "success");
}

async function deleteSelectedXttsVoiceFromUi() {
  const selectedVoiceId = String(ttsVoiceSelect?.value ?? "").trim().replace(/^xtts:/, "");
  const selectedVoice = getSelectedXttsVoice(selectedVoiceId);
  if (!selectedVoice) {
    showToast("Select an XTTS voice before deleting.", "error");
    return;
  }

  const shouldDelete = window.confirm(`Delete the XTTS voice "${selectedVoice.name}"?`);
  if (!shouldDelete) {
    return;
  }

  const nextVoices = normalizeXttsVoices(state.settings?.ttsXttsVoices).filter((voice) => voice.id !== selectedVoiceId);
  const nextAssignments = normalizeTtsUserVoiceAssignments(state.settings?.ttsUserVoiceAssignments);
  const removeDeletedVoiceAssignments = (assignmentsSource = {}) => {
    const cleanedAssignments = normalizeTtsUserVoiceAssignments(assignmentsSource);
    for (const providerKey of ["builtin", "xtts"]) {
      cleanedAssignments[providerKey] = Object.fromEntries(
        Object.entries(cleanedAssignments[providerKey] ?? {}).filter(([, voiceValue]) => {
          const normalizedVoiceValue = String(voiceValue ?? "").trim().replace(/^xtts:/, "");
          return normalizedVoiceValue !== selectedVoiceId;
        })
      );
    }
    return cleanedAssignments;
  };
  for (const providerKey of ["builtin", "xtts"]) {
    nextAssignments[providerKey] = Object.fromEntries(
      Object.entries(nextAssignments[providerKey] ?? {}).filter(([, voiceValue]) => {
        const normalizedVoiceValue = String(voiceValue ?? "").trim().replace(/^xtts:/, "");
        return normalizedVoiceValue !== selectedVoiceId;
      })
    );
  }
  const nextProfiles = normalizeSettingsProfiles(state.settings?.settingsProfiles, state.settings);
  for (const [profileId, profile] of Object.entries(nextProfiles)) {
    const profileSettings = normalizeProfileSettingsSnapshot(profile?.settings ?? {});
    const profileVoiceValue = String(profileSettings.ttsVoice ?? "").trim().replace(/^xtts:/, "");
    nextProfiles[profileId] = {
      ...profile,
      settings: normalizeProfileSettingsSnapshot({
        ...profileSettings,
        ttsVoice: profileVoiceValue === selectedVoiceId ? "" : profileSettings.ttsVoice,
        ttsXttsVoices: normalizeXttsVoices(profileSettings.ttsXttsVoices).filter((voice) => voice.id !== selectedVoiceId),
        ttsUserVoiceAssignments: removeDeletedVoiceAssignments(profileSettings.ttsUserVoiceAssignments)
      })
    };
  }

  state.settings.ttsXttsVoices = nextVoices;
  state.settings.ttsUserVoiceAssignments = nextAssignments;
  state.settings.settingsProfiles = nextProfiles;
  if (String(state.settings.ttsVoice ?? "").trim().replace(/^xtts:/, "") === selectedVoiceId) {
    state.settings.ttsVoice = "";
  }

  await persistSettings({
    ttsXttsVoices: nextVoices,
    ttsUserVoiceAssignments: nextAssignments,
    ttsVoice: state.settings.ttsVoice,
    settingsProfiles: nextProfiles
  });
  await loadVoices();
  renderXttsVoiceTuning();
  showToast(`Deleted XTTS voice "${selectedVoice.name}".`, "success");
}

async function exportSelectedXttsVoiceFromUi() {
  const selectedVoice = getSelectedXttsVoice();
  if (!selectedVoice) {
    showToast("Select an XTTS voice before exporting.", "error");
    return;
  }

  const result = await app.exportXttsVoice({ voice: selectedVoice });
  if (result?.canceled) {
    return;
  }

  showToast(`Exported XTTS voice "${selectedVoice.name}".`, "success");
}

function normalizeImportedXttsVoice(source = {}, existingVoices = []) {
  const importedVoice = normalizeXttsVoices([source?.voice ?? source])[0] ?? null;
  if (!importedVoice) {
    throw new Error("That file does not contain a valid XTTS voice.");
  }

  const existingIds = new Set(normalizeXttsVoices(existingVoices).map((voice) => voice.id));
  if (!existingIds.has(importedVoice.id)) {
    return importedVoice;
  }

  return {
    ...importedVoice,
    id: createXttsVoiceId(),
    name: `${importedVoice.name} (imported)`,
    createdAt: Date.now()
  };
}

async function importXttsVoiceFromUi() {
  const result = await app.importXttsVoice();
  if (result?.canceled) {
    return;
  }

  const existingVoices = normalizeXttsVoices(state.settings?.ttsXttsVoices);
  let importedVoice = null;

  if (result?.voice) {
    importedVoice = normalizeImportedXttsVoice(result.voice, existingVoices);
  } else {
    let parsed = null;
    try {
      parsed = JSON.parse(String(result?.content ?? ""));
    } catch {
      throw new Error("The selected XTTS voice file is not valid JSON.");
    }
    importedVoice = normalizeImportedXttsVoice(parsed, existingVoices);
  }

  const nextVoices = normalizeXttsVoices([...existingVoices, importedVoice]);
  state.settings.ttsXttsVoices = nextVoices;
  state.settings.ttsVoice = `xtts:${importedVoice.id}`;

  await persistSettings({
    ttsXttsVoices: nextVoices,
    ttsVoice: state.settings.ttsVoice
  });
  await loadVoices();
  ttsVoiceSelect.value = `xtts:${importedVoice.id}`;
  renderXttsVoiceTuning();
  showToast(`Imported XTTS voice "${importedVoice.name}".`, "success");
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

function getVoiceAdjustedRate(synthesisProvider, xttsTuning = null, fallbackRate = getStyleAdjustedRate()) {
  if (synthesisProvider === "xtts" && xttsTuning) {
    return clamp(Number(xttsTuning.rate ?? fallbackRate) || fallbackRate, 0.7, 1.5);
  }
  return fallbackRate;
}

function getVoiceAdjustedPitch(synthesisProvider, xttsTuning = null, fallbackPitch = getStyleAdjustedPitch()) {
  if (synthesisProvider === "xtts" && xttsTuning) {
    return clamp(Number(xttsTuning.pitch ?? fallbackPitch) || fallbackPitch, 0.5, 1.8);
  }
  return fallbackPitch;
}

function formatBytes(value = 0) {
  const bytes = Math.max(0, Number(value) || 0);
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${bytes} B`;
}

async function refreshTtsCacheInfo() {
  if (!ttsCacheStatus || typeof app.getTtsCacheInfo !== "function") {
    return;
  }

  try {
    const info = await app.getTtsCacheInfo();
    ttsCacheStatus.textContent = `${info.fileCount || 0} cached phrases using ${formatBytes(info.totalBytes)}. Short phrases up to ${info.maxTextLength || 500} characters are cached.`;
  } catch (error) {
    ttsCacheStatus.textContent = error.message || "Unable to load TTS cache info.";
  }
}

function getStyleAdjustedVolume() {
  const styleProfile = TTS_STYLE_PROFILES.natural;
  const baseVolume = Number(ttsVolumeInput.value) || 1;
  return clamp(baseVolume * styleProfile.volumeMultiplier, 0.2, 3);
}

function updateTtsProviderVisibility() {
  const isElevenLabs = ttsProviderSelect.value === "elevenlabs";
  const isTikTok = ttsProviderSelect.value === "tiktok";
  const showXttsTools = !isElevenLabs && !isTikTok;

  ttsElevenModeField.classList.toggle("is-hidden", !isElevenLabs);
  ttsElevenApiKeyField.classList.toggle("is-hidden", !isElevenLabs);
  ttsElevenModelField.classList.toggle("is-hidden", !isElevenLabs);
  ttsXttsServiceUrlField?.classList.toggle("is-hidden", !showXttsTools);
  ttsXttsServiceActions?.classList.toggle("is-hidden", !showXttsTools);
  ttsXttsSplitSentencesField?.classList.toggle("is-hidden", !showXttsTools);
  ttsXttsLanguageField?.classList.toggle("is-hidden", !showXttsTools);
  ttsCachePanel?.classList.toggle("is-hidden", !showXttsTools);
  ttsXttsVoiceBuilder?.classList.toggle("is-hidden", !showXttsTools);
  ttsXttsVoiceTuning?.classList.toggle("is-hidden", !showXttsTools);
  renderXttsVoiceTuning();
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
  const synthesisProvider = ["xtts", "tiktok"].includes(voiceSelection?.providerKey) ? voiceSelection.providerKey : provider;
  const xttsVoice = synthesisProvider === "xtts" ? getSelectedXttsVoice(voiceSelection?.value) : null;
  const xttsTuning = xttsVoice ? normalizeXttsVoiceTuning(xttsVoice.tuning) : null;
  const queueId = options.queueId ?? ttsQueueSelect.value;
  const receivedAt = Number(options.receivedAt || Date.now());
  const sourceUser = String(options.sourceUser || "").trim();
  const sourceNickname = String(options.sourceNickname || "").trim();
  const sourceProfilePictureUrl = String(options.sourceProfilePictureUrl || "").trim();
  const baseRate = options.rate ?? getStyleAdjustedRate();
  const basePitch = options.pitch ?? getStyleAdjustedPitch();
  const rate = getVoiceAdjustedRate(synthesisProvider, xttsTuning, baseRate);
  const pitch = getVoiceAdjustedPitch(synthesisProvider, xttsTuning, basePitch);
  const volume = options.volume ?? getStyleAdjustedVolume();
  const queuedAt = Date.now();

  void reportAuthenticatedDebugTrace("TTS queued", "Queued TTS message for playback.", {
    queueId,
    voice: voiceSelection?.value || "",
    previewText,
    sourceUser,
    latencySinceReceiptMs: Math.max(0, queuedAt - receivedAt)
  });

  void enqueuePlaybackTask(queueId, async (queueItem) => {
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
          provider: synthesisProvider,
          voiceName: String(voiceSelection.value ?? "").replace(/^builtin:/, ""),
          voiceId: String(voiceSelection.value ?? "").replace(/^xtts:/, ""),
          mode,
          apiKey,
          modelId,
          xttsServiceUrl: String(ttsXttsServiceUrlInput?.value ?? state.settings?.ttsXttsServiceUrl ?? "").trim(),
          xttsLanguage: String(ttsXttsLanguageSelect?.value ?? state.settings?.ttsXttsLanguage ?? "en").trim().toLowerCase() || "en",
          xttsSplitSentences: Boolean(ttsXttsSplitSentencesInput?.checked),
          xttsVoice,
          xttsTuning,
          style: "natural",
          rate,
          pitch
        });
      const synthCompletedAt = Date.now();
      if (queueItem?.cancelled) {
        if (!result?.cached) {
          await app.deleteTtsFile(result.filePath);
        }
        throw createPlaybackStoppedError();
      }

      await reportAuthenticatedDebugTrace("TTS synthesis", "Finished generating TTS audio file.", {
        queueId,
        voice: voiceSelection?.value || "",
        previewText,
        sourceUser,
        synthDurationMs: Math.max(0, synthCompletedAt - synthStartedAt),
        latencySinceReceiptMs: Math.max(0, synthCompletedAt - receivedAt),
        filePath: result?.filePath || "",
        cached: Boolean(result?.cached)
      });

      const fileUrl = new URL(`file://${result.filePath.replaceAll("\\", "/")}`).toString();
        if (queueItem?.cancelled) {
          throw createPlaybackStoppedError();
        }
        await playAudioUrl(fileUrl, volume, synthesisProvider === "xtts" ? { ...xttsTuning, pitch } : null);
        if (queueItem?.cancelled) {
          if (!result?.cached) {
            await app.deleteTtsFile(result.filePath);
          }
          throw createPlaybackStoppedError();
        }
        const playbackCompletedAt = Date.now();

        await reportAuthenticatedDebugTrace("TTS complete", "Completed TTS playback.", {
          queueId,
          voice: voiceSelection?.value || "",
          previewText,
          sourceUser,
          totalLatencyMs: Math.max(0, playbackCompletedAt - receivedAt),
          playbackDurationMs: Math.max(0, playbackCompletedAt - synthCompletedAt)
        });
        if (!result?.cached) {
          await app.deleteTtsFile(result.filePath);
        }
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
    kind: "tts",
    sourceUser,
    sourceNickname,
    sourceProfilePictureUrl
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
  if (/^!?\s*lockmyttsvoice\s*$/i.test(messageText)) {
    return handleLockMyTtsVoiceCommand(item);
  }

  const match = messageText.match(/^!(?:myttsvoice|ttsvoice|voice)\s*#?\s*(\d+)\s*$/i);
  if (!match) {
    return false;
  }

  const userKey = normalizeUserKey(item.user || item.uniqueId || item.username || item.nickname);
  if (!userKey || userKey === "unknown") {
    showToast("A viewer tried to set a TTS voice, but their TikTok username was not available.", "error");
    return true;
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
    showToast(`@${userKey} tried to set a TTS voice, but no voices are currently loaded.`, "error");
    return true;
  }

  if (!selectedEntry) {
    showToast(`@${userKey} chose an invalid TTS voice number. Available voices: 1-${availableEntries.length}.`, "error");
    return true;
  }
  if (isTtsVoiceLockedToAnotherUser(selectedEntry.value, userKey, providerKey)) {
    const selectedProviderKey = selectedEntry.providerKey || resolveTtsProviderKeyForVoiceValue(selectedEntry.value, providerKey);
    const lockedBy = state.sessionTtsVoiceLocksByVoice.get(getSessionTtsVoiceLockKey(selectedProviderKey, selectedEntry.value));
    showToast(`That TTS voice is locked by @${lockedBy} until stream disconnects.`, "info");
    return true;
  }

  await saveUserAssignedTtsVoice(userKey, selectedEntry.value, selectedEntry.providerKey || providerKey);
  void reportAuthenticatedDebugTrace("TTS voice command", "Viewer selected a custom TTS voice.", {
    user: userKey,
    selectedNumber,
    voiceValue: selectedEntry.value,
    voiceLabel: selectedEntry.baseLabel,
    providerKey: selectedEntry.providerKey || providerKey
  });
  showCommandFeedbackOverlay("myttsvoice", {
    user: `@${userKey}`,
    voiceLabel: selectedEntry.baseLabel,
    voiceNumber: String(selectedNumber)
  });
  showToast(`@${userKey} set their TTS voice to ${selectedEntry.baseLabel}.`, "success");
  return true;
}

async function handleLockMyTtsVoiceCommand(item) {
  const userKey = normalizeUserKey(item?.user || item?.uniqueId || item?.username || item?.nickname);
  const requiredGiftName = String(state.settings?.ttsVoiceLockGiftName ?? "").trim();
  const requiredGiftKey = normalizeGiftKey(requiredGiftName);
  if (!userKey) {
    return true;
  }
  if (!requiredGiftKey) {
    showToast("Voice locking is disabled. Choose a Voice lock gift in TTS settings first.", "info");
    return true;
  }

  const sentGiftCount = getUserGiftSentCountForName(userKey, requiredGiftName);
  if (sentGiftCount <= 0) {
    void reportAuthenticatedDebugTrace("TTS voice lock command", "Viewer tried to lock a TTS voice without the required gift being recorded.", {
      user: userKey,
      requiredGiftName,
      requiredGiftKey,
      availableGiftKeys: Array.from(state.sessionGiftMetrics.byUser.get(userKey)?.keys?.() ?? [])
    });
    showToast(`@${userKey} must send ${requiredGiftName} before using !lockmyttsvoice.`, "info");
    return true;
  }

  const providerKey = getCurrentTtsProviderKey();
  const assignedVoiceValue = getUserAssignedTtsVoice(userKey, providerKey);
  if (!assignedVoiceValue) {
    showToast(`@${userKey} needs to choose a voice first with !myttsvoice <number>.`, "info");
    return true;
  }

  let availableEntries = getAvailableTtsVoiceEntries();
  if (!availableEntries.length) {
    await loadVoices();
    availableEntries = getAvailableTtsVoiceEntries();
  }

  const assignedEntry = availableEntries.find((entry) => entry.value === assignedVoiceValue);
  if (!assignedEntry) {
    showToast(`@${userKey}'s selected voice is not currently available to lock.`, "error");
    return true;
  }

  const lockProviderKey = assignedEntry.providerKey || resolveTtsProviderKeyForVoiceValue(assignedVoiceValue, providerKey);
  const lockKey = getSessionTtsVoiceLockKey(lockProviderKey, assignedVoiceValue);
  const existingLockedUser = state.sessionTtsVoiceLocksByVoice.get(lockKey);
  if (existingLockedUser && existingLockedUser !== userKey) {
    showToast(`That TTS voice is already locked by @${existingLockedUser} for this stream.`, "info");
    return true;
  }

  const previousLock = state.sessionTtsVoiceLocksByUser.get(userKey);
  if (previousLock) {
    releaseSessionTtsVoiceLockForUser(userKey);
  }

  state.sessionTtsVoiceLocksByUser.set(userKey, {
    providerKey: lockProviderKey,
    voiceValue: assignedVoiceValue,
    voiceLabel: assignedEntry.baseLabel,
    giftName: requiredGiftName,
    lockedAt: Date.now()
  });
  state.sessionTtsVoiceLocksByVoice.set(lockKey, userKey);

  const movedUsers = await persistExclusiveTtsVoiceLockAssignments(userKey, assignedVoiceValue, lockProviderKey);

  void reportAuthenticatedDebugTrace("TTS voice lock command", "Viewer locked their selected TTS voice for this stream.", {
    user: userKey,
    requiredGiftName,
    sentGiftCount,
    voiceValue: assignedVoiceValue,
    voiceLabel: assignedEntry.baseLabel,
    providerKey: lockProviderKey,
    movedUsers
  });

  showCommandFeedbackOverlay("myttsvoice", {
    user: `@${userKey}`,
    voiceLabel: `${assignedEntry.label} locked for this stream`,
    voiceNumber: ""
  });
  showToast(`@${userKey} locked ${assignedEntry.baseLabel} for their TTS until stream disconnects.`, "success");
  if (movedUsers.length) {
    showToast(`${movedUsers.length} viewer${movedUsers.length === 1 ? "" : "s"} moved to the next available TTS voice.`, "info");
  }
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
  let customRulesChecked = false;

  updateSessionUserProfile(item);
  touchViewerPointsUserActivity(item, receivedAt);
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
    awardViewerPoints(item, "comment", 1);
    pushChatOverlayItem(item);
    if (Array.isArray(item.emotes) && item.emotes.length) {
      const derivedMetric = item.isSubscriber ? "subEmote" : "fanEmote";
      for (const emote of item.emotes) {
        state.sessionMetrics[derivedMetric] += 1;
        incrementUserMetric(derivedMetric, item.user, 1);
        awardViewerPoints(item, derivedMetric, 1);
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
    awardViewerPoints(item, "gift", giftCount);
    awardViewerPoints(item, "coin", totalCoins);
    incrementGiftMetric(item.user, item.giftName, giftCount);
    pushGiftOverlayItem(item);
    void rememberKnownTikTokGift(item.giftName, item.giftImageUrl, item.coinValue, item.giftId);
    maybeTriggerSpinWheelFromGift(item);
    moveLikeRaceRacer(item, totalCoins * Math.max(0, Number(getLikeRace().giftMultiplier) || 0), {
      type: "gift",
      giftName: item.giftName,
      giftCoins: totalCoins,
      giftCount,
      speechBubble: `+${Math.round(totalCoins * Math.max(0, Number(getLikeRace().giftMultiplier) || 0))}`
    });
  }

  if (item.type === "follow") {
    state.statState.followers += 1;
    state.sessionMetrics.follows += 1;
    incrementUserMetric("follows", item.user, 1);
    awardViewerPoints(item, "follow", 1);
  }

  if (item.type === "share") {
    state.sessionMetrics.shares += 1;
    incrementUserMetric("shares", item.user, 1);
    awardViewerPoints(item, "share", 1);
  }

  if (item.type === "like") {
    const likeIncrement = Math.max(0, Number(item.likeCount) || 0);
    const disqualifiedEarlyTap = handleLikeRaceEarlyTap(item);
    if (Number(item.totalLikeCount) > 0) {
      state.sessionMetrics.likes = Math.max(state.sessionMetrics.likes, Number(item.totalLikeCount));
    } else {
      state.sessionMetrics.likes += likeIncrement;
    }
    incrementUserMetric("likes", item.user, likeIncrement);
    awardViewerPoints(item, "like", likeIncrement);
    void reportAuthenticatedDebugTrace("TikTok like event", "Processed TikTok LIKE event.", {
      user: item.user || "",
      likeIncrement,
      userTotalLikes: Number(state.sessionUserMetrics.likes.get(normalizeUserKey(item.user)) ?? 0) || 0,
      streamTotalLikes: Number(state.sessionMetrics.likes ?? 0) || 0,
      tiktokTotalLikeCount: Number(item.totalLikeCount ?? 0) || 0
    });
    if (!disqualifiedEarlyTap) {
      moveLikeRaceRacer(item, likeIncrement * Math.max(0, Number(getLikeRace().likeMultiplier) || 0), {
      type: "like",
      likes: likeIncrement,
      speechBubble: likeIncrement > 0 ? `+${Math.round(likeIncrement * Math.max(0, Number(getLikeRace().likeMultiplier) || 0))}` : ""
      });
    }
    syncLikesOverlayState();
    checkCustomRules(item);
    customRulesChecked = true;
  }

  if (item.type === "subEmote") {
    state.sessionMetrics.subEmote += 1;
    incrementUserMetric("subEmote", item.user, 1);
    awardViewerPoints(item, "subEmote", 1);
    incrementEmoteMetric("subEmote", item.user, item.emoteId, item.emoteName, 1);
    void rememberKnownTikTokEmote("subEmote", item.emoteName, item.emoteImageUrl, item.emoteId, state.username);
  }

  if (item.type === "fanEmote") {
    state.sessionMetrics.fanEmote += 1;
    incrementUserMetric("fanEmote", item.user, 1);
    awardViewerPoints(item, "fanEmote", 1);
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
  if (!customRulesChecked) {
    checkCustomRules(item);
  }
  if (firstActivityItem) {
    checkCustomRules(firstActivityItem);
  }
  triggerBirthdayViewerActionIfNeeded(item);

  const handledModeratorTtsCommand = await handleModeratorTtsCommand(item);
  if (handledModeratorTtsCommand) {
    return;
  }

  const handledListCommands = await handleListCommandsCommand(item);
  if (handledListCommands) {
    return;
  }

  const handledSpinWheelCommand = await handleSpinWheelCommand(item);
  if (handledSpinWheelCommand) {
    return;
  }

  const handledLikeRaceCommand = await handleLikeRaceCommand(item);
  if (handledLikeRaceCommand) {
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

  const handledBirthdayCommand = await handleMyBirthdayCommand(item);
  if (handledBirthdayCommand) {
    return;
  }

  const handledVoiceCommand = await handleMyTtsVoiceCommand(item);
  if (handledVoiceCommand) {
    return;
  }

  if (shouldSpeakChatItem(item)) {
    markTtsQueuedForUser(item);
    enqueueSpeech(buildSpeechText(item), {
      voiceSelection: getResolvedTtsVoiceSelection(item),
      receivedAt,
      sourceUser: item.user || "",
      sourceNickname: item.nickname || item.displayName || "",
      sourceProfilePictureUrl: item.profilePictureUrl || ""
    });
  }
}

function checkCustomRules(sourceItem = null) {
  for (const rule of state.settings.customEventRules) {
    if (!rule.enabled) {
      continue;
    }
    if (isRuleWithinDisabledTimeWindow(rule)) {
      continue;
    }
    if (sourceItem && rule?.triggerAudience === "birthday" && !doesItemMatchRuleAudience(rule, sourceItem)) {
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

    for (let triggerIndex = previousCount; triggerIndex < currentCount; triggerIndex += 1) {
      if (sourceItem) {
        if (!doesItemMatchRuleMetric(rule, sourceItem)) {
          continue;
        }
        if (!doesItemMatchRuleAudience(rule, sourceItem)) {
          continue;
        }
        const userKey = getRuleCooldownUserKey(sourceItem);
        const cooldownRemainingSeconds = getRuleUserCooldownRemainingSeconds(rule, userKey);
        if (cooldownRemainingSeconds > 0) {
          notifyRuleUserCooldown(rule, sourceItem, cooldownRemainingSeconds);
          continue;
        }
        setRuleUserCooldown(rule, sourceItem);
      }
      state.customRuleTriggerCounts.set(rule.id, triggerIndex + 1);
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
      apiKey: ttsElevenApiKeyInput.value.trim(),
      xttsServiceUrl: String(ttsXttsServiceUrlInput?.value ?? state.settings?.ttsXttsServiceUrl ?? "").trim(),
      xttsVoices: normalizeXttsVoices(state.settings?.ttsXttsVoices)
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

  const rawSelectedVoice = String(state.settings.ttsVoice ?? "").trim();
  const selectedVoice = ttsProviderSelect.value === "builtin"
    && rawSelectedVoice
    && normalizeXttsVoices(state.settings?.ttsXttsVoices).some((voice) => voice.id === rawSelectedVoice)
      ? `xtts:${rawSelectedVoice}`
      : rawSelectedVoice;
  const options = getAvailableTtsVoiceEntries().map((entry) => {
    return `<option value="${escapeHtml(entry.value)}">${escapeHtml(entry.label)}</option>`;
  });

  const emptyVoiceLabel = ttsProviderSelect.value === "elevenlabs"
    ? "Select an ElevenLabs voice"
    : ttsProviderSelect.value === "tiktok"
      ? "Select a TikTok voice"
      : "Default system or XTTS voice";
  ttsVoiceSelect.innerHTML = `<option value="">${emptyVoiceLabel}</option>${options.join("")}`;
  const hasSelectedVoice = getAvailableTtsVoiceEntries().some((entry) => entry.value === selectedVoice);
  if (selectedVoice && hasSelectedVoice) {
    ttsVoiceSelect.value = selectedVoice;
  } else if (selectedVoice) {
    const fallbackLabel = ttsProviderSelect.value === "builtin"
      ? `Saved system voice (${selectedVoice})`
      : ttsProviderSelect.value === "tiktok"
        ? `Saved TikTok voice (${selectedVoice})`
      : `Saved voice (${selectedVoice})`;
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
  renderXttsVoiceTuning();
}

function applySettingsToUi() {
  const settings = state.settings;

  rememberUsernameInput.checked = settings.rememberUsername;
  if (autoConnectInput) {
    autoConnectInput.checked = Boolean(settings.autoConnectOnLaunch);
  }
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
  if (ttsReadPunctuationInput) {
    ttsReadPunctuationInput.checked = Boolean(settings.ttsReadPunctuation);
  }
  ttsReadGiftsInput.checked = settings.ttsReadGifts;
  ttsGiftMinCoinsInput.value = String(Math.max(0, Number(settings.ttsGiftMinCoins) || 0));
  ttsElevenModeSelect.value = settings.ttsElevenMode || "free";
  ttsElevenApiKeyInput.value = settings.ttsElevenApiKey || "";
  ttsElevenModelSelect.value = settings.ttsElevenModel || "eleven_flash_v2_5";
  if (ttsXttsServiceUrlInput) {
    ttsXttsServiceUrlInput.value = settings.ttsXttsServiceUrl || "http://127.0.0.1:8020";
  }
  if (ttsXttsLanguageSelect) {
    ttsXttsLanguageSelect.value = settings.ttsXttsLanguage || "en";
  }
  if (ttsXttsSplitSentencesInput) {
    ttsXttsSplitSentencesInput.checked = Boolean(settings.ttsXttsSplitSentences);
  }
  renderTtsVoiceLockGiftOptions();
  ttsQueueSelect.value = String(normalizeQueueId(settings.ttsQueue, 1));
  ttsRateInput.value = String(settings.ttsRate);
  ttsPitchInput.value = String(settings.ttsPitch);
  ttsVolumeInput.value = String(settings.ttsVolume);

    ttsAudienceAllInput.checked = settings.ttsAudience.allViewers;
    ttsAudienceSubscribersInput.checked = settings.ttsAudience.subscribers;
    ttsAudienceModeratorsInput.checked = settings.ttsAudience.moderators;
    ttsAudienceVipsInput.checked = false;
    renderTtsModerationSettings();
    commandFeedbackDurationInput.value = String(Math.max(1000, Number(settings.commandFeedbackOverlayDurationMs) || 6000));
    commandFeedbackTemplateMyttsvoiceInput.value = settings.commandFeedbackTemplates?.myttsvoice ?? "";
    commandFeedbackTemplateListcommandsInput.value = settings.commandFeedbackTemplates?.listcommands ?? "";
    votingEnabledInput.checked = Boolean(settings.votingEnabled);
    votingStartRoleInput.value = ["everyone", "subscribers", "moderators"].includes(String(settings.votingStartRole ?? "").trim().toLowerCase())
      ? String(settings.votingStartRole).trim().toLowerCase()
      : "everyone";
    votingOverlayOrientationInput.value = String(settings.votingOverlayOrientation ?? "").trim().toLowerCase() === "vertical" ? "vertical" : "horizontal";
    renderLikeRaceSettings();
    renderSpinWheelSettings();
    viewerStatsOverlayFilterInput.value = ["everyone", "subscriber", "moderator", "username"].includes(String(settings.viewerStatsOverlayFilter ?? "").trim().toLowerCase())
      ? String(settings.viewerStatsOverlayFilter).trim().toLowerCase()
      : "everyone";
    viewerStatsOverlayUsernameInput.value = String(settings.viewerStatsOverlayUsername ?? "").trim();
    applyViewerPointsSettingsToUi();
    renderViewerPointsLeaderboard();
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
  updateLikeRaceOverlayControls();
  updateSpinWheelOverlayControls();
  updateViewerStatsOverlayControls();
  renderOverlayDesignerControls();
  updateHeaderPills();
  renderCustomRules();
  renderXttsVoiceTuning();
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

async function disconnectFromLiveSession() {
  state.autoConnectPaused = true;

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
}

async function connectToLiveSession({ auto = false } = {}) {
  if (!auto) {
    state.autoConnectPaused = false;
  }

  const username = usernameInput.value.trim().replace(/^@/, "");
  if (!username) {
    if (!auto) {
      showToast("Enter a TikTok username.", "error");
      usernameInput.focus();
    }
    return;
  }

  try {
    state.connecting = true;
    state.username = username;
    setConnectionUiState();
    updateHeaderPills();
    await persistSettings({
      rememberUsername: rememberUsernameInput.checked,
      rememberedUsername: rememberUsernameInput.checked ? username : "",
      autoConnectOnLaunch: Boolean(autoConnectInput?.checked)
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
      void reportAuthenticatedAppError(error, auto ? "TikTok auto connect" : "TikTok connect", {
        username
      });
    }
    showToast(error.message || "Unable to connect.", "error");
  } finally {
    await refreshCreditsStatus();
    state.connecting = false;
    state.autoConnectInProgress = false;
    updateHeaderPills();
    setConnectionUiState();
    updateStats();
  }
}

function maybeAutoConnectOnLaunch() {
  if (
    state.autoConnectAttempted ||
    state.autoConnectPaused ||
    state.connected ||
    state.connecting ||
    !state.authenticatedUser ||
    !state.settings?.autoConnectOnLaunch
  ) {
    return;
  }

  const username = (usernameInput.value || state.settings?.rememberedUsername || "").trim().replace(/^@/, "");
  if (!username) {
    state.autoConnectAttempted = true;
    return;
  }

  state.autoConnectAttempted = true;
  state.autoConnectInProgress = true;
  usernameInput.value = username;
  showToast(`Auto connecting to @${username}...`, "info");
  void connectToLiveSession({ auto: true });
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
      await disconnectFromLiveSession();
      return;
    }

    await connectToLiveSession();
  });

  rememberUsernameInput.addEventListener("change", () => {
    scheduleSettingsSave();
  });

  autoConnectInput?.addEventListener("change", () => {
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
  openGamesLayerButton?.addEventListener("click", () => openFocusedGamesLayer());
  openUsersLayerButton?.addEventListener("click", () => openFocusedUsersLayer());

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
    const profileButton = event.target.closest("[data-queue-open-profile]");
    if (profileButton) {
      const username = normalizeUserKey(profileButton.dataset.queueOpenProfile);
      if (username) {
        void app.openExternal(`https://www.tiktok.com/@${encodeURIComponent(username)}`);
      }
      return;
    }

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
  gamesTabButton?.addEventListener("click", () => setActiveTab("games"));
  usersTabButton?.addEventListener("click", () => setActiveTab("users"));
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
    const overlayUrl = getOverlayDesignerDisplayUrl();
    if (!overlayUrl) {
      showToast("Assign this template to an overlay first to get a hosted website URL.", "info");
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
    const overlayUrl = getOverlayDesignerDisplayUrl();
    if (!overlayUrl) {
      showToast("Assign this template to an overlay first to get a hosted website URL.", "info");
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
      viewerPointsEnabledInput,
      viewerPointsLikeInput,
      viewerPointsCommentInput,
      viewerPointsShareInput,
      viewerPointsFollowInput,
      viewerPointsGiftInput,
      viewerPointsCoinInput,
      viewerPointsSubEmoteInput,
      viewerPointsFanEmoteInput,
      viewerPointsSubscriberMultiplierInput
    ].forEach((input) => {
      input?.addEventListener("input", () => {
        state.settings = ensureSettingsShape({
          ...state.settings,
          viewerPointsSettings: collectViewerPointsSettingsFromUi()
        });
        scheduleViewerPointsSave();
      });
      input?.addEventListener("change", () => {
        persistSettings({
          viewerPointsSettings: collectViewerPointsSettingsFromUi()
        }, { render: false }).catch((error) => {
          showToast(error.message || "Unable to save viewer points settings.", "error");
        });
      });
    });

    viewerPointsResetButton?.addEventListener("click", () => {
      if (!window.confirm("Clear all viewer data? This cannot be undone.")) {
        return;
      }
      const emptyLeaderboard = createDefaultViewerPointsLeaderboard();
      state.settings = ensureSettingsShape({
        ...state.settings,
        viewerPointsLeaderboard: emptyLeaderboard
      });
      renderViewerPointsLeaderboard();
      persistSettings({
        viewerPointsLeaderboard: emptyLeaderboard
      }, { render: false }).then(() => {
        showToast("Viewer data cleared.", "success");
      }).catch((error) => {
        showToast(error.message || "Unable to clear viewer data.", "error");
      });
    });

    viewerPointsAddButton?.addEventListener("click", () => {
      void adjustViewerPointsFromUi(1).catch((error) => {
        showToast(error.message || "Unable to add viewer points.", "error");
      });
    });

    viewerPointsRemoveButton?.addEventListener("click", () => {
      void adjustViewerPointsFromUi(-1).catch((error) => {
        showToast(error.message || "Unable to remove viewer points.", "error");
      });
    });

    [viewerPointsAdjustUsernameInput, viewerPointsAdjustAmountInput].forEach((input) => {
      input?.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
          return;
        }
        event.preventDefault();
        viewerPointsAddButton?.click();
      });
    });

    viewerPointsSearchInput?.addEventListener("input", () => {
      viewerPointsSearchText = String(viewerPointsSearchInput.value ?? "").trim();
      viewerPointsPageIndex = 0;
      renderViewerPointsLeaderboard();
    });

    viewerPointsRoleFilterInput?.addEventListener("change", () => {
      viewerPointsRoleFilter = String(viewerPointsRoleFilterInput.value ?? "all").trim();
      viewerPointsPageIndex = 0;
      renderViewerPointsLeaderboard();
    });

    viewerPointsBalanceFilterInput?.addEventListener("change", () => {
      viewerPointsBalanceFilter = String(viewerPointsBalanceFilterInput.value ?? "all").trim();
      viewerPointsPageIndex = 0;
      renderViewerPointsLeaderboard();
    });

    viewerPointsBirthdayFilterInput?.addEventListener("change", () => {
      viewerPointsBirthdayFilter = String(viewerPointsBirthdayFilterInput.value ?? "all").trim();
      viewerPointsPageIndex = 0;
      renderViewerPointsLeaderboard();
    });

    viewerPointsClearFilterButton?.addEventListener("click", () => {
      viewerPointsSearchText = "";
      viewerPointsRoleFilter = "all";
      viewerPointsBalanceFilter = "all";
      viewerPointsBirthdayFilter = "all";
      viewerPointsPageIndex = 0;
      if (viewerPointsSearchInput) {
        viewerPointsSearchInput.value = "";
      }
      if (viewerPointsRoleFilterInput) {
        viewerPointsRoleFilterInput.value = "all";
      }
      if (viewerPointsBalanceFilterInput) {
        viewerPointsBalanceFilterInput.value = "all";
      }
      if (viewerPointsBirthdayFilterInput) {
        viewerPointsBirthdayFilterInput.value = "all";
      }
      renderViewerPointsLeaderboard();
    });

    viewerPointsPrevPageButton?.addEventListener("click", () => {
      viewerPointsPageIndex = Math.max(0, viewerPointsPageIndex - 1);
      renderViewerPointsLeaderboard();
    });

    viewerPointsNextPageButton?.addEventListener("click", () => {
      viewerPointsPageIndex += 1;
      renderViewerPointsLeaderboard();
    });

    viewerPointsUsersTableBody?.addEventListener("change", (event) => {
      const input = event.target.closest("[data-viewer-points-set]");
      if (!input) {
        return;
      }
      void setViewerPointsForUser(input.dataset.viewerPointsSet, input.value).catch((error) => {
        showToast(error.message || "Unable to set viewer points.", "error");
      });
    });

    viewerPointsUsersTableBody?.addEventListener("pointerover", (event) => {
      const cell = event.target.closest(".viewer-points-user-cell");
      if (cell) {
        positionViewerPointsNotePopover(cell);
      }
    });

    viewerPointsUsersTableBody?.addEventListener("focusin", (event) => {
      const cell = event.target.closest(".viewer-points-user-cell");
      if (cell) {
        positionViewerPointsNotePopover(cell);
      }
    });

    document.querySelectorAll("[data-viewer-points-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextKey = String(button.dataset.viewerPointsSort ?? "rank").trim() || "rank";
        if (viewerPointsSortKey === nextKey) {
          viewerPointsSortDirection = viewerPointsSortDirection === "asc" ? "desc" : "asc";
        } else {
          viewerPointsSortKey = nextKey;
          viewerPointsSortDirection = ["points", "gifts", "coins", "value", "likes", "comments", "shares", "firstActivity", "lastActivity", "roles"].includes(nextKey)
            ? "desc"
            : "asc";
        }
        viewerPointsPageIndex = 0;
        renderViewerPointsLeaderboard();
      });
    });

    viewerPointsUsersTableBody?.addEventListener("click", (event) => {
      const profileButton = event.target.closest("[data-viewer-points-open-profile]");
      if (profileButton) {
        const username = normalizeUserKey(profileButton.dataset.viewerPointsOpenProfile);
        if (username) {
          void app.openExternal(`https://www.tiktok.com/@${encodeURIComponent(username)}`).catch((error) => {
            showToast(error.message || "Unable to open TikTok profile.", "error");
          });
        }
        return;
      }

      const editNotesButton = event.target.closest("[data-viewer-points-edit-notes]");
      if (editNotesButton) {
        const username = normalizeUserKey(editNotesButton.dataset.viewerPointsEditNotes);
        const profile = state.sessionUserProfiles.get(username);
        openChatNotesPanel(username, profile?.nickname || username);
        return;
      }

      const clearPointsButton = event.target.closest("[data-viewer-points-clear-user-points]");
      if (clearPointsButton) {
        void clearViewerPointsForUser(clearPointsButton.dataset.viewerPointsClearUserPoints).catch((error) => {
          showToast(error.message || "Unable to clear viewer points.", "error");
        });
        return;
      }

      const deleteUserButton = event.target.closest("[data-viewer-points-delete-user]");
      if (deleteUserButton) {
        void deleteViewerPointsUser(deleteUserButton.dataset.viewerPointsDeleteUser).catch((error) => {
          showToast(error.message || "Unable to delete viewer.", "error");
        });
        return;
      }

      const addButton = event.target.closest("[data-viewer-points-quick-add]");
      const removeButton = event.target.closest("[data-viewer-points-quick-remove]");
      const username = addButton?.dataset.viewerPointsQuickAdd || removeButton?.dataset.viewerPointsQuickRemove || "";
      if (!username) {
        return;
      }
      if (viewerPointsAdjustUsernameInput) {
        viewerPointsAdjustUsernameInput.value = username;
      }
      if (viewerPointsAdjustAmountInput) {
        viewerPointsAdjustAmountInput.value = "10";
      }
      void adjustViewerPointsFromUi(addButton ? 1 : -1).catch((error) => {
        showToast(error.message || "Unable to adjust viewer points.", "error");
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
        ttsReadPunctuationInput,
        ttsElevenModeSelect,
        ttsElevenApiKeyInput,
        ttsElevenModelSelect,
        ttsXttsServiceUrlInput,
        ttsXttsLanguageSelect,
        ttsXttsSplitSentencesInput,
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
      ttsAudienceModeratorsInput,
      ttsSlowModeSecondsInput,
      ttsCooldownSecondsInput,
      ...Object.values(ttsModerationFilterInputs)
  ].forEach((element) => {
      element.addEventListener("change", () => {
        state.settings.ttsModeration = collectTtsModerationSettingsFromUi();
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
      commandFeedbackTemplateListcommandsInput,
      ttsMutedUsersInput,
      ttsShadowMutedUsersInput,
      ttsBlockedWordsInput
    ].forEach((element) => {
      element.addEventListener("input", () => {
        if (element === ttsMutedUsersInput || element === ttsShadowMutedUsersInput || element === ttsBlockedWordsInput) {
          state.settings.ttsModeration = collectTtsModerationSettingsFromUi();
          return;
        }
        scheduleSettingsSave();
      });
    });

  [ttsMutedUsersInput, ttsShadowMutedUsersInput, ttsBlockedWordsInput].forEach((element) => {
    element?.addEventListener("blur", () => {
      state.settings.ttsModeration = collectTtsModerationSettingsFromUi();
      state.forceTtsModerationRender = true;
      renderTtsModerationSettings();
      scheduleSettingsSave();
    });
  });

  ttsQueuePausedInput?.addEventListener("change", () => {
    state.ttsQueuePaused = Boolean(ttsQueuePausedInput.checked);
    if (!state.ttsQueuePaused) {
      resumePausedTtsQueues();
    }
    updateTtsStatus();
    renderTtsModerationSettings();
  });

  ttsLockButton?.addEventListener("click", () => {
    ttsAudienceAllInput.checked = false;
    ttsAudienceSubscribersInput.checked = true;
    ttsAudienceModeratorsInput.checked = true;
    updateTtsStatus();
    scheduleSettingsSave();
    showToast("TTS locked to subscribers and moderators.", "success");
  });

  ttsUnlockButton?.addEventListener("click", () => {
    ttsAudienceAllInput.checked = true;
    ttsAudienceSubscribersInput.checked = false;
    ttsAudienceModeratorsInput.checked = false;
    updateTtsStatus();
    scheduleSettingsSave();
    showToast("TTS unlocked for everyone.", "success");
  });

  ttsClearButton?.addEventListener("click", () => {
    clearAllQueuedPlaybackItems(["tts"]);
    showToast("TTS queue cleared.", "success");
  });

  ttsSkipButton?.addEventListener("click", () => {
    const runningItemId = findRunningTtsQueueItemId();
    if (!runningItemId) {
      showToast("No TTS message is currently playing.", "info");
      return;
    }
    clearQueuedPlaybackItem(runningItemId);
    showToast("Skipped current TTS message.", "success");
  });

  ttsClearTimeoutsButton?.addEventListener("click", () => {
    state.settings.ttsModeration = normalizeTtsModerationSettings({
      ...collectTtsModerationSettingsFromUi(),
      timedOutUsers: {}
    });
    renderTtsModerationSettings();
    scheduleSettingsSave();
    showToast("TTS timeouts cleared.", "success");
  });

  ttsModLogClearButton?.addEventListener("click", () => {
    state.ttsModeratorLog = [];
    renderTtsModeratorLog();
    showToast("Moderator command log cleared.", "info");
  });

      [ttsProviderSelect, ttsElevenModeSelect, ttsElevenApiKeyInput, ttsXttsServiceUrlInput, ttsXttsLanguageSelect, ttsXttsSplitSentencesInput].forEach((element) => {
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

  ttsXttsSampleBrowseButton?.addEventListener("click", () => {
    void (async () => {
      try {
        const result = await app.browseXttsSampleFile();
        const filePaths = Array.isArray(result?.filePaths) ? result.filePaths : result?.filePath ? [result.filePath] : [];
        if (!result?.canceled && filePaths.length && ttsXttsSampleFileInput) {
          const existingPaths = ttsXttsSampleFileInput.value
            .split(/\s*;\s*/)
            .map((samplePath) => samplePath.trim())
            .filter(Boolean);
          ttsXttsSampleFileInput.value = Array.from(new Set([...existingPaths, ...filePaths])).join("; ");
        }
      } catch (error) {
        showToast(error.message || "Unable to choose XTTS sample file.", "error");
      }
    })();
  });

  ttsXttsStartServiceButton?.addEventListener("click", () => {
    void startXttsServiceFromUi();
  });

  ttsXttsCheckServiceButton?.addEventListener("click", () => {
    void checkXttsServiceFromUi();
  });

  ttsXttsOpenHelpButton?.addEventListener("click", () => {
    showToast("Auto-start expects .venv-xtts\\Scripts\\python.exe and tools\\xtts_v2_service.py in the app folder. Or run your own XTTS server and set the XTTS service URL.", "info");
  });

  ttsCacheRefreshButton?.addEventListener("click", () => {
    void refreshTtsCacheInfo();
  });

  ttsCacheClearButton?.addEventListener("click", () => {
    void (async () => {
      const result = await app.clearTtsCache();
      showToast(`Cleared ${result?.deleted ?? 0} cached TTS files.`, "success");
      await refreshTtsCacheInfo();
    })().catch((error) => {
      showToast(error.message || "Unable to clear TTS cache.", "error");
    });
  });

  ttsXttsCreateVoiceButton?.addEventListener("click", () => {
    void addXttsVoiceFromUi().catch((error) => {
      showToast(error.message || "Unable to add XTTS voice.", "error");
    });
  });

  ttsXttsAddSampleButton?.addEventListener("click", () => {
    void addXttsSampleToSelectedVoiceFromUi().catch((error) => {
      showToast(error.message || "Unable to add sample to XTTS voice.", "error");
    });
  });

  ttsXttsDeleteVoiceButton?.addEventListener("click", () => {
    void deleteSelectedXttsVoiceFromUi().catch((error) => {
      showToast(error.message || "Unable to delete XTTS voice.", "error");
    });
  });

  ttsXttsExportVoiceButton?.addEventListener("click", () => {
    void exportSelectedXttsVoiceFromUi().catch((error) => {
      showToast(error.message || "Unable to export XTTS voice.", "error");
    });
  });

  ttsXttsImportVoiceButton?.addEventListener("click", () => {
    void importXttsVoiceFromUi().catch((error) => {
      showToast(error.message || "Unable to import XTTS voice.", "error");
    });
  });

  ttsVoiceLockGiftSearch?.addEventListener("input", () => {
    renderTtsVoiceLockGiftOptions();
  });

  ttsVoiceLockGiftOptions?.addEventListener("click", (event) => {
    const option = event.target.closest("[data-tts-voice-lock-gift-option]");
    if (!option) {
      return;
    }

    const giftName = String(option.dataset.ttsVoiceLockGiftOption ?? "").trim();
    if (ttsVoiceLockGiftSelect) {
      ttsVoiceLockGiftSelect.value = giftName;
    }
    state.settings.ttsVoiceLockGiftName = giftName;
    renderTtsVoiceLockGiftOptions();
    if (ttsVoiceLockGiftDropdown) {
      ttsVoiceLockGiftDropdown.open = false;
    }
    scheduleSettingsSave();
  });

      [ttsProviderSelect, ttsElevenModeSelect, ttsElevenModelSelect, ttsXttsServiceUrlInput, ttsXttsLanguageSelect, ttsXttsSplitSentencesInput, ttsVoiceSelect, ttsQueueSelect].forEach((element) => {
    element.addEventListener("change", () => {
      if (element === ttsVoiceSelect) {
        renderXttsVoiceTuning();
        if (shouldAutoStartXttsService()) {
          void startXttsServiceFromUi({ silent: true }).catch(() => {});
        }
      }
      persistSettings().catch((error) => {
        showToast(error.message || "Unable to save TTS settings.", "error");
      });
    });
  });

  [ttsXttsStrengthInput, ttsXttsEchoInput, ttsXttsReverbInput, ttsXttsRoboticInput, ttsXttsRateInput, ttsXttsPitchInput].forEach((element) => {
    element?.addEventListener("input", updateXttsTuningLabels);
  });

  ttsXttsSaveTuningButton?.addEventListener("click", () => {
    void saveSelectedXttsVoiceTuningFromUi().catch((error) => {
      showToast(error.message || "Unable to save XTTS voice tuning.", "error");
    });
  });

  ttsXttsResetTuningButton?.addEventListener("click", () => {
    void saveSelectedXttsVoiceTuningFromUi(normalizeXttsVoiceTuning()).catch((error) => {
      showToast(error.message || "Unable to reset XTTS voice tuning.", "error");
    });
  });

  ttsXttsRenameVoiceButton?.addEventListener("click", () => {
    void renameSelectedXttsVoiceFromUi().catch((error) => {
      showToast(error.message || "Unable to rename XTTS voice.", "error");
    });
  });

  ttsXttsDeleteTuningVoiceButton?.addEventListener("click", () => {
    void deleteSelectedXttsVoiceFromUi().catch((error) => {
      showToast(error.message || "Unable to delete XTTS voice.", "error");
    });
  });

  ttsRateInput.addEventListener("input", updateRatePitchVolumeLabels);
  ttsPitchInput.addEventListener("input", updateRatePitchVolumeLabels);

  votingTestButton?.addEventListener("click", () => {
    startVotingOverlayTest();
  });
  ttsVolumeInput.addEventListener("input", updateRatePitchVolumeLabels);

  ttsTestButton.addEventListener("click", () => {
    void testSelectedTtsVoiceFromUi().catch((error) => {
      const message = error.message || "Unable to test the selected TTS voice.";
      showToast(message, "error");
      setStatusMessage(ttsStatus, "error", message);
    });
  });

  ttsTestTextInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }
    event.preventDefault();
    ttsTestButton.click();
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
    const customRuleSoundSearchTimers = new Map();
    const scheduleCustomRuleSoundSearch = (ruleId, searchText) => {
      const existingTimer = customRuleSoundSearchTimers.get(ruleId);
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }
      customRuleSoundSearchTimers.set(ruleId, window.setTimeout(() => {
        customRuleSoundSearchTimers.delete(ruleId);
        void refreshRuleSoundOptions(ruleId, searchText);
      }, 300));
    };

    addCustomRuleButton.addEventListener("click", async () => {
      void ensureSoundCatalog();
      void refreshKnownTikTokGiftCatalog();
      const nextRule = createDraftRule();
      state.settings.customEventRules = [...state.settings.customEventRules, nextRule];
      state.activeCustomRuleId = nextRule.id;
      resetCustomRuleFilters();
      openEventActionsWorkspace({ preferInline: true });
      renderCustomRules();
      refreshSpinWheelActionOptions();
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
      refreshSpinWheelActionOptions();
      await persistSettings({ customEventRules: state.settings.customEventRules });
      focusCustomRuleEditor(duplicatedRule.id);
      showToast("Custom event action duplicated.", "success");
      return;
    }

    const previewSoundId = target.dataset.customPreviewSound;
    if (previewSoundId) {
      const selectedId = updateRuleSoundSelectionFromSearch(previewSoundId);
      const searchValue = String(document.querySelector(`[data-rule-sound-search="${previewSoundId}"]`)?.value ?? "").trim();
      if (searchValue && !selectedId) {
        showToast("Choose a sound from the search results before previewing.", "info");
        return;
      }
      await previewCustomRuleSound(previewSoundId);
      return;
    }

    const browseSoundId = target.dataset.customBrowseSound;
    if (browseSoundId) {
      try {
        const result = await app.browseLocalSoundFile();
        if (result?.canceled) {
          return;
        }
        const selectedInput = document.querySelector(`[data-rule-sound-select="${browseSoundId}"]`);
        const searchInput = document.querySelector(`[data-rule-sound-search="${browseSoundId}"]`);
        if (selectedInput) {
          selectedInput.value = String(result.soundId ?? "");
        }
        if (searchInput) {
          searchInput.value = String(result.name ?? "Local sound file");
        }
        showToast(`Selected local sound: ${result.name ?? "audio file"}.`, "success");
      } catch (error) {
        showToast(error.message || "Unable to browse for a local sound file.", "error");
      }
      return;
    }

    const clearDisableWindowId = target.dataset.ruleClearDisableWindow;
    if (clearDisableWindowId) {
      const startInput = document.querySelector(`[data-rule-disable-window-start="${clearDisableWindowId}"]`);
      const endInput = document.querySelector(`[data-rule-disable-window-end="${clearDisableWindowId}"]`);
      if (startInput) {
        startInput.value = "";
      }
      if (endInput) {
        endInput.value = "";
      }
      showToast("Auto-disable times cleared.", "info");
      return;
    }

    const giftRefreshRuleId = target.dataset.ruleGiftRefresh;
    if (giftRefreshRuleId) {
      setGiftTriggerStatus(giftRefreshRuleId, "Refreshing gifts from TikTok LIVE...");
      const refreshUsername = state.connected && state.username
        ? state.username
        : usernameInput?.value || state.settings?.rememberedUsername || "";
      const result = await refreshKnownTikTokGiftCatalog(refreshUsername);
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
      refreshSpinWheelActionOptions();
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
      const metricInput = document.querySelector(`[data-rule-metric="${saveId}"]`);
      const thresholdInput = document.querySelector(`[data-rule-threshold="${saveId}"]`);
      const userCooldownInput = document.querySelector(`[data-rule-user-cooldown="${saveId}"]`);
      const disableWindowStartInput = document.querySelector(`[data-rule-disable-window-start="${saveId}"]`);
      const disableWindowEndInput = document.querySelector(`[data-rule-disable-window-end="${saveId}"]`);
      const soundSelect = document.querySelector(`[data-rule-sound-select="${saveId}"]`);
      const queueSelect = document.querySelector(`[data-rule-queue="${saveId}"]`);
      const webhookUrlInput = document.querySelector(`[data-rule-webhook-url="${saveId}"]`);
      const feedbackOverlayEnabledInput = document.querySelector(`[data-rule-feedback-overlay-enabled="${saveId}"]`);
      const feedbackOverlayTitleInput = document.querySelector(`[data-rule-feedback-overlay-title="${saveId}"]`);
      const feedbackOverlayMessageInput = document.querySelector(`[data-rule-feedback-overlay-message="${saveId}"]`);
      const feedbackOverlayAccentInput = document.querySelector(`[data-rule-feedback-overlay-accent="${saveId}"]`);
      const triggerAudienceInput = document.querySelector(`[data-rule-trigger-audience="${saveId}"]`);
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
      const disableWindowStartTime = normalizeRuleTimeValue(disableWindowStartInput?.value ?? "");
      const disableWindowEndTime = normalizeRuleTimeValue(disableWindowEndInput?.value ?? "");

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
        disableWindowStartTime,
        disableWindowEndTime,
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

      if (String(document.querySelector(`[data-rule-sound-search="${saveId}"]`)?.value ?? "").trim() && !updatedRule.soundId) {
        showToast("Choose a sound from the search results or browse for a local file before saving this sound.", "error");
        return;
      }

      state.settings.customEventRules = state.settings.customEventRules.map((rule) =>
        rule.id === saveId ? updatedRule : rule
      );
      state.activeCustomRuleId = null;
      clearRuleTriggerState(saveId);
      await persistSettings({ customEventRules: state.settings.customEventRules });
      refreshSpinWheelActionOptions();
      showToast("Custom event action saved.", "success");
    }
  });

  customRuleList.addEventListener("input", (event) => {
    const searchId = event.target.dataset.ruleSoundSearch;
    if (searchId) {
      updateRuleSoundSelectionFromSearch(searchId);
      scheduleCustomRuleSoundSearch(searchId, event.target.value);
      return;
    }

    const giftSearchRuleId = event.target.dataset.ruleGiftSearch;
    if (giftSearchRuleId) {
      renderGiftOptionList(giftSearchRuleId, event.target.value);
      return;
    }

    const emoteSearchRuleId = event.target.dataset.ruleEmoteSearch;
    if (emoteSearchRuleId) {
      const metric = document.querySelector(`[data-rule-metric="${emoteSearchRuleId}"]`)?.value ?? "subEmote";
      renderEmoteOptionList(emoteSearchRuleId, metric, event.target.value);
    }
  });

  customRuleList.addEventListener("change", async (event) => {
    const soundSearchRuleId = event.target.dataset.ruleSoundSearch;
    if (soundSearchRuleId) {
      updateRuleSoundSelectionFromSearch(soundSearchRuleId);
      void refreshRuleSoundOptions(soundSearchRuleId, event.target.value);
      return;
    }

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
    refreshSpinWheelActionOptions();
    showToast(`Custom action ${nextEnabled ? "enabled" : "disabled"}.`, "success");
  });

  customRuleList.addEventListener("click", (event) => {
    const emoteOption = event.target.closest("[data-rule-emote-option]");
    if (emoteOption) {
      const ruleId = emoteOption.dataset.ruleEmoteOption;
      const emoteId = String(emoteOption.dataset.ruleEmoteId ?? "").trim();
      const emoteName = String(emoteOption.dataset.ruleEmoteName ?? "").trim();
      const emoteImageUrl = String(emoteOption.dataset.ruleEmoteImageUrl ?? "").trim();
      const metric = document.querySelector(`[data-rule-metric="${ruleId}"]`)?.value ?? "subEmote";
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

function wireLikeRaceEvents() {
  const settingInputs = [
    likeRaceEnabledInput,
    likeRaceCountdownInput,
    likeRaceDistanceInput,
    likeRaceLikeMultiplierInput,
    likeRaceGiftMultiplierInput,
    likeRaceMaxRacersInput,
    likeRaceInactiveTimeoutInput,
    likeRaceCentreMessageSecondsInput,
    likeRaceOverlayAutoHideSecondsInput,
    likeRaceStartRoleInput,
    likeRaceCountdownSoundInput,
    likeRaceFinishSoundInput,
    likeRaceAllowLateJoinsInput,
    likeRaceAutoRemoveInactiveInput,
    likeRaceAnimationsInput,
    likeRaceTtsEnabledInput,
    likeRaceSillyCommentaryInput,
    likeRaceHypeCommentaryInput,
    likeRaceRoastCommentaryInput,
    likeRaceFamilyFilterInput,
    likeRaceDisqualifyEarlyTappersInput,
    likeRaceTrackColorInput,
    likeRaceAccentColorInput,
    likeRaceAvatarSizeInput,
    likeRaceUsernameSizeInput,
    likeRaceOverlayOpacityInput,
    likeRaceBackgroundColorInput,
    likeRaceBackgroundImageInput,
    likeRaceTitleColorInput,
    likeRaceTitleSizeInput,
    likeRaceLabelColorInput,
    likeRaceLabelSizeInput,
    likeRaceMutedColorInput,
    likeRaceCommentarySizeInput
  ].filter(Boolean);

  const updateSettings = () => {
    state.settings.likeRaceSettings = collectLikeRaceSettingsFromUi();
    scheduleSettingsSave();
    syncLikeRaceOverlayState();
    renderLikeRaceSummary();
  };

  settingInputs.forEach((input) => {
    input.addEventListener("change", updateSettings);
    input.addEventListener("input", updateSettings);
  });

  likeRaceCommentaryStyleInput?.addEventListener("change", () => {
    state.settings.likeRaceSettings = collectLikeRaceSettingsFromUi();
    scheduleSettingsSave();
    syncLikeRaceOverlayState();
    renderLikeRaceCommentaryEditor();
    renderLikeRaceSummary();
  });

  const likeRaceSoundSearchTimers = new Map();
  const scheduleLikeRaceSoundSearch = (type, input) => {
    if (!input) {
      return;
    }

    const existingTimer = likeRaceSoundSearchTimers.get(type);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    likeRaceSoundSearchTimers.set(type, window.setTimeout(() => {
      likeRaceSoundSearchTimers.delete(type);
      void refreshLikeRaceSoundOptions(type, input.value);
    }, 300));
  };

  likeRaceCountdownSoundSearchInput?.addEventListener("input", () => {
    updateLikeRaceSoundSelectionFromSearch("countdown", { save: true });
    scheduleLikeRaceSoundSearch("countdown", likeRaceCountdownSoundSearchInput);
  });

  likeRaceFinishSoundSearchInput?.addEventListener("input", () => {
    updateLikeRaceSoundSelectionFromSearch("finish", { save: true });
    scheduleLikeRaceSoundSearch("finish", likeRaceFinishSoundSearchInput);
  });

  likeRaceCountdownSoundSearchInput?.addEventListener("change", () => {
    updateLikeRaceSoundSelectionFromSearch("countdown", { save: true });
    void refreshLikeRaceSoundOptions("countdown", likeRaceCountdownSoundSearchInput.value);
  });

  likeRaceFinishSoundSearchInput?.addEventListener("change", () => {
    updateLikeRaceSoundSelectionFromSearch("finish", { save: true });
    void refreshLikeRaceSoundOptions("finish", likeRaceFinishSoundSearchInput.value);
  });

  likeRaceCountdownSoundPreviewButton?.addEventListener("click", () => {
    void previewLikeRaceConfiguredSound("countdown");
  });

  likeRaceFinishSoundPreviewButton?.addEventListener("click", () => {
    void previewLikeRaceConfiguredSound("finish");
  });

  likeRaceCommentaryList?.addEventListener("input", (event) => {
    if (!event.target.matches("[data-like-race-commentary]")) {
      return;
    }
    state.settings.likeRaceSettings = collectLikeRaceSettingsFromUi();
    saveLikeRaceCommentaryAfterTyping();
  });

  likeRaceCommentaryList?.addEventListener("focusout", (event) => {
    if (!event.target.matches("[data-like-race-commentary]")) {
      return;
    }
    flushLikeRaceCommentarySave();
  });

  likeRaceStartButton?.addEventListener("click", () => {
    state.settings.likeRaceSettings = collectLikeRaceSettingsFromUi();
    startLikeRaceCountdown();
  });

  likeRaceEndButton?.addEventListener("click", () => endLikeRace(true));

  likeRaceResetButton?.addEventListener("click", () => {
    resetLikeRace();
    showToast("Like Race reset.", "success");
  });

  const startTestRace = () => {
    state.settings.likeRaceSettings = {
      ...collectLikeRaceSettingsFromUi(),
      enabled: true
    };
    resetLikeRace({ keepLobby: true });
    [
      { user: "racer_one", nickname: "Racer One" },
      { user: "tapqueen", nickname: "TapQueen" },
      { user: "giftboost", nickname: "GiftBoost" },
      { user: "latecharger", nickname: "LateCharger" }
    ].forEach((sample) => addLikeRaceRacer(sample, { test: true }));
    startLikeRaceCountdown(3, Math.max(100, Number(likeRaceDistanceInput?.value) || 1000), { test: true });
    window.setTimeout(() => {
      const race = getLikeRace();
      if (race.raceStatus !== "running") {
        return;
      }
      moveLikeRaceRacer({ user: "racer_one", nickname: "Racer One" }, race.totalSpaces * 0.32, { type: "like", likes: 32 });
      moveLikeRaceRacer({ user: "tapqueen", nickname: "TapQueen" }, race.totalSpaces * 0.48, { type: "like", likes: 48 });
      moveLikeRaceRacer({ user: "giftboost", nickname: "GiftBoost" }, race.totalSpaces * 0.62, { type: "gift", giftName: "Rose", giftCoins: 20, giftCount: 20 });
      moveLikeRaceRacer({ user: "latecharger", nickname: "LateCharger" }, race.totalSpaces * 1.05, { type: "gift", giftName: "Lion", giftCoins: 29999, giftCount: 1 });
    }, 4200);
    showToast("Like Race overlay test started.", "success");
  };

  likeRaceTestOverlayButton?.addEventListener("click", startTestRace);
  likeRaceOverlayTestButton?.addEventListener("click", startTestRace);

  likeRaceTestTtsButton?.addEventListener("click", () => {
    queueLikeRaceCommentary("leadChange", { user: "Test Racer", position: 1 }, { force: true, forceTts: true });
  });

  likeRaceOverlayCopyButton?.addEventListener("click", async () => {
    const overlayUrl = likeRaceOverlayUrlInput?.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The Like Race overlay URL is not ready yet.", "error");
      return;
    }
    await navigator.clipboard.writeText(overlayUrl);
    showToast("Like Race overlay URL copied.", "success");
  });

  likeRaceOverlayOpenButton?.addEventListener("click", async () => {
    const overlayUrl = likeRaceOverlayUrlInput?.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The Like Race overlay URL is not ready yet.", "error");
      return;
    }
    await app.openExternal(overlayUrl);
  });

  likeRaceResetCommentaryButton?.addEventListener("click", () => {
    state.settings.likeRaceSettings = normalizeLikeRaceSettings({
      ...state.settings.likeRaceSettings,
      commentaryPhrases: cloneLikeRaceCommentaryPreset(state.settings.likeRaceSettings?.commentaryStyle || "sports")
    });
    renderLikeRaceSettings();
    scheduleSettingsSave();
    showToast("Like Race commentary reset to defaults.", "success");
  });
}

function wireSpinWheelEvents() {
  const saveSpinWheelSettings = () => {
    state.settings.spinWheelSettings = collectSpinWheelSettingsFromUi();
    scheduleSettingsSave();
    syncSpinWheelOverlayState();
  };

  [
    spinWheelEnabledInput,
    spinWheelCommandEnabledInput,
    spinWheelDurationInput,
    spinWheelResultDurationInput,
    spinWheelArrowPositionInput,
    spinWheelEventRuleSelect
  ].filter(Boolean).forEach((input) => {
    input.addEventListener("change", saveSpinWheelSettings);
    input.addEventListener("input", saveSpinWheelSettings);
  });

  spinWheelSegmentsList?.addEventListener("input", saveSpinWheelSettings);
  spinWheelSegmentsList?.addEventListener("change", saveSpinWheelSettings);
  spinWheelSegmentsList?.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-spin-wheel-delete-segment]");
    if (!deleteButton) {
      return;
    }
    const segmentId = String(deleteButton.dataset.spinWheelDeleteSegment ?? "").trim();
    const current = collectSpinWheelSettingsFromUi();
    if (current.segments.length <= 2) {
      showToast("Keep at least two wheel segments.", "info");
      return;
    }
    state.settings.spinWheelSettings = normalizeSpinWheelSettings({
      ...current,
      segments: current.segments.filter((segment) => segment.id !== segmentId)
    });
    renderSpinWheelSettings();
    scheduleSettingsSave();
    syncSpinWheelOverlayState();
  });

  spinWheelAddSegmentButton?.addEventListener("click", () => {
    const current = collectSpinWheelSettingsFromUi();
    if (current.segments.length >= 16) {
      showToast("The Spin Wheel supports up to 16 segments.", "info");
      return;
    }
    const palette = createDefaultSpinWheelSettings().segments.map((segment) => segment.color);
    state.settings.spinWheelSettings = normalizeSpinWheelSettings({
      ...current,
      segments: [
        ...current.segments,
        {
          id: `spin-action-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
          label: `Action ${current.segments.length + 1}`,
          color: palette[current.segments.length % palette.length],
          actionRuleId: ""
        }
      ]
    });
    renderSpinWheelSettings();
    scheduleSettingsSave();
    syncSpinWheelOverlayState();
  });

  spinWheelGiftSearchInput?.addEventListener("input", () => {
    updateSpinWheelGiftPicker(collectSpinWheelSettingsFromUi());
  });

  spinWheelGiftOptions?.addEventListener("click", (event) => {
    const option = event.target.closest("[data-spin-wheel-gift-option]");
    if (!option) {
      return;
    }
    const giftName = String(option.dataset.spinWheelGiftOption ?? "").trim();
    if (spinWheelGiftNameInput) {
      spinWheelGiftNameInput.value = giftName;
    }
    if (spinWheelGiftDropdown) {
      spinWheelGiftDropdown.open = false;
    }
    saveSpinWheelSettings();
    updateSpinWheelGiftPicker(state.settings.spinWheelSettings);
  });

  spinWheelTestButton?.addEventListener("click", () => {
    state.settings.spinWheelSettings = {
      ...collectSpinWheelSettingsFromUi(),
      enabled: true
    };
    renderSpinWheelSettings();
    void startSpinWheel({ user: "testviewer", nickname: "Test Viewer" }, { source: "manual", force: true });
  });

  spinWheelOverlayCopyButton?.addEventListener("click", async () => {
    const overlayUrl = spinWheelOverlayUrlInput?.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The Spin Wheel overlay URL is not ready yet.", "error");
      return;
    }
    await navigator.clipboard.writeText(overlayUrl);
    showToast("Spin Wheel overlay URL copied.", "success");
  });

  spinWheelOverlayOpenButton?.addEventListener("click", async () => {
    const overlayUrl = spinWheelOverlayUrlInput?.value.trim();
    if (!overlayUrl || overlayUrl === "Overlay unavailable" || overlayUrl === "Loading...") {
      showToast("The Spin Wheel overlay URL is not ready yet.", "error");
      return;
    }
    await app.openExternal(overlayUrl);
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
    loadOverlayDesignerInfo(),
    loadSpinWheelOverlayInfo()
  ]);

  void refreshKnownTikTokGiftCatalog();

  updateTtsStatus();
  updateTranslationStatus();
  updateUpdateStatus();
  renderChatList();
  startCustomRuleScheduleMonitor();
  syncQueueOverlayState();
  syncChatOverlayState();
  syncGiftOverlayState();
  syncLikesOverlayState();
  syncViewerStatsOverlayState();
  syncVoteOverlayState();
  syncLikeRaceOverlayState();
  syncSpinWheelOverlayState();
}

wireHeaderEvents();
wireAuthEvents();
wireChatToolbarEvents();
wireTabEvents();
wireOverlayDesignerEvents();
wireSettingsEvents();
wireCustomRuleEvents();
wireLikeRaceEvents();
wireSpinWheelEvents();
wireAppEvents();
initializeCollapsibleCards();
applyMainScreenPinnedCards();
setActiveTab("controls");
updateRatePitchVolumeLabels();
updateUpdateStatus();
setConnectionUiState();
void refreshTtsCacheInfo();

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
