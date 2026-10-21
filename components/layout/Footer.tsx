"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#081A2D] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Foundation Brand & CUIN Registration Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block">
              <Link href="/">
                <img
                  alt="Junglan Community Development Foundation Logo"
                  className="h-14 w-auto max-w-[260px] object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlQqg-SoIPZbM-4ur-7V4Or5IX0kG183067aWfQ0hbKTbig2vPjgDV_y1hvmUqrWVkKqvFv2qxO6xTOiaIKtQiYXJcbNJq1roECkpu6ORlq1RUFQgOtSb9AhaoUH7mxLSPNlAlLI5__cG6DOvt6OeY1qXN69L2ftSuBmA-9YXy8ivDmhlcxhED3rPKRDJdoPGFi4Wy2ED7L5fsUBQ3eUSAXtYPBq9SUp_ooTv6-fKeTwsD2WnM6sa-fAMXVAx7At1lfA"
                />
              </Link>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Junglan Community Development Foundation is a non-profit registered under the laws of Pakistan with the Securities and Exchange Commission of Pakistan (SECP CUIN: 0348227).
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f2b48] text-[#b1f0ce] border border-white/10 text-xs font-mono font-bold">
                <span className="material-symbols-outlined text-sm">verified</span> SECP CUIN: 0348227
              </span>
            </div>
          </div>

          {/* OPERATIONAL PILLARS Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs uppercase font-bold text-[#b1f0ce] tracking-wider">
              OPERATIONAL PILLARS
            </div>
            <ul className="space-y-2 text-sm text-slate-300 font-medium">
              <li>
                <a
                  className="hover:text-white transition-colors flex items-center gap-2"
                  href="tel:+923000000000"
                >
                  <span className="material-symbols-outlined text-xs text-[#b1f0ce]">arrow_forward</span>
                  Emergency Dispatch
                </a>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors flex items-center gap-2"
                  href="/our-work#ambulance"
                >
                  <span className="material-symbols-outlined text-xs text-[#b1f0ce]">arrow_forward</span>
                  Healthcare &amp; Ambulance
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors flex items-center gap-2"
                  href="/our-work#agriculture"
                >
                  <span className="material-symbols-outlined text-xs text-[#b1f0ce]">arrow_forward</span>
                  Olive Agroforestry
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors flex items-center gap-2"
                  href="/our-work#future-initiatives"
                >
                  <span className="material-symbols-outlined text-xs text-[#b1f0ce]">arrow_forward</span>
                  Planned Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* GOVERNANCE & CONTACT Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs uppercase font-bold text-[#b1f0ce] tracking-wider">
              GOVERNANCE &amp; CONTACT
            </div>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link
                  className="hover:text-white transition-colors flex items-center gap-2 text-xs"
                  href="/#audit-pipeline"
                >
                  <span className="material-symbols-outlined text-xs text-[#b1f0ce]">description</span>
                  Audit Pipeline &amp; Field Records
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors flex items-center gap-2 text-xs"
                  href="/about#approach"
                >
                  <span className="material-symbols-outlined text-xs text-[#b1f0ce]">gavel</span>
                  SECP Governance Framework
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors flex items-center gap-2 text-xs"
                  href="/about#support"
                >
                  <span className="material-symbols-outlined text-xs text-[#b1f0ce]">verified_user</span>
                  Financial Transparency Pledge
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
                <span className="block text-slate-400 uppercase text-[10px] tracking-wider mb-0.5">
                  Valley Desk Location:
                </span>
                Junglan Base Camp, Tehsil Baffa Pakhal, Mansehra, KP, Pakistan
              </li>
              <li className="text-xs text-slate-300">
                <span className="block text-slate-400 uppercase text-[10px] tracking-wider mb-0.5">
                  Emergency Triage Line:
                </span>
                <a
                  className="font-mono font-bold text-white hover:text-[#b1f0ce] transition-colors"
                  href="tel:+923000000000"
                >
                  +92 300 0000000
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 py-6 bg-[#081A2D]/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left leading-relaxed">
            © 2026 Junglan Community Development Foundation (JCDF). All rights reserved. Registered under SECP CUIN 0348227.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link className="hover:text-white transition-colors" href="/about">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link className="hover:text-white transition-colors" href="/about">
              Terms of Operations
            </Link>
            <span>•</span>
            <Link className="hover:text-white transition-colors" href="/reports">
              SECP Filings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
