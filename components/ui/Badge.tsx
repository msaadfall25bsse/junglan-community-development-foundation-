import React from "react";

type BadgeVariant = "info" | "success" | "warning" | "danger" | "neutral" | "sky";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  pulseDot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  info:    "bg-sky-50 text-sky-700 border border-sky-200",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  danger:  "bg-red-50 text-red-700 border border-red-200",
  neutral: "bg-slate-100 text-slate-700 border border-slate-200",
  sky:     "bg-sky-600 text-white border border-sky-600",
};

const dotStyles: Record<BadgeVariant, string> = {
  info:    "bg-sky-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger:  "bg-red-500",
  neutral: "bg-slate-400",
  sky:     "bg-white",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  children,
  dot = false,
  pulseDot = false,
  className = "",
}) => {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(dot || pulseDot) && (
        <span className="relative flex items-center justify-center w-1.5 h-1.5">
          {pulseDot && (
            <span
              className={[
                "absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping",
                dotStyles[variant],
              ].join(" ")}
            />
          )}
          <span
            className={["relative inline-flex w-1.5 h-1.5 rounded-full", dotStyles[variant]].join(" ")}
          />
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
