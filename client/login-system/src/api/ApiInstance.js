import axios from "axios";
import { BASE_URL } from "../utils/config";
import authService from "../services/authServices";
import useAuthStore from "../store/authStore";


const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});




API.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              await authService.refreshToken();
              await useAuthStore.getState().fetchProfile();
              return API(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            useAuthStore.getState().logout();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
      }

      

      return Promise.reject(error);
  }
);

export default API;
