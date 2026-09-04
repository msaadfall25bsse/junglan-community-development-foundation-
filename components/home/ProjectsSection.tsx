"use client";

import React from "react";
import Link from "next/link";
import {
  Ambulance,
  Sprout,
  Building2,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "@/data/homepage-data";

interface ProjectsSectionProps {
  onOpenDonateModal: (projectName?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenDonateModal }) => {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Targeted Interventions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Projects
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Our work focuses on practical initiatives that improve lives and strengthen local communities across essential dimensions of human well-being.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => {
            const isHealthcare = project.id === "healthcare-ambulance";
            const isAgriculture = project.id === "agriculture-olive";
            const isComingSoon = project.status === "Coming Soon";

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
                {/* Card Top Banner / Visual Area */}
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

                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-black/20 text-slate-200 border border-white/10 flex items-center gap-1">
                      {isComingSoon ? (
                        <Clock className="w-3 h-3 text-amber-400" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      {project.status}
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

                  {/* Card Bottom CTA Actions */}
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
                          className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-700 font-bold text-xs rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
                        >
                          <span>{project.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => onOpenDonateModal(project.title)}
                          className="py-2.5 px-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 shrink-0"
                          title={`Support ${project.category}`}
                        >
                          <span>Support</span>
                        </button>
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
