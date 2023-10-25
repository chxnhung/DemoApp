import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderStyleInterpolators, TransitionPresets } from '@react-navigation/stack';

import { RootParamList } from './types';

import { BottomTab } from 'navigation';
import Screens from 'screens';
import { getCurrentRoute, navigate, navigationRef } from 'utils/navigationUtils';
import auth from '@react-native-firebase/auth';
import { useEffect, useMemo, useState } from 'react';
import Splash from 'react-native-splash-screen';
import Storages, { KeyStorage } from 'utils/storages';
import { getInitRoute } from 'utils/utils';
import linking from '../../linking'

const Stack = createNativeStackNavigator<RootParamList>();

const RootStack = (props) => {
    const { initRoute } = props;
    return (
        <Stack.Navigator initialRouteName={initRoute} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={Screens.IntroScreen} />
            <Stack.Screen name="Login" component={Screens.LoginScreen} />
            <Stack.Screen name="Register" component={Screens.RegisterScreen} />
            <Stack.Screen name="Main" component={BottomTab} />
            <Stack.Screen
                options={{
                    ...TransitionPresets.ModalPresentationIOS,
                }}
                name="Post"
                component={Screens.PostScreen}
            />
            <Stack.Screen name="WatchDetail" component={Screens.WatchDetailScreen} />
            <Stack.Screen name="Detail" component={Screens.DetailScreen} />
        </Stack.Navigator>
    );
};

const StackNavigator = () => {
    const [initRoute, setInitRoute] = useState<string>('');

    const onAuthStateChanged = async (user) => {
        const initScreen = await getInitRoute(user);
        setInitRoute(initScreen);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useMemo(() => {
        if (!!initRoute) {
            setTimeout(() => {
                Splash.hide();
            }, 500);
        }
    }, [initRoute]);

    return (
        <NavigationContainer linking={linking} ref={navigationRef}>
            {!!initRoute && <RootStack initRoute={initRoute} />}
            {/* <Codepush /> */}
        </NavigationContainer>
    );
};

export default StackNavigator;
