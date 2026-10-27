"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-stone-border">
      {/* Utility Top Bar: Desktop full bar + Mobile continuous smooth infinite ticker (Height reduced by 5px) */}
      <div className="bg-navy-deep text-surface text-xs border-b border-white/10 py-[3px] overflow-hidden">
        {/* Desktop/Tablet Layout (Screen >= md) */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:gap-4 text-[11px] sm:text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 text-secondary-fixed">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              SECP Registered CUIN: 0348227
            </span>
            <span className="inline text-white/30">|</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <span className="material-symbols-outlined text-xs text-[#b1f0ce]">verified</span>
              100% Direct Allocation to Mountain Relief
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-semibold transition-colors border border-white/15"
              href="tel:+923016541825"
              style={{ borderColor: "rgb(11, 79, 140)", background: "rgba(11, 79, 140, 0.4)" }}
            >
              <span className="material-symbols-outlined text-xs text-secondary-fixed">phone</span>
              <span>Valley Desk: +92 301 6541825</span>
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-lg text-white font-bold text-[11px] sm:text-xs transition-all shadow-sm active:scale-95 border border-white/30"
              href="#donation-action-card"
              style={{ backgroundColor: "rgb(229, 37, 42)" }}
            >
              <span className="material-symbols-outlined text-xs text-secondary-fixed">volunteer_activism</span>
              <span>Donate / Support Fund</span>
            </a>
          </div>
        </div>

        {/* Mobile Continuous Infinite Marquee (Screens < md) - Never stops, constant linear speed */}
        <div className="md:hidden flex items-center overflow-hidden whitespace-nowrap w-full">
          <div className="animate-marquee-infinite flex items-center gap-6 py-0 text-[11px] font-medium">
            {/* Group 1 */}
            <div className="flex items-center gap-6 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-secondary-fixed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                SECP CUIN: 0348227
              </span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <span className="material-symbols-outlined text-xs text-[#b1f0ce]">verified</span>
                100% Direct Allocation to Mountain Relief
              </span>
              <span className="text-white/30">•</span>
              <a className="inline-flex items-center gap-1 text-white hover:text-emerald-300 transition-colors" href="tel:+923016541825">
                <span className="material-symbols-outlined text-xs text-secondary-fixed">phone</span>
                <span>Valley Desk: +92 301 6541825</span>
              </a>
              <span className="text-white/30">•</span>
              <a className="inline-flex items-center gap-1 text-[#ffdad8] font-bold" href="#support-section">
                <span className="material-symbols-outlined text-xs">volunteer_activism</span>
                <span>Donate / Support Fund</span>
              </a>
              <span className="text-white/30">•</span>
            </div>

            {/* Group 2 (Duplicate for seamless continuous infinite loop) */}
            <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
              <span className="inline-flex items-center gap-1.5 text-secondary-fixed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                SECP CUIN: 0348227
              </span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <span className="material-symbols-outlined text-xs text-[#b1f0ce]">verified</span>
                100% Direct Allocation to Mountain Relief
              </span>
              <span className="text-white/30">•</span>
              <a className="inline-flex items-center gap-1 text-white hover:text-emerald-300 transition-colors" href="tel:+923016541825">
                <span className="material-symbols-outlined text-xs text-secondary-fixed">phone</span>
                <span>Valley Desk: +92 301 6541825</span>
              </a>
              <span className="text-white/30">•</span>
              <a className="inline-flex items-center gap-1 text-[#ffdad8] font-bold" href="#support-section">
                <span className="material-symbols-outlined text-xs">volunteer_activism</span>
                <span>Donate / Support Fund</span>
              </a>
              <span className="text-white/30">•</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (+10px gap between Logo and Navbar links) */}
      <div className="bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-5 lg:gap-6 relative z-10 py-1.5 sm:py-2">
          {/* Logo: dynamically scaled for mobile/tablet/desktop */}
          <Link aria-label="Junglan Community Development Foundation Home" className="flex items-center group shrink-0 mr-2.5" href="/">
            <img
              alt="Junglan Community Development Foundation (JCDF) Official Logo"
              className="w-auto object-contain cursor-pointer transition-transform group-hover:scale-105"
              style={{ height: "4.375rem", maxHeight: "74px", minHeight: "58px" }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMX1-WZBJbEpkM_8-kzUx_tbNTPkRZA2eHJ1daLWgkxQPnPNC9NXP-zYD-JfRk9Ue7MT43Mg1bm5T-ETgF9lPvxWvsfFpwXhZMhuV5dDirJUN7LwL0Y34TZgdR8cgfZvs6zBYlcVz_N-NfEd8fZ-5NEpryjqWjSlwahqP1QUHU2O0HBVIpzFNh8-wsAf03GqczK4nbTwkjr7q42e8kJkc8SK0VF90z1b73DggAOWYboYtHnFznpFQWdrTTnVmrvHlO8w"
            />
          </Link>

          {/* Desktop/Tablet Nav */}
          <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2.5 font-medium text-slate-700 ml-2.5">
            <Link
              className={`px-3 py-1.5 rounded-md font-semibold text-[13px] transition-all border ${
                isActive("/")
                  ? "text-[#1e5631] bg-emerald-50/80 border-emerald-600/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border-transparent"
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`px-3 py-1.5 rounded-md font-medium text-[13px] transition-all ${
                isActive("/about")
                  ? "text-[#1e5631] bg-emerald-50/80 border border-emerald-600/10 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
              href="/about"
            >
              About Us
            </Link>
            <Link
              className={`px-3 py-1.5 rounded-md font-medium text-[13px] transition-all ${
                isActive("/our-work")
                  ? "text-[#1e5631] bg-emerald-50/80 border border-emerald-600/10 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
              href="/our-work"
            >
              Our Work
            </Link>
            <a className="px-3 py-1.5 rounded-md font-medium text-[13px] text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-all" href="#healthcare-section">
              Healthcare &amp; Ambulance
            </a>
            <a className="px-3 py-1.5 rounded-md font-medium text-[13px] text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-all" href="#agriculture-section">
              Agriculture
            </a>
            <a className="px-3 py-1.5 rounded-md font-medium text-[13px] text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-all inline-flex items-center gap-1.5" href="#audit-pipeline">
              <span className="material-symbols-outlined text-[15px] text-[#1e5631]">verified</span> Impact &amp; Audits
            </a>
          </nav>

          {/* Action Buttons & Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0b4f8c]/30 bg-slate-50 hover:bg-slate-100 text-[#0b4f8c] text-xs font-bold transition-colors shadow-sm"
              href="tel:+923016541825"
            >
              <span className="material-symbols-outlined text-base text-[#1e5631]">support_agent</span> Valley Desk
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#e5252a] hover:bg-[#c0171c] text-white rounded-lg text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 duration-150 whitespace-nowrap border border-white/20"
              href="#support-section"
            >
              <span className="material-symbols-outlined text-base text-[#ffdad8]">volunteer_activism</span>
              <span>Donate / Support Fund</span>
            </a>
            <button
              aria-label="Toggle navigation menu"
              className="xl:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 border border-stone-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              id="mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-2xl" id="menu-icon">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer / Dropdown */}
        {mobileMenuOpen && (
          <nav className="xl:hidden flex flex-col gap-1 px-4 py-4 border-t border-slate-200 bg-surface-container-lowest transition-all" id="mobile-nav-menu">
            <Link
              className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive("/") ? "bg-surface-container-low text-primary font-bold" : "text-slate-700 hover:bg-surface-container-low"
              }`}
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive("/about") ? "bg-surface-container-low text-primary font-bold" : "text-slate-700 hover:bg-surface-container-low"
              }`}
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive("/our-work") ? "bg-surface-container-low text-primary font-bold" : "text-slate-700 hover:bg-surface-container-low"
              }`}
              href="/our-work"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Work
            </Link>
            <a
              className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium"
              href="#healthcare-section"
              onClick={() => setMobileMenuOpen(false)}
            >
              Healthcare &amp; Ambulance
            </a>
            <a
              className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium"
              href="#agriculture-section"
              onClick={() => setMobileMenuOpen(false)}
            >
              Agriculture
            </a>
            <a
              className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium flex items-center justify-between"
              href="#audit-pipeline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Impact &amp; Audits</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-medium">100% Audited</span>
            </a>
            <div className="pt-3 mt-1 border-t border-stone-border flex flex-col gap-2">
              <a
                className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-stone-border bg-slate-50 text-slate-800 font-semibold text-xs active:bg-slate-100"
                href="tel:+923016541825"
              >
                <span className="material-symbols-outlined text-sm text-secondary">support_agent</span> Valley Desk: +92 301 6541825
              </a>
              <a
                className="w-full text-center bg-[#1e5631] hover:bg-navy-deep text-white px-4 py-3 rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2 active:scale-98 transition-all"
                href="#support-section"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Support Our Work</span>
                <span className="material-symbols-outlined text-sm text-secondary-fixed">arrow_forward</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
export default Header;
