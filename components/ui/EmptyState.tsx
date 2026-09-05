import React from "react";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50",
        className
      )}
    >
      <div className="p-3.5 rounded-2xl bg-white text-sky-600 shadow-2xs border border-slate-100 mb-4">
        {icon || <Inbox className="w-8 h-8 text-slate-400" />}
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && (
        <Button
          onClick={onAction}
          href={actionHref}
          variant="secondary"
          size="sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
