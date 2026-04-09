import type {IAlbums} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createAlbum, deleteAlbum, getAllAlbums} from "./albumsThunk.ts";

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


        builder.addCase(createAlbum.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAlbum.fulfilled, (state, {payload: album}) => {
            state.loading = false;
            state.albums.push(album);
        });
        builder.addCase(createAlbum.rejected, (state) => {
            state.loading = false;
        });


        builder.addCase(deleteAlbum.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAlbum.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteAlbum.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const albumReducer = albumSlice.reducer;