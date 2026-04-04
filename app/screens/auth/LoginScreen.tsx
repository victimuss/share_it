import React, { useState } from 'react';
import { View, TextInput, Button, Text, SafeAreaView, ScrollView } from 'react-native';
import { Login } from '../../api/auth';
import { Alert } from 'react-native';
import { saveToken } from '../../utils/storage';
import { authStyles } from '../../styles/AuthStyles';
import { TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        try {
            if (!email || !password) {
                Alert.alert('Ошибка', 'Заполните все поля');
                return;
            }

            if (!email.match(/^\S+@\S+\.\S+$/)) {
                Alert.alert('Ошибка', 'Неверный формат email. Пример: user@example.com');
                return;
            }
            const response = await Login({ username: email, password });
            await saveToken(response.access_token, response.refresh_token || '');
            // Навигация на главный экран или другой экран после успешного входа
        } catch (err: any) {
            setError('Ошибка входа. Проверьте свои данные и попробуйте снова.');
            Alert.alert('Ошибка входа', err?.message || 'Не удалось войти.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <SafeAreaView style={authStyles.container}>
            <ScrollView contentContainerStyle={authStyles.scrollContainer}>
                <Text style={authStyles.title}>Вход</Text>
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
                <Pressable style={({pressed}) => pressed ? [authStyles.button, authStyles.buttonPressed] : authStyles.button} onPress={handleLogin}>
                    <Text style={authStyles.buttonText}>Войти</Text>
                </Pressable>
                <Pressable style={authStyles.secondaryButton}>
                    <Text style={authStyles.secondaryButtonText}>Забыли пароль?</Text>
                </Pressable>
                <Pressable style={authStyles.secondaryButton}>
                    <Text style={authStyles.secondaryButtonText}>Нет аккаунта? Зарегистрироваться</Text>
                </Pressable>
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