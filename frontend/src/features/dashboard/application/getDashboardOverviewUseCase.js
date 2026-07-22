import dashboardRepository from "@features/dashboard/infrastructure/dashboardRepository";
import { DashboardMetrics } from "@features/dashboard/domain/DashboardMetrics";

export async function getDashboardOverviewUseCase() {
  const raw = await dashboardRepository.fetchOverview();
  return new DashboardMetrics(raw);
}
