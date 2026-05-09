import * as Linking from 'expo-linking';

export const linking = {
  prefixes: [
    Linking.createURL('/'),
    'https://sparkedu.com',
    'sparkedu://',
    '', // Важно: разрешает React Navigation принимать чистые пути
  ],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',

      LessonMainScreen: 'lesson/:lessonId',
      LessonPage: 'lesson/:lessonId/sheet',

      NewLessonScreen: 'lesson/new',
      NewSheetScreen: 'lesson/:lessonId/sheet/new',

      MainTabs: {
        path: '',
        initialRouteName: 'Home',
        screens: {
          Home: 'home',
          Search: 'search',
          MyLessons: 'my-lessons',
          Profile: 'profile',
        },
      },
    },
  },
};
