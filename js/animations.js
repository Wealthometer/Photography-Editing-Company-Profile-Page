// Advanced GSAP animations for Photographer Portfolio

// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Initialize GSAP animations
document.addEventListener("DOMContentLoaded", () => {
  initGSAPAnimations()
  initScrollTriggerAnimations()
  initHoverAnimations()
  initCameraAnimations()
  initTextAnimations()
})

// Main GSAP animations initialization
function initGSAPAnimations() {
  // Set initial states
  gsap.set(".title-line", { y: 100, opacity: 0 })
  gsap.set(".hero-subtitle", { y: 30, opacity: 0 })
  gsap.set(".hero-stats", { y: 30, opacity: 0 })
  gsap.set(".hero-cta", { y: 30, opacity: 0 })
  gsap.set(".floating-letter", { opacity: 0, scale: 0 })
  gsap.set(".photo-frame", { opacity: 0, scale: 0, rotation: 45 })
}

// ScrollTrigger animations
function initScrollTriggerAnimations() {
  // Hero section animations
  const heroTimeline = gsap.timeline({ delay: 3 })

  heroTimeline
    .to(".title-line", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })
    .to(
      ".hero-subtitle",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5",
    )
    .to(
      ".hero-stats",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )
    .to(
      ".hero-cta",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )
    .to(
      ".floating-letter",
      {
        opacity: 0.3,
        scale: 1,
        duration: 2,
        stagger: {
          amount: 2,
          from: "random",
        },
        ease: "back.out(1.7)",
      },
      "-=1",
    )
    .to(
      ".photo-frame",
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "elastic.out(1, 0.5)",
      },
      "-=1.5",
    )

  // Services section
  gsap.utils.toArray(".service-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        y: 60,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      },
    )
  })

  // Portfolio items
  gsap.utils.toArray(".portfolio-item").forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        y: 80,
        opacity: 0,
        rotationY: 45,
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.15,
      },
    )
  })

  // Testimonials
  gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        rotation: index % 2 === 0 ? -5 : 5,
      },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.2,
      },
    )
  })

  // Section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.fromTo(
      title,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Parallax effects
  gsap.utils.toArray(".photo-frame").forEach((frame) => {
    gsap.to(frame, {
      y: -50,
      scrollTrigger: {
        trigger: frame,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })
  })
}

// Hover animations
function initHoverAnimations() {
  // Service cards
  gsap.utils.toArray(".service-card").forEach((card) => {
    const icon = card.querySelector(".service-icon")

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -15,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(icon, {
        scale: 1.2,
        rotation: 10,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })

  // Portfolio items
  gsap.utils.toArray(".portfolio-item").forEach((item) => {
    const image = item.querySelector(".portfolio-image img")
    const overlay = item.querySelector(".portfolio-overlay")
    const info = item.querySelector(".portfolio-info")

    item.addEventListener("mouseenter", () => {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.fromTo(info, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "power2.out" })
    })

    item.addEventListener("mouseleave", () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })

  // Buttons
  gsap.utils.toArray(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })
}

// 3D Camera animations
function initCameraAnimations() {
  const camera = document.querySelector(".camera-3d-model")

  if (camera) {
    // Continuous floating animation
    gsap.to(camera, {
      y: -20,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })

    gsap.to(camera, {
      rotationY: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    })

    // Mouse interaction
    camera.addEventListener("mousemove", (e) => {
      const rect = camera.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      gsap.to(camera, {
        rotationX: y * 20,
        rotationY: x * 20,
        duration: 0.5,
        ease: "power2.out",
      })
    })

    camera.addEventListener("mouseleave", () => {
      gsap.to(camera, {
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      })
    })

    // Click animation
    camera.addEventListener("click", () => {
      gsap
        .timeline()
        .to(camera, {
          scale: 1.2,
          duration: 0.1,
          ease: "power2.out",
        })
        .to(camera, {
          scale: 1,
          rotation: 360,
          duration: 0.8,
          ease: "back.out(1.7)",
        })
    })
  }
}

// Text animations
function initTextAnimations() {
  // Floating letters mouse interaction
  const letters = document.querySelectorAll(".floating-letter")

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5
    const mouseY = e.clientY / window.innerHeight - 0.5

    letters.forEach((letter, index) => {
      const speed = ((index % 5) + 1) * 0.3
      const x = mouseX * speed * 100
      const y = mouseY * speed * 100
      const z = Math.sin(Date.now() * 0.001 + index) * 50

      gsap.to(letter, {
        x: x,
        y: y,
        z: z,
        duration: 1,
        ease: "power2.out",
      })
    })
  })

  // Text reveal animation for section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    const chars = title.textContent.split("")
    title.innerHTML = chars.map((char) => `<span>${char}</span>`).join("")

    gsap.fromTo(
      title.querySelectorAll("span"),
      {
        y: 100,
        opacity: 0,
        rotationX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })
}

// Utility function for random animations
function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

// Performance optimization
gsap.config({
  force3D: true,
  nullTargetWarn: false,
})

// Refresh ScrollTrigger on window resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh()
})
