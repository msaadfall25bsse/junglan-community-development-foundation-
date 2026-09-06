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
    const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
    return {
      isConfigured: true,
      driver: hasUrl ? "PostgreSQL" : isServerless ? "Persistent Local Engine" : "Persistent Local Engine",
      status: hasData ? "READY" : "DEGRADED",
      engine: hasUrl ? "Prisma PostgreSQL Client" : isServerless ? "Serverless /tmp Atomic Store" : "Atomic Persistent Local Store",
      databaseUrlMasked: hasUrl
        ? "postgresql://*****:*****@.../junglan_foundation"
        : isServerless
        ? "Vercel Serverless Storage Engine (Active)"
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
