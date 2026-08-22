/* ══════════════════════════════════════════════
   SCRIPT.JS — Toi et Moi ❤️
   ══════════════════════════════════════════════ */

// ── CONFIGURACIÓN ──────────────────────────────
const TYPEWRITER_TEXT =
  'Gracias por llenar mi vida de momentos tan hermosos, ' +
  'dulces e inolvidables. Eres mi lugar favorito. 🌷';

const TYPEWRITER_SPEED = 42;

// ── ESTADO ─────────────────────────────────────
let musicPlaying  = false;
let currentScene  = 1;

// ── INIT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showScene(1);
  bindEvents();
  initMusic();
});

// ── MOSTRAR ESCENA ─────────────────────────────
function showScene(n) {
  document.querySelectorAll('.scene').forEach(s => {
    s.classList.remove('visible');
    s.classList.add('hidden');
  });

  const target = document.getElementById(`scene-${n}`);
  if (!target) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.classList.remove('hidden');
      target.classList.add('visible');
      currentScene = n;

      // Acciones específicas por escena
      if (n === 2) runScene2();
      if (n === 3) runScene3();
      if (n === 4) runScene4();
      if (n === 5) runScene5();
      if (n === 6) runScene6();
    });
  });
}

// ── EVENTOS ────────────────────────────────────
function bindEvents() {
  // Escena 1 → 2
  document.getElementById('btn-comenzar')
    .addEventListener('click', () => {
      triggerFlash(() => showScene(2));
    });

  // Escena 3 → 4 (botón Abrázame)
  document.getElementById('btn-abrazo')
    .addEventListener('click', () => {
      runScene4Transition();
    });

  // Escena 5 → 6
  document.getElementById('btn-sobre')
    .addEventListener('click', () => {
      triggerFlash(() => showScene(6));
    });

  // Reiniciar
  document.getElementById('btn-restart')
    .addEventListener('click', () => {
      resetAll();
      triggerFlash(() => showScene(1));
    });

  // Música
  document.getElementById('music-btn')
    .addEventListener('click', toggleMusic);
}

// ── FLASH GLOBAL ───────────────────────────────
function triggerFlash(callback, duration = 580) {
  const flash = document.getElementById('flash-overlay');
  flash.classList.add('flash-active');
  playShutterSound();
  setTimeout(() => {
    flash.classList.remove('flash-active');
    if (callback) callback();
  }, duration);
}

// Sonido shutter sintético
function playShutterSound() {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.22);
  } catch (_) {}
}

// ══════════════════════════════════════════════
// ESCENA 2 — Flash de cámara + Polaroid
// ══════════════════════════════════════════════
function runScene2() {
  const cameraImg  = document.querySelector('.s2-camera-img');
  const flashBurst = document.getElementById('s2-flash-burst');
  const polaroidWrap = document.getElementById('polaroid-wrap');
  const polaroidReveal = document.getElementById('polaroid-reveal');

  // Resetear
  polaroidWrap.classList.add('hidden');
  polaroidWrap.classList.remove('ejecting');
  polaroidReveal.classList.remove('revealed');

  // 1. Cámara shake + burst
  setTimeout(() => {
    cameraImg.classList.add('shaking');
    flashBurst.classList.add('burst-active');
    playShutterSound();
  }, 600);

  // 2. Sale la polaroid
  setTimeout(() => {
    cameraImg.classList.remove('shaking');
    flashBurst.classList.remove('burst-active');
    polaroidWrap.classList.remove('hidden');
    polaroidWrap.classList.add('ejecting');
  }, 1000);

  // 3. Se revela la foto
  setTimeout(() => {
    polaroidReveal.classList.add('revealed');
  }, 1500);

  // 4. Pasar a escena 3 automáticamente
  setTimeout(() => {
    showScene(3);
  }, 3800);
}

// ══════════════════════════════════════════════
// ESCENA 3 — Carta con máquina de escribir
// ══════════════════════════════════════════════
function runScene3() {
  const el     = document.getElementById('typewriter-text');
  const btnWrap = document.getElementById('s3-btn-wrap');

  if (!el) return;

  el.textContent = '';
  el.classList.remove('done');
  btnWrap.classList.add('hidden');

  let i = 0;
  const text = TYPEWRITER_TEXT;

  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, TYPEWRITER_SPEED);
    } else {
      el.classList.add('done');
      // Mostrar botón con pequeño delay
      setTimeout(() => {
        btnWrap.classList.remove('hidden');
      }, 400);
    }
  }

  setTimeout(type, 700);
}

// ══════════════════════════════════════════════
// ESCENA 4 — Explosión / Corazones
// ══════════════════════════════════════════════
function runScene4Transition() {
  // Primero mostrar la escena 4
  showScene(4);
}

function runScene4() {
  const rainContainer = document.getElementById('rain-container');
  const rings = document.querySelectorAll('.burst-ring');

  // Limpiar
  rainContainer.innerHTML = '';
  rings.forEach(r => r.classList.remove('expanding'));

  // Activar anillos
  setTimeout(() => {
    rings.forEach(r => r.classList.add('expanding'));
  }, 100);

  // Crear lluvia de símbolos
  const symbols = ['❤️','🌸','✨','💛','🌷','⭐','💕','✦','🌺','💖'];

  setTimeout(() => {
    for (let i = 0; i < 35; i++) {
      createRainItem(rainContainer, symbols, i);
    }
  }, 200);

  // Pasar a escena 5 automáticamente
  setTimeout(() => {
    showScene(5);
  }, 2800);
}

function createRainItem(container, symbols, index) {
  const item = document.createElement('span');
  item.classList.add('rain-item');
  item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  const startX  = Math.random() * 100;         // % horizontal
  const angle   = (Math.random() - 0.5) * 180; // rotación
  const tx      = (Math.random() - 0.5) * 200; // desplazamiento X
  const ty      = -(80 + Math.random() * 160);  // sube
  const tx2     = tx + (Math.random() - 0.5) * 100;
  const ty2     = 100 + Math.random() * 200;    // baja después
  const dur     = 0.9 + Math.random() * 0.6;
  const delay   = Math.random() * 0.5;

  item.style.cssText = `
    left: ${startX}%;
    top: 50%;
    --tx:  ${tx}px;
    --ty:  ${ty}px;
    --tr:  ${angle}deg;
    --tx2: ${tx2}px;
    --ty2: ${ty2}px;
    --tr2: ${angle * 2}deg;
    --dur: ${dur}s;
    --delay: ${delay}s;
    animation-delay: ${delay}s;
    animation-duration: ${dur}s;
  `;

  container.appendChild(item);
}

// ══════════════════════════════════════════════
// ESCENA 5 — Foto colgada
// ══════════════════════════════════════════════
function runScene5() {
  const hungWrap = document.getElementById('hung-wrap');
  hungWrap.classList.remove('rising');

  // Trigger la animación de subida
  setTimeout(() => {
    hungWrap.classList.add('rising');
  }, 150);
}

// ══════════════════════════════════════════════
// ESCENA 6 — Carta final con lluvia
// ══════════════════════════════════════════════
function runScene6() {
  startLetterRain();
  animateS6Text();
}

function startLetterRain() {
  const container = document.getElementById('letter-rain');
  container.innerHTML = '';

  // Símbolos de la lluvia: tulipanes, corazones, sandías
  const symbols = ['🌷','❤️','🍉','🌸','💕','🌺','💛','✨'];
  const count   = 22;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('span');
    item.classList.add('letter-rain-item');
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left  = Math.random() * 100;
    const dur   = 4 + Math.random() * 5;
    const delay = Math.random() * 6;
    const rot   = (Math.random() - 0.5) * 60;

    item.style.cssText = `
      left: ${left}%;
      --dur: ${dur}s;
      --delay: ${delay}s;
      --rot: ${rot}deg;
      animation-delay: ${delay}s;
      animation-duration: ${dur}s;
    `;

    container.appendChild(item);
  }

  // Regenerar lluvia continuamente
  setTimeout(() => {
    if (currentScene === 6) startLetterRain();
  }, 12000);
}

function animateS6Text() {
  // Párrafos del texto
  const paragraphs = document.querySelectorAll('#s6-text p');
  paragraphs.forEach((p, i) => {
    p.style.opacity   = '0';
    p.style.transform = 'translateY(14px)';
    p.style.transition = `
      opacity   0.65s ease ${0.5 + i * 0.2}s,
      transform 0.65s ease ${0.5 + i * 0.2}s
    `;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        p.style.opacity   = p.classList.contains('s6-highlight') ? '1' : '0.88';
        p.style.transform = 'translateY(0)';
      });
    });
  });

  // Cierre
  const closingEls = document.querySelectorAll('#s6-closing > *');
  closingEls.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = `
      opacity   0.6s ease ${1.5 + i * 0.28}s,
      transform 0.6s ease ${1.5 + i * 0.28}s
    `;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
}

// ── RESET ──────────────────────────────────────
function resetAll() {
  // Typewriter
  const tw = document.getElementById('typewriter-text');
  if (tw) { tw.textContent = ''; tw.classList.remove('done'); }

  // Botón abrazo
  const btnWrap = document.getElementById('s3-btn-wrap');
  if (btnWrap) btnWrap.classList.add('hidden');

  // Polaroid
  const pw = document.getElementById('polaroid-wrap');
  if (pw) { pw.classList.add('hidden'); pw.classList.remove('ejecting'); }

  const pr = document.getElementById('polaroid-reveal');
  if (pr) pr.classList.remove('revealed');

  // Hung wrap
  const hw = document.getElementById('hung-wrap');
  if (hw) hw.classList.remove('rising');

  // Lluvia
  const lr = document.getElementById('letter-rain');
  if (lr) lr.innerHTML = '';

  const rc = document.getElementById('rain-container');
  if (rc) rc.innerHTML = '';
}

// ── MÚSICA ─────────────────────────────────────
function initMusic() {
  document.body.addEventListener('click', () => {
    const audio = document.getElementById('bg-music');
    if (audio && !musicPlaying && audio.src &&
        !audio.src.endsWith(window.location.href)) {
      audio.play()
        .then(() => {
          musicPlaying = true;
          document.getElementById('music-btn').classList.add('playing');
          document.getElementById('music-btn').textContent = '🎶';
        })
        .catch(() => {});
    }
  }, { once: true });
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const btn   = document.getElementById('music-btn');
  if (!audio) return;

  if (musicPlaying) {
    audio.pause();
    btn.classList.remove('playing');
    btn.textContent = '🎵';
    musicPlaying = false;
  } else {
    audio.play().catch(() => {});
    btn.classList.add('playing');
    btn.textContent = '🎶';
    musicPlaying = true;
  }
}