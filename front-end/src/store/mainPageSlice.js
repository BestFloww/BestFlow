import { createSlice } from '@reduxjs/toolkit';

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: {
    showTranscriptUploadModal: false,
  },
  reducers: {
    toggleTranscriptUploadModal: state => {
      state.showTranscriptUploadModal = !state.showTranscriptUploadModal;
      console.log("Set showTranscriptUploadModal to " + state.showTranscriptUploadModal);
    },
  }
})

export const { toggleTranscriptUploadModal } = mainPageSlice.actions;

export const showTranscriptUploadModal = (state) => state.showTranscriptUploadModal;

export default mainPageSlice.reducer;