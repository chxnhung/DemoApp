import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

import { usePanResponder, useSlideAnimation, useViewDimensions } from '../hooks';
import { bound } from '../utils/number';
/**
 * Produces a positive damping value.
 *
 * To note: `moveY` becomes negative when going off-screen. By making sure the value
 * produced is always positive, we avoid issues like: https://github.com/calintamas/react-native-toast-message/issues/280
 */
export function dampingFor(gesture, position) {
    const { moveY } = gesture;
    switch (position) {
        case 'bottom': {
            const { height: screenHeight } = Dimensions.get('screen');
            return Math.abs(screenHeight - moveY);
        }
        case 'top':
            return Math.abs(moveY);
        default:
            throw new Error(`Toast position: ${position} not implemented`);
    }
}
export function animatedValueFor(gesture, position, damping) {
    const boundValue = (val) => bound(val, 0, 2);
    const { dy } = gesture;
    switch (position) {
        case 'bottom':
            return boundValue(1 - dy / damping);
        case 'top':
            return boundValue(1 + dy / damping);
        default:
            throw new Error(`Toast position: ${position} not implemented`);
    }
}
export function AnimatedContainer({
    children,
    isVisible,
    position,
    topOffset,
    bottomOffset,
    keyboardOffset,
    onHide,
    onRestorePosition = undefined,
}) {
    const { computeViewDimensions, height } = useViewDimensions();
    const { animatedValue, animate, animationStyles } = useSlideAnimation({
        position,
        height,
        topOffset,
        bottomOffset,
        keyboardOffset,
    });
    const onDismiss = React.useCallback(() => {
        animate(0);
        onHide();
    }, [animate, onHide]);
    const onRestore = React.useCallback(() => {
        animate(1);
        if (onRestorePosition) {
            onRestorePosition();
        }
    }, [animate, onRestorePosition]);
    const computeNewAnimatedValueForGesture = React.useCallback(
        (gesture) => {
            const damping = dampingFor(gesture, position);
            const newAnimatedValue = animatedValueFor(gesture, position, damping);
            return newAnimatedValue;
        },
        [position]
    );
    const { panResponder } = usePanResponder({
        animatedValue,
        computeNewAnimatedValueForGesture,
        onDismiss,
        onRestore,
    });
    React.useLayoutEffect(() => {
        const newAnimationValue = isVisible ? 1 : 0;
        animate(newAnimationValue);
    }, [animate, isVisible]);
    return (
        <Animated.View
            onLayout={computeViewDimensions}
            style={[styles.base, styles[position], animationStyles]}
            // This container View is never the target of touch events but its subviews can be.
            // By doing this, tapping buttons behind the Toast is allowed
            pointerEvents="box-none"
            {...panResponder.panHandlers}>
            {children}
        </Animated.View>
    );
}

export const styles = StyleSheet.create({
    base: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        top: 0,
    },
    bottom: {
        bottom: 0,
    },
});
