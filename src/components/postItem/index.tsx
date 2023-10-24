import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import Svgs from 'assets/svgs';
import FadeView, { viewFade, viewFadeRef } from 'components/FadeView';
import VideoPlayer from 'components/VideoPlayer';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

interface User {
    imageUri: string;
    username: string;
}

interface Song {
    name: string;
    imageUri: string;
}

interface PostProps {
    isPause: boolean;
    data: {
        id: string;
        likes: number;
        videoUri: string;
        user: User;
        song: Song;
        comments: string;
        shares: number;
        description: string;
    };
}

const PostItem = (props: PostProps) => {
    const { isPause } = props;
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const [post, setPost] = useState(props.data);
    const [isLiked, setIsLiked] = useState(false);
    const [paused, setPaused] = useState(true);
    const topSpace = Sizes.scrHeight * 0.5 - scale(40);

    useEffect(() => {
        if (isPause) {
            if (paused !== true) {
                handlePause();
            }
        } else {
            setPaused((prevState) => !prevState);
        }
    }, [isPause]);

    const handlePause = () => {
        setPaused((prevState) => !prevState);
    };

    const onPlayPausePress = () => {
        viewFade.fade();
        handlePause();
    };

    const onLikePress = () => {
        const likesToAdd = isLiked ? -1 : 1;
        setPost({
            ...post,
            likes: post.likes + likesToAdd,
        });
        setIsLiked(!isLiked);
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPlayPausePress}>
                <View>
                    <VideoPlayer
                        source={{ uri: props.data.videoUri }}
                        style={styles.video}
                        onError={(e) => console.log(e)}
                        resizeMode={'cover'}
                        repeat={true}
                        paused={paused}
                        bufferConfig={{
                            minBufferMs: 10000,
                            maxBufferMs: 30000,
                            bufferForPlaybackMs: 2500,
                            bufferForPlaybackAfterRebufferMs: 5000,
                        }}
                    />
                    <View style={styles.uiContainer}>
                        <View style={styles.rightContainer}>
                            <Image style={styles.profilePicture} source={{ uri: post.user.imageUri }} />

                            <TouchableOpacity style={styles.iconContainer} onPress={onLikePress}>
                                <Svgs.IcLike width={scale(18)} height={scale(18)} />
                                <Text style={styles.statsLabel}>{post.likes}</Text>
                            </TouchableOpacity>

                            <View style={styles.iconContainer}>
                                <Svgs.IcFollow width={scale(18)} height={scale(18)} />
                                <Text style={styles.statsLabel}>{post.comments}</Text>
                            </View>

                            <View style={styles.iconContainer}>
                                <Svgs.IcSave width={scale(18)} height={scale(18)} />
                                <Text style={styles.statsLabel}>{post.shares}</Text>
                            </View>
                        </View>

                        <View style={styles.bottomContainer}>
                            <View>
                                <Text style={styles.handle}>@{post.user.username}</Text>
                                <Text style={styles.description} numberOfLines={3}>
                                    {post.description}
                                </Text>

                                <View style={styles.songRow}>
                                    <Text style={styles.songName}>{post.song.name}</Text>
                                </View>
                            </View>

                            <Image style={styles.songImage} source={{ uri: post.song.imageUri }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <FadeView
                containerStyle={[styles.fadingView, { top: topSpace }]}
                pause={paused}
                ref={viewFadeRef}
                onPressView={onPlayPausePress}
            />
        </View>
    );
};

export default React.memo(PostItem);

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: Sizes.scrHeight,
            backgroundColor: themeColors.black,
        },
        videPlayButton: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        video: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        uiContainer: {
            height: '100%',
            justifyContent: 'flex-end',
        },
        bottomContainer: {
            padding: scale(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: scale(70),
        },
        handle: {
            color: themeColors.white,
            fontSize: scale(16),
            ...Fonts.poppins700,
            marginBottom: scale(10),
        },
        description: {
            color: themeColors.white,
            fontSize: scale(16),
            ...Fonts.poppins400,
            marginBottom: scale(10),
            maxWidth: scale(300),
        },
        songRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        songName: {
            color: themeColors.white,
            fontSize: scale(16),
            marginLeft: scale(5),
        },

        songImage: {
            width: scale(30),
            height: scale(30),
            borderRadius: scale(25),
            borderWidth: scale(5),
            borderColor: themeColors.gray,
        },

        rightContainer: {
            alignSelf: 'flex-end',
            height: scale(230),
            justifyContent: 'space-between',
            marginRight: scale(5),
        },
        profilePicture: {
            width: scale(50),
            height: scale(50),
            borderRadius: scale(25),
            borderWidth: scale(2),
            borderColor: themeColors.white,
        },

        iconContainer: {
            alignItems: 'center',
        },
        statsLabel: {
            color: themeColors.white,
            fontSize: scale(16),
            ...Fonts.poppins600,
            marginTop: scale(5),
        },
        fadingView: {
            position: 'absolute',
            alignSelf: 'center',
        },
    });
};
