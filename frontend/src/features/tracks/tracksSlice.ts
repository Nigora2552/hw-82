import type {ITracks} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {getAllTracks} from "./tracksThunk.ts";

interface TrackState {
    tracks: ITracks[],
    loading: boolean,
}

const initialState: TrackState ={
    tracks: [],
    loading: false,
}

export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getAllTracks.pending, (state) =>  {
            state.loading = true;
        }) ;
        builder.addCase(getAllTracks.fulfilled, (state, action) =>  {
            state.loading = false;
            state.tracks = action.payload;
        });
        builder.addCase(getAllTracks.rejected, (state) =>  {
            state.loading = false;
        })
    }
});

export const trackReducer = trackSlice.reducer;