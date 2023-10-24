/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit/theme';
interface ISwitch {
    size?: number;
    /**
     * Color of the foreground switch grip.
     */
    thumbColor?: string | undefined;

    /**
     * Custom colors for the switch track
     *
     * Color when false and color when true
     */
    trackColor?:
        | {
              inActive?: string | null | undefined;
              active?: string | null | undefined;
          }
        | undefined;

    /**
     * If true the user won't be able to toggle the switch.
     * Default value is false.
     */
    disabled?: boolean | undefined;

    /**
     * Invoked with the change event as an argument when the value changes.
     */
    onChange?: () => void | null | undefined;

    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: ((value: boolean) => Promise<void> | void) | null | undefined;

    /**
     * The value of the switch. If true the switch will be turned on.
     * Default value is false.
     */
    value?: boolean | undefined;

    style?: StyleProp<ViewStyle> | undefined;
}

const Switch = (props: ISwitch) => {
    const {
        onChange,
        value,
        thumbColor = 'white',
        trackColor = {
            active: 'blue',
            inActive: 'white',
        },
        size = 50,
        disabled,
    } = props;
    const switchTranslate = useRef(new Animated.Value(0)).current;
    const colors = useThemeColors();
    const styles = myStyles(colors);

    useEffect(() => {
        Animated.spring(switchTranslate, {
            toValue: value ? size - size * 0.55 : size * 0.05,
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
            useNativeDriver: false,
        }).start();
    }, [value, switchTranslate]);

    const memoizedOnSwitchPressCallback = React.useCallback(() => {
        onChange();
    }, [onChange, value]);

    return (
        <Pressable onPress={memoizedOnSwitchPressCallback} disabled={disabled}>
            <Animated.View
                style={[
                    styles.containerStyle(size),
                    {
                        backgroundColor: switchTranslate.interpolate({
                            inputRange: [size * 0.05, size - size * 0.55],
                            outputRange: [trackColor.inActive, trackColor.active],
                            easing: Easing.in(Easing.linear),
                        }),
                    },
                ]}>
                <Animated.View
                    style={[
                        styles.circleStyle(size),
                        { backgroundColor: thumbColor },
                        {
                            transform: [
                                {
                                    translateX: switchTranslate,
                                },
                            ],
                        },
                        styles.shadowValue,
                    ]}
                />
            </Animated.View>
        </Pressable>
    );
};

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create<any>({
        container: {},
        circleStyle: (size: number) => ({
            width: size * 0.5,
            height: size * 0.5,
            borderRadius: size,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        }),
        shadowValue: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
        },
        containerStyle: (size: number) => ({
            width: size,
            paddingVertical: size * 0.05,
            borderRadius: size * 0.65,
        }),
    });
};

export default Switch;
