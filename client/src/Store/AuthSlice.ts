import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface props {
    status: boolean,
    userData: {
        name: string,
        _id: string,
        email: string
    } | null,
    loading : {
        Loading : boolean,
    }
}

const initialState: props = {
    status: false,
    userData: null,
    loading  : {
        Loading  : false,
    }

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
        set_loading  :(state,action : PayloadAction<props["loading"]>)=>{
            state.loading.Loading   = action.payload.Loading
        }
    }
})


export const { login, logout , set_loading } = authslice.actions;

export default authslice.reducer;