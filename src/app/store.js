import authSliceReducer from "@/features/auth/authSlice";
import modelTestFormReducer from "@/features/modelTests/modelTestFormSlice";
import packageSliceReducer from "@/features/packages/packageSlice";
import questionFormReducer from "@/features/questions/questionFormSlice";
import questionSliceReducer from "@/features/questions/questionSlice";
import selectedCategoriesReducer from "@/features/questions/selectedCategoriesSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    question: questionSliceReducer,
    package: packageSliceReducer,
    selectedCategories: selectedCategoriesReducer,
    questionForm: questionFormReducer,
    modelTestForm: modelTestFormReducer
  },
  // devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});