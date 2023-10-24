import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';

interface ILoginInfo {
    username: string;
    token: string;
    refreshToken: string;
}

export const loginAsyncAction: Readonly<{
    pending: ActionCreatorWithPayload<{ url: string; requestId: string }>;
    fulfilled: ActionCreatorWithPayload<{ url: string; loginInfo: ILoginInfo; requestId: string }>;
    rejected: ActionCreatorWithPayload<{ url: string; message: string; requestId: string }>;
}> = {
    pending: createAction('user/loginAsync/pending'),
    fulfilled: createAction('user/loginAsync/fulfilled'),
    rejected: createAction('user/loginAsync/rejected'),
};

export const logoutAction = createAction('user/logout');
