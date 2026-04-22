import apiInstance from "./apiInstance";
import { getToken } from "../utils/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from "../types/auth";
import { AxiosRequestConfig } from "axios";


export const api = {
  post: async <T = any>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiInstance.post<T>(url, body);
      return response.data;
    } catch (error) {
      console.error(`Ошибка POST запроса ${url}:`, error);
      throw error;
    }
  },

  put: async <T = any>(url: string, body: any): Promise<T> => {
    try {
      const response = await apiInstance.put<T>(url, body);
      return response.data;
    } catch (error) {
      console.error(`Ошибка PUT запроса ${url}:`, error);
      throw error;
    }
  },

  delete: async <T = any>(url: string): Promise<T> => {
    try {
      const response = await apiInstance.delete<T>(url);
      return response.data;
    } catch (error) {
      console.error(`Ошибка DELETE запроса ${url}:`, error);
      throw error;
    }
  },

  get: async <T = any>(url: string): Promise<T> => {
    try {
      const response = await apiInstance.get<T>(url);
      return response.data;
    } catch (error) {
      console.error(`Ошибка GET запроса ${url}:`, error);
      throw error;
    }
  },
}


