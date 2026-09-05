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
  const pathname = usePathname();

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
              href={`tel:${FOUNDATION_INFO.hotline}`}
              className="inline-flex items-center gap-1.5 font-semibold text-sky-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>Helpline: {FOUNDATION_INFO.hotline}</span>
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
        <div className="fixed inset-0 top-[89px] z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative bg-white border-b border-slate-200 shadow-xl px-6 py-6 max-h-[calc(100vh-89px)] overflow-y-auto">
            <div className="flex flex-col gap-1.5">
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
                      "px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between",
                      isActive
                        ? "bg-sky-50 text-sky-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
              <Button
                href="/donate"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                leftIcon={<HeartHandshake className="w-5 h-5" />}
              >
                Donate to Foundation
              </Button>

              <a
                href={`tel:${FOUNDATION_INFO.hotline}`}
                className="inline-flex items-center justify-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm font-semibold"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Call Emergency Ambulance: {FOUNDATION_INFO.hotline}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
