import { readStore, updateStore, exportStoreData, importStoreData } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ==============================================================================
// SITE SETTINGS & METRICS SERVICE
// ==============================================================================

export async function getSiteSettings() {
  const store = readStore();
  return store.settings;
}

export async function updateSiteSettings(data: Partial<ReturnType<typeof readStore>["settings"]>) {
  let updated: ReturnType<typeof readStore>["settings"];

  updateStore((s) => {
    s.settings = {
      ...s.settings,
      ...data,
    };
    updated = s.settings;
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "UPDATE",
      module: "SITE_SETTINGS",
      recordId: "global-settings",
      timestamp: new Date().toISOString(),
      metadataJson: JSON.stringify(data),
    });
  });

  try {
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");
    revalidatePath("/");
  } catch (err) {
    console.warn("Could not revalidate settings paths:", err);
  }

  return updated!;
}

export async function exportSiteBackup() {
  return exportStoreData();
}

export async function importSiteBackup(data: any) {
  const success = importStoreData(data);
  if (success) {
    try {
      revalidatePath("/about");
      revalidatePath("/contact");
      revalidatePath("/projects");
      revalidatePath("/reports");
      revalidatePath("/admin/settings");
      revalidatePath("/");
    } catch {}
  }
  return { success };
}
