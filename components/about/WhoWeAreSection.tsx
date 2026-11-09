"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

const CAROUSEL_SLIDES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIJjfuvu_5BDrXzibHwZeM09BnRU0T92H6dr19spscxkRRWTweJw2YEQ_9X5IBDU4fkKmz1jIkUnG62P9__-OkMt-LIphyBDUi9dJ-C-D93V6UL6z_N2kxlW8XcWDXtjprcF7MCYdjpljkiAQo0jS1gXS6qVjW-95hjqB3eYCWhXqt7NAp4ZUQlV6B1FAO3ctSoi2oEILo3o4W7RBkrTTPs3RZ8QGDYbPhfNxc9sdB0fxHNhfDFdF14P6UOsH1lu-OQ",
    alt: "Senior community elder and trustee in white attire",
    role: "Senior Community Elder & Trustee",
    position: "center 20%",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfrtPZUeWYwOaejvDNXK1RbtEClkEivKM0Pds8FiqxupTeDmVhhNZaIfRZFJgwPINtEO6y0CKnBkirVtGbgLLjWxV8H1d1YXVlsRLxMy36dg-kVMkjTcWntraVfk2hYb3SiXL0R7nRQ45017Xn3ABr9n5TJPY5ZDb4irgzSZi6Y2ivNdEvlp1rWdTdIXDB-ryaTLOPxZGcZQUUWl4wECToZvb2FwrlOskXAPtkbBBFDW0wABZ63rMdBF6H2XelDHuTfA",
    alt: "Foundation leader and representative in light blue waistcoat",
    role: "Foundation Leadership Representative",
    position: "center 20%",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKeq26xvxwo2QtsXHflibW5xFM2DAIIwjdwIcTGMiAUxSizwq63f2Gs4SIeeCXO79D43R6i-OaLM2vT7GEAzUj0Ejolc3OVigk_flLY3g0zb7APuHdOHjKmQ7SCtxi5KIilMlxDMDBNJgOxRwC14zOagAIPxJ8OwJE5rdDVLwJOBYquoDihbqlyoDNap1POQS47sk6d_Z2n_kDc8j17UkgJYk2ksrOyOVH-JVZlo2mWny2ArSsyU8Mo2mhb23v-ADT-g",
    alt: "Community organizer and field coordinator in dark kurta",
    role: "Community Organizer & Field Coordinator",
    position: "center 15%",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEFb0ZrzPGAVjexScciwPVSS1V_K2wIzKgpe112YxYcm-2EFRTSxia27J0hs2XTXcj1P9_D57fYXrsoL06CA0fPlndJDY7nhJQopXPRBBeGa3caW9O34QMR3egT5Ptz0dVSr4kI1WGJwPAITbz1bNUxdPqODdqePJZV_T84gavAzaKzBJz0qx5xG7E5OJy2AgtIPUBt1UF4nrGpoqOg8nB7FVN_XgkqEbJ6x4cIqRWWpIqaGfQJiLtS0NzF0t4Llz_w",
    alt: "Executive trustee in dark suit and white pocket square",
    role: "Executive Trustee & Strategic Director",
    position: "center 18%",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO07-lJpXB8LcJ5GS7jqJwmG6BTBIbeAzSs1FEtAdrOXJHEN-R5eXTp-DkQm31W0ddnNfl8lxn_DAfmeWLVh4SDSWpPTuzvvp212D17TeyitPb5ZOjLluQvq6LI06q4gxZzcGhwNiQnt8hCQNyxdMAUud_Dt8U1aMvrRgWH591uPzCFuqiM1t1okqQ9-Sw-SwKeB26qZVNKzQua1_k35rt2H8XRZbESfA9Bbi56yae9bsjwT_-lFU6ue9RhDlfP_hRRg",
    alt: "Dedicated foundation trustee and senior director in white shirt",
    role: "Senior Director & Operations Steward",
    position: "center center",
  },
];

export function WhoWeAreSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  return (
    <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border relative">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        {/* Expanded 60px gap between text and image (gap-10 lg:gap-20 xl:gap-24) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <ScrollReveal variant="heading" delay={100}>
              <div className="inline-flex items-center gap-2 text-secondary mb-2">
                <span className="material-symbols-outlined text-[20px]">groups</span>
                <span className="font-label-uppercase text-label-uppercase tracking-wider font-bold">
                  CIVIC FOUNDATION OVERVIEW
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold mb-4 tracking-tight">
                Who We Are
              </h2>
            </ScrollReveal>

            {/* Paragraph with Smooth Expandable 'See More' Toggle */}
            <ScrollReveal variant="text" delay={200} className="w-full">
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <p>
                  Janglan Community Development Foundation is a registered non-profit foundation established to work alongside local communities to address everyday challenges through practical, community-oriented solutions. Founded on principles of responsibility, cooperation, and long-term community well-being, the foundation aims to serve as a reliable platform for local initiatives.
                </p>

                {/* Hidden complex text smoothly revealed */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-3 pt-1 text-on-surface-variant">
                    <p>
                      We recognize that remote and rural mountain communities often face unique difficulties in accessing healthcare transportation, developing productive agricultural opportunities, and building long-term community infrastructure. JCDF exists to understand these realities and help bridge gaps through focused, accountable, and transparent action.
                    </p>
                  </div>
                </div>

                {/* See More Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors pt-1 cursor-pointer focus:outline-none"
                >
                  <span>{isExpanded ? "Show Less" : "See More"}</span>
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={300} className="w-full">
              <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-stone-border w-full">
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
            </ScrollReveal>
          </div>

          {/* Right Visual Deck Column: Card changes completely (New card drops from TOP, old card fades down to BOTTOM) */}
          <ScrollReveal variant="card" delay={250} className="lg:col-span-5 relative w-full">
            <div
              className="relative w-full h-[440px] sm:h-[480px] md:h-[520px] select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {CAROUSEL_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                const isExiting = index === prevSlide;

                // Animation class:
                // Active Card: Slides in from TOP (-40px) with full opacity
                // Exiting Card: Slides out towards BOTTOM (+40px) while fading to 0 opacity
                let transformStyle: React.CSSProperties = {
                  pointerEvents: isActive ? "auto" : "none",
                };

                if (isActive) {
                  transformStyle = {
                    transform: "translateY(0px)",
                    opacity: 1,
                    zIndex: 20,
                    transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                  };
                } else if (isExiting) {
                  transformStyle = {
                    transform: "translateY(40px)",
                    opacity: 0,
                    zIndex: 10,
                    transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                  };
                } else {
                  transformStyle = {
                    transform: "translateY(-40px)",
                    opacity: 0,
                    zIndex: 0,
                  };
                }

                return (
                  <div
                    key={index}
                    className="absolute inset-0 rounded-2xl overflow-hidden ui-spatial-card bg-surface-container-high group will-change-transform"
                    style={transformStyle}
                  >
                    {/* Full Card Image */}
                    <img
                      alt={slide.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ objectFit: "cover", objectPosition: slide.position }}
                      src={slide.src}
                    />

                    {/* Gradient Overlay & Individual Card Captions */}
                    <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-navy-deep/95 via-navy-deep/60 to-transparent text-surface z-20 flex flex-col justify-end">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                          <span className="font-label-uppercase text-label-uppercase text-secondary-fixed tracking-wider font-bold">
                            COMMUNITY LEADERSHIP
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-white/10 text-[10px] font-label-uppercase text-inverse-on-surface tracking-wider font-semibold">
                          {index + 1} of {CAROUSEL_SLIDES.length}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-white font-bold leading-snug drop-shadow-sm">
                        {slide.role}
                      </p>
                      <p className="font-body-sm text-[12px] text-slate-300 font-medium mt-0.5">
                        JCDF Leadership &amp; Field Stewards • Hazara Division
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Floating Bottom Pagination Indicator Dots */}
              <div
                className="absolute bottom-3 right-5 z-30 flex items-center gap-1.5 pointer-events-auto"
                id="carousel-dots"
              >
                {CAROUSEL_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to card ${i + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentSlide
                        ? "bg-secondary-fixed w-5 shadow-[0_0_8px_rgba(177,240,206,0.8)]"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    type="button"
                    onClick={() => {
                      setPrevSlide(currentSlide);
                      setCurrentSlide(i);
                    }}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAreSection;
