import { NextRequest, NextResponse } from "next/server";
import {
  fetchGoogleSheetExpenses,
  appendExpenseToGoogleSheet,
  GoogleSheetExpense,
} from "@/lib/google-sheets";

export async function GET(request: NextRequest) {
  try {
    const expenses = await fetchGoogleSheetExpenses();
    return NextResponse.json({ success: true, data: expenses, count: expenses.length });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load Google Sheet expenses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.expense && !body.received) {
      return NextResponse.json(
        { success: false, error: "Either Expense amount or Received amount is required" },
        { status: 400 }
      );
    }

    const expenseData: GoogleSheetExpense = {
      date: body.date ? String(body.date).trim() : new Date().toLocaleDateString("en-US"),
      name: body.name ? String(body.name).trim() : "",
      received: body.received ? String(body.received).trim() : "",
      expense: body.expense ? String(body.expense).trim() : "",
      reason: body.reason ? String(body.reason).trim() : "Other",
      jcdfReceipt: body.jcdfReceipt ? String(body.jcdfReceipt).trim() : "",
      remark: body.remark ? String(body.remark).trim() : "",
    };

    const res = await appendExpenseToGoogleSheet(expenseData);
    return NextResponse.json({
      success: true,
      message: res.message,
      data: expenseData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to record expense in Google Sheet" },
      { status: 500 }
    );
  }
}
