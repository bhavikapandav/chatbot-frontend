import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers(slices)/userDetails.reducer";


export const store = configureStore({
    reducer: {
        userDetails: userReducer,
    },
})