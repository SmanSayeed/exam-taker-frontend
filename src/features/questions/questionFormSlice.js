import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    description: '',
    mcq_options: [
        // Example structure for mcq_options
        // { mcq_question_text: '', is_correct: false, description: '' }
    ]
};

const questionFormSlice = createSlice({
    name: 'questionForm',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value, index } = action.payload;
            if(field==="description"){
                state[field] = value
            }
            if (field === "title") {
                state[field] = value;
            }  else if (field.startsWith("mcq_options")) { 
                // Update specific field within mcq_options at the specified index
                if (!state.mcq_options[index]) {
                    state.mcq_options[index] = { mcq_question_text: '', is_correct: false, description: '' };
                }
                const optionField = field.replace("mcq_options.", ""); // e.g., mcq_question_text, is_correct, description
                state.mcq_options[index][optionField] = value;
            }
        },
        addMcqOption: (state) => {
            state.mcq_options.push({ mcq_question_text: '', is_correct: false, description: '' });
        },
        removeMcqOption: (state, action) => {
            const index = action.payload;
            state.mcq_options.splice(index, 1);
        }
    },
});

export const { updateField, addMcqOption, removeMcqOption } = questionFormSlice.actions;
export default questionFormSlice.reducer;
