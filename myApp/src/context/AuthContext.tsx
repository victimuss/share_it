// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance, { } from "../api/apiInstance";
import { Login, Refresh } from "../api/auth/auth";
import { AuthResponse, RefreshResponse } from "../types/auth";
import { useLessonStore } from "./useLessonStore";
import { useSheetStore } from "./useSheetStore";
// Интерфейс пользователя
export interface User {
  name: string;
  description: string
  tag: string
  us_likes: number
  us_lessons: number
  us_learn_lessons: number
  site: string
  telegram: string
  avatar: string
}

// Интерфейс контекста
interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  edit: (user_name: string, description: string, tag: string, site: string, telegram: string, avatar: string) => void;
}

// Дефолтный контекст
const defaultContext: AuthContextType = {
  user: null,
  accessToken: null,
  login: async () => { },
  logout: async () => { },
  refreshToken: async () => { },
  edit: (user_name: string, description: string, tag: string, site: string, telegram: string, avatar: string) => { },
};
export const TotalclearStore = () => {
  useLessonStore.getState().clearStore();
  useSheetStore.getState().clearLesson();
}

// Создаём контекст
export const AuthContext = createContext<AuthContextType>(defaultContext);

// Провайдер
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const edit = (user_name: string, description: string, tag: string, site: string, telegram: string, avatar: string) => {
    setUser(prev => prev
      ? { ...prev, name: user_name, description, tag, site, telegram, avatar }
      : null
    );
  };

  // Логин
  const login = async (email: string, password: string) => {
    const res: AuthResponse = await Login({ email, password });
    setAccessToken(res.access_token);
    setUser({ name: res.user.user_name, description: res.user.description, tag: res.user.tag, us_likes: res.us_likes, us_lessons: res.us_lessons, us_learn_lessons: res.us_learn_lessons, site: res.user.site, telegram: res.user.telegram, avatar: res.user.avatar });
    await AsyncStorage.setItem("access_token", res.access_token);
    if (res.refresh_token) await AsyncStorage.setItem("refresh_token", res.refresh_token);
  };

  // Логаут
  const logout = async () => {
    setAccessToken(null);
    setUser(null);
    TotalclearStore();
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
  };

  // Рефреш токена
  const refreshToken = async () => {
    try {
      const res: RefreshResponse = await Refresh();
      setAccessToken(res.access_token);
      await AsyncStorage.setItem("access_token", res.access_token);
    } catch (err) {
      console.error("Refresh token error:", err);
      await logout();
    }
  };

  // Автообновление токена при монтировании
  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, refreshToken, edit }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};