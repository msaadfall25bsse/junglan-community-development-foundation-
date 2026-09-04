"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { NAV_LINKS, FOUNDATION_INFO } from "@/data/homepage-data";

interface NavbarProps {
  onOpenDonateModal: (projectName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDonateModal }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ["hero", "about", "projects", "impact-flow", "where-we-work", "news"];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Emergency & Trust Announcement Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sky-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Healthcare & Olive Agriculture Initiatives
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              Community Hotline: <span className="text-white font-medium">{FOUNDATION_INFO.phone}</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={`mailto:${FOUNDATION_INFO.email}`}
              className="hover:text-sky-300 transition-colors"
            >
              {FOUNDATION_INFO.email}
            </a>
            <span className="text-slate-600">•</span>
            <span className="text-sky-300 font-medium">Nonprofit Foundation</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-md border-b border-sky-100 py-3"
            : "bg-white/95 backdrop-blur-md border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Wordmark */}
            <Link
              href="#hero"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
            >
              <Logo />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const targetId = link.href.replace("#", "");
                const isActive = activeSection === targetId;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative ${
                      isActive
                        ? "text-sky-700 bg-sky-50"
                        : "text-slate-700 hover:text-sky-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-sky-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Action CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => onOpenDonateModal()}
                className="relative group px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-md shadow-red-600/20 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-white fill-white transition-transform group-hover:scale-110" />
                <span>Donate Now</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => onOpenDonateModal()}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Donate</span>
              </button>
              
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-xl text-slate-700 hover:text-sky-700 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-900" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-900" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const targetId = link.href.replace("#", "");
                const isActive = activeSection === targetId;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-sky-50 text-sky-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDonateModal();
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 shadow-md shadow-red-600/20"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate to Foundation</span>
              </button>
              
              <div className="p-3 bg-slate-50 rounded-xl text-center text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Direct Helpline: </span>
                {FOUNDATION_INFO.phone}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
