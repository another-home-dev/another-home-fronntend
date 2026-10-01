import reportsRepository from "@features/reports/infrastructure/reportsRepository";

export async function getReportsOverviewUseCase() {
  const [revenue, occupancyByBuilding, complaintsByStatus, studentPayments] = await Promise.all([
    reportsRepository.fetchRevenueTrend(),
    reportsRepository.fetchOccupancyByBuilding(),
    reportsRepository.fetchComplaintsByStatus(),
    reportsRepository.fetchStudentsByPaymentStatus(),
  ]);

  const revenueTrend = revenue.trend;
  const totalRevenue = revenue.totalCollected;
  const studentsByPaymentStatus = studentPayments.byStatus;
  const { totalStudents } = studentPayments;
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
