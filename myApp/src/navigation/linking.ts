import * as Linking from 'expo-linking';

export const linking = {
  prefixes: [
    Linking.createURL('/'),
    Linking.createURL('--/'),
    'https://sparkedu.com',
    'sparkedu://',
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
        screens: {
          Home: 'home',
          Search: 'search',
          MyLessons: 'my-lessons',
          Profile: 'profile',
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
    return null;
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => {
      console.log("ПРИШЛА ССЫЛКА:", url);
      listener(url);
    };

    const subscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      subscription.remove();
    };
  },
};
