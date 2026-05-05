import { api } from "../api";
import { LoginRequest, AuthResponse, RegisRequest, RegisResponse, RefreshResponse, CryptoRequestChallenge, CryptoResponseChallenge, CryptoRequestVerify, CryptoResponseVerify } from "../../types/auth";
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

export const CryptoChallengeReq = async (data: CryptoRequestChallenge): Promise<CryptoResponseChallenge> => {
  const params = new URLSearchParams();
  if (data.user_id !== undefined) params.append("user_id", data.user_id.toString());
  if (data.public_key !== undefined) params.append("public_key", data.public_key);
  
  const response = await api.post<CryptoResponseChallenge>(`auth/request_challenge?${params.toString()}`, {});
  return response;
};

export const CryptoVerifyReq = async (data: CryptoRequestVerify): Promise<CryptoResponseVerify> => {
  const response = await api.post<CryptoResponseVerify>(`auth/verify_challenge`, data);
  return response;
}; 
