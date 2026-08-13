import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiBell, FiLogOut } from "react-icons/fi";
import PageHeader from "@shared/components/PageHeader";
import { Card, CardHeader, CardBody } from "@shared/components/Card";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import { cn } from "@shared/utils/cn";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import ProfileSettingsForm from "@features/settings/presentation/components/ProfileSettingsForm";
import AccountSettingsForm from "@features/settings/presentation/components/AccountSettingsForm";
import NotificationSettingsForm from "@features/settings/presentation/components/NotificationSettingsForm";

const TABS = [
  { key: "profile", label: "Admin Profile", icon: FiUser },
  { key: "account", label: "Account Settings", icon: FiLock },
  { key: "notifications", label: "Notifications", icon: FiBell },
];

const TAB_CONTENT = {
  profile: { title: "Admin Profile", subtitle: "Update your personal information", Component: ProfileSettingsForm },
  account: { title: "Account Settings", subtitle: "Change your password", Component: AccountSettingsForm },
  notifications: { title: "Notification Preferences", subtitle: "Choose what you want to be notified about", Component: NotificationSettingsForm },
};

import { useAuthContext } from "@asgardeo/auth-react";

export default function SettingsPage() {
  const navigate = useNavigate();
  const clearSession = useAuthStore((state) => state.clearSession);
  const { signOut } = useAuthContext();
  const [activeTab, setActiveTab] = useState("profile");
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  const handleLogout = async () => {
    clearSession();
    try {
      await signOut();
    } catch (error) {
      console.error("Asgardeo sign out failed:", error);
      navigate("/login", { replace: true });
    }
  };

  const { title, subtitle, Component } = TAB_CONTENT[activeTab];

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your admin account and preferences" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="space-y-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors",
                activeTab === key
                  ? "bg-primary-800 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setConfirmingLogout(true)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-danger-600 transition-colors hover:bg-danger-50 dark:hover:bg-danger-500/10"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </nav>

        <Card>
          <CardHeader title={title} subtitle={subtitle} />
          <CardBody>
            <Component />
          </CardBody>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmingLogout}
        onClose={() => setConfirmingLogout(false)}
        onConfirm={handleLogout}
        title="Log out"
        confirmLabel="Log out"
        description="Are you sure you want to log out of Another Home?"
      />
    </div>
  );
}
