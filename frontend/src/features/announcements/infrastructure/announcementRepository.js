const SEED = [
  {
    title: "Water supply maintenance on Sunday",
    message: "Water supply will be interrupted from 9 AM to 1 PM on Sunday for scheduled tank cleaning across all blocks.",
    category: "Maintenance",
    createdBy: "Warden Office",
    createdDate: "Jul 12, 2026",
  },
  {
    title: "July hostel fees due",
    message: "Please settle your July hostel fees before the 20th to avoid late payment charges.",
    category: "Payment",
    createdBy: "Accounts Office",
    createdDate: "Jul 10, 2026",
  },
  {
    title: "Fire drill this Friday",
    message: "A mandatory fire safety drill will be conducted at 4 PM this Friday. All residents must participate.",
    category: "Emergency",
    createdBy: "Warden Office",
    createdDate: "Jul 9, 2026",
  },
  {
    title: "New study room hours",
    message: "The ground floor study room is now open 24/7 for the exam season. Please maintain silence after 10 PM.",
    category: "General",
    createdBy: "Administration",
    createdDate: "Jul 5, 2026",
  },
];

let announcements = SEED.map((item, index) => ({ id: `an${index + 1}`, ...item }));

class AnnouncementRepository {
  async fetchAll() {
    return announcements;
  }

  async create(payload) {
    const newAnnouncement = {
      id: `an${Date.now()}`,
      createdBy: "Admin",
      createdDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      ...payload,
    };
    announcements = [newAnnouncement, ...announcements];
    return newAnnouncement;
  }

  async update(id, payload) {
    announcements = announcements.map((item) => (item.id === id ? { ...item, ...payload } : item));
    return announcements.find((item) => item.id === id);
  }

  async remove(id) {
    announcements = announcements.filter((item) => item.id !== id);
    return { success: true };
  }
}

export default new AnnouncementRepository();
