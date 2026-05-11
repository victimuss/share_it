import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, PermissionsAndroid } from 'react-native';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../hooks/useStyles';
import { useThemeStore } from '../../context/useThemeStore';
import { createAIVoiceStyles } from '../../styles/AIVoiceStyles';
import { useNavigation } from "@react-navigation/native";
import { CloseIcon } from '../../SVG/SearchSVG';
import { MicIcon } from '../../SVG/VoiceSVG';
import { Dropdown } from 'react-native-element-dropdown';
import { initWhisper, WhisperContext } from 'whisper.rn';

const difficultyData = (t: any, colors: any) => [
    { label: 'Beginner', value: 'Beginner', subtitle: t('screens.newLesson.diffBeginner'), icon: '🌱', bg: colors.successLight },
    { label: 'Intermediate', value: 'Intermediate', subtitle: t('screens.newLesson.diffIntermediate'), icon: '⚡', bg: colors.warningLight },
    { label: 'Advanced', value: 'Advanced', subtitle: t('screens.newLesson.diffAdvanced'), icon: '🔥', bg: colors.errorLight },
];

const typesData = [
    { label: 'Code', value: 'code', icon: '💻', },
    { label: 'Language', value: 'language', icon: '🗣️' },
    { label: 'Business', value: 'business', icon: '📊' },
    { label: 'Design', value: 'design', icon: '🎨' },
];

export const VoiceInputScreen = () => {
    const navigation = useNavigation();
    const [isListening, setIsListening] = useState(false);
    const [text, setText] = useState('');
    const { t } = useTranslation();
    const styles = useStyles(createAIVoiceStyles);
    const [whisperContext, setWhisperContext] = useState<WhisperContext | null>(null);
    const sessionRef = useRef<any>(null);
    const isBusy = useRef(false); // Замок для предотвращения двойных вызовов
    const { colors } = useThemeStore(s => s.theme);
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [type, setType] = useState<string | null>(null);
    const [isFocusType, setIsFocusType] = useState(false);

    const diffData = difficultyData(t, colors);

    const renderDifficultyItem = (item: any) => {
        return (
            <View style={styles.dropdownOption}>
                <View style={[styles.optionDot, { backgroundColor: item.bg }]}>
                    <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                </View>
                <View>
                    <Text style={styles.optionTitle}>{item.label}</Text>
                    <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                </View>
            </View>
        );
    };

    const renderTypeItem = (item: any) => {
        return (
            <View style={styles.dropdownOption}>
                <View style={[styles.optionDot]}>
                    <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                </View>
                <View>
                    <Text style={styles.optionTitle}>{item.label}</Text>
                </View>
            </View>
        );
    };

    useEffect(() => {
        async function setup() {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
            }
            try {
                const context = await initWhisper({
                    filePath: require('../../../assets/images/models/ggml-tiny-q5_1.bin'),
                    useGpu: true,
                });
                setWhisperContext(context);
            } catch (e) {
                console.error(e);
            }
        }
        setup();
        return () => {
            if (whisperContext) whisperContext.release();
        };
    }, []);

    const startRecording = async () => {
        if (!whisperContext || isListening || isBusy.current) return;

        try {
            isBusy.current = true;
            setText('');

            // Используем старый метод, так как новый еще не завезли в твой билд
            const session = await (whisperContext as any).transcribeRealtime({
                language: 'auto',
                beamCount: 1,
                useGreedy: true,
                maxAudioCtx: 1500,
            });

            // Проверяем, как подписываться (через .on или .subscribe)
            if (session.onTranscribing) {
                session.onTranscribing((event: any) => {
                    if (event.transcription) setText(event.transcription);
                });
            } else if (session.subscribe) {
                session.subscribe((event: any) => {
                    if (event.data?.result) setText(event.data.result);
                });
            }

            sessionRef.current = session;

            // Если сессия требует явного старта
            if (typeof session.start === 'function') {
                await session.start();
            }

            setIsListening(true);
        } catch (e: any) {
            console.error('Start error:', e.message);
            sessionRef.current = null;
        } finally {
            isBusy.current = false;
        }
    };

    const stopRecording = async () => {
        if (!sessionRef.current || !isListening || isBusy.current) return;

        try {
            isBusy.current = true;
            await sessionRef.current.stop();
            sessionRef.current = null;
            setIsListening(false);
        } catch (e: any) {
            console.error('Stop error:', e.message);
        } finally {
            isBusy.current = false;
        }
    };

    const isButtonDisabled = text.trim().length === 0;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.backIconWrapper}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                            <CloseIcon color={colors.text} />
                        </Pressable>
                    </View>
                    <Text style={styles.headerTitle}>{t('screens.ai.voiceInput.title')}</Text>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                        <View style={styles.mainContent}>
                            <View style={styles.instructionContainer}>
                                <Text style={styles.instructionText}>
                                    {t('screens.ai.voiceInput.prefix')}
                                    <Text style={styles.actionText} onPress={() => inputRef.current?.focus()}>
                                        {t('screens.ai.voiceInput.action')}
                                    </Text>
                                </Text>
                            </View>

                            <Pressable
                                onPressIn={startRecording}
                                onPressOut={stopRecording}
                            >
                                {({ pressed }) => (
                                    <MotiView
                                        animate={{
                                            scale: pressed ? 1.15 : 1,
                                            backgroundColor: pressed ? colors.primaryAlpha30 : colors.primaryAlpha20,
                                        }}
                                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                                        style={styles.micWrapper}
                                    >
                                        <MicIcon color={colors.primary} size={64} />
                                    </MotiView>
                                )}
                            </Pressable>

                            <View style={styles.selectorsRow}>
                                <View style={styles.selectorCell}>
                                    <Text style={styles.fieldLabel}>
                                        {t('screens.newLesson.difficultyLabel')}
                                    </Text>
                                    <Dropdown
                                        style={[
                                            styles.selector,
                                            isFocus && styles.selectorOpen
                                        ]}
                                        containerStyle={styles.dropdownList}
                                        itemTextStyle={styles.optionTitle}
                                        itemContainerStyle={styles.dropdownOption}
                                        data={diffData}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={t('screens.newLesson.difficultyLabel')}
                                        placeholderStyle={styles.selectorPlaceholder}
                                        selectedTextStyle={styles.selectorValue}
                                        activeColor={colors.primarySoft}
                                        value={difficulty}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={(item) => {
                                            setDifficulty(item.value);
                                            setIsFocus(false);
                                        }}
                                        renderItem={renderDifficultyItem}
                                        renderLeftIcon={() => {
                                            const selectedItem = diffData.find(d => d.value === difficulty);
                                            if (selectedItem) {
                                                return (
                                                    <View style={[styles.optionDot, { backgroundColor: selectedItem.bg, marginRight: 8, width: 28, height: 28 }]}>
                                                        <Text style={{ fontSize: 14 }}>{selectedItem.icon}</Text>
                                                    </View>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </View>
                                <View style={styles.selectorCell}>
                                    <Text style={styles.fieldLabel}>
                                        {t('screens.newLesson.categoryLabel')}
                                    </Text>
                                    <Dropdown
                                        style={[
                                            styles.selector,
                                            isFocusType && styles.selectorOpen
                                        ]}
                                        containerStyle={styles.dropdownList}
                                        itemTextStyle={styles.optionTitle}
                                        itemContainerStyle={styles.dropdownOption}
                                        data={typesData}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={t('screens.newLesson.typePlaceholder')}
                                        placeholderStyle={styles.selectorPlaceholder}
                                        selectedTextStyle={styles.selectorValue}
                                        activeColor={colors.primarySoft}
                                        value={type}
                                        onFocus={() => setIsFocusType(true)}
                                        onBlur={() => setIsFocusType(false)}
                                        onChange={(item) => {
                                            setType(item.value);
                                            setIsFocusType(false);
                                        }}
                                        renderItem={renderTypeItem}
                                        renderLeftIcon={() => {
                                            const selectedItemType = typesData.find(d => d.value === type);
                                            if (selectedItemType) {
                                                return (
                                                    <View style={[styles.optionDot, { marginRight: 8, width: 28, height: 28 }]}>
                                                        <Text style={{ fontSize: 14 }}>{selectedItemType.icon}</Text>
                                                    </View>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    ref={inputRef}
                                    style={[styles.input, isFocused && styles.inputFocused]}
                                    placeholder={t('screens.ai.voiceInput.placeholder')}
                                    placeholderTextColor={colors.textSecondary}
                                    value={text}
                                    onChangeText={setText}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    multiline
                                />
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.bottomBar}>
                        <Pressable
                            disabled={isButtonDisabled}
                            style={isButtonDisabled ? styles.saveButtonDisabled : styles.saveButton}
                            onPress={() => console.log("Final submission:", { text, difficulty, type })}
                        >
                            <Text style={styles.saveButtonText}>{t('screens.newLesson.continueBtn')}</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};