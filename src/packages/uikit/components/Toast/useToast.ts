/* eslint-disable max-len */
import React from 'react';

import { useTimeout } from './hooks/useTimeout';
import { UseToastParams } from './types';
import { mergeIfDefined } from './utils/obj';

export const DEFAULT_DATA = {
    text1: undefined,
    text2: undefined,
};
export const DEFAULT_OPTIONS = {
    type: 'base',
    position: 'top',
    autoHide: true,
    visibilityTime: 2000,
    topOffset: 40,
    bottomOffset: 40,
    keyboardOffset: 10,
    onShow: undefined,
    onHide: undefined,
    onPress: undefined,
    props: {},
};
export function useToast(propsUse: UseToastParams) {
    const { defaultOptions } = propsUse;
    const [isVisible, setIsVisible] = React.useState(false);
    const [data, setData] = React.useState(DEFAULT_DATA);
    const initialOptions = mergeIfDefined(DEFAULT_OPTIONS, defaultOptions);
    const [options, setOptions] = React.useState(initialOptions);
    const onAutoHide = React.useCallback(() => {
        setIsVisible(false);
        if (options.onHide) {
            options.onHide();
        }
    }, [options]);
    const { startTimer, clearTimer } = useTimeout(onAutoHide, options.visibilityTime);
    const hide = React.useCallback(() => {
        setIsVisible(false);
        clearTimer();
        if (options.onHide) {
            options.onHide();
        }
    }, [clearTimer, options]);
    const show = React.useCallback(
        (params) => {
            const {
                text1 = DEFAULT_DATA.text1,
                text2 = DEFAULT_DATA.text2,
                type = initialOptions.type,
                position = initialOptions.position,
                autoHide = initialOptions.autoHide,
                visibilityTime = initialOptions.visibilityTime,
                topOffset = initialOptions.topOffset,
                bottomOffset = initialOptions.bottomOffset,
                keyboardOffset = initialOptions.keyboardOffset,
                onShow = initialOptions.onShow,
                onHide = initialOptions.onHide,
                onPress = initialOptions.onPress,
                props = initialOptions.props,
            } = params;
            setData({
                text1,
                text2,
            });
            setOptions(
                mergeIfDefined(initialOptions, {
                    type,
                    position,
                    autoHide,
                    visibilityTime,
                    topOffset,
                    bottomOffset,
                    keyboardOffset,
                    onShow,
                    onHide,
                    onPress,
                    props,
                })
            );
            // TODO: validate input
            // TODO: use a queue when Toast is already visible
            setIsVisible(true);
            if (onShow) {
                onShow();
            }
        },
        [initialOptions]
    );
    React.useEffect(() => {
        const { autoHide } = options;
        if (isVisible) {
            if (autoHide) {
                startTimer();
            } else {
                clearTimer();
            }
        }
    }, [isVisible, options, startTimer, clearTimer]);
    return {
        isVisible,
        data,
        options,
        show,
        hide,
    };
}
