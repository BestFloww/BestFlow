import { configureStore } from '@reduxjs/toolkit';
import switchPageReducer from './store/switchPageSlice.js';
import uploadedSliceReducer from './store/counters/uploadedSlice.js';

export default configureStore({
  reducer: {
    switchPage: switchPageReducer,
    isTranscriptUploaded: uploadedSliceReducer
  }
});