import type {User, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {register} from "./usersThunks.ts";

interface UsersState {
    user: User | null;
    registerLoading: boolean;
    registerError: ValidationError | null;
}

const initialState: UsersState = {
    user: null,
    registerLoading: false,
    registerError: null,
}

export  const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(register.pending, (state) =>{
            state.registerLoading = true;
            state.registerError = null;
        });
            builder.addCase(register.fulfilled, (state,{payload: user}) =>{
            state.registerLoading = false;
            state.user = user;
        });
            builder.addCase(register.rejected, (state, {payload: error}) =>{
            state.registerLoading = false;
            state.registerError = error || null;
        })
    }
});

export  const userReducer = usersSlice.reducer;