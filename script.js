const header = document.querySelector('[data-header]');
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id], article[id]')];

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

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px' });

document.querySelectorAll('.reveal').forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 5, 3) * 55}ms`;
  revealObserver.observe(item);
});

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const sectionId = entry.target.id;
    let linkId = sectionId;
    if (sectionId === 'module-one') linkId = 'reflections';
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${linkId}`));
  });
}, { rootMargin: '-35% 0px -60% 0px' });

sections.forEach(section => navObserver.observe(section));

window.addEventListener('resize', () => {
  if (window.innerWidth > 640) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
