import { prisma } from "@/lib/prisma";

export { prisma };

export interface DatabaseHealthStatus {
  isConfigured: boolean;
  driver: "PostgreSQL";
  status: "READY" | "UNCONFIGURED";
  databaseUrlMasked?: string;
}

export function checkDatabaseHealth(): DatabaseHealthStatus {
  const url = process.env.DATABASE_URL;
  const hasUrl = Boolean(url && url.trim().length > 0);
  return {
    isConfigured: hasUrl,
    driver: "PostgreSQL",
    status: hasUrl ? "READY" : "UNCONFIGURED",
    databaseUrlMasked: hasUrl
      ? "postgresql://*****:*****@.../junglan_foundation"
      : undefined,
  };
}

export interface DatabaseService {
  healthCheck: () => DatabaseHealthStatus;
}

export const db: DatabaseService = {
  healthCheck: checkDatabaseHealth,
};
