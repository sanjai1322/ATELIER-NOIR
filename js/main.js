/* ============================================================
   ATELIER NOIR — Main Module
   Lenis + GSAP base, cursor, nav, page transitions
   ============================================================ */

// ── Brand constant (change in one place) ──
export const BRAND_NAME = 'ATELIER NOIR';

// ── Feature detection ──
const isTouchDevice = () =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   LENIS SMOOTH SCROLL + GSAP INTEGRATION
   ============================================================ */
let lenisInstance = null;

export function initLenis() {
  if (prefersReducedMotion()) return;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}


/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
export function initCursor() {
  if (isTouchDevice()) return;

  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  if (!cursor || !ring) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow
  function animateCursor() {
    const speed = 0.15;
    const ringSpeed = 0.08;

    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    ringX += (mouseX - ringX) * ringSpeed;
    ringY += (mouseY - ringY) * ringSpeed;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const hoverTargets = document.querySelectorAll(
    'a, button, .product-card, .collection-card, .showcase__card, .filter-chip, .pdp__thumb, .pdp__option, .pdp__color-option'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  // Hide when cursor leaves window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    ring.style.opacity = '1';
  });
}


/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
export function initMagneticButtons() {
  if (isTouchDevice() || prefersReducedMotion()) return;

  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.3;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power3.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  });
}


/* ============================================================
   HEADER SCROLL BEHAVIOR
   ============================================================ */
export function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.progress > 0) {
        header.classList.add('header--solid');
      } else {
        header.classList.remove('header--solid');
      }
    },
  });

  // Animate header in on load
  if (!prefersReducedMotion()) {
    gsap.from(header, {
      y: -20,
      opacity: 0,
      duration: 1,
      delay: 1.8,
      ease: 'power3.out',
    });
  }
}


/* ============================================================
   MOBILE MENU
   ============================================================ */
export function initMobileMenu() {
  const menuBtn = document.querySelector('.header__menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!menuBtn || !mobileNav) return;

  let isOpen = false;

  menuBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    menuBtn.classList.toggle('header__menu-btn--active', isOpen);
    mobileNav.classList.toggle('mobile-nav--open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen && !prefersReducedMotion()) {
      gsap.from(mobileNav.querySelectorAll('.mobile-nav__link'), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }
  });

  // Close on link click
  mobileNav.querySelectorAll('.mobile-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      isOpen = false;
      menuBtn.classList.remove('header__menu-btn--active');
      mobileNav.classList.remove('mobile-nav--open');
      document.body.style.overflow = '';
    });
  });
}


/* ============================================================
   PAGE TRANSITIONS
   ============================================================ */
export function initPageTransitions() {
  if (prefersReducedMotion()) return;

  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  // Intercept internal navigation links
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Animate overlay in
      gsap.to(overlay, {
        y: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          window.location.href = href;
        },
      });
    });
  });

  // On page load, animate overlay out
  window.addEventListener('load', () => {
    if (overlay.style.transform !== 'translateY(0px)') {
      gsap.set(overlay, { y: 0 });
      gsap.to(overlay, {
        y: '-100%',
        duration: 0.6,
        delay: 0.1,
        ease: 'power3.inOut',
      });
    }
  });
}


/* ============================================================
   LOADER
   ============================================================ */
export function initLoader() {
  return new Promise((resolve) => {
    const loader = document.querySelector('.loader');
    if (!loader || prefersReducedMotion()) {
      if (loader) loader.style.display = 'none';
      resolve();
      return;
    }

    const brand = loader.querySelector('.loader__brand');
    const line = loader.querySelector('.loader__line');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            resolve();
          },
        });
      },
    });

    tl.to(brand, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
    .to(line, {
      scaleX: 1,
      duration: 1,
      ease: 'power3.inOut',
    }, '-=0.3')
    .to({}, { duration: 0.3 });
  });
}


/* ============================================================
   UPDATE CART COUNT
   ============================================================ */
let cartCount = 0;

export function addToCart() {
  cartCount++;
  document.querySelectorAll('.header__cart-count').forEach((el) => {
    el.textContent = cartCount;
    // Subtle scale animation
    gsap.fromTo(el, { scale: 1.4 }, { scale: 1, duration: 0.4, ease: 'power3.out' });
  });
}

export function getCartCount() {
  return cartCount;
}


/* ============================================================
   INIT ALL ON DOM READY
   ============================================================ */
export async function initMain() {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Run loader first
  await initLoader();

  // Init core systems
  initLenis();
  initHeader();
  initCursor();
  initMagneticButtons();
  initMobileMenu();
  initPageTransitions();
}
