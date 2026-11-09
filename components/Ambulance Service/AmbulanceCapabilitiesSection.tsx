"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AmbulanceCapabilitiesSection() {
  return (
    <section className="py-[54px] lg:py-[86px] bg-surface-container-lowest border-b border-stone-border" id="fleet">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-secondary font-bold text-xs block mb-1">
              OUR SERVICES
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-semibold">
              Ambulance Transportation and Community Support
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
              Grounded, honest, and frontline verified. We focus purely on reliable physical transit between mountain hamlets and tertiary hospitals.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-bento-card ui-liquid-glass relative overflow-hidden p-6 rounded-xl bg-white border border-stone-border flex flex-col justify-between hover:shadow-lg transition-all duration-300 h-full group">
              {/* Background mountain ambulance photo subtle watermark */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.06] group-hover:opacity-[0.11] group-hover:scale-105 transition-all duration-700 pointer-events-none"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuACK-RKInwlGJtXenPyuCKVr90G2Xomm8bn3QlaWyUi1gHbyYDkbHrYkqkEdy9vw3c5CNbCQD5ODofIhh1fPz4zqrqDaJFFrfjVriQvCNTcvTGFq4BZ05cQPL1u7t07GB9m0WitFp7IR0ni22l2Oda3MfHICmQc7WDVC_dna5nBeCbqPS3rHeqeO4DpQnWoOofE01Xddb6RRcDMcqOcufLoxc_n7dfFvWQ2mJyQi948KVhNFqABtd_O')",
                }}
              ></div>
              {/* Radial gradient glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center mb-5 shadow-xs group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">transfer_within_a_station</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">Patient Transportation</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Helping patients travel from remote communities to hospitals and medical facilities with safety and care.
                </p>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-stone-border flex items-center justify-between text-body-sm font-body-sm text-outline">
                <span>Primary Transit</span>
                <span className="text-secondary font-semibold">Verified Log</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-bento-card ui-liquid-glass relative overflow-hidden p-6 rounded-xl bg-white border border-stone-border flex flex-col justify-between hover:shadow-lg transition-all duration-300 h-full group">
              {/* Background mountain road route photo subtle watermark */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.06] group-hover:opacity-[0.11] group-hover:scale-105 transition-all duration-700 pointer-events-none"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4_pSUGVByb8tRsOgvYLcjqOSZuJEgmBQNsrBn9ktd6GNSl2TwY3_YsNexZ889EO2CwWr_dwxJSaUTyUa9XkQxNcFwpzSMB4DngDNT8i9UVFYY49u0jHQZOFGEH1PAEhDVUvLhkM-uFZ2vt2UaBbHp-8OE1dWoEgdwo4OJOcyPEnkOyzPPNU2aK53Dkc0rODEsM4Se4zKXxoZTzqNtZ74AgVz-TIRvaPNodN6u5ReZ7Z2pg2XmI5xm')",
                }}
              ></div>
              {/* Radial gradient glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#0b4f8c]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary-container text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-110 transition-transform duration-300" style={{ background: "#0b4f8c" }}>
                  <span className="material-symbols-outlined text-[24px]">local_hospital</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">Hospital Transfers</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Supporting transportation between local areas and designated healthcare facilities across Mansehra District.
                </p>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-stone-border flex items-center justify-between text-body-sm font-body-sm text-outline">
                <span>DHQ Mansehra &amp; Ayub</span>
                <span className="text-secondary font-semibold">Direct Routing</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-bento-card ui-liquid-glass relative overflow-hidden p-6 rounded-xl bg-white border border-stone-border flex flex-col justify-between hover:shadow-lg transition-all duration-300 h-full group">
              {/* Background mountain terrain photo subtle watermark */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.06] group-hover:opacity-[0.11] group-hover:scale-105 transition-all duration-700 pointer-events-none"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZIijSvdz7PgskI6tzPnYoogzgnRlFzIe-ha-dyx390hEn1dT6xeiOoENb39wwgmy7TTepxn0xdEuQC76ZJibAbbz2ZWYe8OQd6MVpOKE5ViDWhtXqTEY4EmEizJTlWPssvC4wU4vmVzgetEsGzeEipZvPBH3bWiiFZ3JoceuE0pTJx3A3OgQKQbiq4FyKusa2OCUX4CL0v4ZVS51hiTTRbY4qAgQyicRcW4DxJh9EoNTKaKSC_Jq')",
                }}
              ></div>
              {/* Radial gradient glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#2c694e]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-secondary text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-110 transition-transform duration-300" style={{ background: "#2c694e" }}>
                  <span className="material-symbols-outlined text-[24px]">route</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">Remote Area Access</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Providing transportation support for communities located along difficult mountain routes and unpaved paths.
                </p>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-stone-border flex items-center justify-between text-body-sm font-body-sm text-outline">
                <span>Switchback Terrain</span>
                <span className="text-secondary font-semibold">All-Season</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="ui-bento-card ui-liquid-glass relative overflow-hidden p-6 rounded-xl bg-white border border-stone-border flex flex-col justify-between hover:shadow-lg transition-all duration-300 h-full group">
              {/* Background mountain valley community photo subtle watermark */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.06] group-hover:opacity-[0.11] group-hover:scale-105 transition-all duration-700 pointer-events-none"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw21IMTpaFD5aLdTZaRGBDxR1WGZPoEac00Fs1EgLUhwaxDcLgGYSLznhGvRePxzW1u6Kyb1EQhrfJSwcUjaTePBnFRPS5xZySwL2OhQOZqd3FmY0Woygwcf-T56RfPsoM42a5xL_UHNfdTOj3anF7Sfc1KQopl3cLElxWNt8rIYGdInBXvK_oe5au0Xvp18cHi1g9ZVZBqjetGU6coNxFNzqZGGA9sEkFtG2L8VbaRJCyCSE53Aee')",
                }}
              ></div>
              {/* Radial gradient glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-5 border border-stone-border shadow-xs group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">handshake</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">Transportation Assistance</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Helping individuals and families access essential medical transportation when other options are limited.
                </p>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-stone-border flex items-center justify-between text-body-sm font-body-sm text-outline">
                <span>Subsidized / Free</span>
                <span className="text-secondary font-semibold">Community Owned</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AmbulanceCapabilitiesSection;

