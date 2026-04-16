export interface LessonCreate {
    lesson_name: string;
    description: string;
    type: string;
    level: string;
}

export interface SheetCreate {
    sheet_header: string;
    content: string;
    timeToRead: number;
    sheetType: string;
    description_for_video_or_picture: string;
    video_url: string;
    picture_url: string;
    question_text: string;
    quiz_options: QuizOptions[];
    content_danger: string;
    content_advice: string;
}

export interface QuizOptions {
    option: string;
    is_correct: boolean;
}

export interface EditLesson {
    lesson_name?: string;
    description?: string;
    level?: string;
    status?: string;
    is_active?: boolean;
}

export interface EditSheet {
    sheet_header?: string;
    content?: string;
    timeToRead?: number;
    sheetType?: string;
    description_for_video_or_picture?: string;
    video_url?: string;
    picture_url?: string;
    question_text?: string;
    quiz_options?: QuizOptions[];
    content_danger?: string;
    content_advice?: string;
}

export interface LessonOut {
    id: number;
    lesson_name: string;
    author: string;
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
    is_active: boolean;
}

export interface SheetOut {
    id: number;
    sheet_header: string;
    content: string;
    timeToRead: number;
    sheetType: string;
    description_for_video_or_picture?: string;
    video_url?: string;
    picture_url?: string;
    question_text?: string;
    quiz_options?: QuizOptions[];
    content_danger?: string;
    content_advice?: string;
}

export interface PublishOut {
    status: string;
    message: string;
}

export interface PublishErrorOut {
    status: string;
    message: string;
    reason: string;
    location: string;
}

export interface PublishErrorResponse {
    detail: PublishErrorOut;
}

export interface SheetOut {
    id: number;
    sheet_header: string;
    content: string;
    timeToRead: number;
    sheetType: string;
    description_for_video_or_picture?: string;
    video_url?: string;
    picture_url?: string;
    question_text?: string;
    quiz_options?: QuizOptions[];
    content_danger?: string;
    content_advice?: string;
}