import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/auth/main/MainScreen';
import { ProfileScreen } from '../screens/auth/main/ProfileScreen';
import TabNavigator from '../screens/TabBottom';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};