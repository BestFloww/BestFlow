import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import MainPage from './MainPage.jsx';
import {setTranscriptUploadStatus} from "../../store/transcriptUploadSlice.js";
import {setProjectIdToBeDisplayed, addAnalyzedTranscript, clearAnalyzedTranscript} from "../../store/analyzeTranscriptSlice.js"
import TranscriptAPI from "../../services/TranscriptAPI.js";

jest.mock("../../services/TranscriptAPI.js");

describe('MainPage', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <MainPage/>
        </Provider>
    );

    afterAll(() => {
        // Restore the store to default
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

    it('should dispatch setProjectIdToBeDisplayed with correct Project ID if a Project ID is entered', async() => {
        renderComponent();
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setProjectIdToBeDisplayed', payload: '1'});
    });

    it('should enable View Analysis button if a Project ID is entered', async() => {
        renderComponent();
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        expect(screen.getByLabelText("View Analysis")).not.toBeDisabled();
    });

    it('should disable View Analysis button if no Project ID is entered', async() => {
        renderComponent();
        expect(screen.getByLabelText("View Analysis")).toBeDisabled();
    });

    it('should dispatch openAnalysisPage when valid Project ID is entered and View Analysis button is clicked', async() => {
        store.dispatch(addAnalyzedTranscript({projectId: "1", transcript: [{question: "a", children: {"b": 100,}}]}));
        renderComponent();
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        await userEvent.click(screen.getByText('View Analysis'));
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' });
    });

    it('should show an alert and not dispatch openAnalysisPage when invalid Project ID is entered and View Analysis button is clicked', async() => {
        const mockAlert = jest.spyOn(global, "alert").mockImplementation(); 
        jest.spyOn(TranscriptAPI, "getAnalysis").mockImplementationOnce(() => {return []});
        store.dispatch(addAnalyzedTranscript({projectId: "1", transcript: [{question: "a", children: {"b": 100,}}]}));
        renderComponent();
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.type(screen.getByLabelText("Enter Project ID"), "2");
        await userEvent.click(screen.getByText('View Analysis'));
        expect(mockAlert).toHaveBeenCalledWith("Error in analyzing transcript. Your project ID was not in our database. Please try again.");
        expect(dispatch).not.toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' });
    });

    it("should dispatch addAnalyzedTranscript when valid Project ID is entered and View Analysis button is clicked but the Project ID is not stored in this session's transcripts", async() => {
        jest.spyOn(TranscriptAPI, "getAnalysis").mockImplementationOnce(() => {return [{question: "a", children: {"b": 100,}}]});
        renderComponent();
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
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
