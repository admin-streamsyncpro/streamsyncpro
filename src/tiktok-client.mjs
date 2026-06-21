import { randomUUID } from "node:crypto";
import {
  ControlEvent,
  TikTokLiveConnection,
  WebcastEvent
} from "tiktok-live-connector";

const CONNECT_RETRY_DELAYS_MS = [0, 1200, 2500];
const LIVE_REQUEST_POLLING_INTERVAL_MS = 100;

let currentConnection = null;
let connectionState = {
  connected: false,
  username: "",
  roomId: null,
  viewerCount: null
};

function extractViewerCount(source) {
  const candidates = [
    source?.viewerCount,
    source?.userCount,
    source?.memberCount,
    source?.roomInfo?.viewerCount,
    source?.roomInfo?.userCount,
    source?.roomInfo?.memberCount,
    source?.roomInfo?.stats?.viewerCount,
    source?.roomInfo?.stats?.userCount,
    source?.roomInfo?.stats?.memberCount,
    source?.stats?.viewerCount,
    source?.stats?.userCount,
    source?.stats?.memberCount
  ];

  for (const candidate of candidates) {
    const numericValue = Number(candidate);
    if (Number.isFinite(numericValue) && numericValue >= 0) {
      return Math.trunc(numericValue);
    }
  }

  return null;
}

function normalizeUsername(username) {
  return username.trim().replace(/^@/, "");
}

function getGiftName(data) {
  return (
    data.giftName ??
    data.giftDetails?.giftName ??
    data.gift?.giftName ??
    "a gift"
  );
}

function getGiftCount(data) {
  const repeatCount = Number(
    data.repeatCount ??
    data.repeat_count ??
    data.giftCount ??
    data.gift_count ??
    1
  );

  return Number.isFinite(repeatCount) && repeatCount > 0 ? repeatCount : 1;
}

function getGiftCoinValue(data) {
  const unitValue = Number(
    data.diamondCount ??
    data.giftDetails?.diamondCount ??
    data.giftDetails?.diamond_count ??
    data.gift?.diamondCount ??
    data.gift?.diamond_count ??
    0
  );

  return Number.isFinite(unitValue) && unitValue > 0 ? unitValue : 0;
}

function getUserProfilePictureUrl(data) {
  const user = data?.user ?? data?.userInfo ?? {};
  const extractUrl = (candidate) => {
    if (!candidate) {
      return "";
    }
    if (typeof candidate === "string") {
      return candidate;
    }
    if (Array.isArray(candidate)) {
      return candidate.map(extractUrl).find(Boolean) || "";
    }
    if (typeof candidate === "object") {
      const directCandidates = [
        candidate.url,
        candidate.uri,
        candidate.urlList,
        candidate.url_list,
        candidate.urls,
        candidate.url_list?.[0],
        candidate.urlList?.[0],
        candidate.urls?.[0],
        candidate.thumb,
        candidate.medium,
        candidate.large
      ];
      return directCandidates.map(extractUrl).find(Boolean) || "";
    }
    return "";
  };

  const candidates = [
    user?.profilePictureUrl,
    user?.avatarThumb,
    user?.avatarMedium,
    user?.avatarLarger,
    user?.avatar?.thumb,
    user?.avatar?.medium,
    user?.avatar?.large,
    user?.avatar_thumb?.url_list?.[0],
    user?.avatar_medium?.url_list?.[0],
    user?.avatar_larger?.url_list?.[0],
    user?.avatar_thumb,
    user?.avatar_medium,
    user?.avatar_larger,
    user?.avatarThumbUrl,
    user?.avatarMediumUrl,
    user?.avatarLargerUrl,
    user?.profilePicture,
    data?.profilePictureUrl,
    data?.avatar
  ];

  for (const candidate of candidates) {
    const url = extractUrl(candidate);
    if (url) {
      return url;
    }
  }

  return "";
}

function getHostProfileFromRoomInfo(roomInfo, username = "") {
  const normalizedUsername = normalizeUsername(String(username ?? "")).toLowerCase();
  const visited = new Set();
  const candidates = [];

  const visit = (value) => {
    if (!value || typeof value !== "object" || visited.has(value)) {
      return;
    }
    visited.add(value);

    if (!Array.isArray(value)) {
      const uniqueId = String(value.uniqueId ?? value.unique_id ?? value.secUid ?? value.id ?? "").trim().toLowerCase();
      const hasAvatar = Boolean(getUserProfilePictureUrl({ user: value }) || getUserProfilePictureUrl(value));
      const hasBio = Boolean(String(value.signature ?? value.bio ?? value.desc ?? value.description ?? "").trim());
      if ((normalizedUsername && uniqueId === normalizedUsername) || hasAvatar || hasBio) {
        candidates.push(value);
      }
    }

    for (const child of Object.values(value)) {
      visit(child);
    }
  };

  visit(roomInfo);

  const preferred = candidates.find((candidate) => {
    const uniqueId = String(candidate.uniqueId ?? candidate.unique_id ?? "").trim().toLowerCase();
    return normalizedUsername && uniqueId === normalizedUsername;
  }) ?? candidates[0] ?? {};

  return {
    profilePictureUrl: getUserProfilePictureUrl({ user: preferred }) || getUserProfilePictureUrl(preferred),
    bio: String(preferred.signature ?? preferred.bio ?? preferred.desc ?? preferred.description ?? "").trim()
  };
}

function getGiftImageUrl(data) {
  const extractUrl = (candidate) => {
    if (!candidate) {
      return "";
    }
    if (typeof candidate === "string") {
      return candidate.trim().replace(/^http:\/\//i, "https://");
    }
    if (Array.isArray(candidate)) {
      return candidate.map(extractUrl).find(Boolean) || "";
    }
    if (typeof candidate === "object") {
      const directCandidates = [
        candidate.url,
        candidate.uri,
        candidate.urlList,
        candidate.url_list,
        candidate.urls,
        candidate.url_list?.[0],
        candidate.urlList?.[0],
        candidate.urls?.[0],
        candidate.thumb,
        candidate.medium,
        candidate.large
      ];
      return directCandidates.map(extractUrl).find(Boolean) || "";
    }
    return "";
  };
  const candidates = [
    data.giftPictureUrl,
    data.giftImage?.url?.[0],
    data.giftImage?.urlList?.[0],
    data.giftImage?.url_list?.[0],
    data.giftImage?.uri,
    data.giftPicture?.urlList?.[0],
    data.giftPicture?.url_list?.[0],
    data.giftPicture?.url,
    data.giftIconImage?.url?.[0],
    data.giftIconImage?.urlList?.[0],
    data.giftIconImage?.url_list?.[0],
    data.giftIconImage?.uri,
    data.giftIcon?.urlList?.[0],
    data.giftIcon?.url_list?.[0],
    data.giftIcon?.url,
    data.giftDetails?.giftImage?.url?.[0],
    data.giftDetails?.giftImage?.urlList?.[0],
    data.giftDetails?.giftImage?.url_list?.[0],
    data.giftDetails?.giftImage?.uri,
    data.giftDetails?.giftPicture?.urlList?.[0],
    data.giftDetails?.giftPicture?.url_list?.[0],
    data.giftDetails?.giftPicture?.url,
    data.giftDetails?.giftIconImage?.url?.[0],
    data.giftDetails?.giftIconImage?.urlList?.[0],
    data.giftDetails?.giftIconImage?.url_list?.[0],
    data.giftDetails?.giftIconImage?.uri,
    data.giftDetails?.icon?.urlList?.[0],
    data.giftDetails?.icon?.url_list?.[0],
    data.giftDetails?.icon?.url,
    data.gift?.giftImage?.url?.[0],
    data.gift?.giftImage?.urlList?.[0],
    data.gift?.giftImage?.url_list?.[0],
    data.gift?.giftImage?.uri,
    data.gift?.giftPicture?.urlList?.[0],
    data.gift?.giftPicture?.url_list?.[0],
    data.gift?.giftPicture?.url,
    data.gift?.giftIconImage?.url?.[0],
    data.gift?.giftIconImage?.urlList?.[0],
    data.gift?.giftIconImage?.url_list?.[0],
    data.gift?.giftIconImage?.uri,
    data.gift?.icon?.urlList?.[0],
    data.gift?.icon?.url_list?.[0],
    data.gift?.icon?.url,
    data.unlightedGiftIcon
  ];

  for (const candidate of candidates) {
    const value = extractUrl(candidate);
    if (value) {
      return value;
    }
  }

  return "";
}

function getEmoteImageUrl(data) {
  const candidates = [
    data?.emoteImageUrl,
    data?.image?.imageUrl,
    data?.image?.url?.[0],
    data?.image?.urlList?.[0],
    data?.image?.url_list?.[0],
    data?.emote?.image?.imageUrl,
    data?.emote?.image?.url?.[0],
    data?.emote?.image?.urlList?.[0],
    data?.emote?.image?.url_list?.[0]
  ];

  for (const candidate of candidates) {
    const value = String(candidate ?? "").trim().replace(/^http:\/\//i, "https://");
    if (value) {
      return value;
    }
  }

  return "";
}

function normalizeObservedEmoteEntry(entry) {
  const emoteId = String(
    entry?.emoteId ??
    entry?.emote?.emoteId ??
    entry?.id ??
    ""
  ).trim();
  const emoteName = String(
    entry?.emoteName ??
    entry?.name ??
    entry?.title ??
    ""
  ).trim();
  const emoteImageUrl = getEmoteImageUrl(entry);

  if (!emoteId && !emoteName) {
    return null;
  }

  return {
    emoteId,
    emoteName,
    emoteImageUrl
  };
}

function inferEmoteMetric(entry) {
  const sourceValue = String(
    entry?.emoteUploadInfo?.emoteUploadSource ??
    entry?.emotePrivateType ??
    entry?.emoteScene ??
    entry?.source ??
    ""
  ).toLowerCase();

  if (sourceValue.includes("subscriber") || sourceValue.includes("subscription") || sourceValue === "1" || sourceValue === "0") {
    return "subEmote";
  }

  return "fanEmote";
}

function getObservedEmotes(data) {
  const rawEntries = Array.isArray(data?.emotes)
    ? data.emotes
    : Array.isArray(data?.emoteList)
      ? data.emoteList
      : [];

  const normalized = [];
  const seen = new Set();

  for (const rawEntry of rawEntries) {
    const entry = normalizeObservedEmoteEntry(rawEntry);
    if (!entry) {
      continue;
    }

    const dedupeKey = String(entry.emoteId || entry.emoteName).toLowerCase();
    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    normalized.push(entry);
  }

  return normalized;
}

function collectAuthenticatedEmoteCandidates(value, results, visited = new WeakSet()) {
  if (!value || typeof value !== "object") {
    return;
  }

  if (visited.has(value)) {
    return;
  }
  visited.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      collectAuthenticatedEmoteCandidates(item, results, visited);
    }
    return;
  }

  const candidate = normalizeObservedEmoteEntry(value);
  const hasEmoteShape = candidate && (
    value.emoteUploadInfo ||
    value.emoteType !== undefined ||
    value.emoteScene !== undefined ||
    value.emotePrivateType !== undefined ||
    value.rewardCondition !== undefined
  );

  if (candidate && hasEmoteShape) {
    results.push({
      metric: inferEmoteMetric(value),
      ...candidate
    });
  }

  for (const nestedValue of Object.values(value)) {
    collectAuthenticatedEmoteCandidates(nestedValue, results, visited);
  }
}

function normalizeAuthenticatedEmoteResults(entries = []) {
  const normalized = [];
  const seen = new Set();

  for (const entry of entries) {
    const metric = entry?.metric === "fanEmote" ? "fanEmote" : "subEmote";
    const emoteId = String(entry?.emoteId ?? "").trim();
    const emoteName = String(entry?.emoteName ?? "").trim();
    const emoteImageUrl = getEmoteImageUrl(entry);
    const dedupeKey = `${metric}|${String(emoteId || emoteName).toLowerCase()}`;
    if ((!emoteId && !emoteName) || seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    normalized.push({
      metric,
      emoteId,
      emoteName,
      emoteImageUrl
    });
  }

  return normalized.sort((left, right) => {
    const metricCompare = left.metric.localeCompare(right.metric);
    if (metricCompare !== 0) {
      return metricCompare;
    }
    return String(left.emoteName || left.emoteId).localeCompare(String(right.emoteName || right.emoteId));
  });
}

function normalizeGiftCatalogEntry(entry) {
  const giftName = String(
    entry?.giftName ??
    entry?.name ??
    entry?.describe ??
    ""
  ).trim();
  const giftId = String(
    entry?.giftId ??
    entry?.id ??
    entry?.gift?.id ??
    ""
  ).trim();
  const giftImageUrl = getGiftImageUrl(entry);
  const coinValue = getGiftCoinValue(entry);

  if (!giftName) {
    return null;
  }

  return {
    giftId,
    giftName,
    giftImageUrl,
    coinValue,
    source: "roomCatalog"
  };
}

function getLookupErrorMessage(error) {
  return String(error?.message ?? error ?? "").trim();
}

function getLookupErrorStatus(error) {
  const status = error?.response?.status ?? error?.status ?? error?.statusCode;
  return Number.isFinite(Number(status)) ? Number(status) : null;
}

function isForbiddenLookupError(error) {
  return getLookupErrorStatus(error) === 403 || /status code 403|forbidden/i.test(getLookupErrorMessage(error));
}

function getRoleFlags(data) {
  const userIdentity = data.userIdentity ?? {};

  return {
    isSubscriber: Boolean(
      userIdentity.isSubscriberOfAnchor ?? data.user?.isSubscriberOfAnchor
    ),
    isModerator: Boolean(
      userIdentity.isModeratorOfAnchor ?? data.user?.isModeratorOfAnchor
    )
  };
}

export async function disconnectFromLive() {
  if (currentConnection) {
    currentConnection.disconnect();
    currentConnection = null;
  }

  connectionState = {
    connected: false,
    username: "",
    roomId: null,
    viewerCount: null
  };

  return connectionState;
}

export function getConnectionState() {
  return connectionState;
}

export async function fetchAvailableGiftsForUsername(username) {
  const normalizedUsername = normalizeUsername(String(username ?? ""));
  if (!normalizedUsername) {
    return {
      gifts: [],
      liveActive: false,
      error: "Enter a TikTok username first."
    };
  }

  const lookupErrors = [];
  const fetchGiftsFromConnection = async (connection) => {
    if (!connection?.clientParams) {
      throw new Error("TikTok gift lookup is not available for this connection.");
    }

    if (!connection?.clientParams?.room_id) {
      const roomId = connection?.roomId || connectionState.roomId || await connection.fetchRoomId();
      if (!roomId) {
        throw new Error(`TikTok did not return a room ID for @${normalizedUsername}.`);
      }
      connection.clientParams.room_id = roomId;
    }

    const gifts = await connection.fetchAvailableGifts();
    if (!Array.isArray(gifts)) {
      return [];
    }

    return gifts
      .map(normalizeGiftCatalogEntry)
      .filter(Boolean);
  };

  if (
    currentConnection &&
    connectionState.connected &&
    normalizeUsername(connectionState.username).toLowerCase() === normalizedUsername.toLowerCase()
  ) {
    try {
      const gifts = await fetchGiftsFromConnection(currentConnection);
      if (gifts.length) {
        return {
          gifts,
          liveActive: true,
          error: ""
        };
      }
    } catch (error) {
      lookupErrors.push(error);
      // Fall back to a temporary lookup below.
    }
  }

  const tempConnection = new TikTokLiveConnection(normalizedUsername, {
    processInitialData: false,
    fetchRoomInfoOnConnect: false,
    enableExtendedGiftInfo: false,
    enableRequestPolling: false
  });

  try {
    const gifts = await fetchGiftsFromConnection(tempConnection);
    return {
      gifts,
      liveActive: true,
      error: gifts.length ? "" : "TikTok did not return a gift catalog for this LIVE."
    };
  } catch (error) {
    lookupErrors.push(error);
    const message = lookupErrors
      .map(getLookupErrorMessage)
      .filter(Boolean)
      .at(-1);
    const isForbidden = lookupErrors.some(isForbiddenLookupError);
    return {
      gifts: [],
      liveActive: false,
      restricted: isForbidden,
      error: message
        ? isForbidden
          ? `TikTok blocked live gift catalog refresh for @${normalizedUsername} (403). The app will continue using the built-in and previously learned gift catalog.`
          : `Unable to fetch TikTok gift catalog for @${normalizedUsername}: ${message}`
        : `Unable to fetch TikTok gift catalog for @${normalizedUsername}.`
    };
  } finally {
    try {
      await tempConnection.disconnect();
    } catch {
      // Ignore cleanup errors for temporary gift catalog lookups.
    }
  }
}

export async function fetchAuthenticatedEmotesForUsername({ username, sessionId, ttTargetIdc } = {}) {
  const normalizedUsername = normalizeUsername(String(username ?? ""));
  const normalizedSessionId = String(sessionId ?? "").trim();
  const normalizedTargetIdc = String(ttTargetIdc ?? "").trim();

  if (!normalizedUsername) {
    return {
      emotes: [],
      liveActive: false,
      message: "Enter a TikTok username first."
    };
  }

  if (!normalizedSessionId || !normalizedTargetIdc) {
    return {
      emotes: [],
      liveActive: false,
      message: "Both sessionid and tt-target-idc are required."
    };
  }

  const tempConnection = new TikTokLiveConnection(normalizedUsername, {
    processInitialData: false,
    fetchRoomInfoOnConnect: false,
    enableExtendedGiftInfo: false,
    enableRequestPolling: false,
    sessionId: normalizedSessionId,
    ttTargetIdc: normalizedTargetIdc
  });

  try {
    const isLive = await tempConnection.fetchIsLive();
    if (!isLive) {
      return {
        emotes: [],
        liveActive: false,
        message: `TikTok LIVE is not active for @${normalizedUsername} right now.`
      };
    }

    const roomInfo = await tempConnection.fetchRoomInfo();
    const candidates = [];
    collectAuthenticatedEmoteCandidates(roomInfo, candidates);
    const emotes = normalizeAuthenticatedEmoteResults(candidates);

    return {
      emotes,
      liveActive: true,
      message: emotes.length
        ? `Loaded ${emotes.length} authenticated TikTok emote${emotes.length === 1 ? "" : "s"} for @${normalizedUsername}.`
        : `TikTok did not expose any creator emotes in the authenticated room data for @${normalizedUsername}.`
    };
  } catch (error) {
    return {
      emotes: [],
      liveActive: false,
      message: String(error?.message ?? "Unable to fetch authenticated TikTok emotes.")
    };
  } finally {
    try {
      await tempConnection.disconnect();
    } catch {
      // Ignore cleanup errors for temporary emote lookups.
    }
  }
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function shouldRetryConnection(error) {
  const message = String(error?.info ?? error?.message ?? error ?? "").toLowerCase();

  return (
    message.includes("websocket connection failed") ||
    message.includes("unexpected server response: 200") ||
    message.includes("websocket not responding") ||
    message.includes("econnreset") ||
    message.includes("socket hang up") ||
    message.includes("timed out")
  );
}

function sanitizeConnectorStatusMessage(message, username = "") {
  const rawMessage = String(message ?? "").trim();
  const normalizedUsername = normalizeUsername(String(username ?? ""));
  const lowerMessage = rawMessage.toLowerCase();
  const userLabel = normalizedUsername ? ` for @${normalizedUsername}` : "";

  if (!rawMessage) {
    return rawMessage;
  }

  if (
    lowerMessage.includes("failed to retrieve room info for live status from main page") ||
    lowerMessage.includes("falling back to api source")
  ) {
    return `TikTok is still resolving live details${userLabel}. Please wait a moment and try again.`;
  }

  if (
    lowerMessage.includes("failed to retrieve room id") ||
    lowerMessage.includes("failed to retrieve roominfo") ||
    lowerMessage.includes("failed to retrieve room info")
  ) {
    return `TikTok room details are not available yet${userLabel}. Please try again in a moment.`;
  }

  if (
    lowerMessage.includes("user might not be live") ||
    lowerMessage.includes("is currently offline") ||
    lowerMessage.includes("live has ended")
  ) {
    return `TikTok LIVE is not active${userLabel} right now.`;
  }

  return rawMessage;
}

function formatConnectionError(error, username) {
  const rawMessage = sanitizeConnectorStatusMessage(error?.info ?? error?.message ?? error ?? "", username);

  if (
    rawMessage.toLowerCase().includes("websocket connection failed") &&
    rawMessage.toLowerCase().includes("unexpected server response: 200")
  ) {
    return `TikTok refused the live chat handshake for @${username}. This is usually temporary, so please try again in a moment.`;
  }

  return rawMessage || `Unable to connect to @${username}.`;
}

async function ensureLiveIsActive(connection, normalizedUsername) {
  const isLive = await connection.fetchIsLive();

  if (!isLive) {
    throw new Error(`TikTok LIVE is not active for @${normalizedUsername} right now.`);
  }
}

function bindConnectionEvents(connection, normalizedUsername, listeners) {
  let streamEndedDisconnecting = false;

  connection.on(WebcastEvent.CHAT, (data) => {
    const roleFlags = getRoleFlags(data);
    const emotes = getObservedEmotes(data);

    listeners.onChat({
      id: data.commentId ?? randomUUID(),
      type: "chat",
      user: data.user?.uniqueId ?? "unknown",
      nickname: data.user?.nickname ?? data.user?.uniqueId ?? "unknown",
      profilePictureUrl: getUserProfilePictureUrl(data),
      ...roleFlags,
      message: data.comment ?? "",
      emotes,
      timestamp: new Date().toISOString()
    });
  });

  connection.on(WebcastEvent.EMOTE, (data) => {
    const roleFlags = getRoleFlags(data);
    const emotes = getObservedEmotes(data);
    const primaryEmote = emotes[0] ?? null;

    listeners.onChat({
      id: data.common?.msgId ?? randomUUID(),
      type: "subEmote",
      user: data.user?.uniqueId ?? "unknown",
      nickname: data.user?.nickname ?? data.user?.uniqueId ?? "unknown",
      profilePictureUrl: getUserProfilePictureUrl(data),
      ...roleFlags,
      message: "sent a subscriber emote",
      emotes,
      emoteId: primaryEmote?.emoteId ?? "",
      emoteName: primaryEmote?.emoteName ?? "",
      emoteImageUrl: primaryEmote?.emoteImageUrl ?? "",
      timestamp: new Date().toISOString()
    });
  });

  connection.on(WebcastEvent.GIFT, (data) => {
    const roleFlags = getRoleFlags(data);
    const isStreakableGift = Number(
      data.giftType ??
      data.giftDetails?.giftType ??
      data.gift?.giftType
    ) === 1;

    if (isStreakableGift && !data.repeatEnd) {
      return;
    }

    const giftCount = getGiftCount(data);
    const giftName = getGiftName(data);
    const coinValue = getGiftCoinValue(data);
    const giftImageUrl = getGiftImageUrl(data);
    const countSuffix = giftCount > 1 ? ` x${giftCount}` : "";

    listeners.onChat({
      id: data.msgId ?? data.giftId ?? randomUUID(),
      type: "gift",
      user: data.user?.uniqueId ?? "unknown",
      nickname: data.user?.nickname ?? data.user?.uniqueId ?? "unknown",
      profilePictureUrl: getUserProfilePictureUrl(data),
      ...roleFlags,
      message: `sent ${giftName}${countSuffix}`,
      giftName,
      giftId: String(
        data.giftId ??
        data.giftDetails?.id ??
        data.gift?.id ??
        ""
      ).trim(),
      giftImageUrl,
      giftCount,
      coinValue,
      totalCoins: coinValue * giftCount,
      timestamp: new Date().toISOString()
    });
  });

  if (WebcastEvent.ENVELOPE) {
    connection.on(WebcastEvent.ENVELOPE, (data) => {
      const roleFlags = getRoleFlags(data);
      listeners.onChat({
        id: data.msgId ?? data.common?.msgId ?? randomUUID(),
        type: "treasureBox",
        user: data.user?.uniqueId ?? data.uniqueId ?? "unknown",
        nickname:
          data.user?.nickname ??
          data.nickname ??
          data.user?.uniqueId ??
          data.uniqueId ??
          "unknown",
        profilePictureUrl: getUserProfilePictureUrl(data),
        ...roleFlags,
        message: "sent a treasure box",
        timestamp: new Date().toISOString()
      });
    });
  }

  if (WebcastEvent.MEMBER) {
    connection.on(WebcastEvent.MEMBER, (data) => {
      const roleFlags = getRoleFlags(data);
      listeners.onChat({
        id: data.msgId ?? randomUUID(),
        type: "join",
        user: data.user?.uniqueId ?? data.uniqueId ?? "unknown",
        nickname:
          data.user?.nickname ??
          data.nickname ??
          data.user?.uniqueId ??
          data.uniqueId ??
          "unknown",
        profilePictureUrl: getUserProfilePictureUrl(data),
        ...roleFlags,
        message: "joined the stream",
        timestamp: new Date().toISOString()
      });
    });
  }

  connection.on(WebcastEvent.FOLLOW, (data) => {
    const roleFlags = getRoleFlags(data);
    listeners.onChat({
      id: data.msgId ?? randomUUID(),
      type: "follow",
      user: data.user?.uniqueId ?? data.uniqueId ?? "unknown",
      nickname:
        data.user?.nickname ??
        data.nickname ??
        data.user?.uniqueId ??
        data.uniqueId ??
        "unknown",
      profilePictureUrl: getUserProfilePictureUrl(data),
      ...roleFlags,
      message: "followed the stream",
      timestamp: new Date().toISOString()
    });
  });

  connection.on(WebcastEvent.SHARE, (data) => {
    const roleFlags = getRoleFlags(data);
    listeners.onChat({
      id: data.msgId ?? randomUUID(),
      type: "share",
      user: data.user?.uniqueId ?? data.uniqueId ?? "unknown",
      nickname:
        data.user?.nickname ??
        data.nickname ??
        data.user?.uniqueId ??
        data.uniqueId ??
        "unknown",
      profilePictureUrl: getUserProfilePictureUrl(data),
      ...roleFlags,
      message: "shared the stream",
      timestamp: new Date().toISOString()
    });
  });

  connection.on(WebcastEvent.LIKE, (data) => {
    const roleFlags = getRoleFlags(data);
    const likeCount = Number(data.likeCount ?? 0);
    const totalLikeCount = Number(data.totalLikeCount ?? 0);

    listeners.onChat({
      id: data.msgId ?? randomUUID(),
      type: "like",
      user: data.user?.uniqueId ?? data.uniqueId ?? "unknown",
      nickname:
        data.user?.nickname ??
        data.nickname ??
        data.user?.uniqueId ??
        data.uniqueId ??
        "unknown",
      profilePictureUrl: getUserProfilePictureUrl(data),
      ...roleFlags,
      message:
        likeCount > 0
          ? `sent ${likeCount} like${likeCount === 1 ? "" : "s"}`
          : "sent likes",
      likeCount,
      totalLikeCount,
      timestamp: new Date().toISOString()
    });
  });

  connection.on(WebcastEvent.ROOM_USER, (data) => {
    const viewerCount = extractViewerCount(data);
    if (viewerCount === null) {
      return;
    }

    connectionState = {
      ...connectionState,
      viewerCount
    };

    listeners.onStatus({
      level: "info",
      message: `Viewer count updated: ${viewerCount}.`,
      suppressToast: true,
      connectionState: { ...connectionState }
    });
  });

  connection.on(ControlEvent.CONNECTED, (state) => {
    listeners.onStatus({
      level: "success",
      message: `Connected to room ${state.roomId}.`,
      connectionState: { ...connectionState }
    });
  });

  connection.on(ControlEvent.DISCONNECTED, () => {
    connectionState = {
      connected: false,
      username: normalizedUsername,
      roomId: null,
      viewerCount: null
    };

    if (streamEndedDisconnecting) {
      streamEndedDisconnecting = false;
      return;
    }

    listeners.onStatus({
      level: "info",
      message: "Disconnected from TikTok LIVE.",
      connectionState: { ...connectionState }
    });
  });

  connection.on(WebcastEvent.STREAM_END, async () => {
    streamEndedDisconnecting = true;
    await disconnectFromLive();

    listeners.onStatus({
      level: "info",
      message: "The live stream has ended. Disconnected from TikTok LIVE.",
      connectionState: { ...connectionState },
      streamEnded: true
    });
  });

  connection.on(ControlEvent.ERROR, (error) => {
    listeners.onStatus({
      level: "error",
      message: sanitizeConnectorStatusMessage(
        error?.info ?? error?.message ?? "TikTok connection error.",
        normalizedUsername
      )
    });
  });
}

export async function connectToLive(username, listeners) {
  const normalizedUsername = normalizeUsername(username ?? "");

  if (!normalizedUsername) {
    throw new Error("Enter a TikTok username.");
  }

  if (currentConnection) {
    await disconnectFromLive();
  }

  listeners.onStatus({
    level: "info",
    message: `Connecting to @${normalizedUsername}...`
  });

  let lastError = null;

  for (let attemptIndex = 0; attemptIndex < CONNECT_RETRY_DELAYS_MS.length; attemptIndex += 1) {
    const attemptNumber = attemptIndex + 1;
    const waitMs = CONNECT_RETRY_DELAYS_MS[attemptIndex];

    if (waitMs > 0) {
      listeners.onStatus({
        level: "info",
        message: `Retrying connection to @${normalizedUsername} (${attemptNumber}/${CONNECT_RETRY_DELAYS_MS.length})...`
      });
      await delay(waitMs);
    }

    const connection = new TikTokLiveConnection(normalizedUsername, {
      processInitialData: false,
      requestPollingIntervalMs: LIVE_REQUEST_POLLING_INTERVAL_MS
    });

    bindConnectionEvents(connection, normalizedUsername, listeners);

      try {
        await ensureLiveIsActive(connection, normalizedUsername);
        const state = await connection.connect();
        const resolvedRoomId = state.roomId ?? null;

        if (!resolvedRoomId) {
          try {
            await connection.disconnect();
          } catch {
            // Ignore cleanup errors after a failed connect attempt.
          }

          throw new Error(`TikTok did not return a valid room ID for @${normalizedUsername}. The live may not be active yet, so please try again when the stream is fully live.`);
        }

        await ensureLiveIsActive(connection, normalizedUsername);

        currentConnection = connection;
        connectionState = {
          connected: true,
          username: normalizedUsername,
          roomId: resolvedRoomId,
          viewerCount: null
        };

        try {
          const roomInfo = await connection.fetchRoomInfo();
          const viewerCount = extractViewerCount(roomInfo);
          const hostProfile = getHostProfileFromRoomInfo(roomInfo, normalizedUsername);
          if (viewerCount !== null) {
            connectionState = {
              ...connectionState,
              viewerCount
            };
          }
          if (hostProfile.profilePictureUrl || hostProfile.bio) {
            connectionState = {
              ...connectionState,
              hostProfilePictureUrl: hostProfile.profilePictureUrl,
              hostBio: hostProfile.bio
            };
          }
        } catch {
          // Ignore room info fetch issues here; live count updates can still arrive through events.
        }

      return connectionState;
    } catch (error) {
      lastError = error;

      try {
        await connection.disconnect();
      } catch {
        // Ignore cleanup errors after a failed connect attempt.
      }

      if (!shouldRetryConnection(error) || attemptIndex === CONNECT_RETRY_DELAYS_MS.length - 1) {
        break;
      }

      listeners.onStatus({
        level: "info",
        message: `TikTok connection handshake failed for @${normalizedUsername}. Trying again...`
      });
    }
  }

  connectionState = {
    connected: false,
    username: normalizedUsername,
    roomId: null,
    viewerCount: null
  };

  throw new Error(formatConnectionError(lastError, normalizedUsername));
}
