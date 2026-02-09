/* ============================
   Main JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger Menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // モバイルナビのリンクをクリックしたら閉じる
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Copy Template Button ──
  const copyBtn = document.getElementById('copyBtn');
  const templateBody = document.getElementById('templateBody');

  if (copyBtn && templateBody) {
    copyBtn.addEventListener('click', () => {
      const text = templateBody.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> コピー済み';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> コピー';
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // フォールバック
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyBtn.innerHTML = '<i class="fas fa-check"></i> コピー済み';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> コピー';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // ── Scroll Fade-in Animation ──
  const fadeTargets = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-body, .strengths, ' +
    '.work-card, .now-item, .link-card, .contact-template, .contact-lead, .contact-btn, ' +
    '.hero-name-row, .hero-titles, .hero-catch, .hero-lead, .hero-buttons, .hero-note, ' +
    '.chat-container'
  );

  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeTargets.forEach(el => observer.observe(el));

  // ── Active Nav Link Highlight ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ── Header Background on Scroll ──
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── BGM Toggle (YouTube start at 44s) ──
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmPlayerWrap = document.getElementById('bgmPlayerWrap');
  const bgmPlayer = document.getElementById('bgmPlayer');

  if (bgmToggle && bgmPlayerWrap && bgmPlayer) {
    const bgmUrl = 'https://www.youtube.com/embed/n4tK7LYFxI0?start=44&autoplay=1&loop=1&playlist=n4tK7LYFxI0';
    let isPlaying = false;

    bgmToggle.addEventListener('click', () => {
      if (!isPlaying) {
        bgmPlayer.src = bgmUrl;
        bgmPlayerWrap.hidden = false;
        bgmToggle.setAttribute('aria-expanded', 'true');
        bgmToggle.querySelector('.link-label').textContent = 'BGM 停止';
        bgmToggle.querySelector('.link-arrow').innerHTML = '<i class="fas fa-stop"></i>';
        isPlaying = true;
      } else {
        bgmPlayer.src = '';
        bgmPlayerWrap.hidden = true;
        bgmToggle.setAttribute('aria-expanded', 'false');
        bgmToggle.querySelector('.link-label').textContent = 'BGM 再生（44秒〜）';
        bgmToggle.querySelector('.link-arrow').innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
      }
    });
  }
});
