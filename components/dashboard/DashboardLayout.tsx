"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Receipt,
  Fuel,
  Wrench,
  FileText,
  ShieldCheck,
  FolderGit2,
  Newspaper,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Search,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Ambulance Fleet", href: "/admin/ambulances", icon: Truck },
  { label: "Trip Dispatches", href: "/admin/trips", icon: Route },
  { label: "Expenses & Audit", href: "/admin/expenses", icon: Receipt },
  { label: "Security Audit Logs", href: "/admin/audit-logs", icon: ShieldCheck },
  { label: "Projects CMS", href: "/projects", icon: FolderGit2, badge: "Public CMS" },
  { label: "News & Dispatches", href: "/news", icon: Newspaper, badge: "Public CMS" },
  { label: "Audit Reports", href: "/reports", icon: FileText, badge: "Public CMS" },
];

const DATA_ENTRY_NAV_ITEMS: NavItem[] = [
  { label: "Operational Desk", href: "/data-entry", icon: LayoutDashboard },
  { label: "Log New Trip", href: "/data-entry/trips/new", icon: Route, badge: "Action" },
  { label: "Patients Registry", href: "/data-entry#patients", icon: Users },
  { label: "Fuel Log", href: "/data-entry#fuel", icon: Fuel },
  { label: "Maintenance Log", href: "/data-entry#maintenance", icon: Wrench },
  { label: "Approved Reports", href: "/reports", icon: FileText, badge: "View" },
];

export interface DashboardLayoutProps {
  role: "ADMIN" | "DATA_ENTRY";
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function DashboardLayout({
  role,
  children,
  pageTitle,
  pageSubtitle,
  breadcrumbs = [],
  actions,
}: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = role === "ADMIN" ? ADMIN_NAV_ITEMS : DATA_ENTRY_NAV_ITEMS;

  const roleMeta = {
    ADMIN: {
      badge: "Executive Admin",
      badgeVariant: "sky" as const,
      color: "text-sky-700 bg-sky-50 border-sky-200",
      description: "Full Governance & Operations Authority",
    },
    DATA_ENTRY: {
      badge: "Field Data Operator",
      badgeVariant: "neutral" as const,
      color: "text-slate-700 bg-slate-100 border-slate-200",
      description: "Restricted Operational Logging Desk",
    },
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col antialiased">
      {/* Top Bar for Dashboards */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-700 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                J
              </div>
              <div className="hidden sm:block">
                <div className="font-extrabold text-slate-900 text-sm tracking-tight leading-tight">
                  Junglan Foundation
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {role === "ADMIN" ? "Governance & Operations" : "Field Operations Portal"}
                </div>
              </div>
            </Link>
          </div>

          {/* Center / Search placeholder (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                placeholder="Quick search records, vehicle IDs, or dispatches..."
                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Right: Role indicator & Portal switch */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            {/* Role Badge */}
            <Badge variant={roleMeta[role].badgeVariant} size="sm">
              {roleMeta[role].badge}
            </Badge>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center border border-slate-700 shadow-2xs">
              {role === "ADMIN" ? "AD" : "OP"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container: Sidebar + Page Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-22 bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 space-y-6">
            {/* Context card */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Active Environment
              </div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{roleMeta[role].badge}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 leading-snug">
                {roleMeta[role].description}
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/admin" || item.href === "/data-entry"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150",
                      isActive
                        ? "bg-sky-50 text-sky-700 font-bold border border-sky-200/80 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4",
                          isActive ? "text-sky-700" : "text-slate-400"
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Switch Role Quick Switcher for Testing/Demonstration */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Switch Role Preview
              </div>
              <div className="flex gap-2">
                <Link
                  href="/admin"
                  className={cn(
                    "flex-1 py-1.5 px-2 text-center rounded-lg text-[11px] font-bold border transition-colors",
                    role === "ADMIN"
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  Admin UI
                </Link>
                <Link
                  href="/data-entry"
                  className={cn(
                    "flex-1 py-1.5 px-2 text-center rounded-lg text-[11px] font-bold border transition-colors",
                    role === "DATA_ENTRY"
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  Data Entry UI
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      Junglan Foundation
                    </div>
                    <div className="text-xs text-slate-500">
                      {roleMeta[role].badge}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold",
                          isActive
                            ? "bg-sky-50 text-sky-700 font-bold border border-sky-200"
                            : "text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-slate-500" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-2">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  <span>Return to Public Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Header & Breadcrumb Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              {breadcrumbs.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-1.5">
                  <Link
                    href={role === "ADMIN" ? "/admin" : "/data-entry"}
                    className="hover:text-slate-600"
                  >
                    Dashboard
                  </Link>
                  {breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={idx}>
                      <ChevronRight className="w-3 h-3 text-slate-300" />
                      {crumb.href ? (
                        <Link href={crumb.href} className="hover:text-slate-600">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-slate-700 font-bold">
                          {crumb.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {pageTitle && (
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {pageTitle}
                </h1>
              )}
              {pageSubtitle && (
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {pageSubtitle}
                </p>
              )}
            </div>

            {actions && <div className="flex items-center gap-2.5">{actions}</div>}
          </div>

          {/* Page Body */}
          {children}
        </main>
      </div>
    </div>
  );
}
