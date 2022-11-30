import '@testing-library/jest-dom';
import reducer, { openMainPage, openAnalysisPage } from './switchPageSlice.js';

describe('switchPageSlice', () => {
    it('should set page to MainPage in the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ page: 'MainPage', newVisiter: true });
    });
    
    it('should set page to MainPage when openMainPage is called', async() => {
        const previousState = { page: 'AnalysisPage', newVisiter: false };
        expect(reducer(previousState, { type: openMainPage })).toEqual({ page: 'MainPage', newVisiter: false });
    });

    it('should set page to AnalysisPage and set newVisiter to false when openAnalysisPage is called', () => {
        const previousState = { page: 'MainPage', newVisiter: true };
        expect(reducer(previousState, { type: openAnalysisPage })).toEqual({ page: 'AnalysisPage', newVisiter:false });
    });

});
