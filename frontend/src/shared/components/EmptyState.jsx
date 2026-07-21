import { FiInbox } from "react-icons/fi";

export default function EmptyState({ icon: Icon = FiInbox, message = "Nothing here yet", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <Icon size={26} />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{message}</p>
        {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
