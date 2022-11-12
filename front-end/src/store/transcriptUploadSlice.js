import { createSlice } from '@reduxjs/toolkit'

export const transcriptUploadSlice = createSlice({
  name: 'transcriptUpload',
  initialState: {
    isUploaded: false,
    uploadedProjectIds : []
  },
  reducers: {
    setTranscriptUploadStatus: (state, action) => {
      state.isUploaded = action.payload
      if (!(action.payload)){
        // reset projectIds if upload was not successful
        state.uploadedProjectIds = [];
      }
    },
    setUploadedProjectIds: (state, action) => {
      state.uploadedProjectIds = action.payload;
    }
  }
})

export const { setTranscriptUploadStatus, setUploadedProjectIds } = transcriptUploadSlice.actions

export default transcriptUploadSlice.reducer