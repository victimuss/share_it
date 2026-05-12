export interface AiTaskRequest {
    lesson_type: string | null
    difficulty: string | null
    language: string | null
    prompt: string | null
}

export interface AiTaskResponse {
    status: string
    message: string
}
