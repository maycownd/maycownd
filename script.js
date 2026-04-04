const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const scrollBar = document.querySelector('.scroll-indicator__bar');
const links = Array.from(document.querySelectorAll('.nav__link'));
const sections = Array.from(document.querySelectorAll('section'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('is-open');
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('is-open');
  });
});

const setScrollProgress = () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (scrollBar) {
    scrollBar.style.width = `${percent}%`;
  }
};

const setActiveNav = (id) => {
  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('is-active', href.replace('#', '') === id);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => observer.observe(section));
window.addEventListener('scroll', setScrollProgress);
window.addEventListener('resize', setScrollProgress);
setScrollProgress();

if (prefersReducedMotion) {
  document.documentElement.style.setProperty('--shadow', 'none');
  document.querySelectorAll('.panel-card, .card, .project-card, .stat-card, .edge-card').forEach((el) => {
    el.style.animation = 'none';
  });
}
