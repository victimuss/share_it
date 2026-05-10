import * as FileSystem from 'expo-file-system';
import { useOfflineStore } from '../context/useOfflineStore';


export class OfflineFileService {
    static readonly CACHE_FOLDER = `${FileSystem.documentDirectory}spark_offline_media/`;


    static async initFolder() {
        const dirInfo = await FileSystem.getInfoAsync(this.CACHE_FOLDER);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(this.CACHE_FOLDER, { intermediates: true });
        }
    }

    static async downloadAndCacheMedia(remoteUrl: string): Promise<string | null> {
        try {
            if (!remoteUrl) return null;

            const state = useOfflineStore.getState();
            if (state.mediaCacheMap[remoteUrl]) {
                return state.mediaCacheMap[remoteUrl];
            }

            await this.initFolder();

            const filename = remoteUrl.split('/').pop()?.split('?')[0] || `img_${Date.now()}.jpg`;
            const localUri = `${this.CACHE_FOLDER}${filename}`;

            const fileInfo = await FileSystem.getInfoAsync(localUri);
            if (fileInfo.exists) {
                state.addMediaMap(remoteUrl, localUri);
                return localUri;
            }


            const downloadResult = await FileSystem.downloadAsync(remoteUrl, localUri);

            if (downloadResult.status === 200) {
                state.addMediaMap(remoteUrl, downloadResult.uri);
                console.log(`✅ [Оффлайн] Сохранено: ${filename}`);
                return downloadResult.uri;
            }

            return null;
        } catch (error) {
            console.error(`❌ [Оффлайн] Ошибка загрузки ${remoteUrl}:`, error);
            return null;
        }
    }
    static async clearAllMedia() {
        try {
            const dirInfo = await FileSystem.getInfoAsync(this.CACHE_FOLDER);
            if (dirInfo.exists) {
                await FileSystem.deleteAsync(this.CACHE_FOLDER, { idempotent: true });
                console.log('🗑️ [Оффлайн] Физические файлы удалены');
            }
            useOfflineStore.getState().clearAllOfflineData();
        } catch (error) {
            console.error('Ошибка очистки медиа:', error);
        }
    }
}
