// Digambar Patil Portfolio - Global Motion & Responsive Interactions

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHideOnScrollHeader();
  initParticleBackground();
  initLiveClock();
  initScrollReveal();
  initCursorFollowBadge();
  initCursorTrail();
  initExpandingButtons();
  initFeaturedCarousel();
  initProjectFilterTabs();
  initTestimonialCarousel();
  initStickyTocScrollSpy();
  // Phase 3 Initializers
  initProofBarCounters();
  initProofBarDots();
  initMarqueeTouchPause();
  initHowIWorkAccordion();
  initCopyEmailToast();
  initMobileStickyCTA();
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

// 6. Project Filter Tabs (Work Page)
function initProjectFilterTabs() {
  const filterBtns = document.querySelectorAll('.work-filter-btn, .filter-tab-btn');
  const projectCards = document.querySelectorAll('.work-project-card, .filterable-project-card');
  const emptyState = document.getElementById('filter-empty-state');
  if (!filterBtns.length || !projectCards.length) return;

  let isAnimating = false;

  function normalizeFilterParam(val) {
    if (!val) return 'all';
    const lower = val.toLowerCase().trim();
    if (lower === 'websites' || lower === 'website') return 'websites';
    if (lower === 'web-applications' || lower === 'web-application' || lower === 'webapplications' || lower === 'webapplication' || lower === 'web-apps' || lower === 'webapps' || lower === 'web-app' || lower === 'webapp') return 'web-applications';
    if (lower === 'mobile-apps' || lower === 'mobile-app' || lower === 'mobileapps' || lower === 'mobileapp' || lower === 'app' || lower === 'apps') return 'mobile-apps';
    if (lower === 'all') return 'all';
    return lower;
  }

  function applyFilter(filterValue, updateUrl = true, immediate = false) {
    const normFilter = normalizeFilterParam(filterValue);
    
    // Update tab states
    let activeBtn = null;
    filterBtns.forEach((btn) => {
      const btnFilter = btn.getAttribute('data-filter');
      const isActive = btnFilter === normFilter || (normFilter === 'all' && btnFilter === 'all');
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) activeBtn = btn;
    });

    // Update URL if requested
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (normFilter === 'all') {
        url.searchParams.delete('filter');
      } else {
        url.searchParams.set('filter', normFilter);
      }
      window.history.pushState({ filter: normFilter }, '', url.toString());
    }

    const matchingCards = [];
    const nonMatchingCards = [];

    projectCards.forEach((card) => {
      const cat = (card.getAttribute('data-category') || '').trim();
      const match = normFilter === 'all' || cat === normFilter || cat.split(/\s+/).includes(normFilter);
      if (match) {
        matchingCards.push(card);
      } else {
        nonMatchingCards.push(card);
      }
    });

    if (immediate) {
      nonMatchingCards.forEach((card) => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(14px)';
        card.style.pointerEvents = 'none';
      });

      matchingCards.forEach((card) => {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.pointerEvents = 'auto';
      });

      if (emptyState) {
        if (matchingCards.length === 0) {
          emptyState.style.display = 'block';
          emptyState.classList.add('is-visible');
        } else {
          emptyState.classList.remove('is-visible');
          emptyState.style.display = 'none';
        }
      }
      return;
    }

    // Smooth staggered animation:
    // 1. Fade out non-matching cards (200ms)
    nonMatchingCards.forEach((card) => {
      card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      card.style.pointerEvents = 'none';
    });

    setTimeout(() => {
      // Hide non-matching cards so grid reflows cleanly
      nonMatchingCards.forEach((card) => {
        card.style.display = 'none';
      });

      // Show and stagger fade in matching cards
      matchingCards.forEach((card, idx) => {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(14px)';
        card.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // Force reflow
        void card.offsetWidth;

        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.style.pointerEvents = 'auto';
        }, idx * 45 + 20);
      });

      // Handle Empty state
      if (emptyState) {
        if (matchingCards.length === 0) {
          emptyState.style.display = 'block';
          setTimeout(() => emptyState.classList.add('is-visible'), 30);
        } else {
          emptyState.classList.remove('is-visible');
          setTimeout(() => {
            emptyState.style.display = 'none';
          }, 200);
        }
      }
    }, 200);
  }

  // Click events & Keyboard accessible events on filter buttons
  filterBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filterValue = btn.getAttribute('data-filter');
      applyFilter(filterValue, true, false);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextBtn = filterBtns[(index + 1) % filterBtns.length];
        nextBtn.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = filterBtns[(index - 1 + filterBtns.length) % filterBtns.length];
        prevBtn.focus();
      }
    });
  });

  // Handle popstate for browser navigation (Back / Forward)
  window.addEventListener('popstate', (e) => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter') || 'all';
    applyFilter(filterParam, false, false);
  });

  // Initial load check from URL
  const initialParams = new URLSearchParams(window.location.search);
  const initialFilter = initialParams.get('filter');
  if (initialFilter) {
    applyFilter(initialFilter, false, true);
  }
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
  const btn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('email-toast');
  if (!btn || !toast) return;

  let toastTimer = null;

  btn.addEventListener('click', async () => {
    const email = 'contact@digambarpatil.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
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

      toast.classList.add('is-visible');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('is-visible');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
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

