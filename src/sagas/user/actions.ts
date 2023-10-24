class UserActions {
    public readonly REGISTER = 'REGISTER';
    public readonly REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    public readonly REGISTER_FAILURE = 'REGISTER_FAILURE';

    public readonly LOGIN = 'LOGIN';
    public readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    public readonly LOGIN_FAILURE = 'LOGIN_FAILURE';

    public readonly LOGOUT = 'LOGOUT';
    public readonly LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    public readonly LOGOUT_FAILURE = 'LOGOUT_FAILURE';
}

export declare namespace userActionTypes {
    type registerActionType = TypedAction<typeof userActions.REGISTER, register.RegisterRequest>;
    type registerSuccessActionType = TypedActionEmpty<typeof userActions.REGISTER_SUCCESS>;
    type registerFailureActionType = TypedActionError<typeof userActions.REGISTER_FAILURE, string>;

    type loginActionType = TypedAction<typeof userActions.LOGIN, login.LoginRequest>;
    type loginSuccessActionType = TypedAction<typeof userActions.LOGIN_SUCCESS, user.userInfor>;
    type loginFailureActionType = TypedActionError<typeof userActions.LOGIN_FAILURE, string>;

    type logoutActionType = TypedActionEmpty<typeof userActions.LOGOUT>;
    type logoutSuccessActionType = TypedActionEmpty<typeof userActions.LOGOUT_SUCCESS>;
    type logoutFailureActionType = TypedActionError<typeof userActions.LOGOUT_FAILURE, string>;
}

class UserActionCreators {
    public register = (payload: register.RegisterRequest): userActionTypes.registerActionType => ({
        type: userActions.REGISTER,
        payload,
    });
    public registerSuccess = (): userActionTypes.registerSuccessActionType => ({ type: userActions.REGISTER_SUCCESS });
    public registerFailure = (error: string): userActionTypes.registerFailureActionType => ({
        type: userActions.REGISTER_FAILURE,
        error,
    });

    public login = (payload: login.LoginRequest): userActionTypes.loginActionType => ({
        type: userActions.LOGIN,
        payload,
    });
    public loginSuccess = (payload: user.userInfor): userActionTypes.loginSuccessActionType => ({
        type: userActions.LOGIN_SUCCESS,
        payload,
    });
    public loginFailure = (error: string): userActionTypes.loginFailureActionType => ({
        type: userActions.LOGIN_FAILURE,
        error,
    });

    public logout = (): userActionTypes.logoutActionType => ({ type: userActions.LOGOUT });
    public logoutSuccess = (): userActionTypes.logoutSuccessActionType => ({ type: userActions.LOGOUT_SUCCESS });
    public logoutFailure = (error: string): userActionTypes.logoutFailureActionType => ({
        type: userActions.LOGOUT_FAILURE,
        error,
    });
}

export const userActions = new UserActions();
export const userActionCreators = new UserActionCreators();
