import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  sublabel?: string;
  icon?: React.ReactNode;
  trend?: { direction: "up" | "down" | "flat"; label: string };
  variant?: "default" | "sky" | "emerald" | "amber" | "red" | "indigo";
  className?: string;
}

const variantMap = {
  default: {
    bg: "bg-white",
    iconBg: "bg-sky-50",
    iconText: "text-sky-700",
    valueTxt: "text-slate-900",
    trendUp: "text-emerald-600",
    trendDown: "text-red-600",
  },
  sky: {
    bg: "bg-sky-600",
    iconBg: "bg-white/15",
    iconText: "text-white",
    valueTxt: "text-white",
    trendUp: "text-sky-200",
    trendDown: "text-red-300",
  },
  emerald: {
    bg: "bg-emerald-600",
    iconBg: "bg-white/15",
    iconText: "text-white",
    valueTxt: "text-white",
    trendUp: "text-emerald-100",
    trendDown: "text-red-300",
  },
  amber: {
    bg: "bg-amber-500",
    iconBg: "bg-white/15",
    iconText: "text-white",
    valueTxt: "text-white",
    trendUp: "text-amber-100",
    trendDown: "text-red-200",
  },
  red: {
    bg: "bg-red-600",
    iconBg: "bg-white/15",
    iconText: "text-white",
    valueTxt: "text-white",
    trendUp: "text-red-100",
    trendDown: "text-red-200",
  },
  indigo: {
    bg: "bg-indigo-600",
    iconBg: "bg-white/15",
    iconText: "text-white",
    valueTxt: "text-white",
    trendUp: "text-indigo-100",
    trendDown: "text-red-300",
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix,
  sublabel,
  icon,
  trend,
  variant = "default",
  className = "",
}) => {
  const v = variantMap[variant];
  const isColored = variant !== "default";

  return (
    <div
      className={[
        "rounded-2xl p-5 border flex flex-col justify-between min-h-[130px] shadow-sm",
        isColored ? v.bg + " border-transparent" : "bg-white border-slate-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <p className={["text-sm font-semibold", isColored ? "text-white/80" : "text-slate-600"].join(" ")}>
          {label}
        </p>
        {icon && (
          <div className={["w-9 h-9 rounded-xl flex items-center justify-center shrink-0", v.iconBg, v.iconText].join(" ")}>
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className={["text-3xl font-extrabold tracking-tight", v.valueTxt].join(" ")}>
          {value}
          {suffix && (
            <span className={["text-xl font-bold ml-0.5", isColored ? "text-white/70" : "text-sky-600"].join(" ")}>
              {suffix}
            </span>
          )}
        </div>
        {sublabel && (
          <p className={["text-xs mt-1", isColored ? "text-white/60" : "text-slate-500"].join(" ")}>
            {sublabel}
          </p>
        )}
        {trend && (
          <div className={["flex items-center gap-1 mt-2 text-xs font-semibold",
            trend.direction === "up" ? v.trendUp : trend.direction === "down" ? v.trendDown : (isColored ? "text-white/60" : "text-slate-500")
          ].join(" ")}>
            {trend.direction === "up" && <TrendingUp className="w-3.5 h-3.5" />}
            {trend.direction === "down" && <TrendingDown className="w-3.5 h-3.5" />}
            {trend.direction === "flat" && <Minus className="w-3.5 h-3.5" />}
            <span>{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
