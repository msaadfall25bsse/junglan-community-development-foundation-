import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DONATION_FLOW_STEPS } from "@/data/content";
import { ArrowRight, ShieldCheck, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DonationImpactFlow() {
  return (
    <section id="how-support-works" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
      <Container>
        <SectionHeader
          badge="Transparency & Accountability"
          badgeVariant="sky"
          title="How Your Support Directly Reaches the Field"
          subtitle="We operate with a strict transparency policy: zero diversion, audited operational disbursements, and real-time community delivery."
          className="[&>h2]:text-white [&>p]:text-slate-400"
        />

        {/* 4-Stage Flow Layout: Horizontal on Desktop / Vertical on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
          {DONATION_FLOW_STEPS.map((step, index) => (
            <div key={step.stepNumber} className="relative flex flex-col justify-between">
              {/* Card Surface */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-sky-400 font-mono tracking-wider">
                      {step.stepNumber}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-sky-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.title}
                  </h3>

                  <div className="text-xs font-medium text-sky-300 mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/50 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Verified Step</span>
                </div>
              </div>

              {/* Connector Arrow for Desktop (hidden on last item) */}
              {index < DONATION_FLOW_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-sky-500 text-slate-950 items-center justify-center shadow-md pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}

              {/* Down Arrow for Mobile (hidden on last item) */}
              {index < DONATION_FLOW_STEPS.length - 1 && (
                <div className="flex lg:hidden justify-center my-2 text-sky-400">
                  <ChevronDown className="w-6 h-6 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stewardship Pledge Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-800 border border-sky-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="font-bold text-white text-base">
                Our 100% Direct Allocation Guarantee
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                All donations are explicitly dedicated to operational costs (ambulance fuel, emergency medical supplies, and farmer olive saplings). Administrative overhead is strictly audited.
              </p>
            </div>
          </div>

          <Button
            href="/donate"
            variant="primary"
            size="md"
            className="shrink-0 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold border-none"
          >
            Support This Flow
          </Button>
        </div>
      </Container>
    </section>
  );
}
