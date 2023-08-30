import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
    name: 'navigation',
    initialState: [],
    reducers: {
        setNavigationValue: (_state, action) => {
            return action.payload;
        },
    },
});

export const { setNavigationValue } = navigationSlice.actions;
export default navigationSlice.reducer;
