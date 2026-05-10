import { create } from 'zustand';
import { GetSheetApi } from '../api/lessonmain/lessonmain';
import { QuizOptions } from '../types/createlesson';
import { fetchAndCacheFullLesson } from '../utils/LessonSyncService';
import { id } from 'ethers';
export interface Sheet {
    id: number;
    sheetType: string;
    sheet_header: string;
    content: string | null;
    description_for_video_or_picture: string | null;
    video_url: string | null;
    picture_url: string | null;
    question_text: string | null;
    quiz_options: QuizOptions[] | null;
    timeToRead: number | null;
    content_danger: string | null;
    content_advice: string | null;
}

interface LearnSheetStore {
    sheets: Sheet[];
    total: number;
    completed_steps: number;
    currentIndex: number;
    lesson_name: string;
    isLoading: boolean;
    error: string | null;
    setCurrentIndex: (index: number) => void;
    clearLesson: () => void;
    loadLesson: (lessonId: number) => Promise<void>;
}
export const useSheetStore = create<LearnSheetStore>((set) => ({
    sheets: [],
    total: 0,
    currentIndex: 0,
    completed_steps: 0,
    lesson_name: '',
    isLoading: false,
    error: null,

    setCurrentIndex: (index) => set({ currentIndex: index }),

    clearLesson: () => set({
        sheets: [],
        total: 0,
        currentIndex: 0,
        completed_steps: 0,
        lesson_name: '',
        isLoading: false,
        error: null,
    }),

    loadLesson: async (lessonId: number) => {
        set({ isLoading: true, error: null });
        try {
            const fullData = await fetchAndCacheFullLesson(lessonId)
            set({
                sheets: fullData.sheets.sheets,
                total: fullData.sheets.total,
                completed_steps: fullData.sheets.completed_steps,
                lesson_name: fullData.sheets.lesson_name,
                currentIndex: Math.min(fullData.sheets.completed_steps, fullData.sheets.total - 1 >= 0 ? fullData.sheets.total - 1 : 0),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Ошибка загрузки урока',
                isLoading: false,
            });
        }
    },

}));
