// Digambar Patil Portfolio - Global Motion & Responsive Interactions

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHideOnScrollHeader();
  initParticleBackground();
  initLiveClock();
  initScrollReveal();
  initCursorFollowBadge();
  initCursorRing();
  initCursorTrail();
  initExpandingButtons();
  initFeaturedCarousel();
  initFeaturedProjectShowcase();
  initProjectFilterTabs();
  initTestimonialCarousel();
  initStickyTocScrollSpy();
  // Phase 3 Initializers
  initMarqueeTouchPause();
  initHowIWorkAccordion();
  initCopyEmailToast();
  initMobileStickyCTA();
  // Phase 4 Initializers
  initReadingProgressBar();
  initCaseStudyTOC();
  initDecisionBlockHotspots();
  initScreenGalleryAndLightbox();
});

// 1. Ambient Subtle Floating Particles with Cursor Repulsion
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: -1000, y: -1000, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width * 0.05), 65);

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 1.6 + 0.4;
      this.density = Math.random() * 20 + 5;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.speedY = -Math.random() * 0.35 - 0.08;
      this.alpha = Math.random() * 0.35 + 0.12;
      this.baseAlpha = this.alpha;
      this.pulseSpeed = Math.random() * 0.015 + 0.005;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulsePhase += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.12;

      // Subtle cursor repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density * 0.35;
        const directionY = forceDirectionY * force * this.density * 0.35;
        this.x -= directionX;
        this.y -= directionY;
      }

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.reset();
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 181, 253, ${Math.max(0.04, this.alpha)})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  });
}

// 2. Live Pune Time Clock (Progressively enhances static "Pune, India · IST")
function initLiveClock() {
  const timeEl = document.getElementById('live-time');
  if (!timeEl) return;

  function updateClock() {
    try {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const timeString = formatter.format(new Date());
      timeEl.textContent = `Pune, India · ${timeString} IST`;
    } catch (e) {
      timeEl.textContent = 'Pune, India · IST';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 3. Scroll Reveal Animations
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// 4. Cursor Follow Arrow Badge (Interactive Elements: Featured Carousel & Footer Email)
function initCursorFollowBadge() {
  const badge = document.getElementById('cursor-badge');
  const triggerElements = document.querySelectorAll('.email-interactive-wrapper, .featured-carousel-container');
  if (!badge || !triggerElements.length) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isHovered = false;

  function handlePointerMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isHovered) {
      isHovered = true;
      currentX = mouseX;
      currentY = mouseY;
      badge.style.left = `${currentX}px`;
      badge.style.top = `${currentY}px`;
      badge.classList.add('is-active');
    }
  }

  triggerElements.forEach((el) => {
    el.addEventListener('mouseenter', handlePointerMove);
    el.addEventListener('mousemove', handlePointerMove);

    el.addEventListener('mouseleave', () => {
      isHovered = false;
      badge.classList.remove('is-active');
    });
  });

  function render() {
    if (isHovered) {
      currentX += (mouseX - currentX) * 0.3;
      currentY += (mouseY - currentY) * 0.3;
      badge.style.left = `${currentX}px`;
      badge.style.top = `${currentY}px`;
    }
    requestAnimationFrame(render);
  }

  render();
}

// 4b. Hollow Cursor Ring Follower
function initCursorRing() {
  const ring = document.getElementById('cursor-ring');
  if (!ring || window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      ringX = mouseX;
      ringY = mouseY;
      ring.classList.add('is-visible');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    ring.classList.remove('is-visible');
  });

  const interactives = 'a, button, input, textarea, select, [role="button"], .work-masonry-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target && e.target.closest && e.target.closest(interactives)) {
      ring.classList.add('is-hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target && e.target.closest && e.target.closest(interactives)) {
      ring.classList.remove('is-hovering');
    }
  });

  function render() {
    if (isVisible) {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(render);
  }
  render();
}

// 5. Featured Case Study Visual Carousel (Auto-Moving, Touch & Keyboard Accessible)
function initFeaturedCarousel() {
  const container = document.getElementById('featured-carousel-container');
  const dotsContainer = document.getElementById('featured-carousel-dots');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('.featured-slide'));
  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.dot')) : [];
  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  let isTransitioning = false;
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateDots(index) {
    dots.forEach((dot, idx) => {
      const isActive = idx === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function goToSlide(targetIndex, direction = 'next') {
    if (isTransitioning) return;
    const normalizedIndex = (targetIndex + slides.length) % slides.length;
    if (normalizedIndex === currentIndex && slides.length > 1) return;

    isTransitioning = true;
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[normalizedIndex];

    if (!prefersReducedMotion) {
      // Setup incoming slide position
      nextSlide.classList.remove('slide-out-prev', 'slide-out-next', 'active');
      nextSlide.style.transition = 'none';
      nextSlide.style.transform = direction === 'next' ? 'translateX(24px)' : 'translateX(-24px)';
      nextSlide.style.opacity = '0';
      nextSlide.style.visibility = 'visible';

      // Force reflow
      void nextSlide.offsetWidth;

      // Restore transition
      nextSlide.style.transition = '';

      // Outgoing slide animation
      currentSlide.classList.remove('active');
      currentSlide.classList.add(direction === 'next' ? 'slide-out-prev' : 'slide-out-next');

      // Incoming slide animation
      nextSlide.classList.add('active');
      nextSlide.style.transform = 'translateX(0)';
      nextSlide.style.opacity = '1';
    } else {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
    }

    currentIndex = normalizedIndex;
    updateDots(currentIndex);

    setTimeout(() => {
      slides.forEach((slide, idx) => {
        if (idx !== currentIndex) {
          slide.classList.remove('slide-out-prev', 'slide-out-next');
          slide.style.visibility = 'hidden';
          slide.style.opacity = '0';
        }
      });
      isTransitioning = false;
    }, 600);
  }

  function startAutoPlay() {
    if (prefersReducedMotion || slides.length <= 1) return;
    stopAutoPlay();
    autoTimer = setInterval(() => {
      goToSlide(currentIndex + 1, 'next');
    }, 5000);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Hover and Focus Pause / Resume
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);
  container.addEventListener('focusin', stopAutoPlay);
  container.addEventListener('focusout', startAutoPlay);

  // Parallax Tilt / Drift on Active Slide Media
  container.addEventListener('mousemove', (e) => {
    if (prefersReducedMotion) return;
    const rect = container.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    const activeMedia = container.querySelector('.featured-slide.active .featured-slide-media');
    if (activeMedia) {
      activeMedia.style.transform = `scale(1.015) translate(${normX * 10}px, ${normY * 8}px)`;
    }
  });

  container.addEventListener('mouseleave', () => {
    const allMedia = container.querySelectorAll('.featured-slide-media');
    allMedia.forEach((media) => {
      media.style.transform = '';
    });
  });

  // Dot Click Navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      if (index === currentIndex || isTransitioning) return;
      const direction = index > currentIndex ? 'next' : 'prev';
      goToSlide(index, direction);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Touch Swipe Support (Left / Right Swipe)
  let touchStartX = 0;
  let touchStartY = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    stopAutoPlay();
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        goToSlide(currentIndex + 1, 'next');
      } else {
        goToSlide(currentIndex - 1, 'prev');
      }
    }
    startAutoPlay();
  }, { passive: true });

  // Keyboard navigation on container (Left / Right arrow keys)
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1, 'next');
      stopAutoPlay();
      startAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1, 'prev');
      stopAutoPlay();
      startAutoPlay();
    }
  });

  // Start initial autoplay
  startAutoPlay();
}

// 6. Project Grid & Filter System (/work Page Redesign)
const WORK_PROJECTS_DATA = [
  {
    title: 'Tythas Control Center',
    slug: 'tythas-control-center.html',
    year: '2026',
    category: 'B2B SaaS',
    filters: ['Product'],
    filterTokens: ['product'],
    image: 'assets/images/grid/tythas',
    alt: 'Tythas Control Center — B2B SaaS'
  },
  {
    title: 'Raya',
    slug: 'raya.html',
    year: '2026',
    category: 'AI fitness coach',
    filters: ['AI', 'Mobile app'],
    filterTokens: ['ai', 'mobile-app'],
    status: 'Concept',
    image: 'assets/images/grid/raya',
    alt: 'Raya — AI fitness coach'
  },
  {
    title: 'Elixir Helps',
    slug: 'elixir-helps.html',
    year: '2025–2026',
    category: 'Web + Admin panel',
    filters: ['Product', 'Web'],
    filterTokens: ['product', 'web'],
    image: 'assets/images/grid/elixir',
    alt: 'Elixir Helps — Web + Admin panel'
  },
  {
    title: 'Soché',
    slug: 'soche.html',
    year: '2026',
    category: 'D2C e-commerce',
    filters: ['Web'],
    filterTokens: ['web'],
    image: 'assets/images/grid/soche',
    alt: 'Soché — D2C e-commerce'
  },
  {
    title: 'Before Two',
    slug: 'before-two.html',
    year: '2026',
    category: 'Operations app',
    filters: ['Mobile app'],
    filterTokens: ['mobile-app'],
    image: 'assets/images/grid/before-two',
    alt: 'Before Two — Operations app'
  },
  {
    title: 'Copper Chocs',
    slug: 'copper-chocs.html',
    year: '2025',
    category: 'Shopify store',
    filters: ['Web'],
    filterTokens: ['web'],
    image: 'assets/images/grid/copper-chocs',
    alt: 'Copper Chocs — Shopify store'
  }
];

function initWorkCursorBadge() {
  const badge = document.getElementById('work-cursor-badge');
  const mediaElements = document.querySelectorAll('.work-card-media');
  if (!badge || !mediaElements.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseX = -100, mouseY = -100;
  let currentX = -100, currentY = -100;
  let isHovered = false;
  let rafId = null;

  function render() {
    if (isHovered) {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      badge.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(1)`;
      rafId = requestAnimationFrame(render);
    }
  }

  mediaElements.forEach((media) => {
    media.addEventListener('mouseenter', (e) => {
      if (window.innerWidth < 1024 || window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      currentX = mouseX;
      currentY = mouseY;
      isHovered = true;
      badge.style.opacity = '1';
      badge.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(1)`;
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    });

    media.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    media.addEventListener('mouseleave', () => {
      if (!isHovered) return;
      isHovered = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      badge.style.opacity = '0';
      badge.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(0.5)`;
    });
  });
}

function initProjectFilterTabs() {
  const grid = document.getElementById('work-projects-grid');
  const filterBtns = document.querySelectorAll('.work-filter-pill, .work-chip, .work-filter-btn');
  const projectCards = document.querySelectorAll('.work-card');
  const emptyState = document.getElementById('filter-empty-state');
  if (!grid || !projectCards.length) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Grid row layout algorithm (desktop 12-col alternating wide/narrow pattern)
  // Row 1: wide (2/3) + narrow (1/3)
  // Row 2: narrow (1/3) + wide (2/3)
  // Row 3: wide (2/3) + narrow (1/3) ... repeat
  function applyGridRowPattern(visibleCards) {
    visibleCards.forEach((card, index) => {
      card.classList.remove(
        'grid-col-wide-left',
        'grid-col-narrow-right',
        'grid-col-narrow-left',
        'grid-col-wide-right',
        'grid-col-solo',
        'is-wide',
        'is-narrow'
      );

      const rowIndex = Math.floor(index / 2) + 1;
      const isOddRow = rowIndex % 2 === 1;
      const isFirstInRow = index % 2 === 0;
      const isLastCard = index === visibleCards.length - 1;
      const isSoloInRow = isFirstInRow && isLastCard;

      if (isSoloInRow) {
        card.classList.add('grid-col-solo', 'is-wide');
      } else if (isOddRow) {
        if (isFirstInRow) {
          card.classList.add('grid-col-wide-left', 'is-wide');
        } else {
          card.classList.add('grid-col-narrow-right', 'is-narrow');
        }
      } else {
        if (isFirstInRow) {
          card.classList.add('grid-col-narrow-left', 'is-narrow');
        } else {
          card.classList.add('grid-col-wide-right', 'is-wide');
        }
      }
    });
  }

  function normalizeFilterParam(val) {
    if (!val) return 'all';
    const lower = val.toLowerCase().trim().replace(/[\s_]+/g, '-');
    if (lower === 'all') return 'all';
    if (lower === 'ai') return 'ai';
    if (lower === 'product') return 'product';
    if (lower === 'web') return 'web';
    if (lower === 'mobile' || lower === 'mobile-app' || lower === 'mobile-apps') return 'mobile-app';
    return lower;
  }

  function applyFilter(filterValue, updateUrl = true, immediate = false) {
    const normFilter = normalizeFilterParam(filterValue);

    // Update filter pill active states & aria attributes
    filterBtns.forEach((btn) => {
      const btnFilter = normalizeFilterParam(btn.getAttribute('data-filter'));
      const isActive = btnFilter === normFilter || (normFilter === 'all' && btnFilter === 'all');
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Update URL ?filter=
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (normFilter === 'all') {
        url.searchParams.set('filter', 'all');
      } else {
        url.searchParams.set('filter', normFilter);
      }
      window.history.pushState({ filter: normFilter }, '', url.toString());
    }

    const matchingCards = [];
    const nonMatchingCards = [];

    projectCards.forEach((card) => {
      const cat = (card.getAttribute('data-category') || '').toLowerCase().trim();
      const catTokens = cat.split(/[\s,]+/).map((t) => normalizeFilterParam(t));
      const match = normFilter === 'all' || catTokens.includes(normFilter);
      if (match) {
        matchingCards.push(card);
      } else {
        nonMatchingCards.push(card);
      }
    });

    if (emptyState) {
      emptyState.style.display = matchingCards.length === 0 ? 'block' : 'none';
    }

    if (immediate || isReducedMotion) {
      nonMatchingCards.forEach((card) => {
        card.style.display = 'none';
        card.style.opacity = '';
        card.style.transform = '';
        card.style.transition = '';
      });
      matchingCards.forEach((card) => {
        card.style.display = 'flex';
        card.style.opacity = '';
        card.style.transform = '';
        card.style.transition = '';
      });
      applyGridRowPattern(matchingCards);
      grid.style.minHeight = '';
      return;
    }

    // Lock grid height during filter animation to prevent sudden jumps
    const currentHeight = grid.offsetHeight;
    grid.style.minHeight = `${currentHeight}px`;

    // Outgoing animation: fade + scale 0.98 out over 250ms
    const outgoing = Array.from(projectCards).filter(
      (card) => card.style.display !== 'none' && !matchingCards.includes(card)
    );

    outgoing.forEach((card) => {
      card.style.transition = 'opacity 250ms ease, transform 250ms ease';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.98)';
      card.style.pointerEvents = 'none';
    });

    setTimeout(() => {
      nonMatchingCards.forEach((card) => {
        card.style.display = 'none';
        card.style.pointerEvents = '';
      });

      // Prepare incoming cards at scale 0.98, opacity 0
      matchingCards.forEach((card) => {
        card.style.display = 'flex';
        card.style.transition = 'none';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.98)';
      });

      // Reflow grid with new wide/narrow alternating row pattern
      applyGridRowPattern(matchingCards);

      // Force layout reflow
      void grid.offsetWidth;

      // Incoming animation: fade + scale 0.98 in over 250ms
      matchingCards.forEach((card) => {
        card.style.transition = 'opacity 250ms ease, transform 250ms ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      });

      setTimeout(() => {
        matchingCards.forEach((card) => {
          card.style.transition = '';
          card.style.opacity = '';
          card.style.transform = '';
        });
        grid.style.minHeight = '';
      }, 250);
    }, 250);
  }

  // Click & keyboard events on filter buttons
  filterBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filterValue = btn.getAttribute('data-filter');
      applyFilter(filterValue, true, false);
    });

    btn.addEventListener('keydown', (e) => {
      let targetIndex = -1;
      if (e.key === 'ArrowRight') {
        targetIndex = (index + 1) % filterBtns.length;
      } else if (e.key === 'ArrowLeft') {
        targetIndex = (index - 1 + filterBtns.length) % filterBtns.length;
      }
      if (targetIndex >= 0) {
        e.preventDefault();
        filterBtns[targetIndex].focus();
        filterBtns[targetIndex].click();
      }
    });
  });

  // Handle popstate for browser navigation (Back / Forward)
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter') || 'all';
    applyFilter(filterParam, false, false);
  });

  // Initial load check from URL ?filter=
  const initialParams = new URLSearchParams(window.location.search);
  const initialFilter = initialParams.get('filter');
  if (initialFilter) {
    applyFilter(initialFilter, false, true);
  } else {
    applyGridRowPattern(Array.from(projectCards));
  }

  // Initialize cursor badge on work card media
  initWorkCursorBadge();
}

// 7. Kind Words Testimonial Carousel (Manual Navigation)
function initTestimonialCarousel() {
  const carousel = document.getElementById('testimonial-carousel');
  const track = document.getElementById('testimonial-slider-track');
  const prevBtn = document.getElementById('testimonial-prev-btn');
  const nextBtn = document.getElementById('testimonial-next-btn');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!carousel || !track) return;

  const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
  if (!slides.length) return;

  let currentIndex = 0;
  let isTransitioning = false;

  // Build dots dynamically based on slide count
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `testimonial-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('data-index', idx);
      dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
      dot.addEventListener('click', () => {
        if (isTransitioning || idx === currentIndex) return;
        goToSlide(idx, idx > currentIndex ? 'next' : 'prev');
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(targetIndex, direction = 'next') {
    if (isTransitioning) return;
    if (slides.length <= 1) {
      const currentSlide = slides[currentIndex];
      currentSlide.style.transition = 'transform 0.18s ease';
      currentSlide.style.transform = direction === 'next' ? 'translateX(-10px)' : 'translateX(10px)';
      setTimeout(() => {
        currentSlide.style.transform = 'translateX(0)';
      }, 180);
      return;
    }

    isTransitioning = true;
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[targetIndex];

    // Setup initial position of incoming slide
    nextSlide.classList.remove('slide-out-left', 'slide-out-right', 'active');
    nextSlide.style.transition = 'none';
    nextSlide.style.transform = direction === 'next' ? 'translateX(24px)' : 'translateX(-24px)';
    nextSlide.style.opacity = '0';
    nextSlide.style.visibility = 'visible';

    // Force reflow
    void nextSlide.offsetWidth;

    // Restore transition
    nextSlide.style.transition = '';

    // Animate out current
    currentSlide.classList.remove('active');
    currentSlide.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');

    // Animate in next
    nextSlide.classList.add('active');
    nextSlide.style.transform = 'translateX(0)';
    nextSlide.style.opacity = '1';

    currentIndex = targetIndex;
    updateDots();

    setTimeout(() => {
      currentSlide.classList.remove('slide-out-left', 'slide-out-right');
      currentSlide.style.visibility = 'hidden';
      isTransitioning = false;
    }, 450);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      const targetIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(targetIndex, 'prev');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      const targetIndex = (currentIndex + 1) % slides.length;
      goToSlide(targetIndex, 'next');
    });
  }
}

// 8. Custom Refined Lavender Cursor Trail Effect (Spring / Lag Comet-Tail)
function initCursorTrail(options = {}) {
  const config = {
    color: options.color || '#C4B5FD',
    size: options.size || 7,
    count: options.count || 7,
    ...options
  };

  // 1. Accessibility: Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 2. Ignore coarse touch pointers
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  // 3. Ensure DOM container exists
  let container = document.getElementById('cursor-trail-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cursor-trail-container';
    container.className = 'cursor-trail-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  } else {
    container.innerHTML = '';
  }

  const dots = [];
  const points = [];

  for (let i = 0; i < config.count; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    const progress = i / (config.count - 1 || 1);
    const dotSize = Math.max(2, config.size * (1 - progress * 0.65));
    const opacity = Math.max(0.06, 0.75 * Math.pow(1 - progress, 1.2));

    dot.style.width = `${dotSize}px`;
    dot.style.height = `${dotSize}px`;
    dot.style.backgroundColor = config.color;
    dot.style.opacity = '0';
    if (i === 0) {
      dot.style.boxShadow = '0 0 10px rgba(196, 181, 253, 0.45)';
    }

    container.appendChild(dot);
    dots.push({ el: dot, size: dotSize, baseOpacity: opacity });
    points.push({ x: -100, y: -100 });
  }

  let mouseX = -100;
  let mouseY = -100;
  let isInside = false;
  let isBadgeActive = false;

  const badge = document.getElementById('cursor-badge');

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isInside) {
      isInside = true;
      if (points[0].x < 0) {
        points.forEach((pt) => {
          pt.x = mouseX;
          pt.y = mouseY;
        });
      }
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isInside = false;
  });

  document.addEventListener('mouseenter', () => {
    isInside = true;
  });

  // Watch circular arrow badge state to pause trail when badge is active
  if (badge) {
    const observer = new MutationObserver(() => {
      isBadgeActive = badge.classList.contains('is-active');
    });
    observer.observe(badge, { attributes: true, attributeFilter: ['class'] });
  }

  function renderTrail() {
    const shouldShow = isInside && !isBadgeActive;

    let targetX = mouseX;
    let targetY = mouseY;

    for (let i = 0; i < config.count; i++) {
      const pt = points[i];
      const dot = dots[i];

      // Sequential spring / lag interpolation
      const lerp = Math.max(0.18, 0.48 - i * 0.045);
      pt.x += (targetX - pt.x) * lerp;
      pt.y += (targetY - pt.y) * lerp;

      dot.el.style.transform = `translate3d(${pt.x - dot.size / 2}px, ${pt.y - dot.size / 2}px, 0)`;
      dot.el.style.opacity = shouldShow ? dot.baseOpacity : 0;

      targetX = pt.x;
      targetY = pt.y;
    }

    requestAnimationFrame(renderTrail);
  }

  requestAnimationFrame(renderTrail);
}

// 9. Expanding Icon Button Dynamic Width Measurement for Subpixel Accuracy
function initExpandingButtons() {
  const buttons = document.querySelectorAll('.btn-expand-icon');
  if (!buttons.length) return;

  function measureWidths() {
    buttons.forEach((btn) => {
      const text = btn.querySelector('.btn-expand-text');
      if (text) {
        const textWidth = Math.ceil(text.getBoundingClientRect().width);
        btn.style.setProperty('--btn-text-width', `${textWidth}px`);
      }
    });
  }

  // Measure after fonts have loaded or immediately
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measureWidths);
  } else {
    setTimeout(measureWidths, 100);
  }

  window.addEventListener('resize', measureWidths, { passive: true });
}

// 10. Mobile Navigation Sheet & Hamburger Toggle
function initMobileNavigation() {
  const hamburger = document.getElementById('nav-hamburger');
  const sheet = document.getElementById('mobile-nav-sheet');
  const header = document.querySelector('.site-nav');
  if (!hamburger) return;

  function getFocusableElements() {
    if (!sheet) return [];
    return Array.from(
      sheet.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0);
  }

  function handleFocusTrap(e) {
    if (e.key !== 'Tab') return;
    const focusables = [hamburger, ...getFocusableElements()];
    if (focusables.length === 0) return;

    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  function toggleMenu(isOpen) {
    const currentState = hamburger.classList.contains('is-active');
    const targetState = typeof isOpen === 'boolean' ? isOpen : !currentState;

    if (targetState === currentState) return;

    if (targetState) {
      hamburger.classList.add('is-active');
      if (sheet) {
        sheet.classList.add('is-open');
        sheet.setAttribute('aria-hidden', 'false');
      }
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('nav-menu-open');

      if (header) {
        header.classList.remove('nav-hidden');
      }

      document.addEventListener('keydown', handleFocusTrap);

      const focusables = getFocusableElements();
      if (focusables.length > 0) {
        setTimeout(() => focusables[0].focus(), 50);
      }
    } else {
      hamburger.classList.remove('is-active');
      if (sheet) {
        sheet.classList.remove('is-open');
        sheet.setAttribute('aria-hidden', 'true');
      }
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('nav-menu-open');

      document.removeEventListener('keydown', handleFocusTrap);

      // Return focus to the menu button on close
      hamburger.focus();
    }
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close on link tap
  if (sheet) {
    sheet.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('is-active')) {
      toggleMenu(false);
    }
  });

  // Close on route change
  window.addEventListener('hashchange', () => {
    if (hamburger.classList.contains('is-active')) {
      toggleMenu(false);
    }
  });
  window.addEventListener('popstate', () => {
    if (hamburger.classList.contains('is-active')) {
      toggleMenu(false);
    }
  });

  // Close if window resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && hamburger.classList.contains('is-active')) {
      toggleMenu(false);
    }
  }, { passive: true });
}

// Hide-on-scroll Header
function initHideOnScrollHeader() {
  const header = document.querySelector('.site-nav');
  const hamburger = document.getElementById('nav-hamburger');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let isTicking = false;

  function updateHeaderVisibility() {
    const currentScrollY = window.scrollY;
    const isMenuOpen = hamburger && (hamburger.getAttribute('aria-expanded') === 'true' || hamburger.classList.contains('is-active'));

    // Never hide while the menu is open
    if (isMenuOpen) {
      header.classList.remove('nav-hidden');
      lastScrollY = currentScrollY;
      isTicking = false;
      return;
    }

    if (currentScrollY > 80 && currentScrollY > lastScrollY) {
      // User scrolled down more than 80px: slide up
      header.classList.add('nav-hidden');
    } else if (currentScrollY < lastScrollY) {
      // Slide back on any upward scroll
      header.classList.remove('nav-hidden');
    }

    if (currentScrollY <= 0) {
      header.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
    isTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateHeaderVisibility);
      isTicking = true;
    }
  }, { passive: true });
}

// 11. Sticky Table of Contents ScrollSpy & Active Link Indicator
function initStickyTocScrollSpy() {
  const tocLinks = document.querySelectorAll('.cs-sticky-toc .cs-toc-link');
  if (!tocLinks.length) return;

  const sections = [];
  tocLinks.forEach((link) => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      const targetSec = document.querySelector(hash);
      if (targetSec) {
        sections.push({ link, targetSec });
      }
    }
  });

  if (!sections.length) return;

  function updateActiveLink() {
    const scrollPos = window.scrollY + 180;
    let current = sections[0];

    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].targetSec.offsetTop;
      if (scrollPos >= top) {
        current = sections[i];
      }
    }

    sections.forEach(({ link }) => link.classList.remove('active'));
    if (current && current.link) {
      current.link.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   PHASE 3 HOMEPAGE INTERACTIONS
   ========================================================================== */

// 3.3 Proof Bar Counter Animation
function initProofBarCounters() {
  const container = document.getElementById('proof-scroll-container');
  if (!container) return;

  const counterCards = container.querySelectorAll('.proof-card[data-metric-type="counter"]');
  if (!counterCards.length) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const targetVal = parseInt(card.getAttribute('data-target'), 10);
        const countSpan = card.querySelector('.count-val');
        if (!countSpan || isNaN(targetVal)) return;

        if (prefersReduced) {
          countSpan.textContent = targetVal;
        } else {
          const duration = 800;
          const startTime = performance.now();
          function animateCount(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * targetVal);
            countSpan.textContent = current;
            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              countSpan.textContent = targetVal;
            }
          }
          requestAnimationFrame(animateCount);
        }
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.5 });

  counterCards.forEach((card) => observer.observe(card));
}

// 3.3 Proof Bar Mobile Scroll-Snap Dots
function initProofBarDots() {
  const container = document.getElementById('proof-scroll-container');
  const dotsContainer = document.getElementById('proof-dots');
  if (!container || !dotsContainer) return;

  const dots = Array.from(dotsContainer.querySelectorAll('.proof-dot'));
  const cards = Array.from(container.querySelectorAll('.proof-card'));
  if (!dots.length || !cards.length) return;

  function updateActiveDot() {
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2 - container.offsetLeft;
      const viewCenter = scrollLeft + containerWidth / 2;
      const distance = Math.abs(cardCenter - viewCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === closestIndex);
    });
  }

  let scrollTicking = false;
  container.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateActiveDot();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  });
}

// 3.4 Client Strip Marquee Touch-Hold Pause
function initMarqueeTouchPause() {
  const marquee = document.getElementById('clients-marquee');
  if (!marquee) return;

  marquee.addEventListener('touchstart', () => {
    marquee.classList.add('is-paused');
  }, { passive: true });

  marquee.addEventListener('touchend', () => {
    marquee.classList.remove('is-paused');
  }, { passive: true });

  marquee.addEventListener('touchcancel', () => {
    marquee.classList.remove('is-paused');
  }, { passive: true });
}

// 3.6 How I Work Accordion
function initHowIWorkAccordion() {
  const howItems = document.querySelectorAll('.how-item');
  if (!howItems.length) return;

  howItems.forEach((item) => {
    const btn = item.querySelector('.how-header-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (window.innerWidth >= 1024) return;

      const wasOpen = item.classList.contains('is-open');
      item.classList.toggle('is-open', !wasOpen);
      btn.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');
    });
  });
}

// 3.9 Contact Email Copy Interaction with Toast
function initCopyEmailToast() {
  const copyButtons = document.querySelectorAll(
    '#copy-email-btn, #footer-copy-email-btn, .copy-email-trigger, .copy-email-btn, [data-copy-email]'
  );
  if (!copyButtons || copyButtons.length === 0) return;

  let toast = document.getElementById('email-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'email-toast';
    toast.className = 'toast-notice';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = 'Email copied';
    document.body.appendChild(toast);
  }

  let toastTimer = null;

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = 'contact@digambarpatil.com';
      try {
        let copied = false;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(email);
            copied = true;
          } catch (clipErr) {
            // Permission or focus denied; fallback to execCommand
          }
        }
        if (!copied) {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        // Show toast
        toast.classList.add('is-visible');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('is-visible');
        }, 2000);

        // Tactile micro-interaction feedback on clicked button
        const labelSpan = btn.querySelector('.copy-label') || btn.querySelector('span');
        const originalText = labelSpan ? labelSpan.textContent : null;
        btn.classList.add('is-copied');
        if (labelSpan) labelSpan.textContent = 'Copied!';

        setTimeout(() => {
          btn.classList.remove('is-copied');
          if (labelSpan && originalText) labelSpan.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  });
}

// 3.10 Mobile Sticky CTA
function initMobileStickyCTA() {
  const stickyCta = document.getElementById('mobile-sticky-cta');
  const heroSection = document.getElementById('hero');
  const contactSection = document.getElementById('contact');
  if (!stickyCta || !heroSection) return;

  let passedHero = false;
  let inContact = false;

  function updateStickyState() {
    if (window.innerWidth >= 768) {
      stickyCta.classList.remove('is-visible');
      document.body.classList.remove('has-sticky-cta');
      return;
    }

    if (passedHero && !inContact) {
      stickyCta.classList.add('is-visible');
      stickyCta.classList.remove('is-hidden');
      stickyCta.setAttribute('aria-hidden', 'false');
      document.body.classList.add('has-sticky-cta');
    } else {
      if (inContact) {
        stickyCta.classList.add('is-hidden');
      } else {
        stickyCta.classList.remove('is-visible');
      }
      stickyCta.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('has-sticky-cta');
    }
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      passedHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      updateStickyState();
    });
  }, { threshold: 0 });

  const triggerEl = heroSection.querySelector('.hero-buttons') || heroSection;
  heroObserver.observe(triggerEl);

  if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inContact = entry.isIntersecting;
        updateStickyState();
      });
    }, { threshold: 0.1 });

    contactObserver.observe(contactSection);
  }

  window.addEventListener('resize', updateStickyState, { passive: true });
}

/* ==========================================================================
   PHASE 4: CASE STUDY TEMPLATE & WORK PAGE INTERACTIONS
   ========================================================================== */

// 4.1 Reading Progress Bar (2px line under header)
function initReadingProgressBar() {
  const bar = document.getElementById('cs-reading-progress-bar');
  const container = document.getElementById('cs-reading-progress');
  if (!bar || !container) return;

  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) {
      bar.style.width = '0%';
      container.setAttribute('aria-valuenow', '0');
      return;
    }
    const current = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
    bar.style.width = current + '%';
    container.setAttribute('aria-valuenow', Math.round(current));
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

// 4.2 Section Nav: Mobile Bottom Sheet + Desktop Sticky Left-Rail TOC
function initCaseStudyTOC() {
  const pillBtn = document.getElementById('cs-toc-pill');
  const sheet = document.getElementById('cs-toc-sheet');
  const backdrop = document.getElementById('cs-toc-sheet-backdrop');
  const closeBtn = document.getElementById('cs-toc-sheet-close');
  const sheetLinks = document.querySelectorAll('.cs-toc-sheet-link');
  const railLinks = document.querySelectorAll('.cs-rail-link');

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile Bottom Sheet
  function openSheet() {
    if (!sheet || !backdrop) return;
    sheet.classList.add('is-open');
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    if (pillBtn) pillBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    if (!sheet || !backdrop) return;
    sheet.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    if (pillBtn) {
      pillBtn.setAttribute('aria-expanded', 'false');
      pillBtn.focus();
    }
    document.body.style.overflow = '';
  }

  if (pillBtn) {
    pillBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSheet();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSheet);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSheet();
    });
  }

  // Swipe down to close on mobile sheet
  let touchStartY = 0;
  if (sheet) {
    sheet.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    sheet.addEventListener('touchmove', (e) => {
      const currentY = e.touches[0].clientY;
      if (currentY - touchStartY > 60 && sheet.scrollTop <= 0) {
        closeSheet();
      }
    }, { passive: true });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheet && sheet.classList.contains('is-open')) {
      closeSheet();
    }
  });

  // Smooth-scroll navigation with header offset
  function scrollToTarget(targetId) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    const headerOffset = 80;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReduced ? 'auto' : 'smooth'
    });
  }

  sheetLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        closeSheet();
        setTimeout(() => scrollToTarget(id), 120);
      }
    });
  });

  railLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        scrollToTarget(href.slice(1));
      }
    });
  });

  // Desktop Left-Rail TOC: IntersectionObserver Active State
  const observedSectionIds = ['tldr', 'problem', 'role-and-scope', 'key-decisions', 'final-design', 'outcome', 'what-id-do-next', 'process-artefacts'];
  const observedSections = observedSectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (observedSections.length && railLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          railLinks.forEach((link) => {
            const sectionTarget = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
            const isActive = sectionTarget === currentId;
            link.classList.toggle('active', isActive);
          });
        }
      });
    }, {
      rootMargin: '-80px 0px -55% 0px',
      threshold: [0, 0.2]
    });

    observedSections.forEach(section => observer.observe(section));
  }
}

// 4.3 DecisionBlock: Hotspots & Notes Synchronization
function initDecisionBlockHotspots() {
  const blocks = document.querySelectorAll('.cs-decision-block');
  if (!blocks.length) return;

  blocks.forEach((block) => {
    const hotspots = block.querySelectorAll('.cs-hotspot');
    const notes = block.querySelectorAll('.cs-decision-note');

    function setActive(id) {
      hotspots.forEach((h) => {
        const match = h.getAttribute('data-hotspot-id') === String(id);
        h.classList.toggle('active', match);
        h.setAttribute('aria-expanded', match ? 'true' : 'false');
      });

      notes.forEach((n) => {
        const match = n.getAttribute('data-note-id') === String(id);
        n.classList.toggle('active', match);
        n.setAttribute('aria-pressed', match ? 'true' : 'false');
      });
    }

    // Set first active by default
    if (hotspots.length) {
      const firstId = hotspots[0].getAttribute('data-hotspot-id');
      setActive(firstId);
    }

    hotspots.forEach((spot) => {
      spot.addEventListener('click', () => {
        const spotId = spot.getAttribute('data-hotspot-id');
        setActive(spotId);
      });
    });

    notes.forEach((note) => {
      note.addEventListener('click', () => {
        const noteId = note.getAttribute('data-note-id');
        setActive(noteId);
      });

      note.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const noteId = note.getAttribute('data-note-id');
          setActive(noteId);
        }
      });
    });
  });
}

// 4.4 Screen Gallery: Mobile Counter & Fullscreen Lightbox
function initScreenGalleryAndLightbox() {
  const galleryContainer = document.getElementById('cs-gallery-container');
  const counterPill = document.getElementById('cs-counter-pill');
  const galleryItems = document.querySelectorAll('.cs-gallery-item');

  // Mobile Carousel Counter update
  if (galleryContainer && counterPill && galleryItems.length) {
    let scrollTimeout;
    galleryContainer.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = galleryContainer.scrollLeft;
        const firstItem = galleryItems[0];
        const cardWidth = firstItem ? firstItem.offsetWidth + 16 : 300;
        const currentIdx = Math.min(galleryItems.length, Math.max(1, Math.round(scrollLeft / cardWidth) + 1));
        counterPill.textContent = `${currentIdx} / ${galleryItems.length}`;
      }, 50);
    }, { passive: true });
  }

  // Fullscreen Lightbox Modal
  const lightbox = document.getElementById('cs-lightbox');
  if (!lightbox || !galleryItems.length) return;

  const lightboxImg = document.getElementById('cs-lightbox-img');
  const lightboxCounter = document.getElementById('cs-lightbox-counter');
  const lightboxCaption = document.getElementById('cs-lightbox-caption');
  const closeBtn = document.getElementById('cs-lightbox-close');
  const backdrop = document.getElementById('cs-lightbox-backdrop');
  const prevBtn = document.getElementById('cs-lightbox-prev');
  const nextBtn = document.getElementById('cs-lightbox-next');
  const stage = document.getElementById('cs-lightbox-stage');

  let currentIndex = 0;
  const screensData = [];

  galleryItems.forEach((item, idx) => {
    const img = item.querySelector('.cs-gallery-img');
    const captionEl = item.querySelector('.cs-caption-text');
    screensData.push({
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : '',
      caption: captionEl ? captionEl.textContent : ''
    });

    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  function updateLightboxView() {
    const data = screensData[currentIndex];
    if (!data) return;

    if (lightboxImg) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${screensData.length}`;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = data.caption;
    }
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxView();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % screensData.length;
    updateLightboxView();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + screensData.length) % screensData.length;
    updateLightboxView();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
  });

  // Touch Swipe on Lightbox Stage (Mobile)
  let touchStartX = 0;
  let touchStartY = 0;

  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Horizontal swipe
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) showNext();
        else showPrev();
      }
      // Swipe down to close
      else if (diffY < -70 && Math.abs(diffY) > Math.abs(diffX)) {
        closeLightbox();
      }
    }, { passive: true });
  }
}

// ==========================================================================
// FEATURED PROJECT SHOWCASE (Auto-rotating showcase below hero)
// ==========================================================================
function initFeaturedProjectShowcase() {
  const showcaseSection = document.getElementById('featured-showcase');
  const stage = document.getElementById('showcase-stage');
  const slides = Array.from(document.querySelectorAll('.showcase-slide'));
  const indicators = Array.from(document.querySelectorAll('.indicator-line'));
  const counter = document.getElementById('showcase-counter');
  const openBtn = document.getElementById('showcase-open-btn');
  const pauseBtn = document.getElementById('showcase-pause-btn');
  const pauseIcon = pauseBtn ? pauseBtn.querySelector('.icon-pause') : null;
  const playIcon = pauseBtn ? pauseBtn.querySelector('.icon-play') : null;
  const progressCircle = document.getElementById('showcase-progress-circle');
  const liveRegion = document.getElementById('showcase-live-region');

  if (!showcaseSection || !stage || !slides.length) return;

  const featuredProjects = [
    {
      title: "Tap2Order",
      href: "tap2order.html",
      tags: ["SaaS", "Mobile + Web"],
      image: "assets/images/showcase/tap2order_laptop_1600.webp",
      mobileImage: "assets/images/showcase/tap2order_laptop_640.webp",
      deviceType: "laptop",
      alt: "Tap2Order merchant dashboard showing incoming orders, daily revenue, and product stock"
    },
    {
      title: "Raya",
      href: "raya.html",
      tags: ["AI", "Mobile app", "Concept"],
      image: "assets/images/showcase/raya_phone_1024.webp",
      mobileImage: "assets/images/showcase/raya_phone_640.webp",
      deviceType: "phone",
      alt: "Raya AI mobile application interface displaying contextual recommendations"
    },
    {
      title: "Elixir Helps",
      href: "elixir-helps.html",
      tags: ["Healthcare", "Web + Admin"],
      image: "assets/images/showcase/elixir_laptop_1600.webp",
      mobileImage: "assets/images/showcase/elixir_laptop_640.webp",
      deviceType: "laptop",
      alt: "Elixir Helps healthcare management portal displaying patient records and care coordinator dashboard"
    },
    {
      title: "Soché",
      href: "soche.html",
      tags: ["D2C", "Shopify"],
      image: "assets/images/showcase/soche_laptop_1600.webp",
      mobileImage: "assets/images/showcase/soche_laptop_640.webp",
      deviceType: "laptop",
      alt: "Soché luxury jewellery e-commerce storefront with curated collections and product detail view"
    },
    {
      title: "Before Two",
      href: "before-two.html",
      tags: ["Operations", "Mobile app"],
      image: "assets/images/showcase/before_two_phone_1024.webp",
      mobileImage: "assets/images/showcase/before_two_phone_640.webp",
      deviceType: "phone",
      alt: "Before Two operations mobile app showcasing order tracking and supply workflow"
    }
  ];

  const CIRCLE_CIRCUMFERENCE = 119.38;
  const ROTATE_INTERVAL = 5000; // 5000ms

  let currentIndex = 0;
  let isManualPaused = false;
  let isHovered = false;
  let isFocused = false;
  let isDocumentHidden = document.hidden;
  let isIntersecting = true;
  let elapsedTime = 0;
  let lastTimestamp = null;
  let animationFrameId = null;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    isManualPaused = true;
  }

  function updatePlayPauseUI() {
    if (!pauseBtn) return;
    if (isManualPaused) {
      pauseBtn.setAttribute('aria-label', 'Play slideshow');
      pauseBtn.setAttribute('aria-pressed', 'true');
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (playIcon) playIcon.style.display = 'block';
    } else {
      pauseBtn.setAttribute('aria-label', 'Pause slideshow');
      pauseBtn.setAttribute('aria-pressed', 'false');
      if (pauseIcon) pauseIcon.style.display = 'block';
      if (playIcon) playIcon.style.display = 'none';
    }
  }

  updatePlayPauseUI();

  function preloadNextSlide(nextIdx) {
    const nextProj = featuredProjects[nextIdx];
    if (nextProj && nextProj.image) {
      const img = new Image();
      img.src = nextProj.image;
    }
  }

  function goToSlide(newIndex, isManual = false) {
    const total = slides.length;
    currentIndex = (newIndex + total) % total;
    elapsedTime = 0;

    slides.forEach((slide, idx) => {
      const isActive = idx === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      if (isActive) {
        slide.removeAttribute('inert');
      } else {
        slide.setAttribute('inert', '');
      }
      const link = slide.querySelector('.showcase-device-link');
      if (link) {
        link.tabIndex = isActive ? 0 : -1;
      }
    });

    indicators.forEach((ind, idx) => {
      const isActive = idx === currentIndex;
      ind.classList.toggle('is-active', isActive);
      ind.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const currentProject = featuredProjects[currentIndex];
    if (currentProject) {
      if (openBtn) {
        openBtn.href = currentProject.href;
        openBtn.setAttribute('aria-label', `Open case study: ${currentProject.title}`);
      }
      if (counter) {
        counter.textContent = `0${currentIndex + 1} / 0${total}`;
      }
    }

    if (progressCircle) {
      progressCircle.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE;
    }

    // Accessible live region announcements for manual transitions ONLY
    if (isManual && liveRegion) {
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.textContent = `Slide ${currentIndex + 1} of ${total}: ${currentProject.title}`;
      setTimeout(() => {
        if (liveRegion) liveRegion.setAttribute('aria-live', 'off');
      }, 1200);
    } else if (liveRegion) {
      liveRegion.setAttribute('aria-live', 'off');
      liveRegion.textContent = '';
    }

    // Preload next slide
    preloadNextSlide((currentIndex + 1) % total);
  }

  function shouldRotate() {
    if (prefersReducedMotion) return false;
    if (isManualPaused) return false;
    if (isHovered) return false;
    if (isFocused) return false;
    if (isDocumentHidden) return false;
    if (!isIntersecting) return false;
    return true;
  }

  function animationLoop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (shouldRotate()) {
      elapsedTime += delta;
      if (progressCircle) {
        const fraction = Math.min(elapsedTime / ROTATE_INTERVAL, 1);
        const offset = CIRCLE_CIRCUMFERENCE * (1 - fraction);
        progressCircle.style.strokeDashoffset = offset.toFixed(2);
      }

      if (elapsedTime >= ROTATE_INTERVAL) {
        goToSlide(currentIndex + 1, false);
      }
    }

    animationFrameId = requestAnimationFrame(animationLoop);
  }

  animationFrameId = requestAnimationFrame(animationLoop);

  // Manual Pause / Play button toggle
  if (pauseBtn) {
    pauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isManualPaused = !isManualPaused;
      updatePlayPauseUI();
    });
  }

  // Indicator clicks
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const targetIdx = parseInt(indicator.dataset.index, 10);
      if (!isNaN(targetIdx)) {
        goToSlide(targetIdx, true);
      }
    });
  });

  // Hover detection on stage (desktop only pause)
  stage.addEventListener('mouseenter', () => {
    isHovered = true;
  });
  stage.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Focus detection inside section
  showcaseSection.addEventListener('focusin', () => {
    isFocused = true;
  });
  showcaseSection.addEventListener('focusout', (e) => {
    if (!showcaseSection.contains(e.relatedTarget)) {
      isFocused = false;
    }
  });

  // Keyboard navigation when stage is focused
  showcaseSection.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1, true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1, true);
    }
  });

  // Visibility change
  document.addEventListener('visibilitychange', () => {
    isDocumentHidden = document.hidden;
  });

  // IntersectionObserver (< 30% visible)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.intersectionRatio >= 0.3;
      });
    }, {
      threshold: [0, 0.3, 0.5, 1.0]
    });
    observer.observe(showcaseSection);
  }

  // Touch Swipe on mobile (threshold 40px)
  let touchStartX = 0;
  let touchStartY = 0;
  stage.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    if (e.changedTouches.length > 0) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Check if horizontal swipe exceeds 40px threshold and is predominantly horizontal
      if (Math.abs(diffX) >= 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          // Swiped left -> next slide
          goToSlide(currentIndex + 1, true);
        } else {
          // Swiped right -> previous slide
          goToSlide(currentIndex - 1, true);
        }
      }
    }
  }, { passive: true });

  // Initial preload for slide 2
  preloadNextSlide(1);
}


