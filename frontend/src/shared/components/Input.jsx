import { forwardRef, useId } from "react";
import { cn } from "@shared/utils/cn";

const Input = forwardRef(function Input(
  { label, error, helperText, icon: Icon, className, containerClassName, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = props.id ?? generatedId;

  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
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
        {Icon && <Icon className="mr-3 shrink-0 text-slate-400" size={18} />}
        <input
          ref={ref}
          id={inputId}
          className={cn("w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100", className)}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-xs font-medium text-danger-600">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Input;
