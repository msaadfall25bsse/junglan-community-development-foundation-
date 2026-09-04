// ==============================================================================
// DATABASE CLIENT & REPOSITORY SERVICE
// ==============================================================================
// Note: In Phase 29-30, this will initialize the PrismaClient / PostgreSQL connection.
// For now, this establishes the singleton client contract and architecture boundary.

export interface DatabaseHealthStatus {
  isConfigured: boolean;
  driver: "PostgreSQL";
  status: "READY" | "UNCONFIGURED";
}

export function checkDatabaseHealth(): DatabaseHealthStatus {
  const hasUrl = Boolean(process.env.DATABASE_URL);
  return {
    isConfigured: hasUrl,
    driver: "PostgreSQL",
    status: hasUrl ? "READY" : "UNCONFIGURED",
  };
}
