import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type RadioButtonProps = {
    borderColor?: string;
    borderSize?: number;
    color?: string;
    containerStyle?: StyleProp<ViewStyle>;
    description?: string;
    descriptionStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    id: string | number;
    key?: string | number;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    layout?: 'row' | 'column';
    onPress?: (id: string | number) => void;
    selected?: boolean;
    size?: number;
    testID?: string;
    value?: string | number;
    bounceEffectIn?: number;
    bounceEffectOut?: number;
    bounceVelocityIn?: number;
    bounceVelocityOut?: number;
    bouncinessIn?: number;
    bouncinessOut?: number;
    disableBounce?: boolean;
};

export type RadioGroupProps = {
    containerStyle?: StyleProp<ViewStyle>;
    layout?: 'row' | 'column';
    onPress?: (selectedId: string | number) => void;
    radioButtons: RadioButtonProps[];
    selectedId?: string | number;
    testID?: string;
    color?: string;
};
