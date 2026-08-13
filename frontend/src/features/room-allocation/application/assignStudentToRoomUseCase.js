import studentRepository from "@features/students/infrastructure/studentRepository";

export async function assignStudentToRoomUseCase(student, room) {
  if (room.occupiedBeds >= room.capacity) {
    throw new Error("This room has no available beds");
  }

  return studentRepository.assignRoom(student.id, { roomNumber: room.roomNumber, buildingName: room.buildingName });
}
