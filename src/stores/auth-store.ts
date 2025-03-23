import { getCookie } from 'cookies-next/client';
import { create } from 'zustand';

type AuthState = {
  token: string | null
  user: string | null;
  setUser: (data: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getCookie('tmdb_api_key') || null,
  user: null,
  setUser: (data) => set({ user: data }),
}));
