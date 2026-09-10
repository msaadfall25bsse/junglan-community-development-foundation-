import { NextRequest } from "next/server";
import {
  validateBody,
  validateQuery,
  createExpenseSchema,
  expenseQuerySchema,
} from "@/lib/validation";
import { createExpense, getExpenses } from "@/lib/services";
import { apiCreated, apiPaginated, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

// ==============================================================================
// EXPENSES API ROUTE (GET /api/expenses, POST /api/expenses)
// ==============================================================================
// Section 20, 48, 69: Private financial operational data.

export async function GET(req: NextRequest) {
  try {
    await requirePermission("EXPENSES_READ");
    const query = validateQuery(req.nextUrl.searchParams, expenseQuerySchema);
    const result = await getExpenses(query);
    return apiPaginated(result.expenses, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requirePermission("EXPENSES_WRITE");
    const body = await validateBody(req, createExpenseSchema);
    const actorId = user.id;
    const expense = await createExpense(body, actorId);
    return apiCreated(expense, "Expense voucher created successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
