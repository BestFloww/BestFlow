import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { setTranscriptUploadStatusTrue, setTranscriptUploadStatusFalse } from './store/transcriptUploadSlice.js';
import App from './App.jsx';

describe('App tests', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <App/>
        </Provider>
    );

    afterAll(() => {
        store.dispatch(setTranscriptUploadStatusFalse())
    });

    it('should display MainPage on load', () => {
        renderComponent();
        expect(screen.getByTestId('main-page')).toBeInTheDocument();
        expect(screen.queryByTestId('analysis-page')).not.toBeInTheDocument();
    });
    
    it('should display AnalysisPage when View Analysis button is pressed on MainPage', async() => {
        store.dispatch(setTranscriptUploadStatusTrue())
        renderComponent();
        userEvent.click(screen.getByText('View Analysis'));
        expect(await screen.getByTestId('analysis-page')).toBeInTheDocument();
        expect(await screen.queryByTestId('main-page')).not.toBeInTheDocument();
    });

    it('should display MainPage when Return to Main Page button is pressed on AnalysisPage', async() => {
        renderComponent();
        userEvent.click(screen.getByText('Return to Main Page'));
        expect(await screen.getByTestId('main-page')).toBeInTheDocument();
        expect(await screen.queryByTestId('analysis-page')).not.toBeInTheDocument();
    });

});
