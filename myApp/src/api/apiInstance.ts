import axios, { AxiosInstance, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

const apiInstance: AxiosInstance = axios.create({
  baseURL: "http://2.26.111.93:8000/",
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  async (config) => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: any }) => {
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._retry
    ) {
      error.config._retry = true;
      try {
        const refresh_token = await AsyncStorage.getItem("refresh_token");
        if (refresh_token) {
          const res = await api.post(`/users/refresh`, {
            token: refresh_token,
          });
          const newAccessToken = res.data.access_token;
          await AsyncStorage.setItem("access_token", newAccessToken);
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiInstance(error.config);
        }
      } catch (err) {
        console.error("Не удалось обновить токен", err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;