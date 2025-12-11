import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { rootAPI } from "./services/rootAPI.js";
import auth from "./slicers/authSlicer";
import business from "./slicers/businessSlicer";
import templateBusiness from "./slicers/templateBusinessSlicer";

// Make store function for next-redux-wrapper
const makeStore = () => {
    return configureStore({
        reducer: {
            [rootAPI.reducerPath]: rootAPI.reducer,
            auth,
            business,
            templateBusiness
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                rootAPI.middleware,
                (store) => (next) => (action) => {
                    return next(action);
                }
            ),
        devTools: process.env.NODE_ENV !== "production",
    });
};

// Export the wrapper
export const wrapper = createWrapper(makeStore);
export const initializeStore = makeStore;
