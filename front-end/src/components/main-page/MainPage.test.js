import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import MainPage from './MainPage.jsx';
import { setTranscriptUploadStatus } from '../store/transcriptUploadSlice.js';

describe('MainPage tests', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <MainPage/>
        </Provider>
    );

    afterAll(() => {
        store.dispatch(setTranscriptUploadStatus(false))
    });

    it('should not display Upload Transcript Modal initially', () => {
        renderComponent();
        expect(screen.queryByTestId('upload-transcript-modal')).not.toBeInTheDocument();
    });
    
    it('should toggle Upload Transcript Modal when Upload Transcript button is pressed', async() => {
        renderComponent();
        userEvent.click(screen.getByText('Upload Transcript'));
        expect(screen.getByText('Drag and drop file or upload below.')).toBeInTheDocument();
        userEvent.click(screen.getByText('Upload Transcript'));
        expect(screen.queryByText("Drag and drop file or upload below.")).not.toBeInTheDocument();
    });

    it('should dispatch openAnalysisPage when View Analysis button is clicked', () => {
        store.dispatch(setTranscriptUploadStatus(true))
        renderComponent();
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.click(screen.getByText('View Analysis'));
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' });
    });

});
