export const VISITOR_STATUSES = ["Pending", "Approved", "Rejected"];

export class VisitorRequest {
  constructor({ id, studentName, roomNumber, visitorName, visitorContact, purpose, date, time, status }) {
    this.id = id;
    this.studentName = studentName;
    this.roomNumber = roomNumber;
    this.visitorName = visitorName;
    this.visitorContact = visitorContact;
    this.purpose = purpose;
    this.date = date;
    this.time = time;
    this.status = status;
  }
}
