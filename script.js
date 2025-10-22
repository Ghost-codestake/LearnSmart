//Nav Scroll Animation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const startPosition = window.pageYOffset;
      const targetPosition = targetSection.offsetTop;
      const distance = targetPosition - startPosition;
      const duration = 1200; // Duration in milliseconds (1200ms = 1.2 seconds)
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      // Easing function for smooth animation
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});

// Mobile Dropdown Toggle
const dropdown = document.getElementById("dropdown");
dropdown.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
         if (e.target.tagName === "A" && e.target.parentElement.id === "dropdown") {
    e.preventDefault();
    dropdown.classList.toggle("active");
  }
}
});

// Close menu when clicking on a link (except dropdown parent)
document.querySelectorAll(".nav-links a, .cta-btn").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (!link.parentElement.classList.contains("dropdown")) {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    }
  });
});

//Count Animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat h2");
  const speed = 200; // lower = faster

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });
}

// Trigger when stats section appears in viewport
const statsSection = document.querySelector(".stats");
let statsShown = false;

window.addEventListener("scroll", () => {
  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100 && !statsShown) {
    animateCounters();
    statsShown = true;
  }
});

//Courses Display And Media queery control
const tabs = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".course-content");
const tabsContainer = document.querySelector(".tabs-container");
const swipeIndicator = document.querySelector(".swipe-indicator");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const course = tab.getAttribute("data-course");

    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    contents.forEach((content) => {
      if (content.getAttribute("data-content") === course) {
        content.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });
  });
});

// Hide swipe indicator after user scrolls
if (tabsContainer && swipeIndicator) {
  tabsContainer.addEventListener(
    "scroll",
    () => {
      swipeIndicator.style.opacity = "0";
      setTimeout(() => {
        swipeIndicator.style.display = "none";
      }, 300);
    },
    { once: true }
  );
}

// Testimonials Carousel
let currentTestimonialIndex = 0;
const testimonialsTrack = document.getElementById("testimonialsTrack");
const testimonialDots = document.querySelectorAll(".dot");
const totalTestimonials = 5;
let testimonialsPerView = 3;
let autoAdvanceInterval;

function updateTestimonialsPerView() {
  if (window.innerWidth <= 768) {
    testimonialsPerView = 1;
  } else if (window.innerWidth <= 1024) {
    testimonialsPerView = 2;
  } else {
    testimonialsPerView = 3;
  }
}

function updateTestimonialCarousel() {
  const cardWidth =
    testimonialsTrack.querySelector(".testimonial-card").offsetWidth;
  const gap = window.innerWidth <= 768 ? 24 : 32;
  const offset = -(currentTestimonialIndex * (cardWidth + gap));
  testimonialsTrack.style.transform = `translateX(${offset}px)`;

  // Update dots
  testimonialDots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === currentTestimonialIndex) {
      dot.classList.add("active");
    }
  });
}

function nextTestimonial() {
  const maxIndex = totalTestimonials - testimonialsPerView;
  currentTestimonialIndex =
    currentTestimonialIndex + 1 > maxIndex ? 0 : currentTestimonialIndex + 1;
  updateTestimonialCarousel();
}

function startAutoAdvance() {
  stopAutoAdvance();
  autoAdvanceInterval = setInterval(nextTestimonial, 5000);
}

function stopAutoAdvance() {
  if (autoAdvanceInterval) {
    clearInterval(autoAdvanceInterval);
  }
}

// Auto advance testimonials
startAutoAdvance();

// Dot click handlers
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonialIndex = index;
    updateTestimonialCarousel();
    stopAutoAdvance();
    startAutoAdvance();
  });
});

// Touch/Swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

testimonialsTrack.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging = true;
    stopAutoAdvance();
  },
  { passive: true }
);

testimonialsTrack.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;
    touchEndX = e.touches[0].clientX;
  },
  { passive: true }
);

testimonialsTrack.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;

  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    const maxIndex = totalTestimonials - testimonialsPerView;

    if (diff > 0) {
      // Swipe left - next
      currentTestimonialIndex = Math.min(currentTestimonialIndex + 1, maxIndex);
    } else {
      // Swipe right - previous
      currentTestimonialIndex = Math.max(currentTestimonialIndex - 1, 0);
    }

    updateTestimonialCarousel();
  }

  startAutoAdvance();
});

// Mouse drag functionality for desktop
let mouseStartX = 0;
let mouseEndX = 0;
let isMouseDragging = false;

testimonialsTrack.addEventListener("mousedown", (e) => {
  mouseStartX = e.clientX;
  isMouseDragging = true;
  testimonialsTrack.style.cursor = "grabbing";
  stopAutoAdvance();
});

document.addEventListener("mousemove", (e) => {
  if (!isMouseDragging) return;
  mouseEndX = e.clientX;
});

document.addEventListener("mouseup", () => {
  if (!isMouseDragging) return;
  isMouseDragging = false;
  testimonialsTrack.style.cursor = "grab";

  const swipeThreshold = 50;
  const diff = mouseStartX - mouseEndX;

  if (Math.abs(diff) > swipeThreshold) {
    const maxIndex = totalTestimonials - testimonialsPerView;

    if (diff > 0) {
      currentTestimonialIndex = Math.min(currentTestimonialIndex + 1, maxIndex);
    } else {
      currentTestimonialIndex = Math.max(currentTestimonialIndex - 1, 0);
    }

    updateTestimonialCarousel();
  }

  startAutoAdvance();
});

// Update on resize
window.addEventListener("resize", () => {
  updateTestimonialsPerView();
  updateTestimonialCarousel();
});

// Initial setup
updateTestimonialsPerView();

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all items
    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
}, observerOptions);

// Observe all elements with scroll animation classes
const animateElements = document.querySelectorAll(
  ".scroll-animate, .scroll-fade, .scroll-left, .scroll-right, .scroll-scale"
);

animateElements.forEach((el) => observer.observe(el));
