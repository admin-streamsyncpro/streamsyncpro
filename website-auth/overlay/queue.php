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
    <title>Stream Sync Pro LIVE Queue Overlay</title>
    <script src="./designer-runtime.js"></script>
    <style>
      :root {
        color-scheme: dark;
        --bg: rgba(4, 9, 20, 0.84);
        --panel: rgba(10, 18, 34, 0.88);
        --panel-strong: rgba(5, 11, 22, 0.94);
        --line: rgba(84, 208, 255, 0.4);
        --line-soft: rgba(84, 208, 255, 0.16);
        --text: #eef6ff;
        --muted: #9fb8d6;
        --accent: #53dcff;
        --accent-2: #a35dff;
        --success: #6cf3ab;
        --warn: #ffcf6a;
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
      body.mode-compact { padding: 10px; }

      .overlay-shell {
        width: min(460px, 100%);
        border-radius: 24px;
        position: relative;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(7, 15, 30, 0.96) 0%, rgba(7, 13, 24, 0.92) 100%);
        border: 1px solid var(--line-soft);
        box-shadow:
          0 20px 60px rgba(0, 0, 0, 0.45),
          0 0 0 1px rgba(163, 93, 255, 0.12),
          0 0 36px rgba(83, 220, 255, 0.12);
      }

      body.mode-compact .overlay-shell {
        width: min(760px, 100%);
        border-radius: 28px;
      }

      .overlay-shell::before {
        content: "";
        position: absolute;
        inset: 0;
        padding: 1px;
        border-radius: inherit;
        background: conic-gradient(
          from var(--border-angle, 0deg),
          rgba(83, 220, 255, 0.95),
          rgba(163, 93, 255, 0.9),
          rgba(83, 220, 255, 0.95)
        );
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        animation: border-travel 9s linear infinite;
      }

      .overlay-head {
        position: relative;
        z-index: 1;
        padding: 14px 18px 13px;
        border-bottom: 1px solid var(--line-soft);
        background: linear-gradient(180deg, rgba(5, 9, 17, 0.98) 0%, rgba(15, 22, 37, 0.96) 100%);
      }

      body.mode-compact .overlay-head { padding: 16px 20px 14px; }

      .eyebrow {
        margin: 0;
        font-size: 11px;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #e070ff;
        font-weight: 700;
      }

      .overlay-topline {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .overlay-title {
        font-size: 24px;
        line-height: 1.08;
        font-weight: 800;
        margin: 0;
        letter-spacing: -0.03em;
      }

      body.mode-compact .overlay-title { font-size: 34px; }

      .overlay-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 12px;
        color: var(--muted);
        white-space: nowrap;
      }

      .status-dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: var(--warn);
        box-shadow: 0 0 18px rgba(255, 207, 106, 0.45);
      }

      .status-dot.live {
        background: var(--success);
        box-shadow: 0 0 18px rgba(108, 243, 171, 0.45);
      }

      .overlay-body {
        position: relative;
        z-index: 1;
        padding: 16px 18px 18px;
        display: grid;
        gap: 14px;
      }

      body.mode-compact .overlay-body {
        gap: 12px;
        padding: 14px 20px 18px;
      }

      .overlay-summary {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      body.mode-compact .overlay-summary { grid-template-columns: 1.2fr 0.8fr; }

      .summary-card {
        padding: 14px 15px;
        border-radius: 18px;
        background: rgba(7, 13, 26, 0.72);
        border: 1px solid rgba(84, 208, 255, 0.12);
      }

      .summary-label {
        display: block;
        font-size: 11px;
        line-height: 1;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--muted);
        margin-bottom: 9px;
      }

      .summary-value {
        font-size: 28px;
        line-height: 1;
        font-weight: 800;
        letter-spacing: -0.04em;
      }

      .summary-subtle {
        font-size: 14px;
        line-height: 1.35;
        font-weight: 700;
      }

      .queue-panel {
        padding: 16px;
        border-radius: 20px;
        background: rgba(7, 13, 26, 0.8);
        border: 1px solid rgba(84, 208, 255, 0.12);
      }

      body.mode-compact .queue-panel { padding: 18px; }

      .queue-panel-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      }

      .queue-panel-title {
        margin: 0;
        font-size: 15px;
        line-height: 1.2;
        font-weight: 800;
      }

      .queue-tag {
        font-size: 11px;
        line-height: 1;
        padding: 7px 10px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--muted);
      }

      .queue-list { display: grid; gap: 10px; }

      .queue-item {
        display: grid;
        gap: 7px;
        padding: 12px 13px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(84, 208, 255, 0.08);
      }

      .queue-item.running {
        background: linear-gradient(180deg, rgba(26, 49, 83, 0.48) 0%, rgba(15, 27, 47, 0.72) 100%);
        border-color: rgba(84, 208, 255, 0.22);
        box-shadow: inset 0 0 0 1px rgba(84, 208, 255, 0.08);
      }

      .queue-item-title {
        font-size: 15px;
        line-height: 1.32;
        font-weight: 800;
      }

      .queue-item-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 9px;
        border-radius: 999px;
        font-size: 11px;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: 0.09em;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .pill.kind-tts { color: var(--accent); }
      .pill.kind-action { color: #ffcf6a; }
      .pill.status-running { color: var(--success); }

      .empty-state {
        padding: 16px;
        border-radius: 18px;
        border: 1px dashed rgba(84, 208, 255, 0.18);
        background: rgba(255, 255, 255, 0.02);
        color: var(--muted);
        font-size: 14px;
        line-height: 1.5;
      }

      .compact-now-playing {
        display: grid;
        gap: 12px;
      }

      .compact-line {
        font-size: 16px;
        line-height: 1.45;
        color: var(--muted);
        font-weight: 600;
      }

      .compact-title {
        font-size: 44px;
        line-height: 1.04;
        letter-spacing: -0.04em;
        font-weight: 800;
      }

      .compact-subtle {
        display: inline-flex;
        gap: 9px;
        flex-wrap: wrap;
        align-items: center;
      }

      .hidden { display: none !important; }

      @keyframes border-travel {
        from { --border-angle: 0deg; }
        to { --border-angle: 360deg; }
      }
    </style>
  </head>
  <body>
    <div id="designer-overlay-root" hidden></div>
    <section id="default-overlay-shell" class="overlay-shell">
      <header class="overlay-head">
        <p class="eyebrow">Queue Overlay</p>
        <div class="overlay-topline">
          <h1 class="overlay-title" id="overlay-title">Queue Status</h1>
          <div class="overlay-status">
            <span class="status-dot" id="status-dot"></span>
            <span id="overlay-status-text">Waiting</span>
          </div>
        </div>
      </header>

      <div class="overlay-body">
        <div class="overlay-summary" id="overlay-summary">
          <div class="summary-card">
            <span class="summary-label">Live Account</span>
            <div class="summary-subtle" id="live-username">No live connected</div>
          </div>
          <div class="summary-card">
            <span class="summary-label">Queue Count</span>
            <div class="summary-value" id="queue-count">0</div>
          </div>
        </div>

        <section class="queue-panel" id="full-panel">
          <div class="queue-panel-head">
            <h2 class="queue-panel-title">Queue Items</h2>
            <span class="queue-tag" id="queue-tag">Queue 1</span>
          </div>
          <div class="queue-list" id="queue-list"></div>
          <div class="empty-state hidden" id="queue-empty">Nothing is queued for this lane right now.</div>
        </section>

        <section class="queue-panel hidden" id="compact-panel">
          <div class="compact-now-playing">
            <div class="compact-line" id="compact-line">No active queue items yet.</div>
            <div class="compact-title" id="compact-title">Waiting for activity</div>
            <div class="compact-subtle" id="compact-meta"></div>
          </div>
        </section>
      </div>
    </section>

    <script>
      const overlayAccessQuery = <?php echo json_encode($overlayAccessQuery, JSON_UNESCAPED_SLASHES); ?>;
      const designerOverlayRoot = document.getElementById("designer-overlay-root");
      const defaultOverlayShell = document.getElementById("default-overlay-shell");
      const params = new URLSearchParams(window.location.search);
      const queueNumber = Math.min(10, Math.max(1, Number(params.get("queue") || "1") || 1));
      const mode = params.get("mode") === "compact" ? "compact" : "full";

      const body = document.body;
      const overlayTitle = document.getElementById("overlay-title");
      const statusDot = document.getElementById("status-dot");
      const overlayStatusText = document.getElementById("overlay-status-text");
      const liveUsername = document.getElementById("live-username");
      const queueCount = document.getElementById("queue-count");
      const queueTag = document.getElementById("queue-tag");
      const queueList = document.getElementById("queue-list");
      const queueEmpty = document.getElementById("queue-empty");
      const fullPanel = document.getElementById("full-panel");
      const compactPanel = document.getElementById("compact-panel");
      const compactLine = document.getElementById("compact-line");
      const compactTitle = document.getElementById("compact-title");
      const compactMeta = document.getElementById("compact-meta");

      if (mode === "compact") {
        body.classList.add("mode-compact");
        fullPanel.classList.add("hidden");
        compactPanel.classList.remove("hidden");
        overlayTitle.textContent = `Queue ${queueNumber} Now Playing`;
      } else {
        overlayTitle.textContent = `Queue ${queueNumber} Status`;
      }

      queueTag.textContent = `Queue ${queueNumber}`;

      function escapeHtml(value) {
        return String(value ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll("\"", "&quot;")
          .replaceAll("'", "&#39;");
      }

      function renderPill(text, className = "") {
        return `<span class="pill ${className}">${escapeHtml(text)}</span>`;
      }

      function renderState(state) {
        if (state?.designerTemplate && window.StreamSyncOverlayDesignerRuntime) {
          defaultOverlayShell.hidden = true;
          designerOverlayRoot.hidden = false;
          const firstItem = Array.isArray(state?.items) ? (state.items[0] || null) : null;
          window.StreamSyncOverlayDesignerRuntime.render(designerOverlayRoot, state.designerTemplate, {
            username: state?.username || "",
            viewerCount: String(state?.queueCount ?? 0),
            ttsNotification: firstItem ? { title: firstItem.label, message: firstItem.kind } : null,
            chatMessage: firstItem ? { username: state?.username || "", message: firstItem.label } : null,
            counters: { queue: Number(state?.queueCount ?? 0) }
          });
          return;
        }

        defaultOverlayShell.hidden = false;
        designerOverlayRoot.hidden = true;
        const connected = Boolean(state?.connected);
        const username = String(state?.username ?? "").trim();
        const items = Array.isArray(state?.items) ? state.items.filter((item) => Number(item?.queueId || 0) === queueNumber) : [];
        const runningItem = items.find((item) => item?.status === "running") || null;
        const nextItem = items.find((item) => item?.status === "queued") || null;

        liveUsername.textContent = connected && username ? `@${username}` : "No live connected";
        queueCount.textContent = String(items.length);
        overlayStatusText.textContent = connected ? "Live connected" : "Not connected";
        statusDot.classList.toggle("live", connected);

        if (mode === "compact") {
          const focusItem = runningItem || nextItem;
          compactLine.textContent = runningItem
            ? `Now playing on Queue ${queueNumber}`
            : nextItem
              ? `Up next on Queue ${queueNumber}`
              : `Queue ${queueNumber} is currently empty`;
          compactTitle.textContent = focusItem ? String(focusItem.label ?? "Queued action") : "Waiting for activity";
          compactMeta.innerHTML = focusItem
            ? [
                renderPill(focusItem.kind === "tts" ? "TTS" : "Action", focusItem.kind === "tts" ? "kind-tts" : "kind-action"),
                renderPill(focusItem.status === "running" ? "Playing" : "Queued", focusItem.status === "running" ? "status-running" : "")
              ].join("")
            : renderPill(connected ? "Connected" : "Idle");
          return;
        }

        if (!items.length) {
          queueList.innerHTML = "";
          queueEmpty.classList.remove("hidden");
          return;
        }

        queueEmpty.classList.add("hidden");
        queueList.innerHTML = items.map((item) => {
          const kind = item?.kind === "tts" ? "TTS" : "Action";
          const status = item?.status === "running" ? "Playing" : "Queued";
          return `
            <article class="queue-item ${item?.status === "running" ? "running" : ""}">
              <div class="queue-item-title">${escapeHtml(item?.label ?? "Queued action")}</div>
              <div class="queue-item-meta">
                ${renderPill(kind, item?.kind === "tts" ? "kind-tts" : "kind-action")}
                ${renderPill(status, item?.status === "running" ? "status-running" : "")}
                ${renderPill(`Queue ${queueNumber}`)}
              </div>
            </article>
          `;
        }).join("");
      }

      async function loadQueueState() {
        if (!overlayAccessQuery) {
          renderState({ connected: false, username: "", items: [] });
          overlayStatusText.textContent = "Missing overlay id";
          return;
        }

        try {
          const response = await fetch(`/api/overlay/queue-state?${overlayAccessQuery}`, {
            cache: "no-store"
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result?.error || "Overlay unavailable.");
          }
          renderState(result?.state ?? {});
        } catch (error) {
          renderState({ connected: false, username: "", items: [] });
          overlayStatusText.textContent = error?.message || "Overlay unavailable";
        }
      }

      loadQueueState();
      window.setInterval(loadQueueState, 1200);
    </script>
  </body>
</html>
