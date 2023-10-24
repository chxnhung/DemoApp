import Clipboard from '@react-native-clipboard/clipboard';
import React, { useMemo, useRef, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';

import { combineCode, fieldName, initValue, isAutoFillSupported, isNum } from './utils';

import { scale } from 'themes/scales';

interface OTPInputProps {
    digit?: number;
    firstFocus?: boolean;
    submit?: (code: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
}
const OTPInput = (props: OTPInputProps) => {
    const { digit = 6, firstFocus = false, submit, containerStyle, inputStyle } = props;
    const otpArr = Array.from(Array(digit).keys());
    const initialValue = initValue(otpArr);
    const inputOtpRef = useRef([]);
    const { control, register, getValues, setValue } = useForm({
        mode: 'all',
        defaultValues: initialValue,
    });
    const [otpCode, setOtpCode] = useState('');

    const autoFocus = async (idx: number, isNext = true) => {
        if (isNext) {
            const nextInput = idx + 1;
            if (nextInput < digit) {
                inputOtpRef.current[nextInput].focus();
            }
        } else {
            const previousInput = idx - 1;
            if (previousInput >= 0) {
                inputOtpRef.current[previousInput].focus();
            }
        }
    };

    const handleChangeOTP = async (value: string, idx: number, onChange) => {
        // console.log('value', value);
        // const copiedContent = await Clipboard.getString();
        // console.log('copiedContent', copiedContent);

        if (isNum(value)) {
            await autoFocus(idx);
            await onChange(value);
            await handleCombineCode();
        }
    };

    const handleCombineCode = async () => {
        const values = getValues();
        const code = combineCode(values);
        setOtpCode(code);
    };

    const handleKeyPress = (event: object, idx: number) => {
        const isHasValue = !!getValues(fieldName(idx));
        if (event['key'] === 'Backspace' && !isHasValue) {
            autoFocus(idx, false);
        }
    };

    useMemo(() => {
        if (otpCode.length === 6) {
            submit(otpCode);
        }
    }, [otpCode]);

    const renderInput = (field: ControllerRenderProps, idx: number) => {
        const { value, onChange, onBlur } = field;
        return (
            <TextInput
                {...register(fieldName(idx))}
                ref={(ref) => (inputOtpRef.current[idx] = ref)}
                onBlur={onBlur}
                onChangeText={(e) => {
                    handleChangeOTP(e, idx, onChange);
                }}
                onKeyPress={({ nativeEvent }) => {
                    handleKeyPress(nativeEvent, idx);
                }}
                onFocus={() => {
                    setValue(fieldName(idx), '');
                }}
                autoFocus={firstFocus ? idx === 0 : false}
                keyboardType="number-pad"
                value={value}
                style={[styles.input, inputStyle]}
                autoCapitalize={'none'}
                autoComplete="off"
                maxLength={idx === 0 ? digit : 1}
                textContentType={isAutoFillSupported ? 'oneTimeCode' : 'none'}
            />
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            style={[styles.container, containerStyle]}>
            {otpArr.map((_, index) => (
                <Controller
                    name={fieldName(index)}
                    key={index}
                    control={control}
                    render={({ field }) => {
                        return renderInput(field, index);
                    }}
                />
            ))}
        </KeyboardAvoidingView>
    );
};

export default OTPInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    input: {
        borderBottomWidth: scale(1),
        width: scale(40),
        height: scale(50),
        fontSize: scale(20),
        textAlign: 'center',
    },
});
