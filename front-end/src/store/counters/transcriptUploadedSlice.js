import { createSlice } from '@reduxjs/toolkit'

export const transcriptUploadedSlice = createSlice({
  name: 'isTranscriptUploaded',
  initialState: {
    isUploaded: false
  },
  reducers: {
    enable: state => {
      state.isUploaded = true
    },
    disable: state => {
      state.isUploaded = false
    }
  }
})

export const { enable, disable } = transcriptUploadedSlice.actions

export default transcriptUploadedSlice.reducer