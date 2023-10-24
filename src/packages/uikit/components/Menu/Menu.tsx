import React, { memo, ReactElement } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import MenuItem, { MenuItemProps } from './MenuItem';
import FlatListView from '../ListView';

interface MenuProps {
    data: MenuItemProps[];
    menuContainerStyle?: StyleProp<ViewStyle>;
    renderItem?: ({ item }) => ReactElement<ViewProps>;
    onPressItem?: (item) => void;
}

const Menu = (props: MenuProps) => {
    const styles = myStyles();
    const { data, menuContainerStyle, renderItem, onPressItem = () => {} } = props;
    const handlePress = (item) => {
        if (onPressItem) {
            onPressItem(item);
        }
    };
    const renderDefault = ({ item }) => <MenuItem item={item} onPress={() => handlePress(item)} />;

    return (
        <View style={[styles.container, menuContainerStyle]}>
            <FlatListView data={data} renderItem={renderItem ? renderItem : renderDefault} />
        </View>
    );
};

export default memo(Menu);

const myStyles = () =>
    StyleSheet.create({
        container: {},
    });
