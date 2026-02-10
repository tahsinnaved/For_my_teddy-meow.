document.addEventListener('DOMContentLoaded', () => {

  const scenes = document.querySelectorAll('.scene');
  let index = 0;
  let pressTimer = null;

  /* ---------------- Scene Control ---------------- */
  function showScene(i) {
    scenes.forEach(s => s.classList.remove('active'));
    scenes[i].classList.add('active');
    if (navigator.vibrate) navigator.vibrate(20);
  }

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.id === 'musicToggle') return;
    nextScene();
  });

  function nextScene() {
    index = Math.min(index + 1, scenes.length - 1);
    showScene(index);
  }

  /* ---------------- Music ---------------- */
  const bgm = document.getElementById('bgm');
  const toggle = document.getElementById('musicToggle');
  let playing = false;

  if (toggle && bgm) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      playing ? bgm.pause() : bgm.play();
      toggle.textContent = playing ? '🔈' : '🔊';
      playing = !playing;
    });
  }

  /* ---------------- Heart Rain ---------------- */
  const name = document.getElementById('name');
  let lastTap = 0;

  name.addEventListener('click', heartRain);
  name.addEventListener('touchend', () => {
    const now = Date.now();
    if (now - lastTap < 300) heartRain();
    lastTap = now;
  });

  function heartRain() {
    for (let i = 0; i < 18; i++) {
      const h = document.createElement('div');
      h.className = 'heart';
      h.textContent = '💖';
      h.style.left = Math.random() * 100 + 'vw';
      h.style.bottom = '0';
      h.style.fontSize = Math.random() * 28 + 18 + 'px';
      document.body.appendChild(h);

      const duration = Math.random() * 1500 + 2000;
      h.animate(
        [
          { transform: 'translateY(0)', opacity: 1 },
          { transform: `translateY(-${200 + Math.random() * 200}px)`, opacity: 0 }
        ],
        { duration, easing: 'ease-out' }
      );

      setTimeout(() => h.remove(), duration);
    }
  }

  /* ---------------- Proposal Buttons ---------------- */
  const yesBtn = document.querySelector('.yes-btn');
  const alwaysBtn = document.querySelector('.always-btn');

  function proposalResponse(message) {
    setTimeout(() => {
      alert(message);
      celebrate();
      setTimeout(nextScene, 900); // ✅ AUTO MOVE FORWARD
    }, 400);
  }

  function celebrate() {
    for (let i = 0; i < 25; i++) {
      const h = document.createElement('div');
      h.className = 'heart';
      h.textContent = '💛';
      h.style.left = Math.random() * 100 + 'vw';
      h.style.bottom = '0';
      h.style.fontSize = Math.random() * 30 + 20 + 'px';
      document.body.appendChild(h);

      const duration = Math.random() * 1500 + 2000;
      h.animate(
        [
          { transform: 'translateY(0)', opacity: 1 },
          { transform: `translateY(-${300 + Math.random() * 200}px)`, opacity: 0 }
        ],
        { duration }
      );

      setTimeout(() => h.remove(), duration);
    }
  }

  yesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    proposalResponse("She said YES 💖\nYou will never regret saying Yes!.");
  });

  alwaysBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    proposalResponse(" 🥺💛 \nI lovee youu babyyy.");
  });

  /* ---------------- Lokkhi Scene ---------------- */
  const lokkhiScene = document.getElementById('lokkhiScene');

  lokkhiScene.addEventListener('dblclick', revealLokkhi);
  lokkhiScene.addEventListener('mousedown', () => {
    pressTimer = setTimeout(revealLokkhi, 600);
  });
  lokkhiScene.addEventListener('mouseup', () => clearTimeout(pressTimer));

  function revealLokkhi() {
    typeWriter(
      lokkhiScene.querySelector('.text'),
      "You are everything i ever dreamed of, my dream girlll.\n Stay mine till death do us part",
      50
    );
  }

  /* ---------------- Hug ---------------- */
  const hugScene = document.getElementById('hugScene');
  hugScene.addEventListener('click', () => {
    hugScene.classList.add('hug');
    setTimeout(() => hugScene.classList.remove('hug'), 600);
  });

  /* ---------------- Teddy ---------------- */
  const teddyScene = document.getElementById('teddyScene');
  teddyScene.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
      alert("I try my best baby, sometimes it shows up, sonetimes it does not. I love you no matter what...🧸💛");
    }, 700);
  });
  teddyScene.addEventListener('mouseup', () => clearTimeout(pressTimer));

  /* ---------------- Typing Effect ---------------- */
  function typeWriter(el, text, speed) {
    el.innerHTML = '';
    let i = 0;
    (function type() {
      if (i < text.length) {
        el.innerHTML += text[i] === '\n' ? '<br>' : text[i];
        i++;
        setTimeout(type, speed);
      }
    })();
  }

});

