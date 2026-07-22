import studentRepository from "@features/students/infrastructure/studentRepository";
import { Student } from "@features/students/domain/Student";

export async function getStudentByIdUseCase(id) {
  const student = await studentRepository.fetchById(id);
  return student ? new Student(student) : null;
}
