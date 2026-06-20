const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopApp", {
  connect(username) {
    return ipcRenderer.invoke("live:connect", { username });
  },
  disconnect() {
    return ipcRenderer.invoke("live:disconnect");
  },
  getConnectionState() {
    return ipcRenderer.invoke("live:get-state");
  },
  getAvailableTikTokGifts(username) {
    return ipcRenderer.invoke("tiktok:get-available-gifts", { username });
  },
  getAuthenticatedTikTokEmotes(payload) {
    return ipcRenderer.invoke("tiktok:get-authenticated-emotes", payload);
  },
  beginTikTokSignIn() {
    return ipcRenderer.invoke("tiktok:sign-in");
  },
  signOutTikTok() {
    return ipcRenderer.invoke("tiktok:sign-out");
  },
  beginSpotifySignIn(payload) {
    return ipcRenderer.invoke("spotify:sign-in", payload);
  },
  spotifyPlayTrack(payload) {
    return ipcRenderer.invoke("spotify:play-track", payload);
  },
  spotifySkipTrack(payload) {
    return ipcRenderer.invoke("spotify:skip-track", payload);
  },
  spotifyGetMe(payload) {
    return ipcRenderer.invoke("spotify:get-me", payload);
  },
  getVoicemodVoices(payload) {
    return ipcRenderer.invoke("voicemod:get-voices", payload);
  },
  getCurrentVoicemodVoice(payload) {
    return ipcRenderer.invoke("voicemod:get-current-voice", payload);
  },
  setVoicemodVoice(payload) {
    return ipcRenderer.invoke("voicemod:set-voice", payload);
  },
  getAppVersion() {
    return ipcRenderer.invoke("app:get-version");
  },
  getQueueOverlayInfo() {
    return ipcRenderer.invoke("overlay:get-queue-info");
  },
  updateQueueOverlayState(payload) {
    return ipcRenderer.invoke("overlay:update-queue-state", payload);
  },
  getCommandFeedbackOverlayInfo() {
    return ipcRenderer.invoke("overlay:get-command-feedback-info");
  },
  updateCommandFeedbackOverlayState(payload) {
    return ipcRenderer.invoke("overlay:update-command-feedback-state", payload);
  },
  getJokeOverlayInfo() {
    return ipcRenderer.invoke("overlay:get-joke-info");
  },
  updateJokeOverlayState(payload) {
    return ipcRenderer.invoke("overlay:update-joke-state", payload);
  },
  getLikeRaceOverlayInfo() {
    return ipcRenderer.invoke("overlay:get-like-race-info");
  },
  updateLikeRaceOverlayState(payload) {
    return ipcRenderer.invoke("overlay:update-like-race-state", payload);
  },
  getSpinWheelOverlayInfo() {
    return ipcRenderer.invoke("overlay:get-spin-wheel-info");
  },
  updateSpinWheelOverlayState(payload) {
    return ipcRenderer.invoke("overlay:update-spin-wheel-state", payload);
  },
  getProgressBarOverlayInfo() {
    return ipcRenderer.invoke("overlay:get-progress-bar-info");
  },
  updateProgressBarOverlayState(payload) {
    return ipcRenderer.invoke("overlay:update-progress-bar-state", payload);
  },
  getOverlayDesignerInfo() {
    return ipcRenderer.invoke("overlay:get-designer-info");
  },
  updateOverlayDesignerState(payload) {
    return ipcRenderer.invoke("overlay:update-designer-state", payload);
  },
  openExternal(url) {
    return ipcRenderer.invoke("app:open-external", { url });
  },
  quitApp() {
    return ipcRenderer.invoke("app:quit");
  },
  factoryResetAppData(payload) {
    return ipcRenderer.invoke("app:factory-reset", payload);
  },
  getSettings() {
    return ipcRenderer.invoke("app:get-settings");
  },
  saveSettings(settings) {
    return ipcRenderer.invoke("app:save-settings", settings);
  },
  getSystemUsage() {
    return ipcRenderer.invoke("app:get-system-usage");
  },
  exportSettingsBundle(payload) {
    return ipcRenderer.invoke("app:export-settings-bundle", payload);
  },
  importSettingsBundle() {
    return ipcRenderer.invoke("app:import-settings-bundle");
  },
  translateText(payload) {
    return ipcRenderer.invoke("translation:translate", payload);
  },
  getTtsVoices(payload) {
    return ipcRenderer.invoke("tts:get-voices", payload);
  },
  getElevenLabsUsage(payload) {
    return ipcRenderer.invoke("tts:get-elevenlabs-usage", payload);
  },
  browseXttsSampleFile() {
    return ipcRenderer.invoke("tts:browse-xtts-sample-file");
  },
  exportXttsVoice(payload) {
    return ipcRenderer.invoke("tts:export-xtts-voice", payload);
  },
  importXttsVoice() {
    return ipcRenderer.invoke("tts:import-xtts-voice");
  },
  checkXttsService(payload) {
    return ipcRenderer.invoke("tts:check-xtts-service", payload);
  },
  startXttsService(payload) {
    return ipcRenderer.invoke("tts:start-xtts-service", payload);
  },
  getXttsRuntimeStatus() {
    return ipcRenderer.invoke("tts:get-xtts-runtime-status");
  },
  openXttsRuntimeFolder() {
    return ipcRenderer.invoke("tts:open-xtts-runtime-folder");
  },
  installXttsRuntime(payload) {
    return ipcRenderer.invoke("tts:install-xtts-runtime", payload);
  },
  removeXttsRuntime() {
    return ipcRenderer.invoke("tts:remove-xtts-runtime");
  },
  getTtsCacheInfo() {
    return ipcRenderer.invoke("tts:get-cache-info");
  },
  clearTtsCache() {
    return ipcRenderer.invoke("tts:clear-cache");
  },
  speakToFile(payload) {
    return ipcRenderer.invoke("tts:speak-to-file", payload);
  },
  deleteTtsFile(filePath) {
    return ipcRenderer.invoke("tts:delete-file", { filePath });
  },
  getSoundAlertCatalog(options = false) {
    const payload = typeof options === "object" && options !== null
      ? options
      : { refresh: Boolean(options) };
    return ipcRenderer.invoke("sound-alerts:get-catalog", payload);
  },
  resolveSoundAlertAudio(soundId) {
    return ipcRenderer.invoke("sound-alerts:resolve-audio", { soundId });
  },
  browseLocalSoundFile() {
    return ipcRenderer.invoke("sound-alerts:browse-local-file");
  },
  browseEventActionMediaFile() {
    return ipcRenderer.invoke("event-actions:browse-media-file");
  },
  resolveEventActionMedia(mediaId) {
    return ipcRenderer.invoke("event-actions:resolve-media", { mediaId });
  },
  onChat(callback) {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on("live-chat", handler);
    return () => ipcRenderer.removeListener("live-chat", handler);
  },
  onStatus(callback) {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on("live-status", handler);
    return () => ipcRenderer.removeListener("live-status", handler);
  },
  onUpdateStatus(callback) {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on("update-status", handler);
    return () => ipcRenderer.removeListener("update-status", handler);
  }
});
