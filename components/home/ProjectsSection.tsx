"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Ambulance,
  Sprout,
  Building2,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Heart,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";
import { PROJECTS_DATA } from "@/data/homepage-data";
import { Button, SectionHeader } from "@/components/ui";

interface ProjectsSectionProps {
  onOpenDonateModal: (projectName?: string) => void;
}

type CategoryFilter = "ALL" | "Healthcare" | "Agriculture" | "Community Development";

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenDonateModal }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("ALL");

  const categories: { label: string; value: CategoryFilter; count: number }[] = [
    { label: "All Initiatives", value: "ALL", count: PROJECTS_DATA.length },
    {
      label: "Healthcare & Emergency",
      value: "Healthcare",
      count: PROJECTS_DATA.filter((p) => p.category === "Healthcare").length,
    },
    {
      label: "Olive Agriculture",
      value: "Agriculture",
      count: PROJECTS_DATA.filter((p) => p.category === "Agriculture").length,
    },
    {
      label: "Community Development",
      value: "Community Development",
      count: PROJECTS_DATA.filter((p) => p.category === "Community Development").length,
    },
  ];

  const filteredProjects =
    activeFilter === "ALL"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  // Field progress stats for visual progress meter
  const progressMap: Record<
    string,
    { label: string; current: string; target: string; percent: number }
  > = {
    "healthcare-ambulance": {
      label: "Emergency Dispatch Operability",
      current: "1,850+ Runs",
      target: "24/7 Continuous",
      percent: 100,
    },
    "agriculture-olive": {
      label: "Olive Saplings Planted",
      current: "15,000",
      target: "50,000 Target",
      percent: 30,
    },
    "community-construction": {
      label: "Site Assessment & Planning",
      current: "Phase 1 Planning",
      target: "Groundbreaking 2026",
      percent: 65,
    },
  };

  return (
    <section
      id="projects"
      aria-label="Core Initiatives and Field Projects"
      className="py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          tag="Field Projects & Initiatives"
          tagIcon={<Layers className="w-3.5 h-3.5" />}
          title="Practical Programs with Verified Impact"
          subtitle="Our field missions are strictly prioritized around fundamental human needs: emergency medical transit to save lives, commercial olive farming to eradicate poverty, and community infrastructure to secure dignity."
          align="center"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex-wrap justify-center">
            <span className="hidden sm:flex items-center gap-1 text-xs font-bold text-slate-400 px-3">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveFilter(cat.value)}
                className={[
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                  activeFilter === cat.value
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-sky-700 hover:bg-slate-100",
                ].join(" ")}
              >
                <span>{cat.label}</span>
                <span
                  className={[
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    activeFilter === cat.value
                      ? "bg-sky-700 text-white"
                      : "bg-slate-200 text-slate-600",
                  ].join(" ")}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isHealthcare = project.id === "healthcare-ambulance";
            const isAgriculture = project.id === "agriculture-olive";
            const isComingSoon = project.status === "Coming Soon";
            const progress = progressMap[project.id];

            return (
              <div
                key={project.id}
                className={`relative rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                  isHealthcare
                    ? "border-sky-200 hover:border-sky-400"
                    : isAgriculture
                    ? "border-emerald-200 hover:border-emerald-400"
                    : "border-slate-200 hover:border-indigo-300"
                }`}
              >
                {/* Card Top Visual Banner */}
                <div
                  className={`p-6 text-white relative overflow-hidden ${
                    isHealthcare
                      ? "bg-gradient-to-br from-sky-700 via-sky-800 to-slate-900"
                      : isAgriculture
                      ? "bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900"
                      : "bg-gradient-to-br from-indigo-800 via-slate-800 to-slate-900"
                  }`}
                >
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

                  {/* Badges Row */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isHealthcare
                          ? "bg-sky-500/30 text-sky-200 border border-sky-400/30"
                          : isAgriculture
                          ? "bg-emerald-500/30 text-emerald-200 border border-emerald-400/30"
                          : "bg-indigo-500/30 text-indigo-200 border border-indigo-400/30"
                      }`}
                    >
                      {project.category}
                    </span>

                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-black/25 text-slate-100 border border-white/10 flex items-center gap-1.5">
                      {isComingSoon ? (
                        <Clock className="w-3 h-3 text-amber-400" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      <span>{project.status}</span>
                    </span>
                  </div>

                  {/* Icon Emblem & Title */}
                  <div className="relative z-10 space-y-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-md ${
                        isHealthcare
                          ? "bg-white/15 text-sky-200 border border-white/20"
                          : isAgriculture
                          ? "bg-white/15 text-emerald-200 border border-white/20"
                          : "bg-white/15 text-indigo-200 border border-white/20"
                      }`}
                    >
                      {isHealthcare && <Ambulance className="w-6 h-6 text-white" />}
                      {isAgriculture && <Sprout className="w-6 h-6 text-emerald-200" />}
                      {isComingSoon && <Building2 className="w-6 h-6 text-indigo-200" />}
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Milestone Progress Bar */}
                    {progress && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-sky-600" />
                            {progress.label}
                          </span>
                          <span className="text-slate-900 font-bold">{progress.current}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isHealthcare
                                ? "bg-sky-600"
                                : isAgriculture
                                ? "bg-emerald-600"
                                : "bg-indigo-600"
                            }`}
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Progress</span>
                          <span>{progress.target}</span>
                        </div>
                      </div>
                    )}

                    {/* Key Interventions Checklist */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Interventions:
                      </div>
                      {project.impactMetrics.map((metric, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isHealthcare
                                ? "text-sky-600"
                                : isAgriculture
                                ? "text-emerald-600"
                                : "text-indigo-600"
                            }`}
                          />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                    {isComingSoon ? (
                      <div className="w-full py-2.5 px-4 bg-slate-100 text-slate-500 font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>In Planning & Community Review</span>
                      </div>
                    ) : (
                      <>
                        <Link
                          href={project.ctaLink}
                          className="flex-1"
                        >
                          <Button
                            variant="secondary"
                            size="sm"
                            fullWidth
                            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          >
                            {project.ctaText}
                          </Button>
                        </Link>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onOpenDonateModal(project.title)}
                          leftIcon={<Heart className="w-3.5 h-3.5 fill-white" />}
                          className="shrink-0"
                          title={`Support ${project.category}`}
                        >
                          Support
                        </Button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
