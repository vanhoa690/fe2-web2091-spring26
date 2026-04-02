import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: any;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
    }),
    {
      name: "user-storage",
    },
  ),
);
