import { useState } from "react";
import { Sunrise, Sun, Moon, Pencil, Trash2, Plus } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import { Card } from "@shared/components/Card";
import Button from "@shared/components/Button";
import Spinner from "@shared/components/Spinner";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import { cn } from "@shared/utils/cn";
import { WEEK_DAYS, MEAL_SLOTS } from "@features/cafeteria/domain/MenuItem";
import { useWeeklyMenu } from "@features/cafeteria/presentation/hooks/useWeeklyMenu";
import { saveMenuItemUseCase, deleteMenuItemUseCase } from "@features/cafeteria/application/manageMenuItemUseCase";
import MenuItemFormModal from "@features/cafeteria/presentation/components/MenuItemFormModal";

const MEAL_META = {
  Breakfast: { icon: Sunrise, tone: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400" },
  Lunch: { icon: Sun, tone: "bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-400" },
  Dinner: { icon: Moon, tone: "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-300" },
};

function currentDay() {
  const jsDay = new Date().getDay();
  return WEEK_DAYS[(jsDay + 6) % 7];
}

export default function CafeteriaPage() {
  const { menuItems, isLoading, refresh } = useWeeklyMenu();
  const [activeDay, setActiveDay] = useState(currentDay());
  const [formState, setFormState] = useState({ open: false, mealSlot: null, item: null });
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (values) => {
    await saveMenuItemUseCase(activeDay, formState.mealSlot, values);
    setFormState({ open: false, mealSlot: null, item: null });
    refresh();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteMenuItemUseCase(deletingItem.id);
    setIsDeleting(false);
    setDeletingItem(null);
    refresh();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Cafeteria" subtitle="Manage the weekly meal menu" />

      <div className="mb-6 flex flex-wrap gap-2">
        {WEEK_DAYS.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setActiveDay(day)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeDay === day
                ? "bg-primary-800 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[var(--color-surface)] dark:text-slate-300 dark:hover:bg-white/5"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {MEAL_SLOTS.map((mealSlot) => {
          const item = menuItems.find((menuItem) => menuItem.day === activeDay && menuItem.mealSlot === mealSlot);
          const meta = MEAL_META[mealSlot];
          const Icon = meta.icon;

          return (
            <Card key={mealSlot} className="p-5">
              <div className="flex items-center justify-between">
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", meta.tone)}>
                  <Icon size={18} />
                </span>
                {item && (
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormState({ open: true, mealSlot, item })}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary-800 dark:hover:bg-white/5"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingItem(item)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-danger-50 hover:text-danger-600 dark:hover:bg-danger-500/10"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">{mealSlot}</p>

              {item ? (
                <>
                  <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  icon={Plus}
                  className="mt-3"
                  onClick={() => setFormState({ open: true, mealSlot, item: null })}
                >
                  Add dish
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      <MenuItemFormModal
        key={formState.open ? `${activeDay}-${formState.mealSlot}` : "closed"}
        open={formState.open}
        day={activeDay}
        mealSlot={formState.mealSlot}
        item={formState.item}
        onClose={() => setFormState({ open: false, mealSlot: null, item: null })}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Remove dish"
        confirmLabel="Remove"
        description={`Remove "${deletingItem?.name}" from the menu?`}
      />
    </div>
  );
}
