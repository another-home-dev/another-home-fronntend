export class Complaint {
  constructor({
    id,
    studentName,
    roomNumber,
    buildingName,
    category,
    title,
    description,
    priority,
    status,
    assignedStaff,
    submittedDate,
    createdDate,
    images = [],
    timeline = [],
  }) {
    this.id = id;
    this.studentName = studentName;
    this.roomNumber = roomNumber;
    this.buildingName = buildingName;
    this.category = category;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.assignedStaff = assignedStaff;
    this.submittedDate = submittedDate;
    this.createdDate = createdDate ?? submittedDate;
    this.images = images;
    this.timeline = timeline;
  }
}
