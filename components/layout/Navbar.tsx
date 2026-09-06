"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, HeartHandshake, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { MAIN_NAV_LINKS, FOUNDATION_INFO } from "@/data/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hotline, setHotline] = useState(FOUNDATION_INFO.hotline);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.emergencyHotline) {
          setHotline(data.data.emergencyHotline);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top Emergency Ambulance Hotline Strip */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-semibold text-[11px] border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              24/7 Emergency Ambulance
            </span>
            <span className="hidden sm:inline text-slate-300">
              Free Emergency Transport in Junglan & Surrounding Regions
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${hotline}`}
              className="inline-flex items-center gap-1.5 font-semibold text-sky-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>Helpline: {hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={cn(
          "w-full transition-all duration-200 border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-slate-200/80 shadow-xs py-3"
            : "bg-white border-slate-100 py-4"
        )}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "text-sky-700 bg-sky-50 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTA: Donate Now */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="/donate"
              variant="primary"
              size="md"
              leftIcon={<HeartHandshake className="w-4 h-4" />}
            >
              Donate Now
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              href="/donate"
              variant="primary"
              size="sm"
              className="sm:hidden"
            >
              Donate
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay & Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[76px] sm:top-[85px] z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative bg-white border-b border-slate-200 shadow-2xl px-4 sm:px-6 py-4 sm:py-5 max-h-[calc(100dvh-76px)] sm:max-h-[calc(100dvh-85px)] overflow-y-auto overscroll-contain">
            {/* Top Quick Emergency Hotline Banner (Immediately visible without scrolling on iPhone) */}
            <div className="mb-4 p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-red-500/10 via-red-50 to-sky-50 border border-red-200/90 flex items-center justify-between gap-2 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <PhoneCall className="w-4 h-4 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-red-700">
                    24/7 Free Ambulance Hotline
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight truncate">
                    {hotline}
                  </div>
                </div>
              </div>
              <a
                href={`tel:${hotline}`}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all shrink-0"
              >
                Call Now
              </a>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-1">
              {MAIN_NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-3.5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between",
                      isActive
                        ? "bg-sky-50 text-sky-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions Bottom Section with Safe-Area padding */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5 pb-6 sm:pb-4">
              <Button
                href="/donate"
                variant="primary"
                size="md"
                className="w-full justify-center shadow-sm"
                leftIcon={<HeartHandshake className="w-4 h-4" />}
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate to Foundation
              </Button>

              <div className="text-center">
                <span className="text-[11px] text-slate-500 font-medium">
                  Junglan Community Development Foundation • Mansehra, KP
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
