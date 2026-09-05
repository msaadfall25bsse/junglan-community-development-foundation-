import React from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Compass, Home, PhoneCall, FolderGit2 } from "lucide-react";
import { FOUNDATION_INFO } from "@/data/content";

export default function NotFound() {
  return (
    <PublicLayout>
      <section className="py-24 sm:py-32 bg-gradient-to-b from-sky-50/50 via-white to-white flex-1 flex items-center justify-center">
        <Container>
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center mx-auto shadow-2xs">
              <Compass className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                404 — Page Not Located
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                The Requested Page Could Not Be Found
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                The link you followed may have been updated, relocated, or is no longer accessible. Please explore our primary foundation portals below.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button href="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                Return to Homepage
              </Button>
              <Button href="/projects" variant="outline" size="md" leftIcon={<FolderGit2 className="w-4 h-4" />}>
                Explore Projects
              </Button>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
              <span>Looking for emergency assistance?</span>
              <a
                href={`tel:${FOUNDATION_INFO.hotline}`}
                className="font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>24/7 Helpline: {FOUNDATION_INFO.hotline}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
