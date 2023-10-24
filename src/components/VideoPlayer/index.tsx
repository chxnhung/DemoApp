import React, { useMemo, useState } from 'react';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Video, { VideoProperties } from 'react-native-video';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';
import { MaterialIndicator } from 'packages/uikit/components/Indicators';

import { IndicatorProps } from 'packages/uikit/components/Indicators/indicator/BaseIndicator';

export interface IVideoPlayerProps {
    color?: string;
    size?: number;
    loadContainerStyle?: StyleProp<ViewStyle>;
    indicatorProps?: IndicatorProps;
    animationDuration?: number;
    isShowLoading?: boolean;
}

const VideoPlayer = React.forwardRef((props: VideoProperties & IVideoPlayerProps, ref) => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const {
        color = colors.white,
        size = 50,
        animationDuration = 4000,
        loadContainerStyle,
        indicatorProps,
        isShowLoading = true,
    } = props;
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const handleLoad = () => {
        if (!isLoaded) {
            setIsLoaded(true);
        }
        if (props.onReadyForDisplay) {
            props.onReadyForDisplay();
        }
    };

    const isPause = useMemo(() => {
        if (isLoaded) {
            return true;
        } else {
            return props?.paused;
        }
    }, [isLoaded]);
    return (
        <>
            <Video ref={ref} paused={isPause} onReadyForDisplay={handleLoad} {...props} />
            {!isLoaded && isShowLoading && (
                <View style={[styles.loadingBg, loadContainerStyle]}>
                    <MaterialIndicator
                        {...indicatorProps}
                        color={color}
                        size={size}
                        animationDuration={animationDuration}
                    />
                </View>
            )}
        </>
    );
});

export default VideoPlayer;

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        loadingBg: {
            backgroundColor: themeColors.transparent,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'absolute',
            height: '100%',
        },
    });
