import studentRepository from "@features/students/infrastructure/studentRepository";
import hostelRepository from "@features/hostel/infrastructure/hostelRepository";
import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";
import visitorRepository from "@features/visitors/infrastructure/visitorRepository";
import paymentRepository from "@features/payments/infrastructure/paymentRepository";

const MONTH_ORDER = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];

class DashboardRepository {
  async fetchOverview() {
    const [students, buildings, rooms, complaints, visitors, payments] = await Promise.all([
      studentRepository.fetchAll(),
      hostelRepository.fetchBuildings(),
      hostelRepository.fetchAllRoomsFlat(),
      maintenanceRepository.fetchAll(),
      visitorRepository.fetchAll(),
      paymentRepository.fetchAll(),
    ]);

    const occupiedBeds = buildings.reduce((sum, b) => sum + b.occupiedCount, 0);
    const totalCapacity = buildings.reduce((sum, b) => sum + b.totalCapacity, 0);

    return {
      totalStudents: students.length,
      totalRooms: rooms.length,
      availableBeds: totalCapacity - occupiedBeds,
      occupiedBeds,
      pendingMaintenance: complaints.filter((c) => c.status === "Pending").length,
      pendingVisitors: visitors.filter((v) => v.status === "Pending").length,
      unpaidFeesAmount: payments.filter((p) => p.status !== "paid").reduce((sum, p) => sum + p.amount, 0),
    };
  }

  async fetchPaymentTrend() {
    const payments = await paymentRepository.fetchAll();

    return MONTH_ORDER.map((month) => {
      const monthPayments = payments.filter((p) => p.month === month);
      return {
        month,
        collected: monthPayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
        pending: monthPayments.filter((p) => p.status !== "paid").reduce((sum, p) => sum + p.amount, 0),
      };
    });
  }

  async fetchOccupancyBreakdown() {
    const buildings = await hostelRepository.fetchBuildings();
    const occupied = buildings.reduce((sum, b) => sum + b.occupiedCount, 0);
    const available = buildings.reduce((sum, b) => sum + (b.totalCapacity - b.occupiedCount), 0);

    return [
      { name: "Occupied", value: occupied },
      { name: "Available", value: available },
    ];
  }

  async fetchMaintenanceStats() {
    const complaints = await maintenanceRepository.fetchAll();
    const categories = ["Electrical", "Plumbing", "Furniture", "Other"];

    return categories.map((category) => {
      const categoryComplaints = complaints.filter((c) => c.category === category);
      return {
        category,
        pending: categoryComplaints.filter((c) => c.status === "Pending").length,
        inProgress: categoryComplaints.filter((c) => c.status === "In Progress").length,
        completed: categoryComplaints.filter((c) => c.status === "Completed").length,
      };
    });
  }

  async fetchRecentActivity() {
    return [
      { id: 1, type: "registration", message: "Ishara Perera registered as a new student", time: "10 minutes ago" },
      { id: 2, type: "complaint", message: "New complaint: Leaking tap in Room B-204", time: "42 minutes ago" },
      { id: 3, type: "payment", message: "Nadeesha Silva paid hostel fees for July", time: "1 hour ago" },
      { id: 4, type: "visitor", message: "Visitor request approved for Room A-108", time: "3 hours ago" },
      { id: 5, type: "payment", message: "Kasun Fernando's payment marked overdue", time: "5 hours ago" },
    ];
  }
}

export default new DashboardRepository();
