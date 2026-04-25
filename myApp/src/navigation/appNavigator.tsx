import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/auth/main/MainScreen';
import { ProfileScreen } from '../screens/auth/main/ProfileScreen';
import TabNavigator from '../screens/TabBottom';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewLessonScreen } from '../screens/auth/main/NewLesson/NewLessonScreen';
import { NewSheetScreen } from '../screens/auth/main/NewLesson/NewSheetScreen';
import LessonMainScreen from '../screens/Lesson/LessonMainPage';
import SheetScreen from '../screens/Lesson/SheetScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  NewLessonScreen: { isEdit?: boolean; editLessonId?: number } | undefined;
  NewSheetScreen: { lessonId: number; isEdit?: boolean } | undefined;
  LessonMainScreen: { lessonId: number };
  LessonPage: { lessonId: number };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="NewLessonScreen" component={NewLessonScreen} />
      <Stack.Screen name="NewSheetScreen" component={NewSheetScreen} />
      <Stack.Screen name="LessonMainScreen" component={LessonMainScreen} />
      <Stack.Screen name="LessonPage" component={SheetScreen} />
    </Stack.Navigator>
  );
};