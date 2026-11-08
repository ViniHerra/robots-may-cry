/* ===========================================================================
   INTERRUPTOR DE LUZ · modo noche / modo día
   - El modo inicial lo pone un script corto en <head> (base.html), antes de
     pintar la página, para que no haya destello.
   - Aquí: accionar la palanca, guardar la elección, el "clac" y el parpadeo
     de tubo fluorescente al prender la luz.
   =========================================================================== */
(() => {
  const root = document.documentElement;
  const sw = document.getElementById('swLuz');
  const flash = document.getElementById('luzFlash');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tema = () => root.getAttribute('data-tema') === 'dia' ? 'dia' : 'noche';

  function pintar() { if (sw) sw.setAttribute('aria-checked', tema() === 'dia' ? 'true' : 'false'); }
  pintar();

  // "clac" corto, sintetizado en el navegador (sin archivos de audio)
  let ac;
  function clac(dia) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const b = ac.createBuffer(1, Math.floor(ac.sampleRate * .03), ac.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6);
      const n = ac.createBufferSource(); n.buffer = b;
      const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = dia ? 2600 : 1900; f.Q.value = 1.2;
      const g = ac.createGain(); g.gain.value = .5;
      n.connect(f).connect(g).connect(ac.destination); n.start();
    } catch (e) {}
  }

  if (!sw) return;
  sw.addEventListener('click', () => {
    const nuevo = tema() === 'dia' ? 'noche' : 'dia';
    clac(nuevo === 'dia');
    root.setAttribute('data-tema', nuevo);
    pintar();
    try { localStorage.setItem('tema', nuevo); } catch (e) {}
    if (nuevo === 'dia' && flash && !reduce) { flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); }
  });
})();
