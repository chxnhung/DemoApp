/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import PropTypes from 'prop-types';
import React, { PureComponent, ReactElement } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

export interface IndicatorProps {
    animationEasing?: (value: number) => number;
    animationDuration?: number;
    hideAnimationDuration?: number;
    animating?: boolean;
    interaction?: boolean;
    hidesWhenStopped?: boolean;
    count?: number;
    renderComponent?: ({}) => ReactElement;
    viewStyle?: StyleProp<ViewStyle>;
}

type State = {
    progress: Animated.Value;
    hideAnimation: Animated.Value;
};

export default class Indicator extends PureComponent<IndicatorProps, State> {
    static defaultProps = {
        animationEasing: Easing.linear,
        animationDuration: 1200,
        hideAnimationDuration: 200,
        animating: true,
        interaction: true,
        hidesWhenStopped: true,
        count: 1,
    };

    static propTypes = {
        animationEasing: PropTypes.func,
        animationDuration: PropTypes.number,
        hideAnimationDuration: PropTypes.number,
        animating: PropTypes.bool,
        interaction: PropTypes.bool,
        hidesWhenStopped: PropTypes.bool,
        renderComponent: PropTypes.func,
        count: PropTypes.number,
    };
    animationState: number;
    savedValue: number;

    constructor(props: IndicatorProps) {
        super(props);
        this.animationState = 0;
        this.savedValue = 0;
        const { animating } = this.props;
        this.state = {
            progress: new Animated.Value(0),
            hideAnimation: new Animated.Value(animating ? 1 : 0),
        };
    }

    componentDidMount() {
        const { animating } = this.props;
        if (animating) {
            this.startAnimation();
        }
    }

    componentDidUpdate(prevProps) {
        const { animating } = this.props;
        const current = animating ? 1 : 0;
        const previous = prevProps.animating ? 1 : 0;
        if (animating && !prevProps.animating) {
            this.resumeAnimation();
        }
        if (!animating && prevProps.animating) {
            this.stopAnimation();
        }
        if (current ^ previous) {
            const { hideAnimation } = this.state;
            const { hideAnimationDuration: duration } = this.props;

            Animated.timing(hideAnimation, { toValue: animating ? 1 : 0, duration, useNativeDriver: true }).start();
        }
    }

    startAnimation() {
        const { progress } = this.state;
        const { interaction, animationEasing, animationDuration } = this.props;
        if (0 !== this.animationState) {
            return;
        }
        const animation = Animated.timing(progress, {
            duration: animationDuration,
            easing: animationEasing,
            useNativeDriver: true,
            isInteraction: interaction,
            toValue: 1,
        });
        Animated.loop(animation).start();
        this.animationState = 1;
    }

    stopAnimation() {
        const { progress } = this.state;
        if (1 !== this.animationState) {
            return;
        }
        const listener = progress.addListener(({ value }) => {
            progress.removeListener(listener);
            progress.stopAnimation(() => this.saveAnimation(value));
        });
        this.animationState = -1;
    }

    saveAnimation(value) {
        const { animating } = this.props;
        this.savedValue = value;
        this.animationState = 0;
        if (animating) {
            this.resumeAnimation();
        }
    }

    resumeAnimation() {
        const { progress } = this.state;
        const { interaction, animationDuration } = this.props;
        if (0 !== this.animationState) {
            return;
        }
        Animated.timing(progress, {
            useNativeDriver: true,
            isInteraction: interaction,
            duration: (1 - this.savedValue) * animationDuration,
            toValue: 1,
        }).start(({ finished }) => {
            if (finished) {
                progress.setValue(0);

                this.animationState = 0;
                this.startAnimation();
            }
        });
        this.savedValue = 0;
        this.animationState = 1;
    }

    renderComponent(item, index) {
        const { progress } = this.state;
        const { renderComponent, count } = this.props;
        if ('function' === typeof renderComponent) {
            return renderComponent({ index, count, progress });
        }
        return null;
    }

    render() {
        const { hideAnimation } = this.state;
        const { count, hidesWhenStopped, ...props } = this.props;
        if (hidesWhenStopped) {
            props.viewStyle = [].concat(props.viewStyle || [], { opacity: hideAnimation });
        }
        return <Animated.View {...props}>{Array.from(new Array(count), this.renderComponent, this)}</Animated.View>;
    }
}
