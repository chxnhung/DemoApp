import React, { useCallback, useRef, useState } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

import PostItem from 'components/postItem';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Avatar, IColors } from 'packages/uikit';

import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { useFocusEffect } from '@react-navigation/native';

const data = [
    {
        id: '1',
        likes: 100,
        videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/leaf-blue.png',
            username: 'Kaza Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/leaf-green.png',
        },
        comments: '100',
        shares: '200',
        description: 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself',
    },
    {
        id: '2',
        likes: 100,
        videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/cs-hopper-happy.png',
            username: 'Betha Uchiha',
        },
        song: {
            name: 'Piva love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/cs-hopper-cool.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '3',
        likes: 100,
        videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/leafers-seed.png',
            username: 'Haza Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/leafers-seedling.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '4',
        likes: 100,
        videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '5',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '6',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '7',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org',
    },
    {
        id: '8',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.',
    },
    {
        id: '9',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender.',
    },
    {
        id: '10',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010,',
    },
    {
        id: '11',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description: 'The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500,',
    },
    {
        id: '110',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000,',
    },
    {
        id: '12',
        likes: 100,
        videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/leaf-blue.png',
            username: 'Kaza Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/leaf-green.png',
        },
        comments: '100',
        shares: '200',
        description: 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself',
    },
    {
        id: '13',
        likes: 100,
        videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/cs-hopper-happy.png',
            username: 'Betha Uchiha',
        },
        song: {
            name: 'Piva love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/cs-hopper-cool.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '14',
        likes: 100,
        videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/leafers-seed.png',
            username: 'Haza Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/leafers-seedling.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '15',
        likes: 100,
        videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '16',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '17',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description: 'ldsj dsjdgksj sadgjsk sdga',
    },
    {
        id: '18',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org',
    },
    {
        id: '19',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.',
    },
    {
        id: '20',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender.',
    },
    {
        id: '21',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010,',
    },
    {
        id: '22',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description: 'The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500,',
    },
    {
        id: '23',
        likes: 100,
        videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        user: {
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
            username: 'Zahata Uchiha',
        },
        song: {
            name: 'Dead love',
            imageUri: 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
        },
        comments: '100',
        shares: '200',
        description:
            'The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000,',
    },
    // Thêm các bài viết khác tương tự
];

const HomeScreen = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const [viewAbleItem, setViewAbleItem] = useState(data[0].id);
    const [pauseAll, setPauseAll] = useState(false);
    const flatListRef = React.useRef<FlatList>();

    React.useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({
                animated: false,
                offset: 0,
            });
        }
    }, [flatListRef]);

    const snapToOffsetsLikeGooglePlay = data.map((x, i) => {
        return i * Sizes.scrHeight;
    });

    // const renderItem = ({ item }) => {
    //     return (
    //         <View style={styles.postContainer}>
    //             <Image source={Images.DEMO_HOME} style={styles.image} />
    //             <View style={styles.captionContainer}>
    //                 <Avatar size={36} source={Images.DEMO_HOME} />
    //                 <View style={styles.ownProfile}>
    //                     <View style={styles.nameView}>
    //                         <Text style={styles.username}>{item.username}</Text>
    //                         <View style={styles.dot} />
    //                         <Text style={styles.liveText}>LIVE</Text>
    //                     </View>
    //                     <Text style={styles.caption}>{item.caption}</Text>
    //                 </View>
    //             </View>
    //             <View style={styles.rightView}>
    //                 <View style={styles.iconView}>
    //                     <Svgs.IcLike />
    //                 </View>
    //                 <View style={styles.iconView}>
    //                     <Svgs.IcFollow />
    //                 </View>
    //                 <View style={styles.iconView}>
    //                     <Svgs.IcSave />
    //                 </View>
    //             </View>
    //         </View>
    //     );
    // };

    useFocusEffect(
        React.useCallback(() => {
            setPauseAll(false);
            return () => {
                setPauseAll(true);
                // Useful for cleanup functions
            };
        }, [])
    );

    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 90 };

    const onViewableItemsChanged = (info) => {
        const { viewableItems } = info;

        if (!!viewableItems[0]?.item) {
            setViewAbleItem(viewableItems[0].item.id);
        }
    };
    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

    const renderItem = useCallback(
        ({ item }) => {
            let isPause = viewAbleItem === item.id ? false : true;
            if (pauseAll) {
                isPause = true;
            }

            return <PostItem isPause={isPause} data={item} />;
        },
        [viewAbleItem, pauseAll]
    );

    return (
        <View style={styles.container}>
            <FlatList
                initialNumToRender={10}
                ref={flatListRef}
                data={data}
                keyExtractor={(e, i) => i.toString()}
                renderItem={renderItem}
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                snapToOffsets={snapToOffsetsLikeGooglePlay}
                snapToInterval={Sizes.scrHeight - 130}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                maxToRenderPerBatch={10}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
            />
        </View>
    );
};

export default HomeScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        postContainer: {
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            // flexDirection: 'row',
        },
        image: {
            width: Sizes.scrWidth,
            height: Sizes.scrHeight,
        },
        captionContainer: {
            zIndex: 1,
            position: 'absolute',
            top: scale(669),
            left: scale(14),
            flexDirection: 'row',
            alignItems: 'center',
        },
        username: {
            fontSize: scale(12),
            color: themeColors.white,
            ...Fonts.poppins700,
        },
        caption: {
            fontSize: scale(10),
            color: themeColors.white,
            ...Fonts.poppins700,
        },
        ownProfile: {
            marginLeft: scale(10),
        },
        iconView: {
            width: scale(32),
            height: scale(32),
            borderRadius: scale(16),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.white,
            marginVertical: scale(10),
        },
        rightView: { flex: 1, zIndex: 1, position: 'absolute', top: scale(582), left: scale(330) },
        liveText: {
            ...Fonts.poppins700,
            fontSize: scale(10),
            color: themeColors.white,
        },
        dot: {
            width: scale(4),
            height: scale(4),
            borderRadius: scale(2),
            backgroundColor: themeColors.white,
            marginLeft: scale(5),
            marginRight: scale(2),
        },
        nameView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });
};
