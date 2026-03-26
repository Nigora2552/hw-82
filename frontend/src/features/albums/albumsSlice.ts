import type {IAlbums} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {getAllAlbums} from "./albumsThunk.ts";

interface AlbumsState {
    albums: IAlbums[];
    loading: boolean;
}

const initialState: AlbumsState = {
    albums: [],
    loading: false,
}

export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllAlbums.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllAlbums.fulfilled, (state, {payload: album}) => {
            state.loading = false;
            state.albums = album;
        });
        builder.addCase(getAllAlbums.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const albumReducer = albumSlice.reducer;