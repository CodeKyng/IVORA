/* IVORA Landing — interactions + Three.js network + card glow */

(function () {
  "use strict";

  // ----- Mobile menu -----
  const toggle = document.getElementById("mobile-toggle");
  const menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  // ----- Waitlist form success state -----
  const form = document.getElementById("waitlist-form");
  const success = document.getElementById("form-success");
  const submitBtn = document.getElementById("submit-btn");

  if (form && success) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting…";

      setTimeout(() => {
        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 600);
    });
  }

  // ----- IntersectionObserver reveal -----
  const revealEls = document.querySelectorAll(
    ".problem-card, .service-card, .use-case, .result-card, .step, .faq-item"
  );
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ----- Mouse-tracking glow on glass cards -----
  const glowCards = document.querySelectorAll(".glass-card");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && glowCards.length) {
    glowCards.forEach((card) => {
      card.addEventListener(
        "pointermove",
        (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty("--mouse-x", x + "%");
          card.style.setProperty("--mouse-y", y + "%");
        },
        { passive: true }
      );
    });
  }

  // ----- Three.js: subtle node network (automation motif) -----
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  if (prefersReduced) {
    canvas.style.display = "none";
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const NODE_COUNT = 48;
  const nodes = [];
  const positions = new Float32Array(NODE_COUNT * 3);
  const geometry = new THREE.BufferGeometry();

  for (let i = 0; i < NODE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 48;
    const y = (Math.random() - 0.5) * 32;
    const z = (Math.random() - 0.5) * 20;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    nodes.push({
      x, y, z,
      vx: (Math.random() - 0.5) * 0.012,
      vy: (Math.random() - 0.5) * 0.012,
      vz: (Math.random() - 0.5) * 0.008,
    });
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xa78bfa,
    size: 0.18,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const MAX_DIST = 9.5;
  const linePositions = new Float32Array(NODE_COUNT * NODE_COUNT * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.18,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  const GLOW_COUNT = 80;
  const glowPos = new Float32Array(GLOW_COUNT * 3);
  for (let i = 0; i < GLOW_COUNT; i++) {
    glowPos[i * 3] = (Math.random() - 0.5) * 60;
    glowPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
    glowPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  const glowGeo = new THREE.BufferGeometry();
  glowGeo.setAttribute("position", new THREE.BufferAttribute(glowPos, 3));
  const glowMat = new THREE.PointsMaterial({
    color: 0x6366f1,
    size: 0.08,
    transparent: true,
    opacity: 0.35,
  });
  scene.add(new THREE.Points(glowGeo, glowMat));

  let frame = 0;
  let rafId = null;

  function updateConnections() {
    const posAttr = geometry.attributes.position.array;
    let idx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = posAttr[i * 3] - posAttr[j * 3];
        const dy = posAttr[i * 3 + 1] - posAttr[j * 3 + 1];
        const dz = posAttr[i * 3 + 2] - posAttr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < MAX_DIST) {
          linePositions[idx++] = posAttr[i * 3];
          linePositions[idx++] = posAttr[i * 3 + 1];
          linePositions[idx++] = posAttr[i * 3 + 2];
          linePositions[idx++] = posAttr[j * 3];
          linePositions[idx++] = posAttr[j * 3 + 1];
          linePositions[idx++] = posAttr[j * 3 + 2];
        }
      }
    }
    for (let k = idx; k < linePositions.length; k++) linePositions[k] = 0;
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, idx / 3);
  }

  function animate() {
    rafId = requestAnimationFrame(animate);
    frame++;

    const posAttr = geometry.attributes.position.array;
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      n.z += n.vz;
      if (Math.abs(n.x) > 24) n.vx *= -1;
      if (Math.abs(n.y) > 16) n.vy *= -1;
      if (Math.abs(n.z) > 10) n.vz *= -1;
      posAttr[i * 3] = n.x;
      posAttr[i * 3 + 1] = n.y;
      posAttr[i * 3 + 2] = n.z;
    }
    geometry.attributes.position.needsUpdate = true;

    if (frame % 2 === 0) updateConnections();

    camera.position.x = Math.sin(frame * 0.0012) * 1.8;
    camera.position.y = Math.cos(frame * 0.0009) * 1.2;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener("resize", onResize, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      animate();
    }
  });

  updateConnections();
  animate();
})();
