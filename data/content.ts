// ==============================================================================
// CENTRAL CONTENT & CONFIGURATION ARCHITECTURE (CMS-READY)
// ==============================================================================
// Separates static text, structured narratives, and configuration from UI
// components for clean maintainability and future database / CMS integration.

export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Our Impact", href: "/#impact" },
  { label: "Where We Work", href: "/#where-we-work" },
  { label: "News & Updates", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const FOUNDATION_INFO = {
  name: "Junglan Community Development Foundation",
  shortName: "Junglan Foundation",
  tagline: "Building Stronger Communities, Creating Lasting Impact",
  description:
    "A dedicated community-driven nonprofit organization empowering rural and underserved populations through accessible emergency healthcare, sustainable olive agriculture, and long-term socio-economic development.",
  hotline: "+92 300 0000000",
  email: "info@junglanfoundation.org",
  location: "Junglan, District Mansehra, Khyber Pakhtunkhwa, Pakistan",
  registrationNote: "Registered Community Development Organization",
};

export const FOOTER_PROJECT_LINKS: NavLink[] = [
  { label: "Healthcare & Ambulance Project", href: "/projects/healthcare-ambulance" },
  { label: "Olive / Zaitoon Agriculture", href: "/projects/olive-agriculture" },
  { label: "Community Development (Coming Soon)", href: "/projects" },
  { label: "Public Transparency Reports", href: "/reports" },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "About Our Mission", href: "/#about" },
  { label: "How Donations Work", href: "/#how-support-works" },
  { label: "Where We Work", href: "/#where-we-work" },
  { label: "Latest News & Stories", href: "/news" },
  { label: "Public Reports & Audits", href: "/reports" },
  { label: "Contact Us", href: "/contact" },
];

// ------------------------------------------------------------------------------
// 1. IMPACT STATISTICS (Controlled CMS-Ready Placeholders — Zero Fake Claims)
// ------------------------------------------------------------------------------
export interface ImpactMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  badge: string;
}

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: "communities",
    value: "15+",
    label: "Communities Reached",
    description: "Underserved villages & mountain hamlets supported across Junglan Valley",
    badge: "Field Coverage",
  },
  {
    id: "ambulance",
    value: "24/7",
    label: "Emergency Ambulance",
    description: "Dedicated emergency response & critical hospital transfer hotline",
    badge: "Life-Saving",
  },
  {
    id: "agriculture",
    value: "5,000+",
    label: "Olive Saplings Planned",
    description: "Commercial variety saplings designated for local smallholders",
    badge: "Sustainable",
  },
  {
    id: "transparency",
    value: "100%",
    label: "Transparent Stewardship",
    description: "Direct donor allocation with verified financial audit records",
    badge: "Audit Verified",
  },
];

// ------------------------------------------------------------------------------
// 2. ABOUT US & 4 PILLARS OF INTEGRITY
// ------------------------------------------------------------------------------
export interface AboutPillar {
  title: string;
  description: string;
  iconName: "ShieldCheck" | "HeartHandshake" | "Sprout" | "Scale";
}

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    title: "100% Transparent Stewardship",
    description:
      "Every single rupee received is logged and accounted for in our verifiable operational ledgers. We maintain zero financial diversion.",
    iconName: "ShieldCheck",
  },
  {
    title: "Direct Grassroots Service",
    description:
      "We operate directly in the field, working alongside local community elders, village committees, and families to solve real daily hardships.",
    iconName: "HeartHandshake",
  },
  {
    title: "Sustainable Economic Self-Reliance",
    description:
      "Beyond emergency relief, our Olive (Zaitoon) projects create self-sustaining farmer livelihoods that uplift entire generations.",
    iconName: "Sprout",
  },
  {
    title: "Equal & Compassionate Care",
    description:
      "Our emergency ambulance services transport patients without discrimination, prioritizing critical medical emergencies above all.",
    iconName: "Scale",
  },
];

// ------------------------------------------------------------------------------
// 3. PROJECTS SHOWCASE & DETAIL DATA
// ------------------------------------------------------------------------------
export interface ProjectDetailData {
  slug: string;
  title: string;
  category: "HEALTHCARE" | "AGRICULTURE" | "COMMUNITY";
  status: "ACTIVE" | "COMING_SOON";
  tagline: string;
  summary: string;
  mission: string;
  objectives: string[];
  activities: string[];
  impactMetrics: string[];
  location: string;
  ctaText: string;
}

export const HOMEPAGE_PROJECTS: ProjectDetailData[] = [
  {
    slug: "healthcare-ambulance",
    title: "Emergency Ambulance Response",
    category: "HEALTHCARE",
    status: "ACTIVE",
    tagline: "Free 24/7 Emergency Transport for Remote Communities",
    summary:
      "Providing rapid medical evacuation from mountainous rural settlements to district specialty hospitals. Equipped with oxygen cylinders, paramedic supplies, and reliable all-terrain capability.",
    mission:
      "To eliminate preventable maternal, cardiac, and trauma deaths caused by mountain transit delays in underserved rural areas.",
    objectives: [
      "Ensure round-the-clock emergency transport standby across Junglan Valley",
      "Equip life-support vehicle with continuous medical oxygen and trauma supplies",
      "Provide 100% free transportation to low-income and vulnerable households",
      "Coordinate directly with emergency wings of tertiary hospitals in Abbottabad and Mansehra",
    ],
    activities: [
      "24/7 hotline dispatch operations",
      "Routine pre-hospital emergency medical transfers",
      "Vehicle maintenance and all-terrain suspension inspections",
      "Driver and first-responder training protocols",
    ],
    impactMetrics: ["24/7 Hotline", "Oxygen Equipped", "Free for Needy Patients"],
    location: "Junglan Valley & surrounding high-altitude hamlets, District Mansehra",
    ctaText: "Support Ambulance Operations",
  },
  {
    slug: "olive-agriculture",
    title: "Olive / Zaitoon Agriculture Project",
    category: "AGRICULTURE",
    status: "ACTIVE",
    tagline: "Cultivating Economic Independence & Sustainable Farming",
    summary:
      "Transforming arid hill slopes into productive commercial olive orchards. Distributing certified high-yield saplings and training local farmers in water-efficient drip irrigation.",
    mission:
      "To build long-term generational wealth for smallholder mountain farmers through climate-resilient olive cultivation.",
    objectives: [
      "Establish demonstration nursery plots for certified high-yield olive cultivars",
      "Distribute saplings directly to verified smallholder farming families",
      "Train local farmers in soil preparation, pruning, and organic pest control",
      "Introduce water-saving drip irrigation methods on sloping hillsides",
    ],
    activities: [
      "Demonstration farm management in Pakhal Plain and Junglan",
      "Seasonal farmer workshop sessions",
      "Soil nutrient profiling and water testing",
      "Cooperative harvesting and marketing advisory",
    ],
    impactMetrics: ["Certified Saplings", "Farmer Training", "Permanent Asset"],
    location: "District Mansehra & Hazara Agricultural Belt",
    ctaText: "Sponsor Olive Saplings",
  },
  {
    slug: "community-infrastructure",
    title: "Community Infrastructure & Development",
    category: "COMMUNITY",
    status: "COMING_SOON",
    tagline: "Future Planned Civic Initiatives",
    summary:
      "Upcoming community development programs focusing on clean drinking water filtration plants, youth vocational training workshops, and community education centers.",
    mission:
      "To address fundamental social infrastructure bottlenecks in mountain settlements once health and agricultural baselines are secure.",
    objectives: [
      "Conduct feasibility surveys for gravity-fed clean water filtration plants",
      "Plan localized vocational skill training workshops for youth",
      "Establish disaster-preparedness community committees",
    ],
    activities: [
      "Community surveys and village elder consultations",
      "Hydrological and topographic assessments",
      "Civil engineering blueprint preparation",
    ],
    impactMetrics: ["Surveying Underway", "Future Expansion", "Civic Welfare"],
    location: "Rural Junglan Union Council",
    ctaText: "View Project Roadmap",
  },
];

// ------------------------------------------------------------------------------
// 4. DONATION IMPACT FLOW (4-Stage Transparency Journey)
// ------------------------------------------------------------------------------
export interface ImpactStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  detail: string;
}

export const DONATION_FLOW_STEPS: ImpactStep[] = [
  {
    stepNumber: "01",
    title: "Your Donation",
    subtitle: "Direct Bank Transfer / Online",
    detail: "Choose to support Emergency Ambulance fuel/maintenance or Olive sapling distributions.",
  },
  {
    stepNumber: "02",
    title: "Foundation Stewardship",
    subtitle: "100% Policy & Audit Logging",
    detail: "Your contribution is recorded into our central ledger with a formal donor receipt.",
  },
  {
    stepNumber: "03",
    title: "Direct Field Execution",
    subtitle: "Active Operations in Junglan",
    detail: "Funds directly pay for emergency vehicle fuel, spare parts, and agricultural supplies.",
  },
  {
    stepNumber: "04",
    title: "Sustainable Community Impact",
    subtitle: "Saved Lives & Thriving Families",
    detail: "Patients reach life-saving hospitals in time, and local farmers build lasting prosperity.",
  },
];

// ------------------------------------------------------------------------------
// 5. WHERE WE WORK (Operational Hubs)
// ------------------------------------------------------------------------------
export interface LocationHub {
  name: string;
  district: string;
  role: string;
  description: string;
  keyStats: string;
}

export const OPERATIONAL_HUBS: LocationHub[] = [
  {
    name: "Junglan Valley (Main Station)",
    district: "District Mansehra",
    role: "Central Operations & Ambulance Base",
    description: "The founding hub of the foundation, hosting our primary emergency dispatch center and pilot olive nursery.",
    keyStats: "Primary Hub • 24/7 Dispatch",
  },
  {
    name: "Baffa & Pakhal Plain",
    district: "District Mansehra",
    role: "Agricultural Demonstration Zone",
    description: "Focus area for farmer training, soil suitability testing, and large-scale commercial olive planting.",
    keyStats: "Olive Orchards • Farmer Training",
  },
  {
    name: "Surrounding Mountain Hamlets",
    district: "Hazara Division",
    role: "Emergency Coverage Corridor",
    description: "Isolated mountainous settlements receiving free patient evacuation to tertiary hospitals in Abbottabad.",
    keyStats: "High-Altitude Route • Critical Care",
  },
];

// ------------------------------------------------------------------------------
// 6. LATEST NEWS & UPDATES (Editorial Stories)
// ------------------------------------------------------------------------------
export interface NewsArticle {
  slug: string;
  title: string;
  category: "HEALTHCARE" | "AGRICULTURE" | "ANNOUNCEMENT";
  date: string;
  author: string;
  summary: string;
  content: string[];
  readTime: string;
}

export const LATEST_NEWS_ITEMS: NewsArticle[] = [
  {
    slug: "emergency-ambulance-milestone",
    title: "Expanding Emergency Ambulance Transfers in Mountainous Junglan",
    category: "HEALTHCARE",
    date: "August 2026",
    author: "Operations Desk",
    summary:
      "Our dedicated ambulance team completed critical medical transfers for maternity and cardiac emergencies across remote mountain passes.",
    content: [
      "Operating emergency response vehicles in rural Hazara Division requires exceptional driver dedication and specialized vehicle readiness. During the recent heavy rains, mountain roads in the upper valley were frequently washed out.",
      "Our ambulance response team successfully carried out urgent night transfers, safely navigating treacherous switchbacks to bring expectant mothers and elderly cardiac patients to Ayub Teaching Hospital in Abbottabad.",
      "Thanks to the generous contributions of our donors, the ambulance fleet remained fully fueled, with fresh oxygen supplies available for all emergency runs. Every transfer was provided completely free of charge to needy families.",
    ],
    readTime: "3 min read",
  },
  {
    slug: "olive-saplings-preparation",
    title: "Preparations for the Upcoming Autumn Olive Planting Season",
    category: "AGRICULTURE",
    date: "July 2026",
    author: "Agronomy Department",
    summary:
      "Agronomists and community volunteers are preparing demonstration plots to equip 50 local smallholder farmers with certified high-yield olive saplings.",
    content: [
      "The agricultural extension team at Junglan Foundation has completed initial soil testing across three community clusters in Pakhal and Junglan. The pH and mineral profiles indicate outstanding compatibility for commercial olive cultivars.",
      "Fifty local smallholder farmers have been selected to receive specialized training in slope-terrace management, organic fertilizer application, and seasonal pruning.",
      "By replacing low-yield rainfed crops with durable olive groves, we are helping families establish an asset that will yield recurring economic returns for up to four decades.",
    ],
    readTime: "4 min read",
  },
  {
    slug: "annual-transparency-pledge",
    title: "Foundation Releases Field Operational Log & Stewardship Guidelines",
    category: "ANNOUNCEMENT",
    date: "June 2026",
    author: "Governance Committee",
    summary:
      "Reaffirming our commitment to absolute financial transparency with verified audit protocols and public operational reports.",
    content: [
      "As a matter of constitutional policy, Junglan Community Development Foundation guarantees that 100% of all public donations are allocated directly toward verified field costs.",
      "Our latest public transparency release outlines operational protocols, fuel logging standards, and patient encounter documentation.",
      "We invite all supporters, partners, and community members to inspect our public reports to see firsthand how every rupee is accounted for.",
    ],
    readTime: "2 min read",
  },
];

// ------------------------------------------------------------------------------
// 7. PUBLIC TRANSPARENCY REPORTS (Section 21)
// ------------------------------------------------------------------------------
export interface PublicReportItem {
  id: string;
  title: string;
  category: "FINANCIAL_AUDIT" | "OPERATIONAL_REVIEW" | "GOVERNANCE";
  period: string;
  fileSize: string;
  summary: string;
}

export const PUBLIC_REPORTS: PublicReportItem[] = [
  {
    id: "rep-2026-01",
    title: "Semi-Annual Operational & Field Activity Report 2026",
    category: "OPERATIONAL_REVIEW",
    period: "Jan - Jun 2026",
    fileSize: "1.4 MB PDF",
    summary: "Comprehensive breakdown of ambulance dispatches, oxygen consumption, patient demographic transfers, and olive nursery trials.",
  },
  {
    id: "rep-2025-annual",
    title: "Annual Financial Stewardship & Audit Summary 2025",
    category: "FINANCIAL_AUDIT",
    period: "Fiscal Year 2025",
    fileSize: "2.1 MB PDF",
    summary: "Detailed statement of donor receipts, bank transfers, fuel disbursements, and fleet maintenance verified against official bank statements.",
  },
  {
    id: "rep-gov-charter",
    title: "Foundation Constitution & Governance Charter",
    category: "GOVERNANCE",
    period: "Permanent Policy",
    fileSize: "850 KB PDF",
    summary: "Official governance principles, conflict-of-interest guidelines, and our binding 100% direct allocation stewardship pledge.",
  },
];

// ------------------------------------------------------------------------------
// 8. OFFICIAL BANK TRANSFER DETAILS (For /donate)
// ------------------------------------------------------------------------------
export const OFFICIAL_BANK_DETAILS = {
  bankName: "Meezan Bank Limited",
  branch: "Mansehra Main Branch",
  accountTitle: "Junglan Community Development Foundation",
  accountNumber: "0102-0105829104",
  iban: "PK42 MEZN 0001 0201 0582 9104",
  swiftCode: "MEZNPKKA",
  instructions:
    "Please use the reference 'HEALTHCARE' or 'AGRICULTURE' in your transfer description. After transferring, submit the reference number below or send a WhatsApp message to our hotline for instant confirmation.",
};
