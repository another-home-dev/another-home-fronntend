export const PAYMENT_STATUS_TONE = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
};

export const PAYMENT_STATUS_LABEL = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

// A student's standing is their worst invoice: one overdue invoice makes them
// overdue even if later months are paid. No invoices yet means no status.
export function overallPaymentStatus(payments) {
  if (payments.some((p) => p.status === "overdue")) return "overdue";
  if (payments.some((p) => p.status === "pending")) return "pending";
  return payments.length ? "paid" : undefined;
}

// Accommodation's student record carries no payment status; it lives in Finance.
// Returns studentId -> overall status, from the invoice rows of paymentRepository.
export function paymentStatusByStudent(payments) {
  const byStudent = new Map();
  for (const payment of payments) {
    const rows = byStudent.get(payment.studentId) ?? [];
    rows.push(payment);
    byStudent.set(payment.studentId, rows);
  }
  return new Map([...byStudent].map(([studentId, rows]) => [studentId, overallPaymentStatus(rows)]));
}

export const formatPaymentMonth = (date) => date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

// The trend charts' window: the `count` months ending at the latest invoice due
// date (or this month, if that is later), labelled like payment.month ("Sep 2026").
export function trendMonths(payments, count = 6) {
  const latest = payments.reduce((max, p) => (p.dueDate && new Date(p.dueDate) > max ? new Date(p.dueDate) : max), new Date());
  return Array.from({ length: count }, (_, i) =>
    formatPaymentMonth(new Date(latest.getFullYear(), latest.getMonth() - (count - 1 - i), 1))
  );
}
