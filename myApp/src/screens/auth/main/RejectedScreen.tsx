import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SPACING, FONTS, RADIUS, Theme } from '@/src/styles/root';
import { useStyles } from '../../../hooks/useStyles';
import { useTranslation } from 'react-i18next';

interface RejectedScreenProps {
    reason?: string | null;
    onClose?: () => void;
}

export const RejectedScreen: React.FC<RejectedScreenProps> = ({
    reason,
    onClose
}) => {
    const styles = useStyles(createStyles);
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>❌</Text>
                </View>
                <Text style={styles.text}>{t('screens.rejected.title')}</Text>
                <Text style={styles.subtext}>{t('screens.rejected.subtitle')}</Text>

                <View style={styles.errorBox}>
                    <Text style={styles.errorTitle}>{t('screens.rejected.reasonTitle')}</Text>
                    <Text style={styles.errorText}>{reason || t('screens.rejected.defaultReason')}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable
                    style={styles.button}
                    onPress={onClose}
                >
                    <Text style={styles.buttonText}>{t('screens.rejected.button')}</Text>
                </Pressable>
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
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.errorLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    icon: {
        fontSize: 36,
    },
    text: {
        ...FONTS.h2,
        color: theme.colors.text,
        textAlign: 'center',
    },
    subtext: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
        marginTop: SPACING.xs,
        textAlign: 'center',
        lineHeight: 22,
    },
    errorBox: {
        marginTop: SPACING.xl,
        backgroundColor: theme.colors.errorLight,
        padding: SPACING.lg,
        borderRadius: RADIUS.md,
        width: '100%',
        borderColor: theme.colors.errorBorder,
        borderWidth: 1,
    },
    errorTitle: {
        ...FONTS.semibold,
        color: theme.colors.error,
        marginBottom: SPACING.xs,
    },
    errorText: {
        ...FONTS.regular,
        color: theme.colors.error,
        lineHeight: 20,
    },
    footer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    button: {
        backgroundColor: theme.colors.error,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        ...FONTS.semibold,
        color: '#FFFFFF',
        fontSize: 16,
    },
});
