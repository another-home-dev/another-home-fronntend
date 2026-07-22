import settingsRepository from "@features/settings/infrastructure/settingsRepository";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function updateProfileUseCase({ name, email }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = "Name is required";
  if (!email || !EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address";

  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return settingsRepository.updateProfile({ name: name.trim(), email: email.trim() });
}
