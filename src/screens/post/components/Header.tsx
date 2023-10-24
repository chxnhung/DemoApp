import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'components/Icon';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';

import { HitSlop } from 'themes/dimensions';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import { goBack } from 'utils/navigationUtils';

const Header = (props) => {
    const { title } = props;
    const colors = useThemeColors();
    const styles = myStyles(colors);
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backView} onPress={() => goBack()} hitSlop={HitSlop.default}>
                <Icon name={'Back'} size={scale(24)} />
            </TouchableOpacity>
            {title && <Text style={styles.titleText}>{title}</Text>}
        </View>
    );
};

export default Header;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        titleText: {
            color: themeColors.subText,
            ...Fonts.poppins700,
            fontWeight: '700',
            fontSize: scale(20),
        },
        backView: {
            marginRight: scale(22),
            width: scale(34),
            height: scale(34),
            borderRadius: scale(17),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.white,
            borderWidth: scale(1),
            borderColor: themeColors.blackOpacity10,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });
};
