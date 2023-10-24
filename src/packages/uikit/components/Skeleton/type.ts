import { ReactElement } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

export interface ISkeletonProps extends ViewProps {
    /**
     * The fadeIn duration in seconds
     */
    fadeDuration?: number;
    /**
     * If true, it will render its children
     */
    isLoaded?: boolean;
    /**
     * The animation speed in seconds
     */
    speed?: number;
    /**
     * The color at the animation start
     */
    startColor?: string;
    /**
     * The color at the animation end
     */
    endColor?: string;
    /**
     * Sizes for Skeleton
     */
    size?: number;
    h?: number | string;
    w?: number | string;
    children?: ReactElement<ViewProps>;
    constainerStyle?: StyleProp<ViewStyle>;
}
