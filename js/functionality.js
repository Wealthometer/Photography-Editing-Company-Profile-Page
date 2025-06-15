// Comprehensive Functionality for Photographer Portfolio
// Handles all interactive features across all pages

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeCounters()
  initializeSkillBars()
  initializeAccordion()
  initializePortfolioActions()
  initializeFormHandling()
  initializeLightbox()
  initializeFilterSystem()
  initializeScrollAnimations()
  initializeLoadMore()
  initializeNavigation()
  initializeCursor()
  initializeLoadingScreen()
  initializeParallax()
  initializeTestimonialSlider()
  initializeImageLazyLoading()
})

// ===== COUNTER ANIMATIONS =====
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const duration = 2000 // 2 seconds
    const increment = target / (duration / 16) // 60fps
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        counter.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  }

  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
          entry.target.classList.add("animated")
          animateCounter(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// ===== SKILL BAR ANIMATIONS =====
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const animateSkillBar = (bar) => {
    const targetWidth = bar.style.width
    bar.style.setProperty("--target-width", targetWidth)
    bar.style.width = "0%"

    setTimeout(() => {
      bar.style.transition = "width 1.5s ease-out"
      bar.style.width = targetWidth
    }, 100)
  }

  // Intersection Observer for skill bars
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
          entry.target.classList.add("animated")
          animateSkillBar(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
}

// ===== ACCORDION FUNCTIONALITY =====
function initializeAccordion() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")
    const icon = item.querySelector(".faq-icon i")

    if (!question || !answer || !icon) return

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
          const otherAnswer = otherItem.querySelector(".faq-answer")
          const otherIcon = otherItem.querySelector(".faq-icon i")

          otherAnswer.style.maxHeight = "0px"
          otherAnswer.style.opacity = "0"
          otherIcon.style.transform = "rotate(0deg)"
        }
      })

      // Toggle current item
      if (isActive) {
        item.classList.remove("active")
        answer.style.maxHeight = "0px"
        answer.style.opacity = "0"
        icon.style.transform = "rotate(0deg)"
      } else {
        item.classList.add("active")
        answer.style.maxHeight = answer.scrollHeight + "px"
        answer.style.opacity = "1"
        icon.style.transform = "rotate(45deg)"
      }
    })

    // Initialize closed state
    answer.style.maxHeight = "0px"
    answer.style.opacity = "0"
    answer.style.overflow = "hidden"
    answer.style.transition = "max-height 0.3s ease, opacity 0.3s ease"
    icon.style.transition = "transform 0.3s ease"
  })
}

// ===== PORTFOLIO ACTIONS (View, Like, Share) =====
function initializePortfolioActions() {
  // Like button functionality
  document.addEventListener("click", (e) => {
    if (e.target.closest(".like-btn")) {
      const likeBtn = e.target.closest(".like-btn")
      const icon = likeBtn.querySelector("i")

      if (likeBtn.classList.contains("liked")) {
        // Unlike
        likeBtn.classList.remove("liked")
        icon.style.color = ""
        icon.style.transform = "scale(0.8)"
        setTimeout(() => {
          icon.style.transform = "scale(1)"
        }, 150)
      } else {
        // Like
        likeBtn.classList.add("liked")
        icon.style.color = "#ff4757"
        icon.style.transform = "scale(1.3)"
        setTimeout(() => {
          icon.style.transform = "scale(1)"
        }, 150)

        // Create heart particles
        createHeartParticles(likeBtn)
      }
    }

    // Share button functionality
    if (e.target.closest(".share-btn")) {
      const shareBtn = e.target.closest(".share-btn")
      const portfolioItem = shareBtn.closest(".portfolio-item, .gallery-item")
      const title = portfolioItem.querySelector("h3").textContent

      if (navigator.share) {
        navigator.share({
          title: title,
          text: `Check out this amazing photography work: ${title}`,
          url: window.location.href,
        })
      } else {
        // Fallback: copy to clipboard
        const url = window.location.href
        navigator.clipboard.writeText(url).then(() => {
          showNotification("Link copied to clipboard!")
        })
      }
    }
  })
}

// Create heart particles effect
function createHeartParticles(button) {
  const rect = button.getBoundingClientRect()
  const particles = []

  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div")
    particle.innerHTML = "♥"
    particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            color: #ff4757;
            font-size: 12px;
            pointer-events: none;
            z-index: 10000;
            transition: all 1s ease-out;
        `

    document.body.appendChild(particle)
    particles.push(particle)

    // Animate particle
    setTimeout(() => {
      particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${-50 - Math.random() * 50}px)`
      particle.style.opacity = "0"
      particle.style.transform += " scale(0)"
    }, 10)

    // Remove particle
    setTimeout(() => {
      particle.remove()
    }, 1000)
  }
}

// ===== LIGHTBOX FUNCTIONALITY =====
function initializeLightbox() {
  const viewButtons = document.querySelectorAll(".view-btn")
  const lightbox = document.getElementById("lightboxModal")

  if (!lightbox) return

  const lightboxImage = document.getElementById("lightboxImage")
  const lightboxTitle = document.getElementById("lightboxTitle")
  const lightboxDescription = document.getElementById("lightboxDescription")
  const lightboxMeta = document.getElementById("lightboxMeta")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxOverlay = document.querySelector(".lightbox-overlay")
  const lightboxPrev = document.querySelector(".lightbox-prev")
  const lightboxNext = document.querySelector(".lightbox-next")

  let currentImageIndex = 0
  const images = []

  // Collect all images data
  viewButtons.forEach((button, index) => {
    const galleryItem = button.closest(".gallery-item, .portfolio-item")
    const img = galleryItem.querySelector("img")
    const title = galleryItem.querySelector("h3").textContent
    const description = galleryItem.querySelector("p").textContent
    const meta = galleryItem.querySelector(".gallery-meta, .portfolio-meta")

    images.push({
      src: button.getAttribute("data-image") || img.src,
      title: title,
      description: description,
      meta: meta ? meta.innerHTML : "",
    })

    button.addEventListener("click", () => {
      currentImageIndex = index
      openLightbox()
    })
  })

  function openLightbox() {
    const image = images[currentImageIndex]

    lightboxImage.src = image.src
    lightboxTitle.textContent = image.title
    lightboxDescription.textContent = image.description
    lightboxMeta.innerHTML = image.meta

    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = ""
  }

  function showPrevImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
    updateLightboxContent()
  }

  function showNextImage() {
    currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
    updateLightboxContent()
  }

  function updateLightboxContent() {
    const image = images[currentImageIndex]

    lightboxImage.style.opacity = "0"
    setTimeout(() => {
      lightboxImage.src = image.src
      lightboxTitle.textContent = image.title
      lightboxDescription.textContent = image.description
      lightboxMeta.innerHTML = image.meta
      lightboxImage.style.opacity = "1"
    }, 150)
  }

  // Event listeners
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox)
  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox)
  if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevImage)
  if (lightboxNext) lightboxNext.addEventListener("click", showNextImage)

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") showPrevImage()
      if (e.key === "ArrowRight") showNextImage()
    }
  })
}

// ===== FILTER SYSTEM =====
function initializeFilterSystem() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item, .gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filterValue = this.getAttribute("data-filter")

      // Filter items
      portfolioItems.forEach((item, index) => {
        const category = item.getAttribute("data-category")

        if (filterValue === "all" || category === filterValue) {
          item.style.display = "block"
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"

          setTimeout(() => {
            item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, index * 50)
        } else {
          item.style.transition = "opacity 0.3s ease, transform 0.3s ease"
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"

          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")

  if (!contactForm) return

  // Form input animations
  const formGroups = document.querySelectorAll(".form-group")

  formGroups.forEach((group) => {
    const input = group.querySelector("input, select, textarea")
    const label = group.querySelector("label")

    if (!input || !label) return

    // Focus animations
    input.addEventListener("focus", () => {
      label.style.transform = "translateY(-25px) scale(0.85)"
      label.style.color = "#000"
    })

    // Blur animations
    input.addEventListener("blur", () => {
      if (!input.value) {
        label.style.transform = "translateY(0) scale(1)"
        label.style.color = "#666"
      }
    })

    // Check if input has value on load
    if (input.value) {
      label.style.transform = "translateY(-25px) scale(0.85)"
      label.style.color = "#000"
    }
  })

  // Form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateForm(contactForm)) {
      return
    }

    const submitBtn = contactForm.querySelector(".submit-btn")
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    // Show loading state
    submitBtn.disabled = true
    btnText.style.display = "none"
    btnLoading.style.display = "inline-flex"

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Hide form and show success message
      contactForm.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      contactForm.style.opacity = "0"
      contactForm.style.transform = "translateY(-20px)"

      setTimeout(() => {
        contactForm.style.display = "none"
        formSuccess.style.display = "block"
        formSuccess.style.opacity = "0"
        formSuccess.style.transform = "translateY(20px)"

        setTimeout(() => {
          formSuccess.style.transition = "opacity 0.5s ease, transform 0.5s ease"
          formSuccess.style.opacity = "1"
          formSuccess.style.transform = "translateY(0)"
        }, 50)
      }, 500)
    } catch (error) {
      showNotification("Something went wrong. Please try again.", "error")

      // Reset button
      submitBtn.disabled = false
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
    }
  })
}

// Form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    const value = field.value.trim()
    const formGroup = field.closest(".form-group")

    // Remove existing error
    formGroup.classList.remove("error")

    if (!value) {
      formGroup.classList.add("error")
      isValid = false

      // Shake animation
      field.style.animation = "shake 0.5s ease-in-out"
      setTimeout(() => {
        field.style.animation = ""
      }, 500)
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        formGroup.classList.add("error")
        isValid = false

        field.style.animation = "shake 0.5s ease-in-out"
        setTimeout(() => {
          field.style.animation = ""
        }, 500)
      }
    }
  })

  return isValid
}

// ===== LOAD MORE FUNCTIONALITY =====
function initializeLoadMore() {
  const loadMoreBtn = document.querySelector(".load-more-btn")
  const galleryGrid = document.getElementById("galleryGrid")

  if (!loadMoreBtn || !galleryGrid) return

  loadMoreBtn.addEventListener("click", () => {
    // Animate button
    loadMoreBtn.style.transform = "scale(0.95)"
    setTimeout(() => {
      loadMoreBtn.style.transform = "scale(1)"
    }, 100)

    // Show loading
    const originalText = loadMoreBtn.innerHTML
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'

    // Simulate loading
    setTimeout(() => {
      // Add new items (this would normally come from an API)
      const newItems = createNewGalleryItems()

      newItems.forEach((item, index) => {
        galleryGrid.appendChild(item)

        // Animate new item
        item.style.opacity = "0"
        item.style.transform = "translateY(50px) scale(0.8)"

        setTimeout(() => {
          item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
          item.style.opacity = "1"
          item.style.transform = "translateY(0) scale(1)"
        }, index * 100)
      })

      // Reset button
      loadMoreBtn.innerHTML = originalText

      // Hide button after loading (simulate no more items)
      setTimeout(() => {
        loadMoreBtn.style.transition = "opacity 0.5s ease"
        loadMoreBtn.style.opacity = "0"
        setTimeout(() => {
          loadMoreBtn.style.display = "none"
        }, 500)
      }, 1000)
    }, 1500)
  })
}

// Create new gallery items (placeholder function)
function createNewGalleryItems() {
  const items = []
  const categories = ["portrait", "landscape", "commercial", "street"]

  for (let i = 0; i < 4; i++) {
    const item = document.createElement("div")
    item.className = "gallery-item"
    item.setAttribute("data-category", categories[i % categories.length])

    item.innerHTML = `
            <div class="gallery-image">
                <img src="/placeholder.svg?height=600&width=400&text=New+Image+${i + 1}" alt="New Image ${i + 1}">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>New Image ${i + 1}</h3>
                        <p>Recently Added</p>
                        <div class="gallery-meta">
                            <span><i class="fas fa-camera"></i> Canon R5</span>
                            <span><i class="fas fa-eye"></i> f/2.8</span>
                            <span><i class="fas fa-clock"></i> 1/125s</span>
                        </div>
                    </div>
                    <div class="gallery-actions">
                        <button class="action-btn view-btn" data-image="/placeholder.svg?height=800&width=600&text=New+Image+${i + 1}+Full">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn like-btn">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn share-btn">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
            </div>
        `

    items.push(item)
  }

  return items
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
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
        } else if (entry.target.classList.contains("gallery-grid")) {
          animateGridItems(entry.target, ".gallery-item")
        } else if (entry.target.classList.contains("testimonials-container")) {
          animateGridItems(entry.target, ".testimonial-card")
        }
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const elementsToObserve = document.querySelectorAll(
    ".section-title, .section-subtitle, .services-grid, .portfolio-grid, .gallery-grid, .testimonials-container, .cta-content, .process-step, .timeline-item, .award-item, .contact-item",
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
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0) scale(1)"
    }, index * 100)
  })
}

// ===== NAVIGATION =====
function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle")
  const navOverlay = document.querySelector(".nav-overlay")
  const navLinks = document.querySelectorAll(".nav-links li")
  const mainNav = document.querySelector(".main-nav")

  // Set index for staggered animation
  navLinks.forEach((link, index) => {
    link.style.setProperty("--i", index + 1)
  })

  // Toggle menu
  if (menuToggle && navOverlay) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      navOverlay.classList.toggle("active")
      document.body.classList.toggle("no-scroll")
    })
  }

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuToggle && navOverlay) {
        menuToggle.classList.remove("active")
        navOverlay.classList.remove("active")
        document.body.classList.remove("no-scroll")
      }
    })
  })

  // Change navigation style on scroll
  if (mainNav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        mainNav.classList.add("scrolled")
      } else {
        mainNav.classList.remove("scrolled")
      }
    })
  }
}

// ===== CUSTOM CURSOR =====
function initializeCursor() {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  if (!cursor || !cursorFollower) return

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  // Change cursor size on hover over interactive elements
  const hoverElements = document.querySelectorAll(
    "a, button, .portfolio-item, .gallery-item, .service-card, .camera-3d-model",
  )

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

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen")

  if (!loadingScreen) return

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")

      // Start hero animations after loading
      startHeroAnimations()
    }, 2500)
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
    setTimeout(
      () => {
        line.style.transform = "translateY(0)"
        line.style.opacity = "1"
      },
      index * 200 + 500,
    )
  })

  // Animate other hero elements
  if (heroSubtitle) {
    setTimeout(() => {
      heroSubtitle.style.transform = "translateY(0)"
      heroSubtitle.style.opacity = "1"
    }, 1200)
  }

  if (heroStats) {
    setTimeout(() => {
      heroStats.style.transform = "translateY(0)"
      heroStats.style.opacity = "1"
    }, 1400)
  }

  if (heroCta) {
    setTimeout(() => {
      heroCta.style.transform = "translateY(0)"
      heroCta.style.opacity = "1"
    }, 1600)
  }
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
  const parallaxElements = document.querySelectorAll(".photo-frame")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    parallaxElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`
    })
  })
}

// ===== TESTIMONIAL SLIDER =====
function initializeTestimonialSlider() {
  const testimonialCards = document.querySelectorAll(".testimonial-card")

  testimonialCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const quoteIcon = card.querySelector(".quote-icon")
      if (quoteIcon) {
        quoteIcon.style.animationPlayState = "paused"
      }
    })

    card.addEventListener("mouseleave", () => {
      const quoteIcon = card.querySelector(".quote-icon")
      if (quoteIcon) {
        quoteIcon.style.animationPlayState = "running"
      }
    })
  })
}

// ===== IMAGE LAZY LOADING =====
function initializeImageLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })
}

// ===== UTILITY FUNCTIONS =====

// Show notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === "success" ? "#00c9a7" : "#ff4757"};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Debounce function
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

// Smooth scrolling for anchor links
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

// Add shake animation to CSS
const shakeStyle = document.createElement("style")
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .scroll-reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .no-scroll {
        overflow: hidden;
    }
    
    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-bottom-color: #ff4757;
    }
    
    .form-group.error label {
        color: #ff4757;
    }
`
document.head.appendChild(shakeStyle)
