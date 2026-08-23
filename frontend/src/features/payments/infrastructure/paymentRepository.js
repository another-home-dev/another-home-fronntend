import { httpClient } from "@infrastructure/api/httpClient";
import studentRepository from "@features/students/infrastructure/studentRepository";

const STATUS_MAP = { Pending: "pending", Paid: "paid", Overdue: "overdue" };

class PaymentRepository {
  async fetchAll() {
    const [{ data: invoicesRes }, students] = await Promise.all([
      httpClient.get("/finance/invoices"),
      studentRepository.fetchAll(),
    ]);

    return invoicesRes.data.map((invoice) => {
      const student = students.find((s) => s.id === invoice.studentId);
      const dueDate = new Date(invoice.dueDate);

      return {
        id: invoice.invoiceId,
        invoiceId: invoice.invoiceId,
        studentId: invoice.studentId,
        studentName: student?.name ?? "Unknown student",
        roomNumber: student?.roomNumber ?? null,
        buildingName: student?.buildingName ?? null,
        month: dueDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        amount: invoice.amount,
        status: STATUS_MAP[invoice.status] ?? invoice.status.toLowerCase(),
        paidOn: invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null,
      };
    });
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

  async createInvoice(payload) {
    const { data } = await httpClient.post("/finance/invoices", payload);
    return data.data;
  }

  async logPayment(payload) {
    const { data } = await httpClient.post("/finance/payments", payload);
    return data.data;
  }
}

export default new PaymentRepository();
