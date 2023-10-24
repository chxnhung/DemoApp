import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';

import Fonts from 'themes/fonts';

import { scale } from 'themes/scales';

interface ButtonTextProps {
    title?: string;
    subTitle?: string;
    disabled?: boolean;
    titleStyles?: StyleProp<TextStyle>;
    subTitleStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
    enableLineBottom?: boolean;
}

const ButtonText = (props: ButtonTextProps) => {
    const styles = myStyles();
    const { title, subTitle, disabled, titleStyles, subTitleStyles, onPress, enableLineBottom } = props;

    const renderLineBottom = () =>
        enableLineBottom ? (
            <View style={styles.viewLine}>
                <View style={styles.lineBottom} />
            </View>
        ) : null;

    return (
        <>
            <TouchableOpacity style={[styles.container]} disabled={!onPress || disabled} onPress={onPress}>
                <View style={styles.viewCenter}>
                    <Text style={[styles.textCenter, titleStyles]}>{title}</Text>
                    {subTitle ? <Text style={[styles.subTextCenter, subTitleStyles]}>{subTitle}</Text> : null}
                </View>
            </TouchableOpacity>
            {renderLineBottom()}
        </>
    );
};

export default ButtonText;

const myStyles = () =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            // height: scale(60),
            // paddingHorizontal: scale(15),
            alignItems: 'center',
        },
        viewCenter: {
            // flex: 1,
            justifyContent: 'center',
        },
        textCenter: {
            ...Fonts.poppins400,
            fontSize: scale(15),
            textAlign: 'center',
            // color: Colors[theme].textColor,
        },
        subTextCenter: {
            ...Fonts.poppins400,
            fontSize: scale(12),
            // color: Colors[theme].textColor,
        },
        viewLine: {
            flexDirection: 'row',
            paddingHorizontal: scale(15),
        },
        lineBottom: {
            flex: 1,
            backgroundColor: 'black',
            height: scale(1),
            alignSelf: 'center',
            opacity: 0.06,
        },
    });
