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
import { LoginScreen } from './app/screens/auth/LoginScreen';

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
    <>
      <StatusBar style="auto" />
      <LoginScreen />
    </>
  );
};

export default App;
