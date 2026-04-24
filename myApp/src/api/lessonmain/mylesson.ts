import { api } from "../api";
import { MyLessonsResponse } from "@/src/types/mylessontype";


export const GetMyLessonsAPI = async (): Promise<MyLessonsResponse> => {
    try {
        const response = await api.get<MyLessonsResponse>(`users/user_lessons_for_edit`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса урока:`, error);
        throw error;
    }
};
