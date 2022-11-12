import '@testing-library/jest-dom';
import reducer , { setTranscriptUploadStatus } from "./transcriptUploadSlice.js"

describe('transcriptUploadedSlice', () => {
    it('should set isUploaded to false and uploadedProjectIds to empty Array in the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ isUploaded: false, uploadedProjectIds: [] });
    });

    it('should set isUploaded to the argument passed by setTranscriptUploadStatus, false', () => {
        const previousState = { isUploaded: true, uploadedProjectIds : [] };
        expect(reducer(previousState, setTranscriptUploadStatus(false))).toEqual({ isUploaded: false, uploadedProjectIds : [] });
    });

    it('should set isUploaded to the argument passed by setTranscriptUploadStatus, true', () => {
        const previousState = { isUploaded: false, uploadedProjectIds : [] };
        expect(reducer(previousState, setTranscriptUploadStatus(true))).toEqual({ isUploaded: true, uploadedProjectIds : [] });
    });
});