import '@testing-library/jest-dom';
import reducer, { openMainPage, openAnalysisPage } from './switchPageSlice.js';

describe('switchPageSlice', () => {
    it('should set page to MainPage in the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ page: 'MainPage' });
    });
    
    it('should set page to MainPage when openMainPage is called', async() => {
        const previousState = { page: 'AnalysisPage' };
        expect(reducer(previousState, { type: openMainPage })).toEqual({ page: 'MainPage' });
    });

    it('should set page to AnalysisPage when openAnalysisPage is called', () => {
        const previousState = { page: 'MainPage' };
        expect(reducer(previousState, { type: openAnalysisPage })).toEqual({ page: 'AnalysisPage' });
    });

});
