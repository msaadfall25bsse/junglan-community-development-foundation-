"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background text-on-background antialiased font-body-md text-body-md selection:bg-secondary-container selection:text-on-secondary-fixed overflow-x-hidden">
      <svg aria-hidden="true" className="inline-defs-container" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}></svg>

      {/* 1. RESPONSIVE HEADER & NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-stone-border">
        {/* Utility Top Bar: Seamlessly wraps and condenses on mobile, touch-friendly direct actions */}
        <div className="bg-navy-deep text-surface text-xs py-2 px-3 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#b1f0ce] border border-emerald-400/30 text-[10px] sm:text-[11px] font-mono font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                AMB-01 STANDBY
              </span>
              <span className="text-slate-300 font-mono text-[10px] sm:text-[11px] hidden md:inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-secondary-fixed">location_on</span> Base Camp Junglan (Elev. 1,520m)
              </span>
              <span className="text-slate-300 font-mono text-[10px] sm:text-[11px] inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-secondary-fixed">verified</span> <span className="hidden xs:inline">SECP CUIN:</span> 0348227
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono shrink-0">
              <span className="text-slate-300 hidden lg:inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% Direct Field Audits
              </span>
              <a className="text-slate-200 hover:text-white transition-colors flex items-center gap-1 font-bold text-[11px] sm:text-xs py-0.5 px-1.5 rounded bg-white/5 sm:bg-transparent" href="tel:+923000000000">
                <span className="material-symbols-outlined text-xs text-[#ff545c]">emergency</span>
                <span className="hidden sm:inline">Valley Hotline:</span>
                <span className="text-white font-mono">+92 300 0000000</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3">
            {/* Logo: dynamically scaled for mobile/tablet/desktop */}
            <Link aria-label="Junglan Community Development Foundation Home" className="flex items-center group shrink-0" href="/">
              <img
                alt="Junglan Community Development Foundation (JCDF) Official Logo"
                className="h-9 sm:h-11 md:h-12 lg:h-13 w-auto max-w-[190px] sm:max-w-[240px] md:max-w-[280px] object-contain cursor-pointer transition-transform group-hover:scale-[1.01]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfLIhBDEF3RoiI1s2zpVRFpNKOApn3SiSFIrx0Nn4nMcKtZ8OVhg2pCB6pcQW45Jzua3AlgGxOUaeSJjJ_MoZDirEs8Vl9gozc9fMCDdMpm6JoBdHe3VvQ2bUWgLgz83PIzp5gDuC5BeWfC4IJU5Nuo6HDoQp59oFgU1expxOO2pRiP-ByGLeX4DPK5BMiwBHEBLyCz_v-ivg8RUcx3jp4d8cfSed4VpKd81yebyM0pvSB2Sa-NDy6mnvNJ59944DNxQ"
              />
            </Link>

            {/* Desktop/Tablet Nav */}
            <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-700">
              <Link className="font-bold text-primary border-b-2 border-primary pb-1 pt-1 transition-colors" href="/">Home</Link>
              <Link className="text-slate-600 hover:text-primary transition-colors py-1" href="/about">About Us</Link>
              <Link className="text-slate-600 hover:text-primary transition-colors py-1" href="/our-work">Our Work</Link>
              <Link className="text-slate-600 hover:text-primary transition-colors py-1" href="/our-work#ambulance">Healthcare &amp; Ambulance</Link>
              <Link className="text-slate-600 hover:text-primary transition-colors py-1" href="/our-work#agriculture">Agriculture</Link>
              <a className="text-slate-600 hover:text-primary transition-colors py-1 flex items-center gap-1" href="#audit-pipeline">
                <span className="material-symbols-outlined text-sm text-secondary">verified</span> Impact &amp; Audits
              </a>
            </nav>

            {/* Action Buttons & Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-border bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-sm" href="tel:+923000000000">
                <span className="material-symbols-outlined text-sm text-secondary">support_agent</span> Valley Desk
              </a>
              <a className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-primary hover:bg-navy-deep text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 duration-150 whitespace-nowrap" href="#support-section">
                <span>Support Our Work</span>
                <span className="material-symbols-outlined text-sm text-secondary-fixed">arrow_forward</span>
              </a>
              {/* Mobile/Tablet Hamburger Toggle */}
              <button
                aria-label="Toggle navigation menu"
                className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-stone-border focus:outline-none focus:ring-2 focus:ring-primary/20"
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
          <nav
            className={`${mobileMenuOpen ? "flex" : "hidden"} xl:hidden flex-col gap-1 px-4 py-4 border-t border-slate-200 bg-surface-container-lowest transition-all`}
            id="mobile-nav-menu"
          >
            <Link className="px-3 py-2.5 rounded-lg bg-surface-container-low text-primary font-bold text-sm" href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium" href="/about" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium" href="/our-work" onClick={() => setMobileMenuOpen(false)}>
              Our Work
            </Link>
            <Link className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium" href="/our-work#ambulance" onClick={() => setMobileMenuOpen(false)}>
              Healthcare &amp; Ambulance
            </Link>
            <Link className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium" href="/our-work#agriculture" onClick={() => setMobileMenuOpen(false)}>
              Agriculture
            </Link>
            <a
              className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium flex items-center justify-between"
              href="#audit-pipeline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Impact &amp; Audits</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-medium">100% Audited</span>
            </a>
            <div className="pt-3 mt-1 border-t border-stone-border flex flex-col gap-2">
              <a className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-stone-border bg-slate-50 text-slate-800 font-semibold text-xs active:bg-slate-100" href="tel:+923000000000">
                <span className="material-symbols-outlined text-sm text-secondary">support_agent</span> Valley Desk: +92 300 0000000
              </a>
              <a className="w-full text-center bg-primary hover:bg-navy-deep text-white px-4 py-3 rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2 active:scale-98 transition-all" href="#support-section" onClick={() => setMobileMenuOpen(false)}>
                <span>Support Our Work</span>
                <span className="material-symbols-outlined text-sm text-secondary-fixed">arrow_forward</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* 2. CIVIC HERO SECTION (Broad Multi-Sector Mountain Stewardship) */}
      <section
        className="relative border-b border-stone-border overflow-hidden min-h-[500px] sm:min-h-[560px] md:min-h-[620px] flex items-center bg-[#FDFBF7] bg-cover bg-center sm:bg-right no-repeat"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASgRHpi7-daZLgHGgYdc0HR4PSQWy8qD_W50umPNSWW11p9l3scc1nLf_NyMoXGbditlliCwNjUgC_1e6PYi7ZOsIqOm05TcdWvIKY0U_oeumIKmDZFc6-GTDREBP2PoRMhKFy1XodrGE-ZT-1Bgr-y8yXCVklDa356zt7xr_WLKGw0R-2y8gHLUA8glm23oglsTyIjmhJi729Pcb5d9f3xEj02cWuPLs2WoMkzbw9lvGEZdHewVgSnWHPcc7b33lrRg')",
        }}
      >
        {/* Subtle overlay on mobile to ensure immaculate readability while keeping transparent look */}
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 md:py-20 w-full relative z-10">
          <div className="max-w-xl lg:max-w-2xl">
            <div className="space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/95 sm:bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-800 shadow-sm">
                <span className="material-symbols-outlined text-sm text-[#166534]">verified</span>
                <span>SECP CUIN 0348227 · Non-Profit Organization</span>
              </div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-tight sm:leading-[1.2]">
                <span className="text-[#00162d]">Empowering </span>
                <span className="text-[#166534]">Mountain Communities </span>
                <span className="text-[#00162d]">Through </span>
                <span className="text-[#2c694e]">Resilient Healthcare</span>
                <span className="text-[#00162d]">, </span>
                <span className="text-[#166534]">Sustainable Agriculture</span>
                <span className="text-[#00162d]"> &amp; </span>
                <span className="text-[#D97706]">Community Development</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Rooted in the steep valleys of District Mansehra, JCDF bridges critical life-safety gaps and builds permanent generational self-reliance for underserved rural families.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a className="inline-flex items-center justify-center gap-2 bg-[#2c694e] hover:bg-[#1e4620] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-lg transition-all shadow-md active:scale-95 duration-150 text-center" href="#work-pillars">
                  <span>Explore Our Work</span>
                  <span className="material-symbols-outlined text-sm text-[#b1f0ce]">arrow_forward</span>
                </a>
                <a className="inline-flex items-center justify-center gap-2 bg-white/95 sm:bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm px-5 py-3 rounded-lg transition-all shadow-sm text-center" href="#audit-pipeline">
                  <span className="material-symbols-outlined text-sm text-[#2c694e]">visibility</span>
                  <span>View Audit Reports</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-[11px] sm:text-xs font-semibold text-slate-700 border-t border-slate-200/80 mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#166534]">check_circle</span>
                  <span>100% Direct Allocation Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#166534]">check_circle</span>
                  <span>Zero Admin Diversion Policy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#166534]">check_circle</span>
                  <span>Public Operational Ledgers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY METRICS OF VERIFIED FIELD DATA (Fluid 2-col on Mobile/Tablet, 4-col on Desktop) */}
      <section className="py-8 sm:py-12 bg-surface-container-lowest border-b border-stone-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
            <div>
              <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-[11px]">Field Operational Verification</span>
              <h2 className="text-xl sm:text-2xl md:text-headline-md font-headline-md text-primary mt-1">Measurable Progress Across Junglan Valley</h2>
            </div>
            <div className="text-body-sm font-body-sm text-on-surface-variant max-w-md text-xs sm:text-sm">
              Field data updated on monthly accounting cycle • 100% verified against bank receipts and emergency dispatch trip logs.
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {/* Metric 1 */}
            <div className="p-4 sm:p-5 md:p-6 rounded-lg bg-surface-container-low border border-stone-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-on-surface-variant mb-2">
                  <span className="text-[10px] sm:text-xs uppercase font-label-uppercase font-semibold tracking-wide">Emergency Evacuations</span>
                  <span className="material-symbols-outlined text-secondary text-base sm:text-xl">ambulance</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-stat-display font-stat-display text-primary tracking-tight">462</div>
                <p className="text-[11px] sm:text-body-sm text-on-surface-variant mt-2 leading-snug">
                  Critical patients safely transported in 2.5 years (maternity, trauma, cardiac).
                </p>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-stone-border text-[10px] sm:text-xs text-secondary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span> Logged in Dispatch Register
              </div>
            </div>
            {/* Metric 2 */}
            <div className="p-4 sm:p-5 md:p-6 rounded-lg bg-surface-container-low border border-stone-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-on-surface-variant mb-2">
                  <span className="text-[10px] sm:text-xs uppercase font-label-uppercase font-semibold tracking-wide">Core Settlements</span>
                  <span className="material-symbols-outlined text-secondary text-base sm:text-xl">location_city</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-stat-display font-stat-display text-primary tracking-tight">4</div>
                <p className="text-[11px] sm:text-body-sm text-on-surface-variant mt-2 leading-snug">
                  Core mountain villages served continuously, plus 15+ surrounding isolated hamlets.
                </p>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-stone-border text-[10px] sm:text-xs text-secondary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">terrain</span> Hazara High-Altitude
              </div>
            </div>
            {/* Metric 3 */}
            <div className="p-4 sm:p-5 md:p-6 rounded-lg bg-surface-container-low border border-stone-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-on-surface-variant mb-2">
                  <span className="text-[10px] sm:text-xs uppercase font-label-uppercase font-semibold tracking-wide">Ambulance Unit</span>
                  <span className="material-symbols-outlined text-secondary text-base sm:text-xl">emergency</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-stat-display font-stat-display text-primary tracking-tight">1</div>
                <p className="text-[11px] sm:text-body-sm text-on-surface-variant mt-2 leading-snug">
                  Dedicated mountain unit (AMB-01, oxygen-equipped, 24/7 mountain driver).
                </p>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-stone-border text-[10px] sm:text-xs text-secondary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">check_circle</span> 100% Free for Needy
              </div>
            </div>
            {/* Metric 4 */}
            <div className="p-4 sm:p-5 md:p-6 rounded-lg bg-surface-container-low border border-stone-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-on-surface-variant mb-2">
                  <span className="text-[10px] sm:text-xs uppercase font-label-uppercase font-semibold tracking-wide">Fiduciary Audit</span>
                  <span className="material-symbols-outlined text-secondary text-base sm:text-xl">receipt_long</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-stat-display font-stat-display text-primary tracking-tight">100%</div>
                <p className="text-[11px] sm:text-body-sm text-on-surface-variant mt-2 leading-snug">
                  Transparent stewardship verified against bank receipts and field ledgers.
                </p>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-stone-border text-[10px] sm:text-xs text-secondary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">policy</span> SECP Reg. CUIN 0348227
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDATION ORIGIN & SACRED MISSION (Stacked on mobile/tablet, Side-by-side on desktop) */}
      <section className="py-12 sm:py-16 bg-surface border-b border-stone-border" id="about-origin">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* 3-Image Mosaic: Fluid and touch-friendly */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-md bg-surface-container-lowest group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    alt="Community solidarity circle of hands"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4DGxNEXGTKVcDR5tVCck46VvsrIbVtzjqA0dC-3OOfD2uKrHX1PMAnPUt0P07AzZzv4eBPGYXjH8rBwEj_4aqidk5Az2l_soTKqUtAarmn2dqG3ZUAljjmA8KKO1A7hH7onu-5ht8escwKJL_Oam0YUYSbrmkW4jkrmI-H54NKAOAXNO6cIwn6eJWSYhVm7ZTyFjhYMC8nlP2G3FSmyx8nlac07U7qEWMAXhu3gszlZanznqbRI2DRHg5l8zToY8UQw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-black/10 pointer-events-none"></div>
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-deep/80 backdrop-blur-sm text-surface text-[10px] sm:text-[11px] font-mono border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Community Solidarity &amp; Trust</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase tracking-wider font-bold">Grassroots Unity</div>
                    <div className="text-xs sm:text-sm font-semibold text-surface">Building Resilience Shoulder-to-Shoulder</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-sm bg-surface-container-lowest group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      alt="Mountain summit sunrise celebrating community silhouettes"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3u78sDhaKgTF8OjDFgHyICzixyT_yFm2xOE1M4G20bqYJuJJHwdUVHSllUsfPfGll5IJyV3yGwSGeRmQWyfVxlkxglNcU3V2ZIXETAm8ki9-M-sg07bjHeuStrOkiUzjJotEtXB2oQYrr8hw_iJf6gVaRH9iHxcAqzWCthnp87UniDQkd0e9BsX3b9RnWi0ZBl8V7yz_mt9vldIHgecJM5Zn4wZN8ziLVMUOOdAbsDF6AwUYPzkDu7jZ7gS7ItaCFjg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center gap-1 text-white text-[10px] sm:text-xs font-semibold tracking-wide">
                      <span className="material-symbols-outlined text-xs sm:text-sm text-secondary-fixed">wb_sunny</span>
                      <span>Shared Hope &amp; Vision</span>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-sm bg-surface-container-lowest group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      alt="Hazara mountain valley landscape around Junglan base camp"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG0wu9KK8XmJMR4Gn1QDN3fNhDdt4lr_7BOrMThRMNU92Gbqvv0dd4pBKVwF7Vxg2C-4yJu62XkRQ_Nb8Bv-L2HNDnbWtpb93Fkd75T-jYLNbXhFbCGY9skgJ5eL7gjCQLiKnoew1PjE3sYHCI2Lbw0tsAJRCJ67HW-pJB8P01cpBGf6KluxfNp4TgLYEKxp50g_8OxPNqMmz-zrEP0tbbU6Yhr7azVj1YTiaVYLAnhT8DP6IE25t6x8K37X02OhSDcg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center gap-1 text-white text-[10px] sm:text-xs font-semibold tracking-wide">
                      <span className="material-symbols-outlined text-xs sm:text-sm text-secondary-fixed">landscape</span>
                      <span>Junglan Valley Terrain</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Text Narrative */}
            <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5">
              <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs">Foundation Introduction &amp; Origin</span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight leading-tight">
                Rooted in Community, Dedicated to Mountain Life
              </h2>
              <div className="space-y-3 sm:space-y-4 text-on-surface-variant text-sm sm:text-body-md font-body-md leading-relaxed">
                <p>
                  Junglan Community Development Foundation was founded to bring tangible, transparent assistance to remote rural populations in Hazara Division, Khyber Pakhtunkhwa, where secondary clinical care and economic security remain beyond routine reach.
                </p>
                <p className="border-l-2 border-tertiary-container pl-3 sm:pl-4 text-on-surface font-medium bg-surface-container-lowest py-1.5 rounded-r">
                  The foundation’s inception stems from heartbreak: the founder’s brother, a bright pre-medical student, tragically lost his life following an accident because emergency transport could not reach him in time over the rugged, unpaved mountain trails.
                </p>
                <p>
                  From this irreplaceable loss arose an unwavering commitment: no family in Junglan Valley should ever bury a loved one simply because an ambulance was unavailable or unaffordable. Today, JCDF operates not only as a rapid emergency medical lifeline, but also as a civic engine establishing permanent agricultural wealth through commercial olive cultivation.
                </p>
              </div>
              {/* Institutional Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 sm:p-3.5 bg-surface-container-lowest border border-stone-border rounded-lg">
                  <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl shrink-0">account_balance</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-primary">Direct Grassroots Service</h4>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">Working shoulder-to-shoulder with village jirgas and smallholders.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 sm:p-3.5 bg-surface-container-lowest border border-stone-border rounded-lg">
                  <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl shrink-0">gavel</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-primary">Audited Governance</h4>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">Strict statutory compliance under SECP registration CUIN 0348227.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE WORK PILLARS (1 col mobile, 2 col tablet, 3 col desktop) */}
      <section className="py-12 sm:py-16 bg-surface-container-lowest border-b border-stone-border" id="work-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs">Strategic Domains</span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight mt-1">Our Three Pillars of Mountain Transformation</h2>
            <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant mt-2 sm:mt-3">
              Our initiatives balance high-priority life-saving interventions today with generational agrarian self-reliance and civic infrastructure for tomorrow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {/* Pillar 1: Emergency Healthcare & Ambulance */}
            <article className="bg-surface-container-low border border-stone-border rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-outline-variant transition-all duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#FEE2E2] text-[#991B1B] text-[11px] font-bold uppercase tracking-wider">
                    Healthcare
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#166534]"></span>
                    Active Field Service
                  </span>
                </div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-surface-container-lowest border border-stone-border flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">ambulance</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-headline-md font-headline-md text-primary tracking-tight mb-2">Emergency Ambulance &amp; Healthcare</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant mb-4 leading-relaxed">
                  24/7 life-saving emergency transit from Junglan and isolated mountain hamlets to tertiary trauma centers (Ayub Teaching Hospital Abbottabad &amp; DHQ Mansehra).
                </p>
                <ul className="space-y-2 text-xs sm:text-body-sm font-body-sm text-on-surface mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">check</span> Continuous medical oxygen regulators
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">check</span> Foldable mountain stretcher &amp; trauma kit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">check</span> 100% free for impoverished patients
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-stone-border">
                <a className="inline-flex items-center gap-2 text-primary font-semibold text-xs sm:text-body-sm hover:text-secondary transition-colors group" href="#healthcare-section">
                  <span>Explore Healthcare Operations</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </article>

            {/* Pillar 2: Sustainable Olive Agriculture */}
            <article className="bg-surface-container-low border border-stone-border rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-outline-variant transition-all duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#DCFCE7] text-[#166534] text-[11px] font-bold uppercase tracking-wider">
                    Agriculture
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#166534]"></span>
                    Active Cultivation
                  </span>
                </div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-surface-container-lowest border border-stone-border flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">eco</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-headline-md font-headline-md text-primary tracking-tight mb-2">Sustainable Olive (Zaitoon) Agriculture</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant mb-4 leading-relaxed">
                  Cultivating long-term economic independence. Distributing certified high-yield saplings suited for Hazara mountain microclimates, establishing drip irrigation and arresting soil erosion.
                </p>
                <ul className="space-y-2 text-xs sm:text-body-sm font-body-sm text-on-surface mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">check</span> 5,000+ saplings target for smallholders
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">check</span> Slope stabilization against mudslides
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">check</span> Generational recurring harvest revenue
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-stone-border">
                <a className="inline-flex items-center gap-2 text-primary font-semibold text-xs sm:text-body-sm hover:text-secondary transition-colors group" href="#agriculture-section">
                  <span>View Agriculture Program</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </article>

            {/* Pillar 3: Planned Infrastructure & Clean Water */}
            <article className="bg-surface-container-low border border-stone-border rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-outline-variant transition-all duration-200 md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#E0E7FF] text-[#3730A3] text-[11px] font-bold uppercase tracking-wider">
                    Community
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
                    PLANNED INITIATIVE
                  </span>
                </div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-surface-container-lowest border border-stone-border flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">water_drop</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-headline-md font-headline-md text-primary tracking-tight mb-2">Community Infrastructure &amp; Clean Water</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant mb-4 leading-relaxed">
                  Future civic initiatives focusing on clean drinking water filtration plants and mountain youth vocational training workshops.
                </p>
                <div className="p-3 bg-surface-container-high rounded border border-stone-border text-[11px] sm:text-xs text-on-surface-variant font-mono mb-6">
                  [Detailed engineering roadmap and community survey to be published upon validation]
                </div>
                <ul className="space-y-2 text-xs sm:text-body-sm font-body-sm text-on-surface mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-status-planned">schedule</span> Hydrological water table survey in progress
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-status-planned">schedule</span> Community hall &amp; skills workshop blueprint
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-stone-border">
                <a className="inline-flex items-center gap-2 text-primary font-semibold text-xs sm:text-body-sm hover:text-secondary transition-colors group" href="#support-section">
                  <span>View Project Roadmap</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 6. TOPOGRAPHIC REALITY & THE GEOGRAPHIC CHALLENGE */}
      <section className="py-12 sm:py-16 bg-surface border-b border-stone-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs">Geographic Challenge</span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight mt-1 leading-tight">
                Why Every Minute Matters in Hazara Division
              </h2>
              <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant mt-3 sm:mt-4 leading-relaxed">
                Junglan Valley sits at an altitude above 1,500 meters. The journey to tertiary medical facilities in Abbottabad or Mansehra traverses unpaved mountain roads frequently compromised by seasonal monsoons, rockslides, and winter snow.
              </p>
              <div className="mt-5 sm:mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    15+
                  </div>
                  <p className="text-xs sm:text-body-sm font-body-sm text-on-surface">Kilometers of high-grade slope before reaching the paved Karakoram Highway artery.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    1.5h
                  </div>
                  <p className="text-xs sm:text-body-sm font-body-sm text-on-surface">Average transfer duration to reach Ayub Teaching Hospital for cardiac or major trauma triage.</p>
                </div>
              </div>
            </div>

            {/* Visual Route Schematic Container */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-stone-border rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-border mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg sm:text-xl">alt_route</span>
                  <span className="font-bold text-primary text-sm sm:text-headline-sm">Emergency Evacuation Transit Corridor</span>
                </div>
                <span className="text-[10px] sm:text-xs bg-surface-container-high px-2 py-0.5 sm:py-1 rounded text-on-surface-variant font-mono">Hazara KP Route</span>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {/* Node 1: Junglan Valley */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-surface-container-low border border-stone-border">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-bold text-primary text-xs sm:text-body-md truncate">Junglan Valley Base Station</h4>
                      <span className="text-[10px] sm:text-xs font-semibold text-secondary">Elev: 1,520m</span>
                    </div>
                    <p className="text-[11px] sm:text-body-sm text-on-surface-variant mt-0.5">Primary fleet dispatch point; high-roof 4WD ambulance on immediate standby.</p>
                  </div>
                </div>
                {/* Route transit line */}
                <div className="pl-5 sm:pl-7 border-l-2 border-dashed border-stone-border ml-3.5 sm:ml-4 py-1 text-[11px] sm:text-xs text-on-surface-variant font-mono">
                  ↓ 12 km steep descent via unpaved hill pass (Avg: 35 mins)
                </div>
                {/* Node 2: DHQ Mansehra */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-surface-container-lowest border border-stone-border">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    B
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-bold text-primary text-xs sm:text-body-md truncate">DHQ Hospital Mansehra</h4>
                      <span className="text-[10px] sm:text-xs text-on-surface-variant">Secondary Care</span>
                    </div>
                    <p className="text-[11px] sm:text-body-sm text-on-surface-variant mt-0.5">Emergency stabilization, pediatric intervention, uncomplicated delivery.</p>
                  </div>
                </div>
                {/* Route transit line */}
                <div className="pl-5 sm:pl-7 border-l-2 border-dashed border-stone-border ml-3.5 sm:ml-4 py-1 text-[11px] sm:text-xs text-on-surface-variant font-mono">
                  ↓ 24 km highway transit towards Abbottabad (Avg: 40 mins)
                </div>
                {/* Node 3: Ayub Teaching Hospital */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-primary-container text-surface">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-xs font-bold shrink-0">
                    C
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-bold text-surface text-xs sm:text-body-md truncate">Ayub Teaching Hospital Abbottabad</h4>
                      <span className="text-[10px] sm:text-xs font-semibold text-secondary-fixed">Tertiary Trauma Center</span>
                    </div>
                    <p className="text-[11px] sm:text-body-sm text-on-primary-container mt-0.5">Major surgical theater, intensive care unit (ICU), comprehensive neonatal care.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENCY & 4-STEP AUDIT PIPELINE (1 col mobile, 2 col tablet, 4 col desktop) */}
      <section className="py-12 sm:py-16 bg-surface-container-lowest border-b border-stone-border" id="audit-pipeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs">Absolute Accountability</span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight mt-1 leading-tight">How Your Support Directly Reaches the Field</h2>
              <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant mt-2 max-w-xl leading-relaxed">
                We operate under a strict fiduciary mandate: zero diversion, itemized disbursements, and monthly reconciliation against verifiable bank accounts.
              </p>
            </div>
            <div className="bg-surface-container-low border border-stone-border p-3 sm:p-4 rounded-lg flex items-center gap-3 self-start md:self-auto">
              <span className="material-symbols-outlined text-secondary text-2xl sm:text-3xl shrink-0">verified_user</span>
              <div>
                <div className="text-xs font-bold text-primary uppercase">Direct Allocation Guarantee</div>
                <div className="text-[11px] sm:text-xs text-on-surface-variant">100% of public gifts fund fuel, oxygen &amp; saplings.</div>
              </div>
            </div>
          </div>

          {/* 4-Step Verified Audit Pipeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Step 01 */}
            <div className="bg-surface-container-low border border-stone-border rounded-lg p-4 sm:p-5 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-stat-display text-2xl sm:text-headline-md text-secondary">01</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-surface-container-lowest border border-stone-border text-on-surface-variant font-semibold">Verified Step</span>
                </div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary mb-1">Your Donation</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Direct bank transfer or online gift allocated to mountain ambulance fuel or certified olive saplings.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-surface-container-low border border-stone-border rounded-lg p-4 sm:p-5 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-stat-display text-2xl sm:text-headline-md text-secondary">02</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-surface-container-lowest border border-stone-border text-on-surface-variant font-semibold">Verified Step</span>
                </div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary mb-1">Central Ledger Logging</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Contribution logged into public audit ledger with formal receipt number under SECP guidelines.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-surface-container-low border border-stone-border rounded-lg p-4 sm:p-5 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-stat-display text-2xl sm:text-headline-md text-secondary">03</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-surface-container-lowest border border-stone-border text-on-surface-variant font-semibold">Verified Step</span>
                </div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary mb-1">Field Execution</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Disbursements purchase medical oxygen, vehicle maintenance, and certified saplings in Junglan.
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-surface-container-low border border-stone-border rounded-lg p-4 sm:p-5 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-stat-display text-2xl sm:text-headline-md text-secondary">04</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-surface-container-lowest border border-stone-border text-on-surface-variant font-semibold">Verified Step</span>
                </div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary mb-1">Saved Lives &amp; Orchards</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Critical patients reach ICUs in time, and smallholders harvest commercial grade olives for decades.
                </p>
              </div>
            </div>
          </div>

          {/* Operational Gap Callout Card */}
          <div className="mt-6 sm:mt-8 bg-surface-container-low border-l-4 border-status-planned border-stone-border rounded-r-xl p-4 sm:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-status-planned mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Critical Operational Reality
                </div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary">Closing the Single-Vehicle Mountain Risk</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant max-w-3xl mt-1 leading-relaxed">
                  Currently, AMB-01 serves as the sole dedicated life-support unit for multiple isolated hamlets. When AMB-01 is en route to Abbottabad (a 3.5-hour round trip), a simultaneous medical emergency in Junglan must wait. Your donor partnership directly funds operational reserves to ensure uninterrupted field readiness.
                </p>
              </div>
              <a className="w-full sm:w-auto text-center shrink-0 px-4 py-2.5 bg-primary hover:bg-navy-deep text-white rounded text-xs sm:text-label-md font-semibold transition-colors" href="#support-section">
                Help Fund Reserve Ops
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DETAILED SECTION: EMERGENCY HEALTHCARE & AMBULANCE FLEET (Stacked on mobile/tablet, side-by-side on desktop) */}
      <section className="py-12 sm:py-16 bg-surface border-b border-stone-border" id="healthcare-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-label-uppercase font-label-uppercase text-error uppercase tracking-wider font-bold text-xs">Healthcare &amp; Emergency Service</span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight leading-tight">
                High-Altitude Relief: Free 24/7 Mountain Patient Transit
              </h2>
              <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant leading-relaxed">
                In the steep terrain of Junglan and surrounding valleys, delays in reaching secondary and tertiary healthcare facilities can be fatal. Our emergency ambulance operates 24 hours a day to evacuate critical patients to Ayub Teaching Hospital Abbottabad and DHQ Hospital Mansehra.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 bg-surface-container-lowest border border-stone-border rounded-lg">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                    <span className="material-symbols-outlined text-secondary text-base sm:text-lg">ecg_heart</span>
                    24/7 Driver &amp; Paramedic
                  </div>
                  <p className="text-xs sm:text-body-sm text-on-surface-variant">Dedicated local driver trained in high-altitude night transit and patient handling.</p>
                </div>
                <div className="p-3.5 sm:p-4 bg-surface-container-lowest border border-stone-border rounded-lg">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                    <span className="material-symbols-outlined text-secondary text-base sm:text-lg">vital_signs</span>
                    Medical Oxygen Onboard
                  </div>
                  <p className="text-xs sm:text-body-sm text-on-surface-variant">Equipped with continuous medical oxygen cylinders and pediatric masks.</p>
                </div>
                <div className="p-3.5 sm:p-4 bg-surface-container-lowest border border-stone-border rounded-lg">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                    <span className="material-symbols-outlined text-secondary text-base sm:text-lg">airline_seat_flat</span>
                    Mountain Stretcher Kit
                  </div>
                  <p className="text-xs sm:text-body-sm text-on-surface-variant">Reinforced suspension and cervical collar trauma kit for rugged rock paths.</p>
                </div>
                <div className="p-3.5 sm:p-4 bg-surface-container-lowest border border-stone-border rounded-lg">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                    <span className="material-symbols-outlined text-secondary text-base sm:text-lg">money_off</span>
                    Zero Patient Cost
                  </div>
                  <p className="text-xs sm:text-body-sm text-on-surface-variant">Strictly free of charge for impoverished mountain families, 100% donor subsidized.</p>
                </div>
              </div>
              <div className="pt-2">
                <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-tertiary-container hover:bg-tertiary text-white px-5 py-3 rounded-lg font-bold text-xs sm:text-label-md transition-colors text-center" href="tel:+923000000000">
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>Emergency Dispatch Hotline (+92 300 0000000)</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest border border-stone-border rounded-xl p-4 sm:p-5 shadow-md space-y-3 sm:space-y-4 relative group">
                <div className="relative rounded-lg overflow-hidden border-2 border-stone-border aspect-[4/3] shadow-sm ring-1 ring-black/5">
                  <img
                    alt="JCDF 4x4 Mountain Ambulance - 4 Villages. 3000 People. 1 Ambulance. No Backup."
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmr4hKb_HMqDutGRELVHRK7j89DaIvsEthZp5-fJdMBVwROwIgOuZYA5WEHlG41SF7mGafYqqzWDp4K0A7ktcaEA1nh_U8oMJ6Q26FRclxNUsW8wdq_zsHyI5XN-lTLKmqS7KuO4CBp_FuehuiRsRSOPVHsTfVrMKoWTck0cpCSJHGzdwAbOkoDrPtjpA5RYnerz704865uev-63yuMjC-1QmEVk9w1BmKvkgxzI896HR74RG34VKYhjGrP0YmboPDWQ"
                  />
                  <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-deep/80 backdrop-blur-sm text-surface text-[10px] sm:text-[11px] font-mono border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>AMB-01 Active Service</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-primary text-[10px] font-mono font-bold border border-stone-border shadow-sm">
                    Hazara Corridor
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-navy-deep/90 backdrop-blur-sm text-surface p-2.5 sm:p-3 rounded-lg flex items-center justify-between border border-white/10 shadow-sm">
                    <div>
                      <div className="text-[10px] sm:text-xs text-on-primary-container uppercase font-label-uppercase tracking-wider">Headquarters</div>
                      <div className="text-xs sm:text-sm font-bold text-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-secondary-fixed">pin_drop</span>Junglan Base Camp
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] sm:text-xs text-secondary-fixed font-semibold">Elev: 1,520m</div>
                      <div className="text-[10px] sm:text-[11px] text-surface-container-high">District Mansehra</div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low border border-stone-border rounded-lg p-3 sm:p-3.5 flex items-center justify-between shadow-sm gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-base sm:text-lg">medical_services</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs font-label-uppercase text-on-surface-variant uppercase tracking-wider truncate">Emergency Dispatch Desk</div>
                      <div className="text-xs sm:text-sm font-bold text-primary truncate">AMB-01 Mountain Standby</div>
                    </div>
                  </div>
                  <a className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-tertiary-container hover:bg-tertiary text-white rounded text-xs font-bold transition-colors shadow-sm shrink-0" href="tel:+923000000000">
                    <span className="material-symbols-outlined text-xs sm:text-sm">phone_in_talk</span>
                    <span>Dial</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DETAILED SECTION: SUSTAINABLE OLIVE AGROFORESTRY (Stacked on mobile/tablet, Side-by-side on desktop) */}
      <section className="py-12 sm:py-16 bg-surface-container-lowest border-b border-stone-border" id="agriculture-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-surface-container-low border border-stone-border rounded-xl p-4 sm:p-5 shadow-sm">
                <div className="relative rounded-lg overflow-hidden border border-stone-border aspect-[4/3] mb-3 sm:mb-4">
                  <img
                    alt="Hazara Mountain Valley Olive Terrace"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG0wu9KK8XmJMR4Gn1QDN3fNhDdt4lr_7BOrMThRMNU92Gbqvv0dd4pBKVwF7Vxg2C-4yJu62XkRQ_Nb8Bv-L2HNDnbWtpb93Fkd75T-jYLNbXhFbCGY9skgJ5eL7gjCQLiKnoew1PjE3sYHCI2Lbw0tsAJRCJ67HW-pJB8P01cpBGf6KluxfNp4TgLYEKxp50g_8OxPNqMmz-zrEP0tbbU6Yhr7azVj1YTiaVYLAnhT8DP6IE25t6x8K37X02OhSDcg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-center">
                  <div className="p-2.5 sm:p-3 bg-surface-container-lowest rounded border border-stone-border">
                    <div className="text-xl sm:text-2xl md:text-headline-md font-stat-display text-secondary">5,000+</div>
                    <div className="text-[10px] sm:text-xs text-on-surface-variant uppercase font-label-uppercase">Saplings Targeted</div>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-surface-container-lowest rounded border border-stone-border">
                    <div className="text-xl sm:text-2xl md:text-headline-md font-stat-display text-secondary">50+</div>
                    <div className="text-[10px] sm:text-xs text-on-surface-variant uppercase font-label-uppercase">Farmers Enrolled</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 order-1 lg:order-2">
              <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider font-bold text-xs">Sustainable Agroforestry</span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight leading-tight">
                Cultivating Generational Self-Reliance Through Olive Farming
              </h2>
              <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant leading-relaxed">
                Pakistan possesses ideal soil and climate conditions for high-quality commercial olive cultivation. JCDF equips smallholder mountain farmers with certified saplings, modern drip irrigation training, and ongoing agronomic mentorship.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg sm:text-xl shrink-0 mt-0.5">park</span>
                  <div>
                    <h4 className="font-bold text-primary text-sm sm:text-base">Commercial Variety Seedlings</h4>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">Supplying certified, climate-resilient olive saplings specifically suited to the micro-climate and altitude of Hazara Division.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg sm:text-xl shrink-0 mt-0.5">water_drop</span>
                  <div>
                    <h4 className="font-bold text-primary text-sm sm:text-base">Modern Drip Irrigation Training</h4>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">Training local farmers in high-efficiency water management, mountain rain harvesting, and organic pest protection.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg sm:text-xl shrink-0 mt-0.5">landscape</span>
                  <div>
                    <h4 className="font-bold text-primary text-sm sm:text-base">Environmental Slope Stabilization</h4>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">Deep-root olive root systems anchor fragile terraced hillsides against catastrophic monsoonal soil erosion and mudslides.</p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <a className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-label-md hover:text-secondary transition-colors" href="#support-section">
                  <span>Sponsor Certified Olive Saplings for Smallholders</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. COMMUNITY ENGAGEMENT & DONATION INQUIRY CTA */}
      <section className="py-12 sm:py-16 bg-navy-deep text-surface relative overflow-hidden" id="support-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 bg-primary-container rounded-full text-secondary-fixed text-[11px] sm:text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>100% Transparent Financial Stewardship • SECP CUIN 0348227</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-surface tracking-tight leading-tight">
              Join Us in Building a Healthier, More Resilient Mountain Community
            </h2>
            <p className="text-sm sm:text-base md:text-body-lg text-on-primary-container leading-relaxed">
              Your generous partnership fuels emergency ambulance runs across mountain passes and sponsors certified olive saplings that break the cycle of rural poverty permanently.
            </p>
            {/* Direct Channel Contact Cards: Stack on mobile, 2-col on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left my-6 sm:my-8">
              <div className="p-3.5 sm:p-4 rounded-lg bg-primary-container/60 border border-stone-border/20 backdrop-blur-sm">
                <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase mb-1">Ambulance Operations &amp; Inquiries</div>
                <div className="font-bold text-surface text-sm sm:text-base">+92 301 6541825 / +92 300 0000000</div>
                <div className="text-[11px] sm:text-xs text-on-primary-container mt-1">Direct Field Desk • Junglan Base</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-lg bg-primary-container/60 border border-stone-border/20 backdrop-blur-sm">
                <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase mb-1">International Donor Desk (WhatsApp)</div>
                <div className="font-bold text-surface text-sm sm:text-base">+49 171 5114247</div>
                <div className="text-[11px] sm:text-xs text-on-primary-container mt-1">Direct Accounting &amp; Transparency Verification</div>
              </div>
            </div>
            {/* Action CTAs: full-width on mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-white hover:bg-secondary/90 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-xs sm:text-label-md font-semibold transition-all shadow-md active:scale-95" href="mailto:info@junglanfoundation.org?subject=Support%20JCDF%20Initiative">
                <span className="material-symbols-outlined text-sm">send</span>
                <span>Connect with Foundation Desk</span>
              </a>
              <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-surface hover:bg-primary-container/80 border border-stone-border/30 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-xs sm:text-label-md font-semibold transition-all active:scale-95" href="#audit-pipeline">
                <span className="material-symbols-outlined text-sm">receipt_long</span>
                <span>Request Bank Transfer Details</span>
              </a>
            </div>
            <p className="text-[11px] sm:text-xs text-on-primary-container pt-1 sm:pt-2">
              Every contribution is acknowledged with an official foundation receipt and entered into the central public ledger.
            </p>
          </div>
        </div>
      </section>

      {/* 11. FOOTER (Multi-column responsive grid: 1 col on mobile, 2 col on tablet, 4 col on desktop) */}
      <footer className="bg-navy-deep text-surface border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Foundation Brand & CUIN Column */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-3 sm:space-y-4">
              <div className="inline-block">
                <img
                  alt="Junglan Community Development Foundation Logo"
                  className="h-11 sm:h-13 w-auto max-w-[220px] sm:max-w-[260px] object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlQqg-SoIPZbM-4ur-7V4Or5IX0kG183067aWfQ0hbKTbig2vPjgDV_y1hvmUqrWVkKqvFv2qxO6xTOiaIKtQiYXJcbNJq1roECkpu6ORlq1RUFQgOtSb9AhaoUH7mxLSPNlAlLI5__cG6DOvt6OeY1qXN69L2ftSuBmA-9YXy8ivDmhlcxhED3rPKRDJdoPGFi4Wy2ED7L5fsUBQ3eUSAXtYPBq9SUp_ooTv6-fKeTwsD2WnM6sa-fAMXVAx7At1lfA"
                />
              </div>
              <p className="text-slate-300 text-xs sm:text-body-sm leading-relaxed max-w-sm">
                Junglan Community Development Foundation is a non-profit registered under the laws of Pakistan with the Securities and Exchange Commission of Pakistan (SECP CUIN: 0348227).
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-secondary-fixed border border-white/10 text-xs font-mono font-bold">
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
                  <a className="hover:text-white transition-colors flex items-center gap-2 py-0.5" href="#healthcare-section">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">arrow_forward</span> Emergency Dispatch
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2 py-0.5" href="#healthcare-section">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">arrow_forward</span> Healthcare &amp; Ambulance
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2 py-0.5" href="#agriculture-section">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">arrow_forward</span> Olive Agroforestry
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2 py-0.5" href="#work-pillars">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">arrow_forward</span> Planned Infrastructure
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
                  <a className="hover:text-white transition-colors flex items-center gap-2 text-xs py-0.5" href="#audit-pipeline">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">description</span> Audit Pipeline &amp; Field Records
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2 text-xs py-0.5" href="#about-origin">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">gavel</span> SECP Governance Framework
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2 text-xs py-0.5" href="#audit-pipeline">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">verified_user</span> Financial Transparency Pledge
                  </a>
                </li>
                <li className="pt-2 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
                  <span className="block text-slate-400 font-label-uppercase uppercase text-[10px] tracking-wider mb-0.5">Valley Desk Location:</span>
                  Junglan Base Camp, Tehsil Baffa Pakhal, Mansehra, KP, Pakistan
                </li>
                <li className="text-xs text-slate-300">
                  <span className="block text-slate-400 font-label-uppercase uppercase text-[10px] tracking-wider mb-0.5">Emergency Triage Line:</span>
                  <a className="font-mono font-bold text-white hover:text-secondary-fixed transition-colors" href="tel:+923000000000">+92 300 0000000</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-white/10 py-5 bg-navy-deep/80 text-[11px] sm:text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="leading-relaxed">
              © 2026 Junglan Community Development Foundation (JCDF). All rights reserved. Registered under SECP CUIN 0348227.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
              <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
              <span>•</span>
              <a className="hover:text-white transition-colors" href="#">Terms of Operations</a>
              <span>•</span>
              <a className="hover:text-white transition-colors" href="#">SECP Filings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
