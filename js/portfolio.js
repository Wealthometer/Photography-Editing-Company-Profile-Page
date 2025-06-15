// Portfolio page specific JavaScript

import { gsap } from "gsap" // Declare the gsap variable

document.addEventListener("DOMContentLoaded", () => {
  initPortfolioFilter()
  initLightbox()
  initLoadMore()
  initLikeButtons()
})

// Portfolio filtering functionality
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filterValue = this.getAttribute("data-filter")

      // Filter items with animation
      galleryItems.forEach((item, index) => {
        const category = item.getAttribute("data-category")

        if (filterValue === "all" || category === filterValue) {
          // Show item
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power2.out",
            onStart: () => {
              item.style.display = "block"
            },
          })
        } else {
          // Hide item
          gsap.to(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              item.style.display = "none"
            },
          })
        }
      })
    })
  })
}

// Lightbox functionality
function initLightbox() {
  const viewButtons = document.querySelectorAll(".view-btn")
  const lightbox = document.getElementById("lightboxModal")
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
    const galleryItem = button.closest(".gallery-item")
    const img = galleryItem.querySelector("img")
    const title = galleryItem.querySelector("h3").textContent
    const description = galleryItem.querySelector("p").textContent
    const meta = galleryItem.querySelector(".gallery-meta").innerHTML

    images.push({
      src: button.getAttribute("data-image"),
      title: title,
      description: description,
      meta: meta,
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
    document.body.classList.add("no-scroll")

    // Animate lightbox open
    gsap.fromTo(
      lightbox.querySelector(".lightbox-container"),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
    )
  }

  function closeLightbox() {
    gsap.to(lightbox.querySelector(".lightbox-container"), {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        lightbox.classList.remove("active")
        document.body.classList.remove("no-scroll")
      },
    })
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

    gsap.to(lightboxImage, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        lightboxImage.src = image.src
        lightboxTitle.textContent = image.title
        lightboxDescription.textContent = image.description
        lightboxMeta.innerHTML = image.meta

        gsap.to(lightboxImage, { opacity: 1, duration: 0.2 })
      },
    })
  }

  // Event listeners
  lightboxClose.addEventListener("click", closeLightbox)
  lightboxOverlay.addEventListener("click", closeLightbox)
  lightboxPrev.addEventListener("click", showPrevImage)
  lightboxNext.addEventListener("click", showNextImage)

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") showPrevImage()
      if (e.key === "ArrowRight") showNextImage()
    }
  })
}

// Load more functionality
function initLoadMore() {
  const loadMoreBtn = document.querySelector(".load-more-btn")
  const galleryGrid = document.getElementById("galleryGrid")

  // Additional gallery items (would normally come from API)
  const additionalItems = [
    {
      category: "portrait",
      image: "/placeholder.svg?height=600&width=400&text=Portrait+3",
      title: "Creative Portrait",
      description: "Artistic Studio Session",
      camera: "Canon R5",
      aperture: "f/2.8",
      shutter: "1/160s",
    },
    {
      category: "landscape",
      image: "/placeholder.svg?height=600&width=400&text=Landscape+3",
      title: "Forest Path",
      description: "Nature Photography",
      camera: "Sony A7R IV",
      aperture: "f/8",
      shutter: "1/60s",
    },
    // Add more items as needed
  ]

  loadMoreBtn.addEventListener("click", () => {
    // Animate button
    gsap.to(loadMoreBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    })

    // Simulate loading
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'

    setTimeout(() => {
      // Add new items
      additionalItems.forEach((item, index) => {
        const galleryItem = createGalleryItem(item)
        galleryGrid.appendChild(galleryItem)

        // Animate new item
        gsap.fromTo(
          galleryItem,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
          },
        )
      })

      // Reset button
      loadMoreBtn.innerHTML = "Load More Images"

      // Hide button after loading (simulate no more items)
      setTimeout(() => {
        gsap.to(loadMoreBtn.parentElement, {
          opacity: 0,
          height: 0,
          duration: 0.5,
          ease: "power2.out",
        })
      }, 1000)
    }, 1500)
  })
}

// Create gallery item element
function createGalleryItem(item) {
  const galleryItem = document.createElement("div")
  galleryItem.className = "gallery-item"
  galleryItem.setAttribute("data-category", item.category)

  galleryItem.innerHTML = `
        <div class="gallery-image">
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="gallery-meta">
                        <span><i class="fas fa-camera"></i> ${item.camera}</span>
                        <span><i class="fas fa-eye"></i> ${item.aperture}</span>
                        <span><i class="fas fa-clock"></i> ${item.shutter}</span>
                    </div>
                </div>
                <div class="gallery-actions">
                    <button class="action-btn view-btn" data-image="${item.image}">
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

  return galleryItem
}

// Like button functionality
function initLikeButtons() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".like-btn")) {
      const likeBtn = e.target.closest(".like-btn")
      const icon = likeBtn.querySelector("i")

      if (likeBtn.classList.contains("liked")) {
        // Unlike
        likeBtn.classList.remove("liked")
        icon.style.color = ""
        gsap.to(icon, {
          scale: 0.8,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        })
      } else {
        // Like
        likeBtn.classList.add("liked")
        icon.style.color = "#ff4757"
        gsap.to(icon, {
          scale: 1.3,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        })

        // Create heart particles
        createHeartParticles(likeBtn)
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
    particle.style.position = "fixed"
    particle.style.left = rect.left + rect.width / 2 + "px"
    particle.style.top = rect.top + rect.height / 2 + "px"
    particle.style.color = "#ff4757"
    particle.style.fontSize = "12px"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "10000"

    document.body.appendChild(particle)
    particles.push(particle)

    // Animate particle
    gsap.to(particle, {
      x: (Math.random() - 0.5) * 100,
      y: -50 - Math.random() * 50,
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        particle.remove()
      },
    })
  }
}
