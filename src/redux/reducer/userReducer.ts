import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

const initialState = {
    user: "",
    loading:true,
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action:PayloadAction<User>) => {
            state.loading = false;
            state.user= action.payload
        },
        userNotExist: (state) => {
            state.loading = false;
            state.user= null
        }
    }
})

export const {userExist, userNotExist} = userReducer.actions
