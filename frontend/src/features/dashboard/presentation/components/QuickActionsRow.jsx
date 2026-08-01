import { useNavigate } from "react-router-dom";
import { KeyRound, Wrench, CreditCard, Coffee, BarChart3 } from "lucide-react";
import { Card } from "@shared/components/Card";

const ACTIONS = [
  { label: "Room Allocation", description: "Assign rooms smartly", icon: KeyRound, path: "/room-allocation", tone: "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-300" },
  { label: "Maintenance", description: "Manage and track requests", icon: Wrench, path: "/maintenance", tone: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400" },
  { label: "Payments", description: "Track payments and invoices", icon: CreditCard, path: "/payments", tone: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400" },
  { label: "Cafeteria", description: "Manage weekly meal menu", icon: Coffee, path: "/cafeteria", tone: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400" },
  { label: "Reports", description: "Generate detailed analytics", icon: BarChart3, path: "/reports", tone: "bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-400" },
];

export default function QuickActionsRow() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {ACTIONS.map(({ label, description, icon: Icon, path, tone }) => (
        <Card
          key={path}
          onClick={() => navigate(path)}
          className="cursor-pointer p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
        >
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
            <Icon size={18} />
          </span>
          <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </Card>
      ))}
    </div>
  );
}
