import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuth: false,
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (userData) => set({ user: userData, isAuth: !!userData }),
  logoutUser: () => set({ user: null, isAuth: false, accessToken: null }), 
}));

export default useAuthStore;
