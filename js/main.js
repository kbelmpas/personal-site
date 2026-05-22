gsap.registerPlugin(ScrollTrigger);

// ── Hero fade in on load ──────────────────────────────────────────
const heroTl = gsap.timeline({ delay: 0.1 });
heroTl
  .from('.hero-eyebrow',  { opacity: 0, y: 12, duration: 0.5, ease: 'power3.out' })
  .from('.hero-title',    { opacity: 0, y: 28, duration: 0.7, ease: 'power3.out' }, '-=0.2')
  .from('.hero-sub',      { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  .from('.hero-buttons',  { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' }, '-=0.25');

// ── ScrollTrigger fade-ins with stagger for grids ─────────────────
gsap.utils.toArray('.services-grid .card').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0, y: 24, duration: 0.55, delay: i * 0.08, ease: 'power3.out',
  });
});

gsap.utils.toArray('.chapter-card').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    opacity: 0, x: -16, duration: 0.5, delay: i * 0.07, ease: 'power3.out',
  });
});

gsap.utils.toArray('.contact-item').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    opacity: 0, y: 16, duration: 0.45, delay: i * 0.07, ease: 'power3.out',
  });
});

gsap.utils.toArray('.fade-in').forEach(el => {
  if (el.closest('.services-grid') || el.closest('.chapters-grid') || el.closest('.contact-links')) return;
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
    opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
  });
});

// ── Navbar scroll state ───────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger menu ────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── Glass nav glider (IntersectionObserver) ───────────────────────
const glider      = document.getElementById('nav-glider');
const sectionIds  = ['about', 'services', 'ebook', 'contact'];
const sections    = sectionIds.map(id => document.getElementById(id));

const moveGlider = (index) => {
  glider.style.transform = `translateX(${index * 100}%)`;
  glider.classList.add('visible');
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = sectionIds.indexOf(entry.target.id);
      if (idx !== -1) moveGlider(idx);
    }
  });
}, {
  rootMargin: '-30% 0px -65% 0px',
  threshold: 0,
});

sections.forEach(s => { if (s) sectionObserver.observe(s); });

// ── Cyber toggle → dark/light mode ───────────────────────────────
const cyberInput = document.getElementById('cyber-toggle-input');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  cyberInput.checked = true;
}

cyberInput.addEventListener('change', () => {
  if (cyberInput.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  }
});
