import React, { useRef, useState } from 'react';

import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Avatar, IColors } from 'packages/uikit';
import type { StickyHeaderFlashListProps } from 'react-native-sticky-parallax-header';
import { useStickyHeaderFlashListScrollProps, withStickyHeaderFlashList } from 'react-native-sticky-parallax-header';
import { FlashList } from '@shopify/flash-list';
import Video from 'react-native-video';

import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

const avatarData = [
    { name: 'Fergus', avatar: '', id: 0 },
    { name: 'Tom', avatar: '', id: 1 },
    { name: 'Philbert', avatar: '', id: 2 },
    { name: 'Naomi', avatar: '', id: 3 },
    { name: 'Misty', avatar: '', id: 4 },
    { name: 'Samatha', avatar: '', id: 5 },
    { name: 'Fergus', avatar: '', id: 6 },
    { name: 'Fergus', avatar: '', id: 7 },
    { name: 'Fergus', avatar: '', id: 8 },
    { name: 'Fergus', avatar: '', id: 9 },
];

const postData = [
    {
        id: 1,
        name: 'Avocado Salsa',
        follower: 120,
        star: 4.5,
        save: 11,
        // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line @typescript-eslint/quotes
        describe: "In a few steps, you'll be able to cook a delicious Avocado Salsa. It's easy and simple, enjoy!",
    },
    {
        id: 2,
        name: 'Avocado Salsa',
        follower: 120,
        star: 4.5,
        save: 11,
        // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line @typescript-eslint/quotes
        describe: "In a few steps, you'll be able to cook a delicious Avocado Salsa. It's easy and simple, enjoy!",
    },
    {
        id: 3,
        name: 'Avocado Salsa',
        follower: 120,
        star: 4.5,
        save: 11,
        // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line @typescript-eslint/quotes
        describe: "In a few steps, you'll be able to cook a delicious Avocado Salsa. It's easy and simple, enjoy!",
    },
    {
        id: 4,
        name: 'Avocado Salsa',
        follower: 120,
        star: 4.5,
        save: 11,
        // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line @typescript-eslint/quotes
        describe: "In a few steps, you'll be able to cook a delicious Avocado Salsa. It's easy and simple, enjoy!",
    },
];

const PARALLAX_HEIGHT = 330;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const StickyHeaderFlashList = withStickyHeaderFlashList(FlashList) as (
    props: StickyHeaderFlashListProps<object> & React.RefAttributes<FlashList<string>>
) => React.ReactElement;

const FavouriteScreen = () => {
    const colors = useThemeColors();
    const styles = Styles(colors);

    const { onMomentumScrollEnd, onScroll, onScrollEndDrag, scrollHeight, scrollViewRef } =
        useStickyHeaderFlashListScrollProps({
            parallaxHeight: PARALLAX_HEIGHT,
            snapStartThreshold: SNAP_START_THRESHOLD,
            snapStopThreshold: SNAP_STOP_THRESHOLD,
            snapToEdge: true,
        });

    const renderAvatarItem = ({ item }) => {
        return (
            <View style={styles.itemAvatar}>
                <Avatar size={40} />
                <Text style={styles.textNameAva}>{item.name}</Text>
            </View>
        );
    };

    const renderPostItem = ({ item, index }) => {
        return (
            <>
                {index === 0 ? (
                    <Text style={[styles.titleText, { marginHorizontal: scale(15) }]}>Post For You</Text>
                ) : (
                    <></>
                )}
                <View style={styles.itemPost}>
                    <ImageBackground source={Images.EXAMPLE_POST} style={styles.imagePost}>
                        <View style={styles.iconLevel}>
                            <Text style={styles.textLevel}>Hard</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.infoPost}>
                        <View style={styles.ownPost}>
                            <Avatar size={20} />
                            <Text style={styles.ownName}>Melvin Robson</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textFollower}>{item.follower}</Text>
                            <Svgs.IcStar />
                            <Text style={styles.textStar}>{item.star}</Text>
                            <Text style={styles.textSave}>{`(${item.save}+)`}</Text>
                        </View>
                    </View>
                    <Text style={styles.namePost}>{item.name}</Text>
                    <Text style={styles.describePost}>{item.describe}</Text>
                </View>
            </>
        );
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerView}>
                <View style={styles.avatarView}>
                    <View style={styles.profileView}>
                        <Avatar size={28} />
                        <Text style={styles.textName}>Hello Henry</Text>
                    </View>
                    <Svgs.IcSend />
                </View>

                <Text style={styles.titleText}>What Would You Like To Share Today</Text>
            </View>
        );
    };

    const refVideo = useRef<Video>();

    const buffering = () => {
        console.log('allo');
    };
    const errorVideo = () => {
        console.log('Bllo');
    };
    const [paused, setPaused] = useState(false);

    const onPlayPausePress = () => {
        setPaused(!paused);
    };

    const renderStickyHead = () => {
        return (
            <View style={{ flex: 1, marginLeft: scale(15), paddingBottom: scale(10) }}>
                <Text style={styles.subTitle}>Live broadcasts</Text>
                <FlatList
                    data={avatarData}
                    renderItem={renderAvatarItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StickyHeaderFlashList
                renderHeader={renderHeader}
                data={postData}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onScrollEndDrag={onScrollEndDrag}
                renderItem={renderPostItem}
                keyExtractor={(_, index) => `${index}`}
                showsVerticalScrollIndicator={false}
                renderTabs={renderStickyHead}
                decelerationRate="fast"
                scrollEventThrottle={16}
                estimatedItemSize={400}
            />
        </View>
    );
};

export default FavouriteScreen;

const Styles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Sizes.statusBarHeight,
        },
        headerView: {
            marginHorizontal: scale(15),
        },
        avatarView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: scale(10),
        },
        textName: {
            ...Fonts.poppins400,
            fontSize: scale(10),
            marginLeft: scale(5),
        },
        profileView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemAvatar: {
            marginRight: scale(20),
            alignItems: 'center',
        },
        titleText: {
            ...Fonts.poppins700,
            fontSize: scale(20),
            marginTop: scale(20),
            marginBottom: scale(30),
        },
        subTitle: {
            ...Fonts.poppins400,
            fontSize: scale(12),
            marginBottom: scale(15),
        },

        itemPost: {
            width: scale(343),
            height: scale(287),
            marginLeft: scale(15),
            borderRadius: scale(20),
            backgroundColor: themeColors.white,
            shadowColor: '#000',
            shadowOffset: {
                width: 1,
                height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 3.41,
            elevation: 5,
            marginBottom: scale(20),
        },
        imagePost: {
            width: scale(343),
            height: scale(155),
            borderTopLeftRadius: scale(20),
            borderTopRightRadius: scale(20),
            justifyContent: 'flex-end',
        },
        infoPost: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scale(10),
            marginHorizontal: scale(10),
        },
        ownPost: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        info: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        namePost: {
            ...Fonts.poppins600,
            fontSize: scale(16),
            marginVertical: scale(5),
            marginHorizontal: scale(10),
        },
        describePost: {
            ...Fonts.poppins400,
            fontSize: scale(11),
            color: themeColors.gray,
            maxWidth: scale(242),
            marginHorizontal: scale(10),
        },
        ownName: {
            ...Fonts.poppins400,
            fontSize: scale(10),
            marginLeft: scale(5),
        },
        textFollower: {
            ...Fonts.poppins400,
            fontSize: scale(10),
            marginRight: scale(5),
        },
        textStar: {
            ...Fonts.poppins400,
            fontSize: scale(10),
        },
        textSave: {
            ...Fonts.poppins400,
            fontSize: scale(10),
            color: themeColors.gray,
            marginLeft: scale(3),
        },
        iconLevel: {
            backgroundColor: themeColors.main,
            width: scale(35),
            height: scale(17),
            borderRadius: scale(10),
            justifyContent: 'center',
            alignItems: 'center',
            margin: scale(10),
        },
        textLevel: {
            ...Fonts.poppins400,
            fontSize: scale(10),
            color: themeColors.white,
        },

        textNameAva: {
            ...Fonts.poppins400,
            fontSize: scale(8),
            color: themeColors.gray,
            marginTop: scale(3),
        },

        listPost: {
            marginLeft: scale(15),
        },
        backgroundVideo: {
            width: scale(300),
            height: scale(200),
            // backgroundColor: 'red',
        },
    });
};
