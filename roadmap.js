/**
 * Student Roadmap Interactive Controller & Animations
 * File: roadmap.js
 *
 * Implements smooth SVG road drawing, milestone step transitions,
 * interactive card synchronizations, and accessibility controls.
 */

document.addEventListener("DOMContentLoaded", () => {
  const roadmapSection = document.getElementById("student-roadmap");
  if (!roadmapSection) return;

  const roadPaths = roadmapSection.querySelectorAll(".animated-road-path");
  const milestones = roadmapSection.querySelectorAll(".roadmap-milestone-marker");
  const stepCards = roadmapSection.querySelectorAll(".roadmap-step-card");
  const vignettes = roadmapSection.querySelectorAll(".roadmap-vignette-item");
  const outcomeBranches = roadmapSection.querySelectorAll(".roadmap-outcome-branch");

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --------------------------------------------------------------------------
  // 1. Prepare SVG Road Path Stroke Dasharray for Draw Animation
  // --------------------------------------------------------------------------
  roadPaths.forEach((path) => {
    try {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      if (prefersReducedMotion) {
        path.style.strokeDashoffset = "0";
      } else {
        path.style.strokeDashoffset = length;
        path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    } catch (e) {
      // Fallback if SVG geometry is pending
      path.style.strokeDashoffset = "0";
    }
  });

  // --------------------------------------------------------------------------
  // 2. Viewport Intersection Observer for Progressive Reveal
  // --------------------------------------------------------------------------
  let hasAnimated = false;

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        roadmapSection.classList.add("roadmap-in-view");

        if (!prefersReducedMotion) {
          // Draw road paths
          roadPaths.forEach((path) => {
            path.style.strokeDashoffset = "0";
          });

          // Stagger reveal milestone markers
          milestones.forEach((marker, idx) => {
            setTimeout(() => {
              marker.classList.add("marker-visible");
            }, 300 + idx * 220);
          });

          // Stagger reveal vignettes
          vignettes.forEach((vignette, idx) => {
            setTimeout(() => {
              vignette.classList.add("vignette-visible");
            }, 500 + idx * 200);
          });

          // Stagger reveal step cards
          stepCards.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add("card-visible");
            }, 600 + idx * 180);
          });

          // Reveal outcome branches
          outcomeBranches.forEach((branch, idx) => {
            setTimeout(() => {
              branch.classList.add("branch-visible");
            }, 1400 + idx * 200);
          });
        } else {
          // Immediately show without transitions
          roadPaths.forEach((path) => (path.style.strokeDashoffset = "0"));
          milestones.forEach((m) => m.classList.add("marker-visible"));
          vignettes.forEach((v) => v.classList.add("vignette-visible"));
          stepCards.forEach((c) => c.classList.add("card-visible"));
          outcomeBranches.forEach((b) => b.classList.add("branch-visible"));
        }

        // Default activate Step 1
        activateStep(1, false);
      }
    });
  }, observerOptions);

  observer.observe(roadmapSection);

  // --------------------------------------------------------------------------
  // 3. Step Activation & Interactive Coordination
  // --------------------------------------------------------------------------
  function activateStep(stepNum, shouldScroll = false) {
    const targetStep = Number(stepNum);

    // Update milestones active state
    milestones.forEach((marker) => {
      const num = Number(marker.getAttribute("data-step"));
      if (num === targetStep) {
        marker.classList.add("is-active");
        marker.setAttribute("aria-selected", "true");
        marker.setAttribute("aria-current", "step");
      } else {
        marker.classList.remove("is-active");
        marker.setAttribute("aria-selected", "false");
        marker.removeAttribute("aria-current");
      }
    });

    // Update vignettes active highlight
    vignettes.forEach((vignette) => {
      const num = Number(vignette.getAttribute("data-step"));
      if (num === targetStep) {
        vignette.classList.add("is-active");
      } else {
        vignette.classList.remove("is-active");
      }
    });

    // Update cards active highlight
    stepCards.forEach((card) => {
      const num = Number(card.getAttribute("data-step"));
      if (num === targetStep) {
        card.classList.add("is-active");
      } else {
        card.classList.remove("is-active");
      }
    });

    // On mobile or when requested, smooth scroll to corresponding card
    if (shouldScroll && window.innerWidth < 992) {
      const activeCard = roadmapSection.querySelector(`.roadmap-step-card[data-step="${targetStep}"]`);
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  // Click on milestone markers
  milestones.forEach((marker) => {
    marker.addEventListener("click", () => {
      const step = marker.getAttribute("data-step");
      if (step) activateStep(step, true);
    });

    // Keyboard accessibility: Enter or Space activates
    marker.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const step = marker.getAttribute("data-step");
        if (step) activateStep(step, true);
      }
    });
  });

  // Hover or click on cards highlights corresponding milestone and vignette
  stepCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const step = card.getAttribute("data-step");
      if (step) activateStep(step, false);
    });

    card.addEventListener("click", () => {
      const step = card.getAttribute("data-step");
      if (step) activateStep(step, false);
    });
  });

  // Mobile Milestone Tab list Keyboard Navigation (Arrow keys)
  const milestoneList = roadmapSection.querySelector(".roadmap-milestones-nav");
  if (milestoneList) {
    milestoneList.addEventListener("keydown", (e) => {
      const activeMarker = roadmapSection.querySelector(".roadmap-milestone-marker.is-active");
      if (!activeMarker) return;

      let currentStep = Number(activeMarker.getAttribute("data-step")) || 1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextStep = currentStep < 5 ? currentStep + 1 : 1;
        activateStep(nextStep, true);
        const nextMarker = roadmapSection.querySelector(`.roadmap-milestone-marker[data-step="${nextStep}"]`);
        if (nextMarker) nextMarker.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevStep = currentStep > 1 ? currentStep - 1 : 5;
        activateStep(prevStep, true);
        const prevMarker = roadmapSection.querySelector(`.roadmap-milestone-marker[data-step="${prevStep}"]`);
        if (prevMarker) prevMarker.focus();
      }
    });
  }
});
