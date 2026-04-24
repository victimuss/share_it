import { View, Text, ScrollView, Pressable, TextInput, FlatList } from "react-native";
import { homeStyles } from "@/src/styles/MainPageStyles";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS } from "@/src/styles/root";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadScreen } from "../auth/main/LoadScreen";
import { Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { useNavigation } from "expo-router";
import { ApplicationCodeIcon, BellIcon, BusinessIcon, DesignPaletteIcon, LanguageIcon, PlayIcon } from "@/src/SVG/MainPageSVG";
import { lessonLandingStyles as styles } from "@/src/styles/LessonMainPageStyles";
import { LessonBackIcon, LessonMoreIcon, LessonFileIcon, LessonUsersIcon, LessonStarIcon, LessonStarFilledIcon, LessonLikeIcon, LessonDislikeIcon } from "@/src/SVG/LessonSVG";
import { PersonalLessonOut, PersonalLessonResponse } from "@/src/types/lessonmainscreen";
import { GetLessonByIdAPI, LikeLessonAPI, RankLessonAPI } from "@/src/api/lessonmain/lessonmain";
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "@/src/navigation/appNavigator";
import { useCallback } from 'react';
import { RefreshControl } from 'react-native';
export const LessonMainScreen = () => {
    type LessonScreenRouteProp = RouteProp<RootStackParamList, 'LessonMainScreen'>;
    const route = useRoute<LessonScreenRouteProp>();
    const lesson_id = route.params.lessonId;
    const [currentLesson, setCurrentLesson] = useState<PersonalLessonResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [currentLikes, setCurrentLikes] = useState(0);
    const [createdAt, setCreatedAt] = useState('');
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [rating, setRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);
    const fetchCurrentLesson = async () => {
        try {
            setLoading(true)
            const response = await GetLessonByIdAPI(lesson_id)
            setCurrentLesson(response)
            setCurrentLikes(response?.lesson.likes)
            setCurrentRating(response?.rank ?? 0)
            setIsLiked(response?.is_liked)
            const date = new Date(response?.lesson.created_at);
            const options: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'long',
            };
            setCreatedAt(date.toLocaleDateString('ru-RU', options));
            setRating(response?.lesson.rank_count > 0 ? Math.round(response?.lesson.rank / response?.lesson.rank_count) : 0)
            console.log(response)
        } catch (error) {
            console.error("Error fetching current lesson:", error);
        } finally {
            setLoading(false)
        }
    }

    const fetchLike = async () => {
        try {
            setLoading(true)
            const response = await LikeLessonAPI({ lesson_id: lesson_id, like: !isLiked })
            setCurrentLikes(response.likes)
            console.log(response)
        } catch (error) {
            console.error("Error fetching current lesson:", error);
        } finally {
            setLoading(false)
        }
    }

    const fetchRank = async (rank: number) => {
        try {
            setLoading(true)
            const response = await RankLessonAPI({ lesson_id: lesson_id, rank: rank })
            setRating(response?.lesson.rank_count > 0 ? Math.round(response?.lesson.rank / response?.lesson.rank_count) : 0)
            console.log(response)
        } catch (error) {
            console.error("Error fetching current lesson:", error);
        } finally {
            setLoading(false)
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchCurrentLesson()
        setRefreshing(false);
    }, []);
    useEffect(() => {
        fetchCurrentLesson()
    }, [])
    if (loading) {
        return (
            <LoadScreen />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={styles.scrollContent}>
                <View style={styles.heroBanner}>
                    <Pressable style={styles.heroBackButton} onPress={() => navigation.goBack()}>
                        <View style={styles.heroBackIconWrapper}>
                            <LessonBackIcon />
                        </View>
                    </Pressable>
                    <Pressable style={styles.heroMoreButton}>
                        <View style={styles.heroMoreIconWrapper}>
                            <LessonMoreIcon />
                        </View>
                    </Pressable>
                    <View style={styles.heroCategoryBadge}>
                        <Text style={styles.heroCategoryText}>{currentLesson?.lesson.type}</Text>
                    </View>
                    <Text style={styles.heroTitle}>{currentLesson?.lesson.lesson_name}</Text>
                </View>
                <View style={styles.progressStrip}>
                    <View style={[styles.progressStripFill, { width: `${currentLesson?.progress / currentLesson?.lesson.sheet_counts * 100 || 0}%` }]}></View>
                </View>
                <View style={styles.authorRow}>
                    <View style={styles.authorAvatar}>
                        <Text style={styles.authorAvatarText}>{currentLesson?.author_name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View>
                        <View style={styles.metricIconWrapper}></View>
                        <Text style={styles.authorName}>{currentLesson?.author_name}</Text>
                        <Text style={styles.authorMeta}>Опубликовано {createdAt}</Text>
                    </View>
                </View>
                <View style={styles.metricsRow}>
                    <View style={styles.metricItem}>
                        <LessonFileIcon style={{ marginBottom: 4 }} />
                        <Text style={styles.metricValue}>{currentLesson?.lesson.sheet_counts}</Text>
                        <Text style={styles.metricLabel}>страниц</Text>
                    </View>
                    <View style={styles.metricItem}>
                        <LessonUsersIcon style={{ marginBottom: 4 }} />
                        <Text style={styles.metricValue}>{currentLesson?.lesson.students_count}</Text>
                        <Text style={styles.metricLabel}>студентов</Text>
                    </View>
                    <View style={styles.metricItem}>
                        <LessonStarIcon style={{ marginBottom: 4 }} />
                        <Text style={styles.metricValue}>{rating}</Text>
                        <Text style={styles.metricLabel}>рейтинг</Text>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{currentLesson?.lesson.description}</Text>
                </View>
                <View style={styles.tagsRow}>
                    {currentLesson?.tags?.map((tag, index) => (
                        <View key={index} style={styles.tagChip}>
                            <Text style={styles.tagChipText}>{tag}</Text>
                        </View>
                    ))}
                </View>
                {currentLesson?.progress > 0 && (
                    <View style={styles.resumeCard}>
                        <View style={styles.resumeIconCircle}>
                            <View style={styles.resumeIconWrapper}>
                                <PlayIcon color={COLORS.surface} size={20} />
                            </View>
                        </View>
                        <View style={styles.resumeInfo}>
                            <Text style={styles.resumeTitle}>Продолжить с страницы {currentLesson?.progress}</Text>
                            <Text style={styles.resumeSubtitle}>Осталось {currentLesson?.lesson.sheet_counts - currentLesson?.progress || 0} страниц</Text>
                            <View style={styles.resumeProgressTrack}>
                                <View style={[styles.progressStripFill, { width: `${currentLesson?.progress / currentLesson?.lesson.sheet_counts * 100 || 0}%` }]}></View>
                            </View>
                        </View>
                    </View>)}
                <View style={styles.ratingCard}>
                    <Text style={styles.ratingCardTitle}>Понравился урок?</Text>
                    <View style={styles.ratingRow}>
                        <Pressable style={isLiked ? styles.likeButtonPressed : styles.likeButton}
                            onPress={() => {
                                fetchLike()
                                setIsLiked(!isLiked)
                            }}
                        >
                            <View style={styles.likeIconWrapper}>
                                <LessonLikeIcon color={isLiked ? '#DB2777' : COLORS.text} />
                            </View>
                            <Text style={isLiked ? styles.likeCountActive : styles.likeCount}>{currentLikes}</Text>
                        </Pressable>
                        <View style={styles.starsRow}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Pressable
                                    key={star}
                                    style={({ pressed }) => [
                                        styles.starButton,
                                        pressed && { opacity: 0.7, transform: [{ scale: 0.9 }] }
                                    ]}
                                    onPress={() => { setCurrentRating(star); fetchRank(star) }}
                                >
                                    <View style={styles.starIconWrapper}>
                                        {currentRating >= star ? (
                                            <LessonStarFilledIcon color={COLORS.warning} width={28} height={28} />
                                        ) : (
                                            <LessonStarIcon color={COLORS.borderDark} width={28} height={28} />
                                        )}
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.ctaContainer}>
                    <Pressable style={styles.startButton}
                        onPress={() => navigation.navigate('LessonPage', { lessonId: currentLesson?.lesson.id })}>
                        <Text style={styles.startButtonText}>Продолжить обучение</Text>
                    </Pressable>
                    <Pressable style={styles.exitButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.exitButtonText}>Выйти из урока</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default LessonMainScreen;