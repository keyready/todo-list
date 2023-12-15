import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api';
import { UIReducer } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';
import { TodoReducer } from 'entities/Todo';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export function CreateReduxStore(
    initialState?: StateSchema,
    lazyReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...lazyReducers,
        ui: UIReducer,
        todo: TodoReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer:
            // @ts-ignore
            reducerManager.reduce as ReducersMapObject<StateSchema>,
        devTools: IS_DEV,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof CreateReduxStore>['dispatch'];
