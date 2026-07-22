import hostelRepository from "@features/hostel/infrastructure/hostelRepository";
import { Building } from "@features/hostel/domain/Building";

const TREND_DELTAS = [-9, -5, -7, -3, -2, 0];

function buildTrend(rate) {
  return TREND_DELTAS.map((delta) => Math.max(Math.min(rate + delta, 100), 0));
}

export async function getBuildingOccupancySummaryUseCase() {
  const buildings = await hostelRepository.fetchBuildings();

  return buildings.map((raw) => {
    const building = new Building(raw);
    return {
      id: building.id,
      name: building.name,
      occupancyRate: building.occupancyRate,
      trend: buildTrend(building.occupancyRate),
    };
  });
}
