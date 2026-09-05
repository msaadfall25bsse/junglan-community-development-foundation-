import React from "react";
import Link from "next/link";
import {
  HeartHandshake,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import {
  FOUNDATION_INFO,
  FOOTER_QUICK_LINKS,
  FOOTER_PROJECT_LINKS,
} from "@/data/content";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper Pre-Footer Donation Strip */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-3 border border-sky-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>100% Transparent Financial Stewardship</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Support Community Healthcare & Agriculture Today
              </h3>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Every contribution directly fuels emergency patient transportation and local farmer empowerment.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Make a Donation</span>
              </Link>
              <Link
                href="/reports"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-colors"
              >
                <span>View Public Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1 & 2: Organization Identity & Mission */}
          <div className="lg:col-span-2">
            <Logo variant="light" className="mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {FOUNDATION_INFO.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 max-w-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
                Emergency Ambulance Hotline
              </div>
              <a
                href={`tel:${FOUNDATION_INFO.hotline}`}
                className="text-lg font-bold text-white hover:text-sky-300 transition-colors inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
                <span>{FOUNDATION_INFO.hotline}</span>
              </a>
              <div className="text-[11px] text-slate-400 mt-1">
                Free 24/7 service for urgent and critical patient transfers.
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Community Projects */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Our Projects
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_PROJECT_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Information */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact Foundation
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <span className="leading-snug">{FOUNDATION_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${FOUNDATION_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {FOUNDATION_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`tel:${FOUNDATION_INFO.hotline}`}
                  className="hover:text-white transition-colors"
                >
                  {FOUNDATION_INFO.hotline}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {FOUNDATION_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Non-Profit Foundation</span>
            <span>•</span>
            <span>Audited & Verified</span>
            <span>•</span>
            <Link href="/reports" className="hover:text-slate-400 transition-colors">
              Transparency Pledge
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
