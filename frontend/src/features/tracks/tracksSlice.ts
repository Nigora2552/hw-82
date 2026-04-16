import type {ITracks} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createTrack, deleteTrack, getAllTracks, getAllTracksByQuery} from "./tracksThunk.ts";

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
        });

        builder.addCase(getAllTracksByQuery.pending, (state) =>  {
            state.loading = true;
        }) ;
        builder.addCase(getAllTracksByQuery.fulfilled, (state, action) =>  {
            state.loading = false;
            state.tracks = action.payload;
        });
        builder.addCase(getAllTracksByQuery.rejected, (state) =>  {
            state.loading = false;
        });

        builder.addCase(createTrack.pending, (state) =>  {
            state.loading = true;
        }) ;
        builder.addCase(createTrack.fulfilled, (state) =>  {
            state.loading = false;
        });
        builder.addCase(createTrack.rejected, (state) =>  {
            state.loading = false;
        });

        builder.addCase(deleteTrack.pending, (state) =>  {
            state.loading = true;
        }) ;
        builder.addCase(deleteTrack.fulfilled, (state) =>  {
            state.loading = false;
        });
        builder.addCase(deleteTrack.rejected, (state) =>  {
            state.loading = false;
        });
    }
});

export const trackReducer = trackSlice.reducer;