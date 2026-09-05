import { ShieldCheck, Database, Layers, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>Part 1: Architecture Baseline Established</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          Junglan Community Development Foundation
        </h1>

        <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-lg mx-auto">
          Core technical architecture baseline, domain type layer, strict RBAC authorization, and PostgreSQL Prisma schema are verified and ready for sequential Part 2 development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700 mb-2">
              <Layers className="w-4 h-4" />
            </div>
            <div className="font-semibold text-slate-800 text-sm">Public & Private</div>
            <div className="text-xs text-slate-500 mt-1">Strict boundary between public site & admin/data-entry.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-semibold text-slate-800 text-sm">Strict RBAC</div>
            <div className="text-xs text-slate-500 mt-1">Enforced permissions for ADMIN and DATA_ENTRY.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 mb-2">
              <Database className="w-4 h-4" />
            </div>
            <div className="font-semibold text-slate-800 text-sm">PostgreSQL Base</div>
            <div className="text-xs text-slate-500 mt-1">Single source of truth with YearPeriod isolation.</div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Client: Junglan Foundation</span>
          <span className="inline-flex items-center gap-1 font-medium text-slate-600">
            Ready for Part 2 Frontend <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </main>
  );
}
