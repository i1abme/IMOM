import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${window.localStorage.token}`,
    Refresh: `Bearer ${window.localStorage.refreshToken}`,
  },
});
