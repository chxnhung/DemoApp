import React from 'react';

import { IColorModeProviderProps } from './color-mode';
import { HybridProvider } from './hybrid-overlay';

import { BaseConfigProvider, defaultConfig, IBaseConfig } from 'packages/core/BaseContext';
import { theme as defaultTheme, IColorModes, ITheme } from 'packages/uikit/theme';
export interface IBaseProvider {
    theme?: ITheme;
    colorModeManager?: IColorModeProviderProps['colorModeManager'];
    children?: React.ReactNode;
    config?: IBaseConfig;
}

const BaseProvider = (props: IBaseProvider) => {
    const { children, colorModeManager, config = defaultConfig, theme: propsTheme = defaultTheme } = props;
    const theme = config?.theme ?? propsTheme;
    // SOLID

    return (
        // @ts-ignore
        <BaseConfigProvider config={config} theme={theme}>
            <HybridProvider colorModeManager={colorModeManager} options={theme.config}>
                {children}
            </HybridProvider>
        </BaseConfigProvider>
    );
};

export { BaseProvider };
