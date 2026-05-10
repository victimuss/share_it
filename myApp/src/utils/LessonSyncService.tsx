import { GetLessonByIdAPI, GetSheetApi } from '@/src/api/lessonmain/lessonmain';
import { useOfflineStore } from '../context/useOfflineStore';
import { PersonalLessonResponse, SheetResponse } from '../types/lessonmainscreen';
import { OfflineFileService } from './OfflineFileService';

export interface OfflineFullLesson {
    metadata: PersonalLessonResponse;
    sheets: SheetResponse;
}

export const fetchAndCacheFullLesson = async (lesson_id: number): Promise<OfflineFullLesson> => {
    try {
        const [lessonData, sheetsData] = await Promise.all([
            GetLessonByIdAPI(lesson_id),
            GetSheetApi({ lesson_id })
        ]);

        const fullLesson: OfflineFullLesson = {
            metadata: lessonData,
            sheets: sheetsData,
        };

        useOfflineStore.getState().saveLesson(lesson_id.toString(), fullLesson);

        // Качаем все картинки из самих страниц (листов)
        if (sheetsData.sheets && Array.isArray(sheetsData.sheets)) {
            sheetsData.sheets.forEach((sheet: any) => {
                // Если у страницы есть прикрепленная картинка
                if (sheet.image_url) {
                    OfflineFileService.downloadAndCacheMedia(sheet.image_url);
                }

            });
        }

        return fullLesson;

    } catch (error) {
        console.log(`[Оффлайн] Сеть недоступна, ищем урок ${lesson_id} в MMKV...`);
        const cachedLesson = useOfflineStore.getState().savedLessons[lesson_id.toString()];

        if (cachedLesson) {
            return cachedLesson;
        }

        throw error;
    }
};