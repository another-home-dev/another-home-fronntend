import { WEEK_DAYS, MEAL_SLOTS } from "@features/cafeteria/domain/MenuItem";

const MENU_PLAN = {
  Monday: { Breakfast: ["String Hoppers & Curry", "Coconut sambol, dhal curry"], Lunch: ["Rice & Chicken Curry", "With mixed vegetables"], Dinner: ["Kottu Roti", "Vegetable kottu with egg"] },
  Tuesday: { Breakfast: ["Milk Rice & Lunu Miris", "Traditional kiribath"], Lunch: ["Rice & Fish Curry", "With dhal and greens"], Dinner: ["Noodles", "Stir-fried vegetable noodles"] },
  Wednesday: { Breakfast: ["Roti & Curry", "Pol roti with seeni sambol"], Lunch: ["Rice & Egg Curry", "With potato tempering"], Dinner: ["Fried Rice", "Vegetable fried rice with omelette"] },
  Thursday: { Breakfast: ["Pittu & Curry", "With coconut milk gravy"], Lunch: ["Rice & Beef Curry", "With bean curry"], Dinner: ["Soup & Sandwiches", "Chicken soup, club sandwiches"] },
  Friday: { Breakfast: ["Idli & Sambar", "With coconut chutney"], Lunch: ["Biryani", "Chicken biryani with raita"], Dinner: ["Deviled Chicken & Rice", "Spicy deviled chicken"] },
  Saturday: { Breakfast: ["Egg Hoppers", "With katta sambol"], Lunch: ["Rice & Curry Buffet", "Mixed vegetable spread"], Dinner: ["Pizza Night", "Vegetable and chicken pizza"] },
  Sunday: { Breakfast: ["Bread & Butter", "With jam and boiled eggs"], Lunch: ["Sunday Special Rice & Curry", "Full traditional spread"], Dinner: ["Pasta", "Creamy chicken pasta"] },
};

function buildMenuItems() {
  const items = [];
  let cursor = 1;

  WEEK_DAYS.forEach((day) => {
    MEAL_SLOTS.forEach((mealSlot) => {
      const [name, description] = MENU_PLAN[day][mealSlot];
      items.push({ id: `menu${cursor}`, day, mealSlot, name, description });
      cursor += 1;
    });
  });

  return items;
}

let menuItems = buildMenuItems();

class CafeteriaRepository {
  async fetchAll() {
    return menuItems;
  }

  async upsert(day, mealSlot, payload) {
    const existing = menuItems.find((item) => item.day === day && item.mealSlot === mealSlot);

    if (existing) {
      menuItems = menuItems.map((item) => (item.id === existing.id ? { ...item, ...payload } : item));
      return menuItems.find((item) => item.id === existing.id);
    }

    const newItem = { id: `menu${Date.now()}`, day, mealSlot, ...payload };
    menuItems = [...menuItems, newItem];
    return newItem;
  }

  async remove(id) {
    menuItems = menuItems.filter((item) => item.id !== id);
    return { success: true };
  }
}

export default new CafeteriaRepository();
