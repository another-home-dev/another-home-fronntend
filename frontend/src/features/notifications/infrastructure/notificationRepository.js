import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";
import visitorRepository from "@features/visitors/infrastructure/visitorRepository";
import paymentRepository from "@features/payments/infrastructure/paymentRepository";
import announcementRepository from "@features/announcements/infrastructure/announcementRepository";

class NotificationRepository {
  async fetchAll() {
    await Promise.all([
      maintenanceRepository.fetchAll(),
      visitorRepository.fetchAll(),
      paymentRepository.fetchAll(),
      announcementRepository.fetchAll(),
    ]);
    return [];
  }
  async markAsRead() {}
  async markAllAsRead() {}
}

export default new NotificationRepository();
