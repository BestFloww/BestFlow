import { createSlice } from '@reduxjs/toolkit';

export const flagFilterSlice = createSlice({
    name: 'flagFilter',
    initialState: {
        flagFilterState: false
    },

    reducers: {
        toggleFlagFilter: (state) => {
            state.flagFilterState = !state.flagFilterState;
        }
    }
})

export const { toggleFlagFilter } = flagFilterSlice.actions;

export default flagFilterSlice.reducer;