import { all, call, put, take, takeLatest } from 'redux-saga/effects';

import { userActions, userActionTypes } from './actions';

import { rootActions } from 'stores/root/rootSlice';

export function* userRuntime() {
    yield all([call(handleLogin)]);
}

function* handleLogin() {
    try {
        const action: userActionTypes.loginActionType = yield take(userActions.LOGIN);
        const { email, password } = action.payload;
        // const response = yield put(SignIn(email, password));
        // yield put(rootActions.hideLoading());
        // if (response?.status === 200 && response?.data) {
        //     yield put(userActions.loginSuccess(response?.data));
        //     console.log('Success');
        // } else {
        //     console.log('failed');
        // }
    } catch (error) {
        console.log('err', error);
        yield put(rootActions.hideLoading());
    }
}
