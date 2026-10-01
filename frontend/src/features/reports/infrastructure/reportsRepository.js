import paymentRepository from "@features/payments/infrastructure/paymentRepository";
import hostelRepository from "@features/hostel/infrastructure/hostelRepository";
import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";
import studentRepository from "@features/students/infrastructure/studentRepository";
import { Building } from "@features/hostel/domain/Building";
import { paymentStatusByStudent, trendMonths } from "@shared/utils/paymentStatus";

class ReportsRepository {
  async fetchRevenueTrend() {
    const payments = await paymentRepository.fetchAll();

    const trend = trendMonths(payments).map((month) => {
      const monthPayments = payments.filter((payment) => payment.month === month);
      return {
        month,
        collected: monthPayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
        pending: monthPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0),
        overdue: monthPayments.filter((p) => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0),
      };
    });
    // All-time, not just the charted window.
    const totalCollected = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
    return { trend, totalCollected };
  }

  async fetchOccupancyByBuilding() {
    const buildings = await hostelRepository.fetchBuildings();
    return buildings.map((raw) => {
      const building = new Building(raw);
      return { name: building.name, occupancyRate: building.occupancyRate, occupied: building.occupiedCount, capacity: building.totalCapacity };
    });
  }

  async fetchComplaintsByStatus() {
    const complaints = await maintenanceRepository.fetchAll();
    return ["Pending", "In Progress", "Resolved"].map((status) => ({
      name: status,
      value: complaints.filter((complaint) => complaint.status === status).length,
    }));
  }

  async fetchStudentsByPaymentStatus() {
    const [students, payments] = await Promise.all([studentRepository.fetchAll(), paymentRepository.fetchAll()]);
    const statuses = paymentStatusByStudent(payments);
    const byStatus = ["paid", "pending", "overdue"].map((status) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: students.filter((student) => statuses.get(student.id) === status).length,
    }));
    return { byStatus, totalStudents: students.length };
  }
}

export default new ReportsRepository();
