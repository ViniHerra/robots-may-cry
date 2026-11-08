/* ===========================================================================
   PORTADA · comportamiento del banco de trabajo a pantalla completa
   - La linterna sigue al mouse (o al dedo cuando tocas sin deslizar).
   - En celular la escena es más ancha que la pantalla: se recorre deslizando.
   - Los puntos (.hs) abren su sección; se definen en portada-escena.html.
   - Neón que falla, ventanas de la ciudad y el ojo del robot.
   - Rendimiento: el bucle solo escribe en la página cuando algo cambió;
     en reposo no redibuja nada.
   =========================================================================== */
(() => {
  const vp = document.getElementById('vp'), scene = document.getElementById('scene');
  if (!vp || !scene) return;
  const lit = document.getElementById('lit');
  const cText = document.getElementById('cText'), cLink = document.getElementById('cLink');
  const hint = document.getElementById('hint'), mini = document.getElementById('miniBar');
  const textoInicial = cText.textContent;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- paneo (solo cuando la escena es más ancha que la pantalla) ---------
  let pan = 0, panTgt = 0, panning = false;
  const dims = () => ({sw: scene.offsetWidth, vw: vp.clientWidth});
  const tactil = matchMedia('(pointer: coarse)');   // celular o tableta
  const canPan = () => { const d = dims(); return tactil.matches && d.sw - d.vw > 40; };
  const clamp = v => { const d = dims(); return Math.max(Math.min(0, d.vw - d.sw), Math.min(0, v)); };
  function setupPan() {
    panning = canPan();
    if (panning) { scene.style.left = '0'; centerOn(0.60, true); }
    else { scene.style.left = ''; scene.style.transform = ''; }
  }
  function centerOn(fx, now) {
    if (!panning) return;
    const d = dims(); panTgt = clamp(d.vw / 2 - fx * d.sw); if (now) pan = panTgt;
    shown.pan = null;
  }

  // ---- linterna, en coordenadas de la escena -------------------------------
  const cur = {x: 52, y: 43}, tgt = {x: 52, y: 43};
  function point(e) {
    const r = scene.getBoundingClientRect();
    tgt.x = (e.clientX - r.left) / r.width * 100;
    tgt.y = (e.clientY - r.top) / r.height * 100;
  }

  let drag = null, vel = 0, lastX = 0, lastT = 0;
  vp.addEventListener('pointerdown', e => {
    if (e.target.closest('.hs, a')) return;
    drag = {x: e.clientX, y: e.clientY, pan: panTgt, horizontal: null};
    lastX = e.clientX; lastT = performance.now(); vel = 0;
    point(e);
  });
  vp.addEventListener('pointermove', e => {
    if (e.pointerType === 'mouse' && !drag) { point(e); return; }
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (drag.horizontal === null && Math.hypot(dx, dy) > 8) drag.horizontal = Math.abs(dx) > Math.abs(dy);
    if (drag.horizontal && panning) {          // al deslizar de lado, la luz se queda quieta
      panTgt = clamp(drag.pan + dx);
      const now = performance.now(); vel = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
      if (hint) hint.style.opacity = 0;
    } else if (drag.horizontal === false || !panning) point(e);
  });
  const endDrag = () => { if (drag && drag.horizontal && panning) panTgt = clamp(panTgt + vel * 220); drag = null; };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  // ---- puntos = secciones del sitio ----------------------------------------
  const btns = [...scene.querySelectorAll('.hs')];
  const eye = document.getElementById('eye');
  let pinned = -1;
  btns.forEach((b, i) => {
    b.addEventListener('pointerdown', e => e.stopPropagation());
    b.addEventListener('click', () => {
      pinned = pinned === i ? -1 : i;
      btns.forEach((o, j) => o.setAttribute('aria-pressed', j === pinned ? 'true' : 'false'));
      eye.classList.toggle('alert', pinned === 0);
      if (pinned < 0) { cText.textContent = textoInicial; cLink.hidden = true; return; }
      const d = b.dataset;
      tgt.x = +d.x; tgt.y = +d.y; centerOn(+d.x / 100);
      cText.innerHTML = '';
      const num = document.createElement('span'); num.className = 'num'; num.textContent = String(i + 1).padStart(2, '0');
      const tit = document.createElement('b'); tit.textContent = d.t + '.';
      cText.append(num, tit, ' ' + d.d);
      cLink.href = d.href; cLink.hidden = false;
    });
  });
  if (btns[0]) {
    btns[0].addEventListener('pointerenter', () => eye.classList.add('alert'));
    btns[0].addEventListener('pointerleave', () => { if (pinned !== 0) eye.classList.remove('alert'); });
  }

  const wait = ms => new Promise(r => setTimeout(r, ms));

  // ---- neón: estable, con un tartamudeo de vez en cuando ------------------
  const neon = document.getElementById('neon');
  const setNeon = s => { neon.classList.remove('off', 'dim'); if (s) neon.classList.add(s); };
  if (!reduce && neon) (async () => {
    await wait(800 + Math.random() * 1200);
    while (true) {
      const n = 2 + Math.floor(Math.random() * 4);
      for (let k = 0; k < n; k++) { setNeon(Math.random() < .6 ? 'off' : 'dim'); await wait(40 + Math.random() * 90); setNeon(''); await wait(50 + Math.random() * 160); }
      if (Math.random() < .2) { setNeon('off'); await wait(500 + Math.random() * 700); setNeon('dim'); await wait(80); setNeon(''); }
      await wait(1500 + Math.random() * 3000);
    }
  })();

  // ---- ventanas de la ciudad: se prenden y apagan de golpe ----------------
  const lights = [...document.querySelectorAll('#cityLights rect')];
  lights.forEach(r => { if (Math.random() < .72) r.classList.add('o'); });
  if (!reduce && lights.length) (function tick() {
    const n = 1 + Math.floor(Math.random() * 3);
    for (let k = 0; k < n; k++) lights[Math.floor(Math.random() * lights.length)].classList.toggle('o');
    setTimeout(tick, 500 + Math.random() * 1200);
  })();

  // ---- ojo del robot: mira hacia quien visita y parpadea -----------------
  const glint = document.getElementById('glint');
  const E = {x: 1128, y: 454, rot: -12 * Math.PI / 180};
  const look = {x: 0, y: 0}, lookTgt = {x: 0, y: 0};
  let lastPtr = -1e9;
  function aim(cx, cy) {
    const p = eye.createSVGPoint(); p.x = E.x; p.y = E.y;
    const c = p.matrixTransform(eye.getScreenCTM());
    let dx = cx - c.x, dy = cy - c.y; const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
    dx = dx / d * k; dy = dy / d * k;
    const cs = Math.cos(-E.rot), sn = Math.sin(-E.rot);
    lookTgt.x = (dx * cs - dy * sn) * 5.2; lookTgt.y = (dx * sn + dy * cs) * 10.5;
  }
  window.addEventListener('pointermove', e => { aim(e.clientX, e.clientY); lastPtr = performance.now(); }, {passive: true});
  window.addEventListener('pointerdown', e => { aim(e.clientX, e.clientY); lastPtr = performance.now(); }, {passive: true});
  setInterval(() => {                      // sin puntero: mira alrededor
    if (performance.now() - lastPtr < 4000) return;
    const a = Math.random() * Math.PI * 2, r = Math.random();
    lookTgt.x = Math.cos(a) * 5.2 * r; lookTgt.y = Math.sin(a) * 10.5 * r;
  }, 2200);
  if (!reduce) (function blink() {
    setTimeout(() => {
      eye.classList.add('blink'); setTimeout(() => eye.classList.remove('blink'), 110);
      if (Math.random() < .25) setTimeout(() => { eye.classList.add('blink'); setTimeout(() => eye.classList.remove('blink'), 90); }, 260);
      blink();
    }, 3500 + Math.random() * 5500);
  })();

  // ---- bucle: solo escribe cuando algo cambió de verdad -------------------
  const shown = {pan: null, x: null, y: null, gx: null, gy: null};
  const step = (a, b, k, e) => Math.abs(b - a) < e ? b : a + (b - a) * k;
  setupPan();
  window.addEventListener('resize', setupPan);
  (function frame() {
    pan = step(pan, panTgt, .18, .3);
    cur.x = step(cur.x, tgt.x, .12, .05); cur.y = step(cur.y, tgt.y, .12, .05);
    look.x = step(look.x, lookTgt.x, .15, .02); look.y = step(look.y, lookTgt.y, .15, .02);
    if (panning && pan !== shown.pan) {
      scene.style.transform = 'translate3d(' + pan.toFixed(1) + 'px,-50%,0)';
      if (mini) { const d = dims(); mini.style.width = (d.vw / d.sw * 100) + '%'; mini.style.left = (-pan / d.sw * 100) + '%'; }
      shown.pan = pan;
    }
    if (cur.x !== shown.x || cur.y !== shown.y) {
      lit.style.setProperty('--x', cur.x.toFixed(2) + '%'); lit.style.setProperty('--y', cur.y.toFixed(2) + '%');
      shown.x = cur.x; shown.y = cur.y;
    }
    if (look.x !== shown.gx || look.y !== shown.gy) {
      glint.setAttribute('cx', look.x.toFixed(2)); glint.setAttribute('cy', look.y.toFixed(2));
      shown.gx = look.x; shown.gy = look.y;
    }
    requestAnimationFrame(frame);
  })();
})();
