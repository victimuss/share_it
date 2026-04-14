import { AuthorRequest, AuthorResponce, CurrentLessonRequest, curretLessonResponce, LessonRequest, PopularLessonsResponce, RecentLessonsResponce } from "@/src/types/main_page";
import { api } from "../../api";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditSkill, LearnedLessonsResponce, MakedLessonsResponce, NewSkill, Skill, SkillOut, SkillRequest } from "@/src/types/profile";

export const GetUserSkills = async (): Promise<Skill[]> => {
  try {
    const response = await api.get<Skill[]>(`users/users_skills`);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса skills:`, error);
    throw error;
  }
};

export const NewSkillapi = async (data: NewSkill): Promise<SkillOut> => {
  try {
    const response = await api.post<SkillOut>('users/new_skill', data);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса skills:`, error);
    throw error;
  }
}

export const EditSkillapi = async (data: EditSkill): Promise<SkillOut> => {
  try {
    const query = data.user_id ? `?type=${data.user_id}` : ''
    const response = await api.put<SkillOut>('users/edit_skill${query}', data);
    return response;
  } catch (error) {
    console.error(`Ошибка запроса skills:`, error);
    throw error;
  }


}

export const UsersLearned = async (): Promise<LearnedLessonsResponce> => {
  try {
    const response = await api.get<LearnedLessonsResponce>('users/users_learned');
    return response;
  } catch (error) {
    console.error(`Ошибка запроса skills:`, error);
    throw error;
  }
}

export const UsersMaked = async (): Promise<MakedLessonsResponce> => {
  try {
    const response = await api.get<MakedLessonsResponce>('users/user_maked_lessons');
    return response;
  } catch (error) {
    console.error(`Ошибка запроса skills:`, error);
    throw error;
  }
}