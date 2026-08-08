import reportsRepository from "@features/reports/infrastructure/reportsRepository";

export async function getReportsOverviewUseCase() {
  const [revenueTrend, occupancyByBuilding, complaintsByStatus, studentsByPaymentStatus] = await Promise.all([
    reportsRepository.fetchRevenueTrend(),
    reportsRepository.fetchOccupancyByBuilding(),
    reportsRepository.fetchComplaintsByStatus(),
    reportsRepository.fetchStudentsByPaymentStatus(),
  ]);

  const totalRevenue = revenueTrend.reduce((sum, month) => sum + month.collected, 0);
  const totalStudents = studentsByPaymentStatus.reduce((sum, item) => sum + item.value, 0);
  const avgOccupancyRate = occupancyByBuilding.length
    ? Math.round(occupancyByBuilding.reduce((sum, b) => sum + b.occupancyRate, 0) / occupancyByBuilding.length)
    : 0;
  const openComplaints = complaintsByStatus
    .filter((item) => item.name !== "Resolved")
    .reduce((sum, item) => sum + item.value, 0);

  return {
    revenueTrend,
    occupancyByBuilding,
    complaintsByStatus,
    studentsByPaymentStatus,
    summary: { totalRevenue, totalStudents, avgOccupancyRate, openComplaints },
  };
}
