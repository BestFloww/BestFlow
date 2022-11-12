import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { setTranscriptUploadStatus } from './store/transcriptUploadSlice.js';
import { addAnalyzedTranscript, clearAnalyzedTranscript, setProjectIdToBeAnalyzed } from './store/analyzeTranscriptSlice.js';
import App from './App.jsx';

describe('App', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <App/>
        </Provider>
    );

    afterAll(() => {
        store.dispatch(setTranscriptUploadStatus(false))
        store.dispatch(clearAnalyzedTranscript)
        store.dispatch(setProjectIdToBeAnalyzed(""))
    });

    it('should display MainPage on load', () => {
        renderComponent();
        expect(screen.getByTestId('main-page')).toBeInTheDocument();
        expect(screen.queryByTestId('analysis-page')).not.toBeInTheDocument();
    });
    
    it('should display AnalysisPage when View Analysis button is pressed on MainPage', async() => {
        store.dispatch(setTranscriptUploadStatus(true))
        store.dispatch(setProjectIdToBeAnalyzed("1"))
        store.dispatch(addAnalyzedTranscript({projectId: "1", transcript: [{question: "a", children: {"b": 100,}}]}))
        renderComponent();
        userEvent.click(screen.getByText('View Analysis'));
        expect(screen.getByTestId('analysis-page')).toBeInTheDocument();
        expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    });

    it('should display MainPage when Return to Main Page button is pressed on AnalysisPage', async() => {
        renderComponent();
        userEvent.click(screen.getByText('Return to Main Page'));
        expect(screen.getByTestId('main-page')).toBeInTheDocument();
        expect(screen.queryByTestId('analysis-page')).not.toBeInTheDocument();
    });

});
