import React, { useImperativeHandle, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit/theme';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

interface SliderProps {
    onSlideChange: (index: number) => void;
    renderItem: ({ index }) => React.ReactElement;
    customComponent?: React.ReactNode;
}
const SLIDER_DATA = [{ key: 0 }, { key: 1 }, { key: 2 }];

const Slide = (props: SliderProps, ref: React.Ref<unknown>) => {
    const { customComponent } = props;
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const refScroll = useRef(null);
    const colors = useThemeColors();
    const styles = myStyles(colors);

    const onSliderPageChange = (event) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen =
            Platform.OS === 'ios' ? Math.floor(x / Sizes.scrWidth) : Math.round(x / Sizes.scrWidth);
        if (indexOfNextScreen !== currentPage && indexOfNextScreen >= 0) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
            props?.onSlideChange(indexOfNextScreen);
        }
    };

    const onScrollTo = (_i: number) => {
        refScroll.current?.scrollTo({
            x: _i * Sizes.scrWidth,
            y: 0,
            animated: true,
        });
    };

    const onBack = () => {
        onScrollTo(sliderState.currentPage - 1);
    };

    const onNext = () => {
        onScrollTo(sliderState.currentPage + 1);
    };

    useImperativeHandle(ref, () => ({
        onBack,
        onNext,
    }));

    const renderDot = (index) => {
        const { currentPage } = sliderState;
        const isSelected = index.key === currentPage;
        return (
            <View
                style={[
                    styles.dotView,
                    {
                        backgroundColor: isSelected ? colors.main : colors.label,
                        opacity: isSelected ? 1 : 0.2,
                    },
                ]}
                {...index}
            />
        );
    };

    return (
        <View style={styles.container}>
            {!!customComponent && <>{customComponent}</>}
            <ScrollView
                ref={refScroll}
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEnabled={true}
                onScroll={(event) => onSliderPageChange(event)}>
                {SLIDER_DATA.map((index) => {
                    return props.renderItem({
                        index,
                    });
                })}
            </ScrollView>
            <View style={styles.dotViewContainaer}>{SLIDER_DATA.map((index) => renderDot(index))}</View>
        </View>
    );
};

export default React.forwardRef(Slide);

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            overflow: 'hidden',
            alignItems: 'center',
        },
        dotView: {
            width: scale(8),
            height: scale(8),
            borderRadius: scale(4),
        },
        dotViewContainaer: {
            flexDirection: 'row',
            position: 'absolute',
            bottom: scale(30) + Sizes.bottomSpace,
            justifyContent: 'space-between',
            width: scale(32),
        },
    });
