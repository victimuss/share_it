import { View, Text, Linking } from "react-native";
import { lessonSwipeViewStyles as styles } from "@/src/styles/SheetStyles";
import { COLORS } from "@/src/styles/root";
import { Sheet } from "@/src/types/lessonmainscreen";
import YoutubePlayer from "react-native-youtube-iframe";
import { LessonInfoIcon, LessonWarningIcon } from "@/src/SVG/LessonSVG";
interface SheetCardProps {
    type: string;
    sheet: Sheet;
}
const typesData = [
    { label: 'THEORY', value: 'Theory', icon: '📖', style: styles.typeBadgeTheory, color: COLORS.primary },
    { label: 'QUIZ', value: 'Quiz', icon: '❓', style: styles.typeBadgeQuestion, color: COLORS.error },
    { label: 'VIDEO', value: 'Video', icon: '🎥', style: styles.typeBadgeVideo, color: COLORS.success },
    { label: 'PICTURE', value: 'Picture', icon: '🖼️', style: styles.typeBadgePicture, color: COLORS.warning },
]

export const SheetContent = ({ type, sheet }: SheetCardProps) => {
    switch (type) {
        case 'THEORY':
            return <View style={styles.swipePage}>
                <Text style={styles.paragraph}>
                    {sheet.content}
                </Text>
                {sheet.content_advice && (
                    <View style={styles.adviceBlock}>
                        <View style={styles.adviceIconWrapper}>
                            <LessonInfoIcon />
                        </View>
                        <Text style={styles.adviceText}>{sheet.content_advice}</Text>
                    </View>
                )}
                {sheet.content_danger && (
                    <View style={styles.warningBlock}>
                        <View style={styles.warningIconWrapper}>
                            <LessonWarningIcon />
                        </View>
                        <Text style={styles.warningText}>{sheet.content_danger}</Text>
                    </View>
                )}
            </View>
        case 'QUIZ':
            return <Text>{sheet.content}</Text>
        case 'VIDEO':
            return <View style={styles.swipePage}>
                <YoutubePlayer
                    height={230}
                    videoId={sheet.video_url || ''}
                />
                <View style={styles.videoComment}>
                    <Text style={styles.videoCommentLabel}>
                        Комментарий
                    </Text>
                    <Text style={styles.videoCommentText}>
                        {sheet.description_for_video_or_picture}
                    </Text>
                    <Text style={styles.videoLink}
                        onPress={() => Linking.openURL(sheet.video_url || '')}>
                        Открыть на YouTube
                    </Text>
                </View>
            </View>
        case 'PICTURE':
            return <Text>{sheet.content}</Text>
        default:
            return <Text>{sheet.content}</Text>
    }
}
export const SheetCard = ({ type, sheet }: SheetCardProps) => {
    return (
        <View style={styles.swipePage}>
            <View style={styles.pageScroll}>
                <View style={styles.pageMeta}>
                    <View style={typesData.find(t => t.label === type)?.style}>
                        <Text style={[styles.typeBadgeText, { color: typesData.find(t => t.label === type)?.color }]}>{typesData.find(t => t.label === type)?.icon}</Text>
                        <Text style={[styles.typeBadgeText, { color: typesData.find(t => t.label === type)?.color }]}>{typesData.find(t => t.label === type)?.value}</Text>
                    </View>
                </View>
                <Text style={styles.pageTitle}>
                    {sheet.sheet_header}
                </Text>
                <SheetContent type={type} sheet={sheet} />
            </View>
        </View>
    )
}
