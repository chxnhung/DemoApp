import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import {
    AppBar,
    BottomSheetInput,
    CheckBox,
    EmptyListView,
    IColors,
    ListView,
    OTPInput,
    SearchBar,
    Toast,
} from 'packages/uikit';
import { BottomSheetInputRefType } from 'packages/uikit/components/BottomSheet/BottomSheetInput';
import { globalDrawer } from 'packages/uikit/components/Drawer';
import { globalLoading } from 'packages/uikit/components/Loading';
import { AnimatedCircularProgress, ProgressBar } from 'packages/uikit/components/Progress';
import RadioButtonsGroup from 'packages/uikit/components/RadioButton';

import Skeleton from 'packages/uikit/components/Skeleton';
import Switch from 'packages/uikit/components/Switch';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { goBack } from 'utils/navigationUtils';

const test = [
    { title: 'allo 1', subTitle: 'haha 1', id: 1 },
    { title: 'allo 2', subTitle: 'haha 2', id: 2 },
    { title: 'allo 3', subTitle: 'haha 3', id: 3 },
    { title: 'allo 4', subTitle: 'haha 4', id: 4 },
];

const Home = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode, mode } = colorMode;
    const [selectedId, setSelectedId] = useState<string>();
    const [progress, setProgress] = useState<number>(0);
    const [dataTest, setDataTest] = useState(test);

    const handleProgress = () => {
        const random = Math.floor(Math.random() * 10) * 10;
        setProgress(random);
    };

    const renderItem = (item) => {
        return <Text style={{ color: 'black' }}>{item.item.name}</Text>;
    };
    const renderEmpty = () => <EmptyListView />;
    const getApi = () => {
        globalLoading.show();
        setTimeout(() => {
            globalLoading.hide();
        }, 1000);
    };

    const handleSubmitOtp = (code: string) => {
        // console.log(code);
    };

    const showToastTop = () => {
        Toast.show({
            text1: 'Login',
            text2: 'SUCCESS',
            type: 'success',
            props: {
                text1: 'LOGIN',
                text1Style: styles.text1,
            },
        });
    };

    const showToastBottom = () => {
        Toast.show({
            text1: 'allo',
            type: 'base',
            position: 'bottom',
        });
    };

    const radioButtons = [
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Option 1',
            value: 'option1',
            labelStyle: styles.text,
        },
        {
            id: '2',
            label: 'Option 2',
            value: 'option2',
            labelStyle: styles.text,
        },
    ];

    const bottomSheetRef = useRef<BottomSheetInputRefType>(null);

    const showBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.open();
        }
    };

    const dismissBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.close();
        }
    };

    const renderTestItem = ({ item }) => (
        <View style={styles.itemView}>
            <Text style={{ color: 'black' }}>{item?.title}</Text>
            <Text>{item?.subTitle}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <AppBar titleStyle={styles.text} title={'Home'} onPress={() => goBack()} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.content}>
                        <SearchBar handleSearch={(value) => console.log(value)} />
                        <TouchableOpacity onPress={showToastTop} style={styles.btn}>
                            <Text style={styles.text}>Toast base Top</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showToastBottom} style={styles.btn}>
                            <Text style={styles.text}>Toast base Bottom</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showBottomSheet} style={styles.btn}>
                            <Text style={styles.text}>BottomSheet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => globalDrawer.open()} style={styles.btn}>
                            <Text style={styles.text}>Drawer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => getApi()} style={styles.btn}>
                            <Text style={styles.text}>Loading</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleProgress()} style={styles.btn}>
                            <Text style={styles.text}>Progress</Text>
                        </TouchableOpacity>
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
                        <OTPInput inputStyle={styles.otp} submit={handleSubmitOtp} />
                        <CheckBox fillColor={colors.secondary} onPress={(isChecked: boolean) => {}} />
                        <RadioButtonsGroup
                            radioButtons={radioButtons}
                            onPress={(id) => setSelectedId(id)}
                            selectedId={selectedId}
                            color={colors.secondary}
                        />
                        {/* <Skeleton /> */}
                        <ProgressBar
                            color={colors.secondary}
                            height={scale(4)}
                            progress={progress / 100}
                            width={Sizes.scrWidth - scale(16 * 2)}
                            borderColor={colors.secondary80}
                        />
                        <AnimatedCircularProgress
                            size={50}
                            width={8}
                            backgroundWidth={5}
                            fill={progress}
                            tintColor={colors.secondary}
                            backgroundColor={colors.textSubtle}
                            arcSweepAngle={360}
                            rotation={180}
                            lineCap="butt"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BottomSheetInput ref={bottomSheetRef}>
                <ListView listEmpty={renderEmpty} data={[]} renderItem={renderTestItem} style={styles.flatList} />
            </BottomSheetInput>
        </View>
    );
};

export default Home;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.backgroundAlt,
        },
        content: {
            marginHorizontal: scale(16),
            alignItems: 'center',
            marginBottom: scale(40),
        },
        btn: {
            height: scale(40),
            width: scale(340),
            marginTop: scale(20),
            alignItems: 'center',
            borderColor: themeColors.secondary,
            borderWidth: scale(1),
            justifyContent: 'center',
            borderRadius: scale(5),
        },
        text1: {
            fontSize: scale(30),
        },
        text: {
            color: themeColors.secondary,
        },
        otp: {
            color: themeColors.secondary,
            borderBottomColor: themeColors.secondary,
        },
        viewContent: {
            height: scale(100),
            width: '100%',
            backgroundColor: themeColors.white,
        },
        flatList: {
            height: scale(200),
            width: '100%',
            backgroundColor: themeColors.backgroundAlt,
        },
        itemView: {
            height: scale(100),
        },
    });
};
