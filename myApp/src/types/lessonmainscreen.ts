export interface PersonalLessonResponse {
    lesson: PersonalLessonOut;
    progress: number;
    is_liked: boolean;
    is_registered: boolean;
    author_name: string
    rank: number | null;
    tags: string[] | null;
}

export interface PersonalLessonOut {
    id: number;
    lesson_name: string;
    author: string | null;
    description: string;
    type: string;
    level: string;
    status: string;
    rank: number;
    sheet_counts: number;
    rank_count: number;
    author_id: number;
    likes: number;
    students_count: number;
    created_at: string;
    updated_at: string;
    author_name: string;
}

export interface LikeRequest {
    lesson_id: number;
    like: boolean;
}

export interface LikeResponse {
    lesson_id: number,
    likes: number,
}

export interface RankRequest {
    lesson_id: number;
    rank: number;
}

export interface RankResponse {
    lesson_id: number,
    rank: number,
    rank_count: number,
}