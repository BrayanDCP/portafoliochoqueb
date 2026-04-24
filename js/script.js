/* ============================================================
   script.js — Portfolio Brayan Choque
   Interacciones, animaciones y utilidades
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. HAMBURGER MENU (mobile)
  ────────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate bars → X
      const bars = hamburger.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = ''; s.style.opacity = '';
        });
      });
    });
  }

  /* ──────────────────────────────────────────
     2. NAVBAR — hide on scroll down, show up
  ────────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastScrollY && y > 80) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = y;

    // Active nav link
    updateActiveLink();

    // Back-to-top visibility
    backTop.classList.toggle('show', y > 400);
  }, { passive: true });

  /* ──────────────────────────────────────────
     3. ACTIVE NAV LINKS on scroll
  ────────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  /* ──────────────────────────────────────────
     4. INTERSECTION OBSERVER — reveal on scroll
  ────────────────────────────────────────── */
  const revealItems = document.querySelectorAll(
    '.tl-item, .skill-group, .project-card, .edu-card'
  );

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => revealObs.observe(el));

  /* ──────────────────────────────────────────
     5. SKILL BARS ANIMATION
  ────────────────────────────────────────── */
  const skillsSection = document.getElementById('habilidades');
  let barsAnimated = false;

  const skillsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !barsAnimated) {
      barsAnimated = true;
      document.querySelectorAll('.skill-fill').forEach(bar => {
        const pct = bar.dataset.pct;
        setTimeout(() => { bar.style.width = pct + '%'; }, 150);
      });
    }
  }, { threshold: 0.25 });

  if (skillsSection) skillsObs.observe(skillsSection);

  /* ──────────────────────────────────────────
     6. SMOOTH SCROLL for in-page anchors
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────
     7. BACK TO TOP button
  ────────────────────────────────────────── */
  const backTop = document.createElement('button');
  backTop.className = 'back-top';
  backTop.setAttribute('aria-label', 'Volver arriba');
  backTop.innerHTML = '↑';
  document.body.appendChild(backTop);

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ──────────────────────────────────────────
     8. YEAR in footer
  ────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
