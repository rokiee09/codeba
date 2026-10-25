import * as THREE from 'three';

// Hero arkasındaki küp tarlası: yavaşça dalgalanır, farenin altında kabarır.
export function initVoxels(canvas: HTMLCanvasElement) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.innerWidth < 700;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0b0e, 22, 48);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  camera.position.set(0, 17, 27);
  camera.lookAt(0, 0, 2);

  const COLS = small ? 24 : 44;
  const ROWS = small ? 18 : 26;
  const COUNT = COLS * ROWS;

  const geometry = new THREE.BoxGeometry(0.8, 1, 0.8);
  geometry.translate(0, 0.5, 0); // tabanı y=0'da dursun, yükseklik scale ile büyüsün
  const material = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 });
  const mesh = new THREE.InstancedMesh(geometry, material, COUNT);

  const group = new THREE.Group();
  group.add(mesh);
  scene.add(group);

  const L = parseInt(THREE.REVISION, 10) >= 155 ? Math.PI : 1;
  scene.add(new THREE.AmbientLight(0xffffff, 0.35 * L));
  const key = new THREE.DirectionalLight(0xdfe7ff, 1.4 * L);
  key.position.set(-8, 20, 10);
  scene.add(key);
  const rim = new THREE.PointLight(0x7fa8ff, 40, 40);
  rim.position.set(10, 6, -6);
  scene.add(rim);

  const base = new THREE.Color(0x14161b);
  const blue = new THREE.Color(0x2f5fd0);
  const warm = new THREE.Color(0xc9d8ff);
  const tmp = new THREE.Color();
  const dummy = new THREE.Object3D();

  // fareyi zemin düzlemine izdüşür
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const pointer = new THREE.Vector2(10, 10);
  const target = new THREE.Vector3(999, 0, 999);
  const hit = new THREE.Vector3(999, 0, 999);
  let tiltX = 0;
  let tiltY = 0;

  function onMove(e: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, target);
  }

  function onLeave() {
    target.set(999, 0, 999);
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  canvas.addEventListener('pointerleave', onLeave);

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  function frame(t: number) {
    hit.lerp(target, 0.08);
    tiltX += (pointer.y * 0.06 - tiltX) * 0.05;
    tiltY += (pointer.x * 0.12 - tiltY) * 0.05;
    if (Math.abs(pointer.x) <= 1) {
      group.rotation.x = tiltX;
      group.rotation.y = tiltY;
    }

    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c - COLS / 2 + 0.5;
        const z = r - ROWS / 2 + 0.5;
        const wave = Math.sin(x * 0.28 + t * 0.6) * 0.45 + Math.cos(z * 0.33 + t * 0.45) * 0.45;
        const dx = x - hit.x;
        const dz = z - hit.z;
        const bump = 2.4 * Math.exp(-(dx * dx + dz * dz) / 9);
        const h = Math.max(0.15, 1.1 + wave + bump);

        dummy.position.set(x, 0, z);
        dummy.scale.set(1, h, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        const k = Math.min(1, Math.max(0, (h - 1.3) / 2.4));
        if (k < 0.7) tmp.copy(base).lerp(blue, k / 0.7);
        else tmp.copy(blue).lerp(warm, (k - 0.7) / 0.3);
        mesh.setColorAt(i, tmp);
        i++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    renderer.render(scene, camera);
  }

  if (reduce) {
    frame(0);
    return;
  }

  // ekranda değilken çizimi durdur, pil ve işlemci boşa gitmesin
  let visible = true;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(canvas);

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (!visible || document.hidden) return;
    frame(clock.getElapsedTime());
  });
}
