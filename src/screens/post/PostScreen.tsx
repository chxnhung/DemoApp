import React, { useMemo, useRef, useState } from 'react';

import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import DropDown from './components/DropDown';
import Header from './components/Header';
import { POST_OPTION } from './constant';

import Svgs from 'assets/svgs';
import Icon from 'components/Icon';
import { useThemeColors } from 'packages/hooks/useTheme';
import { AppBar, Avatar, Button, IColors } from 'packages/uikit';

import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';

const PostScreen = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const dropdownButtonRef = useRef(null);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState<string>('');
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);
    const IconMode = useMemo(() => {
        const name = `${isPrivate ? 'Private' : 'Public'}`;
        return name;
    }, [isPrivate]);
    const IconArrow = useMemo(() => {
        const name = `${visible ? 'ArrowUp' : 'ArrowDown'}`;
        return name;
    }, [visible]);

    const renderHeader = () => {
        return <Header />;
    };
    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };
    const onPressItem = (val) => {
        setVisible(false);
        setIsPrivate(val === 1);
    };

    const openDropdown = (): void => {
        dropdownButtonRef?.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
            setDropdownLeft(_px + scale(1));
        });
        setVisible(true);
    };

    const renderDropDown = () => {
        return (
            <DropDown
                visible={visible}
                onPressItem={onPressItem}
                onBackdropPress={() => setVisible(false)}
                dropdownTop={dropdownTop}
                dropdownLeft={dropdownLeft}
            />
        );
    };

    const renderPostOption = () => {
        return POST_OPTION.map((item, index) => {
            return (
                <TouchableOpacity key={index}>
                    <Icon name={item.icon} size={scale(25)} />
                </TouchableOpacity>
            );
        });
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.container}>
                <AppBar style={styles.headerView} left={renderHeader()} />
                <View style={styles.content}>
                    <View style={styles.userInfor}>
                        <Avatar size={scale(50)} />
                        <View style={styles.rightInfo}>
                            <Text style={styles.nameText}>Maxwell Kim</Text>
                            <TouchableOpacity ref={dropdownButtonRef} style={styles.postMode} onPress={toggleDropdown}>
                                <Icon name={IconMode} size={scale(16)} />
                                <Text style={styles.textMode}>{isPrivate ? 'Private' : 'Public'}</Text>
                                <Icon name={IconArrow} size={scale(16)} />
                                {renderDropDown()}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TextInput
                        style={styles.contentInput}
                        value={content}
                        onChangeText={setContent}
                        placeholder="Type Here..."
                        multiline={true}
                        autoFocus={false}
                    />
                    <View style={styles.bottomView}>
                        <View style={styles.bottomLeft}>{renderPostOption()}</View>
                        <View style={styles.bottomRight}>
                            <Button
                                title={`Post`}
                                onPress={() => {}}
                                containerStyles={styles.loginBtn}
                                titleStyles={styles.titleButton}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default PostScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: themeColors.backgroundAlt,
            paddingHorizontal: scale(16),
            paddingBottom: scale(130),
        },
        headerView: {
            paddingLeft: scale(1),
        },
        content: {
            borderWidth: scale(1),
            borderColor: themeColors.blackOpacity10,
            width: '100%',
            height: '100%',
            borderRadius: scale(12),
            padding: scale(10),
            marginTop: scale(20),
            justifyContent: 'space-between',
        },
        userInfor: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scale(60),
            marginBottom: scale(8),
        },
        rightInfo: {
            marginLeft: scale(12),
            justifyContent: 'space-between',
            height: '100%',
            paddingVertical: scale(8),
        },
        postMode: {
            borderWidth: scale(1),
            borderColor: themeColors.blackOpacity10,
            borderRadius: scale(4),
            height: scale(20),
            width: scale(90),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: scale(4),
        },
        textMode: {
            marginHorizontal: scale(6),
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(12),
        },
        nameText: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(14),
        },
        contentInput: {
            width: '100%',
            flex: 1,
        },
        bottomView: {
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
        },
        titleButton: {
            ...Fonts.poppins600,
            fontWeight: '600',
            color: themeColors.white,
            fontSize: scale(14),
        },
        loginBtn: {
            width: scale(120),
            borderRadius: scale(8),
            backgroundColor: themeColors.main,
            height: scale(40),
        },
        bottomLeft: {
            width: '45%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        bottomRight: {
            width: '55%',
            alignItems: 'flex-end',
        },
    });
};
