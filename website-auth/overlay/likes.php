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
    <title>Stream Sync Pro Likes Overlay</title>
    <script src="./designer-runtime.js"></script>
    <style>
      :root {
        color-scheme: dark;
        --line: rgba(84, 208, 255, 0.16);
        --text: #eef6ff;
        --muted: #9fb8d6;
        --accent: #53dcff;
        --accent-2: #ffcf6a;
        --success: #6cf3ab;
      }

      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        min-height: 100%;
        background: transparent;
        color: var(--text);
        font-family: "Segoe UI", system-ui, sans-serif;
      }

      body { padding: 18px; }

      .overlay-shell {
        width: min(520px, 100%);
        border-radius: 24px;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(7, 15, 30, 0.96) 0%, rgba(7, 13, 24, 0.92) 100%);
        border: 1px solid var(--line);
        box-shadow:
          0 20px 60px rgba(0, 0, 0, 0.42),
          0 0 0 1px rgba(255, 207, 106, 0.08),
          0 0 28px rgba(83, 220, 255, 0.12);
      }

      .overlay-head {
        padding: 14px 18px 12px;
        border-bottom: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(5, 9, 17, 0.98) 0%, rgba(15, 22, 37, 0.96) 100%);
      }

      .eyebrow {
        margin: 0;
        font-size: 11px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #e070ff;
        font-weight: 700;
      }

      .overlay-title-row {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .overlay-title {
        margin: 0;
        font-size: 24px;
        line-height: 1.1;
        font-weight: 800;
        letter-spacing: -0.03em;
      }

      .status-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.04);
        font-size: 12px;
        color: var(--muted);
      }

      .status-dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.3);
      }

      .status-dot.live {
        background: var(--success);
        box-shadow: 0 0 18px rgba(108, 243, 171, 0.45);
      }

      .overlay-body {
        padding: 16px 18px 18px;
        display: grid;
        gap: 12px;
      }

      .summary-card,
      .leaderboard-row {
        padding: 14px 15px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(84, 208, 255, 0.1);
      }

      .summary-label {
        display: block;
        margin-bottom: 8px;
        font-size: 11px;
        line-height: 1;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--muted);
      }

      .summary-value {
        font-size: 16px;
        line-height: 1.45;
        font-weight: 700;
      }

      .leaderboard-list {
        display: grid;
        gap: 10px;
      }

      .leaderboard-row {
        display: grid;
        grid-template-columns: 48px minmax(0, 1fr) auto;
        align-items: center;
        gap: 12px;
      }

      .leaderboard-rank {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--accent-2);
        font-size: 15px;
        font-weight: 800;
      }

      .leaderboard-user {
        min-width: 0;
        font-size: 18px;
        line-height: 1.3;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .leaderboard-likes {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.04);
        color: var(--accent);
        font-size: 12px;
        line-height: 1;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
      }

      .empty-state {
        padding: 16px;
        border-radius: 18px;
        border: 1px dashed rgba(84, 208, 255, 0.18);
        background: rgba(255, 255, 255, 0.02);
        color: var(--muted);
        font-size: 14px;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <div id="designer-overlay-root" hidden></div>
    <section id="default-overlay-shell" class="overlay-shell">
      <header class="overlay-head">
        <p class="eyebrow">Like Overlay</p>
        <div class="overlay-title-row">
          <h1 class="overlay-title">Like Leaderboard</h1>
          <div class="status-pill">
            <span id="status-dot" class="status-dot"></span>
            <span id="status-text">Waiting</span>
          </div>
        </div>
      </header>

      <div class="overlay-body">
        <div class="summary-card">
          <span class="summary-label">Live Account</span>
          <div id="live-username" class="summary-value">No live connected</div>
        </div>
        <div id="leaderboard-list" class="leaderboard-list"></div>
        <div id="empty-state" class="empty-state">No likes have been received yet.</div>
      </div>
    </section>

    <script>
      const overlayAccessQuery = <?php echo json_encode($overlayAccessQuery, JSON_UNESCAPED_SLASHES); ?>;
      const designerOverlayRoot = document.getElementById("designer-overlay-root");
      const defaultOverlayShell = document.getElementById("default-overlay-shell");
      const statusDot = document.getElementById("status-dot");
      const statusText = document.getElementById("status-text");
      const liveUsername = document.getElementById("live-username");
      const leaderboardList = document.getElementById("leaderboard-list");
      const emptyState = document.getElementById("empty-state");

      function escapeHtml(value) {
        return String(value ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll("\"", "&quot;")
          .replaceAll("'", "&#39;");
      }

      function renderState(state) {
        if (state?.designerTemplate && window.StreamSyncOverlayDesignerRuntime) {
          defaultOverlayShell.hidden = true;
          designerOverlayRoot.hidden = false;
          const topItem = Array.isArray(state?.items) ? (state.items[0] || null) : null;
          window.StreamSyncOverlayDesignerRuntime.render(designerOverlayRoot, state.designerTemplate, {
            username: state?.username || "",
            counters: { likes: topItem ? Number(topItem.likes || 0) : 0 },
            chatMessage: topItem ? {
              username: topItem.username || state?.username || "",
              message: `${topItem.likes || 0} likes`
            } : null
          });
          return;
        }

        defaultOverlayShell.hidden = false;
        designerOverlayRoot.hidden = true;
        const connected = Boolean(state?.connected);
        const username = String(state?.username ?? "").trim();
        const items = Array.isArray(state?.items) ? state.items : [];

        statusDot.classList.toggle("live", connected);
        statusText.textContent = connected ? "Live connected" : "Not connected";
        liveUsername.textContent = connected && username ? `@${username}` : "No live connected";

        if (!items.length) {
          leaderboardList.innerHTML = "";
          emptyState.style.display = "block";
          return;
        }

        emptyState.style.display = "none";
        leaderboardList.innerHTML = items.map((item) => `
          <article class="leaderboard-row">
            <div class="leaderboard-rank">#${escapeHtml(item?.rank || 1)}</div>
            <div class="leaderboard-user">@${escapeHtml(item?.username || "viewer")}</div>
            <div class="leaderboard-likes">${escapeHtml(item?.likes || 0)} likes</div>
          </article>
        `).join("");
      }

      async function loadLikesState() {
        if (!overlayAccessQuery) {
          renderState({});
          statusText.textContent = "Missing overlay id";
          return;
        }

        try {
          const response = await fetch(`/api/overlay/likes-state?${overlayAccessQuery}`, {
            cache: "no-store"
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result?.error || "Overlay unavailable.");
          }
          renderState(result?.state ?? {});
        } catch (error) {
          renderState({});
          statusText.textContent = error?.message || "Overlay unavailable";
        }
      }

      loadLikesState();
      window.setInterval(loadLikesState, 1200);
    </script>
  </body>
</html>
