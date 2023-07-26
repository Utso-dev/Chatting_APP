

import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name : "logins",
    initialState:{
        logged : localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : localStorage.getItem("users"),
    },
    reducers:{
        Loginusers: (state, action)=>{
            state.logged = action.payload;
        },
    },
});

export const {Loginusers} = loginSlice.actions

export default loginSlice.reducer