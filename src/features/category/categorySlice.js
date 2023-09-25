import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: [],
    reducers: {
        setCategory: (_state, action) => {
            return action.payload;
        },
        addCategory: (state, action) => {
            return [...state, action.payload];
        },
        updateCategory: (state, action) => {
            const index = state.findIndex(
                (value) => value === action.payload.old
            );
            const newState = [...state];
            newState[index] = action.payload.new;
            return newState;
        },
    },
});

export const { setCategory, addCategory, updateCategory } =
    categorySlice.actions;
export default categorySlice.reducer;
