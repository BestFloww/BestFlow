import { createSlice } from '@reduxjs/toolkit'

export const analyzeTranscriptSlice = createSlice({
  name: 'analyzeTranscript',
  initialState: {
    analyzedTranscripts: {},
    override : false,
    projectIdToBeAnalyzed : ""
  },

  reducers: {
    addAnalyzedTranscript: (state, action) => {
      state.analyzedTranscripts[action.payload.projectId] = action.payload.transcript;
    },
    deleteAnalyzedTranscript: (state, action) => {
      delete state.analyzedTranscripts[action.payload];
    },
    clearAnalyzedTranscript: (state) => {
      state.analyzedTranscripts = {};
    },
    setOverrideStatus: (state, action) => {
      state.override = action.payload;
    },
    setProjectIdToBeAnalyzed: (state, action) => {
      state.projectIdToBeAnalyzed = action.payload;
    },
  }
})

export const { addAnalyzedTranscript,deleteAnalyzedTranscript, clearAnalyzedTranscript, setOverrideStatus, setProjectIdToBeAnalyzed } = analyzeTranscriptSlice.actions

export default analyzeTranscriptSlice.reducer