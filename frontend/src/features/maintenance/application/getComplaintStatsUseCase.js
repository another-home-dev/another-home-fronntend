import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";

export async function getComplaintStatsUseCase() {
  return maintenanceRepository.fetchStats();
}
