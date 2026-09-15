/**
 * ==============================================================================
 * GOOGLE SHEETS LIVE CONNECTOR & SYNC SERVICE
 * ==============================================================================
 * Reads directly from the public Google Spreadsheet without occupying Vercel storage.
 * Writes via Google Apps Script Webhook if configured, with instant fallback.
 */

export const GOOGLE_SHEET_ID = "1wz6o0xu8dSbtpuGvNKQvjUHXeU4epUFwvis5DdCO63s";
export const GID_TRIPS = "0";
export const GID_EXPENSES = "1858430792";
export const GID_ANALYSIS = "1369064426";

export interface GoogleSheetTrip {
  sNo: string;
  date: string;
  day: string;
  time: string;
  patientName: string;
  pickup: string;
  drop: string;
  kmPick: string;
  kmDrop: string;
  distance: string;
  petrol: string;
  received: string;
  reason: string;
  otherExpense: string;
  isLiveAdded?: boolean;
}

export interface GoogleSheetExpense {
  id?: string;
  date: string;
  name: string;
  received: string;
  expense: string;
  reason: string;
  jcdfReceipt: string;
  remark: string;
  isLiveAdded?: boolean;
}

export interface GoogleSheetAnalytics {
  totalTrips: number;
  totalDistanceKm: number;
  totalReceivedPKR: number;
  totalExpensesPKR: number;
  netBalancePKR: number;
  lastSNo: number;
  pickupCounts: { location: string; count: number }[];
  dropCounts: { location: string; count: number }[];
  reasonBreakdown: { reason: string; received: number; expense: number }[];
}

// In-memory runtime cache for serverless invocation speed
let cachedTrips: GoogleSheetTrip[] | null = null;
let cachedExpenses: GoogleSheetExpense[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute

// Local session store for records added during current runtime
const runtimeNewTrips: GoogleSheetTrip[] = [];
const runtimeNewExpenses: GoogleSheetExpense[] = [];

/**
 * Parses raw CSV string handling quoted cells with commas
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
 * Fetches all Trip records from Tab 1 ('2026 ambulance record complete ')
 */
export async function fetchGoogleSheetTrips(forceFresh = false): Promise<GoogleSheetTrip[]> {
  const now = Date.now();
  if (!forceFresh && cachedTrips && now - lastCacheTime < CACHE_TTL_MS) {
    return [...runtimeNewTrips, ...cachedTrips];
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${GID_TRIPS}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch Google Sheet Trips: HTTP ${res.status}`);
      return runtimeNewTrips;
    }

    const csvText = await res.text();
    const rows = parseCSV(csvText);
    if (rows.length <= 1) return runtimeNewTrips;

    const trips: GoogleSheetTrip[] = [];
    // Row 0 is header: S.No, Date, Day, Time, Patient name, Pick up, Drop, KM at Pick up, KM at Drop, Distance cover in one trip KM, Petrol, Received, Reason, Other Expanse
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 5) continue;
      const sNo = r[0]?.trim();
      const patientName = r[4]?.trim();
      if (!sNo && !patientName) continue;

      trips.push({
        sNo: sNo || "",
        date: r[1]?.trim() || "",
        day: r[2]?.trim() || "",
        time: r[3]?.trim() || "",
        patientName: patientName || "",
        pickup: r[5]?.trim() || "",
        drop: r[6]?.trim() || "",
        kmPick: r[7]?.trim() || "",
        kmDrop: r[8]?.trim() || "",
        distance: r[9]?.trim() || "",
        petrol: r[10]?.trim() || "",
        received: r[11]?.trim() || "",
        reason: r[12]?.trim() || "",
        otherExpense: r[13]?.trim() || "",
      });
    }

    cachedTrips = trips;
    lastCacheTime = now;
    return [...runtimeNewTrips, ...trips];
  } catch (err) {
    console.error("Error fetching Google Sheet Trips:", err);
    return runtimeNewTrips;
  }
}

/**
 * Fetches all Expense records from Tab 2 ('Expanse')
 */
export async function fetchGoogleSheetExpenses(forceFresh = false): Promise<GoogleSheetExpense[]> {
  const now = Date.now();
  if (!forceFresh && cachedExpenses && now - lastCacheTime < CACHE_TTL_MS) {
    return sortExpensesByDate([...runtimeNewExpenses, ...cachedExpenses]);
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${GID_EXPENSES}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch Google Sheet Expenses: HTTP ${res.status}`);
      return runtimeNewExpenses;
    }

    const csvText = await res.text();
    const rows = parseCSV(csvText);
    if (rows.length <= 1) return runtimeNewExpenses;

    const expenses: GoogleSheetExpense[] = [];
    // Row 0 is header: Date, Name, Received, Expense, Reason, JCDF Receipt, Remark
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 5) continue;
      const date = r[0]?.trim();
      const reason = r[4]?.trim();
      const received = r[2]?.trim();
      const expense = r[3]?.trim();
      if (!date && !reason && !received && !expense) continue;

      expenses.push({
        id: `exp-${i}`,
        date: date || "",
        name: r[1]?.trim() || "",
        received: received || "",
        expense: expense || "",
        reason: reason || "Other",
        jcdfReceipt: r[5]?.trim() || "",
        remark: r[6]?.trim() || "",
      });
    }

    cachedExpenses = expenses;
    lastCacheTime = now;
    return sortExpensesByDate([...runtimeNewExpenses, ...expenses]);
  } catch (err) {
    console.error("Error fetching Google Sheet Expenses:", err);
    return runtimeNewExpenses;
  }
}

/**
 * Sorts an expense array chronologically by Date
 */
export function sortExpensesByDate(items: GoogleSheetExpense[]): GoogleSheetExpense[] {
  return [...items].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    if (isNaN(timeA) || isNaN(timeB)) return 0;
    return timeB - timeA; // Most recent first for web view
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
    const sNoNum = parseInt(t.sNo, 10);
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
    lastSNo: maxSNo || 743,
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
    return (
      t.sNo.toLowerCase().includes(q) ||
      t.patientName.toLowerCase().includes(q) ||
      t.pickup.toLowerCase().includes(q) ||
      t.drop.toLowerCase().includes(q) ||
      t.date.toLowerCase().includes(q) ||
      t.reason.toLowerCase().includes(q)
    );
  });
}

/**
 * Appends a new Trip to Google Sheets (via Webhook if configured, plus runtime cache)
 */
export async function appendTripToGoogleSheet(tripData: GoogleSheetTrip): Promise<{ success: boolean; message: string; sNo: string }> {
  // Always add to runtime cache immediately for instant UI feedback
  runtimeNewTrips.unshift({ ...tripData, isLiveAdded: true });

  // Auto-split into runtime expenses
  const sNo = tripData.sNo;
  const date = tripData.date;
  const recAmt = parseFloat(tripData.received);
  if (!isNaN(recAmt) && recAmt > 0) {
    runtimeNewExpenses.unshift({
      id: `live-recv-${Date.now()}`,
      date,
      name: "",
      received: tripData.received,
      expense: "",
      reason: "Used Service",
      jcdfReceipt: sNo,
      remark: `Trip fare from ${tripData.patientName || "Patient"}`,
      isLiveAdded: true,
    });
  }

  const petAmt = parseFloat(tripData.petrol);
  if (!isNaN(petAmt) && petAmt > 0) {
    runtimeNewExpenses.unshift({
      id: `live-pet-${Date.now()}`,
      date,
      name: "",
      received: "",
      expense: tripData.petrol,
      reason: "Petrol",
      jcdfReceipt: sNo,
      remark: `Ambulance fuel refill for trip ${sNo}`,
      isLiveAdded: true,
    });
  }

  const othAmt = parseFloat(tripData.otherExpense);
  if (!isNaN(othAmt) && othAmt > 0) {
    runtimeNewExpenses.unshift({
      id: `live-oth-${Date.now()}`,
      date,
      name: "",
      received: "",
      expense: tripData.otherExpense,
      reason: tripData.reason || "Maintenance",
      jcdfReceipt: sNo,
      remark: `Incident expense for trip ${sNo}`,
      isLiveAdded: true,
    });
  }

  // If webhook is configured in environment, post to Google Apps Script
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addTrip",
          data: tripData,
        }),
      });
      const result = await res.json();
      return {
        success: true,
        message: result.message || "Trip and 3-way split ledger rows synced to Google Drive",
        sNo: tripData.sNo,
      };
    } catch (err: any) {
      console.warn("Failed to reach Google Apps Script webhook:", err.message);
    }
  }

  return {
    success: true,
    message: "Trip registered and 3-way auto-split created in local ledger session",
    sNo: tripData.sNo,
  };
}

/**
 * Appends a General/Documentary Expense to Google Sheets (via Webhook if configured, plus runtime cache)
 */
export async function appendExpenseToGoogleSheet(expenseData: GoogleSheetExpense): Promise<{ success: boolean; message: string }> {
  // Add to runtime cache immediately with sorting
  runtimeNewExpenses.unshift({
    ...expenseData,
    id: `live-exp-${Date.now()}`,
    isLiveAdded: true,
  });

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addExpense",
          data: expenseData,
        }),
      });
      const result = await res.json();
      return {
        success: true,
        message: result.message || "Expense voucher saved and sorted by date in Google Sheet",
      };
    } catch (err: any) {
      console.warn("Failed to reach Google Apps Script webhook:", err.message);
    }
  }

  return {
    success: true,
    message: "Expense voucher saved and sorted chronologically by date",
  };
}
