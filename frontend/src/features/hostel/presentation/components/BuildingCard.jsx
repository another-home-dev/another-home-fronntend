import { FiHome, FiLayers, FiChevronRight } from "react-icons/fi";
import { Card } from "@shared/components/Card";

export default function BuildingCard({ building, onSelect }) {
  return (
    <Card
      className="cursor-pointer p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
      onClick={() => onSelect(building)}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-300">
          <FiHome size={20} />
        </span>
        <FiChevronRight className="text-slate-300 dark:text-slate-600" size={20} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">{building.name}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{building.address}</p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <FiLayers size={14} />
          {building.floorCount} floors
        </span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {building.occupiedCount}/{building.totalCapacity} beds
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full rounded-full bg-primary-700 dark:bg-primary-500" style={{ width: `${building.occupancyRate}%` }} />
      </div>
      <p className="mt-1.5 text-right text-xs font-medium text-slate-400">{building.occupancyRate}% occupied</p>
    </Card>
  );
}
