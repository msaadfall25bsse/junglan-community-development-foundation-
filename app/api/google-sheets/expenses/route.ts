import { NextRequest, NextResponse } from "next/server";
import {
  fetchGoogleSheetExpenses,
  appendExpenseToGoogleSheet,
  updateExpenseInGoogleSheet,
  deleteExpenseFromGoogleSheet,
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id || `exp-${body.rowIndex || Date.now()}`;

    const expenseData: GoogleSheetExpense = {
      id,
      rowIndex: body.rowIndex,
      date: body.date ? String(body.date).trim() : "",
      name: body.name ? String(body.name).trim() : "",
      received: body.received ? String(body.received).trim() : "",
      expense: body.expense ? String(body.expense).trim() : "",
      reason: body.reason ? String(body.reason).trim() : "Other",
      jcdfReceipt: body.jcdfReceipt ? String(body.jcdfReceipt).trim() : "",
      remark: body.remark ? String(body.remark).trim() : "",
    };

    const res = await updateExpenseInGoogleSheet(id, expenseData);
    return NextResponse.json({
      success: true,
      message: res.message,
      data: expenseData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update expense in Google Sheet" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const date = searchParams.get("date");
    const reason = searchParams.get("reason");

    if (!id && (!date || !reason)) {
      return NextResponse.json(
        { success: false, error: "ID or Date & Reason is required to delete an expense" },
        { status: 400 }
      );
    }

    const res = await deleteExpenseFromGoogleSheet(id || "", {
      date: date || undefined,
      reason: reason || undefined,
    });

    return NextResponse.json({
      success: true,
      message: res.message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete expense from Google Sheet" },
      { status: 500 }
    );
  }
}
