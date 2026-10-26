/**
 * Bootcamps Data Service & Component Renderer
 * File: bootcamps-data.js
 *
 * Pre-Job Fair preparation activities representing Tarunai and Lend A Hand India (LAHI).
 * Designed for future integration with Google Sheets via Google Apps Script Web App JSON endpoint.
 */

// ============================================================================
// 1. Future Google Apps Script Configuration
// ============================================================================
/**
 * Set this to your Google Apps Script Web App URL when ready.
 * Example: "https://script.google.com/macros/s/AKfycbx.../exec"
 *
 * GOOGLE SHEET COLUMN SCHEMA:
 * - id                     (string, e.g. "bc-cv-building")
 * - title                  (string, e.g. "CV Building & Career Readiness")
 * - activityType           (string, e.g. "Workshop", "Mock Interview", "Online Session")
 * - date                   (ISO YYYY-MM-DD or display text)
 * - displayDate            (string, e.g. "Planned: 18 Aug 2026" or "December 2023")
 * - year                   (number, e.g. 2026 or 2023)
 * - location               (string, venue/region or "Virtual / Online")
 * - deliveryMode           (string, e.g. "In-person Workshop", "Simulated Practice", "Virtual")
 * - shortDescription       (string, 1-2 sentence overview)
 * - fullDescription        (string, detailed scope, methodology, and guidance)
 * - topicsCovered          (comma-separated string or array)
 * - participantCount       (number or empty; ONLY report verified numbers)
 * - participantLabel       (string, e.g. "52 Mock Interviews Conducted")
 * - relatedJobFair         (string, e.g. "Mehkar Job Fair 2026")
 * - imageUrl               (string, path to photograph or fallback)
 * - iconType               (string, identifier for line icon)
 * - status                 (string, e.g. "Completed", "Active", "Scheduled")
 */
const BOOTCAMPS_APPS_SCRIPT_ENDPOINT = null;

// ============================================================================
// 2. Report-Based Mock Data
// ============================================================================
const MOCK_BOOTCAMPS = [
  {
    id: "bc-cv-building",
    title: "CV Building & Career Readiness",
    activityType: "Workshop",
    activityTypeLabel: "In-Person Workshop",
    date: "2026-08-18",
    displayDate: "Pre-Fair Phase • August 2026",
    year: 2026,
    location: "Mehkar & Buldhana Regional Centers",
    deliveryMode: "In-person Workshop",
    shortDescription: "Help students understand their skills, prepare their CVs, and get ready to explore employment opportunities.",
    fullDescription: "Structured workshops helping vocational graduates and job seekers translate their hands-on vocational coursework, technical certifications, and internships into clear, professionally formatted CVs. Candidates learn layout fundamentals, contact details verification, and how to present trade skills to recruiting enterprises.",
    topicsCovered: [
      "Resume structuring & layout essentials",
      "Highlighting vocational & technical skillsets",
      "Documenting apprenticeships & practical projects",
      "Avoiding common resume formatting errors",
      "Candidate registration checklist for Job Fairs"
    ],
    participantCount: null, // Planned for 18 Aug 2026 ahead of Mehkar Job Fair; no unverified counts displayed
    participantLabel: null,
    relatedJobFair: "Mehkar Job Fair 2026",
    imageUrl: "assets/images/hero.jpeg",
    iconType: "file-user",
    status: "Scheduled Ahead of Fair"
  },
  {
    id: "bc-interview-prep",
    title: "Interview Preparation",
    activityType: "Workshop",
    activityTypeLabel: "Interactive Workshop",
    date: "2023-12-12",
    displayDate: "Pre-Fair Phase • December 2023",
    year: 2023,
    location: "Chhatrapati Sambhajinagar District Centers",
    deliveryMode: "Interactive Workshop",
    shortDescription: "Prepare students to approach interviews with confidence through interview guidance, common questions, and professional interview etiquette.",
    fullDescription: "A comprehensive coaching module designed to ease first-time job seeker anxiety. Trainers guide students through corporate and industrial interview etiquette, verbal and non-verbal communication, professional self-introduction ('Tell me about yourself'), and handling question rounds with poise.",
    topicsCovered: [
      "Professional self-introduction & opening statements",
      "Body language, posture, and professional etiquette",
      "Responding to common HR and technical questions",
      "Understanding job roles, shifts, and apprentice terms",
      "Handling interview nervousness and self-confidence"
    ],
    participantCount: null,
    participantLabel: null,
    relatedJobFair: "Chhatrapati Sambhajinagar Job Fair 2023",
    imageUrl: "assets/images/hero.jpeg",
    iconType: "messages-square",
    status: "Completed"
  },
  {
    id: "bc-mock-interviews",
    title: "Mock Interviews",
    activityType: "Mock Interview",
    activityTypeLabel: "Practice Sessions",
    date: "2023-12-14",
    displayDate: "Pre-Fair Phase • December 2023",
    year: 2023,
    location: "Vocational Center Hall, Chhatrapati Sambhajinagar",
    deliveryMode: "Simulated One-on-One Practice",
    shortDescription: "Give students an opportunity to practise responding to interview questions and become familiar with the recruitment process.",
    fullDescription: "Simulated face-to-face interview panels conducted by seasoned mentors and vocational instructors. Candidates experience real-time interview scenarios, receive immediate personalized feedback on their answers, and learn how to present their strengths before meeting hiring managers at the Job Fair.",
    topicsCovered: [
      "Simulated one-on-one interview panel rounds",
      "Constructive feedback on articulation and composure",
      "Reviewing portfolio and project explanations",
      "Salary and wage expectations orientation",
      "Tips for on-the-spot second-round selections"
    ],
    participantCount: 52, // Official figure from CSN 2023 report
    participantLabel: "52 Mock Interviews Conducted (CSN 2023 Report)",
    relatedJobFair: "Chhatrapati Sambhajinagar Job Fair 2023",
    imageUrl: "assets/images/hero.jpeg",
    iconType: "users",
    status: "Completed"
  },
  {
    id: "bc-skills-awareness",
    title: "Skills Awareness & Career Guidance",
    activityType: "Career Guidance",
    activityTypeLabel: "Guidance Session",
    date: "2026-08-10",
    displayDate: "Pre-Fair Phase • August 2026",
    year: 2026,
    location: "Partner High Schools & Vocational Institutes",
    deliveryMode: "In-Person Classroom Guidance",
    shortDescription: "Help students identify their personal and vocational skills, explore career possibilities, and understand how their skills relate to employment opportunities.",
    fullDescription: "Orientation sessions focusing on self-assessment and industry alignment. Students assess their technical proficiencies across trades such as automotive, electronics, retail, customer support, and manufacturing, and discover how their vocational training maps to entry-level career pathways.",
    topicsCovered: [
      "Mapping trade competencies to local industry sectors",
      "Understanding technician, apprentice, and associate tracks",
      "Workplace expectations and continuous skill-upgrading",
      "Career growth progression over 1 to 5 years",
      "Clarifying eligibility and minimum age requirements"
    ],
    participantCount: null,
    participantLabel: null,
    relatedJobFair: "Mehkar Job Fair 2026",
    imageUrl: "assets/images/hero.jpeg",
    iconType: "target",
    status: "Completed"
  },
  {
    id: "bc-online-sessions",
    title: "Online Bootcamp Sessions",
    activityType: "Online Session",
    activityTypeLabel: "Virtual / Webinar",
    date: "2023-12-05",
    displayDate: "Pre-Fair Phase • December 2023",
    year: 2023,
    location: "Virtual & Digital Learning Classrooms",
    deliveryMode: "Online Webinar / Digital Resources",
    shortDescription: "Engage students through online sessions, digital learning resources, and communication channels that support career readiness.",
    fullDescription: "Remote webinars, downloadable preparation sheets, and messaging-group advisories that extend career readiness beyond physical classrooms. Candidates receive real-time answers to queries about document verification, venue logistics, employer vacancy lists, and interview slot assignments.",
    topicsCovered: [
      "Accessing digital vacancy listings and company briefs",
      "Digital resume storage and mobile submission formats",
      "Virtual orientation for candidates from remote tehsils",
      "Live Q&A with career readiness facilitators",
      "Job Fair day checklist and necessary documentation"
    ],
    participantCount: null,
    participantLabel: null,
    relatedJobFair: "Chhatrapati Sambhajinagar Job Fair 2023",
    imageUrl: "assets/images/hero.jpeg",
    iconType: "laptop",
    status: "Completed"
  },
  {
    id: "bc-student-mobilization",
    title: "Student Mobilization & Orientation",
    activityType: "Outreach & Mobilization",
    activityTypeLabel: "Outreach & Campus Visits",
    date: "2026-08-05",
    displayDate: "Pre-Fair Phase • August 2026",
    year: 2026,
    location: "Schools, Junior Colleges & Community Hubs",
    deliveryMode: "On-Campus Presentations & Outreach",
    shortDescription: "Engage students through school and college visits, orientation activities, and outreach that introduces them to Job Fair opportunities and registration processes.",
    fullDescription: "Grassroots outreach drives conducted in coordination with school principals, vocational trainers, and local administrative partners. Facilitators conduct classroom presentations, explain the purpose of the upcoming Job Fair, distribute registration forms, and answer questions from aspiring youth and their parents.",
    topicsCovered: [
      "Campus briefing sessions for final-year students",
      "Step-by-step registration portal orientation",
      "Employer vacancy brochures and job role highlights",
      "Parental awareness regarding safe employment practices",
      "Batch mobilization and transportation coordination"
    ],
    participantCount: null,
    participantLabel: null,
    relatedJobFair: "Mehkar Job Fair 2026",
    imageUrl: "assets/images/hero.jpeg",
    iconType: "school",
    status: "Completed"
  }
];

// ============================================================================
// 3. Bootcamps Service (Data Layer)
// ============================================================================
const BootcampsService = {
  /**
   * Fetch all bootcamps, either from Apps Script JSON endpoint or fallback mock data
   */
  async getAllBootcamps() {
    if (BOOTCAMPS_APPS_SCRIPT_ENDPOINT) {
      try {
        const response = await fetch(BOOTCAMPS_APPS_SCRIPT_ENDPOINT, {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) {
          throw new Error(`Endpoint returned status ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return this.normalizeBootcamps(data);
        }
      } catch (err) {
        console.warn("Apps Script endpoint unreachable, falling back to mock bootcamps:", err);
      }
    }
    return this.normalizeBootcamps(MOCK_BOOTCAMPS);
  },

  /**
   * Filter and sort bootcamps
   */
  async filterBootcamps({ search = "", activityType = "all", year = "all", sortBy = "newest" } = {}) {
    const all = await this.getAllBootcamps();
    const cleanSearch = search.trim().toLowerCase();

    let items = all.filter((item) => {
      // Search filter
      const matchesSearch =
        !cleanSearch ||
        item.title.toLowerCase().includes(cleanSearch) ||
        item.shortDescription.toLowerCase().includes(cleanSearch) ||
        item.location.toLowerCase().includes(cleanSearch) ||
        item.relatedJobFair.toLowerCase().includes(cleanSearch) ||
        item.topicsCovered.some((t) => t.toLowerCase().includes(cleanSearch));

      // Activity Type filter
      const matchesType =
        activityType === "all" ||
        item.activityType.toLowerCase() === activityType.toLowerCase() ||
        (activityType === "workshop" && item.activityType.toLowerCase().includes("workshop"));

      // Year filter
      const matchesYear = year === "all" || String(item.year) === String(year);

      return matchesSearch && matchesType && matchesYear;
    });

    // Sorting
    if (sortBy === "oldest") {
      items.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      // Default: newest first
      items.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return items;
  },

  /**
   * Normalize incoming API data into consistent schema
   */
  normalizeBootcamps(data) {
    return data.map((item, idx) => {
      const year = item.year || (item.date ? new Date(item.date).getFullYear() : 2026);
      return {
        id: item.id || `bootcamp-${idx}`,
        title: item.title || "Career Readiness Bootcamp",
        activityType: item.activityType || "Workshop",
        activityTypeLabel: item.activityTypeLabel || item.activityType || "Preparation Session",
        date: item.date || "",
        displayDate: item.displayDate || item.date || "",
        year: Number(year),
        location: item.location || "Maharashtra",
        deliveryMode: item.deliveryMode || "In-person Workshop",
        shortDescription: item.shortDescription || "",
        fullDescription: item.fullDescription || item.shortDescription || "",
        topicsCovered: Array.isArray(item.topicsCovered)
          ? item.topicsCovered
          : typeof item.topicsCovered === "string"
          ? item.topicsCovered.split(",").map((s) => s.trim())
          : [],
        participantCount: item.participantCount ? Number(item.participantCount) : null,
        participantLabel: item.participantLabel || null,
        relatedJobFair: item.relatedJobFair || "Job Fair Initiative",
        imageUrl: item.imageUrl || "assets/images/hero.jpeg",
        iconType: item.iconType || "file-user",
        status: item.status || "Completed"
      };
    });
  }
};

// ============================================================================
// 4. Line Icon Helpers
// ============================================================================
function getBootcampIconSVG(iconType) {
  switch (iconType) {
    case "file-user":
      return `
        <svg class="bootcamp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <circle cx="12" cy="13" r="2"></circle>
          <path d="M8 18a4 4 0 0 1 8 0"></path>
        </svg>
      `;
    case "messages-square":
      return `
        <svg class="bootcamp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="8" y1="9" x2="16" y2="9"></line>
          <line x1="8" y1="13" x2="14" y2="13"></line>
        </svg>
      `;
    case "users":
      return `
        <svg class="bootcamp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      `;
    case "target":
      return `
        <svg class="bootcamp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      `;
    case "laptop":
      return `
        <svg class="bootcamp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="20" x2="22" y2="20"></line>
        </svg>
      `;
    case "school":
      return `
        <svg class="bootcamp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      `;
    default:
      return `
        <svg class="bootcamp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
      `;
  }
}

// ============================================================================
// 5. Reusable Bootcamp Card Component Renderer
// ============================================================================
/**
 * Renders the accessible, responsive HTML for a single Bootcamp card
 * @param {Object} item - Normalized bootcamp object
 * @returns {string} HTML markup
 */
function renderBootcampCardHTML(item) {
  // Participant verified badge (strictly CSN 2023 or verified figures)
  let participantBadgeHTML = "";
  if (item.participantCount && item.participantLabel) {
    participantBadgeHTML = `
      <div class="bootcamp-meta-item bootcamp-meta-highlight">
        <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span><strong>${item.participantCount}</strong> Verified Practice Rounds</span>
      </div>
    `;
  }

  // Topics list items
  const topicsHTML = item.topicsCovered && item.topicsCovered.length > 0
    ? `
      <div class="bootcamp-detail-group">
        <h5 class="bootcamp-detail-heading">Key Topics & Focus Areas:</h5>
        <ul class="bootcamp-topics-list">
          ${item.topicsCovered.map((topic) => `<li>${topic}</li>`).join("")}
        </ul>
      </div>
    `
    : "";

  return `
    <article class="bootcamp-card" data-bootcamp-id="${item.id}" id="${item.id}">
      <!-- Card Image Cover with Badge & Icon -->
      <div class="bootcamp-card-image-wrap">
        <img 
          src="${item.imageUrl}" 
          alt="${item.title} preparation session" 
          class="bootcamp-card-img" 
          loading="lazy"
          onerror="this.src='assets/images/hero.jpeg'"
        >
        <span class="bootcamp-type-pill">${item.activityTypeLabel}</span>
        <div class="bootcamp-icon-overlay" aria-hidden="true">
          ${getBootcampIconSVG(item.iconType)}
        </div>
      </div>

      <!-- Card Core Body -->
      <div class="bootcamp-card-body">
        <div class="bootcamp-main-info">
          <div class="bootcamp-header-row">
            <span class="bootcamp-phase-tag">${item.displayDate}</span>
          </div>

          <h3 class="bootcamp-card-title">${item.title}</h3>

          <div class="bootcamp-quick-meta">
            <div class="bootcamp-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>${item.deliveryMode}</span>
            </div>

            <div class="bootcamp-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${item.location}</span>
            </div>

            ${participantBadgeHTML}
          </div>

          <!-- Short Overview -->
          <p class="bootcamp-short-desc">${item.shortDescription}</p>
        </div>

        <!-- Expandable Details Section (Toggled on Click) -->
        <div class="bootcamp-expanded-content" id="details-${item.id}" hidden>
          <div class="bootcamp-expanded-inner">
            <div class="bootcamp-detail-group">
              <h5 class="bootcamp-detail-heading">Activity Scope & Preparation:</h5>
              <p class="bootcamp-full-desc">${item.fullDescription}</p>
            </div>

            ${topicsHTML}

            <div class="bootcamp-detail-meta-grid">
              <div class="bootcamp-detail-meta-box">
                <span class="meta-box-label">Associated Event</span>
                <span class="meta-box-value">${item.relatedJobFair}</span>
              </div>
              <div class="bootcamp-detail-meta-box">
                <span class="meta-box-label">Delivery Mode</span>
                <span class="meta-box-value">${item.deliveryMode}</span>
              </div>
              <div class="bootcamp-detail-meta-box">
                <span class="meta-box-label">Target Audience</span>
                <span class="meta-box-value">Vocational Students & Job Seekers</span>
              </div>
              <div class="bootcamp-detail-meta-box">
                <span class="meta-box-label">Status</span>
                <span class="meta-box-value status-badge-ok">${item.status}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer / Action Area -->
        <div class="bootcamp-card-footer">
          <button 
            type="button" 
            class="bootcamp-expand-btn" 
            aria-expanded="false" 
            aria-controls="details-${item.id}"
            data-target="details-${item.id}"
          >
            <span class="expand-btn-text" data-i18n="bc_btn_details">View Details</span>
            <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

// ============================================================================
// 6. Interactive Card Expansion Controller
// ============================================================================
function attachBootcampExpandListeners(container) {
  if (!container) return;

  const buttons = container.querySelectorAll(".bootcamp-expand-btn");
  buttons.forEach((btn) => {
    // Avoid double attaching
    if (btn._hasExpandListener) return;
    btn._hasExpandListener = true;

    btn.addEventListener("click", () => {
      const card = btn.closest(".bootcamp-card");
      const targetId = btn.getAttribute("data-target");
      const detailsEl = document.getElementById(targetId);
      const textSpan = btn.querySelector(".expand-btn-text");

      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const nextExpanded = !isExpanded;

      btn.setAttribute("aria-expanded", String(nextExpanded));

      if (detailsEl) {
        if (nextExpanded) {
          detailsEl.removeAttribute("hidden");
          card.classList.add("is-expanded");
          if (textSpan) {
            // Check language state
            const currentLang = document.documentElement.lang || localStorage.getItem("preferred_language") || "en";
            if (currentLang === "mr") {
              textSpan.textContent = "कमी माहिती दाखवा";
            } else if (currentLang === "hi") {
              textSpan.textContent = "कम दिखाएं";
            } else {
              textSpan.textContent = "Show Less";
            }
          }
        } else {
          detailsEl.setAttribute("hidden", "");
          card.classList.remove("is-expanded");
          if (textSpan) {
            const currentLang = document.documentElement.lang || localStorage.getItem("preferred_language") || "en";
            if (currentLang === "mr") {
              textSpan.textContent = "सविस्तर माहिती";
            } else if (currentLang === "hi") {
              textSpan.textContent = "विस्तार से देखें";
            } else {
              textSpan.textContent = "View Details";
            }
          }
        }
      }
    });
  });
}

// ============================================================================
// 7. Auto-Initializer for Homepage Bootcamps Section
// ============================================================================
async function initHomepageBootcamps() {
  const grid = document.getElementById("homepageBootcampsGrid");
  if (!grid) return;

  try {
    const bootcamps = await BootcampsService.getAllBootcamps();
    grid.innerHTML = bootcamps.map((item) => renderBootcampCardHTML(item)).join("");
    attachBootcampExpandListeners(grid);
  } catch (err) {
    console.error("Failed to render homepage bootcamps:", err);
  }
}

// Initialize on DOMContentLoaded if element exists
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomepageBootcamps);
} else {
  initHomepageBootcamps();
}
