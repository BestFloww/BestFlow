import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { setTranscriptUploadStatus } from './store/transcriptUploadSlice.js';
import { addAnalyzedTranscript, clearAnalyzedTranscript, setProjectIdToBeDisplayed } from './store/analyzeTranscriptSlice.js';
import App from './App.jsx';

describe('App', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <App/>
        </Provider>
    );

    afterAll(() => {
        // restoring the store to default
        store.dispatch(setTranscriptUploadStatus(false));
        store.dispatch(clearAnalyzedTranscript());
        store.dispatch(setProjectIdToBeDisplayed(""));
    });

    it('should display MainPage on load', () => {
        renderComponent();
        expect(screen.getByTestId('main-page')).toBeInTheDocument();
        expect(screen.queryByTestId('analysis-page')).not.toBeInTheDocument();
    });
    
    it('should display AnalysisPage when a transcript has been uploaded and analyzed successfully and View Analysis button is pressed on MainPage with a valid Project ID', async() => {
        store.dispatch(addAnalyzedTranscript({projectId: "1", transcript: [{question: "a", children: {"b": 100,}}]}));
        renderComponent();
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        userEvent.click(screen.getByText('View Analysis'));
        await screen.findByTestId('analysis-page');
        expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    });

    it('should display MainPage when logo button is pressed on AnalysisPage', () => {
        renderComponent();
        userEvent.click(screen.getByTestId('logo-button'));
        expect(screen.getByTestId('main-page')).toBeInTheDocument();
        expect(screen.queryByTestId('analysis-page')).not.toBeInTheDocument();
    });

});
