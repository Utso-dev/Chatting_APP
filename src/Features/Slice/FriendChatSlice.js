import { createSlice } from "@reduxjs/toolkit";


export const friendChatSlice = createSlice({
    name:"chate",
    initialState:{
        Active:localStorage.getItem("activesfriend") ? JSON.parse(localStorage.getItem("users")) :  JSON.parse(localStorage.getItem("users")),
    },
    reducers:{
        activeChat:(state , action)=>{
            state.Active = action.payload 
        },
    },
})

export const {activeChat} = friendChatSlice.actions;

export default friendChatSlice.reducer;