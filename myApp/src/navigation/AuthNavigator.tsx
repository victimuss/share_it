import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisScreen } from '../screens/auth/RegisScreen';
import { AuthStackParamList } from './types';
import ZkpAuthScreen from '../screens/auth/CryptoAuthScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={ZkpAuthScreen} />
      <Stack.Screen name="Register" component={ZkpAuthScreen} />
    </Stack.Navigator>
  );
}; 