"use client";

import React, { useState } from "react";
import { PhoneCall, AlertCircle, X, ArrowRight } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants/navigation";

interface AnnouncementBannerProps {
  message?: string;
  actionText?: string;
  actionHref?: string;
  variant?: "emergency" | "info" | "campaign";
  onActionClick?: () => void;
  allowDismiss?: boolean;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  message = "24/7 Rural Emergency Ambulance Service is active. Dial our dispatch hotline directly.",
  actionText = "Call Dispatch",
  actionHref = `tel:${CONTACT_INFO.emergencyHotline}`,
  variant = "emergency",
  onActionClick,
  allowDismiss = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const isEmergency = variant === "emergency";

  return (
    <aside
      aria-label="Important Announcement"
      className={[
        "relative text-xs sm:text-sm font-medium transition-colors z-40",
        isEmergency
          ? "bg-red-600 text-white shadow-sm shadow-red-900/10"
          : variant === "campaign"
          ? "bg-sky-600 text-white"
          : "bg-slate-900 text-slate-100",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        {/* Left / Center content */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-center sm:justify-start">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 shrink-0">
            {isEmergency ? (
              <PhoneCall className="w-3 h-3 text-white animate-pulse" />
            ) : (
              <AlertCircle className="w-3 h-3 text-white" />
            )}
          </span>
          <p className="truncate text-center sm:text-left">
            <span className="font-bold uppercase tracking-wider text-[10px] sm:text-xs bg-white/20 px-1.5 py-0.5 rounded mr-2">
              {isEmergency ? "Emergency Notice" : "Notice"}
            </span>
            <span>{message}</span>
          </p>
        </div>

        {/* Action Link & Dismiss button */}
        <div className="flex items-center gap-3 shrink-0">
          {actionHref && (
            <a
              href={actionHref}
              onClick={onActionClick}
              className="inline-flex items-center gap-1 font-bold text-xs bg-white text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-full shadow-xs transition-colors shrink-0 whitespace-nowrap"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}

          {allowDismiss && (
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss announcement"
              className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBanner;
