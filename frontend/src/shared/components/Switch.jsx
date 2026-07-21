import { cn } from "@shared/utils/cn";

export default function Switch({ checked, onChange, label, description }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-3">
      <span>
        <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{description}</span>}
      </span>

      <span
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-primary-800 dark:bg-primary-600" : "bg-slate-200 dark:bg-slate-700"
        )}
      >
        <span
          className={cn(
            "inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </span>
    </label>
  );
}
