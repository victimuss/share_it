
import { api } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditLesson, LessonOut, EditSheet } from "@/src/types/createlesson";


export const DeleteLessonAPI = async (lesson_id: number): Promise<LessonOut> => {
    try {
        const response = await api.delete<LessonOut>(`lessons/delete_lesson?lesson_id=${lesson_id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса удаления урока:`, error);
        throw error;
    }
};

export const DeleteSheetAPI = async (sheet_id: number, lesson_id: number): Promise<LessonOut> => {
    try {
        const response = await api.delete<LessonOut>(`lessons/delete_sheet?sheet_id=${sheet_id}&lesson_id=${lesson_id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса удаления листа:`, error);
        throw error;
    }
};