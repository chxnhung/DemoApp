import { ITheme } from 'packages/uikit/theme';
import { IColorModes } from 'packages/uikit/theme/types';
import { createContext } from 'packages/utils/createContext';

export interface IBaseConfig {
    theme?: ITheme;
    dependencies?: {
        'liner-gradient': unknown;
    };
    colorModes?: IColorModes;
}

export const defaultConfig: IBaseConfig = {
    // strictMode: 'off';
};

export const [BaseConfigProvider, useBaseConfig] = createContext<{
    config: IBaseConfig;
    theme?: ITheme;
}>('BaseConfigProvider');
