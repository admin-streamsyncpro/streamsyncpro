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
    <title>Stream Sync Pro Viewer Stats Overlay</title>
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
        --mod: #ff9d6a;
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
        width: min(920px, 100%);
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
        flex-wrap: wrap;
      }

      .overlay-title {
        margin: 0;
        font-size: 24px;
        line-height: 1.1;
        font-weight: 800;
        letter-spacing: -0.03em;
      }

      .head-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
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

      .summary-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
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
        grid-template-columns: 48px minmax(0, 1.2fr) repeat(6, minmax(72px, auto)) auto;
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

      .leaderboard-user-wrap {
        min-width: 0;
        display: grid;
        gap: 6px;
      }

      .leaderboard-user {
        min-width: 0;
        font-size: 18px;
        line-height: 1.2;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .leaderboard-handle {
        font-size: 12px;
        color: var(--muted);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .leaderboard-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        padding: 5px 8px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .badge.sub {
        color: var(--success);
        background: rgba(108, 243, 171, 0.08);
      }

      .badge.mod {
        color: var(--mod);
        background: rgba(255, 157, 106, 0.08);
      }

      .stat-col {
        display: grid;
        gap: 4px;
        text-align: center;
      }

      .stat-col strong {
        font-size: 16px;
        line-height: 1;
      }

      .stat-col small {
        color: var(--accent);
        font-size: 11px;
        line-height: 1;
        font-weight: 800;
      }

      .stat-col span {
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
      }

      .score-pill {
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
        justify-content: center;
        min-width: 78px;
        padding: 10px 12px;
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

      .score-pill small {
        color: var(--muted);
        font-size: 10px;
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
        <p class="eyebrow">Viewer Stats</p>
        <div class="overlay-title-row">
          <h1 class="overlay-title">Viewer Stats Leaderboard</h1>
          <div class="head-pills">
            <div class="status-pill">
              <span id="status-dot" class="status-dot"></span>
              <span id="status-text">Waiting</span>
            </div>
            <div id="filter-pill" class="status-pill">Everyone</div>
          </div>
        </div>
      </header>

      <div class="overlay-body">
        <div class="summary-grid">
          <div class="summary-card">
            <span class="summary-label">Live Account</span>
            <div id="live-username" class="summary-value">No live connected</div>
          </div>
          <div class="summary-card">
            <span class="summary-label">Leaderboard scope</span>
            <div id="scope-summary" class="summary-value">Everyone</div>
          </div>
        </div>
        <div id="leaderboard-list" class="leaderboard-list"></div>
        <div id="empty-state" class="empty-state">No viewer activity has been recorded yet.</div>
      </div>
    </section>

    <script>
      const overlayAccessQuery = <?php echo json_encode($overlayAccessQuery, JSON_UNESCAPED_SLASHES); ?>;
      const designerOverlayRoot = document.getElementById("designer-overlay-root");
      const defaultOverlayShell = document.getElementById("default-overlay-shell");
      const statusDot = document.getElementById("status-dot");
      const statusText = document.getElementById("status-text");
      const filterPill = document.getElementById("filter-pill");
      const scopeSummary = document.getElementById("scope-summary");
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

      function getScopeLabel(state) {
        const audience = String(state?.filterAudience ?? "everyone").trim().toLowerCase();
        if (audience === "subscriber") return "Subscribers";
        if (audience === "moderator") return "Moderators";
        if (audience === "username") {
          const username = String(state?.filterUsername ?? "").trim();
          return username ? `@${username}` : "Specific user";
        }
        return "Everyone";
      }

      function renderStatCell(label, streamValue, allTimeValue) {
        return `
          <div class="stat-col">
            <strong>${Number(streamValue || 0)}</strong>
            <small>${Number(allTimeValue || 0)} all</small>
            <span>${escapeHtml(label)}</span>
          </div>
        `;
      }

      function formatRankScore(value) {
        const score = Number(value || 0);
        return Number.isInteger(score) ? String(score) : score.toFixed(2).replace(/\.?0+$/, "");
      }

      function renderState(state) {
        if (state?.designerTemplate && window.StreamSyncOverlayDesignerRuntime) {
          defaultOverlayShell.hidden = true;
          designerOverlayRoot.hidden = false;
          const topItem = Array.isArray(state?.items) ? (state.items[0] || null) : null;
          window.StreamSyncOverlayDesignerRuntime.render(designerOverlayRoot, state.designerTemplate, {
            username: state?.username || "",
            counters: {
              likes: topItem ? Number(topItem.likes || 0) : 0,
              comments: topItem ? Number(topItem.comments || 0) : 0,
              gifts: topItem ? Number(topItem.gifts || 0) : 0,
              follows: topItem ? Number(topItem.follows || 0) : 0,
              coins: topItem ? Number(topItem.coins || 0) : 0,
              shares: topItem ? Number(topItem.shares || 0) : 0,
              allTimeLikes: topItem ? Number(topItem.allTimeLikes || 0) : 0,
              allTimeComments: topItem ? Number(topItem.allTimeComments || 0) : 0,
              allTimeGifts: topItem ? Number(topItem.allTimeGifts || 0) : 0,
              allTimeFollows: topItem ? Number(topItem.allTimeFollows || 0) : 0,
              allTimeCoins: topItem ? Number(topItem.allTimeCoins || 0) : 0,
              allTimeShares: topItem ? Number(topItem.allTimeShares || 0) : 0
            },
            chatMessage: topItem ? {
              username: topItem.username || state?.username || "",
              message: `${topItem.displayName || topItem.username || "Viewer"} - ${formatRankScore(topItem.rankScore)} stream pts / ${formatRankScore(topItem.allTimeRankScore)} all-time pts`
            } : null
          });
          return;
        }

        defaultOverlayShell.hidden = false;
        designerOverlayRoot.hidden = true;
        const connected = Boolean(state?.connected);
        const username = String(state?.username ?? "").trim();
        const items = Array.isArray(state?.items) ? state.items : [];
        const scopeLabel = getScopeLabel(state);

        statusDot.classList.toggle("live", connected);
        statusText.textContent = connected ? "Live" : "Offline";
        filterPill.textContent = scopeLabel;
        scopeSummary.textContent = scopeLabel;
        liveUsername.textContent = username ? `@${username}` : "No live connected";

        leaderboardList.innerHTML = items.map((item) => `
          <article class="leaderboard-row">
            <div class="leaderboard-rank">${Number(item.rank || 0) || ""}</div>
            <div class="leaderboard-user-wrap">
              <div class="leaderboard-user">${escapeHtml(item.displayName || item.username || "Viewer")}</div>
              <div class="leaderboard-handle">@${escapeHtml(item.username || "viewer")}</div>
              <div class="leaderboard-badges">
                ${item.isSubscriber ? '<span class="badge sub">Sub</span>' : ''}
                ${item.isModerator ? '<span class="badge mod">Mod</span>' : ''}
              </div>
            </div>
            ${renderStatCell("Likes", item.likes, item.allTimeLikes)}
            ${renderStatCell("Gifts", item.gifts, item.allTimeGifts)}
            ${renderStatCell("Comments", item.comments, item.allTimeComments)}
            ${renderStatCell("Shares", item.shares, item.allTimeShares)}
            ${renderStatCell("Follows", item.follows, item.allTimeFollows)}
            ${renderStatCell("Coins", item.coins, item.allTimeCoins)}
            <div class="score-pill">
              <span>${formatRankScore(item.rankScore)} pts</span>
              <small>${formatRankScore(item.allTimeRankScore)} all-time</small>
            </div>
          </article>
        `).join("");

        emptyState.hidden = items.length > 0;
        leaderboardList.hidden = items.length === 0;
      }

      async function loadState() {
        const response = await fetch(`/api/overlay/viewer-stats-state?${overlayAccessQuery}`, {
          cache: "no-store"
        });
        const payload = await response.json();
        if (!response.ok || !payload?.ok) {
          throw new Error(payload?.error || "Unable to load viewer stats overlay.");
        }
        renderState(payload.state || {});
      }

      async function refresh() {
        try {
          await loadState();
        } catch {
          // Keep polling quietly for hosted overlays.
        }
      }

      refresh();
      setInterval(refresh, 1500);
    </script>
  </body>
</html>
