/* eslint-disable @typescript-eslint/no-explicit-any */
import auth from '@react-native-firebase/auth';

import { Loading, sleep } from 'utils/utils';

const SignIn = async (email: string, password: string, callback?: any) => {
    await Loading();
    try {
        const res = await auth().signInWithEmailAndPassword(email, password);
        const user = res.user['_user'];
        await Loading(false);
        if (callback) {
            callback(user);
        }
    } catch (error) {
        await Loading(false);
        if (callback) {
            callback(false);
        }
    }
};

const SignUp = async (email: string, password: string, callback?: any) => {
    await Loading();
    try {
        const res = await auth().createUserWithEmailAndPassword(email, password);
        await Loading(false);
        if (callback) {
            callback(res);
        }
    } catch (error) {
        await Loading(false);
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
        console.error(error);
    }
};

const SignOut = async (callback?: any) => {
    auth()
        .signOut()
        .then(() => {
            if (callback) {
                callback();
            }
        });
};

export { SignIn, SignUp, SignOut };
