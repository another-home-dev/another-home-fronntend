import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiBell, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import { useNotificationsStore, useUnreadNotificationCount } from "@features/notifications/application/useNotificationsStore";
import ThemeToggle from "@shared/components/ThemeToggle";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const [menuOpen, setMenuOpen] = useState(false);
  const hasLoadedNotifications = useNotificationsStore((state) => state.hasLoaded);
  const loadNotifications = useNotificationsStore((state) => state.load);
  const unreadCount = useUnreadNotificationCount();

  useEffect(() => {
    if (!hasLoadedNotifications) loadNotifications();
  }, [hasLoadedNotifications, loadNotifications]);

  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 dark:border-white/[0.06] dark:bg-[var(--color-surface)]/80">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <FiMenu size={20} />
        </button>

        <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 sm:flex dark:bg-slate-800">
          <FiSearch className="text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search students, rooms, payments..."
            className="w-64 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <FiBell size={20} />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 text-sm font-semibold text-white">
              {(user?.name ?? "A").charAt(0).toUpperCase()}
            </span>
            <span className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user?.name ?? "Admin"}</p>
              <p className="text-xs capitalize text-slate-400">{user?.role ?? "administrator"}</p>
            </span>
            <FiChevronDown className="hidden text-slate-400 sm:block" size={16} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-white/[0.08] dark:bg-[var(--color-surface)]">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <FiUser size={16} />
                  My Profile
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
