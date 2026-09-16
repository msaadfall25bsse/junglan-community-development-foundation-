/**
 * Unified resilience helper with Circuit Breaker:
 * Attempts to execute a Prisma operation. If the external PostgreSQL database is unreachable
 * (error code P1001 / PrismaClientInitializationError), it sets a 30-second circuit breaker
 * and immediately delegates to the local persistent store without waiting for repeated socket timeouts.
 */

let isPrismaUnreachable = false;
let lastUnreachableTime = 0;
const CIRCUIT_BREAKER_RESET_MS = 30 * 1000; // 30 seconds

export async function tryPrismaOrFallback<T>(
  prismaFn: () => Promise<T>,
  fallbackFn: () => any
): Promise<T> {
  const now = Date.now();
  if (isPrismaUnreachable && now - lastUnreachableTime < CIRCUIT_BREAKER_RESET_MS) {
    return await fallbackFn();
  }

  try {
    const result = await prismaFn();
    isPrismaUnreachable = false;
    return result;
  } catch (err: unknown) {
    const errorObj = err as { code?: string; name?: string; message?: string };
    if (
      errorObj?.code === "P1001" ||
      errorObj?.name === "PrismaClientInitializationError" ||
      String(errorObj?.message).includes("Can't reach database server")
    ) {
      isPrismaUnreachable = true;
      lastUnreachableTime = now;
    }

    console.warn(
      `[DB_FALLBACK_ACTIVE]: Prisma operation failed (${errorObj?.code || errorObj?.name || "unreachable"}). Delegating to local persistent store.`
    );
    return await fallbackFn();
  }
}

