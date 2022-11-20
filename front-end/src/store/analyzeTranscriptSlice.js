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
    setBookmarkState: (state, action) => {
      // get the index of the first intent being displayed
      const firstIndex = state.DisplayingQuestion[state.projectIdToBeDisplayed];
      // get the transcript that is being displayed and has the indices of the intents
      const transcript = state.analyzedTranscripts[state.projectIdToBeDisplayed];
      // change the bookmark of the intent being changed
      for (let i = firstIndex; i < firstIndex+3; i++) {
        // should I use if-else or switch?
        if (transcript[i].question === action.payload.question && action.payload.bookmarkType === "star") {
          transcript[i].star = !transcript[i].star
          // or should I make it based off of action payload being passed in from intentDiagram?
          // where rather than it being based off of whats in state.analyzedTranscripts, it's based off of the API call or the proptype?
          // transcript[i].star = !action.payload.currentState
        }
        else if (transcript[i].question === action.payload.question && action.payload.bookmarkType === "flag") {
          transcript[i].flag = !transcript[i].flag
        }
        // hypothetically, if everything works out as it should, there should be no other branches right? Should I make an else for an edge-case just in case?
      }
    }
  }
})

export const { addAnalyzedTranscript, setDisplayingQuestion, deleteAnalyzedTranscript, clearAnalyzedTranscript, setOverrideStatus, setProjectIdToBeDisplayed, toggleBookmark } = analyzeTranscriptSlice.actions

export default analyzeTranscriptSlice.reducer