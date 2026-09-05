import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeartHandshake, PhoneCall, ShieldCheck, ArrowRight } from "lucide-react";
import { FOUNDATION_INFO } from "@/data/content";

export function FinalCTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/20 blur-[120px] rounded-full" />
      </div>

      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-6 border border-sky-400/30">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Direct Impact • Verified Operational Audits</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Join Us in Building a Healthier, More Resilient Junglan
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            Your generous donation fuels life-saving ambulance fuel for mountain emergencies and funds certified olive saplings that break the cycle of poverty.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              href="/donate"
              variant="primary"
              size="lg"
              leftIcon={<HeartHandshake className="w-5 h-5" />}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold border-none shadow-lg"
            >
              Donate Now via Bank Transfer
            </Button>

            <Button
              href="/reports"
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto bg-slate-800/80 text-white hover:bg-slate-800 border-slate-700"
            >
              Review Financial Reports
            </Button>
          </div>

          {/* Helpline reassurance */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-sky-400" />
              <span>Direct Donor Inquiries: {FOUNDATION_INFO.hotline}</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Registered Non-Profit Foundation in Pakistan</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
