import colors from './colors';
import opacity from './opacity';
import radii from './radius';
import shadows from './shadows';
import typography from './typography';

const theme = {
    colors,
    radii,
    shadows,
    opacity,
    ...typography,
};

export const themePropertyMap = {
    borderRadius: 'radii',
    color: 'colors',
    border: 'borders',
    shadow: 'shadows',
    letterSpacing: 'letterSpacings',
    lineHeight: 'lineHeights',
    fontFamily: 'fonts',
    fontSize: 'fontSizes',
    fontWeight: 'fontWeights',
};

export default theme;
