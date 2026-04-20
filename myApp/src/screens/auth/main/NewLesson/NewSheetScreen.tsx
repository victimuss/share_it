import { useEffect, useState } from "react";
import { lessonEditorStyles as styles } from "@/src/styles/NewSheetStyles";
import { CloseIcon } from "@/src/SVG/SearchSVG";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Pressable, TextInput, Modal, Alert, KeyboardAvoidingView } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from "@/src/styles/root";
import { AddTags, CreateLession, Publish } from "@/src/api/create_lesson/create_lesson";
import { NewLessonScreen } from "./NewLessonScreen";
import { createLessonStyles } from "@/src/styles/NewLessonStyles";
import { PictureIcon, DeleteIcon } from "@/src/SVG/NewSheetSVG";
import { useLessonStore } from "@/src/context/useLessonStore";
import { useRoute } from "@react-navigation/native";
import { LoadScreen } from "../LoadScreen";
import { ModeratingScreen } from "../ModeratingScreen";
import { ApprovedScreen } from "../ApprovedScreen";
import { RejectedScreen } from "../RejectedScreen";


const typesData = [
    { label: 'Theory', value: 'THEORY', icon: '📖', description: 'Текст, советы и предупреждения ' },
    { label: 'Quiz', value: 'QUIZ', icon: '❓', description: 'Вопрос с вариантами ответа' },
    { label: 'Video', value: 'VIDEO', icon: '📹', description: 'Видео с описанием' },
    { label: 'Picture', value: 'PICTURE', icon: '🖼️', description: 'Изображение' },]


export const NewSheetScreen = () => {
    const {
        sheets,
        currentIndex,
        setCurrentIndex,
        addSheet,
        updateSheetField,
        saveCurrentSheet,
        deleteCurrentSheet,
        lessonId
    } = useLessonStore();
    const currentSheet = sheets[currentIndex];
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isModerating, setIsModerating] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [approved, setApproved] = useState(false);
    const [ModerateError, setModerateError] = useState<string | null>(null);
    const renderTypesItem = (item: typeof typesData[0]) => {
        return (
            <View style={styles.typeOption}>
                <View style={styles.typeOptionDot}>
                    <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                </View>
                <View>
                    <Text style={styles.typeOptionTitle}>{item.label}</Text>
                    <Text style={styles.typeOptionSubtitle}>{item.description}</Text>
                </View>
            </View>
        )
    }
    const isInvalid = () => {
        if (!currentSheet.sheet_header) return true;
        if (currentSheet.sheetType === 'THEORY' && !currentSheet.content) return true;
        if (currentSheet.sheetType === 'VIDEO' && !currentSheet.video_url) return true;
        if (currentSheet.sheetType === 'QUIZ' && !currentSheet.question_text) return true;
        if (currentSheet.sheetType === 'PICTURE' && !currentSheet.picture_url) return true;
        return false;
    };

    const handlePublish = async () => {
        setIsModerating(true);
        setModerateError(null);
        try {
            const ModerResponse = await Publish(lessonId || 0);
            if (ModerResponse.status === 'success') {
                setIsModerating(false);
                setApproved(true);
            } else {
                setIsModerating(false);
                setRejected(true);
                setModerateError(ModerResponse.message);
            }
        } catch (error: any) {
            setIsModerating(false);
            setRejected(true);

            if (error.response?.data?.detail) {
                setModerateError(error.response.data.detail.reason || error.response.data.detail.message);
            } else {
                setModerateError("Ошибка запроса публикации");
                console.error(`Ошибка запроса публикации урока:`, error);
            }
        }
    }

    if (isModerating) {
        return (
            <ModeratingScreen />
        )
    }

    if (rejected) {
        return (
            <RejectedScreen
                reason={ModerateError}
                onClose={() => setRejected(false)}
            />
        )
    }

    if (approved) {
        return (
            <ApprovedScreen />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={createLessonStyles.headerLeft}>
                    <Pressable style={createLessonStyles.closeIconWrapper}>
                        <CloseIcon></CloseIcon>
                    </Pressable>
                    <Text style={styles.headerTitle}>Новая страница</Text>
                    <Pressable style={styles.publishButton}
                        onPress={handlePublish}
                    > <Text style={styles.publishButtonText}>Опубликовать</Text></Pressable>
                </View>
            </View>
            <View style={styles.pagesBar}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.pagesScrollContent}>

                    {sheets.map((sheet, index) => (
                        <Pressable
                            key={sheet.localId}
                            onPress={() => setCurrentIndex(index)}
                            style={currentIndex === index ? styles.pageTabActive : styles.pageTab}
                        >
                            <Text style={currentIndex === index ? styles.pageTabTextActive : styles.pageTabText}>
                                {index + 1}
                            </Text>
                        </Pressable>
                    ))}
                    <View style={styles.pagesDivider} />
                    <Text style={styles.pagesCounter}>
                        <Text style={styles.pagesCounterBold}>{sheets.length}</Text>/15
                    </Text>
                    <Pressable style={styles.addPageButton}
                        onPress={addSheet}>
                        <Text style={styles.addPageButtonText}>+</Text>
                    </Pressable>
                </ScrollView>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAvoidingView style={styles.pageContent}>
                    <View style={styles.fieldHeader}>
                        <Text style={styles.fieldLabel}>Название страницы</Text>
                        <Text style={styles.charCount}>0/50</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Название этой страницы..."
                        value={currentSheet.sheet_header}
                        onChangeText={(text) => updateSheetField('sheet_header', text)}
                        placeholderTextColor={COLORS.textSecondary}
                        maxLength={50}

                    />
                    <View style={styles.fieldHeader}>
                        <Text style={styles.fieldLabel}>Тип страницы</Text>
                    </View>
                    <Dropdown
                        style={[
                            styles.typeSelector,
                            isFocus && styles.typeSelectorOpen
                        ]}
                        data={typesData}
                        containerStyle={styles.typeDropdown}
                        labelField="label"
                        valueField="value"
                        value={currentSheet.sheetType.toUpperCase() || 'THEORY'}
                        onChange={item => {
                            updateSheetField('sheetType', item.value as any);
                        }}
                        placeholder="Выберите тип"
                        activeColor="#EEF2FF"
                        dropdownPosition="bottom"
                        maxHeight={300}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        renderItem={renderTypesItem}
                        renderLeftIcon={() => {
                            const selectedItemType = typesData.find(d => d.value === currentSheet.sheetType.toUpperCase());
                            if (selectedItemType) {
                                return (
                                    <View style={styles.typeOptionDot}>
                                        <Text style={{ fontSize: 14 }}>{selectedItemType.icon}</Text>
                                    </View>
                                );
                            }
                            return null;
                        }}
                    />
                </KeyboardAvoidingView>
                {(currentSheet.sheetType === 'THEORY') && (
                    <KeyboardAvoidingView style={styles.pageContent}>
                        <KeyboardAvoidingView style={styles.fieldHeader}>
                            <Text style={styles.fieldLabel}>Текст</Text>
                            <Text style={styles.charCount}>0/500</Text>
                        </KeyboardAvoidingView>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Содержание страницы..."
                            placeholderTextColor={COLORS.textSecondary}
                            maxLength={500}
                            value={currentSheet.content}
                            onChangeText={(text) => updateSheetField('content', text)}
                        />
                        <View style={styles.calloutRow}>
                            <View style={styles.calloutCardAdvice}>
                                <View style={styles.calloutHeader}>
                                    <Text style={styles.calloutTitleAdvice}>💡 Совет</Text>
                                    <Text style={styles.charCount}>0/75</Text>
                                </View>
                                <TextInput
                                    style={styles.calloutInput}
                                    placeholder="Необязательно..."
                                    placeholderTextColor={COLORS.textSecondary}
                                    maxLength={75}
                                    value={currentSheet.content_advice}
                                    onChangeText={(text) => updateSheetField('content_advice', text)}
                                />
                            </View>
                            <View style={styles.calloutCardWarning}>
                                <View style={styles.calloutHeader}>
                                    <Text style={styles.calloutTitleWarning}>⚠️ Важно</Text>
                                    <Text style={styles.charCount}>0/75</Text>
                                </View>
                                <TextInput
                                    style={styles.calloutInput}
                                    placeholder="Необязательно..."
                                    placeholderTextColor={COLORS.textSecondary}
                                    maxLength={75}
                                    value={currentSheet.content_danger}
                                    onChangeText={(text) => updateSheetField('content_danger', text)}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                )
                }
                {(currentSheet.sheetType === 'VIDEO') && (
                    <KeyboardAvoidingView style={styles.pageContent}>
                        <View style={styles.fieldHeader}>
                            <Text style={styles.fieldLabel}>Ссылка на видео</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="https://youtube.com/..."
                            placeholderTextColor={COLORS.textSecondary}
                            value={currentSheet.video_url}
                            onChangeText={(text) => updateSheetField('video_url', text)}

                        />
                        <View style={styles.fieldHeader}>
                            <Text style={styles.fieldLabel}>Комментарий</Text>
                            <Text style={styles.charCount}>0/50</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Коротко о видео..."
                            placeholderTextColor={COLORS.textSecondary}
                            maxLength={50}
                            value={currentSheet.description_for_video_or_picture}
                            onChangeText={(text) => updateSheetField('description_for_video_or_picture', text)}
                        />
                    </KeyboardAvoidingView>
                )
                }
                {(currentSheet.sheetType === 'QUIZ') && (
                    <KeyboardAvoidingView style={styles.pageContent}>
                        <View style={styles.fieldHeader}>
                            <Text style={styles.fieldLabel}>Вопрос</Text>
                            <Text style={styles.charCount}>0/30</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Введи вопрос..."
                            placeholderTextColor={COLORS.textSecondary}
                            maxLength={30}
                        />
                    </KeyboardAvoidingView>
                )
                }
                {(currentSheet.sheetType === 'PICTURE') && (
                    <KeyboardAvoidingView style={styles.pageContent}>
                        <View style={styles.pictureUploadZone}>
                            <View style={styles.uploadIconCircle}>
                                <View style={styles.uploadIconWrapper}>
                                    <PictureIcon />
                                </View>
                            </View>
                            <Text style={styles.uploadHintAccent}>Нажми для загрузки</Text>
                            <Text style={styles.uploadHint}>PNG, JPG до 10 MB</Text>
                        </View>
                    </KeyboardAvoidingView>
                )}
            </ScrollView>
            <View style={styles.bottomBar}>
                <Pressable style={styles.deletePageButton} onPress={() => deleteCurrentSheet()}>
                    <View style={styles.deleteIconWrapper}>
                        <DeleteIcon />
                    </View>
                </Pressable>
                <Pressable style={currentSheet.isSaving || isInvalid() ? styles.savePageButtonDisabled : styles.savePageButton}
                    disabled={currentSheet.isSaving || isInvalid()}
                    onPress={async () => await saveCurrentSheet()}>
                    <Text style={styles.savePageButtonText}>Cохранить страницу</Text>
                </Pressable>
            </View>
        </SafeAreaView >
    )
}