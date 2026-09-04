import React from "react";
import { FolderOpen, SearchX, FileX } from "lucide-react";

type EmptyStatePreset = "default" | "search" | "file";

interface EmptyStateProps {
  preset?: EmptyStatePreset;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const presetIcons: Record<EmptyStatePreset, React.ReactNode> = {
  default: <FolderOpen className="w-10 h-10 text-sky-400" />,
  search:  <SearchX  className="w-10 h-10 text-slate-400" />,
  file:    <FileX    className="w-10 h-10 text-slate-400" />,
};

const presetTitles: Record<EmptyStatePreset, string> = {
  default: "No data yet",
  search:  "No results found",
  file:    "No files found",
};

const presetDescriptions: Record<EmptyStatePreset, string> = {
  default: "There are no items to display at this time.",
  search:  "Try adjusting your search terms or filters.",
  file:    "No files have been uploaded yet.",
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  preset = "default",
  icon,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center text-center px-6 py-16 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm">
        {icon ?? presetIcons[preset]}
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">
        {title ?? presetTitles[preset]}
      </h3>
      <p className="text-sm text-slate-500 max-w-xs">
        {description ?? presetDescriptions[preset]}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
