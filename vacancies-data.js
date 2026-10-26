/**
 * Vacancies Data Service & Component Renderer
 * File: vacancies-data.js
 *
 * "Vacancies at a Glance" feature for the Job Fair website representing the collaboration
 * between Lend A Hand India (LAHI) and TEAMTARUNAAI Foundation.
 *
 * Architecture:
 * - Google Sheet is the source of truth (1 row per role per company).
 * - Google Apps Script Web App provides a JSON API endpoint.
 * - Frontend dynamically groups rows by company, calculates summary metrics,
 *   and renders static, student-friendly cards without requiring clicks or accordions.
 * - Mode separation:
 *     * Development Mode (VACANCIES_APPS_SCRIPT_ENDPOINT = null): Uses realistic vocational
 *       sample data with a prominent "Sample Data — For Design Preview Only" notice.
 *     * Production Mode (VACANCIES_APPS_SCRIPT_ENDPOINT = URL): Fetches live data from
 *       Google Sheets, shows loading and error states, and never masks errors with fake numbers.
 */

// ============================================================================
// 1. Google Apps Script Configuration
// ============================================================================
/**
 * Set this to your published Google Apps Script Web App URL when ready.
 * Example: "https://script.google.com/macros/s/AKfycbx.../exec"
 *
 * Leaving this as null or empty activates Development Mode with sample data.
 */
const VACANCIES_APPS_SCRIPT_ENDPOINT = null;

/**
 * ============================================================================
 * GOOGLE APPS SCRIPT BACKEND CODE (COPY & PASTE INTO APPS SCRIPT)
 * ============================================================================
 * 
 * Instructions for Admins:
 * 1. Create a Google Sheet with a tab named "Vacancies".
 * 2. Set Row 1 header columns exactly as:
 *    companyId | companyName | companyLogo | industry | companyLocation | jobTitle | vacancies | jobType | workLocation | eligibility | qualification | experience | description | status | lastUpdated
 * 3. Add 1 row per job role. Example status values: "Open", "Closed", "On Hold".
 * 4. In Google Sheets, navigate to: Extensions > Apps Script.
 * 5. Replace existing code with the snippet below:
 *
 * ---------------------------- START APPS SCRIPT -----------------------------
 * function doGet(e) {
 *   try {
 *     var ss = SpreadsheetApp.getActiveSpreadsheet();
 *     var sheet = ss.getSheetByName("Vacancies") || ss.getSheets()[0];
 *     var data = sheet.getDataRange().getValues();
 *     
 *     if (!data || data.length < 2) {
 *       return createJsonResponse({ status: "success", count: 0, data: [] });
 *     }
 *     
 *     var headers = data[0].map(function(h) {
 *       return String(h).trim();
 *     });
 *     
 *     var rows = [];
 *     for (var i = 1; i < data.length; i++) {
 *       var row = data[i];
 *       if (!row || row.every(function(cell) { return cell === "" || cell === null; })) {
 *         continue;
 *       }
 *       var item = {};
 *       for (var j = 0; j < headers.length; j++) {
 *         var key = headers[j];
 *         item[key] = row[j] !== undefined ? row[j] : "";
 *       }
 *       
 *       // Only expose records marked as Open
 *       var statusStr = String(item.status || "").trim().toLowerCase();
 *       if (statusStr === "open") {
 *         // Sanitize numeric vacancies
 *         var vacNum = parseInt(item.vacancies, 10);
 *         item.vacancies = isNaN(vacNum) ? 0 : vacNum;
 *         rows.push(item);
 *       }
 *     }
 *     
 *     return createJsonResponse({
 *       status: "success",
 *       count: rows.length,
 *       lastUpdated: new Date().toISOString(),
 *       data: rows
 *     });
 *   } catch (err) {
 *     return createJsonResponse({
 *       status: "error",
 *       message: err.toString()
 *     });
 *   }
 * }
 * 
 * function createJsonResponse(obj) {
 *   return ContentService.createTextOutput(JSON.stringify(obj))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * ----------------------------- END APPS SCRIPT ------------------------------
 * 
 * 6. Click "Deploy" > "New Deployment".
 * 7. Select type: "Web app".
 * 8. Execute as: "Me", Who has access: "Anyone".
 * 9. Copy the Web App URL and set it as VACANCIES_APPS_SCRIPT_ENDPOINT above.
 */

// ============================================================================
// 2. Realistic Vocational Sample Data (Development Mode)
// ============================================================================
/**
 * 6 Realistic Vocational Employers in Maharashtra with 2-3 roles each.
 * All roles reflect genuine vocational trades (ITI, Diploma, HSC vocational)
 * aligned with LAHI & Tarunai Job Fair ecosystems.
 * 
 * Note: Each record represents 1 role. Multiple rows share the same companyId.
 */
const SAMPLE_VACANCY_RECORDS = [
  // 1. Tata AutoComp Systems Ltd (Automotive & Manufacturing - Pune)
  {
    companyId: "comp-tata-autocomp",
    companyName: "Tata AutoComp Systems Ltd",
    companyLogo: "",
    industry: "Automotive & Manufacturing",
    companyLocation: "Pune, Maharashtra",
    jobTitle: "Production Assembly Operator",
    vacancies: 30,
    jobType: "Apprenticeship",
    workLocation: "Chakan MIDC, Pune",
    eligibility: "ITI (Fitter / Machinist / MMV) or 12th Pass",
    qualification: "ITI / HSC",
    experience: "Freshers welcome",
    description: "Assembly line operations, component fitting, and basic machine operations adhering to industrial 5S standards.",
    status: "Open",
    lastUpdated: "2026-10-24"
  },
  {
    companyId: "comp-tata-autocomp",
    companyName: "Tata AutoComp Systems Ltd",
    companyLogo: "",
    industry: "Automotive & Manufacturing",
    companyLocation: "Pune, Maharashtra",
    jobTitle: "Quality Inspection Trainee",
    vacancies: 15,
    jobType: "Trainee",
    workLocation: "Chakan MIDC, Pune",
    eligibility: "Diploma in Mechanical / Automobile or 12th Science",
    qualification: "Diploma / 12th Pass",
    experience: "0 - 1 year",
    description: "Visual and gauge-based quality verification of pressed and molded automotive assemblies.",
    status: "Open",
    lastUpdated: "2026-10-24"
  },

  // 2. Mahindra Precision Dies & Tooling (Precision Tooling - Sambhajinagar)
  {
    companyId: "comp-mahindra-tooling",
    companyName: "Mahindra Precision Tooling",
    companyLogo: "",
    industry: "Precision Engineering & Tooling",
    companyLocation: "Chhatrapati Sambhajinagar, Maharashtra",
    jobTitle: "CNC & VMC Machine Operator",
    vacancies: 20,
    jobType: "Apprenticeship",
    workLocation: "Shendra MIDC, Sambhajinagar",
    eligibility: "ITI (Turner / Machinist / Tool & Die)",
    qualification: "ITI",
    experience: "Freshers welcome",
    description: "Assisting in precision CNC component milling, tool offsets check, and component deburring.",
    status: "Open",
    lastUpdated: "2026-10-23"
  },
  {
    companyId: "comp-mahindra-tooling",
    companyName: "Mahindra Precision Tooling",
    companyLogo: "",
    industry: "Precision Engineering & Tooling",
    companyLocation: "Chhatrapati Sambhajinagar, Maharashtra",
    jobTitle: "Tool Room Maintenance Assistant",
    vacancies: 10,
    jobType: "Full-time",
    workLocation: "Waluj MIDC, Sambhajinagar",
    eligibility: "ITI Tool & Die Maker or 1 yr technical experience",
    qualification: "ITI / Vocational Certification",
    experience: "0 - 2 years",
    description: "Routine die maintenance, grinding, polishing, and tool storage inventory management.",
    status: "Open",
    lastUpdated: "2026-10-23"
  },

  // 3. Adani Solar & Renewable Systems (Clean Tech & Solar - Buldhana / Mehkar)
  {
    companyId: "comp-adani-solar",
    companyName: "Adani Solar & Green Tech",
    companyLogo: "",
    industry: "Renewable Energy & Solar Tech",
    companyLocation: "Buldhana & Mehkar, Maharashtra",
    jobTitle: "Solar PV Installation Technician",
    vacancies: 25,
    jobType: "Full-time",
    workLocation: "Buldhana District Field Sites",
    eligibility: "ITI Electrician / Wireman / Solar Tech",
    qualification: "ITI Electrical",
    experience: "Freshers welcome",
    description: "On-site solar module mounting, DC cabling, inverter connectivity, and grounding verification.",
    status: "Open",
    lastUpdated: "2026-10-25"
  },
  {
    companyId: "comp-adani-solar",
    companyName: "Adani Solar & Green Tech",
    companyLogo: "",
    industry: "Renewable Energy & Solar Tech",
    companyLocation: "Buldhana & Mehkar, Maharashtra",
    jobTitle: "Rooftop Solar Maintenance Trainee",
    vacancies: 15,
    jobType: "Trainee",
    workLocation: "Mehkar & Khamgaon Sites",
    eligibility: "12th Pass with Vocational Science or ITI",
    qualification: "12th Pass / ITI",
    experience: "Freshers welcome",
    description: "Preventive maintenance, module surface cleaning inspection, and basic string performance testing.",
    status: "Open",
    lastUpdated: "2026-10-25"
  },

  // 4. Reliance Retail & Logistics Hub (Logistics & Supply Chain - Pune / Bhiwandi)
  {
    companyId: "comp-reliance-logistics",
    companyName: "Reliance Retail & Logistics",
    companyLogo: "",
    industry: "Logistics, Warehousing & Retail",
    companyLocation: "Pune & Thane, Maharashtra",
    jobTitle: "Warehouse Inventory Associate",
    vacancies: 40,
    jobType: "Full-time",
    workLocation: "Wagholi Logistics Park, Pune",
    eligibility: "10th / 12th Pass, Basic smartphone literacy",
    qualification: "10th / 12th Pass",
    experience: "Freshers welcome",
    description: "Barcode scanning, inbound sorting, bin allocation, pick-and-pack fulfillment, and dispatch staging.",
    status: "Open",
    lastUpdated: "2026-10-24"
  },
  {
    companyId: "comp-reliance-logistics",
    companyName: "Reliance Retail & Logistics",
    companyLogo: "",
    industry: "Logistics, Warehousing & Retail",
    companyLocation: "Pune & Thane, Maharashtra",
    jobTitle: "Dispatch & Outbound Quality Checker",
    vacancies: 20,
    jobType: "Contract",
    workLocation: "Bhiwandi Hub & Pune Hub",
    eligibility: "12th Pass / Vocational Graduate",
    qualification: "12th Pass / Any Graduate",
    experience: "0 - 1 year",
    description: "Verification of package weights, invoice tags, dispatch sealing, and loading dock coordination.",
    status: "Open",
    lastUpdated: "2026-10-24"
  },

  // 5. Apollo Health & Diagnostics Care (Healthcare Services - Pune & Sambhajinagar)
  {
    companyId: "comp-apollo-diagnostics",
    companyName: "Apollo Diagnostics & Care",
    companyLogo: "",
    industry: "Healthcare & Diagnostic Services",
    companyLocation: "Pune & Sambhajinagar, Maharashtra",
    jobTitle: "Phlebotomy & Sample Lab Assistant",
    vacancies: 15,
    jobType: "Full-time",
    workLocation: "Pune Regional Centers",
    eligibility: "DMLT / CMLT or Certificate in Medical Lab Technology",
    qualification: "Diploma / Certificate in Lab Tech",
    experience: "Freshers welcome",
    description: "Blood sample collection with patient care protocols, barcode labeling, cold storage, and centrifuge assistance.",
    status: "Open",
    lastUpdated: "2026-10-22"
  },
  {
    companyId: "comp-apollo-diagnostics",
    companyName: "Apollo Diagnostics & Care",
    companyLogo: "",
    industry: "Healthcare & Diagnostic Services",
    companyLocation: "Pune & Sambhajinagar, Maharashtra",
    jobTitle: "General Duty Healthcare Assistant",
    vacancies: 25,
    jobType: "Trainee",
    workLocation: "Regional Medical Centers",
    eligibility: "GDA Certificate / 12th Pass Science",
    qualification: "GDA / 12th Science",
    experience: "Freshers welcome",
    description: "Patient registration assistance, temperature and vitals screening, sanitization, and desk triage.",
    status: "Open",
    lastUpdated: "2026-10-22"
  },

  // 6. Sahyadri Agro-Processing & Cold Chain Ltd (Agro-Food Processing - Nashik / Buldhana)
  {
    companyId: "comp-sahyadri-agro",
    companyName: "Sahyadri Agro-Processing Ltd",
    companyLogo: "",
    industry: "Agro-Processing & Cold Chain",
    companyLocation: "Nashik & Buldhana, Maharashtra",
    jobTitle: "Food Processing Line Operator",
    vacancies: 20,
    jobType: "Full-time",
    workLocation: "Nashik Agro Cluster Hub",
    eligibility: "10th / 12th Pass or ITI Food Production",
    qualification: "10th / 12th Pass / ITI",
    experience: "Freshers welcome",
    description: "Sorting, grading, weighing, hygienic pouch packaging, and cold seal machine operation.",
    status: "Open",
    lastUpdated: "2026-10-25"
  },
  {
    companyId: "comp-sahyadri-agro",
    companyName: "Sahyadri Agro-Processing Ltd",
    companyLogo: "",
    industry: "Agro-Processing & Cold Chain",
    companyLocation: "Nashik & Buldhana, Maharashtra",
    jobTitle: "Cold Storage Plant Technician",
    vacancies: 12,
    jobType: "Apprenticeship",
    workLocation: "Buldhana Cold Chain Facility",
    eligibility: "ITI Refrigeration & Air Conditioning (RAC) / Electrical",
    qualification: "ITI RAC / Electrical",
    experience: "Freshers welcome",
    description: "Monitoring cooling temperatures, compressor logs, defrost cycles, and emergency power backup.",
    status: "Open",
    lastUpdated: "2026-10-25"
  }
];

// ============================================================================
// 3. I18n Helper & Localization
// ============================================================================
function getCurrentLang() {
  return document.documentElement.lang || localStorage.getItem("preferred_language") || "en";
}

function getI18nText(key, defaultText) {
  const lang = getCurrentLang();
  if (typeof translations !== "undefined" && translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  return defaultText;
}

// Map job type to translated label and CSS modifier
function getJobTypeMeta(rawType) {
  const typeStr = String(rawType || "").toLowerCase().trim();
  if (typeStr.includes("apprentice")) {
    return {
      cssClass: "badge-apprentice",
      label: getI18nText("vacancies_type_apprentice", "Apprenticeship")
    };
  }
  if (typeStr.includes("trainee") || typeStr.includes("intern")) {
    return {
      cssClass: "badge-trainee",
      label: getI18nText("vacancies_type_trainee", "Trainee")
    };
  }
  if (typeStr.includes("contract") || typeStr.includes("temporary")) {
    return {
      cssClass: "badge-contract",
      label: getI18nText("vacancies_type_contract", "Contract")
    };
  }
  return {
    cssClass: "badge-fulltime",
    label: getI18nText("vacancies_type_fulltime", "Full-time")
  };
}

// ============================================================================
// 4. Data Processing & Aggregation
// ============================================================================
/**
 * Processes flat role records (1 row per role) into grouped company structures
 * and dynamically calculates summary metrics.
 * 
 * @param {Array} rawRecords - Array of role objects from Google Sheets or sample data
 * @returns {Object} { stats, companies, isSample }
 */
function processVacancyData(rawRecords, isSample) {
  if (!Array.isArray(rawRecords) || rawRecords.length === 0) {
    return {
      stats: {
        companiesCount: 0,
        totalVacancies: 0,
        distinctRolesCount: 0
      },
      companies: [],
      isSample: !!isSample
    };
  }

  // Filter only valid open records
  const validRecords = rawRecords.filter((rec) => {
    if (!rec) return false;
    const status = String(rec.status || "Open").toLowerCase().trim();
    return status === "open" && (rec.companyName || rec.companyId);
  });

  const companyMap = new Map();
  const distinctRolesSet = new Set();
  let totalVacanciesCount = 0;

  validRecords.forEach((rec) => {
    const companyKey = String(rec.companyId || rec.companyName).trim();
    if (!companyMap.has(companyKey)) {
      companyMap.set(companyKey, {
        id: companyKey,
        name: String(rec.companyName || "").trim(),
        logo: String(rec.companyLogo || "").trim(),
        industry: String(rec.industry || "").trim(),
        location: String(rec.companyLocation || "").trim(),
        roles: [],
        totalVacancies: 0
      });
    }

    const comp = companyMap.get(companyKey);

    // Parse role vacancies
    const vacNum = parseInt(rec.vacancies, 10);
    const validVac = !isNaN(vacNum) && vacNum >= 0 ? vacNum : null;

    if (validVac !== null) {
      comp.totalVacancies += validVac;
      totalVacanciesCount += validVac;
    }

    // Role record
    const roleTitle = String(rec.jobTitle || "").trim() || getI18nText("vacancies_not_specified", "Not specified");
    if (rec.jobTitle && rec.jobTitle.trim()) {
      distinctRolesSet.add(rec.jobTitle.trim().toLowerCase());
    }

    comp.roles.push({
      title: roleTitle,
      vacancies: validVac,
      jobType: String(rec.jobType || "Full-time").trim(),
      workLocation: String(rec.workLocation || "").trim(),
      eligibility: String(rec.eligibility || rec.qualification || "").trim(),
      experience: String(rec.experience || "").trim(),
      description: String(rec.description || "").trim()
    });
  });

  const companies = Array.from(companyMap.values());

  return {
    stats: {
      companiesCount: companies.length,
      totalVacancies: totalVacanciesCount,
      distinctRolesCount: distinctRolesSet.size
    },
    companies: companies,
    isSample: !!isSample
  };
}

// ============================================================================
// 5. HTML Renderers
// ============================================================================

/**
 * Render the 3 Summary Statistics Cards
 */
function renderVacanciesStatsHTML(stats) {
  const companiesLabel = getI18nText("vacancies_stat_companies", "Participating Companies");
  const openingsLabel = getI18nText("vacancies_stat_openings", "Available Vacancies");
  const rolesLabel = getI18nText("vacancies_stat_roles", "Distinct Job Roles");

  return `
    <!-- Stat 1: Participating Companies -->
    <div class="vacancy-stat-card">
      <div class="stat-icon-wrap" aria-hidden="true">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
          <path d="M10 6h4"></path>
          <path d="M10 10h4"></path>
          <path d="M10 14h4"></path>
          <path d="M10 18h4"></path>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-number">${stats.companiesCount}</span>
        <span class="stat-label" data-i18n="vacancies_stat_companies">${companiesLabel}</span>
      </div>
    </div>

    <!-- Stat 2: Available Vacancies -->
    <div class="vacancy-stat-card stat-card-featured">
      <div class="stat-icon-wrap" aria-hidden="true">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-number stat-number-highlight">${stats.totalVacancies}</span>
        <span class="stat-label" data-i18n="vacancies_stat_openings">${openingsLabel}</span>
      </div>
    </div>

    <!-- Stat 3: Distinct Job Roles -->
    <div class="vacancy-stat-card">
      <div class="stat-icon-wrap" aria-hidden="true">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <path d="M12 11h4"></path>
          <path d="M12 16h4"></path>
          <path d="M8 11h.01"></path>
          <path d="M8 16h.01"></path>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-number">${stats.distinctRolesCount}</span>
        <span class="stat-label" data-i18n="vacancies_stat_roles">${rolesLabel}</span>
      </div>
    </div>
  `;
}

/**
 * Render Development Mode Notice Banner
 */
function renderPreviewBannerHTML() {
  const badgeText = getI18nText("vacancies_preview_notice", "Sample Data — For Design Preview Only");
  const subText = getI18nText(
    "vacancies_preview_sub",
    "These records illustrate vocational sector opportunities for preview purposes. In production, live confirmed vacancies will be synchronized directly from the partner Google Sheet."
  );

  return `
    <div class="preview-notice-box">
      <div class="preview-notice-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="preview-notice-body">
        <div class="preview-notice-title" data-i18n="vacancies_preview_notice">${badgeText}</div>
        <p class="preview-notice-desc" data-i18n="vacancies_preview_sub">${subText}</p>
      </div>
    </div>
  `;
}

/**
 * Render a Single Company Vacancy Card
 * Static design: all essential info visible immediately without clicking or expanding.
 */
function renderCompanyCardHTML(company) {
  const notSpecifiedText = getI18nText("vacancies_not_specified", "Not specified");
  const openPosText = getI18nText("vacancies_open_positions", "Open Positions");
  const notConfirmedText = getI18nText("vacancies_not_confirmed", "Vacancies not confirmed");
  const openingsLabel = getI18nText("vacancies_col_openings", "Openings");

  // Vacancy Badge
  let vacancyHighlightHTML = "";
  if (company.totalVacancies > 0) {
    vacancyHighlightHTML = `
      <div class="company-badge-highlight">
        <span class="highlight-count">${company.totalVacancies}</span>
        <span class="highlight-text" data-i18n="vacancies_open_positions">${openPosText}</span>
      </div>
    `;
  } else {
    vacancyHighlightHTML = `
      <div class="company-badge-unconfirmed">
        <span class="unconfirmed-text" data-i18n="vacancies_not_confirmed">${notConfirmedText}</span>
      </div>
    `;
  }

  // Company Logo or Neutral Building Icon
  let logoHTML = "";
  if (company.logo && company.logo.trim() !== "") {
    logoHTML = `<img src="${company.logo}" alt="${company.name}" class="company-logo-img" loading="lazy">`;
  } else {
    logoHTML = `
      <div class="company-logo-fallback" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
          <path d="M10 6h4"></path>
          <path d="M10 10h4"></path>
          <path d="M10 14h4"></path>
          <path d="M10 18h4"></path>
        </svg>
      </div>
    `;
  }

  // Render Roles List
  const rolesHTML = company.roles
    .map((role) => {
      const typeMeta = getJobTypeMeta(role.jobType);

      // Vacancy count pill for individual role
      let roleVacHTML = "";
      if (role.vacancies !== null && role.vacancies > 0) {
        roleVacHTML = `<span class="role-vac-count">${role.vacancies} ${openingsLabel}</span>`;
      } else {
        roleVacHTML = `<span class="role-vac-unspecified">${notSpecifiedText}</span>`;
      }

      // Work location text
      const workLoc = role.workLocation || company.location || notSpecifiedText;

      // Eligibility text
      const eligibility = role.eligibility || notSpecifiedText;

      return `
        <div class="role-item">
          <!-- Role Header: Title & Vacancy Count -->
          <div class="role-item-header">
            <h4 class="role-title">${role.title}</h4>
            ${roleVacHTML}
          </div>

          <!-- Role Meta Attributes: Type, Location, Eligibility -->
          <div class="role-meta-list">
            <!-- Job Type Badge -->
            <div class="role-meta-row">
              <span class="role-type-badge ${typeMeta.cssClass}">${typeMeta.label}</span>
            </div>

            <!-- Work Location -->
            <div class="role-meta-row">
              <svg class="role-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span class="role-meta-text">${workLoc}</span>
            </div>

            <!-- Eligibility -->
            <div class="role-meta-row">
              <svg class="role-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              <span class="role-meta-text"><strong>${getI18nText("vacancies_col_eligibility", "Eligibility")}:</strong> ${eligibility}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <article class="company-vacancy-card" aria-label="${company.name}">
      <!-- Card Top: Logo, Company Name, Industry & Location -->
      <div class="company-card-top">
        <div class="company-header-main">
          ${logoHTML}
          <div class="company-identity">
            <h3 class="company-name">${company.name}</h3>
            ${
              company.industry
                ? `<span class="company-industry-badge">${company.industry}</span>`
                : ""
            }
          </div>
        </div>

        <!-- Location row -->
        ${
          company.location
            ? `
          <div class="company-loc-row">
            <svg class="company-loc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="company-loc-text">${company.location}</span>
          </div>`
            : ""
        }

        <!-- Total Openings Highlight -->
        ${vacancyHighlightHTML}
      </div>

      <!-- Card Body: Role Breakdown -->
      <div class="company-roles-wrapper">
        <div class="roles-section-label" data-i18n="vacancies_col_role">
          ${getI18nText("vacancies_col_role", "Job Role")} (${company.roles.length})
        </div>
        <div class="roles-items-list">
          ${rolesHTML}
        </div>
      </div>
    </article>
  `;
}

/**
 * Render Loading State
 */
function renderLoadingHTML() {
  const loadingText = getI18nText("vacancies_loading", "Fetching current vacancies...");
  return `
    <div class="vacancies-state-message">
      <div class="state-spinner" aria-hidden="true"></div>
      <p class="state-text" data-i18n="vacancies_loading">${loadingText}</p>
    </div>
  `;
}

/**
 * Render Error State (Production Mode only)
 */
function renderErrorHTML(message) {
  const errorTitle = getI18nText("vacancies_error_title", "Live Vacancies Currently Unavailable");
  const errorDesc = getI18nText(
    "vacancies_error_desc",
    "Vacancy records are currently being synchronized. Please check back shortly or contact the organizers."
  );

  return `
    <div class="vacancies-state-message state-error">
      <div class="state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3 class="state-title" data-i18n="vacancies_error_title">${errorTitle}</h3>
      <p class="state-desc" data-i18n="vacancies_error_desc">${errorDesc}</p>
      ${message ? `<p class="state-debug-note">System note: ${message}</p>` : ""}
    </div>
  `;
}

/**
 * Render Empty State
 */
function renderEmptyHTML() {
  const emptyTitle = getI18nText("vacancies_empty_title", "No Confirmed Vacancies Listed");
  const emptyDesc = getI18nText(
    "vacancies_empty_desc",
    "Participating companies are finalizing their role requirements. Check back soon!"
  );

  return `
    <div class="vacancies-state-message state-empty">
      <div class="state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      </div>
      <h3 class="state-title" data-i18n="vacancies_empty_title">${emptyTitle}</h3>
      <p class="state-desc" data-i18n="vacancies_empty_desc">${emptyDesc}</p>
    </div>
  `;
}

// ============================================================================
// 6. Controller & Initializer
// ============================================================================
let cachedVacancyData = null;

/**
 * Fetches vacancy data depending on mode (Production vs Development)
 */
async function fetchVacanciesData() {
  // If no endpoint is configured, run in Development Mode with sample records
  if (!VACANCIES_APPS_SCRIPT_ENDPOINT || VACANCIES_APPS_SCRIPT_ENDPOINT.trim() === "") {
    return {
      success: true,
      data: SAMPLE_VACANCY_RECORDS,
      isSample: true
    };
  }

  // Production Mode: fetch from configured Google Apps Script Web App
  try {
    const response = await fetch(VACANCIES_APPS_SCRIPT_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    if (json.status !== "success" || !Array.isArray(json.data)) {
      throw new Error(json.message || "Invalid API response structure from Google Apps Script");
    }

    return {
      success: true,
      data: json.data,
      isSample: false
    };
  } catch (err) {
    console.error("Failed to fetch live vacancies from Apps Script endpoint:", err);
    return {
      success: false,
      error: err.message,
      isSample: false
    };
  }
}

/**
 * Initialize or re-render the Vacancies section
 */
async function initVacanciesSection() {
  const statsRow = document.getElementById("vacanciesStatsRow");
  const bannerContainer = document.getElementById("vacanciesPreviewBanner");
  const cardsGrid = document.getElementById("vacanciesCardsGrid");

  if (!statsRow || !cardsGrid) {
    // Vacancies section elements not present on this page
    return;
  }

  // Show loading indicator in cards grid
  cardsGrid.innerHTML = renderLoadingHTML();

  // Fetch data
  const result = await fetchVacanciesData();

  if (!result.success) {
    // In Production Mode, display error rather than fabricating fake figures
    statsRow.innerHTML = "";
    if (bannerContainer) bannerContainer.innerHTML = "";
    cardsGrid.innerHTML = renderErrorHTML(result.error);
    return;
  }

  // Process and aggregate valid records
  const processed = processVacancyData(result.data, result.isSample);
  cachedVacancyData = processed;

  // Render Stats
  statsRow.innerHTML = renderVacanciesStatsHTML(processed.stats);

  // Render Preview Banner if Development Mode
  if (bannerContainer) {
    if (processed.isSample) {
      bannerContainer.innerHTML = renderPreviewBannerHTML();
      bannerContainer.style.display = "block";
    } else {
      bannerContainer.innerHTML = "";
      bannerContainer.style.display = "none";
    }
  }

  // Render Company Cards
  if (processed.companies.length === 0) {
    cardsGrid.innerHTML = renderEmptyHTML();
  } else {
    cardsGrid.innerHTML = processed.companies
      .map((company) => renderCompanyCardHTML(company))
      .join("");
  }
}

/**
 * Re-render with localized strings upon language change
 */
function refreshVacanciesI18n() {
  if (!cachedVacancyData) return;

  const statsRow = document.getElementById("vacanciesStatsRow");
  const bannerContainer = document.getElementById("vacanciesPreviewBanner");
  const cardsGrid = document.getElementById("vacanciesCardsGrid");

  if (statsRow) {
    statsRow.innerHTML = renderVacanciesStatsHTML(cachedVacancyData.stats);
  }

  if (bannerContainer && cachedVacancyData.isSample) {
    bannerContainer.innerHTML = renderPreviewBannerHTML();
  }

  if (cardsGrid) {
    if (cachedVacancyData.companies.length === 0) {
      cardsGrid.innerHTML = renderEmptyHTML();
    } else {
      cardsGrid.innerHTML = cachedVacancyData.companies
        .map((company) => renderCompanyCardHTML(company))
        .join("");
    }
  }
}

// ============================================================================
// 7. Event Listeners & Auto-Initialization
// ============================================================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVacanciesSection);
} else {
  initVacanciesSection();
}

// Listen for language changes
window.addEventListener("languageChanged", refreshVacanciesI18n);

// Fallback: listen for clicks on language buttons in case languageChanged event is delayed
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(refreshVacanciesI18n, 50);
    });
  });
});
