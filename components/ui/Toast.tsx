"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

export function Toast({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />,
  };

  const borderVariants = {
    success: "border-emerald-200 bg-white",
    error: "border-red-200 bg-white",
    info: "border-sky-200 bg-white",
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl border shadow-xl flex items-start gap-3 transition-all animate-in slide-in-from-bottom-5 duration-200",
        borderVariants[type]
      )}
    >
      {icons[type]}

      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
          {title}
        </div>
        {message && (
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
            {message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
