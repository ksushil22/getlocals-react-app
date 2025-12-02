import { createSlice } from "@reduxjs/toolkit";

const initialState = {}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { username, name, access, refresh } = action.payload;

            sessionStorage.setItem("username", username);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("access", access);
            sessionStorage.setItem("refresh", refresh);
        },
        logOut: (state, action) => {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("access");
            sessionStorage.removeItem("refresh");
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => sessionStorage.getItem("username");
