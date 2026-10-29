"use client";

import React, { useState, useEffect } from "react";

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

export function WhoWeAreSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border relative">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-secondary mb-2">
              <span className="material-symbols-outlined text-[20px]">groups</span>
              <span className="font-label-uppercase text-label-uppercase tracking-wider">
                CIVIC FOUNDATION OVERVIEW
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6 tracking-tight">
              Who We Are
            </h2>
            <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <p>
                Janglan Community Development Foundation is a registered non-profit foundation established to work alongside local communities to address everyday challenges through practical, community-oriented solutions. Founded on principles of responsibility, cooperation, and long-term community well-being, the foundation aims to serve as a reliable platform for local initiatives.
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
                      data-index={index}
                    >
                      <img
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                        style={{ objectFit: "cover", objectPosition: slide.position }}
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
                    <span className="font-label-uppercase text-label-uppercase text-secondary-fixed tracking-wider">
                      COMMUNITY LEADERSHIP
                    </span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full bg-slate-900/70 border border-white/10 text-[10px] font-label-uppercase text-inverse-on-surface tracking-wider"
                    id="carousel-counter"
                  >
                    {currentSlide + 1} of {CAROUSEL_SLIDES.length}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-inverse-on-surface font-medium" id="carousel-caption">
                  JCDF Leadership &amp; Field Stewards • Hazara Division
                </p>
              </div>

              {/* Pagination Dots */}
              <div
                className="absolute bottom-16 sm:bottom-16 inset-x-0 z-30 flex items-center justify-center gap-1.5 pointer-events-auto"
                id="carousel-dots"
              >
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
  );
}

export default WhoWeAreSection;
