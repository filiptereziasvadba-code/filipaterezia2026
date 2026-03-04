// ============================================
// GSAP Animations for Terézia & Filip Wedding
// Subtle & Elegant Version - Updated Layout
// With Lenis Smooth Scrolling
// ============================================

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  // ============================================
  // LENIS SMOOTH SCROLL SETUP
  // ============================================
  
  const lenis = new Lenis({
    duration: 1.2,           // scroll duration (higher = smoother/slower)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Handle anchor links smoothly
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href !== '#' && !href.includes('tally')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 1.5
          });
        }
      }
    });
  });

  // Stop Lenis when menu is open, resume when closed
  const hamburger = document.getElementById('hamburger');
  const menuOverlay = document.getElementById('menuOverlay');
  
  if (hamburger && menuOverlay) {
    const observer = new MutationObserver(() => {
      if (menuOverlay.classList.contains('active')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
    observer.observe(menuOverlay, { attributes: true, attributeFilter: ['class'] });
  }

  // ============================================
  // HEADER - Gentle fade in
  // ============================================
  
  gsap.from("header .hamburger", {
    opacity: 0,
    x: -15,
    duration: 0.6,
    delay: 0.2,
    ease: "power2.out"
  });

  gsap.from("header .btn", {
    opacity: 0,
    x: 15,
    duration: 0.6,
    delay: 0.3,
    ease: "power2.out"
  });

  // ============================================
  // HERO SECTION - Soft reveal
  // ============================================
  
  const heroTl = gsap.timeline({ delay: 0.3 });
  
  heroTl
    .from("#hero #image img", {
      opacity: 0,
      scale: 0.98,
      duration: 1.2,
      ease: "power2.out"
    })
    .from("#hero #image h1", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.8")
    .from("#hero #main-info p", {
      y: 15,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out"
    }, "-=0.4");

  // ============================================
  // PREFACE SECTION - Gentle fade up
  // ============================================
  
  const prefaceTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#preface",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });

  prefaceTl
    .from("#preface h3", {
      y: 25,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from("#preface .paragraph p", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.5")
    .from("#preface .btn", {
      y: 15,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");

  // ============================================
  // VENUE SECTION - Refined reveal
  // ============================================
  
  const venueTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#venue",
      start: "top 65%",
      toggleActions: "play none none none"
    }
  });

  venueTl
    .from("#venue #misto", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    })
    .from("#venue .container.left hr", {
      scaleX: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }, "-=0.4")
    .from("#venue #reception", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.3");

  // Venue right side
  gsap.from("#venue .container.right h2", {
    y: 25,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#venue .container.right",
      start: "top 65%",
      toggleActions: "play none none none"
    }
  });

  // Venue parallax - background image shifts on scroll
  gsap.to("#venue .container.right div", {
    backgroundPosition: "50% 20%",
    ease: "none",
    scrollTrigger: {
      trigger: "#venue",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    }
  });

  // ============================================
  // HR DIVIDERS - Grow from center
  // ============================================
  
  gsap.utils.toArray("section.hr hr").forEach(hr => {
    gsap.from(hr, {
      scaleX: 0,
      duration: 0.6,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: hr,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });

  // ============================================
  // CEREMONY (HARMONOGRAM) SECTION
  // ============================================
  
  gsap.from("#ceremony .container.left h2", {
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#ceremony",
      start: "top 65%",
      toggleActions: "play none none none"
    }
  });

  // Ceremony parallax - background image shifts on scroll
  gsap.to("#ceremony .container.left", {
    backgroundPosition: "center 10%",
    ease: "none",
    scrollTrigger: {
      trigger: "#ceremony",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    }
  });

  gsap.from("#ceremony .container.right div p", {
    y: 15,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#ceremony .container.right",
      start: "top 65%",
      toggleActions: "play none none none"
    }
  });

  // ============================================
  // RECEPTION (HOSTINA) SECTION
  // ============================================
  
  gsap.from("#reception .container.right h2", {
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "section#reception",
      start: "top 65%",
      toggleActions: "play none none none"
    }
  });

  // Reception parallax - background image shifts on scroll
  gsap.to("section#reception .container.right", {
    backgroundPosition: "0% 30%",
    ease: "none",
    scrollTrigger: {
      trigger: "section#reception",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    }
  });

  gsap.from("#reception .container.left .menu", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#reception .container.left",
      start: "top 65%",
      toggleActions: "play none none none"
    }
  });

  // ============================================
  // QUOTE SECTION - Soft fade
  // ============================================
  
  const quoteTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#quote",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });

  quoteTl
    .from("#quote h3", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from("#quote img", {
      y: 15,
      opacity: 0,
      scale: 0.98,
      duration: 0.9,
      ease: "power2.out"
    }, "-=0.5")
    .from("#quote .paragraph", {
      y: 15,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.5");

  // ============================================
  // ZAZITEK (DISCOVER BRATISLAVA) SECTION
  // ============================================
  
  gsap.from("#zazitek > .container > h3", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#zazitek",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });

  gsap.from("#zazitek .accordion .at-item", {
    y: 15,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#zazitek .accordion",
      start: "top 70%",
      toggleActions: "play none none none"
    }
  });

  gsap.from("#zazitek .container.inner .image", {
    opacity: 0,
    scale: 0.98,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#zazitek .container.inner",
      start: "top 65%",
      toggleActions: "play none none none"
    }
  });

  // ============================================
  // SUBTLE HOVER EFFECTS
  // ============================================
  
  // Buttons - gentle lift
  document.querySelectorAll(".btn a").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        y: -2,
        duration: 0.25,
        ease: "power2.out"
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        y: 0,
        duration: 0.25,
        ease: "power2.out"
      });
    });
  });

  // Hamburger hover - subtle scale (reusing hamburger from Lenis setup)
  if (hamburger) {
    hamburger.addEventListener("mouseenter", () => {
      gsap.to(hamburger, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });
    });
    hamburger.addEventListener("mouseleave", () => {
      gsap.to(hamburger, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  }

  // Accordion items - subtle feedback
  document.querySelectorAll(".at-title").forEach(title => {
    title.addEventListener("mouseenter", () => {
      gsap.to(title, {
        x: 5,
        duration: 0.2,
        ease: "power2.out"
      });
    });
    title.addEventListener("mouseleave", () => {
      gsap.to(title, {
        x: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  });

});
