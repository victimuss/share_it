import React from 'react';
import { Image, ImageProps, View, StyleSheet, ViewStyle } from 'react-native';
import { useOfflineStore } from '../context/useOfflineStore';
import { useStyles } from '../hooks/useStyles';
import { COLORS, FONTS, RADIUS, SPACING, Theme } from '../styles/root';


interface CachedImageProps extends Omit<ImageProps, 'source'> {
    sourceUri?: string | null;
}

export const CachedImage: React.FC<CachedImageProps> = ({ sourceUri, style, ...props }) => {
    const mediaCacheMap = useOfflineStore((state) => state.mediaCacheMap);
    const styles = useStyles(createStyles);
    if (!sourceUri) {
        return <View style={[style, styles.placeholder]} />;
    }

    const localUri = mediaCacheMap[sourceUri];
    const finalUri = localUri ? localUri : sourceUri;

    return (
        <Image
            source={{ uri: finalUri }}
            style={style}
            {...props}
        />
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    placeholder: {
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
});