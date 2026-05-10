import { useMemo } from 'react';
import { useThemeStore } from '../context/useThemeStore';
import { Theme } from '../styles/root';

export const useStyles = <T>(createStyles: (theme: Theme) => T): T => {
    const theme = useThemeStore((state) => state.theme);
    return useMemo(() => createStyles(theme), [theme, createStyles]);
}

