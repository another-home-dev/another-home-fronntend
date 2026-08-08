import hostelRepository from "@features/hostel/infrastructure/hostelRepository";
import { Building } from "@features/hostel/domain/Building";

export async function getBuildingsUseCase() {
  const buildings = await hostelRepository.fetchBuildings();
  return buildings.map((building) => new Building(building));
}
