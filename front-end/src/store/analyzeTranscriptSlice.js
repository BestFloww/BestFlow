import { createSlice } from '@reduxjs/toolkit'

export const analyzeTranscriptSlice = createSlice({
  name: 'analyzeTranscript',
  initialState: {
    analyzedTranscripts: {},
    DisplayingQuestion: {},
    override : false,
    projectIdToBeDisplayed : ""
  },

  reducers: {
    addAnalyzedTranscript: (state, action) => {
      // Adds an element to analyzedTranscripts object mapping the project id to the analyzed transcript 
      state.analyzedTranscripts[action.payload.projectId] = action.payload.transcript;
      // Adds an element to DisplayingQuestion object mapping the project id to the initial state of index which is 0
      state.DisplayingQuestion[action.payload.projectId] = 0;
    },
    setDisplayingQuestion: (state, action) => {
      state.DisplayingQuestion[state.projectIdToBeDisplayed] = action.payload;
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

export const { addAnalyzedTranscript, setDisplayingQuestion, deleteAnalyzedTranscript, clearAnalyzedTranscript, setOverrideStatus, setProjectIdToBeDisplayed } = analyzeTranscriptSlice.actions

export default analyzeTranscriptSlice.reducer