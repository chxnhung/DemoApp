import React, { memo } from 'react';

import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit/theme';

import { scale } from 'themes/scales';

interface EmptyViewProps {
    message?: string;
    containerStyles?: StyleProp<ViewStyle>;
    image?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const EmptyListView: React.FC = (props: EmptyViewProps) => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { image, message, containerStyles, imageStyle, textStyle } = props;

    return (
        <View style={[styles.emptyView, containerStyles]}>
            {image && <Image source={image} style={[styles.imageView, imageStyle]} />}
            <Text style={[styles.emptyText, textStyle]}>{message ? message : 'No Record'}</Text>
        </View>
    );
};

export default memo(EmptyListView);

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        emptyView: {
            alignItems: 'center',
            paddingVertical: scale(100),
        },
        emptyText: {
            fontSize: scale(14),
            color: themeColors.blackOpacity50,
        },
        imageView: {
            width: scale(120),
            height: scale(120),
        },
    });
