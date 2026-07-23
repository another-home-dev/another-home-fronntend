import { FiUsers } from "react-icons/fi";
import { Card } from "@shared/components/Card";
import Badge from "@shared/components/Badge";

const STATUS_TONE = {
  available: "success",
  partial: "warning",
  full: "danger",
};

const STATUS_LABEL = {
  available: "Available",
  partial: "Partially occupied",
  full: "Full",
};

export default function RoomCard({ room, onSelect }) {
  return (
    <Card
      className="cursor-pointer p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
      onClick={() => onSelect(room)}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Room {room.roomNumber}</h3>
        <Badge tone={STATUS_TONE[room.status]}>{STATUS_LABEL[room.status]}</Badge>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <FiUsers size={16} />
        {room.occupiedBeds}/{room.capacity} beds occupied
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-primary-700 dark:bg-primary-500"
          style={{ width: `${(room.occupiedBeds / room.capacity) * 100}%` }}
        />
      </div>
    </Card>
  );
}
