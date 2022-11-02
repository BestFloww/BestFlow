import { configureStore } from '@reduxjs/toolkit';
import switchPageReducer from './store/switchPageSlice.js';
import transcriptUploadedSliceReducer from './store/transcriptUploadSlice.js';

export default configureStore({
  reducer: {
    switchPage: switchPageReducer,
    changeUploaded: transcriptUploadedSliceReducer
  }
});