import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { cn } from "@shared/utils/cn";

const ICON_TONE_CLASSES = {
  primary:
    "bg-primary-50 text-primary-800 dark:bg-gradient-to-br dark:from-primary-500 dark:to-primary-700 dark:text-white dark:shadow-[var(--shadow-glow-primary)]",
  success:
    "bg-success-50 text-success-600 dark:bg-gradient-to-br dark:from-success-500 dark:to-success-600 dark:text-white dark:shadow-[var(--shadow-glow-success)]",
  warning:
    "bg-warning-50 text-warning-600 dark:bg-gradient-to-br dark:from-warning-500 dark:to-warning-600 dark:text-white dark:shadow-[var(--shadow-glow-warning)]",
  danger:
    "bg-danger-50 text-danger-600 dark:bg-gradient-to-br dark:from-danger-500 dark:to-danger-600 dark:text-white dark:shadow-[var(--shadow-glow-danger)]",
  info: "bg-info-50 text-info-600 dark:bg-gradient-to-br dark:from-info-500 dark:to-info-600 dark:text-white dark:shadow-[var(--shadow-glow-info)]",
};

export default function StatCard({ label, value, icon: Icon, tone = "primary", trend, className }) {
  const isPositive = trend?.direction !== "down";

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
        "dark:border-white/[0.06] dark:bg-[var(--color-surface)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
        </div>
        {Icon && (
          <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", ICON_TONE_CLASSES[tone])}>
            <Icon size={20} />
          </span>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1 text-xs font-semibold">
          <span className={cn("flex items-center gap-0.5", isPositive ? "text-success-600 dark:text-success-400" : "text-danger-600 dark:text-danger-400")}>
            {isPositive ? <FiArrowUpRight size={14} /> : <FiArrowDownRight size={14} />}
            {trend.value}
          </span>
          <span className="font-normal text-slate-400">{trend.label ?? "vs last month"}</span>
        </div>
      )}
    </div>
  );
}
