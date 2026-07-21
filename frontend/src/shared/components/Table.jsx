import { cn } from "@shared/utils/cn";
import EmptyState from "@shared/components/EmptyState";
import Spinner from "@shared/components/Spinner";

export default function Table({ columns, data, keyField = "id", loading = false, emptyMessage = "No records found", onRowClick }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row[keyField]}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60",
                onRowClick && "cursor-pointer"
              )}
            >
              {columns.map((column) => (
                <td key={column.key} className="whitespace-nowrap px-5 py-4 text-slate-700 dark:text-slate-300">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
