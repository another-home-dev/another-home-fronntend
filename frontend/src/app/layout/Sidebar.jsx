import { NavLink } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import { cn } from "@shared/utils/cn";
import BrandMark from "@shared/components/BrandMark";
import { NAV_ITEMS } from "@app/layout/navigation";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import { useUnreadNotificationCount } from "@features/notifications/application/useNotificationsStore";

export default function Sidebar({ open, onClose }) {
  const user = useAuthStore((state) => state.user);
  const unreadCount = useUnreadNotificationCount();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 -translate-x-full flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0",
          "dark:border-white/[0.06] dark:bg-[var(--color-surface)]",
          open && "translate-x-0"
        )}
      >
        <div className="flex items-center gap-3 px-6 py-5">
          <BrandMark size={38} />
          <div>
            <p className="text-sm font-bold leading-tight text-slate-900 dark:text-slate-100">Another Home</p>
            <p className="text-xs text-slate-400">Smart Hostel Platform</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {NAV_ITEMS.map(({ label, path, icon: Icon, badgeKey }) => {
            const badgeCount = badgeKey === "notifications" ? unreadCount : 0;

            return (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors",
                    "hover:bg-primary-50 hover:text-primary-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white",
                    isActive &&
                      "bg-primary-800 text-white hover:bg-primary-800 hover:text-white dark:bg-gradient-to-r dark:from-primary-600 dark:to-primary-700 dark:text-white dark:shadow-[var(--shadow-glow-primary)] dark:hover:from-primary-600 dark:hover:to-primary-700"
                  )
                }
              >
                <Icon size={18} className="shrink-0" />
                <span className="flex-1">{label}</span>
                {badgeCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 px-1.5 text-[11px] font-semibold text-white">
                    {badgeCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-slate-100 p-4 dark:border-white/[0.06]">
          <div className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-950 p-4 text-white shadow-[var(--shadow-glow-primary)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <FiShield size={18} />
            </span>
            <p className="mt-2.5 text-sm font-semibold">Security Status</p>
            <p className="text-xs text-primary-100">All systems are secure</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success-300">
              <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
              Protected
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-800 text-sm font-semibold text-white">
              {(user?.name ?? "A").charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{user?.name ?? "Admin User"}</p>
              <p className="truncate text-xs capitalize text-slate-400">{user?.role ?? "administrator"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
