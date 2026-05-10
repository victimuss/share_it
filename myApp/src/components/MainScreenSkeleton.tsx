import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Theme, SPACING, RADIUS } from '../styles/root';
import { useStyles } from '../hooks/useStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createSkeletonStyles } from '../styles/SkeletonStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Shimmer = ({ width, height, radius = RADIUS.md, style, color }: any) => {
    return (
        <MotiView
            from={{ opacity: 0.3 }}
            animate={{ opacity: 0.7 }}
            transition={{
                type: 'timing',
                duration: 1000,
                loop: true,
                repeatReverse: true,
            }}
            style={[
                {
                    width,
                    height,
                    borderRadius: radius,
                    backgroundColor: color || 'rgba(0,0,0,0.05)',
                },
                style,
            ]}
        />
    );
};

export const MainScreenSkeleton = () => {
    const styles = useStyles(createSkeletonStyles);
    const skeletonColor = styles.skeletonBase.backgroundColor;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {/* Header Skeleton */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Shimmer width={120} height={16} radius={RADIUS.sm} color={skeletonColor} style={{ marginBottom: SPACING.xs }} />
                        <Shimmer width={200} height={32} radius={RADIUS.md} color={skeletonColor} style={{ marginBottom: SPACING.xs }} />
                        <Shimmer width={150} height={16} radius={RADIUS.sm} color={skeletonColor} />
                    </View>
                    <View style={styles.headerRight}>
                        <Shimmer width={40} height={40} radius={RADIUS.full} color={skeletonColor} />
                        <Shimmer width={40} height={40} radius={RADIUS.full} color={skeletonColor} />
                    </View>
                </View>

                {/* Search Bar Skeleton */}
                <View style={styles.searchWrapper}>
                    <Shimmer width="100%" height={50} radius={RADIUS.lg} color={skeletonColor} />
                </View>

                {/* Categories Skeleton */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Shimmer key={i} width={80} height={36} radius={RADIUS.full} color={skeletonColor} />
                    ))}
                </ScrollView>

                {/* Popular Section Skeleton */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Shimmer width={150} height={24} radius={RADIUS.sm} color={skeletonColor} />
                        <Shimmer width={60} height={20} radius={RADIUS.sm} color={skeletonColor} />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScrollContent}>
                        {[1, 2].map((i) => (
                            <View key={i} style={styles.featuredCard}>
                                <Shimmer width="100%" height={140} radius={0} color={skeletonColor} />
                                <View style={styles.featuredCardContent}>
                                    <View style={styles.metaRow}>
                                        <Shimmer width={80} height={20} radius={RADIUS.sm} color={skeletonColor} />
                                        <Shimmer width={40} height={20} radius={RADIUS.sm} color={skeletonColor} />
                                    </View>
                                    <Shimmer width="90%" height={24} radius={RADIUS.sm} color={skeletonColor} style={{ marginBottom: SPACING.xs }} />
                                    <Shimmer width="60%" height={16} radius={RADIUS.sm} color={skeletonColor} />
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Continue Learning Skeleton */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Shimmer width={180} height={24} radius={RADIUS.sm} color={skeletonColor} />
                    </View>
                    <View style={styles.progressCard}>
                        <View style={styles.progressHeader}>
                            <Shimmer width={24} height={24} radius={RADIUS.sm} color={skeletonColor} />
                            <Shimmer width="70%" height={20} radius={RADIUS.sm} color={skeletonColor} />
                        </View>
                        <Shimmer width="100%" height={8} radius={RADIUS.full} color={skeletonColor} />
                    </View>
                </View>

                {/* New Lessons Skeleton */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Shimmer width={150} height={24} radius={RADIUS.sm} color={skeletonColor} />
                    </View>
                    {[1, 2, 3].map((i) => (
                        <View key={i} style={styles.lessonCard}>
                            <Shimmer width={56} height={56} radius={RADIUS.md} color={skeletonColor} style={{ marginRight: SPACING.md }} />
                            <View style={{ flex: 1 }}>
                                <Shimmer width="80%" height={18} radius={RADIUS.sm} color={skeletonColor} style={{ marginBottom: SPACING.xs }} />
                                <View style={{ flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.xs }}>
                                    <Shimmer width={60} height={16} radius={RADIUS.sm} color={skeletonColor} />
                                    <Shimmer width={50} height={16} radius={RADIUS.sm} color={skeletonColor} />
                                </View>
                                <Shimmer width="40%" height={14} radius={RADIUS.sm} color={skeletonColor} />
                            </View>
                            <Shimmer width={60} height={32} radius={RADIUS.md} color={skeletonColor} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const ProfileScreenSkeleton = () => {
    const styles = useStyles(createSkeletonStyles);
    const skeletonColor = styles.skeletonBase.backgroundColor;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {/* Banner */}
                <Shimmer width="100%" height={160} radius={0} color={skeletonColor} />
                
                <View style={styles.profileAvatarWrapper}>
                    {/* Avatar */}
                    <Shimmer width={100} height={100} radius={RADIUS.full} color={skeletonColor} style={styles.profileAvatar} />
                    
                    {/* Name & Bio */}
                    <Shimmer width={180} height={28} radius={RADIUS.md} color={skeletonColor} style={{ marginTop: SPACING.md }} />
                    <Shimmer width={120} height={16} radius={RADIUS.sm} color={skeletonColor} style={{ marginTop: SPACING.xs }} />
                    <Shimmer width={220} height={16} radius={RADIUS.sm} color={skeletonColor} style={{ marginTop: SPACING.xs }} />
                    
                    {/* Edit Button */}
                    <Shimmer width={140} height={40} radius={RADIUS.lg} color={skeletonColor} style={{ marginTop: SPACING.lg }} />
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    {[1, 2, 3].map(i => (
                        <View key={i} style={styles.statItem}>
                            <Shimmer width={40} height={24} radius={RADIUS.sm} color={skeletonColor} />
                            <Shimmer width={60} height={12} radius={RADIUS.xs} color={skeletonColor} style={{ marginTop: 4 }} />
                        </View>
                    ))}
                </View>

                {/* Skills */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Shimmer width={100} height={20} radius={RADIUS.sm} color={skeletonColor} />
                        <Shimmer width={70} height={16} radius={RADIUS.sm} color={skeletonColor} />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
                        {[1, 2, 3, 4].map(i => (
                            <Shimmer key={i} width={90} height={32} radius={RADIUS.md} color={skeletonColor} />
                        ))}
                    </ScrollView>
                </View>

                {/* Tabs */}
                <View style={styles.profileTabsRow}>
                    <Shimmer width={100} height={32} radius={RADIUS.md} color={skeletonColor} />
                    <Shimmer width={100} height={32} radius={RADIUS.md} color={skeletonColor} />
                    <Shimmer width={100} height={32} radius={RADIUS.md} color={skeletonColor} />
                </View>

                {/* Lessons */}
                <View style={{ paddingHorizontal: SPACING.lg, marginTop: SPACING.lg }}>
                    {[1, 2].map(i => (
                        <View key={i} style={[styles.lessonCard, { marginHorizontal: 0 }]}>
                            <Shimmer width={50} height={50} radius={RADIUS.md} color={skeletonColor} style={{ marginRight: SPACING.md }} />
                            <View style={{ flex: 1 }}>
                                <Shimmer width="70%" height={16} radius={RADIUS.sm} color={skeletonColor} style={{ marginBottom: 6 }} />
                                <Shimmer width="40%" height={12} radius={RADIUS.xs} color={skeletonColor} />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const MyLessonsSkeleton = () => {
    const styles = useStyles(createSkeletonStyles);
    const skeletonColor = styles.skeletonBase.backgroundColor;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.myLessonsHeader}>
                {/* Title */}
                <Shimmer width={150} height={32} radius={RADIUS.md} color={skeletonColor} style={{ marginBottom: SPACING.lg }} />
                
                {/* Tabs */}
                <View style={styles.myLessonsTabs}>
                    <Shimmer width="50%" height={40} radius={RADIUS.md} color="white" />
                    <View style={{ width: "50%", height: 40 }} />
                </View>

                {/* Filters */}
                <View style={styles.myLessonsFilters}>
                    {[1, 2, 3].map(i => (
                        <Shimmer key={i} width={70} height={32} radius={RADIUS.full} color={skeletonColor} />
                    ))}
                </View>

                {/* Found Results */}
                <Shimmer width={120} height={16} radius={RADIUS.sm} color={skeletonColor} style={{ marginBottom: SPACING.md }} />

                {/* Lesson Cards */}
                {[1, 2, 3].map(i => (
                    <View key={i} style={[styles.lessonCard, { marginHorizontal: 0, height: 120 }]}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.md }}>
                                <Shimmer width={50} height={50} radius={RADIUS.md} color={skeletonColor} />
                                <View style={{ flex: 1, gap: 6 }}>
                                    <Shimmer width="90%" height={18} radius={RADIUS.sm} color={skeletonColor} />
                                    <View style={{ flexDirection: 'row', gap: 4 }}>
                                        <Shimmer width={60} height={14} radius={RADIUS.xs} color={skeletonColor} />
                                        <Shimmer width={50} height={14} radius={RADIUS.xs} color={skeletonColor} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export const SearchScreenSkeleton = () => {
    const styles = useStyles(createSkeletonStyles);
    const skeletonColor = styles.skeletonBase.backgroundColor;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.searchScreenHeader}>
                {/* Title */}
                <Shimmer width={100} height={32} radius={RADIUS.md} color={skeletonColor} style={{ marginBottom: SPACING.lg }} />
                
                {/* Search Input */}
                <Shimmer width="100%" height={50} radius={RADIUS.lg} color={skeletonColor} style={{ marginBottom: SPACING.xl }} />

                {/* Popular Tags Section */}
                <Shimmer width={150} height={20} radius={RADIUS.sm} color={skeletonColor} style={{ marginBottom: SPACING.md }} />
                <View style={styles.searchTagsRow}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <Shimmer key={i} width={80} height={32} radius={RADIUS.md} color={skeletonColor} />
                    ))}
                </View>

                {/* Results Header */}
                <View style={styles.searchResultsHeader}>
                    <Shimmer width={120} height={16} radius={RADIUS.sm} color={skeletonColor} />
                    <Shimmer width={80} height={24} radius={RADIUS.sm} color={skeletonColor} />
                </View>

                {/* Lesson Cards */}
                {[1, 2, 3].map(i => (
                    <View key={i} style={[styles.lessonCard, { marginHorizontal: 0 }]}>
                        <Shimmer width={56} height={56} radius={RADIUS.md} color={skeletonColor} style={{ marginRight: SPACING.md }} />
                        <View style={{ flex: 1 }}>
                            <Shimmer width="80%" height={18} radius={RADIUS.sm} color={skeletonColor} style={{ marginBottom: SPACING.xs }} />
                            <Shimmer width="40%" height={14} radius={RADIUS.xs} color={skeletonColor} />
                        </View>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};
