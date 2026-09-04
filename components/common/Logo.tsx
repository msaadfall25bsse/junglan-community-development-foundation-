import React from "react";

interface LogoProps {
  variant?: "default" | "light" | "compact";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = "default", className = "" }) => {
  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width="44"
          height="44"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Outer Soft Ambient Ring */}
          <circle cx="50" cy="50" r="46" fill="#e0f2fe" fillOpacity="0.8" />
          
          {/* Foundation Arch / Community Caring Hands Arc (Sky Blue) */}
          <path
            d="M20 62C20 40 33 24 50 24C67 24 80 40 80 62C72 54 62 50 50 50C38 50 28 54 20 62Z"
            fill="#0284c7"
          />
          
          {/* Olive Leaf / Growth Branch (Deep Sky / Teal-Blue) */}
          <path
            d="M50 24C58 32 60 44 50 52C40 44 42 32 50 24Z"
            fill="#38bdf8"
          />
          
          {/* Base Community Foundation Pillar (Dark Navy) */}
          <path
            d="M30 66C30 63 36 60 50 60C64 60 70 63 70 66C70 72 63 78 50 78C37 78 30 72 30 66Z"
            fill="#0f172a"
          />
          
          {/* Central Humanitarian Compassion Spark / Star (Strategic Red Accent) */}
          <circle cx="50" cy="38" r="4.5" fill="#dc2626" />
        </svg>
      </div>

      {/* Wordmark */}
      {variant !== "compact" && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold text-lg sm:text-xl tracking-tight leading-tight ${
                isLight ? "text-white" : "text-slate-900"
              }`}
            >
              JUNGLAN
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 self-center" />
          </div>
          <span
            className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase leading-tight ${
              isLight ? "text-sky-200" : "text-sky-700"
            }`}
          >
            Community Development Foundation
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
