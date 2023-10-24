import React, { memo, useState } from 'react';
import { Image, ImageStyle, ImageURISource, StyleProp } from 'react-native';

import Images from 'assets/images';
import { scale } from 'themes/scales';
interface ImageProps {
    source?: ImageURISource;
    imageStyles?: StyleProp<ImageStyle>;
    size?: number;
}

const ImageBase = (props: ImageProps) => {
    const { source, imageStyles, size } = props;
    const [isImageError, setIsImageError] = useState<boolean>(false);

    const handleError = () => setIsImageError(true);

    const imageNF = Images[`NOT_FOUND`];

    return (
        <Image
            source={isImageError ? imageNF : source}
            style={[
                {
                    width: scale(size || 60),
                    height: scale(size || 60),
                    borderRadius: scale(size ? size / 2 : 30),
                    resizeMode: 'contain',
                },
                imageStyles,
            ]}
            onError={handleError}
        />
    );
};

export default memo(ImageBase);
