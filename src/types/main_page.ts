export type LessonType = "code" | "business" | "design" | null | 'language'; // пример

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

export interface LastLession {
  id: number;
  completed_steps: number,
  updated_at: string
  lesson_id: number
  user_id: number
  created_at: string
}
export interface PopularLessonsResponce {
  popularLessons: Lesson[]
}

export interface AuthorResponce {
  id: number;
  email: string;
  userName: string;
}

export interface AuthorRequest {
  id: number;
}

export interface RecentLessonsResponce {
  recentLessons: Lesson[]
}

export interface CurrentLessonResponse {
  last_lession: {
    last_lession: LastLession,
    lesson: Lesson
  }
}

export interface LessonRequest {
  type: LessonType
}

export interface CurrentLessonRequest {
  id: number
}

