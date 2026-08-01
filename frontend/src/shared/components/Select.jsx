import { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@shared/utils/cn";

const Select = forwardRef(function Select(
  { label, error, icon: Icon, className, containerClassName, children, ...props },
  ref
) {
  const generatedId = useId();
  const selectId = props.id ?? generatedId;

  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex items-center rounded-xl border border-slate-300 bg-white px-4 py-3 transition-shadow dark:border-slate-700 dark:bg-slate-800",
          "focus-within:ring-4 focus-within:ring-primary-100 focus-within:border-primary-400 dark:focus-within:ring-primary-500/20 dark:focus-within:border-primary-500",
          error && "border-danger-500 focus-within:ring-danger-100 focus-within:border-danger-500 dark:focus-within:ring-danger-500/20"
        )}
      >
        {Icon && <Icon className="mr-2.5 shrink-0 text-slate-400" size={16} />}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full appearance-none bg-transparent text-sm text-slate-900 outline-none dark:text-slate-100",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="ml-2 shrink-0 text-slate-400" size={16} />
      </div>

      {error && <p className="mt-1.5 text-xs font-medium text-danger-600">{error}</p>}
    </div>
  );
});

export default Select;
