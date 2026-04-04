import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem('access_token', accessToken);
  await AsyncStorage.setItem('refresh_token', refreshToken);
};

export const getToken = async () => {
  const access_token = await AsyncStorage.getItem('access_token');
  const refresh_token = await AsyncStorage.getItem('refresh_token');
  return { access_token, refresh_token };
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('refresh_token');
};

export const saveToken = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    await AsyncStorage.setItem('refresh_token', refreshToken);
  }
};

