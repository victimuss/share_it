import { GetLessonByIdAPI, GetSheetApi } from "../api/lessonmain/lessonmain";
import { useOfflineStore } from "../context/useOfflineStore";
import { OfflineFileService } from "./OfflineFileService";

export const fetchAndCacheFullLesson = async (lessonId: number) => {
    try {
        console.log(`📡 [Sync] Начало синхронизации урока ${lessonId}`);
        
        // 1. Получаем инфо об уроке и его листы параллельно
        const [lessonInfo, sheetsResponse] = await Promise.all([
            GetLessonByIdAPI(lessonId),
            GetSheetApi({ lesson_id: lessonId })
        ]);

        const store = useOfflineStore.getState();

        // 2. Сохраняем метаданные в стор
        store.saveLesson(lessonId.toString(), {
            lesson: lessonInfo.lesson,
            sheets: sheetsResponse
        });

        // 3. Скачиваем медиа-файлы (картинки)
        if (sheetsResponse.sheets) {
            const downloadPromises = sheetsResponse.sheets.map(async (sheet) => {
                if (sheet.picture_url) {
                    await OfflineFileService.downloadAndCacheMedia(sheet.picture_url);
                }
            });
            await Promise.all(downloadPromises);
        }

        console.log(`✅ [Sync] Урок ${lessonId} полностью кэширован`);
        
        return {
            lesson: lessonInfo,
            sheets: sheetsResponse
        };
    } catch (error) {
        console.error(`❌ [Sync] Ошибка синхронизации урока ${lessonId}:`, error);
        throw error;
    }
};
