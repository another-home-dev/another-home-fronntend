import studentRepository from "@features/students/infrastructure/studentRepository";

class PaymentRepository {
  async fetchAll() {
    const students = await studentRepository.fetchAll();

    return students.flatMap((student) =>
      student.payments.map((payment) => ({
        id: `${student.id}-${payment.id}`,
        studentId: student.id,
        studentName: student.name,
        roomNumber: student.roomNumber,
        buildingName: student.buildingName,
        month: payment.month,
        amount: payment.amount,
        status: payment.status,
        paidOn: payment.paidOn,
      }))
    );
  }

  async fetchPage({ page = 1, pageSize = 10, status = "All", search = "" } = {}) {
    const all = await this.fetchAll();
    const term = search.trim().toLowerCase();

    const filtered = all.filter((payment) => {
      if (status !== "All" && payment.status !== status) return false;
      if (
        term &&
        !payment.studentName.toLowerCase().includes(term) &&
        !(payment.roomNumber ?? "").toLowerCase().includes(term)
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
}

export default new PaymentRepository();
