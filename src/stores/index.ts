import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createLogger } from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root/rootSlice';
import userReducer from './user';

import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const reducers = combineReducers({
    user: userReducer,
    root: rootReducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(sagaMiddleware)
            .concat(logger),
});

sagaMiddleware.run(rootSaga);

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
