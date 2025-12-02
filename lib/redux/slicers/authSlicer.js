import { createSlice } from "@reduxjs/toolkit";
import { getSessionStorage, setSessionStorage, removeSessionStorage } from "../../utils/storage.js";

const initialState = {}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { username, name, access, refresh } = action.payload;

            // Safe sessionStorage access - only on client side
            setSessionStorage("username", username);
            setSessionStorage("name", name);
            setSessionStorage("access", access);
            setSessionStorage("refresh", refresh);
        },
        logOut: (state, action) => {
            // Safe sessionStorage access - only on client side
            removeSessionStorage("username");
            removeSessionStorage("name");
            removeSessionStorage("access");
            removeSessionStorage("refresh");
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => {
    // Safe sessionStorage access - only on client side
    return getSessionStorage("username");
};
