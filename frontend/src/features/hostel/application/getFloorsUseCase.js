import hostelRepository from "@features/hostel/infrastructure/hostelRepository";

export async function getFloorsUseCase(buildingId) {
  return hostelRepository.fetchFloors(buildingId);
}
