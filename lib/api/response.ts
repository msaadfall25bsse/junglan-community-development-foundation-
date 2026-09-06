import { NextResponse } from "next/server";

// ==============================================================================
// STANDARDIZED API RESPONSE ENVELOPES & INTERFACES
// ==============================================================================
// Adheres strictly to Section 60 & 61 of the Foundation Backend Specifications.

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]> | unknown;
    timestamp: string;
    path?: string;
  };
}

// ==============================================================================
// RESPONSE CONSTRUCTORS
// ==============================================================================

/**
 * Creates a standardized 200 OK JSON response
 */
export function apiSuccess<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message ? { message } : {}),
    },
    { status }
  );
}

/**
 * Creates a standardized 201 Created JSON response
 */
export function apiCreated<T>(
  data: T,
  message: string = "Resource created successfully"
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: 201 }
  );
}

/**
 * Creates a standardized Paginated List JSON response
 */
export function apiPaginated<T>(
  data: T[],
  pagination: PaginationMeta,
  message?: string
): NextResponse<ApiResponse<T[]>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: pagination,
      ...(message ? { message } : {}),
    },
    { status: 200 }
  );
}

/**
 * Creates a standardized Error JSON response
 */
export function apiError(
  code: string,
  message: string,
  status: number = 400,
  details?: Record<string, string[]> | unknown
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}
