import { randomUUID } from "node:crypto";
import {
  ControlEvent,
  TikTokLiveConnection,
  WebcastEvent
} from "tiktok-live-connector";

const CONNECT_RETRY_DELAYS_MS = [0, 1200, 2500];

let currentConnection = null;
let connectionState = {
  connected: false,
  username: "",
  roomId: null
};

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
    roomId: null
  };

  return connectionState;
}

export function getConnectionState() {
  return connectionState;
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

function formatConnectionError(error, username) {
  const rawMessage = String(error?.info ?? error?.message ?? error ?? "").trim();

  if (
    rawMessage.toLowerCase().includes("websocket connection failed") &&
    rawMessage.toLowerCase().includes("unexpected server response: 200")
  ) {
    return `TikTok refused the live chat handshake for @${username}. This is usually temporary, so please try again in a moment.`;
  }

  return rawMessage || `Unable to connect to @${username}.`;
}

function bindConnectionEvents(connection, normalizedUsername, listeners) {
  connection.on(WebcastEvent.CHAT, (data) => {
    const roleFlags = getRoleFlags(data);

    listeners.onChat({
      id: data.commentId ?? randomUUID(),
      type: "chat",
      user: data.user?.uniqueId ?? "unknown",
      nickname: data.user?.nickname ?? data.user?.uniqueId ?? "unknown",
      ...roleFlags,
      message: data.comment ?? "",
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
    const countSuffix = giftCount > 1 ? ` x${giftCount}` : "";

    listeners.onChat({
      id: data.msgId ?? data.giftId ?? randomUUID(),
      type: "gift",
      user: data.user?.uniqueId ?? "unknown",
      nickname: data.user?.nickname ?? data.user?.uniqueId ?? "unknown",
      ...roleFlags,
      message: `sent ${giftName}${countSuffix}`,
      giftName,
      giftCount,
      coinValue,
      totalCoins: coinValue * giftCount,
      timestamp: new Date().toISOString()
    });
  });

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

  connection.on(ControlEvent.CONNECTED, (state) => {
    listeners.onStatus({
      level: "success",
      message: `Connected to room ${state.roomId}.`
    });
  });

  connection.on(ControlEvent.DISCONNECTED, () => {
    connectionState = {
      connected: false,
      username: normalizedUsername,
      roomId: null
    };

    listeners.onStatus({
      level: "info",
      message: "Disconnected from TikTok LIVE."
    });
  });

  connection.on(WebcastEvent.STREAM_END, () => {
    listeners.onStatus({
      level: "info",
      message: "The live stream has ended."
    });
  });

  connection.on(ControlEvent.ERROR, (error) => {
    listeners.onStatus({
      level: "error",
      message: error?.info ?? error?.message ?? "TikTok connection error."
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
      processInitialData: false
    });

    bindConnectionEvents(connection, normalizedUsername, listeners);

    try {
      const state = await connection.connect();
      currentConnection = connection;
      connectionState = {
        connected: true,
        username: normalizedUsername,
        roomId: state.roomId ?? null
      };

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
    roomId: null
  };

  throw new Error(formatConnectionError(lastError, normalizedUsername));
}
