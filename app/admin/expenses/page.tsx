"use client";

import React, { useState } from "react";
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
  TablePagination,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Receipt,
  Download,
  ShieldCheck,
  CheckCircle2,
  Fuel,
  Sprout,
  HeartPulse,
} from "lucide-react";

interface ExpenseRecord {
  id: string;
  voucherNo: string;
  date: string;
  category: "Ambulance Fuel" | "Medical Supplies" | "Olive Saplings" | "Vehicle Maintenance";
  description: string;
  amount: number;
  paymentMode: "Official Cheque" | "Bank Transfer" | "Direct Fuel Account";
  verifiedBy: string;
}

const EXPENSES_LEDGER: ExpenseRecord[] = [
  {
    id: "exp-1",
    voucherNo: "VCH-2026-0091",
    date: "03 Sep 2026",
    category: "Ambulance Fuel",
    description: "Diesel refuel (120 Liters) for AMB-01 & AMB-02 via PSO Station",
    amount: 33600,
    paymentMode: "Direct Fuel Account",
    verifiedBy: "Accounts Trustee",
  },
  {
    id: "exp-2",
    voucherNo: "VCH-2026-0090",
    date: "01 Sep 2026",
    category: "Medical Supplies",
    description: "Medical oxygen cylinder refills (2 Units) & first-aid consumables",
    amount: 14500,
    paymentMode: "Bank Transfer",
    verifiedBy: "Medical Officer",
  },
  {
    id: "exp-3",
    voucherNo: "VCH-2026-0089",
    date: "28 Aug 2026",
    category: "Olive Saplings",
    description: "Advance procurement for 1,000 certified Coratina & Arbequina saplings",
    amount: 175000,
    paymentMode: "Official Cheque",
    verifiedBy: "Agricultural Director",
  },
  {
    id: "exp-4",
    voucherNo: "VCH-2026-0088",
    date: "22 Aug 2026",
    category: "Vehicle Maintenance",
    description: "Toyota Hilux 4x4 scheduled oil filter, brake shoe & tire pressure service",
    amount: 18200,
    paymentMode: "Bank Transfer",
    verifiedBy: "Fleet Supervisor",
  },
];

export default function AdminExpensesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const categoryIcons = {
    "Ambulance Fuel": Fuel,
    "Medical Supplies": HeartPulse,
    "Olive Saplings": Sprout,
    "Vehicle Maintenance": Receipt,
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Financial Disbursements & Audit Ledger"
      pageSubtitle="Al-Khidmat transparency standard: Every rupee disbursed is verified against receipts and published in audited statements."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Expenses & Audit" },
      ]}
      actions={
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert("Audit Statement PDF download configured for Part 3.")}
        >
          Download Audit Statement
        </Button>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <DashboardStatCard
          title="Total Monthly Disbursements"
          value="PKR 241,300"
          subtitle="Direct program expenses"
          variant="sky"
          icon={<Receipt className="w-5 h-5" />}
        />
        <DashboardStatCard
          title="Verified Audit Status"
          value="100% Reconciled"
          subtitle="All vouchers backed by invoices"
          variant="emerald"
          icon={<ShieldCheck className="w-5 h-5" />}
        />
        <DashboardStatCard
          title="Administrative Overhead"
          value="0.0%"
          subtitle="Trustee-supported volunteer management"
          variant="amber"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      {/* Expenses Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Verified Expenditure Ledger
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            4 Reconciled Entries
          </span>
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voucher No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Expenditure Description</TableHead>
                <TableHead>Amount (PKR)</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Audit Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {EXPENSES_LEDGER.map((exp) => {
                const Icon = categoryIcons[exp.category];
                return (
                  <TableRow key={exp.id}>
                    <TableCell>
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        {exp.voucherNo}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-600">{exp.date}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                        <Icon className="w-3.5 h-3.5 text-sky-600" />
                        <span>{exp.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-slate-700 max-w-sm">
                        {exp.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-900 text-xs">
                        PKR {exp.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-600">
                        {exp.paymentMode}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" size="sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {exp.verifiedBy}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            currentPage={currentPage}
            totalPages={1}
            totalItems={EXPENSES_LEDGER.length}
            itemsPerPage={10}
            onPageChange={setCurrentPage}
          />
        </TableContainer>
      </div>
    </DashboardLayout>
  );
}
