import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    package: '',
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    pass_mark: '',
    full_mark: '',
    is_active: false,
};

const modelTestFormSlice = createSlice({
    name: 'modelTestForm',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;  
        },
    },
});

export const { updateField } = modelTestFormSlice.actions;
export default modelTestFormSlice.reducer;
