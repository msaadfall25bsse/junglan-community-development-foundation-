"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { FOUNDATION_INFO, NAV_LINKS, PROJECTS_DATA } from "@/data/homepage-data";

interface FooterProps {
  onOpenDonateModal: (project?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDonateModal }) => {
  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Foundation Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {FOUNDATION_INFO.missionStatement}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-sky-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{FOUNDATION_INFO.registrationNotice}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenDonateModal()}
                className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all flex items-center gap-2 shadow-md shadow-red-600/20"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Support Foundation</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Initiatives */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Initiatives
            </h4>
            <ul className="space-y-2.5 text-xs">
              {PROJECTS_DATA.map((proj) => (
                <li key={proj.id}>
                  <Link
                    href={proj.ctaLink}
                    className="text-slate-400 hover:text-sky-400 transition-colors block"
                  >
                    <span className="font-semibold text-slate-200">{proj.category}</span>
                    <span className="block text-[11px] text-slate-500">{proj.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Secretariat */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Foundation Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{FOUNDATION_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-200 font-medium">{FOUNDATION_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${FOUNDATION_INFO.email}`}
                  className="hover:text-sky-300 transition-colors"
                >
                  {FOUNDATION_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <div className="text-[11px] text-slate-500 uppercase font-semibold">
                Social Presence:
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                <span className="px-2.5 py-1 bg-slate-800 rounded-lg hover:text-sky-400 cursor-pointer">
                  Facebook
                </span>
                <span className="px-2.5 py-1 bg-slate-800 rounded-lg hover:text-sky-400 cursor-pointer">
                  Twitter / X
                </span>
                <span className="px-2.5 py-1 bg-slate-800 rounded-lg hover:text-sky-400 cursor-pointer">
                  LinkedIn
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {FOUNDATION_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-700">•</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Terms of Stewardship
            </a>
            <span className="text-slate-700">•</span>
            <a href="#impact-flow" className="hover:text-slate-300 transition-colors">
              Financial Transparency
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
