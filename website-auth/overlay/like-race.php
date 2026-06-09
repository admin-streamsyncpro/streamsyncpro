<?php
declare(strict_types=1);

$overlayId = trim((string) ($_GET['id'] ?? ''));
$overlayToken = trim((string) ($_GET['token'] ?? ''));
$overlayAccessQuery = $overlayId !== ''
    ? 'id=' . rawurlencode($overlayId)
    : 'token=' . rawurlencode($overlayToken);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Stream Sync Pro Like Race</title>
    <style>
      :root {
        --race-bg: rgba(4, 10, 24, 0.72);
        --race-track: #39d7ff;
        --race-accent: #b86cff;
        --race-text: #f7fbff;
        --race-muted: #9eb7d8;
        --race-glow: rgba(57, 215, 255, 0.48);
        --race-bg-image: none;
        --race-title-color: #f7fbff;
        --race-label-color: #dcecff;
        --race-title-size: 64px;
        --race-label-size: 12px;
        --race-username-size: 11px;
        --race-commentary-size: 14px;
        --avatar-size: 54px;
        --track-padding: 4px;
        color-scheme: dark;
        font-family: "Trebuchet MS", "Segoe UI", sans-serif;
      }

      * { box-sizing: border-box; }
      html, body {
        width: 100%;
        height: 100%;
        min-width: 100vw;
        min-height: 100vh;
        margin: 0;
        overflow: hidden;
        background: transparent;
        color: var(--race-text);
      }

      body {
        display: block;
      }

      .race-shell {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        min-height: 0;
        overflow: hidden;
        border: 0;
        border-radius: 0;
        background:
          var(--race-bg-image),
          radial-gradient(circle at 50% 18%, rgba(184, 108, 255, 0.28), transparent 36%),
          radial-gradient(circle at 50% 82%, rgba(57, 215, 255, 0.18), transparent 42%),
          var(--race-bg);
        background-position: center;
        background-size: cover;
        box-shadow: inset 0 0 40px rgba(57, 215, 255, 0.08);
        opacity: 0;
        transition: opacity 220ms ease;
      }

      .race-shell:not(.idle) {
        opacity: 1;
      }

      .track {
        position: absolute;
        inset: var(--track-padding);
        border: 6px solid color-mix(in srgb, var(--race-track) 86%, transparent);
        border-radius: 0;
        box-shadow: inset 0 0 24px rgba(184, 108, 255, 0.16);
      }

      .track::before {
        content: "START";
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        padding: 6px 14px;
        border: 1px solid var(--race-track);
        border-radius: 999px;
        background: #061224;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 0.18em;
      }

      .race-center {
        position: absolute;
        inset: clamp(112px, 14vh, 190px) clamp(44px, 9vw, 116px);
        display: grid;
        align-content: center;
        justify-items: center;
        gap: 18px;
        text-align: center;
        pointer-events: none;
        transition: opacity 220ms ease;
      }

      .race-center.center-hidden {
        opacity: 0;
      }

      .running .race-center:not(.event-active) {
        opacity: 0;
      }

      .eyebrow {
        margin: 0;
        color: var(--race-accent);
        font-size: 13px;
        font-weight: 900;
        letter-spacing: 0.22em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        color: var(--race-title-color);
        font-size: clamp(18px, 7vw, var(--race-title-size));
        line-height: 0.95;
        text-shadow: 0 4px 0 rgba(0, 0, 0, 0.38), 0 0 26px var(--race-glow);
      }

      .status-row,
      .leaderboard,
      .commentary {
        width: min(100%, 78vw, 620px);
        border: 1px solid rgba(120, 169, 220, 0.24);
        border-radius: 22px;
        background: rgba(7, 18, 36, 0.78);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .status-row {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
        padding: 12px;
      }

      .pill {
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        color: var(--race-label-color);
        font-size: var(--race-label-size);
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .joined-avatars {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        max-width: 440px;
      }

      .joined-avatars img,
      .winner-avatar {
        width: 54px;
        height: 54px;
        border: 2px solid var(--race-track);
        border-radius: 999px;
        object-fit: cover;
        background: #14233b;
      }

      .racer {
        position: absolute;
        z-index: 6;
        width: var(--avatar-size);
        height: var(--avatar-size);
        transform: translate(-50%, -50%);
        transition: left 420ms cubic-bezier(.2, .85, .24, 1), top 420ms cubic-bezier(.2, .85, .24, 1);
      }

      .racer img,
      .racer-fallback {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        border: 3px solid #fff;
        border-radius: 999px;
        object-fit: cover;
        background: linear-gradient(135deg, var(--race-track), var(--race-accent));
        box-shadow: 0 0 18px var(--race-glow);
        color: #061224;
        font-weight: 900;
      }

      .racer.boost img,
      .racer.boost .racer-fallback {
        animation: turbo 700ms ease-in-out 2;
      }

      .racer-name {
        position: absolute;
        left: 50%;
        top: calc(100% + 4px);
        max-width: min(86vw, calc(var(--race-username-size) * 12));
        overflow: hidden;
        padding: 4px 8px;
        transform: translateX(-50%);
        border-radius: 999px;
        background: rgba(3, 8, 18, 0.82);
        font-size: var(--race-username-size);
        font-weight: 900;
        line-height: 1.05;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .bubble {
        position: absolute;
        left: 50%;
        bottom: calc(100% + 8px);
        min-width: 120px;
        padding: 8px 10px;
        transform: translateX(-50%);
        border-radius: 14px;
        background: #fff;
        color: #061224;
        font-size: 12px;
        font-weight: 900;
      }

      .leaderboard {
        padding: 12px;
        text-align: left;
      }

      .leaderboard strong {
        display: block;
        margin-bottom: 8px;
        color: var(--race-track);
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .leader-row {
        display: grid;
        grid-template-columns: 28px 1fr auto;
        gap: 8px;
        align-items: center;
        margin-top: 6px;
        font-weight: 900;
      }

      .progress-bar {
        height: 8px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.11);
      }

      .progress-bar span {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--race-track), var(--race-accent));
      }

      .winner-card {
        display: grid;
        justify-items: center;
        gap: 12px;
      }

      .winner-card h1 {
        font-size: clamp(30px, 6vw, 58px);
      }

      .commentary {
        padding: 12px 14px;
        color: var(--race-muted);
        font-size: var(--race-commentary-size);
        font-weight: 800;
      }

      .running .race-center.event-active .status-row,
      .running .race-center.event-active .joined-avatars,
      .running .race-center.event-active .leaderboard {
        display: none;
      }

      .running .race-center.event-active h1 {
        font-size: clamp(18px, 5vw, var(--race-title-size));
      }

      .confetti {
        position: absolute;
        inset: 0;
        opacity: 0;
        pointer-events: none;
      }

      .finished .confetti {
        opacity: 1;
        background-image:
          radial-gradient(circle, #53dcff 0 4px, transparent 5px),
          radial-gradient(circle, #b86cff 0 4px, transparent 5px),
          radial-gradient(circle, #ffee77 0 3px, transparent 4px);
        background-size: 90px 110px, 130px 100px, 80px 90px;
        animation: confetti 1.5s linear infinite;
      }

      @keyframes turbo {
        50% { transform: scale(1.18); box-shadow: 0 0 30px #fff, 0 0 48px var(--race-track); }
      }

      @keyframes confetti {
        from { background-position: 0 -120px, 20px -90px, 40px -60px; }
        to { background-position: 0 680px, 20px 720px, 40px 700px; }
      }
    </style>
  </head>
  <body>
    <main id="race-shell" class="race-shell idle">
      <div class="track"></div>
      <div id="racers"></div>
      <section class="race-center">
        <p class="eyebrow">TikTok LIVE Like Race</p>
        <h1 id="race-title">Race Starting Soon</h1>
        <div id="status-row" class="status-row"></div>
        <div id="joined-avatars" class="joined-avatars"></div>
        <div id="winner-card" class="winner-card" hidden></div>
        <div id="leaderboard" class="leaderboard"></div>
        <div id="commentary" class="commentary">Type !joinrace to enter.</div>
      </section>
      <div class="confetti"></div>
    </main>

    <script>
      const overlayAccessQuery = <?php echo json_encode($overlayAccessQuery, JSON_UNESCAPED_SLASHES); ?>;
      const shell = document.getElementById("race-shell");
      const title = document.getElementById("race-title");
      const statusRow = document.getElementById("status-row");
      const joinedAvatars = document.getElementById("joined-avatars");
      const racersNode = document.getElementById("racers");
      const leaderboardNode = document.getElementById("leaderboard");
      const winnerCard = document.getElementById("winner-card");
      const commentary = document.getElementById("commentary");
      let lastState = null;

      function escapeHtml(value) {
        return String(value ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#39;");
      }

      function getCountdownSeconds(state) {
        const endAt = Date.parse(state.countdownEndsAt || "");
        if (!Number.isFinite(endAt)) {
          return Math.max(0, Number(state.countdownSeconds) || 0);
        }
        return Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      }

      function getTrackPoint(position) {
        const rect = shell.getBoundingClientRect();
        const avatarSize = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--avatar-size")) || 54;
        const inset = Math.max(12, (avatarSize / 2) + 4);
        const left = inset;
        const top = inset;
        const right = rect.width - inset;
        const bottom = rect.height - inset;
        const perimeter = ((right - left) * 2) + ((bottom - top) * 2);
        let distance = Math.max(0, Math.min(1, Number(position) || 0)) * perimeter;
        const topHalf = (right - left) / 2;
        if (distance <= topHalf) return { x: rect.width / 2 + distance, y: top };
        distance -= topHalf;
        if (distance <= bottom - top) return { x: right, y: top + distance };
        distance -= bottom - top;
        if (distance <= right - left) return { x: right - distance, y: bottom };
        distance -= right - left;
        if (distance <= bottom - top) return { x: left, y: bottom - distance };
        distance -= bottom - top;
        return { x: left + distance, y: top };
      }

      function avatarMarkup(racer, className = "") {
        const name = escapeHtml(racer.displayName || racer.username || "Viewer");
        if (racer.profilePictureUrl) {
          return `<img class="${className}" src="${escapeHtml(racer.profilePictureUrl)}" alt="${name}" onerror="this.style.visibility='hidden'" />`;
        }
        return `<span class="${className || "racer-fallback"}">${escapeHtml((racer.username || "V").slice(0, 1).toUpperCase())}</span>`;
      }

      function applyTheme(state) {
        const settings = state.overlaySettings || {};
        const backgroundImage = String(settings.backgroundImage || settings.backgroundAsset || "").trim();
        const safeBackgroundImage = backgroundImage.replaceAll("\\", "\\\\").replaceAll('"', "%22");
        document.documentElement.style.setProperty("--race-track", settings.trackColor || "#39d7ff");
        document.documentElement.style.setProperty("--race-accent", settings.accentColor || "#b86cff");
        document.documentElement.style.setProperty("--race-muted", settings.mutedColor || "#9eb7d8");
        document.documentElement.style.setProperty("--race-bg", hexToRgba(settings.backgroundColor || "#040a18", Number(settings.opacity ?? 0.72)));
        document.documentElement.style.setProperty("--race-bg-image", safeBackgroundImage ? `url("${safeBackgroundImage}")` : "none");
        document.documentElement.style.setProperty("--race-title-color", settings.titleColor || "#f7fbff");
        document.documentElement.style.setProperty("--race-label-color", settings.labelColor || "#dcecff");
        document.documentElement.style.setProperty("--race-title-size", `${Math.max(18, Number(settings.titleSize) || 64)}px`);
        document.documentElement.style.setProperty("--race-label-size", `${Math.max(8, Number(settings.labelSize) || 12)}px`);
        document.documentElement.style.setProperty("--race-username-size", `${Math.max(8, Number(settings.usernameSize) || 11)}px`);
        document.documentElement.style.setProperty("--race-commentary-size", `${Math.max(8, Number(settings.commentarySize) || 14)}px`);
        document.documentElement.style.setProperty("--avatar-size", `${Math.max(32, Number(settings.avatarSize) || 54)}px`);
        document.documentElement.style.setProperty("--track-padding", "4px");
      }

      function hexToRgba(hex, alpha) {
        const normalized = String(hex || "#040a18").replace("#", "");
        if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
          return `rgba(4, 10, 24, ${Math.max(0, Math.min(1, alpha))})`;
        }
        const value = Number.parseInt(normalized, 16);
        const red = (value >> 16) & 255;
        const green = (value >> 8) & 255;
        const blue = value & 255;
        return `rgba(${red}, ${green}, ${blue}, ${Math.max(0, Math.min(1, alpha))})`;
      }

      function render(state) {
        lastState = state;
        applyTheme(state);
        shell.className = `race-shell ${state.raceStatus || "idle"}`;
        const racers = Array.isArray(state.racers) ? state.racers : [];
        const leaderboard = Array.isArray(state.leaderboard) ? state.leaderboard : racers;
        const centreMessage = state.centreMessage || null;
        const now = Date.now();
        const centreMessageActive = centreMessage?.visibleUntil && Date.parse(centreMessage.visibleUntil) > now;
        const middleVisibleUntil = Date.parse(state.middleContentVisibleUntil || "");
        const middleContentActive = Number.isFinite(middleVisibleUntil) && middleVisibleUntil > now;
        const overlayVisibleUntil = Date.parse(state.overlayVisibleUntil || "");
        const finishedExpired = state.raceStatus === "finished" && Number.isFinite(overlayVisibleUntil) && overlayVisibleUntil <= now;
        const showMiddleContent = Boolean(centreMessageActive || middleContentActive || state.raceStatus === "finished");
        const centerNode = document.querySelector(".race-center");
        centerNode?.classList.toggle("event-active", Boolean(centreMessageActive || state.raceStatus === "finished"));
        centerNode?.classList.toggle("center-hidden", !showMiddleContent);
        shell.style.opacity = state.raceStatus === "idle" || finishedExpired ? "0" : "1";

        if (centreMessageActive && state.raceStatus === "running") {
          title.textContent = centreMessage.text;
        } else if (state.raceStatus === "countdown") {
          title.textContent = `Race starts in ${getCountdownSeconds(state)}s`;
        } else if (state.raceStatus === "running") {
          title.textContent = state.currentLeader?.username ? `${state.currentLeader.username} leads!` : "Race in Progress";
        } else if (state.raceStatus === "finished") {
          title.textContent = "Winner!";
        } else {
          title.textContent = "Race Starting Soon";
        }

        statusRow.innerHTML = [
          `${racers.length} racers`,
          `${Math.round(Number(state.totalSpaces) || 0)} spaces`,
          state.raceStatus === "running" ? "Tap likes to move" : "Type !joinrace"
        ].map((text) => `<span class="pill">${escapeHtml(text)}</span>`).join("");

        joinedAvatars.hidden = state.raceStatus === "running" || state.raceStatus === "finished";
        joinedAvatars.innerHTML = racers.slice(0, 24).map((racer) => avatarMarkup(racer)).join("");

        winnerCard.hidden = state.raceStatus !== "finished";
        winnerCard.innerHTML = state.raceStatus === "finished" && state.winner
          ? `${avatarMarkup(state.winner, "winner-avatar")}<h1>Congratulations ${escapeHtml(state.winner.displayName || state.winner.username)}!</h1>`
          : "";

        racersNode.innerHTML = state.raceStatus === "running"
          ? racers.map((racer) => {
              const point = getTrackPoint(racer.trackPosition);
              const usernameSize = Math.max(8, Number(state.overlaySettings?.usernameSize) || 11);
              const usernameWidth = Math.min(window.innerWidth * 0.86, Math.max(112, usernameSize * 12));
              return `
                <div class="racer ${racer.giftCoinsReceived ? "boost" : ""}" style="left:${point.x}px;top:${point.y}px">
                  ${avatarMarkup(racer)}
                  <span class="racer-name" style="font-size:${usernameSize}px;max-width:${usernameWidth}px">#${escapeHtml(racer.currentRank)} ${escapeHtml(racer.username)}</span>
                  ${racer.speechBubble ? `<span class="bubble">${escapeHtml(racer.speechBubble)}</span>` : ""}
                </div>
              `;
            }).join("")
          : "";

        leaderboardNode.hidden = state.raceStatus === "finished";
        leaderboardNode.innerHTML = `
          <strong>${state.raceStatus === "running" ? "Mini Leaderboard" : "Lobby"}</strong>
          ${leaderboard.slice(0, 5).map((racer, index) => `
            <div class="leader-row">
              <span>#${index + 1}</span>
              <span>${escapeHtml(racer.displayName || racer.username)}</span>
              <span>${Math.round(Number(racer.progressPercent) || 0)}%</span>
            </div>
            <div class="progress-bar"><span style="width:${Math.max(0, Math.min(100, Number(racer.progressPercent) || 0))}%"></span></div>
          `).join("") || `<div class="leader-row"><span></span><span>No racers yet</span><span>0%</span></div>`}
        `;

        const latestCommentary = Array.isArray(state.commentaryQueue) ? state.commentaryQueue.at(-1) : null;
        commentary.textContent = centreMessageActive ? centreMessage.text : latestCommentary?.text || "Type !joinrace to enter.";
      }

      async function poll() {
        if (!overlayAccessQuery) {
          shell.className = "race-shell idle";
          return;
        }

        try {
          const response = await fetch(`/api/overlay/like-race-state?${overlayAccessQuery}`, { cache: "no-store" });
          const payload = await response.json();
          if (payload?.state) {
            render(payload.state);
          }
        } catch {
          if (!lastState) {
            shell.className = "race-shell idle";
          }
        }
      }

      setInterval(poll, 700);
      setInterval(() => {
        if (lastState?.raceStatus === "countdown") {
          render(lastState);
        }
      }, 250);
      void poll();
    </script>
  </body>
</html>
