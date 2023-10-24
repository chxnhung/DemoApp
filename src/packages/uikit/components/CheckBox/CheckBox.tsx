import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';

import styles, { _textStyle } from './CheckBox.style';
import { ICheckboxProps } from './types';

import { useThemeColors } from 'packages/hooks/useTheme';

const DEFAULT_CHECK_IMG = require('./check.png');

const CheckBox = (props: ICheckboxProps) => {
    const colors = useThemeColors();
    const {
        size = 25,
        text,
        fillColor = colors.black,
        isChecked,
        unfillColor = colors.transparent,
        disableText = false,
        useNativeDriver = true,
        disableBuiltInState = false,
        ImageComponent = Image,
        TouchableComponent = Pressable,
        bounceEffectIn = 0.9,
        bounceEffectOut = 1,
        bounceVelocityIn = 0.1,
        bounceVelocityOut = 0.4,
        bouncinessIn = 20,
        bouncinessOut = 20,
        iconComponent,
        textComponent,
        iconStyle,
        innerIconStyle,
        style,
        textStyle,
        iconImageStyle,
        textContainerStyle,
        checkIconImageSource = DEFAULT_CHECK_IMG,
        onPress,
        disableBounce = false,
        radius = 0,
    } = props;
    const [checked, setChecked] = useState<boolean>(false);
    const [bounceValue] = useState<Animated.Value>(new Animated.Value(1));
    useEffect(() => {
        setChecked(props.isChecked || false);
    }, []);

    const bounceEffect = (value: number, velocity: number, bounciness: number) => {
        Animated.spring(bounceValue, {
            toValue: value,
            velocity,
            bounciness,
            useNativeDriver,
        }).start();
    };

    const renderCheckIcon = () => {
        const checkStatus = disableBuiltInState ? isChecked! : checked;
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: bounceValue }] },
                    styles.iconContainer(size, checkStatus, fillColor, unfillColor, radius),
                    iconStyle,
                ]}>
                <View style={[styles.innerIconContainer(size, fillColor, radius), innerIconStyle]}>
                    {iconComponent ||
                        (checkStatus && (
                            <ImageComponent
                                source={checkIconImageSource}
                                style={[styles.iconImageStyle, iconImageStyle]}
                            />
                        ))}
                </View>
            </Animated.View>
        );
    };

    const renderCheckboxText = () => {
        const checkDisableTextType = typeof disableText === 'undefined';
        return (
            (!disableText || checkDisableTextType) &&
            (textComponent || (
                <View style={[styles.textContainer, textContainerStyle]}>
                    <Text style={[_textStyle(disableBuiltInState ? isChecked! : checked), textStyle]}>{text}</Text>
                </View>
            ))
        );
    };

    useMemo(() => {
        if (onPress) {
            onPress(checked);
        }
    }, [checked]);

    const handlePress = () => {
        if (!disableBuiltInState) {
            setChecked(!checked);
        } else {
            if (onPress) {
                onPress(checked);
            }
        }
    };

    return (
        <TouchableComponent
            {...props}
            style={[styles.container, style]}
            onPressIn={() => {
                if (!disableBounce) {
                    bounceEffect(bounceEffectIn, bounceVelocityIn, bouncinessIn);
                }
            }}
            onPressOut={() => {
                if (!disableBounce) {
                    bounceEffect(bounceEffectOut, bounceVelocityOut, bouncinessOut);
                }
            }}
            onPress={handlePress}>
            {renderCheckIcon()}
            {renderCheckboxText()}
        </TouchableComponent>
    );
};

export default CheckBox;
