import { readStore, updateStore } from "@/lib/db";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import type { CreateProjectInput, UpdateProjectInput, ProjectQueryInput } from "@/lib/validation";
import { revalidatePath } from "next/cache";

// ==============================================================================
// COMMUNITY PROJECT DOMAIN SERVICE
// ==============================================================================

export async function getProjects(query?: ProjectQueryInput) {
  const store = readStore();
  let items = [...store.projects];

  const targetSector = query?.sector || (query as any)?.category;
  if (targetSector) {
    items = items.filter((p) => p.category === targetSector);
  }

  if (query?.status) {
    items = items.filter((p) => p.status === query.status);
  }

  if (query?.search) {
    const term = query.search.toLowerCase().trim();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term)
    );
  }

  items.sort((a, b) => a.orderIndex - b.orderIndex);

  const page = query?.page || 1;
  const limit = query?.limit || 20;
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const paginated = items.slice((page - 1) * limit, page * limit);

  return {
    projects: paginated,
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

export async function getProjectBySlug(slug: string) {
  const store = readStore();
  const project = store.projects.find((p) => p.slug === slug || p.id === slug);
  if (!project) {
    throw new NotFoundError("Project", slug);
  }
  return project;
}

export async function createProject(data: CreateProjectInput) {
  const store = readStore();
  const existing = store.projects.find((p) => p.slug === data.slug);
  if (existing) {
    throw new ConflictError(`A project with slug '${data.slug}' already exists.`);
  }

  const newProject = {
    id: `proj-${Date.now()}`,
    slug: data.slug,
    title: data.title,
    category: data.sector as "HEALTHCARE" | "AGRICULTURE" | "COMMUNITY_DEVELOPMENT",
    shortDescription: data.description.slice(0, 180),
    fullDescription: data.description,
    coverImageUrl: data.coverImageUrl || "/images/hero-ambulance.png",
    targetFundingPKR: Number(data.targetFundingPKR),
    currentFundingPKR: Number(data.currentFundingPKR || 0),
    beneficiariesImpactedCount: Number(data.beneficiariesEstimate || 0),
    status: (data.status as "ACTIVE" | "PLANNED" | "COMPLETED" | "ON_HOLD") || "ACTIVE",
    isFeatured: true,
    isPublic: true,
    orderIndex: store.projects.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  updateStore((s) => {
    s.projects.push(newProject);
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "CREATE",
      module: "PROJECTS",
      recordId: newProject.id,
      timestamp: new Date().toISOString(),
      metadataJson: JSON.stringify({ slug: newProject.slug, title: newProject.title }),
    });
  });

  try {
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
  } catch {}

  return newProject;
}

export async function updateProject(id: string, data: UpdateProjectInput) {
  const store = readStore();
  const index = store.projects.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) {
    throw new NotFoundError("Project", id);
  }

  let updated: (typeof store.projects)[0];

  updateStore((s) => {
    const existing = s.projects[index];
    const categoryVal = data.sector === "COMMUNITY" ? "COMMUNITY_DEVELOPMENT" : data.sector;
    updated = {
      ...existing,
      ...(data.title ? { title: data.title } : {}),
      ...(data.description ? { fullDescription: data.description, shortDescription: data.description.slice(0, 180) } : {}),
      ...(categoryVal ? { category: categoryVal as any } : {}),
      ...(data.targetFundingPKR !== undefined ? { targetFundingPKR: Number(data.targetFundingPKR) } : {}),
      ...(data.currentFundingPKR !== undefined ? { currentFundingPKR: Number(data.currentFundingPKR) } : {}),
      ...(data.beneficiariesEstimate !== undefined ? { beneficiariesImpactedCount: Number(data.beneficiariesEstimate) } : {}),
      ...(data.status ? { status: data.status as any } : {}),
      ...(data.coverImageUrl ? { coverImageUrl: data.coverImageUrl } : {}),
      updatedAt: new Date().toISOString(),
    };
    s.projects[index] = updated;
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "UPDATE",
      module: "PROJECTS",
      recordId: id,
      timestamp: new Date().toISOString(),
      metadataJson: JSON.stringify({ title: updated.title }),
    });
  });

  try {
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/admin/projects");
    revalidatePath("/");
  } catch {}

  return updated!;
}

export async function deleteProject(id: string) {
  const store = readStore();
  const exists = store.projects.find((p) => p.id === id || p.slug === id);
  if (!exists) {
    throw new NotFoundError("Project", id);
  }

  updateStore((s) => {
    s.projects = s.projects.filter((p) => p.id !== id && p.slug !== id);
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "DELETE",
      module: "PROJECTS",
      recordId: id,
      timestamp: new Date().toISOString(),
    });
  });

  try {
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
  } catch {}

  return { success: true, message: `Project ${id} removed successfully.` };
}
