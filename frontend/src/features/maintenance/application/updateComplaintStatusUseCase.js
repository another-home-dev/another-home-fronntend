import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";

export async function updateComplaintStatusUseCase(id, status) {
  return maintenanceRepository.updateStatus(id, status);
}
