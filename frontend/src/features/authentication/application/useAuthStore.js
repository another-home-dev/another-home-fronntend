import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setSession: ({ user, token }) => set({ user, token, isAuthenticated: true }),
      clearSession: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (changes) => set((state) => ({ user: state.user ? { ...state.user, ...changes } : state.user })),
    }),
    {
      name: "another-home-auth",
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
