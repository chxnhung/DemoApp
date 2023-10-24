/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from 'react';
import { FlatList, FlatListProps, RefreshControlProps } from 'react-native';

interface IProps extends FlatListProps<any> {
    onRefresh?: () => void;
    onLoadMore?: () => void;
    keyExtractor?: (item: any, index: number) => string;
    refreshControl?: React.ReactElement<RefreshControlProps>;
    listEmpty?: React.ComponentType<any> | React.ReactElement;
}

const ListView: React.FC<IProps> = ({
    data,
    renderItem,
    onLoadMore,
    keyExtractor,
    refreshControl,
    listEmpty,
    ...props
}) => {
    return (
        <FlatList
            {...props}
            data={data}
            keyExtractor={keyExtractor ? keyExtractor : (e, i) => i.toString()}
            keyboardShouldPersistTaps="handled"
            renderItem={renderItem}
            refreshControl={refreshControl}
            ListEmptyComponent={listEmpty}
            onEndReachedThreshold={0.5}
            onEndReached={() => onLoadMore && onLoadMore()}
        />
    );
};

export default memo(ListView);
