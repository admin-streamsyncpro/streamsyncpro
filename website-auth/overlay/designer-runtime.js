(function () {
  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function hexToRgba(hex, opacity) {
    const normalized = String(hex || "").trim();
    if (!/^#[0-9a-fA-F]{6}$/.test(normalized)) {
      return `rgba(0,0,0,${opacity})`;
    }
    const r = parseInt(normalized.slice(1, 3), 16);
    const g = parseInt(normalized.slice(3, 5), 16);
    const b = parseInt(normalized.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, Number(opacity) || 0))})`;
  }

  function renderText(template, runtime) {
    const chat = runtime?.chatMessage || {};
    const alert = runtime?.alert || {};
    const counters = runtime?.counters || {};
    const vote = runtime?.activeVote || {};
    return String(template || "")
      .replace(/\{username\}/gi, runtime?.username || chat.username || alert.username || "viewer")
      .replace(/\{message\}/gi, chat.message || "Waiting for chat")
      .replace(/\{giftsent\}/gi, alert.giftSent || "gift")
      .replace(/\{gift sent\}/gi, alert.giftSent || "gift")
      .replace(/\{likes\}/gi, String(counters.likes ?? 0))
      .replace(/\{comments\}/gi, String(counters.comments ?? 0))
      .replace(/\{follows\}/gi, String(counters.follows ?? 0))
      .replace(/\{gifts\}/gi, String(counters.gifts ?? 0))
      .replace(/\{shares\}/gi, String(counters.shares ?? 0))
      .replace(/\{coins\}/gi, String(counters.coins ?? 0))
      .replace(/\{viewercount\}/gi, runtime?.viewerCount || "--")
      .replace(/\{viewer count\}/gi, runtime?.viewerCount || "--");
  }

  function getVotePhaseLabel(phase) {
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

  function getVoteTimerLabel(vote, phase) {
    if (phase === "open") {
      const endAt = vote?.countdownEndsAt ? new Date(vote.countdownEndsAt).getTime() : 0;
      const secondsLeft = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      return `${secondsLeft}s left`;
    }
    if (phase === "spinning") {
      return "Choosing winner...";
    }
    if (phase === "result") {
      return "Vote complete";
    }
    return "Waiting";
  }

  function buildVoteMarkup(runtime, element) {
    const vote = runtime?.activeVote || {};
    const active = Boolean(vote?.active);
    const options = Array.isArray(vote.options) ? vote.options : [];
    const phase = String(vote.phase || "idle");
    const winningIndex = Math.max(0, Number(vote?.winningOptionIndex ?? 0));
    const winnerLabel = String(vote?.winningOptionLabel ?? "").trim();
    const spinEndsAt = vote?.spinEndsAt ? new Date(vote.spinEndsAt).getTime() : 0;
    const now = Date.now();
    let activeSpinIndex = -1;
    if (phase === "spinning" && options.length > 0) {
      const steps = Math.max(0, Math.floor(now / 140));
      activeSpinIndex = now < spinEndsAt ? (steps % options.length) : winningIndex;
    }

    if (!active || !options.length || phase === "idle") {
      return "";
    }

    const widgetStyle = String(element?.widgetStyle || "defaultOverlay");
    const accent = escapeHtml(element?.glowColor || "#53dcff");
    const accent2 = escapeHtml(element?.borderColor || "#8b5cf6");
    const muted = escapeHtml(element?.mutedTextColor || "#9fb8d6");
    const success = escapeHtml(element?.successColor || "#7cffc5");
    const totalVotes = Math.max(0, Number(vote?.totalVotes ?? options.reduce((sum, option) => sum + Math.max(0, Number(option?.votes ?? 0)), 0)));
    const surface = escapeHtml(hexToRgba(element?.backgroundColor || "#071326", element?.backgroundOpacity ?? 0.94));
    const surfaceSoft = escapeHtml(hexToRgba(element?.backgroundColor || "#071326", Math.max(0.26, Math.min(0.92, Number(element?.backgroundOpacity ?? 0.94) - 0.24))));
    const borderSoft = escapeHtml(hexToRgba(element?.borderColor || "#54d0ff", 0.28));
    const useAutoWidth = Boolean(runtime?.widgetAutoWidth);
    const useAutoHeight = Boolean(runtime?.widgetAutoHeight);
    const isVertical = String(vote?.orientation ?? "").toLowerCase() === "vertical";
    const optionGridColumns = isVertical
      ? "1fr"
      : useAutoWidth
        ? `repeat(${Math.max(1, options.length)}, minmax(220px, max-content))`
        : `repeat(${Math.max(1, options.length)}, minmax(0,1fr))`;

    const optionMarkup = options.length ? options.map((option) => {
      const optionIndex = Math.max(0, Number(option?.index ?? 0) - 1);
      const isWinner = phase === "result" && optionIndex === winningIndex;
      const isActive = phase === "spinning" && optionIndex === activeSpinIndex;
      const percent = Math.max(0, Math.min(100, Number(option?.percent ?? 0)));
      const votes = Math.max(0, Number(option?.votes ?? 0));
      if (widgetStyle === "defaultOverlay") {
        return `
          <div style="position:relative;display:flex;flex-direction:column;gap:10px;padding:14px 14px 18px;border-radius:20px;background:${surfaceSoft};border:1px solid rgba(255,255,255,0.05);box-shadow:${isWinner ? `0 0 0 1px ${success}, 0 0 16px rgba(124,255,197,0.16)` : isActive ? `0 0 0 1px ${accent}, 0 0 18px rgba(83,220,255,0.18)` : "none"};${isWinner ? "animation:overlayDesignerWinnerReveal 520ms ease both;" : isActive ? "animation:overlayDesignerSpinPulse 180ms linear both;" : ""};min-width:${useAutoWidth ? "220px" : "0"};">
            <div style="display:flex;gap:10px;align-items:flex-start;justify-content:space-between;min-width:0;">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:999px;flex:0 0 auto;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);font-size:14px;font-weight:800;">${option.index}</span>
              <span style="font:inherit;font-weight:800;line-height:1.12;font-size:0.8em;flex:1 1 auto;min-width:0;white-space:normal;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(option.label)}</span>
              <span style="opacity:${phase === "result" ? "1" : "0"};color:${muted};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;flex:0 0 auto;">${phase === "result" ? `${votes} · ${percent}%` : ""}</span>
            </div>
            <div style="position:absolute;left:0;right:0;bottom:0;height:6px;background:linear-gradient(90deg, ${accent}, ${accent2});transform-origin:left center;transform:scaleX(${phase === "result" ? Math.max(0.06, percent / 100) : 0.08});"></div>
          </div>
        `;
      }
      return `
        <div style="display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-radius:14px;background:${isWinner ? "linear-gradient(135deg, var(--overlay-surface-soft, rgba(255,255,255,0.08)), rgba(87, 255, 197, 0.18))" : "var(--overlay-surface-soft, rgba(255,255,255,0.08))"};box-shadow:${isWinner ? "0 0 0 1px rgba(124,255,197,0.32), 0 0 16px rgba(124,255,197,0.14)" : isActive ? "0 0 0 1px rgba(83,220,255,0.34), 0 0 18px rgba(83,220,255,0.18)" : "none"};color:inherit;${isWinner ? "animation:overlayDesignerWinnerReveal 520ms ease both;" : isActive ? "animation:overlayDesignerSpinPulse 180ms linear both;" : ""}">
          <span style="color:inherit;font:inherit;flex:1 1 auto;min-width:0;white-space:normal;word-break:break-word;overflow-wrap:anywhere;">${option.index}. ${escapeHtml(option.label)}</span>
          <span style="color:inherit;font:inherit;flex:0 0 auto;text-align:right;${phase === "result" ? "" : "opacity:0;"}">${phase === "result" ? `${percent}%` : ""}</span>
        </div>
      `;
    }).join("") : "";

    if (widgetStyle === "defaultOverlay") {
      return `
        <div style="display:flex;flex-direction:column;gap:0;width:${useAutoWidth ? "max-content" : "100%"};height:${useAutoHeight ? "max-content" : "100%"};justify-content:flex-start;text-align:left;color:inherit;font:inherit;min-width:0;max-width:${useAutoWidth ? "none" : "100%"};background:${surface};border:1px solid ${borderSoft};border-radius:${Math.max(16, Number(element?.borderRadius) || 26)}px;box-shadow:0 0 ${Math.max(12, (Number(element?.blur) || 14) * 2)}px ${hexToRgba(element?.glowColor || "#53dcff", 0.18)};overflow:hidden;">
          <div style="display:flex;flex-direction:column;gap:18px;padding:22px 22px 18px;">
            <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;color:${accent2};">Live Voting</div>
            <strong style="font:inherit;font-weight:800;color:inherit;line-height:1.08;">${escapeHtml(vote.question || "Vote")}</strong>
          </div>
          <div style="height:1px;background:${borderSoft};"></div>
          <div style="display:flex;flex-direction:column;gap:16px;padding:18px 22px 22px;">
            <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
              <span style="display:inline-flex;align-items:center;padding:9px 12px;border-radius:999px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:inherit;">${escapeHtml(getVotePhaseLabel(phase))}</span>
              <span style="display:inline-flex;align-items:center;padding:9px 12px;border-radius:999px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:${accent};">${escapeHtml(getVoteTimerLabel(vote, phase))}</span>
              <span style="display:inline-flex;align-items:center;padding:9px 12px;border-radius:999px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:${phase === "result" ? success : muted};">${phase === "result" ? `${totalVotes} vote${totalVotes === 1 ? "" : "s"}` : "Votes hidden"}</span>
            </div>
            <div style="color:${muted};font:inherit;font-size:15px;line-height:1.45;">${escapeHtml(vote.instructions || "Type !vote [number] in chat to vote.")}</div>
            <div style="display:grid;gap:12px;grid-template-columns:${optionGridColumns};width:${useAutoWidth ? "max-content" : "100%"};max-width:${useAutoWidth ? "none" : "100%"};">${optionMarkup}</div>
            ${phase === "result" && winnerLabel
              ? `<div style="padding:16px 18px;border-radius:20px;background:linear-gradient(180deg, rgba(10,36,30,0.96) 0%, rgba(9,28,23,0.96) 100%);box-shadow:0 0 0 1px rgba(124,255,197,0.22);color:inherit;animation:overlayDesignerWinnerReveal 620ms ease both;"><div style="color:${success};text-transform:uppercase;letter-spacing:0.12em;font-size:11px;font-weight:700;">Winning Answer</div><strong style="display:block;margin-top:8px;font:inherit;font-weight:800;color:inherit;font-size:1.28em;line-height:1.08;">${escapeHtml(winnerLabel)}</strong></div>`
              : ""}
          </div>
        </div>
      `;
    }

    return `
      <div style="display:flex;flex-direction:column;gap:10px;width:${useAutoWidth ? "max-content" : "100%"};height:${useAutoHeight ? "max-content" : "100%"};justify-content:flex-start;text-align:left;color:inherit;font:inherit;min-width:0;max-width:${useAutoWidth ? "none" : "100%"};">
        <strong style="font:inherit;font-weight:800;color:inherit;">${escapeHtml(vote.question || "Vote")}</strong>
        <div style="display:grid;gap:8px;grid-template-columns:${optionGridColumns};width:${useAutoWidth ? "max-content" : "100%"};max-width:${useAutoWidth ? "none" : "100%"};">${optionMarkup}</div>
        ${phase === "result" && winnerLabel
          ? `<div style="padding:10px 12px;border-radius:14px;background:linear-gradient(135deg, rgba(10,36,30,0.9), rgba(12,50,39,0.92));box-shadow:inset 0 0 0 1px rgba(124,255,197,0.22);color:inherit;animation:overlayDesignerWinnerReveal 620ms ease both;"><strong style="font:inherit;font-weight:800;color:inherit;">Winner: ${escapeHtml(winnerLabel)}</strong></div>`
          : ""}
      </div>
    `;
  }

  function buildMarkup(element, runtime) {
    switch (element.type) {
      case "progressBar":
        return `
          <div style="display:flex;flex-direction:column;gap:10px;width:100%;">
            <span style="color:inherit;font:inherit;">${escapeHtml(renderText(element.content || "Progress", runtime))}</span>
            <div style="width:100%;height:18px;border-radius:999px;background:rgba(255,255,255,0.14);overflow:hidden;">
              <span style="display:block;height:100%;width:68%;border-radius:inherit;background:linear-gradient(90deg,var(--overlay-accent, #53dcff),var(--overlay-accent-2, #b266ff));"></span>
            </div>
          </div>
        `;
      case "image":
        return element.source ? `<img src="${escapeHtml(element.source)}" alt="${escapeHtml(element.name || "Image")}" style="width:100%;height:100%;object-fit:cover;" />` : "Image source";
      case "video":
        return element.source ? `<video src="${escapeHtml(element.source)}" muted autoplay loop playsinline style="width:100%;height:100%;object-fit:cover;"></video>` : "Video source";
      case "customHtml":
        return String(element.content || "<div>Custom HTML widget</div>");
      case "votingWidget":
        return buildVoteMarkup({
          ...runtime,
          widgetAutoWidth: Boolean(element?.autoWidth),
          widgetAutoHeight: Boolean(element?.autoHeight)
        }, element);
      default:
        return `<div>${escapeHtml(renderText(element.content || element.name || "", runtime))}</div>`;
    }
  }

  function getOverlayAnimationSessionKey(template, runtime) {
    const templateId = String(template?.id || "template");
    const vote = runtime?.activeVote || {};
    if (vote?.active) {
      return `${templateId}::vote::${String(vote.question || "")}::${String(vote.countdownEndsAt || "")}::${String(vote.spinEndsAt || "")}`;
    }
    const alert = runtime?.alert || {};
    if (alert?.username || alert?.giftSent) {
      return `${templateId}::alert::${String(alert.username || "")}::${String(alert.giftSent || "")}`;
    }
    const chat = runtime?.chatMessage || {};
    if (chat?.username || chat?.message) {
      return `${templateId}::chat::${String(chat.username || "")}::${String(chat.message || "")}`;
    }
    return `${templateId}::default`;
  }

  function render(container, template, runtime) {
    if (!container || !template || !Array.isArray(template.elements)) {
      return;
    }

    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.width = `${Math.max(320, Number(template.width) || 1920)}px`;
    container.style.height = `${Math.max(320, Number(template.height) || 1080)}px`;
    container.style.backgroundColor = hexToRgba(template.backgroundColor || "#08111f", template.backgroundOpacity ?? 0.45);
    container.style.backgroundImage = template.backgroundImage
      ? `linear-gradient(${hexToRgba("#08111f", 1 - (template.backgroundOpacity ?? 0.45))}, ${hexToRgba("#08111f", 1 - (template.backgroundOpacity ?? 0.45))}), url("${String(template.backgroundImage).replaceAll("\"", "%22")}")`
      : "none";
    container.style.backgroundSize = template.backgroundImage ? "cover" : "auto";
    container.innerHTML = "";
    const animationSessionKey = getOverlayAnimationSessionKey(template, runtime);
    if (container.dataset.overlayAnimationSessionKey !== animationSessionKey) {
      container.dataset.overlayAnimationSessionKey = animationSessionKey;
      container.dataset.playedEntryAnimations = "[]";
    }
    const playedEntryAnimations = new Set(JSON.parse(container.dataset.playedEntryAnimations || "[]"));

    const elements = [...template.elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    if (!document.getElementById("overlay-designer-runtime-keyframes")) {
      const style = document.createElement("style");
      style.id = "overlay-designer-runtime-keyframes";
      style.textContent = "@keyframes overlayDesignerWinnerReveal{from{opacity:0;transform:translateY(10px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes overlayDesignerSpinPulse{from{transform:translateY(0) scale(0.99)}to{transform:translateY(0) scale(1)}}@keyframes overlayDesignerPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}@keyframes overlayDesignerFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes overlayDesignerSlideIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes overlayDesignerPop{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}";
      document.head.appendChild(style);
    }
    for (const element of elements) {
      if (element.visible === false) {
        continue;
      }

      const markup = buildMarkup(element, runtime);
      if (element.type === "votingWidget" && !String(markup).trim()) {
        continue;
      }
      const isVotingWidget = element.type === "votingWidget";

      const node = document.createElement("div");
      node.style.position = "absolute";
      node.style.left = `${Math.max(0, Number(element.x) || 0)}px`;
      node.style.top = `${Math.max(0, Number(element.y) || 0)}px`;
      node.style.width = element.autoWidth ? "max-content" : `${Math.max(40, Number(element.width) || 220)}px`;
      node.style.height = element.autoHeight ? "max-content" : `${Math.max(40, Number(element.height) || 72)}px`;
      node.style.minWidth = element.autoWidth ? "40px" : "0";
      node.style.minHeight = element.autoHeight ? "40px" : "0";
      node.style.zIndex = String(Math.max(1, Number(element.zIndex) || 1));
      const rotation = Math.max(-360, Math.min(360, Number(element.rotation) || 0));
      node.style.transform = `rotate(${rotation}deg)`;
      node.style.opacity = String(Math.max(0, Math.min(1, Number(element.opacity) || 1)));
      node.style.color = String(element.color || "#f6fbff");
      node.style.setProperty("--overlay-accent", String(element.glowColor || "#53dcff"));
      node.style.setProperty("--overlay-accent-2", String(element.borderColor || "#8b5cf6"));
      node.style.setProperty("--overlay-surface-soft", hexToRgba(element.backgroundColor || "#10243d", Math.max(0.12, Math.min(0.82, Number(element.backgroundOpacity) || 0.18))));
      node.style.setProperty("--overlay-border-soft", hexToRgba(element.borderColor || "#2a466b", 0.32));
      node.style.fontFamily = String(element.fontFamily || "Poppins, Segoe UI, sans-serif");
      node.style.fontSize = `${Math.max(10, Number(element.fontSize) || 28)}px`;
      node.style.fontWeight = String(Math.max(100, Math.min(900, Number(element.fontWeight) || 700)));
      node.style.letterSpacing = `${Math.max(-4, Math.min(24, Number(element.letterSpacing) || 0))}px`;
      node.style.display = "flex";
      node.style.alignItems = isVotingWidget ? "stretch" : (element.autoHeight ? "stretch" : "center");
      node.style.justifyContent = isVotingWidget ? "flex-start" : (element.autoWidth || element.autoHeight ? "flex-start" : "center");
      node.style.textAlign = "center";
      node.style.padding = isVotingWidget ? "0" : "10px 14px";
      node.style.borderRadius = isVotingWidget ? "0" : `${Math.max(0, Math.min(240, Number(element.borderRadius) || 18))}px`;
      node.style.border = isVotingWidget ? "0" : `${Math.max(0, Math.min(24, Number(element.borderWidth) || 0))}px solid ${String(element.borderColor || "#2a466b")}`;
      node.style.background = isVotingWidget ? "transparent" : hexToRgba(element.backgroundColor || "#10243d", element.backgroundOpacity ?? 0);
      node.style.boxShadow = isVotingWidget ? "none" : `0 0 ${Math.max(8, (Number(element.blur) || 0) * 2)}px ${String(element.glowColor || "#53dcff")}`;
      node.style.backdropFilter = isVotingWidget ? "none" : (Number(element.blur) > 0 ? `blur(${Number(element.blur)}px)` : "none");
      node.style.overflow = isVotingWidget ? "visible" : "hidden";
      node.style.minWidth = element.autoWidth ? "fit-content" : node.style.minWidth;
      node.style.minHeight = element.autoHeight ? "fit-content" : node.style.minHeight;
      if (element.animation && element.animation !== "none") {
        const animationMap = {
          pulse: `overlayDesignerPulse 1.8s ease-in-out infinite`,
          float: `overlayDesignerFloat 3.2s ease-in-out infinite`,
          "slide-in": `overlayDesignerSlideIn 0.6s ease both`,
          pop: `overlayDesignerPop 0.45s ease both`
        };
        const isOneShotEntryAnimation = element.animation === "slide-in" || element.animation === "pop";
        const hasPlayedEntryAnimation = playedEntryAnimations.has(String(element.id || ""));
        if (!isOneShotEntryAnimation || !hasPlayedEntryAnimation) {
          node.style.animation = animationMap[element.animation] || "";
          if (isOneShotEntryAnimation) {
            playedEntryAnimations.add(String(element.id || ""));
          }
        }
      }
      node.innerHTML = markup;
      container.appendChild(node);
    }
    container.dataset.playedEntryAnimations = JSON.stringify([...playedEntryAnimations]);
  }

  window.StreamSyncOverlayDesignerRuntime = { render };
})();
