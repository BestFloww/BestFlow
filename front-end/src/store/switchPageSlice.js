import { createSlice } from '@reduxjs/toolkit';

export const switchPageSlice = createSlice({
  name: 'switchPage',
  initialState: {
    page: "MainPage",
    newVisiter: true,
  },
  reducers: {
    openMainPage: state => {
      state.page = "MainPage";
    },
    openAnalysisPage: state => {
      state.page = "AnalysisPage";
      // Save that analysis page has been visited.
      state.newVisiter = false;
    }
  }
})

export const { openMainPage, openAnalysisPage } = switchPageSlice.actions;

export default switchPageSlice.reducer;