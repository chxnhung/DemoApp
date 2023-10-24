import React from 'react';
import { StyleSheet, View } from 'react-native';

import RadioButton from './RadioButton';
import { RadioGroupProps } from './types';

const RadioGroup = (props: RadioGroupProps) => {
    const { containerStyle, layout = 'column', onPress, radioButtons, selectedId, testID, color } = props;
    function handlePress(id: string | number) {
        if (id !== selectedId && onPress) {
            onPress(id);
        }
    }

    return (
        <View style={[styles.container, { flexDirection: layout }, containerStyle]} testID={testID}>
            {radioButtons.map((button) => (
                <RadioButton
                    {...button}
                    key={button.id}
                    selected={button.id === selectedId}
                    onPress={() => handlePress(button.id)}
                    color={color}
                />
            ))}
        </View>
    );
};

export default RadioGroup;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});
