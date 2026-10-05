const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// Desktop pointer glow only; avoid unnecessary work on touch devices.
const glow = document.querySelector('.cursor-glow');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
if (glow && finePointer.matches) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// Mobile navigation: accessible, closes after selection, Escape, or resize.
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

function closeMenu() {
  if (!nav || !menuBtn) return;
  nav.classList.remove('mobile-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
}

function toggleMenu() {
  if (!nav || !menuBtn) return;
  const open = nav.classList.toggle('mobile-open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuBtn.textContent = open ? '×' : '☰';
}

menuBtn?.setAttribute('aria-expanded', 'false');
menuBtn?.addEventListener('click', toggleMenu);
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 850) closeMenu();
}, { passive: true });
