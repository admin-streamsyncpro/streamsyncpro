import { app, BrowserWindow, dialog, ipcMain, session, shell } from "electron";
import { execFile, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
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

function ignoreClosedLogPipe(error) {
  return error?.code === "EPIPE" || error?.errno === "EPIPE";
}

function installSafeConsolePipeHandlers() {
  process.stdout?.on?.("error", (error) => {
    if (!ignoreClosedLogPipe(error)) {
      throw error;
    }
  });
  process.stderr?.on?.("error", (error) => {
    if (!ignoreClosedLogPipe(error)) {
      throw error;
    }
  });

  for (const methodName of ["log", "info", "warn", "error"]) {
    const originalMethod = console[methodName]?.bind(console);
    if (!originalMethod) {
      continue;
    }
    console[methodName] = (...args) => {
      try {
        originalMethod(...args);
      } catch (error) {
        if (!ignoreClosedLogPipe(error)) {
          throw error;
        }
      }
    };
  }
}

installSafeConsolePipeHandlers();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { NsisUpdater } = electronUpdater;
const execFileAsync = promisify(execFile);
const TTS_SCRIPT_PATH = path.join(os.tmpdir(), "tiktok-live-reader-tts.ps1");
const XTTS_SERVICE_SCRIPT_PATH = path.join(__dirname, "..", "tools", "xtts_v2_service.py");
const XTTS_SERVICE_PYTHON_PATH = path.join(__dirname, "..", ".venv-xtts", "Scripts", "python.exe");
const XTTS_LEGACY_SERVICE_ROOT = path.join(os.homedir(), "Documents", "Codex", "2026-05-14", "build-a-node-js-desktop-app");
const TTS_CACHE_MAX_TEXT_LENGTH = 500;
const TTS_CACHE_MAX_FILES = 500;
const TTS_CACHE_VERSION = 2;
const DEFAULT_GITHUB_OWNER = "admin-streamsyncpro";
const DEFAULT_GITHUB_REPO = "streamsyncpro";
const QUEUE_OVERLAY_PREFERRED_PORT = 46321;
const TIKTOK_AUTH_PARTITION = "persist:ssp-tiktok-auth";
const TIKTOK_LOGIN_URL = "https://www.tiktok.com/login";
const SPOTIFY_REDIRECT_PORT = 46329;
const SPOTIFY_REDIRECT_PATH = "/spotify/callback";
const SPOTIFY_REDIRECT_URI = `http://127.0.0.1:${SPOTIFY_REDIRECT_PORT}${SPOTIFY_REDIRECT_PATH}`;
const SPOTIFY_AUTH_SCOPES = [
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing"
].join(" ");
const MYINSTANTS_CATEGORY_URL = "https://www.myinstants.com/en/categories/sound%20effects/us/";
const MYINSTANTS_SEARCH_URL = "https://www.myinstants.com/en/search/";
const MYINSTANTS_CACHE_TTL_MS = 30 * 60 * 1000;
const MYINSTANTS_MAX_PAGES = 50;
const MYINSTANTS_SEARCH_MAX_PAGES = 8;
const LOCAL_SOUND_ID_PREFIX = "local-file:";
const LOCAL_MEDIA_ID_PREFIX = "local-media:";
const VOICEMOD_WEBSOCKET_URL = "ws://127.0.0.1:59129/v1";
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
const TIKTOK_TTS_VOICE_OPTIONS = [
  { id: "en_us_001", name: "Jessie", category: "US female" },
  { id: "en_us_006", name: "Joey", category: "US male" },
  { id: "en_us_007", name: "Professor", category: "character" },
  { id: "en_us_009", name: "Scientist", category: "character" },
  { id: "en_us_010", name: "Confidence", category: "character" },
  { id: "en_uk_001", name: "Narrator", category: "UK male" },
  { id: "en_uk_003", name: "Story Teller", category: "UK male" },
  { id: "en_au_001", name: "Metro", category: "AU male" },
  { id: "en_us_ghostface", name: "Ghost Face", category: "effect" },
  { id: "en_us_chewbacca", name: "Chewbacca", category: "effect" },
  { id: "en_us_c3po", name: "C-3PO", category: "effect" },
  { id: "en_us_stitch", name: "Stitch", category: "effect" },
  { id: "en_us_stormtrooper", name: "Stormtrooper", category: "effect" },
  { id: "en_us_rocket", name: "Rocket", category: "effect" },
  { id: "en_female_f08_salut_damour", name: "Alto", category: "singing" },
  { id: "en_male_m03_lobby", name: "Lobby", category: "singing" }
];
const TIKTOK_TTS_ENDPOINTS = [
  "https://api16-normal-c-useast1a.tiktokv.com/media/api/text/speech/invoke/",
  "https://api16-normal-useast5.us.tiktokv.com/media/api/text/speech/invoke/",
  "https://api16-normal-c-useast2a.tiktokv.com/media/api/text/speech/invoke/"
];
const TIKTOK_TTS_FALLBACK_ENDPOINTS = [
  "https://tiktok-tts.weilnet.workers.dev/api/generation"
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
let likeRaceOverlayState = {
  raceEnabled: false,
  raceStatus: "idle",
  countdownSeconds: 10,
  totalSpaces: 1000,
  likeMultiplier: 1,
  giftMultiplier: 5,
  racers: [],
  leaderboard: [],
  currentLeader: null,
  previousLeader: null,
  winner: null,
  lastRaceWinner: null,
  commentaryQueue: [],
  ttsSettings: {},
  overlaySettings: {},
  stats: {},
  updatedAt: null
};
let spinWheelOverlayState = {
  visible: false,
  phase: "idle",
  spinId: "",
  durationMs: 5200,
  resultDurationMs: 5000,
  arrowPosition: "right",
  selectedIndex: 0,
  winnerLabel: "",
  triggeredBy: "",
  triggerUser: null,
  segments: [],
  updatedAt: null
};
let progressBarOverlayState = {
  connected: false,
  username: "",
  bars: [],
  updatedAt: null
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
let xttsServiceProcess = null;
let xttsServiceStartingPromise = null;
let startupSettingsPromise = null;
let startupOverlayPromise = null;

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
  const hostnameUrl = `http://localhost:${queueOverlayPort}${normalizedPath}`;
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
    hostnameUrl,
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
  autoConnectOnLaunch: false,
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
  ttsReadPunctuation: false,
  ttsReadGifts: false,
  ttsGiftMinCoins: 0,
  ttsElevenMode: "free",
  ttsElevenApiKey: "",
  ttsElevenModel: "eleven_flash_v2_5",
  ttsElevenFallbackTiktok: false,
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
  ttsModeration: {
    mutedUsers: [],
    shadowMutedUsers: [],
    blockedWords: [],
    timedOutUsers: {},
    slowModeSeconds: 0,
    userCooldownSeconds: 0,
    filters: {
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
    }
  },
  ttsUserVoiceAssignments: {
    builtin: {},
    tiktok: {},
    elevenlabs: {},
    xtts: {}
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
    obsWebSocketUrl: "ws://127.0.0.1:4455",
    obsWebSocketPassword: "",
    commandFeedbackOverlayDurationMs: 6000,
  commandFeedbackTemplates: {
    myttsvoice: "{user} has selected {voiceLabel} for their personalised TTS voice.",
    listcommands: "{user}, available chat commands: {commandList}"
  },
  votingEnabled: false,
  votingStartRole: "everyone",
  votingOverlayOrientation: "horizontal",
  spinWheelSettings: {
    enabled: true,
    commandEnabled: true,
    giftName: "",
    eventRuleId: "",
    durationMs: 5200,
    resultDurationMs: 5000,
    arrowPosition: "right",
    segments: []
  },
  musicSettings: {}
};

const DEFAULT_SETTINGS = JSON.parse(JSON.stringify(settings));

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
          status: item?.status === "running" ? "running" : "queued",
          source: item?.source && typeof item.source === "object"
            ? {
                user: String(item.source.user ?? "").trim(),
                displayName: String(item.source.displayName ?? "").trim(),
                profilePictureUrl: String(item.source.profilePictureUrl ?? "").trim()
              }
            : null,
          media: item?.media && typeof item.media === "object"
            ? {
                type: item.media.type === "video" ? "video" : "image",
                url: String(item.media.url ?? "").trim(),
                name: String(item.media.name ?? "").trim(),
                durationMs: Math.min(60000, Math.max(1000, Number(item.media.durationMs) || 6000))
              }
            : null
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

function getLikeRaceOverlayUrl() {
  return getOverlayUrlBundle("/like-race-overlay").hostnameUrl;
}

function getSpinWheelOverlayUrl() {
  const overlayUrls = getOverlayUrlBundle("/spin-wheel-overlay");
  return overlayUrls.hostnameUrl || overlayUrls.localUrl || overlayUrls.url;
}

function getProgressBarOverlayUrl() {
  const overlayUrls = getOverlayUrlBundle("/progress-bar-overlay");
  return overlayUrls.hostnameUrl || overlayUrls.localUrl || overlayUrls.url;
}

function getOverlayDesignerPreviewUrl(templateId = "") {
  const baseUrl = getOverlayUrlBundle("/overlay-designer-preview").hostnameUrl;
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

function sanitizeLikeRaceOverlayState(payload = {}) {
  const racers = Array.isArray(payload.racers)
    ? payload.racers
        .map((racer, index) => ({
          userId: String(racer?.userId ?? racer?.username ?? `racer-${index}`).trim() || `racer-${index}`,
          username: String(racer?.username ?? "viewer").trim() || "viewer",
          displayName: String(racer?.displayName ?? racer?.username ?? "Viewer").trim() || "Viewer",
          profilePictureUrl: String(racer?.profilePictureUrl ?? "").trim(),
          spacesMoved: Math.max(0, Number(racer?.spacesMoved) || 0),
          progressPercent: Math.max(0, Math.min(100, Number(racer?.progressPercent) || 0)),
          trackPosition: Math.max(0, Math.min(1, Number(racer?.trackPosition) || 0)),
          likesReceived: Math.max(0, Number(racer?.likesReceived) || 0),
          giftsReceived: Math.max(0, Number(racer?.giftsReceived) || 0),
          giftCoinsReceived: Math.max(0, Number(racer?.giftCoinsReceived) || 0),
          lastActionTime: Number(racer?.lastActionTime) || Date.now(),
          isInactive: Boolean(racer?.isInactive),
          hasTriggeredInactiveCommentary: Boolean(racer?.hasTriggeredInactiveCommentary),
          currentRank: Math.max(1, Number(racer?.currentRank) || index + 1),
          previousRank: Math.max(1, Number(racer?.previousRank) || index + 1),
          speechBubble: String(racer?.speechBubble ?? "").trim()
        }))
        .slice(0, 100)
    : [];

  const leaderboard = Array.isArray(payload.leaderboard)
    ? payload.leaderboard.slice(0, 20)
    : racers
        .slice()
        .sort((left, right) => right.spacesMoved - left.spacesMoved)
        .slice(0, 10);

  return {
    raceEnabled: Boolean(payload.raceEnabled),
    raceStatus: ["idle", "lobby", "countdown", "running", "finished"].includes(String(payload.raceStatus ?? "idle"))
      ? String(payload.raceStatus)
      : "idle",
    countdownSeconds: Math.max(0, Number(payload.countdownSeconds) || 0),
    countdownEndsAt: String(payload.countdownEndsAt ?? "").trim(),
    totalSpaces: Math.max(1, Number(payload.totalSpaces) || 1000),
    likeMultiplier: Math.max(0, Number(payload.likeMultiplier) || 1),
    giftMultiplier: Math.max(0, Number(payload.giftMultiplier) || 5),
    racers,
    leaderboard,
    currentLeader: payload.currentLeader ?? null,
    previousLeader: payload.previousLeader ?? null,
    winner: payload.winner ?? null,
    lastRaceWinner: payload.lastRaceWinner ?? null,
    commentaryQueue: Array.isArray(payload.commentaryQueue) ? payload.commentaryQueue.slice(-12) : [],
    ttsSettings: payload.ttsSettings && typeof payload.ttsSettings === "object" ? payload.ttsSettings : {},
    overlaySettings: payload.overlaySettings && typeof payload.overlaySettings === "object" ? payload.overlaySettings : {},
    stats: payload.stats && typeof payload.stats === "object" ? payload.stats : {},
    updatedAt: new Date().toISOString()
  };
}

function sanitizeSpinWheelOverlayState(payload = {}) {
  const fallbackColors = ["#15c66f", "#9bd400", "#ffd027", "#1598e8", "#7345c8", "#d61e11", "#ff871c", "#9bc7c7"];
  const segments = Array.isArray(payload.segments)
    ? payload.segments
        .map((segment, index) => ({
          id: String(segment?.id ?? `spin-segment-${index}`).trim() || `spin-segment-${index}`,
          label: String(segment?.label ?? `Action ${index + 1}`).trim() || `Action ${index + 1}`,
          color: /^#[0-9a-fA-F]{6}$/.test(String(segment?.color ?? "").trim())
            ? String(segment.color).trim()
            : fallbackColors[index % fallbackColors.length],
          actionRuleId: String(segment?.actionRuleId ?? "").trim()
        }))
        .slice(0, 16)
    : [];
  const phase = ["idle", "spinning", "result"].includes(String(payload.phase ?? "idle"))
    ? String(payload.phase)
    : "idle";
  const selectedIndex = Math.max(0, Math.min(Math.max(0, segments.length - 1), Math.trunc(Number(payload.selectedIndex) || 0)));

  return {
    visible: Boolean(payload.visible) || phase === "spinning" || phase === "result",
    phase,
    spinId: String(payload.spinId ?? "").trim(),
    durationMs: Math.max(1000, Math.min(30000, Number(payload.durationMs) || 5200)),
    resultDurationMs: Math.max(1000, Math.min(30000, Number(payload.resultDurationMs) || 5000)),
    arrowPosition: ["right", "top", "bottom", "left"].includes(String(payload.arrowPosition ?? "").trim().toLowerCase())
      ? String(payload.arrowPosition).trim().toLowerCase()
      : "right",
    fontSize: Math.max(14, Math.min(48, Number(payload.fontSize) || 24)),
    borderThickness: Math.max(1, Math.min(10, Number(payload.borderThickness) || 4)),
    centerSize: Math.max(72, Math.min(240, Number(payload.centerSize) || 118)),
    centerNameSize: Math.max(12, Math.min(40, Number(payload.centerNameSize) || 20)),
    selectedIndex,
    winnerLabel: String(payload.winnerLabel ?? segments[selectedIndex]?.label ?? "").trim(),
    triggeredBy: String(payload.triggeredBy ?? "").trim(),
    triggerUser: payload.triggerUser && typeof payload.triggerUser === "object"
      ? {
          username: String(payload.triggerUser.username ?? "").trim(),
          displayName: String(payload.triggerUser.displayName ?? "").trim(),
          profilePictureUrl: String(payload.triggerUser.profilePictureUrl ?? "").trim()
        }
      : null,
    segments,
    updatedAt: new Date().toISOString()
  };
}

function sanitizeProgressBarOverlayState(payload = {}) {
  const allowedProgressBarFonts = [
    "Segoe UI",
    "Arial",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Georgia",
    "Impact",
    "Courier New",
    "Poppins",
    "Montserrat",
    "Oswald",
    "Bebas Neue"
  ];
  const bars = Array.isArray(payload.bars)
    ? payload.bars
        .map((bar, index) => {
          const goal = Math.max(1, Number(bar?.goal) || 1);
          const value = Math.max(0, Number(bar?.value) || 0);
          const fontFamily = String(bar?.fontFamily ?? "").trim();
          return {
            id: String(bar?.id ?? `progress-bar-${index}`).trim() || `progress-bar-${index}`,
            title: String(bar?.title ?? `Progress Goal ${index + 1}`).trim() || `Progress Goal ${index + 1}`,
            eyebrowText: String(bar?.eyebrowText ?? "Live Goal").trim() || "Live Goal",
            metric: ["likes", "shares", "follows", "coins"].includes(String(bar?.metric ?? "").trim())
              ? String(bar.metric).trim()
              : "likes",
            value,
            goal,
            percent: Math.max(0, Math.min(100, Number(bar?.percent) || ((value / goal) * 100))),
            visible: bar?.visible !== false,
            hideBackground: Boolean(bar?.hideBackground),
            hideText: Boolean(bar?.hideText),
            textPosition: ["above", "below", "inside"].includes(String(bar?.textPosition ?? "").trim())
              ? String(bar.textPosition).trim()
              : "above",
            goalIncreasePercent: Math.max(1, Math.min(1000, Number(bar?.goalIncreasePercent) || 25)),
            titleColor: /^#[0-9a-fA-F]{6}$/.test(String(bar?.titleColor ?? "")) ? String(bar.titleColor).trim() : "#f2fbff",
            textColor: /^#[0-9a-fA-F]{6}$/.test(String(bar?.textColor ?? "")) ? String(bar.textColor).trim() : "#f2fbff",
            mutedColor: /^#[0-9a-fA-F]{6}$/.test(String(bar?.mutedColor ?? "")) ? String(bar.mutedColor).trim() : "#a7bfdd",
            barStartColor: /^#[0-9a-fA-F]{6}$/.test(String(bar?.barStartColor ?? "")) ? String(bar.barStartColor).trim() : "#53dcff",
            barEndColor: /^#[0-9a-fA-F]{6}$/.test(String(bar?.barEndColor ?? "")) ? String(bar.barEndColor).trim() : "#b266ff",
            backgroundColor: /^#[0-9a-fA-F]{6}$/.test(String(bar?.backgroundColor ?? "")) ? String(bar.backgroundColor).trim() : "#091226",
            fontFamily: allowedProgressBarFonts.includes(fontFamily) ? fontFamily : "Segoe UI",
            eyebrowFontSize: Math.max(8, Math.min(72, Number(bar?.eyebrowFontSize) || 12)),
            titleFontSize: Math.max(12, Math.min(140, Number(bar?.titleFontSize) || 44)),
            metricFontSize: Math.max(8, Math.min(72, Number(bar?.metricFontSize) || 12)),
            labelFontSize: Math.max(8, Math.min(96, Number(bar?.labelFontSize) || 15)),
            footerFontSize: Math.max(8, Math.min(72, Number(bar?.footerFontSize) || 13)),
            goalReachedBehavior: ["double", "increase", "hide"].includes(String(bar?.goalReachedBehavior ?? "").trim())
              ? String(bar.goalReachedBehavior).trim()
              : "increase",
            goalAnimation: ["none", "pulse", "flash", "bounce", "sparkle", "confetti"].includes(String(bar?.goalAnimation ?? "").trim())
              ? String(bar.goalAnimation).trim()
              : "pulse",
            goalAnimationNonce: String(bar?.goalAnimationNonce ?? "").trim(),
            goalAnimationAt: String(bar?.goalAnimationAt ?? "").trim(),
            actionRuleId: String(bar?.actionRuleId ?? "").trim(),
            reachedCount: Math.max(0, Number(bar?.reachedCount) || 0),
            updatedAt: String(bar?.updatedAt ?? "").trim()
          };
        })
        .slice(0, 25)
    : [];

  return {
    connected: Boolean(payload?.connected),
    username: String(payload?.username ?? "").trim(),
    bars,
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

async function serveLikeRaceOverlayHtml(response) {
  try {
    const html = await fs.readFile(path.join(__dirname, "like-race-overlay.html"), "utf8");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(html);
  } catch (error) {
    log.error("Failed to serve Like Race overlay HTML", error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Like Race overlay unavailable.");
  }
}

async function serveSpinWheelOverlayHtml(response) {
  try {
    const html = await fs.readFile(path.join(__dirname, "spin-wheel-overlay.html"), "utf8");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(html);
  } catch (error) {
    log.error("Failed to serve Spin Wheel overlay HTML", error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Spin Wheel overlay unavailable.");
  }
}

async function serveProgressBarOverlayHtml(response) {
  try {
    const html = await fs.readFile(path.join(__dirname, "progress-bar-overlay.html"), "utf8");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(html);
  } catch (error) {
    log.error("Failed to serve Progress Bar overlay HTML", error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Progress Bar overlay unavailable.");
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

    if (requestUrl.pathname === "/like-race-overlay") {
      await serveLikeRaceOverlayHtml(response);
      return;
    }

    if (requestUrl.pathname === "/spin-wheel-overlay") {
      await serveSpinWheelOverlayHtml(response);
      return;
    }

    if (requestUrl.pathname === "/progress-bar-overlay") {
      await serveProgressBarOverlayHtml(response);
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

    if (requestUrl.pathname === "/api/like-race-overlay-state") {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      });
      response.end(JSON.stringify({
        ok: true,
        overlayUrl: getLikeRaceOverlayUrl(),
        state: likeRaceOverlayState
      }));
      return;
    }

    if (requestUrl.pathname === "/api/spin-wheel-overlay-state") {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      });
      response.end(JSON.stringify({
        ok: true,
        overlayUrl: getSpinWheelOverlayUrl(),
        state: spinWheelOverlayState
      }));
      return;
    }

    if (requestUrl.pathname === "/api/progress-bar-overlay-state") {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      });
      response.end(JSON.stringify({
        ok: true,
        overlayUrl: getProgressBarOverlayUrl(),
        state: progressBarOverlayState
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
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show();
      mainWindow.focus();
      return;
    }

    mainWindow = new BrowserWindow({
      title: "Stream Sync Pro LIVE",
      width: 1200,
      height: 780,
      minWidth: 860,
      minHeight: 620,
      resizable: true,
      maximizable: true,
      frame: true,
      transparent: false,
      skipTaskbar: false,
      autoHideMenuBar: true,
      backgroundColor: "#071124",
      show: true,
      webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.center();
  mainWindow.setSkipTaskbar(false);
  mainWindow.show();
  mainWindow.focus();
  mainWindow.setAlwaysOnTop(true, "screen-saver");
  setTimeout(() => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      return;
    }
    mainWindow.setAlwaysOnTop(false);
    mainWindow.show();
    mainWindow.focus();
  }, 500);
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.once("ready-to-show", () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      return;
    }
    mainWindow.show();
    mainWindow.focus();
  });
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

function base64UrlEncode(buffer) {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createSpotifyCodeVerifier() {
  return base64UrlEncode(randomBytes(64)).slice(0, 128);
}

function createSpotifyCodeChallenge(verifier) {
  return base64UrlEncode(createHash("sha256").update(verifier).digest());
}

function normalizeSpotifyAuth(auth = {}) {
  return {
    accessToken: String(auth?.accessToken ?? "").trim(),
    refreshToken: String(auth?.refreshToken ?? "").trim(),
    expiresAt: Math.max(0, Number(auth?.expiresAt) || 0),
    tokenType: String(auth?.tokenType ?? "Bearer").trim() || "Bearer",
    displayName: String(auth?.displayName ?? "").trim(),
    userId: String(auth?.userId ?? "").trim()
  };
}

async function exchangeSpotifyToken(params) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(params)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(String(result?.error_description ?? result?.error ?? `Spotify token request failed with ${response.status}.`));
  }
  return result;
}

async function refreshSpotifyAuthIfNeeded({ clientId, auth }) {
  const normalizedClientId = String(clientId ?? "").trim();
  let normalizedAuth = normalizeSpotifyAuth(auth);
  if (!normalizedClientId) {
    throw new Error("Enter your Spotify Client ID before using Spotify controls.");
  }
  if (!normalizedAuth.refreshToken) {
    throw new Error("Sign in to Spotify first.");
  }
  if (normalizedAuth.accessToken && normalizedAuth.expiresAt > Date.now() + 60000) {
    return normalizedAuth;
  }
  const token = await exchangeSpotifyToken({
    client_id: normalizedClientId,
    grant_type: "refresh_token",
    refresh_token: normalizedAuth.refreshToken
  });
  return normalizeSpotifyAuth({
    ...normalizedAuth,
    accessToken: token.access_token || normalizedAuth.accessToken,
    refreshToken: token.refresh_token || normalizedAuth.refreshToken,
    expiresAt: Date.now() + Math.max(30, Number(token.expires_in) || 3600) * 1000,
    tokenType: token.token_type || normalizedAuth.tokenType
  });
}

async function spotifyApiRequest({ clientId, auth, method = "GET", body = null }, endpoint, query = null) {
  const nextAuth = await refreshSpotifyAuthIfNeeded({ clientId, auth });
  const url = new URL(`https://api.spotify.com${endpoint}`);
  if (query && typeof query === "object") {
    Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  }
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${nextAuth.accessToken}`,
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (response.status === 204) {
    return { ok: true, auth: nextAuth };
  }
  const text = await response.text();
  let parsed = {};
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { message: text };
    }
  }
  if (!response.ok) {
    const message = parsed?.error?.message || parsed?.error_description || parsed?.error || parsed?.message || `Spotify request failed with ${response.status}.`;
    throw new Error(message);
  }
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? { ...parsed, auth: nextAuth }
    : { result: parsed, auth: nextAuth };
}

async function beginSpotifySignIn({ clientId }) {
  const normalizedClientId = String(clientId ?? "").trim();
  if (!normalizedClientId) {
    throw new Error("Enter your Spotify Client ID before signing in.");
  }

  const verifier = createSpotifyCodeVerifier();
  const challenge = createSpotifyCodeChallenge(verifier);
  const stateToken = base64UrlEncode(randomBytes(18));
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("client_id", normalizedClientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", SPOTIFY_REDIRECT_URI);
  authUrl.searchParams.set("scope", SPOTIFY_AUTH_SCOPES);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("code_challenge", challenge);
  authUrl.searchParams.set("state", stateToken);

  const authorizationCode = await new Promise((resolve, reject) => {
    const server = createServer((request, response) => {
      try {
        const requestUrl = new URL(request.url || "/", SPOTIFY_REDIRECT_URI);
        if (requestUrl.pathname !== SPOTIFY_REDIRECT_PATH) {
          response.writeHead(404);
          response.end("Not found");
          return;
        }
        const closeServer = () => server.close(() => {});
        const error = requestUrl.searchParams.get("error");
        if (error) {
          response.writeHead(400, { "Content-Type": "text/html" });
          response.end("<h1>Spotify sign-in failed</h1><p>You can close this window.</p>");
          reject(new Error(`Spotify sign-in failed: ${error}`));
          closeServer();
          return;
        }
        if (requestUrl.searchParams.get("state") !== stateToken) {
          response.writeHead(400, { "Content-Type": "text/html" });
          response.end("<h1>Spotify sign-in failed</h1><p>Invalid state. You can close this window.</p>");
          reject(new Error("Spotify sign-in failed because the security state did not match."));
          closeServer();
          return;
        }
        const code = requestUrl.searchParams.get("code");
        if (!code) {
          response.writeHead(400, { "Content-Type": "text/html" });
          response.end("<h1>Spotify sign-in failed</h1><p>No code was returned. You can close this window.</p>");
          reject(new Error("Spotify sign-in did not return an authorization code."));
          closeServer();
          return;
        }
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Spotify connected</h1><p>You can close this window and return to Stream Sync Pro.</p>");
        resolve(code);
        closeServer();
      } catch (error) {
        reject(error);
        server.close(() => {});
      }
    });
    server.on("error", (error) => {
      reject(new Error(`Unable to start Spotify sign-in callback on ${SPOTIFY_REDIRECT_URI}. ${error.message || error}`));
    });
    server.listen(SPOTIFY_REDIRECT_PORT, "127.0.0.1", async () => {
      try {
        await shell.openExternal(authUrl.toString());
      } catch (error) {
        reject(error);
        server.close(() => {});
      }
    });
    setTimeout(() => {
      reject(new Error("Spotify sign-in timed out. Try again."));
      server.close(() => {});
    }, 180000).unref?.();
  });

  const token = await exchangeSpotifyToken({
    client_id: normalizedClientId,
    grant_type: "authorization_code",
    code: authorizationCode,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_verifier: verifier
  });
  let auth = normalizeSpotifyAuth({
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    expiresAt: Date.now() + Math.max(30, Number(token.expires_in) || 3600) * 1000,
    tokenType: token.token_type
  });
  const profile = await spotifyApiRequest({ clientId: normalizedClientId, auth }, "/v1/me");
  auth = normalizeSpotifyAuth({
    ...auth,
    displayName: profile.display_name || profile.id || "",
    userId: profile.id || ""
  });
  return { ok: true, auth, redirectUri: SPOTIFY_REDIRECT_URI };
}

async function spotifyPlayTrack(payload = {}) {
  const query = String(payload?.query ?? "").trim();
  if (!query) {
    throw new Error("Enter a track or artist before using !play.");
  }
  const allowExplicit = Boolean(payload?.allowExplicit);
  const clientId = String(payload?.clientId ?? "").trim();
  let auth = normalizeSpotifyAuth(payload?.auth);
  const search = await spotifyApiRequest({ clientId, auth }, "/v1/search", {
    q: query,
    type: "track",
    limit: allowExplicit ? 1 : 20
  });
  auth = normalizeSpotifyAuth(search.auth);
  const searchResults = Array.isArray(search?.tracks?.items) ? search.tracks.items : [];
  const track = allowExplicit
    ? searchResults[0]
    : searchResults.find((item) => !item?.explicit);
  if (!track?.uri) {
    throw new Error(allowExplicit
      ? `No Spotify track found for "${query}".`
      : `No non-explicit Spotify track found for "${query}". Enable explicit content to allow explicit tracks.`);
  }
  const queued = await spotifyApiRequest({ clientId, auth, method: "POST" }, "/v1/me/player/queue", { uri: track.uri });
  auth = normalizeSpotifyAuth(queued.auth);
  return {
    ok: true,
    auth,
    track: {
      name: track.name,
      artist: track.artists?.map((artist) => artist.name).join(", ") || "",
      uri: track.uri,
      url: track.external_urls?.spotify || ""
    }
  };
}

async function spotifySkipTrack(payload = {}) {
  const result = await spotifyApiRequest({ clientId: payload?.clientId, auth: payload?.auth, method: "POST" }, "/v1/me/player/next");
  return { ok: true, auth: normalizeSpotifyAuth(result.auth) };
}

function normalizeCustomEventRules(source = []) {
  if (!Array.isArray(source)) {
    return [];
  }

  const normalizeTimeValue = (value) => {
    const match = String(value ?? "").trim().match(/^([01]\d|2[0-3]):([0-5]\d)$/);
    return match ? `${match[1]}:${match[2]}` : "";
  };

    return source
      .map((rule, index) => ({
        id: String(rule?.id ?? `rule-${index + 1}`),
        enabled: rule?.enabled !== false,
        name: String(rule?.name ?? `Custom rule ${index + 1}`).trim() || `Custom rule ${index + 1}`,
        metric: ["follows", "likes", "shares", "coins", "specificGift", "treasureBox", "subEmote", "fanEmote", "join", "firstActivity", "anyComment"].includes(rule?.metric) ? rule.metric : "follows",
        threshold: Math.max(1, Number(rule?.threshold) || 1),
        soundId: String(rule?.soundId ?? "").trim(),
        soundVolume: Number.isFinite(Number(rule?.soundVolume))
          ? Math.min(200, Math.max(0, Number(rule.soundVolume)))
          : 100,
        webhookUrl: String(rule?.webhookUrl ?? "").trim(),
        queueId: Math.min(10, Math.max(1, Number(rule?.queueId) || 1)),
        userCooldownSeconds: Math.max(0, Number(rule?.userCooldownSeconds) || 0),
        disableWindowStartTime: normalizeTimeValue(rule?.disableWindowStartTime),
        disableWindowEndTime: normalizeTimeValue(rule?.disableWindowEndTime),
        triggerAudience: ["everyone", "follower", "subscriber", "moderator", "topGifter", "specificUser", "birthday"].includes(rule?.triggerAudience)
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
        feedbackOverlayAccentColor: String(rule?.feedbackOverlayAccentColor ?? "").trim(),
        tiktokTtsText: String(rule?.tiktokTtsText ?? "").trim(),
        tiktokTtsVoice: String(rule?.tiktokTtsVoice ?? "").trim(),
        queueMediaEnabled: Boolean(rule?.queueMediaEnabled),
        queueMediaType: rule?.queueMediaType === "video" ? "video" : "image",
        queueMediaId: String(rule?.queueMediaId ?? "").trim(),
        queueMediaName: String(rule?.queueMediaName ?? "").trim(),
        queueMediaDurationSeconds: Math.min(60, Math.max(1, Number(rule?.queueMediaDurationSeconds) || 6)),
        obsSceneEnabled: Boolean(rule?.obsSceneEnabled),
        obsSceneName: String(rule?.obsSceneName ?? "").trim(),
        obsSceneReturnEnabled: Boolean(rule?.obsSceneReturnEnabled),
        obsSceneReturnSeconds: Math.min(3600, Math.max(1, Number(rule?.obsSceneReturnSeconds) || 10)),
        obsSourceEnabled: Boolean(rule?.obsSourceEnabled),
        obsSourceSceneName: String(rule?.obsSourceSceneName ?? "").trim(),
        obsSourceName: String(rule?.obsSourceName ?? "").trim(),
        obsSourceDeactivateEnabled: Boolean(rule?.obsSourceDeactivateEnabled),
        obsSourceDeactivateSeconds: Math.min(3600, Math.max(1, Number(rule?.obsSourceDeactivateSeconds) || 10)),
        voicemodEnabled: Boolean(rule?.voicemodEnabled),
        voicemodVoiceId: String(rule?.voicemodVoiceId ?? "").trim(),
        voicemodVoiceName: String(rule?.voicemodVoiceName ?? "").trim(),
        voicemodRevertEnabled: Boolean(rule?.voicemodRevertEnabled),
        voicemodRevertSeconds: Math.min(3600, Math.max(1, Number(rule?.voicemodRevertSeconds) || 10))
      }))
      .slice(0, 50);
  }

function normalizeObsWebSocketUrl(value) {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return "ws://127.0.0.1:4455";
  }
  return /^wss?:\/\//i.test(raw) ? raw : `ws://${raw}`;
}

function normalizeVoicemodWebSocketUrl(value) {
  return VOICEMOD_WEBSOCKET_URL;
}

function normalizeAuthApiBaseUrl(value) {
  return String(value || "https://streamsyncpro.co.uk").trim().replace(/\/+$/, "") || "https://streamsyncpro.co.uk";
}

async function fetchVoicemodClientKey(payload = {}) {
  const authApiBaseUrl = normalizeAuthApiBaseUrl(payload.authApiBaseUrl || settings.authApiBaseUrl);
  const userId = Number(payload.userId || 0);
  const sessionToken = String(payload.sessionToken || "").trim();
  if (!userId || !sessionToken) {
    throw new Error("Sign in before using the Voicemod integration.");
  }

  const response = await fetch(`${authApiBaseUrl}/api/integrations/voicemod-client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, sessionToken })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || result?.message || "Unable to load the Voicemod server integration key.");
  }
  const clientKey = String(result.clientKey || "").trim();
  if (!clientKey) {
    throw new Error("The Voicemod server integration key is not configured.");
  }
  return clientKey;
}

function createVoicemodClient(clientKey) {
  const WebSocketCtor = globalThis.WebSocket;
  if (!WebSocketCtor) {
    throw new Error("This app runtime does not support WebSocket connections from the main process.");
  }

  let socket = null;
  let requestId = 0;
  let authRejected = false;
  const pendingRequests = new Map();
  const voicemodAuthErrorMessage = "Voicemod rejected the Stream Sync Pro integration key. Check the server-side Voicemod client key and make sure Voicemod Desktop is open.";

  const rejectPendingRequests = (error) => {
    for (const pending of pendingRequests.values()) {
      clearTimeout(pending.timeout);
      pending.reject(error);
    }
    pendingRequests.clear();
  };

  const close = () => {
    if (socket && socket.readyState === WebSocketCtor.OPEN) {
      socket.close();
    }
  };

  const request = (action, payload = {}, options = {}) => {
    if (authRejected) {
      return Promise.reject(new Error(voicemodAuthErrorMessage));
    }
    if (!socket || socket.readyState !== WebSocketCtor.OPEN) {
      return Promise.reject(new Error("Voicemod WebSocket is not connected."));
    }

    requestId += 1;
    const id = `ssp-voicemod-${Date.now()}-${requestId}`;
    socket.send(JSON.stringify({
      action,
      actionID: id,
      id,
      payload
    }));

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        pendingRequests.delete(id);
        reject(new Error(`Voicemod did not respond to ${action}.`));
      }, Math.max(1000, Number(options.timeoutMs) || 5000));
      pendingRequests.set(id, { resolve, reject, timeout });
    });
  };

  const connect = () => new Promise((resolve, reject) => {
    let settled = false;
    const fail = (error) => {
      if (settled) {
        return;
      }
      settled = true;
      reject(error instanceof Error ? error : new Error(String(error || "Unable to connect to Voicemod.")));
    };
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      resolve({ request, close });
    };

    try {
      socket = new WebSocketCtor(VOICEMOD_WEBSOCKET_URL);
    } catch (error) {
      fail(error);
      return;
    }

    const timeout = setTimeout(() => {
      fail(new Error("Unable to connect to Voicemod. Make sure Voicemod Desktop is open and its local API is enabled."));
      close();
    }, 6000);

    socket.addEventListener("open", () => {
      clearTimeout(timeout);
      request("registerClient", { clientKey }, { timeoutMs: 3000 })
        .then(finish)
        .catch((error) => {
          fail(error);
          close();
        });
    });

    socket.addEventListener("error", () => {
      clearTimeout(timeout);
      fail(new Error("Unable to connect to Voicemod. Make sure Voicemod Desktop is open and its local API is enabled."));
    });

    socket.addEventListener("close", () => {
      clearTimeout(timeout);
      rejectPendingRequests(new Error(authRejected ? voicemodAuthErrorMessage : "Voicemod WebSocket closed before the request completed."));
      if (!settled) {
        fail(new Error("Voicemod WebSocket closed before connecting."));
      }
    });

    socket.addEventListener("message", (event) => {
      let message = null;
      try {
        message = JSON.parse(event.data);
      } catch {
        return;
      }

      const id = String(message?.id ?? message?.actionID ?? "");
      if (!id || !pendingRequests.has(id)) {
        return;
      }
      const pending = pendingRequests.get(id);
      pendingRequests.delete(id);
      clearTimeout(pending.timeout);

      const status = message?.payload?.status ?? message?.actionObject?.status ?? null;
      if (Number(status?.code) === 401) {
        authRejected = true;
        pending.reject(new Error(voicemodAuthErrorMessage));
      } else if (message?.error) {
        pending.reject(new Error(String(message.error?.message ?? message.error ?? "Voicemod request failed.")));
      } else {
        pending.resolve(message?.payload ?? message?.actionObject ?? message);
      }
    });
  });

  return { connect };
}

function normalizeVoicemodVoiceEntry(entry = {}) {
  const id = String(entry.voiceID ?? entry.voiceId ?? entry.id ?? entry.name ?? "").trim();
  if (!id) {
    return null;
  }
  const name = String(entry.friendlyName ?? entry.name ?? entry.voiceName ?? id).trim() || id;
  return { id, name };
}

function extractVoicemodVoiceList(response = {}) {
  const voices = Array.isArray(response)
    ? response
    : Array.isArray(response.voices)
      ? response.voices
      : Array.isArray(response.voiceList)
        ? response.voiceList
        : Array.isArray(response?.payload?.voices)
          ? response.payload.voices
          : [];
  return voices.map(normalizeVoicemodVoiceEntry).filter(Boolean);
}

async function withVoicemodConnection(payload, action) {
  const clientKey = await fetchVoicemodClientKey(payload);
  const client = createVoicemodClient(clientKey);
  const connection = await client.connect();
  try {
    return await action(connection);
  } finally {
    connection.close();
  }
}

async function loadVoicemodVoice(connection, voiceId) {
  const normalizedVoiceId = String(voiceId ?? "").trim();
  if (!normalizedVoiceId) {
    return;
  }
  try {
    await connection.request("loadVoice", { voiceID: normalizedVoiceId });
  } catch (firstError) {
    try {
      await connection.request("loadVoice", { voiceId: normalizedVoiceId });
    } catch {
      try {
        await connection.request("selectVoice", { voiceID: normalizedVoiceId });
      } catch {
        throw firstError;
      }
    }
  }
}

async function getVoicemodVoices(payload = {}) {
  return withVoicemodConnection(payload, async (connection) => {
    const response = await connection.request("getVoices", {});
    return extractVoicemodVoiceList(response);
  });
}

async function getCurrentVoicemodVoiceId(payload = {}) {
  return withVoicemodConnection(payload, async (connection) => {
    const response = await connection.request("getCurrentVoice", {}).catch(() => null);
    return String(
      response?.voiceID
      ?? response?.voiceId
      ?? response?.id
      ?? response?.currentVoice
      ?? response?.currentVoiceID
      ?? ""
    ).trim();
  });
}

async function setVoicemodVoice(payload = {}) {
  const voiceId = String(payload?.voiceId ?? "").trim();
  if (!voiceId) {
    throw new Error("Choose a Voicemod voice before running this action.");
  }
  return withVoicemodConnection(payload, async (connection) => {
    await loadVoicemodVoice(connection, voiceId);
    return { ok: true };
  });
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
  settings.ttsProvider = normalizeTtsProvider(settings.ttsProvider);
  settings.ttsElevenFallbackTiktok = Boolean(settings.ttsElevenFallbackTiktok);
  settings.ttsXttsServiceUrl = String(settings.ttsXttsServiceUrl ?? "http://127.0.0.1:8020").trim() || "http://127.0.0.1:8020";
  settings.ttsXttsSplitSentences = Boolean(settings.ttsXttsSplitSentences);
  settings.ttsXttsVoices = normalizeXttsVoices(settings.ttsXttsVoices);
  settings.ttsUserVoiceAssignments = {
    builtin: settings.ttsUserVoiceAssignments?.builtin ?? {},
    tiktok: settings.ttsUserVoiceAssignments?.tiktok ?? {},
    elevenlabs: settings.ttsUserVoiceAssignments?.elevenlabs ?? {},
    xtts: settings.ttsUserVoiceAssignments?.xtts ?? {}
  };

  // Keep updater settings pinned to the built-in GitHub Releases repo.
  settings.githubOwner = DEFAULT_GITHUB_OWNER;
  settings.githubRepo = DEFAULT_GITHUB_REPO;
  settings.obsWebSocketUrl = normalizeObsWebSocketUrl(settings.obsWebSocketUrl);
  settings.obsWebSocketPassword = String(settings.obsWebSocketPassword ?? "");
  delete settings.voicemodWebSocketUrl;
  delete settings.voicemodClientKey;
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
  settings.obsWebSocketUrl = normalizeObsWebSocketUrl(settings.obsWebSocketUrl);
  settings.obsWebSocketPassword = String(settings.obsWebSocketPassword ?? "");
  delete settings.voicemodWebSocketUrl;
  delete settings.voicemodClientKey;
  settings.customEventRules = normalizeCustomEventRules(settings.customEventRules);
  settings.commandFeedbackOverlayDurationMs = Math.max(1000, Number(settings.commandFeedbackOverlayDurationMs) || 6000);
  settings.commandFeedbackTemplates = {
    myttsvoice: String(settings.commandFeedbackTemplates?.myttsvoice ?? "{user} has selected {voiceLabel} for their personalised TTS voice."),
    listcommands: String(settings.commandFeedbackTemplates?.listcommands ?? "{user}, available chat commands: {commandList}")
  };
  settings.ttsProvider = normalizeTtsProvider(settings.ttsProvider);
  settings.ttsElevenFallbackTiktok = Boolean(settings.ttsElevenFallbackTiktok);
  settings.ttsXttsServiceUrl = String(settings.ttsXttsServiceUrl ?? "http://127.0.0.1:8020").trim() || "http://127.0.0.1:8020";
  settings.ttsXttsSplitSentences = Boolean(settings.ttsXttsSplitSentences);
  settings.ttsXttsVoices = normalizeXttsVoices(settings.ttsXttsVoices);
  settings.ttsUserVoiceAssignments = {
    builtin: settings.ttsUserVoiceAssignments?.builtin ?? {},
    tiktok: settings.ttsUserVoiceAssignments?.tiktok ?? {},
    elevenlabs: settings.ttsUserVoiceAssignments?.elevenlabs ?? {},
    xtts: settings.ttsUserVoiceAssignments?.xtts ?? {}
  };

  updateConfig = getGitHubUpdateConfig(settings);

  await fs.mkdir(app.getPath("userData"), { recursive: true });
  await fs.writeFile(getSettingsPath(), JSON.stringify(settings, null, 2), "utf8");
}

async function removePathIfExists(targetPath) {
  if (!targetPath) {
    return;
  }

  try {
    await fs.rm(targetPath, { recursive: true, force: true });
  } catch (error) {
    log.warn(`Failed to remove ${targetPath}`, error);
  }
}

async function clearAppSessionStorage() {
  const storageTasks = [
    session.defaultSession.clearStorageData(),
    session.defaultSession.clearCache(),
    getTikTokAuthSession().clearStorageData(),
    getTikTokAuthSession().clearCache()
  ];

  const results = await Promise.allSettled(storageTasks);
  results.forEach((result) => {
    if (result.status === "rejected") {
      log.warn("Failed to clear session storage during factory reset", result.reason);
    }
  });
}

async function factoryResetAppData() {
  try {
    await disconnectFromLive();
  } catch (error) {
    log.warn("Failed to disconnect during factory reset", error);
  }

  if (tiktokAuthWindow && !tiktokAuthWindow.isDestroyed()) {
    tiktokAuthWindow.close();
    tiktokAuthWindow = null;
  }

  if (xttsServiceProcess && !xttsServiceProcess.killed) {
    xttsServiceProcess.kill();
    xttsServiceProcess = null;
  }

  myInstantsCatalogCache = { fetchedAt: 0, sounds: [] };
  myInstantsSoundLookup.clear();
  myInstantsAudioUrlCache.clear();
  settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
  updateConfig = getGitHubUpdateConfig(settings);

  await Promise.allSettled([
    clearTikTokAuthSessionCookies(),
    clearAppSessionStorage(),
    removePathIfExists(getSettingsPath()),
    removePathIfExists(getTtsCacheDirectory()),
    removePathIfExists(path.join(app.getPath("userData"), "xtts-voices"))
  ]);

  app.relaunch();
  setTimeout(() => {
    app.exit(0);
  }, 350);

  return { ok: true };
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
    if (response.status === 404) {
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

  let sound = myInstantsSoundLookup.get(soundId)
    ?? (await fetchMyInstantsCatalog(false)).find((entry) => entry.id === soundId);

  if (!sound?.pageUrl && String(soundId).startsWith("/en/instant/")) {
    sound = {
      id: soundId,
      title: "",
      pageUrl: new URL(soundId, MYINSTANTS_CATEGORY_URL).toString()
    };
  }

  if (!sound?.pageUrl) {
    const searchToken = String(soundId).replace(/[-_]+/g, " ").trim();
    const searchResults = await searchMyInstantsCatalog(searchToken).catch(() => []);
    sound = searchResults.find((entry) => entry.id === soundId);
  }

  if (!sound?.pageUrl) {
    throw new Error("That sound is no longer available in the MyInstants catalog. Search for the sound again or choose a local file.");
  }

  const audioUrl = await resolveMyInstantsDownloadUrl(sound.pageUrl);
  myInstantsAudioUrlCache.set(soundId, audioUrl);
  return audioUrl;
}

function getLocalSoundPath(soundId) {
  const value = String(soundId ?? "").trim();
  if (!value.startsWith(LOCAL_SOUND_ID_PREFIX)) {
    return "";
  }
  return value.slice(LOCAL_SOUND_ID_PREFIX.length).trim();
}

function getAudioMimeType(filePath) {
  const extension = path.extname(String(filePath ?? "")).toLowerCase();
  if (extension === ".wav") {
    return "audio/wav";
  }
  if (extension === ".ogg") {
    return "audio/ogg";
  }
  if (extension === ".m4a" || extension === ".mp4" || extension === ".aac") {
    return "audio/mp4";
  }
  if (extension === ".flac") {
    return "audio/flac";
  }
  return "audio/mpeg";
}

function getEventActionMediaMimeType(filePath) {
  const extension = path.extname(String(filePath ?? "")).toLowerCase();
  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".mp4":
      return "video/mp4";
    case ".webm":
      return "video/webm";
    case ".mov":
      return "video/quicktime";
    case ".mkv":
      return "video/x-matroska";
    case ".png":
    default:
      return "image/png";
  }
}

function getLocalMediaPath(mediaId) {
  const value = String(mediaId ?? "").trim();
  if (!value.startsWith(LOCAL_MEDIA_ID_PREFIX)) {
    return "";
  }
  return value.slice(LOCAL_MEDIA_ID_PREFIX.length).trim();
}

async function resolveLocalSoundAudioUrl(soundId) {
  const filePath = getLocalSoundPath(soundId);
  if (!filePath) {
    throw new Error("No local sound file was selected.");
  }

  const stats = await fs.stat(filePath).catch(() => null);
  if (!stats?.isFile()) {
    throw new Error("The selected local sound file could not be found.");
  }

  const bytes = await fs.readFile(filePath);
  return `data:${getAudioMimeType(filePath)};base64,${bytes.toString("base64")}`;
}

async function resolveLocalEventActionMediaUrl(mediaId) {
  const filePath = getLocalMediaPath(mediaId);
  if (!filePath) {
    throw new Error("No local media file was selected.");
  }

  const stats = await fs.stat(filePath).catch(() => null);
  if (!stats?.isFile()) {
    throw new Error("The selected media file could not be found.");
  }

  const bytes = await fs.readFile(filePath);
  return `data:${getEventActionMediaMimeType(filePath)};base64,${bytes.toString("base64")}`;
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

function normalizeXttsVoices(source = []) {
  if (!Array.isArray(source)) {
    return [];
  }

  const seen = new Set();
  return source
    .map((voice) => {
      const id = String(voice?.id ?? "").trim();
      const name = String(voice?.name ?? "").trim();
      const legacySamplePath = String(voice?.samplePath ?? "").trim();
      const samplePaths = Array.from(new Set([
        legacySamplePath,
        ...(Array.isArray(voice?.samplePaths) ? voice.samplePaths : [])
      ].map((samplePath) => String(samplePath ?? "").trim()).filter(Boolean))).slice(0, 12);
      const youtubeUrl = String(voice?.youtubeUrl ?? "").trim();
      return {
        id,
        name,
        samplePath: samplePaths[0] ?? "",
        samplePaths,
        youtubeUrl,
        tuning: {
          strength: Math.max(0, Math.min(1, Number(voice?.tuning?.strength ?? voice?.tuning?.cloneStrength ?? 0.75) || 0.75)),
          echo: Math.max(0, Math.min(1, Number(voice?.tuning?.echo ?? 0) || 0)),
          reverb: Math.max(0, Math.min(1, Number(voice?.tuning?.reverb ?? 0) || 0)),
          robotic: Math.max(0, Math.min(1, Number(voice?.tuning?.robotic ?? 0) || 0)),
          rate: Math.max(0.7, Math.min(1.5, Number(voice?.tuning?.rate ?? 1) || 1)),
          pitch: Math.max(0.5, Math.min(1.8, Number(voice?.tuning?.pitch ?? 1) || 1))
        },
        createdAt: Number(voice?.createdAt) || Date.now()
      };
    })
    .filter((voice) => {
      if (!voice.id || !voice.name || (!voice.samplePaths.length && !voice.youtubeUrl) || seen.has(voice.id)) {
        return false;
      }
      seen.add(voice.id);
      return true;
    })
    .slice(0, 100);
}

function createXttsImportVoiceId() {
  return `xtts-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function sanitizeFileNamePart(value, fallback = "xtts-voice") {
  return String(value ?? "")
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || fallback;
}

function normalizeXttsServiceUrl(value) {
  const url = String(value ?? "").trim() || "http://127.0.0.1:8020";
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("XTTS service URL must start with http:// or https://.");
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    throw new Error("Enter a valid XTTS service URL, for example http://127.0.0.1:8020.");
  }
}

function formatXttsServiceUnavailableError(serviceUrl, error = null) {
  const suffix = error?.message ? ` ${error.message}` : "";
  return `XTTS service is not running or cannot be reached at ${serviceUrl}. Install/configure the local XTTS service, or start your XTTS server, then click "Check XTTS service" in the app.${suffix}`.trim();
}

async function checkXttsServiceReachable(serviceUrl, timeoutMs = 3500) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${serviceUrl}/health`, {
      signal: controller.signal
    }).catch(async (error) => {
      if (error?.name === "AbortError") {
        throw error;
      }
      return fetch(serviceUrl, {
        signal: controller.signal
      });
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return true;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function waitForXttsService(serviceUrl, timeoutMs = 120000) {
  const startedAt = Date.now();
  let lastError = null;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      await checkXttsServiceReachable(serviceUrl, 2500);
      return true;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }

  throw new Error(formatXttsServiceUnavailableError(serviceUrl, lastError));
}

function getXttsServiceFileCandidates() {
  const appRoot = path.join(__dirname, "..");
  const resourceRoot = process.resourcesPath || appRoot;
  const roots = [
    appRoot,
    process.cwd(),
    resourceRoot,
    path.join(resourceRoot, "app.asar.unpacked"),
    XTTS_LEGACY_SERVICE_ROOT
  ];

  const seen = new Set();
  return roots
    .map((rootPath) => path.resolve(rootPath))
    .filter((rootPath) => {
      if (seen.has(rootPath)) {
        return false;
      }
      seen.add(rootPath);
      return true;
    })
    .map((rootPath) => ({
      rootPath,
      pythonPath: path.join(rootPath, ".venv-xtts", "Scripts", "python.exe"),
      scriptPath: path.join(rootPath, "tools", "xtts_v2_service.py")
    }));
}

function resolveXttsServiceFiles() {
  return getXttsServiceFileCandidates().find((candidate) =>
    fsSync.existsSync(candidate.pythonPath) && fsSync.existsSync(candidate.scriptPath)
  ) ?? null;
}

async function startLocalXttsService(payload = {}) {
  const serviceUrl = normalizeXttsServiceUrl(payload?.xttsServiceUrl);

  try {
    await checkXttsServiceReachable(serviceUrl, 1500);
    return {
      ok: true,
      started: false,
      message: `XTTS service is already running at ${serviceUrl}.`
    };
  } catch {
    // Continue and try the bundled/local service.
  }

  if (xttsServiceProcess && !xttsServiceProcess.killed) {
    await waitForXttsService(serviceUrl);
    return {
      ok: true,
      started: false,
      message: `XTTS service is running at ${serviceUrl}.`
    };
  }

  if (xttsServiceStartingPromise) {
    await xttsServiceStartingPromise;
    return {
      ok: true,
      started: false,
      message: `XTTS service is running at ${serviceUrl}.`
    };
  }

  const serviceFiles = resolveXttsServiceFiles();
  if (!serviceFiles) {
    const searchedRoots = getXttsServiceFileCandidates().map((candidate) => candidate.rootPath).join("; ");
    throw new Error(`Cannot auto-start XTTS because .venv-xtts\\Scripts\\python.exe and tools\\xtts_v2_service.py were not found. Searched: ${searchedRoots}.`);
  }

  xttsServiceStartingPromise = (async () => {
    xttsServiceProcess = spawn(serviceFiles.pythonPath, ["-u", serviceFiles.scriptPath], {
      cwd: serviceFiles.rootPath,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"]
    });

    xttsServiceProcess.stdout?.on("data", (chunk) => {
      log.info(`[XTTS] ${String(chunk).trim()}`);
    });
    xttsServiceProcess.stderr?.on("data", (chunk) => {
      log.warn(`[XTTS] ${String(chunk).trim()}`);
    });
    xttsServiceProcess.on("exit", (code, signal) => {
      log.info(`XTTS service exited`, { code, signal });
      xttsServiceProcess = null;
    });

    await waitForXttsService(serviceUrl);
  })();

  try {
    await xttsServiceStartingPromise;
    return {
      ok: true,
      started: true,
      message: `Started XTTS service at ${serviceUrl}.`
    };
  } finally {
    xttsServiceStartingPromise = null;
  }
}

function getAudioExtensionFromContentType(contentType = "") {
  const normalizedType = String(contentType).toLowerCase();
  if (normalizedType.includes("mpeg") || normalizedType.includes("mp3")) {
    return "mp3";
  }
  if (normalizedType.includes("wav") || normalizedType.includes("wave")) {
    return "wav";
  }
  if (normalizedType.includes("ogg")) {
    return "ogg";
  }
  return "wav";
}

function getTtsCacheDirectory() {
  return path.join(app.getPath("userData"), "tts-cache");
}

function normalizeXttsLanguage(value) {
  const language = String(value ?? "en").trim().toLowerCase();
  const supported = new Set(["en", "es", "fr", "de", "it", "pt", "pl", "tr", "ru", "nl", "cs", "ar", "zh-cn", "ja", "ko"]);
  return supported.has(language) ? language : "en";
}

function normalizeTtsProvider(value) {
  const provider = String(value ?? "builtin").trim().toLowerCase();
  return ["builtin", "elevenlabs", "tiktok"].includes(provider) ? provider : "builtin";
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => stableStringify(entry)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }

  return JSON.stringify(value);
}

function hashText(value = "") {
  return createHash("sha256").update(String(value)).digest("hex");
}

function getTtsCacheKey(payload = {}) {
  const provider = String(payload?.provider ?? "builtin").trim() || "builtin";
  const xttsVoice = payload?.xttsVoice && typeof payload.xttsVoice === "object" ? payload.xttsVoice : {};
  const xttsTuning = payload?.xttsTuning && typeof payload.xttsTuning === "object" ? payload.xttsTuning : {};
  const keyPayload = {
    cacheVersion: TTS_CACHE_VERSION,
    provider,
    text: String(payload?.text ?? ""),
    voiceName: String(payload?.voiceName ?? ""),
    voiceId: String(payload?.voiceId ?? ""),
    mode: String(payload?.mode ?? ""),
    modelId: String(payload?.modelId ?? ""),
    apiKeyHash: payload?.apiKey ? hashText(payload.apiKey).slice(0, 16) : "",
    style: String(payload?.style ?? "natural"),
    language: provider === "xtts" ? normalizeXttsLanguage(payload?.xttsLanguage) : "",
    rate: Number(payload?.rate) || 1,
    pitch: provider === "xtts" ? 1 : Number(payload?.pitch) || 1,
    xttsSplitSentences: Boolean(payload?.xttsSplitSentences),
    xttsVoice: provider === "xtts"
      ? {
          id: String(xttsVoice?.id ?? ""),
          name: String(xttsVoice?.name ?? ""),
          samplePaths: Array.isArray(xttsVoice?.samplePaths) ? xttsVoice.samplePaths.map((samplePath) => String(samplePath)) : [],
          youtubeUrl: String(xttsVoice?.youtubeUrl ?? "")
        }
      : null,
    xttsStrength: provider === "xtts" ? Number(xttsTuning?.strength ?? xttsVoice?.tuning?.strength ?? 0.75) || 0.75 : null
  };

  return createHash("sha256").update(stableStringify(keyPayload)).digest("hex");
}

function shouldUseTtsCache(payload = {}) {
  const text = String(payload?.text ?? "").trim();
  if (!text || text.length > TTS_CACHE_MAX_TEXT_LENGTH) {
    return false;
  }

  return ["builtin", "elevenlabs", "xtts", "tiktok"].includes(String(payload?.provider ?? "builtin").trim() || "builtin");
}

async function findCachedTtsFile(cacheKey) {
  const cacheDirectory = getTtsCacheDirectory();
  const entries = await fs.readdir(cacheDirectory, { withFileTypes: true }).catch(() => []);
  const cachedEntry = entries.find((entry) => entry.isFile() && entry.name.startsWith(`${cacheKey}.`));
  if (!cachedEntry) {
    return "";
  }

  const filePath = path.join(cacheDirectory, cachedEntry.name);
  await fs.utimes(filePath, new Date(), new Date()).catch(() => {});
  return filePath;
}

async function pruneTtsCache() {
  const cacheDirectory = getTtsCacheDirectory();
  const entries = await fs.readdir(cacheDirectory, { withFileTypes: true }).catch(() => []);
  const files = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }
    const filePath = path.join(cacheDirectory, entry.name);
    const stats = await fs.stat(filePath).catch(() => null);
    if (stats) {
      files.push({ filePath, mtimeMs: stats.mtimeMs });
    }
  }

  files.sort((left, right) => right.mtimeMs - left.mtimeMs);
  await Promise.all(files.slice(TTS_CACHE_MAX_FILES).map((file) => fs.unlink(file.filePath).catch(() => {})));
}

async function getTtsCacheInfo() {
  const cacheDirectory = getTtsCacheDirectory();
  const entries = await fs.readdir(cacheDirectory, { withFileTypes: true }).catch(() => []);
  let fileCount = 0;
  let totalBytes = 0;

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }
    const stats = await fs.stat(path.join(cacheDirectory, entry.name)).catch(() => null);
    if (stats) {
      fileCount += 1;
      totalBytes += stats.size;
    }
  }

  return {
    directory: cacheDirectory,
    fileCount,
    totalBytes,
    maxFiles: TTS_CACHE_MAX_FILES,
    maxTextLength: TTS_CACHE_MAX_TEXT_LENGTH
  };
}

async function clearTtsCache() {
  const cacheDirectory = getTtsCacheDirectory();
  const entries = await fs.readdir(cacheDirectory, { withFileTypes: true }).catch(() => []);
  let deleted = 0;

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }
    await fs.unlink(path.join(cacheDirectory, entry.name)).then(() => {
      deleted += 1;
    }).catch(() => {});
  }

  return {
    ok: true,
    deleted,
    ...(await getTtsCacheInfo())
  };
}

async function cacheSynthesizedTtsFile(cacheKey, sourceFilePath) {
  const extension = path.extname(sourceFilePath) || ".wav";
  const cacheDirectory = getTtsCacheDirectory();
  await fs.mkdir(cacheDirectory, { recursive: true });
  const cacheFilePath = path.join(cacheDirectory, `${cacheKey}${extension}`);
  await fs.copyFile(sourceFilePath, cacheFilePath);
  void pruneTtsCache();
  return cacheFilePath;
}

function listXttsVoices(payload = {}) {
  return normalizeXttsVoices(payload?.xttsVoices).map((voice) => ({
    id: voice.id,
    name: voice.name,
    samplePath: voice.samplePath,
    samplePaths: voice.samplePaths,
    youtubeUrl: voice.youtubeUrl,
    tuning: voice.tuning,
    ttsKind: "xtts",
    category: `${voice.samplePaths?.length || 0} samples${voice.youtubeUrl ? " + youtube" : ""}`
  }));
}

function listTikTokTtsVoices() {
  return TIKTOK_TTS_VOICE_OPTIONS.map((voice) => ({
    ...voice,
    ttsKind: "tiktok"
  }));
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

function normalizeTikTokTtsVoiceId(voiceId = "") {
  const requestedVoiceId = String(voiceId ?? "").trim();
  return TIKTOK_TTS_VOICE_OPTIONS.some((voice) => voice.id === requestedVoiceId)
    ? requestedVoiceId
    : TIKTOK_TTS_VOICE_OPTIONS[0].id;
}

function formatTikTokTtsErrorMessage(rawErrorText = "", status = "") {
  const fallback = status
    ? `TikTok TTS returned ${status}. Try another TikTok voice or try again shortly.`
    : "Unable to synthesize speech with TikTok TTS. Try another TikTok voice or try again shortly.";
  if (!rawErrorText?.trim()) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(rawErrorText);
    return String(parsed?.message ?? parsed?.status_msg ?? parsed?.error ?? "").trim() || fallback;
  } catch {
    return rawErrorText.trim() || fallback;
  }
}

function getTikTokAudioBase64(result = {}) {
  return String(
    result?.data?.v_str
      ?? result?.data?.audio
      ?? result?.data
      ?? result?.audio
      ?? result?.v_str
      ?? ""
  ).trim();
}

async function synthesizeTikTokSpeechToFile({ text, voiceId }) {
  const trimmedText = String(text ?? "").trim();
  if (!trimmedText) {
    throw new Error("Enter text before using TikTok TTS.");
  }

  const requestedVoiceId = normalizeTikTokTtsVoiceId(voiceId);
  const body = new URLSearchParams({
    text_speaker: requestedVoiceId,
    req_text: trimmedText,
    speaker_map_type: "0"
  });
  let lastError = null;
  let audioBase64 = "";

  for (const endpoint of TIKTOK_TTS_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "com.zhiliaoapp.musically/2022600030"
        },
        body
      });

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(formatTikTokTtsErrorMessage(responseText, String(response.status)));
      }

      let result = null;
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(formatTikTokTtsErrorMessage(responseText));
      }

      const statusCode = Number(result?.status_code ?? result?.statusCode ?? 0);
      if (statusCode !== 0) {
        throw new Error(String(result?.message ?? result?.status_msg ?? "").trim() || `TikTok TTS returned status ${statusCode}.`);
      }

      audioBase64 = getTikTokAudioBase64(result);
      if (audioBase64) {
        break;
      }
      throw new Error("TikTok TTS did not return audio for this voice/text.");
    } catch (error) {
      lastError = error;
    }
  }

  if (!audioBase64) {
    for (const endpoint of TIKTOK_TTS_FALLBACK_ENDPOINTS) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "User-Agent": "Stream Sync Pro LIVE"
          },
          body: JSON.stringify({
            text: trimmedText,
            voice: requestedVoiceId
          })
        });

        const responseText = await response.text();
        if (!response.ok) {
          throw new Error(formatTikTokTtsErrorMessage(responseText, String(response.status)));
        }

        let result = null;
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(formatTikTokTtsErrorMessage(responseText));
        }

        if (result?.success === false) {
          throw new Error(String(result?.error ?? result?.message ?? "").trim() || "TikTok TTS fallback could not generate speech.");
        }

        audioBase64 = getTikTokAudioBase64(result);
        if (audioBase64) {
          break;
        }
        throw new Error("TikTok TTS fallback did not return audio for this voice/text.");
      } catch (error) {
        lastError = error;
      }
    }
  }

  if (!audioBase64) {
    throw new Error(lastError?.message || "TikTok TTS is unavailable right now. Try another voice or try again shortly.");
  }

  const outputPath = path.join(
    os.tmpdir(),
    `stream-sync-pro-tiktok-${Date.now()}-${Math.random().toString(16).slice(2)}.mp3`
  );
  await fs.writeFile(outputPath, Buffer.from(audioBase64, "base64"));
  return outputPath;
}

async function synthesizeXttsSpeechToFile({ text, xttsServiceUrl, xttsVoice, xttsTuning, xttsSplitSentences, xttsLanguage, rate, pitch }) {
  const voice = normalizeXttsVoices([xttsVoice])[0] ?? null;
  if (!voice) {
    throw new Error("Choose or create an XTTS voice first.");
  }

  const serviceUrl = normalizeXttsServiceUrl(xttsServiceUrl);
  const speakerWav = voice.samplePaths.length > 1 ? voice.samplePaths : voice.samplePath || voice.youtubeUrl;
  const tuning = {
    strength: Math.max(0, Math.min(1, Number(xttsTuning?.strength ?? voice.tuning?.strength ?? 0.75) || 0.75)),
    echo: Math.max(0, Math.min(1, Number(xttsTuning?.echo ?? voice.tuning?.echo ?? 0) || 0)),
    reverb: Math.max(0, Math.min(1, Number(xttsTuning?.reverb ?? voice.tuning?.reverb ?? 0) || 0)),
    robotic: Math.max(0, Math.min(1, Number(xttsTuning?.robotic ?? voice.tuning?.robotic ?? 0) || 0))
  };
  const requestBody = JSON.stringify({
      text,
      voiceId: voice.id,
      voiceName: voice.name,
      language: normalizeXttsLanguage(xttsLanguage),
      speaker_wav: speakerWav,
      speakerWav,
      samplePath: voice.samplePath,
      samplePaths: voice.samplePaths,
      youtubeUrl: voice.youtubeUrl,
      split_sentences: Boolean(xttsSplitSentences),
      splitSentences: Boolean(xttsSplitSentences),
      enable_text_splitting: Boolean(xttsSplitSentences),
      stream: false,
      streaming: false,
      trim_silence: false,
      trimSilence: false,
      add_trailing_silence_ms: 450,
      trailingSilenceMs: 450,
      clone_strength: tuning.strength,
      cloneStrength: tuning.strength,
      speaker_strength: tuning.strength,
      speakerStrength: tuning.strength,
      voice_strength: tuning.strength,
      voiceStrength: tuning.strength,
      speed: Math.max(0.75, Math.min(1.25, Number(rate) || 1)),
      volume: 1
  });
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "audio/wav, audio/mpeg, application/json",
      "Content-Type": "application/json"
    },
    body: requestBody
  };

  let response = null;
  try {
    response = await fetch(`${serviceUrl}/tts`, requestOptions);
  } catch (firstError) {
    try {
      await startLocalXttsService({ xttsServiceUrl: serviceUrl });
      response = await fetch(`${serviceUrl}/tts`, requestOptions);
    } catch (retryError) {
      throw new Error(formatXttsServiceUnavailableError(serviceUrl, retryError || firstError));
    }
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || `XTTS service returned ${response.status}.`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const result = await response.json();
    const audioBase64 = String(result?.audioBase64 ?? result?.audio ?? "").trim();
    if (!audioBase64) {
      throw new Error("XTTS service did not return audio.");
    }
    const extension = String(result?.extension ?? "wav").replace(/[^a-z0-9]/gi, "").toLowerCase() || "wav";
    const outputPath = path.join(os.tmpdir(), `stream-sync-pro-xtts-${Date.now()}-${Math.random().toString(16).slice(2)}.${extension}`);
    await fs.writeFile(outputPath, Buffer.from(audioBase64, "base64"));
    return outputPath;
  }

  const extension = getAudioExtensionFromContentType(contentType);
  const outputPath = path.join(os.tmpdir(), `stream-sync-pro-xtts-${Date.now()}-${Math.random().toString(16).slice(2)}.${extension}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, bytes);
  return outputPath;
}

async function synthesizeSpeechToFile(payload = {}) {
  if (payload?.bypassTtsCache) {
    const directPayload = { ...payload };
    delete directPayload.bypassTtsCache;
    return synthesizeSpeechToFileDirect(directPayload);
  }

  if (shouldUseTtsCache(payload)) {
    const cacheKey = getTtsCacheKey(payload);
    const cachedFilePath = await findCachedTtsFile(cacheKey);
    if (cachedFilePath) {
      return {
        filePath: cachedFilePath,
        cached: true,
        cacheKey
      };
    }

    const synthesizedFilePath = await synthesizeSpeechToFile({
      ...payload,
      bypassTtsCache: true
    });
    const cacheFilePath = await cacheSynthesizedTtsFile(cacheKey, synthesizedFilePath.filePath ?? synthesizedFilePath);
    await fs.unlink(synthesizedFilePath.filePath ?? synthesizedFilePath).catch(() => {});
    return {
      filePath: cacheFilePath,
      cached: true,
      cacheKey
    };
  }

  return synthesizeSpeechToFileDirect(payload);
}

async function synthesizeSpeechToFileDirect(payload = {}) {
  if (payload?.provider === "elevenlabs") {
    if (!payload?.voiceId) {
      throw new Error("Choose an ElevenLabs voice first.");
    }

    if (!String(payload?.apiKey ?? "").trim()) {
      throw new Error("Enter your ElevenLabs API key to use ElevenLabs voices.");
    }

    return synthesizeElevenLabsSpeechToFile(payload);
  }

  if (payload?.provider === "tiktok") {
    return synthesizeTikTokSpeechToFile(payload);
  }

  if (payload?.provider === "xtts") {
    return synthesizeXttsSpeechToFile(payload);
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

  createWindow();

  startupSettingsPromise = loadSettings().catch((error) => {
    log.error("Startup settings load failed", error);
  });

  startupOverlayPromise = startupSettingsPromise.then(() => startQueueOverlayServer()).catch((error) => {
    log.error("Startup overlay server failed", error);
  });

  startupOverlayPromise.then(() => {
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

ipcMain.handle("spotify:sign-in", async (_event, payload = {}) => {
  return beginSpotifySignIn(payload ?? {});
});

ipcMain.handle("spotify:get-me", async (_event, payload = {}) => {
  const clientId = String(payload?.clientId ?? "").trim();
  const result = await spotifyApiRequest({ clientId, auth: payload?.auth }, "/v1/me");
  return {
    ok: true,
    auth: normalizeSpotifyAuth(result.auth),
    profile: {
      id: String(result?.id ?? ""),
      displayName: String(result?.display_name ?? result?.id ?? "")
    }
  };
});

ipcMain.handle("spotify:play-track", async (_event, payload = {}) => {
  return spotifyPlayTrack(payload ?? {});
});

ipcMain.handle("spotify:skip-track", async (_event, payload = {}) => {
  return spotifySkipTrack(payload ?? {});
});

ipcMain.handle("app:get-settings", async () => {
  if (startupSettingsPromise) {
    await startupSettingsPromise.catch((error) => {
      log.warn("Startup settings promise failed before renderer settings request", error);
    });
  }
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

ipcMain.handle("overlay:get-like-race-info", async () => {
  const overlayUrls = getOverlayUrlBundle("/like-race-overlay");
  return {
    ...overlayUrls,
    url: overlayUrls.hostnameUrl || overlayUrls.localUrl || overlayUrls.url,
    port: queueOverlayPort,
    state: likeRaceOverlayState
  };
});

ipcMain.handle("overlay:update-like-race-state", async (_event, payload) => {
  likeRaceOverlayState = sanitizeLikeRaceOverlayState(payload);
  return {
    ok: true,
    state: likeRaceOverlayState
  };
});

ipcMain.handle("overlay:get-spin-wheel-info", async () => {
  const overlayUrls = getOverlayUrlBundle("/spin-wheel-overlay");
  return {
    ...overlayUrls,
    url: overlayUrls.hostnameUrl || overlayUrls.localUrl || overlayUrls.url,
    port: queueOverlayPort,
    state: spinWheelOverlayState
  };
});

ipcMain.handle("overlay:update-spin-wheel-state", async (_event, payload) => {
  spinWheelOverlayState = sanitizeSpinWheelOverlayState(payload);
  return {
    ok: true,
    state: spinWheelOverlayState
  };
});

ipcMain.handle("overlay:get-progress-bar-info", async () => {
  const overlayUrls = getOverlayUrlBundle("/progress-bar-overlay");
  return {
    ...overlayUrls,
    url: overlayUrls.hostnameUrl || overlayUrls.localUrl || overlayUrls.url,
    port: queueOverlayPort,
    state: progressBarOverlayState
  };
});

ipcMain.handle("overlay:update-progress-bar-state", async (_event, payload) => {
  progressBarOverlayState = sanitizeProgressBarOverlayState(payload);
  return {
    ok: true,
    state: progressBarOverlayState
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

ipcMain.handle("voicemod:get-voices", async (_event, payload = {}) => {
  return { ok: true, voices: await getVoicemodVoices(payload) };
});

ipcMain.handle("voicemod:get-current-voice", async (_event, payload = {}) => {
  return { ok: true, voiceId: await getCurrentVoicemodVoiceId(payload) };
});

ipcMain.handle("voicemod:set-voice", async (_event, payload = {}) => {
  await setVoicemodVoice(payload);
  return { ok: true };
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

ipcMain.handle("app:factory-reset", async (_event, payload = {}) => {
  const confirmation = String(payload?.confirmation ?? "").trim().toUpperCase();
  if (confirmation !== "RESET") {
    throw new Error("Type RESET to confirm the factory reset.");
  }

  return factoryResetAppData();
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
    properties: ["openFile", "multiSelections"],
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
    if (payload?.provider === "tiktok") {
      return listTikTokTtsVoices();
    }
    if (payload?.provider === "xtts") {
      return listXttsVoices(payload ?? {});
    }

  const windowsVoices = await listWindowsTtsVoices();
  return [
    ...windowsVoices.map((voice) => ({
      ...voice,
      ttsKind: "builtin"
    })),
    ...listXttsVoices(payload ?? {})
  ];
});

ipcMain.handle("tts:get-elevenlabs-usage", async (_event, payload) => {
  return getElevenLabsUsageDetails(payload ?? {});
});

ipcMain.handle("tts:browse-xtts-sample-file", async () => {
  const openResult = await dialog.showOpenDialog(mainWindow, {
    title: "Choose XTTS voice sample",
    properties: ["openFile"],
    filters: [
      { name: "Audio and video samples", extensions: ["wav", "mp3", "m4a", "aac", "flac", "ogg", "mp4", "mov", "webm", "mkv"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (openResult.canceled || !openResult.filePaths?.length) {
    return { canceled: true };
  }

  return {
    canceled: false,
    filePath: openResult.filePaths[0],
    filePaths: openResult.filePaths
  };
});

ipcMain.handle("tts:export-xtts-voice", async (_event, payload) => {
  const voice = normalizeXttsVoices([payload?.voice])[0] ?? null;
  if (!voice) {
    throw new Error("Select a valid XTTS voice to export.");
  }

  const sampleFiles = [];
  const missingSamples = [];
  for (const samplePath of voice.samplePaths) {
    const stats = await fs.stat(samplePath).catch(() => null);
    if (!stats?.isFile()) {
      missingSamples.push(samplePath);
      continue;
    }

    const bytes = await fs.readFile(samplePath);
    sampleFiles.push({
      fileName: path.basename(samplePath),
      extension: path.extname(samplePath).toLowerCase(),
      size: bytes.length,
      originalPath: samplePath,
      dataBase64: bytes.toString("base64")
    });
  }

  if (!sampleFiles.length && !voice.youtubeUrl) {
    throw new Error("This XTTS voice has no readable sample files to export. Add a sample again, then export.");
  }

  const exportVoice = {
    ...voice,
    samplePath: "",
    samplePaths: []
  };
  const safeVoiceName = sanitizeFileNamePart(voice.name);
  const bundle = {
    type: "stream-sync-pro-xtts-voice",
    version: 2,
    exportedAt: new Date().toISOString(),
    voice: exportVoice,
    sampleFiles,
    missingSamples
  };

  const saveResult = await dialog.showSaveDialog(mainWindow, {
    title: "Export XTTS voice",
    defaultPath: path.join(app.getPath("documents"), `${safeVoiceName}.ssp-xtts-voice.json`),
    filters: [
      { name: "Stream Sync Pro XTTS voice", extensions: ["json"] },
      { name: "JSON files", extensions: ["json"] }
    ]
  });

  if (saveResult.canceled || !saveResult.filePath) {
    return { canceled: true };
  }

  await fs.writeFile(saveResult.filePath, JSON.stringify(bundle, null, 2), "utf8");
  return { canceled: false, filePath: saveResult.filePath };
});

ipcMain.handle("tts:import-xtts-voice", async () => {
  const openResult = await dialog.showOpenDialog(mainWindow, {
    title: "Import XTTS voice",
    properties: ["openFile"],
    filters: [
      { name: "Stream Sync Pro XTTS voice", extensions: ["json"] },
      { name: "JSON files", extensions: ["json"] }
    ]
  });

  if (openResult.canceled || !openResult.filePaths?.length) {
    return { canceled: true };
  }

  const filePath = openResult.filePaths[0];
  const content = await fs.readFile(filePath, "utf8");
  let parsed = null;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("The selected XTTS voice file is not valid JSON.");
  }

  const rawVoice = parsed?.voice ?? parsed;
  const sampleFiles = Array.isArray(parsed?.sampleFiles) ? parsed.sampleFiles : [];
  const importVoiceId = String(rawVoice?.id ?? "").trim() || createXttsImportVoiceId();
  const importVoiceName = String(rawVoice?.name ?? "").trim();
  if (!importVoiceName) {
    throw new Error("That file does not contain a valid XTTS voice name.");
  }

  const restoredSamplePaths = [];
  if (sampleFiles.length) {
    const importDirectory = path.join(app.getPath("userData"), "xtts-voices", sanitizeFileNamePart(importVoiceId, "imported-voice"));
    await fs.mkdir(importDirectory, { recursive: true });

    for (let index = 0; index < sampleFiles.length; index += 1) {
      const sample = sampleFiles[index] ?? {};
      const extension = path.extname(String(sample.fileName ?? "")).toLowerCase()
        || String(sample.extension ?? "").replace(/[^a-z0-9.]/gi, "").toLowerCase()
        || ".wav";
      const safeSampleName = sanitizeFileNamePart(path.basename(String(sample.fileName ?? `sample-${index + 1}${extension}`), extension), `sample-${index + 1}`);
      const outputPath = path.join(importDirectory, `${String(index + 1).padStart(2, "0")}-${safeSampleName}${extension.startsWith(".") ? extension : `.${extension}`}`);
      const dataBase64 = String(sample.dataBase64 ?? "").trim();
      if (!dataBase64) {
        continue;
      }
      await fs.writeFile(outputPath, Buffer.from(dataBase64, "base64"));
      restoredSamplePaths.push(outputPath);
    }
  }

  const fallbackSamplePaths = Array.isArray(rawVoice?.samplePaths)
    ? rawVoice.samplePaths
    : rawVoice?.samplePath
      ? [rawVoice.samplePath]
      : [];
  const importedVoice = normalizeXttsVoices([{
    ...rawVoice,
    id: importVoiceId,
    name: importVoiceName,
    samplePath: restoredSamplePaths[0] ?? fallbackSamplePaths[0] ?? "",
    samplePaths: restoredSamplePaths.length ? restoredSamplePaths : fallbackSamplePaths,
    youtubeUrl: String(rawVoice?.youtubeUrl ?? "").trim(),
    tuning: rawVoice?.tuning,
    createdAt: Date.now()
  }])[0] ?? null;

  if (!importedVoice) {
    throw new Error("That file does not contain a complete XTTS voice. It needs embedded samples or a YouTube source.");
  }

  return {
    canceled: false,
    filePath,
    voice: importedVoice
  };
});

ipcMain.handle("tts:check-xtts-service", async (_event, payload) => {
  const serviceUrl = normalizeXttsServiceUrl(payload?.xttsServiceUrl);

  try {
    await checkXttsServiceReachable(serviceUrl);
    return {
      ok: true,
      message: `XTTS service is reachable at ${serviceUrl}.`
    };
  } catch (error) {
    throw new Error(formatXttsServiceUnavailableError(serviceUrl, error));
  }
});

ipcMain.handle("tts:start-xtts-service", async (_event, payload) => {
  return startLocalXttsService(payload ?? {});
});

ipcMain.handle("tts:get-cache-info", async () => {
  return getTtsCacheInfo();
});

ipcMain.handle("tts:clear-cache", async () => {
  return clearTtsCache();
});

 ipcMain.handle("tts:speak-to-file", async (_event, payload) => {
  const result = await synthesizeSpeechToFile(payload);
  if (typeof result === "string") {
    return {
      filePath: result,
      cached: false
    };
  }

  return result;
});

ipcMain.handle("tts:delete-file", async (_event, payload) => {
  try {
    const filePath = String(payload?.filePath ?? "");
    if (!filePath) {
      return { ok: true };
    }
    const resolvedFilePath = path.resolve(filePath);
    const cacheDirectory = path.resolve(getTtsCacheDirectory());
    if (resolvedFilePath.startsWith(`${cacheDirectory}${path.sep}`)) {
      return { ok: true, skippedCachedFile: true };
    }
    await fs.unlink(filePath);
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

ipcMain.handle("sound-alerts:browse-local-file", async () => {
  const openResult = await dialog.showOpenDialog(mainWindow, {
    title: "Choose local sound file",
    properties: ["openFile"],
    filters: [
      { name: "Audio files", extensions: ["mp3", "wav", "ogg", "m4a", "aac", "flac"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (openResult.canceled || !openResult.filePaths?.length) {
    return { canceled: true };
  }

  const filePath = openResult.filePaths[0];
  return {
    canceled: false,
    filePath,
    name: path.basename(filePath),
    soundId: `${LOCAL_SOUND_ID_PREFIX}${filePath}`
  };
});

ipcMain.handle("event-actions:browse-media-file", async () => {
  const openResult = await dialog.showOpenDialog(mainWindow, {
    title: "Choose picture or video for queue overlay",
    properties: ["openFile"],
    filters: [
      { name: "Pictures and videos", extensions: ["png", "jpg", "jpeg", "gif", "webp", "svg", "mp4", "webm", "mov", "mkv"] },
      { name: "Pictures", extensions: ["png", "jpg", "jpeg", "gif", "webp", "svg"] },
      { name: "Videos", extensions: ["mp4", "webm", "mov", "mkv"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (openResult.canceled || !openResult.filePaths?.length) {
    return { canceled: true };
  }

  const filePath = openResult.filePaths[0];
  const mimeType = getEventActionMediaMimeType(filePath);
  return {
    canceled: false,
    filePath,
    name: path.basename(filePath),
    mediaId: `${LOCAL_MEDIA_ID_PREFIX}${filePath}`,
    mediaType: mimeType.startsWith("video/") ? "video" : "image"
  };
});

ipcMain.handle("sound-alerts:resolve-audio", async (_event, payload) => {
  const soundId = String(payload?.soundId ?? "").trim();
  return {
    audioUrl: soundId.startsWith(LOCAL_SOUND_ID_PREFIX)
      ? await resolveLocalSoundAudioUrl(soundId)
      : await resolveMyInstantsAudioUrl(soundId)
  };
});

ipcMain.handle("event-actions:resolve-media", async (_event, payload) => {
  const mediaId = String(payload?.mediaId ?? "").trim();
  return {
    mediaUrl: await resolveLocalEventActionMediaUrl(mediaId)
  };
});
