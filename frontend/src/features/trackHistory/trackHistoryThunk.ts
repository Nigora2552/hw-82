import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {ITrackHistory, ITracks} from "../../types";

export const addTracksHistory = createAsyncThunk<ITrackHistory[], ITracks>(
    'trackHistory/getAllTracksHistory',
    async (track) => {
        const token = localStorage.getItem('token');
        const newHistory = {
            token: token,
            track: track,
        }
        const response = await axiosApi.post<ITrackHistory[]>('/track_history', newHistory);

        return response.data;
    }
)