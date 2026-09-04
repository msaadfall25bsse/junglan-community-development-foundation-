"use client";

import React, { useState } from "react";
import { Calendar, Clock, ArrowRight, Newspaper, Bookmark, Check } from "lucide-react";
import { NEWS_DATA, NewsItem } from "@/data/homepage-data";

export const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  return (
    <section id="news" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5 text-sky-600" />
              <span>Stories From The Ground</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Latest News & Updates
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Stay informed about our latest field interventions, ambulance dispatches, and agricultural milestones.
            </p>
          </div>

          <div className="text-xs font-bold text-sky-700 bg-sky-50 px-3.5 py-2 rounded-xl border border-sky-100 shrink-0 self-start sm:self-auto">
            Updated Bi-Weekly
          </div>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_DATA.map((article) => {
            const isHealthcare = article.category === "Healthcare";
            const isAgriculture = article.category === "Agriculture";

            return (
              <article
                key={article.id}
                className="group rounded-3xl bg-white border border-slate-200/80 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl"
              >
                {/* Visual Header / Banner */}
                <div
                  className={`h-48 p-6 text-white relative overflow-hidden flex flex-col justify-between ${
                    isHealthcare
                      ? "bg-gradient-to-br from-sky-800 to-slate-900"
                      : isAgriculture
                      ? "bg-gradient-to-br from-emerald-800 to-slate-900"
                      : "bg-gradient-to-br from-indigo-800 to-slate-900"
                  }`}
                >
                  {/* Subtle Grid Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

                  {/* Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${article.badgeColor}`}
                    >
                      {article.category}
                    </span>
                    <span className="text-[11px] text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Date Tag */}
                  <div className="relative z-10 flex items-center gap-1.5 text-xs text-sky-200">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1.5 group/btn"
                    >
                      <span>Read Story Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Modal / Quick Read Dialog for Selected Article */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-100 space-y-4 relative">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full">
                    {selectedArticle.category} Report
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">
                    {selectedArticle.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed border border-slate-100">
                {selectedArticle.excerpt}
                <p className="mt-3">
                  Our ground monitoring teams continue to document project milestones, verifying direct donor impact and publishing regular progress reports for community members and global partners.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default NewsSection;
