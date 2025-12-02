import { configureStore } from "@reduxjs/toolkit";
import { rootAPI } from "./services/rootAPI.js";
import auth from "./slicers/authSlicer";
import business from "./slicers/businessSlicer";
import templateBusiness from "./slicers/templateBusinessSlicer";


export const store = configureStore({
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

export default store;
