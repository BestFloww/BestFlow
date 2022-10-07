import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './store/counters/counterSlice.js';

export default configureStore({
  reducer: {counterReducer}
});