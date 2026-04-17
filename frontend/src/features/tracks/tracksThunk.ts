import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {ITracks, TrackMutation} from "../../types";
import type {AppDispatch} from "../../app/store.ts";


export const getAllTracks = createAsyncThunk<ITracks[],void>(
    'track/getAllTracks',
    async () => {
        const response = await axiosApi.get<ITracks[]>('/tracks');
        return response.data || [];
    });


export const getAllTracksByQuery = createAsyncThunk<ITracks[], string | null>(
    'track/getAllTracksByQuery',
    async (query) => {
            let url = '/tracks';
            if(query) url += '?album=' + query
            const response = await axiosApi.get<ITracks[]>(url);
            return response.data || [];
    });

export const createTrack = createAsyncThunk<void, TrackMutation>(
    'track/createTrack',
    async (TrackMutation) => {
        const dataToSend = {
            ...TrackMutation,
            trackNumber: Number(TrackMutation.trackNumber)
        };
        await axiosApi.post('/tracks',dataToSend )
    }
);

export  const deleteTrack = createAsyncThunk<void, string,{dispatch: AppDispatch}>(
    'track/deleteTrack',
    async (id, thunkAPI) =>{
        await axiosApi.delete(`/tracks/${id}`);
        await  thunkAPI.dispatch(getAllTracks());
    }
)