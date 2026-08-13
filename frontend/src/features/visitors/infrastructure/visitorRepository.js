import { getStudentsSnapshot } from "@features/students/infrastructure/studentRepository";

const VISITOR_NAMES = ["Mahesh Perera", "Chathura Silva", "Sunil Fernando", "Ruvini Jayasuriya", "Nuwan Rathnayake", "Anusha Wickramasinghe", "Kamal Gunawardena", "Sampath Bandara", "Manel Karunaratne", "Ajith Senanayake"];
const PURPOSES = ["Family visit", "Bringing groceries", "Parent visit", "Study group friend", "Delivery pickup", "Sibling visit", "Friend visit"];
const STATUSES = ["Pending", "Approved", "Rejected"];
const TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:30 PM", "4:15 PM", "5:00 PM", "6:00 PM"];
const TOTAL_REQUESTS = 24;
const TODAY = new Date(2026, 6, 31);

function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildRequests() {
  const allocatedStudents = getStudentsSnapshot().filter((student) => student.roomNumber);

  return Array.from({ length: TOTAL_REQUESTS }, (_, index) => {
    const student = allocatedStudents[index % allocatedStudents.length];
    const date = new Date(TODAY);
    date.setDate(date.getDate() - ((index * 2) % 20));

    return {
      id: `vr${index + 1}`,
      studentName: student.name,
      roomNumber: student.roomNumber,
      visitorName: VISITOR_NAMES[index % VISITOR_NAMES.length],
      visitorContact: `+94 7${(index % 9) + 1} ${200 + index * 5} ${3000 + index}`,
      purpose: PURPOSES[index % PURPOSES.length],
      date: formatDate(date),
      time: TIMES[index % TIMES.length],
      status: STATUSES[index % STATUSES.length],
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

let requests = buildRequests();

class VisitorRepository {
  async fetchAll() {
    return requests;
  }

  async fetchHistoryPage({ page = 1, pageSize = 10, search = "", status = "All" } = {}) {
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
    requests = requests.map((item) => (item.id === id ? { ...item, status } : item));
    return requests.find((item) => item.id === id);
  }
}

export default new VisitorRepository();
