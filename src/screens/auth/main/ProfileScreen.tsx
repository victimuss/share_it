import { View, Text, ScrollView, Pressable, TextInput, FlatList } from "react-native";
import { homeStyles } from "@/src/styles/MainPageStyles";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS } from "@/src/styles/root";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { currentLessonResponce, Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { profileStyles } from "@/src/styles/ProfileStyles";
import { useNavigation } from "expo-router";
import { LearnedLessonsResponce, MakedLessonsResponce, Skill, SkillOut } from "@/src/types/profile";
import { GetUserSkills, UsersLearned, UsersMaked } from "@/src/api/main_page/profile/profile";
import { ApplicationCodeIcon, BusinessIcon, DesignPaletteIcon, LanguageIcon } from "@/src/SVG/MainPageSVG";

export const ProfileScreen = () => {
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [completedLessons, setCompletedLessons] = useState<LearnedLessonsResponce>({ learnLessons: [], lessons: [] });
    const [Lessons, setLessons] = useState<LearnedLessonsResponce>({ learnLessons: [], lessons: [] });
    const [myLessons, setMyLessons] = useState<MakedLessonsResponce>({ lessons: [] });
    const [error, setError] = useState('');
    const navigator = useNavigation();
    const iconMap: Record<string, React.ReactNode> = {
        code: <ApplicationCodeIcon size={50} />,
        design: <DesignPaletteIcon size={50} />,
        language: <LanguageIcon size={50} />,
        business: <BusinessIcon size={50} />,
    };
    const [activeTab, setActivebTab] = useState('myLessons');
    const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
        const result: T[][] = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };
    const myLesColumn = chunkArray(myLessons.lessons, 2)
    const lesColumn = chunkArray(Lessons.lessons, 2)
    const completedColumn = chunkArray(completedLessons.lessons, 2)
    const { user } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const skillResponse = user ? await GetUserSkills() : null;
                const completedResponse = user ? await UsersLearned() : null;
                const getMyLessons = user ? await UsersMaked() : null;
                setSkills(skillResponse || []);
                setCompletedLessons(completedResponse || { learnLessons: [], lessons: [] });
                setLessons(completedResponse || { learnLessons: [], lessons: [] });
                setMyLessons(getMyLessons || { lessons: [] });
                console.log('ПОПУДЯ', skills)
            } catch (err: any) {
                console.error(err);
                setError('Не удалось загрузить уроки. Попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);
    return (
        <SafeAreaView style={profileStyles.container} edges={['top']}>
            <ScrollView style={profileStyles.scrollContainer}>
                <View style={profileStyles.coverBanner}>
                </View>
                <View style={profileStyles.profileHeaderContainer}>
                    <View style={profileStyles.avatarWrapper}>
                        <View style={profileStyles.avatar}>
                            <Text style={profileStyles.avatarText}>T</Text>
                            <View style={profileStyles.onlineDot}>
                            </View>
                        </View>
                    </View>
                    <Text style={profileStyles.userName}>
                        {user?.name}
                    </Text>
                    <Text style={profileStyles.userHandle}>
                        {user?.description}
                    </Text>
                    <Text style={profileStyles.userBio}>
                        {user?.tag}
                    </Text>
                    <Pressable style={profileStyles.editButton}>
                        <Text style={profileStyles.editButtonText}>Редактировать профиль</Text>
                    </Pressable>
                </View>
                <View style={profileStyles.statsRow}>
                    <View style={profileStyles.statItem}>
                        <Text style={profileStyles.statValue}>{user?.us_lessons}</Text>
                        <Text style={profileStyles.statLabel}>Создал уроков</Text>
                    </View>
                    <View style={profileStyles.statItem}>
                        <Text style={profileStyles.statValue}>{user?.us_learn_lessons}</Text>
                        <Text style={profileStyles.statLabel}>Изучаю</Text>
                    </View>
                    <View style={profileStyles.statItem}>
                        <Text style={profileStyles.statValue}>{user?.us_likes}</Text>
                        <Text style={profileStyles.statLabel}>Лайков</Text>
                    </View>
                </View>
                <View style={profileStyles.section}>
                    <View style={profileStyles.sectionHeader}>
                        <Text style={profileStyles.sectionTitle}>
                            Мои навыки
                        </Text>
                        <Pressable>
                            <Text style={profileStyles.sectionAction}>+ Добавить</Text>
                        </Pressable>
                    </View>
                    <FlatList
                        horizontal
                        data={skills || []}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={profileStyles.skillsScrollContent}
                        showsHorizontalScrollIndicator={false}
                        style={profileStyles.skillsScrollContent}
                        renderItem={({ item }) => (
                            <View style={item.level === 'beginner' ? profileStyles.skillChipBegginer : item.level === 'intermediate' ? profileStyles.skillChipIntermediate : item.level === 'advanced' ? profileStyles.skillChipAdvanced :
                                profileStyles.skillChip}>
                                <Text style={profileStyles.skillChipText}>{item.skill_name}</Text>
                            </View>
                        )}>
                    </FlatList>
                </View>
                <View style={profileStyles.tabsContainer}>
                    <Pressable style={activeTab === 'myLessons' ? profileStyles.tabActive : profileStyles.tab}
                        onPress={() => { setActivebTab('myLessons') }}>
                        <Text style={activeTab === 'myLessons' ? profileStyles.tabTextActive : profileStyles.tabText}>Создал({myLessons.lessons.length})</Text>
                    </Pressable>
                    <Pressable style={activeTab === 'Lessons' ? profileStyles.tabActive : profileStyles.tab}
                        onPress={() => { setActivebTab('Lessons') }}>

                        <Text style={activeTab === 'Lessons' ? profileStyles.tabTextActive : profileStyles.tabText}>Изучаю({completedLessons.learnLessons.length})</Text>
                    </Pressable>
                    <Pressable style={activeTab === 'completedLessons' ? profileStyles.tabActive : profileStyles.tab}
                        onPress={() => { setActivebTab('completedLessons') }}>
                        <Text style={activeTab === 'completedLessons' ? profileStyles.tabTextActive : profileStyles.tabText}>Завершил({completedLessons.learnLessons.length})</Text>
                    </Pressable>
                </View>
                <View style={profileStyles.section}>
                    <FlatList
                        data={activeTab === 'myLessons' ? myLesColumn : activeTab === 'Lessons' ? lesColumn : completedColumn}
                        horizontal
                        keyExtractor={(_, i) => `${activeTab}-${i}`}
                        key={activeTab}
                        extraData={activeTab}
                        contentContainerStyle={homeStyles.lessonCardContent}
                        renderItem={({ item }) => (
                            <View>
                                {item.map((lesson) => (
                                    <View key={lesson.id} style={[homeStyles.lessonCard]}>
                                        <View style={homeStyles.lessonCardThumb}>
                                            {iconMap[lesson.type || 'code'] || null}
                                        </View>
                                        <View style={homeStyles.lessonCardContent}>
                                            <Text style={homeStyles.lessonCardTitle}>{lesson.lesson_name}</Text>
                                            <View style={homeStyles.lessonCardMeta}>
                                                <View style={lesson.level === 'Beginner' ? homeStyles.badgeBeginner : lesson.level === 'Intermediate' ? homeStyles.badgeIntermediate : lesson.level === 'Advanced' ? homeStyles.badgeAdvanced :
                                                    homeStyles.badgeCategory}>
                                                    <Text style={lesson.level === 'Beginner' ? homeStyles.badgeBeginnerText : lesson.level === 'Intermediate' ? homeStyles.badgeIntermediateText : lesson.level === 'Advanced' ? homeStyles.badgeAdvancedText : homeStyles.badgeCategoryText}>{lesson.level}</Text>
                                                </View>
                                                <View style={homeStyles.badge}>
                                                    <Text style={homeStyles.badgeCategoryText}>{lesson.type}</Text>
                                                </View>
                                            </View>
                                            <View style={homeStyles.lessonCardFooter}>
                                                <Text style={homeStyles.lessonCardLikes}>❤️ {lesson.likes}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}