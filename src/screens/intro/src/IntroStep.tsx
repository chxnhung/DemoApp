import _ from 'lodash';
import React from 'react';

import { StyleSheet, View } from 'react-native';

import Icon from 'components/Icon';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors, Text } from 'packages/uikit';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

const IntroStep = ({ onSwipe, imgMain, title, messageText, nextAction }) => {
    const colors = useThemeColors();
    const styles = myStyles(colors);

    const renderTitle = () => <Text style={styles.titleText}>{title}</Text>;
    const renderMessage = () => <Text style={styles.messageText}>{messageText}</Text>;

    const renderContent = () => {
        return (
            <View style={styles.content}>
                <Icon name={imgMain} size={scale(350)} />
                {renderTitle()}
                {renderMessage()}
                {/* {!_.isNil(loginAction) && renderLogin()} */}
            </View>
        );
    };

    return <View style={styles.container}>{renderContent()}</View>;
};

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        container: {
            width: Sizes.scrWidth,
            flex: 1,
        },
        content: {
            position: 'absolute',
            width: Sizes.scrWidth,
            alignItems: 'center',
            top: scale(60),
            height: '75%',
        },
        titleText: {
            fontSize: scale(36),
            ...Fonts.poppins700,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: scale(80),
            color: themeColors.subText,
        },
        messageText: {
            width: '80%',
            fontSize: scale(12),
            ...Fonts.poppins400,
            fontWeight: '400',
            textAlign: 'center',
            marginTop: scale(5),
            lineHeight: scale(16),
            color: themeColors.subText,
        },
    });

export default IntroStep;
