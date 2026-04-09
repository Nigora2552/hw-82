import type {ITrackHistory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {addTracksHistory} from "./trackHistoryThunk.ts";

interface trackHistoryState {
    trackHistory: ITrackHistory [] | null;
    loading: boolean;
}

const initialState: trackHistoryState = {
    trackHistory: null,
    loading: false,
}

export const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(addTracksHistory.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(addTracksHistory.fulfilled,(state, {payload: tracks}) => {
            state.loading = false;
            state.trackHistory= tracks;
        });
        builder.addCase(addTracksHistory.rejected,(state) => {
            state.loading = false;
        });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer