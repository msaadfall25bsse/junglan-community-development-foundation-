"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const CAROUSEL_SLIDES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIJjfuvu_5BDrXzibHwZeM09BnRU0T92H6dr19spscxkRRWTweJw2YEQ_9X5IBDU4fkKmz1jIkUnG62P9__-OkMt-LIphyBDUi9dJ-C-D93V6UL6z_N2kxlW8XcWDXtjprcF7MCYdjpljkiAQo0jS1gXS6qVjW-95hjqB3eYCWhXqt7NAp4ZUQlV6B1FAO3ctSoi2oEILo3o4W7RBkrTTPs3RZ8QGDYbPhfNxc9sdB0fxHNhfDFdF14P6UOsH1lu-OQ",
    alt: "Senior community elder and trustee in white attire",
    position: "center 20%",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfrtPZUeWYwOaejvDNXK1RbtEClkEivKM0Pds8FiqxupTeDmVhhNZaIfRZFJgwPINtEO6y0CKnBkirVtGbgLLjWxV8H1d1YXVlsRLxMy36dg-kVMkjTcWntraVfk2hYb3SiXL0R7nRQ45017Xn3ABr9n5TJPY5ZDb4irgzSZi6Y2ivNdEvlp1rWdTdIXDB-ryaTLOPxZGcZQUUWl4wECToZvb2FwrlOskXAPtkbBBFDW0wABZ63rMdBF6H2XelDHuTfA",
    alt: "Foundation leader and representative in light blue waistcoat",
    position: "center 20%",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKeq26xvxwo2QtsXHflibW5xFM2DAIIwjdwIcTGMiAUxSizwq63f2Gs4SIeeCXO79D43R6i-OaLM2vT7GEAzUj0Ejolc3OVigk_flLY3g0zb7APuHdOHjKmQ7SCtxi5KIilMlxDMDBNJgOxRwC14zOagAIPxJ8OwJE5rdDVLwJOBYquoDihbqlyoDNap1POQS47sk6d_Z2n_kDc8j17UkgJYk2ksrOyOVH-JVZlo2mWny2ArSsyU8Mo2mhb23v-ADT-g",
    alt: "Community organizer and field coordinator in dark kurta",
    position: "center 15%",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEFb0ZrzPGAVjexScciwPVSS1V_K2wIzKgpe112YxYcm-2EFRTSxia27J0hs2XTXcj1P9_D57fYXrsoL06CA0fPlndJDY7nhJQopXPRBBeGa3caW9O34QMR3egT5Ptz0dVSr4kI1WGJwPAITbz1bNUxdPqODdqePJZV_T84gavAzaKzBJz0qx5xG7E5OJy2AgtIPUBt1UF4nrGpoqOg8nB7FVN_XgkqEbJ6x4cIqRWWpIqaGfQJiLtS0NzF0t4Llz_w",
    alt: "Executive trustee in dark suit and white pocket square",
    position: "center 18%",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO07-lJpXB8LcJ5GS7jqJwmG6BTBIbeAzSs1FEtAdrOXJHEN-R5eXTp-DkQm31W0ddnNfl8lxn_DAfmeWLVh4SDSWpPTuzvvp212D17TeyitPb5ZOjLluQvq6LI06q4gxZzcGhwNiQnt8hCQNyxdMAUud_Dt8U1aMvrRgWH591uPzCFuqiM1t1okqQ9-Sw-SwKeB26qZVNKzQua1_k35rt2H8XRZbESfA9Bbi56yae9bsjwT_-lFU6ue9RhDlfP_hRRg",
    alt: "Dedicated foundation trustee and senior director in white shirt",
    position: "center center",
  },
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  return (
    <div className="bg-stone-white text-on-surface font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* IDENTICAL HOME PAGE HEADER BAR & NAVIGATION */}
      <header className="sticky top-0 z-50 transition-all bg-white shadow-sm border-b border-stone-border">
        {/* Utility Bar: Dark Slate/Navy with Standby Status and Direct Field Audits */}
        <div className="bg-navy-deep text-surface text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10">
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
                <span className="material-symbols-outlined text-xs text-secondary-fixed">location_on</span> Base Camp Junglan (Elev. 1,520m)
              </span>
              <span className="text-slate-300 font-mono text-[11px] inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-secondary-fixed">verified</span> SECP CUIN: 0348227
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono ml-auto">
              <span className="text-slate-300 hidden md:inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% Direct Field Audits
              </span>
              <a className="text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 font-bold" href="tel:+923000000000">
                <span className="material-symbols-outlined text-xs text-[#ff545c]">emergency</span> Valley Hotline: <span className="text-white font-mono">+92 300 0000000</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="bg-white border-b border-stone-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <Link aria-label="Junglan Community Development Foundation Home" className="flex items-center group shrink-0" href="/">
              <img
                alt="Junglan Community Development Foundation (JCDF) Official Logo"
                className="h-12 sm:h-14 w-auto max-w-[240px] sm:max-w-[300px] object-contain cursor-pointer transition-transform group-hover:scale-[1.01]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfLIhBDEF3RoiI1s2zpVRFpNKOApn3SiSFIrx0Nn4nMcKtZ8OVhg2pCB6pcQW45Jzua3AlgGxOUaeSJjJ_MoZDirEs8Vl9gozc9fMCDdMpm6JoBdHe3VvQ2bUWgLgz83PIzp5gDuC5BeWfC4IJU5Nuo6HDoQp59oFgU1expxOO2pRiP-ByGLeX4DPK5BMiwBHEBLyCz_v-ivg8RUcx3jp4d8cfSed4VpKd81yebyM0pvSB2Sa-NDy6mnvNJ59944DNxQ"
              />
            </Link>

            {/* Desktop Navigation Links (with About Us highlighted) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
              <Link className="text-slate-600 hover:text-primary transition-colors py-1" href="/">Home</Link>
              <Link className="font-bold text-primary border-b-2 border-primary pb-1 pt-1 transition-colors" href="/about">About Us</Link>
              <Link className="text-slate-600 hover:text-primary transition-colors py-1" href="/our-work">Our Work</Link>
              <a className="text-slate-600 hover:text-primary transition-colors py-1" href="/our-work#ambulance">Healthcare &amp; Ambulance</a>
              <a className="text-slate-600 hover:text-primary transition-colors py-1" href="/our-work#agriculture">Agriculture</a>
              <a className="text-slate-600 hover:text-primary transition-colors py-1 flex items-center gap-1" href="/#audit-pipeline">
                <span className="material-symbols-outlined text-sm text-secondary">verified</span> Impact &amp; Audits
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <a className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-border bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-sm" href="tel:+923000000000">
                <span className="material-symbols-outlined text-sm text-secondary">support_agent</span> Valley Desk
              </a>
              <a className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-navy-deep text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 duration-150" href="#support">
                <span>Support Our Work</span>
                <span className="material-symbols-outlined text-sm text-secondary-fixed">arrow_forward</span>
              </a>
              <button
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-stone-border"
                id="mobile-menu-btn"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? "close" : "menu"}</span>
              </button>
            </div>
          </div>

          {/* Mobile Nav Dropdown */}
          <nav
            className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden flex-col gap-1 px-4 py-3 border-t border-slate-200 bg-surface-container-lowest`}
            id="mobile-nav-menu"
          >
            <Link className="px-3 py-2 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium" href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link className="px-3 py-2 rounded-lg bg-surface-container-low text-primary font-bold text-sm" href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link className="px-3 py-2 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium" href="/our-work" onClick={() => setMobileMenuOpen(false)}>Our Work</Link>
            <a className="px-3 py-2 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium" href="/our-work#ambulance" onClick={() => setMobileMenuOpen(false)}>Healthcare &amp; Ambulance</a>
            <a className="px-3 py-2 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium" href="/our-work#agriculture" onClick={() => setMobileMenuOpen(false)}>Agriculture</a>
            <a className="px-3 py-2 rounded-lg text-slate-700 hover:bg-surface-container-low text-sm font-medium flex items-center justify-between" href="/#audit-pipeline" onClick={() => setMobileMenuOpen(false)}>
              <span>Impact &amp; Audits</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">100% Audited</span>
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-stone-border bg-slate-50 text-slate-800 font-semibold text-xs" href="tel:+923000000000">
                <span className="material-symbols-outlined text-sm text-secondary">support_agent</span> Valley Desk: +92 300 0000000
              </a>
              <a className="w-full text-center bg-primary hover:bg-navy-deep text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2" href="#support" onClick={() => setMobileMenuOpen(false)}>
                <span>Support Our Work</span>
                <span className="material-symbols-outlined text-sm text-secondary-fixed">arrow_forward</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* SECTION 1: ABOUT US HERO SECTION */}
        <section className="relative bg-surface-container-lowest border-b border-stone-border overflow-hidden py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Narrative Left Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-stone-border mb-4">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                    ABOUT JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary mb-6 tracking-tight font-extrabold">
                  Working Together for Stronger Communities
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                  Junglan Community Development Foundation works to address community needs through essential services and local development initiatives. Our areas of work include patient transportation support, agriculture, and future development initiatives designed around community priorities.
                </p>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <a className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-label-md text-label-md hover:bg-navy-deep shadow-sm transition-all" href="#areas-of-work">
                    <span>Explore Our Work</span>
                    <span className="material-symbols-outlined ml-1.5 text-[18px]">arrow_forward</span>
                  </a>
                  <a className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-stone-border bg-stone-white text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors" href="#contact">
                    <span className="material-symbols-outlined mr-1.5 text-[18px]">mail</span>
                    <span>Contact Us</span>
                  </a>
                </div>
                {/* Operational Pillar Highlights */}
                <div className="grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-stone-border w-full">
                  <div>
                    <p className="font-headline-md text-headline-md text-secondary font-bold">100%</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Community-Centered</p>
                  </div>
                  <div>
                    <p className="font-headline-md text-headline-md text-primary font-bold">24/7</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Patient Transport</p>
                  </div>
                  <div>
                    <p className="font-headline-md text-headline-md text-primary font-bold">Hazara</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Khyber Pakhtunkhwa</p>
                  </div>
                </div>
              </div>

              {/* Visual Right Column */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-xl overflow-hidden border border-stone-border bg-surface-container shadow-md">
                  <img
                    alt="High-altitude mountain valley terrain and forested hills in District Mansehra, KP, Pakistan"
                    className="w-full h-80 md:h-[420px] object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpPxGP3Zx33RQ7YxHrDp_lnqzGB7EoFqbj-_eqEueYGOmy2ZxYbzo1h48XQ9ocwq2r6F5x7jGyTYVrja3CWWNSbpqaLqqlHAVn3T28U-xg6pURrnSE7k_E4vOGDNv77WHwsTwuJjg4Dvc1JNYdpgTjzXiXsWYicb9Y7lH2-MomT_BWRGI4ZSun4WDRkpvBnmt76mHfMr1USXKE09icz5U_St7jkGMc4-nt8JEduTFDRqB-RqaUHqvdAPPKuMavugKQGg"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent text-surface">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                      <span className="font-label-uppercase text-label-uppercase text-secondary-fixed tracking-wider">GEOGRAPHIC BASE</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-inverse-on-surface">
                      Remote Mountain Hamlets • District Mansehra, KP, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHO WE ARE (TWO-COLUMN EDITORIAL WITH IMAGE CAROUSEL) */}
        <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Narrative Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 text-secondary mb-2">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                  <span className="font-label-uppercase text-label-uppercase tracking-wider">CIVIC FOUNDATION OVERVIEW</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6 tracking-tight">
                  Who We Are
                </h2>
                <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  <p>
                    Junglan Community Development Foundation is a registered non-profit foundation established to work alongside local communities to address everyday challenges through practical, community-oriented solutions. Founded on principles of responsibility, cooperation, and long-term community well-being, the foundation aims to serve as a reliable platform for local initiatives.
                  </p>
                  <p>
                    We recognize that remote and rural communities often face unique difficulties in accessing healthcare transportation, developing productive agricultural opportunities, and building long-term community infrastructure. JCDF exists to understand these realities and help bridge gaps through focused, accountable, and transparent action.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-stone-border w-full">
                  <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>Community-Led Priority Setting</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>Non-Profit Institutional Stewardship</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>Provincial Regulatory Compliance</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Carousel Column */}
              <div className="lg:col-span-5 relative">
                <div
                  className="relative rounded-2xl overflow-hidden border border-stone-border bg-surface-container shadow-md group h-[420px] sm:h-[460px] md:h-[500px] select-none"
                  id="who-we-are-carousel"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Carousel Slides Container */}
                  <div className="relative w-full h-full">
                    {CAROUSEL_SLIDES.map((slide, index) => {
                      const isActive = index === currentSlide;
                      return (
                        <div
                          key={index}
                          className={`carousel-slide absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                          }`}
                        >
                          <img
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: slide.position }}
                            src={slide.src}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Gradient Overlay & Caption Badge */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-navy-deep/90 via-navy-deep/50 to-transparent text-surface z-20 pointer-events-none flex flex-col justify-end">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                        <span className="font-label-uppercase text-label-uppercase text-secondary-fixed tracking-wider">COMMUNITY LEADERSHIP</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/70 border border-white/10 text-[10px] font-label-uppercase text-inverse-on-surface tracking-wider">
                        {currentSlide + 1} of {CAROUSEL_SLIDES.length}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-inverse-on-surface font-medium">
                      JCDF Leadership &amp; Field Stewards • Hazara Division
                    </p>
                  </div>

                  {/* Navigation Arrow: Previous */}
                  <button
                    aria-label="Previous leadership photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm border border-white/10 transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none"
                    type="button"
                    onClick={prevSlide}
                  >
                    <span className="material-symbols-outlined text-[20px] block">chevron_left</span>
                  </button>

                  {/* Navigation Arrow: Next */}
                  <button
                    aria-label="Next leadership photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm border border-white/10 transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none"
                    type="button"
                    onClick={nextSlide}
                  >
                    <span className="material-symbols-outlined text-[20px] block">chevron_right</span>
                  </button>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-16 sm:bottom-16 inset-x-0 z-30 flex items-center justify-center gap-1.5 pointer-events-auto">
                    {CAROUSEL_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`carousel-dot w-2 h-2 rounded-full transition-all duration-300 ${
                          i === currentSlide
                            ? "bg-secondary-fixed shadow-[0_0_8px_rgba(177,240,206,0.8)]"
                            : "bg-white/40 hover:bg-white/70"
                        }`}
                        type="button"
                        onClick={() => setCurrentSlide(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHY WE WORK (OUR PURPOSE) */}
        <section className="py-14 md:py-18 bg-surface-container-lowest border-b border-stone-border">
          <div className="max-w-4xl mx-auto px-margin-sm md:px-margin text-center">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">
              OUR DRIVING PURPOSE
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6">
              Why We Work
            </h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed space-y-4 text-left md:text-center">
              <p>
                Rural and mountain valleys possess tremendous resilience, proud cultural traditions, and hardworking people. However, rugged geography, steep mountain tracks, and distance from major urban centers frequently create critical bottlenecks in accessing timely emergency medical transport and realizing the full potential of local land stewardship.
              </p>
              <p className="font-body-md text-body-md text-outline">
                We work because every family in our valley deserves safe, dignity-preserving transit in times of acute medical distress, sustainable agricultural avenues that bring long-term income, and well-planned community development that respects local autonomy.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: MISSION & VISION */}
        <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-wider block mb-1">
                  FOUNDATIONAL GUIDELINES
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
                  Mission &amp; Vision
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-stone-border text-outline text-[12px] font-medium">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Suggested website wording for JCDF community review
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Mission Card */}
              <div className="bg-surface-container-lowest border border-stone-border rounded-xl p-8 shadow-sm flex flex-col justify-between hover:border-secondary transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-6">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold mb-3">
                    Our Mission
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    “To support community well-being by working on essential service access and local development priorities through practical, community-focused initiatives.”
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-stone-border flex items-center justify-between text-body-sm text-outline">
                  <span>Operational Anchor</span>
                  <span className="font-semibold text-secondary">Action-Oriented</span>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-surface-container-lowest border border-stone-border rounded-xl p-8 shadow-sm flex flex-col justify-between hover:border-primary transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold mb-3">
                    Our Vision
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    “A stronger and more resilient community where people can access essential support and benefit from sustainable development opportunities.”
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-stone-border flex items-center justify-between text-body-sm text-outline">
                  <span>Long-Term Horizon</span>
                  <span className="font-semibold text-primary">Generational Impact</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CORE VALUES */}
        <section className="py-16 md:py-20 bg-surface-container-lowest border-b border-stone-border">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1">
                GUIDING PRINCIPLES
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-3">
                Core Values: The Principles Behind Our Work
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                These four foundational pillars govern how we allocate resources, communicate with families, and conduct our daily community operations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Value 1 */}
              <div className="border border-stone-border rounded-xl p-6 bg-stone-white hover:bg-surface-container-lowest transition-all hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-[24px]">diversity_3</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Community Focus
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Recognizing local needs and prioritizing community-relevant work that directly improves everyday mountain life.
                </p>
              </div>

              {/* Value 2 */}
              <div className="border border-stone-border rounded-xl p-6 bg-stone-white hover:bg-surface-container-lowest transition-all hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Responsibility
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Clear communication, ethical governance, and responsible stewardship of all donor and communal resources.
                </p>
              </div>

              {/* Value 3 */}
              <div className="border border-stone-border rounded-xl p-6 bg-stone-white hover:bg-surface-container-lowest transition-all hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-[24px]">handshake</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Cooperation
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Constructive, respectful cooperation with community members, elders, administrative authorities, and local stakeholders.
                </p>
              </div>

              {/* Value 4 */}
              <div className="border border-stone-border rounded-xl p-6 bg-stone-white hover:bg-surface-container-lowest transition-all hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-[24px]">eco</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Sustainable Development
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Fostering long-term community resilience through regenerative agroforestry and practical economic opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: WHAT WE WORK ON (OUR AREAS OF WORK) */}
        <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border" id="areas-of-work">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1">
                  PORTFOLIO OF ACTION
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
                  What We Work On: Our Areas of Work
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                Our initiatives are structured across three pragmatic pillars designed to address immediate frontline safety and sustained regional prosperity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Pillar 1: Healthcare & Ambulance */}
              <div className="bg-surface-container-lowest border border-stone-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-outline transition-colors">
                <div>
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-uppercase font-label-uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span>
                        ACTIVE SERVICE
                      </span>
                      <span className="material-symbols-outlined text-primary text-[22px]">medical_services</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                      Ambulance &amp; Healthcare Support
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Dedicated mountain patient transportation facilitating emergency transit from high-altitude hamlets down to secondary and tertiary medical centers in Mansehra and Abbottabad.
                    </p>
                  </div>
                  {/* Contextual Metric Strip */}
                  <div className="mx-6 py-3 px-4 rounded-lg bg-surface-container-low border border-stone-border mb-6">
                    <p className="font-body-sm text-[12px] text-outline">Direct Frontline Impact</p>
                    <p className="font-body-sm text-body-sm font-semibold text-primary">Rapid Emergency Hotline Dispatch</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-white font-label-md text-label-md hover:bg-navy-deep transition-colors" href="tel:+923000000000">
                    <span>Explore Ambulance Services</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Pillar 2: Agriculture */}
              <div className="bg-surface-container-lowest border border-stone-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-outline transition-colors">
                <div>
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-uppercase font-label-uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span>
                        COMMUNITY PILLAR
                      </span>
                      <span className="material-symbols-outlined text-secondary text-[22px]">agriculture</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                      Regenerative Agriculture
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Strengthening valley agriculture through commercial olive agroforestry, soil stabilization, and training programs tailored to local farmers to build resilient, multi-generational livelihoods.
                    </p>
                  </div>
                  <div className="mx-6 py-3 px-4 rounded-lg bg-surface-container-low border border-stone-border mb-6">
                    <p className="font-body-sm text-[12px] text-outline">Focus Initiative</p>
                    <p className="font-body-sm text-body-sm font-semibold text-secondary">High-Yield Mountain Olive Cultivation</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors" href="/#agriculture-section">
                    <span>Explore Agriculture</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Pillar 3: Future Development Initiatives */}
              <div className="bg-surface-container-lowest border border-stone-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-outline transition-colors">
                <div>
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-label-uppercase font-label-uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-planned"></span>
                        PLANNED INITIATIVE
                      </span>
                      <span className="material-symbols-outlined text-outline text-[22px]">construction</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                      Future Development Initiatives
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Community-guided infrastructure projects including clean mountain water pipeline extensions, local gathering hubs, and secondary educational access pathways currently in feasibility study.
                    </p>
                  </div>
                  <div className="mx-6 py-3 px-4 rounded-lg bg-surface-container-low border border-stone-border mb-6">
                    <p className="font-body-sm text-[12px] text-outline">Pipeline Status</p>
                    <p className="font-body-sm text-body-sm font-semibold text-status-planned">Community Consultative Phase</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-stone-border text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors" href="/#work-pillars">
                    <span>View Development Initiatives</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: OUR APPROACH TO COMMUNITY DEVELOPMENT */}
        <section className="py-16 md:py-20 bg-surface-container-lowest border-b border-stone-border" id="approach">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1">
                  OPERATIONAL METHODOLOGY
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
                  Our Approach to Community Development
                </h2>
              </div>
              <span className="font-body-sm text-body-sm text-outline italic">
                Suggested consultative approach.
              </span>
            </div>
            {/* 4-Step Horizontal Process Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Step 01 */}
              <div className="relative bg-stone-white p-6 rounded-xl border border-stone-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-stat-display text-2xl text-secondary font-bold">01</span>
                    <span className="material-symbols-outlined text-outline text-[20px]">hearing</span>
                  </div>
                  <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                    Understand Community Needs
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Engage directly with village elders, families, and workers to listen and map genuine ground challenges.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border text-[11px] font-label-uppercase text-outline">
                  Stage: Field Listening
                </div>
              </div>

              {/* Step 02 */}
              <div className="relative bg-stone-white p-6 rounded-xl border border-stone-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-stat-display text-2xl text-secondary font-bold">02</span>
                    <span className="material-symbols-outlined text-outline text-[20px]">filter_alt</span>
                  </div>
                  <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                    Identify Practical Priorities
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Filter prospective initiatives to ensure they are actionable, immediately needed, and locally sustainable.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border text-[11px] font-label-uppercase text-outline">
                  Stage: Feasibility Assessment
                </div>
              </div>

              {/* Step 03 */}
              <div className="relative bg-stone-white p-6 rounded-xl border border-stone-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-stat-display text-2xl text-secondary font-bold">03</span>
                    <span className="material-symbols-outlined text-outline text-[20px]">engineering</span>
                  </div>
                  <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                    Support Relevant Activities
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Deploy tangible assistance—from frontline ambulance transport to agricultural planting days and irrigation care.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border text-[11px] font-label-uppercase text-outline">
                  Stage: Direct Execution
                </div>
              </div>

              {/* Step 04 */}
              <div className="relative bg-stone-white p-6 rounded-xl border border-stone-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-stat-display text-2xl text-secondary font-bold">04</span>
                    <span className="material-symbols-outlined text-outline text-[20px]">published_with_changes</span>
                  </div>
                  <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                    Review and Improve
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Continuously collect user feedback, publish transparent audit records, and calibrate work for greater impact.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border text-[11px] font-label-uppercase text-outline">
                  Stage: Iterative Audit
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: UNDERSTANDING LOCAL NEEDS (COMMUNITY CONTEXT) */}
        <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">
                  MOUNTAIN GEOGRAPHY &amp; REALITY
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6">
                  Understanding Local Needs: Our Community Context
                </h2>
                <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  <p>
                    Situated in the picturesque yet demanding topography of District Mansehra, Hazara Division, communities in and around Junglan operate at elevated altitudes where extreme seasonal weather and unpaved terrain can isolate households from primary infrastructure.
                  </p>
                  <p>
                    When acute medical emergencies arise—especially complicated maternal births or sudden injuries—ordinary transport can take hours to arrange. Similarly, the valley’s fertile mountain terraces have relied on subsistence farming that struggles with climate shifts.
                  </p>
                  <p>
                    By anchoring our activities within this precise geographic and social context, JCDF avoids theoretical solutions. We build interventions that work on winding dirt tracks, withstand winter frosts, and elevate the native agrarian economy.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="p-6 bg-surface-container-lowest border border-stone-border rounded-xl">
                  <span className="material-symbols-outlined text-primary text-[28px] mb-2">terrain</span>
                  <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Mountain Altitude</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Elevation above 1,500m creates steep transit barriers during monsoon &amp; winter frost.</p>
                </div>
                <div className="p-6 bg-surface-container-lowest border border-stone-border rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[28px] mb-2">distance</span>
                  <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Healthcare Distance</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Emergency medical hubs in Mansehra or Abbottabad require dedicated, prompt vehicle support.</p>
                </div>
                <div className="p-6 bg-surface-container-lowest border border-stone-border rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[28px] mb-2">potted_plant</span>
                  <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Agrarian Livelihoods</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Olive trees and orchards provide long-term income and mountain soil conservation.</p>
                </div>
                <div className="p-6 bg-surface-container-lowest border border-stone-border rounded-xl">
                  <span className="material-symbols-outlined text-primary text-[28px] mb-2">handshake</span>
                  <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Communal Trust</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Deep-rooted kinship and village jirga consultation ensure decisions reflect authentic local will.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: OUR COMMITMENT */}
        <section className="py-14 md:py-18 bg-surface-container-lowest border-b border-stone-border">
          <div className="max-w-5xl mx-auto px-margin-sm md:px-margin">
            <div className="border border-stone-border rounded-2xl p-8 md:p-12 bg-surface-container-low text-center">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed/60 text-secondary mx-auto flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">balance</span>
              </div>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">
                INSTITUTIONAL PLEDGE
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-4">
                A Commitment to Practical Community Support
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-6 leading-relaxed">
                Junglan Community Development Foundation is grounded in genuine stewardship. We commit to transparent communication, responsible management of every rupee entrusted to our care, and steadfast adherence to SECP non-profit standards.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-body-sm text-on-surface-variant font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                  SECP CUIN: 0348227
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">assignment</span>
                  Annual Financial Audits
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">public</span>
                  100% On-Ground Valley Focus
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: CALL TO ACTION */}
        <section className="py-16 md:py-24 bg-primary text-surface relative overflow-hidden" id="support">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin text-center relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-secondary-fixed font-label-uppercase text-label-uppercase tracking-wider mb-4 border border-outline/30">
              PARTNER WITH US
            </span>
            <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-extrabold mb-6 tracking-tight">
              Be Part of Community Development
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed max-w-2xl mx-auto mb-10 leading-relaxed">
              Learn more about JCDF’s work, explore our development priorities, or contact us to discuss ways to engage with our initiatives.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-surface text-primary font-label-md text-label-md hover:bg-stone-white shadow-md transition-all active:scale-95" href="#areas-of-work">
                <span className="material-symbols-outlined text-[18px] text-secondary">explore</span>
                <span>Explore Our Work</span>
              </a>
              <a className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-primary-fixed/40 text-surface font-label-md text-label-md hover:bg-navy-deep transition-all" href="mailto:info@junglanfoundation.org?subject=Support%20JCDF%20Initiative">
                <span className="material-symbols-outlined text-[18px]">forum</span>
                <span>Contact JCDF</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* IDENTICAL HOME PAGE FOOTER */}
      <footer className="bg-navy-deep text-surface border-t border-white/10" id="contact">
        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Foundation Brand & CUIN Registration Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-block">
                <img
                  alt="Junglan Community Development Foundation Logo"
                  className="h-14 w-auto max-w-[260px] object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlQqg-SoIPZbM-4ur-7V4Or5IX0kG183067aWfQ0hbKTbig2vPjgDV_y1hvmUqrWVkKqvFv2qxO6xTOiaIKtQiYXJcbNJq1roECkpu6ORlq1RUFQgOtSb9AhaoUH7mxLSPNlAlLI5__cG6DOvt6OeY1qXN69L2ftSuBmA-9YXy8ivDmhlcxhED3rPKRDJdoPGFi4Wy2ED7L5fsUBQ3eUSAXtYPBq9SUp_ooTv6-fKeTwsD2WnM6sa-fAMXVAx7At1lfA"
                />
              </div>
              <p className="text-slate-300 text-body-sm leading-relaxed max-w-sm">
                Junglan Community Development Foundation is a non-profit registered under the laws of Pakistan with the Securities and Exchange Commission of Pakistan (SECP CUIN: 0348227).
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-secondary-fixed border border-white/10 text-xs font-mono font-bold">
                  <span className="material-symbols-outlined text-sm">verified</span> SECP CUIN: 0348227
                </span>
              </div>
            </div>

            {/* OPERATIONAL PILLARS Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-label-uppercase text-secondary-fixed uppercase tracking-wider font-bold">
                OPERATIONAL PILLARS
              </div>
              <ul className="space-y-2 text-body-sm text-slate-300 font-medium">
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2" href="/#healthcare-section">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">arrow_forward</span> Emergency Dispatch
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2" href="/#healthcare-section">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">arrow_forward</span> Healthcare &amp; Ambulance
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2" href="/#agriculture-section">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">arrow_forward</span> Olive Agroforestry
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2" href="/#work-pillars">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">arrow_forward</span> Planned Infrastructure
                  </a>
                </li>
              </ul>
            </div>

            {/* GOVERNANCE & CONTACT Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-label-uppercase text-secondary-fixed uppercase tracking-wider font-bold">
                GOVERNANCE &amp; CONTACT
              </div>
              <ul className="space-y-2.5 text-body-sm text-slate-300">
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2 text-xs" href="/#audit-pipeline">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">description</span> Audit Pipeline &amp; Field Records
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2 text-xs" href="#approach">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">gavel</span> SECP Governance Framework
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors flex items-center gap-2 text-xs" href="/#audit-pipeline">
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
        <div className="border-t border-white/10 py-6 bg-navy-deep/80 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left leading-relaxed">
              © 2026 Junglan Community Development Foundation (JCDF). All rights reserved. Registered under SECP CUIN 0348227.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
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
