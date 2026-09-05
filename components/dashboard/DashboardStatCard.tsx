import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface DashboardStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  variant?: "default" | "sky" | "emerald" | "amber" | "red";
  className?: string;
}

export function DashboardStatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
  className,
}: DashboardStatCardProps) {
  const iconVariants = {
    default: "bg-slate-100 text-slate-700",
    sky: "bg-sky-50 text-sky-700 border border-sky-200/60",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    amber: "bg-amber-50 text-amber-700 border border-amber-200/60",
    red: "bg-red-50 text-red-700 border border-red-200/60",
  };

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={cn("p-2.5 rounded-xl shrink-0", iconVariants[variant])}>
          {icon}
        </div>
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          {value}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 gap-2 flex-wrap">
          {subtitle && <span>{subtitle}</span>}
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-semibold text-[11px] px-1.5 py-0.5 rounded",
                trend.isPositive
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-amber-700 bg-amber-50"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{trend.value}</span>
              {trend.label && (
                <span className="font-normal text-slate-400">
                  {trend.label}
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
