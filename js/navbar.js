// Dedicated Navbar Functionality
// Handles all navigation interactions and animations

class Navbar {
  constructor() {
    this.init()
  }

  init() {
    this.setupElements()
    this.setupEventListeners()
    this.setupScrollBehavior()
    this.setupKeyboardNavigation()
  }

  setupElements() {
    // Main navigation elements
    this.navbar = document.querySelector(".main-nav")
    this.menuToggle = document.querySelector(".menu-toggle")
    this.hamburger = document.querySelector(".hamburger")
    this.navOverlay = document.querySelector(".nav-overlay")
    this.navLinks = document.querySelectorAll(".nav-links li")
    this.navLinksAnchors = document.querySelectorAll(".nav-links a")
    this.footer = document.querySelector("footer")

    // State management
    this.isMenuOpen = false
    this.isInFooter = false
    this.lastScrollY = window.scrollY

    // Set stagger animation delays
    this.navLinks.forEach((link, index) => {
      link.style.setProperty("--i", index + 1)
    })
  }

  setupEventListeners() {
    // Menu toggle click
    if (this.menuToggle) {
      this.menuToggle.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.toggleMenu()
      })
    }

    // Close menu when clicking on overlay
    if (this.navOverlay) {
      this.navOverlay.addEventListener("click", (e) => {
        if (e.target === this.navOverlay) {
          this.closeMenu()
        }
      })
    }

    // Close menu when clicking on nav links
    this.navLinksAnchors.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMenu()
      })
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu()
      }
    })

    // Prevent menu opening in footer
    window.addEventListener(
      "scroll",
      this.debounce(() => {
        this.checkFooterPosition()
      }, 10),
    )
  }

  setupScrollBehavior() {
    window.addEventListener(
      "scroll",
      this.debounce(() => {
        this.handleScroll()
      }, 10),
    )
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (this.isMenuOpen) {
        if (e.key === "Escape") {
          this.closeMenu()
        }

        // Tab navigation within menu
        if (e.key === "Tab") {
          this.handleTabNavigation(e)
        }
      }
    })
  }

  toggleMenu() {
    // Don't open menu if in footer section
    if (this.isInFooter && !this.isMenuOpen) {
      this.showFooterWarning()
      return
    }

    if (this.isMenuOpen) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }

  openMenu() {
    if (this.isInFooter) return

    this.isMenuOpen = true

    // Add classes
    this.menuToggle?.classList.add("active")
    this.navOverlay?.classList.add("active")
    document.body.classList.add("nav-open")

    // Disable scroll
    document.body.style.overflow = "hidden"

    // Store current scroll position
    this.scrollPosition = window.pageYOffset

    // Position overlay to fill entire viewport
    if (this.navOverlay) {
      this.navOverlay.style.position = "fixed"
      this.navOverlay.style.top = "0"
      this.navOverlay.style.left = "0"
      this.navOverlay.style.width = "100vw"
      this.navOverlay.style.height = "100vh"
      this.navOverlay.style.zIndex = "9999"
    }

    // Animate hamburger
    this.animateHamburger(true)

    // Animate nav links with stagger
    this.animateNavLinks(true)

    // Focus management
    this.trapFocus()
  }

  closeMenu() {
    this.isMenuOpen = false

    // Remove classes
    this.menuToggle?.classList.remove("active")
    this.navOverlay?.classList.remove("active")
    document.body.classList.remove("nav-open")

    // Re-enable scroll
    document.body.style.overflow = ""

    // Animate hamburger
    this.animateHamburger(false)

    // Animate nav links
    this.animateNavLinks(false)

    // Remove focus trap
    this.removeFocusTrap()
  }

  animateHamburger(isOpen) {
    if (!this.hamburger) return

    const spans = this.hamburger.querySelectorAll("span")

    if (isOpen) {
      spans[0]?.style.setProperty("transform", "translateY(9px) rotate(45deg)")
      spans[1]?.style.setProperty("opacity", "0")
      spans[2]?.style.setProperty("transform", "translateY(-9px) rotate(-45deg)")
    } else {
      spans[0]?.style.setProperty("transform", "translateY(0) rotate(0)")
      spans[1]?.style.setProperty("opacity", "1")
      spans[2]?.style.setProperty("transform", "translateY(0) rotate(0)")
    }
  }

  animateNavLinks(isOpen) {
    this.navLinks.forEach((link, index) => {
      if (isOpen) {
        setTimeout(
          () => {
            link.style.opacity = "1"
            link.style.transform = "translateY(0)"
          },
          index * 100 + 200,
        )
      } else {
        link.style.opacity = "0"
        link.style.transform = "translateY(20px)"
      }
    })
  }

  handleScroll() {
    const currentScrollY = window.scrollY

    // Update navbar style based on scroll
    if (this.navbar) {
      if (currentScrollY > 50) {
        this.navbar.classList.add("scrolled")
      } else {
        this.navbar.classList.remove("scrolled")
      }
    }

    // Check if scrolling in footer
    this.checkFooterPosition()

    this.lastScrollY = currentScrollY
  }

  checkFooterPosition() {
    if (!this.footer) return

    const footerRect = this.footer.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Check if footer is visible in viewport
    this.isInFooter = footerRect.top < viewportHeight && footerRect.bottom > 0

    // Close menu if opened and now in footer
    if (this.isInFooter && this.isMenuOpen) {
      this.closeMenu()
    }

    // Add visual indicator when in footer
    if (this.menuToggle) {
      if (this.isInFooter) {
        this.menuToggle.classList.add("disabled")
        this.menuToggle.style.opacity = "0.5"
        this.menuToggle.style.pointerEvents = "none"
      } else {
        this.menuToggle.classList.remove("disabled")
        this.menuToggle.style.opacity = "1"
        this.menuToggle.style.pointerEvents = "auto"
      }
    }
  }

  showFooterWarning() {
    // Create temporary warning message
    const warning = document.createElement("div")
    warning.className = "footer-warning"
    warning.textContent = "Navigation disabled in footer section"
    warning.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 10000;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;
    `

    document.body.appendChild(warning)

    // Animate in
    setTimeout(() => {
      warning.style.opacity = "1"
    }, 10)

    // Remove after 2 seconds
    setTimeout(() => {
      warning.style.opacity = "0"
      setTimeout(() => {
        warning.remove()
      }, 300)
    }, 2000)
  }

  trapFocus() {
    // Get all focusable elements within the nav overlay
    const focusableElements = this.navOverlay?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')

    if (!focusableElements || focusableElements.length === 0) return

    this.firstFocusableElement = focusableElements[0]
    this.lastFocusableElement = focusableElements[focusableElements.length - 1]

    // Focus first element
    this.firstFocusableElement?.focus()
  }

  handleTabNavigation(e) {
    if (!this.firstFocusableElement || !this.lastFocusableElement) return

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault()
        this.lastFocusableElement.focus()
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault()
        this.firstFocusableElement.focus()
      }
    }
  }

  removeFocusTrap() {
    this.firstFocusableElement = null
    this.lastFocusableElement = null
  }

  // Utility function
  debounce(func, wait) {
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
}

// Initialize navbar when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navbar()
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden && window.navbar?.isMenuOpen) {
    window.navbar.closeMenu()
  }
})

// Export for global access if needed
window.Navbar = Navbar
