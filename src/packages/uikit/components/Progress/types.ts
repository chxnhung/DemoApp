/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Linecap } from 'react-native-svg';

export type IProgressBarProps = {
    animated?: boolean;
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    children?: ReactNode;
    color?: string;
    height?: number;
    indeterminate?: boolean;
    indeterminateAnimationDuration?: number;
    onLayout?: (event) => void;
    progress?: number;
    style?: StyleProp<ViewStyle>;
    unfilledColor?: string;
    width?: number;
    useNativeDriver?: boolean;
    animationConfig?: object;
    animationType?: 'decay' | 'timing' | 'spring';
};

export type IProgressCircleProps = {
    style?: StyleProp<ViewStyle>;
    size?: number;
    fill?: number;
    width?: number;
    backgroundWidth?: number;
    tintColor?: string;
    tintTransparency?: boolean;
    backgroundColor?: string;
    rotation?: number;
    lineCap?: Linecap;
    fillLineCap?: Linecap;
    arcSweepAngle?: number;
    children?: React.FC;
    childrenContainerStyle?: object;
    padding?: number;
    renderCap?: (...args: any[]) => any;
    dashedBackground?: object;
    dashedTint?: object;
};

export type IProgressAnimatedCircleProps = {
    prefill?: number;
    duration?: number;
    easing?: (...args: any[]) => any;
    onAnimationComplete?: (...args: any[]) => any;
    useNativeDriver?: boolean;
    delay?: number;
    tintColorSecondary?: string;
};
