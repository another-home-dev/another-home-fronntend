import { httpClient } from "@infrastructure/api/httpClient";
import studentRepository from "@features/students/infrastructure/studentRepository";
import hostelRepository from "@features/hostel/infrastructure/hostelRepository";

class VisitorRepository {
  async fetchAll() {
    const [{ data: res }, students, rooms] = await Promise.all([
      httpClient.get("/operations/visitors", { params: { pageSize: 500 } }),
      studentRepository.fetchAll(),
      hostelRepository.fetchAllRoomsFlat(),
    ]);

    const studentsBySub = new Map(students.map((s) => [s.asgardeoSub, s]));
    const roomsById = new Map(rooms.map((r) => [r.id, r]));

    return res.data
      .map((item) => {
        const student = studentsBySub.get(item.studentId);
        const room = roomsById.get(item.roomId);

        return {
          id: item.id,
          studentName: student?.name ?? "Unknown Student",
          roomNumber: room?.roomNumber ?? "—",
          visitorName: item.visitorName,
          visitorContact: item.visitorContact,
          purpose: item.purpose,
          date: item.visitDate,
          time: item.visitTime,
          status: item.status,
        };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  async fetchHistoryPage({ page = 1, pageSize = 10, search = "", status = "All" } = {}) {
    const requests = await this.fetchAll();
    const term = search.trim().toLowerCase();
    const filtered = requests.filter((item) => {
      if (item.status === "Pending") return false;
      if (status !== "All" && item.status !== status) return false;
      if (
        term &&
        !(
          item.studentName.toLowerCase().includes(term) ||
          item.visitorName.toLowerCase().includes(term) ||
          item.roomNumber.toLowerCase().includes(term)
        )
      ) {
        return false;
      }
      return true;
    });

    const totalRecords = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * pageSize;

    return { currentPage, totalPages, totalRecords, pageSize, data: filtered.slice(start, start + pageSize) };
  }

  async updateStatus(id, status) {
    const { data } = await httpClient.patch(`/operations/visitors/${id}`, { status });
    return data;
  }
}

export default new VisitorRepository();
