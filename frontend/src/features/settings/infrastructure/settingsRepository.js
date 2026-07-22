let notificationPreferences = {
  emailNotifications: true,
  smsNotifications: false,
  maintenanceUpdates: true,
  paymentReminders: true,
};

class SettingsRepository {
  async updateProfile(payload) {
    return payload;
  }

  async changePassword() {
    return { success: true };
  }

  async fetchNotificationPreferences() {
    return notificationPreferences;
  }

  async updateNotificationPreferences(payload) {
    notificationPreferences = { ...notificationPreferences, ...payload };
    return notificationPreferences;
  }
}

export default new SettingsRepository();
