export interface MyLessonsResponse {
    made_lessons: madeLessons[];
    learn_lessons: learnLessons[];
}
export interface madeLessons {
    id: number
    lesson_name: string
    description: string
    type: string
    level: string
    status: string
    rank: number
    sheet_counts: number
    rank_count: number
    likes: number
    students_count: number
    created_at: string
    updated_at: string
    is_active: boolean
}


export interface learnLessons {
    lesson_id: number
    completed_steps: number
    updated_at: string
    status: string
    id: number
    created_at: string
    lesson: madeLessons
}