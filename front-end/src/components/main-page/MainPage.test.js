import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import MainPage from './MainPage.jsx';
import {setTranscriptUploadStatus} from "../../store/transcriptUploadSlice.js";
import {setProjectIdToBeDisplayed, addAnalyzedTranscript, clearAnalyzedTranscript} from "../../store/analyzeTranscriptSlice.js"

describe('MainPage', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <MainPage/>
        </Provider>
    );

    afterAll(() => {
        // restoring the store to default
        store.dispatch(setTranscriptUploadStatus(false));
        store.dispatch(clearAnalyzedTranscript());
        store.dispatch(setProjectIdToBeDisplayed(""));
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

    it('should dispatch openAnalysisPage when View Analysis button is clicked', async() => {
        store.dispatch(setTranscriptUploadStatus(true));
        store.dispatch(setProjectIdToBeDisplayed("1"));
        store.dispatch(addAnalyzedTranscript({projectId: "1", transcript: [{question: "a", children: {"b": 100,}}]}));
        renderComponent();
        const dispatch = jest.spyOn(store, 'dispatch');
        await userEvent.click(screen.getByText('View Analysis'));
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' });
    });

    it('should download transcript template when Download Transcript Template button is clicked', () => {
        renderComponent();
        const mockElement = {click:jest.fn()}
        const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(mockElement);
        document.body.appendChild = jest.fn();
        global.URL.createObjectURL = jest.fn();
        userEvent.click(screen.getByText('Download Transcript Template'));
        expect(createElementSpy).toHaveBeenCalledWith('a');
        expect(document.body.appendChild).toHaveBeenCalled();
        expect(mockElement.click).toHaveBeenCalled();
    });

});
