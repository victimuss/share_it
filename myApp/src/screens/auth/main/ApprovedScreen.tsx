import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme, SPACING, FONTS, RADIUS } from '@/src/styles/root';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from '../../../hooks/useStyles';
import { useTranslation } from 'react-i18next';

export const ApprovedScreen = () => {
    const styles = useStyles(createStyles);
    const navigation = useNavigation<any>();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>⏳</Text>
                </View>
                <Text style={styles.text}>{t('screens.approved.title')}</Text>
                <Text style={styles.subtext}>{t('screens.approved.subtitle')}</Text>
            </View>
            <View style={styles.footer}>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('MainTabs')}
                >
                    <Text style={styles.buttonText}>{t('screens.approved.button')}</Text>
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
        backgroundColor: theme.colors.successLight,
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
        marginTop: SPACING.md,
        textAlign: 'center',
        lineHeight: 22,
    },
    footer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        ...FONTS.semibold,
        color: '#FFFFFF',
        fontSize: 16,
    }
});
