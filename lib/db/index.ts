// ==============================================================================
// DATABASE CLIENT & ARCHITECTURE BOUNDARY
// ==============================================================================
// Primary Source of Truth: PostgreSQL
// Relational Blueprint: prisma/schema.prisma
// Per Section 10 of Project Specification:
// "Do not fully build the production database in Part 1 unless the current S2
// implementation already requires database corrections. Establish the database design direction."

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
