import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHomeIcon = true,
  className = "",
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={["flex items-center gap-1 text-sm text-slate-500 flex-wrap", className].filter(Boolean).join(" ")}
    >
      {showHomeIcon && (
        <>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-sky-700 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
          {items.length > 0 && (
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          )}
        </>
      )}

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {isLast ? (
              <span
                aria-current="page"
                className="font-semibold text-slate-800 max-w-[180px] truncate"
              >
                {item.label}
              </span>
            ) : (
              <>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-sky-700 transition-colors font-medium max-w-[140px] truncate"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="max-w-[140px] truncate">{item.label}</span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
