// Contact page specific JavaScript

// Import gsap
const gsap = window.gsap

document.addEventListener("DOMContentLoaded", () => {
  initContactForm()
  initFAQ()
  initFormAnimations()
})

// Contact form functionality
function initContactForm() {
  const form = document.getElementById("contactForm")
  const submitBtn = form.querySelector(".submit-btn")
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")
  const formSuccess = document.getElementById("formSuccess")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm(form)) {
      return
    }

    // Show loading state
    submitBtn.disabled = true
    btnText.style.display = "none"
    btnLoading.style.display = "inline-flex"

    // Simulate form submission
    try {
      await simulateFormSubmission()

      // Hide form and show success message
      gsap.to(form, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          form.style.display = "none"
          formSuccess.style.display = "block"

          gsap.fromTo(formSuccess, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        },
      })
    } catch (error) {
      // Handle error
      showFormError("Something went wrong. Please try again.")

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

      // Shake animation for error
      gsap.to(field, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power2.out",
      })
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        formGroup.classList.add("error")
        isValid = false

        gsap.to(field, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.5,
          ease: "power2.out",
        })
      }
    }
  })

  return isValid
}

// Simulate form submission
function simulateFormSubmission() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

// Show form error
function showFormError(message) {
  // Create error message element
  const errorDiv = document.createElement("div")
  errorDiv.className = "form-error"
  errorDiv.textContent = message
  errorDiv.style.cssText = `
        background: #ff4757;
        color: white;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
    `

  // Insert error message
  const form = document.getElementById("contactForm")
  form.insertBefore(errorDiv, form.firstChild)

  // Animate error message
  gsap.fromTo(errorDiv, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 })

  // Remove error after 5 seconds
  setTimeout(() => {
    gsap.to(errorDiv, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => errorDiv.remove(),
    })
  }, 5000)
}

// FAQ functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")
    const icon = item.querySelector(".faq-icon i")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
          const otherAnswer = otherItem.querySelector(".faq-answer")
          const otherIcon = otherItem.querySelector(".faq-icon i")

          gsap.to(otherAnswer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          })

          gsap.to(otherIcon, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })

      // Toggle current item
      if (isActive) {
        // Close
        item.classList.remove("active")
        gsap.to(answer, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      } else {
        // Open
        item.classList.add("active")
        gsap.set(answer, { height: "auto" })
        const height = answer.offsetHeight
        gsap.fromTo(
          answer,
          { height: 0, opacity: 0 },
          {
            height: height,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
        )
        gsap.to(icon, {
          rotation: 45,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    })
  })
}

// Form input animations
function initFormAnimations() {
  const formGroups = document.querySelectorAll(".form-group")

  formGroups.forEach((group) => {
    const input = group.querySelector("input, select, textarea")
    const label = group.querySelector("label")

    if (!input || !label) return

    // Focus animations
    input.addEventListener("focus", () => {
      gsap.to(label, {
        y: -25,
        scale: 0.85,
        color: "#000",
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(group.querySelector(".form-line"), {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    // Blur animations
    input.addEventListener("blur", () => {
      if (!input.value) {
        gsap.to(label, {
          y: 0,
          scale: 1,
          color: "#666",
          duration: 0.3,
          ease: "power2.out",
        })
      }

      gsap.to(group.querySelector(".form-line"), {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    // Check if input has value on load
    if (input.value) {
      gsap.set(label, {
        y: -25,
        scale: 0.85,
        color: "#000",
      })
    }
  })

  // Checkbox animation
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        gsap.to(checkbox, {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        })
      }
    })
  })
}
