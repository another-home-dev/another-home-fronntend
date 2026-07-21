export const ANNOUNCEMENT_CATEGORIES = ["General", "Maintenance", "Payment", "Emergency"];

export class Announcement {
  constructor({ id, title, message, category, createdBy, createdDate }) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.category = category;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
  }
}
