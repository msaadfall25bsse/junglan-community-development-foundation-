"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  MapPin,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { FOOTER_NAV_GROUPS, CONTACT_INFO } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/Button";

interface PublicFooterProps {
  onOpenDonateModal?: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onOpenDonateModal }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Emergency Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-900 items-center">
          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-slate-800">
            <h3 className="text-white text-lg font-bold">Stay Updated with Field Reports</h3>
            <p className="text-sm text-slate-400 mt-1 mb-4">
              Receive quarterly audited impact updates, ambulance mission logs, and community news.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-950/50 border border-emerald-800/50 p-3 rounded-xl">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Thank you! You are subscribed to our field reports.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="Enter your email address"
                    aria-label="Email for updates"
                    className="flex-1 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    rightIcon={<Send className="w-4 h-4" />}
                    className="shrink-0"
                  >
                    Subscribe
                  </Button>
                </div>
                {emailError && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{emailError}</span>
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Emergency Ambulance Hotline Box */}
          <div className="lg:col-span-5 bg-red-950/40 border border-red-900/60 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                <span>24/7 Emergency Dispatch</span>
              </div>
              <h4 className="text-white font-extrabold text-xl sm:text-2xl">
                {CONTACT_INFO.emergencyHotline}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Immediate response ambulance for rural patients and maternity emergencies in Abbottabad district.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-red-900/40 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Free of charge for vulnerable
              </span>
              <a
                href={`tel:${CONTACT_INFO.emergencyHotline}`}
                className="text-xs font-bold text-red-400 hover:text-red-300 underline"
              >
                Dial Now →
              </a>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-12 border-b border-slate-900">
          {/* Foundation Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                J
              </div>
              <div>
                <span className="text-white font-extrabold text-base tracking-tight block">JUNGLAN</span>
                <span className="text-[10px] text-sky-400 font-bold tracking-widest block">FOUNDATION</span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated to rural empowerment, lifesaving emergency healthcare, sustainable olive agriculture,
              and educational development across Junglan and vulnerable communities.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Registered Nonprofit Community Foundation</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </p>
            </div>
          </div>

          {/* Categorized Navigation Columns */}
          {FOOTER_NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {group.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright, Transparency, Quick Donate */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Junglan Community Development Foundation. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/#about" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/#about" className="hover:text-slate-400 transition-colors">
              Terms & Accountability
            </Link>
            <span>•</span>
            <button
              onClick={onOpenDonateModal}
              className="text-red-400 hover:text-red-300 font-bold inline-flex items-center gap-1"
            >
              <Heart className="w-3 h-3 fill-red-400" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
