/* ══════════════════════════════════════
   PORTFOLIO SCRIPTS
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ── Mobile menu toggle ──
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.className = mobileMenu.classList.contains('open') ? 'bi bi-x-lg' : 'bi bi-list';
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelector('i').className = 'bi bi-list';
    });
  });

  // ── Scroll Reveal ──
  const srElements = document.querySelectorAll('.sr');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  srElements.forEach(el => observer.observe(el));

  // ── Auto-apply SR to section children ──
  const autoSRSelectors = [
    '.study-card',
    '.timeline-card',
    '.project-card',
    '.featured-project',
    '.soft-skill-card',
    '.contact-card',
    '.tech-box',
    '.skills-card',
  ];

  autoSRSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('sr');
      if (i < 4) el.classList.add(`sr-delay-${i + 1}`);
    });
  });

  // Re-observe after class addition
  document.querySelectorAll('.sr:not(.visible)').forEach(el => observer.observe(el));

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Typing effect for hero subtitle ──
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    const original = heroSub.innerHTML;
    // Just keep the text, no typing animation needed for multiline
    // Subtle fade in via CSS handles this
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 64; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Orbit dots hover pause ──
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('mouseenter', () => {
      document.querySelectorAll('.orbit-ring').forEach(ring => {
        ring.style.animationPlayState = 'paused';
      });
    });
    heroVisual.addEventListener('mouseleave', () => {
      document.querySelectorAll('.orbit-ring').forEach(ring => {
        ring.style.animationPlayState = 'running';
      });
    });
  }

});
