/* ============================================
   ABD SHAKIR — Portfolio JavaScript
   Author: Abd Shakir (Hanricus)
   v2 — Optimized + Accessibility Panel
   ============================================ */

'use strict';

/* ── PERFORMANCE DETECTION ──────────────────── */
const isLowEnd = (() => {
  // Detect slow device: low RAM, slow CPU estimate, or reduced-motion preference
  const nav = navigator;
  const ramLow   = nav.deviceMemory && nav.deviceMemory <= 2;
  const coresLow = nav.hardwareConcurrency && nav.hardwareConcurrency <= 2;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return ramLow || coresLow || prefersReduced;
})();


/* ── CUSTOM CURSOR ─────────────────────────── */
(function initCursor() {
  const cursor   = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (!cursor || !follower) return;

  // Hide on touch device
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display   = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mx = -100, my = -100, fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicked'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicked'));
  document.addEventListener('mouseleave', () => { cursor.style.opacity='0'; follower.style.opacity='0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity='1'; follower.style.opacity='1'; });

  // Smooth follower — skip on low-end
  if (!isLowEnd) {
    (function raf() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
      requestAnimationFrame(raf);
    })();
  } else {
    // On low-end: follower just follows cursor directly, no smooth lag
    document.addEventListener('mousemove', e => {
      follower.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
    });
  }

  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width  = '52px';
      follower.style.height = '52px';
      follower.style.borderColor = 'rgba(168,85,247,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width  = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = '';
    });
  });
})();


/* ── NAVBAR SCROLL ─────────────────────────── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ── MOBILE HAMBURGER ──────────────────────── */
(function initHamburger() {
  const btn   = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  function openMenu() {
  links.classList.add('mobile-open');
  btn.classList.add('active');
  btn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  btn.style.zIndex = '100000'; // tambah ni — burger button nampak atas overlay
  document.body.style.position = 'fixed'; // tambah ni — prevent background scroll iOS
  document.body.style.width = '100%';     // tambah ni — prevent layout shift
}

  function closeMenu() {
  links.classList.remove('mobile-open');
  btn.classList.remove('active');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  btn.style.zIndex = ''; // tambah ni — reset balik
  document.body.style.position = ''; // tambah ni
  document.body.style.width = '';    // tambah ni
}

  btn.addEventListener('click', () => {
    links.classList.contains('mobile-open') ? closeMenu() : openMenu();
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Close bila tekan ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('mobile-open')) closeMenu();
  });
  
  // Close bila tap kat luar menu (area kosong)
  links.addEventListener('click', e => {
    if (e.target === links) closeMenu();
  });
})();


/* ── SCROLL REVEAL ─────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // On low-end: just make everything visible immediately
  if (isLowEnd) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

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

      // Low-end: skip animation, just show final value
      if (isLowEnd) {
        el.textContent = end + (el.dataset.suffix || '');
        observer.unobserve(el);
        return;
      }

      const dur  = 1500;
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


/* ── PARTICLE CANVAS ───────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  // Skip particles on low-end devices entirely
  if (isLowEnd) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let W, H, particles, rafId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    // Reduce particle count significantly for performance
    const density = 50000; // higher = fewer particles
    const count   = Math.min(Math.floor((W * H) / density), 60);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.35 + 0.05,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168,85,247,${p.opacity})`;
      ctx.fill();
    }
    rafId = requestAnimationFrame(draw);
  }

  // Pause particles when tab is hidden — saves battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(draw);
    }
  });

  resize();
  createParticles();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); createParticles(); }, 200);
  }, { passive: true });
})();


/* ── SMOOTH SCROLL ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: isLowEnd ? 'auto' : 'smooth' });
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


/* ── GLITCH / CODE REVEAL ──────────────────── */
(function initCodeReveal() {
  // Skip heavy glitch effect on low-end
  if (isLowEnd) return;

  const chars = '01アイウエオカキ304951<>{}[];#@!%$';

  function scramble(el, finalText, duration) {
    let frame = 0;
    const totalFrames = Math.floor(duration / 40);
    const timer = setInterval(() => {
      const progress = frame / totalFrames;
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') { result += ' '; continue; }
        result += i < Math.floor(progress * finalText.length)
          ? finalText[i]
          : chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = result;
      frame++;
      if (frame > totalFrames) { el.textContent = finalText; clearInterval(timer); }
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

  document.querySelectorAll('.section-title, .project-title, .hero-tag').forEach(el => {
    observer.observe(el);
  });
})();


/* ══════════════════════════════════════════════
   ACCESSIBILITY PANEL (DKU Mode 🦾)
══════════════════════════════════════════════ */
(function initA11yPanel() {

  // ── Build HTML ──
  const btn = document.createElement('button');
  btn.id = 'a11y-btn';
  btn.setAttribute('aria-label', 'Accessibility Settings');
  btn.setAttribute('title', 'Accessibility / DKU Mode');
  btn.innerHTML = `<i class='bx bx-rocket'></i>`;

  const panel = document.createElement('div');
  panel.id = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Accessibility Settings');
  panel.innerHTML = `
    <div class="a11y-panel-title"><i class='bx bx-slider-alt'></i> DKU Accessibility</div>

    <div class="a11y-row">
      <span class="a11y-label"><i class='bx bx-run'></i> Reduced Motion</span>
      <label class="a11y-toggle">
        <input type="checkbox" id="toggle-motion">
        <span class="a11y-slider"></span>
      </label>
    </div>

    <div class="a11y-row">
      <span class="a11y-label"><i class='bx bx-sun'></i> High Contrast</span>
      <label class="a11y-toggle">
        <input type="checkbox" id="toggle-contrast">
        <span class="a11y-slider"></span>
      </label>
    </div>

    <div class="a11y-row">
      <span class="a11y-label"><i class='bx bx-pause-circle'></i> Pause Particles</span>
      <label class="a11y-toggle">
        <input type="checkbox" id="toggle-particles">
        <span class="a11y-slider"></span>
      </label>
    </div>

    <div style="border-top:1px solid var(--border-subtle);padding-top:12px">
      <div class="a11y-label" style="margin-bottom:8px"><i class='bx bx-text'></i> Font Size</div>
      <input type="range" class="a11y-font-slider" id="font-slider"
             min="90" max="130" step="5" value="100">
      <div style="font-family:var(--font-mono);font-size:0.6rem;color:var(--text-muted);
                  text-align:right;margin-top:4px" id="font-slider-label">100%</div>
    </div>
  `;

  // ── Notification hint ──
  const hint = document.createElement('div');
  hint.id = 'a11y-hint';
  hint.innerHTML = `<i class='bx bx-zap'></i> Lagging? Tap to optimize`;

  document.body.appendChild(panel);
  document.body.appendChild(btn);
  document.body.appendChild(hint);

  // Show hint after 3s, hide after 6s — only on first visit
  if (!localStorage.getItem('a11y-hint-seen')) {
    setTimeout(() => hint.classList.add('show'), 3000);
    setTimeout(() => {
      hint.classList.remove('show');
      localStorage.setItem('a11y-hint-seen', '1');
    }, 9000);
  }

  // ── Toggle panel ──
  let ignoreNextDoc = false;

  btn.addEventListener('pointerup', e => {
    e.stopPropagation();
    ignoreNextDoc = true;
    panel.classList.toggle('open');
    hint.classList.remove('show');
    // Reset flag lepas event cycle habis
    setTimeout(() => { ignoreNextDoc = false; }, 10);
  });

  // Close if tap/click outside — guna flag supaya tak close terus masa toggle
  document.addEventListener('pointerup', e => {
    if (ignoreNextDoc) return;
    if (!panel.contains(e.target) && e.target !== btn) {
      panel.classList.remove('open');
    }
  });

  // ── Load saved preferences ──
  const prefs = JSON.parse(localStorage.getItem('a11y-prefs') || '{}');

  function applyPrefs() {
    document.body.classList.toggle('reduced-motion', !!prefs.motion);
    document.body.classList.toggle('high-contrast',  !!prefs.contrast);

    // Canvas off kalau either reduced-motion OR pause-particles aktif
    const canvas = document.getElementById('particle-canvas');
    if (canvas) canvas.style.display = (prefs.motion || prefs.particles) ? 'none' : '';

    document.documentElement.style.fontSize = (prefs.fontSize || 100) + '%';
    document.getElementById('toggle-motion').checked    = !!prefs.motion;
    document.getElementById('toggle-contrast').checked  = !!prefs.contrast;
    document.getElementById('toggle-particles').checked = !!prefs.particles;
    document.getElementById('font-slider').value        = prefs.fontSize || 100;
    document.getElementById('font-slider-label').textContent = (prefs.fontSize || 100) + '%';
  }

  applyPrefs();

  function save() {
    localStorage.setItem('a11y-prefs', JSON.stringify(prefs));
  }

  document.getElementById('toggle-motion').addEventListener('change', e => {
    prefs.motion = e.target.checked;
    document.body.classList.toggle('reduced-motion', prefs.motion);
    // Bila reduced motion ON — matikan particles sekali
    const canvas = document.getElementById('particle-canvas');
    if (canvas) canvas.style.display = prefs.motion ? 'none' : (prefs.particles ? 'none' : '');
    save();
  });

  document.getElementById('toggle-contrast').addEventListener('change', e => {
    prefs.contrast = e.target.checked;
    document.body.classList.toggle('high-contrast', prefs.contrast);
    save();
  });

  document.getElementById('toggle-particles').addEventListener('change', e => {
    prefs.particles = e.target.checked;
    const canvas = document.getElementById('particle-canvas');
    if (canvas) canvas.style.display = prefs.particles ? 'none' : '';
    save();
  });

  document.getElementById('font-slider').addEventListener('input', e => {
    prefs.fontSize = parseInt(e.target.value);
    document.documentElement.style.fontSize = prefs.fontSize + '%';
    document.getElementById('font-slider-label').textContent = prefs.fontSize + '%';
    save();
  });

  // Auto-apply reduced motion if OS prefers it
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !prefs.hasOwnProperty('motion')) {
    prefs.motion = true;
    applyPrefs();
    save();
  }
})();

/* ── SKILL DETAIL PANEL ────────────────────── */
(function initSkillDetail() {
  const pills  = document.querySelectorAll('.skill-pill[data-level]');
  const panel  = document.getElementById('skill-detail');
  const name   = document.getElementById('skill-detail-name');
  const pct    = document.getElementById('skill-detail-pct');
  const bar    = document.getElementById('skill-bar-fill');
  const desc   = document.getElementById('skill-detail-desc');
  if (!pills.length || !panel) return;

  let active = null;

  pills.forEach(pill => {
    pill.style.cursor = 'pointer';
    pill.setAttribute('role', 'button');
    pill.setAttribute('tabindex', '0');

    function toggle() {
      const isSame = active === pill;

      // Reset semua
      pills.forEach(p => p.classList.remove('selected'));
      bar.style.width = '0%';

      if (isSame) {
        // Klik sama — tutup panel
        panel.classList.remove('active');
        active = null;
        return;
      }

      // Buka panel baru
      active = pill;
      pill.classList.add('selected');

      const skillName = pill.querySelector('.skill-pill-icon')
        ? pill.textContent.trim()
        : pill.textContent.trim();
      const level = pill.dataset.level;
      const skillDesc = pill.dataset.desc;

      name.textContent = skillName;
      pct.textContent  = level + '%';
      desc.textContent = skillDesc;

      // Re-trigger animation
      panel.classList.remove('active');
      void panel.offsetWidth; // reflow
      panel.classList.add('active');

      // Bar animate — delay sikit bagi panel render dulu
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = level + '%';
        });
      });

      // Scroll panel masuk view kalau mobile
      setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }

    pill.addEventListener('click', toggle);
    pill.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
})();

/* ── PROJECT MODAL ─────────────────────────── */
(function initProjectModal() {

  /* ====================================================
     EDIT DATA PROJECT KO DI SINI
     images: array gambar — letak path gambar ko
     links:  array link — boleh letak live site, github, etc
  ==================================================== */
  const projectData = {
    lunas: {
      icon: `<i class='bx bx-cart-alt'></i>`,
      badge: '⭐ Featured · Industrial Internship',
      title: 'LUNAS E-Shop System',
      org: 'Lumut Naval Shipyard (LUNAS) · Lumut, Perak',
      desc: `Sistem e-commerce dalaman yang dibangunkan khusus untuk keperluan Lumut Naval Shipyard semasa tempoh internship. Platform ini membolehkan pengurusan katalog produk, pemprosesan pesanan, dan rekod transaksi secara digital — menggantikan proses manual yang tidak efisien dan mengurangkan kesilapan data.`,
      tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'REST API'],
      images: [
        'images/lunas-eshop.png',
        'images/lunas1.png',
        'images/lunas2.png',
        'images/lunas3.png',
        'images/lunas4.png',
        'images/lunas5.png',
        'images/lunas6.png',
        'images/lunas7.png',
        'images/lunas8.png',
        /* tambah gambar lain kalau ada: 'images/lunas-2.png', */
      ],
      links: [
        { label: '<i class=\'bx bx-link-external\'></i> Visit Live Site', url: 'http://58.26.246.69:8080/eshop/public', type: 'primary' },
        /* { label: '<i class=\'bx bxl-github\'></i> GitHub', url: '#', type: 'secondary' }, */
      ]
    },
    madrasah: {
      icon: `<i class='bx bx-book-reader'></i>`,
      badge: 'Web · CMS Development',
      title: 'Madrasah CMS Portal',
      org: 'Maima Jdarul Ikhlas',
      desc: `Platform pengurusan kandungan (CMS) yang dibangunkan untuk institusi Madrasah. Memudahkan pihak pengurusan mengemas kini kos operasi, penempatan, galeri, dan maklumat awam secara mandiri tanpa memerlukan kemahiran teknikal. Domain aktif dan boleh dicapai oleh orang awam.`,
      tags: ['WordPress', 'CMS', 'Web Hosting', 'PHP', 'MySQL'],
      images: [
        'images/madrasah-melaka.png',
        'images/madrasah1.png',
        'images/madrasah2.png',
        'images/madrasah3.png',
        'images/madrasah4.png',
      ],
      links: [
        { label: '<i class=\'bx bx-link-external\'></i> Visit Live Site', url: 'https://maimajdarulikhlas.com', type: 'primary' },
      ]
    },
    netsec: {
      icon: `<i class='bx bx-shield-quarter'></i>`,
      badge: 'Academic · Security Research',
      title: 'Network Security Analysis',
      org: 'Projek Akademik',
      desc: `Kajian dan analisis kelemahan rangkaian menggunakan tools seperti Wireshark untuk packet capture dan analisis traffic, serta Nmap untuk network scanning dan port enumeration. Laporan merangkumi dokumentasi kelemahan yang ditemui dan cadangan mitigasi terhadap potensi ancaman keselamatan.`,
      tags: ['Wireshark', 'Nmap', 'Kali Linux', 'Network Security', 'Penetration Testing'],
      images: [
        'images/linux1.jpg',
        'images/linux2.jpg',
        'images/linux3.jpg',
      ],
      links: [
        /* projek akademik — takde live link, boleh letak PDF report kalau ada */
        /* { label: '<i class=\'bx bx-file\'></i> View Report', url: '#', type: 'secondary' }, */
      ]
    }
  };

  /* ── DOM refs ── */
  const overlay   = document.getElementById('proj-modal');
  const closeBtn  = document.getElementById('proj-modal-close');
  const modalIcon = document.getElementById('modal-icon');
  const modalBadge= document.getElementById('modal-badge');
  const modalTitle= document.getElementById('modal-title');
  const modalOrg  = document.getElementById('modal-org');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalLinks= document.getElementById('modal-links');
  const slider    = document.getElementById('proj-slider');
  const dotsWrap  = document.getElementById('slider-dots');
  const btnPrev   = document.getElementById('slider-prev');
  const btnNext   = document.getElementById('slider-next');

  if (!overlay) return;

  let currentSlide = 0;
  let totalSlides  = 0;

  /* ── Build slider ── */
  function buildSlider(images) {
    slider.innerHTML = '';
    dotsWrap.innerHTML = '';
    currentSlide = 0;

    if (!images || images.length === 0) {
      const ph = document.createElement('div');
      ph.className = 'proj-slide-placeholder';
      ph.innerHTML = `<i class='bx bx-image'></i><span>No preview available</span>`;
      slider.appendChild(ph);
      btnPrev.style.display = 'none';
      btnNext.style.display = 'none';
      dotsWrap.style.display = 'none';
      totalSlides = 1;
      return;
    }

    totalSlides = images.length;
    btnPrev.style.display = '';
    btnNext.style.display = '';
    dotsWrap.style.display = images.length > 1 ? '' : 'none';

    images.forEach((src, i) => {
      const img = document.createElement('img');
      img.className = 'proj-slide';
      img.src = src;
      img.alt = 'Project screenshot ' + (i + 1);
      img.loading = 'lazy';
      slider.appendChild(img);

      if (images.length > 1) {
        const dot = document.createElement('div');
        dot.className = 'proj-slider-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    });

    updateSlider();
  }

  function goTo(index) {
    currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
    updateSlider();
  }

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.proj-slider-dot').forEach((d, i) =>
      d.classList.toggle('active', i === currentSlide)
    );
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === totalSlides - 1;
  }

  btnPrev.addEventListener('click', () => goTo(currentSlide - 1));
  btnNext.addEventListener('click', () => goTo(currentSlide + 1));

  /* ── Open modal ── */
  function openModal(key) {
    const data = projectData[key];
    if (!data) return;

    modalIcon.innerHTML  = data.icon;
    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalOrg.textContent   = data.org;
    modalDesc.textContent  = data.desc;

    modalTags.innerHTML = data.tags.map(t =>
      `<span class="tag">${t}</span>`
    ).join('');

    modalLinks.innerHTML = '';
    if (data.links && data.links.length > 0) {
      data.links.forEach(l => {
        const a = document.createElement('a');
        a.href = l.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = `proj-link-btn ${l.type}`;
        a.innerHTML = l.label;
        modalLinks.appendChild(a);
      });
    }

    buildSlider(data.images);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ── Close modal ── */
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft')  goTo(currentSlide - 1);
    if (e.key === 'ArrowRight') goTo(currentSlide + 1);
  });

  /* ── Bind buttons ── */
  document.querySelectorAll('.proj-detail-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.dataset.project);
    });
  });

  /* Card click pun boleh open modal ── */
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.project));
  });

})();