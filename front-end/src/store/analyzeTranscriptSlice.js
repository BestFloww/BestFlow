import { createSlice } from '@reduxjs/toolkit'

export const analyzeTranscriptSlice = createSlice({
  name: 'analyzeTranscript',
  initialState: {
    analyzedTranscripts: {},
    override : false,
    projectIdToBeDisplayed : ""
  },

  reducers: {
    addAnalyzedTranscript: (state, action) => {
      // Adds an element to analyzedTranscripts object mapping the project id to the analyzed transcript 
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
    setProjectIdToBeDisplayed: (state, action) => {
      state.projectIdToBeDisplayed = action.payload;
    },
  }
})

export const { addAnalyzedTranscript,deleteAnalyzedTranscript, clearAnalyzedTranscript, setOverrideStatus, setProjectIdToBeDisplayed } = analyzeTranscriptSlice.actions

export default analyzeTranscriptSlice.reducer