import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // our API base URL
});

api.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    const user = localStorage.getItem("userInfo");
    if (user) {
      const { token } = JSON.parse(user);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the api instance
export default api;
