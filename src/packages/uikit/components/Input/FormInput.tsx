/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import { scale } from 'themes/scales';
interface FormInputProps {
    name: string;
    control: any;
    register: any;
    error?: any;
    placeholder?: string;
    label?: string;
    editable?: boolean;
    secure?: boolean;
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    onFocus?: () => void;
    isFocused?: boolean;
    returnKeyType?: TextInputProps['returnKeyType'];
    placeholderTextColor?: string;
    style?: StyleProp<ViewStyle>;
    styleInput?: StyleProp<ViewStyle>;
    styleTextInput?: StyleProp<TextStyle>;
    labelTextStyle?: StyleProp<TextStyle>;
    errorTextStyle?: StyleProp<TextStyle>;
}

const FormInput: React.FC<FormInputProps & TextInputProps> = ({
    name,
    control,
    error,
    placeholder,
    label,
    editable = true,
    register,
    secure = false,
    leftComponent,
    rightComponent,
    onFocus,
    returnKeyType,
    placeholderTextColor,
    style,
    styleInput,
    styleTextInput,
    labelTextStyle,
    errorTextStyle,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const refInput = useRef(null);
    const styles = myStyles;

    const renderBorderColor = () => {
        if (error) {
            return 'red';
        } else if (isFocused) {
            return 'blue';
        } else {
            return 'black';
        }
    };

    const borderStyle = {
        borderColor: renderBorderColor(),
        // borderWidth: 1,
    };

    const renderInput = ({ field }) => {
        const { onChange, onBlur, value } = field;
        return (
            <TextInput
                {...register(name)}
                style={[styles.textInput, styleTextInput]}
                placeholderTextColor={placeholderTextColor}
                placeholder={placeholder}
                onBlur={(e) => {
                    onBlur(e);
                }}
                onChangeText={(e) => {
                    onChange(e);
                }}
                onFocus={() => {
                    setIsFocused(refInput.current?.isFocused());
                    if (onFocus) {
                        onFocus();
                    }
                }}
                returnKeyType={returnKeyType}
                value={value}
                editable={editable}
                autoCapitalize={'none'}
                importantForAutofill="no"
                autoComplete="off"
                secureTextEntry={secure}
                {...rest}
            />
        );
    };

    return (
        <View style={style}>
            {label && <Text style={[styles.lableText, labelTextStyle]}>{label}</Text>}
            <View style={[styles.inputContainer, borderStyle, styleInput]}>
                {!!leftComponent && <>{leftComponent}</>}
                <Controller control={control} render={renderInput} name={name} />
                {!!rightComponent && <>{rightComponent}</>}
            </View>
            {error && error?.message && <Text style={[styles.errorText, errorTextStyle]}>{error.message}</Text>}
        </View>
    );
};

export default FormInput;

const myStyles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: scale(4),
    },
    input: {
        height: 40,
        flex: 1,
    },
    rightComponent: {
        width: 40,
        backgroundColor: 'gray',
    },
    textInput: {
        flex: 1,
        height: 44,
        fontSize: 14,
        justifyContent: 'center',
    },
    lableText: {},
    errorText: {},
});
