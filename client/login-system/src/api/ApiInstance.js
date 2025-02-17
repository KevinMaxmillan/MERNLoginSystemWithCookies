import axios from "axios";
import { BASE_URL } from "../utils/config";
import authService from "../services/authServices";
import { useNavigate } from "react-router-dom";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const navigateToLogin = () => {
  const navigate = useNavigate();
  navigate("/login"); 
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              await authService.refreshToken();
              return API(originalRequest);
          } catch (refreshError) {
              authService.logout();
              navigateToLogin();
              return Promise.reject(refreshError);
          }
      }

      return Promise.reject(error);
  }
);

export default API;
