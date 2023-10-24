import Storages, { KeyStorage } from './storages';

import { globalLoading } from 'packages/uikit/components/Loading';
import { RootParamList } from 'stacks/types';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Loading = async (isLoad = true) => {
    if (isLoad) {
        return globalLoading.show();
    }
    return globalLoading.hide();
};

const getInitRoute = async (user) => {
    let screenName: keyof RootParamList = 'Intro';
    const isTurnOfIntro = await Storages.get(KeyStorage.isTurnOfIntro);
    if (user) {
        screenName = 'Main';
    } else {
        if (isTurnOfIntro) {
            screenName = 'Login';
        }
    }
    return screenName;
};
export { sleep, getInitRoute, Loading };
