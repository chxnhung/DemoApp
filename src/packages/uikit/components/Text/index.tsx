import React, { memo } from 'react';
import { Text as OriginalText, TextProps } from 'react-native';

const Text = (props: TextProps) => {
    const { style } = props;

    return <OriginalText {...props} style={[style]} />;
};

export default memo(Text);
