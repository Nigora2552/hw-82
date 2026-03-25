import type {IArtist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createArtist, getArtists} from "./artistsThunks.ts";

interface ArtistsState {
    artists: IArtist[];
    loading: boolean;
}

const initialState: ArtistsState = {
    artists: [],
    loading: false,
}

export const artistsSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getArtists.pending, (state) => {
            state.loading = true
        });

        builder.addCase(getArtists.fulfilled, (state, {payload: artist}) => {
            state.loading = false
            state.artists = artist
        });
        builder.addCase(getArtists.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(createArtist.pending, (state) => {
            state.loading = true
        });

        builder.addCase(createArtist.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createArtist.rejected, (state) => {
            state.loading = false;
        });
    },
})


export const artistsReducer = artistsSlice.reducer;

