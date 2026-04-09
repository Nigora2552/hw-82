import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {AlbumMutation, IAlbums} from "../../types";

export const getAllAlbums = createAsyncThunk<IAlbums[], string>('album/getAllAlbums',
    async (id) => {
        try {
            const response = await axiosApi.get<IAlbums[]>(`/albums?artist=${id}`);
            return response.data || [];
        } catch (error) {
            console.log(error)
            return [];
        }
    });

export const createAlbum = createAsyncThunk<IAlbums, AlbumMutation>(
    'album/createAlbum',
    async (AlbumMutation) => {
        const formData = new FormData();

        const keys = Object.keys(AlbumMutation) as (keyof AlbumMutation)[];
        keys.forEach(key => {
            const value = AlbumMutation[key];

            if (value !== null) {
                formData.append(key, String(value));
            }
        })

        const response = await axiosApi.post('/albums', formData)
        return response.data || null;
    });

export const deleteAlbum = createAsyncThunk<void, string>(
    'album/deleteAlbum',
    async (id) => {
        await axiosApi.delete(`/albums/${id}`)
    })