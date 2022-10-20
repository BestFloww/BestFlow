import { configureStore } from '@reduxjs/toolkit';
import switchPageReducer from './store/switchPageSlice.js';

export default configureStore({
  reducer: {
    switchPage: switchPageReducer
  }
});