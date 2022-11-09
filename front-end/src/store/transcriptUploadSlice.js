import { createSlice } from '@reduxjs/toolkit'

export const transcriptUploadSlice = createSlice({
  name: 'transcriptUpload',
  initialState: {
    isUploaded: false
  },
  reducers: {
    setTranscriptUploadStatus: (state, action) => {
      state.isUploaded = action.payload
    }
  }
})

export const { setTranscriptUploadStatus } = transcriptUploadSlice.actions

export default transcriptUploadSlice.reducer