import React from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
        <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Section Body */}
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );
};

export default FormSection;
