export function exportToCsv(filename, rows) {
  if (!rows || rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csvContent = [headers.join(","), ...rows.map((row) => headers.map((key) => escape(row[key])).join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
