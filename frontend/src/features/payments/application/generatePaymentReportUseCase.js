import paymentRepository from "@features/payments/infrastructure/paymentRepository";
import { exportToCsv } from "@shared/utils/exportCsv";

export async function generatePaymentReportUseCase(status = "All") {
  const payments = await paymentRepository.fetchAll();
  const filtered = status === "All" ? payments : payments.filter((payment) => payment.status === status);

  const rows = filtered.map((payment) => ({
    Student: payment.studentName,
    Room: payment.roomNumber ?? "Unassigned",
    Building: payment.buildingName ?? "-",
    Month: payment.month,
    Amount: payment.amount,
    Status: payment.status,
    "Paid On": payment.paidOn ?? "-",
  }));

  exportToCsv(`payment-report-${Date.now()}.csv`, rows);
}
