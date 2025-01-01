import authSliceReducer from "@/features/auth/authSlice";
import modelTestFormReducer from "@/features/modelTests/modelTestFormSlice";
import packageFormSliceReducer from "@/features/packages/packageFormSlice";
import questionFormReducer from "@/features/questions/questionFormSlice";
import selectedCategoriesReducer from "@/features/questions/selectedCategoriesSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    selectedCategories: selectedCategoriesReducer,
    questionForm: questionFormReducer,
    packageForm: packageFormSliceReducer,
    modelTestForm: modelTestFormReducer,
  },
  // devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});