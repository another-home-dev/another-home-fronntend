import hostelRepository from "@features/hostel/infrastructure/hostelRepository";
import { Room } from "@features/hostel/domain/Room";

export async function getRoomsUseCase(floorId) {
  const rooms = await hostelRepository.fetchRooms(floorId);
  return rooms.map((room) => new Room(room));
}
