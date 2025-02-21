import { create } from "zustand";
import authService from "../services/authServices";

const useAuthStore = create((set) => ({
  user: null,
  isAuth: false,

  setUser: (userData) => set({ user: userData, isAuth: !!userData }),

  fetchProfile: async () => {
    try {
      const userData = await authService.getProfile();
      set({ user: userData, isAuth: true });
    } catch (error) {
      console.error("Error fetching profile:", error);
      set({ user: null, isAuth: false });
    }
  },

  login: async (credentials) => {
    try {
      const response = await authService.login(credentials);
      await useAuthStore.getState().fetchProfile(); 
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ user: null, isAuth: false });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export default useAuthStore;
