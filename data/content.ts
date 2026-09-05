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
// 3. PROJECTS SHOWCASE DATA
// ------------------------------------------------------------------------------
export interface ProjectCardData {
  slug: string;
  title: string;
  category: "HEALTHCARE" | "AGRICULTURE" | "COMMUNITY";
  status: "ACTIVE" | "COMING_SOON";
  tagline: string;
  summary: string;
  impactMetrics: string[];
  ctaText: string;
}

export const HOMEPAGE_PROJECTS: ProjectCardData[] = [
  {
    slug: "healthcare-ambulance",
    title: "Emergency Ambulance Response",
    category: "HEALTHCARE",
    status: "ACTIVE",
    tagline: "Free 24/7 Emergency Transport for Remote Communities",
    summary:
      "Providing rapid medical evacuation from mountainous rural settlements to district specialty hospitals. Equipped with oxygen cylinders, paramedic supplies, and reliable all-terrain capability.",
    impactMetrics: ["24/7 Hotline", "Oxygen Equipped", "Free for Needy Patients"],
    ctaText: "Explore Healthcare Project",
  },
  {
    slug: "olive-agriculture",
    title: "Olive / Zaitoon Agriculture Project",
    category: "AGRICULTURE",
    status: "ACTIVE",
    tagline: "Cultivating Economic Independence & Sustainable Farming",
    summary:
      "Transforming arid hill slopes into productive commercial olive orchards. Distributing certified high-yield saplings and training local farmers in water-efficient drip irrigation.",
    impactMetrics: ["Certified Saplings", "Farmer Training", "Permanent Asset"],
    ctaText: "Explore Olive Project",
  },
  {
    slug: "community-infrastructure",
    title: "Community Infrastructure & Development",
    category: "COMMUNITY",
    status: "COMING_SOON",
    tagline: "Future Planned Civic Initiatives",
    summary:
      "Upcoming community development programs focusing on clean drinking water filtration plants, youth vocational training workshops, and community education centers.",
    impactMetrics: ["Surveying Underway", "Future Expansion", "Civic Welfare"],
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
  summary: string;
  readTime: string;
}

export const LATEST_NEWS_ITEMS: NewsArticle[] = [
  {
    slug: "emergency-ambulance-milestone",
    title: "Expanding Emergency Ambulance Transfers in Mountainous Junglan",
    category: "HEALTHCARE",
    date: "August 2026",
    summary:
      "Our dedicated ambulance team completed critical medical transfers for maternity and cardiac emergencies across remote mountain passes.",
    readTime: "3 min read",
  },
  {
    slug: "olive-saplings-preparation",
    title: "Preparations for the Upcoming Autumn Olive Planting Season",
    category: "AGRICULTURE",
    date: "July 2026",
    summary:
      "Agronomists and community volunteers are preparing demonstration plots to equip 50 local smallholder farmers with certified high-yield olive saplings.",
    readTime: "4 min read",
  },
  {
    slug: "annual-transparency-pledge",
    title: "Foundation Releases Field Operational Log & Stewardship Guidelines",
    category: "ANNOUNCEMENT",
    date: "June 2026",
    summary:
      "Reaffirming our commitment to absolute financial transparency with verified audit protocols and public operational reports.",
    readTime: "2 min read",
  },
];
