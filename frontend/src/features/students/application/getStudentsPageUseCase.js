import studentRepository from "@features/students/infrastructure/studentRepository";
import paymentRepository from "@features/payments/infrastructure/paymentRepository";
import { Student } from "@features/students/domain/Student";
import { paymentStatusByStudent } from "@shared/utils/paymentStatus";

export async function getStudentsPageUseCase(params) {
  // Payment status lives in Finance; a Finance outage shouldn't blank the list.
  const [result, payments] = await Promise.all([
    studentRepository.fetchPage(params),
    paymentRepository.fetchAll().catch(() => []),
  ]);
  const statuses = paymentStatusByStudent(payments);
  return {
    ...result,
    data: result.data.map((student) => new Student({ ...student, paymentStatus: statuses.get(student.id) })),
  };
}
