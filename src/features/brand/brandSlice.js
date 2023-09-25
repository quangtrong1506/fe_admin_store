import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
    name: 'brand',
    initialState: [],
    reducers: {
        setBrand: (_state, action) => {
            return action.payload;
        },
        addBrand: (state, action) => {
            return [...state, action.payload];
        },
        updateBrand: (state, action) => {
            const index = state.findIndex(
                (value) => value === action.payload.old
            );
            const newState = [...state];
            newState[index] = action.payload.new;
            return newState;
        },
    },
});

export const { setBrand, addBrand, updateBrand } = brandSlice.actions;
export default brandSlice.reducer;
