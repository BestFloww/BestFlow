import '@testing-library/jest-dom';
import reducer , {enable, disable} from "./transcriptUploadedSlice.js"

describe('transcriptUploadedSlice tests', () => {
    it('should set isUploaded to false in the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ isUploaded: false });
    });
    
    it('should set isUploaded to true when enable is called', async() => {
        const previousState = { isUploaded: false };
        expect(reducer(previousState, { type: enable })).toEqual({ isUploaded: true });
    });

    it('should set page to AnalysisPage when openAnalysisPage is called', () => {
        const previousState = { isUploaded: true };
        expect(reducer(previousState, { type: disable })).toEqual({ isUploaded: false });
    });
});