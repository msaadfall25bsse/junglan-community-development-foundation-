import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Building2,
  Droplets,
  GraduationCap,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Future Projects & Expansion | Junglan Community Development Foundation",
  description:
    "Explore upcoming civic development initiatives planned for Junglan Valley: Clean water filtration, vocational workshops, and community infrastructure.",
  openGraph: {
    title: "Future Projects | Junglan Community Development Foundation",
    description:
      "Planning future sustainable community infrastructure for remote settlements in Khyber Pakhtunkhwa. Feasibility and survey phases.",
  },
};

export default function FutureProjectsPage() {
  const upcomingInitiatives = [
    {
      title: "Clean Drinking Water Filtration Stations",
      category: "Water & Sanitation",
      description:
        "Gravity-fed communal water filtration stations to eliminate waterborne gastrointestinal illnesses in high-altitude hamlets without municipal supply.",
      status: "Feasibility Survey",
      icon: <Droplets className="w-6 h-6 text-sky-600" />,
      targetTimeline: "Targeted 2027",
    },
    {
      title: "Youth Technical & Vocational Center",
      category: "Education & Skills",
      description:
        "Practical training workshops in solar installation, motorcycle mechanics, electrical wiring, and olive nursery grafting for rural youth.",
      status: "Concept Planning",
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
      targetTimeline: "Targeted 2027–2028",
    },
    {
      title: "Community Assembly & Disaster Relief Depot",
      category: "Civil Infrastructure",
      description:
        "A weather-hardened multipurpose hall serving as an emergency distribution hub during winter snowstorms and monsoon road blockages.",
      status: "Blueprint Stage",
      icon: <Building2 className="w-6 h-6 text-amber-600" />,
      targetTimeline: "Targeted 2028",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="neutral" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              Strategic Horizon
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Future Community Development Initiatives
            </h1>

            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              While our immediate focus remains on emergency healthcare and olive agriculture, the Foundation is planning critical civic infrastructure projects to address long-term community bottlenecks.
            </p>

            <div className="inline-flex items-center gap-2 p-3 px-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Integrity Policy:</strong> These projects are currently in planning/survey phases and are not yet operational.
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Planned Projects Grid */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="In Planning"
            badgeVariant="neutral"
            title="Upcoming Civic Development Blueprints"
            subtitle="Carefully evaluated projects designed to support generational progress once health and farming baselines are secure."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {upcomingInitiatives.map((item) => (
              <Card key={item.title} className="flex flex-col justify-between bg-white border-slate-200/90 shadow-2xs hover:shadow-sm transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      {item.icon}
                    </div>
                    <Badge variant="warning" size="sm">
                      Coming Soon
                    </Badge>
                  </div>

                  <div className="text-xs font-bold text-indigo-700 mb-1">
                    {item.category}
                  </div>

                  <CardTitle className="text-lg font-bold text-slate-900 mb-3">
                    {item.title}
                  </CardTitle>

                  <CardDescription className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <div className="p-4 mx-6 mb-6 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="text-slate-500">{item.status}</span>
                  <span className="text-indigo-700 font-mono text-[11px]">{item.targetTimeline}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Consultation Note */}
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Community Consultation Process
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every future construction or infrastructure blueprint is developed in direct dialogue with local village councils (Jirgas), local teachers, and healthcare workers to ensure complete community alignment.
            </p>
            <div className="pt-2">
              <Button href="/contact" variant="outline" size="md">
                Share Feedback or Suggestions
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
