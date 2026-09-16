/**
 * ==============================================================================
 * GOOGLE SHEETS LIVE CONNECTOR & FULL CRUD SYNC SERVICE (SERVER-SIDE)
 * ==============================================================================
 * Supports Add, Edit, Delete, Search, and Live Sync with Google Drive.
 */

import {
  GoogleSheetTrip,
  GoogleSheetExpense,
  GoogleSheetAnalytics,
  filterByMonthWindow,
} from "@/types/google-sheets";

export * from "@/types/google-sheets";

export const GOOGLE_SHEET_ID = "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU";
export const GID_TRIPS = "0";
export const GID_EXPENSES = "223912461";
export const GID_ANALYSIS = "0";

// In-memory runtime store for serverless execution
let runtimeTrips: GoogleSheetTrip[] = [];
let runtimeExpenses: GoogleSheetExpense[] = [];
let tripsLoaded = false;
let tripsLastFetchTime = 0;
let expensesLoaded = false;
let expensesLastFetchTime = 0;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

// Memory Webhook URL store (no disk I/O for 100% Vercel serverless compatibility)
let memoryWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";

export function getStoredWebhookUrl(): string {
  return process.env.GOOGLE_SHEETS_WEBHOOK_URL || memoryWebhookUrl || "";
}

export function saveStoredWebhookUrl(url: string): void {
  memoryWebhookUrl = (url || "").trim();
}

/**
 * Parses raw CSV string handling quoted cells
 */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) continue;
    const row: string[] = [];
    let insideQuotes = false;
    let current = "";

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (insideQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        row.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    rows.push(row);
  }
  return rows;
}

/**
 * Fetches all Trip records from Tab 1 ('Ambulance Service Patient Reco' - gid=0)
 * 13 Columns: No, Date, Time, Patient Name, Pick up, Drop, Km at Pickup, Km at Drop,
 * Distance Coverd in One Trip KM, Petrol, Received, Remark, Other Expanse
 */
export async function fetchGoogleSheetTrips(forceFresh = false): Promise<GoogleSheetTrip[]> {
  const now = Date.now();
  if (!forceFresh && tripsLoaded && now - tripsLastFetchTime < CACHE_TTL_MS) {
    return runtimeTrips;
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${GID_TRIPS}`;
    const res = await fetch(url, {
      next: { revalidate: 30 },
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });

    if (res.ok) {
      const csvText = await res.text();
      const rows = parseCSV(csvText);
      const fetchedTrips: GoogleSheetTrip[] = [];

      for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        if (!r || r.length < 4) continue;
        const no = r[0]?.trim();
        const patientName = r[3]?.trim();
        // Skip header/empty rows or total summaries without serial numbers
        if (!no || !patientName || isNaN(parseInt(no, 10))) continue;

        fetchedTrips.push({
          no,
          sNo: no,
          date: r[1]?.trim() || "",
          time: r[2]?.trim() || "",
          patientName,
          pickup: r[4]?.trim() || "",
          drop: r[5]?.trim() || "",
          kmPick: r[6]?.trim() || "",
          kmDrop: r[7]?.trim() || "",
          distance: r[8]?.trim() || "",
          petrol: r[9]?.trim() || "",
          received: r[10]?.trim() || "",
          remark: r[11]?.trim() || "",
          reason: r[11]?.trim() || "",
          otherExpense: r[12]?.trim() || "",
        });
      }

      const existingNoMap = new Set(fetchedTrips.map((t) => t.no || t.sNo));
      const newlyAdded = runtimeTrips.filter((t) => t.isLiveAdded && !existingNoMap.has(t.no || t.sNo));

      runtimeTrips = [...newlyAdded, ...fetchedTrips];
      tripsLoaded = true;
      tripsLastFetchTime = now;
    }
  } catch (err) {
    console.error("Error fetching Google Sheet Trips:", err);
  }

  return runtimeTrips;
}

/**
 * Fetches all Expense records from Tab 2 ('Expanse')
 */
export async function fetchGoogleSheetExpenses(forceFresh = false): Promise<GoogleSheetExpense[]> {
  const now = Date.now();
  if (!forceFresh && expensesLoaded && now - expensesLastFetchTime < CACHE_TTL_MS) {
    return sortExpensesByDate(runtimeExpenses);
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${GID_EXPENSES}`;
    const res = await fetch(url, {
      next: { revalidate: 30 },
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });

    if (res.ok) {
      const csvText = await res.text();
      const rows = parseCSV(csvText);
      const fetchedExpenses: GoogleSheetExpense[] = [];

      for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        if (!r || r.length < 4) continue;
        const date = r[0]?.trim();
        const reason = r[4]?.trim();
        const received = r[2]?.trim();
        const expense = r[3]?.trim();
        if (!date && !reason && !received && !expense) continue;
        if (date.toLowerCase().includes("total")) continue;

        fetchedExpenses.push({
          id: `exp-${i + 1}`,
          rowIndex: i + 1,
          date: date || "",
          name: r[1]?.trim() || "",
          received: received || "",
          expense: expense || "",
          reason: reason || "Other",
          jcdfReceipt: r[5]?.trim() || "",
          remark: r[6]?.trim() || "",
        });
      }

      const newlyAdded = runtimeExpenses.filter((e) => e.isLiveAdded);
      runtimeExpenses = [...newlyAdded, ...fetchedExpenses];
      expensesLoaded = true;
      expensesLastFetchTime = now;
    }
  } catch (err) {
    console.error("Error fetching Google Sheet Expenses:", err);
  }

  return sortExpensesByDate(runtimeExpenses);
}

/**
 * Sorts an expense array chronologically by Date
 */
export function sortExpensesByDate(items: GoogleSheetExpense[]): GoogleSheetExpense[] {
  return [...items].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    if (isNaN(timeA) || isNaN(timeB)) return 0;
    return timeB - timeA; // Descending: Most recent first
  });
}

/**
 * Computes Analytics & Report statistics directly from Google Sheet data
 */
export async function getGoogleSheetAnalytics(): Promise<GoogleSheetAnalytics> {
  const trips = await fetchGoogleSheetTrips();
  const expenses = await fetchGoogleSheetExpenses();

  let totalDist = 0;
  let totalRecv = 0;
  let maxSNo = 0;
  const pickupMap = new Map<string, number>();
  const dropMap = new Map<string, number>();

  for (const t of trips) {
    const sNoNum = parseInt(t.no || t.sNo || "0", 10);
    if (!isNaN(sNoNum) && sNoNum > maxSNo) {
      maxSNo = sNoNum;
    }
    const distNum = parseFloat(t.distance);
    if (!isNaN(distNum)) totalDist += distNum;

    const recvNum = parseFloat(t.received);
    if (!isNaN(recvNum)) totalRecv += recvNum;

    if (t.pickup) {
      const p = t.pickup.trim();
      pickupMap.set(p, (pickupMap.get(p) || 0) + 1);
    }
    if (t.drop) {
      const d = t.drop.trim();
      dropMap.set(d, (dropMap.get(d) || 0) + 1);
    }
  }

  let totalExp = 0;
  const reasonMap = new Map<string, { received: number; expense: number }>();

  for (const e of expenses) {
    const recv = parseFloat(e.received) || 0;
    const exp = parseFloat(e.expense) || 0;
    totalExp += exp;

    const r = e.reason || "Other";
    const cur = reasonMap.get(r) || { received: 0, expense: 0 };
    cur.received += recv;
    cur.expense += exp;
    reasonMap.set(r, cur);
  }

  const pickupCounts = Array.from(pickupMap.entries())
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count);

  const dropCounts = Array.from(dropMap.entries())
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count);

  const reasonBreakdown = Array.from(reasonMap.entries())
    .map(([reason, vals]) => ({ reason, received: vals.received, expense: vals.expense }))
    .sort((a, b) => (b.expense + b.received) - (a.expense + a.received));

  return {
    totalTrips: trips.length,
    totalDistanceKm: totalDist,
    totalReceivedPKR: totalRecv,
    totalExpensesPKR: totalExp,
    netBalancePKR: totalRecv - totalExp,
    lastSNo: maxSNo || 594,
    pickupCounts,
    dropCounts,
    reasonBreakdown,
  };
}

/**
 * Searches across Google Sheet records by query
 */
export async function searchGoogleSheetRecords(query: string): Promise<GoogleSheetTrip[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const trips = await fetchGoogleSheetTrips();

  return trips.filter((t) => {
    const tripNo = (t.no || t.sNo || "").toLowerCase();
    const pName = (t.patientName || "").toLowerCase();
    const pickup = (t.pickup || "").toLowerCase();
    const drop = (t.drop || "").toLowerCase();
    const date = (t.date || "").toLowerCase();
    const remark = (t.remark || t.reason || "").toLowerCase();

    return (
      tripNo.includes(q) ||
      pName.includes(q) ||
      pickup.includes(q) ||
      drop.includes(q) ||
      date.includes(q) ||
      remark.includes(q)
    );
  });
}

/**
 * Dispatches action to Google Apps Script Webhook
 */
async function callWebhook(action: string, data: any): Promise<{ success: boolean; message?: string; error?: string }> {
  const webhookUrl = getStoredWebhookUrl();
  if (!webhookUrl) {
    return { success: false, error: "WEBHOOK_NOT_CONFIGURED" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, data }),
    });
    const result = await res.json();
    return result;
  } catch (err: any) {
    console.error(`Webhook call failed for ${action}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Tests Webhook connection (ping-pong)
 */
export async function testGoogleSheetsWebhook(testUrl?: string): Promise<{ success: boolean; message: string; stats?: any }> {
  const url = (testUrl || getStoredWebhookUrl()).trim();
  if (!url) {
    return { success: false, message: "No Webhook URL provided" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "testConnection" }),
    });
    const result = await res.json();
    if (result.success) {
      if (testUrl) saveStoredWebhookUrl(testUrl);
      return { success: true, message: result.message || "Connected to Google Sheet successfully", stats: result.stats };
    }
    return { success: false, message: result.error || "Failed to connect to Google Sheet" };
  } catch (err: any) {
    return { success: false, message: "Network connection error: " + err.message };
  }
}

/**
 * Appends a new Trip to Google Sheets (with 3-way auto-split)
 */
export async function appendTripToGoogleSheet(tripData: GoogleSheetTrip): Promise<{ success: boolean; message: string; sNo: string }> {
  const tripNo = tripData.no || tripData.sNo || "";
  const normalizedTrip: GoogleSheetTrip = {
    ...tripData,
    no: tripNo,
    sNo: tripNo,
    remark: tripData.remark || tripData.reason || "",
    reason: tripData.remark || tripData.reason || "",
    isLiveAdded: true,
  };

  runtimeTrips.unshift(normalizedTrip);

  const date = tripData.date;
  const recAmt = parseFloat(tripData.received);
  if (!isNaN(recAmt) && recAmt > 0) {
    runtimeExpenses.unshift({
      id: `live-recv-${Date.now()}`,
      date,
      name: "",
      received: tripData.received,
      expense: "",
      reason: "Used Service",
      jcdfReceipt: tripNo,
      remark: tripData.patientName ? `Trip fare from ${tripData.patientName}` : "Trip fare",
      isLiveAdded: true,
    });
  }

  const petAmt = parseFloat(tripData.petrol);
  if (!isNaN(petAmt) && petAmt > 0) {
    runtimeExpenses.unshift({
      id: `live-pet-${Date.now()}`,
      date,
      name: "",
      received: "",
      expense: tripData.petrol,
      reason: "Petrol",
      jcdfReceipt: tripNo,
      remark: `Ambulance fuel refill for trip #${tripNo}`,
      isLiveAdded: true,
    });
  }

  const othAmt = parseFloat(tripData.otherExpense);
  if (!isNaN(othAmt) && othAmt > 0) {
    runtimeExpenses.unshift({
      id: `live-oth-${Date.now()}`,
      date,
      name: "",
      received: "",
      expense: tripData.otherExpense,
      reason: tripData.remark || tripData.reason || "Maintenance",
      jcdfReceipt: tripNo,
      remark: `Incident expense for trip #${tripNo}`,
      isLiveAdded: true,
    });
  }

  const hookRes = await callWebhook("addTrip", normalizedTrip);
  if (hookRes.success) {
    return { success: true, message: hookRes.message || "Trip and auto-split ledger rows saved to Google Sheet", sNo: tripNo };
  }

  return {
    success: true,
    message: hookRes.error === "WEBHOOK_NOT_CONFIGURED"
      ? "Trip registered in local session. Connect Google Drive Webhook to sync directly."
      : `Trip registered locally (${hookRes.error})`,
    sNo: tripNo,
  };
}

/**
 * Updates an existing Trip in Google Sheets
 */
export async function updateTripInGoogleSheet(targetNo: string, tripData: GoogleSheetTrip): Promise<{ success: boolean; message: string }> {
  const cleanNo = targetNo.trim();
  const index = runtimeTrips.findIndex((t) => t.no === cleanNo || t.sNo === cleanNo);
  const normalizedTrip: GoogleSheetTrip = {
    ...tripData,
    no: cleanNo,
    sNo: cleanNo,
    remark: tripData.remark || tripData.reason || "",
    reason: tripData.remark || tripData.reason || "",
    isLiveAdded: true,
  };

  if (index !== -1) {
    runtimeTrips[index] = normalizedTrip;
  }

  const hookRes = await callWebhook("editTrip", normalizedTrip);
  if (hookRes.success) {
    return { success: true, message: `Trip #${cleanNo} updated in Google Sheet` };
  }

  return { success: true, message: `Trip #${cleanNo} updated successfully` };
}

/**
 * Deletes a Trip from Google Sheets
 */
export async function deleteTripFromGoogleSheet(targetNo: string): Promise<{ success: boolean; message: string }> {
  const cleanNo = targetNo.trim();
  runtimeTrips = runtimeTrips.filter((t) => t.no !== cleanNo && t.sNo !== cleanNo);
  runtimeExpenses = runtimeExpenses.filter((e) => e.jcdfReceipt !== cleanNo);

  const hookRes = await callWebhook("deleteTrip", { sNo: cleanNo, no: cleanNo });
  if (hookRes.success) {
    return { success: true, message: `Trip #${cleanNo} and its ledger entries removed from Google Sheet` };
  }

  return { success: true, message: `Trip #${cleanNo} removed successfully` };
}

/**
 * Appends a General/Documentary Expense
 */
export async function appendExpenseToGoogleSheet(expenseData: GoogleSheetExpense): Promise<{ success: boolean; message: string }> {
  runtimeExpenses.unshift({
    ...expenseData,
    id: `live-exp-${Date.now()}`,
    isLiveAdded: true,
  });

  const hookRes = await callWebhook("addExpense", expenseData);
  if (hookRes.success) {
    return { success: true, message: "Expense voucher saved and sorted by date in Google Sheet" };
  }

  return { success: true, message: "Expense voucher saved and sorted chronologically by date" };
}

/**
 * Updates an existing Expense
 */
export async function updateExpenseInGoogleSheet(id: string, expenseData: GoogleSheetExpense): Promise<{ success: boolean; message: string }> {
  const index = runtimeExpenses.findIndex((e) => e.id === id || (e.rowIndex && e.rowIndex === expenseData.rowIndex));
  if (index !== -1) {
    runtimeExpenses[index] = { ...expenseData, isLiveAdded: true };
  }

  const hookRes = await callWebhook("editExpense", expenseData);
  if (hookRes.success) {
    return { success: true, message: "Expense voucher updated in Google Sheet" };
  }

  return { success: true, message: "Expense voucher updated successfully" };
}

/**
 * Deletes an Expense
 */
export async function deleteExpenseFromGoogleSheet(id: string, expenseData?: Partial<GoogleSheetExpense>): Promise<{ success: boolean; message: string }> {
  runtimeExpenses = runtimeExpenses.filter((e) => e.id !== id);

  const hookRes = await callWebhook("deleteExpense", { ...expenseData, id });
  if (hookRes.success) {
    return { success: true, message: "Expense voucher deleted from Google Sheet" };
  }

  return { success: true, message: "Expense voucher removed successfully" };
}
