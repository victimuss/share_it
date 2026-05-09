import { useEffect, useState } from "react";
import { createLessonStyles as styles } from "@/src/styles/NewLessonStyles";
import { CloseIcon } from "@/src/SVG/SearchSVG";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Pressable, TextInput, Modal } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from "@/src/styles/root";
import { AddTags, CreateLession } from "@/src/api/create_lesson/create_lesson";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "@/src/navigation/appNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLessonStore } from "@/src/context/useLessonStore";
import { useRoute, RouteProp } from "@react-navigation/native";
import { GetLessonByIdAPI, GetSheetApiForEdit } from "@/src/api/lessonmain/lessonmain";
import { EditLessonAPI } from "@/src/api/create_lesson/edit_lesson";
import { GetMyLessonForEditAPI } from "@/src/api/lessonmain/mylesson";
import { useTranslation } from "react-i18next";

const difficultyData = (t: any) => [
    { label: 'Beginner', value: 'Beginner', subtitle: t('screens.newLesson.diffBeginner'), icon: '🌱', bg: COLORS.successLight },
    { label: 'Intermediate', value: 'Intermediate', subtitle: t('screens.newLesson.diffIntermediate'), icon: '⚡', bg: COLORS.warningLight },
    { label: 'Advanced', value: 'Advanced', subtitle: t('screens.newLesson.diffAdvanced'), icon: '🔥', bg: COLORS.errorLight },
];

const typesData = [
    { label: 'Code', value: 'code', icon: '💻', },
    { label: 'Language', value: 'language', icon: '🗣️' },
    { label: 'Business', value: 'business', icon: '📊' },
    { label: 'Design', value: 'design', icon: '🎨' },
]

export const NewLessonScreen = () => {
    const { t } = useTranslation();
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [type, setType] = useState<string | null>(null);
    const [isFocusType, setIsFocusType] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { setLessonId } = useLessonStore();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<Record<string, { isEdit?: boolean, editLessonId?: number }>, string>>();
    const isEdit = route.params?.isEdit || false;
    const editLessonId = route.params?.editLessonId;
    const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
    const [tags, setTags] = useState<{ id: string, name: string }[]>([
    ]);
    const [tagInput, setTagInput] = useState('');

    const toggleTag = (id: string) => {
        setTags(prev => prev.filter(tag => tag.id !== id));
    };
    const addTag = () => {
        const text = tagInput.trim();
        if (!text || tags.length >= 5) return;
        if (tags.some(t => t.name.toLowerCase() === text.toLowerCase())) {
            setTagInput('')
            return;
        }
        setTags(prev => [...prev, { id: Date.now().toString(), name: text }]);
        setTagInput('');
    };

    const diffData = difficultyData(t);

    const renderDifficultyItem = (item: typeof diffData[0]) => {
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

    const renderTypeItem = (item: typeof typesData[0]) => {
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

    const fetchLesson = async () => {
        try {
            if (isEdit) {
                const LessonResponce = await EditLessonAPI({
                    lesson_name: title,
                    description: description,
                    level: difficulty || 'Beginner',
                    type: type || 'code',
                }, editLessonId || 0)
                setCurrentLessonId(LessonResponce.id)
                setLessonId(LessonResponce.id);
            } else {
                const LessonResponce = await CreateLession({
                    lesson_name: title,
                    description: description,
                    level: difficulty || 'Beginner',
                    type: type || 'code',
                })
                setCurrentLessonId(LessonResponce.id)
                setLessonId(LessonResponce.id);
            }
        } catch (error) {
            console.error(`Ошибка запроса урока:`, error);
        }
    }
    const fetchTags = async () => {
        try {
            const TagsResponce = await AddTags({
                lesson_id: currentLessonId || 0,
                tags: tags.map(tag => ({ tag: tag.name })),
            });
            console.log(TagsResponce);
        } catch (error) {
            console.error(`Ошибка запроса тегов:`, error);
        }
    }
    useEffect(() => {
        const loadLessonData = async () => {
            if (isEdit && editLessonId) {
                try {
                    const lessonData = await GetMyLessonForEditAPI(editLessonId);
                    setTitle(lessonData.lesson.lesson_name);
                    setDescription(lessonData.lesson.description);
                    setDifficulty(lessonData.lesson.level);
                    setType(lessonData.lesson.type);
                    setCurrentLessonId(editLessonId);
                    setLessonId(editLessonId);
                } catch (error) {
                    console.error("Ошибка загрузки данных урока:", error);
                }
            } else {
                setTitle('');
                setDescription('');
                setDifficulty(null);
                setType(null);
                setCurrentLessonId(null);
            }
        };

        loadLessonData();
    }, [isEdit, editLessonId]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.backIconWrapper}>
                        <Pressable style={styles.backButton}>
                            <CloseIcon />
                        </Pressable>
                    </View>
                    <Text style={styles.headerTitle}>{isEdit ? t('screens.newLesson.editTitle') : t('screens.newLesson.createTitle')}</Text>
                </View>
            </View>
            <ScrollView style={styles.formContainer}>
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
                            data={diffData}
                            labelField="label"
                            valueField="value"
                            placeholder={t('screens.newLesson.difficultyLabel')}
                            placeholderStyle={styles.selectorPlaceholder}
                            selectedTextStyle={styles.selectorValue}
                            activeColor="#EEF2FF"
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
                            data={typesData}
                            labelField="label"
                            valueField="value"
                            placeholder={t('screens.newLesson.typePlaceholder')}
                            placeholderStyle={styles.selectorPlaceholder}
                            selectedTextStyle={styles.selectorValue}
                            activeColor="#EEF2FF"
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
                                        <View style={styles.optionDot}>
                                            <Text style={{ fontSize: 14 }}>{selectedItemType.icon}</Text>
                                        </View>
                                    );
                                }
                                return null;
                            }}
                        />
                    </View>
                </View>
                <View style={styles.fieldGroup}>
                    <View style={styles.fieldHeader}>
                        <Text style={styles.fieldLabel}>
                            {t('screens.newLesson.nameLabel')}
                        </Text>
                        <Text style={title.length > 200 ? styles.charCountLimit : title.length > 150 ? styles.charCountWarn : styles.charCount}>
                            {title.length}/255
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder={t('screens.newLesson.namePlaceholder')}
                        placeholderTextColor={COLORS.textSecondary}
                        value={title}
                        onChangeText={setTitle}
                        maxLength={255}
                    />
                </View>
                <View style={styles.fieldGroup}>
                    <View style={styles.fieldHeader}>
                        <Text style={styles.fieldLabel}>
                            {t('screens.newLesson.descLabel')}
                        </Text>
                        <Text style={description.length > 200 ? styles.charCountLimit : description.length > 150 ? styles.charCountWarn : styles.charCount}>
                            {description.length}/255
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder={t('screens.newLesson.descPlaceholder')}
                        placeholderTextColor={COLORS.textSecondary}
                        value={description}
                        onChangeText={setDescription}
                        maxLength={255}
                    />
                </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <Pressable
                    disabled={!difficulty || !type || !title || !description}
                    style={!difficulty || !type || !title || !description ? styles.saveButtonDisabled : styles.saveButton}
                    onPress={() => {
                        if (isEdit) {
                            fetchLesson()
                            navigation.navigate('NewSheetScreen', { lessonId: currentLessonId, isEdit: true });
                        } else {
                            setIsModalVisible(true);
                            fetchLesson();
                        }
                    }}
                >
                    <Text style={styles.saveButtonText}>{t('screens.newLesson.saveContinueBtn')}</Text>
                </Pressable>
            </View>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent
            >
                <View style={styles.overlay}>
                    <View style={styles.handle} />
                    <View style={styles.tagsSheet}>
                        <View style={styles.tagsHeader}>
                            <Text style={styles.tagsHeaderTitle}>{t('screens.newLesson.tagsTitle')}</Text>
                            <View style={styles.closeIconWrapper}>
                                <Pressable style={styles.closeButton}
                                    onPress={() => setIsModalVisible(false)}>
                                    <CloseIcon />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.tagsBody}>
                            <View style={styles.tagsHint}>
                                <View style={styles.hintIconWrapper}>
                                    <Text>💡</Text>
                                </View>
                                <Text style={styles.tagsHintText}>{t('screens.newLesson.tagsHint')}</Text>
                            </View>
                            <View style={styles.tagsCounter}>
                                <Text style={styles.tagsCounterText}>{t('screens.newLesson.tagsCount', { count: tags.length })}</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder={t('screens.newLesson.tagInputPlaceholder')}
                                placeholderTextColor={COLORS.textSecondary}
                                value={tagInput}
                                onChangeText={setTagInput}
                                onSubmitEditing={addTag}
                                maxLength={50}
                                submitBehavior="submit"
                            />
                            <Text style={styles.tagCharHint}>
                                {tagInput.length}/50
                            </Text>
                            <View style={styles.tagsChipsRow}>
                                {tags.map((tag) => (
                                    <View key={tag.id} style={styles.tagChip}>
                                        <Text style={styles.tagChipText}>{tag.name}</Text>
                                        <Pressable onPress={() => toggleTag(tag.id)}>
                                            <CloseIcon />
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.tagsFooter}>
                                <Pressable style={styles.doneButton}
                                    onPress={() => {
                                        fetchTags();
                                        navigation.navigate('NewSheetScreen');
                                    }}
                                >
                                    <Text style={styles.doneButtonText}>{t('screens.newLesson.continueBtn')}</Text>
                                </Pressable>
                                <Pressable style={styles.skipButton}
                                    onPress={() => {
                                        navigation.navigate('NewSheetScreen', { lessonId: currentLessonId });
                                    }}
                                >
                                    <Text style={styles.skipButtonText}>{t('screens.newLesson.skipBtn')}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};