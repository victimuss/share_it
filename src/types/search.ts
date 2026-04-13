
export interface PopularTagsResponse {
    popular_tags: string[];
}
export type LessonType = "code" | "business" | "design" | null | 'language';
export interface Lesson {
    author: any;
    id: number;
    type: LessonType;
    sheet_counts: number;
    rank_count: number;
    author_id: number;
    created_at: string;
    is_active: boolean;
    level: string;
    description: string;
    lesson_name: string;
    rank: number;
    likes: number;
    students_count: number;
    updated_at: string;
}

export interface SearchLessonsResponse {
    lessons: Lesson[];
    total: number;
}

export interface SearchLessonsRequest {
    search: string;
    type: LessonType;
    level: string;
    page: number;
    order: string
}