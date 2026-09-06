"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import {
  Receipt,
  CheckCircle,
  Fuel,
  HeartPulse,
  Wrench,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

interface ExpenseItem {
  id: string;
  voucherNumber: string;
  date: string;
  category: "FUEL" | "MAINTENANCE" | "REPAIR" | "OPERATIONS" | "SUPPLIES" | "OTHER";
  title: string;
  description: string;
  amountPKR: number;
  paidTo: string;
  status: string;
}

export default function AdminExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    voucherNumber: `EXP-2026-000${Math.floor(Math.random() * 900) + 100}`,
    title: "",
    category: "FUEL" as const,
    amountPKR: 15000,
    paidTo: "PSO Service Station",
    expenseDate: new Date().toISOString().split("T")[0],
    description: "",
    yearPeriodId: "2026",
  });

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses");
      const json = await res.json();
      if (json.success && json.data) {
        setExpenses(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleOpenCreate = () => {
    setFormData({
      voucherNumber: `EXP-2026-00${expenses.length + 1}`,
      title: "",
      category: "FUEL",
      amountPKR: 15000,
      paidTo: "",
      expenseDate: new Date().toISOString().split("T")[0],
      description: "",
      yearPeriodId: "2026",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Expense voucher ${json.data.voucherNumber} recorded successfully!`);
        fetchExpenses();
        setModalOpen(false);
      } else {
        alert(json.error?.message || "Failed to record expense");
      }
    } catch (err) {
      console.error("Expense record error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const totalDisbursed = expenses.reduce((sum, e) => sum + Number(e.amountPKR), 0);
  const fuelTotal = expenses
    .filter((e) => e.category === "FUEL")
    .reduce((sum, e) => sum + Number(e.amountPKR), 0);
  const suppliesTotal = expenses
    .filter((e) => e.category === "SUPPLIES")
    .reduce((sum, e) => sum + Number(e.amountPKR), 0);

  const filtered = expenses.filter(
    (e) =>
      e.voucherNumber.toLowerCase().includes(search.toLowerCase()) ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.paidTo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Financial Disbursements & Expense Ledger"
      pageSubtitle="Al-Khidmat transparency standard: Every rupee disbursed is verified against receipts and published in audited statements."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Expenses" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchExpenses}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenCreate}>
            <Plus className="w-4 h-4 mr-1.5" />
            Record Expense Voucher
          </Button>
        </div>
      }
    >
      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">{feedback}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <DashboardStatCard
          title="Total Operational Disbursed"
          value={`PKR ${totalDisbursed.toLocaleString()}`}
          subtitle="100% receipt verified"
          icon={<Receipt className="w-5 h-5" />}
          variant="emerald"
        />
        <DashboardStatCard
          title="Ambulance Fleet Fuel"
          value={`PKR ${fuelTotal.toLocaleString()}`}
          subtitle="Direct fuel account"
          icon={<Fuel className="w-5 h-5" />}
          variant="sky"
        />
        <DashboardStatCard
          title="Medical Consumables & Oxygen"
          value={`PKR ${suppliesTotal.toLocaleString()}`}
          subtitle="Life support equipment"
          icon={<HeartPulse className="w-5 h-5" />}
          variant="amber"
        />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search vouchers by number, title, or payee..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Voucher & Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Expense Title & Description</TableHead>
              <TableHead>Payee / Vendor</TableHead>
              <TableHead className="text-right">Amount (PKR)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  Loading expenses ledger...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No expense vouchers found. Click &quot;Record Expense Voucher&quot; to add one.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="font-semibold text-slate-900">{e.voucherNumber}</div>
                    <div className="text-xs text-slate-500">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(e.date))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={e.category === "FUEL" ? "sky" : "neutral"}>
                      {e.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{e.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{e.description}</div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-700">{e.paidTo}</TableCell>
                  <TableCell className="text-right font-semibold text-slate-900">
                    PKR {Number(e.amountPKR).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">APPROVED</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Record Expense Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Record Financial Expense Voucher"
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Voucher Number" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono font-semibold focus:ring-2 focus:ring-emerald-500"
                value={formData.voucherNumber}
                onChange={(e) =>
                  setFormData({ ...formData, voucherNumber: e.target.value })
                }
              />
            </FormField>

            <FormField label="Expense Date" required>
              <input
                type="date"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.expenseDate}
                onChange={(e) =>
                  setFormData({ ...formData, expenseDate: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Expense Title" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Ambulance Fuel Refill (50L)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </FormField>

            <FormField label="Category" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as any })
                }
              >
                <option value="FUEL">Ambulance Fuel</option>
                <option value="SUPPLIES">Medical Supplies & Oxygen</option>
                <option value="MAINTENANCE">Ambulance Maintenance</option>
                <option value="OPERATIONS">Operations & Logistics</option>
                <option value="OTHER">Other Community Outreach</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Amount (PKR)" required>
              <input
                type="number"
                required
                min={1}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                value={formData.amountPKR}
                onChange={(e) =>
                  setFormData({ ...formData, amountPKR: Number(e.target.value) })
                }
              />
            </FormField>

            <FormField label="Payee / Vendor Name" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. PSO Station Oghi"
                value={formData.paidTo}
                onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })}
              />
            </FormField>
          </div>

          <FormField label="Disbursement Purpose & Voucher Description" required>
            <textarea
              required
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="Full description matching physical bill..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Recording..." : "Record Verified Voucher"}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
