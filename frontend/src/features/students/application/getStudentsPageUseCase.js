import studentRepository from "@features/students/infrastructure/studentRepository";
import { Student } from "@features/students/domain/Student";

export async function getStudentsPageUseCase(params) {
  const result = await studentRepository.fetchPage(params);
  return { ...result, data: result.data.map((student) => new Student(student)) };
}
