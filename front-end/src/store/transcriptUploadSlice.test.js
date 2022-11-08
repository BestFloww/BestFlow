import '@testing-library/jest-dom';
import store from "../store.js"
import reducer , { setTranscriptUploadStatus } from "./transcriptUploadSlice.js"

describe('transcriptUploadedSlice tests', () => {
    it('should set isUploaded to false in the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ isUploaded: false });
    });

    it('should set isUploaded to the argument passed by setTranscriptUploadStatus', () => {
        const previousState = { isUploaded: true };
        expect(reducer(previousState, setTranscriptUploadStatus(false))).toEqual({ isUploaded: false });
    });
});