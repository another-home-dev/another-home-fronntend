export class DashboardMetrics {
  constructor({ totalStudents, totalRooms, availableBeds, occupiedBeds, pendingMaintenance, pendingVisitors, unpaidFeesAmount }) {
    this.totalStudents = totalStudents;
    this.totalRooms = totalRooms;
    this.availableBeds = availableBeds;
    this.occupiedBeds = occupiedBeds;
    this.pendingMaintenance = pendingMaintenance;
    this.pendingVisitors = pendingVisitors;
    this.unpaidFeesAmount = unpaidFeesAmount;
  }

  get totalBeds() {
    return this.availableBeds + this.occupiedBeds;
  }

  get occupancyRate() {
    if (this.totalBeds === 0) return 0;
    return Math.round((this.occupiedBeds / this.totalBeds) * 100);
  }
}
