import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  IMPACT_PAGE_DATA,
  IMPACT_METRICS,
  DONATION_FLOW_STEPS,
} from "@/data/content";
import {
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  PieChart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Impact & Verification | Junglan Community Development Foundation",
  description:
    "Explore our verified field metrics, fund allocation breakdown, patient case studies, and transparent donation lifecycle.",
  openGraph: {
    title: "Our Impact | Junglan Community Development Foundation",
    description:
      "100% transparent stewardship. Discover how our emergency ambulance service and olive agriculture projects impact rural Hazara.",
  },
};

export default function ImpactPage() {
  return (
    <PublicLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge={IMPACT_PAGE_DATA.hero.badge}
            badgeVariant="sky"
            title={IMPACT_PAGE_DATA.hero.title}
            subtitle={IMPACT_PAGE_DATA.hero.subtitle}
          />
        </Container>
      </section>

      {/* Key Verified Metrics */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {IMPACT_METRICS.map((metric) => (
              <div
                key={metric.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="sky" size="sm">
                      {metric.badge}
                    </Badge>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800 mb-2">
                    {metric.label}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center max-w-2xl mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Integrity Pledge:</strong> We do not fabricate achievements. Metrics are verified against official hospital registers and bank slips.
            </span>
          </div>
        </Container>
      </section>

      {/* Fund Allocation Stewardship */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge="Financial Integrity"
              badgeVariant="sky"
              title="Where Every Contribution Goes"
              subtitle="0% administrative leakage. 100% of donor funding is channeled into verified operational equipment, ambulance fuel, and agricultural saplings."
            />

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <PieChart className="w-4 h-4 text-sky-600" />
                  <span>Program Expenditure Breakdown</span>
                </div>
                <Badge variant="success" size="sm">
                  100% Reconciled
                </Badge>
              </div>

              {/* Progress Stack */}
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                {IMPACT_PAGE_DATA.fundAllocation.map((item) => (
                  <div
                    key={item.category}
                    style={{ width: `${item.percentage}%` }}
                    className={`${item.color} h-full transition-all`}
                    title={`${item.category}: ${item.percentage}%`}
                  />
                ))}
              </div>

              {/* Breakdown Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {IMPACT_PAGE_DATA.fundAllocation.map((item) => (
                  <div
                    key={item.category}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {item.category}
                        </div>
                        <span className="font-extrabold text-sky-700 text-sm">
                          {item.percentage}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <div>Board of Trustees Administrative Cost: <strong>0.0% (Volunteer Financed)</strong></div>
                <Button href="/reports" variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Inspect Public Audit Statements
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Verified Real-World Case Studies */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Field Stories"
            badgeVariant="sky"
            title="Real Lives, Tangible Outcomes"
            subtitle="Verified human impact made possible through community donors and responsive mountain rescue protocols."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {IMPACT_PAGE_DATA.verifiedCaseStudies.map((cs) => (
              <div
                key={cs.id}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={cs.category === "Healthcare Rescue" ? "danger" : "success"} size="sm">
                      {cs.category}
                    </Badge>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {cs.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                    {cs.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {cs.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-sky-700">{cs.metric}</span>
                  <span className="text-slate-400 font-medium">Verified Field Log</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4-Step Transparency Flow */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Transparency Pipeline"
            badgeVariant="sky"
            title="The 4-Step Stewardship Journey"
            subtitle="How donor trust translates directly into lives protected and communities empowered."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {DONATION_FLOW_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between text-center relative"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-4 border border-sky-100 font-mono font-black text-base">
                    {step.stepNumber}
                  </div>
                  <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-1">
                    {step.subtitle}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href="/donate" variant="primary" size="lg" leftIcon={<HeartHandshake className="w-4 h-4" />}>
              Make an Impact Today
            </Button>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
