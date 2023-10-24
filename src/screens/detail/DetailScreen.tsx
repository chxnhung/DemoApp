import React, { useRef, useState } from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from 'components/Icon';
import { AirbnbRating } from 'components/Rating';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Avatar, ButtonText, EmptyListView, IColors, ListView } from 'packages/uikit';

import BottomSheetInput, { BottomSheetInputRefType } from 'packages/uikit/components/BottomSheet/BottomSheetInput';
import RadioButtonsGroup from 'packages/uikit/components/RadioButton';
import { HitSlop } from 'themes/dimensions';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { goBack } from 'utils/navigationUtils';

const POST_DATA = {
    title: 'Macaroni and Cheese',
    rate: 4.5,
    number_of_review: 100,
    content: 'Ingredients',
    type: 'option',
    options: [
        {
            id: 1,
            label: 'box elbow macaroni',
            value: 1,
        },
        {
            id: 2,
            label: 'cup butter',
            value: 2,
        },
        {
            id: 3,
            label: 'cup all-purpose flour',
            value: 3,
        },
        {
            id: 4,
            label: 'teaspoon salt',
            value: 4,
        },
        {
            id: 5,
            label: 'ground black pepper to taste',
            value: 5,
        },
    ],
    reviews: [
        {
            id: 1,
            name: 'Esme Kim',
            comment: 'Amazing study, thank you!!',
            rate: 5,
        },
        {
            id: 2,
            name: 'Fergus Kim',
            comment: 'Amazing study, thank you!!',
            rate: 3,
        },
        {
            id: 3,
            name: 'Misty Bloong',
            comment: 'Amazing study, thank you!!',
            rate: 4,
        },
    ],
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua labore et dolore magna aliqua',
};

const DetailScreen = () => {
    const colors = useThemeColors();
    const styles = Styles(colors);
    const data = POST_DATA;
    const [selectedId, setSelectedId] = useState(null);
    const bottomSheetRef = useRef<BottomSheetInputRefType>(null);

    const showBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.open();
        }
    };

    const renderEmpty = () => <EmptyListView />;
    const ratingCompleted = (rating) => {
        console.log('Rating is: ' + rating);
    };

    const renderTestItem = ({ index, item }) => {
        const isEnd = index === data.reviews.length - 1;
        return (
            <View style={[styles.itemView, { borderBottomWidth: isEnd ? 0 : scale(0.5) }]}>
                <View style={styles.userInfor}>
                    <View style={styles.leftInfor}>
                        <Avatar size={scale(28)} />
                        <View style={styles.rightInfo}>
                            <Text style={styles.nameText}>{item?.name}</Text>
                            <Text style={styles.textSave}>{item?.comment}</Text>
                        </View>
                    </View>
                    <AirbnbRating
                        onFinishRating={ratingCompleted}
                        isDisabled
                        showRating={false}
                        count={5}
                        defaultRating={item?.rate}
                        size={scale(16)}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity style={styles.iconView} onPress={() => goBack()} hitSlop={HitSlop.default}>
                    <Icon name="Back" size={scale(24)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconView} onPress={() => {}} hitSlop={HitSlop.default}>
                    <Icon name="Save" size={scale(20)} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.userInfor}>
                    <Avatar size={scale(20)} />
                    <View style={styles.rightInfo}>
                        <Text style={styles.nameText}>Joanna Harmon</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.titleText}>{data.title}</Text>
                    <View style={styles.info}>
                        <Icon name="Star" size={scale(16)} />
                        <Text style={styles.textStar}>{data.rate}</Text>
                        <Text style={styles.textSave}>{`(${data.number_of_review}+)`}</Text>
                        <ButtonText title={'123'} titleStyles={styles.underline} onPress={showBottomSheet} />
                    </View>
                    <Text style={styles.contentHeaderText}>{data.content}</Text>

                    <RadioButtonsGroup
                        containerStyle={styles.optionView}
                        radioButtons={data.options}
                        onPress={(id) => setSelectedId(id)}
                        selectedId={selectedId}
                        color={colors.secondary}
                    />
                </View>
            </View>
            <BottomSheetInput ref={bottomSheetRef}>
                <View style={styles.bottomSheet}>
                    <Text style={styles.titleText}>{'Review'}</Text>
                    <ListView
                        listEmpty={renderEmpty}
                        data={data.reviews}
                        renderItem={renderTestItem}
                        style={styles.flatList}
                    />
                    <View style={styles.bottomInput}>
                        <TextInput placeholder="Write your own review" style={styles.inputReview} />
                        <TouchableOpacity style={styles.iconSendView} onPress={() => {}} hitSlop={HitSlop.default}>
                            <Icon name="SendColor" size={scale(40)} />
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetInput>
        </View>
    );
};

export default DetailScreen;

const Styles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Sizes.statusBarHeight,
        },
        topView: {
            width: '100%',
            height: scale(230),
            backgroundColor: themeColors.backgroundDisabled,
            paddingHorizontal: scale(16),
            paddingVertical: scale(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        iconView: {
            width: scale(34),
            height: scale(34),
            borderRadius: scale(17),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.white,
        },
        content: {
            paddingHorizontal: scale(16),
        },
        userInfor: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scale(60),
            justifyContent: 'space-between',
        },
        leftInfor: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        nameText: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(12),
        },
        rightInfo: {
            marginLeft: scale(4),
        },
        titleText: {
            ...Fonts.poppins600,
            fontWeight: '600',
            fontSize: scale(20),
        },
        info: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scale(8),
            marginBottom: scale(20),
        },
        textFollower: {
            ...Fonts.poppins400,
            fontSize: scale(10),
        },
        textStar: {
            ...Fonts.poppins400,
            fontSize: scale(10),
            marginHorizontal: scale(5),
        },
        textSave: {
            ...Fonts.poppins400,
            fontSize: scale(10),
            color: themeColors.gray,
            marginLeft: scale(3),
        },
        contentHeaderText: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(16),
        },
        optionView: {
            alignItems: 'flex-start',
        },
        underline: {
            ...Fonts.poppins400,
            color: themeColors.main,
            marginLeft: scale(4),
            fontSize: scale(12),
            textDecorationLine: 'underline',
        },
        bottomSheet: {
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: scale(27),
            borderTopRightRadius: scale(27),
            paddingTop: scale(36),
            paddingBottom: scale(16),
            paddingHorizontal: scale(24),
        },
        flatList: {
            width: '100%',
            backgroundColor: themeColors.backgroundAlt,
            paddingVertical: scale(10),
        },
        itemView: {
            height: scale(60),
            borderBottomColor: themeColors.blackOpacity10,
            justifyContent: 'center',
        },
        bottomInput: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scale(10),
        },
        inputReview: {
            width: '85%',
            height: scale(40),
            borderWidth: scale(1),
            borderColor: themeColors.blackOpacity10,
            borderRadius: scale(61),
            padding: scale(12),
        },
        iconSendView: {},
    });
};
