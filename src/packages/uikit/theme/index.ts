import { ColorModeOptions } from 'packages/core';
import base from 'packages/uikit/theme/base';

const config: ColorModeOptions = {
    useSystemColorMode: false,
    initialColorMode: 'light',
};

export const theme = {
    ...base,
    config,
};

export type Theme = typeof theme & { fontConfig: unknown };

export type Colors = typeof theme.colors;

export interface ICustomTheme {}

export interface ICustomColors {}

export interface ITheme extends ICustomTheme, Omit<Theme, keyof ICustomTheme> {}

export interface IColors extends ICustomColors, Omit<Colors, keyof ICustomColors> {}

export * from './types';
