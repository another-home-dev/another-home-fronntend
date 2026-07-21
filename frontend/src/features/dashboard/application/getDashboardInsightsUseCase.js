import dashboardRepository from "@features/dashboard/infrastructure/dashboardRepository";

export async function getDashboardInsightsUseCase() {
  const [paymentTrend, occupancyBreakdown, maintenanceStats, recentActivity] = await Promise.all([
    dashboardRepository.fetchPaymentTrend(),
    dashboardRepository.fetchOccupancyBreakdown(),
    dashboardRepository.fetchMaintenanceStats(),
    dashboardRepository.fetchRecentActivity(),
  ]);

  return { paymentTrend, occupancyBreakdown, maintenanceStats, recentActivity };
}
