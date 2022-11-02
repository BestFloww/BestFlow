import { configureStore } from '@reduxjs/toolkit';
import switchPageReducer from './store/switchPageSlice.js';
import transcriptUploadedSliceReducer from './store/transcriptUploadedSlice.js';

export default configureStore({
  reducer: {
    switchPage: switchPageReducer,
    isTranscriptUploaded: transcriptUploadedSliceReducer
  }
});