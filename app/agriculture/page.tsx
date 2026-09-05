import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sprout,
  Droplets,
  TrendingUp,
  ShieldCheck,
  Users,
  Leaf,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Olive & Zaitoon Sustainable Agriculture | Junglan Community Development Foundation",
  description:
    "Empowering rural mountain farmers through commercial olive cultivation in Hazara. Distributing certified saplings, water-saving drip irrigation, and generational economic self-reliance.",
  openGraph: {
    title: "Olive Agriculture Initiative | Junglan Community Development Foundation",
    description:
      "Transforming arid terraces into productive olive orchards. Building sustainable economic livelihoods for smallholder farming families in District Mansehra.",
  },
};

export default function AgriculturePage() {
  const agriculturalPillars = [
    {
      title: "Climate-Resilient Cultivars",
      description:
        "Propagation of certified Mediterranean varieties (Coratina, Arbequina, and Leccino) scientifically adapted to Hazara's soil pH and microclimates.",
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      badge: "High-Yield Varieties",
    },
    {
      title: "Water-Saving Drip Irrigation",
      description:
        "Training farmers to install gravity-fed drip systems on steep terraces, reducing water usage by up to 60% compared to traditional flood methods.",
      icon: <Droplets className="w-6 h-6 text-sky-600" />,
      badge: "Water Efficiency",
    },
    {
      title: "Smallholder Direct Subsidies",
      description:
        "Supplying saplings and essential organic fertilizers at zero or heavily subsidized rates directly to verified smallholder families owning under 2 acres.",
      icon: <Users className="w-6 h-6 text-amber-600" />,
      badge: "Farmer First",
    },
    {
      title: "Generational Economic Prosperity",
      description:
        "An olive tree bears fruit for centuries. Once mature, a 50-tree orchard can generate stable, recurring annual income from extra virgin olive oil.",
      icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
      badge: "Generational Asset",
    },
  ];

  const developmentPhases = [
    {
      year: "Phase 1: Nursery & Trials",
      status: "Active (2025–2026)",
      detail:
        "Establishing 5,000+ sapling demonstration plots, conducting soil nutrient profiling, and testing winter frost resilience in Junglan Valley.",
    },
    {
      year: "Phase 2: Farmer Distribution",
      status: "Upcoming (2026–2027)",
      detail:
        "Direct distribution of certified saplings to 100+ smallholder farming households across Oghi and Balakot corridors with hands-on pruning workshops.",
    },
    {
      year: "Phase 3: Cooperative Harvest & Oil Extraction",
      status: "Future (2028+)",
      detail:
        "Establishing localized community olive pressing units to eliminate commercial middlemen and maximize profit margins for local growers.",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="success" size="md">
              Primary Economic Initiative
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Transforming Mountain Terraces into Sustainable Olive Orchards
            </h1>

            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Equal in priority to emergency healthcare, our agriculture program builds permanent generational self-reliance for vulnerable mountain households through climate-smart olive farming.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button href="/donate" variant="primary" size="lg" className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600">
                Sponsor Olive Saplings
              </Button>
              <Button href="/projects" variant="outline" size="lg">
                View Project Details
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Olive Cultivation Matters */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="sky" size="sm">
                Strategic Rationale
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Olive Farming is the Ideal Solution for Hazara
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Traditional rain-fed crops like maize and wheat offer diminishing returns on steep rocky hillsides, leaving mountain families financially vulnerable to seasonal droughts and high fertilizer costs.
                </p>
                <p>
                  Olives, by contrast, thrive in stony, well-drained mountain soil and require significantly less water once roots are established. Pakistan currently imports over 80% of its edible oils; establishing local olive production addresses both household poverty and regional food security.
                </p>
                <p className="font-semibold text-slate-800">
                  Every 100 saplings planted today establish an enduring economic endowment that will support children, grandchildren, and entire village cooperatives for generations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  <strong>Scientifically Verified:</strong> Our cultivars are selected in alignment with provincial agricultural research guidelines to guarantee high fruit set and oil content.
                </span>
              </div>
            </div>

            {/* Strategic Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agriculturalPillars.map((p) => (
                <div
                  key={p.title}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-white transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="p-2.5 rounded-xl bg-white text-slate-800 w-fit mb-3 shadow-2xs border border-slate-100">
                      {p.icon}
                    </div>
                    <div className="font-bold text-slate-900 text-sm mb-1">
                      {p.title}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <Badge variant="success" size="sm" className="mt-4 w-fit">
                    {p.badge}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Long-Term Development Roadmap */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Strategic Timeline"
            badgeVariant="sky"
            title="Our 3-Phase Agricultural Roadmap"
            subtitle="Methodical implementation designed for sustainability, local ownership, and measurable economic uplift."
          />

          <div className="max-w-4xl mx-auto space-y-4 mb-12">
            {developmentPhases.map((phase) => (
              <div
                key={phase.year}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-bold text-slate-900">
                      {phase.year}
                    </h3>
                    <Badge
                      variant={phase.status.includes("Active") ? "success" : "neutral"}
                      size="sm"
                    >
                      {phase.status}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {phase.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              href="/donate"
              variant="primary"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
              leftIcon={<Sprout className="w-4 h-4" />}
            >
              Sponsor 10 Olive Saplings (PKR 5,000)
            </Button>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
