export const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MEAL_SLOTS = ["Breakfast", "Lunch", "Dinner"];

export class MenuItem {
  constructor({ id, day, mealSlot, name, description }) {
    this.id = id;
    this.day = day;
    this.mealSlot = mealSlot;
    this.name = name;
    this.description = description;
  }
}
