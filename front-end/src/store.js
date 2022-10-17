import { configureStore } from '@reduxjs/toolkit';
import switchPageReducer from './store/switchPageSlice.js';
import mainPageReducer from './store/mainPageSlice.js';

export default configureStore({
  reducer: {
    switchPage: switchPageReducer,
    mainPage: mainPageReducer
  }
});