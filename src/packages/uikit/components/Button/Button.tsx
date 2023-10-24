import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';

interface ButtonProps {
    title?: string;
    subTitle?: string;
    left?: React.ReactElement;
    right?: React.ReactElement;
    subTitleCustom?: React.ReactElement;
    disabled?: boolean;
    containerStyles?: StyleProp<ViewStyle>;
    titleStyles?: StyleProp<TextStyle>;
    subTitleStyles?: StyleProp<TextStyle>;
    subTitleCustomStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
}

const Button = (props: ButtonProps) => {
    const styles = myStyles();
    const {
        title,
        subTitle,
        subTitleCustom,
        left,
        right,
        disabled,
        containerStyles,
        titleStyles,
        subTitleStyles,
        subTitleCustomStyles,
        onPress,
    } = props;

    return (
        <>
            <TouchableOpacity
                style={[styles.container, containerStyles]}
                disabled={!onPress || disabled}
                onPress={onPress}>
                {left ? <View style={styles.viewLeft}>{left}</View> : null}
                <View style={styles.viewCenter}>
                    <Text style={[styles.textCenter, titleStyles]}>{title}</Text>
                    {subTitle ? <Text style={[styles.subTextCenter, subTitleStyles]}>{subTitle}</Text> : null}
                    {subTitleCustom ? (
                        <View style={[styles.viewLeft, subTitleCustomStyles]}>{subTitleCustom}</View>
                    ) : null}
                </View>
                {right ? <View style={styles.viewRight}>{right}</View> : <View />}
            </TouchableOpacity>
        </>
    );
};

export default Button;

const myStyles = () =>
    StyleSheet.create({
        container: {
            // flex: 1,
            flexDirection: 'row',
            paddingHorizontal: scale(4),
            alignItems: 'center',
            backgroundColor: '#f9b245',
            height: scale(48),
            borderRadius: scale(16),
        },
        viewLeft: {
            marginRight: scale(16),
        },
        viewCenter: {
            flex: 1,
            justifyContent: 'center',
        },
        textCenter: {
            ...Fonts.poppins400,
            fontSize: scale(16),
            textAlign: 'center',
            // color: Colors[theme].textColor,
        },
        subTextCenter: {
            ...Fonts.poppins400,
            fontSize: scale(12),
            // color: Colors[theme].textColor,
        },
        viewRight: {
            marginLeft: scale(16),
        },
    });
