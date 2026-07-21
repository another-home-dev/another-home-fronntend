import announcementRepository from "@features/announcements/infrastructure/announcementRepository";
import { Announcement } from "@features/announcements/domain/Announcement";

export async function getAnnouncementsUseCase() {
  const announcements = await announcementRepository.fetchAll();
  return announcements.map((announcement) => new Announcement(announcement));
}
