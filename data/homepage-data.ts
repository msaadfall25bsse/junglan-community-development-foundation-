export interface StatItem {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  sublabel: string;
  iconName: "Users" | "HeartHandshake" | "Sprout" | "Building2" | "Ambulance";
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Healthcare" | "Agriculture" | "Community Development";
  status: "Active Initiative" | "Expanding Project" | "Coming Soon";
  shortDescription: string;
  fullDescription: string;
  impactMetrics: string[];
  ctaText: string;
  ctaLink: string;
  iconType: "ambulance" | "sprout" | "building";
  featuredBadge?: string;
}

export interface ImpactStep {
  stepNumber: string;
  title: string;
  shortDesc: string;
  detail: string;
  icon: string;
}

export interface LocationItem {
  region: string;
  district: string;
  focusArea: string;
  status: "Active Operations" | "Pilot Stage" | "Planned Expansion";
  keyInterventions: string[];
  peopleServed: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: "Community" | "Healthcare" | "Agriculture";
  date: string;
  readTime: string;
  excerpt: string;
  badgeColor: string;
  imageAlt: string;
}

export interface DonationTier {
  id: string;
  amount: number;
  title: string;
  description: string;
  impactNote: string;
  isPopular?: boolean;
}

export const FOUNDATION_INFO = {
  name: "Junglan Community Development Foundation",
  shortName: "Junglan Foundation",
  tagline: "Building Stronger Communities, Creating Lasting Impact",
  missionStatement:
    "Empowering rural and underserved communities through accessible emergency healthcare, sustainable olive agriculture, and resilient community development initiatives.",
  registrationNotice: "A registered nonprofit community development foundation dedicated to transparent, community-led progress.",
  email: "contact@junglanfoundation.org",
  phone: "+1 (800) 586-4526",
  location: "Main Community Secretariat & Regional Project Hubs",
  yearEstablished: "2024",
};

export const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Our Impact", href: "#impact-flow" },
  { name: "Where We Work", href: "#where-we-work" },
  { name: "News & Updates", href: "#news" },
  { name: "Contact", href: "#footer" },
];

export const IMPACT_STATS: StatItem[] = [
  {
    id: "communities",
    value: "24",
    suffix: "+",
    label: "Communities Supported",
    sublabel: "Across rural & peri-urban clusters",
    iconName: "Users",
  },
  {
    id: "healthcare",
    value: "1,850",
    suffix: "+",
    label: "Emergency Transits & Aids",
    sublabel: "Critical healthcare access provided",
    iconName: "Ambulance",
  },
  {
    id: "agriculture",
    value: "15,000",
    suffix: "+",
    label: "Olive Saplings Cultivated",
    sublabel: "Supporting local farming families",
    iconName: "Sprout",
  },
  {
    id: "lives",
    value: "35,000",
    suffix: "+",
    label: "Lives Impacted",
    sublabel: "Through holistic community programs",
    iconName: "HeartHandshake",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "healthcare-ambulance",
    title: "Healthcare & Emergency Ambulance Initiative",
    category: "Healthcare",
    status: "Active Initiative",
    shortDescription:
      "Providing reliable emergency transportation and critical medical transit support to remote communities lacking timely hospital access.",
    fullDescription:
      "When medical emergencies strike in remote areas, distance can be life-threatening. Our ambulance project bridges the critical gap between underserved villages and regional trauma care centers with dedicated vehicles, trained first-responders, and subsidized emergency transit.",
    impactMetrics: [
      "24/7 Dedicated Emergency Dispatch",
      "Subsidized & Free Transit for Vulnerable Families",
      "Basic Life Support & First Responder Care",
    ],
    ctaText: "Learn More",
    ctaLink: "#healthcare-section",
    iconType: "ambulance",
    featuredBadge: "High Priority Service",
  },
  {
    id: "agriculture-olive",
    title: "Olive / Zaitoon Sustainable Agriculture Project",
    category: "Agriculture",
    status: "Expanding Project",
    shortDescription:
      "Supporting smallholder farmers through modern olive cultivation, climate-resilient horticulture, and sustainable rural economic growth.",
    fullDescription:
      "Olive trees provide decades of harvest, drought resilience, and steady economic security. We distribute high-yield olive saplings, install drip irrigation models, and train local farmers in soil stewardship and oil extraction techniques.",
    impactMetrics: [
      "High-Yield Zaitoon Sapling Distribution",
      "Drip Irrigation & Water-Conserving Training",
      "Long-Term Family Income Generation",
    ],
    ctaText: "Learn More",
    ctaLink: "#agriculture-section",
    iconType: "sprout",
    featuredBadge: "Sustainable Growth",
  },
  {
    id: "community-construction",
    title: "Community Infrastructure & Development",
    category: "Community Development",
    status: "Coming Soon",
    shortDescription:
      "Planning essential community infrastructure, clean water access, and public spaces to strengthen local resilience and dignity.",
    fullDescription:
      "Future initiatives currently in architectural assessment and stakeholder review, aimed at upgrading rural drinking water hubs, sanitation facilities, and community training centers.",
    impactMetrics: [
      "Clean Drinking Water Filtration Hubs",
      "Community Learning & Vocational Spaces",
      "Eco-Friendly Public Sanitation Works",
    ],
    ctaText: "Coming Soon",
    ctaLink: "#projects",
    iconType: "building",
  },
];

export const IMPACT_FLOW: ImpactStep[] = [
  {
    stepNumber: "01",
    title: "Transparent Giving",
    shortDesc: "Individual & Institutional Contributions",
    detail:
      "Every contribution directly funds vetted community initiatives with strict financial auditing and complete donor reporting.",
    icon: "Heart",
  },
  {
    stepNumber: "02",
    title: "Foundation Stewardship",
    shortDesc: "Strategic Allocation & Project Planning",
    detail:
      "Our team works alongside community elders and local experts to identify urgent needs and maximize every dollar's reach.",
    icon: "ShieldCheck",
  },
  {
    stepNumber: "03",
    title: "Direct Project Deployment",
    shortDesc: "Healthcare, Agriculture & Infrastructure",
    detail:
      "Resources are deployed on the ground into operational ambulances, olive orchards, and community development works.",
    icon: "Hammer",
  },
  {
    stepNumber: "04",
    title: "Sustained Community Impact",
    shortDesc: "Generational Empowerment & Dignity",
    detail:
      "Lives are saved, farmers gain sustainable livelihoods, and communities build self-reliance for generations to come.",
    icon: "TrendingUp",
  },
];

export const LOCATIONS_DATA: LocationItem[] = [
  {
    region: "Northern Valley Sector",
    district: "Rural Valley & Foothills",
    focusArea: "Emergency Ambulance Base & First Response",
    status: "Active Operations",
    keyInterventions: ["24/7 Mobile Ambulance Unit", "Emergency Response Team", "Patient Transfer Hub"],
    peopleServed: "18,000+ residents",
  },
  {
    region: "Eastern Terraces & Agro Plains",
    district: "Agricultural Basin",
    focusArea: "Zaitoon Olive Orchards & Farmer Training",
    status: "Active Operations",
    keyInterventions: ["15,000 Olive Saplings Planted", "Drip Irrigation Pilots", "Farmer Workshops"],
    peopleServed: "450+ farming households",
  },
  {
    region: "Central Community Cluster",
    district: "Peri-urban & Border Settlements",
    focusArea: "Future Community Infrastructure & Development",
    status: "Planned Expansion",
    keyInterventions: ["Water Quality Testing", "Community Center Blueprint", "Sanitation Planning"],
    peopleServed: "Under assessment (Est. 20,000)",
  },
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: "news-1",
    title: "Expanding Emergency Transit to Remote Hill Settlements",
    slug: "expanding-emergency-transit-remote-hill-settlements",
    category: "Healthcare",
    date: "August 28, 2026",
    readTime: "3 min read",
    excerpt:
      "Our dedicated healthcare team completed over 220 emergency transits this past month, ensuring critical mothers and elderly patients reached regional hospitals safely.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    imageAlt: "Healthcare workers and medical transit vehicle",
  },
  {
    id: "news-2",
    title: "Over 5,000 New Olive Saplings Distributed to Local Smallholders",
    slug: "olive-saplings-distribution-farmers",
    category: "Agriculture",
    date: "August 14, 2026",
    readTime: "4 min read",
    excerpt:
      "The second phase of the Zaitoon Development Project launched this week, providing drought-resistant olive saplings and drip irrigation assistance to 120 farming families.",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    imageAlt: "Farmers planting healthy olive saplings in orchard",
  },
  {
    id: "news-3",
    title: "Community Consultation Meetings for Upcoming Development Works",
    slug: "community-consultation-meetings-development",
    category: "Community",
    date: "July 30, 2026",
    readTime: "3 min read",
    excerpt:
      "Foundation leadership held town hall meetings with village elders to prioritize clean drinking water filtration sites and vocational community spaces.",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    imageAlt: "Community members gathered in dialogue circle",
  },
];

export const DONATION_TIERS: DonationTier[] = [
  {
    id: "tier-1",
    amount: 25,
    title: "Emergency Care Fuel & First Aid",
    description: "Funds fuel and essential medical supplies for emergency ambulance journeys in remote villages.",
    impactNote: "Directly funds 2 emergency transit trips.",
  },
  {
    id: "tier-2",
    amount: 60,
    title: "Olive Orchard Starter Kit",
    description: "Provides 10 certified olive saplings, organic soil prep, and irrigation training for a smallholder farmer.",
    impactNote: "Builds generational income for 1 farming family.",
    isPopular: true,
  },
  {
    id: "tier-3",
    amount: 150,
    title: "Community Health & Sustenance Pack",
    description: "Supports comprehensive maternal emergency transit and agricultural maintenance for a rural cluster.",
    impactNote: "Impacts over 25 community members directly.",
  },
  {
    id: "tier-4",
    amount: 500,
    title: "Community Development Partner",
    description: "Contributes directly to foundational infrastructure, water testing, and large-scale agricultural deployment.",
    impactNote: "Sponsors regional community expansion.",
  },
];
