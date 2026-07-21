import studentRepository from "@features/students/infrastructure/studentRepository";
import { Student } from "@features/students/domain/Student";

export async function getStudentsUseCase() {
  const students = await studentRepository.fetchAll();
  return students.map((student) => new Student(student));
}
