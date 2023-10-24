import 'packages/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SettingProvider from 'contexts/SettingProvider';
import { BaseProvider, ColorMode, IBaseConfig, StorageManager } from 'packages/core';
import { extendTheme } from 'packages/core/extendTheme';
import { theme as defaultTheme } from 'packages/uikit';
import { Drawer, Loading, Toast } from 'packages/uikit/components';
import { globalDrawerRef } from 'packages/uikit/components/Drawer';
import GestureRecognizer from 'packages/uikit/components/Drawer/GestureRecognizer';
import { globalLoadingRef } from 'packages/uikit/components/Loading';
import { onSwipeRight } from 'packages/utils/gestureHandle';
import RootStacks from 'stacks';
import store, { persistor } from 'stores';
import { myColors, MyColorsType } from 'themes/colors';
import { scale } from 'themes/scales';

const myTheme = extendTheme({
    colors: myColors,
    fontConfig: {
        Roboto: {
            100: 'Roboto-Light',
            200: 'Roboto-Light',
            300: 'Roboto-Light',
            400: {
                normal: 'Roboto-Regular',
                italic: 'Roboto-Italic',
            },
            500: 'Roboto-Medium',
            600: 'Roboto-Medium',
            700: {
                normal: 'Roboto-Bold',
                italic: 'Roboto-BoldItalic',
            },
            800: 'Roboto-Bold',
            900: 'Roboto-Black',
        },
    },
    fonts: {
        ...defaultTheme.fonts,
        heading: 'Roboto',
        body: 'Roboto',
        mana: 'Roboto',
    },
});

type MyThemeType = typeof myTheme;
// NOTE: The module name in package.json
declare module 'SotaEng' {
    interface ICustomTheme extends MyThemeType {}
    interface ICustomColors extends MyColorsType {}
}

const config: IBaseConfig = {
    dependencies: {
        'liner-gradient': require('react-native-linear-gradient').default,
    },
};
const MENU_TEST = [{ name: 'Home' }, { name: 'Profile' }, { name: 'Notification' }, { name: 'Setting' }];

// TODO: need wrap logic to file
const colorModeManager: StorageManager = {
    get: async () => {
        try {
            const val = await AsyncStorage.getItem('@color-mode');
            return val === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    },
    set: async (value: ColorMode) => {
        try {
            await AsyncStorage.setItem('@color-mode', value);
        } catch (e) {
            console.log(e);
        }
    },
};

function App() {
    return (
        <BaseProvider config={config} colorModeManager={colorModeManager} theme={myTheme}>
            <SettingProvider>
                {/* <GestureRecognizer onSwipeRight={(state) => onSwipeRight(state)} style={{ flex: 1 }}> */}
                <Provider store={store}>
                    <Drawer showMenu showAvatar ref={globalDrawerRef} menuData={MENU_TEST} />
                    <PersistGate loading={null} persistor={persistor}>
                        <RootStacks />
                    </PersistGate>
                    <Loading ref={globalLoadingRef} />
                    <Toast topOffset={scale(45)} />
                </Provider>
                {/* </GestureRecognizer> */}
            </SettingProvider>
        </BaseProvider>
    );
}

export default App;
