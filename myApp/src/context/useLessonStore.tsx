import { create } from 'zustand';
import { EditSheet, SheetCreate } from '../types/createlesson';
import { CreateSheet } from '../api/create_lesson/create_lesson';
import { EditSheetAPI } from '../api/create_lesson/edit_lesson';
import { DeleteSheetAPI } from '../api/create_lesson/delete_lesson';
import { Sheet } from '../types/lessonmainscreen';

export interface SheetDraft extends EditSheet {
    localId: string;
    serverId?: number;
    isSaving?: boolean;
}

interface CreateLessonStore {
    lessonId: number | null;
    currentIndex: number;
    sheets: SheetDraft[];
    setLessonId: (id: number) => void;
    setCurrentIndex: (index: number) => void;
    addSheet: () => void;
    updateSheetField: <K extends keyof SheetDraft>(field: K, value: SheetDraft[K]) => void;
    saveCurrentSheet: () => Promise<void>;
    deleteCurrentSheet: () => Promise<void>;
    clearStore: () => void;
    setSheetsFromBackend: (backendSheets: Sheet[]) => void;
}

export const useLessonStore = create<CreateLessonStore>((set, get) => ({
    lessonId: null,
    currentIndex: 0,
    sheets: [{
        localId: Date.now().toString(),
        sheetType: 'THEORY',
        sheet_header: '',
        content: '',
        isSaving: false
    }],

    setLessonId: (id) => set({ lessonId: id }),
    setCurrentIndex: (index) => set({ currentIndex: index }),

    addSheet: () => set((state) => ({
        sheets: [...state.sheets, {
            localId: Date.now().toString(),
            sheetType: 'THEORY',
            sheet_header: '',
            content: '',
            isSaving: false
        }],
        currentIndex: state.sheets.length
    })),
    clearStore: () => set({
        lessonId: null,
        currentIndex: 0,
        sheets: [{
            localId: Date.now().toString(),
            sheetType: 'THEORY',
            sheet_header: '',
            content: '',
            isSaving: false
        }]
    }),
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

        if (!state.lessonId) return console.log('Нет ID урока');

        state.updateSheetField('isSaving', true);

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
                state.updateSheetField('serverId', data.id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            state.updateSheetField('isSaving', false);
        }
    },
    deleteCurrentSheet: async () => {
        const state = get()
        const current = state.sheets[state.currentIndex]
        const deletedId = current.localId

        if (current.serverId) {
            try {
                state.updateSheetField('isSaving', true);
                await DeleteSheetAPI(current.serverId, state.lessonId!);
            } catch (error) {
                console.error("Не удалось удалить на сервере:", error);
                state.updateSheetField('isSaving', false);
                return;
            }
        }
        set((state) => {
            const indexToRemove = state.sheets.findIndex(s => s.localId === deletedId);
            if (indexToRemove === -1) return {};

            const newSheets = state.sheets.filter(s => s.localId !== deletedId);

            if (newSheets.length === 0) {
                return {
                    sheets: [{
                        localId: Date.now().toString(),
                        sheetType: 'THEORY',
                        sheet_header: '',
                        content: '',
                        isSaving: false
                    }],
                    currentIndex: 0
                }
            }

            const isLast = indexToRemove === newSheets.length;
            const nextIndex = isLast ? newSheets.length - 1 : indexToRemove;

            return {
                sheets: newSheets,
                currentIndex: nextIndex
            }
        })
    },
    setSheetsFromBackend: (backendSheets) => {
        const mappedSheets: SheetDraft[] = backendSheets.map(s => ({
            localId: Math.random().toString(36).substr(2, 9),
            serverId: s.id,
            sheet_header: s.sheet_header || '',
            content: s.content || '',
            sheetType: s.sheetType || 'THEORY',
            timeToRead: s.timeToRead || 0,
            description_for_video_or_picture: s.description_for_video_or_picture || '',
            video_url: s.video_url || '',
            picture_url: s.picture_url || '',
            question_text: s.question_text || '',
            quiz_options: s.quiz_options || [],
            content_danger: s.content_danger || '',
            content_advice: s.content_advice || '',
            isSaving: false
        }));

        set({
            sheets: mappedSheets.length > 0 ? mappedSheets : [{
                localId: Date.now().toString(),
                sheetType: 'THEORY',
                sheet_header: '',
                content: '',
                isSaving: false
            }],
            currentIndex: 0
        });
    },
}));