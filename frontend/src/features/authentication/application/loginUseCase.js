import { LoginCredentials } from "@features/authentication/domain/LoginCredentials";
import authRepository from "@features/authentication/infrastructure/authRepository";

export async function loginUseCase(email, password) {
  const credentials = new LoginCredentials(email, password);
  const errors = credentials.validate();

  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return authRepository.login(credentials.email, credentials.password);
}
