import { useEffect, useState } from "react";
import Switch from "@shared/components/Switch";
import Spinner from "@shared/components/Spinner";
import {
  getNotificationPreferencesUseCase,
  updateNotificationPreferencesUseCase,
} from "@features/settings/application/notificationPreferencesUseCase";

const OPTIONS = [
  { key: "emailNotifications", label: "Email notifications", description: "Receive important updates via email" },
  { key: "smsNotifications", label: "SMS notifications", description: "Receive urgent alerts via SMS" },
  { key: "maintenanceUpdates", label: "Maintenance updates", description: "Get notified when complaint status changes" },
  { key: "paymentReminders", label: "Payment reminders", description: "Get notified about pending and overdue fees" },
];

export default function NotificationSettingsForm() {
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getNotificationPreferencesUseCase().then((data) => {
      if (isMounted) setPreferences(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggle = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    updateNotificationPreferencesUseCase({ [key]: value });
  };

  if (!preferences) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {OPTIONS.map((option) => (
        <Switch
          key={option.key}
          label={option.label}
          description={option.description}
          checked={preferences[option.key]}
          onChange={(value) => handleToggle(option.key, value)}
        />
      ))}
    </div>
  );
}
