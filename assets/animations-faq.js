// ============================================
// GSAP Animations for Terézia & Filip Wedding
// FAQ Page - Subtle & Elegant Version
// With Lenis Smooth Scrolling
// ============================================

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  // ============================================
  // LENIS SMOOTH SCROLL SETUP
  // ============================================
  
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

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
  // FAQ SECTION - Main title
  // ============================================
  
  gsap.from("#faq > .container > h2", {
    y: 30,
    opacity: 0,
    duration: 0.9,
    delay: 0.3,
    ease: "power2.out"
  });

  // ============================================
  // FAQ QUESTIONS - Staggered reveal
  // ============================================
  
  gsap.utils.toArray("#faq .question").forEach((question, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: question,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.from(question.querySelector(".question-title"), {
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    })
    .from(question.querySelector(".question-text"), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");
  });

  // ============================================
  // FAQ DIVIDERS - Grow from center
  // ============================================
  
  gsap.utils.toArray("#faq .line hr").forEach(hr => {
    gsap.from(hr, {
      scaleX: 0,
      duration: 0.6,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: hr,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });

  // ============================================
  // COLOR PALETTE - Staggered pop in
  // ============================================
  
  gsap.from(".paleta .barva", {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".paleta",
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  // ============================================
  // HR SECTION DIVIDER
  // ============================================
  
  gsap.from("section.hr hr", {
    scaleX: 0,
    duration: 0.8,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: "section.hr",
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  // ============================================
  // UBYTOVANI SECTION - Transport options
  // ============================================
  
  gsap.from("#ubytovani > .container > h2", {
    y: 25,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#ubytovani",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });

  // Hotel/Transport cards - staggered reveal
  gsap.utils.toArray("#ubytovani .hotel").forEach((hotel, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hotel,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    const image = hotel.querySelector(".image");
    const description = hotel.querySelector(".description");
    
    // Alternate animation direction based on layout
    if (index % 2 === 0) {
      // Image on left
      if (image) {
        tl.from(image, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
      if (description) {
        tl.from(description, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");
      }
    } else {
      // Image on right
      if (description) {
        tl.from(description, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
      if (image) {
        tl.from(image, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");
      }
    }

    // Animate inner elements
    const hr = description?.querySelector("hr");
    const h3 = description?.querySelector("h3");
    const p = description?.querySelector("p");
    const btn = description?.querySelector(".btn");

    if (h3) {
      tl.from(h3, {
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4");
    }

    if (hr) {
      tl.from(hr, {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, "-=0.3");
    }

    if (p) {
      tl.from(p, {
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2");
    }

    if (btn) {
      tl.from(btn, {
        y: 10,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");
    }
  });

  // ============================================
  // SUBTLE HOVER EFFECTS
  // ============================================
  
  // Buttons - gentle lift
  document.querySelectorAll(".btn a, a.btn").forEach(btn => {
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

  // Hamburger hover - subtle scale
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

  // Color palette hover
  document.querySelectorAll(".paleta .barva").forEach(barva => {
    barva.addEventListener("mouseenter", () => {
      gsap.to(barva, {
        scale: 1.15,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    barva.addEventListener("mouseleave", () => {
      gsap.to(barva, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

});
