import React, { FC, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisScreen } from '../screens/auth/RegisScreen';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from '../navigation/AuthNavigator';
import { AuthProvider } from '../context/AuthContext';
import { RootNavigator } from '../navigation/RootNavigator';


// Не скрываем splash screen сразу
SplashScreen.preventAutoHideAsync();

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Inter_800ExtraBold,
        });
      } catch (e) {
        // Ошибки на web можно игнорировать - шрифты работают через SystemFont fallback
        console.warn('Font loading warning:', e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
