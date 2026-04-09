import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {ITracks, TrackMutation} from "../../types";

export const getAllTracks = createAsyncThunk<ITracks[], string>('track/getAllTracks',
    async (id) => {
        try{
            const response = await axiosApi.get<ITracks[]>(`/tracks?album=${id}`);
            return response.data || null;
        } catch (error){
            console.log(error)
            return [];
        }
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

export  const deleteTrack = createAsyncThunk<void, string>(
    'track/deleteTrack',
    async (id) =>{
        await axiosApi.delete(`/tracks/${id}`);
    }
)