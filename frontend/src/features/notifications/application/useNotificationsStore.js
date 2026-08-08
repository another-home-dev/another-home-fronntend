import { create } from "zustand";
import { Notification } from "@features/notifications/domain/Notification";
import notificationRepository from "@features/notifications/infrastructure/notificationRepository";

export const useNotificationsStore = create((set, get) => ({
  notifications: [],
  isLoading: true,
  hasLoaded: false,

  load: async () => {
    const data = await notificationRepository.fetchAll();
    set({ notifications: data.map((item) => new Notification(item)), isLoading: false, hasLoaded: true });
  },

  markAsRead: async (id) => {
    set((state) => ({ notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)) }));
    await notificationRepository.markAsRead(id);
  },

  markAllAsRead: async () => {
    const ids = get().notifications.map((n) => n.id);
    set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, isRead: true })) }));
    await notificationRepository.markAllAsRead(ids);
  },
}));

export function useUnreadNotificationCount() {
  return useNotificationsStore((state) => state.notifications.filter((n) => !n.isRead).length);
}
