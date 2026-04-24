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
import { LessonInfoIcon, LessonMoreIcon } from "@/src/SVG/LessonSVG";
import { GetMyLessonsAPI } from "@/src/api/lessonmain/mylesson";
import { MyLessonsResponse } from "@/src/types/mylessontype";
import { useMemo } from 'react';

export const MyLessonsScreen = () => {
    const [activeTab, setActiveTab] = useState('created');
    const [filters, setFilters] = useState('all');
    const navigation = useNavigation();
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
    const Dashboard = ({ MyLessons }: { MyLessons: MyLessonsResponse }) => {

        const activeMadeLessons = useMemo(() => {
            return MyLessons.made_lessons.filter(lesson => lesson.status === 'ACTIVE');
        }, [MyLessons.made_lessons]);

        const draftMadeLessons = useMemo(() => {
            return MyLessons.made_lessons.filter(lesson => lesson.status === 'DRAFT');
        }, [MyLessons.made_lessons]);

        const completedLearn = useMemo(() => {
            return MyLessons.learn_lessons.filter(progress => progress.status === 'COMPLETED');
        }, [MyLessons.learn_lessons]);

        const inProgressLearn = useMemo(() => {
            return MyLessons.learn_lessons.filter(progress => progress.status === 'IN_PROGRESS');
        }, [MyLessons.learn_lessons]);
    }
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
    useEffect(() => {
        fetchData();
    }, [user]);

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={styles.lessonCard}>
                <View style={styles.lessonCardTop}>
                    <View style={styles.lessonThumb}>
                        {iconMap[item.type] || <ApplicationCodeIcon size={50} />}
                    </View>
                    <View style={styles.lessonInfo}>
                        <Text style={styles.lessonTitle}>{item.lesson_name}</Text>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView style={styles.header}>
                <Text style={styles.headerTitle}>Мои уроки</Text>
                <View style={styles.tabsRow}>
                    <Pressable style={activeTab == 'created' ? styles.tabActive : styles.tab} onPress={() => setActiveTab('created')}>
                        <Text style={activeTab == 'created' ? styles.tabTextActive : styles.tabText}>Созданные</Text>
                    </Pressable>
                    <Pressable style={activeTab == 'learning' ? styles.tabActive : styles.tab} onPress={() => setActiveTab('learning')}>
                        <Text style={activeTab == 'learning' ? styles.tabTextActive : styles.tabText}>Изучаю</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyLessonsScreen
