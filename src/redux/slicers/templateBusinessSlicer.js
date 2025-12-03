import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businessId: null
};

const templateBusiness = createSlice({
    name: "templateBusiness",
    initialState,
    reducers: {
        setCurrentTemplateBusiness: (state, action) => {
            state.businessId = action.payload.id;
            if (typeof window !== 'undefined') {
                localStorage.setItem("businessId", action.payload.id);
            }
        },
        removeBusiness: (state) => {
            state.businessId = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem("businessId");
            }
        },
    },
});

export const { setCurrentTemplateBusiness, removeBusiness } = templateBusiness.actions;

export default templateBusiness.reducer;
