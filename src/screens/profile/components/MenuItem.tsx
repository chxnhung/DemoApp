import React, { ReactElement, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';

import Icon from 'components/Icon';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';

interface MenuItemProps {
    title?: string;
    iconLeft?: string;
    left?: ReactElement<ViewProps>;
    right?: ReactElement<ViewProps>;
    onPress?: () => void;
    titleStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    leftContainerStyle?: StyleProp<ViewStyle>;
    rightContainerStyle?: StyleProp<ViewStyle>;
}

const MenuItem = (props: MenuItemProps) => {
    const { iconLeft, left, right, title, onPress } = props;
    const colors = useThemeColors();
    const styles = Styles(colors);
    return (
        <TouchableOpacity onPress={onPress} style={styles.menuContainer}>
            <View style={styles.leftMenu}>
                {left ? left : <Icon name={iconLeft} size={scale(20)} />}
                <Text style={styles.menuText}>{title}</Text>
            </View>
            <View style={styles.rightMenu}>{right ? right : <Icon name={'ArrowRight'} size={scale(20)} />}</View>
        </TouchableOpacity>
    );
};

export default MenuItem;

const Styles = (themeColors: IColors) => {
    return StyleSheet.create({
        menuText: {
            ...Fonts.poppins400,
            fontWeight: '500',
            fontSize: scale(14),
            marginLeft: scale(12),
        },
        menuContainer: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginTop: scale(16),
        },
        leftMenu: {
            flexDirection: 'row',
            width: '50%',
            alignItems: 'center',
        },
        rightMenu: {
            width: '50%',
            alignItems: 'flex-end',
        },
    });
};
