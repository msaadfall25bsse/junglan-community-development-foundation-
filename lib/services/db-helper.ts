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
    const isConnectionError =
      errorObj?.code === "P1001" ||
      errorObj?.code === "P1000" ||
      errorObj?.name === "PrismaClientInitializationError" ||
      (typeof errorObj?.message === "string" &&
        (errorObj.message.includes("Can't reach database server") ||
          errorObj.message.includes("ECONNREFUSED")));

    if (isConnectionError) {
      return await fallbackFn();
    }

    throw err;
  }
}
