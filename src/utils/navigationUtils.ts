import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

import { RootParamList } from 'stacks/types';

export const navigationRef = createNavigationContainerRef<RootParamList>();

const SCREENS_NEED_LOGIN: (keyof RootParamList)[] = [];

export function navigate(name: keyof RootParamList, params?: RootParamList[keyof RootParamList]) {
    const isLogin = true;
    if (navigationRef.isReady()) {
        if (!isLogin && SCREENS_NEED_LOGIN.includes(name)) {
            // login flow
        } else {
            // @ts-ignore
            navigationRef.navigate(name, params);
        }
    }
}

export function replace(name: keyof RootParamList, params?: RootParamList[keyof RootParamList]) {
    navigationRef.dispatch(StackActions.replace(name, params));
}

export function popToTop() {
    navigationRef.dispatch(StackActions.popToTop());
}

export function pop(position: number = 1) {
    navigationRef.dispatch(StackActions.pop(position));
}

export function goBack() {
    navigationRef.goBack();
}

export function resetStack(name: keyof RootParamList, params = {}) {
    navigationRef.reset({
        index: 0,
        routes: [
            {
                name,
                params,
            },
        ],
    });
}

export function getCurrentRoute() {
    return navigationRef.getCurrentRoute()?.name;
}

export function pushToPage(name: string, params?: RootParamList[keyof RootParamList]): void {
    navigationRef.dispatch(StackActions.push(name, params));
}
