
export function runWire(THREE, canvas) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const WCAM = { y: 4.4, z: 13.6, lookY: 2.5, fit: 1.35 };
  camera.position.set(0, 4.2, 11);
  camera.lookAt(0, 0.6, 0);

  function roundedShape(w, h, r) {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  function wireBox(w, h, d, r, color, opacity) {
    const g = new THREE.ExtrudeGeometry(roundedShape(w, h, r), { depth: d, bevelEnabled: false, curveSegments: 4 });
    g.translate(0, 0, -d / 2);
    return new THREE.LineSegments(
      new THREE.EdgesGeometry(g, 20),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    );
  }
  function grid(w, h, nx, ny, color, opacity) {
    const pts = [];
    for (let i = 0; i <= nx; i++) { const x = -w / 2 + (w * i) / nx; pts.push(x, -h / 2, 0, x, h / 2, 0); }
    for (let j = 0; j <= ny; j++) { const y = -h / 2 + (h * j) / ny; pts.push(-w / 2, y, 0, w / 2, y, 0); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  }

  const root = new THREE.Group();
  scene.add(root);

  // laptop
  const laptop = new THREE.Group();
  laptop.position.set(-0.4, 0, 0);
  root.add(laptop);
  const base = wireBox(4.2, 2.8, 0.12, 0.16, 0xc9ced8, 0.9);
  base.rotation.x = -Math.PI / 2;
  base.position.y = 0.06;
  laptop.add(base);
  const keys = grid(3.4, 1.2, 14, 5, 0x6b7280, 0.45);
  keys.rotation.x = -Math.PI / 2;
  keys.position.set(0, 0.13, -0.45);
  laptop.add(keys);
  const pad = wireBox(1.3, 0.75, 0.01, 0.08, 0x6b7280, 0.6);
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(0, 0.13, 0.75);
  laptop.add(pad);
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.12, -1.38);
  hinge.rotation.x = -0.22;
  laptop.add(hinge);
  const lid = wireBox(4.2, 2.7, 0.08, 0.16, 0xc9ced8, 0.9);
  lid.position.y = 1.35;
  hinge.add(lid);
  const screen = wireBox(3.8, 2.3, 0.01, 0.06, 0x4f8cff, 0.55);
  screen.position.set(0, 1.38, 0.05);
  hinge.add(screen);
  // ekranda "404" yazan kod satırları
  const lines = new THREE.Group();
  [[1.6, 0.6], [2.4, 0.35], [1.1, 0.1], [2.0, -0.15], [0.8, -0.4]].forEach(([w, y], i) => {
    const l = grid(w, 0.0001, 1, 1, i === 2 ? 0x4f8cff : 0x8b919c, 0.8);
    l.position.set(-1.6 + w / 2, 1.38 + y, 0.06);
    lines.add(l);
  });
  hinge.add(lines);

  // telefon
  const phone = new THREE.Group();
  root.add(phone);
  phone.add(wireBox(1.1, 2.25, 0.1, 0.17, 0x4f8cff, 0.95));
  const pScreen = wireBox(0.94, 1.95, 0.01, 0.1, 0x4f8cff, 0.45);
  pScreen.position.z = 0.06;
  phone.add(pScreen);
  const PHONE_HOME = new THREE.Vector3(2.55, 1.15, 0.9);

  // zemin ızgarası
  const floor = grid(12, 8, 24, 16, 0x2a2e37, 0.6);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.01;
  root.add(floor);

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // model "404" yazısının altında dursun: hedefi yukarı al, kamerayı biraz geri çek
    const fit = Math.max(1, WCAM.fit / camera.aspect);
    camera.position.set(0, WCAM.y * fit, WCAM.z * fit);
    camera.lookAt(0, WCAM.lookY, 0);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  // sürükle-çevir (ataletli)
  let yaw = -0.5, pitch = 0, vYaw = 0.0025, dragging = false, lx = 0, ly = 0;
  canvas.style.cursor = 'grab';
  canvas.style.touchAction = 'pan-y';
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true; lx = e.clientX; ly = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    lx = e.clientX; ly = e.clientY;
    vYaw = dx * 0.008;
    yaw += vYaw;
    pitch = Math.max(-0.35, Math.min(0.45, pitch + dy * 0.004));
  });
  const end = () => { dragging = false; canvas.style.cursor = 'grab'; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);

  const ease = (t) => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };

  function frame(t) {
    if (!dragging) {
      vYaw += (0.0025 - vYaw) * 0.03; // yavaş kendi kendine dönüş
      yaw += vYaw;
    }
    root.rotation.set(pitch, yaw, 0);

       const c = t % 9;
    const p = phone.position;
    if (c < 4) {
      p.copy(PHONE_HOME);
      p.y += Math.sin(t * 2) * 0.06;
      phone.rotation.set(0, -0.35, 0);
    } else if (c < 6) {
      const k = ease((c - 4) / 2);
      p.set(PHONE_HOME.x + k * 3, PHONE_HOME.y + k * k * 7, PHONE_HOME.z - k * 2);
      phone.rotation.set(-k * 0.6, -0.35 + k * 0.8, k * 0.5);
    } else if (c < 7.5) {
      p.set(99, 99, 99);
    } else {
      const k = ease((c - 7.5) / 1.5);
      p.set(PHONE_HOME.x, PHONE_HOME.y + (1 - k) * 6, PHONE_HOME.z);
      phone.rotation.set(0, -0.35 + (1 - k) * 2, 0);
    }
    renderer.render(scene, camera);
  }

  if (reduce) { phone.position.copy(PHONE_HOME); phone.rotation.y = -0.35; root.rotation.y = yaw; renderer.render(scene, camera); return; }
  const t0 = performance.now();
  renderer.setAnimationLoop(() => { if (!document.hidden) frame((performance.now() - t0) / 1000); });
}
