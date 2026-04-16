
import { LessonCreate, LessonOut, PublishOut, SheetCreate, SheetOut } from "@/src/types/createlesson";
import { api } from "../api";

import AsyncStorage from '@react-native-async-storage/async-storage';


export const CreateLession = async (data: LessonCreate): Promise<LessonOut> => {
    try {
        const response = await api.post<LessonOut>(`lessons`, data);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса создания урока:`, error);
        throw error;
    }
};

export const CreateSheet = async (data: SheetCreate, lesson_id: number): Promise<SheetOut> => {
    try {
        const response = await api.post<SheetOut>(`lessons/${lesson_id}/sheets`, data);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса создания листа:`, error);
        throw error;
    }
};

export const Publish = async (lesson_id: number): Promise<PublishOut> => {
    try {
        const response = await api.post<PublishOut>(`lessons/${lesson_id}/publish`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса публикации урока:`, error);
        throw error;
    }
};
