export const BUILDING_META = [
  { id: "b1", name: "Sunrise Block", address: "12 Lake Road, Colombo", floorCount: 4, roomsPerFloor: 6 },
  { id: "b2", name: "Silver Oak Block", address: "45 Hill Street, Kandy", floorCount: 3, roomsPerFloor: 5 },
  { id: "b3", name: "Palm Court Block", address: "8 Temple Lane, Galle", floorCount: 3, roomsPerFloor: 4 },
];

export function buildRoomShells() {
  const rooms = [];

  BUILDING_META.forEach((building) => {
    for (let floor = 1; floor <= building.floorCount; floor += 1) {
      for (let roomIndex = 1; roomIndex <= building.roomsPerFloor; roomIndex += 1) {
        const capacity = ((roomIndex + floor) % 3) + 2;

        rooms.push({
          id: `${building.id}-f${floor}-r${roomIndex}`,
          buildingId: building.id,
          buildingName: building.name,
          floorId: `${building.id}-f${floor}`,
          floorLabel: `Floor ${floor}`,
          roomNumber: `${floor}0${roomIndex}`,
          capacity,
        });
      }
    }
  });

  return rooms;
}
