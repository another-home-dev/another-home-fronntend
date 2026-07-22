import settingsRepository from "@features/settings/infrastructure/settingsRepository";

export async function getNotificationPreferencesUseCase() {
  return settingsRepository.fetchNotificationPreferences();
}

export async function updateNotificationPreferencesUseCase(payload) {
  return settingsRepository.updateNotificationPreferences(payload);
}
