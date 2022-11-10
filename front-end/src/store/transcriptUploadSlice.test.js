import '@testing-library/jest-dom';
import reducer , { setTranscriptUploadStatus } from "./transcriptUploadSlice.js"

describe('transcriptUploadedSlice', () => {
    it('should set isUploaded to false in the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ isUploaded: false });
    });

    it('should set isUploaded to the argument passed by setTranscriptUploadStatus, false', () => {
        const previousState = { isUploaded: true };
        expect(reducer(previousState, setTranscriptUploadStatus(false))).toEqual({ isUploaded: false });
    });

    it('should set isUploaded to the argument passed by setTranscriptUploadStatus, true', () => {
        const previousState = { isUploaded: false };
        expect(reducer(previousState, setTranscriptUploadStatus(true))).toEqual({ isUploaded: true });
    });
});