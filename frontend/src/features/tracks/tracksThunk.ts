import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type { ITracks} from "../../types";

export const getAllTracks = createAsyncThunk<ITracks[], string>('track/getAllTracks',
    async (id) => {
        try{
            const response = await axiosApi.get<ITracks[]>(`/tracks?album=${id}`);
            return response.data || null;
        } catch (error){
            console.log(error)
            return [];
        }
    })