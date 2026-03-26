import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {IAlbums} from "../../types";

export const getAllAlbums = createAsyncThunk<IAlbums[], string>('album/getAllAlbums',
    async ( id) => {
    try{
        const response = await axiosApi.get<IAlbums[]>(`/albums?artist=${id}`);
        return response.data || [];
    } catch (error){
        console.log(error)
        return [];
    }
    })