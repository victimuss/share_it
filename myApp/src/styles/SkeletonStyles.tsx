import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme, SPACING, RADIUS } from './root';

export const createSkeletonStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    } as ViewStyle,
    scrollContainer: {
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,
    skeletonBase: {
        backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    } as ViewStyle,
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.md,
        backgroundColor: theme.colors.surface,
    } as ViewStyle,
    headerLeft: {
        flex: 1,
    } as ViewStyle,
    headerRight: {
        flexDirection: 'row',
        gap: SPACING.sm,
    } as ViewStyle,
    searchWrapper: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: theme.colors.surface,
    } as ViewStyle,
    filtersScrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        gap: SPACING.sm,
    } as ViewStyle,
    section: {
        marginTop: SPACING.xl,
    } as ViewStyle,
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
    } as ViewStyle,
    featuredScrollContent: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
    } as ViewStyle,
    featuredCard: {
        width: 280,
        borderRadius: RADIUS.xl,
        backgroundColor: theme.colors.surface,
        overflow: 'hidden',
    } as ViewStyle,
    featuredCardContent: {
        padding: SPACING.md,
    } as ViewStyle,
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    } as ViewStyle,
    progressCard: {
        marginHorizontal: SPACING.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
    } as ViewStyle,
    progressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
        gap: SPACING.sm,
    } as ViewStyle,
    lessonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
        backgroundColor: theme.colors.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
    } as ViewStyle,

    // Additional common styles for skeletons
    profileAvatarWrapper: {
        alignItems: 'center',
        marginTop: -50,
    } as ViewStyle,
    profileAvatar: {
        borderWidth: 4,
        borderColor: 'white',
    } as ViewStyle,
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: SPACING.xl,
        paddingHorizontal: SPACING.lg,
    } as ViewStyle,
    statItem: {
        alignItems: 'center',
    } as ViewStyle,
    profileTabsRow: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        marginTop: SPACING.xl,
        gap: SPACING.md,
    } as ViewStyle,
    myLessonsHeader: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
    } as ViewStyle,
    myLessonsTabs: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: RADIUS.lg,
        padding: 4,
        marginBottom: SPACING.lg,
    } as ViewStyle,
    myLessonsFilters: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.xl,
    } as ViewStyle,
    searchScreenHeader: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
    } as ViewStyle,
    searchTagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
        marginBottom: SPACING.xl,
    } as ViewStyle,
    searchResultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.md,
    } as ViewStyle,
});
