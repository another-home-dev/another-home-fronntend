import paymentRepository from "@features/payments/infrastructure/paymentRepository";

export async function getPaymentsPageUseCase(params) {
  return paymentRepository.fetchPage(params);
}
