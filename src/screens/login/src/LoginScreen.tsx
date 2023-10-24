import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useDispatch } from 'react-redux';

import { FORM_ERROR, loginDataForm, loginFieldName } from './constant';
import loginSchema from './schema';

import Images from 'assets/images';
import Icon from 'components/Icon';
import { useSetting } from 'contexts/SettingProvider';
import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Button, ButtonText, CheckBox, FormInput } from 'packages/uikit';
import Text from 'packages/uikit/components/Text';
import { IColors } from 'packages/uikit/theme';
import { SignIn } from 'services/firebase';
import { userActions } from 'stores/user';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { navigate } from 'utils/navigationUtils';

const LoginScreen = () => {
    const {
        control,
        formState: { errors },
        register,
        setError,
        handleSubmit,
    } = useForm({
        mode: 'all',
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(loginSchema),
    });
    const dispatch = useDispatch();
    const { t } = useSetting();
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { mode } = colorMode;
    const fadeImage = mode === 'dark' ? Images.BACKGROUND_FADE_DARK : Images.BACKGROUND_FADE;
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const isPassword = (name: string) => {
        return name === loginFieldName.password;
    };

    const handleHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const renderLeftInput = (icon: string) => {
        return (
            <View style={styles.leftIcon}>
                <Icon name={icon} size={scale(16)} />
            </View>
        );
    };

    const onSubmit = async (data) => {
        await SignIn(data.email, data.password, (user) => {
            if (user) {
                console.log(user);

                dispatch(userActions.loginSuccess(user));
                navigate('Main');
            } else {
                FORM_ERROR.map((e) => {
                    setError(e.field, { message: e.message });
                });
            }
        });
        // auth()
        //     .signInWithEmailAndPassword(data.email, data.password)
        //     .then((res) => {
        //         console.log(res);
        //         console.log('User logged-in successfully!');
        //         navigate('Main');
        //     })
        //     .catch((error) => console.log(error));
    };

    const renderRightInput = (name) => {
        const IconName = isPassword(name) ? `${hidePassword ? 'EyeHide' : 'Eye'}` : `Check`;
        const sizeIcon = isPassword(name) ? (hidePassword ? 20 : 17) : 16;
        const padding = hidePassword || !isPassword(name) ? 0 : scale(2);
        return (
            <TouchableOpacity
                disabled={name !== loginFieldName.password}
                onPress={handleHidePassword}
                style={[styles.rightIcon, { paddingRight: padding }]}>
                <Icon name={IconName} size={scale(sizeIcon)} />
            </TouchableOpacity>
        );
    };

    const renderCheckboxIcon = () => {
        return isCheck ? <Icon name={'Tick'} size={scale(12)} /> : null;
    };

    const renderInput = (data, index) => {
        const error = errors[`${data.name}`];
        const inputStyle = error && error?.message ? styles.errorInput : styles.input;
        return (
            <FormInput
                key={`input_${index}`}
                control={control}
                name={data.name}
                error={error}
                placeholder={t('auth.' + data.placeholder.toLowerCase())}
                register={register}
                styleInput={inputStyle}
                styleTextInput={styles.textInput}
                placeholderTextColor={colors.label}
                errorTextStyle={styles.errorText}
                leftComponent={renderLeftInput(data.icon)}
                secure={isPassword(data.name) ? hidePassword : false}
                rightComponent={isPassword(data.name) && renderRightInput(data.name)}
            />
        );
    };

    return (
        <ImageBackground style={styles.background} source={Images.BACKGROUND}>
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundFade} source={fadeImage} />
                <View style={styles.content}>
                    <View>
                        <Text style={styles.welcome}>{t('auth.welcome')}</Text>
                        <Text style={styles.subTitle}>{t('auth.welcomeSignIn')}</Text>
                    </View>
                    <View style={styles.formRegister}>
                        {loginDataForm.map((data, index) => {
                            return renderInput(data, index);
                        })}
                        <Button
                            title={t('auth.signIn')}
                            onPress={handleSubmit(onSubmit)}
                            containerStyles={styles.loginBtn}
                            titleStyles={styles.titleButton}
                        />
                        <CheckBox
                            iconComponent={renderCheckboxIcon()}
                            fillColor={colors.main}
                            onPress={(isChecked: boolean) => {
                                setIsCheck(isChecked);
                            }}
                            radius={scale(3)}
                            size={scale(16)}
                            text={t('auth.rememberMe')}
                            textContainerStyle={styles.checkBoxTextContainer}
                            textStyle={styles.checkBoxText}
                        />
                    </View>
                </View>
                <View style={styles.bottomSignUp}>
                    <Text style={styles.dontHaveAccount}>{t('auth.dontHaveAccount')}</Text>
                    <ButtonText
                        title={t('auth.signUp')}
                        titleStyles={styles.signUp}
                        onPress={() => navigate('Register')}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        backgroundFade: {
            flex: 1,
            position: 'absolute',
            height: scale(1100),
            width: scale(900),
            left: -scale(220),
            top: scale(100),
        },
        container: {
            flex: 1,
        },
        content: {
            position: 'absolute',
            width: Sizes.scrWidth,
            top: scale(210),
            paddingHorizontal: scale(16),
        },
        btn: {
            height: scale(50),
            width: scale(340),
            marginTop: scale(10),
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: scale(1),
            justifyContent: 'center',
            borderRadius: scale(5),
        },
        text1: {
            fontSize: scale(30),
        },
        welcome: {
            ...Fonts.poppins700,
            fontWeight: '700',
            fontSize: scale(28),
            color: themeColors.subText,
        },
        subTitle: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(12),
            color: themeColors.subText,
            marginTop: scale(4),
            marginBottom: scale(15),
        },
        formRegister: {
            justifyContent: 'space-around',
        },
        input: {
            backgroundColor: themeColors.backgroundAlt,
            borderRadius: scale(8),
            borderWidth: scale(1),
            borderColor: themeColors.blackOpacity10,
            height: scale(45),
            marginTop: scale(24),
            paddingHorizontal: scale(10),
            alignItems: 'center',
        },
        errorInput: {
            backgroundColor: themeColors.backgroundAlt,
            borderRadius: scale(8),
            borderWidth: scale(1),
            height: scale(45),
            marginTop: scale(24),
            paddingHorizontal: scale(10),
            alignItems: 'center',
            borderColor: themeColors.red[500],
        },
        errorText: {
            fontWeight: '400',
            fontSize: scale(10),
            marginLeft: scale(10),
            ...Fonts.poppins400,
            color: themeColors.red[500],
            position: 'absolute',
            bottom: -scale(16),
        },
        textInput: {
            fontWeight: '400',
            fontSize: scale(12),
            height: '100%',
            ...Fonts.poppins400,
        },
        labelInput: {
            fontSize: 10,
            color: themeColors.label,
            ...Fonts.poppins400,
        },
        titleButton: {
            ...Fonts.poppins600,
            fontWeight: '600',
            color: themeColors.white,
            fontSize: scale(14),
        },
        loginBtn: {
            marginTop: scale(33),
            borderRadius: scale(8),
            backgroundColor: themeColors.main,
            height: scale(45),
            marginBottom: scale(24),
        },
        bottomSignUp: {
            position: 'absolute',
            bottom: scale(20),
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        dontHaveAccount: {
            ...Fonts.poppins400,
            color: themeColors.subText,
            fontSize: scale(12),
        },
        signUp: {
            ...Fonts.poppins400,
            color: themeColors.main,
            marginLeft: scale(4),
            fontSize: scale(12),
            textDecorationLine: 'underline',
        },
        leftIcon: {
            marginRight: scale(8),
        },
        rightIcon: {
            width: scale(20),
            alignItems: 'center',
        },
        checkBoxTextContainer: {
            marginLeft: scale(4),
        },
        checkBoxText: {
            fontWeight: '400',
            fontSize: scale(12),
            ...Fonts.poppins400,
            color: themeColors.subText,
            textDecorationLine: 'none',
        },
    });
};
