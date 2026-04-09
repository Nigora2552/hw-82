import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/artists/artistsSlice.ts";
import {albumReducer} from "../features/albums/albumsSlice.ts";
import {trackReducer} from "../features/tracks/tracksSlice.ts";
import {userReducer} from "../features/users/usersSlice.ts";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import {trackHistoryReducer} from "../features/trackHistory/trackHistorySlice.ts";

const userPersistConfig = {
    key: 'store:user',
    storage: {
        getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
        setItem: (key: string, value: string) => {
            localStorage.setItem(key, value);
            return Promise.resolve();
        },
        removeItem: (key: string) => {
            localStorage.removeItem(key);
            return Promise.resolve();
        },
    },
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    users: persistReducer(userPersistConfig, userReducer) ,
    artists: artistsReducer,
    albums: albumReducer,
    tracks: trackReducer,
    trackHistory: trackHistoryReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export  const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;