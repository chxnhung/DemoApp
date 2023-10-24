export type ColorMode = 'light' | 'dark' | null | undefined;
export interface StorageManager {
    get(init?: ColorMode): Promise<ColorMode | undefined>;
    set(value: ColorMode): void;
}

export interface ColorModeOptions {
    initialColorMode?: ColorMode;
    useSystemColorMode?: boolean;
}

export type IColorModeProviderProps = {
    children?: React.ReactNode;
    options: ColorModeOptions;
    colorModeManager?: StorageManager;
};

export interface IColorModeContextProps {
    mode: ColorMode;
    toggleColorMode: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setColorMode: (value: any) => void;
}
