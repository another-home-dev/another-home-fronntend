import settingsRepository from "@features/settings/infrastructure/settingsRepository";

export async function changePasswordUseCase({ currentPassword, newPassword, confirmPassword }) {
  const errors = {};
  if (!currentPassword) errors.currentPassword = "Current password is required";
  if (!newPassword || newPassword.length < 6) errors.newPassword = "New password must be at least 6 characters";
  if (newPassword !== confirmPassword) errors.confirmPassword = "Passwords do not match";

  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return settingsRepository.changePassword();
}
