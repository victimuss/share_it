import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/auth/main/MainScreen';
import { ProfileScreen } from '../screens/auth/main/ProfileScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} /> 
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};