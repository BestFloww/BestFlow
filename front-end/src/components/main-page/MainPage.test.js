import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import MainPage from './MainPage.jsx';
import {setTranscriptUploadStatus} from "../../store/transcriptUploadSlice.js";
import {setProjectIdToBeDisplayed, addAnalyzedTranscript, clearAnalyzedTranscript} from "../../store/analyzeTranscriptSlice.js"
import TranscriptAPI from "../../services/TranscriptAPI.js";

const dispatch = jest.spyOn(store, 'dispatch');
jest.mock("../../services/TranscriptAPI.js");
jest.spyOn(window, "alert").mockImplementation()

describe('MainPage', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <MainPage/>
        </Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

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

    it('should dispatch setProjectIdToBeDisplayed with correct Project ID if a Project ID is entered', () => {
        renderComponent();
        userEvent.clear(screen.getByLabelText("Enter Project ID"));
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setProjectIdToBeDisplayed', payload: '1Mergefalse'});
    });

    it('should automatically write the current Project ID into the Project ID input', async() => {
        store.dispatch(setProjectIdToBeDisplayed("Most recent Project ID"));
        renderComponent();
        expect(screen.getByDisplayValue("Most recent Project ID")).toBeInTheDocument();
    });

    it('should enable View Analysis button if a Project ID is entered', () => {
        renderComponent();
        userEvent.clear(screen.getByLabelText("Enter Project ID"));
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        expect(screen.getByLabelText("View Analysis")).not.toBeDisabled();
    });

    it('should disable View Analysis button if no Project ID is entered', () => {
        renderComponent();
        userEvent.clear(screen.getByLabelText("Enter Project ID"));
        expect(screen.getByLabelText("View Analysis")).toBeDisabled();
    });

    it('should dispatch openAnalysisPage when a valid Project ID is entered and View Analysis button is clicked, merge false', async() => {
        store.dispatch(addAnalyzedTranscript({projectId: "1Mergefalse", transcript: [{question: "a", children: {"b": 100,}}]}));
        renderComponent();
        userEvent.clear(screen.getByLabelText("Enter Project ID"));
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        await userEvent.click(screen.getByText('View Analysis'));
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' });
    });

    it('should dispatch openAnalysisPage when a valid Project ID is entered and View Analysis button is clicked, merge true', async() => {
        store.dispatch(addAnalyzedTranscript({projectId: "1Mergetrue", transcript: [{question: "a", children: {"b": 100,}}]}));
        renderComponent();
        userEvent.clear(screen.getByLabelText("Enter Project ID"));
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        userEvent.click(screen.getByTestId("checkbox"));
        await userEvent.click(screen.getByText('View Analysis'));
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' });
    });

    it('should show an alert and not dispatch openAnalysisPage when an invalid Project ID is entered and View Analysis button is clicked', async() => {
        jest.spyOn(TranscriptAPI, "getAnalysis").mockImplementationOnce(() => {return {data: []}});
        store.dispatch(addAnalyzedTranscript({projectId: "1", transcript: [{question: "a", children: {"b": 100,}}]}));
        renderComponent();
        userEvent.clear(screen.getByLabelText("Enter Project ID"));
        userEvent.type(screen.getByLabelText("Enter Project ID"), "2");
        await userEvent.click(screen.getByText('View Analysis'));
        // Check that the switch to analysis page has not been dispatched; this implicitly tests the alert as well
        expect(dispatch).not.toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' });
    });

    it("should dispatch addAnalyzedTranscript with correct ID-transcript mapping and setOverrideStatus with false when a valid Project ID is entered and View Analysis button is clicked, but the Project ID is not stored in this session's transcripts", async() => {
        jest.spyOn(TranscriptAPI, "getAnalysis").mockImplementationOnce(() => {return {data: [{question: "a", children: {"b": 100,}}]}});
        renderComponent();
        userEvent.clear(screen.getByLabelText("Enter Project ID"));
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setProjectIdToBeDisplayed', payload: "" });
        userEvent.type(screen.getByLabelText("Enter Project ID"), "2");
        await userEvent.click(screen.getByText('View Analysis'));
        // Check that if no transcript with the ID is stored in analyzedTranscripts, but it exists on the database, it properly dispatches reducers to store it
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setProjectIdToBeDisplayed', payload: "2Mergefalse" });
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/addAnalyzedTranscript', payload: {projectId: "2Mergefalse", transcript: [{question: "a", children: {"b": 100,}}]} });
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setOverrideStatus', payload: false });
        await waitFor(() => expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' }));
    });
    
    it("should dispatch setProjectIdToBeDisplayed with correct ID when both merged and not merged version is in store and ", async() => {
        store.dispatch(addAnalyzedTranscript({projectId: "1Mergetrue", transcript: [{question: "a", children: {"b": 100,}}]}));
        renderComponent();
        userEvent.clear(screen.getByLabelText("Enter Project ID"));
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setProjectIdToBeDisplayed', payload: "" });
        userEvent.type(screen.getByLabelText("Enter Project ID"), "1");
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setProjectIdToBeDisplayed', payload: "1Mergefalse" });
        userEvent.click(screen.getByTestId("checkbox"));
        await userEvent.click(screen.getByText('View Analysis'));
        // Check that if no transcript with the ID is stored in analyzedTranscripts, but it exists on the database, it properly dispatches reducers to store it
        expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setProjectIdToBeDisplayed', payload: "1Mergetrue" });
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage'});
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
