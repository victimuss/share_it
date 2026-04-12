import { api } from "../api";
import { PopularTagsResponse, SearchLessonsResponse, SearchLessonsRequest } from "@/src/types/search";


export const PopularTags = async (): Promise<PopularTagsResponse> => {
    try {
        const response = await api.get<PopularTagsResponse>(`lessons/popular_tags`);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса популярных тэгов :`, error);
        throw error;
    }
};

export const SearchLessons = async (search_req: SearchLessonsRequest): Promise<SearchLessonsResponse> => {
    try {
        const response = await api.post<SearchLessonsResponse>(`lessons/search_lessons`, search_req);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса поиска уроков :`, error);
        throw error;
    }
};
