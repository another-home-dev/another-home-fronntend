import cafeteriaRepository from "@features/cafeteria/infrastructure/cafeteriaRepository";
import { MenuItem } from "@features/cafeteria/domain/MenuItem";

export async function getWeeklyMenuUseCase() {
  const items = await cafeteriaRepository.fetchAll();
  return items.map((item) => new MenuItem(item));
}
