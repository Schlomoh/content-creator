import {combineReducers, configureStore} from "@reduxjs/toolkit";

import userApi from "./api/userApi.ts";
import defaultSlice from "./slices/defaultSlice.ts";

export const store = configureStore({
    reducer: combineReducers({
        [userApi.reducerPath]: userApi.reducer,
        [defaultSlice.name]: defaultSlice.reducer
    }),

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
