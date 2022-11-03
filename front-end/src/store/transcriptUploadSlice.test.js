import '@testing-library/jest-dom';
import reducer , { setTranscriptUploadStatusTrue, setTranscriptUploadStatusFalse } from "./transcriptUploadSlice.js"

describe('transcriptUploadedSlice tests', () => {
    it('should set isUploaded to false in the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ isUploaded: false });
    });
    
    it('should set isUploaded to true when enable is called', async() => {
        const previousState = { isUploaded: false };
        expect(reducer(previousState, { type: setTranscriptUploadStatusTrue })).toEqual({ isUploaded: true });
    });

    it('should set page to AnalysisPage when openAnalysisPage is called', () => {
        const previousState = { isUploaded: true };
        expect(reducer(previousState, { type: setTranscriptUploadStatusFalse })).toEqual({ isUploaded: false });
    });
});