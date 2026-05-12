import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ViewStyle,
    TextStyle,
    Alert,
    Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zkpAuthStyles as zkpAuthStylesFn } from '../../styles/CryptoAuthStypes';
import { MotiView } from 'moti';
import { Dimensions } from 'react-native';
import { FONTS, RADIUS, SPACING } from '../../styles/root';
import { LockIcon, CheckmarkIcon, CopyIcon } from '../../SVG/CryptoAuthSVG';
import CryptoService from '../../utils/CryptoServices';
import { useAuth } from '@/src/context/AuthContext';
import * as Clipboard from 'expo-clipboard';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../hooks/useStyles';
import { useThemeStore } from '../../context/useThemeStore';
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


const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Компонент ────────────────────────────────────────────────────
export default function ZkpAuthScreen() {
  const styles = useStyles(zkpAuthStylesFn);
  const { colors } = useThemeStore(s => s.theme);
    const [activeTab, setActiveTab] = useState<Tab>('register');
    const [generatedKey, setGeneratedKey] = useState<string>('');
    const [inputKey, setInputKey] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const { loginWithCrypto } = useAuth()
    const { t } = useTranslation();


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
            Alert.alert(t('screens.cryptoAuth.errorTitle'), t('screens.cryptoAuth.errorMsg'));
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                <LanguageSwitcher />
            </View>
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
                                <LockIcon color={colors.surface} />
                            </View>
                        </View>
                    </View>

                    <Text style={styles.heroTitle}>{t('screens.cryptoAuth.heroTitle')}</Text>
                    <Text style={styles.heroSubtitle}>
                        {t('screens.cryptoAuth.heroSubtitle')}
                    </Text>
                </View>

                {/* ── ZKP-пояснение ─────────────────────────────────────── */}
                <View style={styles.zkpCard}>
                    <Text style={styles.zkpCardTitle}>{t('screens.cryptoAuth.zkpTitle')}</Text>

                    <View style={styles.zkpCardRow}>
                        {/* иконка галочки */}
                        <View style={styles.zkpCardIconWrapper}>
                            <CheckmarkIcon color={colors.primary} />
                        </View>
                        <Text style={styles.zkpCardText}>
                            {t('screens.cryptoAuth.zkp1')}
                        </Text>
                    </View>

                    <View style={styles.zkpCardRow}>
                        <View style={styles.zkpCardIconWrapper}>
                            <CheckmarkIcon color={colors.primary} />
                        </View>
                        <Text style={styles.zkpCardText}>
                            {t('screens.cryptoAuth.zkp2')}
                        </Text>
                    </View>

                    <View style={[styles.zkpCardRow, styles.zkpCardRowLast]}>
                        <View style={styles.zkpCardIconWrapper}>
                            <CheckmarkIcon color={colors.primary} />
                        </View>
                        <Text style={styles.zkpCardText}>
                            {t('screens.cryptoAuth.zkp3')}
                        </Text>
                    </View>
                </View>

                {/* ── Таб-переключатель ─────────────────────────────────── */}
                <View style={styles.tabsWrapper}>
                    <MotiView
                        animate={{
                            translateX: activeTab === 'register' ? 0 : (SCREEN_WIDTH - 2 * SPACING.lg - 2 * SPACING.xs) / 2,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 250,
                        }}
                        style={[styles.tabIndicator, { width: (SCREEN_WIDTH - 2 * SPACING.lg - 2 * SPACING.xs) / 2 }]}
                    />
                    <TouchableOpacity
                        style={[styles.tabButton]}
                        onPress={() => setActiveTab('register')}
                        activeOpacity={0.85}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 'register' && styles.tabButtonTextActive]}>
                            {t('screens.cryptoAuth.tabRegister')}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton]}
                        onPress={() => setActiveTab('login')}
                        activeOpacity={0.85}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 'login' && styles.tabButtonTextActive]}>
                            {t('screens.cryptoAuth.tabLogin')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ── Вкладка «Первый раз» ──────────────────────────────── */}
                {activeTab === 'register' && (
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionCardTitle}>{t('screens.cryptoAuth.genTitle')}</Text>
                        <Text style={styles.sectionCardSubtitle}>
                            {t('screens.cryptoAuth.genSubtitle')}
                        </Text>

                        <Pressable
                            onPress={handleGenerate}
                        >
                            {({ pressed }) => (
                                <MotiView
                                    animate={{
                                        scale: pressed ? 0.96 : 1,
                                        opacity: pressed ? 0.85 : 1,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        damping: 10,
                                        stiffness: 200,
                                    }}
                                    style={styles.generateButton}
                                >
                                    <View style={styles.generateButtonIconWrapper} />
                                    <Text style={styles.generateButtonText}>
                                        {generatedKey ? t('screens.cryptoAuth.genBtnAgain') : t('screens.cryptoAuth.genBtn')}
                                    </Text>
                                </MotiView>
                            )}
                        </Pressable>

                        {/* Сгенерированный ключ */}
                        {generatedKey !== '' && (
                            <>
                                <View style={styles.keyDisplayBlock}>
                                    <View style={styles.keyDisplayHeader}>
                                        <Text style={styles.keyDisplayLabel}>PRIVATE KEY</Text>
                                        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                                            {/* иконка копирования */}
                                            <View style={styles.copyIconWrapper}>
                                                <CopyIcon color={colors.primaryLight} />
                                            </View>
                                            <Text style={styles.copyButtonText}>
                                                {copied ? t('screens.cryptoAuth.copiedBtn') : t('screens.cryptoAuth.copyBtn')}
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
                                        {t('screens.cryptoAuth.warning')}
                                    </Text>
                                </View>

                                <Pressable
                                    onPress={() => {
                                        loginWithCrypto()
                                    }}
                                >
                                    {({ pressed }) => (
                                        <MotiView
                                            animate={{
                                                scale: pressed ? 0.96 : 1,
                                                opacity: pressed ? 0.85 : 1,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                damping: 10,
                                                stiffness: 200,
                                            }}
                                            style={[styles.generateButton, { marginTop: SPACING.md }]}
                                        >
                                            <View style={styles.generateButtonIconWrapper} />
                                            <Text style={styles.generateButtonText}>{t('screens.cryptoAuth.loginWithKey')}</Text>
                                        </MotiView>
                                    )}
                                </Pressable>
                            </>
                        )}
                    </View>
                )}

                {/* ── Вкладка «Войти» ───────────────────────────────────── */}
                {activeTab === 'login' && (
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionCardTitle}>{t('screens.cryptoAuth.enterKeyTitle')}</Text>
                        <Text style={styles.sectionCardSubtitle}>
                            {t('screens.cryptoAuth.enterKeySubtitle')}
                        </Text>

                        <TextInput
                            style={[styles.keyInput, inputKey.length > 0 && styles.keyInputFocused]}
                            placeholder="mnemonic passphrase"
                            placeholderTextColor={colors.textLight}
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
                                onPress={async () => {
                                    getPublicKey();
                                    setInputKey(await Clipboard.getStringAsync());
                                }
                                }
                            >

                                <View style={styles.pasteIconWrapper}
                                >
                                    <CopyIcon color={colors.text}></CopyIcon>
                                </View>
                                <Text style={styles.pasteButtonText}>{t('screens.cryptoAuth.paste')}</Text>
                            </TouchableOpacity>

                            <Pressable
                                style={{ flex: 1 }}
                                disabled={inputKey.length < 10}
                                onPress={handleLogin}
                            >
                                {({ pressed }) => (
                                    <MotiView
                                        animate={{
                                            scale: pressed ? 0.96 : 1,
                                            opacity: pressed ? 0.85 : 1,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            damping: 10,
                                            stiffness: 200,
                                        }}
                                        style={[
                                            styles.loginButton,
                                            inputKey.length < 10 && styles.loginButtonDisabled,
                                        ]}
                                    >
                                        <Text style={styles.loginButtonText}>{t('screens.cryptoAuth.loginBtn')}</Text>
                                        <View style={styles.loginButtonIconWrapper} />
                                    </MotiView>
                                )}
                            </Pressable>
                        </View>
                    </View>
                )}

                {/* ── Подвал ────────────────────────────────────────────── */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        {t('screens.cryptoAuth.footer')}
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
