"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 transition-all bg-white shadow-sm border-b border-[#E2E8F0]">
      {/* Utility Bar: Dark Slate/Navy with Standby Status and Direct Field Audits */}
      <div className="bg-[#081A2D] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#b1f0ce] border border-emerald-400/30 text-[11px] font-mono font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              AMB-01 STANDBY
            </span>
            <span className="text-slate-300 font-mono text-[11px] hidden sm:inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#b1f0ce]">location_on</span>{" "}
              Base Camp Junglan (Elev. 1,520m)
            </span>
            <span className="text-slate-300 font-mono text-[11px] inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#b1f0ce]">verified</span>{" "}
              SECP CUIN: 0348227
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono ml-auto">
            <span className="text-slate-300 hidden md:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% Direct Field Audits
            </span>
            <a
              className="text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
              href="tel:+923000000000"
            >
              <span className="material-symbols-outlined text-xs text-[#ff545c]">emergency</span>{" "}
              Valley Hotline: <span className="text-white font-mono">+92 300 0000000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <Link
            aria-label="Junglan Community Development Foundation Home"
            className="flex items-center group shrink-0"
            href="/"
          >
            <img
              alt="Junglan Community Development Foundation (JCDF) Official Logo"
              className="h-12 sm:h-14 w-auto max-w-[240px] sm:max-w-[300px] object-contain cursor-pointer transition-transform group-hover:scale-[1.01]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfLIhBDEF3RoiI1s2zpVRFpNKOApn3SiSFIrx0Nn4nMcKtZ8OVhg2pCB6pcQW45Jzua3AlgGxOUaeSJjJ_MoZDirEs8Vl9gozc9fMCDdMpm6JoBdHe3VvQ2bUWgLgz83PIzp5gDuC5BeWfC4IJU5Nuo6HDoQp59oFgU1expxOO2pRiP-ByGLeX4DPK5BMiwBHEBLyCz_v-ivg8RUcx3jp4d8cfSed4VpKd81yebyM0pvSB2Sa-NDy6mnvNJ59944DNxQ"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link
              className={`pb-1 pt-1 transition-colors ${
                isActive("/")
                  ? "font-bold text-[#00162d] border-b-2 border-[#00162d]"
                  : "text-slate-600 hover:text-[#00162d]"
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`py-1 transition-colors ${
                isActive("/about")
                  ? "font-bold text-[#00162d] border-b-2 border-[#00162d]"
                  : "text-slate-600 hover:text-[#00162d]"
              }`}
              href="/about"
            >
              About Us
            </Link>
            <Link
              className={`py-1 transition-colors ${
                isActive("/projects")
                  ? "font-bold text-[#00162d] border-b-2 border-[#00162d]"
                  : "text-slate-600 hover:text-[#00162d]"
              }`}
              href="/projects"
            >
              Our Work
            </Link>
            <Link
              className={`py-1 transition-colors ${
                isActive("/healthcare")
                  ? "font-bold text-[#00162d] border-b-2 border-[#00162d]"
                  : "text-slate-600 hover:text-[#00162d]"
              }`}
              href="/healthcare"
            >
              Healthcare &amp; Ambulance
            </Link>
            <Link
              className={`py-1 transition-colors ${
                isActive("/agriculture")
                  ? "font-bold text-[#00162d] border-b-2 border-[#00162d]"
                  : "text-slate-600 hover:text-[#00162d]"
              }`}
              href="/agriculture"
            >
              Agriculture
            </Link>
            <Link
              className={`py-1 flex items-center gap-1 transition-colors ${
                isActive("/impact")
                  ? "font-bold text-[#00162d] border-b-2 border-[#00162d]"
                  : "text-slate-600 hover:text-[#00162d]"
              }`}
              href="/impact"
            >
              <span className="material-symbols-outlined text-sm text-[#2c694e]">verified</span>
              Impact &amp; Audits
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-sm"
              href="tel:+923000000000"
            >
              <span className="material-symbols-outlined text-sm text-[#2c694e]">support_agent</span>{" "}
              Valley Desk
            </a>
            <Link
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00162d] hover:bg-[#081A2D] text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 duration-150"
              href="/donate"
            >
              <span>Support Our Work</span>
              <span className="material-symbols-outlined text-sm text-[#b1f0ce]">arrow_forward</span>
            </Link>
            <button
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-[#E2E8F0]"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <nav className="lg:hidden flex flex-col gap-1 px-4 py-3 border-t border-slate-200 bg-white">
            <Link
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive("/")
                  ? "bg-[#f1f4f8] text-[#00162d] font-bold"
                  : "text-slate-700 hover:bg-[#f1f4f8]"
              }`}
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive("/about")
                  ? "bg-[#f1f4f8] text-[#00162d] font-bold"
                  : "text-slate-700 hover:bg-[#f1f4f8]"
              }`}
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive("/projects")
                  ? "bg-[#f1f4f8] text-[#00162d] font-bold"
                  : "text-slate-700 hover:bg-[#f1f4f8]"
              }`}
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Work
            </Link>
            <Link
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive("/healthcare")
                  ? "bg-[#f1f4f8] text-[#00162d] font-bold"
                  : "text-slate-700 hover:bg-[#f1f4f8]"
              }`}
              href="/healthcare"
              onClick={() => setMobileMenuOpen(false)}
            >
              Healthcare &amp; Ambulance
            </Link>
            <Link
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive("/agriculture")
                  ? "bg-[#f1f4f8] text-[#00162d] font-bold"
                  : "text-slate-700 hover:bg-[#f1f4f8]"
              }`}
              href="/agriculture"
              onClick={() => setMobileMenuOpen(false)}
            >
              Agriculture
            </Link>
            <Link
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                isActive("/impact")
                  ? "bg-[#f1f4f8] text-[#00162d] font-bold"
                  : "text-slate-700 hover:bg-[#f1f4f8]"
              }`}
              href="/impact"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Impact &amp; Audits</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                100% Audited
              </span>
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <a
                className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[#E2E8F0] bg-slate-50 text-slate-800 font-semibold text-xs"
                href="tel:+923000000000"
              >
                <span className="material-symbols-outlined text-sm text-[#2c694e]">
                  support_agent
                </span>{" "}
                Valley Desk: +92 300 0000000
              </a>
              <Link
                className="w-full text-center bg-[#00162d] hover:bg-[#081A2D] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2"
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Support Our Work</span>
                <span className="material-symbols-outlined text-sm text-[#b1f0ce]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
