import { ReactElement } from 'react';
import { ImageStyle, StyleProp, TextInputProps, ViewProps, ViewStyle } from 'react-native';

export type ISearchBarProps = {
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    leftStyle?: StyleProp<ImageStyle>;
    rightStyle?: StyleProp<ImageStyle>;
    placeholderTextColor?: string;
    placeholder?: string;
    hideLeft?: boolean;
    hideRight?: boolean;
    left?: ReactElement<ViewProps>;
    right?: ReactElement<ViewProps>;
    handleSearch?: (value: string) => void;
};
