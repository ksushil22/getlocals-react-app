'use client';

import { Provider } from 'react-redux';
import { useMemo } from 'react';
import { configureStore } from "@reduxjs/toolkit";
import { rootAPI } from "../../lib/redux/services/rootAPI.js";
import auth from "../../lib/redux/slicers/authSlicer";
import business from "../../lib/redux/slicers/businessSlicer";
import templateBusiness from "../../lib/redux/slicers/templateBusinessSlicer";

function makeStore() {
    return configureStore({
        reducer: {
            [rootAPI.reducerPath]: rootAPI.reducer,
            auth,
            business,
            templateBusiness
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(rootAPI.middleware),
        devTools: process.env.NODE_ENV !== "production",
    });
}

export default function ReduxProvider({ children }) {
    const store = useMemo(() => makeStore(), []);
    
    return <Provider store={store}>{children}</Provider>;
}
