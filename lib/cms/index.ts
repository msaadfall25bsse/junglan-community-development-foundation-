// ==============================================================================
// CMS DATA ACCESS & CONTENT SERVICE
// ==============================================================================

import { PROJECTS_DATA, NEWS_DATA, LOCATIONS_DATA } from "@/data/homepage-data";
import { CMSProject, CMSNewsArticle, CMSLocation } from "@/types/cms";

export async function getPublicProjects(): Promise<CMSProject[]> {
  return PROJECTS_DATA.map((p) => ({
    id: p.id,
    slug: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    shortDescription: p.shortDescription,
    fullContent: p.fullDescription,
    impactGoals: p.impactMetrics,
    currentMetrics: [],
    isFeatured: true,
    publishStatus: "PUBLISHED",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  }));
}

export async function getPublicNews(): Promise<CMSNewsArticle[]> {
  return NEWS_DATA.map((n) => ({
    id: n.id,
    slug: n.slug,
    title: n.title,
    category: n.category,
    excerpt: n.excerpt,
    content: n.excerpt,
    authorName: "Junglan Field Communications",
    publishedAt: n.date,
    readTime: n.readTime,
    publishStatus: "PUBLISHED",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  }));
}

export async function getPublicLocations(): Promise<CMSLocation[]> {
  return LOCATIONS_DATA.map((l, idx) => ({
    id: `loc_${idx + 1}`,
    region: l.region,
    district: l.district,
    focusArea: l.focusArea,
    status: l.status,
    keyInterventions: l.keyInterventions,
    peopleServedEstimated: l.peopleServed,
    isPublic: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  }));
}
