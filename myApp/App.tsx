import React, { FC, useEffect, useState } from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { linking } from './src/navigation/linking';
import * as Linking from 'expo-linking';

// Не скрываем splash screen сразу
SplashScreen.preventAutoHideAsync();

import TabNavigator from './src/screens/TabBottom';
import { NewLessonScreen } from './src/screens/auth/main/NewLesson/NewLessonScreen';
import { NewSheetScreen } from './src/screens/auth/main/NewLesson/NewSheetScreen';
import LessonMainScreen from './src/screens/Lesson/LessonMainPage';
import SheetScreen from './src/screens/Lesson/SheetScreen';

import { MainScreen as LoginScreen } from './src/screens/auth/login/MainScreen';
import { RegistrationScreen } from './src/screens/auth/login/RegistrationScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

const MainApp = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return null;

  return (
    <NavigationContainer linking={linking}>
      <StatusBar style="auto" />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <RootStack.Screen name="MainTabs" component={TabNavigator} />
            <RootStack.Screen name="NewLessonScreen" component={NewLessonScreen} />
            <RootStack.Screen name="NewSheetScreen" component={NewSheetScreen} />
            <RootStack.Screen name="LessonMainScreen" component={LessonMainScreen} />
            <RootStack.Screen name="LessonPage" component={SheetScreen} />
          </>
        ) : (
          <>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegistrationScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
      <MainApp />
    </AuthProvider>
  );
};

export default App;
