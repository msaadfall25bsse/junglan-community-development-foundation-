import Link from "next/link";

// ==============================================================================
// UNAUTHORIZED PAGE — /unauthorized (403)
// ==============================================================================
// Section 132, 133 — Shown when an authenticated user tries to access a route
// they don't have permission for (e.g., DATA_ENTRY user accessing /admin).
// Clean, informative — NO internal stack traces or server details exposed.
// ==============================================================================

export const metadata = {
  title: "Access Denied | Junglan Community Development Foundation",
  description: "You do not have permission to access this page.",
  robots: { index: false, follow: false },
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">

        {/* 403 Icon */}
        <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        {/* Error Code */}
        <p className="text-6xl font-black text-red-400 mb-2 tracking-tight">403</p>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Access Denied
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-base mb-8 leading-relaxed">
          You do not have permission to access this page.
          <br />
          If you believe this is an error, please contact your Foundation administrator.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            id="unauthorized-home-link"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Go to Homepage
          </Link>

          <Link
            href="/login"
            id="unauthorized-login-link"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sign In with Different Account
          </Link>
        </div>

        {/* Foundation branding */}
        <p className="text-slate-600 text-xs mt-10">
          Junglan Community Development Foundation — Staff Portal
        </p>
      </div>
    </div>
  );
}
