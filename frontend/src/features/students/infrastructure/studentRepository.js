import { httpClient } from "@infrastructure/api/httpClient";

class StudentRepository {
  async fetchAll() {
    const { data } = await httpClient.get("/accommodation/students");
    return data.data;
  }

  async fetchPage({ page = 1, pageSize = 10, search = "" } = {}) {
    const students = await this.fetchAll();
    const term = search.trim().toLowerCase();
    const filtered = term
      ? students.filter(
          (s) =>
            s.name.toLowerCase().includes(term) ||
            s.email.toLowerCase().includes(term) ||
            s.studentCode.toLowerCase().includes(term)
        )
      : students;

    const totalRecords = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * pageSize;

    return { currentPage, totalPages, totalRecords, pageSize, data: filtered.slice(start, start + pageSize) };
  }

  async fetchById(id) {
    const students = await this.fetchAll();
    return students.find((student) => student.id === id) ?? null;
  }

  async create(payload) {
    const { data } = await httpClient.post("/accommodation/students", payload);
    return data.data;
  }
}

export default new StudentRepository();
