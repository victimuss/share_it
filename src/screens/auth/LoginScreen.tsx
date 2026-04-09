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
export const LoginScreen = () => {
    const {login}  = useAuth();
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
                Alert.alert('Ошибка', 'Заполните все поля');
                return;
            }

            if (!email.match(/^\S+@\S+\.\S+$/)) {
                Alert.alert('Ошибка', 'Неверный формат email. Пример: user@example.com');
                return;
            }
            await login(email, password);
                Alert.alert('Успех', 'Вы успешно вошли в систему!');
                console.log('Успешный вход:', email);
                navigation.navigate('Home');
        } catch (err: any) {
            setError('Ошибка входа. Проверьте свои данные и попробуйте снова.');
            Alert.alert('Ошибка входа', err?.message || 'Не удалось войти.');
            console.log('Ошибка входа:', err);
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
                <Pressable style={({ pressed }) => pressed ? [authStyles.button, authStyles.buttonPressed] : authStyles.button} onPress={handleLogin}>
                    <Text style={authStyles.buttonText}>Войти</Text>
                </Pressable>
                <Pressable style={authStyles.secondaryButton}>
                    <Text style={authStyles.secondaryButtonText}>Забыли пароль?</Text>
                </Pressable>
                <Pressable style={authStyles.secondaryButton}
                    onPress={() => navigation.navigate('Register')}>
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