import React from 'react';
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';
import { View, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { useOfflineStore } from '../context/useOfflineStore';
import { useStyles } from '../hooks/useStyles';
import { Theme } from '../styles/root';
import apiInstance from '../api/apiInstance';

interface CachedImageProps {
    sourceUri?: string | null;
    style?: ImageStyle | ImageStyle[];
    resizeMode?: ExpoImageProps['contentFit'];
    onLoad?: () => void;
    onError?: (e: any) => void;
    [key: string]: any;
}

export const CachedImage: React.FC<CachedImageProps> = ({
    sourceUri,
    style,
    resizeMode,
    onLoad,
    onError,
    ...props
}) => {
    const mediaCacheMap = useOfflineStore((state) => state.mediaCacheMap);
    const styles = useStyles(createStyles);

    if (!sourceUri) {
        return <View style={[style as ViewStyle, styles.placeholder]} />;
    }

    const localUri = mediaCacheMap[sourceUri];
    let finalUri = localUri || sourceUri;

    if (finalUri && !finalUri.startsWith('http') && !finalUri.startsWith('file') && !finalUri.startsWith('data:')) {
        const baseURL = apiInstance.defaults.baseURL;
        finalUri = `${baseURL}${finalUri.startsWith('/') ? '' : '/'}${finalUri}`;
    }

    console.log('[CachedImage] Rendering URI:', finalUri);

    return (
        <ExpoImage
            source={{ uri: finalUri }}
            style={style}
            contentFit={resizeMode ?? 'cover'}
            transition={300}
            onLoad={onLoad}
            onError={(e) => {
                console.warn('[CachedImage] Load error:', finalUri, e);
                onError?.(e);
            }}
            {...props}
        />
    );
};

const createStyles = (theme: Theme) => StyleSheet.create({
    placeholder: {
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
});