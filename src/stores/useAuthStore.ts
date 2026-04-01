import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  avatar: string;
};
interface AuthState {
  user: User | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

// localstorage
// {
//   "auth-storage": {
//     "state": {
//       "user": {...},
//     }
//   }
// }
