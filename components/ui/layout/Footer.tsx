"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-[10px] py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Foundation Brand & CUIN Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3 sm:space-y-4">
            <div className="inline-block">
              <Link href="/">
                <img
                  alt="Junglan Community Development Foundation Logo"
                  className="w-auto object-contain block"
                  style={{
                    height: "8rem",
                    maxHeight: "140px",
                    minHeight: "115px",
                    width: "auto",
                  }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMX1-WZBJbEpkM_8-kzUx_tbNTPkRZA2eHJ1daLWgkxQPnPNC9NXP-zYD-JfRk9Ue7MT43Mg1bm5T-ETgF9lPvxWvsfFpwXhZMhuV5dDirJUN7LwL0Y34TZgdR8cgfZvs6zBYlcVz_N-NfEd8fZ-5NEpryjqWjSlwahqP1QUHU2O0HBVIpzFNh8-wsAf03GqczK4nbTwkjr7q42e8kJkc8SK0VF90z1b73DggAOWYboYtHnFznpFQWdrTTnVmrvHlO8w"
                />
              </Link>
            </div>
            <p className="text-slate-300 text-xs sm:text-body-sm leading-relaxed max-w-sm">
              Junglan Community Development Foundation is a non-profit registered under the laws of Pakistan with the Securities and Exchange Commission of Pakistan (SECP CUIN: 0348227).
            </p>
            <div className="pt-1">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-secondary-fixed border border-white/10 text-xs font-mono font-bold"
                style={{
                  background: "rgb(15, 43, 72)",
                  borderColor: "rgba(30, 86, 49, 0.5)",
                  color: "rgb(177, 240, 206)",
                }}
              >
                <span className="material-symbols-outlined text-sm">verified</span> SECP CUIN: 0348227
              </span>
            </div>
          </div>

          {/* OPERATIONAL PILLARS Column */}
          <div className="sm:col-span-1 lg:col-span-4 space-y-3 sm:space-y-4">
            <div className="text-[11px] sm:text-xs font-label-uppercase text-secondary-fixed uppercase tracking-wider font-bold">
              OPERATIONAL PILLARS
            </div>
            <ul className="space-y-2 text-xs sm:text-body-sm text-slate-300 font-medium">
              <li>
                <a
                  className="hover:text-white transition-colors flex items-center gap-2 py-0.5"
                  href="#healthcare-section"
                >
                  <span className="material-symbols-outlined text-xs text-secondary-fixed">
                    arrow_forward
                  </span>{" "}
                  Emergency Dispatch
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors flex items-center gap-2 py-0.5"
                  href="#healthcare-section"
                >
                  <span className="material-symbols-outlined text-xs text-secondary-fixed">
                    arrow_forward
                  </span>{" "}
                  Healthcare &amp; Ambulance
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors flex items-center gap-2 py-0.5"
                  href="#agriculture-section"
                >
                  <span className="material-symbols-outlined text-xs text-secondary-fixed">
                    arrow_forward
                  </span>{" "}
                  Olive Agroforestry
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors flex items-center gap-2 py-0.5"
                  href="#work-pillars"
                >
                  <span className="material-symbols-outlined text-xs text-secondary-fixed">
                    arrow_forward
                  </span>{" "}
                  Planned Infrastructure
                </a>
              </li>
            </ul>
          </div>

          {/* GOVERNANCE & CONTACT Column */}
          <div className="sm:col-span-1 lg:col-span-4 space-y-3 sm:space-y-4">
            <div className="text-[11px] sm:text-xs font-label-uppercase text-secondary-fixed uppercase tracking-wider font-bold">
              GOVERNANCE &amp; CONTACT
            </div>
            <ul className="space-y-2 text-xs sm:text-body-sm text-slate-300">
              <li>
                <a
                  className="hover:text-white transition-colors flex items-center gap-2 text-xs py-0.5"
                  href="#audit-pipeline"
                >
                  <span className="material-symbols-outlined text-xs text-secondary-fixed">
                    description
                  </span>{" "}
                  Audit Pipeline &amp; Field Records
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors flex items-center gap-2 text-xs py-0.5"
                  href="#about-origin"
                >
                  <span className="material-symbols-outlined text-xs text-secondary-fixed">
                    gavel
                  </span>{" "}
                  SECP Governance Framework
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors flex items-center gap-2 text-xs py-0.5"
                  href="#audit-pipeline"
                >
                  <span className="material-symbols-outlined text-xs text-secondary-fixed">
                    verified_user
                  </span>{" "}
                  Financial Transparency Pledge
                </a>
              </li>
              <li className="pt-2 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
                <span className="block text-slate-400 font-label-uppercase uppercase text-[10px] tracking-wider mb-0.5">
                  Valley Desk Location:
                </span>
                Junglan Base Camp, Tehsil Baffa Pakhal, Mansehra, KP, Pakistan
              </li>
              <li className="text-xs text-slate-300">
                <br />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 py-5 bg-navy-deep/80 text-[11px] sm:text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-[10px] flex flex-col gap-3 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="leading-relaxed">
              © 2026 Junglan Community Development Foundation (JCDF). All rights reserved. Registered under SECP CUIN 0348227.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
              <Link className="hover:text-white transition-colors" href="/about">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link className="hover:text-white transition-colors" href="/about">
                Terms of Operations
              </Link>
              <span>•</span>
              <Link className="hover:text-white transition-colors" href="/about">
                SECP Filings
              </Link>
            </div>
          </div>
          <div className="w-full border-t border-white/5 pt-3 flex items-center justify-center text-center text-[11px] sm:text-xs text-slate-400 font-normal">
            <span className="inline-flex flex-wrap items-center justify-center gap-1.5">
              Developed by: <span className="font-medium text-slate-300">Muhammad Saad</span>{" "}
              <span className="text-slate-600">·</span> Contact:{" "}
              <a
                href="tel:+923158960026"
                className="text-slate-300 hover:text-white transition-colors underline decoration-slate-600 hover:decoration-slate-300 underline-offset-2 font-mono"
              >
                +92 315 8960026
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
