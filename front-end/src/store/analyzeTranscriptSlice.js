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
    toggleBookmark: (state, action) => {
      // get the index of the first intent being displayed
      const firstIndex = state.DisplayingQuestion[state.projectIdToBeDisplayed];
      // get the transcript that is being displayed and has the indices of the intents
      const transcript = state.analyzedTranscripts[state.projectIdToBeDisplayed];
      // get the intents currently being displayed
      const intents = new Array([transcript[firstIndex], transcript[firstIndex+1], transcript[firstIndex+2]]);
      // get the intent that is being toggled
      const chosenIntent = intents.filter((intent) => {
        return intent.question === action.payload.question
      })[0];
      // toggle the bookmarking whether it's as a star or flag
      if (action.payload.bookmarkType === "star") {
        chosenIntent.star = !action.payload.currentState
      }
      else {
        chosenIntent.flag = !action.payload.currentState
      }
      },
  }
})

export const { addAnalyzedTranscript, setDisplayingQuestion, deleteAnalyzedTranscript, clearAnalyzedTranscript, setOverrideStatus, setProjectIdToBeDisplayed, toggleBookmark } = analyzeTranscriptSlice.actions

export default analyzeTranscriptSlice.reducer