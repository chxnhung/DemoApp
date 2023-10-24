import { isEqual } from 'lodash';
import React, { useImperativeHandle, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import Icon from 'components/Icon';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit/theme';
import { scale } from 'themes/scales';
import { sleep } from 'utils/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewFadeRef = React.createRef<any>();

export const viewFade = {
    fade: () => {
        viewFadeRef?.current?.handleFade();
    },
    in: () => {
        viewFadeRef?.current?.fadeIn();
    },
    out: () => {
        viewFadeRef?.current?.fadeOut();
    },
};

export interface IFadeViewProps {
    pause?: boolean;
    color?: string;
    size?: number;
    containerStyle?: StyleProp<ViewStyle>;
    animationDuration?: number;
    onPressView?: () => void;
}

const FadeView = React.forwardRef((props: IFadeViewProps, ref) => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const fadeViewRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { pause, size = scale(80), animationDuration = 500, onPressView, containerStyle } = props;

    useImperativeHandle(ref, () => {
        return { handleFade, fadeIn, fadeOut };
    });
    const handleFade = async () => {
        await fadeIn();
        await sleep(animationDuration);
        await fadeOut();
    };

    const fadeIn = async () => {
        Animated.timing(fadeAnim, {
            toValue: 0.9,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = async () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    };

    const IconName = `${pause ? 'Play' : 'Pause'}`;

    return (
        <Animated.View ref={fadeViewRef} style={[{ opacity: fadeAnim }, containerStyle]}>
            <TouchableOpacity style={styles.fadingContainer} onPress={onPressView}>
                <Icon name={IconName} size={size} />
            </TouchableOpacity>
        </Animated.View>
    );
});

export default React.memo(FadeView, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        fadingContainer: {
            backgroundColor: themeColors.transparent,
            alignSelf: 'center',
        },
    });
