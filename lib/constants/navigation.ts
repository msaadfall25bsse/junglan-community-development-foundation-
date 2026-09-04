/**
 * Navigation Configuration
 * Centralized navigation routes, labels, and metadata for the public site.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about", description: "Our mission, vision, leadership, and registration" },
  { label: "Initiatives", href: "/#projects", description: "Healthcare, olive farming, and community development" },
  { label: "Healthcare", href: "/#healthcare", description: "Emergency ambulance and maternal care network", badge: "24/7" },
  { label: "Olive Project", href: "/#agriculture", description: "Sustainable agriculture & livelihood program" },
  { label: "Where We Work", href: "/#locations", description: "Junglan and surrounding vulnerable communities" },
  { label: "News & Impact", href: "/#news", description: "Latest community updates and milestones" },
];

export const FOOTER_NAV_GROUPS: NavGroup[] = [
  {
    title: "Organization",
    items: [
      { label: "About JCDF", href: "/#about" },
      { label: "Mission & Values", href: "/#about" },
      { label: "Governance & Board", href: "/#about" },
      { label: "Community Leadership", href: "/#locations" },
      { label: "Legal Registration", href: "/#about" },
    ],
  },
  {
    title: "Initiatives",
    items: [
      { label: "Emergency Ambulance Service", href: "/#healthcare" },
      { label: "Olive Plantation & Agriculture", href: "/#agriculture" },
      { label: "Clean Drinking Water", href: "/#projects" },
      { label: "Youth & Vocational Training", href: "/#projects" },
      { label: "Widow & Vulnerable Support", href: "/#projects" },
    ],
  },
  {
    title: "Transparency & Trust",
    items: [
      { label: "100% Direct Impact Policy", href: "/#impact" },
      { label: "Financial Accountability", href: "/#news" },
      { label: "Audited Annual Reports", href: "/#news" },
      { label: "Donation Verification", href: "/#donate" },
      { label: "Whistleblower & Ethics", href: "/#about" },
    ],
  },
  {
    title: "Support & Contact",
    items: [
      { label: "Donate Online", href: "/#donate" },
      { label: "Bank Transfer Details", href: "/#donate" },
      { label: "Volunteer With Us", href: "/#news" },
      { label: "Emergency Dispatch: 24/7", href: "tel:+923000000000", external: true },
      { label: "Contact Foundation Desk", href: "/#about" },
    ],
  },
];

export const CONTACT_INFO = {
  phone: "+92 300 0000000",
  emergencyHotline: "+92 300 0000000",
  email: "info@junglanfoundation.org",
  donationsEmail: "donate@junglanfoundation.org",
  address: "Central Secretariat, Junglan Village, District Abbottabad, Khyber Pakhtunkhwa, Pakistan",
  ntnNumber: "Pending Registration / Non-Profit Charity Status",
  workingHours: "Mon – Sat: 8:00 AM – 6:00 PM (Ambulance Service: 24/7/365)",
};
