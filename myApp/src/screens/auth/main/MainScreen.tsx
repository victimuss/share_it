import { View, Text, ScrollView, Pressable, TextInput, FlatList, Alert, Linking } from "react-native";
import { homeStyles } from "@/src/styles/MainPageStyles";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS } from "@/src/styles/root";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadScreen } from "./LoadScreen";
import { ErrorScreen } from "./ErrorScreen";
import { Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest, CurrentLessonResponse } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { useNavigation } from "expo-router";
import { ApplicationCodeIcon, BellIcon, BusinessIcon, DesignPaletteIcon, LanguageIcon, PlayIcon } from "@/src/SVG/MainPageSVG";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/appNavigator";
import { useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { TelegramNotificationModal } from "@/src/components/TelegramNotificationModal";
import { useTranslation } from "react-i18next";

export const MainScreen = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const id = user ? user.id : 0 <CurrentLessonRequest | null>(null);
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
      <LoadScreen />

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
              colors={[COLORS.accent]}
              tintColor={COLORS.accent}
              title={t('screens.main.refresh')}
              titleColor={COLORS.accent}
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
                onPress={() => {
                  try {
                    const url = require('expo-linking').createURL('lesson/1');
                    require('expo-linking').openURL(url);
                  } catch (err) {
                    console.error("Ошибка при открытии ссылки", err);
                  }
                }}>
                <Text style={{ color: 'white', fontSize: 10 }}>LINK</Text>
              </Pressable>
              <Pressable style={homeStyles.notificationButton}
                onPress={() => setShowTgModal(true)}>
                <BellIcon></BellIcon>
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
              contentContainerStyle={homeStyles.filtersScrollContent}>
              <Pressable
                style={({ pressed }) => [
                  homeStyles.chip,
                  activeFilter === null && homeStyles.chipActive,
                  pressed && homeStyles.chipActive,
                ]}
                onPress={() => handleFilterChange(null)}
              >
                <Text style={activeFilter === null ? homeStyles.chipTextActive : homeStyles.chipText}>{t('screens.main.filters.all')}</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  homeStyles.chip,
                  activeFilter === 'code' && homeStyles.chipActive,
                  pressed && homeStyles.chipActive,
                ]}
                onPress={() => handleFilterChange('code')}
              >
                <Text style={activeFilter === 'code' ? homeStyles.chipTextActive : homeStyles.chipText}>{t('screens.main.filters.code')}</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  homeStyles.chip,
                  activeFilter === 'design' && homeStyles.chipActive,
                  pressed && homeStyles.chipActive,
                ]}
                onPress={() => handleFilterChange('design')}
              >
                <Text style={activeFilter === 'design' ? homeStyles.chipTextActive : homeStyles.chipText}>{t('screens.main.filters.design')}</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  homeStyles.chip,
                  activeFilter === 'language' && homeStyles.chipActive,
                  pressed && homeStyles.chipActive,
                ]}
                onPress={() => handleFilterChange('language')}
              >
                <Text style={activeFilter === 'language' ? homeStyles.chipTextActive : homeStyles.chipText}>{t('screens.main.filters.language')}</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  homeStyles.chip, // базовый стиль
                  activeFilter === 'business' && homeStyles.chipActive, // стиль активного фильтра
                  pressed && homeStyles.chipActive, // стиль при нажатии
                ]}
                onPress={() => handleFilterChange('business')}
              >
                <Text style={activeFilter === 'business' ? homeStyles.chipTextActive : homeStyles.chipText}>{t('screens.main.filters.business')}</Text>
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
                  <Pressable style={homeStyles.featuredCard}
                    onPress={() => navigator.navigate('LessonMainScreen', { lessonId: less.id })}>
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
              <Pressable style={homeStyles.progressCard}
                onPress={() => navigator.navigate('LessonMainScreen', { lessonId: current?.last_lession?.lesson.id })}>
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
                    <Pressable style={homeStyles.studyButton}
                      onPress={() => navigator.navigate('LessonMainScreen', { lessonId: less.id })}>
                      <Text style={homeStyles.studyButtonText}>{t('screens.main.studyButton')}</Text>
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
