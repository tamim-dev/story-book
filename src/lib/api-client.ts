import axios, { AxiosError, type AxiosInstance } from "axios";

const API_TIMEOUT_MS = 5000;
const TOKEN_STORAGE_KEY = "token";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: API_TIMEOUT_MS,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.location.assign("/login");
    }

    console.error("API request failed:", error);

    return Promise.reject(error);
  },
);

export { apiClient };
