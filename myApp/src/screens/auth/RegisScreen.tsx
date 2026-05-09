import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, Linking } from 'react-native';
import { Regis } from '../../api/auth/auth';
import { Alert } from 'react-native';
import { saveToken } from '../../utils/storage';
import { authStyles } from '../../styles/AuthStyles';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RegisResponse } from '../../types/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '@/src/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

export const RegisScreen = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;
    const navigation = useNavigation<NavigationProp>();
    const handleRegis = async () => {
        try {
            if (!email || !password || !name) {
                Alert.alert(t('screens.register.errors.emptyFieldsTitle'), t('screens.register.errors.emptyFieldsMsg'));
                return;
            }

            if (!email.match(/^\S+@\S+\.\S+$/)) {
                Alert.alert(t('screens.register.errors.invalidEmailTitle'), t('screens.register.errors.invalidEmailMsg'));
                return;
            }
            setLoading(true);
            await Regis({ user_name: name, email, password: password });
            Alert.alert(t('screens.register.alerts.successTitle'), t('screens.register.alerts.successMsg'));
            // Навигация на главный экран или другой экран после успешной регистрации
            navigation.navigate('Login', { email: email });
        } catch (err: any) {
            setError(t('screens.register.errors.regisFailedStr'));
            console.error('Ошибка регистрации:', err);
            Alert.alert(t('screens.register.errors.regisFailedTitle'), err?.message || t('screens.register.errors.regisFailedMsg'));
        } finally {
            setLoading(false);
        }
    }
    const openPrivacyPolicy = async () => {
        const url = 'https://spark-edu.ru/privacy';
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`${t('screens.register.errors.linkFailed')}${url}`);
        }
    };
    return (
        <SafeAreaView style={authStyles.container}>
            <ScrollView contentContainerStyle={authStyles.scrollContainer}>
                <View style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                    <LanguageSwitcher />
                </View>
                <Text style={authStyles.title}>{t('screens.register.title')}</Text>
                <TextInput
                    style={authStyles.input}
                    placeholder={t('screens.register.emailPlaceholder')}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={authStyles.input}
                    placeholder={t('screens.register.passwordPlaceholder')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={authStyles.input}
                    placeholder={t('screens.register.namePlaceholder')}
                    value={name}
                    onChangeText={setName}
                />

                <Pressable
                    disabled={loading}
                    style={({ pressed }) => [
                        authStyles.button,
                        pressed && authStyles.buttonPressed,
                        loading && authStyles.buttonDisabled
                    ]}
                    onPress={handleRegis}
                >
                    <Text style={authStyles.buttonText}>
                        {loading ? t('screens.register.loading') : t('screens.register.registerButton')}
                    </Text>
                </Pressable>
                <Pressable style={authStyles.secondaryButton}>
                    <Text style={authStyles.secondaryButtonText}
                        onPress={() => navigation.navigate('Login')}>
                        {t('screens.register.login')}</Text>
                </Pressable>
                <Text style={authStyles.legalText}>
                    {t('screens.register.legalText1')}
                    <Text style={authStyles.link} onPress={openPrivacyPolicy}>
                        {t('screens.register.legalText2')}
                    </Text>
                </Text>
                {error && (
                    <View style={authStyles.errorContainer}>
                        <Text style={authStyles.errorText}>{error}</Text>
                    </View>
                )}
                {loading && (
                    <View style={authStyles.loadingContainer}>
                        <Text style={authStyles.loadingText}>{t('screens.register.loading')}</Text>
                    </View>
                )}
            </ScrollView>

        </SafeAreaView>
    )
}
