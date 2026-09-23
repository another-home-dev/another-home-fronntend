import studentRepository from "@features/students/infrastructure/studentRepository";

export async function createStudentUseCase(payload) {
  return studentRepository.create(payload);
}
