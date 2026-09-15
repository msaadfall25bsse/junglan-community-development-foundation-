/**
 * ==============================================================================
 * GOOGLE SHEETS CLIENT-SAFE TYPES & HELPER FUNCTIONS
 * ==============================================================================
 * Safe to import in both Client ("use client") and Server components.
 */

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
  rowIndex?: number;
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

/**
 * Filters records to show only the last 30 days (1 Month) by default
 */
export function filterByMonthWindow<T extends { date: string }>(
  items: T[],
  filterMode: "CURRENT_MONTH" | "LAST_MONTH" | "ALL" = "CURRENT_MONTH"
): T[] {
  if (filterMode === "ALL") return items;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  return items.filter((item) => {
    if (!item.date) return true;
    const d = new Date(item.date);
    if (isNaN(d.getTime())) return true;

    if (filterMode === "CURRENT_MONTH") {
      // Within last 35 days or same month
      const diffDays = (now.getTime() - d.getTime()) / (1000 * 3600 * 24);
      return diffDays <= 35 && diffDays >= -2;
    } else if (filterMode === "LAST_MONTH") {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const targetYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return d.getMonth() === prevMonth && d.getFullYear() === targetYear;
    }
    return true;
  });
}
