import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  description: null,
  duration_days: null,
  price: null,
  discount: null,
  discount_type: "amount",
  is_active: true,
  img: null,
};

const packageFormSlice = createSlice({
  name: "packageForm",
  initialState,
  reducers: {
    updatePkgField: (state, action) => {
        const { field, value } = action.payload;
        state[field] = value;  
    },
  },
});

export const { updatePkgField } = packageFormSlice.actions;
export default packageFormSlice.reducer;