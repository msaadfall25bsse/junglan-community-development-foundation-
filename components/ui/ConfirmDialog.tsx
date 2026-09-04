"use client";

import React, { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";
import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "info";
}

const variantStyles = {
  danger:  { iconBg: "bg-red-100",    iconColor: "text-red-600"  },
  warning: { iconBg: "bg-amber-100",  iconColor: "text-amber-600" },
  info:    { iconBg: "bg-sky-100",    iconColor: "text-sky-600"  },
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
  variant = "danger",
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const v = variantStyles[variant];

  // Focus trap on cancel button when dialog opens
  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {/* Icon */}
          <div className={["w-12 h-12 rounded-2xl flex items-center justify-center mb-4", v.iconBg].join(" ")}>
            <AlertTriangle className={["w-6 h-6", v.iconColor].join(" ")} />
          </div>

          <h3 id="confirm-dialog-title" className="text-lg font-bold text-slate-900 mb-1">
            {title}
          </h3>
          <p id="confirm-dialog-desc" className="text-sm text-slate-500">
            {description}
          </p>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button
              ref={cancelRef}
              variant="secondary"
              fullWidth
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={variant === "danger" ? "danger" : "primary"}
              fullWidth
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
