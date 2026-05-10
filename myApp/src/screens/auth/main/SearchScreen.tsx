import { View, Text, ScrollView, Pressable, TextInput, FlatList, Modal } from "react-native";
import { MotiView } from 'moti';
import { homeStyles as homeStylesFn } from "@/src/styles/MainPageStyles";
import { useAuth } from "@/src/context/AuthContext";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Lesson, LessonType, PopularLessonsResponce, RecentLessonsResponce, CurrentLessonRequest, SearchStackParamList } from "@/src/types/main_page";
import { CurrentLession, getAuthor, PopularLession, RecentLession } from "@/src/api/main_page/main_page";
import { useNavigation } from "expo-router";
import { ApplicationCodeIcon, BellIcon, BusinessIcon, DesignPaletteIcon, LanguageIcon, PlayIcon } from "@/src/SVG/MainPageSVG";
import { searchStyles as searchStylesFn } from "@/src/styles/SearchStyles";
import { SearchIcon } from "@/src/SVG/TabSVG";
import { CloseIcon, FilterIcon } from "@/src/SVG/SearchSVG";
import { Tag } from "@/src/types/search";
import { PopularTags, SearchLessons } from "@/src/api/search/search";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useStyles } from '../../../hooks/useStyles';
import { useThemeStore } from '../../../context/useThemeStore';
import { SearchScreenSkeleton } from "@/src/components/MainScreenSkeleton";


const getPaginationItems = (currentPage: number, maxPage: number) => {
    const pages: (number | string)[] = [];
    if (maxPage <= 5) {
        for (let i = 1; i <= maxPage; i++) pages.push(i);
        return pages;
    }
    if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', maxPage);
    } else if (currentPage >= maxPage - 2) {
        pages.push(1, '...', maxPage - 2, maxPage - 1, maxPage);
    } else {
        pages.push(1, '...', currentPage, '...', maxPage);
    }
    return pages;
};

export const SearchScreen = () => {
  const searchStyles = useStyles(searchStylesFn);
  const homeStyles = useStyles(homeStylesFn);
  const { colors } = useThemeStore(s => s.theme);
    const { t } = useTranslation();
    type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'Search'>;
    const route = useRoute<SearchScreenRouteProp>();
    const searchFromMainPage = route.params?.search;
    const navigator = useNavigation();
    const [search, setSearch] = useState(searchFromMainPage || "");
    const [findResult, setFindResult] = useState<any[]>([]);
    const [currentpage, setCurrentpage] = useState(1);
    const [type, setType] = useState<LessonType>(null);
    const [recentSearch, setRecentSearch] = useState<string[]>([]);
    const [level, setLevel] = useState("");
    const [order, setOrder] = useState("");
    const [maxpage, setMaxpage] = useState(1);
    const [popularTags, setPopularTags] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const iconMap: Record<string, React.ReactNode> = {
        code: <ApplicationCodeIcon size={50} />,
        design: <DesignPaletteIcon size={50} />,
        language: <LanguageIcon size={50} />,
        business: <BusinessIcon size={50} />,
    };

    const fetchPopularTags = async () => {
        try {
            const response = await PopularTags();
            setPopularTags(response.popular_tags);
        } catch (error) {
            console.error('Ошибка при получении популярных тегов:', error);
        }
    };

    const fetchFindResult = async (searchTerm?: string, pageParam?: number, levelParam?: string, typeParam?: LessonType, orderParam?: string) => {
        const query = searchTerm !== undefined ? searchTerm : search;
        const pageToFetch = pageParam !== undefined ? pageParam : currentpage;
        const levelToFetch = levelParam !== undefined ? levelParam : level;
        const typeToFetch = typeParam !== undefined ? typeParam : type;
        const orderToFetch = orderParam !== undefined ? orderParam : order;
        try {
            const response = await SearchLessons({
                search: query,
                type: typeToFetch,
                level: levelToFetch,
                page: pageToFetch,
                order: order
            });
            setFindResult(response.lessons || []);
            setMaxpage(Math.ceil(response.total / 4) || 1);
        } catch (error) {
            console.error('Ошибка при получении результатов поиска:', error);
        }
    };

    const saveRecentSearch = (searchTerm: string) => {
        if (!searchTerm.trim()) return;
        setRecentSearch(prev => {
            const filtered = prev.filter(item => item !== searchTerm);
            const newRecent = [searchTerm, ...filtered].slice(0, 10);
            AsyncStorage.setItem("recent_search", JSON.stringify(newRecent)).catch(e => console.error(e));
            return newRecent;
        });
    };

    const removeRecentSearch = (searchTerm: string) => {
        setRecentSearch(prev => {
            const newRecent = prev.filter(item => item !== searchTerm);
            AsyncStorage.setItem("recent_search", JSON.stringify(newRecent)).catch(e => console.error(e));
            return newRecent;
        });
    };


    const loadRecentSearch = async () => {
        try {
            const saved = await AsyncStorage.getItem("recent_search");
            if (saved) {
                setRecentSearch(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to load recent searches", e);
        }
    };
    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchPopularTags(),
                fetchFindResult(search, 1),
                loadRecentSearch()
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        if (route.params?.search) {
            setSearch(route.params.search);
            fetchFindResult(route.params.search, 1);
            saveRecentSearch(route.params.search);
        }
    }, [route.params?.search]);


    if (loading) {
        return <SearchScreenSkeleton />
    }

    return (
        <SafeAreaView style={searchStyles.container} edges={['top']}>
            <ScrollView
                style={searchStyles.scrollContainer}>
                <View style={searchStyles.header}>
                    <Text style={searchStyles.headerTitle}>{t('screens.search.title')}</Text>
                    <View style={searchStyles.searchContainer}>
                        <View style={searchStyles.searchIconWrapper}>
                            <SearchIcon />
                        </View>
                        <TextInput
                            value={search}
                            onChangeText={(text) => { setSearch(text); fetchFindResult(text); }}
                            onSubmitEditing={() => saveRecentSearch(search)}
                            style={searchStyles.searchInput}
                            placeholder={t('screens.search.searchPlaceholder')}
                            placeholderTextColor={colors.textLight}
                        />
                        {(search?.length || 0) > 0 && (
                            <Pressable style={searchStyles.clearButton} onPress={() => setSearch("")}>
                                <CloseIcon />
                            </Pressable>
                        )}
                    </View>
                </View>
                {(search?.length <= 0 && recentSearch.length > 0) && (
                    <View style={searchStyles.section}>
                        <Text style={searchStyles.sectionTitle}>{t('screens.search.recentSearch')}</Text>
                        <View style={searchStyles.chipsWrap}>
                            {recentSearch.map((searchItem, index) => (
                                <Pressable key={index} style={searchStyles.recentChip}
                                    onPress={() => { setSearch(searchItem); fetchFindResult(searchItem); saveRecentSearch(searchItem); }}>
                                    <Text style={searchStyles.recentChipText}>{searchItem}</Text>
                                    <Pressable style={searchStyles.recentChipRemove} onPress={() => removeRecentSearch(searchItem)}>
                                        <CloseIcon />
                                    </Pressable>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                )}
                {search?.length <= 0 && (
                    <View style={searchStyles.section}>
                        <Text style={searchStyles.sectionTitle}>{t('screens.search.popularTags')}</Text>
                        <View style={searchStyles.chipsWrap}>
                            {(popularTags || []).map((tag: any) => {
                                const tagStr = typeof tag === 'string' ? tag : tag?.tag || '';
                                return (
                                    <Pressable key={tagStr} style={searchStyles.tagChip}
                                        onPress={() => { setSearch(tagStr); fetchFindResult(tagStr); saveRecentSearch(tagStr); }}>
                                        <Text style={searchStyles.tagChipText}>{tagStr}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                )}
                {(search?.length || 0) > 0 && (
                    <><View style={searchStyles.section}>
                        <View style={searchStyles.resultsHeader}>
                            <Text style={searchStyles.resultsCount}>{t('screens.search.foundResults')} {findResult.length} {t('screens.search.results')}</Text>
                            <Pressable 
                                onPress={() => { setModalVisible(true) }}>
                                {({ pressed }) => (
                                    <MotiView
                                        animate={{
                                            scale: pressed ? 0.96 : 1,
                                            opacity: pressed ? 0.85 : 1,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            damping: 10,
                                            stiffness: 200,
                                        }}
                                        style={searchStyles.filterButton}
                                    >
                                        <View style={searchStyles.filterButtonIconWrapper}>
                                            <FilterIcon color={colors.text} size={14} />
                                        </View>
                                        <Text style={searchStyles.filterButtonText}>{t('screens.search.filtersTitle')}</Text>
                                    </MotiView>
                                )}
                            </Pressable>
                        </View>
                    </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={searchStyles.overlay}>
                                <View style={searchStyles.sheet}>
                                    <View style={searchStyles.handle} />
                                    <View style={searchStyles.headerModal}>
                                        <Text style={searchStyles.headerTitleModal}>{t('screens.search.filtersTitle')}</Text>
                                        <Pressable onPress={() => { setModalVisible(false); setLevel(''); }}>
                                            <View style={searchStyles.clearButton}>
                                                <CloseIcon />
                                            </View>
                                        </Pressable>
                                        <Text style={searchStyles.resetButtonText}
                                            onPress={() => {
                                                setLevel('');
                                                setModalVisible(false);
                                                fetchFindResult(search, currentpage, '');
                                            }}>
                                            {t('screens.search.resetBtn')}
                                        </Text>
                                    </View>
                                    <ScrollView contentContainerStyle={searchStyles.scrollContent}>
                                        <View style={searchStyles.filterSection}>
                                            <View style={searchStyles.filterSectionHeader}>
                                                <Text style={searchStyles.filterSectionTitle}>{t('screens.search.difficulty')}</Text>
                                                <Text style={searchStyles.resetButtonText}
                                                    onPress={() => {
                                                        setLevel('');
                                                        fetchFindResult(search, currentpage, '');
                                                    }}>
                                                    {t('screens.search.resetBtn')}
                                                </Text>
                                            </View>
                                            <View style={searchStyles.chipsWrap}>
                                                <Pressable style={level === 'Beginner' ? searchStyles.chipBeginnerActive : searchStyles.chipBeginner}
                                                    onPress={() => { setLevel('Beginner'); fetchFindResult(search, currentpage, 'Beginner'); }}>
                                                    <Text style={level === 'Beginner' ? searchStyles.chipBeginnerTextActive : searchStyles.chipBeginnerText}>Beginner</Text>
                                                </Pressable>
                                                <Pressable style={level === 'Intermediate' ? searchStyles.chipIntermediateActive : searchStyles.chipIntermediate}
                                                    onPress={() => { setLevel('Intermediate'); fetchFindResult(search, currentpage, 'Intermediate'); }}>
                                                    <Text style={level === 'Intermediate' ? searchStyles.chipIntermediateTextActive : searchStyles.chipIntermediateText}>Intermediate</Text>
                                                </Pressable>
                                                <Pressable style={level === 'Advanced' ? searchStyles.chipAdvancedActive : searchStyles.chipAdvanced}
                                                    onPress={() => { setLevel('Advanced'); fetchFindResult(search, currentpage, 'Advanced'); }}>
                                                    <Text style={level === 'Advanced' ? searchStyles.chipAdvancedTextActive : searchStyles.chipAdvancedText}>Advanced</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        <View style={searchStyles.filterSection}>
                                            <View style={searchStyles.filterSectionHeader}>
                                                <Text style={searchStyles.filterSectionTitle}>{t('screens.search.category')}</Text>
                                                <Text style={searchStyles.resetButtonText}
                                                    onPress={() => {
                                                        setType(null);
                                                        fetchFindResult(search, currentpage, level, null);
                                                    }}>
                                                    {t('screens.search.resetBtn')}
                                                </Text>
                                            </View>
                                            <View style={searchStyles.chipsWrap}>
                                                <Pressable style={type === 'code' ? searchStyles.filterOptionChipActive : searchStyles.filterOptionChip}
                                                    onPress={() => { setType('code'); fetchFindResult(search, currentpage, level, 'code'); }}>
                                                    <Text style={type === 'code' ? searchStyles.filterOptionChipTextActive : searchStyles.filterOptionChipText}>code</Text>
                                                </Pressable>
                                                <Pressable style={type === 'design' ? searchStyles.filterOptionChipActive : searchStyles.filterOptionChip}
                                                    onPress={() => { setType('design'); fetchFindResult(search, currentpage, level, 'design'); }}>
                                                    <Text style={type === 'design' ? searchStyles.filterOptionChipTextActive : searchStyles.filterOptionChipText}>design</Text>
                                                </Pressable>
                                                <Pressable style={type === 'language' ? searchStyles.filterOptionChipActive : searchStyles.filterOptionChip}
                                                    onPress={() => { setType('language'); fetchFindResult(search, currentpage, level, 'language'); }}>
                                                    <Text style={type === 'language' ? searchStyles.filterOptionChipTextActive : searchStyles.filterOptionChipText}>language</Text>
                                                </Pressable>
                                                <Pressable style={type === 'business' ? searchStyles.filterOptionChipActive : searchStyles.filterOptionChip}
                                                    onPress={() => { setType('business'); fetchFindResult(search, currentpage, level, 'business'); }}>
                                                    <Text style={type === 'business' ? searchStyles.filterOptionChipTextActive : searchStyles.filterOptionChipText}>business</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                        <View>
                            {(findResult || []).map((item: any) => {
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
                                                <Text style={homeStyles.lessonCardLikes}> {item.author ? item.author : t('screens.search.unknownAuthor')} · ❤️ {less.likes}</Text>
                                            </View>
                                        </View>
                                        <Pressable 
                                            onPress={() => (navigator as any).navigate('LessonMainScreen', { lessonId: less.id })}
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
                                                    <Text style={homeStyles.studyButtonText}>{t('screens.search.studyBtn')}</Text>
                                                </MotiView>
                                            )}
                                        </Pressable>
                                    </View>
                                );
                            })}
                        </View><View style={{ alignItems: 'center' }}>
                            <View style={searchStyles.paginationContainer}>
                                <Pressable
                                    disabled={currentpage === 1}
                                    onPress={() => {
                                        const next = currentpage - 1;
                                        setCurrentpage(next);
                                        fetchFindResult(search, next);
                                    }}
                                >
                                    {({ pressed }) => (
                                        <MotiView
                                            animate={{
                                                scale: pressed ? 0.95 : 1,
                                                opacity: pressed ? 0.8 : 1,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                damping: 10,
                                                stiffness: 200,
                                            }}
                                            style={[searchStyles.pageArrowButton, currentpage === 1 && searchStyles.pageArrowButtonDisabled]}
                                        >
                                            <Text style={searchStyles.pageArrowText}>{t('screens.search.prevPage')}</Text>
                                        </MotiView>
                                    )}
                                </Pressable>

                                {getPaginationItems(currentpage, maxpage).map((item, index) => {
                                    if (item === '...') {
                                        return (
                                            <View key={`dots-${index}`} style={searchStyles.pageDots}>
                                                <Text style={searchStyles.pageDotsText}>...</Text>
                                            </View>
                                        );
                                    }
                                    const pageNum = item as number;
                                    return (
                                        <Pressable
                                            key={`page-${pageNum}`}
                                            onPress={() => { setCurrentpage(pageNum); fetchFindResult(search, pageNum); }}
                                        >
                                            {({ pressed }) => (
                                                <MotiView
                                                    animate={{
                                                        scale: pressed ? 0.9 : 1,
                                                    }}
                                                    transition={{
                                                        type: 'spring',
                                                        damping: 10,
                                                        stiffness: 200,
                                                    }}
                                                    style={currentpage === pageNum ? searchStyles.pageButtonActive : searchStyles.pageButton}
                                                >
                                                    <Text style={currentpage === pageNum ? searchStyles.pageButtonTextActive : searchStyles.pageButtonText}>{pageNum}</Text>
                                                </MotiView>
                                            )}
                                        </Pressable>
                                    );
                                })}

                                <Pressable
                                    disabled={currentpage === maxpage}
                                    onPress={() => {
                                        const next = currentpage + 1;
                                        setCurrentpage(next);
                                        fetchFindResult(search, next);
                                    }}
                                >
                                    {({ pressed }) => (
                                        <MotiView
                                            animate={{
                                                scale: pressed ? 0.95 : 1,
                                                opacity: pressed ? 0.8 : 1,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                damping: 10,
                                                stiffness: 200,
                                            }}
                                            style={[searchStyles.pageArrowButton, currentpage === maxpage && searchStyles.pageArrowButtonDisabled]}
                                        >
                                            <Text style={searchStyles.pageArrowText}>{t('screens.search.nextPage')}</Text>
                                        </MotiView>
                                    )}
                                </Pressable>
                            </View>
                            <Text style={searchStyles.pageInfo}>{t('screens.search.pageInfo1')} {currentpage} {t('screens.search.pageInfo2')} {maxpage}</Text>
                        </View></>
                )}
                {findResult.length <= 0 && (
                    <View style={searchStyles.emptyState}>
                        <View style={searchStyles.emptyIconWrapper}><SearchIcon size={30} color={colors.textLight} /></View>
                        <Text style={searchStyles.emptyTitle}>{t('screens.search.emptyTitle')}</Text>
                        <Text style={searchStyles.emptySubtitle}>{t('screens.search.emptySubtitle')}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}