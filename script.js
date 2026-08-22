const header = document.querySelector('[data-header]');
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const revealItems = [...document.querySelectorAll('.reveal')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px' });

  revealItems.forEach((item, index) => {
    item.classList.add('reveal-pending');
    item.style.transitionDelay = `${Math.min(index % 5, 3) * 55}ms`;
    revealObserver.observe(item);
  });

  window.setTimeout(() => {
    revealItems.forEach(item => item.classList.add('revealed'));
  }, 1800);
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 640) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
