export class Notification {
  constructor({ id, type, title, message, time, isRead }) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.message = message;
    this.time = time;
    this.isRead = isRead;
  }
}
