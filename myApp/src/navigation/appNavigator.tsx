import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/auth/main/MainScreen';
import { ProfileScreen } from '../screens/auth/main/ProfileScreen';
import TabNavigator from '../screens/TabBottom';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewLessonScreen } from '../screens/auth/main/NewLesson/NewLessonScreen';
import { NewSheetScreen } from '../screens/auth/main/NewLesson/NewSheetScreen';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  NewLessonScreen: undefined;
  NewSheetScreen: { lessonId: number | null };
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="NewLessonScreen" component={NewLessonScreen} />
      <Stack.Screen name="NewSheetScreen" component={NewSheetScreen} />
    </Stack.Navigator>
  );
};