import cafeteriaRepository from "@features/cafeteria/infrastructure/cafeteriaRepository";

function validateMenuItem({ name }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = "Dish name is required";
  return errors;
}

export async function saveMenuItemUseCase(day, mealSlot, payload) {
  const errors = validateMenuItem(payload);
  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return cafeteriaRepository.upsert(day, mealSlot, payload);
}

export async function deleteMenuItemUseCase(id) {
  return cafeteriaRepository.remove(id);
}
