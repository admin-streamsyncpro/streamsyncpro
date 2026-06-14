<?php
declare(strict_types=1);

$overlayId = trim((string) ($_GET['id'] ?? ''));
$overlayToken = trim((string) ($_GET['token'] ?? ''));
$selectedBarId = trim((string) ($_GET['bar'] ?? ($_GET['progress'] ?? '')));
$overlayAccessQuery = $overlayId !== ''
    ? 'id=' . rawurlencode($overlayId)
    : 'token=' . rawurlencode($overlayToken);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Stream Sync Pro Progress Bar Overlay</title>
    <style>
      :root {
        color-scheme: dark;
        --text: #f2fbff;
        --muted: #a7bfdd;
        --accent: #53dcff;
        --accent-2: #b266ff;
        --success: #6cffb6;
      }

      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        min-height: 100%;
        background: transparent;
        color: var(--text);
        font-family: "Segoe UI", system-ui, sans-serif;
      }

      body { padding: 24px; }

      .progress-shell {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        width: min(760px, 100%);
        padding: 18px 20px 20px;
        border-radius: 22px;
        font-family: var(--font-family, "Segoe UI", system-ui, sans-serif);
        background: radial-gradient(circle at 12% 0%, rgba(83, 220, 255, 0.22), transparent 32%), var(--background);
        border: 1px solid rgba(83, 220, 255, 0.24);
        box-shadow: 0 18px 54px rgba(0, 0, 0, 0.4), 0 0 28px rgba(83, 220, 255, 0.14);
        transition: opacity 180ms ease, transform 180ms ease;
      }

      .progress-shell.hidden {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
      }

      .progress-shell.no-background {
        overflow: visible;
        padding: 18px 20px 20px;
        border: 0;
        background: transparent;
        box-shadow: none;
      }

      .progress-head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 14px;
      }

      .progress-shell.text-below .progress-head {
        order: 2;
        margin: 14px 0 0;
      }

      .progress-shell.text-below .bar-track {
        order: 1;
      }

      .progress-shell.text-below .progress-foot {
        order: 3;
      }

      .progress-shell.text-inside .progress-head,
      .progress-shell.text-inside .progress-foot,
      .progress-shell.text-hidden .progress-head,
      .progress-shell.text-hidden .progress-foot {
        display: none;
      }

      .progress-shell.text-hidden .bar-label {
        display: none;
      }

      .eyebrow {
        margin: 0 0 6px;
        color: var(--muted);
        font-size: var(--eyebrow-size, 12px);
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .title {
        margin: 0;
        color: var(--title);
        font-size: min(var(--title-size, 44px), 11vw);
        line-height: 1;
        letter-spacing: -0.04em;
      }

      .metric-pill {
        flex: 0 0 auto;
        padding: 9px 13px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: var(--muted);
        font-size: var(--metric-size, 12px);
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .bar-track {
        position: relative;
        min-height: 34px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .bar-fill {
        position: absolute;
        inset: 0 auto 0 0;
        width: 0%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        box-shadow: 0 0 24px rgba(83, 220, 255, 0.28);
        transition: width 420ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      .bar-shine {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.24), transparent);
        transform: translateX(-100%);
        animation: shine 2.2s linear infinite;
      }

      .bar-label {
        position: relative;
        z-index: 1;
        min-height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 14px;
        font-size: var(--label-size, 15px);
        font-weight: 900;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.55);
        color: var(--text);
      }

      .progress-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-top: 12px;
        color: var(--muted);
        font-size: var(--footer-size, 13px);
        font-weight: 700;
      }

      .goal-reached { color: var(--success); }
      .bar-track.goal-anim-pulse { animation: goalPulse 1.4s ease-out; }
      .bar-track.goal-anim-flash { animation: goalFlash 1.1s ease-out; }
      .bar-track.goal-anim-bounce { animation: goalBounce 1.1s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
      .bar-track.goal-anim-confetti {
        overflow: visible;
        z-index: 2;
      }
      .bar-track.goal-anim-sparkle::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 3;
      }
      .bar-track.goal-anim-sparkle::before {
        background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.72) 42%, transparent 62%);
        transform: translateX(-120%);
        animation: sparkleSweep 1.2s ease-out;
      }
      .confetti-particle {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 4;
        width: var(--size, 7px);
        height: var(--height, var(--size, 7px));
        border-radius: var(--radius, 999px);
        background: var(--particle-color, #53dcff);
        box-shadow: 0 0 10px color-mix(in srgb, var(--particle-color, #53dcff) 65%, transparent);
        pointer-events: none;
        transform: translate(-50%, -50%) rotate(var(--start-rotate, 0deg));
        animation: confettiParticleBurst var(--duration, 1.35s) cubic-bezier(0.16, 0.9, 0.25, 1) forwards;
      }
      @keyframes shine { to { transform: translateX(100%); } }
      @keyframes goalPulse {
        0% { box-shadow: 0 0 0 rgba(83, 220, 255, 0); transform: scale(1); }
        38% { box-shadow: 0 0 42px var(--accent); transform: scale(1.025); }
        100% { box-shadow: 0 0 0 rgba(83, 220, 255, 0); transform: scale(1); }
      }
      @keyframes goalFlash {
        0%, 100% { filter: brightness(1); }
        20%, 56% { filter: brightness(1.75) saturate(1.4); }
        38%, 72% { filter: brightness(0.95); }
      }
      @keyframes goalBounce {
        0% { transform: translateY(0) scale(1); }
        35% { transform: translateY(-8px) scale(1.018); }
        68% { transform: translateY(3px) scale(0.992); }
        100% { transform: translateY(0) scale(1); }
      }
      @keyframes sparkleSweep { to { transform: translateX(120%); } }
      @keyframes confettiParticleBurst {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.45) rotate(var(--start-rotate, 0deg));
        }
        12% { opacity: 1; }
        72% { opacity: 1; }
        100% {
          opacity: 0;
          transform:
            translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px)))
            scale(1)
            rotate(var(--end-rotate, 360deg));
        }
      }
    </style>
  </head>
  <body>
    <section id="progress-shell" class="progress-shell hidden">
      <div class="progress-head">
        <div>
          <p id="progress-eyebrow" class="eyebrow">Live Goal</p>
          <h1 id="progress-title" class="title">Progress Goal</h1>
        </div>
        <div id="progress-metric" class="metric-pill">Likes</div>
      </div>
      <div class="bar-track">
        <div id="progress-fill" class="bar-fill"><span class="bar-shine"></span></div>
        <div id="progress-label" class="bar-label">0 / 100</div>
      </div>
      <div class="progress-foot">
        <span id="progress-percent">0%</span>
        <span id="progress-status">Waiting for live events</span>
      </div>
    </section>

    <script>
      const overlayAccessQuery = <?php echo json_encode($overlayAccessQuery, JSON_UNESCAPED_SLASHES); ?>;
      const selectedBarId = <?php echo json_encode($selectedBarId, JSON_UNESCAPED_SLASHES); ?>;
      const shell = document.getElementById("progress-shell");
      const eyebrow = document.getElementById("progress-eyebrow");
      const title = document.getElementById("progress-title");
      const metric = document.getElementById("progress-metric");
      const fill = document.getElementById("progress-fill");
      const track = document.querySelector(".bar-track");
      const label = document.getElementById("progress-label");
      const percent = document.getElementById("progress-percent");
      const statusText = document.getElementById("progress-status");
      let lastAnimationNonce = "";

      function formatNumber(value) {
        return Math.max(0, Math.round(Number(value) || 0)).toLocaleString("en-GB");
      }

      function formatMetric(value) {
        const metricKey = String(value || "likes");
        return metricKey === "coins" ? "Coins" : metricKey === "follows" ? "Follows" : metricKey === "shares" ? "Shares" : "Likes";
      }

      function normalizeHex(value, fallback) {
        const candidate = String(value || "").trim();
        return /^#[0-9a-fA-F]{6}$/.test(candidate) ? candidate : fallback;
      }

      function normalizeFontFamily(value) {
        const candidate = String(value || "").trim();
        const fonts = ["Segoe UI", "Arial", "Verdana", "Tahoma", "Trebuchet MS", "Georgia", "Impact", "Courier New", "Poppins", "Montserrat", "Oswald", "Bebas Neue"];
        return fonts.includes(candidate) ? candidate : "Segoe UI";
      }

      function clampNumber(value, min, max, fallback) {
        const numericValue = Number(value);
        return Number.isFinite(numericValue) ? Math.max(min, Math.min(max, numericValue)) : fallback;
      }

      function triggerGoalAnimation(bar) {
        const nonce = String(bar.goalAnimationNonce || "");
        const animation = String(bar.goalAnimation || "pulse");
        if (!nonce || nonce === lastAnimationNonce || animation === "none") {
          return;
        }
        lastAnimationNonce = nonce;
        track.classList.remove("goal-anim-pulse", "goal-anim-flash", "goal-anim-bounce", "goal-anim-sparkle", "goal-anim-confetti");
        track.querySelectorAll(".confetti-particle").forEach((particle) => particle.remove());
        void track.offsetWidth;
        track.classList.add(`goal-anim-${animation}`);
        if (animation === "confetti") {
          burstConfetti();
        }
        setTimeout(() => {
          track.classList.remove(`goal-anim-${animation}`);
        }, 1800);
      }

      function burstConfetti() {
        const colors = ["#fff176", "#53dcff", "#ff5ab3", "#6cffb6", "#ff9f43", "#b266ff"];
        const count = 42;
        for (let index = 0; index < count; index += 1) {
          const particle = document.createElement("span");
          const angle = (Math.PI * 2 * index) / count + (Math.random() - 0.5) * 0.7;
          const distance = 46 + Math.random() * 132;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance * 0.82;
          const size = 4 + Math.random() * 7;
          const isDot = Math.random() > 0.45;
          particle.className = "confetti-particle";
          particle.style.setProperty("--tx", `${tx.toFixed(1)}px`);
          particle.style.setProperty("--ty", `${ty.toFixed(1)}px`);
          particle.style.setProperty("--size", `${size.toFixed(1)}px`);
          particle.style.setProperty("--height", `${(isDot ? size : size * 0.62).toFixed(1)}px`);
          particle.style.setProperty("--radius", isDot ? "999px" : "2px");
          particle.style.setProperty("--start-rotate", `${Math.round(Math.random() * 180)}deg`);
          particle.style.setProperty("--end-rotate", `${Math.round(220 + Math.random() * 520)}deg`);
          particle.style.setProperty("--duration", `${(1.1 + Math.random() * 0.65).toFixed(2)}s`);
          particle.style.setProperty("--particle-color", colors[index % colors.length]);
          particle.style.animationDelay = `${Math.round(Math.random() * 90)}ms`;
          track.appendChild(particle);
        }
        setTimeout(() => {
          track.querySelectorAll(".confetti-particle").forEach((particle) => particle.remove());
        }, 2100);
      }

      function render(state) {
        const bars = Array.isArray(state?.bars) ? state.bars : [];
        const selectedBar = selectedBarId ? bars.find((item) => item.id === selectedBarId) : null;
        const bar = selectedBarId ? selectedBar : bars.find((item) => item.visible !== false);
        if (!bar) {
          shell.classList.add("hidden");
          return;
        }
        if (bar.visible === false) {
          shell.classList.add("hidden");
          return;
        }

        const value = Math.max(0, Number(bar.value) || 0);
        const goal = Math.max(1, Number(bar.goal) || 1);
        const progressPercent = Math.max(0, Math.min(100, (value / goal) * 100));
        shell.style.setProperty("--title", normalizeHex(bar.titleColor, "#f2fbff"));
        shell.style.setProperty("--text", normalizeHex(bar.textColor, "#f2fbff"));
        shell.style.setProperty("--muted", normalizeHex(bar.mutedColor, "#a7bfdd"));
        shell.style.setProperty("--accent", normalizeHex(bar.barStartColor, "#53dcff"));
        shell.style.setProperty("--accent-2", normalizeHex(bar.barEndColor, "#b266ff"));
        shell.style.setProperty("--background", normalizeHex(bar.backgroundColor, "#091226"));
        shell.style.setProperty("--font-family", `"${normalizeFontFamily(bar.fontFamily)}", "Segoe UI", system-ui, sans-serif`);
        shell.style.setProperty("--eyebrow-size", `${clampNumber(bar.eyebrowFontSize, 8, 72, 12)}px`);
        shell.style.setProperty("--title-size", `${clampNumber(bar.titleFontSize, 12, 140, 44)}px`);
        shell.style.setProperty("--metric-size", `${clampNumber(bar.metricFontSize, 8, 72, 12)}px`);
        shell.style.setProperty("--label-size", `${clampNumber(bar.labelFontSize, 8, 96, 15)}px`);
        shell.style.setProperty("--footer-size", `${clampNumber(bar.footerFontSize, 8, 72, 13)}px`);
        shell.classList.remove("hidden");
        shell.classList.toggle("no-background", Boolean(bar.hideBackground));
        shell.classList.toggle("text-below", bar.textPosition === "below" && !bar.hideText);
        shell.classList.toggle("text-inside", bar.textPosition === "inside" && !bar.hideText);
        shell.classList.toggle("text-hidden", Boolean(bar.hideText));
        eyebrow.textContent = bar.eyebrowText || "Live Goal";
        title.textContent = bar.title || "Progress Goal";
        metric.textContent = formatMetric(bar.metric);
        fill.style.width = `${progressPercent}%`;
        label.textContent = bar.textPosition === "inside" && !bar.hideText
          ? `${bar.title || "Progress Goal"} - ${formatNumber(value)} / ${formatNumber(goal)}`
          : `${formatNumber(value)} / ${formatNumber(goal)}`;
        percent.textContent = `${Math.round(progressPercent)}%`;
        statusText.textContent = progressPercent >= 100 ? "Goal reached" : `${formatNumber(goal - value)} to go`;
        statusText.classList.toggle("goal-reached", progressPercent >= 100);
        triggerGoalAnimation(bar);
      }

      async function refresh() {
        if (!overlayAccessQuery) {
          shell.classList.add("hidden");
          return;
        }
        try {
          const response = await fetch(`/api/overlay/progress-bar-state?${overlayAccessQuery}`, { cache: "no-store" });
          const payload = await response.json();
          if (!response.ok || !payload?.ok) {
            throw new Error(payload?.error || "Overlay unavailable");
          }
          render(payload.state || {});
        } catch {
          shell.classList.add("hidden");
        }
      }

      refresh();
      setInterval(refresh, 1000);
    </script>
  </body>
</html>
