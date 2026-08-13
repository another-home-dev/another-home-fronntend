import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";
import visitorRepository from "@features/visitors/infrastructure/visitorRepository";
import paymentRepository from "@features/payments/infrastructure/paymentRepository";
import announcementRepository from "@features/announcements/infrastructure/announcementRepository";

const readIds = new Set();

class NotificationRepository {
  async fetchAll() {
    const [complaints, visitors, payments, announcements] = await Promise.all([
      maintenanceRepository.fetchAll(),
      visitorRepository.fetchAll(),
      paymentRepository.fetchAll(),
      announcementRepository.fetchAll(),
    ]);

    const notifications = [
      ...complaints
        .filter((complaint) => complaint.status === "Pending")
        .map((complaint) => ({
          id: `complaint-${complaint.id}`,
          type: "maintenance",
          title: "New maintenance request",
          message: `${complaint.title} — Room ${complaint.roomNumber}`,
          time: complaint.createdDate,
        })),
      ...visitors
        .filter((visitor) => visitor.status === "Pending")
        .map((visitor) => ({
          id: `visitor-${visitor.id}`,
          type: "visitor",
          title: "Visitor approval needed",
          message: `${visitor.visitorName} requesting to visit ${visitor.studentName}`,
          time: `${visitor.date} · ${visitor.time}`,
        })),
      ...payments
        .filter((payment) => payment.status === "overdue")
        .map((payment) => ({
          id: `payment-${payment.id}`,
          type: "payment",
          title: "Overdue payment",
          message: `${payment.studentName} — ${payment.month} fee is overdue`,
          time: payment.month,
        })),
      ...announcements.slice(0, 3).map((announcement) => ({
        id: `announcement-${announcement.id}`,
        type: "announcement",
        title: "Announcement published",
        message: announcement.title,
        time: announcement.createdDate,
      })),
    ];

    return notifications.map((notification) => ({ ...notification, isRead: readIds.has(notification.id) }));
  }

  async markAsRead(id) {
    readIds.add(id);
  }

  async markAllAsRead(ids) {
    ids.forEach((id) => readIds.add(id));
  }
}

export default new NotificationRepository();
