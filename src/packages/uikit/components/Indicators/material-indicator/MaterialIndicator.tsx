import React from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Indicator, { IndicatorProps } from '../indicator/BaseIndicator';

export interface MaterialIndicatorProps {
    trackWidth?: number;
    color?: string;
    size?: number;
    containerStyle?: StyleProp<ViewStyle>;
}

const MaterialIndicator = (props: MaterialIndicatorProps & IndicatorProps) => {
    const {
        animationDuration = 4000,
        color = 'rgb(0, 0, 0)',
        size = 40,
        trackWidth = size / 10,
        containerStyle,
    } = props;
    const styles = Styles(size, color, trackWidth);
    const renderComponent = ({ index, progress }) => {
        let renderProgress = progress;
        const frames = (60 * animationDuration) / 1000;
        const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);
        const sa = 7.5;
        const ea = 30;
        const sequences = 3;
        const rotations = 5;
        const inputRange = Array.from(new Array(frames), (item, frameIndex) => frameIndex / (frames - 1));
        const outputRange = Array.from(new Array(frames), (item, frameIndex) => {
            renderProgress = (2 * sequences * frameIndex) / (frames - 1);
            const rotation = index ? +(360 - sa) : -(180 - sa);
            const sequence = Math.ceil(renderProgress);
            if (sequence % 2) {
                renderProgress = renderProgress - sequence + 1;
            } else {
                renderProgress = sequence - renderProgress;
            }
            const direction = index ? -1 : +1;
            return direction * (180 - (sa + ea)) * easing(renderProgress) + rotation + 'deg';
        });
        const layerStyle = {
            transform: [
                {
                    rotate: 90 - sa + 'deg',
                },
                {
                    rotate: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', 360 * rotations + 'deg'],
                    }),
                },
            ],
        };

        const viewportStyle = {
            transform: [
                {
                    translateY: index ? -size / 2 : 0,
                },
                {
                    rotate: progress.interpolate({ inputRange, outputRange }),
                },
            ],
        };

        return (
            <Animated.View style={styles.layer} {...{ key: index }}>
                <Animated.View style={[layerStyle, styles.commonStyle]}>
                    <Animated.View
                        style={[styles.containerStyle, index ? { top: size / 2 } : null]}
                        collapsable={false}>
                        <Animated.View style={[viewportStyle, styles.commonStyle]}>
                            <Animated.View style={styles.containerStyle} collapsable={false}>
                                <Animated.View style={[styles.lineStyle, styles.commonStyle]} />
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        );
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <Indicator viewStyle={styles.commonStyle} renderComponent={renderComponent} count={2} {...props} />
        </View>
    );
};

export default MaterialIndicator;

const Styles = (size: number, color: string, trackWidth: number) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        layer: {
            ...StyleSheet.absoluteFillObject,

            justifyContent: 'center',
            alignItems: 'center',
        },
        containerStyle: {
            width: size,
            height: size / 2,
            overflow: 'hidden',
        },
        lineStyle: {
            borderColor: color,
            borderRadius: size / 2,
            borderWidth: trackWidth,
        },
        commonStyle: {
            width: size,
            height: size,
        },
    });
