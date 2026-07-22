import { FiEdit2, FiTrash2, FiCalendar, FiUser } from "react-icons/fi";
import { Card } from "@shared/components/Card";
import Badge from "@shared/components/Badge";

const CATEGORY_TONE = { General: "neutral", Maintenance: "warning", Payment: "info", Emergency: "danger" };

export default function AnnouncementCard({ announcement, onEdit, onDelete }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone={CATEGORY_TONE[announcement.category]}>{announcement.category}</Badge>
          <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{announcement.title}</h3>
        </div>

        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(announcement)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary-800 dark:hover:bg-slate-800 dark:hover:text-primary-400"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(announcement)}
            className="rounded-lg p-2 text-slate-400 hover:bg-danger-50 hover:text-danger-600 dark:hover:bg-danger-500/10 dark:hover:text-danger-400"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{announcement.message}</p>

      <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">
        <span className="flex items-center gap-1.5">
          <FiUser size={12} />
          {announcement.createdBy}
        </span>
        <span className="flex items-center gap-1.5">
          <FiCalendar size={12} />
          {announcement.createdDate}
        </span>
      </div>
    </Card>
  );
}
