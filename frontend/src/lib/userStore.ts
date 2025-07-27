import { create } from "zustand";

interface User {
  name: string | null;
  email: string;
  profilePicture?: string | null;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateProfilePicture: (url: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateProfilePicture: (url) =>
    set((state) =>
      state.user ? { user: { ...state.user, profilePicture: url } } : {}
    ),
})); 