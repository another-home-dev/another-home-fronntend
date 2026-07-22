import { forwardRef } from "react";
import { FiLoader } from "react-icons/fi";
import { cn } from "@shared/utils/cn";

const VARIANT_CLASSES = {
  primary:
    "bg-primary-800 text-white hover:bg-primary-900 focus-visible:ring-primary-300 shadow-sm dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus-visible:ring-primary-500/40",
  secondary:
    "bg-primary-50 text-primary-800 hover:bg-primary-100 focus-visible:ring-primary-200 dark:bg-primary-500/15 dark:text-primary-300 dark:hover:bg-primary-500/25",
  outline:
    "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus-visible:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
  ghost:
    "text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-800",
  danger:
    "bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-200 shadow-sm dark:bg-danger-500 dark:hover:bg-danger-600",
};

const SIZE_CLASSES = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

const Button = forwardRef(function Button(
  {
    children,
    type = "button",
    variant = "primary",
    size = "md",
    icon: Icon,
    loading = false,
    disabled = false,
    fullWidth = false,
    className,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? (
        <FiLoader className="animate-spin" size={18} />
      ) : (
        Icon && <Icon size={18} />
      )}
      {children}
    </button>
  );
});

export default Button;
