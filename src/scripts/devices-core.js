// codeba 3D sahnesi: gerçekçi laptop + telefon.
// Aynı ekran dört aşamadan geçer: tel çerçeve → tasarım → kod → yayında.
// Sürükleyerek çevrilir, sayfa kaydırıldıkça kamera cihazların etrafında döner.
// THREE dışarıdan verilir; aynı kod hem sitede (npm) hem önizlemede (CDN) çalışır.
export function runDevices(THREE, canvas) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EN = canvas.dataset.lang === 'en';
  const REV = parseInt(THREE.REVISION, 10);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  if (!('outputColorSpace' in renderer) && THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  const look = new THREE.Vector3(0.45, 1.0, 0);

  // ---------- ortam yansıması: koyu bir oda + şerit ışıklar ----------
  // Metal yüzeylerin gerçekçi görünmesini sağlayan şey, yansıttıkları bu sahte odadır.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new THREE.Scene();
  room.add(new THREE.Mesh(new THREE.BoxGeometry(20, 12, 20), new THREE.MeshBasicMaterial({ color: 0x0b0d12, side: THREE.BackSide })));
  const strip = (w, h, x, y, z, ry, c, s) => {
    const m = new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide });
    m.color.multiplyScalar(s);
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
    p.position.set(x, y, z);
    p.rotation.y = ry;
    room.add(p);
  };
  strip(10, 1.2, 0, 5.5, -4, 0, 0xffffff, 3.5);
  strip(1.2, 8, -8, 2, 0, Math.PI / 2, 0xdfe7ff, 2.2);
  strip(1.0, 6, 8, 1, -2, -Math.PI / 2, 0x6f9bff, 2.6);
  strip(6, 0.8, 0, -1, 8, Math.PI, 0xffffff, 1.2);
  scene.environment = pmrem.fromScene(room, 0.04).texture;

  const L = REV >= 155 ? Math.PI : 1;
  scene.add(new THREE.AmbientLight(0xffffff, 0.25 * L));
  const key = new THREE.DirectionalLight(0xffffff, 1.4 * L);
  key.position.set(-4, 8, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x7fa8ff, 1.0 * L);
  rim.position.set(6, 3, -5);
  scene.add(rim);

  // ---------- yardımcılar ----------
  function rrShape(w, h, r) {
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
  // kenarları yumuşatılmış kutu (ön yüzü +z'de)
  function slab(w, h, d, r, bevel) {
    const b = bevel ?? Math.min(d * 0.45, 0.03);
    const g = new THREE.ExtrudeGeometry(rrShape(w - b * 2, h - b * 2, Math.max(0.001, r - b)), {
      depth: Math.max(0.001, d - b * 2), bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 4, curveSegments: 10,
    });
    g.translate(0, 0, -(d - b * 2) / 2);
    return g;
  }
  function flat(w, h, r) {
    return new THREE.ShapeGeometry(rrShape(w, h, r), 10);
  }
  function screenTexture(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const tex = new THREE.CanvasTexture(c);
    if (THREE.SRGBColorSpace && 'colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
    else if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return { c, ctx: c.getContext('2d'), tex };
  }
  // yuvarlak köşeli ShapeGeometry'nin UV'leri şekle göre değil koordinata göre; ekranlar için düz plane kullanıyoruz
  const Phys = THREE.MeshPhysicalMaterial || THREE.MeshStandardMaterial;

  const aluminium = new Phys({ color: 0xc4c8cf, metalness: 1, roughness: 0.34, clearcoat: 0.25, clearcoatRoughness: 0.4 });
  const aluminiumDark = new Phys({ color: 0x9aa0aa, metalness: 1, roughness: 0.42 });
  const glassBlack = new Phys({ color: 0x050608, metalness: 0.2, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.05 });
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x16181d, metalness: 0.1, roughness: 0.75 });
  const titanium = new Phys({ color: 0x3a5c9e, metalness: 0.95, roughness: 0.28, clearcoat: 0.5, clearcoatRoughness: 0.2 });
  const lensGlass = new Phys({ color: 0x0a0c10, metalness: 0.4, roughness: 0.05, clearcoat: 1 });
  const lensRing = new Phys({ color: 0xb8c0cc, metalness: 1, roughness: 0.25 });

  const root = new THREE.Group();
  scene.add(root);

  // =====================================================================
  // LAPTOP
  // =====================================================================
  const laptop = new THREE.Group();
  laptop.position.set(-0.55, 0, 0);
  laptop.rotation.y = 0.28;
  root.add(laptop);

  const BW = 4.3, BD = 3.0, BH = 0.11;
  const base = new THREE.Mesh(slab(BW, BD, BH, 0.18, 0.04), aluminium);
  base.rotation.x = -Math.PI / 2;
  base.position.y = BH / 2;
  laptop.add(base);

  // klavye çukuru ve tuşlar
  const well = new THREE.Mesh(flat(3.7, 1.42, 0.06), new THREE.MeshStandardMaterial({ color: 0x0e1014, roughness: 0.9 }));
  well.rotation.x = -Math.PI / 2;
  well.position.set(0, BH + 0.001, -0.48);
  laptop.add(well);
  const COLS = 14, ROWS = 6, kw = 0.22, kd = 0.19, gap = 0.035;
  const keys = new THREE.InstancedMesh(slab(kw, kd, 0.03, 0.03, 0.008), keyMat, COLS * ROWS);
  const dm = new THREE.Object3D();
  let ki = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = -((COLS - 1) * (kw + gap)) / 2 + c * (kw + gap);
      const z = -0.48 - ((ROWS - 1) * (kd + gap)) / 2 + r * (kd + gap);
      dm.position.set(x, BH + 0.012, z);
      dm.rotation.set(-Math.PI / 2, 0, 0);
      // boşluk tuşu: alt sıranın ortası geniş
      const space = r === ROWS - 1 && c >= 4 && c <= 9;
      dm.scale.set(space ? (c === 4 ? 6 * (kw + gap) / kw - 0.15 : 0.0001) : 1, 1, 1);
      if (space && c === 4) dm.position.x = 0;
      dm.updateMatrix();
      keys.setMatrixAt(ki++, dm.matrix);
    }
  }
  laptop.add(keys);
  const pad = new THREE.Mesh(slab(1.5, 0.9, 0.012, 0.08, 0.004), aluminiumDark);
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(0, BH, 0.82);
  laptop.add(pad);

  // menteşe ve kapak
  const hingeBar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 3.4, 20), new THREE.MeshStandardMaterial({ color: 0x1a1c21, metalness: 0.6, roughness: 0.5 }));
  hingeBar.rotation.z = Math.PI / 2;
  hingeBar.position.set(0, BH + 0.02, -BD / 2 + 0.05);
  laptop.add(hingeBar);

  const hinge = new THREE.Group();
  hinge.position.set(0, BH + 0.02, -BD / 2 + 0.05);
  laptop.add(hinge);
  const LW = 4.3, LH = 2.82, LD = 0.07;
  const lid = new THREE.Mesh(slab(LW, LH, LD, 0.18, 0.03), aluminium);
  lid.position.set(0, LH / 2, -LD / 2);
  hinge.add(lid);
  const bezel = new THREE.Mesh(flat(LW - 0.06, LH - 0.06, 0.15), glassBlack);
  bezel.position.set(0, LH / 2, 0.002);
  hinge.add(bezel);
  const lap = screenTexture(1280, 800);
  const SW = 3.98, SH = SW * (800 / 1280);
  const lapScreen = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({ map: lap.tex, toneMapped: false }));
  lapScreen.position.set(0, LH / 2 - 0.02, 0.004);
  hinge.add(lapScreen);
  const notch = new THREE.Mesh(flat(0.42, 0.11, 0.05), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  notch.position.set(0, LH / 2 - 0.02 + SH / 2 - 0.03, 0.006);
  hinge.add(notch);

  // =====================================================================
  // TELEFON
  // =====================================================================
  const phone = new THREE.Group();
  root.add(phone);
  const PW = 1.16, PH = 2.38, PD = 0.09;
  phone.add(new THREE.Mesh(slab(PW, PH, PD, 0.2, 0.035), titanium));
  const pGlass = new THREE.Mesh(flat(PW - 0.04, PH - 0.04, 0.18), glassBlack);
  pGlass.position.z = PD / 2 + 0.001;
  phone.add(pGlass);
  const ph = screenTexture(540, 1170);
  const PSW = PW - 0.11, PSH = PSW * (1170 / 540);
  const phScreen = new THREE.Mesh(new THREE.PlaneGeometry(PSW, PSH), new THREE.MeshBasicMaterial({ map: ph.tex, toneMapped: false }));
  phScreen.position.z = PD / 2 + 0.003;
  phone.add(phScreen);
  // ekranın köşelerini yuvarlamak için siyah maske çerçevesi
  const maskShape = rrShape(PW - 0.04, PH - 0.04, 0.18);
  maskShape.holes.push(rrShape(PSW, PSH, 0.14));
  const mask = new THREE.Mesh(new THREE.ShapeGeometry(maskShape, 12), new THREE.MeshBasicMaterial({ color: 0x050608 }));
  mask.position.z = PD / 2 + 0.004;
  phone.add(mask);
  const island = new THREE.Mesh(flat(0.3, 0.085, 0.0425), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  island.position.set(0, PSH / 2 - 0.09, PD / 2 + 0.005);
  phone.add(island);
  // arka kamera adası
  const bump = new THREE.Mesh(slab(0.52, 0.52, 0.035, 0.13, 0.012), titanium);
  bump.position.set(-0.24, PH / 2 - 0.34, -PD / 2 - 0.012);
  phone.add(bump);
  [[-0.11, 0.11], [-0.11, -0.11], [0.11, 0]].forEach(([x, y]) => {
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.035, 28), lensRing);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(-0.24 + x, PH / 2 - 0.34 + y, -PD / 2 - 0.04);
    phone.add(ring);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.04, 28), lensGlass);
    lens.rotation.x = Math.PI / 2;
    lens.position.copy(ring.position);
    lens.position.z -= 0.004;
    phone.add(lens);
  });
  // yan tuşlar
  [[PW / 2 + 0.008, 0.45, 0.32], [-PW / 2 - 0.008, 0.62, 0.16], [-PW / 2 - 0.008, 0.36, 0.16]].forEach(([x, y, h]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.02, h, 0.035), titanium);
    b.position.set(x, y, 0);
    phone.add(b);
  });
  const PHONE_HOME = new THREE.Vector3(2.5, 1.32, 1.0);

  // yumuşak zemin gölgesi
  const sh = document.createElement('canvas');
  sh.width = sh.height = 128;
  const sctx = sh.getContext('2d');
  const grd = sctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  grd.addColorStop(0, 'rgba(0,0,0,0.6)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  sctx.fillStyle = grd;
  sctx.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sh), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0.4, -0.005, 0.2);
  root.add(shadow);

  // =====================================================================
  // EKRAN İÇERİKLERİ — 4 aşama
  // =====================================================================
  const STAGES = EN ? ['Wireframe', 'Design', 'Code', 'Live'] : ['Tel çerçeve', 'Tasarım', 'Kod', 'Yayında'];
  const SANS = "'Geist', 'Segoe UI', system-ui, sans-serif";
  const MONO = "'Geist Mono', ui-monospace, Menlo, Consolas, monospace";
  const C = { bg: '#0d0f14', bar: '#151820', line: '#3a404c', ink: '#eceef2', muted: '#8b919c', blue: '#4f8cff', card: '#161a22', deep: '#1b2a4a', green: '#3ecf8e' };

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const ease = (t) => 1 - Math.pow(1 - clamp01(t), 3);

  // --- laptop: tarayıcı çerçevesi ---
  function browserChrome(ctx, W, title, url, live) {
    ctx.fillStyle = C.bar;
    ctx.fillRect(0, 0, W, 58);
    ['#ff5f57', '#febc2e', '#28c840'].forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(30 + i * 26, 29, 8, 0, Math.PI * 2);
      ctx.fill();
    });
    rr(ctx, W / 2 - 260, 14, 520, 30, 9);
    ctx.fillStyle = '#0d0f14';
    ctx.fill();
    ctx.font = `400 17px ${SANS}`;
    ctx.fillStyle = live ? C.ink : C.muted;
    ctx.textAlign = 'center';
    ctx.fillText((live ? '🔒 ' : '') + url, W / 2, 35);
    ctx.textAlign = 'left';
    ctx.fillStyle = C.muted;
    ctx.font = `500 15px ${MONO}`;
    ctx.fillText(title, W - 170, 35);
  }
  // sayfa düzeni: [x, y, w, h, tür]
  const LAYOUT = [
    [60, 90, 1160, 36, 'nav'],
    [60, 170, 560, 54, 'h1'],
    [60, 236, 460, 54, 'h1'],
    [60, 312, 520, 18, 'p'],
    [60, 340, 440, 18, 'p'],
    [60, 390, 180, 52, 'btn'],
    [700, 170, 520, 290, 'img'],
    [60, 520, 360, 200, 'card'],
    [460, 520, 360, 200, 'card'],
    [860, 520, 360, 200, 'card'],
  ];
  function drawPage(ctx, mode, k) {
    // mode: 'wire' | 'design'; k: 0..1 kaç blok belirdi
    LAYOUT.forEach(([x, y, w, h, kind], i) => {
      const a = mode === 'wire' ? 1 : ease(k * LAYOUT.length - i);
      if (a <= 0) return;
      ctx.globalAlpha = a;
      if (mode === 'wire') {
        ctx.setLineDash([10, 8]);
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 2;
        rr(ctx, x, y, w, h, 10);
        ctx.stroke();
        ctx.setLineDash([]);
        if (kind === 'img') {
          ctx.beginPath();
          ctx.moveTo(x, y); ctx.lineTo(x + w, y + h);
          ctx.moveTo(x + w, y); ctx.lineTo(x, y + h);
          ctx.stroke();
        }
      } else {
        const fills = { nav: '#11141a', h1: C.ink, p: '#4a515e', btn: C.blue, card: C.card };
        if (kind === 'img') {
          const g = ctx.createLinearGradient(x, y, x + w, y + h);
          g.addColorStop(0, '#2a4f9e');
          g.addColorStop(1, '#0f1b36');
          ctx.fillStyle = g;
        } else ctx.fillStyle = fills[kind];
        rr(ctx, x, y, w, h, kind === 'btn' ? 26 : kind === 'h1' ? 10 : 12);
        ctx.fill();
        if (kind === 'card') {
          ctx.fillStyle = '#26324a';
          rr(ctx, x + 24, y + 24, 56, 56, 14);
          ctx.fill();
          ctx.fillStyle = '#c4c8d0';
          rr(ctx, x + 24, y + 104, 220, 18, 9);
          ctx.fill();
          ctx.fillStyle = '#3a404c';
          rr(ctx, x + 24, y + 136, 280, 14, 7);
          ctx.fill();
        }
        if (kind === 'img') {
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          rr(ctx, x + 200, y + 40, 120, 210, 18);
          ctx.fill();
          ctx.fillStyle = C.blue;
          rr(ctx, x + 214, y + 60, 92, 60, 10);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    });
  }

  // --- laptop: kod editörü ---
  const K = '#c792ea', T = '#82aaff', S = '#c3e88d', P = '#d7dae0', CM = '#6b7383', F = '#ffcb6b';
  const CODE = [
    [['class ', K], [EN ? 'IdeaToProduct' : 'FikirdenUrune', T], [' extends ', K], ['StatelessWidget', T], [' {', P]],
    [['  @override', CM]],
    [['  Widget ', T], ['build', F], ['(context) {', P]],
    [['    return ', K], ['Scaffold', T], ['(', P]],
    [['      appBar: ', P], ['AppBar', T], ['(title: ', P], ["'codeba'", S], ['),', P]],
    [['      body: ', P], ['Column', T], ['(children: [', P]],
    [['        ', P], ['HeroCard', T], ['(),', P]],
    [['        ', P], ['FeatureList', T], ['(),', P]],
    [['        ', P], ['StartButton', T], ['(),', P]],
    [['      ]),', P]],
    [['    );', P]],
    [['  }', P]],
    [['}', P]],
  ];
  const TOTAL = CODE.reduce((n, l) => n + l.reduce((m, [t]) => m + t.length, 0), 0);
  function drawCode(ctx, W, H, chars, blink) {
    ctx.fillStyle = C.bar;
    ctx.fillRect(0, 0, W, 58);
    ['#ff5f57', '#febc2e', '#28c840'].forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(30 + i * 26, 29, 8, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#0d0f14';
    rr(ctx, 120, 14, 170, 44, 8);
    ctx.fill();
    ctx.font = `500 16px ${MONO}`;
    ctx.fillStyle = C.ink;
    ctx.fillText('main.dart', 150, 42);
    // kenar çubuğu
    ctx.fillStyle = '#10131a';
    ctx.fillRect(0, 58, 220, H - 58);
    ['lib/', '  main.dart', '  screens/', '  widgets/', 'pubspec.yaml'].forEach((f, i) => {
      ctx.fillStyle = i === 1 ? C.ink : C.muted;
      ctx.fillText(f, 24, 104 + i * 34);
    });
    ctx.font = `500 26px ${MONO}`;
    let left = chars, cx = 300, cy = 110;
    CODE.forEach((line, i) => {
      const y = 110 + i * 46;
      ctx.fillStyle = '#3a404c';
      ctx.fillText(String(i + 1).padStart(2, ' '), 244, y);
      if (left <= 0) return;
      let x = 300;
      for (const [txt, col] of line) {
        if (left <= 0) break;
        const part = txt.slice(0, left);
        ctx.fillStyle = col;
        ctx.fillText(part, x, y);
        x += ctx.measureText(part).width;
        left -= part.length;
      }
      cx = x; cy = y;
    });
    if (blink) {
      ctx.fillStyle = C.blue;
      ctx.fillRect(cx + 2, cy - 24, 3, 30);
    }
  }

  function stageChip(ctx, W, H, idx) {
    const label = `${idx + 1}/4 · ${STAGES[idx]}`;
    ctx.font = `600 20px ${SANS}`;
    const w = ctx.measureText(label).width + 44;
    rr(ctx, W - w - 24, H - 62, w, 40, 20);
    ctx.fillStyle = idx === 3 ? 'rgba(62,207,142,0.16)' : 'rgba(79,140,255,0.16)';
    ctx.fill();
    ctx.fillStyle = idx === 3 ? C.green : C.blue;
    ctx.beginPath();
    ctx.arc(W - w - 4, H - 42, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C.ink;
    ctx.fillText(label, W - w + 6, H - 35);
  }

  function drawLaptopStage(ctx, s, k, chars, blink) {
    const W = lap.c.width, H = lap.c.height;
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);
    if (s === 0) {
      browserChrome(ctx, W, STAGES[0], 'localhost:4321', false);
      drawPage(ctx, 'wire', 1);
    } else if (s === 1) {
      browserChrome(ctx, W, STAGES[1], 'localhost:4321', false);
      drawPage(ctx, 'wire', 1);
      drawPage(ctx, 'design', k);
    } else if (s === 2) {
      drawCode(ctx, W, H, chars, blink);
    } else {
      browserChrome(ctx, W, '', 'codeba.dev', true);
      drawPage(ctx, 'design', 1);
      ctx.globalAlpha = ease(k * 3);
      rr(ctx, W - 230, 74, 190, 44, 22);
      ctx.fillStyle = 'rgba(62,207,142,0.16)';
      ctx.fill();
      ctx.fillStyle = C.green;
      ctx.beginPath();
      ctx.arc(W - 206, 96, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `600 19px ${SANS}`;
      ctx.fillText(STAGES[3], W - 190, 103);
      ctx.globalAlpha = 1;
    }
    stageChip(ctx, W, H, s);
  }

  // --- telefon ---
  const PBLOCKS = [
    { y: 200, h: 290, kind: 'hero' },
    { y: 510, h: 120, kind: 'row' },
    { y: 646, h: 120, kind: 'row' },
    { y: 782, h: 120, kind: 'row' },
  ];
  function drawPhoneStage(ctx, s, k, codeP, t) {
    const W = ph.c.width, H = ph.c.height;
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = C.ink;
    ctx.font = `600 28px ${SANS}`;
    ctx.fillText('9:41', 52, 66);
    ctx.fillRect(W - 100, 46, 50, 22);
    const wire = s === 0;
    const appear = (i) => (s === 1 ? ease(k * 6 - i) : 1);
    // başlık
    if (wire) {
      ctx.setLineDash([10, 8]);
      ctx.strokeStyle = C.line;
      ctx.lineWidth = 3;
      rr(ctx, 40, 120, 240, 44, 10);
      ctx.stroke();
    } else {
      ctx.globalAlpha = appear(0);
      ctx.fillStyle = C.ink;
      ctx.font = `700 46px ${SANS}`;
      ctx.fillText('codeba', 40, 160);
      ctx.globalAlpha = 1;
    }
    PBLOCKS.forEach((b, i) => {
      if (wire) {
        rr(ctx, 36, b.y, W - 72, b.h, 26);
        ctx.stroke();
        return;
      }
      const a = appear(i + 1);
      if (a <= 0) return;
      ctx.globalAlpha = a;
      const off = (1 - a) * 30;
      rr(ctx, 36, b.y + off, W - 72, b.h, 26);
      ctx.fillStyle = b.kind === 'hero' ? C.deep : C.card;
      ctx.fill();
      if (b.kind === 'hero') {
        ctx.fillStyle = C.blue;
        rr(ctx, 68, b.y + off + 40, 160, 22, 11);
        ctx.fill();
        ctx.fillStyle = C.ink;
        rr(ctx, 68, b.y + off + 96, 340, 34, 12);
        ctx.fill();
        rr(ctx, 68, b.y + off + 146, 260, 34, 12);
        ctx.fill();
        ctx.fillStyle = '#5b6b8c';
        rr(ctx, 68, b.y + off + 214, 300, 18, 9);
        ctx.fill();
      } else {
        ctx.fillStyle = '#26324a';
        rr(ctx, 64, b.y + off + 28, 64, 64, 18);
        ctx.fill();
        ctx.fillStyle = '#c4c8d0';
        rr(ctx, 152, b.y + off + 36, 240, 22, 11);
        ctx.fill();
        ctx.fillStyle = '#4a515e';
        rr(ctx, 152, b.y + off + 72, 170, 16, 8);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    });
    // buton
    if (wire) {
      rr(ctx, 36, 980, W - 72, 92, 46);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      const a = appear(5);
      ctx.globalAlpha = a;
      rr(ctx, 36, 980 + (1 - a) * 20, W - 72, 92, 46);
      ctx.fillStyle = C.blue;
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = `600 34px ${SANS}`;
      ctx.textAlign = 'center';
      ctx.fillText(EN ? 'Get started' : 'Başla', W / 2, 1038 + (1 - a) * 20);
      ctx.textAlign = 'left';
      ctx.globalAlpha = 1;
    }
    // kod aşaması: her satırda "anında yenile" bildirimi
    if (s === 2) {
      const pulse = clamp01(1 - ((codeP * CODE.length) % 1) * 2.2);
      ctx.globalAlpha = pulse;
      rr(ctx, W / 2 - 150, 914, 300, 52, 26);
      ctx.fillStyle = 'rgba(79,140,255,0.92)';
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = `600 24px ${SANS}`;
      ctx.textAlign = 'center';
      ctx.fillText(EN ? '⚡ Hot reload' : '⚡ Anında yenilendi', W / 2, 949);
      ctx.textAlign = 'left';
      ctx.globalAlpha = 1;
    }
    // yayında: üstten bildirim
    if (s === 3) {
      const a = ease(k * 4);
      const y = -90 + a * 180;
      rr(ctx, 28, y, W - 56, 96, 28);
      ctx.fillStyle = 'rgba(30,33,40,0.96)';
      ctx.fill();
      ctx.fillStyle = C.green;
      ctx.beginPath();
      ctx.arc(76, y + 48, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.ink;
      ctx.font = `600 26px ${SANS}`;
      ctx.fillText('codeba', 104, y + 42);
      ctx.fillStyle = C.muted;
      ctx.font = `400 22px ${SANS}`;
      ctx.fillText(EN ? 'Your app is live ✓' : 'Uygulama yayında ✓', 104, y + 74);
    }
  }

  // aşamalar arası yumuşak geçiş: önceki aşamanın üstüne yenisi soluklaşarak gelir
  const lapPrev = document.createElement('canvas');
  lapPrev.width = lap.c.width;
  lapPrev.height = lap.c.height;
  const phPrev = document.createElement('canvas');
  phPrev.width = ph.c.width;
  phPrev.height = ph.c.height;

  // =====================================================================
  // ETKİLEŞİM: sürükle-çevir + kaydırma ile kamera turu
  // =====================================================================
  let dragYaw = 0, dragPitch = 0, vYaw = 0, dragging = false, lx = 0, ly = 0, hover = { x: 0, y: 0 };
  canvas.style.touchAction = 'pan-y';
  canvas.style.cursor = 'grab';
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    lx = e.clientX;
    ly = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    hover.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    hover.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    lx = e.clientX;
    ly = e.clientY;
    vYaw = dx * 0.007;
    dragYaw += vYaw;
    dragPitch = Math.max(-0.25, Math.min(0.35, dragPitch + dy * 0.003));
  });
  const endDrag = () => {
    dragging = false;
    canvas.style.cursor = 'grab';
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => { hover.x = 0; hover.y = 0; });

  const host = canvas.closest('section') || canvas.parentElement;
  function scrollProgress() {
    const r = host.getBoundingClientRect();
    return clamp01(-r.top / Math.max(1, r.height));
  }

  let aspect = 1;
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  function placeCamera(sp) {
    // dar alanda geri çekil; kaydırdıkça cihazların etrafında dön ve alçal
    const fit = Math.max(1, 1.25 / aspect);
    const orbit = -0.15 + sp * 0.9;
    const dist = 10.2 * fit;
    const height = 3.2 - sp * 1.6;
    camera.position.set(look.x + Math.sin(orbit) * dist, look.y + height * fit * 0.6, look.z + Math.cos(orbit) * dist);
    camera.lookAt(look);
  }

  // =====================================================================
  // ZAMAN ÇİZELGESİ
  // =====================================================================
  const INTRO = 1.3;
  const DUR = [3.2, 3.8, 5.0, 4.5];
  const CYCLE = DUR.reduce((a, b) => a + b, 0);
  function stageAt(time) {
    let t = ((time - INTRO) % CYCLE + CYCLE) % CYCLE;
    for (let i = 0; i < 4; i++) {
      if (t < DUR[i]) return { s: i, k: t / DUR[i], el: t };
      t -= DUR[i];
    }
    return { s: 3, k: 1, el: 0 };
  }

  let lastStage = -1, stageStart = 0, lastSig = '';
  let yaw = 0, pitch = 0;

  function paint(time, final) {
    const st = final ? { s: 3, k: 1, el: 99 } : time < INTRO ? { s: 0, k: 0, el: 0 } : stageAt(time);
    if (st.s !== lastStage) {
      lapPrev.getContext('2d').drawImage(lap.c, 0, 0);
      phPrev.getContext('2d').drawImage(ph.c, 0, 0);
      stageStart = time;
      if (lastStage !== -1 || final) canvas.dispatchEvent(new CustomEvent('stage', { detail: st.s }));
      else canvas.dispatchEvent(new CustomEvent('stage', { detail: 0 }));
      lastStage = st.s;
    }
    const chars = st.s === 2 ? Math.min(TOTAL, Math.floor((st.el / (DUR[2] * 0.85)) * TOTAL)) : TOTAL;
    const blink = Math.floor(time * 2) % 2 === 0;
    const fade = final ? 1 : clamp01((time - stageStart) / 0.45);
    const sig = `${st.s}|${Math.round(st.k * 60)}|${chars}|${blink}|${fade.toFixed(2)}`;
    if (sig === lastSig) return;
    lastSig = sig;
    for (const [tgt, prev, draw] of [
      [lap, lapPrev, () => drawLaptopStage(lap.ctx, st.s, st.k, chars, blink)],
      [ph, phPrev, () => drawPhoneStage(ph.ctx, st.s, st.k, chars / TOTAL, time)],
    ]) {
      draw();
      if (fade < 1) {
        tgt.ctx.globalAlpha = 1 - fade;
        tgt.ctx.drawImage(prev, 0, 0);
        tgt.ctx.globalAlpha = 1;
      }
      tgt.tex.needsUpdate = true;
    }
  }

  function frame(time) {
    // giriş: kapak açılır, telefon aşağıdan yükselir
    const open = ease(time / 1.2);
    hinge.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.03, -0.24, open);
    const up = ease((time - 0.6) / 1.1);
    phone.position.set(PHONE_HOME.x, THREE.MathUtils.lerp(-2.4, PHONE_HOME.y, up) + Math.sin(time * 1.1) * 0.04, PHONE_HOME.z);
    phone.rotation.set(-0.05, -0.42 + (1 - up) * 0.6, (1 - up) * 0.35);

    paint(time, false);

    if (!dragging) {
      vYaw *= 0.94;
      dragYaw += vYaw;
      dragYaw *= 0.985; // bırakınca yavaşça yerine döner
      dragPitch *= 0.97;
    }
    const tYaw = dragYaw + Math.sin(time * 0.3) * 0.07 + hover.x * 0.08;
    const tPitch = dragPitch + hover.y * 0.03;
    yaw += (tYaw - yaw) * 0.12;
    pitch += (tPitch - pitch) * 0.12;
    root.rotation.set(pitch, yaw, 0);
    placeCamera(scrollProgress());
    renderer.render(scene, camera);
  }

  if (reduce) {
    hinge.rotation.x = -0.24;
    phone.position.copy(PHONE_HOME);
    phone.rotation.set(-0.05, -0.42, 0);
    paint(0, true);
    placeCamera(0);
    renderer.render(scene, camera);
    return;
  }

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  const t0 = performance.now();
  renderer.setAnimationLoop(() => {
    if (!visible || document.hidden) return;
    frame((performance.now() - t0) / 1000);
  });
}
