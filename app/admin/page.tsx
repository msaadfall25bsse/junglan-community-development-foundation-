"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import {
  Truck,
  Route,
  Receipt,
  Users,
  Plus,
  FolderGit2,
  Newspaper,
  FileText,
  Settings,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface OverviewStats {
  totalTrips: number;
  activeFleet: number;
  totalExpensesPKR: number;
  patientsServed: number;
  recentTrips: Array<{
    id: string;
    tripIdentifier: string;
    date: string;
    patientName: string;
    pickupLocation: string;
    dropoffHospital: string;
    ambulanceId: string;
    driverName: string;
    urgencyLevel: string;
    status: string;
  }>;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<OverviewStats>({
    totalTrips: 2,
    activeFleet: 2,
    totalExpensesPKR: 42500,
    patientsServed: 420,
    recentTrips: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [tripsRes, expensesRes, ambRes, settingsRes] = await Promise.all([
        fetch("/api/trips"),
        fetch("/api/expenses"),
        fetch("/api/ambulances"),
        fetch("/api/settings"),
      ]);

      const [tripsJson, expJson, ambJson, setJson] = await Promise.all([
        tripsRes.json(),
        expensesRes.json(),
        ambRes.json(),
        settingsRes.json(),
      ]);

      const trips = tripsJson.success && tripsJson.data ? tripsJson.data : [];
      const expenses = expJson.success && expJson.data ? expJson.data : [];
      const ambulances = ambJson.success && ambJson.data ? ambJson.data : [];
      const settings = setJson.success && setJson.data ? setJson.data : null;

      const totalExp = expenses.reduce((s: number, e: any) => s + Number(e.amountPKR || 0), 0);

      setStats({
        totalTrips: trips.length,
        activeFleet: ambulances.filter((a: any) => a.status === "AVAILABLE" || a.status === "ON_TRIP").length,
        totalExpensesPKR: totalExp,
        patientsServed: settings ? settings.patientsServed : 420,
        recentTrips: trips.slice(0, 5),
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Executive Governance Dashboard"
      pageSubtitle="Comprehensive administrative control over community projects, 24/7 mountain ambulance dispatches, financial vouchers, news CMS, and transparency audits."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Overview" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchDashboardData}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Link href="/admin/trips">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1.5" />
              Dispatch Ambulance
            </Button>
          </Link>
        </div>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <DashboardStatCard
          title="Emergency Missions Run"
          value={stats.totalTrips.toString()}
          subtitle="100% free service"
          icon={<Route className="w-5 h-5" />}
          variant="emerald"
        />
        <DashboardStatCard
          title="Active Ambulance Fleet"
          value={`${stats.activeFleet} Units`}
          subtitle="4x4 oxygen equipped"
          icon={<Truck className="w-5 h-5" />}
          variant="sky"
        />
        <DashboardStatCard
          title="Verified Operational Expenses"
          value={`PKR ${stats.totalExpensesPKR.toLocaleString()}`}
          subtitle="100% voucher audited"
          icon={<Receipt className="w-5 h-5" />}
          variant="amber"
        />
        <DashboardStatCard
          title="Patients Transported"
          value={`${stats.patientsServed}+`}
          subtitle="Across mountain valley"
          icon={<Users className="w-5 h-5" />}
          variant="emerald"
        />
      </div>

      {/* Website Control Hub Grid */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span>Website Management & Content Desks</span>
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            Direct Public Control
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/projects"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group block"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Manage Projects</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Add initiatives, edit descriptions, adjust funding targets & status.
            </p>
          </Link>

          <Link
            href="/admin/news"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all group block"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Newspaper className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>News & Stories</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Publish community milestones, field dispatches, and official releases.
            </p>
          </Link>

          <Link
            href="/admin/reports"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group block"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Transparency Reports</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Upload financial audits, fleet mileage reviews, and impact evaluations.
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all group block"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Settings className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Foundation Settings</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Update 24/7 emergency hotline, official donation bank accounts & stats.
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Dispatches Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Ambulance Dispatches</h3>
            <p className="text-xs text-slate-500">Live operational mountain transfers</p>
          </div>
          <Link href="/admin/trips">
            <Button variant="outline" size="sm">
              View All Dispatches
            </Button>
          </Link>
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mission Code</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Transit Route</TableHead>
                <TableHead>Driver & Unit</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Loading dispatches...
                  </TableCell>
                </TableRow>
              ) : stats.recentTrips.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No recent dispatches logged.
                  </TableCell>
                </TableRow>
              ) : (
                stats.recentTrips.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{t.tripIdentifier}</div>
                      <div className="text-xs text-slate-500">
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(t.date))}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-800">{t.patientName}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-900">{t.pickupLocation}</div>
                      <div className="text-xs text-slate-500">→ {t.dropoffHospital}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-800">{t.driverName}</div>
                      <div className="text-xs text-slate-500">{t.ambulanceId}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          t.urgencyLevel === "CRITICAL"
                            ? "danger"
                            : t.urgencyLevel === "URGENT"
                            ? "warning"
                            : "neutral"
                        }
                      >
                        {t.urgencyLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={t.status === "COMPLETED" ? "success" : "warning"}>
                        {t.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DashboardLayout>
  );
}
