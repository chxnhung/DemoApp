import { AppBar, IColors, Image, SearchBar } from 'packages/uikit';
import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'themes/scales';
import Fonts from 'themes/fonts';
import { useThemeColors } from 'packages/hooks/useTheme';
import Sizes from 'themes/sizes';
import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { navigate } from 'utils/navigationUtils';

const Data = [
    { tag: 'LISTEN', id: 0 },
    { tag: 'TALKING', id: 1 },
    { tag: 'GRAMMAR', id: 2 },
    { tag: 'VOCABULARY', id: 3 },
    { tag: 'VIDEO', id: 4 },
    { tag: 'TEST', id: 5 },
];

const DataPost = [
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 0 },
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 1 },
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 2 },
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 3 },
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 4 },
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 5 },
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 6 },
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 7 },
    { title: 'Gramar if', star: '4,5', follower: '19', level: 'Hard', image: '', id: 8 },
];

const SearchScreen = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);

    const renderTrendingItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.btnTag}>
                <Text style={styles.textTag}>{item?.tag}</Text>
            </TouchableOpacity>
        );
    };

    const renderPostItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => navigate('WatchDetail')}>
                <ImageBackground style={styles.imagePost} source={Images.RECOMMENDED}>
                    <View style={styles.levelView}>
                        <Text style={styles.textLevel}>{item.level}</Text>
                    </View>
                </ImageBackground>
                <Text style={styles.titleItem}>{item.title}</Text>
                <View style={styles.elaluatePost}>
                    <Svgs.IcStar />
                    <Text style={styles.textStar}>{item.star}</Text>
                    <Text style={styles.textFollower}>{`(${item.follower}+)`}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderHeaderSearch = () => {
        return (
            <>
                <SearchBar handleSearch={(value) => console.log(value)} />

                <View>
                    <Text style={styles.title}>Trending Search</Text>
                </View>
                <FlatList
                    data={Data}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderTrendingItem}
                    style={{ flex: 1 }}
                    columnWrapperStyle={{ justifyContent: Data.length < 3 ? 'flex-start' : 'space-between' }}
                />
                {/* {Data.map((item) => renderTrendingItem(item))} */}
                <View>
                    <Text style={styles.title}>Recommendation</Text>
                </View>
            </>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={renderHeaderSearch}
                data={DataPost}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPostItem}
                style={{ flex: 1, paddingBottom: scale(100) }}
                columnWrapperStyle={{ justifyContent: DataPost.length < 3 ? 'flex-start' : 'space-between' }}
            />
        </View>
    );
};

export default SearchScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: scale(15),
            paddingTop: Sizes.statusBarHeight,
        },
        title: {
            ...Fonts.poppins600,
            fontSize: scale(20),
            marginTop: scale(30),
            marginBottom: scale(20),
        },
        btnTag: {
            width: scale(101),
            height: scale(38),
            borderRadius: scale(30),
            backgroundColor: `${themeColors.main}20`,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: scale(10),
        },
        textTag: {
            color: themeColors.main,
            ...Fonts.poppins600,
            fontSize: scale(10),
        },

        imagePost: {
            width: scale(163),
            height: scale(124),
            justifyContent: 'flex-end',
        },
        levelView: {
            width: scale(37),
            height: scale(17),
            backgroundColor: themeColors.main,
            borderRadius: scale(10),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: scale(10),
            marginBottom: scale(10),
        },
        textLevel: {
            color: themeColors.white,
            ...Fonts.poppins400,
            fontSize: scale(10),
        },
        elaluatePost: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        titleItem: {
            fontSize: scale(16),
            ...Fonts.poppins600,
        },
        itemView: {
            marginBottom: scale(20),
        },
        textStar: {
            marginLeft: scale(5),
            ...Fonts.poppins400,
            fontSize: scale(10),
        },
        textFollower: {
            marginLeft: scale(5),
            ...Fonts.poppins400,
            fontSize: scale(10),
            color: themeColors.gray10,
        },
    });
};
