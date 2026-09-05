"use client";

import React, { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { HOMEPAGE_PROJECTS } from "@/data/content";
import { Truck, Sprout, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categoryIcons = {
    HEALTHCARE: <Truck className="w-5 h-5 text-red-600" />,
    AGRICULTURE: <Sprout className="w-5 h-5 text-emerald-600" />,
    COMMUNITY: <Users className="w-5 h-5 text-amber-600" />,
  };

  const categoryBadgeVariant = {
    HEALTHCARE: "danger" as const,
    AGRICULTURE: "success" as const,
    COMMUNITY: "warning" as const,
  };

  const filteredProjects =
    selectedCategory === "ALL"
      ? HOMEPAGE_PROJECTS
      : HOMEPAGE_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <PublicLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-20 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Community Programs"
            badgeVariant="sky"
            title="Our Active Projects & Future Roadmaps"
            subtitle="Explore our targeted interventions designed to save lives in emergency medical transit and build self-sustaining community wealth through olive agriculture."
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {["ALL", "HEALTHCARE", "AGRICULTURE", "COMMUNITY"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Initiatives" : cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Listing Grid */}
      <section className="py-16 sm:py-20 bg-slate-50/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const isComingSoon = project.status === "COMING_SOON";

              return (
                <Card
                  key={project.slug}
                  hoverEffect={!isComingSoon}
                  className={
                    isComingSoon
                      ? "border-dashed bg-slate-50/60 flex flex-col justify-between"
                      : "flex flex-col justify-between bg-white"
                  }
                >
                  <div>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-slate-100/80">
                            {categoryIcons[project.category]}
                          </div>
                          <Badge
                            variant={categoryBadgeVariant[project.category]}
                            size="sm"
                          >
                            {project.category}
                          </Badge>
                        </div>

                        <Badge
                          variant={isComingSoon ? "warning" : "success"}
                          dot
                          size="sm"
                        >
                          {isComingSoon ? "Coming Soon" : "Active"}
                        </Badge>
                      </div>

                      <CardTitle className="text-xl font-bold text-slate-950 mb-1">
                        {project.title}
                      </CardTitle>

                      <div className="text-xs font-semibold text-sky-700 mb-3">
                        {project.tagline}
                      </div>

                      <CardDescription className="text-sm text-slate-600 leading-relaxed">
                        {project.summary}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Program Highlights:
                        </div>
                        {project.impactMetrics.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-xs font-medium text-slate-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  <CardFooter className="mt-auto">
                    <span className="text-xs font-semibold text-slate-500">
                      {isComingSoon ? "Survey Phase" : "Operational"}
                    </span>
                    <Button
                      href={`/projects/${project.slug}`}
                      variant={isComingSoon ? "outline" : "primary"}
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {project.ctaText}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
