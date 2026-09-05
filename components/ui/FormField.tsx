import React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  helpText,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-xs font-bold text-slate-700 flex items-center gap-1"
        >
          <span>{label}</span>
          {required && <span className="text-red-500 font-semibold">*</span>}
        </label>
      )}

      {children}

      {error ? (
        <span className="text-[11px] font-medium text-red-600 flex items-center gap-1">
          {error}
        </span>
      ) : helpText ? (
        <span className="text-[11px] text-slate-500 leading-tight">
          {helpText}
        </span>
      ) : null}
    </div>
  );
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : "border-slate-300 hover:border-slate-400 focus:border-sky-500 focus:ring-sky-500/20",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : "border-slate-300 hover:border-slate-400 focus:border-sky-500 focus:ring-sky-500/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed resize-y",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : "border-slate-300 hover:border-slate-400 focus:border-sky-500 focus:ring-sky-500/20",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
