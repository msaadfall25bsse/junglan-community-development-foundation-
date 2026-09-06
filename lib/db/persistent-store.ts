import fs from "fs";
import path from "path";

// ==============================================================================
// PERSISTENT FILE-BACKED DATABASE ENGINE
// ==============================================================================
// Authoritative, zero-config local storage ensuring 100% database availability
// without requiring external PostgreSQL server on local development machines.

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "foundation-store.json");

export interface FoundationStoreData {
  yearPeriods: Array<{
    id: string;
    year: number;
    label: string;
    status: "ACTIVE" | "CLOSED" | "ARCHIVED";
    isCurrentActive: boolean;
    startDate: string;
    endDate: string;
  }>;
  projects: Array<{
    id: string;
    slug: string;
    title: string;
    category: "HEALTHCARE" | "AGRICULTURE" | "COMMUNITY_DEVELOPMENT";
    shortDescription: string;
    fullDescription: string;
    coverImageUrl: string;
    targetFundingPKR: number;
    currentFundingPKR: number;
    beneficiariesImpactedCount: number;
    status: "ACTIVE" | "PLANNED" | "COMPLETED" | "ON_HOLD";
    isFeatured: boolean;
    isPublic: boolean;
    orderIndex: number;
    createdAt: string;
    updatedAt: string;
  }>;
  ambulances: Array<{
    id: string;
    ambulanceIdentifier: string;
    registrationNumber: string;
    model: string;
    manufacturingYear: number;
    status: "AVAILABLE" | "ON_TRIP" | "MAINTENANCE" | "OUT_OF_SERVICE";
    currentOdometerKm: number;
    assignedDriverName: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  trips: Array<{
    id: string;
    tripIdentifier: string;
    date: string;
    ambulanceId: string;
    patientId?: string | null;
    patientName: string;
    patientPhone?: string | null;
    pickupLocation: string;
    dropoffHospital: string;
    tripType: string;
    distanceKm: number;
    startOdometerKm: number;
    endOdometerKm?: number | null;
    dispatchTime: string;
    completedTime?: string | null;
    status: "DISPATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";
    urgencyLevel: "ROUTINE" | "URGENT" | "CRITICAL";
    driverName: string;
    paramedicName?: string | null;
    notes?: string | null;
    yearPeriodId: string;
    createdById?: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  patients: Array<{
    id: string;
    patientIdentifier: string;
    fullName: string;
    cnicOrBForm?: string | null;
    gender: "MALE" | "FEMALE" | "CHILD" | "OTHER";
    age: number;
    contactNumber: string;
    emergencyContactName?: string | null;
    emergencyContactPhone?: string | null;
    residenceArea: string;
    medicalConditionSummary: string;
    yearPeriodId: string;
    isFlaggedForReview: boolean;
    flagReason?: string | null;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  expenses: Array<{
    id: string;
    voucherNumber: string;
    date: string;
    amountPKR: number;
    category: "FUEL" | "MAINTENANCE" | "REPAIR" | "OPERATIONS" | "SUPPLIES" | "OTHER";
    title: string;
    description: string;
    paidTo: string;
    receiptDocumentRef?: string | null;
    status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
    yearPeriodId: string;
    loggedByUserId?: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  funding: Array<{
    id: string;
    referenceNumber: string;
    date: string;
    amountPKR: number;
    source: string;
    donorName: string;
    donorContact?: string | null;
    projectId?: string | null;
    purpose: string;
    paymentMethod: string;
    receiptDocumentRef?: string | null;
    yearPeriodId: string;
    isAnonymous: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  news: Array<{
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImageUrl: string;
    authorName: string;
    category: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  }>;
  reports: Array<{
    id: string;
    title: string;
    year: number;
    period: string;
    category: "FINANCIAL" | "OPERATIONAL" | "ANNUAL" | "IMPACT";
    fileSize: string;
    downloadUrl: string;
    summary: string;
    publishedDate: string;
    createdAt: string;
    updatedAt: string;
  }>;
  auditLogs: Array<{
    id: string;
    userId?: string | null;
    action: string;
    module: string;
    recordId: string;
    timestamp: string;
    metadataJson?: string | null;
  }>;
  settings: {
    appName: string;
    ambulanceHotline: string;
    supportEmail: string;
    officeAddress: string;
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branchCode: string;
    patientsServed: number;
    familiesAssisted: number;
    treesPlanted: number;
    activeAmbulancesCount: number;
  };
}

const DEFAULT_STORE: FoundationStoreData = {
  yearPeriods: [
    {
      id: "2026",
      year: 2026,
      label: "Operational Year 2026",
      status: "ACTIVE",
      isCurrentActive: true,
      startDate: "2026-01-01T00:00:00.000Z",
      endDate: "2026-12-31T23:59:59.000Z",
    },
  ],
  projects: [
    {
      id: "proj-1",
      slug: "healthcare-ambulance",
      title: "24/7 Mountain Emergency Ambulance Service",
      category: "HEALTHCARE",
      shortDescription:
        "Emergency patient transit equipped with life-support oxygen, stretchers, and trained paramedics across rugged mountain valleys to DHQ and tertiary hospitals.",
      fullDescription:
        "The Junglan Community 24/7 Emergency Ambulance Service delivers round-the-clock emergency medical transit for critical patients across remote mountain villages. Equipped with continuous-flow oxygen concentrators, trauma stretchers, and vital sign monitors, the service bridges the life-saving gap between rural homes and regional tertiary care hospitals in Abbottabad and Mansehra.",
      coverImageUrl: "/images/hero-ambulance.png",
      targetFundingPKR: 4500000,
      currentFundingPKR: 3250000,
      beneficiariesImpactedCount: 420,
      status: "ACTIVE",
      isFeatured: true,
      isPublic: true,
      orderIndex: 1,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
    {
      id: "proj-2",
      slug: "olive-agriculture",
      title: "Commercial Olive Farming & Farmer Subsidies",
      category: "AGRICULTURE",
      shortDescription:
        "Cultivating climate-resilient olive orchards on marginal hill slopes, distributing subsidized saplings, drip irrigation systems, and farmer agronomy training.",
      fullDescription:
        "Transforming barren mountain slopes into productive economic assets through commercial olive (Zaitoon) horticulture. In collaboration with provincial agriculture research stations, the foundation distributes certified high-yield saplings, implements water-conserving drip irrigation, and trains local smallholder farmers in organic grove management.",
      coverImageUrl: "/images/olive-agriculture.png",
      targetFundingPKR: 3800000,
      currentFundingPKR: 2450000,
      beneficiariesImpactedCount: 350,
      status: "ACTIVE",
      isFeatured: true,
      isPublic: true,
      orderIndex: 2,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
    {
      id: "proj-3",
      slug: "community-infrastructure",
      title: "Clean Drinking Water & Community Development",
      category: "COMMUNITY_DEVELOPMENT",
      shortDescription:
        "Gravity-flow clean drinking water filtration plants and vocational community training depots for sustainable rural living.",
      fullDescription:
        "Installing natural gravity-fed spring water filtration systems to bring clean, parasite-free drinking water to mountain hamlets, alongside community skill centers offering technical literacy and vocational skills for youth.",
      coverImageUrl: "/images/community-depot.png",
      targetFundingPKR: 2500000,
      currentFundingPKR: 1100000,
      beneficiariesImpactedCount: 680,
      status: "ACTIVE",
      isFeatured: true,
      isPublic: true,
      orderIndex: 3,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
  ],
  ambulances: [
    {
      id: "amb-1",
      ambulanceIdentifier: "AMB-01",
      registrationNumber: "ICT-LE-482",
      model: "Toyota 4x4 Mountain Land Cruiser",
      manufacturingYear: 2023,
      status: "AVAILABLE",
      currentOdometerKm: 14820,
      assignedDriverName: "M. Tariq Khan",
      isActive: true,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-03-05T00:00:00.000Z",
    },
    {
      id: "amb-2",
      ambulanceIdentifier: "AMB-02",
      registrationNumber: "ICT-LE-819",
      model: "Toyota HiAce High-Roof Patient Transit",
      manufacturingYear: 2024,
      status: "AVAILABLE",
      currentOdometerKm: 8940,
      assignedDriverName: "Sajid Mehmood",
      isActive: true,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-03-05T00:00:00.000Z",
    },
  ],
  trips: [
    {
      id: "trp-1",
      tripIdentifier: "TRP-2026-000042",
      date: "2026-03-04T08:30:00.000Z",
      ambulanceId: "amb-1",
      patientName: "Bibi Maryam",
      patientPhone: "03001234567",
      pickupLocation: "Upper Junglan Valley",
      dropoffHospital: "DHQ Hospital Mansehra",
      tripType: "Maternal Transit",
      distanceKm: 34,
      startOdometerKm: 14786,
      endOdometerKm: 14820,
      dispatchTime: "2026-03-04T08:30:00.000Z",
      completedTime: "2026-03-04T10:45:00.000Z",
      status: "COMPLETED",
      urgencyLevel: "CRITICAL",
      driverName: "M. Tariq Khan",
      paramedicName: "Qari Imran",
      notes: "Safe delivery transit with continuous oxygen administration",
      yearPeriodId: "2026",
      createdAt: "2026-03-04T08:30:00.000Z",
      updatedAt: "2026-03-04T10:45:00.000Z",
    },
    {
      id: "trp-2",
      tripIdentifier: "TRP-2026-000041",
      date: "2026-03-04T14:15:00.000Z",
      ambulanceId: "amb-2",
      patientName: "Abdur Rehman",
      patientPhone: "03019876543",
      pickupLocation: "Olive Nursery Bypass",
      dropoffHospital: "RHC Oghi",
      tripType: "Trauma & Fracture",
      distanceKm: 18,
      startOdometerKm: 8922,
      endOdometerKm: 8940,
      dispatchTime: "2026-03-04T14:15:00.000Z",
      completedTime: "2026-03-04T15:30:00.000Z",
      status: "COMPLETED",
      urgencyLevel: "URGENT",
      driverName: "Sajid Mehmood",
      paramedicName: "Khurram Shah",
      notes: "Splint applied, patient transferred in stable condition",
      yearPeriodId: "2026",
      createdAt: "2026-03-04T14:15:00.000Z",
      updatedAt: "2026-03-04T15:30:00.000Z",
    },
  ],
  patients: [
    {
      id: "pat-1",
      patientIdentifier: "JCD-P-2026-0001",
      fullName: "Bibi Maryam",
      cnicOrBForm: "37405-1234567-2",
      gender: "FEMALE",
      age: 28,
      contactNumber: "03001234567",
      residenceArea: "Upper Junglan Valley",
      medicalConditionSummary: "Emergency maternal labor transit requiring continuous oxygen",
      yearPeriodId: "2026",
      isFlaggedForReview: false,
      isArchived: false,
      createdAt: "2026-03-04T08:30:00.000Z",
      updatedAt: "2026-03-04T08:30:00.000Z",
    },
    {
      id: "pat-2",
      patientIdentifier: "JCD-P-2026-0002",
      fullName: "Abdur Rehman",
      cnicOrBForm: "37405-9876543-1",
      gender: "MALE",
      age: 52,
      contactNumber: "03019876543",
      residenceArea: "Olive Nursery Bypass",
      medicalConditionSummary: "Lower limb fracture following agricultural machinery incident",
      yearPeriodId: "2026",
      isFlaggedForReview: false,
      isArchived: false,
      createdAt: "2026-03-04T14:15:00.000Z",
      updatedAt: "2026-03-04T14:15:00.000Z",
    },
  ],
  expenses: [
    {
      id: "exp-1",
      voucherNumber: "EXP-2026-0001",
      date: "2026-03-01T00:00:00.000Z",
      amountPKR: 14500,
      category: "FUEL",
      title: "Ambulance Fuel Refill (50L Diesel)",
      description: "Emergency fuel refill for AMB-01 at PSO Station Chakwal Road",
      paidTo: "PSO Service Station",
      status: "APPROVED",
      yearPeriodId: "2026",
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
    {
      id: "exp-2",
      voucherNumber: "EXP-2026-0002",
      date: "2026-03-02T00:00:00.000Z",
      amountPKR: 28000,
      category: "SUPPLIES",
      title: "Medical Oxygen Cylinders Refill & Mask Kits",
      description: "Refill of 4 medical oxygen cylinders and pediatric masks for emergency fleet",
      paidTo: "Khyber Medical Gases",
      status: "APPROVED",
      yearPeriodId: "2026",
      createdAt: "2026-03-02T00:00:00.000Z",
      updatedAt: "2026-03-02T00:00:00.000Z",
    },
  ],
  funding: [
    {
      id: "fnd-1",
      referenceNumber: "FND-2026-000001",
      date: "2026-03-01T00:00:00.000Z",
      amountPKR: 100000,
      source: "INDIVIDUAL_DONATION",
      donorName: "Dr. Asif Mehmood (Overseas Pakistani)",
      donorContact: "+923001112233",
      projectId: "proj-1",
      purpose: "Dedicated ambulance fuel and operational maintenance fund",
      paymentMethod: "BANK_TRANSFER",
      yearPeriodId: "2026",
      isAnonymous: false,
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
  ],
  news: [
    {
      id: "news-1",
      slug: "emergency-ambulance-milestone",
      title: "Emergency Ambulance Fleet Completes 400th Life-Saving Mission",
      excerpt:
        "Junglan Community Development Foundation marks a milestone as the 24/7 mountain ambulance service reaches 400 emergency medical transfers across the valley.",
      content:
        "The dedicated volunteers and paramedic crew of the Junglan Community Development Foundation have officially completed their 400th life-saving emergency medical transit. Operating across difficult mountain terrain where commercial vehicles often refuse to travel, our 4x4 ambulance has provided uninterrupted emergency response for mothers in labor, trauma victims, and cardiac patients.\n\nWe extend our profound gratitude to all donors, community elders, and local hospital staff whose continuous support makes this service 100% free and operational 24 hours a day, 365 days a year.",
      coverImageUrl: "/images/hero-ambulance.png",
      authorName: "JCDF Media Cell",
      category: "COMMUNITY_STORY",
      status: "PUBLISHED",
      publishedAt: "2026-03-01T00:00:00.000Z",
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
    {
      id: "news-2",
      slug: "olive-saplings-preparation",
      title: "Spring Olive Planting: 5,000 Certified Saplings Ready for Distribution",
      excerpt:
        "Smallholder farmers across Junglan to receive subsidized high-yield olive saplings and drip irrigation kits for the upcoming planting season.",
      content:
        "In preparation for the spring planting season, the foundation has secured 5,000 certified olive saplings acclimatized for the local altitude and soil profile. Registered smallholder farmers will receive subsidized sapling packages, accompanied by technical training sessions on drip irrigation maintenance and natural pest deterrence.\n\nThis initiative aims to create sustainable generational household income while stabilizing erosion-prone terraced hillsides.",
      coverImageUrl: "/images/olive-agriculture.png",
      authorName: "Agronomy Wing",
      category: "FIELD_REPORT",
      status: "PUBLISHED",
      publishedAt: "2026-02-20T00:00:00.000Z",
      createdAt: "2026-02-20T00:00:00.000Z",
      updatedAt: "2026-02-20T00:00:00.000Z",
    },
    {
      id: "news-3",
      slug: "annual-transparency-pledge",
      title: "2025 Annual Financial & Operational Audit Report Released",
      excerpt:
        "Committed to 100% public accountability, our complete annual expenditure breakdown, fuel audits, and donation receipts are now available for public review.",
      content:
        "True to our founding charter of institutional transparency, the Junglan Community Development Foundation has published its audited annual report for the preceding fiscal year. Every rupee received from donors, grants, and community contributions is matched directly to verifiable expense vouchers and hospital transit logs.\n\nThe complete audit document is accessible in the Transparency Reports section of our website.",
      coverImageUrl: "/images/community-depot.png",
      authorName: "Executive Board",
      category: "PRESS_RELEASE",
      status: "PUBLISHED",
      publishedAt: "2026-01-15T00:00:00.000Z",
      createdAt: "2026-01-15T00:00:00.000Z",
      updatedAt: "2026-01-15T00:00:00.000Z",
    },
  ],
  reports: [
    {
      id: "rep-1",
      title: "Annual Financial & Operational Audit Report 2025",
      year: 2025,
      period: "Full Year 2025",
      category: "ANNUAL",
      fileSize: "2.8 MB",
      downloadUrl: "#",
      summary:
        "Comprehensive third-party financial audit detailing all incoming donations, operational expenditures, and ambulance fleet logs for 2025.",
      publishedDate: "15 Jan 2026",
      createdAt: "2026-01-15T00:00:00.000Z",
      updatedAt: "2026-01-15T00:00:00.000Z",
    },
    {
      id: "rep-2",
      title: "Ambulance Mission & Patient Transit Review (Q4 2025)",
      year: 2025,
      period: "October – December 2025",
      category: "OPERATIONAL",
      fileSize: "1.4 MB",
      downloadUrl: "#",
      summary:
        "Detailed operational log of 124 emergency medical transfers, oxygen usage logs, mileage audits, and destination hospital triage statistics.",
      publishedDate: "05 Jan 2026",
      createdAt: "2026-01-05T00:00:00.000Z",
      updatedAt: "2026-01-05T00:00:00.000Z",
    },
    {
      id: "rep-3",
      title: "Olive Agriculture Pilot Project Impact Assessment",
      year: 2025,
      period: "Spring & Autumn Seasons 2025",
      category: "IMPACT",
      fileSize: "3.2 MB",
      downloadUrl: "#",
      summary:
        "Survival rates, soil moisture readings, and economic yield forecasts for the initial 3,500 olive saplings distributed to valley farmers.",
      publishedDate: "10 Dec 2025",
      createdAt: "2025-12-10T00:00:00.000Z",
      updatedAt: "2025-12-10T00:00:00.000Z",
    },
  ],
  auditLogs: [
    {
      id: "aud-1",
      action: "CREATE",
      module: "SYSTEM",
      recordId: "init-01",
      timestamp: "2026-01-01T00:00:00.000Z",
      metadataJson: JSON.stringify({ message: "Initial system bootstrap and baseline registry" }),
    },
  ],
  settings: {
    appName: "Junglan Community Development Foundation",
    ambulanceHotline: "+92 300 0000000",
    supportEmail: "info@junglanfoundation.org",
    officeAddress: "Main Bazaar, Junglan Valley, Tehsil Oghi, District Mansehra, KP, Pakistan",
    bankName: "Meezan Bank Limited",
    accountTitle: "Junglan Community Development Foundation",
    accountNumber: "0102-0109283746",
    iban: "PK36MEZN0001020109283746",
    branchCode: "0102 (Oghi Branch)",
    patientsServed: 420,
    familiesAssisted: 780,
    treesPlanted: 5000,
    activeAmbulancesCount: 2,
  },
};

function ensureStoreInitialized(): FoundationStoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      fs.writeFileSync(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), "utf-8");
      return DEFAULT_STORE;
    }
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return { ...DEFAULT_STORE, ...data };
  } catch (err) {
    console.error("[STORE_INIT_ERROR]:", err);
    return DEFAULT_STORE;
  }
}

let cachedStore: FoundationStoreData | null = null;

export function readStore(): FoundationStoreData {
  if (!cachedStore) {
    cachedStore = ensureStoreInitialized();
  }
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    cachedStore = JSON.parse(raw);
    return cachedStore!;
  } catch {
    return cachedStore || DEFAULT_STORE;
  }
}

export function writeStore(data: FoundationStoreData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
    cachedStore = data;
  } catch (err) {
    console.error("[STORE_WRITE_ERROR]:", err);
  }
}

export function updateStore(mutator: (data: FoundationStoreData) => void): FoundationStoreData {
  const current = readStore();
  mutator(current);
  writeStore(current);
  return current;
}
