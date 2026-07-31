import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: null
}

const userSlice = createSlice({
    name: "userDetails",
    initialState,

    reducers: {
        storeUserAuthDetails: (state, action) => {
            state.userDetails = state.userDetails 
                ? { ...state.userDetails, ...action.payload }
                : action.payload;
        },
        clearUserDetails: (state) => {
            state.userDetails = null;
        },
    }
})

export const { storeUserAuthDetails, clearUserDetails } = userSlice.actions;

// actions means function 

export default userSlice.reducer;
