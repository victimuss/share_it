import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ViewStyle,
    TextStyle,
    Alert,
} from 'react-native';
import { zkpAuthStyles as styles } from '../../styles/CryptoAuthStypes';
import { COLORS, FONTS, RADIUS, SPACING } from '../../styles/root';
import { LockIcon, CheckmarkIcon, CopyIcon } from '../../SVG/CryptoAuthSVG';
import CryptoService from '../../utils/CryptoServices';
import { useAuth } from '@/src/context/AuthContext';
import * as Clipboard from 'expo-clipboard';
// ─── Типы ─────────────────────────────────────────────────────────
type Tab = 'register' | 'login';

// ─── Вспомогательная функция генерации мок-ключа ─────────────────
async function generateMockKey(): Promise<{
    mnemonic: string,
    pubkey: string
}> {
    const { mnemonic, publicKey } = await CryptoService.generateAndSaveIdentity();
    return { mnemonic, publicKey }
}


// ─── Компонент ────────────────────────────────────────────────────
export default function ZkpAuthScreen() {
    const [activeTab, setActiveTab] = useState<Tab>('register');
    const [generatedKey, setGeneratedKey] = useState<string>('');
    const [inputKey, setInputKey] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const { loginWithCrypto } = useAuth()


    const handleGenerate = async () => {
        const { mnemonic } = await generateMockKey();
        setGeneratedKey(mnemonic);
        setCopied(false);
    };
    async function getPublicKey() {
        const publicKey = await CryptoService.getPublicKey();
        setInputKey(publicKey ?? '');
        return publicKey
    }
    const handleCopy = () => {
        Clipboard.setStringAsync(generatedKey)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLogin = async () => {
        try {
            await CryptoService.restoreFromMnemonic(inputKey);
            await loginWithCrypto();
        } catch (error) {
            Alert.alert("Ошибка", "Не удалось войти. Проверьте правильность seed-фразы.");
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

                {/* ── Hero ──────────────────────────────────────────────── */}
                <View style={styles.heroSection}>
                    <View style={styles.logoOuter}>
                        <View style={styles.logoInner}>
                            {/* иконка замка */}
                            <View style={styles.logoIconWrapper}>
                                <LockIcon />
                            </View>
                        </View>
                    </View>

                    <Text style={styles.heroTitle}>Spark Education</Text>
                    <Text style={styles.heroSubtitle}>
                        Вход без пароля — твой ключ хранится только у тебя
                    </Text>
                </View>

                {/* ── ZKP-пояснение ─────────────────────────────────────── */}
                <View style={styles.zkpCard}>
                    <Text style={styles.zkpCardTitle}>Что такое ZKP-вход?</Text>

                    <View style={styles.zkpCardRow}>
                        {/* иконка галочки */}
                        <View style={styles.zkpCardIconWrapper}>
                            <CheckmarkIcon />
                        </View>
                        <Text style={styles.zkpCardText}>
                            Твой ключ не передаётся на сервер — только математическое доказательство
                        </Text>
                    </View>

                    <View style={styles.zkpCardRow}>
                        <View style={styles.zkpCardIconWrapper}>
                            <CheckmarkIcon />
                        </View>
                        <Text style={styles.zkpCardText}>
                            Никаких паролей и email — полная анонимность
                        </Text>
                    </View>

                    <View style={[styles.zkpCardRow, styles.zkpCardRowLast]}>
                        <View style={styles.zkpCardIconWrapper}>
                            <CheckmarkIcon />
                        </View>
                        <Text style={styles.zkpCardText}>
                            Сохрани ключ — восстановить его нельзя
                        </Text>
                    </View>
                </View>

                {/* ── Таб-переключатель ─────────────────────────────────── */}
                <View style={styles.tabsWrapper}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'register' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('register')}
                        activeOpacity={0.85}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 'register' && styles.tabButtonTextActive]}>
                            Первый раз
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'login' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('login')}
                        activeOpacity={0.85}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 'login' && styles.tabButtonTextActive]}>
                            Войти
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ── Вкладка «Первый раз» ──────────────────────────────── */}
                {activeTab === 'register' && (
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionCardTitle}>Сгенерировать ключ</Text>
                        <Text style={styles.sectionCardSubtitle}>
                            Мы создадим уникальный криптографический ключ — это твой аккаунт
                        </Text>

                        <TouchableOpacity
                            style={styles.generateButton}
                            onPress={handleGenerate}
                            activeOpacity={0.85}
                        >
                            {/* иконка щита — замени на <Ionicons name="shield-checkmark" /> */}
                            <View style={styles.generateButtonIconWrapper} />
                            <Text style={styles.generateButtonText}>
                                {generatedKey ? 'Сгенерировать другой' : 'Сгенерировать ключ'}
                            </Text>
                        </TouchableOpacity>

                        {/* Сгенерированный ключ */}
                        {generatedKey !== '' && (
                            <>
                                <View style={styles.keyDisplayBlock}>
                                    <View style={styles.keyDisplayHeader}>
                                        <Text style={styles.keyDisplayLabel}>PRIVATE KEY</Text>
                                        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                                            {/* иконка копирования */}
                                            <View style={styles.copyIconWrapper}>
                                                <CopyIcon />
                                            </View>
                                            <Text style={styles.copyButtonText}>
                                                {copied ? 'Скопировано ✓' : 'Копировать'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.keyText} selectable>
                                        {generatedKey}
                                    </Text>
                                </View>

                                {/* Предупреждение */}
                                <View style={styles.keyWarning}>
                                    {/* иконка треугольника — замени на <Ionicons name="warning-outline" /> */}
                                    <View style={styles.keyWarningIconWrapper} />
                                    <Text style={styles.keyWarningText}>
                                        Сохрани ключ в безопасное место. Мы не можем восстановить его —
                                        если потеряешь, потеряешь доступ к аккаунту.
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={[styles.generateButton, { marginTop: SPACING.md }]}
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        loginWithCrypto()
                                    }}
                                >
                                    {/* иконка входа — замени на <Ionicons name="log-in-outline" /> */}
                                    <View style={styles.generateButtonIconWrapper} />
                                    <Text style={styles.generateButtonText}>Войти с этим ключом</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}

                {/* ── Вкладка «Войти» ───────────────────────────────────── */}
                {activeTab === 'login' && (
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionCardTitle}>Введи свой ключ</Text>
                        <Text style={styles.sectionCardSubtitle}>
                            Вставь сохранённый приватный ключ для входа в аккаунт
                        </Text>

                        <TextInput
                            style={[styles.keyInput, inputKey.length > 0 && styles.keyInputFocused]}
                            placeholder="mnemonic passphrase"
                            placeholderTextColor={COLORS.textLight}
                            value={inputKey}
                            onChangeText={setInputKey}
                            multiline
                            numberOfLines={3}
                            autoCapitalize="none"
                            autoCorrect={false}
                            spellCheck={false}
                        />

                        <View style={styles.loginRow}>
                            <TouchableOpacity
                                style={styles.pasteButton}
                                activeOpacity={0.85}
                                onPress={() => getPublicKey()}
                            >
                                {/* иконка вставки — замени на <Ionicons name="clipboard-outline" /> */}
                                <View style={styles.pasteIconWrapper}
                                >
                                    <CopyIcon></CopyIcon>
                                </View>
                                <Text style={styles.pasteButtonText}>Вставить</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.loginButton,
                                    inputKey.length < 10 && styles.loginButtonDisabled,
                                ]}
                                disabled={inputKey.length < 10}
                                activeOpacity={0.85}
                                onPress={handleLogin}
                            >
                                <Text style={styles.loginButtonText}>Войти</Text>
                                {/* иконка стрелки — замени на <Ionicons name="arrow-forward" /> */}
                                <View style={styles.loginButtonIconWrapper} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* ── Подвал ────────────────────────────────────────────── */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Защищено протоколом{' '}
                        <Text style={styles.footerAccent}>Zero-Knowledge Proof</Text>
                        {'\n'}Сервер никогда не видит твой ключ
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
