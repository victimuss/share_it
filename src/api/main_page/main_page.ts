import { AuthorRequest, AuthorResponce, CurrentLessonRequest, curretLessonResponce, LessonRequest, PopularLessonsResponce, RecentLessonsResponce } from "@/src/types/main_page";
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

export const CurrentLession = async (data: CurrentLessonRequest): Promise<currentLessonResponce> => {
try {
    const response = await api.get<currentLessonResponce>(`users/last_lession`);
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

