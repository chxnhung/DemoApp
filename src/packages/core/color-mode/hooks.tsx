import React, { useEffect, useState } from 'react';
import { useColorScheme as _useColorScheme, AppState, StatusBar } from 'react-native';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { ColorMode, IColorModeContextProps, StorageManager } from './types';
import { HybridContext, IHybridContextProps } from '../hybrid-overlay';

export const useColorMode = (): IColorModeContextProps => {
    const {
        colorMode: colorModeContext,
    }: {
        colorMode: IColorModeContextProps;
    } = React.useContext<IHybridContextProps>(HybridContext);
    if (colorModeContext === undefined) {
        throw new Error('useColorMode must be used within a NativeBaseProvider');
    }
    return colorModeContext;
};

export const useAppState = () => {
    const subscription = React.useMemo(
        () => ({
            getCurrentValue: () => AppState.currentState,
            subscribe: (callback: () => void) => {
                const subsription = AppState.addEventListener('change', callback);
                return () => {
                    subsription.remove();
                };
            },
        }),
        []
    );

    return useSyncExternalStore(subscription.subscribe, subscription.getCurrentValue, subscription.getCurrentValue);
    // TODO: update
    //   const isSSR = useBaseConfig('useBreakpointResolvedProps').isSSR;

    //   if (isSSR) {
    //     return 'unknown';
    //   } else {
    //     // This if statement technically breaks the rules of hooks, but is safe
    //     // because the condition never changes after mounting.
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     return useSyncExternalStore(
    //       subscription.subscribe,
    //       subscription.getCurrentValue,
    //       subscription.getCurrentValue
    //     );
    //   }
};

export const useColorScheme = () => {
    const colorScheme = _useColorScheme();
    const [currentScheme, setCurrentScheme] = useState(colorScheme);
    const appState = useAppState();

    useEffect(() => {
        if (appState === 'active') {
            setCurrentScheme(colorScheme);
        }
    }, [appState, colorScheme]);

    return currentScheme;
};

export const useModeManager = (
    initialColorMode: ColorMode,
    useSystemColorMode: boolean | undefined,
    colorModeManager?: StorageManager
) => {
    const systemColorMode = useColorScheme();

    if (useSystemColorMode) {
        initialColorMode = systemColorMode;
    }

    const [mode, setRawMode] = useState<ColorMode>(initialColorMode);
    const setColorMode = React.useCallback(
        async (val: ColorMode) => {
            if (colorModeManager) {
                await colorModeManager.set(val);
            }
            StatusBar.setBarStyle(val ? `${val === 'dark' ? 'light' : 'dark'}-content` : 'default');
            setRawMode(val);
        },
        [colorModeManager]
    );

    // For initial setting initial color mode from storage
    useEffect(() => {
        if (colorModeManager) {
            (async function getMode() {
                const value = await colorModeManager.get(initialColorMode);
                if (value && value !== mode) {
                    setRawMode(value);
                }
            })();
        }
    }, [mode, initialColorMode, colorModeManager]);

    // Set system color mode only when user has not passed a colorModeManager
    useEffect(() => {
        if (!colorModeManager && useSystemColorMode) {
            setRawMode(systemColorMode);
        }
    }, [systemColorMode, colorModeManager, useSystemColorMode, setRawMode]);

    return { mode, setColorMode };
};
