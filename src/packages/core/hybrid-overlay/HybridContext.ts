import { createContext } from 'react';

import { IHybridContextProps } from './types';

const HybridContext = createContext<IHybridContextProps>({
    colorMode: {
        mode: 'light',
        toggleColorMode: () => {},
        setColorMode: () => {},
    },
});

export default HybridContext;
