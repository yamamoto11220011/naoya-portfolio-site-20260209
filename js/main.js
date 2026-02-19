/* ============================
   Press style nav active state
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) return null;
      const section = document.querySelector(href);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  function setActive(linkToActivate) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link === linkToActivate);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    let mostVisible = null;

    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
        mostVisible = entry;
      }
    });

    if (!mostVisible) return;

    const hit = sections.find((item) => item.section === mostVisible.target);
    if (hit) setActive(hit.link);
  }, {
    threshold: [0.2, 0.45, 0.7],
    rootMargin: '-10% 0px -35% 0px'
  });

  sections.forEach((item) => observer.observe(item.section));

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setActive(link);
    });
  });

  const initial = navLinks.find((link) => link.getAttribute('href') === (window.location.hash || '#chat')) || navLinks[0];
  if (initial) setActive(initial);
});
