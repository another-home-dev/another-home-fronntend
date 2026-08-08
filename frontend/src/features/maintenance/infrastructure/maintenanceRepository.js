import complaints from "@features/maintenance/infrastructure/mockComplaints";

function matchesSearch(complaint, search) {
  if (!search) return true;
  const term = search.trim().toLowerCase();
  return (
    complaint.id.toLowerCase().includes(term) ||
    complaint.studentName.toLowerCase().includes(term) ||
    complaint.roomNumber.toLowerCase().includes(term)
  );
}

class MaintenanceRepository {
  async fetchAll() {
    return complaints;
  }

  async fetchComplaints({ page = 1, pageSize = 10, search = "", status = "All", priority = "All", category = "All" } = {}) {
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

  async fetchStats() {
    return {
      total: complaints.length,
      pending: complaints.filter((c) => c.status === "Pending").length,
      inProgress: complaints.filter((c) => c.status === "In Progress").length,
      resolved: complaints.filter((c) => c.status === "Resolved").length,
    };
  }
}

export default new MaintenanceRepository();
