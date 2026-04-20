import { View, Text, ScrollView, Pressable, TextInput, FlatList } from "react-native";
import { homeStyles } from "@/src/styles/MainPageStyles";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS } from "@/src/styles/root";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadScreen } from "./LoadScreen";
import { ErrorScreen } from "./ErrorScreen";
import { Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { useNavigation } from "expo-router";
import { ApplicationCodeIcon, BellIcon, BusinessIcon, DesignPaletteIcon, LanguageIcon, PlayIcon } from "@/src/SVG/MainPageSVG";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/appNavigator";
export const MainScreen = () => {
  const { user } = useAuth();
  const id = user ? user.id : 0 <CurrentLessonRequest | null>(null);
  const [activeFilter, setActiveFilter] = useState<LessonType>(null)
  const [popular, setPopular] = useState<PopularLessonsResponce | null>(null);;
  const [recent, setRecent] = useState<RecentLessonsResponce | null>(null);
  const [current, setCurrent] = useState<currentLessonResponce | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigator = useNavigation();
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'MyLessons'>;
  const date = new Date();
  const iconMap: Record<string, React.ReactNode> = {
    code: <ApplicationCodeIcon size={50} />,
    design: <DesignPaletteIcon size={50} />,
    language: <LanguageIcon size={50} />,
    business: <BusinessIcon size={50} />,
  };
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

      // Загружаем новые данные
      const popResponse = await PopularLession({ type: filter });
      const recResponse = await RecentLession({ type: filter });
      // Если API возвращает объекты с массивами уроков
      setPopular(popResponse || []);
      setRecent(recResponse || []);
      console.log('Популярные:', popResponse, 'Недавние:', recResponse);
    } catch (err: any) {
      console.error('Ошибка при загрузке уроков:', err);
      setError('Не удалось загрузить уроки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };
  const [authors, setAuthors] = useState<Record<string, string>>({});
  useEffect(() => {
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
        setError('Не удалось загрузить уроки. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, activeFilter]);
  const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);
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
    <SafeAreaView style={homeStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={homeStyles.scrollContainer}>
        <View style={homeStyles.header}>
          <View style={homeStyles.headerLeft}>
            <Text style={homeStyles.greetingSubtext}>
              {formattedDate}
            </Text>
            <Text style={homeStyles.greetingText}>
              Привет, {user?.name || 'Гость'}
            </Text>
            <Text style={homeStyles.greetingSubtext}>
              Что изучим сегодня?
            </Text>
          </View>
          <View style={homeStyles.headerRight}>
            <Pressable style={homeStyles.notificationButton}>
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
              placeholder="Найти урок или навык..."
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
                homeStyles.chip, // базовый стиль
                activeFilter === null && homeStyles.chipActive, // стиль активного фильтра
                pressed && homeStyles.chipActive, // стиль при нажатии
              ]}
              onPress={() => handleFilterChange(null)}
            >
              <Text style={activeFilter === null ? homeStyles.chipTextActive : homeStyles.chipText}>Все</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                homeStyles.chip, // базовый стиль
                activeFilter === 'code' && homeStyles.chipActive, // стиль активного фильтра
                pressed && homeStyles.chipActive, // стиль при нажатии
              ]}
              onPress={() => handleFilterChange('code')}
            >
              <Text style={activeFilter === 'code' ? homeStyles.chipTextActive : homeStyles.chipText}>Код</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                homeStyles.chip, // базовый стиль
                activeFilter === 'design' && homeStyles.chipActive, // стиль активного фильтра
                pressed && homeStyles.chipActive, // стиль при нажатии
              ]}
              onPress={() => handleFilterChange('design')}
            >
              <Text style={activeFilter === 'design' ? homeStyles.chipTextActive : homeStyles.chipText}>Дизайн</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                homeStyles.chip, // базовый стиль
                activeFilter === 'language' && homeStyles.chipActive, // стиль активного фильтра
                pressed && homeStyles.chipActive, // стиль при нажатии
              ]}
              onPress={() => handleFilterChange('language')}
            >
              <Text style={activeFilter === 'language' ? homeStyles.chipTextActive : homeStyles.chipText}>Языки</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                homeStyles.chip, // базовый стиль
                activeFilter === 'business' && homeStyles.chipActive, // стиль активного фильтра
                pressed && homeStyles.chipActive, // стиль при нажатии
              ]}
              onPress={() => handleFilterChange('business')}
            >
              <Text style={activeFilter === 'business' ? homeStyles.chipTextActive : homeStyles.chipText}>Бизнес</Text>
            </Pressable>
          </ScrollView>
        </View>
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Популярное</Text>
            <Pressable>
              <Text style={homeStyles.seeAllText}
                onPress={(pressed) => navigator.navigate('Search')}>Все→</Text>
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
              const authorName = item.author ? item.author : 'Неизвестен';
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
                    <Text style={homeStyles.featuredCardAuthor}> {authorName} · {less.students_count} обучаются</Text>
                  </View>
                </Pressable>
              );
            }}
          ></FlatList>
        </View>
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Продолжить обучение</Text>
          </View>
          {current?.last_lession?.last_lession ? (
            <Pressable style={homeStyles.progressCard}
              onPress={() => navigator.navigate('LessonMainScreen', { lessonId: current?.last_lession?.lesson.id })}>
              <View style={homeStyles.progressCardHeader}>
                <PlayIcon></PlayIcon>
                <Text style={homeStyles.progressCardTitle}>{current?.last_lession?.lesson?.lesson_name || 'Нет текущего урока'}</Text>
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
              <Text style={homeStyles.progressCardTitle} >Нет текущего урока</Text>
            </View>
          )}
        </View>
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Новые уроки</Text>
            <Pressable>
              <Text style={homeStyles.seeAllText}
                onPress={(pressed) => navigator.navigate('Search')}>Все→</Text>
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
                      <Text style={homeStyles.lessonCardLikes}> {item.author ? item.author : 'Неизвестен'} · ❤️ {less.likes}</Text>
                    </View>
                  </View>
                  <Pressable style={homeStyles.studyButton}
                    onPress={() => navigator.navigate('LessonMainScreen', { lessonId: less.id })}>
                    <Text style={homeStyles.studyButtonText}>Изучить</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
