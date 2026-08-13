import { exportToCsv } from "@shared/utils/exportCsv";

export function exportReportUseCase(revenueTrend) {
  const rows = revenueTrend.map((month) => ({
    Month: month.month,
    Collected: month.collected,
    Pending: month.pending,
    Overdue: month.overdue,
  }));

  exportToCsv(`hostel-report-${Date.now()}.csv`, rows);
}
