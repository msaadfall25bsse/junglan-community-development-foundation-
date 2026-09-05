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
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Our Impact", href: "/impact" },
  { label: "Where We Work", href: "/where-we-work" },
  { label: "News", href: "/news" },
  { label: "Reports", href: "/reports" },
  { label: "Contact", href: "/contact" },
];

export const FOUNDATION_INFO = {
  name: "Junglan Community Development Foundation",
  shortName: "Junglan Community Development Foundation",
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
  { label: "About Our Mission", href: "/about" },
  { label: "Our Verified Impact", href: "/impact" },
  { label: "Where We Work", href: "/where-we-work" },
  { label: "Field Projects", href: "/projects" },
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
      "The agricultural extension team at Junglan Community Development Foundation has completed initial soil testing across three community clusters in Pakhal and Junglan. The pH and mineral profiles indicate outstanding compatibility for commercial olive cultivars.",
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

// ------------------------------------------------------------------------------
// 9. DEDICATED ABOUT PAGE DATA (/about)
// ------------------------------------------------------------------------------
export const ABOUT_PAGE_DATA = {
  hero: {
    badge: "Who We Are",
    title: "Dedicated to Uplifting Remote Mountain Communities",
    subtitle:
      "Founded on the principles of Islamic humanitarian service and civic responsibility, Junglan Community Development Foundation operates at the intersection of life-saving emergency medical transit and sustainable rural agriculture.",
  },
  originStory: {
    heading: "Born From Need in the Valleys of Hazara",
    paragraphs: [
      "The rural hamlets of Junglan and surrounding valleys in District Mansehra are characterized by breathtaking natural beauty, but also severe geographic isolation. For decades, families in these mountain villages have faced an agonizing reality: when a medical emergency strikes, the nearest tertiary hospital is hours away over steep, unforgiving terrain.",
      "Mothers in obstructed labor, farmers injured in steep terrace accidents, and elderly cardiac patients often suffered irreversible outcomes simply because reliable emergency transport did not exist. At the same time, traditional subsistence farming left smallholder households economically precarious.",
      "Junglan Community Development Foundation was established by local community trustees and professionals to solve these two foundational challenges: immediate preservation of life through free emergency ambulance services, and long-term socio-economic self-reliance through high-yield olive agriculture.",
    ],
  },
  governance: {
    title: "Governance & Institutional Stewardship",
    description:
      "Inspired by the operational credibility of Al-Khidmat Foundation and international standards like UNICEF, our foundation is governed by a strict constitution ensuring zero fund diversion.",
    trustees: [
      {
        name: "Community Trustee Council",
        role: "Strategic Direction & Community Oversight",
        description: "Comprising respected village elders, doctors, and civic leaders from Junglan Valley.",
      },
      {
        name: "Medical & Fleet Advisory",
        role: "Clinical Protocols & Fleet Safety",
        description: "Voluntary medical officers supervising trauma equipment, driver safety, and hospital coordination.",
      },
      {
        name: "Agricultural Development Desk",
        role: "Agronomy & Farmer Training",
        description: "Specialists in Mediterranean olive propagation, nursery management, and organic soil health.",
      },
      {
        name: "Independent Audit Committee",
        role: "Financial Verification & Compliance",
        description: "Reconciles all bank statements, fuel slips, and donor receipts for semi-annual public disclosure.",
      },
    ],
  },
  legal: {
    registrationType: "Registered Community Development Organization under Provincial Voluntary Social Welfare Agencies Act",
    headquarters: "Main Village Junglan, Tehsil Oghi / District Mansehra, KP, Pakistan",
    auditStandard: "Full Public Accountability & 100% Direct Allocation Stewardship",
    bankAccount: "Meezan Bank Ltd (Official Shariah-Compliant Charity Account)",
  },
};

// ------------------------------------------------------------------------------
// 10. DEDICATED OUR IMPACT PAGE DATA (/impact)
// ------------------------------------------------------------------------------
export const IMPACT_PAGE_DATA = {
  hero: {
    badge: "Verified Community Impact",
    title: "Measuring Change Where It Matters Most",
    subtitle:
      "Every emergency trip logged, every seedling planted, and every donor rupee accounted for. Our commitment is 100% transparency with zero fabricated claims.",
  },
  fundAllocation: [
    { category: "Ambulance Fuel & Rapid Transit", percentage: 45, color: "bg-sky-600", description: "Direct fuel vouchers and 24/7 mountain driver readiness." },
    { category: "Olive Saplings & Smallholder Tools", percentage: 30, color: "bg-emerald-600", description: "Procurement of high-yield saplings and farmer training workshops." },
    { category: "Medical Consumables & Oxygen Refills", percentage: 20, color: "bg-indigo-600", description: "Trauma bandages, oxygen cylinders, pediatric masks, and stretcher maintenance." },
    { category: "Emergency Fleet Reserve", percentage: 5, color: "bg-amber-600", description: "Emergency repair fund for severe monsoon/landslide vehicle damage." },
  ],
  verifiedCaseStudies: [
    {
      id: "case-1",
      title: "Midnight Mountain Transit: Saving Mother & Newborn",
      location: "Upper Junglan Hamlet → DHQ Mansehra (34 km)",
      category: "Healthcare Rescue",
      summary:
        "At 2:00 AM, our 24/7 hotline received an urgent dispatch for a 26-year-old mother experiencing severe postpartum hemorrhage. Our Hilux 4x4 navigated unpaved mountain roads through heavy rain, arriving within 28 minutes. With portable oxygen administered, she reached DHQ Mansehra for blood transfusions. Both mother and child are thriving today.",
      metric: "Free Emergency Service",
    },
    {
      id: "case-2",
      title: "From Barren Terraces to Olive Groves",
      location: "Bala Kot Sector 2 Farming Collective",
      category: "Agricultural Empowerment",
      summary:
        "Subsidized distribution of 250 certified Coratina olive saplings to 5 smallholder families whose steep terraced fields suffered chronic water shortage. With foundational drip-irrigation training, 92% sapling survival rate was achieved, establishing what will become sustainable generational harvest value by 2028.",
      metric: "5 Families Supported",
    },
  ],
};

// ------------------------------------------------------------------------------
// 11. DEDICATED WHERE WE WORK PAGE DATA (/where-we-work)
// ------------------------------------------------------------------------------
export const WHERE_WE_WORK_PAGE_DATA = {
  hero: {
    badge: "Geographical Reach",
    title: "Serving the Mountain Valleys of Hazara",
    subtitle:
      "Our field teams operate in challenging alpine topographies across District Mansehra, bridging the critical distance between isolated villages and healthcare institutions.",
  },
  hospitalNetwork: [
    {
      name: "DHQ Hospital Mansehra",
      type: "District Headquarters Hospital",
      distanceFromBase: "34 km",
      typicalTransitTime: "45-55 mins",
      capabilities: "24/7 Emergency Triage, Maternity Wing, Blood Bank, General Surgery",
      status: "Primary Destination",
    },
    {
      name: "King Abdullah Teaching Hospital",
      type: "Tertiary Teaching Medical Complex",
      distanceFromBase: "38 km",
      typicalTransitTime: "50-65 mins",
      capabilities: "Intensive Care (ICU), Specialized Pediatrics, Advanced Trauma Care",
      status: "Tertiary Referral",
    },
    {
      name: "Ayub Medical Complex Abbottabad",
      type: "Regional Specialized Medical Center",
      distanceFromBase: "62 km",
      typicalTransitTime: "85-110 mins",
      capabilities: "Neurosurgery, Cardiac Catheterization, Severe Burn Units",
      status: "Specialized Referral",
    },
    {
      name: "Rural Health Center (RHC) Oghi",
      type: "Tehsil Sub-Center",
      distanceFromBase: "18 km",
      typicalTransitTime: "25-35 mins",
      capabilities: "Basic First Aid, Stabilization, Minor Trauma Treatment",
      status: "Local Stabilization",
    },
  ],
  terrainChallenges: [
    {
      title: "Alpine Elevation (1,200m - 2,200m)",
      description: "High altitude roads with steep gradients require high-torque 4x4 emergency ambulances with modified suspension.",
    },
    {
      title: "Seasonal Weather & Monsoons",
      description: "Winter frost and summer monsoon landslides often block roads, requiring close coordination with local road clearance teams.",
    },
    {
      title: "Decentralized Village Hamlets",
      description: "Populations are dispersed across mountain ridges rather than concentrated towns, necessitating community volunteer hotlines.",
    },
  ],
};
