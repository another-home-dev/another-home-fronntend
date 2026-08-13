import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setSession: ({ user, token }) =>
        set({ user, token, isAuthenticated: true, isLoading: false }),

      clearSession: () =>
        set({ user: null, token: null, isAuthenticated: false, isLoading: false }),

      setLoading: (isLoading) => set({ isLoading }),

      updateUser: (changes) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...changes } : state.user,
        })),
    }),
    {
      name: "another-home-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);