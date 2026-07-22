import { cn } from "@shared/utils/cn";

const TONE_CLASSES = {
  success: "bg-success-100 text-success-700 dark:bg-success-500/15 dark:text-success-500",
  warning: "bg-warning-100 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500",
  danger: "bg-danger-100 text-danger-600 dark:bg-danger-500/15 dark:text-danger-500",
  info: "bg-info-100 text-info-600 dark:bg-info-500/15 dark:text-info-500",
  neutral: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  primary: "bg-primary-100 text-primary-800 dark:bg-primary-500/15 dark:text-primary-300",
};

export default function Badge({ tone = "neutral", children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        TONE_CLASSES[tone],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
