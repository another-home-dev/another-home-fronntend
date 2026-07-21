import { create } from "zustand";
import { persist } from "zustand/middleware";

function applyThemeClass(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "dark",
      setTheme: (theme) => {
        applyThemeClass(theme);
        set({ theme });
      },
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        applyThemeClass(next);
        set({ theme: next });
      },
    }),
    {
      name: "another-home-theme",
      onRehydrateStorage: () => (state) => {
        if (state) applyThemeClass(state.theme);
      },
    }
  )
);
