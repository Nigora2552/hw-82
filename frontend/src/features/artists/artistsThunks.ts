import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {ArtistMutation, IArtist} from "../../types";
import {toast} from "react-toastify";
import type {AppDispatch} from "../../app/store.ts";

export const getArtists = createAsyncThunk<IArtist[], void>('artist/getArtists',
    async () => {
        const response = await axiosApi.get<IArtist[]>('/artists');
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
    });

export const deleteArtist = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
    'artist/deleteArtist',
    async (id,thunkAPI) => {
        await axiosApi.delete<{message: string}>(`/artists/${id}`);
        toast.success('Artist deleted successfully');
        thunkAPI.dispatch(getArtists());
    }
)