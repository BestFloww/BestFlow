import { createSlice } from '@reduxjs/toolkit'

export const transcriptUploadSlice = createSlice({
  name: 'changeUpload',
  initialState: {
    isUploaded: false
  },
  reducers: {
    enableAnalysisButton: state => {
      state.isUploaded = true
    },
    disableAnalysisButton: state => {
      state.isUploaded = false
    }
  }
})

export const { enableAnalysisButton, disableAnalysisButton } = transcriptUploadSlice.actions

export default transcriptUploadSlice.reducer