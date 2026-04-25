import React, { useEffect, useState } from "react";
import { lessonEditorStyles as styles } from "@/src/styles/NewSheetStyles";
import { CloseIcon } from "@/src/SVG/SearchSVG";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Pressable, TextInput, Modal, Alert, KeyboardAvoidingView, Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from "@/src/styles/root";
import { AddTags, CreateLession, DeleteLessonBanner, LoadLessonBanner, Publish } from "@/src/api/create_lesson/create_lesson";
import { NewLessonScreen } from "./NewLessonScreen";
import { createLessonStyles } from "@/src/styles/NewLessonStyles";
import { PictureIcon, DeleteIcon } from "@/src/SVG/NewSheetSVG";
import { useLessonStore } from "@/src/context/useLessonStore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LoadScreen } from "../LoadScreen";
import { ModeratingScreen } from "../ModeratingScreen";
import { ApprovedScreen } from "../ApprovedScreen";
import { RejectedScreen } from "../RejectedScreen";
import { CloudinaryRequest } from "@/src/types/createlesson";
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from "@/src/navigation/appNavigator";
import { GetLessonByIdAPI, GetSheetApi, GetSheetApiForEdit } from "@/src/api/lessonmain/lessonmain";


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
        clearStore,
        lessonId,
        setSheetsFromBackend
    } = useLessonStore();
    const currentSheet = sheets[currentIndex];
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const navigation = useNavigation();
    const [isModerating, setIsModerating] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [approved, setApproved] = useState(false);
    const [loading, setLoading] = useState(false);
    const route = useRoute<RouteProp<RootStackParamList, 'NewSheetScreen'>>();
    const isEdit = route.params?.isEdit;
    const currentLessonId = route.params?.lessonId;
    const [ModerateError, setModerateError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const pickImage = async () => {
        setLoading(true);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.7,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];

            const fileName = asset.uri.split('/').pop() || 'upload.jpg';

            const match = /\.(\w+)$/.exec(fileName);
            const fileType = match ? `image/${match[1]}` : `image/jpeg`;
            if (currentSheet.sheet_header != '') {
                await saveCurrentSheet();
            }
            else {
                Alert.alert('Ошибка', 'Сначала введите заголовок листа');
                setLoading(false);
                return;
            }
            if (currentSheet.serverId === null) {
                Alert.alert('Ошибка загрузки', 'Попробуйте снова');
                setLoading(false);
                return;
            }
            const requestData: CloudinaryRequest = {
                lesson_id: lessonId || 0,
                sheet_id: currentSheet.serverId || 0,
                file: {
                    uri: asset.uri,
                    name: fileName,
                    type: fileType,
                }
            };
            await handleLoadImage(requestData);

        }
    };

    const handleDeleteImage = async () => {
        const response = await DeleteLessonBanner({ sheet_id: currentSheet.serverId || 0 });
        setLoading(true);
        if (response.status == "success") {
            setLoading(false);
            setSelectedImage(null);
            updateSheetField('picture_url', '');
        } else {
            setLoading(false);
            Alert.alert('Ошибка', 'Ошибка удаления изображения');
        }
    };


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
        return false;
    };

    const handlePublish = async () => {
        setIsModerating(true);
        setModerateError(null);
        try {
            let ModerResponse;
            if (isEdit) {
                ModerResponse = await Publish(currentLessonId || 0);
            }
            else {
                ModerResponse = await Publish(lessonId || 0);
            }
            if (ModerResponse.status === 'success') {
                setIsModerating(false);
                setApproved(true);
                clearStore();
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

    const handleLoadImage = async (data: CloudinaryRequest) => {
        try {
            setLoading(false);
            setIsModerating(true);
            setModerateError(null);
            const response = await LoadLessonBanner(data);
            if (response.banner_url) {
                setSelectedImage(response.banner_url || '');
                updateSheetField('picture_url', response.banner_url || '');
                setIsModerating(false);
            } else {
                setIsModerating(false);
                setRejected(true);
                setModerateError(response.reason || 'Ошибка модерации');
            }
        } catch (error: any) {
            setIsModerating(false);
            setRejected(true);

            if (error.response?.data?.detail) {
                setModerateError(error.response.data.detail.reason || error.response.data.detail.message);
            } else {
                setModerateError("Ошибка запроса загрузки баннера урока");
                console.error(`Ошибка запроса загрузки баннера урока:`, error);
            }
        }
    }
    useEffect(() => {
        const loadSheets = async () => {
            if (!isEdit) {
                return;
            } useEffect
            try {
                setLoading(true);
                const response = await GetSheetApiForEdit({ lesson_id: currentLessonId });
                if (response && response.sheets) {
                    setSheetsFromBackend(response.sheets);
                    console.log(response.sheets);
                }
            } catch (error) {
                console.error("Ошибка при загрузке листов:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSheets();
    }, [currentLessonId]);
    useEffect(() => {
        if (currentSheet?.picture_url) {
            setSelectedImage(currentSheet.picture_url);
        } else {
            setSelectedImage(null);
        }
    }, [currentIndex, currentSheet?.picture_url]);

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

    if (loading) {
        return (
            <LoadScreen />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={createLessonStyles.headerLeft}>
                    <Pressable style={createLessonStyles.closeIconWrapper}
                        onPress={() => { clearStore(); navigation.goBack() }}
                    >
                        <CloseIcon></CloseIcon>
                    </Pressable>
                    <Text style={styles.headerTitle}>{isEdit ? 'Новая страница' : 'Редактировать урок'}</Text>
                    <Pressable style={styles.publishButton}
                        onPress={handlePublish}
                    >
                        <Text style={styles.publishButtonText}>{isEdit ? 'Опубликовать' : 'Сохранить'}</Text>
                    </Pressable>
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
                        <Text style={styles.charCount}>{currentSheet.sheet_header?.length || 0}/50</Text>
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
                            <Text style={styles.charCount}>{currentSheet.content?.length || 0}/500</Text>
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
                                    <Text style={styles.charCount}>{currentSheet.content_advice?.length || 0}/75</Text>
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
                                    <Text style={styles.charCount}>{currentSheet.content_danger?.length || 0}/75</Text>
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
                            <Text style={styles.charCount}>{currentSheet.description_for_video_or_picture?.length || 0}/50</Text>
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
                            <Text style={styles.charCount}>{currentSheet.question_text?.length || 0}/150</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Введи вопрос..."
                            placeholderTextColor={COLORS.textSecondary}
                            maxLength={150}
                            value={currentSheet.question_text}
                            onChangeText={(text) => updateSheetField('question_text', text)}
                        />
                        <View style={styles.fieldHeader}>
                            <Text style={styles.fieldLabel}>Ответы</Text>
                        </View>
                        {currentSheet.quiz_options?.map((option: any, index: number) => (
                            <View key={index} style={styles.answerRow}>
                                <Pressable
                                    style={[styles.checkbox, option.is_correct && styles.checkboxActive]}
                                    onPress={() => {
                                        const newOptions = [...(currentSheet.quiz_options || [])];
                                        newOptions[index] = { ...newOptions[index], is_correct: !newOptions[index].is_correct };
                                        updateSheetField('quiz_options', newOptions);
                                    }}
                                >
                                    {option.is_correct && (
                                        <View style={styles.checkIconWrapper}>
                                            <Text style={{ color: COLORS.surface, fontSize: 12, fontWeight: 'bold' }}>✓</Text>
                                        </View>
                                    )}
                                </Pressable>
                                <TextInput
                                    style={[styles.answerInput, option.is_correct && styles.answerInputCorrect]}
                                    placeholder={`Ответ ${index + 1}...`}
                                    placeholderTextColor={COLORS.textSecondary}
                                    maxLength={100}
                                    value={option.option}
                                    onChangeText={(text) => {
                                        const newOptions = [...(currentSheet.quiz_options || [])];
                                        newOptions[index] = { ...newOptions[index], option: text };
                                        updateSheetField('quiz_options', newOptions);
                                    }}
                                />
                                <Pressable
                                    onPress={() => {
                                        const newOptions = (currentSheet.quiz_options || []).filter((_, i) => i !== index);
                                        updateSheetField('quiz_options', newOptions);
                                    }}
                                    style={{ padding: 4, marginLeft: 4 }}
                                >
                                    <Text style={{ color: COLORS.error, fontSize: 24, lineHeight: 24 }}>×</Text>
                                </Pressable>
                            </View>
                        ))}
                        {(!currentSheet.quiz_options || currentSheet.quiz_options.length < 6) && (
                            <Pressable
                                style={styles.addAnswerButton}
                                onPress={() => {
                                    const newOptions = [...(currentSheet.quiz_options || [])];
                                    newOptions.push({ option: '', is_correct: false });
                                    updateSheetField('quiz_options', newOptions);
                                }}
                            >
                                <Text style={styles.addAnswerText}>+ Добавить вариант</Text>
                            </Pressable>
                        )}
                    </KeyboardAvoidingView>
                )
                }
                {(currentSheet.sheetType === 'PICTURE') && (
                    <KeyboardAvoidingView style={styles.pageContent}>
                        <View style={styles.fieldHeader}>
                            <Text style={styles.fieldLabel}>Комментарий</Text>
                            <Text style={styles.charCount}>{currentSheet.description_for_video_or_picture?.length || 0}/50</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Коротко о фото..."
                            placeholderTextColor={COLORS.textSecondary}
                            maxLength={50}
                            value={currentSheet.description_for_video_or_picture}
                            onChangeText={(text) => updateSheetField('description_for_video_or_picture', text)}
                        />
                        {selectedImage ? (
                            <View>
                                <Pressable onPress={pickImage} style={styles.pictureUploadZone}>
                                    <Image
                                        source={{ uri: selectedImage }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </Pressable>
                                <Text style={{ color: "#FF6666", marginVertical: 0, marginStart: 80 }}
                                    onPress={() => handleDeleteImage()}
                                >Удалить изображение</Text>
                            </View>

                        ) : (
                            <Pressable onPress={pickImage} style={styles.pictureUploadZone}>
                                <View style={styles.uploadIconCircle}>
                                    <View style={styles.uploadIconWrapper}>
                                        <PictureIcon />
                                    </View>
                                </View>
                                <Text style={styles.uploadHintAccent}>Нажми для загрузки</Text>
                                <Text style={styles.uploadHint}>PNG, JPG до 10 MB</Text>
                            </Pressable>

                        )}
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