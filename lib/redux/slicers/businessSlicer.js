import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businessId: sessionStorage.getItem("businessId") || null
};

const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        setCurrentBusiness: (state, action) => {
            state.businessId = action.payload.id;

            sessionStorage.setItem("businessId", action.payload.id);
        },
        removeBusiness: (state) => {
            state.businessId = null;

            sessionStorage.removeItem("businessId");
        },
    },
});

export const { setCurrentBusiness, removeBusiness } = businessSlice.actions;

export default businessSlice.reducer;
