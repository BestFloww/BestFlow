import { configureStore } from '@reduxjs/toolkit';
import switchPageReducer from './store/switchPageSlice.js';
import transcriptUploadReducer from './store/transcriptUploadSlice.js';
import analyzeTranscriptReducer from './store/analyzeTranscriptSlice.js';
import starFilterReducer from './store/starFilterSlice.js';
import flagFilterReducer from './store/flagFilterSlice.js';

export default configureStore({
  reducer: {
    switchPage: switchPageReducer,
    transcriptUpload: transcriptUploadReducer,
    analyzeTranscript: analyzeTranscriptReducer,
    starFilter: starFilterReducer,
    flagFilter: flagFilterReducer
  }
});