import studentRepository from "@features/students/infrastructure/studentRepository";
import paymentRepository from "@features/payments/infrastructure/paymentRepository";
import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";
import { Student } from "@features/students/domain/Student";
import { overallPaymentStatus } from "@shared/utils/paymentStatus";

export async function getStudentByIdUseCase(id) {
  const student = await studentRepository.fetchById(id);
  if (!student) return null;

  // Payments live in Finance and complaints in Operations; accommodation's student
  // record carries neither. A failing service shouldn't blank the whole profile.
  const [payments, complaints] = await Promise.all([
    paymentRepository.fetchByStudent(student).catch(() => []),
    maintenanceRepository.fetchByStudent(student).catch(() => []),
  ]);

  return new Student({ ...student, payments, complaints, paymentStatus: overallPaymentStatus(payments) });
}
