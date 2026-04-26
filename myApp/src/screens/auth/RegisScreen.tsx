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
export const RegisScreen = () => {
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
                Alert.alert('Ошибка', 'Заполните все поля');
                return;
            }

            if (!email.match(/^\S+@\S+\.\S+$/)) {
                Alert.alert('Ошибка', 'Неверный формат email. Пример: user@example.com');
                return;
            }
            setLoading(true);
            await Regis({ user_name: name, email, hashed_password: password });
            Alert.alert('Успех', 'Вы успешно зарегистрировались!');
            // Навигация на главный экран или другой экран после успешной регистрации
            navigation.navigate('Login', { email: email });
        } catch (err: any) {
            setError('Ошибка регистрации. Проверьте свои данные и попробуйте снова.');
            console.error('Ошибка регистрации:', err);
            Alert.alert('Ошибка регистрации', err?.message || 'Не удалось зарегистрироваться.');
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
            Alert.alert(`Не удалось открыть ссылку: ${url}`);
        }
    };
    return (
        <SafeAreaView style={authStyles.container}>
            <ScrollView contentContainerStyle={authStyles.scrollContainer}>
                <Text style={authStyles.title}>Регистрация</Text>
                <TextInput
                    style={authStyles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={authStyles.input}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={authStyles.input}
                    placeholder="Имя"
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
                        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </Text>
                </Pressable>
                <Pressable style={authStyles.secondaryButton}>
                    <Text style={authStyles.secondaryButtonText}
                        onPress={() => navigation.navigate('Login')}>
                        Есть аккаунт? Войти</Text>
                </Pressable>
                <Text style={authStyles.legalText}>
                    Регистрируясь, вы соглашаетесь с{' '}
                    <Text style={authStyles.link} onPress={openPrivacyPolicy}>
                        Политикой конфиденциальности
                    </Text>
                </Text>
                {error && (
                    <View style={authStyles.errorContainer}>
                        <Text style={authStyles.errorText}>{error}</Text>
                    </View>
                )}
                {loading && (
                    <View style={authStyles.loadingContainer}>
                        <Text style={authStyles.loadingText}>Загрузка...</Text>
                    </View>
                )}
            </ScrollView>

        </SafeAreaView>
    )
}
