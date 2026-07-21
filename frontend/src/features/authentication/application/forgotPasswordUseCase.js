import authRepository from "@features/authentication/infrastructure/authRepository";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function forgotPasswordUseCase(email) {
  const trimmedEmail = email?.trim() ?? "";

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    throw new Error("Enter a valid email address");
  }

  return authRepository.requestPasswordReset(trimmedEmail);
}
