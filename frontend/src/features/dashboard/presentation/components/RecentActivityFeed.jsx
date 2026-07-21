import { FiUserPlus, FiTool, FiCreditCard, FiUserCheck, FiActivity } from "react-icons/fi";
import EmptyState from "@shared/components/EmptyState";

const TYPE_META = {
  registration: { icon: FiUserPlus, tone: "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-300" },
  complaint: { icon: FiTool, tone: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500" },
  payment: { icon: FiCreditCard, tone: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" },
  visitor: { icon: FiUserCheck, tone: "bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-500" },
};

export default function RecentActivityFeed({ activities }) {
  if (!activities || activities.length === 0) {
    return <EmptyState icon={FiActivity} message="No recent activity" />;
  }

  return (
    <ul className="space-y-1">
      {activities.map((activity) => {
        const meta = TYPE_META[activity.type] ?? { icon: FiActivity, tone: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" };
        const Icon = meta.icon;

        return (
          <li key={activity.id} className="flex items-start gap-3 rounded-xl px-2 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.tone}`}>
              <Icon size={16} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-slate-700 dark:text-slate-300">{activity.message}</p>
              <p className="text-xs text-slate-400">{activity.time}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
