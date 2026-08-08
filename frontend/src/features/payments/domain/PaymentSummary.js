export class PaymentSummary {
  constructor(payments) {
    this.payments = payments;
  }

  get totalCollected() {
    return this.payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  }

  get totalPending() {
    return this.payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  }

  get totalOverdue() {
    return this.payments.filter((p) => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0);
  }
}
