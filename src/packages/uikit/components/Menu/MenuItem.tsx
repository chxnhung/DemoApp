import React, { ReactElement } from 'react';

import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit/theme';

import { scale } from 'themes/scales';

export interface MenuItemProps {
    name?: string;
    icon?: ReactElement<ViewProps>;
}

interface Props {
    onPress?: () => void;
    item?: MenuItemProps;
    containerStyle?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const MenuItem = (props: Props) => {
    const { item, containerStyle, iconStyle, textStyle } = props;
    const colors = useThemeColors();
    const styles = myStyles(colors);
    return (
        <TouchableOpacity style={[styles.btn, containerStyle]} onPress={props.onPress}>
            {item?.icon && <View style={[styles.viewIcon, iconStyle]}> {item.icon} </View>}
            <View style={styles.viewItem}>
                <Text style={[styles.textItem, textStyle]}>{item?.name ? item.name : ''}</Text>
            </View>
        </TouchableOpacity>
    );
};

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        btn: {
            flexDirection: 'row',
            backgroundColor: themeColors.backgroundAlt,
            alignItems: 'center',
            paddingHorizontal: scale(20),
            paddingVertical: scale(8),
        },
        viewItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        textItem: {
            fontSize: scale(14),
        },
        viewIcon: {
            width: scale(12),
            height: scale(12),
            marginHorizontal: scale(10),
        },
    });

export default React.memo(MenuItem);
