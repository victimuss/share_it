import { PersonalLessonResponse } from "@/src/types/lessonmainscreen";
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


export const GetMyLessonForEditAPI = async (lesson_id: number): Promise<PersonalLessonResponse> => {
    try {
        const response = await api.get<PersonalLessonResponse>(`lessons/get_lesson_by_id_for_edit?lesson_id=${lesson_id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса урока:`, error);
        throw error;
    }
};
