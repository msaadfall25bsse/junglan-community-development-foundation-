import { z } from "zod";
import { BadRequestError } from "@/lib/api/errors";

// ==============================================================================
// REQUEST VALIDATION HELPERS
// ==============================================================================

/**
 * Parses and validates an incoming HTTP JSON request body against a Zod schema
 * Throws BadRequestError if JSON is malformed, or ZodError if validation constraints fail
 */
export async function validateBody<T>(
  req: Request,
  schema: z.ZodType<T>
): Promise<T> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new BadRequestError("The request body must be a valid JSON payload.");
  }

  return schema.parse(body);
}

/**
 * Parses and validates URL search parameters against a Zod schema
 */
export function validateQuery<T>(
  searchParams: URLSearchParams,
  schema: z.ZodType<T>
): T {
  const queryObj: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    queryObj[key] = value;
  });

  return schema.parse(queryObj);
}
