import API from "../api/ApiInstance";

const authService = {


  refreshToken: async () => {
    try {
      const { data } = await API.get("/refresh");
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
  logout: async () => {
    try {
      await API.post("/logout"); 
      return true;
    } catch (error) {
      throw error.response?.data?.message || "Logout failed. Please try again.";
    }
  }


};

export default authService;
