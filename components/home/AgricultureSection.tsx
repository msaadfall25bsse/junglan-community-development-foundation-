import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sprout,
  Sun,
  Droplets,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function AgricultureSection() {
  const agriFeatures = [
    {
      title: "Commercial Variety Seedlings",
      description: "Supplying verified, climate-resilient olive saplings suited to the micro-climate and altitude of Hazara Division.",
      icon: <Sprout className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: "Modern Drip Irrigation Training",
      description: "Training local farmers in high-efficiency water management, conservation, and organic pest control.",
      icon: <Droplets className="w-5 h-5 text-sky-600" />,
    },
    {
      title: "Long-Term Generational Wealth",
      description: "Olive trees yield fruit for decades, transforming low-yielding barren hills into reliable economic assets.",
      icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
    },
    {
      title: "Environmental Soil Protection",
      description: "Deep-root olive plantations stabilize steep mountainous hillsides, preventing soil erosion and mudslides.",
      icon: <Sun className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section id="agriculture" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Highlight Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl bg-white border border-emerald-200/80 shadow-lg p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Olive / Zaitoon Initiative
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sustainable Agriculture Model
                    </p>
                  </div>
                </div>
                <Badge variant="success" dot size="sm">
                  Active Planting
                </Badge>
              </div>

              {/* Strategy Highlights */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-950 space-y-1.5">
                  <div className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Self-Sustaining Community Anchor</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Unlike temporary food parcels, olive orchards generate recurring annual harvest revenue, freeing families from poverty permanently.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-2xl font-black text-slate-900">50+</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Farmers Enrolled
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-2xl font-black text-slate-900">5,000+</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Saplings Targeted
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Badge */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Nursery Plots</span>
                </span>
                <span className="font-semibold text-slate-700">District Mansehra</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Narrative & 4 Pillars of Agriculture */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="success" dot size="md">
                Sustainable Agriculture
              </Badge>
              <span className="text-xs font-semibold text-slate-500">
                Economic Independence
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
              Cultivating Generational Self-Reliance Through Olive Farming
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-normal">
              Pakistan possesses ideal soil and climate conditions for high-quality commercial olive cultivation. Junglan Community Development Foundation equips smallholder farmers with certified saplings, modern irrigation techniques, and ongoing agronomic mentorship.
            </p>

            {/* 4 Feature Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {agriFeatures.map((feat) => (
                <div key={feat.title} className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-50">
                      {feat.icon}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>

            <Button
              href="/projects/olive-agriculture"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Agriculture Program Roadmap
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
