// Handle preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 400);
    }, 600);
  }
});

// Smooth scroll for nav links and CTA buttons
document.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches("a[href^='#']")) {
    const href = target.getAttribute("href");
    if (!href || href === "#") return;
    const section = document.querySelector(href);
    if (section) {
      e.preventDefault();
      const top = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  navMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.classList.contains("nav-link")) {
      navMenu.classList.remove("show");
    }
  });
}

// Back to top button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTopBtn) return;
  if (window.scrollY > 450) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Theme toggle with localStorage
const themeToggle = document.getElementById("themeToggle");

const applyTheme = (theme) => {
  if (theme === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
  const icon = themeToggle?.querySelector("i");
  if (icon) {
    icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
};

const storedTheme = window.localStorage.getItem("avsk-theme");
if (storedTheme) {
  applyTheme(storedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    const newTheme = isLight ? "light" : "dark";
    window.localStorage.setItem("avsk-theme", newTheme);
    applyTheme(newTheme);
  });
}

// Animated counters in hero
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

const runCounters = () => {
  counters.forEach((counter) => {
    const el = counter;
    const target = parseInt(el.getAttribute("data-target") || "0", 10);
    const duration = 1500;
    let start = 0;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toString();
      }
    };

    requestAnimationFrame(update);
  });
};

const countersObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        runCounters();
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const heroSection = document.getElementById("hero");
if (heroSection) {
  countersObserver.observe(heroSection);
}

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// FAQ accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  if (!button) return;
  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    faqItems.forEach((i) => i.classList.remove("active"));
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// Contact form handling (front-end only)
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formMessage.textContent = "Thank you! We have received your message and will get back to you shortly.";
    contactForm.reset();
  });
}

// Set footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

