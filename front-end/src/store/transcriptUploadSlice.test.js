import '@testing-library/jest-dom';
import reducer , {enableAnalysisButton, disableAnalysisButton} from "./transcriptUploadSlice.js"

describe('transcriptUploadedSlice tests', () => {
    it('should set isUploaded to false in the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ isUploaded: false });
    });
    
    it('should set isUploaded to true when enable is called', async() => {
        const previousState = { isUploaded: false };
        expect(reducer(previousState, { type: enableAnalysisButton })).toEqual({ isUploaded: true });
    });

    it('should set page to AnalysisPage when openAnalysisPage is called', () => {
        const previousState = { isUploaded: true };
        expect(reducer(previousState, { type: disableAnalysisButton })).toEqual({ isUploaded: false });
    });
});