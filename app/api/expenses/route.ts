import { NextRequest } from "next/server";
import {
  validateBody,
  validateQuery,
  createExpenseSchema,
  expenseQuerySchema,
} from "@/lib/validation";
import { createExpense, getExpenses } from "@/lib/services";
import { apiCreated, apiPaginated, handleApiError } from "@/lib/api";

// ==============================================================================
// EXPENSES API ROUTE (GET /api/expenses, POST /api/expenses)
// ==============================================================================
// Section 20 & 48: Strict Decimal precision, voucher uniqueness, and transaction safety.

export async function GET(req: NextRequest) {
  try {
    const query = validateQuery(req.nextUrl.searchParams, expenseQuerySchema);
    const result = await getExpenses(query);
    return apiPaginated(result.expenses, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, createExpenseSchema);
    // User placeholder: fallback to system actor until auth is activated
    const actorId = req.headers.get("x-user-id") || "system-admin";
    const expense = await createExpense(body, actorId);
    return apiCreated(expense, "Expense voucher created successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
