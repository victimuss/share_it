import { View, Text, ScrollView, Pressable, TextInput, FlatList, Dimensions, Modal, KeyboardAvoidingView, Alert } from "react-native";
import { homeStyles } from "@/src/styles/MainPageStyles";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS } from "@/src/styles/root";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { profileStyles } from "@/src/styles/ProfileStyles";
import { useNavigation } from "expo-router";
import { LearnedLessonsResponce, MakedLessonsResponce, Skill, SkillOut, UserLesson } from "@/src/types/profile";
import { EditUserAPI, GetUserSkills, NewSkillapi, UsersLearned, UsersMaked } from "@/src/api/main_page/profile/profile";
import { ApplicationCodeIcon, BusinessIcon, DesignPaletteIcon, LanguageIcon } from "@/src/SVG/MainPageSVG";
import { CloseIcon } from "@/src/SVG/SearchSVG";
import { NewSkill } from "@/src/types/profile";
import { LoadScreen } from "./LoadScreen";
import { SearchIcon } from "@/src/SVG/TabSVG";
import { useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { myLessonsStyles as styles } from "@/src/styles/MyLessonStyles";
import { LessonEditIcon, LessonEyeIcon, LessonInfoIcon, LessonMoreIcon, LessonTrashIcon } from "@/src/SVG/LessonSVG";
import { GetMyLessonsAPI } from "@/src/api/lessonmain/mylesson";
import { MyLessonsResponse } from "@/src/types/mylessontype";
import { useMemo } from 'react';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/appNavigator";
import { DeleteLessonAPI } from "@/src/api/create_lesson/delete_lesson";

export const MyLessonsScreen = () => {
    const [activeTab, setActiveTab] = useState('created');
    const [filters, setFilters] = useState('all');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();
    const [myLessons, setMyLessons] = useState<MyLessonsResponse>({ made_lessons: [], learn_lessons: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const iconMap: Record<string, React.ReactNode> = {
        code: <ApplicationCodeIcon size={50} />,
        design: <DesignPaletteIcon size={50} />,
        language: <LanguageIcon size={50} />,
        business: <BusinessIcon size={50} />,
    };
    const activeMadeLessons = useMemo(() => {
        return myLessons.made_lessons.filter(lesson => lesson.status === 'ACTIVE');
    }, [myLessons.made_lessons]);

    const draftMadeLessons = useMemo(() => {
        return myLessons.made_lessons.filter(lesson => lesson.status === 'DRAFT');
    }, [myLessons.made_lessons]);

    const completedLearn = useMemo(() => {
        return myLessons.learn_lessons.filter(progress => progress.status === 'COMPLETED');
    }, [myLessons.learn_lessons]);

    const inProgressLearn = useMemo(() => {
        return myLessons.learn_lessons.filter(progress => progress.status === 'IN_PROGRESS');
    }, [myLessons.learn_lessons]);

    const rejectedMadeLessons = useMemo(() => {
        return myLessons.made_lessons.filter(lesson => lesson.status === 'REJECTED');
    }, [myLessons.made_lessons]);
    const fetchData = async () => {
        setLoading(true);
        try {
            const lesson = await GetMyLessonsAPI();
            setMyLessons(lesson);
            console.log('myLessons: ', myLessons);
        } catch (err: any) {
            console.error(err);
            setError('Не удалось загрузить данные');
        } finally {
            setLoading(false);
        }
    };
    const onRefresh = useCallback(async () => {
        await fetchData()

    }, []);

    const DeleteLesson = async (lesson_id: number) => {
        try {
            const response = await DeleteLessonAPI(lesson_id);
            if (response) {
                await fetchData();
            }
        } catch (err: any) {
            console.error(err.detail.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, [user]);

    const getLevelStyle = (level: string) => {
        const lowerLevel = level?.toLowerCase();
        if (lowerLevel?.includes('beginner') || lowerLevel?.includes('начальный')) return { bg: '#D1FAE5', text: '#059669' };
        if (lowerLevel?.includes('intermediate') || lowerLevel?.includes('средний')) return { bg: '#FEF3C7', text: '#D97706' };
        if (lowerLevel?.includes('advanced') || lowerLevel?.includes('продвинутый')) return { bg: '#FEE2E2', text: '#DC2626' };
        return { bg: '#F3F4F6', text: '#4B5563' };
    };

    const renderItem = ({ item }: { item: any }) => {
        if (item.isSectionHeader) {
            return (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                    <Text style={styles.sectionCount}>{item.count} урока</Text>
                </View>
            );
        }

        const lesson = item.lesson || item;
        const isLearning = !!item.lesson;
        const levelStyle = getLevelStyle(lesson.level);
        const categoryStyle = { bg: '#E0E7FF', text: '#4F46E5' };

        return (
            <Pressable
                style={styles.lessonCard}
                onPress={() => navigation.navigate('LessonMainScreen', { lessonId: lesson.id })}
            >
                <View style={styles.lessonCardTop}>
                    <View style={[styles.lessonThumb, { backgroundColor: isLearning ? '#F0F4FF' : (lesson.status === 'ACTIVE' ? '#EEFBF4' : '#F3F4F6') }]}>
                        {iconMap[lesson.type] || <ApplicationCodeIcon size={40} />}
                    </View>
                    <View style={styles.lessonInfo}>
                        <Text style={styles.lessonTitle} numberOfLines={2}>{lesson.lesson_name}</Text>
                        <View style={styles.lessonMeta}>
                            <View style={[styles.tagBadge, { backgroundColor: levelStyle.bg }]}>
                                <Text style={[styles.tagText, { color: levelStyle.text }]}>{lesson.level}</Text>
                            </View>
                            <View style={[styles.tagBadge, { backgroundColor: categoryStyle.bg }]}>
                                <Text style={[styles.tagText, { color: categoryStyle.text }]}>{lesson.type}</Text>
                            </View>
                            {!isLearning && (
                                <Text style={[styles.lessonMetaText, { marginLeft: 4 }]}>{lesson.sheet_counts || 0} стр.</Text>
                            )}
                        </View>
                    </View>

                    {isLearning ? (
                        item.status === 'COMPLETED' ? (
                            <View style={styles.completedBadge}>
                                <Text style={styles.completedBadgeText}>✓ Завершено</Text>
                            </View>
                        ) : (
                            <Pressable
                                style={styles.continueButton}
                                onPress={() => navigation.navigate('LessonPage' as never, { lessonId: lesson.id } as never)}
                            >
                                <Text style={styles.continueButtonText}>Продолжить</Text>
                            </Pressable>
                        )
                    ) : (
                        <Pressable style={styles.lessonMenuButton}
                            onPress={() => { setSelectedLesson(lesson); setIsVisibleModal(true); }}
                        >

                            <View style={styles.lessonMenuIconWrapper}>
                                <LessonMoreIcon color={COLORS.primary} />
                            </View>
                        </Pressable>
                    )}
                </View>

                {isLearning ? (
                    <View style={styles.progressRow}>
                        <View style={[styles.progressTrack, { backgroundColor: '#E5E7EB' }]}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${(item.completed_steps / (lesson.sheet_counts || 1)) * 100}%`,
                                        backgroundColor: item.status === 'COMPLETED' ? '#10B981' : COLORS.primary
                                    }
                                ]}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 12 }}>
                            <Text style={[styles.progressLabel, { color: item.status === 'COMPLETED' ? '#10B981' : COLORS.primary, fontWeight: '700' }]}>
                                {Math.round((item.completed_steps / (lesson.sheet_counts || 1)) * 100)}%
                            </Text>
                            <Text style={styles.progressLabel}>
                                {item.completed_steps}/{lesson.sheet_counts} стр.
                            </Text>
                        </View>
                        {item.status === 'COMPLETED' && (
                            <Pressable
                                style={[styles.repeatButton, { marginLeft: 'auto' }]}
                                onPress={() => navigation.navigate('LessonMainScreen' as never, { lessonId: lesson.id } as never)}
                            >
                                <Text style={styles.repeatButtonText}>Повторить</Text>
                                <Text style={{ color: COLORS.primary, fontSize: 16 }}>→</Text>
                            </Pressable>
                        )}
                    </View>
                ) : (
                    <View style={styles.lessonCardBottom}>
                        <View style={[
                            styles.statusBadge,
                            lesson.status === 'ACTIVE' ? styles.statusActive : (lesson.status === 'REJECTED' ? styles.statusRejected : styles.statusDraft)
                        ]}>
                            <View style={[
                                styles.statusDot,
                                { backgroundColor: lesson.status === 'ACTIVE' ? COLORS.success : (lesson.status === 'REJECTED' ? COLORS.error : COLORS.textSecondary) }
                            ]} />
                            <Text style={lesson.status === 'ACTIVE' ? styles.statusActiveText : (lesson.status === 'REJECTED' ? styles.statusRejectedText : styles.statusDraftText)}>
                                {lesson.status === 'ACTIVE' ? 'Active' : (lesson.status === 'REJECTED' ? 'Rejected' : 'Draft')}
                            </Text>
                        </View>
                        <View style={styles.lessonStats}>
                            <View style={styles.lessonStat}>
                                <Text style={styles.lessonStatText}>👤 {lesson.students_count || 0}</Text>
                            </View>
                            <View style={styles.lessonStat}>
                                <Text style={styles.lessonStatText}>💗 {lesson.likes || 0}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </Pressable>
        );
    };

    const EmptyState = () => (
        <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
                <LessonInfoIcon />
            </View>
            <Text style={styles.emptyTitle}>Уроков пока нет</Text>
            <Text style={styles.emptySubtitle}>
                {activeTab === 'created'
                    ? 'Вы еще не создали ни одного урока. Пора поделиться знаниями!'
                    : 'Вы еще не начали изучать ни один урок. Найдите что-нибудь интересное в поиске.'}
            </Text>
            <Pressable style={styles.emptyButton} onPress={() => navigation.navigate('Search' as never)}>
                <Text style={styles.emptyButtonText}>Найти уроки</Text>
            </Pressable>
        </View>
    );
    const currentData = activeTab === 'created'
        ? (filters === 'all'
            ? [...activeMadeLessons, ...draftMadeLessons, ...rejectedMadeLessons]
            : (filters === 'active' ? activeMadeLessons : (filters === 'draft' ? draftMadeLessons : rejectedMadeLessons)))
        : (filters === 'all'
            ? [...inProgressLearn, ...completedLearn]
            : (filters === 'active' ? inProgressLearn : completedLearn));

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <FlatList
                data={currentData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
                ListHeaderComponent={
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Мои уроки</Text>
                            <View style={styles.tabsRow}>
                                <Pressable
                                    style={activeTab === 'created' ? styles.tabActive : styles.tab}
                                    onPress={() => { setActiveTab('created'); setFilters('all'); }}
                                >
                                    <Text style={activeTab === 'created' ? styles.tabTextActive : styles.tabText}>Созданные</Text>
                                </Pressable>
                                <Pressable
                                    style={activeTab === 'learning' ? styles.tabActive : styles.tab}
                                    onPress={() => { setActiveTab('learning'); setFilters('all'); }}
                                >
                                    <Text style={activeTab === 'learning' ? styles.tabTextActive : styles.tabText}>Изучаю</Text>
                                </Pressable>
                            </View>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filtersScrollContent}
                        >
                            <Pressable
                                style={filters === 'all' ? styles.filterChipActive : styles.filterChip}
                                onPress={() => setFilters('all')}
                            >
                                <Text style={filters === 'all' ? styles.filterChipTextActive : styles.filterChipText}>Все</Text>
                            </Pressable>
                            <Pressable
                                style={filters === 'active' ? styles.filterChipActive : styles.filterChip}
                                onPress={() => setFilters('active')}
                            >
                                <View style={[styles.filterChipDot, { backgroundColor: COLORS.success }]} />
                                <Text style={filters === 'active' ? styles.filterChipTextActive : styles.filterChipText}>
                                    {activeTab === 'created' ? 'Active' : 'В процессе'}
                                </Text>
                            </Pressable>
                            <Pressable
                                style={filters === 'draft' ? styles.filterChipActive : styles.filterChip}
                                onPress={() => setFilters('draft')}
                            >
                                <View style={[styles.filterChipDot, { backgroundColor: COLORS.textSecondary }]} />
                                <Text style={filters === 'draft' ? styles.filterChipTextActive : styles.filterChipText}>
                                    {activeTab === 'created' ? 'Draft' : 'Завершенные'}
                                </Text>
                            </Pressable>
                            {activeTab === 'created' && (
                                <Pressable
                                    style={filters === 'rejected' ? styles.filterChipActive : styles.filterChip}
                                    onPress={() => setFilters('rejected')}
                                >
                                    <View style={[styles.filterChipDot, { backgroundColor: COLORS.error }]} />
                                    <Text style={filters === 'rejected' ? styles.filterChipTextActive : styles.filterChipText}>
                                        Отклоненные
                                    </Text>
                                </Pressable>
                            )}
                        </ScrollView>

                        <View style={styles.resultsRow}>
                            <Text style={styles.resultsText}>
                                Найдено: <Text style={styles.resultsBold}>{currentData.length}</Text>
                            </Text>
                        </View>
                    </View>
                }
                ListEmptyComponent={<EmptyState />}
            />

            <Modal
                visible={isVisibleModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsVisibleModal(false)}
            >
                <Pressable style={styles.dialogOverlay} onPress={() => setIsVisibleModal(false)}>
                    <Pressable style={styles.dialogSheet}>
                        <View style={styles.dialogHandle} />

                        {selectedLesson && (
                            <View style={styles.dialogPreview}>
                                <View style={[styles.dialogPreviewThumb, { backgroundColor: '#F0F4FF' }]}>
                                    {iconMap[selectedLesson.type] || <ApplicationCodeIcon size={30} />}
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={styles.dialogPreviewTitle} numberOfLines={1} ellipsizeMode="tail">
                                        {selectedLesson.lesson_name}
                                    </Text>
                                    <View style={[
                                        styles.statusBadge,
                                        { alignSelf: 'flex-start', marginTop: 2, transform: [{ scale: 0.85 }], marginLeft: -6 },
                                        selectedLesson.status === 'ACTIVE' ? styles.statusActive : (selectedLesson.status === 'REJECTED' ? styles.statusRejected : styles.statusDraft)
                                    ]}>
                                        <View style={[styles.statusDot, { backgroundColor: selectedLesson.status === 'ACTIVE' ? COLORS.success : (selectedLesson.status === 'REJECTED' ? COLORS.error : COLORS.textSecondary) }]} />
                                        <Text style={selectedLesson.status === 'ACTIVE' ? styles.statusActiveText : (selectedLesson.status === 'REJECTED' ? styles.statusRejectedText : styles.statusDraftText)}>
                                            {selectedLesson.status === 'ACTIVE' ? 'Active' : (selectedLesson.status === 'REJECTED' ? 'Rejected' : 'Draft')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        <View style={styles.dialogActions}>
                            <Pressable style={styles.dialogAction}
                                onPress={() => navigation.navigate('LessonMainScreen', { lessonId: selectedLesson.id })}
                            >
                                <View style={[styles.dialogActionIconCircle, { backgroundColor: '#EEF2FF' }]}>
                                    <View style={styles.dialogActionIconWrapper}>
                                        <LessonEyeIcon color="#6366F1" />
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.dialogActionTitle}>Просмотреть</Text>
                                    <Text style={styles.dialogActionSubtitle}>Открыть как читатель</Text>
                                </View>
                            </Pressable>

                            <Pressable style={styles.dialogAction}
                                onPress={() => {
                                    if (selectedLesson.id) {
                                        navigation.navigate('NewLessonScreen', {
                                            isEdit: true,
                                            editLessonId: selectedLesson.id
                                        });
                                        setIsVisibleModal(false);
                                    } else {
                                        console.warn("Нет ID урока для редактирования");
                                    }
                                }}
                            >
                                <View style={[styles.dialogActionIconCircle, { backgroundColor: '#FFF7ED' }]}>
                                    <View style={styles.dialogActionIconWrapper}>
                                        <LessonEditIcon color="#D97706" />
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.dialogActionTitle}>Редактировать</Text>
                                    <Text style={styles.dialogActionSubtitle}>Изменить контент и настройки</Text>
                                </View>
                            </Pressable>

                            <View style={styles.dialogDivider} />

                            <Pressable style={[styles.dialogAction, styles.dialogActionDelete]} onPress={() => {
                                if (selectedLesson.id) {
                                    DeleteLesson(selectedLesson.id);
                                    setIsVisibleModal(false);
                                    Alert.alert("Успешно", "Урок удален");
                                } else {
                                    console.warn("Нет ID урока для удаления");
                                }
                            }}>
                                <View style={[styles.dialogActionIconCircle, { backgroundColor: '#FEF2F2' }]}>
                                    <View style={styles.dialogActionIconWrapper}>
                                        <LessonTrashIcon color="#DC2626" />
                                    </View>
                                </View>
                                <View>
                                    <Text style={[styles.dialogActionTitle, styles.dialogActionDeleteTitle]}>Удалить урок</Text>
                                    <Text style={styles.dialogActionSubtitle}>Это действие нельзя отменить</Text>
                                </View>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal >
        </SafeAreaView >
    )
}

export default MyLessonsScreen
