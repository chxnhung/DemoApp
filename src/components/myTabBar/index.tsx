import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Svgs from 'assets/svgs';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import Icon from 'components/Icon';

const MyTabBar = (props: BottomTabBarProps) => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { state, navigation } = props;
    return (
        <View style={styles.container}>
            {state?.routes?.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate({ name: route.name, params: {}, merge: true }); // The `merge: true` option makes sure that the params inside the tab screen are preserved
                    }
                };
                const IconName = `${route.name}${isFocused && route.name !== 'Post' ? 'Active' : ''}`;
                const sizeIcon = scale(16);
                return route.name !== 'Post' ? (
                    <TouchableOpacity key={index.toString()} style={styles.btnTab} onPress={onPress}>
                        <Icon name={IconName} size={scale(sizeIcon)} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.98}
                        key={index.toString()}
                        style={styles.btnMiddleTab}
                        onPress={onPress}>
                        <Icon name={IconName} size={scale(80)} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: Sizes.bottomSpace !== 0 ? Sizes.bottomSpace + scale(36) : scale(45),
            paddingBottom: Sizes.bottomSpace !== 0 ? Sizes.bottomSpace : scale(10),
            backgroundColor: themeColors.backgroundAlt,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 20,
            justifyContent: 'space-around',
            borderTopLeftRadius: scale(20),
            borderTopRightRadius: scale(20),
            marginTop: -scale(20),
            paddingHorizontal: scale(10),
        },
        btnTab: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: Sizes.bottomSpace !== 0 ? 0 : scale(5),
        },
        btnMiddleTab: {
            alignItems: 'center',
            justifyContent: 'center',
            top: Sizes.bottomSpace !== 0 ? -scale(40) : -scale(30),
            width: Sizes.bottomSpace + scale(80),
            height: Sizes.bottomSpace + scale(80),
        },
        title: {
            paddingTop: scale(5),
            fontSize: scale(11),
            color: themeColors.text,
        },
    });

export default MyTabBar;
