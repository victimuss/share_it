import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme, SPACING, FONTS } from '@/src/styles/root';;
import { useStyles } from '../../../hooks/useStyles';
import { useThemeStore } from '../../../context/useThemeStore';

export const LoadScreen = () => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme);
  
    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.text}>Идёт загрузка</Text>
                <Text style={styles.subtext}>Подождите совсем немного</Text>
            </View>
        </SafeAreaView>
    );
};

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        // Фон как на главном экране (MainScreen)
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
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
