import React from "react";

interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: keyof T;
  isLoading?: boolean;
  emptyContent?: React.ReactNode;
  onRowClick?: (row: T) => void;
  caption?: string;
  stickyHeader?: boolean;
}

function DataTable<T extends object>({
  columns,
  rows,
  rowKey,
  isLoading = false,
  emptyContent,
  onRowClick,
  caption,
  stickyHeader = false,
}: DataTableProps<T>) {
  const alignClass = (a?: "left" | "center" | "right") =>
    a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className={stickyHeader ? "sticky top-0 z-10 bg-slate-50" : "bg-slate-50"}>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                className={[
                  "px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200",
                  alignClass(col.align),
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={`skel-${i}`}>
                {columns.map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 bg-slate-100 rounded-full animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12">
                <div className="text-center text-slate-400 text-sm">
                  {emptyContent ?? "No records found."}
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row, rowIdx) => (
              <tr
                key={String(row[rowKey])}
                onClick={() => onRowClick?.(row)}
                className={[
                  "transition-colors",
                  onRowClick ? "cursor-pointer hover:bg-sky-50" : "hover:bg-slate-50/50",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={[
                      "px-4 py-3 text-slate-700 whitespace-nowrap",
                      alignClass(col.align),
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {col.render
                      ? col.render(row, rowIdx)
                      : String(row[col.key as keyof T] ?? "—")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { DataTable };
export type { Column };
export default DataTable;
