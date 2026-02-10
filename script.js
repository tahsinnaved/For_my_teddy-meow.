document.addEventListener('DOMContentLoaded', () => {

  const scenes = document.querySelectorAll('.scene');
  let index = 0;
  let pressTimer = null;

  function showScene(i) {
    scenes.forEach(s => s.classList.remove('active'));
    scenes[i].classList.add('active');
    if (navigator.vibrate) navigator.vibrate(20);
  }

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.id === 'musicToggle') return;
    index = (index + 1) % scenes.length;
    showScene(index);
  });

  /* Music */
  const bgm = document.getElementById('bgm');
  const toggle = document.getElementById('musicToggle');
  let playing = false;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    playing ? bgm.pause() : bgm.play();
    toggle.textContent = playing ? '🔈' : '🔊';
    playing = !playing;
  });

  /* Heart rain */
  const name = document.getElementById('name');
  let lastTap = 0;

  name.addEventListener('click', () => heartRain());
  name.addEventListener('touchend', () => {
    const now = Date.now();
    if (now - lastTap < 300) heartRain();
    lastTap = now;
  });

  function heartRain() {
    for (let i = 0; i < 15; i++) {
      const h = document.createElement('div');
      h.className = 'heart';
      h.textContent = '💖';
      h.style.left = Math.random() * 100 + 'vw';
      h.style.bottom = '0';
      h.style.fontSize = Math.random() * 30 + 20 + 'px';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 2000);
    }
  }

  /* Lokkhi */
  const lokkhiScene = document.getElementById('lokkhiScene');
  lokkhiScene.addEventListener('dblclick', revealLokkhi);
  lokkhiScene.addEventListener('mousedown', () => pressTimer = setTimeout(revealLokkhi, 600));
  lokkhiScene.addEventListener('mouseup', () => clearTimeout(pressTimer));

  function revealLokkhi() {
    typeWriter(lokkhiScene.querySelector('.text'),
      "Lokkhi mane bhalo mon, shanto, pure…\nAar sheta tumi, Oishi 💛", 50);
  }

  /* Hug */
  const hugScene = document.getElementById('hugScene');
  hugScene.addEventListener('click', () => {
    hugScene.classList.add('hug');
    setTimeout(() => hugScene.classList.remove('hug'), 600);
  });

  /* Teddy */
  const teddyScene = document.getElementById('teddyScene');
  teddyScene.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
      alert("Ami shotti try kori, Lokkhi. Tumi amar shob. 🧸💛");
    }, 700);
  });
  teddyScene.addEventListener('mouseup', () => clearTimeout(pressTimer));

  /* Proposal buttons */
  document.querySelector('.yes-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    alert("She said YES 💖\nAmi shotti lucky, Lokkhi.");
  });

  document.querySelector('.always-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    alert("Always… 🥺💛\nEi word ta amar shob.");
  });

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
