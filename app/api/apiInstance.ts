import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../utils/storage';



const apiInstance = axios.create({
  baseURL: '192.168.88.163:8000/api', // Замените на URL вашего бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(async (config) => {
  const { access_token } = await getToken();
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiInstance.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { refresh_token } = await getToken();
      if (refresh_token) {
        try {
          const res = await axios.post('http://192.168.88.163:8000/api/refresh', { token: refresh_token });
          const newAccessToken = res.data.access_token;
          await AsyncStorage.setItem('access_token', newAccessToken);
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return apiInstance(error.config);
        } catch {
          console.log("Не удалось обновить токен");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;


