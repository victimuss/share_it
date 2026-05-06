import { AuthorRequest, AuthorResponce, CurrentLessonRequest, CurrentLessonResponse, curretLessonResponce, LessonRequest, PopularLessonsResponce, RecentLessonsResponce, TelegramLinkResponse } from "@/src/types/main_page";
import { api } from "../api";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const PopularLession = async (data: LessonRequest): Promise<PopularLessonsResponce> => {
  try {
    const query = data.type ? `?type=${data.type}` : '';
    const response = await api.get<PopularLessonsResponce>(`main_page/popular_lessons${query}`);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса популярных уроков:`, error);
    throw error;
  }
};
export const RecentLession = async (data: LessonRequest): Promise<PopularLessonsResponce> => {
  try {
    const query = data.type ? `?type=${data.type}` : '';
    const response = await api.get<PopularLessonsResponce>(`main_page/new_lessons${query}`);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса популярных уроков:`, error);
    throw error;
  }
};

export const CurrentLession = async (data: CurrentLessonRequest): Promise<CurrentLessonResponse> => {
  try {
    const response = await api.get<CurrentLessonResponse>(`users/last_lession`);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса популярных уроков:`, error);
    throw error;
  }

}

export const getAuthor = async (data: string): Promise<string> => {
  try {
    const query = data ? `?author_id=${data}` : '';
    const response = await api.get<string>(`main_page/author${query}`);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса популярных уроков:`, error);
    throw error;
  }
};

export const LinkTelegram = async (): Promise<TelegramLinkResponse> => {
  try {
    const response = await api.post<TelegramLinkResponse>(`auth/telegram`, {});
    return response;
  } catch (error) {
    console.error(`Ошибка запроса ссылки телеграмма:`, error);
    throw error;
  }
};
