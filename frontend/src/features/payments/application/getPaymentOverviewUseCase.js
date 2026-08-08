import paymentRepository from "@features/payments/infrastructure/paymentRepository";
import { PaymentSummary } from "@features/payments/domain/PaymentSummary";

export async function getPaymentOverviewUseCase() {
  const payments = await paymentRepository.fetchAll();
  return new PaymentSummary(payments);
}
