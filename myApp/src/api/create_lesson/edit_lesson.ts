
import { api } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditLesson, LessonOut, EditSheet } from "@/src/types/createlesson";


export const EditLessonAPI = async (data: EditLesson, lesson_id: number): Promise<LessonOut> => {
    try {
        const response = await api.post<LessonOut>(`update_lesson?lesson_id=${lesson_id}`, data);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса редактирования урока:`, error);
        throw error;
    }
};

export const EditSheetAPI = async (data: EditSheet, sheet_id: number): Promise<LessonOut> => {
    try {
        const response = await api.post<LessonOut>(`/update_sheet?${sheet_id}=3`, data);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса редактирования листа:`, error);
        throw error;
    }
};