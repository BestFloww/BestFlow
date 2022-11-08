import { createSlice } from '@reduxjs/toolkit'

export const transcriptUploadSlice = createSlice({
  name: 'transcriptUpload',
  initialState: {
    isUploaded: false
  },
  reducers: {
    setTranscriptUploadStatus: (state, action) => {
      state.isUploaded = action.payload
      //action.payload can be any object that is passed to the function
    }
  }
})

export const { setTranscriptUploadStatus } = transcriptUploadSlice.actions

export default transcriptUploadSlice.reducer