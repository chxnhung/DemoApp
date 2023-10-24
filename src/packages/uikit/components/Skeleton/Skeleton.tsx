import React, { memo } from 'react';
import { Animated, View } from 'react-native';

import type { ISkeletonProps } from './type';

import { useThemeColors } from 'packages/hooks/useTheme';

const Skeleton = (props: ISkeletonProps) => {
    const colors = useThemeColors();
    const {
        startColor = colors.gray1,
        endColor = colors.transparent,
        fadeDuration = 0.1,
        speed = 1,
        h = 40,
        w = '100%',
        isLoaded,
        children,
        constainerStyle,
    } = props;
    const blinkAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const blink = Animated.sequence([
            Animated.timing(blinkAnim, {
                toValue: 1,
                duration: fadeDuration * 10000 * (1 / speed),
                useNativeDriver: true,
            }),
            Animated.timing(blinkAnim, {
                toValue: 0,
                duration: fadeDuration * 10000 * (1 / speed),
                useNativeDriver: true,
            }),
        ]);
        Animated.loop(blink).start();
    }, [blinkAnim, props]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const skeletonStyle: any = {
        container: {
            height: h,
            width: w,
            backgroundColor: endColor,
            overflow: 'hidden',
        },
        skeleton: {
            height: '100%',
            width: '100%',
            backgroundColor: startColor,
            opacity: blinkAnim,
        },
    };

    return isLoaded ? (
        children
    ) : (
        <View style={[skeletonStyle.container, constainerStyle]}>
            <Animated.View style={skeletonStyle.skeleton} />
        </View>
    );
};

export default memo(Skeleton);
