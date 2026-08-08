import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";

export async function getComplaintsUseCase(params) {
  return maintenanceRepository.fetchComplaints(params);
}
