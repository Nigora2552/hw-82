import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {AlbumMutation, IAlbums} from "../../types";


export const getAllAlbums = createAsyncThunk<IAlbums[], void>('album/getAllAlbums',
    async () => {
        try {
            const response = await axiosApi.get<IAlbums[]>('/albums');
            return response.data || [];
        } catch (error) {
            console.log(error)
            return [];
        }
    });


export const getAlbumsByQuery = createAsyncThunk<IAlbums[], string>('album/getAlbumsByQuery',
    async (query) => {
        try {
            let url = '/albums'
            if(query) url += '?artist=' + query
            const response = await axiosApi.get<IAlbums[]>(url);
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
                if(key === 'year'){
                    formData.append(key, Number(value).toString());
                }else{
                    formData.append(key, String(value));
                }
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