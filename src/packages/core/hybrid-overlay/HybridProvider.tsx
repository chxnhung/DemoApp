import React, { useCallback, useMemo } from 'react';

import HybridContext from './HybridContext';
import { IColorModeProviderProps } from '../color-mode';
import { useModeManager } from '../color-mode/hooks';

function HybridProvider({
    children,
    options: { initialColorMode = 'light', useSystemColorMode },
    colorModeManager,
}: IColorModeProviderProps) {
    const { mode, setColorMode } = useModeManager(initialColorMode, useSystemColorMode, colorModeManager);

    const toggleColorMode = useCallback(() => {
        setColorMode(mode === 'light' ? 'dark' : 'light');
    }, [mode, setColorMode]);

    const contextValue = useMemo(() => {
        return {
            colorMode: {
                mode,
                toggleColorMode,
                setColorMode,
            },
        };
    }, [mode, toggleColorMode, setColorMode]);

    return <HybridContext.Provider value={contextValue}>{children}</HybridContext.Provider>;
}

export default HybridProvider;
