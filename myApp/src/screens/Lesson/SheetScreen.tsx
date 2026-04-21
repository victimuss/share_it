import React, { useEffect, useCallback, useRef, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSheetStore } from '@/src/context/useSheetStore';
import { LoadScreen } from '../auth/main/LoadScreen';
import { lessonSwipeViewStyles as styles } from '@/src/styles/SheetStyles';
import { GetLessonByIdAPI } from '@/src/api/lessonmain/lessonmain';
import { PersonalLessonResponse } from '@/src/types/lessonmainscreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/appNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseIcon } from '@/src/SVG/SearchSVG';
import { LessonArrowLeftIcon, LessonArrowRightIcon, LessonBookmarkIcon } from '@/src/SVG/LessonSVG';
import { SheetCard } from './SheetCard';
import { COLORS } from '@/src/styles/root';

export const SheetScreen = () => {
    type LessonScreenRouteProp = RouteProp<RootStackParamList, 'LessonPage'>;
    const route = useRoute<LessonScreenRouteProp>();
    const { sheets, total, currentIndex, lesson_name, isLoading, completed_steps, setCurrentIndex, loadLesson } = useSheetStore();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const prevbuttondisabled = currentIndex === 0;
    const lesson_id = route.params.lessonId;
    const progress = Math.ceil((currentIndex + 1) / total * 100);
    const fetchLesson = async () => {
        try {
            setLoading(true)
            await loadLesson(lesson_id)
            console.log(`sheets ${JSON.stringify(sheets)}`)
        } catch (error) {
            console.error("Ошибка загрузки листов:", error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchLesson()
    }, [])

    if (isLoading) {
        return (
            <LoadScreen />
        )
    }
    if (!sheets[currentIndex]) return <LoadScreen />
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <View style={styles.backIconWrapper}>
                        <LessonArrowLeftIcon />
                    </View>
                </Pressable>
                <Text style={styles.headerTitle}>{lesson_name}</Text>
                <Pressable style={styles.bookmarkButton}>
                    <View style={styles.bookmarkIconWrapper}>
                        <LessonBookmarkIcon />
                    </View>
                </Pressable>
            </View>
            <View style={styles.progressContainer}>
                <View style={styles.segmentsRow}>
                    {sheets.map((sheet, index) => (
                        <View key={index} style={index <= currentIndex ? styles.segmentDone : styles.segment} />
                    ))}
                </View>
                <View style={styles.progressLabels}>
                    <Text style={styles.progressLabelLeft}>Страница {currentIndex + 1} из {total}</Text>
                    <Text style={styles.progressLabelRight}>{progress}%</Text>
                </View>
            </View>
            <SheetCard type={sheets[currentIndex].sheetType} sheet={sheets[currentIndex]} />
            <View style={styles.bottomNav}>
                <Pressable style={prevbuttondisabled ? styles.prevButtonDisabled : styles.prevButton}
                    disabled={prevbuttondisabled}
                    onPress={() => {
                        if (currentIndex > 0) {
                            setCurrentIndex(currentIndex - 1);
                        }
                    }}>
                    <LessonArrowLeftIcon />
                    <Text style={styles.prevButtonText}>
                        Назад
                    </Text>
                </Pressable>
                {currentIndex === total - 1 ? (
                    <Pressable style={styles.finishButton}
                        onPress={() => {
                            if (currentIndex === total - 1) {
                                navigation.goBack();
                            }
                        }}>
                        <Text style={styles.finishButtonText}>
                            Завершить
                        </Text>
                    </Pressable>
                ) : (
                    <Pressable style={styles.nextButton}
                        onPress={() => {
                            if (currentIndex < total - 1) {
                                setCurrentIndex(currentIndex + 1);
                            }
                        }}>
                        <Text style={styles.nextButtonText}>
                            Дальше
                        </Text>
                        <LessonArrowRightIcon color={COLORS.surface} />
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    )
}

export default SheetScreen