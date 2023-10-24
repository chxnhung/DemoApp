import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MyTabBar } from 'components';

import Screens from 'screens';

const Tab = createBottomTabNavigator();

interface MainScreenProps {
    isLogin: boolean;
}

function BottomTab(props: MainScreenProps) {
    const renderTabBar = (bottomTabBarProps: BottomTabBarProps) => {
        const tabBarProps = {
            ...bottomTabBarProps,
            ...props,
        };
        return <MyTabBar {...tabBarProps} />;
    };
    return (
        <Tab.Navigator
            tabBar={renderTabBar}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
            }}>
            <Tab.Screen name="Home" component={Screens.Home} />
            <Tab.Screen name="Search" component={Screens.SearchScreen} />
            <Tab.Screen name="Post" component={Screens.PostScreen} />
            <Tab.Screen name="Favourite" component={Screens.FavouriteScreen} />
            <Tab.Screen name="Profile" component={Screens.ProfileScreen} />
        </Tab.Navigator>
    );
}

export default BottomTab;
