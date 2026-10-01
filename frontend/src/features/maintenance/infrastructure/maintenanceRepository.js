import { httpClient } from "@infrastructure/api/httpClient";
import studentRepository from "@features/students/infrastructure/studentRepository";
import hostelRepository from "@features/hostel/infrastructure/hostelRepository";

function matchesSearch(complaint, search) {
  if (!search) return true;
  const term = search.trim().toLowerCase();
  return (
    complaint.id.toLowerCase().includes(term) ||
    (complaint.studentName ?? "").toLowerCase().includes(term) ||
    (complaint.roomNumber ?? "").toLowerCase().includes(term)
  );
}

class MaintenanceRepository {
  async fetchAll() {
    const [{ data: res }, students, rooms] = await Promise.all([
      httpClient.get("/operations/maintenance", { params: { pageSize: 500 } }),
      studentRepository.fetchAll(),
      hostelRepository.fetchAllRoomsFlat(),
    ]);

    const studentsBySub = new Map(students.map((s) => [s.asgardeoSub, s]));
    const roomsById = new Map(rooms.map((r) => [r.id, r]));

    return res.data.map((item) => {
      const student = studentsBySub.get(item.studentId);
      const room = roomsById.get(item.roomId);

      return {
        id: item.id,
        studentName: student?.name ?? "Unknown Student",
        roomNumber: room?.roomNumber ?? "—",
        buildingName: room?.buildingName ?? "—",
        category: item.category,
        title: item.title,
        description: item.description,
        priority: item.priority,
        status: item.status,
        assignedStaff: item.assignedStaff,
        submittedDate: item.submittedDate,
        createdDate: item.submittedDate,
        hasImage: Boolean(item.hasImage),
        timeline: [],
      };
    });
  }

  // Maintenance requests are keyed by the filer's Asgardeo sub, not the Student.id.
  async fetchByStudent(student) {
    if (!student.asgardeoSub) return [];
    const { data: res } = await httpClient.get("/operations/maintenance", {
      params: { studentId: student.asgardeoSub, pageSize: 100 },
    });

    return res.data.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      status: item.status,
      date: new Date(item.submittedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }));
  }

  async fetchComplaints({ page = 1, pageSize = 10, search = "", status = "All", priority = "All", category = "All" } = {}) {
    const complaints = await this.fetchAll();
    const filtered = complaints.filter(
      (complaint) =>
        matchesSearch(complaint, search) &&
        (status === "All" || complaint.status === status) &&
        (priority === "All" || complaint.priority === priority) &&
        (category === "All" || complaint.category === category)
    );

    const totalRecords = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return { currentPage, totalPages, totalRecords, pageSize, data };
  }

  // The list only carries hasImage; the photo itself is fetched on demand.
  async fetchImage(id) {
    const { data } = await httpClient.get(`/operations/maintenance/${id}/image`);
    return data.imageData;
  }

  async fetchStats() {
    const { data } = await httpClient.get("/operations/maintenance/stats");
    return data;
  }

  async updateStatus(id, status) {
    const { data } = await httpClient.patch(`/operations/maintenance/${id}`, { status });
    return data;
  }
}

export default new MaintenanceRepository();
