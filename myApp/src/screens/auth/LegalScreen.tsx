import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRIVACY_HTML, TERMS_HTML } from '../../constants/legalDocs';
import { useThemeStore } from '../../context/useThemeStore';
import { SPACING } from '../../styles/root';
import { ArrowLeftIcon } from '../../SVG/MainPageSVG';

export const LegalScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { colors } = useThemeStore(s => s.theme);
    const type = route.params?.type;
    
    const htmlContent = type === 'privacy' ? PRIVACY_HTML : TERMS_HTML;
    const title = type === 'privacy' ? 'Конфиденциальность' : 'Условия использования';

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
            <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={{ color: colors.primary, fontSize: 16 }}>{'< Назад'}</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                <View style={{ width: 60 }} />
            </View>
            <WebView 
                source={{ html: htmlContent }} 
                style={{ flex: 1, backgroundColor: colors.background }} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        borderBottomWidth: 1,
    },
    backButton: {
        paddingVertical: SPACING.sm,
        width: 60,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    }
});
