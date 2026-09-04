export const PageLoader: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
    >
      {/* Spinner */}
      <div className="relative w-14 h-14">
        <span className="absolute inset-0 rounded-full border-4 border-sky-100" />
        <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-600 animate-spin-slow" />
      </div>

      {/* Brand label */}
      <p className="mt-5 text-sm font-semibold text-sky-700 tracking-wide animate-pulse">
        JCDF
      </p>
      <p className="text-xs text-slate-400 mt-1">Loading…</p>
    </div>
  );
};

export const InlineLoader: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={["flex items-center justify-center py-12", className].filter(Boolean).join(" ")}
    >
      <div className="relative w-8 h-8">
        <span className="absolute inset-0 rounded-full border-[3px] border-sky-100" />
        <span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-sky-600 animate-spin-slow" />
      </div>
    </div>
  );
};

export default PageLoader;
