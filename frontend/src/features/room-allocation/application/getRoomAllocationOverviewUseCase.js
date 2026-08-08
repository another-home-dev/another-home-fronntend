import hostelRepository from "@features/hostel/infrastructure/hostelRepository";
import studentRepository from "@features/students/infrastructure/studentRepository";
import { Room } from "@features/hostel/domain/Room";
import { Student } from "@features/students/domain/Student";

export async function getRoomAllocationOverviewUseCase() {
  const [rawRooms, allStudents] = await Promise.all([
    hostelRepository.fetchAllRoomsFlat(),
    studentRepository.fetchAll(),
  ]);

  return {
    rooms: rawRooms.map((room) => new Room(room)),
    unallocatedStudents: allStudents.filter((student) => !student.roomNumber).map((student) => new Student(student)),
    allocatedStudents: allStudents.filter((student) => student.roomNumber).map((student) => new Student(student)),
  };
}
