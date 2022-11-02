import { configureStore } from '@reduxjs/toolkit';
import switchPageReducer from './store/switchPageSlice.js';
import transcriptUploadReducer from './store/transcriptUploadSlice.js';

export default configureStore({
  reducer: {
    switchPage: switchPageReducer,
    transcriptUpload: transcriptUploadReducer
  }
});