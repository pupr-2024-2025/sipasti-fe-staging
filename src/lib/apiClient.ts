import axios from "axios";
import { getToken } from "@/storage/token";

const api = axios.create({
  baseURL: "https://api-ecatalogue-staging.online/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: inject token if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
