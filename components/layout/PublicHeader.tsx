"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Heart, Phone } from "lucide-react";
import { MAIN_NAV_ITEMS, CONTACT_INFO } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/Button";
import { MobileNavDrawer } from "./MobileNavDrawer";

interface PublicHeaderProps {
  onOpenDonateModal?: () => void;
  activeHref?: string;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  onOpenDonateModal,
  activeHref = "/",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={[
          "sticky top-0 z-30 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2.5"
            : "bg-white border-b border-slate-100/80 py-3.5",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-sky-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
                J
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none group-hover:text-sky-700 transition-colors">
                  JUNGLAN
                </span>
                <span className="text-[10px] font-extrabold tracking-widest text-sky-700 uppercase mt-0.5">
                  Community Development Foundation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Main Navigation"
            >
              {MAIN_NAV_ITEMS.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={[
                      "relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5",
                      isActive
                        ? "text-sky-700 font-bold bg-sky-50/80"
                        : "text-slate-600 hover:text-sky-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-red-100 text-red-700 border border-red-200">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Emergency Hotline Button (Desktop) */}
              <a
                href={`tel:${CONTACT_INFO.emergencyHotline}`}
                title="Emergency Ambulance Dispatch Hotline"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold border border-red-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                <span>24/7 Ambulance</span>
              </a>

              {/* Donate Button (Primary Red CTA) */}
              <Button
                variant="danger"
                size="sm"
                onClick={onOpenDonateModal}
                leftIcon={<Heart className="w-3.5 h-3.5 fill-white" />}
                className="font-bold shadow-sm shadow-red-600/20"
              >
                Donate Now
              </Button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenDonateModal={onOpenDonateModal}
        activePath={activeHref}
      />
    </>
  );
};

export default PublicHeader;
