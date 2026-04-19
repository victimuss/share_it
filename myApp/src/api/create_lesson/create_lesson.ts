
import { LessonCreate, LessonOut, PublishOut, SheetCreate, SheetOut, TagCreate, TagsOut } from "@/src/types/createlesson";
import { api } from "../api";

import AsyncStorage from '@react-native-async-storage/async-storage';


export const CreateLession = async (data: LessonCreate): Promise<LessonOut> => {
    try {
        const response = await api.post<LessonOut>(`lessons/new_lesson`, data);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса создания урока:`, error);
        throw error;
    }
};

export const CreateSheet = async (data: SheetCreate, lesson_id: number): Promise<SheetOut> => {
    try {
        const response = await api.post<SheetOut>(`lessons/new_sheet?lesson_id=${lesson_id}`, data);
        return response;
    } catch (error) {
        console.log("ДЕТАЛИ ОШИБКИ 422:", JSON.stringify(error.response.data, null, 2));
        throw error;
    }
};

export const Publish = async (lesson_id: number): Promise<PublishOut> => {
    try {
        const response = await api.post<PublishOut>(`lessons/${lesson_id}/publish`, {});
        return response;
    } catch (error) {
        console.error(`Ошибка запроса публикации урока:`, error);
        throw error;
    }
};

export const AddTags = async (data: TagCreate): Promise<TagsOut> => {
    try {
        const response = await api.post<TagsOut>(`lessons/add_tags`, data);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса добавления тегов:`, error);
        throw error;
    }
};