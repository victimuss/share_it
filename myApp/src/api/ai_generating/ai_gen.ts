import { api } from "../api";
import { AiTaskRequest, AiTaskResponse } from "../../types/aigenerate";

export const CreateLession = async (data: AiTaskRequest): Promise<AiTaskResponse> => {
    try {
        const response = await api.post<AiTaskResponse>(`lessons/generate_lesson`, data);
        return response;
    } catch (error) {
        console.error(`Ошибка запроса создания урока:`, error);
        throw error;
    }
};
