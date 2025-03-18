import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface props {
    status: boolean,
    userData: {
        name: string,
        _id: string,
        email: string
    } | null
}

const initialState: props = {
    status: false,
    userData: null,

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
    }
})


export const { login, logout } = authslice.actions;

export default authslice.reducer;