(function initCircleAnimations2025() {
  function setupPulsatingCircles() {
    const c = document.getElementById("anim1");
    if (!c) return;
    c.innerHTML = "";
    const center = document.createElement("div");
    center.className = "dot pulse-dot";
    center.style.width = center.style.height = "8px";
    center.style.left = "calc(50% - 4px)";
    center.style.top = "calc(50% - 4px)";
    c.appendChild(center);
    for (let r = 0; r < 4; r++) {
      const radius = 15 + r * 15,
        count = 6 + r * 3;
      for (let i = 0; i < count; i++) {
        const d = document.createElement("div");
        d.className = "dot pulse-dot";
        const angle = (i / count) * 2 * Math.PI;
        const x = Math.cos(angle) * radius,
          y = Math.sin(angle) * radius;
        const sz = 3 + r * 0.3;
        d.style.width = d.style.height = `${sz}px`;
        d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
        d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
        d.style.animationDelay = `${r * 0.2 + i * 0.1}s`;
        d.style.background = `rgba(255,255,255,${(90 - r * 10) / 100})`;
        c.appendChild(d);
      }
    }
  }

  function setupRotatingCircles() {
    const c = document.getElementById("anim2");
    if (!c) return;
    c.innerHTML = "";
    const cd = document.createElement("div");
    cd.className = "dot";
    cd.style.width = cd.style.height = "8px";
    cd.style.left = "calc(50% - 4px)";
    cd.style.top = "calc(50% - 4px)";
    c.appendChild(cd);
    for (let r = 0; r < 3; r++) {
      const oc = document.createElement("div");
      oc.className = "orbit-container";
      oc.style.animationDuration = `${8 + r * 4}s`;
      oc.style.animationDirection = r % 2 ? "reverse" : "normal";
      const radius = 20 + r * 20,
        count = 6 + r * 3;
      for (let i = 0; i < count; i++) {
        const d = document.createElement("div");
        d.className = "dot";
        const angle = (i / count) * 2 * Math.PI;
        const x = Math.cos(angle) * radius,
          y = Math.sin(angle) * radius;
        const sz = 4 - r * 0.5;
        d.style.width = d.style.height = `${sz}px`;
        d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
        d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
        d.style.background = `rgba(255,255,255,${(90 - r * 15) / 100})`;
        oc.appendChild(d);
      }
      c.appendChild(oc);
    }
  }

  function setupSequentialRings() {
    const c = document.getElementById("anim3");
    if (!c) return;
    c.innerHTML = "";
    const cd = document.createElement("div");
    cd.className = "dot";
    cd.style.width = cd.style.height = "6px";
    cd.style.left = "calc(50% - 3px)";
    cd.style.top = "calc(50% - 3px)";
    c.appendChild(cd);
    for (let i = 0; i < 5; i++) {
      const rad = 15 + i * 15,
        count = 8 + i * 4;
      for (let j = 0; j < count; j++) {
        const d = document.createElement("div");
        d.className = "dot sequential-dot";
        const angle = (j / count) * 2 * Math.PI;
        const x = Math.cos(angle) * rad,
          y = Math.sin(angle) * rad;
        const sz = 3 + i * 0.2;
        d.style.width = d.style.height = `${sz}px`;
        d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
        d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
        d.style.animation = `expandRing 3s infinite`;
        d.style.animationDelay = `${i * 0.3 + (j / count) * 0.1}s`;
        d.style.background = `rgba(255,255,255,${(90 - i * 15) / 100})`;
        c.appendChild(d);
      }
    }
  }

  function setupConcentricRotations() {
    const c = document.getElementById("anim4");
    if (!c) return;
    c.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "concentric-container";
    c.appendChild(wrap);
    const cd = document.createElement("div");
    cd.className = "dot";
    cd.style.width = cd.style.height = "5px";
    cd.style.left = "calc(50% - 2.5px)";
    cd.style.top = "calc(50% - 2.5px)";
    cd.style.background = "rgba(255,255,255,0.9)";
    wrap.appendChild(cd);
    for (let r = 0; r < 8; r++) {
      const ring = document.createElement("div");
      ring.className = "concentric-ring";
      ring.style.animationDuration = `${3 * Math.pow(1.5, r)}s`;
      const radius = 10 + r * 10,
        circ = 2 * Math.PI * radius;
      const count = Math.max(6, Math.floor(circ / 10));
      for (let i = 0; i < count; i++) {
        const d = document.createElement("div");
        d.className = "dot";
        const angle = (i / count) * 2 * Math.PI;
        const x = Math.cos(angle) * radius,
          y = Math.sin(angle) * radius;
        d.style.width = d.style.height = "4px";
        d.style.left = `calc(50% + ${x}px - 2px)`;
        d.style.top = `calc(50% + ${y}px - 2px)`;
        d.style.background = `rgba(255,255,255,${(90 - r * 5) / 100})`;
        ring.appendChild(d);
      }
      wrap.appendChild(ring);
    }
  }

  function setupCircularWaves() {
    const c = document.getElementById("anim5");
    if (!c) return;
    c.innerHTML = "";
    const cd = document.createElement("div");
    cd.className = "dot";
    cd.style.width = cd.style.height = "8px";
    cd.style.left = "calc(50% - 4px)";
    cd.style.top = "calc(50% - 4px)";
    c.appendChild(cd);
    for (let r = 0; r < 5; r++) {
      const rad = 15 + r * 15,
        count = 8 + r * 4;
      for (let i = 0; i < count; i++) {
        const d = document.createElement("div");
        d.className = "dot circular-wave-dot";
        const angle = (i / count) * 2 * Math.PI;
        const x = Math.cos(angle) * rad,
          y = Math.sin(angle) * rad;
        const sz = 3 + r * 0.2;
        d.style.width = d.style.height = `${sz}px`;
        d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
        d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
        d.style.animationDelay = `${r * 0.2 + (i / count) * 0.5}s`;
        d.style.background = `rgba(255,255,255,${(90 - r * 10) / 100})`;
        c.appendChild(d);
      }
    }
  }

  function setupExpandingLines() {
    const c = document.getElementById("anim6");
    if (!c) return;
    c.innerHTML = "";
    const cd = document.createElement("div");
    cd.className = "dot";
    cd.style.width = cd.style.height = "6px";
    cd.style.left = "calc(50% - 3px)";
    cd.style.top = "calc(50% - 3px)";
    cd.style.background = "rgba(255,255,255,0.8)";
    c.appendChild(cd);
    for (let g = 0; g < 3; g++) {
      const lc = document.createElement("div");
      lc.className = "line-container";
      lc.style.animationDuration = `${8 + g * 4}s`;
      lc.style.animationDirection = g % 2 ? "reverse" : "normal";
      for (let i = 0; i < 12; i++) {
        const line = document.createElement("div");
        line.className = "expanding-line";
        line.style.animationDelay = `${(i / 12) * 2}s`;
        line.style.transform = `rotate(${(360 / 12) * i}deg)`;
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.style.width = dot.style.height = "3px";
        dot.style.left = "70px";
        dot.style.top = "calc(50% - 1.5px)";
        dot.style.background = `rgba(255,255,255,0.8)`;
        line.appendChild(dot);
        lc.appendChild(line);
      }
      c.appendChild(lc);
    }
  }

  function setupBreathingGrid() {
    const c = document.getElementById("anim7");
    if (!c) return;
    c.innerHTML = "";
    const grid = 9,
      spacing = 16,
      ds = 4;
    const offset = -(spacing * (grid - 1)) / 2;
    for (let y = 0; y < grid; y++) {
      for (let x = 0; x < grid; x++) {
        const d = document.createElement("div");
        d.className = "dot breathing-dot";
        const px = offset + x * spacing,
          py = offset + y * spacing;
        d.style.width = d.style.height = `${ds}px`;
        d.style.left = `calc(50% + ${px}px - ${ds / 2}px)`;
        d.style.top = `calc(50% + ${py}px - ${ds / 2}px)`;
        const center = (grid - 1) / 2;
        const dist = Math.hypot(x - center, y - center);
        const maxD = Math.hypot(center, center);
        d.style.animationDelay = `${(dist / maxD) * 1.5}s`;
        d.style.background = `rgba(255,255,255,${
          (90 - (dist / maxD) * 40) / 100
        })`;
        c.appendChild(d);
      }
    }
  }

  function setupRippleEffect() {
    const c = document.getElementById("anim8");
    if (!c) return;
    c.innerHTML = "";

    // Center dot
    const cd = document.createElement("div");
    cd.className = "dot";
    cd.style.width = cd.style.height = "8px";
    cd.style.left = "calc(50% - 4px)";
    cd.style.top = "calc(50% - 4px)";
    cd.style.background = "rgba(255,255,255,0.9)";
    cd.style.zIndex = "10";
    c.appendChild(cd);

    // Ripple container
    const rc = document.createElement("div");
    rc.className = "ripple-container";
    c.appendChild(rc);

    // Create ripple rings
    const numRipples = 4;
    const rippleDuration = 4; // seconds

    for (let i = 0; i < numRipples; i++) {
      const r = document.createElement("div");
      r.className = "ripple-ring";
      r.style.animationDelay = `${i * (rippleDuration / numRipples)}s`;
      rc.appendChild(r);
    }

    // Create dots that will react to the ripple
    const numRings = 6;
    const maxRadius = 80;

    for (let ring = 0; ring < numRings; ring++) {
      const radius = 15 + (ring * (maxRadius - 15)) / (numRings - 1);
      const numDots = 6 + ring * 3;

      for (let i = 0; i < numDots; i++) {
        const angle = (i / numDots) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Calculate distance from center (normalized to 0-1)
        const distanceFromCenter = Math.sqrt(x * x + y * y) / maxRadius;

        // Create the dot
        const d = document.createElement("div");
        d.className = "ripple-wave-dot";

        // Size decreases as we move outward
        const size = 5 - ring * 0.5;
        d.style.width = d.style.height = `${size}px`;
        d.style.left = `calc(50% + ${x}px - ${size / 2}px)`;
        d.style.top = `calc(50% + ${y}px - ${size / 2}px)`;

        // Set animation
        d.style.animation = "rippleWave 1s infinite ease-in-out";

        // Delay based on distance from center - this creates the wave effect
        // Multiply by rippleDuration to match the ripple timing
        d.style.animationDelay = `${
          distanceFromCenter * (rippleDuration / 1.2)
        }s`;

        // Opacity and color based on ring
        d.style.background = `rgba(255,255,255,${(90 - ring * 10) / 100})`;

        c.appendChild(d);
      }
    }
  }

  function setupFibonacciSpiral() {
    const c = document.getElementById("anim9");
    if (!c) return;
    c.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "fibonacci-container";
    c.appendChild(wrap);
    const cd = document.createElement("div");
    cd.className = "dot";
    cd.style.width = cd.style.height = "6px";
    cd.style.left = "calc(50% - 3px)";
    cd.style.top = "calc(50% - 3px)";
    cd.style.background = "rgba(255,255,255,0.9)";
    wrap.appendChild(cd);
    const golden = Math.PI * (3 - Math.sqrt(5)),
      N = 100,
      scale = 0.8;
    for (let i = 0; i < N; i++) {
      const angle = i * golden,
        rad = scale * Math.sqrt(i) * 4;
      const x = Math.cos(angle) * rad,
        y = Math.sin(angle) * rad;
      const sz = 3 - (i / N) * 1.5;
      if (sz < 1) continue;
      const d = document.createElement("div");
      d.className = "fibonacci-dot";
      d.style.width = d.style.height = `${sz}px`;
      d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
      d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
      d.style.animationDelay = `${(i / N) * 3}s`;
      d.style.background = `rgba(255,255,255,${(90 - (i / N) * 60) / 100})`;
      wrap.appendChild(d);
    }
  }

  function setupHalftoneGradient() {
    const c = document.getElementById("anim10");
    if (!c) return;
    c.innerHTML = "";
    const w = document.createElement("div");
    w.className = "halftone-container";
    c.appendChild(w);
    const radii = [20, 40, 60, 80];
    radii.forEach((radius, i) => {
      const count = 12 + i * 8,
        size = 6 - i;
      for (let j = 0; j < count; j++) {
        const d = document.createElement("div");
        d.className = "halftone-dot";
        d.style.width = d.style.height = `${size}px`;
        const angle = (j / count) * 2 * Math.PI;
        const x = Math.cos(angle) * radius,
          y = Math.sin(angle) * radius;
        d.style.left = `calc(50% + ${x}px - ${size / 2}px)`;
        d.style.top = `calc(50% + ${y}px - ${size / 2}px)`;
        d.style.animationDelay = `${(i * 0.3 + j / count).toFixed(2)}s`;
        d.style.background = `rgba(255,255,255,${(90 - i * 15) / 100})`;
        w.appendChild(d);
      }
    });
  }

  function setupSilverSpiral() {
    const c = document.getElementById("anim11");
    if (!c) return;
    c.innerHTML = "";
    const w = document.createElement("div");
    w.className = "silver-container";
    c.appendChild(w);
    const N = 120,
      angleStep = Math.PI * (2 - Math.sqrt(2)),
      scale = 1.2;
    for (let i = 0; i < N; i++) {
      const angle = i * angleStep,
        rad = scale * Math.sqrt(i) * 6;
      const size = 4 - (i / N) * 2;
      if (size < 1) continue;
      const d = document.createElement("div");
      d.className = "silver-dot";
      d.style.width = d.style.height = `${size}px`;
      d.style.left = `calc(50% + ${Math.cos(angle) * rad}px - ${size / 2}px)`;
      d.style.top = `calc(50% + ${Math.sin(angle) * rad}px - ${size / 2}px)`;
      d.style.animationDelay = `${(i / N) * 2}s`;
      w.appendChild(d);
    }
  }

  // 12. Sunflower Spiral (perfect SVG + SMIL)
  function setupFibonacciConcentric() {
    const c = document.getElementById("anim12");
    if (!c) return;
    c.innerHTML = "";
    const N = 200;
    const SIZE = 180;
    const DOT_RADIUS = 2;
    const MARGIN = 4;
    const CENTER = SIZE / 2;
    const MAX_RADIUS = CENTER - MARGIN - DOT_RADIUS;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const DURATION = 3;
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", SIZE);
    svg.setAttribute("height", SIZE);
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);
    c.appendChild(svg);

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_RADIUS;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", DOT_RADIUS);
      circle.setAttribute("fill", "#fff");
      circle.setAttribute("opacity", "0.6");
      svg.appendChild(circle);

      // radius pulse
      const animR = document.createElementNS(svgNS, "animate");
      animR.setAttribute("attributeName", "r");
      animR.setAttribute(
        "values",
        `${DOT_RADIUS * 0.5};${DOT_RADIUS * 1.5};${DOT_RADIUS * 0.5}`
      );
      animR.setAttribute("dur", `${DURATION}s`);
      animR.setAttribute("begin", `${frac * DURATION}s`);
      animR.setAttribute("repeatCount", "indefinite");
      animR.setAttribute("calcMode", "spline");
      animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      circle.appendChild(animR);

      // opacity pulse
      const animO = document.createElementNS(svgNS, "animate");
      animO.setAttribute("attributeName", "opacity");
      animO.setAttribute("values", "0.3;1;0.3");
      animO.setAttribute("dur", `${DURATION}s`);
      animO.setAttribute("begin", `${frac * DURATION}s`);
      animO.setAttribute("repeatCount", "indefinite");
      animO.setAttribute("calcMode", "spline");
      animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      circle.appendChild(animO);
    }
  }

  // Add corner decorations to all animation containers
  function addCornerDecorations() {
    document.querySelectorAll(".animation-container").forEach((container) => {
      // Create corner SVG elements
      const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];

      corners.forEach((position) => {
        const corner = document.createElement("div");
        corner.className = `corner ${position}`;

        // Use the plus symbol SVG
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 512 512");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        // Create plus symbol polygon
        const polygon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polygon"
        );
        polygon.setAttribute(
          "points",
          "448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
        );
        polygon.setAttribute("fill", "currentColor");

        svg.appendChild(polygon);
        corner.appendChild(svg);
        container.appendChild(corner);
      });
    });
  }

  window.addEventListener("load", () => {
    setupPulsatingCircles();
    setupRotatingCircles();
    setupSequentialRings();
    setupConcentricRotations();
    setupCircularWaves();
    setupExpandingLines();
    setupBreathingGrid();
    setupRippleEffect();
    setupFibonacciSpiral();
    setupHalftoneGradient();
    setupSilverSpiral();
    setupFibonacciConcentric();
    addCornerDecorations(); // Add the corner decorations
  });
})();
