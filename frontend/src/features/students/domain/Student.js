export class Student {
  constructor({
    id,
    studentCode,
    name,
    email,
    contact,
    roomNumber,
    buildingName,
    paymentStatus,
    joinedDate,
    guardianName,
    guardianContact,
    address,
    payments = [],
    complaints = [],
  }) {
    this.id = id;
    this.studentCode = studentCode;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.roomNumber = roomNumber;
    this.buildingName = buildingName;
    this.paymentStatus = paymentStatus;
    this.joinedDate = joinedDate;
    this.guardianName = guardianName;
    this.guardianContact = guardianContact;
    this.address = address;
    this.payments = payments;
    this.complaints = complaints;
  }

  get initials() {
    return this.name
      .split(" ")
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
}
