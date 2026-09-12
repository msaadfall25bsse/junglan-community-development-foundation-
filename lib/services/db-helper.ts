/**
 * Unified resilience helper:
 * Attempts to execute a Prisma operation. If the external PostgreSQL database is unreachable
 * (error code P1001 / PrismaClientInitializationError), it seamlessly delegates to the local persistent store.
 */
export async function tryPrismaOrFallback<T>(
  prismaFn: () => Promise<T>,
  fallbackFn: () => any
): Promise<T> {
  try {
    return await prismaFn();
  } catch (err: unknown) {
    const errorObj = err as { code?: string; name?: string; message?: string };
    console.warn(
      `[DB_FALLBACK_ACTIVE]: Prisma operation failed (${errorObj?.code || errorObj?.name || errorObj?.message || "error"}). Delegating to local persistent store.`
    );
    return await fallbackFn();
  }
}
