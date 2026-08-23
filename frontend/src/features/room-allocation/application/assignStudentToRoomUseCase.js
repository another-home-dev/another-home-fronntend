import hostelRepository from "@features/hostel/infrastructure/hostelRepository";

export async function assignStudentToRoomUseCase(student, room) {
  if (room.occupiedBeds >= room.capacity) {
    throw new Error("This room has no available beds");
  }

  return hostelRepository.assignStudentToRoom(room.id, student.id);
}
