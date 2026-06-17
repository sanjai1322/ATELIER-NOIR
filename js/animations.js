/* ============================================================
   ATELIER NOIR — Scroll Animations Module
   Reveals, parallax, horizontal scroll, staggered entrances
   ============================================================ */

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   GENERIC REVEAL ANIMATIONS
   ============================================================ */
export function initReveals() {
  if (prefersReducedMotion()) {
    // Make everything visible immediately
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Fade + slide up reveals
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay) || 0;
    const type = el.dataset.reveal || 'up';

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      x: 0,
      duration: 1,
      delay: delay,
      ease: 'power3.out',
    });
  });

  // Stagger groups
  document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    const children = group.children;
    const staggerDelay = parseFloat(group.dataset.revealStagger) || 0.1;

    gsap.fromTo(
      children,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: staggerDelay,
        ease: 'power3.out',
      }
    );
  });
}


/* ============================================================
   IMAGE REVEAL (CLIP-PATH)
   ============================================================ */
export function initImageReveals() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('[data-reveal-img]').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power3.inOut',
    });
  });
}


/* ============================================================
   PARALLAX IMAGES
   ============================================================ */
export function initParallax() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;
    const direction = el.dataset.parallaxDir || 'y';

    gsap.to(el, {
      scrollTrigger: {
        trigger: el.closest('[data-parallax-wrapper]') || el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      [direction]: `${speed * 100}px`,
      ease: 'none',
    });
  });
}


/* ============================================================
   HERO TEXT REVEAL (WORD-BY-WORD)
   ============================================================ */
export function initHeroReveal() {
  if (prefersReducedMotion()) return;

  const words = document.querySelectorAll('.hero__title .word-inner');
  if (!words.length) return;

  const tl = gsap.timeline({ delay: 1.5 });

  tl.to(words, {
    y: 0,
    duration: 1.2,
    stagger: 0.08,
    ease: 'power3.out',
  });

  // Eyebrow
  const eyebrow = document.querySelector('.hero__eyebrow');
  if (eyebrow) {
    tl.from(eyebrow, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.8');
  }

  // Subtitle
  const subtitle = document.querySelector('.hero__subtitle');
  if (subtitle) {
    tl.from(subtitle, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5');
  }

  // CTA
  const cta = document.querySelector('.hero__cta');
  if (cta) {
    tl.from(cta, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.4');
  }

  // Scroll cue
  const scrollCue = document.querySelector('.hero__scroll-cue');
  if (scrollCue) {
    tl.from(scrollCue, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.3');
  }
}


/* ============================================================
   BRAND STATEMENT LINE-BY-LINE REVEAL
   ============================================================ */
export function initBrandStatement() {
  if (prefersReducedMotion()) return;

  const lineInners = document.querySelectorAll('.brand-statement__text .line-inner');
  if (!lineInners.length) return;

  gsap.to(lineInners, {
    scrollTrigger: {
      trigger: '.brand-statement',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
  });
}


/* ============================================================
   HORIZONTAL PRODUCT SHOWCASE (PINNED SCROLL)
   ============================================================ */
export function initHorizontalShowcase() {
  const showcase = document.querySelector('.showcase');
  const track = document.querySelector('.showcase__track');
  if (!showcase || !track) return;

  if (prefersReducedMotion()) return;

  // Calculate how far to scroll
  const getScrollDistance = () => {
    return -(track.scrollWidth - window.innerWidth + 80);
  };

  gsap.to(track, {
    x: getScrollDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: showcase,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth + 200}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  // Stagger card reveals within
  gsap.fromTo(
    '.showcase__card',
    { opacity: 0, y: 60 },
    {
      scrollTrigger: {
        trigger: showcase,
        start: 'top 60%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    }
  );
}


/* ============================================================
   EDITORIAL SECTION PARALLAX
   ============================================================ */
export function initEditorialParallax() {
  if (prefersReducedMotion()) return;

  const editorialImg = document.querySelector('.editorial__img');
  if (!editorialImg) return;

  gsap.to(editorialImg, {
    scrollTrigger: {
      trigger: '.editorial',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
    y: -80,
    ease: 'none',
  });
}


/* ============================================================
   LOOKBOOK STAGGER
   ============================================================ */
export function initLookbookReveal() {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    '.lookbook__item',
    { opacity: 0, y: 60, scale: 0.96 },
    {
      scrollTrigger: {
        trigger: '.lookbook__grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
    }
  );
}


/* ============================================================
   COLLECTION PAGE - PRODUCT GRID STAGGER
   ============================================================ */
export function initProductGridReveal() {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    '.product-card',
    { opacity: 0, y: 50 },
    {
      scrollTrigger: {
        trigger: '.product-grid__grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
    }
  );
}


/* ============================================================
   FOOTER WORDMARK PARALLAX
   ============================================================ */
export function initFooterWordmark() {
  if (prefersReducedMotion()) return;

  const wordmark = document.querySelector('.footer__wordmark');
  if (!wordmark) return;

  gsap.fromTo(
    wordmark,
    { y: 60, opacity: 0 },
    {
      scrollTrigger: {
        trigger: wordmark,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
      y: 0,
      opacity: 0.04,
      duration: 1.5,
      ease: 'power3.out',
    }
  );
}


/* ============================================================
   DIVIDER LINE DRAW-IN
   ============================================================ */
export function initDividerDraw() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('.editorial__divider, [data-draw-line]').forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scrollTrigger: {
          trigger: line,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
      }
    );
  });
}


/* ============================================================
   INIT ALL ANIMATIONS
   ============================================================ */
export function initAllAnimations() {
  initReveals();
  initImageReveals();
  initParallax();
  initHeroReveal();
  initBrandStatement();
  initHorizontalShowcase();
  initEditorialParallax();
  initLookbookReveal();
  initProductGridReveal();
  initFooterWordmark();
  initDividerDraw();
}
