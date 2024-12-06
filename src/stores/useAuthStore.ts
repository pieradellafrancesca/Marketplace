import { create } from "zustand";

interface AuthState {
  user: null | { id: string; name: string };
  token: string | null;
  login: (user: { id: string; name: string }, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
