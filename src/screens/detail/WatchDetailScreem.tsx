import { useFocusEffect } from '@react-navigation/native';
import React, { useRef, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import Video from 'react-native-video';

import FadeView, { viewFade, viewFadeRef } from 'components/FadeView';
import Icon from 'components/Icon';
import VideoPlayer from 'components/VideoPlayer';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Avatar, Button, IColors, Slider } from 'packages/uikit';

import { HitSlop } from 'themes/dimensions';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { goBack, navigate } from 'utils/navigationUtils';

const videoError = (e) => {
    console.log(e);
};

const WatchDetailScreen = () => {
    const colors = useThemeColors();
    const styles = Styles(colors);
    const [pause, setPause] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef<Video>(null);

    const handleProgress = (prgs) => {
        const currentProgress = prgs.currentTime / duration;
        setProgress(currentProgress);
    };
    const handleSliding = (prgs) => {
        const slidingProgress = prgs[0] * duration;
        playerRef.current.seek(slidingProgress);
    };

    const handleLoad = (meta) => {
        setDuration(meta.duration);
    };

    const handlePause = () => {
        if (pause) {
            if (progress === 1) {
                setProgress(0);
                playerRef.current.seek(0);
            }
            setPause(false);
            viewFade.fade();
        } else {
            setPause(true);
            viewFade.fade();
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setPause(false);
            return () => {
                setPause(true);
                // Useful for cleanup functions
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableWithoutFeedback onPress={handlePause}>
                    <VideoPlayer
                        source={{
                            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                        }}
                        style={styles.video}
                        onError={videoError}
                        onLoad={handleLoad}
                        resizeMode={'contain'}
                        onProgress={handleProgress}
                        paused={pause}
                        progressUpdateInterval={60}
                        ref={playerRef}
                        onEnd={() => {
                            setPause(true);
                            setProgress(1);
                        }}
                    />
                </TouchableWithoutFeedback>
                <FadeView pause={pause} ref={viewFadeRef} onPressView={handlePause} />
            </View>
            <View style={styles.controlView}>
                <View style={styles.sliderView}>
                    <View style={styles.userInfor}>
                        <Avatar imageStyles={{ backgroundColor: 'white', opacity: 0.5 }} size={scale(28)} />
                        <View style={styles.rightInfo}>
                            <Text style={styles.nameText}>Joanna Harmon</Text>
                            <Text style={styles.subText}>Teacher</Text>
                        </View>
                    </View>
                    <Slider
                        animateTransitions
                        maximumTrackTintColor="#d3d3d3"
                        minimumTrackTintColor="#D6D1E6"
                        thumbTintColor={colors.main}
                        value={progress}
                        onSlidingStart={() => setPause(true)}
                        onSlidingComplete={() => setPause(false)}
                        onValueChange={handleSliding}
                    />
                </View>
                <Button
                    title={'View Full Detail'}
                    onPress={() => navigate('Detail')}
                    containerStyles={styles.loginBtn}
                    titleStyles={styles.titleButton}
                />
            </View>

            <TouchableOpacity style={styles.iconView} onPress={() => goBack()} hitSlop={HitSlop.default}>
                <Icon name={'Back'} size={scale(24)} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconViewRight} onPress={() => {}} hitSlop={HitSlop.default}>
                <Icon name={'Save'} size={scale(20)} />
            </TouchableOpacity>
        </View>
    );
};

export default WatchDetailScreen;

const Styles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.black,
        },
        content: {
            width: '100%',
            height: Sizes.scrHeight,
            justifyContent: 'center',
            alignItems: 'center',
        },
        video: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        iconView: {
            top: scale(20) + Sizes.statusBarHeight,
            left: scale(16),
            position: 'absolute',
            width: scale(34),
            height: scale(34),
            borderRadius: scale(17),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.white,
        },
        iconViewRight: {
            top: scale(20) + Sizes.statusBarHeight,
            right: scale(16),
            position: 'absolute',
            width: scale(34),
            height: scale(34),
            borderRadius: scale(17),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.white,
        },
        titleButton: {
            ...Fonts.poppins600,
            fontWeight: '600',
            color: themeColors.white,
            fontSize: scale(14),
        },
        loginBtn: {
            borderRadius: scale(8),
            backgroundColor: themeColors.main,
            height: scale(45),
            width: '100%',
        },
        controlView: {
            position: 'absolute',
            bottom: Sizes.bottomSpace,
            paddingHorizontal: scale(16),
            width: '100%',
        },
        sliderView: {
            marginBottom: scale(40),
            width: '100%',
        },
        userInfor: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scale(50),
        },
        nameText: {
            ...Fonts.poppins600,
            fontWeight: '600',
            fontSize: scale(12),
            color: themeColors.white,
        },
        subText: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(10),
            color: themeColors.white,
        },
        rightInfo: {
            marginLeft: scale(4),
        },
    });
};
