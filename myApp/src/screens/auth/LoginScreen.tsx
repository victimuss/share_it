import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { Login } from '../../api/auth/auth';
import { Alert } from 'react-native';
import { saveToken } from '../../utils/storage';
import { authStyles } from '../../styles/AuthStyles';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

export const LoginScreen = () => {
    const { t } = useTranslation();
    const { login } = useAuth();
    type LoginScreenRouteProp = RouteProp<AuthStackParamList, 'Login'>;
    const route = useRoute<LoginScreenRouteProp>();
    const emailFromRegis = route.params?.email;
    const [email, setEmail] = useState(emailFromRegis || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;
    const navigation = useNavigation<NavigationProp>();
    
    const handleLogin = async () => {
        try {
            if (!email || !password) {
                Alert.alert(t('screens.login.errors.emptyFieldsTitle'), t('screens.login.errors.emptyFieldsMsg'));
                return;
            }

            if (!email.match(/^\S+@\S+\.\S+$/)) {
                Alert.alert(t('screens.login.errors.invalidEmailTitle'), t('screens.login.errors.invalidEmailMsg'));
                return;
            }
            await login(email, password);
                Alert.alert(t('screens.login.alerts.successTitle'), t('screens.login.alerts.successMsg'));
                console.log('Успешный вход:', email);
        } catch (err: any) {
            setError(t('screens.login.errors.loginFailedStr'));
            Alert.alert(t('screens.login.errors.loginFailedTitle'), err?.message || t('screens.login.errors.loginFailedMsg'));
            console.log('Ошибка входа:', err);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <SafeAreaView style={authStyles.container}>
            <ScrollView contentContainerStyle={authStyles.scrollContainer}>
                <View style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                    <LanguageSwitcher />
                </View>
                <Text style={authStyles.title}>{t('screens.login.title')}</Text>
                <TextInput
                    style={authStyles.input}
                    placeholder={t('screens.login.emailPlaceholder')}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={authStyles.input}
                    placeholder={t('screens.login.passwordPlaceholder')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Pressable style={({ pressed }) => pressed ? [authStyles.button, authStyles.buttonPressed] : authStyles.button} onPress={handleLogin}>
                    <Text style={authStyles.buttonText}>{t('screens.login.loginButton')}</Text>
                </Pressable>
                <Pressable style={authStyles.secondaryButton}>
                    <Text style={authStyles.secondaryButtonText}>{t('screens.login.forgotPassword')}</Text>
                </Pressable>
                <Pressable style={authStyles.secondaryButton}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={authStyles.secondaryButtonText}>{t('screens.login.register')}</Text>
                </Pressable>
                {error && (
                    <View style={authStyles.errorContainer}>
                        <Text style={authStyles.errorText}>{error}</Text>
                    </View>
                )}
                {loading && (
                    <View style={authStyles.loadingContainer}>
                        <Text style={authStyles.loadingText}>{t('screens.login.loading')}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}