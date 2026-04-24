import React, { useState } from 'react';
import { View, Text, Linking, Image, Pressable, ScrollView } from "react-native";
import { lessonSwipeViewStyles as styles } from "@/src/styles/SheetStyles";
import { COLORS } from "@/src/styles/root";
import { Sheet } from "@/src/types/lessonmainscreen";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';
import { LessonInfoIcon, LessonWarningIcon } from "@/src/SVG/LessonSVG";
interface SheetCardProps {
    type: string;
    sheet: Sheet;
}
const typesData = [
    { label: 'THEORY', value: 'Theory', icon: '📖', style: styles.typeBadgeTheory, color: COLORS.primary },
    { label: 'QUIZ', value: 'Quiz', icon: '❓', style: styles.typeBadgeQuestion, color: COLORS.error },
    { label: 'VIDEO', value: 'Video', icon: '🎥', style: styles.typeBadgeVideo, color: COLORS.error },
    { label: 'PICTURE', value: 'Picture', icon: '🖼️', style: styles.typeBadgePicture, color: COLORS.warning },
]

export const SheetContent = ({ type, sheet }: SheetCardProps) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    switch (type) {
        case 'THEORY':
            return <ScrollView style={styles.swipePage}>
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
            </ScrollView>
        case 'QUIZ':
            return (
                <ScrollView style={styles.swipePage}>
                    <View style={styles.quizCard}>
                        <View style={styles.questionHeader}>
                            <View style={styles.questionIconCircle}>
                                <Text style={{ fontSize: 16 }}>❓</Text>
                            </View>
                            <Text style={styles.questionText}>{sheet.question_text}</Text>
                        </View>
                        {sheet.quiz_options?.map((option: any, index: number) => {
                            const isSelected = selectedOption === index;

                            let optionStyle = isSelected ? styles.answerOptionSelected : null;
                            let bulletStyle = isSelected ? styles.answerBulletSelected : null;
                            let textStyle = isSelected ? styles.answerOptionTextSelected : null;
                            let bulletTextStyle = isSelected ? styles.answerBulletTextActive : null;

                            if (isSubmitted) {
                                if (isSelected) {
                                    if (option.is_correct) {
                                        optionStyle = styles.answerOptionCorrect;
                                        bulletStyle = styles.answerBulletCorrect;
                                        textStyle = styles.answerOptionTextCorrect;
                                        bulletTextStyle = styles.answerBulletTextActive;
                                    } else {
                                        optionStyle = styles.answerOptionWrong;
                                        bulletStyle = styles.answerBulletWrong;
                                        textStyle = styles.answerOptionTextWrong;
                                        bulletTextStyle = styles.answerBulletTextActive;
                                    }
                                } else if (option.is_correct) {
                                    optionStyle = styles.answerOptionCorrect;
                                    bulletStyle = styles.answerBulletCorrect;
                                    textStyle = styles.answerOptionTextCorrect;
                                    bulletTextStyle = styles.answerBulletTextActive;
                                }
                            }

                            return (
                                <Pressable
                                    key={index}
                                    style={[styles.answerOption, optionStyle]}
                                    onPress={() => {
                                        if (!isSubmitted) setSelectedOption(index);
                                    }}
                                >
                                    <View style={[styles.answerBullet, bulletStyle]}>
                                        <Text style={[styles.answerBulletText, bulletTextStyle]}>
                                            {String.fromCharCode(65 + index)}
                                        </Text>
                                    </View>
                                    <Text style={[styles.answerOptionText, textStyle]}>
                                        {option.option}
                                    </Text>
                                </Pressable>
                            );
                        })}

                        {!isSubmitted ? (
                            <Pressable
                                style={[styles.checkButton, selectedOption === null && styles.checkButtonDisabled]}
                                disabled={selectedOption === null}
                                onPress={() => setIsSubmitted(true)}
                            >
                                <Text style={styles.checkButtonText}>Проверить</Text>
                            </Pressable>
                        ) : (
                            <View style={[
                                styles.resultBanner,
                                sheet.quiz_options?.[selectedOption as number]?.is_correct ? styles.resultBannerCorrect : styles.resultBannerWrong
                            ]}>
                                <View style={styles.resultBannerIconWrapper}>
                                    <Text style={{ fontSize: 12 }}>
                                        {sheet.quiz_options?.[selectedOption as number]?.is_correct ? '✅' : '❌'}
                                    </Text>
                                </View>
                                <Text style={sheet.quiz_options?.[selectedOption as number]?.is_correct ? styles.resultBannerTextCorrect : styles.resultBannerTextWrong}>
                                    {sheet.quiz_options?.[selectedOption as number]?.is_correct ? 'Верный ответ!' : 'Неверный ответ!'}
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            );
        case 'VIDEO':
            const getYouTubeID = (url: string) => {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return (match && match[2].length === 11) ? match[2] : null;
            };
            const videoId = getYouTubeID(sheet.video_url || '');
            console.log(videoId);
            return <ScrollView style={styles.swipePage}>
                <View style={{
                    width: '100%',
                    height: 230,
                    opacity: 0.99
                }}>
                    <YoutubePlayer
                        height={230}
                        key={videoId}
                        videoId={videoId || ''}
                        play={false}
                        webViewProps={{
                            androidLayerType: 'software',
                            domStorageEnabled: true,
                            javaScriptEnabled: true,
                        }}
                    />
                </View>
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
            </ScrollView>
        case 'PICTURE':
            return <ScrollView style={[styles.swipePage, { flex: 1, minHeight: 300 }]}>
                <View style={styles.pictureImageArea}>
                    <Image
                        source={{ uri: sheet.picture_url || "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" }}
                        style={styles.pictureImage}
                        resizeMode='contain'
                        onLoad={() => console.log("✅ КАРТИНКА ПОЯВИЛАСЬ!")}
                        onError={(e) => console.log("❌ ОШИБКА:", e.nativeEvent.error)}
                    />
                </View>
                <Text style={[styles.videoCommentText, { marginTop: 10, color: 'black' }]}>
                    {sheet.description_for_video_or_picture || "Описания нет"}
                </Text>
            </ScrollView>
        default:
            return <ScrollView>{sheet.content}</ScrollView>
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
