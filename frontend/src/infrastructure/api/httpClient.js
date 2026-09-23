import axios from "axios";
import { useAuthStore } from "@features/authentication/application/useAuthStore";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // The gateway rejected our token (expired or revoked). Drop the session and
      // say why, so the guard sends the user to /login with an explanation rather
      // than silently bouncing them.
      useAuthStore.getState().clearSession();
      useAuthStore.getState().setAuthError("Your session has expired. Please sign in again.");
    }
    return Promise.reject(error);
  }
);
