import React, { memo, ReactElement } from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';

import { useThemeColors } from 'packages/hooks/useTheme';

import { IColors } from 'packages/uikit/theme';
import { HitSlop } from 'themes/dimensions';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

interface HeaderProps {
    title?: string | ReactElement<TextProps>;
    disable?: boolean;
    left?: ReactElement<ViewProps>;
    right?: ReactElement<ViewProps>;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    rightContainerStyle?: StyleProp<ViewStyle>;
    hideLeft?: boolean;
}

const AppBar = ({
    title,
    left,
    right,
    onPress,
    style = {},
    titleStyle = {},
    disable = false,
    containerStyle = {},
    rightContainerStyle,
}: HeaderProps) => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const IconBack = () => <View style={styles.iconBack} />;
    const renderLeft = () => {
        if (left) {
            return left;
        } else {
            return (
                <TouchableOpacity
                    style={styles.backView}
                    onPress={onPress}
                    hitSlop={HitSlop.default}
                    disabled={disable}>
                    <IconBack />
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.viewHeader, style]}>
                {renderLeft()}

                <View style={styles.centerView}>
                    {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
                </View>

                <View style={[styles.rightView, rightContainerStyle]}>{right}</View>
            </View>
        </View>
    );
};

export default memo(AppBar);

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            paddingTop: Sizes.statusBarHeight,
            width: '100%',
        },
        viewHeader: {
            height: scale(50),
            paddingHorizontal: scale(15),
            flexDirection: 'row',
            alignItems: 'center',
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: scale(10),
        },
        backView: {
            width: scale(50),
            justifyContent: 'center',
        },
        leftView: {
            justifyContent: 'center',
            alignItems: 'center',
            width: scale(50),
            height: scale(50),
        },
        rightView: {
            minWidth: scale(50),
            height: scale(50),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        title: {
            textAlign: 'center',
            fontSize: scale(16),
        },
        btnBack: {
            width: scale(50),
            height: scale(50),
            marginLeft: scale(8),
            justifyContent: 'center',
        },
        iconBack: {
            height: scale(16),
            width: scale(16),
            borderTopWidth: scale(2),
            borderLeftWidth: scale(2),
            transform: [{ rotate: '-45deg' }],
            borderColor: themeColors.secondary,
        },
    });
};
