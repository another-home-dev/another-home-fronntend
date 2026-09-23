import { httpClient } from "@infrastructure/api/httpClient";

function buildFloorId(buildingId, floor) {
  return `${buildingId}-f${floor}`;
}

class HostelRepository {
  async fetchBuildings() {
    const { data } = await httpClient.get("/accommodation/buildings");
    return data.data;
  }

  async fetchFloors(buildingId) {
    const rooms = await this.fetchAllRoomsFlat();
    const buildingRooms = rooms.filter((room) => room.buildingId === buildingId);
    const floorNumbers = [...new Set(buildingRooms.map((room) => room.floorNumber))];

    return floorNumbers.map((floorNumber) => {
      const floorRooms = buildingRooms.filter((room) => room.floorNumber === floorNumber);
      const availableRooms = floorRooms.filter((room) => room.occupiedBeds < room.capacity).length;

      return {
        id: buildFloorId(buildingId, floorNumber),
        buildingId,
        floorNumber,
        label: `Floor ${floorNumber}`,
        roomsCount: floorRooms.length,
        availableRooms,
      };
    });
  }

  async fetchRooms(floorId) {
    const rooms = await this.fetchAllRoomsFlat();
    return rooms.filter((room) => room.floorId === floorId);
  }

  async fetchAllRoomsFlat() {
    const [{ data: roomsRes }, { data: buildingsRes }] = await Promise.all([
      httpClient.get("/accommodation/rooms"),
      httpClient.get("/accommodation/buildings"),
    ]);

    const buildings = buildingsRes.data;

    return roomsRes.data.map((room) => ({
      id: room.roomId,
      buildingId: room.buildingId,
      buildingName: buildings.find((b) => b.id === room.buildingId)?.name ?? null,
      floorId: room.buildingId ? buildFloorId(room.buildingId, room.floor) : null,
      floorLabel: `Floor ${room.floor}`,
      floorNumber: room.floor,
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      gender: room.gender,
      airConditioning: room.airConditioning,
      rentPerMonth: room.rentPerMonth,
      occupiedBeds: room.occupiedBeds,
      assignedStudents: room.assignedStudents,
    }));
  }

  async createBuilding(payload) {
    const { data } = await httpClient.post("/accommodation/buildings", {
      name: payload.name,
      address: payload.address,
      floorCount: Number(payload.floorCount),
    });
    return data.data;
  }

  async createRoom(payload) {
    const { data } = await httpClient.post("/accommodation/rooms", {
      roomNumber: payload.roomNumber,
      capacity: Number(payload.capacity),
      gender: payload.gender,
      airConditioning: payload.airConditioning,
      rentPerMonth: Number(payload.rentPerMonth),
      floor: payload.floor,
      buildingId: payload.buildingId,
    });
    return data.data;
  }

  async updateRoom(roomId, payload) {
    const { data } = await httpClient.patch(`/accommodation/rooms/${roomId}`, {
      roomNumber: payload.roomNumber,
      capacity: payload.capacity !== undefined ? Number(payload.capacity) : undefined,
      gender: payload.gender,
      airConditioning: payload.airConditioning,
      rentPerMonth: payload.rentPerMonth !== undefined ? Number(payload.rentPerMonth) : undefined,
    });
    return data.data;
  }

  async deleteRoom(roomId) {
    await httpClient.delete(`/accommodation/rooms/${roomId}`);
    return { success: true };
  }

  async assignStudentToRoom(roomId, studentId) {
    const { data } = await httpClient.post(`/accommodation/rooms/${roomId}/assign`, { studentId });
    return data.data;
  }
}

export default new HostelRepository();
