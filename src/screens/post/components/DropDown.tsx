import React from 'react';

import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'components/Icon';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';

import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';

type IDropDownProps = {
    onPressItem: (val: number) => void;
    dropdownTop: number;
    dropdownLeft: number;
    visible: boolean;
    onBackdropPress: () => void;
};

const DropDown = (props: IDropDownProps) => {
    const { onPressItem, dropdownTop, dropdownLeft, visible, onBackdropPress } = props;
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const data = [
        { label: 'Public', value: 0, icon: 'Public' },
        { label: 'Private', value: 1, icon: 'Private' },
    ];
    const renderItem = ({ item }) => {
        const IconName = item.icon;
        return (
            <TouchableOpacity style={styles.item} onPress={() => onPressItem(item.value)}>
                <View style={styles.dropdownIcon}>
                    <Icon name={IconName} size={scale(16)} />
                </View>
                <View>
                    <Text style={styles.dropdownText}>{item.label}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={visible} transparent animationType="none">
            <TouchableOpacity style={styles.overlay} onPress={onBackdropPress}>
                <View style={[styles.dropdown, { top: dropdownTop, left: dropdownLeft }]}>
                    <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default DropDown;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        overlay: {
            width: '100%',
            height: '100%',
        },
        dropdown: {
            position: 'absolute',
            backgroundColor: themeColors.backgroundAlt,
            width: scale(88),
            shadowColor: '#000000',
            shadowRadius: 4,
            shadowOffset: { height: 4, width: 0 },
            shadowOpacity: 0.3,
        },
        item: {
            height: scale(20),
            width: scale(88),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: scale(4),
        },
        dropdownIcon: {
            alignItems: 'center',
            marginRight: scale(6),
        },
        dropdownText: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(12),
        },
    });
};
