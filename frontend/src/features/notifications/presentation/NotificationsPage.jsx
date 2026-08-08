import { useEffect, useState } from "react";
import { Wrench, UserCheck, CreditCard, Megaphone, Bell, Check } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import { Card } from "@shared/components/Card";
import Button from "@shared/components/Button";
import Spinner from "@shared/components/Spinner";
import EmptyState from "@shared/components/EmptyState";
import Pagination from "@shared/components/Pagination";
import { cn } from "@shared/utils/cn";
import { useNotificationsStore } from "@features/notifications/application/useNotificationsStore";

const TYPE_META = {
  maintenance: { icon: Wrench, tone: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400" },
  visitor: { icon: UserCheck, tone: "bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-400" },
  payment: { icon: CreditCard, tone: "bg-danger-50 text-danger-600 dark:bg-danger-500/15 dark:text-danger-400" },
  announcement: { icon: Megaphone, tone: "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-300" },
};

const PAGE_SIZE = 10;

export default function NotificationsPage() {
  const { notifications, isLoading, hasLoaded, load, markAsRead, markAllAsRead } = useNotificationsStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!hasLoaded) load();
  }, [hasLoaded, load]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const totalPages = Math.max(1, Math.ceil(notifications.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageNotifications = notifications.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}` : "You're all caught up"}
        action={
          unreadCount > 0 && (
            <Button icon={Check} variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )
        }
      />

      <Card>
        {notifications.length === 0 ? (
          <EmptyState icon={Bell} message="No notifications" description="You'll see updates from across the hostel here" />
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-white/[0.06]">
            {pageNotifications.map((notification) => {
              const meta = TYPE_META[notification.type] ?? TYPE_META.announcement;
              const Icon = meta.icon;

              return (
                <li
                  key={notification.id}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                  className={cn(
                    "flex items-start gap-3 px-5 py-4 transition-colors",
                    !notification.isRead && "cursor-pointer bg-primary-50/40 hover:bg-primary-50 dark:bg-primary-500/[0.06] dark:hover:bg-primary-500/10"
                  )}
                >
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", meta.tone)}>
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{notification.title}</p>
                    <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">{notification.message}</p>
                    <p className="mt-1 text-xs text-slate-400">{notification.time}</p>
                  </div>
                  {!notification.isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-600 dark:bg-primary-400" />}
                </li>
              );
            })}
          </ul>
        )}

        {notifications.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={notifications.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            label="notifications"
          />
        )}
      </Card>
    </div>
  );
}
