import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVAdapter } from './mmkvStorage';

interface OfflineStore {
    savedLessons: Record<string, any>;
    mediaCacheMap: Record<string, string>;
    downloadingLessonsIds: string[];

    saveLesson: (lessonId: string, lessonData: any) => void;
    addMediaMap: (remoteUrl: string, localUri: string) => void;
    removeLesson: (lessonId: string) => void;
    setDownloading: (lessonId: string, isDownloading: boolean) => void;
    clearAllOfflineData: () => void;
}

export const useOfflineStore = create<OfflineStore>()(
    persist(
        (set) => ({
            savedLessons: {},
            mediaCacheMap: {},
            downloadingLessonsIds: [],

            saveLesson: (lessonId, lessonData) => {
                set((state) => ({
                    savedLessons: {
                        ...state.savedLessons,
                        [lessonId]: lessonData,
                    },
                }));
            },

            addMediaMap: (remoteUrl, localUri) => {
                set((state) => ({
                    mediaCacheMap: {
                        ...state.mediaCacheMap,
                        [remoteUrl]: localUri,
                    },
                }));
            },

            removeLesson: (lessonId) => {
                set((state) => {
                    const newLessons = { ...state.savedLessons };
                    delete newLessons[lessonId];
                    return { savedLessons: newLessons };
                });
            },

            setDownloading: (lessonId, isDownloading) => {
                set((state) => {
                    if (isDownloading) {
                        return {
                            downloadingLessonsIds: [...state.downloadingLessonsIds, lessonId],
                        };
                    } else {
                        return {
                            downloadingLessonsIds: state.downloadingLessonsIds.filter(
                                (id) => id !== lessonId
                            ),
                        };
                    }
                });
            },

            clearAllOfflineData: () => {
                set({ savedLessons: {}, mediaCacheMap: {}, downloadingLessonsIds: [] });
            }


        }), {
        name: 'spark-offline-storage',
        storage: createJSONStorage(() => zustandMMKVAdapter)
    }
    ))