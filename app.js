document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const icon = this.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("fa-times");
      menuToggle.querySelector("i").classList.add("fa-bars");
    });
  });

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const skillItems = document.querySelectorAll(".skill-item");

  function animateSkillBars() {
    skillItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isInViewport = rect.top <= window.innerHeight * 0.8;

      if (isInViewport && !item.classList.contains("animated")) {
        const level = item.getAttribute("data-level");
        const progressBar = item.querySelector(".skill-progress");

        progressBar.style.width = level + "%";
        item.classList.add("animated");
      }
    });
  }

  window.addEventListener("scroll", animateSkillBars);

  animateSkillBars();

  const typedText = document.querySelector(".typed-text");
  const cursor = document.querySelector(".cursor");

  const textArray = [
    "Web Developer",
    "UI/UX Designer",
    "Student",
    "Problem Solver",
  ];
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedText.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1,
      );
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, 500);
    }
  }

  setTimeout(type, 1000);

  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    const submitBtn = this.querySelector(".btn");
    const originalText = submitBtn.querySelector("span").textContent;
    const originalIcon = submitBtn.querySelector("i").className;

    submitBtn.querySelector("span").textContent = "Sending...";
    submitBtn.querySelector("i").className = "fas fa-spinner fa-spin";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.querySelector("span").textContent = "Message Sent!";
      submitBtn.querySelector("i").className = "fas fa-check";
      submitBtn.style.background =
        "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)";

      setTimeout(() => {
        submitBtn.querySelector("span").textContent = originalText;
        submitBtn.querySelector("i").className = originalIcon;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        contactForm.reset();
      }, 3000);
    }, 1500);
  });

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add parallax effect to background circles
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll(
      ".circle-1, .circle-2, .circle-3, .circle-4",
    );

    circles.forEach((circle, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      circle.style.transform = `translateY(${yPos}px)`;
    });
  });
});
