import API from "../api/ApiInstance";

const authService = {
  getAccessToken: () => localStorage.getItem("accessToken"),

  setAccessToken: (token) => localStorage.setItem("accessToken", token),

  removeAccessToken: () => localStorage.removeItem("accessToken"),

  refreshToken: async () => {
    try {
      const { data } = await API.get("/refresh");
      authService.setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (error) {
     
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const { data } = await API.post("/register", userData);
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed. Please try again.";
    }
  },

  login: async (credentials) => {
    try {
      const { data } = await API.post("/login", credentials);
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed. Please try again.";
    }
  },

  getProfile: async () => {
    try {
      const { data } = await API.get("/profile");
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch profile.";
    }
  },

  


};

export default authService;
