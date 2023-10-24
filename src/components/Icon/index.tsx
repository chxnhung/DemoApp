import { isEqual } from 'lodash';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Svgs from 'assets/svgs';
import { SvgProps } from 'react-native-svg';

interface IconProps {
    name: string;
    size?: number;
    containerStyle?: StyleProp<ViewStyle>;
}
const Icon = (props: IconProps & SvgProps) => {
    const { name, size, containerStyle, ...rest } = props;
    const IconSvg = Svgs[`Ic${name}`];
    return (
        <View style={containerStyle}>
            <IconSvg height={size} width={size} {...rest} />
        </View>
    );
};

export default React.memo(Icon, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});
