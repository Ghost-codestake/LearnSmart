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
    e.preventDefault();
    dropdown.classList.toggle("active");
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


      // Module expand/collapse functionality
      document.querySelectorAll(".module").forEach((module) => {
        module.addEventListener("click", function () {
          // Close all other modules
          document.querySelectorAll(".module").forEach((m) => {
            if (m !== this) {
              m.classList.remove("active");
            }
          });

          // Toggle current module
          this.classList.toggle("active");
        });
      });

      // Animate stats on scroll
      function animateStats() {
        const stats = document.querySelectorAll(".stat-number");
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target;
              const finalNumber = target.textContent;
              const isPercentage = finalNumber.includes("%");
              const numberOnly = parseInt(finalNumber.replace(/[^\d]/g, ""));

              let current = 0;
              const increment = numberOnly / 50;
              const timer = setInterval(() => {
                current += increment;
                if (current >= numberOnly) {
                  current = numberOnly;
                  clearInterval(timer);
                }
                target.textContent =
                  Math.floor(current) +
                  (isPercentage ? "%" : finalNumber.includes("+") ? "+" : "");
              }, 30);
            }
          });
        });

        stats.forEach((stat) => observer.observe(stat));
      }

      // Enrollment function
      function enrollNow() {
        alert(
          "Thank you for your interest!, You are been redirected to our payment page ."
        );
      }

      // Add floating animation to features
      function addFloatingAnimation() {
        const features = document.querySelectorAll(".feature");
        features.forEach((feature, index) => {
          feature.style.animationDelay = `${index * 0.2}s`;
          feature.style.animation = "float 3s ease-in-out infinite";
        });
      }

      // Add CSS for floating animation
      const style = document.createElement("style");
      style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
      document.head.appendChild(style);

      // Initialize animations and events
      document.addEventListener("DOMContentLoaded", function () {
        animateStats();
        addFloatingAnimation();
        window.addEventListener("scroll", handleScroll);
      });

      // Add parallax effect to hero section
      window.addEventListener("scroll", function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector(".hero");
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      });

      (function () {
        const closeSiblings = false; // set true to allow only one open per group

        function setMaxHeight(answerEl, open) {
          if (open) {
            answerEl.classList.add("open");
            answerEl.style.maxHeight = answerEl.scrollHeight + "px";
          } else {
            answerEl.style.maxHeight = 0;
            answerEl.addEventListener(
              "transitionend",
              () => {
                answerEl.classList.remove("open");
              },
              { once: true }
            );
          }
        }

        document.querySelectorAll(".faq-item").forEach((item) => {
          const btn = item.querySelector(".faq-question");
          const answer = item.querySelector(".faq-answer");

          btn.setAttribute("aria-expanded", "false");
          answer.style.maxHeight = 0;

          btn.addEventListener("click", () => {
            const isOpen = btn.getAttribute("aria-expanded") === "true";
            const group = item.closest(".faq-group");

            if (closeSiblings && group) {
              group
                .querySelectorAll(
                  '.faq-item .faq-question[aria-expanded="true"]'
                )
                .forEach((openBtn) => {
                  if (openBtn !== btn) {
                    openBtn.setAttribute("aria-expanded", "false");
                    const sibAnswer = document.getElementById(
                      openBtn.getAttribute("aria-controls")
                    );
                    setMaxHeight(sibAnswer, false);
                  }
                });
            }

            btn.setAttribute("aria-expanded", String(!isOpen));
            setMaxHeight(answer, !isOpen);
          });
        });

        document.querySelectorAll('.faq-group').forEach(group => {
          const firstBtn = group.querySelector('.faq-item .faq-question');
          if (firstBtn) firstBtn.click();
        });
      })();