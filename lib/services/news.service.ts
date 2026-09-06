import { readStore, updateStore } from "@/lib/db";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import type { CreateNewsInput, UpdateNewsInput, NewsQueryInput } from "@/lib/validation";

// ==============================================================================
// NEWS & PUBLIC CMS DOMAIN SERVICE
// ==============================================================================

export async function getNewsArticles(query?: NewsQueryInput) {
  const store = readStore();
  let items = [...store.news];

  if (query?.category) {
    items = items.filter((n) => n.category === query.category);
  }

  if (query?.status) {
    items = items.filter((n) => n.status === query.status);
  }

  if (query?.search) {
    const term = query.search.toLowerCase().trim();
    items = items.filter(
      (n) =>
        n.title.toLowerCase().includes(term) ||
        n.excerpt.toLowerCase().includes(term) ||
        n.slug.toLowerCase().includes(term)
    );
  }

  items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const page = query?.page || 1;
  const limit = query?.limit || 20;
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const paginated = items.slice((page - 1) * limit, page * limit);

  return {
    articles: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

export async function getNewsArticleBySlug(slug: string) {
  const store = readStore();
  const article = store.news.find((n) => n.slug === slug || n.id === slug);
  if (!article) {
    throw new NotFoundError("News Article", slug);
  }
  return article;
}

export async function createNewsArticle(data: CreateNewsInput) {
  const store = readStore();
  const existing = store.news.find((n) => n.slug === data.slug);
  if (existing) {
    throw new ConflictError(`An article with slug '${data.slug}' already exists.`);
  }

  const newArticle = {
    id: `news-${Date.now()}`,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    coverImageUrl: data.coverImageUrl || "/images/hero-ambulance.png",
    authorName: data.authorName || "JCDF Media Cell",
    category: data.category || "COMMUNITY_STORY",
    status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED",
    publishedAt: data.publishedAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  updateStore((s) => {
    s.news.unshift(newArticle);
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "CREATE",
      module: "CMS_NEWS",
      recordId: newArticle.id,
      timestamp: new Date().toISOString(),
      metadataJson: JSON.stringify({ slug: newArticle.slug, title: newArticle.title }),
    });
  });

  return newArticle;
}

export async function updateNewsArticle(id: string, data: UpdateNewsInput) {
  const store = readStore();
  const index = store.news.findIndex((n) => n.id === id || n.slug === id);
  if (index === -1) {
    throw new NotFoundError("News Article", id);
  }

  let updated: (typeof store.news)[0];

  updateStore((s) => {
    const existing = s.news[index];
    updated = {
      ...existing,
      ...(data.title ? { title: data.title } : {}),
      ...(data.excerpt ? { excerpt: data.excerpt } : {}),
      ...(data.content ? { content: data.content } : {}),
      ...(data.category ? { category: data.category } : {}),
      ...(data.coverImageUrl ? { coverImageUrl: data.coverImageUrl } : {}),
      ...(data.authorName ? { authorName: data.authorName } : {}),
      ...(data.status ? { status: data.status as any } : {}),
      updatedAt: new Date().toISOString(),
    };
    s.news[index] = updated;
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "UPDATE",
      module: "CMS_NEWS",
      recordId: id,
      timestamp: new Date().toISOString(),
      metadataJson: JSON.stringify({ title: updated.title }),
    });
  });

  return updated!;
}

export async function deleteNewsArticle(id: string) {
  const store = readStore();
  const exists = store.news.find((n) => n.id === id || n.slug === id);
  if (!exists) {
    throw new NotFoundError("News Article", id);
  }

  updateStore((s) => {
    s.news = s.news.filter((n) => n.id !== id && n.slug !== id);
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "DELETE",
      module: "CMS_NEWS",
      recordId: id,
      timestamp: new Date().toISOString(),
    });
  });

  return { success: true, message: `Article ${id} deleted successfully.` };
}
