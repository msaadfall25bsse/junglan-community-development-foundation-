import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { apiError, type ApiErrorResponse } from "./response";

// ==============================================================================
// CUSTOM DOMAIN ERROR HIERARCHY
// ==============================================================================

/**
 * Base Application Error class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: Record<string, string[]> | unknown;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = "INTERNAL_SERVER_ERROR",
    details?: Record<string, string[]> | unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 422 Unprocessable Entity — Validation Failure
 */
export class ValidationError extends AppError {
  constructor(
    message: string = "Validation failed for the supplied data",
    details?: Record<string, string[]>
  ) {
    super(message, 422, "VALIDATION_ERROR", details);
  }
}

/**
 * 404 Not Found — Resource does not exist
 */
export class NotFoundError extends AppError {
  constructor(resource: string = "Resource", identifier?: string | number) {
    const msg = identifier
      ? `${resource} with identifier '${identifier}' was not found.`
      : `${resource} was not found.`;
    super(msg, 404, "NOT_FOUND");
  }
}

/**
 * 401 Unauthorized — Authentication required or invalid token
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = "Authentication is required to access this resource.") {
    super(message, 401, "UNAUTHORIZED");
  }
}

/**
 * 403 Forbidden — Insufficient role or access permissions
 */
export class ForbiddenError extends AppError {
  constructor(message: string = "You do not have permission to perform this action.") {
    super(message, 403, "FORBIDDEN");
  }
}

/**
 * 409 Conflict — Unique constraint or conflicting resource state
 */
export class ConflictError extends AppError {
  constructor(message: string = "A resource conflict occurred.", details?: unknown) {
    super(message, 409, "CONFLICT_ERROR", details);
  }
}

/**
 * 400 Bad Request — Malformed or syntactically invalid request payload
 */
export class BadRequestError extends AppError {
  constructor(message: string = "Bad request payload or parameters.", details?: unknown) {
    super(message, 400, "BAD_REQUEST", details);
  }
}

// ==============================================================================
// GLOBAL API ERROR HANDLER
// ==============================================================================

/**
 * Formats a ZodError into a clean dictionary of { field: [messages] }
 */
export function formatZodError(error: ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const pathKey = issue.path.length > 0 ? issue.path.join(".") : "_global";
    if (!formatted[pathKey]) {
      formatted[pathKey] = [];
    }
    formatted[pathKey].push(issue.message);
  }

  return formatted;
}

/**
 * Intercepts any caught error from an API handler and returns a standardized JSON response
 */
export function handleApiError(error: unknown): NextResponse<ApiErrorResponse> {
  // 1. Zod Validation Error
  if (error instanceof ZodError) {
    const details = formatZodError(error);
    return apiError(
      "VALIDATION_ERROR",
      "One or more validation constraints failed for the supplied payload.",
      422,
      details
    );
  }

  // 2. Custom Application Error
  if (error instanceof AppError) {
    return apiError(error.code, error.message, error.statusCode, error.details);
  }

  // 3. Syntax Error (e.g. Malformed JSON Body in request)
  if (error instanceof SyntaxError) {
    return apiError("MALFORMED_JSON", "The request body contains invalid JSON.", 400);
  }

  // 4. Prisma Known Request Error (e.g. Unique constraint violation P2002)
  if (typeof error === "object" && error !== null && "code" in error) {
    const prismaErr = error as { code: string; meta?: { target?: string[] } };
    if (prismaErr.code === "P2002") {
      const targets = prismaErr.meta?.target?.join(", ") || "field";
      return apiError(
        "UNIQUE_CONSTRAINT_VIOLATION",
        `A record with this ${targets} already exists.`,
        409,
        prismaErr.meta
      );
    }
    if (prismaErr.code === "P2025") {
      return apiError(
        "RECORD_NOT_FOUND",
        "The requested record was not found or has been deleted.",
        404
      );
    }
  }

  // 5. Unhandled / Internal Server Error
  console.error("[API_UNHANDLED_ERROR]:", error);
  return apiError(
    "INTERNAL_SERVER_ERROR",
    "An unexpected error occurred while processing the request.",
    500
  );
}
