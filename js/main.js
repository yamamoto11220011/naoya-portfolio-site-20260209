/* ============================
   Main JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  const I18N_STORAGE_KEY = 'portfolio_lang';
  const translations = {
    ja: {
      menu_about: 'About',
      menu_works: 'Works',
      menu_now: 'Now',
      menu_links: 'Links',
      menu_contact: 'Contact',
      menu_cta: '相談する',
      bgm_play: 'BGM 再生（44秒〜）',
      bgm_stop: 'BGM 停止'
    },
    en: {
      menu_about: 'About',
      menu_works: 'Works',
      menu_now: 'Now',
      menu_links: 'Links',
      menu_contact: 'Contact',
      menu_cta: 'Contact',
      bgm_play: 'Play BGM (from 0:44)',
      bgm_stop: 'Stop BGM'
    },
    id: {
      menu_about: 'Tentang',
      menu_works: 'Karya',
      menu_now: 'Sekarang',
      menu_links: 'Tautan',
      menu_contact: 'Kontak',
      menu_cta: 'Hubungi',
      bgm_play: 'Putar BGM (mulai 0:44)',
      bgm_stop: 'Hentikan BGM'
    },
    zh: {
      menu_about: '关于',
      menu_works: '作品',
      menu_now: '现在',
      menu_links: '链接',
      menu_contact: '联系',
      menu_cta: '咨询',
      bgm_play: '播放 BGM（从 0:44）',
      bgm_stop: '停止 BGM'
    },
    ko: {
      menu_about: '소개',
      menu_works: '작업',
      menu_now: '현재',
      menu_links: '링크',
      menu_contact: '문의',
      menu_cta: '상담하기',
      bgm_play: 'BGM 재생 (0:44부터)',
      bgm_stop: 'BGM 정지'
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.ja;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
  }

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

  // ── Language Menu ──
  const langSelect = document.getElementById('langSelect');
  const savedLang = localStorage.getItem(I18N_STORAGE_KEY) || 'ja';
  applyLanguage(savedLang);
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener('change', () => {
      const nextLang = langSelect.value;
      localStorage.setItem(I18N_STORAGE_KEY, nextLang);
      applyLanguage(nextLang);
      const toggle = document.getElementById('bgmToggle');
      if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
        const dict = translations[nextLang] || translations.ja;
        const label = toggle.querySelector('.link-label');
        if (label) label.textContent = dict.bgm_stop;
      }
    });
  }

  // ── BGM Toggle (YouTube background playback) ──
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmPlayerWrap = document.getElementById('bgmPlayerWrap');
  const bgmPlayer = document.getElementById('bgmPlayer');

  if (bgmToggle && bgmPlayerWrap && bgmPlayer) {
    const bgmUrl = 'https://www.youtube.com/embed/jK2aIUmmdP4?start=44&autoplay=1&loop=1&playlist=jK2aIUmmdP4';
    let isPlaying = false;
    const bgmLabel = bgmToggle.querySelector('.link-label');
    const bgmArrow = bgmToggle.querySelector('.link-arrow');

    // 背景再生専用なので常に非表示のまま動かす
    bgmPlayerWrap.hidden = false;

    bgmToggle.addEventListener('click', () => {
      const currentLang = (langSelect && langSelect.value) || localStorage.getItem(I18N_STORAGE_KEY) || 'ja';
      const dict = translations[currentLang] || translations.ja;
      if (!isPlaying) {
        bgmPlayer.src = bgmUrl;
        bgmToggle.setAttribute('aria-expanded', 'true');
        if (bgmLabel) bgmLabel.textContent = dict.bgm_stop;
        if (bgmArrow) bgmArrow.innerHTML = '<i class="fas fa-stop"></i>';
        isPlaying = true;
      } else {
        bgmPlayer.src = '';
        bgmToggle.setAttribute('aria-expanded', 'false');
        if (bgmLabel) bgmLabel.textContent = dict.bgm_play;
        if (bgmArrow) bgmArrow.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
      }
    });
  }
});
