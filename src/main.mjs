import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { execFile } from "node:child_process";
import log from "electron-log";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import electronUpdater from "electron-updater";
import {
  connectToLive,
  disconnectFromLive,
  getConnectionState
} from "./tiktok-client.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { NsisUpdater } = electronUpdater;
const execFileAsync = promisify(execFile);
const TTS_SCRIPT_PATH = path.join(os.tmpdir(), "tiktok-live-reader-tts.ps1");
const DEFAULT_GITHUB_OWNER = "admin-streamsyncpro";
const DEFAULT_GITHUB_REPO = "streamsyncpro";

let mainWindow = null;
let updateConfig = null;
let updater = null;
let hasCheckedForUpdatesOnLaunch = false;
let settings = {
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

log.initialize();

function sendToRenderer(channel, payload) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send(channel, payload);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 780,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: "#f5efe6",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

function getSettingsPath() {
  return path.join(app.getPath("userData"), "settings.json");
}

async function loadSettings() {
  try {
    const raw = await fs.readFile(getSettingsPath(), "utf8");
    settings = {
      ...settings,
      ...JSON.parse(raw)
    };
  } catch (error) {
    if (error.code !== "ENOENT") {
      log.error("Failed to read settings", error);
    }
  }

  if (typeof settings.ttsAudience === "string") {
    settings.ttsAudience =
      settings.ttsAudience === "subscribers"
        ? { allViewers: false, subscribers: true, moderators: false }
        : settings.ttsAudience === "moderators"
          ? { allViewers: false, subscribers: false, moderators: true }
          : { allViewers: true, subscribers: false, moderators: false };
  }

  // Keep updater settings pinned to the built-in GitHub Releases repo.
  settings.githubOwner = DEFAULT_GITHUB_OWNER;
  settings.githubRepo = DEFAULT_GITHUB_REPO;

  updateConfig = getGitHubUpdateConfig(settings);
}

async function saveSettings(partialSettings) {
  settings = {
    ...settings,
    ...partialSettings
  };

  // Ignore stale or mistyped repo settings from older builds.
  settings.githubOwner = DEFAULT_GITHUB_OWNER;
  settings.githubRepo = DEFAULT_GITHUB_REPO;

  updateConfig = getGitHubUpdateConfig(settings);

  await fs.mkdir(app.getPath("userData"), { recursive: true });
  await fs.writeFile(getSettingsPath(), JSON.stringify(settings, null, 2), "utf8");
}

function getGitHubUpdateConfig(sourceSettings = settings) {
  const owner = sourceSettings.githubOwner?.trim() || DEFAULT_GITHUB_OWNER;
  const repo = sourceSettings.githubRepo?.trim() || DEFAULT_GITHUB_REPO;

  if (!owner || !repo) {
    return null;
  }

  return {
    owner,
    repo,
    releaseType: "release"
  };
}

async function translateText({ text, targetLanguage, providerUrl, apiKey }) {
  const normalizedText = text?.trim();
  if (!normalizedText) {
    return {
      translatedText: text ?? "",
      detectedLanguage: null
    };
  }

  const explicitProvider = (providerUrl || settings.translationProviderUrl || "").trim();
  const target = targetLanguage || settings.translationTargetLanguage || "en";

  if (!explicitProvider || explicitProvider === "google-free") {
    const query = new URLSearchParams({
      client: "gtx",
      sl: "auto",
      tl: target,
      dt: "t",
      q: normalizedText
    });
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?${query}`);

    if (!response.ok) {
      throw new Error(`Translation failed with status ${response.status}.`);
    }

    const result = await response.json();
    const translatedText = Array.isArray(result?.[0])
      ? result[0].map((part) => part?.[0] ?? "").join("")
      : "";

    if (!translatedText) {
      throw new Error("Translator returned an invalid response.");
    }

    return {
      translatedText,
      detectedLanguage: result?.[2] ?? null
    };
  }

  const payload = {
    q: normalizedText,
    source: "auto",
    target,
    format: "text"
  };

  const effectiveApiKey = (apiKey || settings.translationApiKey || "").trim();
  if (effectiveApiKey) {
    payload.api_key = effectiveApiKey;
  }

  const response = await fetch(explicitProvider, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Translation failed with status ${response.status}.`);
  }

  const result = await response.json();
  if (!result?.translatedText) {
    throw new Error("Translation provider returned an invalid response.");
  }

  return {
    translatedText: result.translatedText,
    detectedLanguage: result.detectedLanguage?.language ?? null
  };
}

async function ensureTtsScript() {
  const script = `
param(
  [Parameter(Mandatory=$true)][string]$Mode,
  [string]$OutputPath = "",
  [string]$VoiceName = "",
  [int]$Rate = 0,
  [int]$Pitch = 0,
  [string]$Text = ""
)

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

try {
  if ($Mode -eq "list") {
    $voices = $synth.GetInstalledVoices() | ForEach-Object {
      [PSCustomObject]@{
        name = $_.VoiceInfo.Name
        culture = $_.VoiceInfo.Culture.Name
        gender = $_.VoiceInfo.Gender.ToString()
      }
    }
    $voices | ConvertTo-Json -Compress
    exit 0
  }

  if ($VoiceName) {
    $synth.SelectVoice($VoiceName)
  }

  $safeRate = [Math]::Max(-10, [Math]::Min(10, $Rate))
  $synth.Rate = $safeRate
  $synth.Volume = 100

  $escapedText = [System.Security.SecurityElement]::Escape($Text)
  $pitchPrefix = "+"
  if ($Pitch -lt 0) { $pitchPrefix = "" }
  $ssml = "<speak version='1.0' xml:lang='en-US'><prosody pitch='$pitchPrefix$Pitch%'>$escapedText</prosody></speak>"

  $synth.SetOutputToWaveFile($OutputPath)
  $synth.SpeakSsml($ssml)
  $synth.SetOutputToNull()
  Write-Output $OutputPath
} finally {
  $synth.Dispose()
}
`;

  await fs.writeFile(TTS_SCRIPT_PATH, script, "utf8");
}

function mapRateToSapi(rateValue) {
  const rate = Number(rateValue) || 1;
  return Math.round((rate - 1) * 10);
}

function mapPitchToPercent(pitchValue) {
  const pitch = Number(pitchValue) || 1;
  return Math.round((pitch - 1) * 100);
}

async function listWindowsTtsVoices() {
  await ensureTtsScript();
  const { stdout } = await execFileAsync("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    TTS_SCRIPT_PATH,
    "-Mode",
    "list"
  ]);

  const parsed = JSON.parse(stdout || "[]");
  return Array.isArray(parsed) ? parsed : [parsed];
}

async function synthesizeSpeechToFile({ text, voiceName, rate, pitch }) {
  await ensureTtsScript();

  const outputPath = path.join(
    os.tmpdir(),
    `tiktok-live-reader-${Date.now()}-${Math.random().toString(16).slice(2)}.wav`
  );

  await execFileAsync("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    TTS_SCRIPT_PATH,
    "-Mode",
    "speak",
    "-OutputPath",
    outputPath,
    "-VoiceName",
    voiceName ?? "",
    "-Rate",
    String(mapRateToSapi(rate)),
    "-Pitch",
    String(mapPitchToPercent(pitch)),
    "-Text",
    text
  ]);

  return outputPath;
}

function getUpdater() {
  if (!updateConfig) {
    updater = null;
    return null;
  }

  if (
    updater &&
    updater.currentUpdateConfig?.owner === updateConfig.owner &&
    updater.currentUpdateConfig?.repo === updateConfig.repo
  ) {
    return updater;
  }

  updater = new NsisUpdater({
    provider: "github",
    owner: updateConfig.owner,
    repo: updateConfig.repo,
    releaseType: updateConfig.releaseType
  });
  updater.currentUpdateConfig = { ...updateConfig };
  updater.logger = log;
  updater.autoDownload = true;
  updater.autoInstallOnAppQuit = true;
  registerAutoUpdaterEvents(updater);
  return updater;
}

function configureAutoUpdater() {
  if (!app.isPackaged) {
    sendToRenderer("update-status", {
      status: "idle",
      message: "Auto-update checks run only in packaged builds."
    });
    return;
  }

  const activeUpdater = getUpdater();
  if (!activeUpdater) {
    sendToRenderer("update-status", {
      status: "idle",
      message: "Add your GitHub owner and repo to enable automatic updates."
    });
    return;
  }

  sendToRenderer("update-status", {
    status: "ready",
    message: `GitHub updates are configured for ${updateConfig.owner}/${updateConfig.repo}.`
  });
}

function registerAutoUpdaterEvents(activeUpdater) {
  activeUpdater.on("checking-for-update", () => {
    sendToRenderer("update-status", {
      status: "checking",
      message: "Checking for updates..."
    });
  });

  activeUpdater.on("update-available", (info) => {
    sendToRenderer("update-status", {
      status: "available",
      message: `Update ${info.version} is available. Downloading now...`
    });
  });

  activeUpdater.on("update-not-available", () => {
    sendToRenderer("update-status", {
      status: "current",
      message: "You already have the latest version."
    });
  });

  activeUpdater.on("download-progress", (progress) => {
    sendToRenderer("update-status", {
      status: "downloading",
      message: `Downloading update... ${Math.round(progress.percent)}%`
    });
  });

  activeUpdater.on("update-downloaded", async (info) => {
    sendToRenderer("update-status", {
      status: "downloaded",
      message: `Update ${info.version} downloaded. Ready to install.`
    });

    if (!mainWindow || mainWindow.isDestroyed()) {
      return;
    }

    const result = await dialog.showMessageBox(mainWindow, {
      type: "info",
      buttons: ["Restart and install", "Later"],
      defaultId: 0,
      cancelId: 1,
      title: "Update ready",
      message: `Version ${info.version} is ready to install.`,
      detail: "The app can restart now to install the update, or it will install automatically when you close it."
    });

    if (result.response === 0) {
      sendToRenderer("update-status", {
        status: "installing",
        message: `Installing update ${info.version} and restarting...`
      });
      activeUpdater.quitAndInstall();
    }
  });

  activeUpdater.on("error", (error) => {
    sendToRenderer("update-status", {
      status: "error",
      message: error == null ? "Update failed." : error.message
    });
  });
}

async function checkForUpdatesOnLaunch() {
  if (hasCheckedForUpdatesOnLaunch || !app.isPackaged) {
    return;
  }

  const activeUpdater = getUpdater();
  if (!activeUpdater) {
    return;
  }

  hasCheckedForUpdatesOnLaunch = true;
  await activeUpdater.checkForUpdates();
}

app.whenReady().then(() => {
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      configureAutoUpdater();
    }
  });

  return loadSettings().then(() => {
    createWindow();
    configureAutoUpdater();
    checkForUpdatesOnLaunch().catch((error) => {
      log.warn("Startup update check failed", error);
    });
  });
});

app.on("window-all-closed", async () => {
  await disconnectFromLive();

  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("live:connect", async (_event, payload) => {
  const state = await connectToLive(payload.username, {
    onChat: (chat) => sendToRenderer("live-chat", chat),
    onStatus: (status) => sendToRenderer("live-status", status)
  });

  return state;
});

ipcMain.handle("live:disconnect", async () => {
  return disconnectFromLive();
});

ipcMain.handle("live:get-state", async () => {
  return getConnectionState();
});

ipcMain.handle("updates:configure", async (_event, payload) => {
  await saveSettings({
    githubOwner: payload.githubOwner ?? "",
    githubRepo: payload.githubRepo ?? ""
  });
  hasCheckedForUpdatesOnLaunch = false;
  configureAutoUpdater();
  return {
    ok: true,
    packaged: app.isPackaged,
    configured: Boolean(updateConfig)
  };
});

ipcMain.handle("app:get-settings", async () => {
  return settings;
});

ipcMain.handle("app:get-version", async () => {
  return app.getVersion();
});

ipcMain.handle("app:save-settings", async (_event, payload) => {
  await saveSettings(payload ?? {});
  return settings;
});

ipcMain.handle("translation:translate", async (_event, payload) => {
  return translateText(payload ?? {});
});

ipcMain.handle("tts:get-voices", async () => {
  return listWindowsTtsVoices();
});

ipcMain.handle("tts:speak-to-file", async (_event, payload) => {
  return {
    filePath: await synthesizeSpeechToFile(payload)
  };
});

ipcMain.handle("tts:delete-file", async (_event, payload) => {
  try {
    await fs.unlink(payload.filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      log.warn("Failed to delete temp TTS file", error);
    }
  }

  return { ok: true };
});

ipcMain.handle("updates:check", async () => {
  if (!app.isPackaged) {
    return {
      ok: false,
      message: "Package the app before checking for remote updates."
    };
  }

  const activeUpdater = getUpdater();
  if (!activeUpdater) {
    return {
      ok: false,
      message: "Set your GitHub owner and repo first."
    };
  }

  await activeUpdater.checkForUpdates();
  return {
    ok: true
  };
});

ipcMain.handle("updates:install", () => {
  const activeUpdater = getUpdater();
  if (!activeUpdater) {
    return { ok: false };
  }

  sendToRenderer("update-status", {
    status: "installing",
    message: "Installing update and restarting..."
  });
  activeUpdater.quitAndInstall();
  return { ok: true };
});
