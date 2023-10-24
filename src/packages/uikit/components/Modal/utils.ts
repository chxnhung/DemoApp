import { Dimensions } from 'react-native';
import * as animatable from 'react-native-animatable';
import { Animation, CustomAnimation } from 'react-native-animatable';

import { Animations } from './types';

const { height, width } = Dimensions.get('window');

export const initializeAnimations = () => {
    const animationDefinitions: Record<string, CustomAnimation> = {
        slideInDown: makeSlideTranslation('translateY', -height, 0),
        slideInUp: makeSlideTranslation('translateY', height, 0),
        slideInLeft: makeSlideTranslation('translateX', -width, 0),
        slideInRight: makeSlideTranslation('translateX', width, 0),
        slideOutDown: makeSlideTranslation('translateY', 0, height),
        slideOutUp: makeSlideTranslation('translateY', 0, -height),
        slideOutLeft: makeSlideTranslation('translateX', 0, -width),
        slideOutRight: makeSlideTranslation('translateX', 0, width),
    };

    animatable.initializeRegistryWithDefinitions(animationDefinitions);
};

export const makeSlideTranslation = (translationType: string, fromValue: number, toValue: number) => ({
    from: {
        [translationType]: fromValue,
    },
    to: {
        [translationType]: toValue,
    },
});

export const buildAnimations = ({
    animationIn,
    animationOut,
}: {
    animationIn: Animation | CustomAnimation;
    animationOut: Animation | CustomAnimation;
}): Animations => {
    let updatedAnimationIn: string;
    let updatedAnimationOut: string;

    if (isObject(animationIn)) {
        const animationName = JSON.stringify(animationIn);
        makeAnimation(animationName, animationIn as CustomAnimation);
        updatedAnimationIn = animationName;
    } else {
        updatedAnimationIn = animationIn;
    }

    if (isObject(animationOut)) {
        const animationName = JSON.stringify(animationOut);
        makeAnimation(animationName, animationOut as CustomAnimation);
        updatedAnimationOut = animationName;
    } else {
        updatedAnimationOut = animationOut;
    }

    return {
        animationIn: updatedAnimationIn,
        animationOut: updatedAnimationOut,
    };
};

export const reversePercentage = (x: number) => -(x - 1);

const makeAnimation = (name: string, obj: CustomAnimation): void => {
    animatable.registerAnimation(name, animatable.createAnimation(obj) as CustomAnimation);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (obj: any): obj is object => {
    return obj !== null && typeof obj === 'object';
};
