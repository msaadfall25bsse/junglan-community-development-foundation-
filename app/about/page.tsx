"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";

const LEADERSHIP_SLIDES = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIJjfuvu_5BDrXzibHwZeM09BnRU0T92H6dr19spscxkRRWTweJw2YEQ_9X5IBDU4fkKmz1jIkUnG62P9__-OkMt-LIphyBDUi9dJ-C-D93V6UL6z_N2kxlW8XcWDXtjprcF7MCYdjpljkiAQo0jS1gXS6qVjW-95hjqB3eYCWhXqt7NAp4ZUQlV6B1FAO3ctSoi2oEILo3o4W7RBkrTTPs3RZ8QGDYbPhfNxc9sdB0fxHNhfDFdF14P6UOsH1lu-OQ",
    alt: "Senior community elder and trustee in white attire",
    position: "center 20%",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfrtPZUeWYwOaejvDNXK1RbtEClkEivKM0Pds8FiqxupTeDmVhhNZaIfRZFJgwPINtEO6y0CKnBkirVtGbgLLjWxV8H1d1YXVlsRLxMy36dg-kVMkjTcWntraVfk2hYb3SiXL0R7nRQ45017Xn3ABr9n5TJPY5ZDb4irgzSZi6Y2ivNdEvlp1rWdTdIXDB-ryaTLOPxZGcZQUUWl4wECToZvb2FwrlOskXAPtkbBBFDW0wABZ63rMdBF6H2XelDHuTfA",
    alt: "Foundation leader and representative in light blue waistcoat",
    position: "center 20%",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKeq26xvxwo2QtsXHflibW5xFM2DAIIwjdwIcTGMiAUxSizwq63f2Gs4SIeeCXO79D43R6i-OaLM2vT7GEAzUj0Ejolc3OVigk_flLY3g0zb7APuHdOHjKmQ7SCtxi5KIilMlxDMDBNJgOxRwC14zOagAIPxJ8OwJE5rdDVLwJOBYquoDihbqlyoDNap1POQS47sk6d_Z2n_kDc8j17UkgJYk2ksrOyOVH-JVZlo2mWny2ArSsyU8Mo2mhb23v-ADT-g",
    alt: "Community organizer and field coordinator in dark kurta",
    position: "center 15%",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEFb0ZrzPGAVjexScciwPVSS1V_K2wIzKgpe112YxYcm-2EFRTSxia27J0hs2XTXcj1P9_D57fYXrsoL06CA0fPlndJDY7nhJQopXPRBBeGa3caW9O34QMR3egT5Ptz0dVSr4kI1WGJwPAITbz1bNUxdPqODdqePJZV_T84gavAzaKzBJz0qx5xG7E5OJy2AgtIPUBt1UF4nrGpoqOg8nB7FVN_XgkqEbJ6x4cIqRWWpIqaGfQJiLtS0NzF0t4Llz_w",
    alt: "Executive trustee in dark suit and white pocket square",
    position: "center 18%",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCO07-lJpXB8LcJ5GS7jqJwmG6BTBIbeAzSs1FEtAdrOXJHEN-R5eXTp-DkQm31W0ddnNfl8lxn_DAfmeWLVh4SDSWpPTuzvvp212D17TeyitPb5ZOjLluQvq6LI06q4gxZzcGhwNiQnt8hCQNyxdMAUud_Dt8U1aMvrRgWH591uPzCFuqiM1t1okqQ9-Sw-SwKeB26qZVNKzQua1_k35rt2H8XRZbESfA9Bbi56yae9bsjwT_-lFU6ue9RhDlfP_hRRg",
    alt: "Dedicated foundation trustee and senior director in white shirt",
    position: "center center",
  },
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % LEADERSHIP_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % LEADERSHIP_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + LEADERSHIP_SLIDES.length) % LEADERSHIP_SLIDES.length
    );
  };

  return (
    <PublicLayout>
      <div className="bg-[#F8F9FA] text-[#181c1f] font-sans antialiased selection:bg-[#b1f0ce] selection:text-[#002114]">
        {/* SECTION 1: ABOUT US HERO SECTION */}
        <section className="relative bg-white border-b border-[#E2E8F0] overflow-hidden py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Narrative Left Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1f4f8] border border-[#E2E8F0] mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#2c694e]"></span>
                  <span className="text-[11px] font-bold text-[#43474d] tracking-wider uppercase">
                    ABOUT JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-[48px] md:leading-[56px] text-[#00162d] mb-6 tracking-tight font-extrabold">
                  Working Together for Stronger Communities
                </h1>
                <p className="text-base md:text-lg text-[#43474d] mb-8 leading-relaxed">
                  Junglan Community Development Foundation works to address community needs through essential services and local development initiatives. Our areas of work include patient transportation support, agriculture, and future development initiatives designed around community priorities.
                </p>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <Link
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#00162d] text-white text-sm font-semibold hover:bg-[#081A2D] shadow-sm transition-all"
                    href="#areas-of-work"
                  >
                    <span>Explore Our Work</span>
                    <span className="material-symbols-outlined ml-1.5 text-[18px]">
                      arrow_forward
                    </span>
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] text-[#00162d] text-sm font-semibold hover:bg-[#f1f4f8] transition-colors"
                    href="/contact"
                  >
                    <span className="material-symbols-outlined mr-1.5 text-[18px]">
                      mail
                    </span>
                    <span>Contact Us</span>
                  </Link>
                </div>
                {/* Operational Pillar Highlights */}
                <div className="grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-[#E2E8F0] w-full">
                  <div>
                    <p className="text-2xl font-bold text-[#2c694e]">100%</p>
                    <p className="text-xs sm:text-sm text-[#43474d]">Community-Centered</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#00162d]">24/7</p>
                    <p className="text-xs sm:text-sm text-[#43474d]">Patient Transport</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#00162d]">Hazara</p>
                    <p className="text-xs sm:text-sm text-[#43474d]">Khyber Pakhtunkhwa</p>
                  </div>
                </div>
              </div>

              {/* Visual Right Column */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#ebeef2] shadow-md">
                  <img
                    alt="High-altitude mountain valley terrain and forested hills in District Mansehra, KP, Pakistan"
                    className="w-full h-80 md:h-[420px] object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpPxGP3Zx33RQ7YxHrDp_lnqzGB7EoFqbj-_eqEueYGOmy2ZxYbzo1h48XQ9ocwq2r6F5x7jGyTYVrja3CWWNSbpqaLqqlHAVn3T28U-xg6pURrnSE7k_E4vOGDNv77WHwsTwuJjg4Dvc1JNYdpgTjzXiXsWYicb9Y7lH2-MomT_BWRGI4ZSun4WDRkpvBnmt76mHfMr1USXKE09icz5U_St7jkGMc4-nt8JEduTFDRqB-RqaUHqvdAPPKuMavugKQGg"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#081A2D]/90 via-[#081A2D]/40 to-transparent text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#b1f0ce]"></span>
                      <span className="text-[11px] font-bold text-[#b1f0ce] tracking-wider uppercase">
                        GEOGRAPHIC BASE
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200">
                      Remote Mountain Hamlets • District Mansehra, KP, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHO WE ARE (TWO-COLUMN EDITORIAL WITH IMAGE CAROUSEL) */}
        <section className="py-16 md:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Narrative Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 text-[#2c694e] mb-2">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase">
                    CIVIC FOUNDATION OVERVIEW
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#00162d] mb-6 tracking-tight">
                  Who We Are
                </h2>
                <div className="space-y-4 text-base text-[#43474d] leading-relaxed">
                  <p>
                    Junglan Community Development Foundation is a registered non-profit foundation established to work alongside local communities to address everyday challenges through practical, community-oriented solutions. Founded on principles of responsibility, cooperation, and long-term community well-being, the foundation aims to serve as a reliable platform for local initiatives.
                  </p>
                  <p>
                    We recognize that remote and rural communities often face unique difficulties in accessing healthcare transportation, developing productive agricultural opportunities, and building long-term community infrastructure. JCDF exists to understand these realities and help bridge gaps through focused, accountable, and transparent action.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-[#E2E8F0] w-full">
                  <div className="flex items-center gap-2 text-[#00162d] text-sm font-semibold">
                    <span className="material-symbols-outlined text-[#2c694e]">
                      check_circle
                    </span>
                    <span>Community-Led Priority Setting</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00162d] text-sm font-semibold">
                    <span className="material-symbols-outlined text-[#2c694e]">
                      check_circle
                    </span>
                    <span>Non-Profit Institutional Stewardship</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00162d] text-sm font-semibold">
                    <span className="material-symbols-outlined text-[#2c694e]">
                      check_circle
                    </span>
                    <span>Provincial Regulatory Compliance</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Carousel Column */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#ebeef2] shadow-md group h-[420px] sm:h-[460px] md:h-[500px] select-none">
                  {/* Carousel Slides Container */}
                  <div className="relative w-full h-full">
                    {LEADERSHIP_SLIDES.map((slide, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          idx === currentSlide
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <img
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: slide.position }}
                          src={slide.image}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Gradient Overlay & Caption Badge */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#081A2D]/90 via-[#081A2D]/50 to-transparent text-white z-20 pointer-events-none flex flex-col justify-end">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#b1f0ce] animate-pulse"></span>
                        <span className="text-[11px] font-bold text-[#b1f0ce] tracking-wider uppercase">
                          COMMUNITY LEADERSHIP
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/70 border border-white/10 text-[10px] font-mono text-slate-200 tracking-wider">
                        {currentSlide + 1} of {LEADERSHIP_SLIDES.length}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">
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
                    <span className="material-symbols-outlined text-[20px] block">
                      chevron_left
                    </span>
                  </button>

                  {/* Navigation Arrow: Next */}
                  <button
                    aria-label="Next leadership photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm border border-white/10 transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none"
                    type="button"
                    onClick={nextSlide}
                  >
                    <span className="material-symbols-outlined text-[20px] block">
                      chevron_right
                    </span>
                  </button>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-16 sm:bottom-16 inset-x-0 z-30 flex items-center justify-center gap-1.5 pointer-events-auto">
                    {LEADERSHIP_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === currentSlide
                            ? "bg-[#b1f0ce] shadow-[0_0_8px_rgba(177,240,206,0.8)] scale-125"
                            : "bg-white/40 hover:bg-white/70"
                        }`}
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
        <section className="py-14 md:py-18 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[11px] font-bold text-[#2c694e] tracking-widest block mb-2 uppercase">
              OUR DRIVING PURPOSE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#00162d] mb-6">
              Why We Work
            </h2>
            <div className="text-base sm:text-lg text-[#43474d] leading-relaxed space-y-4 text-left md:text-center">
              <p>
                Rural and mountain valleys possess tremendous resilience, proud cultural traditions, and hardworking people. However, rugged geography, steep mountain tracks, and distance from major urban centers frequently create critical bottlenecks in accessing timely emergency medical transport and realizing the full potential of local land stewardship.
              </p>
              <p className="text-sm sm:text-base text-[#74777e]">
                We work because every family in our valley deserves safe, dignity-preserving transit in times of acute medical distress, sustainable agricultural avenues that bring long-term income, and well-planned community development that respects local autonomy.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: MISSION & VISION */}
        <section className="py-16 md:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#2c694e] tracking-wider block mb-1 uppercase">
                  FOUNDATIONAL GUIDELINES
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#00162d]">
                  Mission &amp; Vision
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ebeef2] border border-[#E2E8F0] text-[#74777e] text-xs font-medium">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Suggested website wording for JCDF community review
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Mission Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm flex flex-col justify-between hover:border-[#2c694e] transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#b1f0ce]/40 flex items-center justify-center text-[#2c694e] mb-6">
                    <span
                      className="material-symbols-outlined text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      flag
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#00162d] mb-3">
                    Our Mission
                  </h3>
                  <p className="text-base sm:text-lg text-[#43474d] leading-relaxed">
                    “To support community well-being by working on essential service access and local development priorities through practical, community-focused initiatives.”
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs sm:text-sm text-[#74777e]">
                  <span>Operational Anchor</span>
                  <span className="font-semibold text-[#2c694e]">Action-Oriented</span>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm flex flex-col justify-between hover:border-[#00162d] transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#d2e4ff]/50 flex items-center justify-center text-[#00162d] mb-6">
                    <span
                      className="material-symbols-outlined text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      visibility
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#00162d] mb-3">
                    Our Vision
                  </h3>
                  <p className="text-base sm:text-lg text-[#43474d] leading-relaxed">
                    “A stronger and more resilient community where people can access essential support and benefit from sustainable development opportunities.”
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs sm:text-sm text-[#74777e]">
                  <span>Long-Term Horizon</span>
                  <span className="font-semibold text-[#00162d]">Generational Impact</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CORE VALUES */}
        <section className="py-16 md:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] font-bold text-[#2c694e] tracking-widest block mb-1 uppercase">
                GUIDING PRINCIPLES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#00162d] mb-3">
                Core Values: The Principles Behind Our Work
              </h2>
              <p className="text-sm sm:text-base text-[#43474d]">
                These four foundational pillars govern how we allocate resources, communicate with families, and conduct our daily community operations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Value 1 */}
              <div className="border border-[#E2E8F0] rounded-xl p-6 bg-[#F8F9FA] hover:bg-white transition-all hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#ebeef2] flex items-center justify-center text-[#00162d] mb-4">
                  <span className="material-symbols-outlined text-[24px]">diversity_3</span>
                </div>
                <h3 className="text-base font-bold text-[#00162d] mb-2">
                  Community Focus
                </h3>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed">
                  Recognizing local needs and prioritizing community-relevant work that directly improves everyday mountain life.
                </p>
              </div>

              {/* Value 2 */}
              <div className="border border-[#E2E8F0] rounded-xl p-6 bg-[#F8F9FA] hover:bg-white transition-all hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#ebeef2] flex items-center justify-center text-[#00162d] mb-4">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <h3 className="text-base font-bold text-[#00162d] mb-2">
                  Responsibility
                </h3>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed">
                  Clear communication, ethical governance, and responsible stewardship of all donor and communal resources.
                </p>
              </div>

              {/* Value 3 */}
              <div className="border border-[#E2E8F0] rounded-xl p-6 bg-[#F8F9FA] hover:bg-white transition-all hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#ebeef2] flex items-center justify-center text-[#00162d] mb-4">
                  <span className="material-symbols-outlined text-[24px]">handshake</span>
                </div>
                <h3 className="text-base font-bold text-[#00162d] mb-2">
                  Cooperation
                </h3>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed">
                  Constructive, respectful cooperation with community members, elders, administrative authorities, and local stakeholders.
                </p>
              </div>

              {/* Value 4 */}
              <div className="border border-[#E2E8F0] rounded-xl p-6 bg-[#F8F9FA] hover:bg-white transition-all hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#ebeef2] flex items-center justify-center text-[#00162d] mb-4">
                  <span className="material-symbols-outlined text-[24px]">eco</span>
                </div>
                <h3 className="text-base font-bold text-[#00162d] mb-2">
                  Sustainable Development
                </h3>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed">
                  Fostering long-term community resilience through regenerative agroforestry and practical economic opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: WHAT WE WORK ON (OUR AREAS OF WORK) */}
        <section className="py-16 md:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]" id="areas-of-work">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#2c694e] tracking-widest block mb-1 uppercase">
                  PORTFOLIO OF ACTION
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#00162d]">
                  What We Work On: Our Areas of Work
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#43474d] max-w-md">
                Our initiatives are structured across three pragmatic pillars designed to address immediate frontline safety and sustained regional prosperity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Pillar 1: Healthcare & Ambulance */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#74777e] transition-colors">
                <div>
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#b1f0ce] text-[#002114] text-[11px] font-bold uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#166534]"></span>
                        ACTIVE SERVICE
                      </span>
                      <span className="material-symbols-outlined text-[#00162d] text-[22px]">
                        medical_services
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#00162d] mb-2">
                      Ambulance &amp; Healthcare Support
                    </h3>
                    <p className="text-sm text-[#43474d] leading-relaxed">
                      Dedicated mountain patient transportation facilitating emergency transit from high-altitude hamlets down to secondary and tertiary medical centers in Mansehra and Abbottabad.
                    </p>
                  </div>
                  {/* Contextual Metric Strip */}
                  <div className="mx-6 py-3 px-4 rounded-lg bg-[#f1f4f8] border border-[#E2E8F0] mb-6">
                    <p className="text-[12px] text-[#74777e]">Direct Frontline Impact</p>
                    <p className="text-sm font-semibold text-[#00162d]">
                      Rapid Emergency Hotline Dispatch
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#00162d] text-white text-sm font-semibold hover:bg-[#081A2D] transition-colors"
                    href="tel:+923000000000"
                  >
                    <span>Explore Ambulance Services</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>

              {/* Pillar 2: Agriculture */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#74777e] transition-colors">
                <div>
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#b1f0ce] text-[#002114] text-[11px] font-bold uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#166534]"></span>
                        COMMUNITY PILLAR
                      </span>
                      <span className="material-symbols-outlined text-[#2c694e] text-[22px]">
                        agriculture
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#00162d] mb-2">
                      Regenerative Agriculture
                    </h3>
                    <p className="text-sm text-[#43474d] leading-relaxed">
                      Strengthening valley agriculture through commercial olive agroforestry, soil stabilization, and training programs tailored to local farmers to build resilient, multi-generational livelihoods.
                    </p>
                  </div>
                  <div className="mx-6 py-3 px-4 rounded-lg bg-[#f1f4f8] border border-[#E2E8F0] mb-6">
                    <p className="text-[12px] text-[#74777e]">Focus Initiative</p>
                    <p className="text-sm font-semibold text-[#2c694e]">
                      High-Yield Mountain Olive Cultivation
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#00162d] text-[#00162d] text-sm font-semibold hover:bg-[#f1f4f8] transition-colors"
                    href="/agriculture"
                  >
                    <span>Explore Agriculture</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Pillar 3: Future Development Initiatives */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#74777e] transition-colors">
                <div>
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
                        PLANNED INITIATIVE
                      </span>
                      <span className="material-symbols-outlined text-[#74777e] text-[22px]">
                        construction
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#00162d] mb-2">
                      Future Development Initiatives
                    </h3>
                    <p className="text-sm text-[#43474d] leading-relaxed">
                      Community-guided infrastructure projects including clean mountain water pipeline extensions, local gathering hubs, and secondary educational access pathways currently in feasibility study.
                    </p>
                  </div>
                  <div className="mx-6 py-3 px-4 rounded-lg bg-[#f1f4f8] border border-[#E2E8F0] mb-6">
                    <p className="text-[12px] text-[#74777e]">Pipeline Status</p>
                    <p className="text-sm font-semibold text-[#D97706]">
                      Community Consultative Phase
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#E2E8F0] text-[#43474d] text-sm font-semibold hover:bg-[#f1f4f8] transition-colors"
                    href="/future-projects"
                  >
                    <span>View Development Initiatives</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: OUR APPROACH TO COMMUNITY DEVELOPMENT */}
        <section className="py-16 md:py-20 bg-white border-b border-[#E2E8F0]" id="approach">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#2c694e] tracking-widest block mb-1 uppercase">
                  OPERATIONAL METHODOLOGY
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#00162d]">
                  Our Approach to Community Development
                </h2>
              </div>
              <span className="text-xs sm:text-sm text-[#74777e] italic">
                Suggested consultative approach.
              </span>
            </div>
            {/* 4-Step Horizontal Process Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Step 01 */}
              <div className="relative bg-[#F8F9FA] p-6 rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl text-[#2c694e] font-bold">01</span>
                    <span className="material-symbols-outlined text-[#74777e] text-[20px]">
                      hearing
                    </span>
                  </div>
                  <h3 className="text-base text-[#00162d] font-bold mb-2">
                    Understand Community Needs
                  </h3>
                  <p className="text-xs sm:text-sm text-[#43474d]">
                    Engage directly with village elders, families, and workers to listen and map genuine ground challenges.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-[#74777e] uppercase">
                  Stage: Field Listening
                </div>
              </div>

              {/* Step 02 */}
              <div className="relative bg-[#F8F9FA] p-6 rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl text-[#2c694e] font-bold">02</span>
                    <span className="material-symbols-outlined text-[#74777e] text-[20px]">
                      filter_alt
                    </span>
                  </div>
                  <h3 className="text-base text-[#00162d] font-bold mb-2">
                    Identify Practical Priorities
                  </h3>
                  <p className="text-xs sm:text-sm text-[#43474d]">
                    Filter prospective initiatives to ensure they are actionable, immediately needed, and locally sustainable.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-[#74777e] uppercase">
                  Stage: Feasibility Assessment
                </div>
              </div>

              {/* Step 03 */}
              <div className="relative bg-[#F8F9FA] p-6 rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl text-[#2c694e] font-bold">03</span>
                    <span className="material-symbols-outlined text-[#74777e] text-[20px]">
                      engineering
                    </span>
                  </div>
                  <h3 className="text-base text-[#00162d] font-bold mb-2">
                    Support Relevant Activities
                  </h3>
                  <p className="text-xs sm:text-sm text-[#43474d]">
                    Deploy tangible assistance—from frontline ambulance transport to agricultural planting days and irrigation care.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-[#74777e] uppercase">
                  Stage: Direct Execution
                </div>
              </div>

              {/* Step 04 */}
              <div className="relative bg-[#F8F9FA] p-6 rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl text-[#2c694e] font-bold">04</span>
                    <span className="material-symbols-outlined text-[#74777e] text-[20px]">
                      published_with_changes
                    </span>
                  </div>
                  <h3 className="text-base text-[#00162d] font-bold mb-2">
                    Review and Improve
                  </h3>
                  <p className="text-xs sm:text-sm text-[#43474d]">
                    Continuously collect user feedback, publish transparent audit records, and calibrate work for greater impact.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-[#74777e] uppercase">
                  Stage: Iterative Audit
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: UNDERSTANDING LOCAL NEEDS (COMMUNITY CONTEXT) */}
        <section className="py-16 md:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-[11px] font-bold text-[#2c694e] tracking-widest block mb-2 uppercase">
                  MOUNTAIN GEOGRAPHY &amp; REALITY
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#00162d] mb-6">
                  Understanding Local Needs: Our Community Context
                </h2>
                <div className="space-y-4 text-base text-[#43474d] leading-relaxed">
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
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl">
                  <span className="material-symbols-outlined text-[#00162d] text-[28px] mb-2">
                    terrain
                  </span>
                  <h4 className="text-base font-bold text-[#00162d] mb-1">
                    Mountain Altitude
                  </h4>
                  <p className="text-xs sm:text-sm text-[#43474d]">
                    Elevation above 1,500m creates steep transit barriers during monsoon &amp; winter frost.
                  </p>
                </div>
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl">
                  <span className="material-symbols-outlined text-[#2c694e] text-[28px] mb-2">
                    distance
                  </span>
                  <h4 className="text-base font-bold text-[#00162d] mb-1">
                    Healthcare Distance
                  </h4>
                  <p className="text-xs sm:text-sm text-[#43474d]">
                    Emergency medical hubs in Mansehra or Abbottabad require dedicated, prompt vehicle support.
                  </p>
                </div>
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl">
                  <span className="material-symbols-outlined text-[#2c694e] text-[28px] mb-2">
                    potted_plant
                  </span>
                  <h4 className="text-base font-bold text-[#00162d] mb-1">
                    Agrarian Livelihoods
                  </h4>
                  <p className="text-xs sm:text-sm text-[#43474d]">
                    Olive trees and orchards provide long-term income and mountain soil conservation.
                  </p>
                </div>
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl">
                  <span className="material-symbols-outlined text-[#00162d] text-[28px] mb-2">
                    handshake
                  </span>
                  <h4 className="text-base font-bold text-[#00162d] mb-1">
                    Communal Trust
                  </h4>
                  <p className="text-xs sm:text-sm text-[#43474d]">
                    Deep-rooted kinship and village jirga consultation ensure decisions reflect authentic local will.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: OUR COMMITMENT */}
        <section className="py-14 md:py-18 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-[#E2E8F0] rounded-2xl p-8 md:p-12 bg-[#f1f4f8] text-center">
              <div className="w-12 h-12 rounded-full bg-[#b1f0ce]/60 text-[#2c694e] mx-auto flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">balance</span>
              </div>
              <span className="text-[11px] font-bold text-[#2c694e] tracking-widest block mb-2 uppercase">
                INSTITUTIONAL PLEDGE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#00162d] mb-4">
                A Commitment to Practical Community Support
              </h2>
              <p className="text-base sm:text-lg text-[#43474d] max-w-3xl mx-auto mb-6 leading-relaxed">
                Junglan Community Development Foundation is grounded in genuine stewardship. We commit to transparent communication, responsible management of every rupee entrusted to our care, and steadfast adherence to SECP non-profit standards.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#43474d] font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#2c694e] text-[18px]">
                    verified
                  </span>
                  SECP CUIN: 0348227
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#2c694e] text-[18px]">
                    assignment
                  </span>
                  Annual Financial Audits
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#2c694e] text-[18px]">
                    public
                  </span>
                  100% On-Ground Valley Focus
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: CALL TO ACTION */}
        <section
          className="py-16 md:py-24 bg-[#00162d] text-white relative overflow-hidden"
          id="support"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0f2b48] text-[#b1f0ce] text-[11px] font-bold uppercase tracking-wider mb-4 border border-white/10">
              PARTNER WITH US
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold mb-6 tracking-tight text-white">
              Be Part of Community Development
            </h2>
            <p className="text-base sm:text-lg text-[#d2e4ff] max-w-2xl mx-auto mb-10 leading-relaxed">
              Learn more about JCDF’s work, explore our development priorities, or contact us to discuss ways to engage with our initiatives.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white text-[#00162d] text-sm font-semibold hover:bg-[#F8F9FA] shadow-md transition-all active:scale-95"
                href="#areas-of-work"
              >
                <span className="material-symbols-outlined text-[18px] text-[#2c694e]">
                  explore
                </span>
                <span>Explore Our Work</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-[#d2e4ff]/40 text-white text-sm font-semibold hover:bg-[#081A2D] transition-all"
                href="/contact"
              >
                <span className="material-symbols-outlined text-[18px]">forum</span>
                <span>Contact JCDF</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
