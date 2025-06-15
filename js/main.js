// Main JavaScript functionality for Photographer Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // Initialize loading screen
  initLoadingScreen()

  // Initialize navigation
  initNavigation()

  // Initialize custom cursor
  initCustomCursor()

  // Initialize floating text
  initFloatingText()

  // Initialize 3D camera interactions
  init3DCameraInteractions()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize stats counter
  initStatsCounter()

  // Initialize portfolio interactions
  initPortfolioInteractions()

  // Initialize testimonial interactions
  initTestimonialInteractions()
})

// Loading screen initialization
function initLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")

      // Start hero animations after loading
      startHeroAnimations()
    }, 2500)
  })
}

// Navigation initialization
function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle")
  const navOverlay = document.querySelector(".nav-overlay")
  const navLinks = document.querySelectorAll(".nav-links li")
  const mainNav = document.querySelector(".main-nav")

  // Set index for staggered animation
  navLinks.forEach((link, index) => {
    link.style.setProperty("--i", index + 1)
  })

  // Toggle menu
  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active")
    navOverlay.classList.toggle("active")
    document.body.classList.toggle("no-scroll")
  })

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navOverlay.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  })

  // Change navigation style on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      mainNav.classList.add("scrolled")
    } else {
      mainNav.classList.remove("scrolled")
    }
  })
}

// Custom cursor initialization
function initCustomCursor() {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  // Change cursor size on hover over interactive elements
  const hoverElements = document.querySelectorAll("a, button, .portfolio-item, .service-card, .camera-3d-model")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.border = "1px solid rgba(0, 0, 0, 0)"
      cursorFollower.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.border = "1px solid var(--primary-color)"
      cursorFollower.style.backgroundColor = "transparent"
    })
  })
}

// Floating text initialization
function initFloatingText() {
  const textContainer = document.getElementById("floatingTextContainer")
  const text = "PHOTOGRAPHY MOMENTS CAPTURE LIGHT SHADOW BEAUTY EMOTION STORY FRAME LENS FOCUS"
  const words = text.split(" ")

  words.forEach((word, index) => {
    for (let i = 0; i < word.length; i++) {
      const letter = document.createElement("div")
      letter.className = "floating-letter"
      letter.textContent = word[i]
      letter.style.setProperty("--delay", Math.random() * 20)

      // Random initial position
      letter.style.left = Math.random() * 100 + "%"
      letter.style.top = Math.random() * 100 + "%"

      textContainer.appendChild(letter)
    }
  })

  // Animate letters on mouse movement
  document.addEventListener("mousemove", (e) => {
    const letters = document.querySelectorAll(".floating-letter")
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    letters.forEach((letter, index) => {
      const speed = ((index % 3) + 1) * 0.5
      const x = (mouseX - 0.5) * speed * 50
      const y = (mouseY - 0.5) * speed * 50

      letter.style.transform = `translate(${x}px, ${y}px) translateZ(${Math.sin(Date.now() * 0.001 + index) * 20}px)`
    })
  })
}

// 3D Camera interactions
function init3DCameraInteractions() {
  const camera3D = document.getElementById("camera3D")

  camera3D.addEventListener("mousemove", (e) => {
    const rect = camera3D.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateX = (y / rect.height) * 30
    const rotateY = (x / rect.width) * 30

    camera3D.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
  })

  camera3D.addEventListener("mouseleave", () => {
    camera3D.style.transform = "rotateX(0deg) rotateY(0deg)"
  })

  // Camera click interaction
  camera3D.addEventListener("click", () => {
    camera3D.style.animation = "none"
    camera3D.style.transform = "rotateY(360deg) scale(1.1)"

    setTimeout(() => {
      camera3D.style.animation = "cameraFloat 6s ease-in-out infinite"
      camera3D.style.transform = "rotateX(0deg) rotateY(0deg)"
    }, 1000)
  })
}

// Scroll animations initialization
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")

        // Trigger staggered animations for grid items
        if (entry.target.classList.contains("services-grid")) {
          animateGridItems(entry.target, ".service-card")
        } else if (entry.target.classList.contains("portfolio-grid")) {
          animateGridItems(entry.target, ".portfolio-item")
        } else if (entry.target.classList.contains("testimonials-container")) {
          animateGridItems(entry.target, ".testimonial-card")
        }
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const elementsToObserve = document.querySelectorAll(
    ".section-title, .section-subtitle, .services-grid, .portfolio-grid, .testimonials-container, .cta-content",
  )

  elementsToObserve.forEach((el) => {
    el.classList.add("scroll-reveal")
    observer.observe(el)
  })
}

// Animate grid items with stagger
function animateGridItems(container, selector) {
  const items = container.querySelectorAll(selector)

  items.forEach((item, index) => {
    item.style.setProperty("--delay", index + 1)
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0) scale(1)"
    }, index * 100)
  })
}

// Stats counter initialization
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current)
    }, 16)
  }

  // Observe stats for animation trigger
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        statsObserver.unobserve(entry.target)
      }
    })
  })

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })
}

// Portfolio interactions
function initPortfolioInteractions() {
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      // Add subtle tilt effect
      const randomTilt = (Math.random() - 0.5) * 10
      item.style.transform = `translateY(-10px) rotate(${randomTilt}deg)`
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0) rotate(0deg)"
    })
  })
}

// Testimonial interactions
function initTestimonialInteractions() {
  const testimonialCards = document.querySelectorAll(".testimonial-card")

  testimonialCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Pause quote animation on hover
      const quoteIcon = card.querySelector(".quote-icon")
      if (quoteIcon) {
        quoteIcon.style.animationPlayState = "paused"
      }
    })

    card.addEventListener("mouseleave", () => {
      // Resume quote animation
      const quoteIcon = card.querySelector(".quote-icon")
      if (quoteIcon) {
        quoteIcon.style.animationPlayState = "running"
      }
    })
  })
}

// Start hero animations
function startHeroAnimations() {
  const titleLines = document.querySelectorAll(".title-line")
  const heroSubtitle = document.querySelector(".hero-subtitle")
  const heroStats = document.querySelector(".hero-stats")
  const heroCta = document.querySelector(".hero-cta")

  // Animate title lines
  titleLines.forEach((line, index) => {
    line.style.setProperty("--delay", index)
    setTimeout(
      () => {
        line.style.transform = "translateY(0)"
        line.style.opacity = "1"
      },
      index * 200 + 500,
    )
  })

  // Animate other hero elements
  setTimeout(() => {
    heroSubtitle.style.transform = "translateY(0)"
    heroSubtitle.style.opacity = "1"
  }, 1200)

  setTimeout(() => {
    heroStats.style.transform = "translateY(0)"
    heroStats.style.opacity = "1"
  }, 1400)

  setTimeout(() => {
    heroCta.style.transform = "translateY(0)"
    heroCta.style.opacity = "1"
  }, 1600)
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
