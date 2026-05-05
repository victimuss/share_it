// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "../api/apiInstance";
import { Refresh, CryptoChallengeReq, CryptoVerifyReq } from "../api/auth/auth";
import { AuthResponse, RefreshResponse } from "../types/auth";
import { useLessonStore } from "./useLessonStore";
import { useSheetStore } from "./useSheetStore";
import CryptoService from "../utils/CryptoServices";

export interface User {
  name: string;
  description: string;
  tag: string;
  us_likes: number;
  us_lessons: number;
  us_learn_lessons: number;
  site: string;
  telegram: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loginWithCrypto: (mnemonic?: string) => Promise<void>;
  registerWithCrypto: () => Promise<string>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  edit: (user_name: string, description: string, tag: string, site: string, telegram: string, avatar: string) => void;
}

const defaultContext: AuthContextType = {
  user: null,
  accessToken: null,
  loginWithCrypto: async () => { },
  registerWithCrypto: async () => "",
  logout: async () => { },
  refreshToken: async () => { },
  edit: () => { },
};

export const TotalclearStore = () => {
  useLessonStore.getState().clearStore();
  useSheetStore.getState().clearLesson();
}

export const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const edit = (user_name: string, description: string, tag: string, site: string, telegram: string, avatar: string) => {
    setUser(prev => prev ? { ...prev, name: user_name, description, tag, site, telegram, avatar } : null);
  };

  const saveSession = async (res: AuthResponse) => {
    setAccessToken(res.access_token);
    setUser({
      name: res.user.user_name, description: res.user.description, tag: res.user.tag,
      us_likes: res.us_likes, us_lessons: res.us_lessons, us_learn_lessons: res.us_learn_lessons,
      site: res.user.site, telegram: res.user.telegram, avatar: res.user.avatar
    });
    await AsyncStorage.setItem("access_token", res.access_token);
    if (res.refresh_token) await AsyncStorage.setItem("refresh_token", res.refresh_token);
  };

  const loginWithCrypto = async (mnemonic?: string) => {
    if (mnemonic) {
      await CryptoService.restoreFromMnemonic(mnemonic);
    }
    const pubkey = await CryptoService.getPublicKey();
    if (!pubkey) throw new Error("Ключи не найдены. Требуется регистрация.");

    const { nonce } = await CryptoChallengeReq({ public_key: pubkey });

    const signature = await CryptoService.signChallenge(nonce);

    const res: AuthResponse = await CryptoVerifyReq({
      public_key: pubkey,
      nonce,
      signature
    });

    await saveSession(res);
  };


  const registerWithCrypto = async (): Promise<string> => {
    const { mnemonic, publicKey } = await CryptoService.generateAndSaveIdentity();
    await loginWithCrypto(mnemonic);

    return mnemonic;
  };

  const logout = async () => {
    setAccessToken(null);
    setUser(null);
    TotalclearStore();
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
  };

  const refreshToken = async () => {
    try {
      const savedRefresh = await AsyncStorage.getItem("refresh_token");
      if (!savedRefresh) return;

      const res: RefreshResponse = await Refresh();
      setAccessToken(res.access_token);
      await AsyncStorage.setItem("access_token", res.access_token);
    } catch (err) {
      await logout();
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loginWithCrypto, registerWithCrypto, logout, refreshToken, edit }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};