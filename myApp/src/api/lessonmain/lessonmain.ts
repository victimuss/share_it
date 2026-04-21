
import { api } from "../api";
import { LikeRequest, LikeResponse, PersonalLessonResponse, RankRequest, SheetRequest, SheetResponse } from "@/src/types/lessonmainscreen";


export const GetLessonByIdAPI = async (lesson_id: number): Promise<PersonalLessonResponse> => {
    try {
        const response = await api.get<PersonalLessonResponse>(`lessons/get_lesson_by_id?lesson_id=${lesson_id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса урока:`, error);
        throw error;
    }
};

export const LikeLessonAPI = async (request: LikeRequest): Promise<LikeResponse> => {
    try {
        const response = await api.post<LikeResponse>(`lessons/like_lesson?lesson_id=${request.lesson_id}&like=${request.like}`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса урока:`, error);
        throw error;
    }
};

export const RankLessonAPI = async (request: RankRequest): Promise<PersonalLessonResponse> => {
    try {
        const response = await api.post<PersonalLessonResponse>(`lessons/rank_lesson?lesson_id=${request.lesson_id}&rank=${request.rank}`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса урока:`, error);
        throw error;
    }
};

export const GetSheetApi = async (request: SheetRequest): Promise<SheetResponse> => {
    try {
        const response = await api.get<SheetResponse>(`lessons/get_sheets?lesson_id=${request.lesson_id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса урока:`, error);
        throw error;
    }
};

