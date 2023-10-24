import { createSlice } from '@reduxjs/toolkit';

import { loginAsyncAction } from './actions';

import { persistReducerUtil } from 'packages/stores/utils';
import { RootState } from 'stores';

const initialState = {
    isLogin: false,
    userInfor: {} as user.userInfor,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            return {
                ...state,
                isLogin: true,
                userInfor: action.payload,
            };
        },
        logoutSuccess: (state) => {
            return {
                ...state,
                isLogin: false,
                userInfor: {} as user.userInfor,
            };
        },
    },
});

export default persistReducerUtil('user', userSlice.reducer);

export const userSelector = (state: RootState) => state.user;
export const userInforSelector = (state: RootState) => state.user.userInfor;

export const userActions = userSlice.actions;
