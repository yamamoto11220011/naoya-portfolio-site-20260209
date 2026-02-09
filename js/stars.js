/* ============================
   Star Field - 宇宙背景パーティクル
   ============================ */

(function () {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  let w, h;
  let stars = [];
  let shootingStars = [];
  const STAR_COUNT = prefersReducedMotion ? 0 : (isMobile ? 70 : 140);
  const SHOOTING_INTERVAL = isMobile ? 7000 : 5000; // ms

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      alphaSpeed: (Math.random() - 0.5) * 0.008,
      drift: (Math.random() - 0.5) * 0.08,
    };
  }

  function createShootingStar() {
    const fromLeft = Math.random() > 0.5;
    return {
      x: fromLeft ? Math.random() * w * 0.3 : w * 0.7 + Math.random() * w * 0.3,
      y: Math.random() * h * 0.4,
      len: 60 + Math.random() * 100,
      speed: 8 + Math.random() * 6,
      angle: fromLeft ? 0.6 + Math.random() * 0.3 : Math.PI - 0.6 - Math.random() * 0.3,
      alpha: 1,
      life: 1,
    };
  }

  function init() {
    resize();
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(createStar());
    }
  }

  function drawStars() {
    stars.forEach(s => {
      s.alpha += s.alphaSpeed;
      if (s.alpha <= 0.2 || s.alpha >= 1) s.alphaSpeed *= -1;
      s.x += s.drift;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha})`;
      ctx.fill();
    });
  }

  function drawShootingStars() {
    shootingStars.forEach((ss, i) => {
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.life -= 0.015;
      ss.alpha = ss.life;

      if (ss.life <= 0) {
        shootingStars.splice(i, 1);
        return;
      }

      const tailX = ss.x - Math.cos(ss.angle) * ss.len;
      const tailY = ss.y - Math.sin(ss.angle) * ss.len;

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      grad.addColorStop(0, `rgba(150, 180, 255, 0)`);
      grad.addColorStop(1, `rgba(200, 220, 255, ${ss.alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  // ── Nebula / 星雲 ──
  function drawNebula() {
    if (isMobile) return;
    // 非常に薄い星雲を数か所に配置
    const nebulae = [
      { x: w * 0.15, y: h * 0.08, r: 250, color: '60, 100, 200' },
      { x: w * 0.85, y: h * 0.15, r: 200, color: '100, 60, 180' },
      { x: w * 0.5, y: h * 0.5, r: 350, color: '40, 80, 160' },
    ];

    nebulae.forEach(n => {
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      grad.addColorStop(0, `rgba(${n.color}, 0.04)`);
      grad.addColorStop(0.5, `rgba(${n.color}, 0.015)`);
      grad.addColorStop(1, `rgba(${n.color}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2);
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    drawNebula();
    drawStars();
    drawShootingStars();
    requestAnimationFrame(animate);
  }

  // 流れ星を定期的に生成
  setInterval(() => {
    if (prefersReducedMotion) return;
    if (shootingStars.length < 2) {
      shootingStars.push(createShootingStar());
    }
  }, SHOOTING_INTERVAL);

  if (STAR_COUNT === 0) {
    resize();
    return;
  }

  window.addEventListener('resize', resize);

  init();
  animate();
})();
