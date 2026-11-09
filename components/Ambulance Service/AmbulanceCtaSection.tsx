"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AmbulanceCtaSection() {
  return (
    <section className="relative py-[70px] lg:py-[102px] bg-navy-deep text-surface-container-lowest overflow-hidden" id="contact">
      {/* Subtle mountain graphic backdrop */}
      <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none">
        <img
          alt="Hazara Mountain backdrop texture"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHTA0pzAEVHdO_OaVjbyP_bhmNcxXQ3lsaT0dIWl7AtvdaPjl1C4s85qyBQE1zTVHIQALn2_SeYZmS0tdLGg4n5KlapdLuSxE1lB42QGSXI4c0hOCC0kvv15NJdF_BcXo-r0lM_rvzllgBuKv8WA7IOMVDlUfYke1pNtUmLBMIZBC92h4kuxvN3IeSQU-iVscfxtKFkmyuhiHwxSSNTTQwidbxE1xuXohtjnIBsOzWM6a3CZqIZ4dN"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal variant="card" delay={50}>
            <span className="inline-block px-3 py-1 bg-surface-container-lowest/10 backdrop-blur border border-surface-container-lowest/20 rounded-full font-label-uppercase text-label-uppercase text-secondary-fixed mb-4 text-xs font-bold" style={{ color: "#b1f0ce" }}>
              EMERGENCY ASSISTANCE &amp; DISPATCH
            </span>
          </ScrollReveal>

          <ScrollReveal variant="heading" delay={150}>
            <h2 className="font-headline-xl text-headline-xl lg:text-headline-xl text-headline-xl-mobile font-semibold text-white tracking-tight">
              Need Ambulance Transportation Support?
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={250}>
            <p className="font-body-lg text-body-lg text-slate-200 mt-4 leading-relaxed">
              If you or someone in your community needs patient transportation support, contact Janglan Community Development Foundation for assistance and further information.
            </p>
          </ScrollReveal>

          {/* Helpline Box with Enhanced Backlight Glow & Glassmorphism */}
          <ScrollReveal variant="card" delay={300}>
            <div className="ui-glassmorphic-dark relative overflow-hidden mt-8 p-6 sm:p-8 rounded-2xl border border-white/20 text-center shadow-2xl group">
              {/* Ambient colored glowing backlight orbs */}
              <div className="absolute -top-12 -left-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-sky-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>

              <div className="relative z-10">
                <p className="font-label-uppercase text-label-uppercase text-slate-300 tracking-wider text-xs font-bold">
                  DIRECT HOTLINE COORDINATION
                </p>
                <div className="text-xl sm:text-headline-md font-headline-md text-emerald-300 mt-2 flex flex-wrap justify-center items-center gap-3 font-bold">
                  <span>Ambulance Desk: <a className="hover:underline text-white font-bold" href="tel:+923016541825">+92 301 6541825</a></span>
                  <span className="hidden sm:inline text-slate-400">|</span>
                  <span>WhatsApp: <a className="hover:underline text-white font-bold" href="https://wa.me/491715114247">+49 171 5114247</a></span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-300 mt-2">
                  Tehsil Baffa Pakhal Base Camp • On-call patient transfers to Mansehra &amp; Abbottabad
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* CTAs: 3D Flip Buttons */}
          <ScrollReveal variant="text" delay={350}>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <FlipButton
                href="tel:+923016541825"
                variant="red"
                frontText="Contact JCDF"
                backText="Connecting..."
                icon="phone_in_talk"
              />
              <FlipButton
                href="#about-service"
                variant="white"
                frontText="Learn About Our Work"
                backText="Loading..."
                icon="arrow_forward"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AmbulanceCtaSection;

