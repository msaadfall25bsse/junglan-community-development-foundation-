// ==============================================================================
// CENTRAL CONTENT & CONFIGURATION ARCHITECTURE (CMS-READY)
// ==============================================================================
// Separates static text and configuration from UI components for clean
// maintainability and effortless future database / CMS integration.

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
