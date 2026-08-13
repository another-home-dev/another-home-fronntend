import visitorRepository from "@features/visitors/infrastructure/visitorRepository";

export async function approveVisitorRequestUseCase(id) {
  return visitorRepository.updateStatus(id, "Approved");
}

export async function rejectVisitorRequestUseCase(id) {
  return visitorRepository.updateStatus(id, "Rejected");
}
