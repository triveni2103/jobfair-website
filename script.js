/**
 * Job Fair Website Scripts
 * File: script.js
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Drawer elements
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navBackdrop = document.getElementById("navBackdrop");
  const navClose = document.getElementById("navClose");
  const navLinks = document.querySelectorAll(".nav-link, .drawer-cta-btn, .nav-header-cta");

  function openMenu() {
    if (!navMenu) return;
    navMenu.classList.add("active");
    if (navBackdrop) navBackdrop.classList.add("active");
    document.body.classList.add("menu-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("active");
    if (navBackdrop) navBackdrop.classList.remove("active");
    document.body.classList.remove("menu-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  // Toggle button click
  if (navToggle) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navMenu && navMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close button click
  if (navClose) {
    navClose.addEventListener("click", closeMenu);
  }

  // Backdrop click closes drawer
  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }

  // Close drawer on any navigation link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // =========================================================================
  // Active Tab Highlight on Scroll (ScrollSpy)
  // =========================================================================
  const sections = document.querySelectorAll("section[id]");
  const allNavLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120; // 120px offset for navbar height & buffer

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        allNavLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // =========================================================================
  // Registration Form handler
  // =========================================================================
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const roleInput = document.getElementById("role");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const role = roleInput ? roleInput.value : "";

      if (!name || !email || !role) {
        alert("Please complete all fields.");
        return;
      }

      alert(`Thank you, ${name}! Your registration for the Job Fair has been received.`);
      registerForm.reset();
    });
  }
});
