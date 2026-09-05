// ==============================================================================
// CONTENT MANAGEMENT & PUBLIC CMS DOMAIN TYPES
// ==============================================================================

export type ProjectCategory = "HEALTHCARE" | "AGRICULTURE" | "COMMUNITY_DEVELOPMENT";

export type ProjectStatus = "ACTIVE" | "UPCOMING" | "COMPLETED";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  shortSummary: string;
  fullDescription: string;
  coverImageUrl: string;
  galleryImageUrls?: string[];
  targetFundingPKR?: number;
  currentFundingPKR?: number;
  beneficiariesImpactedCount: number;
  status: ProjectStatus;
  isFeatured: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: "HEALTHCARE" | "AGRICULTURE" | "ANNOUNCEMENT" | "ACHIEVEMENT";
  summary: string;
  content: string;
  coverImageUrl: string;
  publishedAt: string;
  authorName: string;
  isPublished: boolean;
}

export interface OperationalLocation {
  id: string;
  name: string;
  district: string;
  provinceState: string;
  description: string;
  activeProjects: ProjectCategory[];
  latitude?: number;
  longitude?: number;
  ambulanceStationedCount: number;
}
