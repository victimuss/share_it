import { api } from "./api";
import { LoginRequest, AuthResponse } from "../types/auth";

export const Login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/authenticate', data);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса на вход:`, error);
    throw error;
  }
};

