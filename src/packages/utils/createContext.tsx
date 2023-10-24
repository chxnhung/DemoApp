import React from 'react';

function createContext<ContextValueType extends object>(rootComponentName: string) {
    const Context = React.createContext<ContextValueType>(null);

    function Provider(props: ContextValueType & { children: React.ReactNode }) {
        const { children, ...providerProps } = props;
        const value = React.useMemo(() => providerProps, Object.values(providerProps)) as ContextValueType;
        return <Context.Provider value={value}>{children}</Context.Provider>;
    }

    function useContext(consumerName: string) {
        const context = React.useContext(Context);
        if (context === null) {
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        return context;
    }
    Provider.displayName = rootComponentName + 'Provider';
    return [Provider, useContext] as const;
}

export { createContext };
