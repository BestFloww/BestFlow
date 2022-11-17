import '@testing-library/jest-dom';
import reducer, {addAnalyzedTranscript, setDisplayingQuestion, deleteAnalyzedTranscript, clearAnalyzedTranscript, setOverrideStatus, setProjectIdToBeDisplayed, } from "./analyzeTranscriptSlice.js"

describe('analyzeTranscriptSlice', () => {
    const initialState = {
        analyzedTranscripts: {},
        DisplayingQuestion: {},
        override : false,
        projectIdToBeAnalyzed : ""
    };

    const previousState = {
        analyzedTranscripts: {"1": [{"a":100}], "2": [[{"b":90}]]},
        DisplayingQuestion: {"1" : 0, "2": 0},
        override : false,
        projectIdToBeAnalyzed : "1"
    };

    it('should initialize the reducer to the right initial state', () => {
        const expected = reducer(undefined, { type: undefined });
        expect(expected.analyzedTranscripts).toEqual({});
        expect(expected.DisplayingQuestion).toEqual({});
        expect(expected.override).toBe(false);
        expect(expected.projectIdToBeDisplayed).toBe("");
    });

    it('should add an analyzed transcript with the right project id to analyzedTranscripts', () => {
        const expected = reducer(initialState, addAnalyzedTranscript({projectId: "1", transcript: [{"c":80}]}));
        expect(expected.analyzedTranscripts).toEqual({"1": [{"c":80}]});
        expect(expected.DisplayingQuestion).toEqual({"1": 0});
    });

    it('should replace an analyzed transcript if the project id exists in analyzedTranscripts', () => {
        const expected = reducer(previousState, addAnalyzedTranscript({projectId: "1", transcript: [{"b":90}]}));
        expect(expected.analyzedTranscripts["1"]).toEqual([{"b":90}]);
        expect(expected.DisplayingQuestion).toEqual({"1": 0, "2":0});
    });

    it('should delete the analyzed transcript corresponding to the given project id if it exists in analyzedTranscripts', () => {
        const expected = reducer(previousState, deleteAnalyzedTranscript("1"));
        expect(expected.analyzedTranscripts).toEqual({"2": [[{"b":90}]]});
    });

    it('should delete all transcripts from the analyzedTranscripts', () => {
        const expected = reducer(previousState, clearAnalyzedTranscript);
        expect(expected.analyzedTranscripts).toEqual({});
    });
    it('should set override to the boolean passed by setOverrideStatus, true', () => {
        const expected = reducer(initialState, setOverrideStatus(true));
        expect(expected.override).toBe(true);
    });
    it('should set override to the boolean passed by setOverrideStatus, false', () => {
        const previousState2 = {
            analyzedTranscripts: {},
            override : true,
            projectIdToBeDisplayed : ""
        };
        const expected = reducer(previousState2, setOverrideStatus(false))
        expect(expected.override).toBe(false);
    });
    it('should set projectId to the String passed by setProjectIdToBeDisplayed', () => {
        const expected = reducer(previousState, setProjectIdToBeDisplayed("100642Amh632"));
        expect(expected.projectIdToBeDisplayed).toBe("100642Amh632");
    });
    it('should set the index of the given project Id in DisplayingQuestion', () => {
        const expected = reducer(previousState, setDisplayingQuestion({index:3}));
        expect(expected.DisplayingQuestion["1"]).toBe(3);
    });
});
