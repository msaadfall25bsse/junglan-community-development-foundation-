import { PrismaClient } from "@prisma/client";

// ==============================================================================
// SINGLETON PRISMA CLIENT ARCHITECTURE — SECTION 55 COMPLIANT
// ==============================================================================
// Prevents connection pool exhaustion during Next.js Turbopack development hot-reloads.
// Strictly server-only. Do not import into client components.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
