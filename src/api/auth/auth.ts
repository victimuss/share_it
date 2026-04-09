import { api } from "../api";
import { LoginRequest, AuthResponse, RegisRequest, RegisResponse, RefreshResponse } from "../../types/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ref } from "react";
export const Login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('users/login', data);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса на вход:`, error);
    throw error;
  }
};

export const Regis = async (data: RegisRequest): Promise<RegisResponse> => {
  try {
    const response = await api.post<RegisResponse>('users/signup', data);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса на регистрацию:`, error);
    throw error;
  }
};


export const Refresh = async (): Promise<RefreshResponse> => {
  const refresh_token = await AsyncStorage.getItem("refresh_token");
  if (!refresh_token) throw new Error("Нет refresh токена");

  const res = await api.post<RefreshResponse>("users/refresh", { token: refresh_token });
  await AsyncStorage.setItem("access_token", res.access_token);
  return res;
};

