import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "iconOnly" | "light";
}

export function Logo({ className, variant = "full" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 select-none transition-opacity hover:opacity-95",
        className
      )}
      aria-label="Junglan Community Development Foundation"
    >
      {/* Insignia: Modern Geometric Emblem with Healthcare & Agriculture Harmony */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 text-white shadow-sm ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
        >
          {/* Shield Base (Protection & Community Trust) */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" />
          {/* Olive Leaf / Agriculture Sprout inside shield */}
          <path d="M12 8c2.5 0 4 2 4 4.5S14 17 12 17s-4-2-4-4.5S9.5 8 12 8z" strokeWidth="1.75" />
          {/* Healthcare Cross Center */}
          <path d="M12 10.5v3M10.5 12h3" strokeWidth="2" stroke="white" />
        </svg>
        {/* Subtle accent dot */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
      </div>

      {variant !== "iconOnly" && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold text-base sm:text-lg tracking-tight leading-tight",
              variant === "light" ? "text-white" : "text-slate-900"
            )}
          >
            Junglan Foundation
          </span>
          <span
            className={cn(
              "text-[10px] sm:text-[11px] font-medium tracking-wide uppercase",
              variant === "light" ? "text-slate-300" : "text-sky-700"
            )}
          >
            Community Development
          </span>
        </div>
      )}
    </Link>
  );
}
