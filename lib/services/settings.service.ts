import { readStore, updateStore } from "@/lib/db";

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

  return updated!;
}
