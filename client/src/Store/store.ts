import { configureStore } from "@reduxjs/toolkit";
import authReducers from './AuthSlice'

const Store =  configureStore({
    reducer : {
      auth :  authReducers
    }
})


export type RootState = ReturnType<typeof Store.getState>;

export default Store ;