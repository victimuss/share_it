import { create } from 'zustand';
import { EditSheet, SheetCreate } from '../types/createlesson';
import { CreateSheet } from '../api/create_lesson/create_lesson';
import { EditSheetAPI } from '../api/create_lesson/edit_lesson';
import { DeleteSheetAPI } from '../api/create_lesson/delete_lesson';

export interface SheetDraft extends EditSheet {
    localId: string;
    serverId?: number;
    isSaving?: boolean;
}

interface LessonStore {
    lessonId: number | null;
    currentIndex: number;
    sheets: SheetDraft[];
    setLessonId: (id: number) => void;
    setCurrentIndex: (index: number) => void;
    addSheet: () => void;
    updateSheetField: <K extends keyof EditSheet>(field: K, value: EditSheet[K]) => void;
    saveCurrentSheet: () => Promise<void>;
}

export const useLessonStore = create<LessonStore>((set, get) => ({
    lessonId: null,
    currentIndex: 0,
    sheets: [{
        localId: Date.now().toString(),
        sheetType: 'Theory',
        sheet_header: '',
        content: '',
        isSaving: false
    }],

    setLessonId: (id) => set({ lessonId: id }),
    setCurrentIndex: (index) => set({ currentIndex: index }),

    addSheet: () => set((state) => ({
        sheets: [...state.sheets, {
            localId: Date.now().toString(),
            sheetType: 'Theory',
            sheet_header: '',
            content: '',
            isSaving: false
        }],
        currentIndex: state.sheets.length
    })),

    updateSheetField: (field, value) => set((state) => {
        const newSheets = [...state.sheets];
        newSheets[state.currentIndex] = {
            ...newSheets[state.currentIndex],
            [field]: value
        };
        return { sheets: newSheets };
    }),

    saveCurrentSheet: async () => {
        const state = get();
        const current = state.sheets[state.currentIndex];

        if (!state.lessonId) return;

        state.updateSheetField('isSaving' as any, true);

        try {
            if (current.serverId) {
                const editPayload: EditSheet = {
                    sheet_header: current.sheet_header,
                    content: current.content,
                    timeToRead: current.timeToRead,
                    sheetType: current.sheetType,
                    description_for_video_or_picture: current.description_for_video_or_picture,
                    video_url: current.video_url,
                    picture_url: current.picture_url,
                    question_text: current.question_text,
                    quiz_options: current.quiz_options,
                    content_danger: current.content_danger,
                    content_advice: current.content_advice,
                };

                await EditSheetAPI(editPayload, current.serverId);
            } else {
                const createPayload: SheetCreate = {
                    sheet_header: current.sheet_header || '',
                    content: current.content || '',
                    timeToRead: current.timeToRead || 0,
                    sheetType: current.sheetType || 'Theory',
                    description_for_video_or_picture: current.description_for_video_or_picture || '',
                    video_url: current.video_url || '',
                    picture_url: current.picture_url || '',
                    question_text: current.question_text || '',
                    quiz_options: current.quiz_options || [],
                    content_danger: current.content_danger || '',
                    content_advice: current.content_advice || '',
                };

                const data = await CreateSheet(createPayload, state.lessonId);
                state.updateSheetField('serverId' as any, data.id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            state.updateSheetField('isSaving' as any, false);
        }
    },
    deleteCurrentSheet: async () => {
        const state = get()
        const current = state.sheets[state.currentIndex]
        if (current.serverId) {
            try {
                state.updateSheetField('isSaving' as any, true);
                await DeleteSheetAPI(current.serverId);
            } catch (error) {
                console.error("Не удалось удалить на сервере:", error);
                state.updateSheetField('isSaving' as any, false);
                return;
            }
        }
        set((state) => {
            const newSheets = state.sheets.filter((_, index) => index !== state.currentIndex);
            if (newSheets.length === 0) {
                return {
                    sheets: [{
                        localId: Date.now().toString(),
                        sheetType: 'Theory',
                        sheet_header: '',
                        content: '',
                        isSaving: false
                    }],
                    currentIndex: 0
                }
            }
            const isLast = state.currentIndex === newSheets.length
            const nextIndex = isLast ? newSheets.length - 1 : state.currentIndex
            return {
                sheets: newSheets,
                currentIndex: nextIndex
            }
        })
    }
}));