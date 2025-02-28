import API from "../api/ApiInstance";

const authService = {
  refreshToken: async () => {
    const { data } = await API.get("/refresh");
    return data.accessToken;
  },

  register: async (userData) => {
    const { data } = await API.post("/register", userData);
    return data;
  },

  login: async (credentials) => {
    const { data } = await API.post("/login", credentials);
    return data;
  },

  getProfile: async () => {
    const { data } = await API.get("/profile");
    return data;
  },

  logout: async () => {
    await API.post("/logout");
    return true;
  },
  
  fetchTodos: async (numericId) => {
    const { data } = await API.get(`https://jsonplaceholder.typicode.com/todos?userId=${numericId}`);
    return data;
  },
  
};

export default authService;
