import { create } from 'zustand';
import { Appearance, ColorSchemeName } from 'react-native';
import { lightTheme, darkTheme, Theme } from '../styles/root';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
    mode: 'light' | 'dark' | 'system';
    theme: Theme;
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
    syncWithSystem: (systemTheme: ColorSchemeName) => void;
}

const getActiveTheme = (mode: 'light' | 'dark' | 'system'): Theme => {
    if (mode === 'dark') return darkTheme;
    if (mode === 'light') return lightTheme;
    return Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
    mode: 'system',
    theme: getActiveTheme('system'),
    setThemeMode: (mode) => {
        set({ mode, theme: getActiveTheme(mode) });
    },

    syncWithSystem: (systemTheme) => {
        const { mode } = get();
        if (mode === 'system') {
            set({ theme: systemTheme === 'dark' ? darkTheme : lightTheme });
        }
    },
}));

export { Theme };
