import studentRepository from "@features/students/infrastructure/studentRepository";

export async function changeStudentRoomUseCase(student, newRoom) {
  if (newRoom.occupiedBeds >= newRoom.capacity) {
    throw new Error("This room has no available beds");
  }

  return studentRepository.assignRoom(student.id, { roomNumber: newRoom.roomNumber, buildingName: newRoom.buildingName });
}
