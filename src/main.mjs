import { app, BrowserWindow, dialog, ipcMain, session, shell } from "electron";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import log from "electron-log";
import fsSync from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import electronUpdater from "electron-updater";
import {
  connectToLive,
  disconnectFromLive,
  fetchAvailableGiftsForUsername,
  fetchAuthenticatedEmotesForUsername,
  getConnectionState
} from "./tiktok-client.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { NsisUpdater } = electronUpdater;
const execFileAsync = promisify(execFile);
const TTS_SCRIPT_PATH = path.join(os.tmpdir(), "tiktok-live-reader-tts.ps1");
const DEFAULT_GITHUB_OWNER = "admin-streamsyncpro";
const DEFAULT_GITHUB_REPO = "streamsyncpro";
const QUEUE_OVERLAY_PREFERRED_PORT = 46321;
const TIKTOK_AUTH_PARTITION = "persist:ssp-tiktok-auth";
const TIKTOK_LOGIN_URL = "https://www.tiktok.com/login";
const MYINSTANTS_CATEGORY_URL = "https://www.myinstants.com/en/categories/sound%20effects/us/";
const MYINSTANTS_SEARCH_URL = "https://www.myinstants.com/en/search/";
const MYINSTANTS_CACHE_TTL_MS = 30 * 60 * 1000;
const MYINSTANTS_MAX_PAGES = 50;
const MYINSTANTS_SEARCH_MAX_PAGES = 8;
const DEFAULT_CUSTOM_EVENT_RULES = [];
const SETTINGS_READ_RETRY_CODES = new Set(["EPERM", "EACCES", "EBUSY"]);
const SETTINGS_READ_RETRY_DELAYS_MS = [120, 250, 500, 900];
const ELEVENLABS_FREE_VOICE_OPTIONS = [
  { id: "JBFqnCBsd6RMkjVDRZzb", name: "George", category: "default" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella", category: "default" },
  { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh", category: "default" },
  { id: "VR6AewLTigWG4xSOukaG", name: "Arnold", category: "default" },
  { id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte", category: "default" }
];

let mainWindow = null;
let isFlushingWindowClose = false;
let updateConfig = null;
let updater = null;
let hasCheckedForUpdatesOnLaunch = false;
let queueOverlayServer = null;
let queueOverlayPort = null;
let tiktokAuthWindow = null;
let queueOverlayState = {
  connected: false,
  username: "",
  queueCount: 0,
  updatedAt: null,
  items: []
};
let commandFeedbackOverlayState = {
  message: "",
  commandType: "",
  username: "",
  title: "Viewer Feedback",
  accentColor: "#53dcff",
  sourceType: "command",
  updatedAt: null,
  visibleUntil: null,
  durationMs: 6000
};
let overlayDesignerState = {
  activeTemplateId: "",
  templates: [],
  runtime: {},
  updatedAt: null
};
const overlayDesignerClients = new Set();
let myInstantsCatalogCache = {
  fetchedAt: 0,
  sounds: []
};
const myInstantsSoundLookup = new Map();
const myInstantsAudioUrlCache = new Map();
let lastCpuUsageSample = null;

const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      createWindow();
      return;
    }

    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
    mainWindow.focus();
  });
}

function hasNativeUpdateConfig() {
  if (!app.isPackaged) {
    return false;
  }

  const updateConfigPath = path.join(process.resourcesPath, "app-update.yml");
  return fsSync.existsSync(updateConfigPath);
}

function getOverlayUrlBundle(pathname) {
  if (!queueOverlayPort) {
    return {
      url: "",
      localUrl: "",
      networkUrl: ""
    };
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const localUrl = `http://127.0.0.1:${queueOverlayPort}${normalizedPath}`;
  const networkInterfaces = os.networkInterfaces();
  let networkHost = "";

  for (const addresses of Object.values(networkInterfaces)) {
    for (const address of addresses ?? []) {
      if (address && address.family === "IPv4" && !address.internal) {
        networkHost = address.address;
        break;
      }
    }

    if (networkHost) {
      break;
    }
  }

  const networkUrl = networkHost ? `http://${networkHost}:${queueOverlayPort}${normalizedPath}` : "";

  return {
    url: networkUrl || localUrl,
    localUrl,
    networkUrl
  };
}

function captureCpuUsageSample() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;

  for (const cpu of cpus) {
    const times = cpu?.times ?? {};
    idle += Number(times.idle ?? 0);
    total += Number(times.user ?? 0)
      + Number(times.nice ?? 0)
      + Number(times.sys ?? 0)
      + Number(times.irq ?? 0)
      + Number(times.idle ?? 0);
  }

  return { idle, total };
}

function getSystemUsageSnapshot() {
  const currentCpuSample = captureCpuUsageSample();
  const previousCpuSample = lastCpuUsageSample;
  lastCpuUsageSample = currentCpuSample;

  let cpuUsagePercent = 0;
  if (previousCpuSample) {
    const idleDiff = currentCpuSample.idle - previousCpuSample.idle;
    const totalDiff = currentCpuSample.total - previousCpuSample.total;
    if (totalDiff > 0) {
      cpuUsagePercent = Math.max(0, Math.min(100, ((totalDiff - idleDiff) / totalDiff) * 100));
    }
  }

  const totalMemoryBytes = os.totalmem();
  const freeMemoryBytes = os.freemem();
  const usedMemoryBytes = Math.max(0, totalMemoryBytes - freeMemoryBytes);
  const ramUsagePercent = totalMemoryBytes > 0 ? Math.max(0, Math.min(100, (usedMemoryBytes / totalMemoryBytes) * 100)) : 0;

  return {
    cpuUsagePercent: Number(cpuUsagePercent.toFixed(1)),
    ramUsagePercent: Number(ramUsagePercent.toFixed(1)),
    usedMemoryMb: Math.round(usedMemoryBytes / (1024 * 1024)),
    totalMemoryMb: Math.round(totalMemoryBytes / (1024 * 1024))
  };
}

let settings = {
  githubOwner: DEFAULT_GITHUB_OWNER,
  githubRepo: DEFAULT_GITHUB_REPO,
  authApiBaseUrl: "https://streamsyncpro.co.uk",
  authUser: null,
  authRememberMe: false,
  authRememberedEmail: "",
  rememberedUsername: "",
  rememberUsername: false,
  rememberedUsernames: [],
  tiktokSessionId: "",
  tiktokTargetIdc: "",
  translationEnabled: false,
  translationTargetLanguage: "en",
  translationProviderUrl: "",
  translationApiKey: "",
  ttsEnabled: false,
  ttsProvider: "builtin",
  ttsVoice: "",
  ttsRandomVoicePerMessage: false,
  ttsStyle: "natural",
  ttsRate: 1,
  ttsPitch: 1,
  ttsVolume: 1,
  ttsQueue: 1,
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
    ttsUserVoiceAssignments: {
      builtin: {},
      elevenlabs: {}
    },
    userNotes: {},
    knownTikTokGifts: [],
    knownTikTokEmotes: [],
    cardCollapseState: {},
    dashboardCardVisibility: {
      welcome: true,
      "incoming-chat": true
    },
    customEventRules: DEFAULT_CUSTOM_EVENT_RULES,
    commandFeedbackOverlayDurationMs: 6000,
  commandFeedbackTemplates: {
    myttsvoice: "{user} has selected {voiceLabel} for their personalised TTS voice.",
    listcommands: "{user}, available chat commands: {commandList}"
  },
  votingEnabled: false,
  votingStartRole: "everyone",
  votingOverlayOrientation: "horizontal"
};

log.initialize();

function sendToRenderer(channel, payload) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send(channel, payload);
}

function sanitizeQueueOverlayState(payload = {}) {
  const items = Array.isArray(payload.items)
    ? payload.items
        .map((item, index) => ({
          id: String(item?.id ?? `queue-item-${index}`),
          label: String(item?.label ?? "Queued action").trim() || "Queued action",
          queueId: Math.min(10, Math.max(1, Number(item?.queueId) || 1)),
          kind: item?.kind === "tts" ? "tts" : "action",
          status: item?.status === "running" ? "running" : "queued"
        }))
        .slice(0, 12)
    : [];

  return {
    connected: Boolean(payload.connected),
    username: String(payload.username ?? "").trim(),
    queueCount: Math.max(0, Number(payload.queueCount) || items.length),
    updatedAt: new Date().toISOString(),
    items
  };
}

function getQueueOverlayUrl() {
  return getOverlayUrlBundle("/queue-overlay").url;
}

function getCommandFeedbackOverlayUrl() {
  return getOverlayUrlBundle("/command-feedback-overlay").url;
}

function getOverlayDesignerPreviewUrl(templateId = "") {
  const baseUrl = getOverlayUrlBundle("/overlay-designer-preview").url;
  if (!baseUrl) {
    return "";
  }

  const requestUrl = new URL(baseUrl);
  if (templateId) {
    requestUrl.searchParams.set("template", templateId);
  }
  return requestUrl.toString();
}

function normalizeOverlayDesignerHex(value, fallback) {
  const normalized = String(value ?? "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized : fallback;
}

function sanitizeOverlayDesignerElement(element = {}, index = 0) {
  const normalizedType = String(element.type ?? "text").trim() || "text";
  return {
    id: String(element.id ?? `overlay-element-${Date.now()}-${index}`),
    type: normalizedType,
    name: String(element.name ?? normalizedType).trim() || normalizedType,
    content: String(element.content ?? "").trim(),
    source: String(element.source ?? "").trim(),
    x: Math.max(0, Number(element.x) || 0),
    y: Math.max(0, Number(element.y) || 0),
    width: Math.max(40, Number(element.width) || 220),
    height: Math.max(32, Number(element.height) || 72),
    rotation: Math.max(-360, Math.min(360, Number(element.rotation) || 0)),
    opacity: Math.max(0, Math.min(1, Number(element.opacity) || 1)),
    fontFamily: String(element.fontFamily ?? "Poppins, Segoe UI, sans-serif").trim() || "Poppins, Segoe UI, sans-serif",
    fontSize: Math.max(10, Number(element.fontSize) || 28),
    fontWeight: Math.max(100, Math.min(900, Number(element.fontWeight) || 700)),
    letterSpacing: Math.max(-4, Math.min(24, Number(element.letterSpacing) || 0)),
    color: normalizeOverlayDesignerHex(element.color, "#f6fbff"),
    glowColor: normalizeOverlayDesignerHex(element.glowColor, "#53dcff"),
    backgroundColor: normalizeOverlayDesignerHex(element.backgroundColor, "#10243d"),
    backgroundOpacity: Math.max(0, Math.min(1, Number(element.backgroundOpacity) || 0)),
    borderColor: normalizeOverlayDesignerHex(element.borderColor, "#2a466b"),
    borderWidth: Math.max(0, Math.min(24, Number(element.borderWidth) || 0)),
    borderRadius: Math.max(0, Math.min(200, Number(element.borderRadius) || 18)),
    blur: Math.max(0, Math.min(40, Number(element.blur) || 0)),
    animation: String(element.animation ?? "none").trim() || "none",
    binding: String(element.binding ?? "").trim(),
    visible: element.visible !== false,
    locked: Boolean(element.locked),
    zIndex: Math.max(1, Number(element.zIndex) || index + 1)
  };
}

function sanitizeOverlayDesignerTemplate(template = {}, index = 0) {
  const normalizedId = String(template.id ?? `template-${Date.now()}-${index}`).trim() || `template-${Date.now()}-${index}`;
  const elements = Array.isArray(template.elements)
    ? template.elements.map((element, elementIndex) => sanitizeOverlayDesignerElement(element, elementIndex))
    : [];

  return {
    id: normalizedId,
    name: String(template.name ?? `Overlay Template ${index + 1}`).trim() || `Overlay Template ${index + 1}`,
    width: Math.max(320, Number(template.width) || 1920),
    height: Math.max(320, Number(template.height) || 1080),
    backgroundColor: normalizeOverlayDesignerHex(template.backgroundColor, "#08111f"),
    backgroundOpacity: Math.max(0, Math.min(1, Number(template.backgroundOpacity) || 0.45)),
    backgroundImage: String(template.backgroundImage ?? "").trim(),
    backgroundVideo: String(template.backgroundVideo ?? "").trim(),
    autoLoad: String(template.autoLoad ?? "").trim(),
    elements: elements
      .sort((left, right) => left.zIndex - right.zIndex)
      .map((element, elementIndex) => ({
        ...element,
        zIndex: elementIndex + 1
      }))
  };
}

function sanitizeOverlayDesignerStatePayload(payload = {}) {
  const templates = Array.isArray(payload.templates)
    ? payload.templates.map((template, index) => sanitizeOverlayDesignerTemplate(template, index))
    : [];
  const activeTemplateId = String(payload.activeTemplateId ?? templates[0]?.id ?? "").trim();

  return {
    activeTemplateId,
    templates,
    runtime: payload.runtime && typeof payload.runtime === "object" ? payload.runtime : {},
    updatedAt: new Date().toISOString()
  };
}

function broadcastOverlayDesignerState() {
  const eventPayload = `data: ${JSON.stringify({ ok: true, state: overlayDesignerState })}\n\n`;
  for (const client of overlayDesignerClients) {
    try {
      client.write(eventPayload);
    } catch {
      overlayDesignerClients.delete(client);
    }
  }
}

async function serveQueueOverlayHtml(response) {
  try {
    const html = await fs.readFile(path.join(__dirname, "queue-overlay.html"), "utf8");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(html);
  } catch (error) {
    log.error("Failed to serve queue overlay HTML", error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Queue overlay unavailable.");
  }
}

async function serveCommandFeedbackOverlayHtml(response) {
  try {
    const html = await fs.readFile(path.join(__dirname, "command-feedback-overlay.html"), "utf8");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(html);
  } catch (error) {
    log.error("Failed to serve command feedback overlay HTML", error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Command feedback overlay unavailable.");
  }
}

async function serveOverlayDesignerPreviewHtml(response) {
  try {
    const html = await fs.readFile(path.join(__dirname, "overlay-designer-preview.html"), "utf8");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(html);
  } catch (error) {
    log.error("Failed to serve overlay designer preview HTML", error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Overlay designer preview unavailable.");
  }
}

function buildQueueOverlayServer() {
  return createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");

    if (requestUrl.pathname === "/" || requestUrl.pathname === "/queue-overlay") {
      await serveQueueOverlayHtml(response);
      return;
    }

    if (requestUrl.pathname === "/command-feedback-overlay") {
      await serveCommandFeedbackOverlayHtml(response);
      return;
    }

    if (requestUrl.pathname === "/overlay-designer-preview") {
      await serveOverlayDesignerPreviewHtml(response);
      return;
    }

    if (requestUrl.pathname === "/api/queue-overlay-state") {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      response.end(JSON.stringify({
        ok: true,
        overlayUrl: getQueueOverlayUrl(),
        state: queueOverlayState
      }));
      return;
    }

    if (requestUrl.pathname === "/api/command-feedback-overlay-state") {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      response.end(JSON.stringify({
        ok: true,
        overlayUrl: getCommandFeedbackOverlayUrl(),
        state: commandFeedbackOverlayState
      }));
      return;
    }

    if (requestUrl.pathname === "/api/overlay-designer-state") {
      const requestedTemplateId = String(requestUrl.searchParams.get("template") ?? "").trim();
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      response.end(JSON.stringify({
        ok: true,
        overlayUrl: getOverlayDesignerPreviewUrl(requestedTemplateId),
        state: overlayDesignerState
      }));
      return;
    }

    if (requestUrl.pathname === "/api/overlay-designer-stream") {
      response.writeHead(200, {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-store",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*"
      });
      response.write(`data: ${JSON.stringify({ ok: true, state: overlayDesignerState })}\n\n`);
      overlayDesignerClients.add(response);
      request.on("close", () => {
        overlayDesignerClients.delete(response);
      });
      return;
    }

    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found.");
  });
}

async function listenQueueOverlayServer(port) {
  queueOverlayServer = buildQueueOverlayServer();

  await new Promise((resolve, reject) => {
    const handleError = (error) => {
      queueOverlayServer.off("listening", handleListening);
      reject(error);
    };
    const handleListening = () => {
      queueOverlayServer.off("error", handleError);
      resolve();
    };

    queueOverlayServer.once("error", handleError);
    queueOverlayServer.once("listening", handleListening);
    queueOverlayServer.listen(port, "0.0.0.0");
  });

  queueOverlayPort = queueOverlayServer.address()?.port ?? null;
}

async function startQueueOverlayServer() {
  if (queueOverlayServer) {
    return;
  }

  try {
    await listenQueueOverlayServer(QUEUE_OVERLAY_PREFERRED_PORT);
  } catch (error) {
    if (error?.code !== "EADDRINUSE") {
      throw error;
    }

    queueOverlayServer = null;
    await listenQueueOverlayServer(0);
  }
}

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 780,
      minWidth: 860,
      minHeight: 620,
      resizable: true,
      maximizable: true,
      autoHideMenuBar: true,
      backgroundColor: "#071124",
      webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.on("close", (event) => {
    if (isFlushingWindowClose) {
      return;
    }

    event.preventDefault();
    isFlushingWindowClose = true;

    Promise.resolve(
      mainWindow?.webContents.executeJavaScript(
        "window.__flushPendingSettingsForExit ? window.__flushPendingSettingsForExit() : Promise.resolve(true)",
        true
      )
    )
      .catch((error) => {
        log.warn("Failed to flush renderer settings before close", error);
      })
      .finally(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.destroy();
        }
      });
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
    isFlushingWindowClose = false;
  });
}

function getSettingsPath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readSettingsFileWithRetry() {
  const settingsPath = getSettingsPath();
  let attempt = 0;

  while (true) {
    try {
      return await fs.readFile(settingsPath, "utf8");
    } catch (error) {
      const code = String(error?.code || "").trim().toUpperCase();
      if (code === "ENOENT") {
        throw error;
      }
      if (!SETTINGS_READ_RETRY_CODES.has(code) || attempt >= SETTINGS_READ_RETRY_DELAYS_MS.length) {
        throw error;
      }
      await delay(SETTINGS_READ_RETRY_DELAYS_MS[attempt]);
      attempt += 1;
    }
  }
}

function areSettingsLikelyDefaults(source = settings) {
  return !source?.authRememberMe
    && !String(source?.authRememberedEmail ?? "").trim()
    && !source?.authUser
    && !source?.rememberUsername
    && !String(source?.rememberedUsername ?? "").trim();
}

function getTikTokAuthSession() {
  return session.fromPartition(TIKTOK_AUTH_PARTITION);
}

async function getTikTokAuthCookies() {
  const authSession = getTikTokAuthSession();
  const cookies = await authSession.cookies.get({});
  const sessionIdCookie = cookies.find((cookie) => cookie.name === "sessionid");
  const ttTargetIdcCookie = cookies.find((cookie) => cookie.name === "tt-target-idc");

  return {
    sessionId: String(sessionIdCookie?.value ?? "").trim(),
    ttTargetIdc: String(ttTargetIdcCookie?.value ?? "").trim()
  };
}

async function clearTikTokAuthSessionCookies() {
  const authSession = getTikTokAuthSession();
  const cookies = await authSession.cookies.get({});

  for (const cookie of cookies) {
    const protocol = cookie.secure ? "https://" : "http://";
    const domain = String(cookie.domain ?? "").replace(/^\./, "");
    if (!domain) {
      continue;
    }
    const url = `${protocol}${domain}${cookie.path || "/"}`;
    try {
      await authSession.cookies.remove(url, cookie.name);
    } catch (error) {
      log.warn("Failed to remove TikTok auth cookie", { name: cookie.name, url, error: error?.message ?? error });
    }
  }

  try {
    await authSession.clearStorageData();
  } catch (error) {
    log.warn("Failed to clear TikTok auth storage", error);
  }
}

async function openTikTokSignInWindow() {
  if (tiktokAuthWindow && !tiktokAuthWindow.isDestroyed()) {
    tiktokAuthWindow.focus();
  }

  await clearTikTokAuthSessionCookies();

  return new Promise((resolve, reject) => {
    let settled = false;
    const authSession = getTikTokAuthSession();

    const finish = (result, error = null) => {
      if (settled) {
        return;
      }
      settled = true;
      authSession.cookies.removeListener("changed", handleCookieChange);
      tiktokAuthWindow?.webContents.removeListener("did-navigate", handleNavigation);
      tiktokAuthWindow?.webContents.removeListener("did-frame-finish-load", handleNavigation);
      tiktokAuthWindow?.webContents.removeListener("did-fail-load", handleLoadFailure);
      if (tiktokAuthWindow && !tiktokAuthWindow.isDestroyed()) {
        tiktokAuthWindow.close();
      }
      tiktokAuthWindow = null;

      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    };

    const tryResolveCookies = async () => {
      const cookies = await getTikTokAuthCookies();
      if (cookies.sessionId && cookies.ttTargetIdc) {
        finish(cookies);
      }
    };

    const handleCookieChange = () => {
      void tryResolveCookies().catch((error) => {
        log.warn("Failed while checking TikTok auth cookies", error);
      });
    };

    const handleNavigation = () => {
      void tryResolveCookies().catch((error) => {
        log.warn("Failed while checking TikTok auth navigation", error);
      });
    };

    const handleLoadFailure = (_event, errorCode, errorDescription) => {
      if (errorCode === -3) {
        return;
      }
      finish(null, new Error(errorDescription || "Unable to load the TikTok sign-in page."));
    };

    tiktokAuthWindow = new BrowserWindow({
      width: 980,
      height: 760,
      minWidth: 840,
      minHeight: 620,
      parent: mainWindow && !mainWindow.isDestroyed() ? mainWindow : undefined,
      modal: false,
      autoHideMenuBar: true,
      backgroundColor: "#071124",
      title: "Sign in to TikTok",
      webPreferences: {
        partition: TIKTOK_AUTH_PARTITION,
        contextIsolation: true,
        nodeIntegration: false
      }
    });

    tiktokAuthWindow.setMenuBarVisibility(false);
    tiktokAuthWindow.on("closed", () => {
      if (!settled) {
        finish(null, new Error("TikTok sign-in was cancelled before it completed."));
      }
    });

    authSession.cookies.on("changed", handleCookieChange);
    tiktokAuthWindow.webContents.on("did-navigate", handleNavigation);
    tiktokAuthWindow.webContents.on("did-frame-finish-load", handleNavigation);
    tiktokAuthWindow.webContents.on("did-fail-load", handleLoadFailure);
    tiktokAuthWindow.loadURL(TIKTOK_LOGIN_URL).catch((error) => {
      finish(null, error);
    });
  });
}

function normalizeCustomEventRules(source = []) {
  if (!Array.isArray(source)) {
    return [];
  }

    return source
      .map((rule, index) => ({
        id: String(rule?.id ?? `rule-${index + 1}`),
        enabled: rule?.enabled !== false,
        name: String(rule?.name ?? `Custom rule ${index + 1}`).trim() || `Custom rule ${index + 1}`,
        metric: ["follows", "likes", "shares", "coins", "specificGift", "subEmote", "fanEmote", "join", "firstActivity", "anyComment"].includes(rule?.metric) ? rule.metric : "follows",
        threshold: Math.max(1, Number(rule?.threshold) || 1),
        soundId: String(rule?.soundId ?? "").trim(),
        webhookUrl: String(rule?.webhookUrl ?? "").trim(),
        queueId: Math.min(10, Math.max(1, Number(rule?.queueId) || 1)),
        userCooldownSeconds: Math.max(0, Number(rule?.userCooldownSeconds) || 0),
        triggerAudience: ["everyone", "follower", "subscriber", "moderator", "topGifter", "specificUser"].includes(rule?.triggerAudience)
          ? rule.triggerAudience
          : "everyone",
        triggerUsername: String(rule?.triggerUsername ?? "").trim().replace(/^@/, "").toLowerCase(),
        triggerEmoteId: String(rule?.triggerEmoteId ?? "").trim(),
        triggerEmoteName: String(rule?.triggerEmoteName ?? "").trim(),
        triggerEmoteImageUrl: String(rule?.triggerEmoteImageUrl ?? "").trim(),
        triggerGiftName: String(rule?.triggerGiftName ?? "").trim(),
        triggerGiftImageUrl: String(rule?.triggerGiftImageUrl ?? "").trim(),
        feedbackOverlayEnabled: Boolean(rule?.feedbackOverlayEnabled),
        feedbackOverlayTitle: String(rule?.feedbackOverlayTitle ?? "").trim(),
        feedbackOverlayMessage: String(rule?.feedbackOverlayMessage ?? "").trim(),
        feedbackOverlayAccentColor: String(rule?.feedbackOverlayAccentColor ?? "").trim()
      }))
      .slice(0, 50);
  }

async function loadSettings() {
  try {
    const raw = await readSettingsFileWithRetry();
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

  settings.commandFeedbackOverlayDurationMs = Math.max(1000, Number(settings.commandFeedbackOverlayDurationMs) || 6000);
  settings.commandFeedbackTemplates = {
    myttsvoice: String(settings.commandFeedbackTemplates?.myttsvoice ?? "{user} has selected {voiceLabel} for their personalised TTS voice."),
    listcommands: String(settings.commandFeedbackTemplates?.listcommands ?? "{user}, available chat commands: {commandList}")
  };

  // Keep updater settings pinned to the built-in GitHub Releases repo.
  settings.githubOwner = DEFAULT_GITHUB_OWNER;
  settings.githubRepo = DEFAULT_GITHUB_REPO;
  settings.customEventRules = normalizeCustomEventRules(settings.customEventRules);

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
  settings.customEventRules = normalizeCustomEventRules(settings.customEventRules);
  settings.commandFeedbackOverlayDurationMs = Math.max(1000, Number(settings.commandFeedbackOverlayDurationMs) || 6000);
  settings.commandFeedbackTemplates = {
    myttsvoice: String(settings.commandFeedbackTemplates?.myttsvoice ?? "{user} has selected {voiceLabel} for their personalised TTS voice."),
    listcommands: String(settings.commandFeedbackTemplates?.listcommands ?? "{user}, available chat commands: {commandList}")
  };

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

function decodeHtmlEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

async function resolveMyInstantsDownloadUrl(pageUrl) {
  const response = await fetch(pageUrl);

  if (!response.ok) {
    throw new Error(`MyInstants detail request failed with status ${response.status}.`);
  }

  const html = await response.text();
  const downloadMatch =
    html.match(/href="([^"]+\.mp3[^"]*)"\s*[^>]*>\s*Download MP3/i) ??
    html.match(/href="([^"]*\/media\/sounds\/[^"]+\.mp3[^"]*)"/i);

  if (!downloadMatch?.[1]) {
    throw new Error("Unable to resolve the sound download URL from MyInstants.");
  }

  return new URL(downloadMatch[1], pageUrl).toString();
}

function getMyInstantsCategoryPageUrl(pageNumber) {
  if (pageNumber <= 1) {
    return MYINSTANTS_CATEGORY_URL;
  }

  return `${MYINSTANTS_CATEGORY_URL}?page=${pageNumber}`;
}

function getMyInstantsSearchPageUrl(query, pageNumber) {
  const url = new URL(MYINSTANTS_SEARCH_URL);
  url.searchParams.set("name", query);
  if (pageNumber > 1) {
    url.searchParams.set("page", String(pageNumber));
  }
  return url.toString();
}

function extractMyInstantsEntriesFromHtml(html, baseUrl = MYINSTANTS_CATEGORY_URL) {
  const entryRegex = /<a[^>]+href="(\/en\/instant\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;
  const entries = [];
  const seen = new Set();

  for (const match of html.matchAll(entryRegex)) {
    const relativePath = match[1];
    const title = decodeHtmlEntities(match[2].trim());

    if (!relativePath || !title || seen.has(relativePath)) {
      continue;
    }

    seen.add(relativePath);
    entries.push({
      id: relativePath,
      title,
      pageUrl: new URL(relativePath, baseUrl).toString()
    });
  }

  return entries;
}

function rememberMyInstantsSounds(sounds) {
  if (!Array.isArray(sounds)) {
    return;
  }

  for (const sound of sounds) {
    const id = String(sound?.id ?? "").trim();
    const pageUrl = String(sound?.pageUrl ?? "").trim();
    if (!id || !pageUrl) {
      continue;
    }

    myInstantsSoundLookup.set(id, {
      ...sound,
      id,
      title: String(sound?.title ?? "").trim(),
      pageUrl
    });
  }
}

async function fetchMyInstantsCatalog(forceRefresh = false) {
  const now = Date.now();

  if (
    !forceRefresh &&
    myInstantsCatalogCache.sounds.length > 0 &&
    now - myInstantsCatalogCache.fetchedAt < MYINSTANTS_CACHE_TTL_MS
  ) {
    rememberMyInstantsSounds(myInstantsCatalogCache.sounds);
    return myInstantsCatalogCache.sounds;
  }

  const seen = new Set();
  const sounds = [];
  let consecutiveEmptyPages = 0;

  for (let pageNumber = 1; pageNumber <= MYINSTANTS_MAX_PAGES; pageNumber += 1) {
    const response = await fetch(getMyInstantsCategoryPageUrl(pageNumber));
    if (!response.ok) {
      throw new Error(`MyInstants category request failed with status ${response.status}.`);
    }

    const html = await response.text();
    const pageEntries = extractMyInstantsEntriesFromHtml(html);

    if (pageEntries.length === 0) {
      consecutiveEmptyPages += 1;
      if (consecutiveEmptyPages >= 2) {
        break;
      }
      continue;
    }

    consecutiveEmptyPages = 0;

    for (const entry of pageEntries) {
      if (seen.has(entry.id)) {
        continue;
      }

      seen.add(entry.id);
      sounds.push(entry);
    }
  }

  if (sounds.length === 0) {
    throw new Error("No usable sounds were found from MyInstants.");
  }

  myInstantsCatalogCache = {
    fetchedAt: now,
    sounds
  };
  rememberMyInstantsSounds(sounds);

  return sounds;
}

async function searchMyInstantsCatalog(query) {
  const normalizedQuery = String(query ?? "").trim();
  if (normalizedQuery.length < 2) {
    return [];
  }

  const seen = new Set();
  const sounds = [];
  let consecutiveEmptyPages = 0;

  for (let pageNumber = 1; pageNumber <= MYINSTANTS_SEARCH_MAX_PAGES; pageNumber += 1) {
    const pageUrl = getMyInstantsSearchPageUrl(normalizedQuery, pageNumber);
    const response = await fetch(pageUrl);
    if (response.status === 404 && pageNumber > 1) {
      break;
    }

    if (!response.ok) {
      throw new Error(`MyInstants search request failed with status ${response.status}.`);
    }

    const html = await response.text();
    const pageEntries = extractMyInstantsEntriesFromHtml(html, pageUrl);

    if (pageEntries.length === 0) {
      consecutiveEmptyPages += 1;
      if (consecutiveEmptyPages >= 2) {
        break;
      }
      continue;
    }

    consecutiveEmptyPages = 0;

    for (const entry of pageEntries) {
      if (seen.has(entry.id)) {
        continue;
      }

      seen.add(entry.id);
      sounds.push(entry);
    }
  }

  rememberMyInstantsSounds(sounds);
  return sounds;
}

async function resolveMyInstantsAudioUrl(soundId) {
  if (!soundId) {
    throw new Error("Choose a sound first.");
  }

  if (myInstantsAudioUrlCache.has(soundId)) {
    return myInstantsAudioUrlCache.get(soundId);
  }

  const sound = myInstantsSoundLookup.get(soundId)
    ?? (await fetchMyInstantsCatalog(false)).find((entry) => entry.id === soundId);

  if (!sound?.pageUrl) {
    throw new Error("That sound could not be found in the MyInstants catalog.");
  }

  const audioUrl = await resolveMyInstantsDownloadUrl(sound.pageUrl);
  myInstantsAudioUrlCache.set(soundId, audioUrl);
  return audioUrl;
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

function getElevenLabsHeaders(payload = {}) {
  const headers = {
    Accept: "application/json"
  };

  if (payload?.apiKey) {
    headers["xi-api-key"] = String(payload.apiKey).trim();
  }

  return headers;
}

function getElevenLabsVoiceSettings(style = "natural", rate = 1) {
  const speed = Math.max(0.7, Math.min(1.2, Number(rate) || 1));

  switch (style) {
    case "protocol":
      return { stability: 0.55, similarity_boost: 0.72, style: 0.18, speed: Math.min(1.2, speed + 0.08), use_speaker_boost: true };
    case "dark":
      return { stability: 0.72, similarity_boost: 0.82, style: 0.28, speed: Math.max(0.7, speed - 0.1), use_speaker_boost: true };
    case "announcer":
      return { stability: 0.48, similarity_boost: 0.75, style: 0.42, speed: Math.min(1.2, speed + 0.12), use_speaker_boost: true };
    case "tinybot":
      return { stability: 0.4, similarity_boost: 0.62, style: 0.08, speed: Math.min(1.2, speed + 0.15), use_speaker_boost: false };
    default:
      return { stability: 0.65, similarity_boost: 0.8, style: 0.16, speed, use_speaker_boost: true };
  }
}

function dedupeElevenLabsVoices(voices = []) {
  const seenIds = new Set();
  const deduped = [];

  for (const voice of voices) {
    const voiceId = String(voice?.id ?? "").trim();
    if (!voiceId || seenIds.has(voiceId)) {
      continue;
    }

    seenIds.add(voiceId);
    deduped.push({
      ...voice,
      id: voiceId
    });
  }

  return deduped;
}

function formatElevenLabsErrorMessage(rawErrorText = "") {
  const fallbackMessage = "Unable to synthesize speech with ElevenLabs.";
  if (!rawErrorText?.trim()) {
    return fallbackMessage;
  }

  let parsedError = null;

  try {
    parsedError = JSON.parse(rawErrorText);
  } catch {
    parsedError = null;
  }

  const detail = parsedError?.detail;
  const detailMessage =
    typeof detail === "string"
      ? detail
      : detail?.message
        ? String(detail.message)
        : parsedError?.message
          ? String(parsedError.message)
          : "";
  const detailCode = String(detail?.code ?? parsedError?.code ?? "").trim().toLowerCase();
  const detailType = String(detail?.type ?? parsedError?.type ?? "").trim().toLowerCase();
  const detailStatus = String(detail?.status ?? parsedError?.status ?? "").trim().toLowerCase();
  const normalizedMessage = detailMessage.toLowerCase();

  if (
    detailCode === "paid_plan_required" ||
    detailType === "payment_required" ||
    detailStatus === "payment_required" ||
    normalizedMessage.includes("library voices via the api") ||
    normalizedMessage.includes("upgrade your subscription to use this voice")
  ) {
    return "This ElevenLabs voice needs higher plan or library voice access. In Paid mode, choose one of your own account voices instead.";
  }

  return detailMessage || rawErrorText || fallbackMessage;
}

async function listElevenLabsVoices(payload = {}) {
  const normalizedMode = payload?.mode === "paid" ? "paid" : "free";
  const apiKey = String(payload?.apiKey ?? "").trim();

  if (!apiKey) {
    return ELEVENLABS_FREE_VOICE_OPTIONS;
  }

  async function fetchVoicesByType(voiceType) {
    const searchParams = new URLSearchParams({
      page_size: "50",
      voice_type: voiceType,
      sort: "name",
      sort_direction: "asc"
    });

    const response = await fetch(`https://api.elevenlabs.io/v2/voices?${searchParams.toString()}`, {
      headers: getElevenLabsHeaders(payload)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(errorText || "Unable to load ElevenLabs voices.");
    }

    const result = await response.json();
    const voices = Array.isArray(result?.voices) ? result.voices : [];

    return voices
      .map((voice) => ({
        id: String(voice.voice_id ?? ""),
        name: String(voice.name ?? "Unnamed voice"),
        category: String(voice.category ?? ""),
        previewUrl: voice.preview_url ? String(voice.preview_url) : ""
      }))
      .filter((voice) => voice.id);
  }

  if (normalizedMode === "paid") {
    const savedVoices = await fetchVoicesByType("saved");
    if (savedVoices.length > 0) {
      return dedupeElevenLabsVoices(savedVoices);
    }

    const defaultVoices = await fetchVoicesByType("default");
    return dedupeElevenLabsVoices(defaultVoices);
  }

  const defaultVoices = await fetchVoicesByType("default");
  return dedupeElevenLabsVoices([
    ...defaultVoices,
    ...ELEVENLABS_FREE_VOICE_OPTIONS
  ]);
}

async function getElevenLabsUsageDetails(payload = {}) {
  const apiKey = String(payload?.apiKey ?? "").trim();
  if (!apiKey) {
    throw new Error("Enter your ElevenLabs API key to load usage details.");
  }

  async function fetchUsageShape(url, nestedSubscription = false) {
    const response = await fetch(url, {
      headers: getElevenLabsHeaders({ apiKey })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`${url} returned ${response.status}. ${errorText || "Unable to load ElevenLabs usage details."}`);
    }

    const result = await response.json();
    return nestedSubscription ? (result?.subscription ?? null) : result;
  }

  let result = null;
  try {
    result = await fetchUsageShape("https://api.elevenlabs.io/v1/user/subscription", false);
  } catch (primaryError) {
    try {
      result = await fetchUsageShape("https://api.elevenlabs.io/v1/user", true);
    } catch {
      throw primaryError;
    }
  }

  if (!result || typeof result !== "object") {
    throw new Error("ElevenLabs did not return subscription usage details.");
  }

  const used = Number(result?.character_count ?? 0);
  const limit = Number(result?.character_limit ?? 0);
  const remaining = Number.isFinite(limit) && limit >= 0
    ? Math.max(0, limit - Math.max(0, used))
    : null;

  return {
    tier: String(result?.tier ?? "").trim() || "unknown",
    status: String(result?.status ?? "").trim() || "unknown",
    used: Number.isFinite(used) ? used : 0,
    limit: Number.isFinite(limit) ? limit : null,
    remaining,
    nextResetUnix: Number.isFinite(Number(result?.next_character_count_reset_unix))
      ? Number(result.next_character_count_reset_unix)
      : null,
    canExtend: Boolean(result?.can_extend_character_limit ?? result?.allowed_to_extend_character_limit ?? false),
    maxCreditLimitExtension: result?.max_credit_limit_extension ?? null
  };
}

async function synthesizeWindowsSpeechToFile({ text, voiceName, rate, pitch }) {
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

async function synthesizeElevenLabsSpeechToFile({ text, voiceId, modelId, style, rate, apiKey, mode }) {
  const outputPath = path.join(
    os.tmpdir(),
    `stream-sync-pro-elevenlabs-${Date.now()}-${Math.random().toString(16).slice(2)}.mp3`
  );

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: {
      ...getElevenLabsHeaders({ apiKey, mode }),
      Accept: "audio/mpeg",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      model_id: modelId || "eleven_flash_v2_5",
      voice_settings: getElevenLabsVoiceSettings(style, rate)
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(formatElevenLabsErrorMessage(errorText));
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, bytes);
  return outputPath;
}

async function synthesizeSpeechToFile(payload = {}) {
  if (payload?.provider === "elevenlabs") {
    if (!payload?.voiceId) {
      throw new Error("Choose an ElevenLabs voice first.");
    }

    if (!String(payload?.apiKey ?? "").trim()) {
      throw new Error("Enter your ElevenLabs API key to use ElevenLabs voices.");
    }

    return synthesizeElevenLabsSpeechToFile(payload);
  }

  return synthesizeWindowsSpeechToFile(payload);
}

function getUpdater() {
  if (!updateConfig || !hasNativeUpdateConfig()) {
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
  if (!app.isPackaged || !hasNativeUpdateConfig()) {
    sendToRenderer("update-status", {
      status: "idle",
      message: "Automatic updates are unavailable in this local build."
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
  if (hasCheckedForUpdatesOnLaunch || !app.isPackaged || !hasNativeUpdateConfig()) {
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
    if (!mainWindow || mainWindow.isDestroyed()) {
      createWindow();
    }
    configureAutoUpdater();
  });

  return loadSettings().then(() => {
    return startQueueOverlayServer().then(() => {
      createWindow();
      configureAutoUpdater();
      checkForUpdatesOnLaunch().catch((error) => {
        log.warn("Startup update check failed", error);
      });
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

ipcMain.handle("tiktok:get-available-gifts", async (_event, payload = {}) => {
  return fetchAvailableGiftsForUsername(payload.username);
});

ipcMain.handle("tiktok:get-authenticated-emotes", async (_event, payload = {}) => {
  return fetchAuthenticatedEmotesForUsername({
    username: payload.username,
    sessionId: payload.sessionId,
    ttTargetIdc: payload.ttTargetIdc
  });
});

ipcMain.handle("tiktok:sign-in", async () => {
  return openTikTokSignInWindow();
});

ipcMain.handle("tiktok:sign-out", async () => {
  await clearTikTokAuthSessionCookies();
  return { ok: true };
});

ipcMain.handle("app:get-settings", async () => {
  if (areSettingsLikelyDefaults(settings)) {
    try {
      await loadSettings();
    } catch (error) {
      log.warn("Deferred settings reload failed", error);
    }
  }
  return settings;
});

ipcMain.handle("app:get-version", async () => {
  return app.getVersion();
});

ipcMain.handle("overlay:get-queue-info", async () => {
  const overlayUrls = getOverlayUrlBundle("/queue-overlay");
  return {
    ...overlayUrls,
    port: queueOverlayPort,
    state: queueOverlayState
  };
});

ipcMain.handle("overlay:update-queue-state", async (_event, payload) => {
  queueOverlayState = sanitizeQueueOverlayState(payload);
  return {
    ok: true,
    state: queueOverlayState
  };
});

ipcMain.handle("overlay:get-command-feedback-info", async () => {
  const overlayUrls = getOverlayUrlBundle("/command-feedback-overlay");
  return {
    ...overlayUrls,
    port: queueOverlayPort,
    state: commandFeedbackOverlayState
  };
});

ipcMain.handle("overlay:update-command-feedback-state", async (_event, payload) => {
  const durationMs = Math.max(1000, Number(payload?.durationMs) || 6000);
  const updatedAt = new Date().toISOString();
  commandFeedbackOverlayState = {
    message: String(payload?.message ?? "").trim(),
    commandType: String(payload?.commandType ?? "").trim(),
    username: String(payload?.username ?? "").trim(),
    title: String(payload?.title ?? "").trim() || "Viewer Feedback",
    accentColor: /^#[0-9a-fA-F]{6}$/.test(String(payload?.accentColor ?? "").trim()) ? String(payload.accentColor).trim() : "#53dcff",
    sourceType: String(payload?.sourceType ?? "").trim() || "command",
    updatedAt,
    visibleUntil: new Date(Date.now() + durationMs).toISOString(),
    durationMs
  };

  return {
    ok: true,
    state: commandFeedbackOverlayState
  };
});

ipcMain.handle("overlay:get-designer-info", async () => {
  const overlayUrls = getOverlayUrlBundle("/overlay-designer-preview");
  return {
    ...overlayUrls,
    port: queueOverlayPort,
    state: overlayDesignerState
  };
});

ipcMain.handle("overlay:update-designer-state", async (_event, payload) => {
  overlayDesignerState = sanitizeOverlayDesignerStatePayload(payload);
  broadcastOverlayDesignerState();
  return {
    ok: true,
    state: overlayDesignerState
  };
});

ipcMain.handle("app:open-external", async (_event, payload) => {
  const url = String(payload?.url ?? "").trim();
  if (url === "") {
    throw new Error("A valid URL is required.");
  }

  await shell.openExternal(url);
  return { ok: true };
});

ipcMain.handle("app:quit", async () => {
  try {
    await disconnectFromLive();
  } catch (error) {
    log.warn("Failed to disconnect before quitting", error);
  }

  app.quit();
  return { ok: true };
});

ipcMain.handle("app:save-settings", async (_event, payload) => {
  await saveSettings(payload ?? {});
  return settings;
});

ipcMain.handle("app:get-system-usage", async () => {
  return getSystemUsageSnapshot();
});

ipcMain.handle("app:export-settings-bundle", async (_event, payload) => {
  const defaultFileName = String(payload?.defaultFileName ?? "stream-sync-pro-settings.json").trim() || "stream-sync-pro-settings.json";
  const bundle = payload?.bundle ?? null;

  if (!bundle || typeof bundle !== "object") {
    throw new Error("No settings bundle was provided for export.");
  }

  const saveResult = await dialog.showSaveDialog(mainWindow, {
    title: "Export Stream Sync Pro settings",
    defaultPath: path.join(app.getPath("documents"), defaultFileName),
    filters: [
      { name: "JSON files", extensions: ["json"] }
    ]
  });

  if (saveResult.canceled || !saveResult.filePath) {
    return { canceled: true };
  }

  await fs.writeFile(saveResult.filePath, JSON.stringify(bundle, null, 2), "utf8");
  return { canceled: false, filePath: saveResult.filePath };
});

ipcMain.handle("app:import-settings-bundle", async () => {
  const openResult = await dialog.showOpenDialog(mainWindow, {
    title: "Import Stream Sync Pro settings",
    properties: ["openFile"],
    filters: [
      { name: "JSON files", extensions: ["json"] }
    ]
  });

  if (openResult.canceled || !openResult.filePaths?.length) {
    return { canceled: true };
  }

  const filePath = openResult.filePaths[0];
  const content = await fs.readFile(filePath, "utf8");
  return {
    canceled: false,
    filePath,
    content
  };
});

ipcMain.handle("translation:translate", async (_event, payload) => {
  return translateText(payload ?? {});
});

ipcMain.handle("tts:get-voices", async (_event, payload) => {
    if (payload?.provider === "elevenlabs") {
      return listElevenLabsVoices(payload ?? {});
    }

  return listWindowsTtsVoices();
});

ipcMain.handle("tts:get-elevenlabs-usage", async (_event, payload) => {
  return getElevenLabsUsageDetails(payload ?? {});
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

ipcMain.handle("sound-alerts:get-catalog", async (_event, payload) => {
  const searchQuery = String(payload?.search ?? payload?.query ?? "").trim();
  if (searchQuery) {
    return searchMyInstantsCatalog(searchQuery);
  }

  return fetchMyInstantsCatalog(Boolean(payload?.refresh));
});

ipcMain.handle("sound-alerts:resolve-audio", async (_event, payload) => {
  return {
    audioUrl: await resolveMyInstantsAudioUrl(payload?.soundId ?? "")
  };
});
