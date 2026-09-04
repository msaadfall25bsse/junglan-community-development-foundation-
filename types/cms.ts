// ==============================================================================
// 3. CMS & PUBLIC CONTENT DOMAIN TYPES
// ==============================================================================

export type ProjectCategory = "Healthcare" | "Agriculture" | "Community Development";
export type ProjectStatus = "Active Initiative" | "Expanding Project" | "Coming Soon";
export type NewsCategory = "Community" | "Healthcare" | "Agriculture";
export type ContentPublishStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface CMSProject {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  shortDescription: string;
  fullContent: string;
  heroImageUrl?: string;
  galleryImages?: string[];
  impactGoals: string[];
  currentMetrics: { label: string; value: string }[];
  isFeatured: boolean;
  publishStatus: ContentPublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CMSNewsArticle {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  excerpt: string;
  content: string;
  authorName: string;
  publishedAt: string;
  readTime: string;
  coverImageUrl?: string;
  relatedProjectId?: string;
  publishStatus: ContentPublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CMSLocation {
  id: string;
  region: string;
  district: string;
  focusArea: string;
  status: "Active Operations" | "Pilot Stage" | "Planned Expansion";
  keyInterventions: string[];
  peopleServedEstimated: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicReportDescriptor {
  id: string;
  title: string;
  yearPeriod: string;
  month?: string;
  category: "Annual" | "Healthcare" | "Agriculture" | "Financial Audit";
  pdfDownloadUrl?: string;
  docxDownloadUrl?: string;
  summary: string;
  isPublic: boolean;
  publishedAt: string;
}
