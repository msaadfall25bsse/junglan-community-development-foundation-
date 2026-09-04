import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
  elevated?: boolean;
  hoverable?: boolean;
  as?: "div" | "article" | "section";
}

interface CardHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

const paddingStyles = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  bordered = true,
  elevated = false,
  hoverable = false,
  as: Tag = "div",
}) => {
  return (
    <Tag
      className={[
        "rounded-2xl bg-white overflow-hidden",
        bordered ? "border border-slate-200" : "",
        elevated ? "shadow-lg" : "shadow-sm",
        hoverable
          ? "transition-all duration-200 hover:shadow-md hover:border-sky-200 hover:-translate-y-0.5"
          : "",
        paddingStyles[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  rightSlot,
  className = "",
}) => {
  return (
    <div
      className={[
        "flex items-start justify-between gap-4 pb-4 mb-4 border-b border-slate-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="space-y-0.5 min-w-0">
        <div className="font-bold text-slate-900 text-base truncate">{title}</div>
        {subtitle && (
          <div className="text-sm text-slate-500 truncate">{subtitle}</div>
        )}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
};

export const CardFooter: React.FC<CardSectionProps> = ({ children, className = "" }) => {
  return (
    <div
      className={[
        "pt-4 mt-4 border-t border-slate-100 flex items-center gap-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};

export default Card;
