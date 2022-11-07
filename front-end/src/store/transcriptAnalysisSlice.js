import { createSlice } from '@reduxjs/toolkit'

export const transcriptAnalysisSlice = createSlice({
  name: 'transcriptAnalysis',
  initialState: {
    index: 0
  },
  reducers: {
    setAnalysisIndex: (state, newIndex) => {
        console.log(state, newIndex)
        state.index = newIndex;
        console.log(state, newIndex)
    }
  }
})

export const {setAnalysisIndex } = transcriptAnalysisSlice.actions;

export default transcriptAnalysisSlice.reducer