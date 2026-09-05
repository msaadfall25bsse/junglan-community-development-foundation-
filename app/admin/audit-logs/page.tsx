"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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
import { Lock } from "lucide-react";

interface AuditLogRecord {
  id: string;
  timestamp: string;
  actorRole: "ADMIN" | "DATA_ENTRY" | "SYSTEM";
  actorEmail: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: "SUCCESS" | "FLAGGED";
}

const AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: "log-1",
    timestamp: "05 Sep 2026, 14:15 PKT",
    actorRole: "DATA_ENTRY",
    actorEmail: "operator.junglan@foundation.local",
    action: "DISPATCH_TRIP_RECORDED",
    resource: "Trip TRIP-2026-0042",
    ipAddress: "192.168.10.45 (Local Subnet)",
    status: "SUCCESS",
  },
  {
    id: "log-2",
    timestamp: "05 Sep 2026, 11:20 PKT",
    actorRole: "ADMIN",
    actorEmail: "trustee.admin@junglanfoundation.org",
    action: "EXPENSE_VOUCHER_VERIFIED",
    resource: "Voucher VCH-2026-0091 (PSO Diesel)",
    ipAddress: "10.0.4.12 (Admin Network)",
    status: "SUCCESS",
  },
  {
    id: "log-3",
    timestamp: "04 Sep 2026, 18:40 PKT",
    actorRole: "DATA_ENTRY",
    actorEmail: "operator.junglan@foundation.local",
    action: "FUEL_LOG_INSERTED",
    resource: "Vehicle AMB-01 (60 Liters)",
    ipAddress: "192.168.10.45 (Local Subnet)",
    status: "SUCCESS",
  },
  {
    id: "log-4",
    timestamp: "04 Sep 2026, 09:10 PKT",
    actorRole: "ADMIN",
    actorEmail: "trustee.admin@junglanfoundation.org",
    action: "ANNUAL_AUDIT_REPORT_PUBLISHED",
    resource: "Public Report /reports/2026-q2",
    ipAddress: "10.0.4.12 (Admin Network)",
    status: "SUCCESS",
  },
  {
    id: "log-5",
    timestamp: "03 Sep 2026, 16:05 PKT",
    actorRole: "SYSTEM",
    actorEmail: "auth-guard.internal@junglan.local",
    action: "RBAC_CHECK_ENFORCED",
    resource: "Private Route Protected Boundary",
    ipAddress: "127.0.0.1",
    status: "SUCCESS",
  },
];

export default function AdminAuditLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const roleBadges = {
    ADMIN: "sky" as const,
    DATA_ENTRY: "neutral" as const,
    SYSTEM: "success" as const,
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Security & System Audit Trail"
      pageSubtitle="Immutable record of administrative actions, data entries, and system events for institutional governance."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Audit Logs" },
      ]}
    >
      {/* Informational banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2.5">
          <Lock className="w-5 h-5 text-sky-400 shrink-0" />
          <span>
            <strong>Immutable Governance Ledger:</strong> All administrative modifications, voucher approvals, and vehicle assignments are logged with cryptographic timestamps.
          </span>
        </div>
        <Badge variant="sky" size="sm">
          Strict Compliance
        </Badge>
      </div>

      {/* Audit Log Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor & Role</TableHead>
              <TableHead>Action Event</TableHead>
              <TableHead>Resource Affected</TableHead>
              <TableHead>Network IP</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AUDIT_LOGS.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <span className="text-xs text-slate-600 font-mono">
                    {log.timestamp}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div className="font-semibold text-slate-900">{log.actorEmail}</div>
                    <Badge variant={roleBadges[log.actorRole]} size="sm" className="mt-0.5">
                      {log.actorRole}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono font-bold text-xs text-sky-800">
                    {log.action}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-slate-700 font-medium">
                    {log.resource}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-mono text-slate-500">
                    {log.ipAddress}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          currentPage={currentPage}
          totalPages={1}
          totalItems={AUDIT_LOGS.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </TableContainer>
    </DashboardLayout>
  );
}
