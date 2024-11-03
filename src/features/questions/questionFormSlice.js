import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    mcq_options: []
};

const questionFormSlice = createSlice({
    name: 'questionForm',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;  
        },
    },
});

export const { updateField } = questionFormSlice.actions;
export default questionFormSlice.reducer;
