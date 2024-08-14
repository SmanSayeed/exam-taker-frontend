import authSliceReducer from "@/features/auth/authSlice";
import questionSliceReducer from "@/features/questions/questionSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        question: questionSliceReducer,
    },
    // devTools: import.meta.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});
