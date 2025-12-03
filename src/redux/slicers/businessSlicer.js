import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businessId: null
};

const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        setCurrentBusiness: (state, action) => {
            state.businessId = action.payload.id;
            if (typeof window !== 'undefined') {
                sessionStorage.setItem("businessId", action.payload.id);
            }
        },
        removeBusiness: (state) => {
            state.businessId = null;
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem("businessId");
            }
        },
    },
});

export const { setCurrentBusiness, removeBusiness } = businessSlice.actions;

export default businessSlice.reducer;
