import { Eye, Pencil, MoreVertical } from "lucide-react";

function ActionButton({ icon: Icon, label, onClick, disabled }) {
  return (
    <button
      type="button"
      title={label}
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-primary-50 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-primary-500/15 dark:hover:text-primary-300"
    >
      <Icon size={16} />
    </button>
  );
}

export default function RowActions({ onView }) {
  return (
    <div className="flex items-center gap-1">
      <ActionButton icon={Eye} label="View" onClick={onView} />
      <ActionButton icon={Pencil} label="Edit (coming soon)" disabled />
      <ActionButton icon={MoreVertical} label="More (coming soon)" disabled />
    </div>
  );
}
