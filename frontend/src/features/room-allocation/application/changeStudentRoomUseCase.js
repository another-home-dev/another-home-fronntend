import hostelRepository from "@features/hostel/infrastructure/hostelRepository";

export async function changeStudentRoomUseCase(student, newRoom) {
  if (newRoom.occupiedBeds >= newRoom.capacity) {
    throw new Error("This room has no available beds");
  }

  return hostelRepository.assignStudentToRoom(newRoom.id, student.id);
}
