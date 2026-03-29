import { configureStore } from "@reduxjs/toolkit";
import {artistsReducer} from "../features/artists/artistsSlice.ts";
import {albumReducer} from "../features/albums/albumsSlice.ts";
import {trackReducer} from "../features/tracks/tracksSlice.ts";
import {userReducer} from "../features/users/usersSlice.ts";

export  const store = configureStore({
    reducer:{
        users: userReducer,
        artists: artistsReducer,
        albums: albumReducer,
        tracks: trackReducer,

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;