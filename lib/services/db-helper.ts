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
      !process.env.DATABASE_URL ||
      errorObj?.code === "P1000" ||
      errorObj?.code === "P1001" ||
      errorObj?.code === "P1002" ||
      errorObj?.code === "P1003" ||
      errorObj?.code === "P1017" ||
      errorObj?.code === "P2021" ||
      errorObj?.name === "PrismaClientInitializationError" ||
      errorObj?.name === "PrismaClientRustPanicError" ||
      (typeof errorObj?.message === "string" &&
        (errorObj.message.includes("Can't reach database server") ||
          errorObj.message.includes("ECONNREFUSED") ||
          errorObj.message.includes("does not exist") ||
          errorObj.message.includes("database server") ||
          errorObj.message.includes("Environment variable not found")));

    if (isConnectionError) {
      return await fallbackFn();
    }

    throw err;
  }
}
