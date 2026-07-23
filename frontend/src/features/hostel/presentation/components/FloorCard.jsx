import { FiLayers, FiChevronRight } from "react-icons/fi";
import { Card } from "@shared/components/Card";
import Badge from "@shared/components/Badge";

export default function FloorCard({ floor, onSelect }) {
  return (
    <Card
      className="cursor-pointer p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
      onClick={() => onSelect(floor)}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-500">
          <FiLayers size={20} />
        </span>
        <FiChevronRight className="text-slate-300 dark:text-slate-600" size={20} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">{floor.label}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{floor.roomsCount} rooms</p>

      <div className="mt-4">
        <Badge tone={floor.availableRooms > 0 ? "success" : "danger"}>
          {floor.availableRooms} room{floor.availableRooms === 1 ? "" : "s"} available
        </Badge>
      </div>
    </Card>
  );
}
