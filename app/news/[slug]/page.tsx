import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LATEST_NEWS_ITEMS } from "@/data/content";
import { ArrowLeft, Calendar, User, Share2, HeartHandshake } from "lucide-react";

export function generateStaticParams() {
  return LATEST_NEWS_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = LATEST_NEWS_ITEMS.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const categoryBadgeVariant = {
    HEALTHCARE: "danger" as const,
    AGRICULTURE: "success" as const,
    ANNOUNCEMENT: "sky" as const,
  };

  const otherArticles = LATEST_NEWS_ITEMS.filter((i) => i.slug !== slug);

  return (
    <PublicLayout>
      {/* Article Header */}
      <article className="py-12 sm:py-20 bg-white">
        <Container size="narrow">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to News & Updates</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant={categoryBadgeVariant[article.category]} size="sm">
              {article.category}
            </Badge>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">{article.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.2] mb-6">
            {article.title}
          </h1>

          {/* Author and Date Meta */}
          <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-10 text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-4 h-4 text-slate-400" />
                <span>{article.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>{article.date}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-6">
            <p className="font-semibold text-slate-900 text-lg sm:text-xl leading-snug">
              {article.summary}
            </p>
            {article.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Bottom Callout & Donation Prompt */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-sky-50/80 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Support Operational Continuity in Junglan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md">
                Every contribution directly finances ambulance fuel, vehicle spare parts, and olive sapling distribution.
              </p>
            </div>
            <Button
              href="/donate"
              variant="primary"
              size="md"
              leftIcon={<HeartHandshake className="w-4 h-4" />}
              className="shrink-0"
            >
              Donate to Foundation
            </Button>
          </div>

          {/* Other Recent Stories */}
          {otherArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                More Updates from the Field
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherArticles.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/news/${other.slug}`}
                    className="p-5 rounded-xl bg-slate-50 hover:bg-sky-50/50 border border-slate-100 hover:border-sky-200 transition-all block group"
                  >
                    <div className="text-[11px] font-bold text-sky-700 mb-1">
                      {other.category} • {other.date}
                    </div>
                    <div className="font-bold text-slate-900 text-sm group-hover:text-sky-800 transition-colors leading-snug">
                      {other.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>
    </PublicLayout>
  );
}
