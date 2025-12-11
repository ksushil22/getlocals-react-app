import { createSlice } from "@reduxjs/toolkit";

// Initialize businessId from sessionStorage if available (for page refreshes)
const getInitialBusinessId = () => {
    if (typeof window !== 'undefined') {
        const storedBusinessId = sessionStorage.getItem("businessId");
        return storedBusinessId || null;
    }
    return null;
};

const initialState = {
    businessId: getInitialBusinessId()
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
