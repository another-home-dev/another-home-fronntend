const COLUMN_WIDTHS = ["w-16", "w-32", "w-14", "w-24", "w-16", "w-24", "w-24", "w-28", "w-16"];

export default function ComplaintsTableSkeleton({ rows = 8 }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
              {COLUMN_WIDTHS.map((width, colIndex) => (
                <td key={colIndex} className="px-5 py-4">
                  <div className={`h-4 ${width} animate-pulse rounded-full bg-slate-200 dark:bg-slate-800`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
