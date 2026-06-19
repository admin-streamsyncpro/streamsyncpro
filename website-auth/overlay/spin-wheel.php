<?php
declare(strict_types=1);

$overlayId = trim((string) ($_GET['id'] ?? ''));
$overlayToken = trim((string) ($_GET['token'] ?? ''));
$overlayAccessQuery = $overlayId !== ''
    ? 'id=' . rawurlencode($overlayId)
    : 'token=' . rawurlencode($overlayToken);
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Stream Sync Pro Spin Wheel</title>
  <style>
    :root {
      --wheel-size: min(82vmin, 820px);
      --wheel-font-size: 24px;
      --wheel-result-font-size: 32px;
      --wheel-border-width: 18px;
      --wheel-inner-ring-width: 8px;
      --wheel-outer-ring-width: 24px;
      --wheel-outer-glow-width: 34px;
      --wheel-center-size: 118px;
      --wheel-center-border-width: 7px;
      --wheel-center-initials-size: 42px;
      --wheel-center-name-size: 20px;
      --wheel-center-name-offset: 74px;
      --gold-1: #fff1a8;
      --gold-2: #ffc83d;
      --gold-3: #b5521e;
      font-family: "Arial Rounded MT Bold", "Segoe UI", sans-serif;
    }

    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: transparent;
    }

    body {
      display: grid;
      place-items: center;
    }

    .wheel-stage {
      position: relative;
      width: var(--wheel-size);
      height: var(--wheel-size);
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 240ms ease, transform 240ms ease;
      filter:
        drop-shadow(0 34px 46px rgba(0, 0, 0, 0.46))
        drop-shadow(0 0 26px rgba(104, 216, 255, 0.16));
    }

    .wheel-stage.visible {
      opacity: 1;
      transform: scale(1);
    }

    .wheel {
      position: absolute;
      inset: 6%;
      border-radius: 50%;
      overflow: hidden;
      border: var(--wheel-border-width) solid rgba(255, 210, 72, 0.95);
      background:
        radial-gradient(circle at 38% 28%, rgba(255, 255, 255, 0.52), transparent 18%),
        radial-gradient(circle at 50% 58%, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.34) 82%),
        linear-gradient(135deg, #ffe87a 0%, #f6a91f 32%, #b75016 70%, #ffe27a 100%);
      box-shadow:
        inset 0 14px 26px rgba(255, 255, 255, 0.36),
        inset 0 -28px 34px rgba(96, 34, 0, 0.34),
        inset 0 0 0 var(--wheel-inner-ring-width) rgba(255, 255, 255, 0.2),
        0 0 0 var(--wheel-outer-ring-width) rgba(239, 159, 30, 0.9),
        0 0 0 var(--wheel-outer-glow-width) rgba(255, 221, 94, 0.78),
        0 24px 42px rgba(80, 28, 0, 0.46);
      transition: transform 5s cubic-bezier(0.11, 0.78, 0.16, 1);
    }

    .wheel-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }

    .wheel-segment {
      stroke: rgba(255, 255, 255, 0.2);
      stroke-width: 0.34;
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
    }

    .wheel::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background:
        radial-gradient(ellipse at 32% 20%, rgba(255, 255, 255, 0.58), transparent 22%),
        radial-gradient(circle at 50% 50%, transparent 0 36%, rgba(255, 255, 255, 0.12) 44%, transparent 50%),
        radial-gradient(circle at 50% 54%, transparent 0 18%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0.44) 100%);
      mix-blend-mode: screen;
      pointer-events: none;
    }

    .wheel::after {
      content: "";
      position: absolute;
      inset: 3%;
      border-radius: inherit;
      background:
        conic-gradient(from -20deg, rgba(255, 255, 255, 0.18), transparent 12%, rgba(0, 0, 0, 0.14) 25%, transparent 38%, rgba(255, 255, 255, 0.14) 52%, transparent 72%, rgba(0, 0, 0, 0.2) 88%, rgba(255, 255, 255, 0.18)),
        radial-gradient(circle at 50% 50%, transparent 0 58%, rgba(255, 255, 255, 0.22) 63%, rgba(0, 0, 0, 0.28) 100%);
      opacity: 0.84;
      pointer-events: none;
    }

    .segment-label {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 32%;
      transform-origin: 0 50%;
      color: #ffffff;
      font-size: var(--wheel-font-size);
      font-weight: 950;
      line-height: 1.05;
      letter-spacing: 0.02em;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.65);
      white-space: normal;
      overflow: hidden;
      overflow-wrap: anywhere;
      word-break: break-word;
      text-align: center;
      padding-right: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      max-height: 2.25em;
      box-sizing: border-box;
    }

    .bulbs {
      position: absolute;
      inset: 1.2%;
      border-radius: 50%;
      pointer-events: none;
    }

    .bulb {
      position: absolute;
      left: 50%;
      top: 50%;
      width: clamp(14px, 3vmin, 32px);
      height: clamp(14px, 3vmin, 32px);
      margin: clamp(-16px, -1.5vmin, -7px);
      border-radius: 50%;
      background: radial-gradient(circle, #fff9ad 0 30%, #fff066 45%, #ffb928 72%);
      box-shadow: 0 0 18px #ffe869, 0 0 34px rgba(255, 226, 82, 0.55);
      transform: rotate(var(--angle)) translate(calc(var(--wheel-size) * 0.48)) rotate(calc(var(--angle) * -1));
      animation: bulbPulse 900ms ease-in-out infinite alternate;
      animation-delay: var(--delay);
    }

    .pointer {
      position: absolute;
      width: 17%;
      height: 11%;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.72), transparent 42%),
        linear-gradient(90deg, #b9570c, #fff0a3 32%, #fff9d5 54%, #f5b42d 76%, #b9560b);
      filter:
        drop-shadow(0 8px 10px rgba(0, 0, 0, 0.42))
        drop-shadow(0 0 12px rgba(255, 225, 82, 0.42));
      z-index: 9;
    }

    .pointer.right {
      top: 50%;
      right: -1%;
      width: 17%;
      height: 11%;
      transform: translateY(-50%);
      clip-path: polygon(0 50%, 100% 0, 88% 50%, 100% 100%);
    }

    .pointer.left {
      top: 50%;
      left: -1%;
      width: 17%;
      height: 11%;
      transform: translateY(-50%);
      clip-path: polygon(100% 50%, 0 0, 12% 50%, 0 100%);
    }

    .pointer.top {
      top: -1%;
      left: 50%;
      width: 11%;
      height: 17%;
      transform: translateX(-50%);
      clip-path: polygon(50% 100%, 0 0, 50% 12%, 100% 0);
    }

    .pointer.bottom {
      bottom: -1%;
      left: 50%;
      width: 11%;
      height: 17%;
      transform: translateX(-50%);
      clip-path: polygon(50% 0, 0 100%, 50% 88%, 100% 100%);
    }

    .hub {
      position: absolute;
      inset: auto;
      top: 50%;
      left: 50%;
      width: var(--wheel-center-size);
      height: var(--wheel-center-size);
      transform: translate(-50%, -50%);
      z-index: 5;
      display: grid;
      place-items: center;
      border-radius: 50%;
      border: var(--wheel-center-border-width) solid #f3b53b;
      background:
        radial-gradient(circle at 34% 26%, #ffffff 0 18%, transparent 28%),
        radial-gradient(circle, #ffffff 0 42%, #fff2b5 53%, #d98612 100%);
      color: #e6a312;
      box-shadow:
        inset 0 8px 16px rgba(255, 255, 255, 0.5),
        inset 0 -12px 18px rgba(104, 54, 0, 0.28),
        0 0 20px rgba(0, 0, 0, 0.3),
        0 0 0 8px rgba(255, 207, 72, 0.22);
      overflow: hidden;
    }

    .hub-avatar {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      color: #e6a312;
      font-size: var(--wheel-center-initials-size);
      font-weight: 950;
      background:
        radial-gradient(circle at 36% 24%, rgba(255,255,255,0.98), rgba(255,242,181,0.98) 46%, rgba(232, 161, 29, 0.92));
    }

    .hub-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .trigger-name {
      position: absolute;
      left: 50%;
      top: calc(50% + var(--wheel-center-name-offset));
      z-index: 7;
      max-width: 70%;
      transform: translateX(-50%);
      padding: 7px 14px;
      border-radius: 999px;
      border: 2px solid rgba(255, 226, 88, 0.72);
      background: rgba(8, 13, 31, 0.78);
      color: #fff7cf;
      font-size: var(--wheel-center-name-size);
      font-weight: 950;
      text-align: center;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.55);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 0;
      transition: opacity 220ms ease, transform 220ms ease;
      pointer-events: none;
    }

    .trigger-name.visible {
      opacity: 1;
      transform: translateX(-50%) translateY(10px);
    }

    .result-card {
      position: absolute;
      left: 50%;
      bottom: -4%;
      z-index: 8;
      min-width: 46%;
      transform: translateX(-50%) translateY(12px);
      opacity: 0;
      padding: 14px 22px;
      border-radius: 999px;
      border: 2px solid rgba(255, 232, 117, 0.76);
      background: rgba(8, 13, 31, 0.78);
      color: #fff7cf;
      text-align: center;
      font-size: var(--wheel-result-font-size);
      font-weight: 950;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.55);
      transition: opacity 240ms ease, transform 240ms ease;
    }

    .result-card.visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    @keyframes bulbPulse {
      from { opacity: 0.74; transform: rotate(var(--angle)) translate(calc(var(--wheel-size) * 0.48)) rotate(calc(var(--angle) * -1)) scale(0.86); }
      to { opacity: 1; transform: rotate(var(--angle)) translate(calc(var(--wheel-size) * 0.48)) rotate(calc(var(--angle) * -1)) scale(1.08); }
    }
  </style>
</head>
<body>
  <main id="stage" class="wheel-stage" aria-live="polite">
    <div id="wheel" class="wheel"></div>
    <div id="bulbs" class="bulbs"></div>
    <div id="pointer" class="pointer right"></div>
    <div id="hub" class="hub">
      <div id="hubAvatar" class="hub-avatar">&#9733;</div>
    </div>
    <div id="triggerName" class="trigger-name"></div>
    <div id="result" class="result-card"></div>
  </main>

  <script>
    const overlayAccessQuery = <?php echo json_encode($overlayAccessQuery, JSON_UNESCAPED_SLASHES); ?>;
    const stage = document.getElementById("stage");
    const wheel = document.getElementById("wheel");
    const bulbs = document.getElementById("bulbs");
    const result = document.getElementById("result");
    const pointer = document.getElementById("pointer");
    const hubAvatar = document.getElementById("hubAvatar");
    const triggerName = document.getElementById("triggerName");
    let lastSpinId = "";
    let currentRotation = 0;
    let resultRevealTimer = null;
    const POINTER_ANGLES = {
      right: 0,
      bottom: 90,
      left: 180,
      top: 270
    };

    function normalizeAngle(angle) {
      return ((Number(angle) % 360) + 360) % 360;
    }

    function sanitizeArrowPosition(value) {
      const normalized = String(value || "right").trim().toLowerCase();
      return Object.prototype.hasOwnProperty.call(POINTER_ANGLES, normalized) ? normalized : "right";
    }

    function getPointerAngle(position) {
      return POINTER_ANGLES[sanitizeArrowPosition(position)];
    }

    function applyPointerPosition(position) {
      const normalized = sanitizeArrowPosition(position);
      pointer.className = `pointer ${normalized}`;
      return normalized;
    }

    function getInitials(name = "") {
      const cleaned = String(name || "").replace(/^@/, "").trim();
      if (!cleaned) {
        return "â˜…";
      }
      const parts = cleaned.split(/\s+/).filter(Boolean);
      if (parts.length > 1) {
        return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
      }
      return cleaned.slice(0, 2).toUpperCase();
    }

    function applyTriggerUser(triggerUser = null) {
      const username = String(triggerUser?.username || "").replace(/^@/, "").trim();
      const displayName = String(triggerUser?.displayName || username || "").trim();
      const profilePictureUrl = String(triggerUser?.profilePictureUrl || "").trim();
      const label = displayName || username;

      if (profilePictureUrl) {
        hubAvatar.innerHTML = `<img src="${profilePictureUrl.replaceAll('"', "%22")}" alt="" />`;
      } else {
        hubAvatar.textContent = getInitials(label);
      }

      triggerName.textContent = label ? `@${username || label}` : "";
      triggerName.classList.toggle("visible", Boolean(label));
    }

    function getSegmentIndexAtPointer(rotation, segmentCount, arrowPosition = "right") {
      if (!segmentCount) {
        return 0;
      }
      const slice = 360 / segmentCount;
      const wheelAngleAtPointer = normalizeAngle(getPointerAngle(arrowPosition) - normalizeAngle(rotation));
      return Math.max(0, Math.min(segmentCount - 1, Math.round(wheelAngleAtPointer / slice) % segmentCount));
    }

    function polarToPoint(angleDeg, radius = 50) {
      const angleRad = angleDeg * Math.PI / 180;
      return {
        x: 50 + radius * Math.cos(angleRad),
        y: 50 + radius * Math.sin(angleRad)
      };
    }

    function buildSegmentPath(startAngle, endAngle) {
      const start = polarToPoint(startAngle, 50);
      const end = polarToPoint(endAngle, 50);
      const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
      return `M 50 50 L ${start.x.toFixed(3)} ${start.y.toFixed(3)} A 50 50 0 ${largeArc} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)} Z`;
    }

    function sanitizeSegments(rawSegments) {
      const fallback = [
        { label: "Action 1", color: "#11b76a" },
        { label: "Action 2", color: "#9bd400" },
        { label: "Action 3", color: "#ffd027" },
        { label: "Action 4", color: "#1598e8" },
        { label: "Action 5", color: "#7a35b4" },
        { label: "Action 6", color: "#d61e11" }
      ];
      const source = Array.isArray(rawSegments) && rawSegments.length ? rawSegments : fallback;
      return source.slice(0, 16).map((segment, index) => ({
        label: String(segment?.label || `Action ${index + 1}`).trim(),
        color: /^#[0-9a-fA-F]{6}$/.test(String(segment?.color || "")) ? segment.color : fallback[index % fallback.length].color
      }));
    }

    function hexToRgb(hex) {
      const value = String(hex || "#ffffff").replace("#", "");
      return {
        r: parseInt(value.slice(0, 2), 16),
        g: parseInt(value.slice(2, 4), 16),
        b: parseInt(value.slice(4, 6), 16)
      };
    }

    function rgbToHex({ r, g, b }) {
      return `#${[r, g, b].map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, "0")).join("")}`;
    }

    function mixHex(hex, mixWith, amount) {
      const base = hexToRgb(hex);
      const target = hexToRgb(mixWith);
      return rgbToHex({
        r: base.r + ((target.r - base.r) * amount),
        g: base.g + ((target.g - base.g) * amount),
        b: base.b + ((target.b - base.b) * amount)
      });
    }

    function renderWheel(segments) {
      const slice = 360 / segments.length;
      const halfSlice = slice / 2;
      wheel.querySelectorAll(".wheel-svg").forEach((node) => node.remove());
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "wheel-svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.setAttribute("aria-hidden", "true");
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      segments.forEach((segment, index) => {
        const gradientId = `segmentGradient-${index}`;
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
        gradient.setAttribute("id", gradientId);
        gradient.setAttribute("cx", "34%");
        gradient.setAttribute("cy", "24%");
        gradient.setAttribute("r", "86%");
        [
          ["0%", mixHex(segment.color, "#ffffff", 0.58)],
          ["34%", mixHex(segment.color, "#ffffff", 0.14)],
          ["70%", segment.color],
          ["100%", mixHex(segment.color, "#000000", 0.46)]
        ].forEach(([offset, color]) => {
          const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
          stop.setAttribute("offset", offset);
          stop.setAttribute("stop-color", color);
          gradient.appendChild(stop);
        });
        defs.appendChild(gradient);
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("class", "wheel-segment");
        path.setAttribute("fill", `url(#${gradientId})`);
        path.setAttribute("d", buildSegmentPath((index * slice) - halfSlice, (index * slice) + halfSlice));
        svg.appendChild(path);
      });
      svg.prepend(defs);
      wheel.prepend(svg);
      wheel.querySelectorAll(".segment-label").forEach((node) => node.remove());
      segments.forEach((segment, index) => {
        const label = document.createElement("div");
        label.className = "segment-label";
        label.textContent = segment.label;
        label.title = segment.label;
        label.style.transform = `rotate(${index * slice}deg) translate(36%, -50%)`;
        wheel.appendChild(label);
      });
      bulbs.innerHTML = "";
      Array.from({ length: 16 }).forEach((_, index) => {
        const bulb = document.createElement("span");
        bulb.className = "bulb";
        bulb.style.setProperty("--angle", `${index * 22.5}deg`);
        bulb.style.setProperty("--delay", `${index * 35}ms`);
        bulbs.appendChild(bulb);
      });
    }

    function applyState(state) {
      const fontSize = Math.max(14, Math.min(48, Number(state?.fontSize) || 24));
      const borderThickness = Math.max(1, Math.min(10, Number(state?.borderThickness) || 4));
      const centerSize = Math.max(72, Math.min(240, Number(state?.centerSize) || 118));
      const centerNameSize = Math.max(12, Math.min(40, Number(state?.centerNameSize) || 20));
      const borderWidth = 6 + (borderThickness * 3);
      document.documentElement.style.setProperty("--wheel-font-size", `${fontSize}px`);
      document.documentElement.style.setProperty("--wheel-result-font-size", `${Math.min(58, fontSize + 8)}px`);
      document.documentElement.style.setProperty("--wheel-border-width", `${borderWidth}px`);
      document.documentElement.style.setProperty("--wheel-inner-ring-width", `${Math.max(2, borderWidth * 0.38)}px`);
      document.documentElement.style.setProperty("--wheel-outer-ring-width", `${Math.max(4, borderWidth * 1.25)}px`);
      document.documentElement.style.setProperty("--wheel-outer-glow-width", `${Math.max(6, borderWidth * 1.7)}px`);
      document.documentElement.style.setProperty("--wheel-center-size", `${centerSize}px`);
      document.documentElement.style.setProperty("--wheel-center-border-width", `${Math.max(4, Math.min(12, centerSize * 0.06))}px`);
      document.documentElement.style.setProperty("--wheel-center-initials-size", `${Math.max(22, Math.min(76, centerSize * 0.35))}px`);
      document.documentElement.style.setProperty("--wheel-center-name-size", `${centerNameSize}px`);
      document.documentElement.style.setProperty("--wheel-center-name-offset", `${Math.max(46, centerSize * 0.52 + 12)}px`);
      const segments = sanitizeSegments(state?.segments);
      const arrowPosition = applyPointerPosition(state?.arrowPosition);
      applyTriggerUser(state?.triggerUser);
      renderWheel(segments);
      const visible = Boolean(state?.visible) || ["spinning", "result"].includes(String(state?.phase || ""));
      stage.classList.toggle("visible", visible);
      const selectedIndex = Math.max(0, Math.min(segments.length - 1, Number(state?.selectedIndex) || 0));

      if (state?.spinId && state.spinId !== lastSpinId) {
        lastSpinId = state.spinId;
        if (resultRevealTimer) {
          window.clearTimeout(resultRevealTimer);
          resultRevealTimer = null;
        }
        result.classList.remove("visible");
        const slice = 360 / segments.length;
        const targetAtPointer = selectedIndex * slice;
        const desiredRotation = normalizeAngle(getPointerAngle(arrowPosition) - targetAtPointer);
        const currentRotationMod = normalizeAngle(currentRotation);
        const rotationDelta = normalizeAngle(desiredRotation - currentRotationMod);
        const durationMs = Math.max(1000, Number(state?.durationMs) || 5200);
        wheel.style.transitionDuration = `${durationMs}ms`;
        currentRotation += (360 * 6) + rotationDelta;
        wheel.style.transform = `rotate(${currentRotation}deg)`;
        resultRevealTimer = window.setTimeout(() => {
          const landedIndex = getSegmentIndexAtPointer(currentRotation, segments.length, arrowPosition);
          result.textContent = segments[landedIndex]?.label || segments[selectedIndex]?.label || "Winner";
          result.classList.add("visible");
          resultRevealTimer = null;
        }, durationMs + 80);
      } else if (state?.phase === "result") {
        const landedIndex = getSegmentIndexAtPointer(currentRotation, segments.length, arrowPosition);
        result.textContent = segments[landedIndex]?.label || segments[selectedIndex]?.label || "Winner";
        result.classList.add("visible");
      } else if (!visible) {
        if (resultRevealTimer) {
          window.clearTimeout(resultRevealTimer);
          resultRevealTimer = null;
        }
        result.classList.remove("visible");
        triggerName.classList.remove("visible");
      }
    }

    async function poll() {
      try {
        if (!overlayAccessQuery) { stage.classList.remove("visible"); return; }
        const response = await fetch(`/api/overlay/spin-wheel-state?${overlayAccessQuery}`, { cache: "no-store" });
        const payload = await response.json();
        applyState(payload.state || {});
      } catch {
        stage.classList.remove("visible");
      }
    }

    poll();
    window.setInterval(poll, 350);
  </script>
</body>
</html>

