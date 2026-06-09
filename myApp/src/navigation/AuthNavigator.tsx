import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisScreen } from '../screens/auth/RegisScreen';
import { AuthStackParamList } from './types';
import ZkpAuthScreen from '../screens/auth/CryptoAuthScreen';
import { LegalScreen } from '../screens/auth/LegalScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={ZkpAuthScreen} />
      <Stack.Screen name="Register" component={ZkpAuthScreen} />
      <Stack.Screen name="Legal" component={LegalScreen} options={{ headerShown: false, presentation: 'modal' }} />
    </Stack.Navigator>
  );
}; 