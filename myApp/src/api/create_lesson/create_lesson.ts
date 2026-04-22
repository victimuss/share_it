
import { CloudinaryRequest, CloudinaryResponse, DeleteLessonBannerRequest, DeleteLessonBannerResponse, LessonCreate, LessonOut, PublishOut, SheetCreate, SheetOut, TagCreate, TagsOut } from "@/src/types/createlesson";
import { api } from "../api";



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

export const DeleteLessonBanner = async (data: DeleteLessonBannerRequest): Promise<DeleteLessonBannerResponse> => {

    try {
        const response = await api.post<DeleteLessonBannerResponse>(`lessons/delete-lesson-banner?sheet_id=${data.sheet_id}`, {});
        return response;
    } catch (error) {
        console.error(`Ошибка запроса удаления баннера урока:`, error);
        throw error;
    }
};


import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoadLessonBanner = async (data: CloudinaryRequest) => { // это пиздец а не передача
    const formData = new FormData();
    const access_token = await AsyncStorage.getItem("access_token");
    formData.append('file', {
        uri: data.file.uri,
        name: data.file.name || 'photo.jpg',
        type: data.file.type || 'image/jpeg',
    } as any);

    const url = `http://172.20.101.59:8000/lessons/upload-lesson-banner?lesson_id=${data.lesson_id}&sheet_id=${data.sheet_id}`;

    console.log("🚀 Пытаюсь отправить на:", url);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            console.log("❌ Сервер ответил ошибкой:", result);
            throw result;
        }

        console.log("✅ УСПЕХ через fetch:", result);
        return result;
    } catch (error) {
        console.error("🔥 Network Error в fetch обычно значит, что файл слишком большой или URL недоступен:", error);
        throw error;
    }
};