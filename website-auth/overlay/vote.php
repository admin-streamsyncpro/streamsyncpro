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
    <title>Stream Sync Pro Voting Overlay</title>
    <script src="./designer-runtime.js"></script>
    <style>
      :root {
        color-scheme: dark;
        --panel: rgba(7, 13, 24, 0.94);
        --line: rgba(84, 208, 255, 0.22);
        --text: #eef6ff;
        --muted: #9fb8d6;
        --accent: #53dcff;
        --accent-2: #b266ff;
        --success: #7cffc5;
      }

      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        min-height: 100%;
        background: transparent;
        font-family: "Segoe UI", system-ui, sans-serif;
        color: var(--text);
        text-shadow: none;
        font-synthesis: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: geometricPrecision;
      }

      body { padding: 18px; }

      .vote-card {
        width: min(1080px, 100%);
        display: none;
        position: relative;
        overflow: hidden;
        border-radius: 26px;
        background: linear-gradient(180deg, rgba(7, 15, 30, 0.97) 0%, rgba(7, 13, 24, 0.94) 100%);
        border: 1px solid rgba(84, 208, 255, 0.14);
        box-shadow:
          0 22px 60px rgba(0, 0, 0, 0.42),
          0 0 0 1px rgba(178, 102, 255, 0.08),
          0 0 34px rgba(83, 220, 255, 0.14);
        text-shadow: none;
      }

      .vote-card.visible { display: block; }

      .vote-card.horizontal-mode {
        width: min(1080px, 100%);
      }

      .vote-card::before {
        content: "";
        position: absolute;
        inset: 0;
        padding: 1px;
        border-radius: inherit;
        background: linear-gradient(90deg, rgba(83, 220, 255, 0.95), rgba(178, 102, 255, 0.88));
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }

      .vote-head {
        padding: 16px 20px 14px;
        border-bottom: 1px solid rgba(84, 208, 255, 0.1);
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

      .vote-title {
        margin: 8px 0 0;
        font-size: 28px;
        line-height: 1.1;
        font-weight: 800;
        letter-spacing: -0.04em;
        text-shadow: none;
      }

      .vote-body {
        padding: 18px 20px 20px;
        display: grid;
        gap: 16px;
      }

      .vote-card.horizontal-mode .vote-body {
        gap: 14px;
      }

      .vote-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }

      .meta-pill {
        display: inline-flex;
        align-items: center;
        padding: 9px 12px;
        border-radius: 999px;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--muted);
      }

      .meta-pill.timer { color: var(--accent); }
      .meta-pill.votes { color: var(--success); }
      .meta-pill.phase { color: var(--text); }

      .instructions {
        color: var(--muted);
        font-size: 15px;
        line-height: 1.5;
      }

      .options {
        display: grid;
        gap: 12px;
      }

      .options.horizontal {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: stretch;
      }

      .options.vertical {
        grid-template-columns: 1fr;
      }

      .option {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        background: linear-gradient(180deg, rgba(18, 29, 52, 0.94) 0%, rgba(15, 24, 42, 0.96) 100%);
        border: 1px solid rgba(84, 208, 255, 0.14);
        padding: 14px 15px;
        min-height: 94px;
      }

      .vote-card.horizontal-mode .option {
        min-height: 88px;
        padding: 12px 14px;
      }

      .option.active {
        border-color: rgba(83, 220, 255, 0.78);
        box-shadow: 0 0 0 1px rgba(83, 220, 255, 0.32), 0 0 22px rgba(83, 220, 255, 0.2);
      }

      .option.winner {
        border-color: rgba(124, 255, 197, 0.78);
        box-shadow: 0 0 0 1px rgba(124, 255, 197, 0.34), 0 0 26px rgba(124, 255, 197, 0.18);
      }

      .option-bar {
        position: absolute;
        inset: auto 0 0 0;
        height: 6px;
        background: linear-gradient(90deg, rgba(83, 220, 255, 0.92), rgba(178, 102, 255, 0.88));
        transform-origin: left center;
      }

      .option-head {
        display: flex;
        gap: 12px;
        justify-content: space-between;
        align-items: flex-start;
      }

      .vote-card.horizontal-mode .option-head {
        gap: 10px;
        align-items: center;
      }

      .option-index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: 999px;
        flex: 0 0 auto;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 14px;
        font-weight: 800;
      }

      .option-label {
        flex: 1 1 auto;
        font-size: 20px;
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.03em;
        text-shadow: none;
        word-break: break-word;
      }

      .vote-card.horizontal-mode .option-label {
        font-size: 18px;
        line-height: 1.1;
      }

      .option-score {
        flex: 0 0 auto;
        text-align: right;
      }

      .option-score.hidden {
        visibility: hidden;
      }

      .option-score strong {
        display: block;
        font-size: 20px;
        line-height: 1;
        text-shadow: none;
      }

      .option-score span {
        display: block;
        margin-top: 4px;
        font-size: 12px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .winner-banner {
        display: none;
        border-radius: 20px;
        padding: 16px 18px;
        background: linear-gradient(180deg, rgba(10, 36, 30, 0.96) 0%, rgba(9, 28, 23, 0.96) 100%);
        border: 1px solid rgba(124, 255, 197, 0.22);
      }

      .winner-banner.visible { display: block; }

      .winner-banner p {
        margin: 0;
      }

      .winner-banner .winner-eyebrow {
        color: var(--success);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 11px;
        font-weight: 700;
      }

      .winner-banner .winner-name {
        margin-top: 8px;
        font-size: 28px;
        font-weight: 900;
        letter-spacing: -0.04em;
        text-shadow: none;
      }

      @media (max-width: 1120px) {
        .vote-card.horizontal-mode {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div id="designer-overlay-root" hidden></div>
    <section id="vote-card" class="vote-card">
      <header class="vote-head">
        <p class="eyebrow">Live Voting</p>
        <p id="vote-title" class="vote-title">Vote</p>
      </header>
      <div class="vote-body">
        <div class="vote-meta">
          <span id="vote-phase" class="meta-pill phase">Open</span>
          <span id="vote-timer" class="meta-pill timer">0s left</span>
          <span id="vote-total" class="meta-pill votes">0 votes</span>
        </div>
        <div id="vote-instructions" class="instructions">Type !vote [number] in chat to vote.</div>
        <div id="vote-options" class="options horizontal"></div>
        <div id="winner-banner" class="winner-banner">
          <p class="winner-eyebrow">Winning Answer</p>
          <p id="winner-name" class="winner-name"></p>
        </div>
      </div>
    </section>

    <script>
      const overlayAccessQuery = <?php echo json_encode($overlayAccessQuery, JSON_UNESCAPED_SLASHES); ?>;
      const designerOverlayRoot = document.getElementById("designer-overlay-root");
      const voteCard = document.getElementById("vote-card");
      const voteTitle = document.getElementById("vote-title");
      const votePhase = document.getElementById("vote-phase");
      const voteTimer = document.getElementById("vote-timer");
      const voteTotal = document.getElementById("vote-total");
      const voteInstructions = document.getElementById("vote-instructions");
      const voteOptions = document.getElementById("vote-options");
      const winnerBanner = document.getElementById("winner-banner");
      const winnerName = document.getElementById("winner-name");

      let latestState = null;
      let lastDesignerRenderKey = "";

      function escapeHtml(value) {
        return String(value ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll("\"", "&quot;")
          .replaceAll("'", "&#39;");
      }

      function formatPhaseLabel(phase) {
        switch (String(phase || "").toLowerCase()) {
          case "open":
            return "Voting Open";
          case "spinning":
            return "Spinning";
          case "result":
            return "Winner Selected";
          default:
            return "Waiting";
        }
      }

      function getVoteSpinIndex(state) {
        const options = Array.isArray(state?.options) ? state.options : [];
        const phase = String(state?.phase ?? "idle");
        const winningIndex = Math.max(0, Number(state?.winningOptionIndex ?? 0));
        const spinEndsAt = state?.spinEndsAt ? new Date(state.spinEndsAt).getTime() : 0;
        const now = Date.now();
        if (phase !== "spinning" || options.length === 0) {
          return -1;
        }
        const steps = Math.max(0, Math.floor(now / 140));
        return now < spinEndsAt ? (steps % options.length) : winningIndex;
      }

      function getDesignerRenderKey(state) {
        const phase = String(state?.phase ?? "idle");
        const endAt = state?.countdownEndsAt ? new Date(state.countdownEndsAt).getTime() : 0;
        const secondsLeft = phase === "open" ? Math.max(0, Math.ceil((endAt - Date.now()) / 1000)) : -1;
        return JSON.stringify({
          templateId: String(state?.designerTemplate?.id ?? ""),
          active: Boolean(state?.active),
          phase,
          question: String(state?.question ?? ""),
          totalVotes: Math.max(0, Number(state?.totalVotes ?? 0)),
          winningOptionIndex: Math.max(0, Number(state?.winningOptionIndex ?? 0)),
          winningOptionLabel: String(state?.winningOptionLabel ?? ""),
          orientation: String(state?.orientation ?? ""),
          instructions: String(state?.instructions ?? ""),
          secondsLeft,
          activeSpinIndex: getVoteSpinIndex(state),
          options: Array.isArray(state?.options)
            ? state.options.map((option) => ({
                index: Number(option?.index ?? 0),
                label: String(option?.label ?? ""),
                votes: Math.max(0, Number(option?.votes ?? 0)),
                percent: Math.max(0, Math.min(100, Number(option?.percent ?? 0)))
              }))
            : []
        });
      }

      function renderOptions(state) {
        const options = Array.isArray(state?.options) ? state.options : [];
        const phase = String(state?.phase ?? "idle");
        const isVertical = String(state?.orientation ?? "").toLowerCase() === "vertical";
        const winningIndex = Math.max(0, Number(state?.winningOptionIndex ?? 0));
        const spinEndsAt = state?.spinEndsAt ? new Date(state.spinEndsAt).getTime() : 0;
        const now = Date.now();
        const revealResults = phase === "result";

        voteOptions.className = `options ${isVertical ? "vertical" : "horizontal"}`;
        voteOptions.style.gridTemplateColumns = isVertical
          ? "1fr"
          : `repeat(${Math.max(1, options.length)}, minmax(0, 1fr))`;

        let activeSpinIndex = -1;
        if (phase === "spinning" && options.length > 0) {
          const steps = Math.max(0, Math.floor((now / 140)));
          activeSpinIndex = now < spinEndsAt ? (steps % options.length) : winningIndex;
        }

        voteOptions.innerHTML = options.map((option, index) => {
          const isWinner = phase === "result" && index === winningIndex;
          const isActive = phase === "spinning" && index === activeSpinIndex;
          const votes = Math.max(0, Number(option?.votes ?? 0));
          const percent = Math.max(0, Math.min(100, Number(option?.percent ?? 0)));
          return `
            <article class="option${isActive ? " active" : ""}${isWinner ? " winner" : ""}">
              <div class="option-head">
                <span class="option-index">${escapeHtml(option?.index ?? index + 1)}</span>
                <div class="option-label">${escapeHtml(option?.label ?? `Option ${index + 1}`)}</div>
                <div class="option-score${revealResults ? "" : " hidden"}">
                  <strong>${revealResults ? votes : ""}</strong>
                  <span>${revealResults ? `${percent}%` : ""}</span>
                </div>
              </div>
              <div class="option-bar" style="transform: scaleX(${revealResults ? Math.max(0.06, percent / 100) : 0.08});"></div>
            </article>
          `;
        }).join("");
      }

      function renderTimer(state) {
        const phase = String(state?.phase ?? "idle");
        if (phase === "open") {
          const endAt = state?.countdownEndsAt ? new Date(state.countdownEndsAt).getTime() : 0;
          const secondsLeft = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
          voteTimer.textContent = `${secondsLeft}s left`;
          return;
        }

        if (phase === "spinning") {
          voteTimer.textContent = "Choosing winner...";
          return;
        }

        if (phase === "result") {
          voteTimer.textContent = "Vote complete";
          return;
        }

        voteTimer.textContent = "Waiting";
      }

      function renderState(state) {
        latestState = state && typeof state === "object" ? state : {};
        const active = Boolean(latestState?.active);
        const phase = String(latestState?.phase ?? "idle");
        const hasOptions = Array.isArray(latestState?.options) && latestState.options.length > 0;
        const shouldShow = active && hasOptions && phase !== "idle";
        if (latestState?.designerTemplate && window.StreamSyncOverlayDesignerRuntime) {
          voteCard.classList.remove("visible");
          voteCard.style.display = "none";
          if (!shouldShow) {
            designerOverlayRoot.hidden = true;
            designerOverlayRoot.innerHTML = "";
            lastDesignerRenderKey = "";
            return;
          }
          designerOverlayRoot.hidden = false;
          const renderKey = getDesignerRenderKey(latestState);
          if (renderKey !== lastDesignerRenderKey) {
            lastDesignerRenderKey = renderKey;
            window.StreamSyncOverlayDesignerRuntime.render(designerOverlayRoot, latestState.designerTemplate, {
              username: latestState?.username || "",
              activeVote: latestState,
              counters: { votes: Number(latestState?.totalVotes || 0) }
            });
          }
          return;
        }

        designerOverlayRoot.hidden = true;
        voteCard.style.display = "";
        lastDesignerRenderKey = "";
        const isVertical = String(latestState?.orientation ?? "").toLowerCase() === "vertical";

        voteCard.classList.toggle("visible", shouldShow);
        voteCard.classList.toggle("horizontal-mode", !isVertical);
        voteCard.classList.toggle("vertical-mode", isVertical);
        if (!shouldShow) {
          return;
        }

        voteTitle.textContent = String(latestState?.question ?? "").trim() || "Vote";
        votePhase.textContent = formatPhaseLabel(phase);
        voteTotal.textContent = phase === "result"
          ? `${Math.max(0, Number(latestState?.totalVotes ?? 0))} vote${Number(latestState?.totalVotes ?? 0) === 1 ? "" : "s"}`
          : "Votes hidden";
        voteInstructions.textContent = String(latestState?.instructions ?? "").trim() || "Type !vote [number] in chat to vote.";
        renderTimer(latestState);
        renderOptions(latestState);

        const winnerVisible = phase === "result" && String(latestState?.winningOptionLabel ?? "").trim();
        winnerBanner.classList.toggle("visible", Boolean(winnerVisible));
        winnerName.textContent = winnerVisible ? String(latestState.winningOptionLabel).trim() : "";
      }

      async function loadVoteState() {
        if (!overlayAccessQuery) {
          renderState({});
          return;
        }

        try {
          const response = await fetch(`/api/overlay/vote-state?${overlayAccessQuery}`, {
            cache: "no-store"
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result?.error || "Overlay unavailable.");
          }
          renderState(result?.state ?? {});
        } catch {
          renderState({});
        }
      }

      loadVoteState();
      window.setInterval(loadVoteState, 500);
      window.setInterval(() => {
        if (latestState) {
          renderState(latestState);
        }
      }, 120);
    </script>
  </body>
</html>
