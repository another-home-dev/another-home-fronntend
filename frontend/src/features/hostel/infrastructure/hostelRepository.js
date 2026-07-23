import { BUILDING_META, buildRoomShells } from "@features/hostel/domain/roomInventory";
import { getStudentsSnapshot } from "@features/students/infrastructure/studentRepository";

let roomShells = buildRoomShells();

function hydrateRoom(shell) {
  const occupants = getStudentsSnapshot().filter(
    (student) => student.buildingName === shell.buildingName && student.roomNumber === shell.roomNumber
  );

  return {
    ...shell,
    occupiedBeds: occupants.length,
    assignedStudents: occupants.map((student) => ({ id: student.id, name: student.name })),
  };
}

function deriveBuildings() {
  return BUILDING_META.map((meta) => {
    const buildingRooms = roomShells.filter((room) => room.buildingId === meta.id).map(hydrateRoom);
    const totalCapacity = buildingRooms.reduce((sum, room) => sum + room.capacity, 0);
    const occupiedCount = buildingRooms.reduce((sum, room) => sum + room.occupiedBeds, 0);

    return {
      id: meta.id,
      name: meta.name,
      address: meta.address,
      floorCount: meta.floorCount,
      totalCapacity,
      occupiedCount,
    };
  });
}

function deriveFloors(buildingId) {
  const floorIds = [...new Set(roomShells.filter((room) => room.buildingId === buildingId).map((room) => room.floorId))];

  return floorIds.map((floorId) => {
    const floorRooms = roomShells.filter((room) => room.floorId === floorId).map(hydrateRoom);
    const availableRooms = floorRooms.filter((room) => room.occupiedBeds < room.capacity).length;

    return {
      id: floorId,
      buildingId,
      label: floorRooms[0]?.floorLabel ?? floorId,
      roomsCount: floorRooms.length,
      availableRooms,
    };
  });
}

class HostelRepository {
  async fetchBuildings() {
    return deriveBuildings();
  }

  async fetchFloors(buildingId) {
    return deriveFloors(buildingId);
  }

  async fetchRooms(floorId) {
    return roomShells.filter((room) => room.floorId === floorId).map(hydrateRoom);
  }

  async fetchAllRoomsFlat() {
    return roomShells.map(hydrateRoom);
  }

  async createRoom(payload) {
    const newShell = {
      id: `${payload.buildingId}-${payload.floorId}-r${Date.now()}`,
      ...payload,
      capacity: Number(payload.capacity),
    };
    roomShells = [...roomShells, newShell];
    return hydrateRoom(newShell);
  }

  async updateRoom(roomId, payload) {
    roomShells = roomShells.map((room) => (room.id === roomId ? { ...room, ...payload } : room));
    return hydrateRoom(roomShells.find((room) => room.id === roomId));
  }

  async deleteRoom(roomId) {
    roomShells = roomShells.filter((room) => room.id !== roomId);
    return { success: true };
  }
}

export default new HostelRepository();
