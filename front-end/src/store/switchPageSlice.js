import { createSlice } from '@reduxjs/toolkit';

export const switchPageSlice = createSlice({
  name: 'switchPage',
  initialState: {
    page: "MainPage",
  },
  reducers: {
    openMainPage: state => {
      state.page = "MainPage";
    },
    openAnalysisPage: state => {
      state.page = "AnalysisPage";
    },
  }
})

export const { openMainPage, openAnalysisPage } = switchPageSlice.actions;

export default switchPageSlice.reducer;