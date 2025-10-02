// Highlight Active Page in Navigation
function setActivePage() {
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
window.onload = setActivePage;

// Hamburger Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
    menuToggle.classList.toggle("open");
  });
}

// Counter Animation
const counters = document.querySelectorAll(".counter");
const speed = 200; // lower = faster

counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const increment = Math.ceil(target / speed);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target;
    }
  };

  // Run counter when in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(counter); // run only once
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(counter);
});

/*Hero Carousel*/
let slides = document.querySelectorAll(".slide");
let dotsContainer = document.querySelector(".carousel-dots");
let currentIndex = 0;
let slideInterval;

// Create dots dynamically
slides.forEach((_, i) => {
  let dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    showSlide(i);
  });
});

let dots = document.querySelectorAll(".carousel-dots span");

// Show slide function
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      dots[i].classList.add("active");
    }
  });
  currentIndex = index;
}

// Next/Prev Controls
document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
  resetInterval();
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
  resetInterval();
});

// Auto Slide
function startSlideShow() {
  slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000); // 5s
}

function resetInterval() {
  clearInterval(slideInterval);
  startSlideShow();
}

// Init
showSlide(0);
startSlideShow();

/*The scroll animation*/
// Universal Scroll Animation System
class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
      animateOnce: true,
      ...options,
    };

    this.observer = null;
    this.init();
  }

  init() {
    // Create Intersection Observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Stop observing if animateOnce is true
          if (this.options.animateOnce) {
            this.observer.unobserve(entry.target);
          }
        } else if (!this.options.animateOnce) {
          // Remove visible class if element is out of view and animateOnce is false
          entry.target.classList.remove("visible");
        }
      });
    }, this.options);

    // Start observing elements
    this.observe();
  }

  observe() {
    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => this.observer.observe(el));
  }

  // Method to add new elements dynamically
  addElement(element) {
    this.observer.observe(element);
  }

  // Method to refresh/re-observe all elements
  refresh() {
    this.observe();
  }

  // Method to destroy observer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const scrollAnimations = new ScrollAnimations({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    animateOnce: false, // Set to false for repeating animations
  });

  // Make it globally available for dynamic content
  window.scrollAnimations = scrollAnimations;
});

// Example of adding animations to dynamic content
function addDynamicContent() {
  const newElement = document.createElement("div");
  newElement.className = "scroll-animate fade-up";
  newElement.innerHTML = "<p>I was added dynamically!</p>";

  document.body.appendChild(newElement);
  window.scrollAnimations.addElement(newElement);
}

//Testimonials
let currentSlide = 0;
const totalSlides = 4;
let autoSlideInterval;

function updateCarousel() {
  const container = document.getElementById("carouselContainer");
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".nav-dot");

  // Move carousel
  container.style.transform = `translateX(-${currentSlide * 25}%)`;

  // Update active states
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
  resetAutoSlide();
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
  resetAutoSlide();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  }
}

// Initialize carousel
document.addEventListener("DOMContentLoaded", function () {
  const carouselWrapper = document.querySelector(".carousel-wrapper");

  // Add touch event listeners
  carouselWrapper.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });
  carouselWrapper.addEventListener("touchend", handleTouchEnd, {
    passive: true,
  });

  // Start auto-slide
  startAutoSlide();

  // Pause auto-slide on hover (desktop only)
  carouselWrapper.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  carouselWrapper.addEventListener("mouseleave", () => {
    startAutoSlide();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      previousSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
});

// Pause auto-slide when page is not visible
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    clearInterval(autoSlideInterval);
  } else {
    startAutoSlide();
  }
});

//faq section
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  });

  // Add smooth scroll animation for CTA button
  document.querySelector(".cta-button").addEventListener("click", function (e) {
    e.preventDefault();
    // Add your contact form scroll logic here
    console.log("Contact button clicked");
  });

  // Add entrance animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Initially hide FAQ items for animation
  faqItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
  });
});


//Footer
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMsg = document.getElementById('newsletterMsg');

newsletterForm.addEventListener('submit', function(e) {
  e.preventDefault();

  if (newsletterEmail.value.trim() === "") {
    newsletterMsg.style.color = "red";
    newsletterMsg.textContent = "Please enter a valid email.";
  } else {
    newsletterMsg.style.color = "lightgreen";
    newsletterMsg.textContent = "Thank you for subscribing!";
    newsletterEmail.value = "";
  }
});
