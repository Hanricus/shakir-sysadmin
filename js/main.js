/* ============================================
   ABD SHAKIR — Portfolio JavaScript
   Author: Abd Shakir (Hanricus)
   ============================================ */

'use strict';

/* ── CUSTOM CURSOR ─────────────────────────── */
(function initCursor() {
  const cursor   = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (!cursor || !follower) return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display   = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mx = -100, my = -100;
  let fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicked'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicked'));

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });

  // Smooth follower
  (function raf() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
    requestAnimationFrame(raf);
  })();

  // Expand on hover
  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width = '52px';
      follower.style.height = '52px';
      follower.style.borderColor = 'rgba(168,85,247,0.8)';
      follower.style.marginLeft = '-8px';
      follower.style.marginTop = '-8px';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = '';
      follower.style.marginLeft = '0';
      follower.style.marginTop = '0';
    });
  });
})();


/* ── NAVBAR SCROLL BEHAVIOUR ───────────────── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else                      navbar.classList.remove('scrolled');
  }, { passive: true });
})();


/* ── MOBILE HAMBURGER ──────────────────────── */
(function initHamburger() {
  const btn   = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    links.classList.toggle('mobile-open');
    const open = links.classList.contains('mobile-open');
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('mobile-open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();


/* ── SCROLL REVEAL ─────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();


/* ── ANIMATED COUNTER ──────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1500;
      const step = Math.ceil(dur / end);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + 1, end);
        el.textContent = current + (el.dataset.suffix || '');
        if (current === end) clearInterval(timer);
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* ── TYPEWRITER EFFECT ─────────────────────── */
(function initTypewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;

  const words = el.dataset.words ? JSON.parse(el.dataset.words) : [];
  if (!words.length) return;

  let wordIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const word = words[wordIndex];
    if (deleting) {
      el.textContent = word.slice(0, --charIndex);
    } else {
      el.textContent = word.slice(0, ++charIndex);
    }

    let delay = deleting ? 60 : 100;

    if (!deleting && charIndex === word.length) {
      delay = 2000;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }

    setTimeout(type, delay);
  }

  // Start after a short delay
  setTimeout(type, 800);
})();


/* ── PARTICLE CANVAS ───────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.floor((W * H) / 30000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.05,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  }, { passive: true });
})();


/* ── SMOOTH SCROLL ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── ACTIVE NAV LINK ───────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = '#a855f7';
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ── GLITCH HEIL HITLER────────────────── */
(function initCodeReveal() {
  const chars = '01アイウエオカキ304951ISRAELBABIBUTOH<>{}[];#@!%$HEILH1TLER';

  function scramble(el, finalText, duration) {
    let frame = 0;
    const totalFrames = Math.floor(duration / 40);
    const timer = setInterval(() => {
      const progress = frame / totalFrames;
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') { result += ' '; continue; }
        if (i < Math.floor(progress * finalText.length)) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = result;
      frame++;
      if (frame > totalFrames) {
        el.textContent = finalText;
        clearInterval(timer);
      }
    }, 40);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const original = el.dataset.original || el.textContent.trim();
      el.dataset.original = original;
      scramble(el, original, 900);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  // Apply to section titles and project titles
  document.querySelectorAll('.section-title, .project-title, .hero-tag').forEach(el => {
    observer.observe(el);
  });
})();