import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface props {
    status: boolean,
    userData: {
        _id: string,
        name: string,
        email: string,
        firebase_uid: string,
        city: string,
        country: string
    } | null,
    loading: boolean
}

const initialState: props = {
    status: false,
    userData: null,
    loading: false
}

const authslice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<props["userData"]>) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        set_loading: (state, action: PayloadAction<props["loading"]>) => {
            state.loading = action.payload
        }
    }
})


export const { login, logout, set_loading } = authslice.actions;

export default authslice.reducer;