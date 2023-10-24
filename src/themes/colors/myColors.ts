import { commonColors } from './commonColors';
import { darkColors } from './darkColors';
import { lightColors } from './lightColors';

import { theme as baseTheme } from 'packages/uikit/theme';

export const myColors = {
    ...commonColors,
    darkColors,
    lightColors,
};

const myThemeColors = {
    ...baseTheme.colors,
    ...commonColors,
    ...darkColors,
};

export type MyThemeType = typeof myColors;
export type MyColorsType = typeof myThemeColors;
