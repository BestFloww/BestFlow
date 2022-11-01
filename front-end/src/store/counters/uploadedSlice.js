import { createSlice } from '@reduxjs/toolkit'

export const uploadedSlice = createSlice({
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

export const { enable, disable } = uploadedSlice.actions

export default uploadedSlice.reducer