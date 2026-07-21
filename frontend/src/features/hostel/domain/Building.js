export class Building {
  constructor({ id, name, address, floorCount, totalCapacity, occupiedCount }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.floorCount = floorCount;
    this.totalCapacity = totalCapacity;
    this.occupiedCount = occupiedCount;
  }

  get occupancyRate() {
    if (this.totalCapacity === 0) return 0;
    return Math.round((this.occupiedCount / this.totalCapacity) * 100);
  }
}
