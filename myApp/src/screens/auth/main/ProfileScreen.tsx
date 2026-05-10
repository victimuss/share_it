import { View, Text, ScrollView, Pressable, TextInput, FlatList, Dimensions, Modal, KeyboardAvoidingView, Alert } from "react-native";
import { homeStyles as homeStylesFn } from "@/src/styles/MainPageStyles";
import { TotalclearStore, useAuth } from "@/src/context/AuthContext";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { profileStyles as profileStylesFn } from "@/src/styles/ProfileStyles";
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
import { lessonEditorStyles as lessonEditorStylesFn } from "@/src/styles/NewSheetStyles";
import { useLessonStore } from "@/src/context/useLessonStore";
import { useSheetStore } from "@/src/context/useSheetStore";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';
import { useStyles } from '../../../hooks/useStyles';
import { useThemeStore } from '../../../context/useThemeStore';
import Svg, { Path } from 'react-native-svg';
import { Appearance } from 'react-native';

export const ProfileScreen = () => {
  const lessonEditorStyles = useStyles(lessonEditorStylesFn);
  const profileStyles = useStyles(profileStylesFn);
  const homeStyles = useStyles(homeStylesFn);
  const { colors } = useThemeStore(s => s.theme);
    const { t } = useTranslation();
    const { user, edit, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [newSkillname, setNewSkillname] = useState('')
    const [newSkillError, setNewSkillError] = useState(false)
    const [newSkillLevel, setNewSkillLevel] = useState('beginner')
    const [skills, setSkills] = useState<Skill[]>([]);
    const [skillModal, showskillModal] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
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
            const [skillResponse, completedResponse, getMyLessons] = user
                ? await Promise.all([
                    GetUserSkills(),
                    UsersLearned(),
                    UsersMaked()
                ])
                : [null, null, null];
            setSkills(skillResponse || []);
            if (completedResponse) {
                const completedProgress = completedResponse.learnLessons.filter(p => p.status === 'COMPLETED');
                const inProgressProgress = completedResponse.learnLessons.filter(p => p.status === 'IN_PROGRESS');
                const completedIds = completedProgress.map(p => p.lesson_id);
                const inProgressIds = inProgressProgress.map(p => p.lesson_id);
                setCompletedLessons({
                    learnLessons: completedProgress,
                    lessons: completedResponse.lessons.filter(lesson => completedIds.includes(lesson.id))
                });
                setLessons({
                    learnLessons: inProgressProgress,
                    lessons: completedResponse.lessons.filter(lesson => inProgressIds.includes(lesson.id))
                });
            }
            setMyLessons(getMyLessons || { lessons: [] });
        } catch (err: any) {
            console.error(err);
            setError(t('screens.profile.errors.loadData'));
        } finally {
            setLoading(false);
        }
    };

    const NewSkillAdd = async () => {
        setLoading(true);
        try {
            const skillResponse = user ? await NewSkillapi({ skill_name: newSkillname, level: newSkillLevel }) : null
            Alert.alert(t('screens.profile.alerts.addSuccess'))
            fetchData()
            setNewSkillname('')
            showskillModal(false)
        } catch (err: any) {
            console.error(err);
            setError(t('screens.profile.errors.loadLessons'));
        } finally {
            setLoading(false);
        }

    }

    const EditUserFetch = async () => {
        setLoading(true)
        if (editUserName.length <= 3) {
            Alert.alert(t('screens.profile.errors.nameTooShort'))
            return
        }
        try {
            const editResponse = user ? await EditUserAPI({ user_name: editUserName, description: editDescription, tag: editTag, site: editSite, telegram: editTelegram, avatar: editAvatar }) : null
            // Обновляем данные в AuthContext — все экраны, читающие user, обновятся мгновенно
            edit(editUserName, editDescription, editTag, editSite, editTelegram, editAvatar)
            Alert.alert(t('screens.profile.alerts.editSuccess'))
            fetchData()
            showeditModal(false)
        } catch (err: any) {
            console.error(err);
            setError(t('screens.profile.errors.editFailed'));
            Alert.alert(t('screens.profile.errors.errorTitle'), t('screens.profile.errors.editFailed'))
        } finally {
            setLoading(false);
        }
    }
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, [t]);
    const { mode, setThemeMode, theme } = useThemeStore();

    const toggleTheme = () => {
        // Определяем текущее состояние (даже если оно системное)
        const isDark = mode === 'dark' || (mode === 'system' && Appearance.getColorScheme() === 'dark');
        setThemeMode(isDark ? 'light' : 'dark');
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    if (loading) {
        return <LoadScreen></LoadScreen>
    }

    return (
        <SafeAreaView style={profileStyles.container} edges={['top']}>
            <ScrollView style={profileStyles.scrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.accent]}
                        tintColor={colors.accent}
                        title={t('screens.profile.refresh')}
                        titleColor={colors.accent}
                    />
                }>
                <View style={profileStyles.coverBanner}>
                    <View style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable 
                            onPress={toggleTheme}
                            style={({ pressed }) => [
                                {
                                    width: 36,
                                    height: 36,
                                    borderRadius: 18,
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 10,
                                    opacity: pressed ? 0.7 : 1
                                }
                            ]}
                        >
                            {(mode === 'dark' || (mode === 'system' && Appearance.getColorScheme() === 'dark')) ? (
                                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
                                    <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                                </Svg>
                            ) : (
                                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
                                    <Path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                    <Path d="M12 2v2" />
                                    <Path d="M12 20v2" />
                                    <Path d="M4.22 4.22l1.42 1.42" />
                                    <Path d="M18.36 18.36l1.42 1.42" />
                                    <Path d="M2 12h2" />
                                    <Path d="M20 12h2" />
                                    <Path d="M4.22 19.78l1.42-1.42" />
                                    <Path d="M18.36 5.64l1.42-1.42" />
                                </Svg>
                            )}
                        </Pressable>
                        <LanguageSwitcher />
                    </View>
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
                        <Text style={profileStyles.editButtonText}>{t('screens.profile.editProfile')}</Text>
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
                                        {t('screens.profile.editProfile')}
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
                                                onPress={() => { Alert.alert(t('screens.profile.alerts.comingSoonTitle'), t('screens.profile.alerts.comingSoonText')) }}
                                                numberOfLines={1}>
                                                {t('screens.profile.changePhoto')}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={profileStyles.formGroupTitle}>
                                            {t('screens.profile.form.mainTitle')}
                                        </Text>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                {t('screens.profile.form.nameLabel')}
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editUserName}
                                                onChangeText={setEditUserName}
                                                placeholder={t('screens.profile.form.namePlaceholder')}
                                                placeholderTextColor={colors.textSecondary}
                                            />
                                        </View>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                {t('screens.profile.form.descriptionLabel')}
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editDescription}
                                                onChangeText={setEditDescription}
                                                placeholder={t('screens.profile.form.descriptionPlaceholder')}
                                                placeholderTextColor={colors.textSecondary}
                                            />
                                        </View>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                {t('screens.profile.form.tagLabel')}
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editTag}
                                                onChangeText={setEditTag}
                                                placeholder={t('screens.profile.form.tagPlaceholder')}
                                                placeholderTextColor={colors.textSecondary}
                                            />
                                        </View>
                                        <View style={profileStyles.formDivider} />
                                        <Text style={profileStyles.formGroupTitle}>
                                            {t('screens.profile.form.contactsTitle')}
                                        </Text>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                {t('screens.profile.form.siteLabel')}
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editSite}
                                                onChangeText={setEditSite}
                                                placeholder={'https://...'}
                                                placeholderTextColor={colors.textSecondary}
                                            />
                                        </View>
                                        <View>
                                            <Text style={profileStyles.inputLabel}>
                                                {t('screens.profile.form.telegramLabel')}
                                            </Text>
                                            <TextInput
                                                style={profileStyles.input}
                                                value={editTelegram}
                                                onChangeText={setEditTelegram}
                                                placeholder={'@username'}
                                                placeholderTextColor={colors.textSecondary}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                                <View style={profileStyles.footer}>
                                    <Pressable style={(editUserName.length <= 3) ? profileStyles.saveButtonDisabled : profileStyles.saveButton}
                                        disabled={(editUserName.length <= 3)}
                                        onPress={() => { EditUserFetch(); }}>
                                        <Text style={profileStyles.saveButtonText}>
                                            {t('screens.profile.buttons.save')}
                                        </Text>
                                    </Pressable>
                                    <Pressable style={{ backgroundColor: 'red', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => { logout(); }}>
                                        <Text style={[{ color: colors.text, fontSize: 16, fontWeight: '600' }]}>
                                            {t('screens.profile.buttons.logout')}
                                        </Text>
                                    </Pressable>
                                    <Pressable style={{ backgroundColor: 'red', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
                                        onPress={() => { useLessonStore.getState().clearStore(); useSheetStore.getState().clearLesson(); Alert.alert(t('screens.profile.alerts.draftResetTitle'), t('screens.profile.alerts.draftResetText')) }}>
                                        <Text style={[{ color: colors.text, fontSize: 16, fontWeight: '600' }]}>
                                            {t('screens.profile.buttons.resetDraft')}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={profileStyles.statsRow}>
                    <View style={profileStyles.statItem}>
                        <Text style={profileStyles.statValue}>{myLessons?.lessons.length}</Text>
                        <Text style={profileStyles.statLabel}>{t('screens.profile.stats.createdLessons')}</Text>
                    </View>
                    <View style={profileStyles.statItem}>
                        <Text style={profileStyles.statValue}>{Lessons?.lessons.length}</Text>
                        <Text style={profileStyles.statLabel}>{t('screens.profile.stats.studying')}</Text>
                    </View>
                    <View style={profileStyles.statItem}>
                        <Text style={profileStyles.statValue}>{user?.us_likes}</Text>
                        <Text style={profileStyles.statLabel}>{t('screens.profile.stats.likes')}</Text>
                    </View>
                </View>
                <View style={profileStyles.section}>
                    <View style={profileStyles.sectionHeader}>
                        <Text style={profileStyles.sectionTitle}>
                            {t('screens.profile.skills.title')}
                        </Text>
                        <Pressable>
                            <Text style={profileStyles.sectionAction}
                                onPress={((pressed) => showskillModal(true))}>{t('screens.profile.skills.addBtn')}</Text>
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
                                        {t('screens.profile.skills.newSkillTitle')}
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
                                        <Text style={profileStyles.inputLabel}> {t('screens.profile.skills.skillNameLabel')}</Text>
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

                                            placeholder={t('screens.profile.skills.skillNamePlaceholder')}>
                                        </TextInput>
                                        {(newSkillError) && (
                                            <Text style={profileStyles.errorText}>
                                                {t('screens.profile.errors.fillAllFields')}
                                            </Text>
                                        )}
                                        <Text style={profileStyles.levelLabel}>
                                            {t('screens.profile.skills.levelLabel')}
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
                                                    <Text style={profileStyles.levelCardTitle}>{t('screens.profile.skills.levels.beginnerTitle')}</Text>
                                                    <Text style={profileStyles.levelCardSubtitle}>{t('screens.profile.skills.levels.beginnerSubtitle')}</Text>
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
                                                    <Text style={profileStyles.levelCardTitle}>{t('screens.profile.skills.levels.intermediateTitle')}</Text>
                                                    <Text style={profileStyles.levelCardSubtitle}>{t('screens.profile.skills.levels.intermediateSubtitle')}</Text>
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
                                                    <Text style={profileStyles.levelCardTitle}>{t('screens.profile.skills.levels.advancedTitle')}</Text>
                                                    <Text style={profileStyles.levelCardSubtitle}>{t('screens.profile.skills.levels.advancedSubtitle')}</Text>
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
                                            {t('screens.profile.buttons.save')}
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
                        <Text style={activeTab === 'myLessons' ? profileStyles.tabTextActive : profileStyles.tabText}>{t('screens.profile.tabs.created')}({myLessons.lessons.length})</Text>
                    </Pressable>
                    <Pressable style={activeTab === 'Lessons' ? profileStyles.tabActive : profileStyles.tab}
                        onPress={() => { setActivebTab('Lessons') }}>

                        <Text style={activeTab === 'Lessons' ? profileStyles.tabTextActive : profileStyles.tabText}>{t('screens.profile.tabs.studying')}({Lessons.learnLessons.length})</Text>
                    </Pressable>
                    <Pressable style={activeTab === 'completedLessons' ? profileStyles.tabActive : profileStyles.tab}
                        onPress={() => { setActivebTab('completedLessons') }}>
                        <Text style={activeTab === 'completedLessons' ? profileStyles.tabTextActive : profileStyles.tabText}>{t('screens.profile.tabs.completed')}({completedLessons.learnLessons.length})</Text>
                    </Pressable>
                </View>
                <View style={profileStyles.section}>
                    <FlatList
                        data={activeTab === 'myLessons' ? myLesColumn : activeTab === 'Lessons' ? lesColumn : activeTab === 'completedLessons' ? completedColumn : []}
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
