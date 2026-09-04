"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Heart, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { MAIN_NAV_ITEMS, CONTACT_INFO } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/Button";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonateModal?: () => void;
  activePath?: string;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onOpenDonateModal,
  activePath = "/",
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap & escape key handler
  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 lg:hidden flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-up">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
              J
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 tracking-tight block">JUNGLAN</span>
              <span className="text-[10px] text-sky-700 font-bold tracking-wider block">FOUNDATION</span>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 divide-y divide-slate-100" aria-label="Mobile menu">
          <div className="space-y-1 pb-4">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = activePath === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={[
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-sky-50 text-sky-700 font-bold"
                      : "text-slate-700 hover:text-sky-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Contact & Emergency Info */}
          <div className="pt-4 space-y-3 text-xs text-slate-600">
            <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">24/7 Helpline & Dispatch</p>
            <a
              href={`tel:${CONTACT_INFO.emergencyHotline}`}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-50 text-red-700 font-bold border border-red-100 hover:bg-red-100 transition-colors"
            >
              <Phone className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
              <span>{CONTACT_INFO.emergencyHotline} (Emergency)</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors px-1"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{CONTACT_INFO.email}</span>
            </a>
            <div className="flex items-start gap-2 text-slate-500 px-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-[11px] leading-relaxed">District Abbottabad, KP, Pakistan</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium px-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Certified Community Non-Profit</span>
            </div>
          </div>
        </nav>

        {/* Bottom Action Drawer Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
          <Button
            variant="danger"
            size="md"
            fullWidth
            onClick={() => {
              onClose();
              onOpenDonateModal?.();
            }}
            leftIcon={<Heart className="w-4 h-4 fill-white" />}
          >
            Donate to Foundation
          </Button>
          <p className="text-[10px] text-center text-slate-400">
            100% of public donations directly fund field programs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileNavDrawer;
