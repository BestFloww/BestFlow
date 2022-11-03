import { createSlice } from '@reduxjs/toolkit'

export const transcriptUploadSlice = createSlice({
  name: 'transcriptUpload',
  initialState: {
    isUploaded: false
  },
  reducers: {
    setTranscriptUploadStatusTrue: state => {
      state.isUploaded = true
    },
    setTranscriptUploadStatusFalse: state => {
      state.isUploaded = false
    }
  }
})

export const { setTranscriptUploadStatusTrue, setTranscriptUploadStatusFalse } = transcriptUploadSlice.actions

export default transcriptUploadSlice.reducer