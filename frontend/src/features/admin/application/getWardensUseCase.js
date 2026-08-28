import wardenRepository from "@features/admin/infrastructure/wardenRepository";

export async function getWardensUseCase() {
  return wardenRepository.fetchAll();
}
