import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: any;
  setUser: (data: any) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: "hoadv",
      setUser: (data: any) => set({ user: data }),
    }),
    {
      name: "user-storage",
      // partialize(state) {
      //   return { user: state.user };
      // },
    },
  ),
);
