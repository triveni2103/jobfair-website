/**
 * Previous Job Fairs Data Service & Component Renderer
 * File: job-fairs-data.js
 *
 * Provides mock data based on official Job Fair reports and a repository layer
 * ready for future Google Sheets + Google Apps Script Web App integration.
 */

// ============================================================================
// 1. Future Google Apps Script Configuration
// ============================================================================
/**
 * Set this to your Google Apps Script Web App URL when ready.
 * Example: "https://script.google.com/macros/s/AKfycbx.../exec"
 *
 * GOOGLE SHEET COLUMN SCHEMA:
 * - id                     (string, e.g. "mehkar-2026")
 * - title                  (string, e.g. "Mehkar Job Fair 2026")
 * - date                   (ISO YYYY-MM-DD, e.g. "2026-08-20")
 * - displayDate            (string, e.g. "20 August 2026")
 * - venue                  (string, e.g. "Krushi Vaibhav Lawns")
 * - city                   (string, e.g. "Mehkar")
 * - district               (string, e.g. "Buldhana")
 * - state                  (string, e.g. "Maharashtra")
 * - shortDescription       (string, 1-2 sentence overview)
 * - fullDescription        (string, complete event report)
 * - imageUrl               (string, URL or path to cover photo)
 * - registeredParticipants (number, e.g. 3220, or empty)
 * - attendedParticipants   (number, e.g. 86, or empty)
 * - employerCount          (number, e.g. 40)
 * - organizingPartners     (comma-separated or JSON string, e.g. "Tarunai, Lend A Hand India")
 * - participatingEmployers (comma-separated or JSON string, e.g. "Auto, IT, Retail")
 * - status                 (string, e.g. "Completed")
 * - reportUrl              (optional string, link to document/PDF)
 */
const APPS_SCRIPT_ENDPOINT = null;

// ============================================================================
// 2. Report-Based Mock Data
// ============================================================================
const MOCK_JOB_FAIRS = [
  {
    id: "mehkar-2026",
    title: "Mehkar Job Fair 2026",
    date: "2026-08-20",
    displayDate: "20 August 2026",
    year: 2026,
    venue: "Krushi Vaibhav Lawns",
    city: "Mehkar",
    district: "Buldhana",
    state: "Maharashtra",
    registeredParticipants: 3220,
    attendedParticipants: null,
    employerCount: 40,
    shortDescription: "The Mehkar Job Fair 2026 brought together young job seekers and employers on a common platform, enabling direct interaction, interviews, selection opportunities, and access to diverse career pathways.",
    fullDescription: "The Mehkar Job Fair 2026 served as a major regional employment platform in Buldhana district. The collaborative initiative organized candidate mobilization, pre-fair orientation, resume verification, and structured interview scheduling. Over 40 recruiting organizations participated, offering vacancies across technical, industrial, sales, and service trades to young aspirants.",
    imageUrl: "assets/images/hero.jpeg",
    organizingPartners: ["Tarunai", "Lend A Hand India"],
    participatingEmployers: ["Regional Engineering Units", "Automotive Dealerships & Service Centers", "Banking & Retail Networks", "Agro-Enterprise Units"],
    status: "Completed",
    isSample: false
  },
  {
    id: "chhatrapati-sambhajinagar-2023",
    title: "Chhatrapati Sambhajinagar Job Fair 2023",
    date: "2023-12-16",
    displayDate: "16 December 2023",
    year: 2023,
    venue: "District Vocational Center Hall",
    city: "Chhatrapati Sambhajinagar",
    district: "Chhatrapati Sambhajinagar",
    state: "Maharashtra",
    registeredParticipants: null,
    attendedParticipants: 86,
    employerCount: 13,
    shortDescription: "Organized by Lend A Hand India in association with Samagra Shiksha Maharashtra, the Job Fair connected candidates who had pursued vocational education with employers and employment opportunities.",
    fullDescription: "Targeted specifically at vocational school graduates, this Job Fair facilitated dedicated interview interactions between 86 vocationally trained candidates and 13 participating employers. The event emphasized multi-skill placement, industry-readiness assessment, and apprentice induction.",
    imageUrl: "assets/images/hero.jpeg",
    organizingPartners: ["Lend A Hand India", "Samagra Shiksha Maharashtra"],
    participatingEmployers: ["Precision Tooling Firms", "Logistics & Supply Hubs", "Consumer Services Enterprises"],
    status: "Completed",
    isSample: false
  },
  {
    id: "pune-vocational-2023",
    title: "Pune Vocational Job Fair 2023",
    date: "2023-07-15",
    displayDate: "15 July 2023",
    year: 2023,
    venue: "Government ITI Ground, Aundh",
    city: "Pune",
    district: "Pune",
    state: "Maharashtra",
    registeredParticipants: 1450,
    attendedParticipants: 1180,
    employerCount: 28,
    shortDescription: "Connecting multi-trade vocational graduates with manufacturing, IT support, and automotive firms for apprenticeship and full-time employment.",
    fullDescription: "Held in association with regional vocational centers, the Pune event featured on-site skill demonstrations, counseling desks, and direct employer screening rounds. Over 28 enterprises conducted immediate evaluation and provisional offer rollouts.",
    imageUrl: "assets/images/hero.jpeg",
    organizingPartners: ["Lend A Hand India", "TEAMTARUNAAI Foundation"],
    participatingEmployers: ["Automotive Component Manufacturers", "Electronics Assemblies", "Facility Management Networks"],
    status: "Completed",
    isSample: true
  },
  {
    id: "nashik-youth-2022",
    title: "Nashik District Youth Job Fair 2022",
    date: "2022-11-10",
    displayDate: "10 November 2022",
    year: 2022,
    venue: "KTHM Campus",
    city: "Nashik",
    district: "Nashik",
    state: "Maharashtra",
    registeredParticipants: 1120,
    attendedParticipants: 940,
    employerCount: 22,
    shortDescription: "Facilitated youth mobilization, on-the-spot interviews, and resume coaching sessions for rural and semi-urban job seekers in the Nashik district.",
    fullDescription: "A district-level youth placement initiative focused on bridging rural job seekers with semi-urban industrial belts. 22 employers participated in structured recruitment rounds with specialized follow-up tracking for selected candidates.",
    imageUrl: "assets/images/hero.jpeg",
    organizingPartners: ["Lend A Hand India", "District Employment Guidance Centre"],
    participatingEmployers: ["Food Processing Units", "Electrical Contracting Firms", "Hospitality & Retail"],
    status: "Completed",
    isSample: true
  }
];

// ============================================================================
// 3. Data Service (API Layer)
// ============================================================================
const JobFairsService = {
  /**
   * Fetch all job fairs (from Apps Script endpoint or local mock fallback)
   * @returns {Promise<Array>}
   */
  async getAllJobFairs() {
    if (APPS_SCRIPT_ENDPOINT) {
      try {
        const response = await fetch(APPS_SCRIPT_ENDPOINT);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            return this.normalizeEvents(data);
          }
        }
      } catch (err) {
        console.warn("Apps Script endpoint unreachable, using local fallback data:", err);
      }
    }
    // Return sorted mock data by date descending (newest first)
    return [...MOCK_JOB_FAIRS].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  /**
   * Fetch limited recent job fairs for homepage display
   * @param {number} limit 
   * @returns {Promise<Array>}
   */
  async getRecentJobFairs(limit = 3) {
    const all = await this.getAllJobFairs();
    return all.slice(0, limit);
  },

  /**
   * Filter and sort events based on search query, year, and sort order
   * @param {Object} options
   * @returns {Promise<Array>}
   */
  async filterJobFairs({ search = "", year = "all", sortBy = "newest" } = {}) {
    let events = await this.getAllJobFairs();

    // Year filter
    if (year && year !== "all") {
      events = events.filter((ev) => ev.year == year);
    }

    // Search query filter (matches title, city, district, state, or venue)
    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      events = events.filter((ev) => {
        return (
          (ev.title && ev.title.toLowerCase().includes(q)) ||
          (ev.city && ev.city.toLowerCase().includes(q)) ||
          (ev.district && ev.district.toLowerCase().includes(q)) ||
          (ev.venue && ev.venue.toLowerCase().includes(q)) ||
          (ev.state && ev.state.toLowerCase().includes(q))
        );
      });
    }

    // Sort order
    if (sortBy === "oldest") {
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      // Default: newest first
      events.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return events;
  },

  /**
   * Normalize incoming API data into the standard model
   */
  normalizeEvents(data) {
    return data.map((item, idx) => {
      const year = item.year || (item.date ? new Date(item.date).getFullYear() : 2026);
      return {
        id: item.id || `fair-${idx}`,
        title: item.title || "Job Fair",
        date: item.date || "",
        displayDate: item.displayDate || item.date || "",
        year: year,
        venue: item.venue || "",
        city: item.city || "",
        district: item.district || "",
        state: item.state || "Maharashtra",
        registeredParticipants: item.registeredParticipants ? Number(item.registeredParticipants) : null,
        attendedParticipants: item.attendedParticipants ? Number(item.attendedParticipants) : null,
        employerCount: item.employerCount ? Number(item.employerCount) : null,
        shortDescription: item.shortDescription || "",
        fullDescription: item.fullDescription || item.shortDescription || "",
        imageUrl: item.imageUrl || "assets/images/hero.jpeg",
        organizingPartners: Array.isArray(item.organizingPartners)
          ? item.organizingPartners
          : typeof item.organizingPartners === "string"
          ? item.organizingPartners.split(",").map((s) => s.trim())
          : [],
        participatingEmployers: Array.isArray(item.participatingEmployers)
          ? item.participatingEmployers
          : typeof item.participatingEmployers === "string"
          ? item.participatingEmployers.split(",").map((s) => s.trim())
          : [],
        status: item.status || "Completed",
        isSample: item.isSample === true
      };
    });
  }
};

// ============================================================================
// 4. Reusable Job Fair Card Component Renderer
// ============================================================================

/**
 * Creates and returns the HTML string for a Job Fair Card
 * @param {Object} fair - The event data object
 * @returns {string} HTML markup for the card
 */
function renderJobFairCardHTML(fair) {
  // Format location string cleanly
  const locationParts = [fair.venue, fair.city, fair.district, fair.state].filter(Boolean);
  const locationShort = [fair.city, fair.district].filter(Boolean).join(", ") || fair.venue || "Maharashtra";

  // Determine participant metric badge
  let participantBadge = "";
  if (fair.registeredParticipants) {
    participantBadge = `
      <div class="card-meta-item">
        <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span><strong>${fair.registeredParticipants.toLocaleString()}</strong> Registered</span>
      </div>
    `;
  } else if (fair.attendedParticipants) {
    participantBadge = `
      <div class="card-meta-item">
        <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span><strong>${fair.attendedParticipants.toLocaleString()}</strong> Candidates Attended</span>
      </div>
    `;
  }

  // Employer metric badge
  let employerBadge = "";
  if (fair.employerCount) {
    employerBadge = `
      <div class="card-meta-item">
        <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
        <span><strong>${fair.employerCount}</strong> Employers</span>
      </div>
    `;
  }

  // Sample badge if applicable
  const sampleBadge = fair.isSample
    ? `<span class="card-sample-tag" title="Representative sample based on regional event reports">Report Sample</span>`
    : "";

  return `
    <article class="job-fair-card" data-fair-id="${fair.id}">
      <!-- Card Image Cover -->
      <div class="card-image-wrap">
        <img 
          src="${fair.imageUrl}" 
          alt="${fair.title} event photograph" 
          class="card-img" 
          loading="lazy"
          onerror="this.src='assets/images/hero.jpeg'"
        >
        <span class="card-year-tag">${fair.year}</span>
        ${sampleBadge}
      </div>

      <!-- Card Core Details -->
      <div class="card-body">
        <div class="card-main-info">
          <h3 class="card-title">${fair.title}</h3>

          <div class="card-quick-meta">
            <div class="card-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${fair.displayDate}</span>
            </div>

            <div class="card-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${locationShort}</span>
            </div>
          </div>

          <p class="card-summary">${fair.shortDescription}</p>

          <div class="card-metrics-row">
            ${participantBadge}
            ${employerBadge}
          </div>
        </div>

        <!-- Expandable Detail Panel (Collapsed by default, revealed on click) -->
        <div class="card-expanded-drawer" id="drawer-${fair.id}" aria-hidden="true">
          <div class="drawer-inner-content">
            <div class="expanded-section">
              <h4 class="expanded-subtitle">About This Event</h4>
              <p class="expanded-p">${fair.fullDescription}</p>
            </div>

            <div class="expanded-details-list">
              <div class="detail-item">
                <span class="detail-key">Exact Venue:</span>
                <span class="detail-val">${locationParts.join(", ")}</span>
              </div>

              ${
                fair.organizingPartners && fair.organizingPartners.length > 0
                  ? `<div class="detail-item">
                      <span class="detail-key">Organizers / Partners:</span>
                      <span class="detail-val">${fair.organizingPartners.join(" • ")}</span>
                    </div>`
                  : ""
              }

              ${
                fair.participatingEmployers && fair.participatingEmployers.length > 0
                  ? `<div class="detail-item">
                      <span class="detail-key">Participating Sectors:</span>
                      <span class="detail-val">${fair.participatingEmployers.join(", ")}</span>
                    </div>`
                  : ""
              }
            </div>
          </div>
        </div>

        <!-- Expand / Collapse Action Control -->
        <div class="card-action-bar">
          <button 
            type="button" 
            class="btn-expand-card" 
            aria-expanded="false" 
            aria-controls="drawer-${fair.id}"
          >
            <span class="expand-label">View Details</span>
            <svg class="expand-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Attach expand/collapse toggle interaction to cards inside a container
 * @param {HTMLElement} container 
 */
function attachCardExpandListeners(container) {
  if (!container) return;

  container.querySelectorAll(".btn-expand-card").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = button.closest(".job-fair-card");
      if (!card) return;

      const drawer = card.querySelector(".card-expanded-drawer");
      const label = button.querySelector(".expand-label");
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        // Collapse card
        card.classList.remove("is-expanded");
        button.setAttribute("aria-expanded", "false");
        if (drawer) drawer.setAttribute("aria-hidden", "true");
        if (label) label.textContent = "View Details";
      } else {
        // Expand card
        card.classList.add("is-expanded");
        button.setAttribute("aria-expanded", "true");
        if (drawer) drawer.setAttribute("aria-hidden", "false");
        if (label) label.textContent = "Show Less";
      }
    });
  });
}

// ============================================================================
// 5. Automatic Initializer for Homepage Section
// ============================================================================
document.addEventListener("DOMContentLoaded", async () => {
  const homepageGrid = document.getElementById("homepageJobFairsGrid");
  if (homepageGrid) {
    try {
      const recentFairs = await JobFairsService.getRecentJobFairs(3);
      homepageGrid.innerHTML = recentFairs.map((fair) => renderJobFairCardHTML(fair)).join("");
      attachCardExpandListeners(homepageGrid);
    } catch (err) {
      console.error("Error loading homepage job fairs:", err);
      homepageGrid.innerHTML = `<p class="error-msg">Unable to load job fairs at this time.</p>`;
    }
  }
});


// ============================================================================
// 6. Impact Data Service & Model (Future Google Sheets / Apps Script Ready)
// ============================================================================
/**
 * REUSABLE IMPACT SCHEMA:
 * - eventId: unique string
 * - eventTitle: string
 * - eventDate: string
 * - location: string
 * - registeredCandidates: number | null
 * - attendedCandidates: number | null
 * - employersParticipated: number | null
 * - candidatesSelected: number | null
 * - appointmentLetters: number | null
 * - secondRoundCandidates: number | null
 * - pathwayPartners: number | null
 * - volunteers: number | null
 * - verificationNotes: string
 */
const VERIFIED_IMPACT_METRICS = {
  mehkar2026: {
    eventId: "mehkar-2026",
    eventTitle: "Mehkar Job Fair 2026",
    eventDate: "20 August 2026",
    location: "Mehkar, Buldhana, Maharashtra",
    registeredCandidates: 3220,
    attendedCandidates: null,
    employersParticipated: 40, // Provisionally 40 per Executive Summary; 56 in day-of log
    candidatesSelected: 1180,
    appointmentLetters: 420,
    secondRoundCandidates: 760,
    pathwayPartners: 4,
    volunteers: 70, // Provisionally 70 per Executive Summary; 50 in staffing log
    verificationNotes: "40 employers & 70 volunteers cited in Executive Summary outcomes table."
  },
  chhatrapatiSambhajinagar2023: {
    eventId: "chhatrapati-sambhajinagar-2023",
    eventTitle: "Chhatrapati Sambhajinagar Job Fair 2023",
    eventDate: "16 December 2023",
    location: "Chhatrapati Sambhajinagar, Maharashtra",
    studentsReached: 303,
    registeredCandidates: 120,
    attendedCandidates: 86,
    employersParticipated: 13,
    candidatesSelected: 40, // Job offer letters received
    secondRoundCandidates: 16,
    organizingPartners: ["Lend A Hand India", "Samagra Shiksha Maharashtra"]
  }
};

const ImpactDataService = {
  async getImpactData() {
    // If an external Apps Script endpoint is configured in future, fetch here:
    // try { const res = await fetch(`${APPS_SCRIPT_ENDPOINT}?type=impact`); ... }
    return VERIFIED_IMPACT_METRICS;
  }
};
