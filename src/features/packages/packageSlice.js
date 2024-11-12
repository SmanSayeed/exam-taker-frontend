import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  description: null,
  duration_days: null,
  is_active: null,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    savePackage: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.duration_days = action.payload.duration_days;
      state.is_active = action.payload.is_active;
    },
    clearPackage: (state) => {
      state.id = null;
      state.name = null;
      state.description = null;
      state.duration_days = null;
      state.is_active = null;
    },
  },
});

export const { savePackage, clearPackage } = packageSlice.actions;
export default packageSlice.reducer;