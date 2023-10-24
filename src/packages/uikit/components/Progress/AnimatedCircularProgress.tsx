/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import React from 'react';
import { Animated, Easing } from 'react-native';

import CircularProgress from './CircularProgress';
import { IProgressAnimatedCircleProps, IProgressCircleProps } from './types';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

type State = {
    fillAnimation: Animated.Value;
};

export default class AnimatedCircularProgress extends React.PureComponent<
    IProgressCircleProps & IProgressAnimatedCircleProps,
    State
> {
    static defaultProps = {
        duration: 500,
        easing: Easing.out(Easing.ease),
        prefill: 0,
        useNativeDriver: false,
        delay: 0,
    };

    constructor(props) {
        super(props);
        this.state = {
            fillAnimation: new Animated.Value(props.prefill),
        };
        if (props.onFillChange) {
            this.state.fillAnimation.addListener(({ value }) => props.onFillChange(value));
        }
    }

    componentDidMount() {
        this.animate();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fill !== this.props.fill) {
            this.animate();
        }
    }

    reAnimate(prefill, toVal, dur, ease) {
        this.setState(
            {
                fillAnimation: new Animated.Value(prefill),
            },
            () => this.animate(toVal, dur, ease)
        );
    }

    animate(toVal?, dur?, ease?) {
        const toValue = toVal >= 0 ? toVal : this.props.fill;
        const duration = dur || this.props.duration;
        const easing = ease || this.props.easing;
        const useNativeDriver = this.props.useNativeDriver;
        const delay = this.props.delay;

        const anim = Animated.timing(this.state.fillAnimation, {
            useNativeDriver,
            toValue,
            easing,
            duration,
            delay,
        });
        anim.start(this.props.onAnimationComplete);

        return anim;
    }

    animateColor() {
        if (!this.props.tintColorSecondary) {
            return this.props.tintColor;
        }

        const tintAnimation = this.state.fillAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: [this.props.tintColor, this.props.tintColorSecondary],
        });

        return tintAnimation;
    }

    render() {
        const { fill, prefill, ...other } = this.props;

        return <AnimatedProgress {...other} fill={this.state.fillAnimation} tintColor={this.animateColor()} />;
    }
}
