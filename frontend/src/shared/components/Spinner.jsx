import { cn } from "@shared/utils/cn";

export default function Spinner({ size = 24, className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-block animate-spin rounded-full border-2 border-slate-200 border-t-primary-700 dark:border-slate-700 dark:border-t-primary-400", className)}
      style={{ width: size, height: size }}
    />
  );
}
