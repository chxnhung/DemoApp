import { useContext, useMemo } from 'react';

import { useBaseConfig } from 'packages/core/BaseContext';
import { HybridContext } from 'packages/core/hybrid-overlay';

export function useTheme() {
    const theme = useBaseConfig('useTheme').theme;
    if (!theme) {
        throw Error('useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`');
    }
    return theme;
}

export function useConfig() {
    const theme = useBaseConfig('useConfig').theme;
    const configs = theme.config;
    if (!configs) {
        throw Error('useConfig: `config` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`');
    }
    return configs;
}

export function useThemeColors() {
    const theme = useBaseConfig('useThemeColors').theme;
    const colors = theme.colors;
    const { colorMode } = useContext(HybridContext);
    const themeColors = useMemo(
        () =>
            colorMode.mode === 'dark'
                ? {
                      ...colors,
                      ...colors.darkColors,
                  }
                : {
                      ...colors,
                      ...colors.lightColors,
                  },
        [colors, colorMode]
    );
    if (!colors) {
        throw Error('useThemeColors: `colors` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`');
    }
    return themeColors;
}
