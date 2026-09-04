import React from "react";

interface SectionHeaderProps {
  tag?: string;
  tagIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  cta?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  tagIcon,
  title,
  subtitle,
  align = "left",
  cta,
  className = "",
}) => {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <div className={["flex flex-col gap-2 mb-10 sm:mb-14", alignClass, className].filter(Boolean).join(" ")}>
      {/* Optional tag / category badge */}
      {tag && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider self-start">
          {tagIcon && <span className="text-sky-600">{tagIcon}</span>}
          <span>{tag}</span>
        </div>
      )}

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={["text-base sm:text-lg text-slate-600 leading-relaxed", align === "center" ? "max-w-2xl mx-auto" : "max-w-3xl"].join(" ")}>
          {subtitle}
        </p>
      )}

      {/* Optional CTA Row */}
      {cta && <div className="pt-1">{cta}</div>}
    </div>
  );
};

export default SectionHeader;
