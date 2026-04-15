import { View, Text, ScrollView, Pressable, TextInput, FlatList, Dimensions, Modal, KeyboardAvoidingView, Alert } from "react-native";
import { homeStyles } from "@/src/styles/MainPageStyles";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS } from "@/src/styles/root";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { profileStyles } from "@/src/styles/ProfileStyles";
import { useNavigation } from "expo-router";
import { LearnedLessonsResponce, MakedLessonsResponce, Skill, SkillOut } from "@/src/types/profile";
import { EditUserAPI, GetUserSkills, NewSkillapi, UsersLearned, UsersMaked } from "@/src/api/main_page/profile/profile";
import { ApplicationCodeIcon, BusinessIcon, DesignPaletteIcon, LanguageIcon } from "@/src/SVG/MainPageSVG";
import { CloseIcon } from "@/src/SVG/SearchSVG";
import { NewSkill } from "@/src/types/profile";
import { LoadScreen } from "./LoadScreen";
import { SearchIcon } from "@/src/SVG/TabSVG";

export const ProfileScreen = () => {
    const { user, edit } = useAuth();
    const [loading, setLoading] = useState(true);
    const [newSkillname, setNewSkillname] = useState('')
    const [newSkillError, setNewSkillError] = useState(false)
    const [newSkillLevel, setNewSkillLevel] = useState('beginner')
    const [skills, setSkills] = useState<Skill[]>([]);
    const [skillModal, showskillModal] = useState(false)
    const [editModal, showeditModal] = useState(false)
    const [editUserName, setEditUserName] = useState(user?.name || '')
    const [editDescription, setEditDescription] = useState(user?.description || '')
    const [editTag, setEditTag] = useState(user?.tag || '')
    const [editSite, setEditSite] = useState(user?.site || '')
    const [editTelegram, setEditTelegram] = useState(user?.telegram || '')
    const [editAvatar, setEditAvatar] = useState(user?.avatar || '')
    const [isFocused, setIsFocused] = useState(false)
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

    const NewSkillAdd = async () => {
        setLoading(true);
        try {
            const skillResponse = user ? await NewSkillapi({ skill_name: newSkillname, level: newSkillLevel }) : null
            Alert.alert('Успешно добавлено')
            fetchData()
            setNewSkillname('')
            showskillModal(false)
        } catch (err: any) {
            console.error(err);
            setError('Не удалось загрузить уроки. Попробуйте позже.');
        } finally {
            setLoading(false);
        }

    }

    const EditUserFetch = async () => {
        setLoading(true)
        if (editUserName.length <= 3) {
            Alert.alert('Имя должно быть не менее 3 символов')
            return
        }
        try {
            const editResponse = user ? await EditUserAPI({ user_name: editUserName, description: editDescription, tag: editTag, site: editSite, telegram: editTelegram, avatar: editAvatar }) : null
            // Обновляем данные в AuthContext — все экраны, читающие user, обновятся мгновенно
            edit(editUserName, editDescription, editTag, editSite, editTelegram, editAvatar)
            Alert.alert('Успешно изменено')
            fetchData()
            showeditModal(false)
        } catch (err: any) {
            console.error(err);
            setError('Не удалось изменить. Попробуйте позже.');
            Alert.alert('Ошибка', 'Не удалось изменить. Попробуйте позже.')
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [user]);

    if (loading) {
        return <LoadScreen></LoadScreen>
    }

    return (
        <SafeAreaView style={profileStyles.container} edges={['top']}>
            <ScrollView style={profileStyles.scrollContainer}>
                <View style={profileStyles.coverBanner}>
                </View>
                <View style={profileStyles.profileHeaderContainer}>
                    <View style={profileStyles.avatarWrapper}>
                        <View style={profileStyles.avatar}>
                            <Text style={profileStyles.avatarText}>{user?.name.charAt(0).toUpperCase()}</Text>
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
                    <Pressable style={profileStyles.editButton}
                        onPress={() => showeditModal(true)}>
                        <Text style={profileStyles.editButtonText}>Редактировать профиль</Text>
                    </Pressable>
                    <Modal
                        visible={editModal}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => showeditModal(false)}
                    >
                        <View style={profileStyles.overlay}>
                            <View style={profileStyles.sheet}>
                                <View style={profileStyles.handle}>
                                </View>
                                <View style={profileStyles.header}>
                                    <Text style={profileStyles.headerTitle}>
                                        Редактировать профиль
                                    </Text>
                                    <Pressable style={profileStyles.closeButton}
                                        onPress={() => { showeditModal(false); setNewSkillname('') }}>
                                        <View style={profileStyles.closeIconWrapper}>
                                            <CloseIcon />
                                        </View>
                                    </Pressable>
                                </View>
                                <ScrollView style={profileStyles.scrollContent}>
                                    <View style={profileStyles.avatarSection}>
                                        <View style={profileStyles.avatarWrapperEdit}>
                                            <View style={profileStyles.avatar}>
                                                <Text style={profileStyles.avatarText}>
                                                    {user?.name?.[0]?.toUpperCase() ?? '?'}
                                                </Text>
                                            </View>
                                            <View style={profileStyles.avatarCameraButton}>
                                                <View style={profileStyles.cameraIconWrapper}>
                                                    <SearchIcon size={14} color="white" />
                                                </View>
                                            </View>
                                            <Text style={profileStyles.avatarChangeText}
                                                numberOfLines={1}>
                                                Изменить фото
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={profileStyles.formGroupTitle}>
                                            Основное
                                        </Text>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                Имя
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editUserName}
                                                onChangeText={setEditUserName}
                                                placeholder='Ваше имя'
                                                placeholderTextColor={COLORS.textSecondary}
                                            />
                                        </View>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                Описание
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editDescription}
                                                onChangeText={setEditDescription}
                                                placeholder={'Описание'}
                                                placeholderTextColor={COLORS.textSecondary}
                                            />
                                        </View>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                Тег
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editTag}
                                                onChangeText={setEditTag}
                                                placeholder={'Тег'}
                                                placeholderTextColor={COLORS.textSecondary}
                                            />
                                        </View>
                                        <View style={profileStyles.formDivider} />
                                        <Text style={profileStyles.formGroupTitle}>
                                            Контакты
                                        </Text>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                Сайт
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editSite}
                                                onChangeText={setEditSite}
                                                placeholder={'https://...'}
                                                placeholderTextColor={COLORS.textSecondary}
                                            />
                                        </View>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                Телеграм
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editTelegram}
                                                onChangeText={setEditTelegram}
                                                placeholder={'@username'}
                                                placeholderTextColor={COLORS.textSecondary}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                                <View style={profileStyles.footer}>
                                    <Pressable style={(editUserName.length <= 3) ? profileStyles.saveButtonDisabled : profileStyles.saveButton}
                                        disabled={(editUserName.length <= 3)}
                                        onPress={() => { EditUserFetch(); }}>
                                        <Text style={profileStyles.saveButtonText}>
                                            Сохранить
                                        </Text>
                                    </Pressable>
                                    <Pressable>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
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
                            <Text style={profileStyles.sectionAction}
                                onPress={((pressed) => showskillModal(true))}>+ Добавить</Text>
                        </Pressable>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={skillModal}
                        onRequestClose={() => showskillModal(false)}>
                        <View style={profileStyles.overlay}>
                            <View style={profileStyles.sheet}>
                                <View style={profileStyles.handle}>
                                </View>
                                <View style={profileStyles.header}>
                                    <Text style={profileStyles.headerTitle}>
                                        Новый навык
                                    </Text>
                                    <Pressable style={profileStyles.closeButton}
                                        onPress={() => { showskillModal(false); setNewSkillname('') }}>
                                        <View style={profileStyles.closeIconWrapper}>
                                            <CloseIcon />
                                        </View>
                                    </Pressable>
                                </View>
                                <ScrollView style={profileStyles.scrollContent}
                                    showsVerticalScrollIndicator={false}>
                                    <KeyboardAvoidingView style={profileStyles.inputGroup}>
                                        <Text style={profileStyles.inputLabel}> Название навыка</Text>
                                        <Text style={newSkillname.length >= 20 ? profileStyles.charCounterWarn : profileStyles.charCounter}>{newSkillname.length}/25</Text>
                                        <TextInput
                                            style={[
                                                profileStyles.input,
                                                isFocused && profileStyles.inputFocused
                                            ]}
                                            onChangeText={(text) => { setNewSkillname(text) }}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            maxLength={25}

                                            placeholder="Например, React, Figma, Python...">
                                        </TextInput>
                                        {(newSkillError) && (
                                            <Text style={profileStyles.errorText}>
                                                Заполните все поля
                                            </Text>
                                        )}
                                        <Text style={profileStyles.levelLabel}>
                                            Уровень владения
                                        </Text>
                                        <View style={profileStyles.levelList}>
                                            <Pressable onPress={() => setNewSkillLevel('beginner')}
                                                style={newSkillLevel == 'beginner' ? profileStyles.levelCardActiveBeginner : profileStyles.levelCard}>
                                                <View style={profileStyles.levelDotBeginner}>
                                                    <View style={profileStyles.levelDotIconWrapper}>
                                                        <Text>🌱</Text>
                                                    </View>
                                                </View>
                                                <View style={profileStyles.levelCardText}>
                                                    <Text style={profileStyles.levelCardTitle}>Beginner</Text>
                                                    <Text style={profileStyles.levelCardSubtitle}>Знаком с основами, изучаю</Text>
                                                </View>
                                                <View style={newSkillLevel == 'beginner' ? profileStyles.radioOuterActive : profileStyles.radioOuter}>
                                                    {(newSkillLevel == 'beginner') && (
                                                        <View style={profileStyles.radioInner}>
                                                        </View>
                                                    )}
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={() => setNewSkillLevel('intermediate')}
                                                style={newSkillLevel == 'intermediate' ? profileStyles.levelCardActiveIntermediate : profileStyles.levelCard}>
                                                <View style={profileStyles.levelDotIntermediate}>
                                                    <View style={profileStyles.levelDotIconWrapper}>
                                                        <Text>⚡</Text>
                                                    </View>
                                                </View>
                                                <View style={profileStyles.levelCardText}>
                                                    <Text style={profileStyles.levelCardTitle}>Intermediate</Text>
                                                    <Text style={profileStyles.levelCardSubtitle}>Уверенно применяю на практике</Text>
                                                </View>
                                                <View style={newSkillLevel == 'intermediate' ? profileStyles.radioOuterActive : profileStyles.radioOuter}>
                                                    {(newSkillLevel == 'intermediate') && (
                                                        <View style={profileStyles.radioInner}>
                                                        </View>
                                                    )}
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={() => setNewSkillLevel('advanced')}
                                                style={newSkillLevel == 'advanced' ? profileStyles.levelCardActiveAdvanced : profileStyles.levelCard}>
                                                <View style={profileStyles.levelDotAdvanced}>
                                                    <View style={profileStyles.levelDotIconWrapper}>
                                                        <Text>🔥</Text>
                                                    </View>
                                                </View>
                                                <View style={profileStyles.levelCardText}>
                                                    <Text style={profileStyles.levelCardTitle}>Advanced</Text>
                                                    <Text style={profileStyles.levelCardSubtitle}>Экспертный уровень, обучаю других</Text>
                                                </View>
                                                <View style={newSkillLevel == 'advanced' ? profileStyles.radioOuterActive : profileStyles.radioOuter}>
                                                    {(newSkillLevel == 'advanced') && (
                                                        <View style={profileStyles.radioInner}>
                                                        </View>
                                                    )}
                                                </View>
                                            </Pressable>                                     </View>
                                    </KeyboardAvoidingView>
                                </ScrollView>
                                <View style={profileStyles.footer}>
                                    <Pressable style={(newSkillname.length == 0) ? profileStyles.saveButtonDisabled : profileStyles.saveButton}
                                        disabled={(newSkillname.length == 0)}
                                        onPress={() => { NewSkillAdd(); }}>
                                        <Text style={profileStyles.saveButtonText}>
                                            Сохранить
                                        </Text>
                                    </Pressable>
                                    <Pressable>

                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
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
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, i) => `${activeTab}-${i}`}
                        key={activeTab}
                        extraData={activeTab}
                        renderItem={({ item }) => (
                            <View style={{ width: Dimensions.get('window').width * 0.85 }}>
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
        </SafeAreaView >
    )
}

