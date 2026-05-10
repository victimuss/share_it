import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme, SPACING, FONTS } from '@/src/styles/root';
import { useStyles } from '../../../hooks/useStyles';
import { useTranslation } from 'react-i18next';

export const ModeratingScreen = () => {
    const styles = useStyles(createStyles);
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <ActivityIndicator size="large" color={styles.loader.color} />
                <Text style={styles.text}>{t('screens.moderating.title')}</Text>
                <Text style={styles.subtext}>{t('screens.moderating.subtitle')}</Text>
            </View>
        </SafeAreaView>
    );
};

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    loader: {
        color: theme.colors.primary,
    },
    text: {
        ...FONTS.h2,
        color: theme.colors.text,
        marginTop: SPACING.xl,
        textAlign: 'center',
    },
    subtext: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
        marginTop: SPACING.xs,
        textAlign: 'center',
    }
});
