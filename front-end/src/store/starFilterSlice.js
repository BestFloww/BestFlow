import { createSlice } from '@reduxjs/toolkit';

export const starFilterSlice = createSlice({
    name: 'starFilter',
    initialState: {
        starFilterState: false
    },

    reducers: {
        toggleStarFilter: (state) => {
            state.starFilterState = !state.starFilterState;
        }
    }
})

export const { toggleStarFilter } = starFilterSlice.actions;

export default starFilterSlice.reducer;