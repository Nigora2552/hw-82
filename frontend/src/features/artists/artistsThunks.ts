import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {ArtistMutation, IArtist} from "../../types";

export const getArtists = createAsyncThunk<IArtist[], void>('artist/getArtists',
    async () => {
        const response = await axiosApi.get<IArtist[]>('/artist');
        return response.data || [];
    })
export const createArtist = createAsyncThunk<void, ArtistMutation>('artist/createArtist',
    async (ArtistMutation) => {
        const formData = new FormData();

        const keys = Object.keys(ArtistMutation) as (keyof ArtistMutation)[];
        keys.forEach(key => {
            const value = ArtistMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        })

        await axiosApi.post('/artist', formData)
    })