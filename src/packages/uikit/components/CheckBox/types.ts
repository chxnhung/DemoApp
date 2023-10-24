/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    TextStyle,
    TouchableWithoutFeedbackProps,
    ViewStyle,
} from 'react-native';

type BaseTouchableProps = Pick<TouchableWithoutFeedbackProps, Exclude<keyof TouchableWithoutFeedbackProps, 'onPress'>>;

export interface ICheckboxProps extends BaseTouchableProps {
    size?: number;
    text?: string;
    fillColor?: string;
    isChecked?: boolean;
    unfillColor?: string;
    disableText?: boolean;
    bounceEffectNumber?: number;
    bounceFriction?: number;
    useNativeDriver?: boolean;
    disableBuiltInState?: boolean;
    ImageComponent?: any;
    TouchableComponent?: any;
    bounceEffectIn?: number;
    bounceEffectOut?: number;
    bounceVelocityIn?: number;
    bounceVelocityOut?: number;
    bouncinessIn?: number;
    bouncinessOut?: number;
    iconComponent?: React.ReactNode;
    textComponent?: React.ReactNode;
    iconStyle?: StyleProp<ViewStyle>;
    innerIconStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconImageStyle?: StyleProp<ImageStyle>;
    textContainerStyle?: StyleProp<ViewStyle>;
    checkIconImageSource?: ImageSourcePropType;
    onPress?: (checked: boolean) => void;
    disableBounce?: boolean;
    radius?: number;
}
