import { NextRequest } from "next/server";
import { validateBody, updateExpenseSchema } from "@/lib/validation";
import { getExpenseById, updateExpense, archiveExpense } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission("EXPENSES_READ");
    const { id } = await params;
    const expense = await getExpenseById(id);
    return apiSuccess(expense);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requirePermission("EXPENSES_WRITE");
    const { id } = await params;
    const body = await validateBody(req, updateExpenseSchema);
    const updated = await updateExpense(id, body, user.id);
    return apiSuccess(updated, "Expense voucher updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requirePermission("EXPENSES_WRITE");
    const { id } = await params;
    const archived = await archiveExpense(id, user.id);
    return apiSuccess(archived, "Expense voucher voided and archived safely.");
  } catch (error) {
    return handleApiError(error);
  }
}
