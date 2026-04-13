export interface NewSkill {
    skill_name: string
    level: string
}

export interface SkillOut {
    skill: Skill[]
}

export interface Skill {
    id: number;
    skill_name: string;
    level: string;
}

export interface SkillRequest {
    user_id: number;
}

export interface EditSkill {
    user_id: number;
    skill_id: number;
    skill_name: string;
    level: number;
}
export interface UserLesson {
    id: number
    user_id: number
    lesson_id: number
    completed_steps: number
}

export interface Lesson {
    level: string
    description: string
    id: number
    rank_count: number
    likes: number
    students_count: number
    created_at: string
    is_active: boolean
    lesson_name: string
    type: string
    rank: number
    author_id: number
    sheet_counts: number
    updated_at: string
}
export interface LearnedLessonsResponce {
    learnLessons: UserLesson[]
    lessons: Lesson[]
}

export interface MakedLessonsResponce {
    lessons: Lesson[]
}