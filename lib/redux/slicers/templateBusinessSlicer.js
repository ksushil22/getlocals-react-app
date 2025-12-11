import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businessId: null,
    templateId: null
};

const templateBusiness = createSlice({
    name: "templateBusiness",
    initialState,
    reducers: {
        setCurrentTemplateBusiness: (state, action) => {
            state.businessId = action.payload.id;
            if (action.payload.templateId) {
                state.templateId = action.payload.templateId;
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem("businessId", action.payload.id);
                if (action.payload.templateId) {
                    localStorage.setItem("templateId", action.payload.templateId);
                }
            }
        },
        setTemplateId: (state, action) => {
            state.templateId = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem("templateId", action.payload);
            }
        },
        removeBusiness: (state) => {
            state.businessId = null;
            state.templateId = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem("businessId");
                localStorage.removeItem("templateId");
            }
        },
    },
});

export const { setCurrentTemplateBusiness, setTemplateId, removeBusiness } = templateBusiness.actions;

export default templateBusiness.reducer;
