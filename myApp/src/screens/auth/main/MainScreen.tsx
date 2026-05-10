import { View, Text, ScrollView, Pressable, TextInput, FlatList, Alert, Linking } from "react-native";
import { homeStyles as homeStylesFn } from "@/src/styles/MainPageStyles";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainScreenSkeleton } from "@/src/components/MainScreenSkeleton";
import { ErrorScreen } from "./ErrorScreen";
import { Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest, CurrentLessonResponse } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { useNavigation } from "expo-router";
import { ApplicationCodeIcon, BellIcon, BusinessIcon, DesignPaletteIcon, LanguageIcon, PlayIcon } from "@/src/SVG/MainPageSVG";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/appNavigator";
import { useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { MotiView } from 'moti';
import { TelegramNotificationModal } from "@/src/components/TelegramNotificationModal";
import { useTranslation } from "react-i18next";
import { useStyles } from '../../../hooks/useStyles';
import { useThemeStore } from '../../../context/useThemeStore';

export const MainScreen = () => {
  const homeStyles = useStyles(homeStylesFn);
  const { colors } = useThemeStore(s => s.theme);
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<LessonType>(null)
  const [popular, setPopular] = useState<PopularLessonsResponce | null>(null);;
  const [recent, setRecent] = useState<RecentLessonsResponce | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [current, setCurrent] = useState<CurrentLessonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTgModal, setShowTgModal] = useState(false);
  const navigator = useNavigation();
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'MyLessons'>;
  const date = new Date();
  const iconMap: Record<string, React.ReactNode> = {
    code: <ApplicationCodeIcon size={50} />,
    design: <DesignPaletteIcon size={50} />,
    language: <LanguageIcon size={50} />,
    business: <BusinessIcon size={50} />,
  };
  const linkTo = require('@react-navigation/native').useLinkTo();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',   // день недели полностью
    day: 'numeric',    // число месяца
    month: 'long',     // название месяца полностью
  };
  const handleFilterChange = async (filter: LessonType) => {
    try {
      // Сбрасываем данные и ставим loading
      setActiveFilter(filter);
      setPopular([]);
      setRecent([]);
      setCurrent(null);
      setError('');
      setLoading(true);


      const popResponse = await PopularLession({ type: filter });
      const recResponse = await RecentLession({ type: filter });
      const curResponse = user ? await CurrentLession({ id: user.id }) : null;

      setPopular(popResponse || []);
      setRecent(recResponse || []);
      setCurrent(curResponse || []);
      console.log('Популярные:', popResponse, 'Недавние:', recResponse);
    } catch (err: any) {
      console.error('Ошибка при загрузке уроков:', err);
      setError(t('screens.main.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const popResponse = await PopularLession({ type: activeFilter });
      const recResponse = await RecentLession({ type: activeFilter });
      const curResponse = user ? await CurrentLession({ id: user.id }) : null;
      setPopular(popResponse || null);
      setRecent(recResponse || null);
      setCurrent(curResponse || null);
      console.log('ПОПУДЯ', current)
    } catch (err: any) {
      console.error(err);
      setError(t('screens.main.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await handleFilterChange(null);
    setRefreshing(false);
  }, []);
  useEffect(() => {
    fetchData();

    const handleDeepLink = (url: string | null) => {
      if (!url) return;
      console.log("ПЕРЕХВАЧЕНА ССЫЛКА:", url);
      const expoLinking = require('expo-linking');
      const parsed = expoLinking.parse(url);
      const path = parsed.path ? parsed.path.replace(/^\/?--\//, '') : '';
      console.log("ОЧИЩЕННЫЙ ПУТЬ:", path);

      if (path === 'my-lessons') {
        console.log("ПРИНУДИТЕЛЬНЫЙ ПЕРЕХОД НА МОИ УРОКИ");
        setTimeout(() => {
          (navigator as any).navigate('MainTabs', { screen: 'MyLessons' });
        }, 500); // Даем экрану отрендериться
      } else {
        const match = path.match(/lessons?\/(\d+)/);
        if (match && match[1]) {
          const lessonId = parseInt(match[1], 10);
          console.log("ПРИНУДИТЕЛЬНЫЙ ПЕРЕХОД НА УРОК:", lessonId);
          setTimeout(() => {
            (navigator as any).navigate('LessonMainScreen', { lessonId });
          }, 500);
        }
      }
    };

    const expoLinking = require('expo-linking');
    expoLinking.getInitialURL().then(handleDeepLink);
    const sub = expoLinking.addEventListener('url', ({ url }: { url: string }) => handleDeepLink(url));

    return () => sub.remove();
  }, [user, activeFilter]);

  const formattedDate = new Intl.DateTimeFormat(i18n.language || 'ru-RU', options).format(date);
  if (error) {
    return (
      <View>
        <Text> {error} </Text>
      </View>
    )
  }

  if (loading) {
    return (
      <MainScreenSkeleton />

    )
  }

  if (error) {
    return (
      <ErrorScreen />
    )
  }

  return (
    <>
      <SafeAreaView style={homeStyles.container} edges={['top']}>
        <ScrollView contentContainerStyle={homeStyles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.accent]}
              tintColor={colors.accent}
              title={t('screens.main.refresh')}
              titleColor={colors.accent}
            />
          }>
          <View style={homeStyles.header}>
            <View style={homeStyles.headerLeft}>
              <Text style={homeStyles.greetingSubtext}>
                {formattedDate}
              </Text>
              <Text style={homeStyles.greetingText}>
                {t('screens.main.greeting')}{user?.name || t('screens.main.guest')}
              </Text>
              <Text style={homeStyles.greetingSubtext}>
                {t('screens.main.whatToLearn')}
              </Text>
            </View>
            <View style={homeStyles.headerRight}>
              <Pressable style={homeStyles.notificationButton}
                onPress={() => setShowTgModal(true)}>
                <BellIcon color={colors.primary}></BellIcon>
              </Pressable>
              <Pressable style={homeStyles.avatar}
                onPress={() => { navigator.navigate('Profile') }}>
                <Text style={homeStyles.avatarText}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={homeStyles.searchWrapper}>
            <View style={homeStyles.searchContainer}>
              <TextInput
                style={homeStyles.searchInput}
                placeholder={t('screens.main.searchPlaceholder')}
                placeholderTextColor={'#6B7280'}
                returnKeyType="search"
                onSubmitEditing={(e) => (navigator as any).navigate('Search', { search: e.nativeEvent.text })}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={homeStyles.filtersScrollContent}
            >
              <Pressable onPress={() => handleFilterChange(null)}>
                <MotiView
                  animate={{
                    backgroundColor: activeFilter === null ? colors.primary : colors.surface,
                    borderColor: activeFilter === null ? colors.primary : colors.border,
                  }}
                  transition={{ type: 'timing', duration: 200 }}
                  style={homeStyles.chip}
                >
                  <Text style={activeFilter === null ? homeStyles.chipTextActive : homeStyles.chipText}>
                    {t('screens.main.filters.all')}
                  </Text>
                </MotiView>
              </Pressable>

              <Pressable onPress={() => handleFilterChange('code')}>
                <MotiView
                  animate={{
                    backgroundColor: activeFilter === 'code' ? colors.primary : colors.surface,
                    borderColor: activeFilter === 'code' ? colors.primary : colors.border,
                  }}
                  transition={{ type: 'timing', duration: 200 }}
                  style={homeStyles.chip}
                >
                  <Text style={activeFilter === 'code' ? homeStyles.chipTextActive : homeStyles.chipText}>
                    {t('screens.main.filters.code')}
                  </Text>
                </MotiView>
              </Pressable>

              <Pressable onPress={() => handleFilterChange('design')}>
                <MotiView
                  animate={{
                    backgroundColor: activeFilter === 'design' ? colors.primary : colors.surface,
                    borderColor: activeFilter === 'design' ? colors.primary : colors.border,
                  }}
                  transition={{ type: 'timing', duration: 200 }}
                  style={homeStyles.chip}
                >
                  <Text style={activeFilter === 'design' ? homeStyles.chipTextActive : homeStyles.chipText}>
                    {t('screens.main.filters.design')}
                  </Text>
                </MotiView>
              </Pressable>

              <Pressable onPress={() => handleFilterChange('language')}>
                <MotiView
                  animate={{
                    backgroundColor: activeFilter === 'language' ? colors.primary : colors.surface,
                    borderColor: activeFilter === 'language' ? colors.primary : colors.border,
                  }}
                  transition={{ type: 'timing', duration: 200 }}
                  style={homeStyles.chip}
                >
                  <Text style={activeFilter === 'language' ? homeStyles.chipTextActive : homeStyles.chipText}>
                    {t('screens.main.filters.language')}
                  </Text>
                </MotiView>
              </Pressable>

              <Pressable onPress={() => handleFilterChange('business')}>
                <MotiView
                  animate={{
                    backgroundColor: activeFilter === 'business' ? colors.primary : colors.surface,
                    borderColor: activeFilter === 'business' ? colors.primary : colors.border,
                  }}
                  transition={{ type: 'timing', duration: 200 }}
                  style={homeStyles.chip}
                >
                  <Text style={activeFilter === 'business' ? homeStyles.chipTextActive : homeStyles.chipText}>
                    {t('screens.main.filters.business')}
                  </Text>
                </MotiView>
              </Pressable>
            </ScrollView>
          </View>
          <View style={homeStyles.section}>
            <View style={homeStyles.sectionHeader}>
              <Text style={homeStyles.sectionTitle}>{t('screens.main.popularTitle')}</Text>
              <Pressable>
                <Text style={homeStyles.seeAllText}
                  onPress={(pressed) => navigator.navigate('Search')}>{t('screens.main.seeAll')}</Text>
              </Pressable>
            </View>
            <FlatList
              data={popular?.popularLessons || []}// делаем единый массив всех уроков
              keyExtractor={(item: any) => item.lesson ? item.lesson.id.toString() : item.id?.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={homeStyles.featuredScrollContent}
              renderItem={({ item }: { item: any }) => {
                const less = item.lesson || item;
                const authorName = item.author ? item.author : t('screens.main.unknownAuthor');
                return (
                  <Pressable
                    onPress={() => navigator.navigate('LessonMainScreen', { lessonId: less.id })}
                  >
                    {({ pressed }) => (
                      <MotiView
                        animate={{
                          scale: pressed ? 0.98 : 1,
                          opacity: pressed ? 0.9 : 1,
                        }}
                        transition={{
                          type: 'spring',
                          damping: 10,
                          stiffness: 200,
                        }}
                        style={homeStyles.featuredCard}
                      >
                        <View style={homeStyles.featuredCardImage}>
                          <View style={homeStyles.featuredCardContent}>
                            <View style={homeStyles.featuredCardMeta}>
                              <View style={homeStyles.badgeCategory}>
                                <Text style={homeStyles.badgeCategoryText}>{less.type}</Text>
                              </View>
                              <Text style={homeStyles.badgeCategoryText}> {less.rank_count > 0 ? Math.round(less.rank / less.rank_count) : 0} ⭐</Text>
                            </View>
                          </View>
                        </View>
                        <View style={homeStyles.featureCardContainer}>
                          <Text style={homeStyles.featuredCardTitle}>{less.lesson_name}</Text>
                          <Text style={homeStyles.featuredCardAuthor}> {authorName} · {less.students_count} {t('screens.main.studentsCount')}</Text>
                        </View>
                      </MotiView>
                    )}
                  </Pressable>
                );
              }}
            ></FlatList>
          </View>
          <View style={homeStyles.section}>
            <View style={homeStyles.sectionHeader}>
              <Text style={homeStyles.sectionTitle}>{t('screens.main.continueLearning')}</Text>
            </View>
            {current?.last_lession?.last_lession ? (
              <Pressable
                onPress={() => navigator.navigate('LessonMainScreen', { lessonId: current?.last_lession?.lesson.id })}
              >
                {({ pressed }) => (
                  <MotiView
                    animate={{
                      scale: pressed ? 0.98 : 1,
                    }}
                    transition={{
                      type: 'spring',
                      damping: 10,
                      stiffness: 200,
                    }}
                    style={homeStyles.progressCard}
                  >
                    <View style={homeStyles.progressCardHeader}>
                      <PlayIcon></PlayIcon>
                      <Text style={homeStyles.progressCardTitle}>{current?.last_lession?.lesson?.lesson_name || t('screens.main.noCurrentLesson')}</Text>
                      <Text style={homeStyles.progressLabel}>{Math.ceil((current.last_lession?.last_lession?.completed_steps / current?.last_lession?.lesson.sheet_counts) * 100) || 0}%</Text>
                    </View>
                    <View style={homeStyles.progressTrack}>
                      <View style={[
                        homeStyles.progressFill,
                        { width: `${Math.ceil((current.last_lession?.last_lession?.completed_steps / current?.last_lession?.lesson.sheet_counts) * 100)}%` }
                      ]} />
                    </View>
                  </MotiView>
                )}
              </Pressable>
            ) : (
              <View style={homeStyles.progressCard}>
                <Text style={homeStyles.progressCardTitle} >{t('screens.main.noCurrentLesson')}</Text>
              </View>
            )}
          </View>
          <View style={homeStyles.section}>
            <View style={homeStyles.sectionHeader}>
              <Text style={homeStyles.sectionTitle}>{t('screens.main.newLessonsTitle')}</Text>
              <Pressable>
                <Text style={homeStyles.seeAllText}
                  onPress={(pressed) => navigator.navigate('Search')}>{t('screens.main.seeAll')}</Text>
              </Pressable>
            </View>
            <View>
              {(recent?.recentLessons || []).map((item: any) => {
                const less = item.lesson || item;
                return (
                  <View key={less.id} style={[homeStyles.lessonCard]}>
                    <View style={homeStyles.lessonCardThumb}>
                      {iconMap[less.type || 'code'] || null}
                    </View>
                    <View style={homeStyles.lessonCardContent}>
                      <Text style={homeStyles.lessonCardTitle}>{less.lesson_name}</Text>
                      <View style={homeStyles.lessonCardMeta}>
                        <View style={less.level === 'Beginner' ? homeStyles.badgeBeginner : less.level === 'Intermediate' ? homeStyles.badgeIntermediate : less.level === 'Advanced' ? homeStyles.badgeAdvanced :
                          homeStyles.badgeCategory}>
                          <Text style={less.level === 'Beginner' ? homeStyles.badgeBeginnerText : less.level === 'Intermediate' ? homeStyles.badgeIntermediateText : less.level === 'Advanced' ? homeStyles.badgeAdvancedText : homeStyles.badgeCategoryText}>{less.level}</Text>
                        </View>
                        <View style={homeStyles.badge}>
                          <Text style={homeStyles.badgeCategoryText}>{less.type}</Text>
                        </View>
                      </View>
                      <View style={homeStyles.lessonCardFooter}>
                        <Text style={homeStyles.lessonCardLikes}> {item.author ? item.author : t('screens.main.unknownAuthor')} · ❤️ {less.likes}</Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => navigator.navigate('LessonMainScreen', { lessonId: less.id })}
                    >
                      {({ pressed }) => (
                        <MotiView
                          animate={{
                            scale: pressed ? 0.94 : 1,
                            opacity: pressed ? 0.85 : 1,
                          }}
                          transition={{
                            type: 'spring',
                            damping: 10,
                            stiffness: 200,
                          }}
                          style={homeStyles.studyButton}
                        >
                          <Text style={homeStyles.studyButtonText}>{t('screens.main.studyButton')}</Text>
                        </MotiView>
                      )}
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <TelegramNotificationModal
        visible={showTgModal}
        onActivate={() => {
          setShowTgModal(false);
        }}
        onSkip={() => setShowTgModal(false)}
      />
    </>
  );
};
