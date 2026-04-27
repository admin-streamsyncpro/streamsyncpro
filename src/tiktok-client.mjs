import { randomUUID } from "node:crypto";
import {
  ControlEvent,
  TikTokLiveConnection,
  WebcastEvent
} from "tiktok-live-connector";

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
  const repeatCount = Number(data.repeatCount ?? data.comboCount ?? 1);
  return Number.isFinite(repeatCount) && repeatCount > 0 ? repeatCount : 1;
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

  const connection = new TikTokLiveConnection(normalizedUsername, {
    processInitialData: false
  });

  connection.on(WebcastEvent.CHAT, (data) => {
    const userIdentity = data.userIdentity ?? {};

    listeners.onChat({
      id: data.commentId ?? randomUUID(),
      type: "chat",
      user: data.user?.uniqueId ?? "unknown",
      nickname: data.user?.nickname ?? data.user?.uniqueId ?? "unknown",
      isSubscriber: Boolean(
        userIdentity.isSubscriberOfAnchor ?? data.user?.isSubscriberOfAnchor
      ),
      isModerator: Boolean(
        userIdentity.isModeratorOfAnchor ?? data.user?.isModeratorOfAnchor
      ),
      message: data.comment ?? "",
      timestamp: new Date().toISOString()
    });
  });

  connection.on(WebcastEvent.GIFT, (data) => {
    const userIdentity = data.userIdentity ?? {};
    const isStreakableGift = Number(data.giftType) === 1;

    if (isStreakableGift && !data.repeatEnd) {
      return;
    }

    const giftCount = getGiftCount(data);
    const giftName = getGiftName(data);
    const countSuffix = giftCount > 1 ? ` x${giftCount}` : "";

    listeners.onChat({
      id: data.msgId ?? data.giftId ?? randomUUID(),
      type: "gift",
      user: data.user?.uniqueId ?? "unknown",
      nickname: data.user?.nickname ?? data.user?.uniqueId ?? "unknown",
      isSubscriber: Boolean(
        userIdentity.isSubscriberOfAnchor ?? data.user?.isSubscriberOfAnchor
      ),
      isModerator: Boolean(
        userIdentity.isModeratorOfAnchor ?? data.user?.isModeratorOfAnchor
      ),
      message: `sent ${giftName}${countSuffix}`,
      giftName,
      giftCount,
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

  const state = await connection.connect();
  currentConnection = connection;
  connectionState = {
    connected: true,
    username: normalizedUsername,
    roomId: state.roomId ?? null
  };

  return connectionState;
}
