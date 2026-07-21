import { cn } from "@shared/utils/cn";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-card)] dark:border-white/[0.06] dark:bg-[var(--color-surface)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className }) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-slate-100 p-5 dark:border-white/[0.06]", className)}>
      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, className }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}
