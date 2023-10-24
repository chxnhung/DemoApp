import React, { useState } from 'react';
import { Animated, PixelRatio, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { RadioButtonProps } from './types';

import { useThemeColors } from 'packages/hooks/useTheme';
import { scale } from 'themes/scales';

const RadioButton = (props: RadioButtonProps) => {
    const colors = useThemeColors();
    const {
        borderColor,
        borderSize = 2,
        color = colors.black,
        containerStyle,
        description,
        descriptionStyle,
        disabled = false,
        id,
        label,
        labelStyle,
        layout = 'row',
        onPress,
        selected = false,
        size = 24,
        testID,
        bounceEffectIn = 0.9,
        bounceEffectOut = 1,
        bounceVelocityIn = 0.1,
        bounceVelocityOut = 0.4,
        bouncinessIn = 20,
        bouncinessOut = 20,
        disableBounce = false,
    } = props;
    const borderWidth = PixelRatio.roundToNearestPixel(borderSize);
    const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5);
    const sizeFull = PixelRatio.roundToNearestPixel(size);
    const [bounceValue] = useState<Animated.Value>(new Animated.Value(1));

    let orientation: StyleProp<ViewStyle> = { flexDirection: 'row' };
    let margin: StyleProp<ViewStyle> = { marginLeft: 10 };

    if (layout === 'column') {
        orientation = { alignItems: 'center' };
        margin = { marginTop: 10 };
    }

    const handlePress = () => {
        if (disabled) {
            return null;
        }
        if (onPress) {
            onPress(id);
        }
    };

    const bounceEffect = (value: number, velocity: number, bounciness: number) => {
        Animated.spring(bounceValue, {
            toValue: value,
            velocity,
            bounciness,
            useNativeDriver: true,
        }).start();
    };

    const renderIconView = () => {
        return (
            <Animated.View style={[{ transform: [{ scale: bounceValue }] }]}>
                <View
                    style={[
                        styles.border,
                        {
                            borderColor: borderColor || color,
                            borderWidth,
                            width: sizeFull,
                            height: sizeFull,
                            borderRadius: sizeHalf,
                        },
                    ]}>
                    {selected && (
                        <View
                            style={{
                                backgroundColor: color,
                                width: sizeHalf,
                                height: sizeHalf,
                                borderRadius: sizeHalf,
                            }}
                        />
                    )}
                </View>
            </Animated.View>
        );
    };

    return (
        <>
            <Pressable
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
                onPress={handlePress}
                style={[styles.container, orientation, { opacity: disabled ? 0.2 : 1 }, containerStyle]}
                testID={testID}>
                {renderIconView()}
                {Boolean(label) && <Text style={[margin, labelStyle]}>{label}</Text>}
            </Pressable>
            {Boolean(description) && <Text style={[margin, descriptionStyle]}>{description}</Text>}
        </>
    );
};

export default RadioButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: scale(5),
    },
    border: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
