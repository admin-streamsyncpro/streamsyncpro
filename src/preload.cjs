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
  getAppVersion() {
    return ipcRenderer.invoke("app:get-version");
  },
  getSettings() {
    return ipcRenderer.invoke("app:get-settings");
  },
  saveSettings(settings) {
    return ipcRenderer.invoke("app:save-settings", settings);
  },
  translateText(payload) {
    return ipcRenderer.invoke("translation:translate", payload);
  },
  getTtsVoices() {
    return ipcRenderer.invoke("tts:get-voices");
  },
  speakToFile(payload) {
    return ipcRenderer.invoke("tts:speak-to-file", payload);
  },
  deleteTtsFile(filePath) {
    return ipcRenderer.invoke("tts:delete-file", { filePath });
  },
  configureUpdates(config) {
    return ipcRenderer.invoke("updates:configure", config);
  },
  checkForUpdates() {
    return ipcRenderer.invoke("updates:check");
  },
  installUpdate() {
    return ipcRenderer.invoke("updates:install");
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
