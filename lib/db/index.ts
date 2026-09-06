import { prisma } from "@/lib/prisma";
import { readStore } from "./persistent-store";

export { prisma };
export * from "./persistent-store";

export interface DatabaseHealthStatus {
  isConfigured: boolean;
  driver: "PostgreSQL" | "Persistent Local Engine";
  status: "READY" | "DEGRADED";
  engine: string;
  databaseUrlMasked?: string;
}

export function checkDatabaseHealth(): DatabaseHealthStatus {
  const url = process.env.DATABASE_URL;
  const hasUrl = Boolean(url && url.trim().length > 0);

  // Check store availability
  try {
    const store = readStore();
    const hasData = Boolean(store && store.yearPeriods && store.yearPeriods.length > 0);
    return {
      isConfigured: true,
      driver: hasUrl ? "PostgreSQL" : "Persistent Local Engine",
      status: "READY",
      engine: hasUrl ? "Prisma PostgreSQL Client" : "Atomic Persistent Local Store",
      databaseUrlMasked: hasUrl
        ? "postgresql://*****:*****@.../junglan_foundation"
        : "data/foundation-store.json (Local File Store)",
    };
  } catch {
    return {
      isConfigured: hasUrl,
      driver: "PostgreSQL",
      status: "DEGRADED",
      engine: "Unconfigured",
    };
  }
}

export interface DatabaseService {
  healthCheck: () => DatabaseHealthStatus;
}

export const db: DatabaseService = {
  healthCheck: checkDatabaseHealth,
};
