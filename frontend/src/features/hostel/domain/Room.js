export class Room {
  constructor({ id, buildingId, buildingName, floorId, floorLabel, roomNumber, capacity, occupiedBeds, assignedStudents = [] }) {
    this.id = id;
    this.buildingId = buildingId;
    this.buildingName = buildingName;
    this.floorId = floorId;
    this.floorLabel = floorLabel;
    this.roomNumber = roomNumber;
    this.capacity = capacity;
    this.occupiedBeds = occupiedBeds;
    this.assignedStudents = assignedStudents;
  }

  get availableBeds() {
    return Math.max(this.capacity - this.occupiedBeds, 0);
  }

  get status() {
    if (this.occupiedBeds === 0) return "available";
    if (this.availableBeds === 0) return "full";
    return "partial";
  }
}
