import { isEqual } from 'lodash';
import React, { ReactElement, useRef, useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';

interface GlobalInputProps {
    iconLeft?: ReactElement<ViewProps>;
    iconRight?: ReactElement<ViewProps>;
    onPressRight?: () => void;
    style?: StyleProp<ViewStyle>;
    styleInput?: StyleProp<ViewStyle>;
    secureTextEntry?: boolean;
    value?: string;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onChangeText?: (txt: string) => void;
    isFocused?: boolean;
    returnKeyType?: TextInputProps['returnKeyType'];
    editable?: boolean;
    styleTextInput?: StyleProp<TextStyle>;
    keyboardType?: TextInputProps['keyboardType'];
    numberOfLines?: number;
    multiline?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    onSubmitEditing?: () => void;
    errorMessage?: string;
    textContentType?: TextInputProps['textContentType'];
    matchMessage?: string;
    placeholderTextColor?: string;
    isFixedErrMsg?: boolean; // fix view to show error msg
}

const GlobalInput = (props: GlobalInputProps) => {
    const styles = myStyles();
    const {
        iconLeft,
        iconRight,
        onPressRight,
        styleInput,
        secureTextEntry,
        value,
        placeholder,
        onFocus,
        onBlur,
        onChangeText,
        errorMessage,
        returnKeyType,
        editable,
        styleTextInput,
        keyboardType,
        numberOfLines,
        multiline,
        autoFocus,
        onSubmitEditing,
        placeholderTextColor = 'gray',
        isFixedErrMsg = false,
    } = props;
    const [isFocused, setIsFocused] = useState(false);

    const refInput = useRef(null);

    const handleChangeTextInput = (text: string) => {
        onChangeText?.(text);
    };

    const renderBorderColor = () => {
        if (errorMessage) {
            return 'red';
        } else if (isFocused) {
            return 'blue';
        } else {
            return 'black';
        }
    };

    const borderStyle = {
        borderColor: renderBorderColor(),
        borderWidth: 1,
    };

    const disableTextInput = editable === false ? { backgroundColor: 'black' } : null;

    return (
        <View style={props.style}>
            <View style={[styles.container, borderStyle, disableTextInput, styleInput]}>
                {iconLeft}
                <TextInput
                    // textContentType={textContentType && textContentType}
                    ref={refInput}
                    style={[styles.textInput, styleTextInput]}
                    value={value}
                    onChangeText={handleChangeTextInput}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor}
                    onFocus={() => {
                        setIsFocused(refInput.current?.isFocused());
                        if (onFocus) {
                            onFocus();
                        }
                    }}
                    onBlur={() => {
                        setIsFocused(refInput.current?.isFocused());
                        if (onBlur) {
                            onBlur();
                        }
                    }}
                    returnKeyType={returnKeyType}
                    editable={editable}
                    keyboardType={keyboardType}
                    numberOfLines={numberOfLines}
                    multiline={multiline}
                    autoFocus={autoFocus}
                    maxLength={props.maxLength}
                    onSubmitEditing={onSubmitEditing && onSubmitEditing}
                />

                {iconRight ? (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.icon}
                        onPress={onPressRight}
                        disabled={!onPressRight}>
                        {iconRight}
                    </TouchableOpacity>
                ) : null}
            </View>

            {isFixedErrMsg ? (
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textError}>{errorMessage || ''}</Text>
                </View>
            ) : (
                <>
                    {!errorMessage ? null : (
                        <View style={styles.viewError}>
                            <Text style={styles.textError}>{errorMessage}</Text>
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

export default React.memo(GlobalInput, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});

const myStyles = () =>
    StyleSheet.create({
        container: {
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            borderWidth: 1,
        },
        textInput: {
            flex: 1,
            height: 44,
            fontSize: 14,
            alignItems: 'center',
        },
        icon: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        viewError: {
            flexDirection: 'row',
            paddingTop: 7,
            paddingBottom: 3,
        },
        textError: {
            fontSize: 12,
            color: 'red',
        },
    });
