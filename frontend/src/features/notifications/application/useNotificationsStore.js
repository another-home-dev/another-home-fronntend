import { create } from "zustand";
import { Notification } from "@features/notifications/domain/Notification";
import notificationRepository from "@features/notifications/infrastructure/notificationRepository";

export const useNotificationsStore = create((set) => ({
  notifications: [],
  isLoading: true,
  hasLoaded: false,

  load: async () => {
    const data = await notificationRepository.fetchAll();
    set({ notifications: data.map((item) => new Notification(item)), isLoading: false, hasLoaded: true });
  },
  markAsRead: async () => {},
  markAllAsRead: async () => {},
}));

export function useUnreadNotificationCount() {
  return useNotificationsStore((state) => state.notifications.filter((n) => !n.isRead).length);
}
