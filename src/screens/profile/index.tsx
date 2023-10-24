import auth from '@react-native-firebase/auth';
import React, { useContext, useMemo, useRef } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import MenuItem from './components/MenuItem';

import Icon from 'components/Icon';
import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Avatar, BottomSheetInput, IColors, Switch } from 'packages/uikit';

import { BottomSheetInputRefType } from 'packages/uikit/components/BottomSheet/BottomSheetInput';
import { SignOut } from 'services/firebase';
import { userActions, userInforSelector } from 'stores/user';
import Fonts from 'themes/fonts';
import Sizes from 'themes/sizes';
import { resetStack } from 'utils/navigationUtils';
import { scale } from 'themes/scales';

const ProfileScreen = () => {
    const colors = useThemeColors();
    const styles = Styles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode, mode } = colorMode;
    const bottomSheetRef = useRef<BottomSheetInputRefType>(null);
    const dispatch = useDispatch();
    const userInfor = useSelector(userInforSelector);
    const IconMode = useMemo(() => {
        const name = `${mode === 'dark' ? 'LightMode' : 'DarkMode'}`;
        return name;
    }, [mode]);

    const logout = () => {
        resetStack('Login');
        dispatch(userActions.logoutSuccess());
    };

    const handleLogout = async () => {
        SignOut(logout);
    };

    const showBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.open();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inforContainer}>
                <Avatar onPress={showBottomSheet} />
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>@username</Text>
                    <TouchableOpacity style={styles.editIcon}>
                        <Icon name={'Edit'} size={scale(8)} />
                    </TouchableOpacity>
                </View>

                <Text>{userInfor.email}</Text>
            </View>
            <MenuItem
                iconLeft={IconMode}
                title={`${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
                right={
                    <Switch
                        trackColor={{
                            active: colors.backgroundDisabled,
                            inActive: colors.backgroundDisabled,
                        }}
                        thumbColor={colors.secondary}
                        onChange={toggleColorMode}
                        value={mode === 'dark'}
                        size={50}
                    />
                }
            />
            <MenuItem onPress={handleLogout} iconLeft={'LogOut'} title={`Log Out`} />
            <BottomSheetInput ref={bottomSheetRef}>
                <View style={styles.popupView}>
                    <TouchableOpacity>
                        <View style={styles.chooseOption1}>
                            <Text style={styles.textOption}>{`select_photo_from_album`}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.chooseOption}>
                            <Text style={styles.textOption}>{`camera_shooting`}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.chooseOption}>
                            <Text style={styles.textOption}>{`default_img`}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                        <View style={styles.buttonClose}>
                            <Text style={styles.textOption}>{`Close`}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheetInput>
        </View>
    );
};

export default ProfileScreen;

const Styles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: scale(20),
            paddingTop: Sizes.statusBarHeight,
        },
        headerView: {
            paddingLeft: scale(1),
        },
        inforContainer: {
            height: '30%',
            width: '100%',
            alignItems: 'center',
            paddingTop: scale(32),
            paddingBottom: scale(22),
        },
        nameText: {
            ...Fonts.poppins600,
            fontWeight: '600',
            fontSize: scale(16),
            paddingVertical: scale(8),
        },
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
        nameView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        editIcon: {
            position: 'absolute',
            top: scale(5),
            right: -scale(15),
            height: scale(14),
            width: scale(14),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(7),
            backgroundColor: themeColors.white,
        },
        buttonClose: {
            borderRadius: scale(50),
            backgroundColor: themeColors.white,
            marginVertical: scale(20),
            paddingVertical: scale(15),
            marginHorizontal: scale(20),
        },
        popupView: {
            width: '100%',
            backgroundColor: themeColors.white,
            borderTopRightRadius: scale(20),
            borderTopLeftRadius: scale(20),
            // position: 'absolute',
            bottom: scale(0),
            paddingTop: scale(40),
        },
        chooseOption1: {
            borderBottomWidth: scale(1),
            borderColor: themeColors.white,
            paddingTop: scale(30),
            paddingBottom: scale(20),
            paddingHorizontal: scale(20),
        },
        chooseOption: {
            borderBottomWidth: scale(1),
            borderColor: themeColors.white,
            paddingVertical: scale(20),
            paddingHorizontal: scale(20),
        },
        textOption: {
            //    color: Colors[theme].white
            fontSize: scale(14),
        },
    });
};
